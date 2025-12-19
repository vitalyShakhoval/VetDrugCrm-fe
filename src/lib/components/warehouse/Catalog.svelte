<script lang="ts">
  const drugs = [
    { id: 1, name: 'Антибиотик широкого спектра', category: 'Антибиотики', quantity: 150, expiry: '2025-12-31', location: 'Склад A, Секция 3' },
    { id: 2, name: 'Витаминный комплекс', category: 'Витамины', quantity: 230, expiry: '2026-06-15', location: 'Склад B, Секция 1' },
    { id: 3, name: 'Обезболивающее средство', category: 'Обезболивающие', quantity: 90, expiry: '2024-11-20', location: 'Склад A, Секция 2' },
    { id: 4, name: 'Вакцина для щенков', category: 'Вакцины', quantity: 75, expiry: '2024-08-01', location: 'Холодильник 1' },
    { id: 5, name: 'Противопаразитарные капли', category: 'Противопаразитарные', quantity: 300, expiry: '2025-09-01', location: 'Склад C, Секция 4' },
  ];
  
  const categories = ['Все', 'Антибиотики', 'Витамины', 'Вакцины', 'Обезболивающие', 'Противопаразитарные'];
  
  let selectedCategory = $state('Все');
  let searchTerm = $state('');
  
  const editDrug = (id: number) => {
    console.log('Редактировать препарат:', id);
  };
  
  const viewDetails = (id: number) => {
    console.log('Просмотреть детали:', id);
  };
  
  const addDrug = () => {
    console.log('Добавить препарат');
  };
  
  const filteredDrugs = $derived(
    drugs.filter(drug => {
      const matchesCategory = selectedCategory === 'Все' || drug.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
  );
</script>

<div style="padding: 1rem; font-family: 'Montserrat', sans-serif; max-width: 100%;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
    <div>
      <h1 style="margin-bottom: 0.5rem;">Каталог препаратов</h1>
      <p style="color: #666;">Управление препаратами на складе</p>
    </div>
    <button onclick={addDrug} style="background: #5B89FF; color: white; border: none; border-radius: 8px; padding: 0.75rem 1.5rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
      ➕ Добавить препарат
    </button>
  </div>
  
  <!-- Фильтры и поиск -->
  <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
    <div style="flex: 1; min-width: 300px;">
      <input 
        type="text" 
        placeholder="Поиск препаратов..." 
        bind:value={searchTerm}
        style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Montserrat', sans-serif;"
      />
    </div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      {#each categories as category}
        <button 
          onclick={() => selectedCategory = category}
          style="
            background: {selectedCategory === category ? '#5B89FF' : 'white'};
            color: {selectedCategory === category ? 'white' : '#374151'};
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 0.5rem 1rem;
            font-family: 'Montserrat', sans-serif;
            cursor: pointer;
            transition: all 200ms ease;
          "
        >
          {category}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Карточки препаратов -->
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
    {#each filteredDrugs as drug}
      <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 200ms ease;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <h3 style="font-family: 'Montserrat', sans-serif; margin: 0 0 0.5rem 0; font-size: 1.1rem;">{drug.name}</h3>
            <div style="display: flex; gap: 1rem; font-family: 'Montserrat', sans-serif; font-size: 0.875rem; color: #666;">
              <span>Категория: <strong>{drug.category}</strong></span>
            </div>
          </div>
          <span style="
            background: {drug.quantity < 50 ? '#fef3c7' : '#d1fae5'};
            color: {drug.quantity < 50 ? '#92400e' : '#065f46'};
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
          ">
            {drug.quantity} ед.
          </span>
        </div>
        
        <div style="margin-top: 1rem;">
          <div style="display: flex; justify-content: space-between; font-family: 'Montserrat', sans-serif; font-size: 0.875rem; margin-bottom: 0.5rem;">
            <span style="color: #666;">Годен до:</span>
            <span style="font-weight: 600; color: {new Date(drug.expiry) < new Date(Date.now() + 30*24*60*60*1000) ? '#ef4444' : '#374151'}">
              {drug.expiry}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; font-family: 'Montserrat', sans-serif; font-size: 0.875rem;">
            <span style="color: #666;">Место хранения:</span>
            <span>{drug.location}</span>
          </div>
        </div>
        
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <button 
            onclick={() => editDrug(drug.id)} 
            style="
              background: #f3f4f6;
              border: 1px solid #e5e7eb;
              border-radius: 4px;
              padding: 0.5rem 1rem;
              font-family: 'Montserrat', sans-serif;
              cursor: pointer;
              font-size: 0.875rem;
              transition: all 200ms ease;
              flex: 1;
            "
          >
            ✏️ Редактировать
          </button>
          <button 
            onclick={() => viewDetails(drug.id)} 
            style="
              background: #dbeafe;
              color: #1e40af;
              border: 1px solid #dbeafe;
              border-radius: 4px;
              padding: 0.5rem 1rem;
              font-family: 'Montserrat', sans-serif;
              cursor: pointer;
              font-size: 0.875rem;
              transition: all 200ms ease;
              flex: 1;
            "
          >
            👁️ Подробнее
          </button>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Пагинация -->
  {#if filteredDrugs.length === 0}
    <div style="text-align: center; padding: 3rem; color: #666;">
      <p>Препараты не найдены</p>
    </div>
  {:else}
    <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 2rem;">
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">‹ Предыдущая</button>
      <button style="background: #5B89FF; color: white; border: none; border-radius: 4px; padding: 0.5rem 1rem;">1</button>
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">2</button>
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">3</button>
      <button style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 0.5rem 1rem; cursor: pointer;">Следующая ›</button>
    </div>
  {/if}
</div>