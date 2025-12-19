// src/lib/types/menu.ts
export interface MenuItem {
	id: string;
	title: string;
	path: string;
	icon?: string;
	badge?: number;
}