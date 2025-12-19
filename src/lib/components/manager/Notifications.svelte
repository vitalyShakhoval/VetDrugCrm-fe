<script lang="ts">
  const saveSettings = () => {
    console.log('Сохранить настройки');
  };
</script>

<div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
  <h1 style="margin-bottom: 0.5rem;">Настройки уведомлений</h1>
  <p style="color: #666; margin-bottom: 2rem;">Настройка порогов и каналов уведомлений</p>
  
  <div style="max-width: 600px;">
    <!-- Пороги запасов -->
    <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <h3 style="margin-bottom: 1rem; color: #374151;">Пороги запасов</h3>
      <div style="margin-bottom: 1rem;">
        <label for="low-stock" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Низкий уровень запасов</label>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input id="low-stock" type="number" value="20" style="width: 100px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
          <span style="color: #6b7280;">ед.</span>
        </div>
      </div>
      <div style="margin-bottom: 1.5rem;">
        <label for="critical-stock" style="display: block; margin-bottom: 0.5rem; color: #4b5563;">Критический уровень запасов</label>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input id="critical-stock" type="number" value="10" style="width: 100px; padding: 0.5rem; border: 1px solid #e5e7eb; border-radius: 4px;">
          <span style="color: #6b7280;">ед.</span>
        </div>
      </div>
    </div>
    
    <!-- Каналы уведомлений -->
    <div style="background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <h3 style="margin-bottom: 1rem; color: #374151;">Каналы уведомлений</h3>
      <div style="margin-bottom: 0.75rem;">
        <label for="email-notifications" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input id="email-notifications" type="checkbox" checked>
          <span>Электронная почта</span>
        </label>
      </div>
      <div style="margin-bottom: 0.75rem;">
        <label for="system-notifications" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input id="system-notifications" type="checkbox" checked>
          <span>Внутрисистемные уведомления</span>
        </label>
      </div>
      <div>
        <label for="sms-notifications" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <input id="sms-notifications" type="checkbox">
          <span>SMS</span>
        </label>
      </div>
    </div>
    
    <button onclick={saveSettings} style="background: #5B89FF; color: white; border: none; border-radius: 8px; padding: 0.75rem 1.5rem; font-family: 'Montserrat', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
      💾 Сохранить настройки
    </button>
  </div>
</div>