<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  
  // Импортируем компоненты склада
  import Dashboard from '$lib/components/warehouse/Dashboard.svelte';
  import Catalog from '$lib/components/warehouse/Catalog.svelte';
  import Notifications from '$lib/components/warehouse/Notifications.svelte';
  import Supplies from '$lib/components/warehouse/Supplies.svelte';
  import Inventory from '$lib/components/warehouse/Inventory.svelte';
  
  // Импортируем компоненты для Workspace
  import Search from '$lib/components/main_page/Search.svelte';
  import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';
  
  let activeItemId = $state(1);
  let searchQuery = $state('');
  
  const headerItems = [
    { id: "1", title: "Главная", path: "#" },
    { id: "2", title: "Каталог", path: "#" },
    { id: "3", title: "Уведомления", path: "#" },
    { id: "4", title: "Поставки", path: "#" },
    { id: "5", title: "Инвентаризация", path: "#" }
  ];
  
  const sidebarItems = [
    { id: "1", title: "Главная", icon: "src/lib/assets/Home.svg", path: "#" },
    { id: "2", title: "Каталог", icon: "src/lib/assets/каталог.svg", path: "#" },
    { id: "3", title: "Уведомления", icon: "src/lib/assets/Property 1=Default.svg", path: "#", badge: 7 },
    { id: "4", title: "Поставки", icon: "src/lib/assets/icon_поставки.svg", path: "#" },
    { id: "5", title: "Инвентаризация", icon: "src/lib/assets/icon_инвентаризация.svg", path: "#" }
  ];
  
  const handleMenuItemClick = (item: any) => {
    console.log('Выбран пункт меню:', item);
    activeItemId = Number(item.id);
  };
  
  const handleSearch = (query: string) => {
    console.log('Поиск:', query);
    searchQuery = query;
  };
  
  const handleNotificationsClick = () => {
    console.log('Открыть уведомления');
    activeItemId = 3;
  };
  
  const handleAvatarClick = () => {
    console.log('Открыть профиль');
  };
  
  const handleLogout = () => {
    console.log('Выход из системы');
    navigateTo.logout();
  };
</script>

