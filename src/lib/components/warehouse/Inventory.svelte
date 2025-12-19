<script lang="ts">
  const discrepancies = [
    { id: 1, date: '2023-10-28', section: 'Склад A', drug: 'Антибиотик "Цефазолин"', system: 500, actual: 495, difference: -5, status: 'Недостача' },
    { id: 2, date: '2023-10-25', section: 'Секция B', drug: 'Вакцина "Вирокан"', system: 200, actual: 200, difference: 0, status: 'Совпадает' },
    { id: 3, date: '2023-10-24', section: 'Склад A', drug: 'Обезболивающее "Мелоксикам"', system: 150, actual: 160, difference: 10, status: 'Излишек' },
    { id: 4, date: '2023-10-23', section: 'Секция C', drug: 'Витаминный комплекс "Гамавит"', system: 300, actual: 298, difference: -2, status: 'Недостача' },
    { id: 5, date: '2023-10-22', section: 'Склад E', drug: 'Шприцы 5 мл (упаковка)', system: 1000, actual: 1000, difference: 0, status: 'Совпадает' },
  ];
  
  const addToCount = () => {
    console.log('Добавить к подсчету');
  };
  
  const startInventory = () => {
    console.log('Начать инвентаризацию');
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Недостача': return '#ef4444';
      case 'Излишек': return '#10b981';
      case 'Совпадает': return '#6b7280';
      default: return '#6b7280';
    }
  };
</script>

<div style="padding: 1rem; font-family: 'Montserrat', sans-serif; max-width: 100%;">
  <h1 style="margin-bottom: 0.5rem;">Инвентаризация</h1>
  <p style="color: #666; margin-bottom: 1.5rem;">Управление процессом инвентаризации склада</p>
  
  <!-- Быстрые действия -->
  <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
    <button 
      onclick={startInventory}
      style="
        background: #5B89FF;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.8rem 1.5rem;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        transition: all 200ms ease;
      "
    >
      📋 Начать инвентаризацию
    </button>
    <button 
      onclick={() => console.log('Принять поступление')}
      style="
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.8rem 1.5rem;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        transition: all 200ms ease;
      "
    >
      📦 Принять поступление
    </button>
    <button 
      onclick={() => console.log('Сгенерировать отчет')}
      style="
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.8rem 1.5rem;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        transition: all 200ms ease;
      "
    >
      📊 Сгенерировать отчет
    </button>
  </div>
  
  <!-- Сканирование и обновление -->
  <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); text-align: center;">
    <h3 style="margin-bottom: 1rem; color: #374151;">Сканирование и обновление</h3>
    <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
    <p style="font-family: 'Montserrat', sans-serif; margin-bottom: 1rem; color: #666;">
      Наведите камеру на штрих-код препарата
    </p>
    <input 
      type="text" 
      placeholder="Введите штрихкод или QR-код" 
      style="width: 100%; max-width: 400px; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif; margin-bottom: 1rem;"
    />
    <button 
      onclick={addToCount}
      style="
        background: #5B89FF;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 200ms ease;
      "
    >
      ➕ Добавить к подсчету
    </button>
  </div>
  
  <!-- Последние расхождения -->
  <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem; color: #374151;">Последние расхождения</h3>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; min-width: 1000px;">
        <thead>
          <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Дата</th>
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Раздел</th>
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Препарат</th>
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Системное</th>
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Фактическое</th>
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Расхождение</th>
            <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Статус</th>
          </tr>
        </thead>
        <tbody>
          {#each discrepancies as item}
            <tr style="border-bottom: 1px solid #f3f4f6; transition: background-color 150ms ease;">
              <td style="padding: 1rem;">{item.date}</td>
              <td style="padding: 1rem;">{item.section}</td>
              <td style="padding: 1rem;">{item.drug}</td>
              <td style="padding: 1rem;">{item.system}</td>
              <td style="padding: 1rem;">{item.actual}</td>
              <td style="padding: 1rem; color: {item.difference < 0 ? '#ef4444' : item.difference > 0 ? '#10b981' : '#6b7280'}; font-weight: 600;">
                {item.difference > 0 ? '+' : ''}{item.difference}
              </td>
              <td style="padding: 1rem;">
                <span style="
                  color: {getStatusColor(item.status)};
                  background: {getStatusColor(item.status) === '#ef4444' ? '#fef2f2' : 
                              getStatusColor(item.status) === '#10b981' ? '#d1fae5' : '#f3f4f6'};
                  padding: 0.25rem 0.5rem;
                  border-radius: 4px;
                  font-size: 0.875rem;
                ">
                  {item.status}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>