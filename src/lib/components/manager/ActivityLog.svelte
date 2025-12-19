<script lang="ts">
  const activities = [
    { date: '2024-07-26 10:30:00', user: 'Иванов И.И.', action: 'Выдача', object: 'Цефтриаксон (флакон)', description: 'Выдано 5 флаконов цефтриаксона для пациента "Рекс"' },
    { date: '2024-07-26 09:15:00', user: 'Петров А.В.', action: 'Приемка', object: 'Амоксициллин (упаковка)', description: 'Принято 20 упаковок амоксициллина от поставщика "ВетФарм"' },
    { date: '2024-07-25 16:45:00', user: 'Сидорова Е.Н.', action: 'Обновление', object: 'Пользователь "Петров А.В."', description: 'Обновлена роль пользователя "Петров А.В." на "Ветеринар"' },
    { date: '2024-07-25 14:00:00', user: 'Иванов И.И.', action: 'Создание', object: 'Новый препарат "Вакцина"', description: 'Добавлен новый препарат "Вакцина" в каталог' },
    { date: '2024-07-24 11:20:00', user: 'Сидорова Е.Н.', action: 'Удаление', object: 'Партия "Парацетамол"', description: 'Удалена партия "Парацетамол" по истечении срока годности' },
  ];
</script>

<div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
  <h1 style="margin-bottom: 0.5rem;">Журнал действий</h1>
  <p style="color: #666; margin-bottom: 2rem;">История всех операций в системе</p>
  
  <!-- Фильтры -->
  <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
    <select style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif; min-width: 150px;">
      <option>Все время</option>
      <option>Сегодня</option>
      <option>Неделя</option>
      <option>Месяц</option>
    </select>
    <select style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif; min-width: 150px;">
      <option>Все пользователи</option>
      <option>Иванов И.И.</option>
      <option>Петров А.В.</option>
      <option>Сидорова Е.Н.</option>
    </select>
    <select style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif; min-width: 150px;">
      <option>Все действия</option>
      <option>Выдача</option>
      <option>Приемка</option>
      <option>Создание</option>
      <option>Обновление</option>
      <option>Удаление</option>
    </select>
    <input 
      type="text" 
      placeholder="Поиск по описанию..." 
      style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif; min-width: 200px;"
    />
  </div>
  
  <!-- Таблица действий -->
  <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Дата и время</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Пользователь</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Тип действия</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Объект</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Описание</th>
        </tr>
      </thead>
      <tbody>
        {#each activities as activity}
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 1rem;">{activity.date}</td>
            <td style="padding: 1rem;">{activity.user}</td>
            <td style="padding: 1rem;">
              <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">{activity.action}</span>
            </td>
            <td style="padding: 1rem;">{activity.object}</td>
            <td style="padding: 1rem;">{activity.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <!-- Пагинация -->
  <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem;">
    <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">‹ Предыдущая</button>
    <button style="background: #5B89FF; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem;">1</button>
    <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">2</button>
    <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">3</button>
    <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Следующая ›</button>
  </div>
</div>