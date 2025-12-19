<script lang="ts">
  const saveSettings = () => {
    console.log('Сохранить настройки');
  };
  
  const notifications = [
    { id: 1, type: 'critical', title: 'Критически низкий запас', message: 'Обезболивающее "Мелоксикам" - осталось 5 ед. (минимум 10)', date: '2024-10-26', read: false },
    { id: 2, type: 'warning', title: 'Скоро истекает срок', message: 'Вакцина для щенков - истекает через 10 дней', date: '2024-10-25', read: false },
    { id: 3, type: 'info', title: 'Поступление подтверждено', message: 'Партия витаминов подтверждена к доставке 28.10.2024', date: '2024-10-24', read: true },
    { id: 4, type: 'critical', title: 'Расхождение в инвентаризации', message: 'Обнаружена недостача 5 ед. антибиотика "Цефазолин"', date: '2024-10-23', read: false },
    { id: 5, type: 'warning', title: 'Температурный режим', message: 'Температура в холодильнике 1: +8°C (норма: +2°C...+6°C)', date: '2024-10-22', read: true },
  ];
  
  const markAsRead = (id: number) => {
    console.log('Отметить как прочитанное:', id);
  };
  
  // Функция для получения стилей по типу
  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'critical':
        return { bg: '#fef2f2', border: '#fecaca', color: '#dc2626' };
      case 'warning':
        return { bg: '#fffbeb', border: '#fde68a', color: '#d97706' };
      case 'info':
        return { bg: '#eff6ff', border: '#bfdbfe', color: '#2563eb' };
      default:
        return { bg: '#f9fafb', border: '#e5e7eb', color: '#374151' };
    }
  };
</script>

<div style="padding: 1rem; font-family: 'Montserrat', sans-serif; max-width: 100%;">
  <h1 style="margin-bottom: 0.5rem;">Уведомления склада</h1>
  <p style="color: #666; margin-bottom: 1.5rem;">
    {notifications.filter(n => !n.read).length} новых уведомлений
  </p>
  
  <!-- Список уведомлений -->
  <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
    {#each notifications.filter(n => !n.read) as notification}
      <div style="
        background: {getTypeStyles(notification.type).bg};
        border-left: 4px solid {getTypeStyles(notification.type).border};
        padding: 1rem;
        border-radius: 4px;
        transition: all 200ms ease;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="color: {getTypeStyles(notification.type).color}; font-weight: 600;">{notification.title}</span>
              <span style="font-size: 0.75rem; color: #6b7280;">{notification.date}</span>
            </div>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">{notification.message}</p>
          </div>
          <button 
            onclick={() => markAsRead(notification.id)}
            style="
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 4px;
              padding: 0.5rem 1rem;
              font-family: 'Montserrat', sans-serif;
              cursor: pointer;
              font-size: 0.875rem;
              margin-left: 1rem;
              transition: all 200ms ease;
            "
          >
            Прочитано
          </button>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Настройки уведомлений -->
  <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem; color: #374151;">Настройки уведомлений</h3>
    
    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.75rem; color: #4b5563; font-size: 0.9rem;">Пороги запасов</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <label for="low-stock" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">
            Низкий уровень запасов
          </label>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input id="low-stock" type="number" value="20" style="width: 100px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
            <span style="color: #6b7280; font-size: 0.875rem;">ед.</span>
          </div>
        </div>
        <div>
          <label for="critical-stock" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">
            Критический уровень запасов
          </label>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input id="critical-stock" type="number" value="10" style="width: 100px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
            <span style="color: #6b7280; font-size: 0.875rem;">ед.</span>
          </div>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.75rem; color: #4b5563; font-size: 0.9rem;">Пороги сроков годности</h4>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
          <label for="warning-expiry" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">
            Предупреждение за дней
          </label>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input id="warning-expiry" type="number" value="30" style="width: 100px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
            <span style="color: #6b7280; font-size: 0.875rem;">дн.</span>
          </div>
        </div>
        <div>
          <label for="critical-expiry" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">
            Критический срок за дней
          </label>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input id="critical-expiry" type="number" value="7" style="width: 100px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
            <span style="color: #6b7280; font-size: 0.875rem;">дн.</span>
          </div>
        </div>
      </div>
    </div>
    
    <button 
      onclick={saveSettings} 
      style="
        background: #5B89FF;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 200ms ease;
      "
    >
      💾 Сохранить настройки
    </button>
  </div>
</div>