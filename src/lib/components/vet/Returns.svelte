<!-- src\lib\components\vet\Returns.svelte -->
<script lang="ts">
  let returnData = $state({
    drugName: '',
    batchNumber: '',
    quantity: 1,
    reason: '',
    clientName: '',
    prescriptionId: ''
  });
  
  const reasons = [
    'Просроченный препарат',
    'Поврежденная упаковка',
    'Несоответствие назначению',
    'Остаток после лечения',
    'Другое'
  ];
  
  const recentReturns = [
    { id: 'RT001', drug: 'Антибиотик', batch: 'BATCH-F789', quantity: 2, client: 'Смирнов А.А.', date: '2024-07-25', status: 'Обработан' },
    { id: 'RT002', drug: 'Витамины', batch: 'BATCH-G123', quantity: 1, client: 'Петрова И.С.', date: '2024-07-24', status: 'В обработке' },
    { id: 'RT003', drug: 'Вакцина', batch: 'BATCH-H456', quantity: 1, client: 'Иванов П.П.', date: '2024-07-22', status: 'Обработан' }
  ];
  
  const submitReturn = () => {
    console.log('Оформлен возврат:', returnData);
    // Сброс формы
    returnData = {
      drugName: '',
      batchNumber: '',
      quantity: 1,
      reason: '',
      clientName: '',
      prescriptionId: ''
    };
  };
  
  const clearForm = () => {
    returnData = {
      drugName: '',
      batchNumber: '',
      quantity: 1,
      reason: '',
      clientName: '',
      prescriptionId: ''
    };
  };
</script>

<div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
  <h1 style="margin-bottom: 0.5rem;">Возврат препаратов</h1>
  <p style="color: #666; margin-bottom: 2rem;">Оформление возврата неиспользованных препаратов</p>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <!-- Левая колонка: Форма возврата -->
    <div>
      <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="margin-bottom: 1.5rem; color: #374151;">Оформление возврата</h2>
        
        <div style="margin-bottom: 1rem;">
          <label for="return-drug-name" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Наименование препарата *</label>
          <input 
            id="return-drug-name"
            type="text" 
            placeholder="Введите название препарата" 
            bind:value={returnData.drugName}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="return-batch-number" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Номер партии *</label>
          <input 
            id="return-batch-number"
            type="text" 
            placeholder="Введите номер партии" 
            bind:value={returnData.batchNumber}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="return-quantity" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Количество для возврата *</label>
          <input 
            id="return-quantity"
            type="number" 
            min="1"
            bind:value={returnData.quantity}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="return-reason" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Причина возврата *</label>
          <select 
            id="return-reason"
            bind:value={returnData.reason}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          >
            <option value="">Выберите причину</option>
            {#each reasons as reason}
              <option value={reason}>{reason}</option>
            {/each}
          </select>
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="return-client-name" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">ФИО клиента *</label>
          <input 
            id="return-client-name"
            type="text" 
            placeholder="Введите ФИО клиента" 
            bind:value={returnData.clientName}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label for="return-prescription-id" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">ID назначения (если есть)</label>
          <input 
            id="return-prescription-id"
            type="text" 
            placeholder="Введите ID назначения" 
            bind:value={returnData.prescriptionId}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="display: flex; gap: 1rem;">
          <button 
            onclick={clearForm}
            style="flex: 1; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.75rem; cursor: pointer;"
          >
            Очистить
          </button>
          <button 
            onclick={submitReturn}
            style="flex: 1; background: #5B89FF; color: white; border: none; border-radius: 8px; padding: 0.75rem; cursor: pointer;"
          >
            Оформить возврат
          </button>
        </div>
      </div>
    </div>
    
    <!-- Правая колонка: История возвратов -->
    <div>
      <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="margin-bottom: 1rem; color: #374151;">Недавние возвраты</h2>
        <div style="display: grid; gap: 0.75rem; margin-bottom: 1.5rem;">
          {#each recentReturns as ret}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; padding: 1rem; background: #f9fafb; border-radius: 6px;">
              <div>
                <span style="font-size: 0.875rem; color: #666;">Препарат:</span>
                <p style="margin: 0.25rem 0 0 0; font-weight: 600;">{ret.drug}</p>
              </div>
              <div>
                <span style="font-size: 0.875rem; color: #666;">Клиент:</span>
                <p style="margin: 0.25rem 0 0 0;">{ret.client}</p>
              </div>
              <div>
                <span style="font-size: 0.875rem; color: #666;">Партия:</span>
                <p style="margin: 0.25rem 0 0 0;">{ret.batch}</p>
              </div>
              <div>
                <span style="font-size: 0.875rem; color: #666;">Статус:</span>
                <p style="margin: 0.25rem 0 0 0;">
                  <span style="background: {ret.status === 'Обработан' ? '#d1fae5' : '#fef3c7'}; 
                         color: {ret.status === 'Обработан' ? '#065f46' : '#92400e'}; 
                         padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">
                    {ret.status}
                  </span>
                </p>
              </div>
              <div>
                <span style="font-size: 0.875rem; color: #666;">Количество:</span>
                <p style="margin: 0.25rem 0 0 0; color: #ef4444;">-{ret.quantity} ед.</p>
              </div>
              <div>
                <span style="font-size: 0.875rem; color: #666;">Дата:</span>
                <p style="margin: 0.25rem 0 0 0;">{ret.date}</p>
              </div>
            </div>
          {/each}
        </div>
        
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 1rem;">
          <h3 style="margin: 0 0 0.5rem 0; color: #0369a1;">📋 Правила возврата</h3>
          <ul style="margin: 0; padding-left: 1rem; color: #666; font-size: 0.875rem;">
            <li>Возврат возможен в течение 14 дней с даты выдачи</li>
            <li>Препарат должен быть в оригинальной упаковке</li>
            <li>Требуется чек или ID назначения</li>
            <li>Возврат денежных средств осуществляется в течение 3 рабочих дней</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>