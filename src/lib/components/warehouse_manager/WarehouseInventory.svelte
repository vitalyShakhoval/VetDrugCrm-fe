<script lang="ts">
  type Row = { sku: string; name: string; expected: number; counted: number; };
  const rows: Row[] = [
    { sku: 'MED-001', name: 'Вакцина (пример)', expected: 120, counted: 118 },
    { sku: 'MED-014', name: 'Антисептик (пример)', expected: 340, counted: 340 },
    { sku: 'MED-203', name: 'Шприцы (пример)', expected: 900, counted: 905 }
  ];

  function save() {
    console.log('[warehouse] save inventory (mock)');
  }
</script>

<section class="wrap">
  <header class="head">
    <div>
      <h1 class="section-title">Инвентаризация</h1>
    </div>
    <button class="btn" onclick={save}>Сохранить</button>
  </header>

  <div class="table-scroll" tabindex="0" role="region" aria-label="Таблица инвентаризации">
    <table class="table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Название</th>
          <th>Ожидалось</th>
          <th>Посчитано</th>
          <th>Отклонение</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r (r.sku)}
          <tr>
            <td class="mono">{r.sku}</td>
            <td>{r.name}</td>
            <td>{r.expected}</td>
            <td>{r.counted}</td>
            <td class:ok={r.counted - r.expected === 0} class:bad={r.counted - r.expected !== 0}>
              {r.counted - r.expected}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  .wrap { display: flex; flex-direction: column; gap: 1.2vw; font-family: var(--font-family); }
  .head { display: flex; justify-content: space-between; gap: 1vw; flex-wrap: wrap; align-items: flex-end; }
  .btn { border: none; cursor: pointer; padding: 1vh 1.2vw; border-radius: var(--border-radius-md); font: inherit; font-size: var(--text-sm); background: var(--primary-color); color: white; }
  .btn:hover { background: var(--primary-hover); }
  .table-scroll { overflow: auto; border-radius: var(--border-radius-md); border: var(--line) solid var(--border-light); }
  .table { width: 100%; border-collapse: collapse; min-width: 60vw; background: var(--bg-white); }
  th, td { padding: 1vh 1vw; border-bottom: var(--line) solid var(--border-light); font-size: var(--text-sm); text-align: left; }
  th { position: sticky; top: 0; background: rgba(251,251,251,0.9); color: var(--text-secondary); }
  .mono { font-variant-numeric: tabular-nums; }
  .ok { color: var(--success-color); font-weight: 800; }
  .bad { color: var(--danger-color); font-weight: 800; }
  @media (max-width: 980px){ .table { min-width: 88vw; } }
</style>
