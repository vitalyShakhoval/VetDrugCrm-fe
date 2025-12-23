<script lang="ts">
  export type NotificationLevel = 'info' | 'warning' | 'alert';

  export type NotificationUnread = {
    id: string | number;
    level: NotificationLevel;
    title: string;
    description: string;
    time?: string; // e.g. "10:24" or "Вчера"
  };

  export type NotificationRead = NotificationUnread & {
    date: string; // e.g. "26.07.2024"
  };

  type Props = {
    title?: string;
    subtitle?: string;
    initialUnread?: NotificationUnread[];
    initialRead?: NotificationRead[];
    showImportantToggle?: boolean;
  };

  let {
    title = 'Уведомления',
    subtitle = 'Системные уведомления и предупреждения',
    initialUnread = [],
    initialRead = [],
    showImportantToggle = true
  }: Props = $props();

  let onlyImportant = $state(false);
  let unread = $state<NotificationUnread[]>(initialUnread);
  let read = $state<NotificationRead[]>(initialRead);

  const importantFiltered = $derived.by(() => {
    if (!showImportantToggle || !onlyImportant) return unread;
    return unread.filter((n) => n.level !== 'info');
  });

  const levelMeta = (level: NotificationLevel) => {
    if (level === 'warning') return { icon: '⚠️', label: 'Предупреждение' };
    if (level === 'alert') return { icon: '🚨', label: 'Важно' };
    return { icon: 'ℹ️', label: 'Информация' };
  };

  const nowRu = () => new Date().toLocaleDateString('ru-RU');

  function markAsRead(id: string | number) {
    const note = unread.find((n) => n.id === id);
    if (!note) return;
    read = [{ ...note, date: nowRu() }, ...read];
    unread = unread.filter((n) => n.id !== id);
  }

  function markAllAsRead() {
    const date = nowRu();
    const moved = unread.map((n) => ({ ...n, date }));
    read = [...moved, ...read];
    unread = [];
  }
</script>

