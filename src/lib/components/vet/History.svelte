<!-- src\lib\components\vet\History.svelte -->
<script lang="ts">
  let dateFrom = $state('2024-07-01');
  let dateTo = $state('2024-07-26');
  let drugFilter = $state('Все препараты');
  
  const prescriptions = [
    { date: '2024-07-26', patient: 'Рекс (собака)', drug: 'Цефтриаксон', dosage: '50 мг', quantity: 5, veterinarian: 'Иванов И.И.' },
    { date: '2024-07-25', patient: 'Мурка (кошка)', drug: 'Амоксициллин', dosage: '25 мг', quantity: 2, veterinarian: 'Петрова А.В.' },
    { date: '2024-07-24', patient: 'Барсик (кот)', drug: 'Мелоксикам', dosage: '1 мг/кг', quantity: 1, veterinarian: 'Иванов И.И.' },
    { date: '2024-07-23', patient: 'Шарик (собака)', drug: 'Вакцина Нобиван', dosage: '1 доза', quantity: 1, veterinarian: 'Сидоров Д.А.' },
    { date: '2024-07-22', patient: 'Звездочка (кошка)', drug: 'Витаминный комплекс', dosage: '5 мл', quantity: 1, veterinarian: 'Петрова А.В.' }
  ];
  
  const exportPDF = () => console.log('Экспорт в PDF');
  const exportExcel = () => console.log('Экспорт в Excel');
  const applyFilters = () => console.log('Применены фильтры:', { dateFrom, dateTo, drugFilter });
  const resetFilters = () => {
    dateFrom = '2024-07-01';
    dateTo = '2024-07-26';
    drugFilter = 'Все препараты';
  };
</script>

