/**
 * Configure backend base URL with Vite env:
 *  - VITE_API_BASE_URL=http://localhost:8000
 *
 * If empty, requests will be relative (useful with Vite dev proxy).
 */
export const API_BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

/**
 * Django + DRF + SimpleJWT endpoints (as in VetDrugCrm-be-main):
 *  - POST /auth/register/
 *  - POST /auth/token/
 *  - POST /auth/token/refresh/
 */
export const AUTH_ENDPOINTS = {
	login: '/auth/token/',
	register: '/auth/register/',
	refresh: '/auth/token/refresh/'
} as const;


/** DRF endpoints for drugs & batches */
export const DRUG_ENDPOINTS = {
	list: '/api/drug/list',
	item: (id: number) => `/api/drug/item/${id}`
} as const;

export const BATCH_ENDPOINTS = {
	list: '/api/batch/list',
	item: (id: number) => `/api/batch/item/${id}`
} as const;
