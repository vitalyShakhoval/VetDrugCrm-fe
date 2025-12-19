<!-- ВЕРИФИКАЦИЯ СОЗДАНИЯ АККА -->
<script lang="ts">
  import Workplace from '$lib/components/authorization/Workplace.svelte';
  import { navigateTo } from '$lib/navigation';
  import { onMount } from 'svelte';
  
  let verificationCode = $state('');
  let email = $state('user@example.com');
  let errorMessage = $state('');
  let isLoading = $state(false);
  let resendTimer = $state(0);
  let canResend = $state(false);
  
  // Получаем email из URL параметров
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      email = decodeURIComponent(emailParam);
    }
  });
  
  const handleVerify = () => {
    // Проверка на пустой код
    if (!verificationCode || !verificationCode.trim()) {
      errorMessage = 'Введите код подтверждения';
      return;
    }
    
    // Проверка длины кода
    if (verificationCode.length < 6) {
      errorMessage = 'Код должен содержать 6 символов';
      return;
    }
    
    // Проверка что код состоит только из цифр
    const codeRegex = /^\d+$/;
    if (!codeRegex.test(verificationCode)) {
      errorMessage = 'Код должен содержать только цифры';
      return;
    }
    
    isLoading = true;
    errorMessage = '';
    
    console.log('Верификация кода:', verificationCode);
    
    // Имитация запроса к API
    setTimeout(() => {
      console.log('Верификация успешна! Регистрация завершена');
      isLoading = false;
      
      // === ВОТ ТУТ КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ===
      // После успешной верификации сразу на страницу ветеринара
      
      // Сохраняем информацию о пользователе
      localStorage.setItem('user_email', email);
      localStorage.setItem('user_role', 'vet'); // Все зарегистрированные - ветеринары
      
      // Перенаправляем на страницу ветеринара
      navigateTo.vet();
    }, 1000);
  };
  
  const handleSendCodeAgain = () => {
    if (!canResend) return;
    
    console.log('Отправить код повторно');
    // Ваша логика отправки кода
    
    // Запускаем таймер повторной отправки
    canResend = false;
    resendTimer = 60;
    
    const timer = setInterval(() => {
      resendTimer--;
      if (resendTimer <= 0) {
        clearInterval(timer);
        canResend = true;
      }
    }, 1000);
  };
  
  const handleCreateAccountClick = () => {
    navigateTo.createAccount();
  };
  
  // Инициализация таймера при загрузке
  onMount(() => {
    // Имитация того, что код только что отправлен
    resendTimer = 60;
    canResend = false;
    
    const timer = setInterval(() => {
      resendTimer--;
      if (resendTimer <= 0) {
        clearInterval(timer);
        canResend = true;
      }
    }, 1000);
  });
</script>

<section class="workplace_position">
  <Workplace
    type="verify"
    bind:verificationCode={verificationCode}
    emailAddress={email}
    onVerify={handleVerify}
    onSendCodeAgain={handleSendCodeAgain}
    onCreateAccountClick={handleCreateAccountClick}
    title="Подтверждение email"
  />
  
  <!-- Отображение таймера -->
  <div class="resend-timer">
    {#if !canResend}
      Отправить код повторно можно через {resendTimer} сек.
    {:else}
      Код можно отправить повторно
    {/if}
  </div>
  
  <!-- Показываем ошибки -->
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
    </div>
  {/if}
  
  <!-- Индикатор загрузки -->
  {#if isLoading}
    <div class="loading">
      Проверка кода...
    </div>
  {/if}
</section>

<style>
  .workplace_position {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
  }
  
  .resend-timer {
    margin-top: 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  
  .error-message {
    position: absolute;
    bottom: 120px;
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