<!-- СОЗДАНИЕ АККА -->
<script lang="ts">
  import Workplace from '$lib/components/authorization/Workplace.svelte';
  import { navigateTo } from '$lib/navigation';
  
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let errorMessage = $state('');
  let isLoading = $state(false);
  
  const handleCreateAccount = () => {
    // Сбрасываем ошибки
    errorMessage = '';
    
    // Проверка на пустые поля
    if (!email || !email.trim()) {
      errorMessage = 'Email обязателен';
      return;
    }
    
    if (!password || !password.trim()) {
      errorMessage = 'Пароль обязателен';
      return;
    }
    
    if (!confirmPassword || !confirmPassword.trim()) {
      errorMessage = 'Подтверждение пароля обязательно';
      return;
    }
    
    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorMessage = 'Введите корректный email';
      return;
    }
    
    // Проверка длины пароля
    if (password.length < 6) {
      errorMessage = 'Пароль должен быть не менее 6 символов';
      return;
    }
    
    // Проверка сложности пароля
    const hasNumber = /\d/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    let passwordErrors = [];
    if (!hasNumber) passwordErrors.push('добавьте цифры (0-9)');
    if (!hasLower) passwordErrors.push('добавьте строчные буквы (a-z)');
    if (!hasUpper) passwordErrors.push('добавьте заглавные буквы (A-Z)');
    if (!hasSpecial) passwordErrors.push('добавьте спецсимволы (!@#$%^&* и т.д.)');
    
    if (passwordErrors.length > 0) {
      errorMessage = 'Пароль должен содержать: ' + passwordErrors.join(', ');
      return;
    }
    
    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      errorMessage = 'Пароли не совпадают';
      return;
    }
    
    isLoading = true;
    
    console.log('Создание аккаунта:', { email, password });
    
    // Ваша логика создания аккаунта
    // Заглушка для примера
    setTimeout(() => {
      isLoading = false;
      
      // После успешного создания переходим на верификацию
      navigateTo.verify(email);
    }, 1000);
  };
</script>

<section class="workplace_position">
  <Workplace
    type="create"
    bind:email={email}
    bind:password={password}
    bind:confirmPassword={confirmPassword}
    onCreateAccount={handleCreateAccount}
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
      Создание аккаунта...
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