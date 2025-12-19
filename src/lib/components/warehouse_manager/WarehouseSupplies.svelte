<script lang="ts">
  type Supply = { id: string; supplier: string; eta: string; items: number; status: string; };
  const rows: Supply[] = [
    { id: 'S-1021', supplier: 'ООО “ВетСнаб”', eta: '20.12.2025', items: 64, status: 'В пути' },
    { id: 'S-1020', supplier: '“AgroMed”', eta: '21.12.2025', items: 22, status: 'Создано' }
  ];

  function openSupply(id: string) {
    console.log('[warehouse] open supply', id);
  }

  function createSupply() {
    console.log('[warehouse] create supply');
  }
</script>

<section class="wrap">
  <header class="head">
    <div>
      <h1 class="section-title">Поставки</h1>
      <p class="muted">Очередь поставок (макет)</p>
    </div>
    <button class="btn" onclick={createSupply}>+ Новая поставка</button>
  </header>

  <div class="table-scroll" tabindex="0" role="region" aria-label="Таблица поставок">
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Поставщик</th>
          <th>Ожидается</th>
          <th>Позиций</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each rows as r (r.id)}
          <tr>
            <td class="mono">{r.id}</td>
            <td class="nowrap">{r.supplier}</td>
            <td>{r.eta}</td>
            <td>{r.items}</td>
            <td>{r.status}</td>
            <td class="right"><button class="link" onclick={() => openSupply(r.id)}>Открыть</button></td>
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
  .nowrap { white-space: nowrap; }
  .right { text-align: right; }
  .link { background: none; border: none; cursor: pointer; color: var(--primary-color); font: inherit; padding: 0; }
  .link:hover { text-decoration: underline; }
  @media (max-width: 980px){ .table { min-width: 88vw; } }
</style>
