<!-- src\lib\components\vet\Notifications.svelte -->
<script lang="ts">
  let notifications = $state([
    { id: 1, type: 'warning', title: 'Низкий запас препарата', description: 'Антибиотик "Байтрил" - осталось 8 ед.', read: false },
    { id: 2, type: 'alert', title: 'Просроченный препарат', description: 'Вакцина "Нобиван" - истекает через 3 дня', read: false },
    { id: 3, type: 'info', title: 'Новая поставка', description: 'Поступила партия витаминов "Гамавит" - 150 ед.', read: false }
  ]);
  
  let readNotifications = $state([
    { id: 4, type: 'info', title: 'Завершена инвентаризация', description: 'Завершена инвентаризация склада А', date: '26.07.2024', read: true },
    { id: 5, type: 'info', title: 'Обновлен каталог препаратов', description: 'Обновлен каталог препаратов', date: '25.07.2024', read: true },
    { id: 6, type: 'info', title: 'Новый пользователь', description: 'Добавлен новый пользователь: Петров А.В.', date: '24.07.2024', read: true }
  ]);
  
  const markAsRead = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      readNotifications = [...readNotifications, { ...notification, date: new Date().toLocaleDateString('ru-RU') }];
      notifications = notifications.filter(n => n.id !== id);
    }
  };
  
  const markAllAsRead = () => {
    const now = new Date().toLocaleDateString('ru-RU');
    const newlyRead = notifications.map(n => ({ ...n, read: true, date: now }));
    readNotifications = [...readNotifications, ...newlyRead];
    notifications = [];
  };
</script>

