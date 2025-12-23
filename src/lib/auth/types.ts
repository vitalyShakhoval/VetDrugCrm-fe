// Backend role codes from apps/users/roles.py
export type UserRole = 'manager' | 'veterinarian' | 'warehouseman';

export type AuthUser = {
	/** Backend user id (if available) */
	id?: string | number;
	email: string;
	role: UserRole;
};

export type AuthTokens = {
	accessToken: string;
	refreshToken?: string;
};
