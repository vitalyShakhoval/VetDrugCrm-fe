<!-- src\lib\components\vet\Dispense.svelte -->
<script lang="ts">
  let drugName = $state('');
  let batchNumber = $state('');
  let quantity = $state(1);
  let recipient = $state('');
  let comments = $state('');
  
  const availableStock = 15;
  const drugInfo = {
    name: 'Антибиотик широкого спектра',
    category: 'Антибиотики',
    unit: 'флакон',
    expiryDate: '2025-12-31'
  };
  
  const previousIssues = [
    { date: '27.07.2024', recipient: 'Клиент Петров', quantity: 3 },
    { date: '25.07.2024', recipient: 'Клиент Сидоров', quantity: 2 },
    { date: '22.07.2024', recipient: 'Клиент Иванова', quantity: 5 }
  ];
  
  const confirmDispense = () => {
    console.log('Подтверждена выдача:', { drugName, batchNumber, quantity, recipient, comments });
    // Сброс формы
    drugName = '';
    batchNumber = '';
    quantity = 1;
    recipient = '';
    comments = '';
  };
  
  const clearForm = () => {
    drugName = '';
    batchNumber = '';
    quantity = 1;
    recipient = '';
    comments = '';
  };
</script>

<div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
  <h1 style="margin-bottom: 0.5rem;">Выдача препаратов</h1>
  <p style="color: #666; margin-bottom: 2rem;">Регистрация выдачи ветеринарного препарата</p>
  
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <!-- Левая колонка: Форма выдачи -->
    <div>
      <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="margin-bottom: 1.5rem; color: #374151;">Регистрация выдачи препарата</h2>
        
        <div style="margin-bottom: 1rem;">
          <label for="drug-barcode" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Штрихкод препарата</label>
          <input 
            id="drug-barcode"
            type="text" 
            placeholder="Сканировать или ввести штрихкод" 
            bind:value={drugName}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="batch-number" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Номер партии</label>
          <input 
            id="batch-number"
            type="text" 
            placeholder="Введите номер партии" 
            bind:value={batchNumber}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="quantity-input" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Выдано количество</label>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <input 
              id="quantity-input"
              type="range" 
              min="1" 
              max={availableStock}
              bind:value={quantity}
              style="flex-grow: 1;"
            />
            <span style="font-family: 'Montserrat', sans-serif; min-width: 2rem; text-align: center;">{quantity}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
            <span style="color: #666; font-size: 0.875rem;">1</span>
            <span style="color: #666; font-size: 0.875rem;">Доступный остаток: {availableStock}</span>
          </div>
        </div>
        
        <div style="margin-bottom: 1rem;">
          <label for="recipient-name" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Получатель</label>
          <input 
            id="recipient-name"
            type="text" 
            placeholder="Введите имя получателя" 
            bind:value={recipient}
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif;"
          />
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label for="comments-text" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Комментарии</label>
          <textarea 
            id="comments-text"
            placeholder="Дополнительные комментарии к выдаче" 
            bind:value={comments}
            rows="3"
            style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 6px; font-family: 'Montserrat', sans-serif; resize: vertical;"
          ></textarea>
        </div>
        
        <div style="display: flex; gap: 1rem;">
          <button 
            onclick={clearForm}
            style="flex: 1; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.75rem; cursor: pointer;"
          >
            Отмена
          </button>
          <button 
            onclick={confirmDispense}
            style="flex: 1; background: #5B89FF; color: white; border: none; border-radius: 8px; padding: 0.75rem; cursor: pointer;"
          >
            Подтвердить выдачу
          </button>
        </div>
      </div>
    </div>
    
    <!-- Правая колонка: Информация -->
    <div>
      <!-- Информация о препарате -->
      <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="margin-bottom: 1rem; color: #374151;">Информация о препарате</h2>
        <div style="display: grid; gap: 0.75rem;">
          <div>
            <span style="color: #666; font-size: 0.875rem;">Текущий препарат:</span>
            <p style="font-weight: 600; margin: 0.25rem 0 0 0;">{drugInfo.name}</p>
          </div>
          <div>
            <span style="color: #666; font-size: 0.875rem;">Категория:</span>
            <p style="margin: 0.25rem 0 0 0;">{drugInfo.category}</p>
          </div>
          <div>
            <span style="color: #666; font-size: 0.875rem;">Единица измерения:</span>
            <p style="margin: 0.25rem 0 0 0;">{drugInfo.unit}</p>
          </div>
          <div>
            <span style="color: #666; font-size: 0.875rem;">Срок годности:</span>
            <p style="margin: 0.25rem 0 0 0;">{drugInfo.expiryDate}</p>
          </div>
        </div>
      </div>
      
      <!-- Предыдущие выдачи -->
      <div style="background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="margin-bottom: 1rem; color: #374151;">Предыдущие выдачи</h2>
        <div style="display: grid; gap: 0.5rem;">
          {#each previousIssues as issue}
            <div style="display: flex; justify-content: space-between; padding: 0.75rem; background: #f9fafb; border-radius: 6px;">
              <span>{issue.date}</span>
              <span>{issue.recipient}</span>
              <span style="color: #ef4444;">-{issue.quantity} ед.</span>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>