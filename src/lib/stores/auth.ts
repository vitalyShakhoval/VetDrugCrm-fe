import { writable } from 'svelte/store';
import type { AuthUser, UserRole } from '$lib/auth/types';
import { readAuthSnapshot, clearAuthStorage } from '$lib/auth/storage';
import * as authApi from '$lib/api/auth';

type AuthState = {
	user: AuthUser | null;
	isReady: boolean;
};

function createAuthStore() {
	const { user } = readAuthSnapshot();
	const { subscribe, set } = writable<AuthState>({ user, isReady: true });

	return {
		subscribe,
		login: async (email: string, password: string, role: UserRole) => {
			const u = await authApi.login(email, password, role);
			set({ user: u, isReady: true });
			return u;
		},
		register: async (email: string, password: string, role?: UserRole) => {
			await authApi.register(email, password, role);
		},
		logout: async () => {
			await authApi.logout();
			set({ user: null, isReady: true });
		},
		reset: () => {
			clearAuthStorage();
			set({ user: null, isReady: true });
		}
	};
}

export const auth = createAuthStore();
