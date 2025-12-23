import { redirect } from '@sveltejs/kit';
import { readAccessToken, readUserRole } from '$lib/auth/storage';

// This app relies on localStorage auth state, so run only in the browser.
export const ssr = false;

const PROTECTED_PREFIXES = ['/manager', '/vet', '/warehouse_manager'];

function isProtected(pathname: string): boolean {
	return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function routeForRole(role: string | null): string {
	switch (role) {
		case 'manager':
			return '/manager';
		case 'veterinarian':
			return '/vet';
		case 'warehouseman':
			return '/warehouse_manager';
		default:
			return '/manager';
	}
}

export function load({ url }) {
	const pathname = url.pathname;
	const hasToken = !!readAccessToken();
	const role = readUserRole();

	// If user is already logged in and opens login page, redirect to their dashboard
	if (pathname === '/' && hasToken) {
		throw redirect(302, routeForRole(role));
	}

	// Protected routes require login
	if (isProtected(pathname) && !hasToken) {
		throw redirect(302, '/');
	}

	// Role-based guard
	if (hasToken && isProtected(pathname)) {
		const expected = routeForRole(role);
		const isWrong =
			(role === 'manager' && !pathname.startsWith('/manager')) ||
			(role === 'veterinarian' && !pathname.startsWith('/vet')) ||
			(role === 'warehouseman' && !pathname.startsWith('/warehouse_manager'));

		if (isWrong) {
			throw redirect(302, expected);
		}
	}

	return {};
}
