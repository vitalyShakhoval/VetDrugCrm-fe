<script lang="ts">
  import { onMount } from 'svelte';

  // Типы
  interface Supplier {
    id: number;
    name: string;
  }

  interface ReceiptFormData {
    barcode: string;
    supplier: string;
    drugName: string;
    quantity: string;
    productionDate: string;
    expiryDate: string;
  }

  // Массив поставщиков
  let suppliers: Supplier[] = [];
  
  // Данные формы
  let formData: ReceiptFormData = {
    barcode: '',
    supplier: '',
    drugName: '',
    quantity: '',
    productionDate: '',
    expiryDate: ''
  };

  // Функция подтверждения приемки
  const confirmReceipt = (): void => {
    console.log('Подтверждение приемки:', formData);
    
    // Валидация
    if (!formData.barcode.trim()) {
      alert('Введите штрих-код');
      return;
    }
    
    if (!formData.supplier) {
      alert('Выберите поставщика');
      return;
    }
    
    // Здесь будет логика отправки данных на сервер
    // Например: 
    // await fetch('/api/receipt', { method: 'POST', body: JSON.stringify(formData) });
    
    alert('Приемка подтверждена!');
    
    // Сброс формы
    formData = {
      barcode: '',
      supplier: '',
      drugName: '',
      quantity: '',
      productionDate: '',
      expiryDate: ''
    };
  };

  // Функция для обработки сканирования штрих-кода
  const handleBarcodeScan = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    formData.barcode = target.value;
    
    // Здесь можно добавить логику для автоматического заполнения
    // Например, запрос к API для получения информации о препарате
    if (formData.barcode.length > 5) {
      // simulate API call
      // formData.drugName = 'Автоматически определенный препарат';
    }
  };

  // Загрузка данных при монтировании компонента
  onMount(async (): Promise<void> => {
    try {
      // Здесь загрузите список поставщиков с API
      // const response = await fetch('/api/suppliers');
      // const data = await response.json();
      // suppliers = data;
      
      // Пример данных для тестирования
      suppliers = [
        { id: 1, name: 'ООО "ФармаГрупп"' },
        { id: 2, name: 'АО "Медицинские препараты"' },
        { id: 3, name: 'ИП Иванов И.И.' },
        { id: 4, name: 'ЗАО "Фармакор"' }
      ];
    } catch (error) {
      console.error('Ошибка загрузки поставщиков:', error);
    }
  });
</script>

<!-- Блок "Приемка партии": -->
<div>
  <h3 style="margin-bottom: 1rem;">Приемка партии</h3>
  <div style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; border: 1px solid #e5e7eb;">
    <div style="margin-bottom: 1rem;">
      <label for="barcode-scan" style="display: block; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; color: #4b5563;">
        Сканировать штрих-код
      </label>
      <input 
        id="barcode-scan"
        type="text" 
        placeholder="Введите или отсканируйте код" 
        style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
        bind:value={formData.barcode}
        on:input={handleBarcodeScan}
      />
    </div>
    
    <div style="margin-bottom: 1rem;">
      <label for="supplier-select" style="display: block; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; color: #4b5563;">
        Поставщик
      </label>
      <select 
        id="supplier-select" 
        style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
        bind:value={formData.supplier}
      >
        <option value="">Выберите поставщика</option>
        {#each suppliers as supplier (supplier.id)}
          <option value={supplier.id}>{supplier.name}</option>
        {/each}
      </select>
    </div>
    
    <div style="margin-bottom: 1rem;">
      <label for="drug-name" style="display: block; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; color: #4b5563;">
        Название препарата
      </label>
      <input 
        id="drug-name"
        type="text" 
        placeholder="Автоматически из штрих-кода" 
        style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
        bind:value={formData.drugName}
      />
    </div>
    
    <div style="margin-bottom: 1rem;">
      <label for="quantity-input" style="display: block; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; color: #4b5563;">
        Количество
      </label>
      <input 
        id="quantity-input"
        type="number" 
        placeholder="Введите количество" 
        style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
        bind:value={formData.quantity}
        min="1"
      />
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
      <div>
        <label for="production-date" style="display: block; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; color: #4b5563; font-size: 0.875rem;">
          Дата производства
        </label>
        <input 
          id="production-date"
          type="date" 
          style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
          bind:value={formData.productionDate}
        />
      </div>
      <div>
        <label for="expiry-date" style="display: block; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; color: #4b5563; font-size: 0.875rem;">
          Срок годности
        </label>
        <input 
          id="expiry-date"
          type="date" 
          style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
          bind:value={formData.expiryDate}
        />
      </div>
    </div>
    
    <button 
      on:click={confirmReceipt}
      style="
        background: #5B89FF;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem;
        font-family: 'Montserrat', sans-serif;
        cursor: pointer;
        width: 100%;
        font-size: 1rem;
        transition: all 200ms ease;
      "
      on:mouseenter={(e) => e.currentTarget.style.background = '#4A74E6'}
      on:mouseleave={(e) => e.currentTarget.style.background = '#5B89FF'}
    >
      ✅ Подтвердить приемку
    </button>
  </div>
</div>