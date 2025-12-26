import { apiFetch } from './client';
import { DRUG_ENDPOINTS } from './config';

export type Drug = {
	id: number;
	name: string;
	dosage_form: string;
	unit: string;
	code: string;
};

function qs(params?: { search?: string; ordering?: string }): string {
	if (!params) return '';
	const u = new URLSearchParams();
	if (params.search) u.set('search', params.search);
	if (params.ordering) u.set('ordering', params.ordering);
	const s = u.toString();
	return s ? `?${s}` : '';
}

export async function listDrugs(params?: { search?: string; ordering?: string }): Promise<Drug[]> {
	return apiFetch<Drug[]>(`${DRUG_ENDPOINTS.list}${qs(params)}`, { method: 'GET' });
}

export async function createDrug(payload: Omit<Drug, 'id'>): Promise<Drug> {
	return apiFetch<Drug>(DRUG_ENDPOINTS.list, {
		method: 'POST',
		json: payload
	});
}

export async function updateDrug(id: number, payload: Partial<Omit<Drug, 'id'>>): Promise<Drug> {
	return apiFetch<Drug>(DRUG_ENDPOINTS.item(id), {
		method: 'PATCH',
		json: payload
	});
}

export async function deleteDrug(id: number): Promise<void> {
	await apiFetch(DRUG_ENDPOINTS.item(id), { method: 'DELETE' });
}
