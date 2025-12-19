<script lang="ts">
  const applyFilters = () => {
    console.log('Применить фильтры');
  };
  
  const exportPDF = () => {
    console.log('Экспорт в PDF');
  };
  
  const exportExcel = () => {
    console.log('Экспорт в Excel');
  };
</script>

<div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
  <h1 style="margin-bottom: 0.5rem;">Отчеты</h1>
  <p style="color: #666; margin-bottom: 2rem;">Генерация отчетов по деятельности системы</p>
  
  <!-- Настройки отчета -->
  <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem; color: #374151;">Настройки отчета</h3>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <div style="flex: 1; min-width: 200px;">
        <label for="report-type" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">Тип отчета</label>
        <select id="report-type" style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; font-family: 'Montserrat', sans-serif;">
          <option>Динамика препаратов</option>
          <option>Финансовый отчет</option>
          <option>Отчет по поставкам</option>
          <option>Отчет по выдачам</option>
        </select>
      </div>
      <div style="flex: 1; min-width: 200px;">
        <label for="date-from" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">Дата с</label>
        <input id="date-from" type="date" value="2024-07-01" style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; font-family: 'Montserrat', sans-serif;">
      </div>
      <div style="flex: 1; min-width: 200px;">
        <label for="date-to" style="display: block; margin-bottom: 0.5rem; color: #4b5563; font-size: 0.875rem;">Дата по</label>
        <input id="date-to" type="date" value="2024-07-26" style="width: 100%; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px; font-family: 'Montserrat', sans-serif;">
      </div>
    </div>
    <button on:click={applyFilters} style="background: #5B89FF; color: white; border: none; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer;">
      Применить фильтры
    </button>
  </div>
  
  <!-- Детальный отчет -->
  <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 2rem;">
    <div style="padding: 1.5rem; border-bottom: 1px solid #e5e7eb;">
      <h3 style="margin: 0; color: #374151;">Детальный отчет</h3>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f9fafb; border-bottom: 1px solid #e5e7eb;">
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Дата</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Тип операции</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Препарат</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Количество</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">Партия</th>
          <th style="padding: 1rem; text-align: left; font-weight: 500; color: #374151;">ID Транзакции</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 1rem;">20.07.2024</td>
          <td style="padding: 1rem;">Отпуск</td>
          <td style="padding: 1rem;">Антибиотик Широкого Спектра</td>
          <td style="padding: 1rem;">25 ед.</td>
          <td style="padding: 1rem;">ВетКлиника 1</td>
          <td style="padding: 1rem;">TXN001</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 1rem;">19.07.2024</td>
          <td style="padding: 1rem;">Получение</td>
          <td style="padding: 1rem;">Витаминный Комплекс</td>
          <td style="padding: 1rem;">150 ед.</td>
          <td style="padding: 1rem;">Поставщик ФарыВет</td>
          <td style="padding: 1rem;">TXN002</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- Кнопки экспорта -->
  <div style="display: flex; justify-content: flex-end; gap: 1rem;">
    <button on:click={exportPDF} style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
      📄 Экспорт в PDF
    </button>
    <button on:click={exportExcel} style="background: #5B89FF; color: white; border: none; border-radius: 6px; padding: 0.5rem 1rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
      📊 Экспорт в Excel
    </button>
  </div>
</div>