<script lang="ts">
  // Функции для кнопок (оставляем на случай если где-то еще используются)
  const viewReports = () => {
    console.log('Просмотреть отчеты');
  };
  
  const addDrug = () => {
    console.log('Добавить новый препарат');
  };
  
  const registerDispense = () => {
    console.log('Зарегистрировать выдачу');
  };
  
  const manageSuppliers = () => {
    console.log('Управление поставщиками');
  };
</script>

<div style="padding: 1rem; font-family: 'Montserrat', sans-serif; max-width: 100%;">
  <h1 style="margin-bottom: 0.5rem;">Панель управления</h1>
  <p style="color: #666; margin-bottom: 1.5rem;">Обзор системы и ключевые метрики</p>
  
  <!-- Карточки с метриками -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #e3f2fd; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💊</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Всего препаратов</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #333;">2,145</div>
      <div style="color: #10b981; font-size: 0.9rem;">+10% за месяц</div>
    </div>
    
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #f3e5f5; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">👥</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Активные пользователи</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #333;">8</div>
      <div style="color: #10b981; font-size: 0.9rem;">+2 за неделю</div>
    </div>
    
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #fff3e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⚠️</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Предстоящие просрочки</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #333;">12</div>
      <div style="color: #f59e0b; font-size: 0.9rem;">+5 за неделю</div>
    </div>
    
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #e8f5e8; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🔔</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Новые уведомления</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #333;">7</div>
      <div style="color: #6b7280; font-size: 0.9rem;">Без изменений</div>
    </div>
  </div>
  
  <!-- График расхода препаратов (если нужен) -->
  <div style="background: white; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem;">Ежемесячный расход препаратов</h3>
    <p style="color: #666; margin-bottom: 1rem;">Тенденции расхода за последние 6 месяцев</p>
    <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-radius: 8px;">
      <div style="text-align: center; color: #94a3b8;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
        <p>Здесь будет график расхода препаратов</p>
        <p style="font-size: 0.875rem;">(Интеграция с графической библиотекой)</p>
      </div>
    </div>
  </div>
  
  <!-- Недавняя активность с прокруткой -->
  <div style="background: white; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem;">Недавняя активность</h3>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; min-width: 800px;">
        <thead>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <th style="padding: 0.75rem 0.5rem; text-align: left; color: #666; font-weight: 500; min-width: 150px;">Дата</th>
            <th style="padding: 0.75rem 0.5rem; text-align: left; color: #666; font-weight: 500; min-width: 150px;">Тип операции</th>
            <th style="padding: 0.75rem 0.5rem; text-align: left; color: #666; font-weight: 500; min-width: 200px;">Препарат/Поставщик</th>
            <th style="padding: 0.75rem 0.5rem; text-align: left; color: #666; font-weight: 500; min-width: 100px;">Количество</th>
            <th style="padding: 0.75rem 0.5rem; text-align: left; color: #666; font-weight: 500; min-width: 150px;">Пользователь</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 0.75rem 0.5rem;">2024-07-26 10:30</td>
            <td style="padding: 0.75rem 0.5rem;">Выдача препарата</td>
            <td style="padding: 0.75rem 0.5rem;">Антибиотик "Байтрил"</td>
            <td style="padding: 0.75rem 0.5rem; color: #ef4444;">-5</td>
            <td style="padding: 0.75rem 0.5rem;">Иванов И.И.</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 0.75rem 0.5rem;">2024-07-25 15:00</td>
            <td style="padding: 0.75rem 0.5rem;">Поступление партии</td>
            <td style="padding: 0.75rem 0.5rem;">Витамины "Гамзант"</td>
            <td style="padding: 0.75rem 0.5rem; color: #10b981;">+100</td>
            <td style="padding: 0.75rem 0.5rem;">Петрова А.В.</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 0.75rem 0.5rem;">2024-07-25 09:15</td>
            <td style="padding: 0.75rem 0.5rem;">Инвентаризация</td>
            <td style="padding: 0.75rem 0.5rem;">Склад I, Секция A</td>
            <td style="padding: 0.75rem 0.5rem;">0</td>
            <td style="padding: 0.75rem 0.5rem;">Сидоров Д.А.</td>
          </tr>
          <tr style="border-bottom: 1px solid #f3f4f6;">
            <td style="padding: 0.75rem 0.5rem;">2024-07-24 11:45</td>
            <td style="padding: 0.75rem 0.5rem;">Выдача препарата</td>
            <td style="padding: 0.75rem 0.5rem;">Обезболивающее "Мелоксикам"</td>
            <td style="padding: 0.75rem 0.5rem; color: #ef4444;">-2</td>
            <td style="padding: 0.75rem 0.5rem;">Иванов И.И.</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0.5rem;">2024-07-23 16:20</td>
            <td style="padding: 0.75rem 0.5rem;">Перемещение</td>
            <td style="padding: 0.75rem 0.5rem;">Вакцина "Нобиван"</td>
            <td style="padding: 0.75rem 0.5rem; color: #ef4444;">-10</td>
            <td style="padding: 0.75rem 0.5rem;">Петрова А.В.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>