<div class="container">
  <h1 class="title">История назначений</h1>
  <p class="subtitle">История всех назначений и выдач препаратов</p>
  
  <!-- Фильтры -->
  <div class="filters-section">
    <h2 class="section-title">Фильтры истории</h2>
    <div class="filters-grid">
      <div class="filter-group">
        <label for="date-from-filter" class="filter-label">Дата с</label>
        <input 
          id="date-from-filter"
          type="date" 
          bind:value={dateFrom}
          class="filter-input"
        />
      </div>
      <div class="filter-group">
        <label for="date-to-filter" class="filter-label">Дата по</label>
        <input 
          id="date-to-filter"
          type="date" 
          bind:value={dateTo}
          class="filter-input"
        />
      </div>
      <div class="filter-group">
        <label for="drug-filter-select" class="filter-label">Препарат</label>
        <select 
          id="drug-filter-select"
          bind:value={drugFilter}
          class="filter-select"
        >
          <option>Все препараты</option>
          <option>Антибиотики</option>
          <option>Витамины</option>
          <option>Вакцины</option>
          <option>Обезболивающие</option>
        </select>
      </div>
    </div>
    <div class="filter-buttons">
      <button onclick={applyFilters} class="btn btn-primary">
        Применить фильтры
      </button>
      <button onclick={resetFilters} class="btn btn-secondary">
        Сбросить фильтры
      </button>
    </div>
  </div>
  
  <!-- Таблица истории -->
  <div class="table-section">
    <div class="table-container">
      <table class="history-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пациент</th>
            <th>Препарат</th>
            <th>Дозировка</th>
            <th>Количество</th>
            <th>Ветеринар</th>
          </tr>
        </thead>
        <tbody>
          {#each prescriptions as prescription}
            <tr>
              <td>{prescription.date}</td>
              <td>
                <span class="patient-badge">{prescription.patient}</span>
              </td>
              <td>{prescription.drug}</td>
              <td>{prescription.dosage}</td>
              <td>
                <span class="quantity-badge">{prescription.quantity} ед.</span>
              </td>
              <td>{prescription.veterinarian}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Кнопки экспорта -->
  <div class="export-buttons">
    <button onclick={exportPDF} class="btn btn-export">
      <span class="btn-icon">📄</span>
      Экспорт в PDF
    </button>
    <button onclick={exportExcel} class="btn btn-primary">
      <span class="btn-icon">📊</span>
      Экспорт в Excel
    </button>
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
  
  .title {
    font-size: clamp(1.5rem, 2vw, 2.5rem);
    margin-bottom: 0.5vw;
    color: #333;
    font-weight: 700;
  }
  
  .subtitle {
    color: #666;
    margin-bottom: 2vw;
    font-size: clamp(0.875rem, 1vw, 1.125rem);
  }
  
  .filters-section {
    background: white;
    border-radius: 0.8vw;
    padding: 1.5vw;
    margin-bottom: 1.5vw;
    box-shadow: 0 0.1vw 0.4vw rgba(0,0,0,0.08);
  }
  
  .section-title {
    margin-bottom: 1vw;
    color: #374151;
    font-size: clamp(1rem, 1.1vw, 1.3rem);
    font-weight: 600;
  }
  
  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1vw;
    margin-bottom: 1vw;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
  }
  
  .filter-label {
    display: block;
    margin-bottom: 0.5vw;
    color: #4b5563;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
  }
  
  .filter-input,
  .filter-select {
    padding: 0.8vw;
    border: 1px solid #e5e7eb;
    border-radius: 0.4vw;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
    width: 100%;
    box-sizing: border-box;
  }
  
  .filter-input:focus,
  .filter-select:focus {
    outline: none;
    border-color: #5B89FF;
    box-shadow: 0 0 0 0.2vw rgba(91, 137, 255, 0.2);
  }
  
  .filter-buttons {
    display: flex;
    gap: 1vw;
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 0.6vw 1.2vw;
    border-radius: 0.4vw;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
    border: none;
    display: flex;
    align-items: center;
    gap: 0.5vw;
    transition: all 0.2s ease;
  }
  
  .btn-primary {
    background: #5B89FF;
    color: white;
  }
  
  .btn-primary:hover {
    background: #3A70F8;
  }
  
  .btn-secondary {
    background: white;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }
  
  .btn-secondary:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
  
  .table-section {
    background: white;
    border-radius: 0.8vw;
    overflow: hidden;
    box-shadow: 0 0.1vw 0.4vw rgba(0,0,0,0.08);
    margin-bottom: 2vw;
  }
  
  .table-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    max-height: 40vh;
    overflow-y: auto;
  }
  
  .history-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
  }
  
  .history-table th {
    background: #f9fafb;
    padding: 1vw;
    text-align: left;
    font-weight: 500;
    color: #374151;
    font-size: clamp(0.75rem, 0.85vw, 1rem);
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 1px 0 #e5e7eb;
  }
  
  .history-table td {
    padding: 1vw;
    border-bottom: 1px solid #f3f4f6;
    color: #4b5563;
    font-size: clamp(0.7rem, 0.8vw, 0.9rem);
  }
  
  .history-table tr:hover {
    background-color: #f9fafb;
  }
  
  .patient-badge {
    background: #f0f9ff;
    color: #0369a1;
    padding: 0.3vw 0.6vw;
    border-radius: 0.3vw;
    font-size: clamp(0.65rem, 0.75vw, 0.85rem);
    display: inline-block;
    white-space: nowrap;
  }
  
  .quantity-badge {
    background: #fef2f2;
    color: #991b1b;
    padding: 0.3vw 0.6vw;
    border-radius: 0.3vw;
    font-size: clamp(0.65rem, 0.75vw, 0.85rem);
    display: inline-block;
    white-space: nowrap;
  }
  
  .export-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1vw;
    flex-wrap: wrap;
  }
  
  .btn-export {
    background: white;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }
  
  .btn-export:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
  
  .btn-icon {
    font-size: clamp(0.9rem, 1vw, 1.2rem);
  }
  
  /* Адаптивность для мобильных устройств */
  @media (max-width: 768px) {
    .container {
      padding: 3vw;
    }
    
    .filters-grid {
      grid-template-columns: 1fr;
      gap: 2vw;
    }
    
    .filter-buttons {
      flex-direction: column;
    }
    
    .btn {
      padding: 1.2vw 2.4vw;
      width: 100%;
      justify-content: center;
    }
    
    .table-container {
      margin: 0 -3vw;
      width: calc(100% + 6vw);
      max-height: 50vh;
    }
    
    .history-table {
      min-width: 900px;
    }
    
    .export-buttons {
      flex-direction: column;
    }
    
    .export-buttons .btn {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 4vw;
    }
    
    .filter-input,
    .filter-select {
      padding: 1.2vw;
    }
    
    .history-table th,
    .history-table td {
      padding: 1.5vw;
    }
  }
</style>