<section class="nt-wrap">
  <header class="nt-head">
    <div>
      <h1 class="nt-title">{title}</h1>
      <p class="nt-subtitle">{subtitle}</p>
    </div>

    <div class="nt-actions">
      {#if showImportantToggle}
        <label class="nt-toggle">
          <input type="checkbox" bind:checked={onlyImportant} />
          <span>Только важные</span>
        </label>
      {/if}

      {#if unread.length > 0}
        <button type="button" class="nt-btn" onclick={markAllAsRead}>
          Отметить все как прочитанные
        </button>
      {/if}
    </div>
  </header>

  {#if importantFiltered.length > 0}
    <div class="nt-block">
      <h2 class="nt-section">Новые уведомления ({importantFiltered.length})</h2>

      <div class="nt-list">
        {#each importantFiltered as n (n.id)}
          {@const meta = levelMeta(n.level)}
          <article class="nt-card {n.level}">
            <div class="nt-card-body">
              <div class="nt-card-top">
                <div class="nt-card-title">
                  <span class="nt-ico" aria-hidden="true">{meta.icon}</span>
                  <span>{n.title}</span>
                </div>
                {#if n.time}
                  <div class="nt-time">{n.time}</div>
                {/if}
              </div>
              <p class="nt-desc">{n.description}</p>
            </div>

            <button type="button" class="nt-link" onclick={() => markAsRead(n.id)}>
              Прочитано
            </button>
          </article>
        {/each}
      </div>
    </div>
  {/if}

  <div class="nt-block">
    <h2 class="nt-section">Прочитанные уведомления</h2>

    <div class="nt-table-wrap" role="region" aria-label="Прочитанные уведомления">
      <table class="nt-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тип</th>
            <th>Заголовок</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {#if read.length === 0}
            <tr>
              <td colspan="4" class="nt-empty">Пока нет прочитанных уведомлений</td>
            </tr>
          {:else}
            {#each read as n (n.id)}
              {@const meta = levelMeta(n.level)}
              <tr>
                <td class="nt-muted">{n.date}</td>
                <td>
                  <span class="nt-badge {n.level}">{meta.label}</span>
                </td>
                <td>{n.title}</td>
                <td class="nt-ellipsis">{n.description}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  @import '$lib/workspace.css';

  .nt-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.4vw;
    font-family: var(--font-family);
    padding: 1vw;
    box-sizing: border-box;
  }

  .nt-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1vw;
    flex-wrap: wrap;
  }

  .nt-title {
    margin: 0;
    font-size: max(1.6vw, 2.6vh);
    color: var(--text-primary);
    font-weight: 800;
  }

  .nt-subtitle {
    margin: 0.35vh 0 0;
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .nt-actions {
    display: flex;
    align-items: center;
    gap: 0.9vw;
    flex-wrap: wrap;
  }

  .nt-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.6vw;
    cursor: pointer;
    user-select: none;
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .nt-btn {
    background: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: var(--border-radius-md);
    padding: 0.8vw 1.2vw;
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--text-sm);
    transition: background 0.2s ease;
    white-space: nowrap;
  }

  .nt-btn:hover { background: var(--primary-hover); }

  .nt-block { display: flex; flex-direction: column; gap: 0.9vw; }

  .nt-section {
    margin: 0;
    color: #374151;
    font-size: var(--text-md);
    font-weight: 700;
  }

  .nt-list { display: flex; flex-direction: column; gap: 0.9vw; }

  .nt-card {
    display: flex;
    justify-content: space-between;
    gap: 1vw;
    align-items: flex-start;
    background: var(--bg-white);
    border-radius: var(--border-radius-md);
    border: var(--line) solid var(--border-color);
    box-shadow: var(--shadow-sm);
    padding: 1.2vw;
    position: relative;
    overflow: hidden;
  }

  .nt-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: max(0.22vw, 0.25vh);
    background: rgba(91, 137, 255, 0.55);
  }
  .nt-card.warning::before { background: rgba(245, 158, 11, 0.75); }
  .nt-card.alert::before { background: rgba(255, 71, 87, 0.75); }

  .nt-card-body { flex: 1; }

  .nt-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1vw;
  }

  .nt-card-title {
    display: inline-flex;
    align-items: center;
    gap: 0.6vw;
    font-weight: 800;
    color: var(--text-primary);
    font-size: var(--text-md);
  }

  .nt-ico { font-size: max(1.1vw, 1.8vh); }
  .nt-time { color: var(--text-muted); font-size: var(--text-xs); white-space: nowrap; }

  .nt-desc {
    margin: 0.6vh 0 0;
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .nt-link {
    background: rgba(255, 255, 255, 0.9);
    border: var(--line) solid var(--border-color);
    border-radius: var(--border-radius-md);
    padding: 0.7vw 1vw;
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--text-sm);
    transition: background 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;
  }
  .nt-link:hover { background: #f9fafb; border-color: #d1d5db; }

  .nt-table-wrap {
    width: 100%;
    overflow: auto;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
  }

  .nt-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 760px;
    background: var(--bg-white);
  }

  .nt-muted { color: var(--text-muted); }

  .nt-badge {
    display: inline-block;
    padding: 0.25vw 0.6vw;
    border-radius: 999px;
    font-size: var(--text-xs);
    border: var(--line) solid var(--border-color);
    background: #f3f4f6;
    color: #4b5563;
    white-space: nowrap;
  }

  .nt-badge.warning {
    background: #fffbeb;
    border-color: #fde68a;
    color: #92400e;
  }

  .nt-badge.alert {
    background: #fef2f2;
    border-color: #fecaca;
    color: #991b1b;
  }

  .nt-ellipsis {
    max-width: 34vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nt-empty {
    text-align: center;
    color: var(--text-muted);
    padding: 2vw 1vw;
  }

  @media (max-width: 768px) {
    .nt-wrap { padding: 2vw 1vw; }
    .nt-actions { width: 100%; justify-content: flex-start; }
    .nt-btn { width: 100%; }
    .nt-card { flex-direction: column; }
    .nt-link { width: 100%; }
    .nt-ellipsis { max-width: 55vw; }
  }
</style>
