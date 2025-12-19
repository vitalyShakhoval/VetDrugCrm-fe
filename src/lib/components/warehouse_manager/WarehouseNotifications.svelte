<script lang="ts">
  type Note = {
    id: string;
    title: string;
    text: string;
    time: string;
    level: 'info' | 'warn' | 'danger';
  };

  let onlyImportant = $state(false);

  const notes: Note[] = [
    { id: 'N-07', title: 'Низкий остаток', text: 'Антисептик “пример” — осталось 12 шт.', time: '10:24', level: 'warn' },
    { id: 'N-06', title: 'Поставка задерживается', text: 'S-1018 — задержка на 1 день.', time: '09:10', level: 'danger' },
    { id: 'N-05', title: 'Успешно принято', text: 'S-1019 — принято на склад.', time: 'Вчера', level: 'info' }
  ];

  const filtered = $derived.by((): Note[] => {
    return onlyImportant ? notes.filter((n) => n.level !== 'info') : notes;
  });

  function markRead(id: string) {
    console.log('[warehouse] mark read:', id);
  }
</script>


<section class="wrap">
  <header class="head">
    <div>
      <h1 class="section-title">Уведомления</h1>
      <p class="muted">Рабочие “заглушки”: клики, фильтр, статусы</p>
    </div>

    <label class="toggle">
      <input type="checkbox" bind:checked={onlyImportant} />
      <span class="toggle-text">Только важные</span>
    </label>
  </header>

  <div class="list">
    {#each filtered as n (n.id)}
      <article class="note {n.level}">
        <div class="note-top">
          <div class="note-title">{n.title}</div>
          <div class="note-time">{n.time}</div>
        </div>
        <div class="note-text">{n.text}</div>
        <button class="link" onclick={() => markRead(n.id)}>Отметить прочитанным</button>
      </article>
    {/each}
  </div>
</section>

<style>
  .wrap { display: flex; flex-direction: column; gap: 1.2vw; font-family: var(--font-family); }
  .head { display: flex; justify-content: space-between; gap: 1vw; align-items: center; flex-wrap: wrap; }
  .toggle { display: inline-flex; align-items: center; gap: 0.6vw; cursor: pointer; user-select: none; }
  .toggle-text { font-size: var(--text-sm); color: var(--text-secondary); }
  .list { display: flex; flex-direction: column; gap: 0.9vw; }
  .note {
    background: var(--bg-white);
    border-radius: var(--border-radius-md);
    border: var(--line) solid var(--border-light);
    box-shadow: var(--shadow-sm);
    padding: 1.2vw;
  }
  .note-top { display: flex; justify-content: space-between; gap: 1vw; align-items: center; }
  .note-title { font-weight: 800; font-size: var(--text-md); color: var(--text-primary); }
  .note-time { font-size: var(--text-xs); color: var(--text-muted); }
  .note-text { margin-top: 0.6vh; font-size: var(--text-sm); color: var(--text-secondary); }
  .link { margin-top: 0.8vh; background: none; border: none; cursor: pointer; color: var(--primary-color); font: inherit; padding: 0; }
  .link:hover { text-decoration: underline; }
  .note.info { border-left: max(0.18vw, 0.22vh) solid rgba(91, 137, 255, 0.55); }
  .note.warn { border-left: max(0.18vw, 0.22vh) solid rgba(245, 158, 11, 0.75); }
  .note.danger { border-left: max(0.18vw, 0.22vh) solid rgba(255, 71, 87, 0.75); }
</style>
