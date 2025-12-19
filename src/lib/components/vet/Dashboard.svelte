<!-- src\lib\components\vet\Dashboard.svelte -->
<script lang="ts">
  let showAllPrescriptions = $state(false);
  let showAllActivities = $state(false);
  
  const prescriptions = [
    { date: '2024-07-26', patient: 'Рекс (собака)', drug: 'Цефтриаксон', dosage: '50 мг', quantity: 5, status: 'Ожидает' },
    { date: '2024-07-25', patient: 'Мурка (кошка)', drug: 'Амоксициллин', dosage: '25 мг', quantity: 2, status: 'Выполнено' },
    { date: '2024-07-24', patient: 'Барсик (кот)', drug: 'Мелоксикам', dosage: '1 мг/кг', quantity: 1, status: 'Выполнено' },
    { date: '2024-07-23', patient: 'Шарик (собака)', drug: 'Вакцина Нобиван', dosage: '1 доза', quantity: 1, status: 'Ожидает' },
    { date: '2024-07-22', patient: 'Звездочка (кошка)', drug: 'Витаминный комплекс', dosage: '5 мл', quantity: 1, status: 'Выполнено' }
  ];

  const recentActivities = [
    { id: 'OP001', drug: 'Антибиотик', batch: 'BATCH-A123', quantity: 5, recipient: 'Клиент Смирнов', date: '2024-07-29' },
    { id: 'OP002', drug: 'Обезболивающее', batch: 'BATCH-B456', quantity: 2, recipient: 'Вет. врач Петров', date: '2024-07-28' },
    { id: 'OP003', drug: 'Витамины', batch: 'BATCH-C789', quantity: 10, recipient: 'Отдел Терапии', date: '2024-07-28' },
    { id: 'OP004', drug: 'Вакцина', batch: 'BATCH-D101', quantity: 1, recipient: 'Клиент Иванова', date: '2024-07-27' },
    { id: 'OP005', drug: 'Противопаразитарное', batch: 'BATCH-E202', quantity: 3, recipient: 'Вет. врач Сидоров', date: '2024-07-27' }
  ];

  const displayedPrescriptions = showAllPrescriptions ? prescriptions : prescriptions.slice(0, 3);
  const displayedActivities = showAllActivities ? recentActivities : recentActivities.slice(0, 3);
</script>

