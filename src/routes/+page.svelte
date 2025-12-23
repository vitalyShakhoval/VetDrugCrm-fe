<!-- ВХОД В АКК -->
<script lang="ts">
  import Workplace from '$lib/components/authorization/Workplace.svelte';
  import { navigateTo } from '$lib/navigation';
  import { auth } from '$lib/stores/auth';
  import { isApiError } from '$lib/api/errors';
  
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');
  
  const handleLogin = async () => {
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

    try {
      const user = await auth.login(email, password);

      // Перенаправляем в зависимости от роли
      switch (user.role) {
        case 'manager':
          navigateTo.manager();
          break;
        case 'veterinarian':
          navigateTo.vet();
          break;
        case 'warehouseman':
          navigateTo.warehouse();
          break;
        default:
          navigateTo.manager();
      }
    } catch (e) {
      if (isApiError(e)) {
        // Сообщение обычно приходит с бэкенда
        errorMessage = e.message || 'Ошибка авторизации';
      } else {
        errorMessage = e instanceof Error ? e.message : 'Ошибка авторизации';
      }
    } finally {
      isLoading = false;
    }
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