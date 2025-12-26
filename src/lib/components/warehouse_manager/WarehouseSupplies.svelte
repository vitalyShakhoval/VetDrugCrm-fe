<script lang="ts">
	import { onMount } from 'svelte';
	import { listBatches, createBatch, updateBatch, deleteBatch, type Batch } from '$lib/api/batches';
	import { listDrugs, type Drug } from '$lib/api/drugs';

	type Row = Batch & { drugName: string };

	let query = $state('');
	let loading = $state(false);
	let error = $state<string | null>(null);

	let drugs = $state<Drug[]>([]);
	let rows = $state<Row[]>([]);

	let debounceTimer: any = null;

	// modal state
	let modalOpen = $state(false);
	let saving = $state(false);
	let editingId = $state<number | null>(null);

	let form = $state({
		drug: 0,
		batch_number: '',
		manufacture_date: '',
		expiry_date: '',
		quantity: 0,
		remaining_quantity: 0,
		supplier: '',
		purchase_price: '',
		location: ''
	});

	function drugLabel(id: number): string {
		return drugs.find((d) => d.id === id)?.name ?? `#${id}`;
	}

	function normalizeRows(batches: Batch[]): Row[] {
		return batches.map((b) => ({
			...b,
			drugName: drugLabel(b.drug)
		}));
	}

	async function load(search?: string) {
		loading = true;
		error = null;
		try {
			const [ds, bs] = await Promise.all([
				listDrugs({ ordering: 'name' }),
				listBatches({ search: search?.trim() || undefined, ordering: 'expiry_date' })
			]);
			drugs = ds;
			rows = normalizeRows(bs);
		} catch (e: any) {
			error = e?.message ?? 'Не удалось загрузить партии';
			drugs = [];
			rows = [];
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		load();
	});

	function onQueryInput(v: string) {
		query = v;
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => load(query), 250);
	}

	function openCreate() {
		editingId = null;
		form = {
			drug: drugs[0]?.id ?? 0,
			batch_number: '',
			manufacture_date: '',
			expiry_date: '',
			quantity: 0,
			remaining_quantity: 0,
			supplier: '',
			purchase_price: '',
			location: ''
		};
		modalOpen = true;
	}

	function openEdit(r: Row) {
		editingId = r.id;
		form = {
			drug: r.drug,
			batch_number: r.batch_number,
			manufacture_date: r.manufacture_date ?? '',
			expiry_date: r.expiry_date ?? '',
			quantity: r.quantity ?? 0,
			remaining_quantity: r.remaining_quantity ?? 0,
			supplier: r.supplier ?? '',
			purchase_price: r.purchase_price ?? '',
			location: r.location ?? ''
		};
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
		saving = false;
	}

	function toNumber(v: any): number {
		const n = Number(v);
		return Number.isFinite(n) ? n : 0;
	}

	async function submit() {
		saving = true;
		error = null;
		try {
			if (!form.drug) throw new Error('Выберите препарат');
			if (!form.batch_number.trim()) throw new Error('Укажите номер партии');
			if (!form.expiry_date) throw new Error('Укажите срок годности');
			if (toNumber(form.quantity) <= 0) throw new Error('Количество должно быть > 0');

			const payload: Omit<Batch, 'id'> = {
				drug: form.drug,
				batch_number: form.batch_number.trim(),
				manufacture_date: form.manufacture_date ? form.manufacture_date : null,
				expiry_date: form.expiry_date,
				quantity: toNumber(form.quantity),
				remaining_quantity: toNumber(form.remaining_quantity ?? form.quantity),
				supplier: form.supplier ?? '',
				purchase_price: form.purchase_price ? String(form.purchase_price) : null,
				location: form.location ?? ''
			};

			if (editingId == null) {
				await createBatch(payload);
			} else {
				await updateBatch(editingId, payload);
			}
			await load(query);
			closeModal();
		} catch (e: any) {
			error = e?.message ?? 'Не удалось сохранить';
		} finally {
			saving = false;
		}
	}

	async function remove(r: Row) {
		if (!confirm(`Удалить партию “${r.batch_number}” (${r.drugName})?`)) return;
		loading = true;
		error = null;
		try {
			await deleteBatch(r.id);
			await load(query);
		} catch (e: any) {
			error = e?.message ?? 'Не удалось удалить';
		} finally {
			loading = false;
		}
	}

	function chipClass(days: number): string {
		if (days <= 14) return 'chip danger';
		if (days <= 30) return 'chip warn';
		return 'chip ok';
	}

	function daysToExpiry(dateStr: string): number {
		try {
			const today = new Date();
			const d = new Date(dateStr + 'T00:00:00');
			return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
		} catch {
			return 0;
		}
	}
</script>

