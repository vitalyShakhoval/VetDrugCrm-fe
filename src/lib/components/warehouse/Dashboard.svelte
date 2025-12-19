<script lang="ts">
  const startInventory = () => {
    console.log('Начать инвентаризацию');
  };
  
  const receiveSupply = () => {
    console.log('Принять поступление');
  };
  
  const generateReport = () => {
    console.log('Сгенерировать отчет');
  };
  
  const checkExpiry = () => {
    console.log('Проверить сроки годности');
  };
</script>

<div style="padding: 1rem; font-family: 'Montserrat', sans-serif; max-width: 100%;">
  <h1 style="margin-bottom: 0.5rem;">Управление складом</h1>
  <p style="color: #666; margin-bottom: 1.5rem;">Обзор складских операций и запасов</p>
  
  <!-- Карточки с метриками склада -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 200ms ease;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #e0f2fe; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📦</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Текущий запас</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #333;">2,145 ед.</div>
      <div style="color: #666; font-size: 0.9rem;">Всего препаратов на складе</div>
    </div>
    
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 200ms ease;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #f0fdf4; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🚚</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Ожидаемые поставки</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #333;">125 ед.</div>
      <div style="color: #666; font-size: 0.9rem;">Запланировано к поступлению</div>
    </div>
    
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 200ms ease;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #fef3c7; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">⚠️</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Расхождения</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #ef4444;">-15 ед.</div>
      <div style="color: #ef4444; font-size: 0.9rem;">Требуют внимания</div>
    </div>
    
    <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 200ms ease;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.8rem;">
        <div style="width: 40px; height: 40px; background: #fce7f3; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📅</div>
        <h3 style="color: #666; font-size: 0.9rem; margin: 0;">Скоро истекает</h3>
      </div>
      <div style="font-size: 1.8rem; font-weight: bold; color: #f59e0b;">8</div>
      <div style="color: #f59e0b; font-size: 0.9rem;">препаратов</div>
    </div>
  </div>
  
  <!-- Быстрые действия для склада -->
  <div style="background: white; border-radius: 12px; padding: 1.2rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem;">Быстрые действия</h3>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button onclick={startInventory} style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.8rem 1.2rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; transition: all 200ms ease;">
        📋 Начать инвентаризацию
      </button>
      <button onclick={receiveSupply} style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.8rem 1.2rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; transition: all 200ms ease;">
        📦 Принять поступление
      </button>
      <button onclick={generateReport} style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.8rem 1.2rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; transition: all 200ms ease;">
        📊 Сгенерировать отчет
      </button>
      <button onclick={checkExpiry} style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 0.8rem 1.2rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; transition: all 200ms ease;">
        📅 Проверить сроки годности
      </button>
    </div>
  </div>
  
  <!-- Последние операции склада -->
  <div style="background: white; border-radius: 12px; padding: 1.2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <h3 style="margin-bottom: 1rem;">Последние операции</h3>
    <div style="font-family: 'Montserrat', sans-serif;">
      <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid #e5e7eb; transition: background-color 150ms ease;">
        <span style="color: #666; min-width: 100px;">2024-10-26</span>
        <div>
          <p style="margin: 0; font-weight: 500;">Инвентаризация склада A завершена</p>
          <p style="margin: 0.25rem 0 0 0; color: #666;">Обнаружено 3 расхождения</p>
        </div>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem; border-bottom: 1px solid #e5e7eb; transition: background-color 150ms ease;">
        <span style="color: #666; min-width: 100px;">2024-10-25</span>
        <div>
          <p style="margin: 0; font-weight: 500;">Поступление партии XYZ принято</p>
          <p style="margin: 0.25rem 0 0 0; color: #666;">150 ед. вакцины</p>
        </div>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem; transition: background-color 150ms ease;">
        <span style="color: #666; min-width: 100px;">2024-10-24</span>
        <div>
          <p style="margin: 0; font-weight: 500;">Корректировка: Излишек на складе A</p>
          <p style="margin: 0.25rem 0 0 0; color: #666;">Обнаружено 10 ед. обезболивающего</p>
        </div>
      </div>
    </div>
  </div>
</div>