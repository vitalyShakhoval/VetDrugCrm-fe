<!-- ВХОД В АКК -->
<script lang="ts">
  import Workplace from '$lib/components/authorization/Workplace.svelte';
  import { navigateTo } from '$lib/navigation';
  
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');
  
  const handleLogin = () => {
    // Базовая валидация
    if (!email || !email.trim()) {
      errorMessage = 'Введите email';
      return;
    }
    
    if (!password || !password.trim()) {
      errorMessage = 'Введите пароль';
      return;
    }
    
    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage = 'Введите корректный email';
      return;
    }
    
    isLoading = true;
    errorMessage = '';
    
    // Ваша логика авторизации
    console.log('Авторизация:', { email, password });
    
    // Заглушка для примера - здесь будет реальный запрос к API
    // В реальном приложении здесь будет запрос к бэкенду
    setTimeout(() => {
      console.log('Вход выполнен (заглушка)');
      isLoading = false;
      
      // === ИМИТАЦИЯ ОТВЕТА ОТ СЕРВЕРА ===
      // В реальном приложении роль будет приходить с бэкенда
      // Это временная заглушка для тестирования
      const mockApiResponse = {
        success: true,
        data: {
          user: {
            id: 1,
            email: email,
            role: determineMockRole(email) // Имитируем определение роли
          }
        }
      };
      
      if (mockApiResponse.success) {
        const userRole = mockApiResponse.data.user.role;
        
        // Перенаправляем в зависимости от роли
        switch(userRole) {
          case 'manager':
            navigateTo.manager();
            break;
          case 'vet':
            navigateTo.vet();
            break;
          case 'warehouse':
            navigateTo.warehouse();
            break;
          default:
            // fallback на manager
            navigateTo.manager();
        }
      } else {
        errorMessage = 'Ошибка авторизации';
      }
    }, 1000);
  };
  
  // Вспомогательная функция для имитации определения роли
  // В реальном приложении эта логика будет на бэкенде
  const determineMockRole = (userEmail: string): 'manager' | 'vet' | 'warehouse' => {
    // Это временная логика для тестирования
    // В реальном приложении роль будет приходить с бэкенда
    const email = userEmail.toLowerCase();
    
    if (email.includes('vet') || email.includes('ветеринар')) {
      return 'vet';
    } else if (email.includes('warehouse') || email.includes('склад')) {
      return 'warehouse';
    } else if (email.includes('manager') || email.includes('менеджер')) {
      return 'manager';
    }
    
    // По умолчанию возвращаем менеджера
    return 'manager';
  };
  
  const handleCreateAccountClick = () => {
    navigateTo.createAccount();
  };
</script>

<section class="workplace_position">
  <Workplace
    type="login"
    bind:email={email}
    bind:password={password}
    onLogin={handleLogin}
    onCreateAccountClick={handleCreateAccountClick}
  />
  
  <!-- Показываем ошибки -->
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
    </div>
  {/if}
  
  <!-- Индикатор загрузки -->
  {#if isLoading}
    <div class="loading">
      Вход в систему...
    </div>
  {/if}
</section>

<style>
  .workplace_position {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
  }
  
  .error-message {
    position: absolute;
    bottom: 100px;
    background: #ffebee;
    color: #c62828;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #ffcdd2;
    max-width: 400px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
  }
  
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
  }
</style>