<section class="wrap">
	<header class="head">
		<div>
			<h1 class="title">Партии</h1>
		</div>

		<div class="controls">
			<input
				class="input"
				value={query}
				oninput={(e) => onQueryInput((e.currentTarget as HTMLInputElement).value)}
				placeholder="Поиск по номеру партии / препарату / коду"
			/>
			<button class="btn" onclick={openCreate} disabled={loading || drugs.length === 0}>+ Добавить партию</button>
		</div>
	</header>

	{#if error}
		<div class="alert">{error}</div>
	{/if}

	<div class="table-scroll" role="region" aria-label="Таблица партий">
		<table class="table">
			<thead>
				<tr>
					<th>Препарат</th>
					<th>Партия</th>
					<th>Срок годности</th>
					<th>Остаток</th>
					<th>Поставщик</th>
					<th>Локация</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				{#if loading}
					<tr><td colspan="7" class="muted">Загрузка…</td></tr>
				{:else if rows.length === 0}
					<tr><td colspan="7" class="muted">Пусто</td></tr>
				{:else}
					{#each rows as r (r.id)}
						{@const days = daysToExpiry(r.expiry_date)}
						<tr>
							<td>{r.drugName}</td>
							<td class="mono">{r.batch_number}</td>
							<td>
								<span class={chipClass(days)} title="Дней до истечения">{r.expiry_date} · {days}д</span>
							</td>
							<td>{r.remaining_quantity}</td>
							<td class="muted">{r.supplier || '—'}</td>
							<td class="muted">{r.location || '—'}</td>
							<td class="actions">
								<button class="link" onclick={() => openEdit(r)}>Изменить</button>
								<button class="link danger" onclick={() => remove(r)}>Удалить</button>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>

	{#if modalOpen}
		<div class="overlay" role="dialog" aria-modal="true">
			<div class="modal">
				<div class="modal-head">
					<h2 class="modal-title">{editingId == null ? 'Добавить партию' : 'Редактировать партию'}</h2>
					<button class="x" onclick={closeModal} aria-label="Закрыть">✕</button>
				</div>

				<div class="grid">
					<label class="field">
						<span class="label">Препарат</span>
						<select class="input" bind:value={form.drug}>
							{#each drugs as d (d.id)}
								<option value={d.id}>{d.name} ({d.code})</option>
							{/each}
						</select>
					</label>

					<label class="field">
						<span class="label">Номер партии</span>
						<input class="input" bind:value={form.batch_number} />
					</label>

					<label class="field">
						<span class="label">Дата производства (опц.)</span>
						<input class="input" type="date" bind:value={form.manufacture_date} />
					</label>

					<label class="field">
						<span class="label">Срок годности</span>
						<input class="input" type="date" bind:value={form.expiry_date} />
					</label>

					<label class="field">
						<span class="label">Количество</span>
						<input class="input" type="number" min="0" bind:value={form.quantity} />
					</label>

					<label class="field">
						<span class="label">Остаток</span>
						<input class="input" type="number" min="0" bind:value={form.remaining_quantity} />
					</label>

					<label class="field">
						<span class="label">Поставщик</span>
						<input class="input" bind:value={form.supplier} />
					</label>

					<label class="field">
						<span class="label">Закупочная цена (опц.)</span>
						<input class="input" inputmode="decimal" placeholder="например 12.50" bind:value={form.purchase_price} />
					</label>

					<label class="field full">
						<span class="label">Локация</span>
						<input class="input" bind:value={form.location} placeholder="Склад / стеллаж / полка" />
					</label>
				</div>

				<div class="modal-actions">
					<button class="btn ghost" onclick={closeModal} disabled={saving}>Отмена</button>
					<button class="btn" onclick={submit} disabled={saving}>
						{saving ? 'Сохранение…' : 'Сохранить'}
					</button>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.wrap { padding: 2vw; }
	.head { display:flex; justify-content: space-between; align-items: flex-end; gap: 1rem; flex-wrap: wrap; }
	.title { margin: 0; font-size: 2rem; }
	.muted { color: #6b7280; }
	.controls { display:flex; gap: .75rem; align-items: center; flex-wrap: wrap; }
	.input { padding: .75rem 1rem; border: 1px solid #e5e7eb; border-radius: 12px; min-width: 260px; font-size: 1rem; background: white; }
	select.input { min-width: 320px; }
	.btn { padding: .75rem 1rem; border: 0; border-radius: 12px; background: #5B89FF; color: white; font-weight: 600; cursor: pointer; }
	.btn:disabled { opacity: .6; cursor: default; }
	.btn.ghost { background: #eef2ff; color: #1f2937; }
	.alert { margin: 1rem 0; padding: .75rem 1rem; border-radius: 12px; background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; }
	.table-scroll { margin-top: 1rem; overflow: auto; border: 1px solid #e5e7eb; border-radius: 16px; background: white; }
	.table { width: 100%; border-collapse: collapse; min-width: 960px; }
	thead th { text-align:left; font-weight: 700; padding: .75rem 1rem; border-bottom: 1px solid #e5e7eb; background: #fbfbfb; }
	tbody td { padding: .75rem 1rem; border-bottom: 1px solid #f1f5f9; }
	tbody tr:hover { background: #f8fafc; }
	.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
	.actions { text-align: right; white-space: nowrap; }
	.link { background: transparent; border: 0; padding: .25rem .5rem; cursor: pointer; color: #2563eb; font-weight: 600; }
	.link.danger { color: #dc2626; }
	.chip { display:inline-block; padding: .25rem .5rem; border-radius: 999px; font-weight: 700; font-size: .9rem; }
	.chip.ok { background: #ecfeff; color: #155e75; }
	.chip.warn { background: #fff7ed; color: #9a3412; }
	.chip.danger { background: #fef2f2; color: #991b1b; }
	.overlay { position: fixed; inset: 0; background: rgba(15,23,42,.5); display:flex; align-items:center; justify-content:center; padding: 1rem; z-index: 100; }
	.modal { width: 840px; max-width: 100%; background: white; border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 1rem; }
	.modal-head { display:flex; justify-content: space-between; align-items:center; }
	.modal-title { margin: .25rem 0 0; font-size: 1.25rem; }
	.x { border: 0; background: transparent; cursor: pointer; font-size: 1.25rem; padding: .25rem .5rem; }
	.grid { display:grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin-top: 1rem; }
	.field { display:flex; flex-direction: column; gap: .35rem; }
	.field.full { grid-column: 1 / -1; }
	.label { font-size: .9rem; color: #374151; font-weight: 600; }
	.modal-actions { display:flex; justify-content:flex-end; gap: .75rem; margin-top: 1rem; }
	@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } .field.full { grid-column:auto; } .input { min-width: 0; width: 100%; } select.input { width: 100%; } }
</style>