<div class="container">
  <div class="header">
    <div>
      <h1 class="title">Уведомления</h1>
      <p class="subtitle">Системные уведомления и предупреждения</p>
    </div>
    {#if notifications.length > 0}
      <button 
        onclick={markAllAsRead}
        class="mark-all-btn"
      >
        Отметить все как прочитанные
      </button>
    {/if}
  </div>
  
  <!-- Новые уведомления -->
  {#if notifications.length > 0}
    <div class="new-notifications">
      <h2 class="section-title">Новые уведомления ({notifications.length})</h2>
      <div class="notifications-list">
        {#each notifications as notification}
          <div class="notification-item {notification.type}">
            <div class="notification-content">
              <div class="notification-header">
                <span class="notification-icon">
                  {notification.type === 'warning' ? '⚠️' : 
                   notification.type === 'alert' ? '🚨' : '📦'}
                </span>
                <span class="notification-title">{notification.title}</span>
              </div>
              <p class="notification-description">{notification.description}</p>
            </div>
            <button 
              onclick={() => markAsRead(notification.id)}
              class="notification-btn"
            >
              Прочитано
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  
  <!-- Прочитанные уведомления -->
  <div class="read-notifications">
    <h2 class="section-title">Прочитанные уведомления</h2>
    <div class="notifications-table-container">
      <table class="notifications-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тип</th>
            <th>Заголовок</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {#each readNotifications as notification}
            <tr>
              <td>{notification.date}</td>
              <td>
                <span class="type-badge {notification.type}">
                  {notification.type === 'warning' ? 'Предупреждение' : 
                   notification.type === 'alert' ? 'Важно' : 'Информация'}
                </span>
              </td>
              <td>{notification.title}</td>
              <td class="description-cell">{notification.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .container {
    padding: 2vw 1.5vw;
    font-family: 'Montserrat', sans-serif;
    max-width: 100%;
    box-sizing: border-box;
    min-height: 80vh;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2vw;
    flex-wrap: wrap;
    gap: 1vw;
  }
  
  .title {
    font-size: clamp(1.5rem, 2vw, 2.5rem);
    margin-bottom: 0.5vw;
    color: #333;
    font-weight: 700;
  }
  
  .subtitle {
    color: #666;
    font-size: clamp(0.875rem, 1vw, 1.125rem);
  }
  
  .mark-all-btn {
    background: #5B89FF;
    color: white;
    border: none;
    border-radius: 0.5vw;
    padding: 0.8vw 1.5vw;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
    white-space: nowrap;
    transition: background 0.2s ease;
  }
  
  .mark-all-btn:hover {
    background: #3A70F8;
  }
  
  .new-notifications {
    margin-bottom: 2vw;
  }
  
  .section-title {
    margin-bottom: 1vw;
    color: #374151;
    font-size: clamp(1rem, 1.1vw, 1.3rem);
    font-weight: 600;
  }
  
  .notifications-list {
    display: grid;
    gap: 1vw;
  }
  
  .notification-item {
    border-radius: 0.8vw;
    padding: 1.2vw;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1vw;
    transition: transform 0.2s ease;
  }
  
  .notification-item:hover {
    transform: translateY(-0.1vw);
  }
  
  .notification-item.warning {
    background: #fffbeb;
    border: 1px solid #fde68a;
  }
  
  .notification-item.alert {
    background: #fef2f2;
    border: 1px solid #fecaca;
  }
  
  .notification-item.info {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
  }
  
  .notification-content {
    flex: 1;
  }
  
  .notification-header {
    display: flex;
    align-items: center;
    gap: 0.5vw;
    margin-bottom: 0.5vw;
  }
  
  .notification-icon {
    font-size: clamp(1rem, 1.2vw, 1.5rem);
  }
  
  .notification-title {
    font-weight: 600;
    font-size: clamp(0.85rem, 0.95vw, 1.1rem);
  }
  
  .notification-description {
    margin: 0;
    color: #666;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
  }
  
  .notification-btn {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.4vw;
    padding: 0.6vw 1vw;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.7rem, 0.8vw, 0.9rem);
    white-space: nowrap;
    transition: all 0.2s ease;
  }
  
  .notification-btn:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
  
  .read-notifications {
    margin-top: 2vw;
  }
  
  .notifications-table-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 0.8vw;
    box-shadow: 0 0.1vw 0.4vw rgba(0,0,0,0.08);
  }
  
  .notifications-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;
  }
  
  .notifications-table th {
    background: #f9fafb;
    padding: 1vw;
    text-align: left;
    font-weight: 500;
    color: #374151;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
    border-bottom: 1px solid #e5e7eb;
  }
  
  .notifications-table td {
    padding: 1vw;
    border-bottom: 1px solid #f3f4f6;
    color: #4b5563;
    font-size: clamp(0.7rem, 0.8vw, 0.9rem);
  }
  
  .notifications-table tr:hover {
    background-color: #f9fafb;
  }
  
  .type-badge {
    padding: 0.3vw 0.6vw;
    border-radius: 0.3vw;
    font-size: clamp(0.65rem, 0.75vw, 0.85rem);
    display: inline-block;
    white-space: nowrap;
  }
  
  .type-badge.warning {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fde68a;
  }
  
  .type-badge.alert {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }
  
  .type-badge.info {
    background: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }
  
  .description-cell {
    max-width: 20vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .container {
      padding: 3vw;
    }
    
    .header {
      flex-direction: column;
      gap: 2vw;
    }
    
    .mark-all-btn {
      width: 100%;
      padding: 1.2vw;
    }
    
    .notification-item {
      flex-direction: column;
      gap: 1.5vw;
      padding: 2vw;
    }
    
    .notification-btn {
      width: 100%;
      padding: 1vw;
    }
    
    .notifications-table-container {
      margin: 0 -3vw;
      width: calc(100% + 6vw);
    }
    
    .notifications-table {
      min-width: 800px;
    }
    
    .description-cell {
      max-width: 30vw;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 4vw;
    }
    
    .notification-item {
      padding: 3vw;
    }
    
    .notifications-table th,
    .notifications-table td {
      padding: 1.5vw;
    }
  }
</style>