import { API_BASE_URL, AUTH_ENDPOINTS } from './config';
import { ApiError } from './errors';
import {
	readAccessToken,
	readRefreshToken,
	writeTokens,
	clearAuthStorage
} from '$lib/auth/storage';

type JsonRecord = Record<string, unknown>;

function joinUrl(base: string, path: string): string {
	if (!base) return path;
	const b = base.endsWith('/') ? base.slice(0, -1) : base;
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${b}${p}`;
}

async function parseJsonSafe(res: Response): Promise<unknown> {
	const contentType = res.headers.get('content-type') ?? '';
	if (contentType.includes('application/json')) {
		try {
			return await res.json();
		} catch {
			return null;
		}
	}
	return null;
}

function extractMessage(data: unknown): string | null {
	if (!data) return null;
	if (typeof data === 'string') return data;
	if (typeof data === 'object') {
		const anyData: any = data;
		return (
			anyData.message ??
			anyData.error ??
			anyData.details ??
			anyData?.data?.message ??
			anyData?.data?.error ??
			null
		);
	}
	return null;
}

async function refreshAccessToken(): Promise<string | null> {
	const refreshToken = readRefreshToken();
	if (!refreshToken) return null;

	const res = await fetch(joinUrl(API_BASE_URL, AUTH_ENDPOINTS.refresh), {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json'
		},
		// SimpleJWT expects { "refresh": "<token>" }
		body: JSON.stringify({ refresh: refreshToken })
	});

	if (!res.ok) {
		// refresh failed -> force logout locally
		clearAuthStorage();
		return null;
	}

	const data = await res.json().catch(() => null);

	// SimpleJWT returns { access: "<token>" } (refresh usually stays the same)
	const accessToken: unknown = data?.access ?? data?.accessToken ?? data?.data?.access;
	if (typeof accessToken === 'string' && accessToken.length > 0) {
		writeTokens({ accessToken, refreshToken });
		return accessToken;
	}

	return null;
}


export type ApiFetchOptions = RequestInit & {
	/** If true, adds Authorization header when token exists. Default: true */
	auth?: boolean;
	/** If set, request body will be JSON.stringified and content-type will be set */
	json?: JsonRecord | unknown[] | string | number | boolean | null;
};

export async function apiFetch<T = unknown>(path: string, options: ApiFetchOptions = {}): Promise<T> {
	const { auth = true, json, headers, ...rest } = options;
	const url = joinUrl(API_BASE_URL, path);

	const finalHeaders = new Headers(headers);
	finalHeaders.set('accept', 'application/json');

	let body: BodyInit | undefined = rest.body as any;
	if (json !== undefined) {
		finalHeaders.set('content-type', 'application/json');
		body = JSON.stringify(json);
	}

	if (auth) {
		const access = readAccessToken();
		if (access) finalHeaders.set('authorization', `Bearer ${access}`);
	}

	const res = await fetch(url, { ...rest, headers: finalHeaders, body });

	// Try refresh once on 401
	if (res.status === 401 && auth) {
		const newAccess = await refreshAccessToken();
		if (newAccess) {
			finalHeaders.set('authorization', `Bearer ${newAccess}`);
			const retry = await fetch(url, { ...rest, headers: finalHeaders, body });
			if (retry.ok) return (await parseJsonSafe(retry)) as T;
			const retryData = await parseJsonSafe(retry);
			throw new ApiError(extractMessage(retryData) ?? retry.statusText, retry.status, retryData);
		}
	}

	const data = await parseJsonSafe(res);
	if (!res.ok) {
		throw new ApiError(extractMessage(data) ?? res.statusText, res.status, data);
	}

	return data as T;
}
