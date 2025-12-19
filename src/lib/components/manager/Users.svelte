<div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
    <div>
      <h1 style="margin-bottom: 0.5rem;">Управление пользователями</h1>
      <p style="color: #666;">Управление учетными записями пользователей системы</p>
    </div>
    <button style="background: #5B89FF; color: white; border: none; border-radius: 8px; padding: 0.75rem 1.5rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
      ➕ Добавить пользователя
    </button>
  </div>
  
  <!-- Поиск -->
  <div style="margin-bottom: 1.5rem;">
    <input 
      type="text" 
      placeholder="Искать пользователей..." 
      style="width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
    />
  </div>
  
  <!-- Таблица пользователей -->
  <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Имя</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Email</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Роль</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Статус</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Последний вход</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 1rem;">Иванов Иван</td>
          <td style="padding: 1rem;">ivanov@vetclinic.ru</td>
          <td style="padding: 1rem;">
            <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">Администратор</span>
          </td>
          <td style="padding: 1rem;">
            <span style="background: #d1fae5; color: #065f46; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">Активен</span>
          </td>
          <td style="padding: 1rem;">2024-07-28 10:30</td>
          <td style="padding: 1rem;">
            <button style="background: none; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.25rem 0.5rem; margin-right: 0.5rem; cursor: pointer;">✏️</button>
            <button style="background: none; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.25rem 0.5rem; cursor: pointer;">🗑️</button>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 1rem;">Петрова Анна</td>
          <td style="padding: 1rem;">anna.petrova@vetclinic.ru</td>
          <td style="padding: 1rem;">
            <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">Ветеринар</span>
          </td>
          <td style="padding: 1rem;">
            <span style="background: #d1fae5; color: #065f46; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem;">Активен</span>
          </td>
          <td style="padding: 1rem;">2024-07-28 09:15</td>
          <td style="padding: 1rem;">
            <button style="background: none; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.25rem 0.5rem; margin-right: 0.5rem; cursor: pointer;">✏️</button>
            <button style="background: none; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.25rem 0.5rem; cursor: pointer;">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- Пагинация -->
  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; color: #666;">
    <div>
      Показано 1-2 из 7 пользователей
    </div>
    <div style="display: flex; gap: 0.5rem;">
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">‹ Предыдущая</button>
      <button style="background: #5B89FF; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem;">1</button>
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">2</button>
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Следующая ›</button>
    </div>
  </div>
</div>