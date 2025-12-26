<script lang="ts">
	import { onMount } from 'svelte';
	import { listDrugs, createDrug, updateDrug, deleteDrug, type Drug } from '$lib/api/drugs';
	import { listBatches, type Batch } from '$lib/api/batches';

	type DrugRow = Drug & { total_remaining: number };

	let query = $state('');
	let loading = $state(false);
	let error = $state<string | null>(null);

	let rows = $state<DrugRow[]>([]);

	// modal
	let modalOpen = $state(false);
	let saving = $state(false);
	let editingId = $state<number | null>(null);
	let form = $state({ name: '', dosage_form: '', unit: '', code: '' });

	let debounceTimer: any = null;

	async function load(search?: string) {
		loading = true;
		error = null;
		try {
			const [drugs, batches] = await Promise.all([
				listDrugs({ search: search?.trim() || undefined, ordering: 'name' }),
				listBatches({ ordering: 'expiry_date' })
			]);

			const totals = new Map<number, number>();
			for (const b of batches) {
				totals.set(b.drug, (totals.get(b.drug) ?? 0) + (b.remaining_quantity ?? 0));
			}

			rows = drugs.map((d) => ({
				...d,
				total_remaining: totals.get(d.id) ?? 0
			}));
		} catch (e: any) {
			error = e?.message ?? 'Не удалось загрузить каталог';
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
		form = { name: '', dosage_form: '', unit: '', code: '' };
		modalOpen = true;
	}

	function openEdit(d: DrugRow) {
		editingId = d.id;
		form = { name: d.name, dosage_form: d.dosage_form, unit: d.unit, code: d.code };
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
		saving = false;
	}

	async function submit() {
		saving = true;
		error = null;
		try {
			const payload = {
				name: form.name.trim(),
				dosage_form: form.dosage_form.trim(),
				unit: form.unit.trim(),
				code: form.code.trim()
			};

			if (!payload.name || !payload.dosage_form || !payload.unit || !payload.code) {
				throw new Error('Заполните все поля');
			}

			if (editingId == null) {
				await createDrug(payload);
			} else {
				await updateDrug(editingId, payload);
			}
			await load(query);
			closeModal();
		} catch (e: any) {
			error = e?.message ?? 'Не удалось сохранить';
		} finally {
			saving = false;
		}
	}

	async function remove(d: DrugRow) {
		if (!confirm(`Удалить препарат “${d.name}”?`)) return;
		loading = true;
		error = null;
		try {
			await deleteDrug(d.id);
			await load(query);
		} catch (e: any) {
			error = e?.message ?? 'Не удалось удалить';
		} finally {
			loading = false;
		}
	}
</script>

<section class="wrap">
	<header class="head">
		<div>
			<h1 class="title">Каталог препаратов</h1>
		</div>

		<div class="controls">
			<input
				class="input"
				value={query}
				oninput={(e) => onQueryInput((e.currentTarget as HTMLInputElement).value)}
				placeholder="Поиск по названию / коду"
			/>
			<button class="btn" onclick={openCreate} disabled={loading}>+ Добавить препарат</button>
		</div>
	</header>

	{#if error}
		<div class="alert">{error}</div>
	{/if}

	<div class="table-scroll" role="region" aria-label="Таблица каталога">
		<table class="table">
			<thead>
				<tr>
					<th>Код</th>
					<th>Название</th>
					<th>Форма</th>
					<th>Ед.</th>
					<th>Остаток (сумма по партиям)</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				{#if loading}
					<tr><td colspan="6" class="muted">Загрузка…</td></tr>
				{:else if rows.length === 0}
					<tr><td colspan="6" class="muted">Пусто</td></tr>
				{:else}
					{#each rows as r (r.id)}
						<tr>
							<td class="mono">{r.code}</td>
							<td>{r.name}</td>
							<td class="muted">{r.dosage_form}</td>
							<td class="muted">{r.unit}</td>
							<td>{r.total_remaining}</td>
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
					<h2 class="modal-title">{editingId == null ? 'Добавить препарат' : 'Редактировать препарат'}</h2>
					<button class="x" onclick={closeModal} aria-label="Закрыть">✕</button>
				</div>

				<div class="grid">
					<label class="field">
						<span class="label">Название</span>
						<input class="input" bind:value={form.name} />
					</label>
					<label class="field">
						<span class="label">Форма выпуска</span>
						<input class="input" bind:value={form.dosage_form} />
					</label>
					<label class="field">
						<span class="label">Единица измерения</span>
						<input class="input" bind:value={form.unit} />
					</label>
					<label class="field">
						<span class="label">Код</span>
						<input class="input" bind:value={form.code} />
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
	.input { padding: .75rem 1rem; border: 1px solid #e5e7eb; border-radius: 12px; min-width: 260px; font-size: 1rem; }
	.btn { padding: .75rem 1rem; border: 0; border-radius: 12px; background: #5B89FF; color: white; font-weight: 600; cursor: pointer; }
	.btn:disabled { opacity: .6; cursor: default; }
	.btn.ghost { background: #eef2ff; color: #1f2937; }
	.alert { margin: 1rem 0; padding: .75rem 1rem; border-radius: 12px; background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; }
	.table-scroll { margin-top: 1rem; overflow: auto; border: 1px solid #e5e7eb; border-radius: 16px; background: white; }
	.table { width: 100%; border-collapse: collapse; min-width: 720px; }
	thead th { text-align:left; font-weight: 700; padding: .75rem 1rem; border-bottom: 1px solid #e5e7eb; background: #fbfbfb; }
	tbody td { padding: .75rem 1rem; border-bottom: 1px solid #f1f5f9; }
	tbody tr:hover { background: #f8fafc; }
	.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
	.actions { text-align: right; white-space: nowrap; }
	.link { background: transparent; border: 0; padding: .25rem .5rem; cursor: pointer; color: #2563eb; font-weight: 600; }
	.link.danger { color: #dc2626; }
	.overlay { position: fixed; inset: 0; background: rgba(15,23,42,.5); display:flex; align-items:center; justify-content:center; padding: 1rem; z-index: 100; }
	.modal { width: 720px; max-width: 100%; background: white; border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.2); padding: 1rem; }
	.modal-head { display:flex; justify-content: space-between; align-items:center; }
	.modal-title { margin: .25rem 0 0; font-size: 1.25rem; }
	.x { border: 0; background: transparent; cursor: pointer; font-size: 1.25rem; padding: .25rem .5rem; }
	.grid { display:grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin-top: 1rem; }
	.field { display:flex; flex-direction: column; gap: .35rem; }
	.label { font-size: .9rem; color: #374151; font-weight: 600; }
	.modal-actions { display:flex; justify-content:flex-end; gap: .75rem; margin-top: 1rem; }
	@media (max-width: 720px) { .grid { grid-template-columns: 1fr; } .input { min-width: 0; width: 100%; } }
</style>
