<script lang="ts">
  import { navigateTo } from '$lib/navigation';

  const goToLogin = () => navigateTo.login();
</script>

<section class="workplace_position">
  <div class="card">
    <h1>Верификация не требуется</h1>
    <p>
      В текущей версии бэкенда регистрация завершается сразу и не использует подтверждение по коду.
      Просто войдите в систему.
    </p>

    <button class="btn" on:click={goToLogin}>Перейти к входу</button>
  </div>
</section>

<style>
  .workplace_position {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .card {
    max-width: 520px;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #e0e0e0;
    font-family: 'Montserrat', sans-serif;
    background: white;
  }
  h1 {
    margin: 0 0 10px 0;
    font-size: 22px;
  }
  p {
    margin: 0 0 18px 0;
    line-height: 1.45;
    color: #333;
  }
  .btn {
    padding: 12px 16px;
    border-radius: 12px;
    border: none;
    background: #111827;
    color: white;
    cursor: pointer;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
  }
</style>