<section class="workspace">
  <!-- ШАПКА -->
  <header class="workspace__header">
    <section class="header__content">
      <section class="header__menu">
        <!-- Левая часть: кнопки меню -->
        <section class="header__links">
          {#each headerItems as item}
            <button 
              class="menu__button {item.id === activeItemId.toString() ? 'active' : ''}"
              onclick={() => handleMenuItemClick(item)}
            >
              <p class="menu__button__text">{item.title}</p>
            </button>
          {/each}
        </section>
        
        <!-- Правая часть: уведомления, поиск, аватар -->
        <section class="user__side">
          <button 
            type="button" 
            class="notifications-btn"
            onclick={handleNotificationsClick}
          >
            <img src="src/lib/assets/Property 1=Variant2.svg" alt="Уведомления" class="notifications">
          </button>
          
          <Search
            query={searchQuery}
            onsearch={handleSearch}
          />
          
          <div class="avatar-container">
            <button 
              class="user__avatar"
              onclick={handleAvatarClick}
            >
              <img src="src/lib/assets/user_icon.svg" alt="Аватар пользователя" class="user__icon">
            </button>
          </div>
        </section>
      </section>
    </section>
  </header>
  
  <!-- ОСНОВНОЙ КОНТЕНТ -->
  <section class="workspace__content">
    <!-- БОКОВОЕ МЕНЮ -->
    <aside class="workspace__sidebar">
      <section class="sidebar__menu">
        {#each sidebarItems as item}
          <button 
            class="menu__button {item.id === activeItemId.toString() ? 'active' : ''}"
            onclick={() => handleMenuItemClick(item)}
          >
            {#if item.icon}
              <img src={item.icon} alt={item.title} class="menu__button__icon"> 
            {/if}
            <p class="menu__button__text">{item.title}</p>
            
            {#if item.badge && item.badge > 0}
              <span class="badge">{item.badge > 99 ? '99+' : item.badge}</span>
            {/if}
          </button>
        {/each}
      </section>
      
      <!-- КНОПКА ВЫХОДА -->
      <LogoutButton onclick={handleLogout} />
    </aside>
    
    <!-- ОСНОВНАЯ ОБЛАСТЬ (где рендерим компоненты) -->
    <main class="workspace__main">
      <!-- РЕНДЕРИМ НУЖНЫЙ КОМПОНЕНТ СКЛАДА -->
      {#if activeItemId === 1}
        <Dashboard />
      {:else if activeItemId === 2}
        <Catalog />
      {:else if activeItemId === 3}
        <Notifications />
      {:else if activeItemId === 4}
        <Supplies />
      {:else if activeItemId === 5}
        <Inventory />
      {:else}
        <div style="padding: 2rem; font-family: 'Montserrat', sans-serif;">
          <h1>Выберите раздел</h1>
          <p>Используйте меню для навигации</p>
        </div>
      {/if}
    </main>
  </section>
  
  <!-- ПОДВАЛ -->
<footer class="workspace__footer">
  <div style="display: flex; justify-content: space-between; align-items: center; height: 100%; padding: 0 2rem; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; color: #666;">
    <div style="display: flex; gap: 2rem;">
      <!-- Используйте кнопки или span вместо ссылок -->
      <button 
        style="background: none; border: none; color: #666; cursor: pointer; font-family: inherit; font-size: inherit; padding: 0;"
        onclick={() => console.log('Быстрые ссылки')}
      >
        Быстрые ссылки
      </button>
      <button 
        style="background: none; border: none; color: #666; cursor: pointer; font-family: inherit; font-size: inherit; padding: 0;"
        onclick={() => console.log('Юридическая информация')}
      >
        Юридическая информация
      </button>
      <button 
        style="background: none; border: none; color: #666; cursor: pointer; font-family: inherit; font-size: inherit; padding: 0;"
        onclick={() => console.log('Контакты')}
      >
        Контакты
      </button>
    </div>
    <div>
      <p style="margin: 0;">© 2024 Складская система. Версия 1.0.0</p>
    </div>
  </div>
</footer>
</section>

<style>
  /* Копируем стили из manager/+page.svelte */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    transition: all 200ms ease;
    box-sizing: border-box;
  }
  
  /* Основные стили Workspace */
  .workspace {
    margin-top: 10vh;
    margin-left: 2.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .workspace__header {
    width: 90vw;
    height: 10vh;
    background-color: white;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px 4px 10px rgb(69 76 104/0.23);
    display: flex;
    align-items: center;
  }
  
  .workspace__content {
    display: flex;
    width: 90vw;
  }
  
  .workspace__main {
    width: 75vw;
    min-height: 60vh;
    background-color: #FBFBFB;
    box-shadow: inset 0 0 0 1px rgb(157 161 173/0.2);
    padding: 20px;
    overflow-x: hidden;
    max-width: 100%;
  }
  
  .workspace__sidebar {
    width: 15vw;
    min-height: 60vh;
    background-color: white;
    box-shadow: 
      inset 0 0 0 1px rgb(157 161 173/0.20),
      0px 4px 10px 2px rgb(38 42 51 /0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1vw 0;
  }
  
  .workspace__footer {
    width: 90vw;
    height: 10vh;
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 2px 10px rgb(69 76 104/0.1);
  }
  
  /* Стили для header */
  .header__content {
    padding: 0 6.5vw;
    width: 100%;
  }
  
  .header__menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.1vw;
    width: 100%;
  }
  
  .header__links {
    display: flex;
    align-items: center;
    gap: 0.1vw;
  }
  
  .user__side {
    display: flex;
    align-items: center;
    gap: 2vw;
  }
  
  /* Кнопки в шапке */
  .menu__button {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 11vw;
    height: 5vh;
    border: 0px;
    display: flex;
    align-items: center;
    background-color: transparent;
    justify-content: center;
    position: relative;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
  }
  
  .menu__button__text {
    font-family: "Montserrat", sans-serif;
    font-size: 1vw;
  }
  
  .menu__button:hover {
    background-color: rgba(151, 151, 151, 0.1);
    border-radius: 10px;
  }
  
  .menu__button:active {
    background-color: rgba(49, 49, 49, 0.1);
  }
  
  /* Активное состояние для кнопок в шапке */
  .menu__button.active .menu__button__text {
    color: #5B89FF;
    font-weight: 600;
  }
  
  .menu__button.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 2px;
    background-color: #5B89FF;
    border-radius: 1px;
  }
  
  /* Кнопки в сайдбаре */
  .sidebar__menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
  
  .sidebar__menu .menu__button {
    width: 100%;
    padding: 0.8vw 1vw;
    justify-content: flex-start;
    height: auto;
    margin: 0.2vw 0;
  }
  
  .menu__button__icon {
    width: 1.5vw;
    height: 1.5vw;
    margin-right: 0.5vw;
  }
  
  /* Активное состояние для кнопок в сайдбаре */
  .sidebar__menu .menu__button.active {
    background-color: rgba(91, 137, 255, 0.1);
    border-left: 3px solid #5B89FF;
  }
  
  .sidebar__menu .menu__button.active .menu__button__text {
    color: #5B89FF;
    font-weight: 600;
  }
  
  /* Бейдж для уведомлений */
  .badge {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #FF4757;
    color: white;
    font-size: 0.7vw;
    font-weight: 600;
    border-radius: 50%;
    min-width: 1.2vw;
    height: 1.2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.1vw;
  }
  
  /* Уведомления */
  .notifications-btn {
    background: none;
    border: none;
    padding: 0.5vw;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .notifications {
    width: 2.5vw;
    height: 2.5vw;
  }
  
  .notifications-btn:hover {
    background-color: rgba(151, 151, 151, 0.1);
  }
  
  /* Аватар пользователя */
  .avatar-container {
    position: relative;
    display: inline-block;
  }
  
  .user__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.2vw;
    height: 3.2vw;
    border-radius: 5vw;
    border: 1px solid #D9D9D9;
    background-color: transparent;
    cursor: pointer;
  }
  
  .user__icon {
    width: 2.2vw;
    height: 2.2vw;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user__avatar:hover {
    border-color: #5B89FF;
    box-shadow: 0 0 0 2px rgba(91, 137, 255, 0.1);
  }
</style>