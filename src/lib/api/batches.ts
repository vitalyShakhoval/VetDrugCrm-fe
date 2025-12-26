import { apiFetch } from './client';
import { BATCH_ENDPOINTS } from './config';

export type Batch = {
	id: number;
	drug: number; // FK id
	batch_number: string;
	manufacture_date: string | null;
	expiry_date: string; // YYYY-MM-DD
	quantity: number;
	remaining_quantity: number;
	supplier: string;
	purchase_price: string | null; // DRF DecimalField часто приходит строкой
	location: string;
};

function qs(params?: { search?: string; ordering?: string }): string {
	if (!params) return '';
	const u = new URLSearchParams();
	if (params.search) u.set('search', params.search);
	if (params.ordering) u.set('ordering', params.ordering);
	const s = u.toString();
	return s ? `?${s}` : '';
}

export async function listBatches(params?: { search?: string; ordering?: string }): Promise<Batch[]> {
	return apiFetch<Batch[]>(`${BATCH_ENDPOINTS.list}${qs(params)}`, { method: 'GET' });
}

export async function createBatch(payload: Omit<Batch, 'id'>): Promise<Batch> {
	return apiFetch<Batch>(BATCH_ENDPOINTS.list, {
		method: 'POST',
		json: payload
	});
}

export async function updateBatch(id: number, payload: Partial<Omit<Batch, 'id'>>): Promise<Batch> {
	return apiFetch<Batch>(BATCH_ENDPOINTS.item(id), {
		method: 'PATCH',
		json: payload
	});
}

export async function deleteBatch(id: number): Promise<void> {
	await apiFetch(BATCH_ENDPOINTS.item(id), { method: 'DELETE' });
}
