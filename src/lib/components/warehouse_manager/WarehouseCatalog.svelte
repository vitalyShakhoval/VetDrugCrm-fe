<script lang="ts">
  type Item = { sku: string; name: string; category: string; qty: number };

  let query = $state('');

  const items: Item[] = [
    { sku: 'MED-001', name: 'Вакцина (пример)', category: 'Вакцины', qty: 120 },
    { sku: 'MED-014', name: 'Антисептик (пример)', category: 'Расходники', qty: 340 },
    { sku: 'MED-203', name: 'Шприцы (пример)', category: 'Расходники', qty: 900 }
  ];

  const filtered = $derived.by((): Item[] => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((i) =>
      `${i.sku} ${i.name} ${i.category}`.toLowerCase().includes(q)
    );
  });
</script>

<section class="wrap">
  <header class="head">
    <div>
      <h1 class="section-title">Каталог</h1>
      <p class="muted">Список товаров (макет)</p>
    </div>

    <div class="controls">
      <input class="input" bind:value={query} placeholder="Поиск по SKU/названию/категории" />
      <button class="btn">+ Добавить</button>
    </div>
  </header>

  <div class="table-scroll" role="region" aria-label="Таблица каталога">
  <table class="table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Остаток</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each filtered as row (row.sku)}
          <tr>
            <td class="mono">{row.sku}</td>
            <td>{row.name}</td>
            <td>{row.category}</td>
            <td>{row.qty}</td>
            <td class="right">
              <button class="link">Открыть</button>
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
  .controls { display: flex; gap: 0.8vw; flex-wrap: wrap; align-items: center; }
  .input {
    width: max(28vw, 24vh);
    padding: 1vh 1vw;
    border-radius: var(--border-radius-md);
    border: var(--line) solid var(--border-color);
    font-size: var(--text-sm);
    font-family: var(--font-family);
    outline: none;
    background: var(--bg-white);
  }
  .input:focus { border-color: var(--primary-color); box-shadow: 0 0 0 max(0.2vw,0.25vh) rgba(91,137,255,0.12); }
  .btn {
    border: none; cursor: pointer;
    padding: 1vh 1.2vw;
    border-radius: var(--border-radius-md);
    font-family: var(--font-family);
    font-size: var(--text-sm);
    background: var(--primary-color);
    color: white;
  }
  .btn:hover { background: var(--primary-hover); }
  .table-scroll { overflow: auto; border-radius: var(--border-radius-md); border: var(--line) solid var(--border-light); }
  .table { width: 100%; border-collapse: collapse; min-width: 55vw; background: var(--bg-white); }
  th, td { padding: 1vh 1vw; border-bottom: var(--line) solid var(--border-light); font-size: var(--text-sm); }
  th { position: sticky; top: 0; background: rgba(251,251,251,0.9); color: var(--text-secondary); text-align: left; }
  .mono { font-variant-numeric: tabular-nums; }
  .right { text-align: right; }
  .link { background: none; border: none; cursor: pointer; color: var(--primary-color); font: inherit; }
  .link:hover { text-decoration: underline; }
  @media (max-width: 980px){ .table { min-width: 88vw; } .input { width: 70vw; } }
</style>
