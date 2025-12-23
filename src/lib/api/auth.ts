import { AUTH_ENDPOINTS } from './config';
import { apiFetch } from './client';
import type { AuthTokens, AuthUser, UserRole } from '$lib/auth/types';
import { writeTokens, writeUser, clearAuthStorage } from '$lib/auth/storage';

type JwtPairResponse = {
	access?: string;
	refresh?: string;
};

function assertString(v: unknown): v is string {
	return typeof v === 'string' && v.length > 0;
}

/**
 * Login against Django SimpleJWT:
 *  POST /auth/token/
 *  body: { email, password }
 *  response: { access, refresh }
 *
 * NOTE: backend does not return role/user details by default,
 * so we accept `roleHint` from the UI (selected role) to keep
 * existing role-based routing working.
 */
export async function login(email: string, password: string, roleHint: UserRole): Promise<AuthUser> {
	const data = await apiFetch<JwtPairResponse>(AUTH_ENDPOINTS.login, {
		method: 'POST',
		json: { email, password }
	});

	if (!assertString(data?.access)) {
		throw new Error('Не удалось получить access token от сервера');
	}

	const tokens: AuthTokens = { accessToken: data.access, refreshToken: assertString(data.refresh) ? data.refresh : undefined };
	writeTokens(tokens);

	const user: AuthUser = { email, role: roleHint };
	writeUser(user);

	return user;
}

/**
 * Register:
 *  POST /auth/register/
 *  body: { email, password, role? }
 *  response: created user object (id/email/role)
 */
export async function register(email: string, password: string, role?: UserRole): Promise<void> {
	await apiFetch(AUTH_ENDPOINTS.register, {
		method: 'POST',
		json: role ? { email, password, role } : { email, password }
	});
}

/**
 * Refresh is handled automatically inside apiFetch() on 401,
 * but can be called manually if you need it.
 */
export async function refresh(): Promise<AuthTokens | null> {
	// apiFetch refresh is internal; expose nothing here for now
	return null;
}

export async function logout(): Promise<void> {
	// backend has no logout endpoint in this project, so we just clear local state
	clearAuthStorage();
}
