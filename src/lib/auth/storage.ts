import type { AuthTokens, AuthUser, UserRole } from './types';

// NOTE: the project already uses these keys in src/lib/navigation.ts
const KEY_ACCESS = 'auth_token';
const KEY_REFRESH = 'refresh_token';
const KEY_ROLE = 'user_role';
const KEY_EMAIL = 'user_email';
const KEY_USER_ID = 'user_id';

function safeLocalStorage(): Storage | null {
	// SvelteKit code may run in environments without `window`
	// (build/SSR). We guard access.
	try {
		return typeof window !== 'undefined' ? window.localStorage : null;
	} catch {
		return null;
	}
}

export function readAccessToken(): string | null {
	return safeLocalStorage()?.getItem(KEY_ACCESS) ?? null;
}

export function readRefreshToken(): string | null {
	return safeLocalStorage()?.getItem(KEY_REFRESH) ?? null;
}

export function readUserRole(): UserRole | null {
	const v = safeLocalStorage()?.getItem(KEY_ROLE) ?? null;
	if (v === 'manager' || v === 'veterinarian' || v === 'warehouseman') return v as any;
	return null;
}

export function readUserEmail(): string | null {
	return safeLocalStorage()?.getItem(KEY_EMAIL) ?? null;
}

export function readUserId(): string | null {
	return safeLocalStorage()?.getItem(KEY_USER_ID) ?? null;
}

export function writeTokens(tokens: AuthTokens): void {
	const ls = safeLocalStorage();
	if (!ls) return;
	ls.setItem(KEY_ACCESS, tokens.accessToken);
	if (tokens.refreshToken) ls.setItem(KEY_REFRESH, tokens.refreshToken);
}

export function writeUser(user: AuthUser): void {
	const ls = safeLocalStorage();
	if (!ls) return;
	ls.setItem(KEY_EMAIL, user.email);
	ls.setItem(KEY_ROLE, user.role);
	if (user.id !== undefined) ls.setItem(KEY_USER_ID, String(user.id));
}

export function clearAuthStorage(): void {
	const ls = safeLocalStorage();
	if (!ls) return;
	ls.removeItem(KEY_ACCESS);
	ls.removeItem(KEY_REFRESH);
	ls.removeItem(KEY_ROLE);
	ls.removeItem(KEY_EMAIL);
	ls.removeItem(KEY_USER_ID);
}

export function readAuthSnapshot(): { user: AuthUser | null; tokens: AuthTokens | null } {
	const accessToken = readAccessToken();
	const refreshToken = readRefreshToken();
	const role = readUserRole();
	const email = readUserEmail();
	const id = readUserId();

	const user: AuthUser | null = email && role ? { id: id ?? undefined, email, role } : null;
	const tokens: AuthTokens | null = accessToken
		? { accessToken, refreshToken: refreshToken ?? undefined }
		: null;
	return { user, tokens };
}
