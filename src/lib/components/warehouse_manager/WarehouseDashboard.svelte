<script lang="ts">
  type Kpi = { label: string; value: string; hint: string };
  type SupplyRow = { id: string; date: string; supplier: string; items: number; status: 'В пути' | 'Принято' | 'Задержка' };

  const kpis: Kpi[] = [
    { label: 'Товаров на складе', value: '12 480', hint: 'в наличии (макет)' },
    { label: 'Ожидается поставок', value: '18', hint: 'в очереди (макет)' },
    { label: 'Уведомлений', value: '7', hint: 'за сегодня (макет)' },
    { label: 'Инвентаризация', value: '2%', hint: 'выполнено (макет)' }
  ];

  const supplies: SupplyRow[] = [
    { id: 'S-1021', date: '19.12.2025', supplier: 'ООО “ВетСнаб”', items: 64, status: 'В пути' },
    { id: 'S-1019', date: '18.12.2025', supplier: '“ФармПартнёр”', items: 120, status: 'Принято' },
    { id: 'S-1018', date: '17.12.2025', supplier: '“BioVet”', items: 48, status: 'Задержка' }
  ];

  function onQuickAction(action: string) {
    console.log('[warehouse] action:', action);
  }
</script>

<section class="wrap">
  <header class="top">
    <div>
      <h1 class="section-title">Панель склада</h1>

    </div>

    <div class="actions">
      <button class="btn" onclick={() => onQuickAction('create_supply')}>+ Новая поставка</button>
      <button class="btn btn-ghost" onclick={() => onQuickAction('start_inventory')}>Начать инвентаризацию</button>
    </div>
  </header>

  <div class="kpis">
    {#each kpis as k (k.label)}
      <article class="card">
        <div class="kpi-label">{k.label}</div>
        <div class="kpi-value">{k.value}</div>
        <div class="kpi-hint">{k.hint}</div>
      </article>
    {/each}
  </div>

  <section class="block">
    <div class="block-head">
      <h2 class="block-title">Ближайшие поставки</h2>
      <button class="link" onclick={() => onQuickAction('open_supplies')}>Открыть все</button>
    </div>

    <div class="table-scroll" role="region" aria-label="Таблица поставок" tabindex="0">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>Поставщик</th>
            <th>Позиций</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {#each supplies as row (row.id)}
            <tr>
              <td class="mono">{row.id}</td>
              <td>{row.date}</td>
              <td class="nowrap">{row.supplier}</td>
              <td>{row.items}</td>
              <td>
                <span class="pill {row.status === 'Принято' ? 'ok' : row.status === 'Задержка' ? 'bad' : 'warn'}">
                  {row.status}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</section>

<style>
  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1.6vw;
    font-family: var(--font-family);
  }

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.4vw;
    flex-wrap: wrap;
  }

  .actions {
    display: flex;
    gap: 0.8vw;
    flex-wrap: wrap;
  }

  .btn {
    border: none;
    cursor: pointer;
    padding: 1vh 1.2vw;
    border-radius: var(--border-radius-md);
    font-family: var(--font-family);
    font-size: var(--text-sm);
    background: var(--primary-color);
    color: white;
    box-shadow: var(--shadow-sm);
  }

  .btn:hover {
    background: var(--primary-hover);
  }

  .btn-ghost {
    background: rgba(91, 137, 255, 0.12);
    color: var(--primary-color);
  }

  .btn-ghost:hover {
    background: rgba(91, 137, 255, 0.18);
  }

  .kpis {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2vw;
  }

  .card {
    background: var(--bg-white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    padding: 1.2vw;
    border: var(--line) solid var(--border-light);
    min-height: 12vh;
  }

  .kpi-label {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    margin-bottom: 0.6vh;
  }

  .kpi-value {
    font-size: var(--text-lg);
    font-weight: 800;
    color: var(--text-primary);
  }

  .kpi-hint {
    margin-top: 0.6vh;
    color: var(--text-muted);
    font-size: var(--text-xs);
  }

  .block {
    background: var(--bg-white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    border: var(--line) solid var(--border-light);
    padding: 1.2vw;
  }

  .block-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1vw;
    margin-bottom: 1vh;
  }

  .block-title {
    font-size: var(--text-md);
    font-weight: 700;
    color: var(--text-primary);
  }

  .link {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-color);
    font-family: var(--font-family);
    font-size: var(--text-sm);
    padding: 0;
  }

  .link:hover {
    text-decoration: underline;
  }

  .table-scroll {
    overflow: auto;
    border-radius: var(--border-radius-md);
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    min-width: 55vw;
  }

  th, td {
    text-align: left;
    padding: 1vh 1vw;
    font-size: var(--text-sm);
    border-bottom: var(--line) solid var(--border-light);
  }

  th {
    color: var(--text-secondary);
    font-weight: 700;
    background: rgba(251, 251, 251, 0.8);
    position: sticky;
    top: 0;
  }

  .mono {
    font-variant-numeric: tabular-nums;
  }

  .nowrap {
    white-space: nowrap;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.4vh 0.8vw;
    border-radius: 50vw;
    font-size: var(--text-xs);
    font-weight: 700;
    border: var(--line) solid rgba(0,0,0,0.06);
  }

  .ok {
    background: rgba(16, 185, 129, 0.12);
    color: var(--success-color);
  }

  .warn {
    background: rgba(245, 158, 11, 0.12);
    color: var(--warning-color);
  }

  .bad {
    background: rgba(255, 71, 87, 0.12);
    color: var(--danger-color);
  }

  @media (max-width: 980px) {
    .kpis {
      grid-template-columns: repeat(2, 1fr);
    }
    .table {
      min-width: 88vw;
    }
  }

  @media (max-width: 560px) {
    .kpis {
      grid-template-columns: 1fr;
    }
  }
</style>