<div class="dashboard-container">
  <!-- Шапка -->
  <div class="dashboard-header">
    <h1 class="dashboard-title">Панель ветеринара</h1>
    <p class="dashboard-subtitle">Обзор назначений и ключевые метрики</p>
  </div>
  
  <!-- Карточки метрик (компактные) -->
  <div class="metrics-container">
    <div class="metric-item">
      <div class="metric-icon-box">📋</div>
      <div class="metric-content">
        <div class="metric-value">5</div>
        <div class="metric-label">Назначения сегодня</div>
      </div>
    </div>
    
    <div class="metric-item">
      <div class="metric-icon-box">⚠️</div>
      <div class="metric-content">
        <div class="metric-value">3</div>
        <div class="metric-label">Низкий запас</div>
      </div>
    </div>
    
    <div class="metric-item">
      <div class="metric-icon-box">💊</div>
      <div class="metric-content">
        <div class="metric-value">124</div>
        <div class="metric-label">Выдано за месяц</div>
      </div>
    </div>
    
    <div class="metric-item">
      <div class="metric-icon-box">👥</div>
      <div class="metric-content">
        <div class="metric-value">8</div>
        <div class="metric-label">Пациенты сегодня</div>
      </div>
    </div>
  </div>
  
  <!-- Основное содержимое - адаптивная сетка -->
  <div class="dashboard-content">
    <!-- Текущие назначения -->
    <div class="section-card">
      <div class="section-header">
        <h3 class="section-title">Текущие назначения</h3>
        <button 
          class="toggle-btn" 
          onclick={() => showAllPrescriptions = !showAllPrescriptions}
        >
          {showAllPrescriptions ? 'Свернуть' : 'Все'}
        </button>
      </div>
      <div class="table-scroll-container">
        <table class="compact-table">
          <thead>
            <tr>
              <th class="col-date">Дата</th>
              <th class="col-patient">Пациент</th>
              <th class="col-drug">Препарат</th>
              <th class="col-status">Статус</th>
            </tr>
          </thead>
          <tbody>
            {#each displayedPrescriptions as prescription}
              <tr>
                <td class="col-date">{prescription.date.split('-')[2]}.{prescription.date.split('-')[1]}</td>
                <td class="col-patient">
                  <div class="patient-info">
                    <span class="patient-name">{prescription.patient.split(' ')[0]}</span>
                    <span class="patient-type">({prescription.patient.split(' ')[1]?.replace(/[()]/g, '')})</span>
                  </div>
                </td>
                <td class="col-drug">
                  <div class="drug-info">
                    <span class="drug-name">{prescription.drug}</span>
                    <span class="drug-dosage">{prescription.dosage}</span>
                  </div>
                </td>
                <td class="col-status">
                  <span class="status-badge {prescription.status === 'Ожидает' ? 'pending' : 'completed'}">
                    {prescription.status === 'Ожидает' ? '⏳' : '✓'} {prescription.status}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Недавние операции -->
    <div class="section-card">
      <div class="section-header">
        <h3 class="section-title">Недавние операции</h3>
        <button 
          class="toggle-btn" 
          onclick={() => showAllActivities = !showAllActivities}
        >
          {showAllActivities ? 'Свернуть' : 'Все'}
        </button>
      </div>
      <div class="table-scroll-container">
        <table class="compact-table">
          <thead>
            <tr>
              <th class="col-id">ID</th>
              <th class="col-drug">Препарат</th>
              <th class="col-quantity">Кол-во</th>
              <th class="col-recipient">Получатель</th>
            </tr>
          </thead>
          <tbody>
            {#each displayedActivities as activity}
              <tr>
                <td class="col-id">{activity.id}</td>
                <td class="col-drug">
                  <div class="drug-info">
                    <span class="drug-name">{activity.drug}</span>
                    <span class="drug-batch">#{activity.batch.split('-')[1]}</span>
                  </div>
                </td>
                <td class="col-quantity">
                  <span class="quantity-badge negative">
                    -{activity.quantity} ед.
                  </span>
                </td>
                <td class="col-recipient">
                  <div class="recipient-info">
                    {activity.recipient}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard-container {
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  .dashboard-header {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.5rem 0;
    line-height: 1.2;
  }
  
  .dashboard-subtitle {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
    line-height: 1.5;
  }
  
  .metrics-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .metric-item {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.2s ease;
  }
  
  .metric-item:hover {
    border-color: #5B89FF;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  
  .metric-icon-box {
    width: 2.5rem;
    height: 2.5rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .metric-content {
    flex: 1;
    min-width: 0;
  }
  
  .metric-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
    margin-bottom: 0.125rem;
  }
  
  .metric-label {
    font-size: 0.75rem;
    color: #6b7280;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .dashboard-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .dashboard-content {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }
  
  .section-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .toggle-btn {
    background: none;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .toggle-btn:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }
  
  .table-scroll-container {
    flex: 1;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0;
  }
  
  .compact-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 0;
  }
  
  .compact-table th {
    background: #f9fafb;
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    color: #374151;
    white-space: nowrap;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .compact-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.875rem;
    color: #4b5563;
    vertical-align: top;
  }
  
  .compact-table tr:last-child td {
    border-bottom: none;
  }
  
  /* Компактные колонки */
  .col-date { width: 60px; }
  .col-patient { min-width: 100px; }
  .col-drug { min-width: 120px; }
  .col-status { width: 90px; }
  .col-id { width: 70px; }
  .col-quantity { width: 70px; }
  .col-recipient { min-width: 100px; }
  
  .patient-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .patient-name {
    font-weight: 500;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .patient-type {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .drug-info {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .drug-name {
    font-weight: 500;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .drug-dosage,
  .drug-batch {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
  }
  
  .status-badge.pending {
    background: #fef3c7;
    color: #92400e;
  }
  
  .status-badge.completed {
    background: #d1fae5;
    color: #065f46;
  }
  
  .quantity-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
  }
  
  .quantity-badge.negative {
    background: #fee2e2;
    color: #991b1b;
  }
  
  .recipient-info {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }
  
  /* Адаптивность для мобильных */
  @media (max-width: 768px) {
    .dashboard-header {
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
    }
    
    .dashboard-title {
      font-size: 1.25rem;
    }
    
    .dashboard-subtitle {
      font-size: 0.75rem;
    }
    
    .metrics-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    
    .metric-item {
      padding: 0.75rem;
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .metric-icon-box {
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
    }
    
    .metric-value {
      font-size: 1.25rem;
    }
    
    .metric-label {
      font-size: 0.7rem;
    }
    
    .dashboard-content {
      gap: 1rem;
    }
    
    .section-header {
      padding: 0.75rem 1rem;
    }
    
    .section-title {
      font-size: 0.875rem;
    }
    
    .toggle-btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.7rem;
    }
    
    .compact-table th,
    .compact-table td {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }
    
    /* Еще более компактные колонки на мобильных */
    .col-date { width: 50px; }
    .col-status { width: 80px; }
    .col-id { width: 60px; }
    .col-quantity { width: 60px; }
    
    .status-badge,
    .quantity-badge {
      font-size: 0.7rem;
      padding: 0.125rem 0.375rem;
    }
    
    .patient-name,
    .drug-name {
      font-size: 0.75rem;
    }
    
    .patient-type,
    .drug-dosage,
    .drug-batch {
      font-size: 0.7rem;
    }
  }
  
  @media (max-width: 480px) {
    .metrics-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
    
    .metric-item {
      padding: 0.5rem;
    }
    
    .metric-icon-box {
      width: 1.75rem;
      height: 1.75rem;
      font-size: 0.875rem;
    }
    
    .metric-value {
      font-size: 1rem;
    }
    
    .metric-label {
      font-size: 0.65rem;
    }
    
    .compact-table th,
    .compact-table td {
      padding: 0.375rem 0.5rem;
      font-size: 0.7rem;
    }
    
    .col-date,
    .col-status,
    .col-id,
    .col-quantity {
      width: auto;
      min-width: 40px;
    }
  }
  
  @media (max-width: 360px) {
    .metrics-container {
      grid-template-columns: 1fr;
    }
    
    .dashboard-content {
      grid-template-columns: 1fr;
    }
  }
</style>