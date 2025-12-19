<!-- src\routes\vet\+page.svelte -->
<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  import Dashboard from '$lib/components/vet/Dashboard.svelte';
  import Dispense from '$lib/components/vet/Dispense.svelte';
  import Notifications from '$lib/components/vet/Notifications.svelte';
  import History from '$lib/components/vet/History.svelte';
  import Returns from '$lib/components/vet/Returns.svelte';
  import Search from '$lib/components/main_page/Search.svelte';
  import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';
  
  let activeItemId = $state(1);
  let searchQuery = $state('');
  
  const headerItems = [
    { id: "1", title: "Главная", path: "#" },
    { id: "2", title: "Выдача", path: "#" },
    { id: "3", title: "Уведомления", path: "#" },
    { id: "4", title: "История", path: "#" },
    { id: "5", title: "Возврат", path: "#" }
  ];
  
  const sidebarItems = [
    { id: "1", title: "Главная", icon: "src/lib/assets/Home.svg", path: "#" },
    { id: "2", title: "Выдача", icon: "src/lib/assets/pills.svg", path: "#" },
    { id: "3", title: "Уведомления", icon: "src/lib/assets/Property 1=Default.svg", path: "#", badge: 3 },
    { id: "4", title: "История", icon: "src/lib/assets/icon_журнал_действий.svg", path: "#" },
    { id: "5", title: "Возврат", icon: "src/lib/assets/icon_возврат.svg", path: "#" }
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

<div class="workspace-common">
  <!-- ШАПКА -->
  <header class="workspace-header-common">
    <div class="header-content">
      <div class="header-menu">
        <!-- Левая часть: кнопки меню -->
        <div class="header-links">
          {#each headerItems as item}
            <button 
              class="menu-button-common {item.id === activeItemId.toString() ? 'menu-button-active' : ''}"
              onclick={() => handleMenuItemClick(item)}
            >
              <p class="menu-button-text-common">{item.title}</p>
            </button>
          {/each}
        </div>
        
        <!-- Правая часть: уведомления, поиск, аватар -->
        <div class="user-side">
          <button 
            type="button" 
            class="notifications-btn-common"
            onclick={handleNotificationsClick}
          >
            <img src="src/lib/assets/Property 1=Variant2.svg" alt="Уведомления" class="notifications-icon-common">
          </button>
          
          <Search
            query={searchQuery}
            onsearch={handleSearch}
          />
          
          <div class="avatar-container">
            <button 
              class="user-avatar-common"
              onclick={handleAvatarClick}
            >
              <img src="src/lib/assets/user_icon.svg" alt="Аватар пользователя" class="user-icon-common">
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <!-- ОСНОВНОЙ КОНТЕНТ -->
  <div class="workspace-content-common">
    <!-- БОКОВОЕ МЕНЮ -->
    <aside class="workspace-sidebar-common">
      <div class="sidebar-menu">
        {#each sidebarItems as item}
          <button 
            class="menu-button-common {item.id === activeItemId.toString() ? 'active' : ''}"
            onclick={() => handleMenuItemClick(item)}
          >
            {#if item.icon}
              <img src={item.icon} alt={item.title} class="menu-button-icon"> 
            {/if}
            <p class="menu-button-text-common">{item.title}</p>
            
            {#if item.badge && item.badge > 0}
              <span class="badge-common">{item.badge > 99 ? '99+' : item.badge}</span>
            {/if}
          </button>
        {/each}
      </div>
      
      <!-- КНОПКА ВЫХОДА -->
      <LogoutButton onclick={handleLogout} />
    </aside>
    
    <!-- ОСНОВНАЯ ОБЛАСТЬ -->
    <main class="workspace-main-common">
      {#if activeItemId === 1}
        <Dashboard />
      {:else if activeItemId === 2}
        <Dispense />
      {:else if activeItemId === 3}
        <Notifications />
      {:else if activeItemId === 4}
        <History />
      {:else if activeItemId === 5}
        <Returns />
      {:else}
        <div class="default-content">
          <h1>Выберите раздел</h1>
          <p>Используйте меню для навигации</p>
        </div>
      {/if}
    </main>
  </div>
  
  <!-- ПОДВАЛ -->
  <footer class="workspace-footer-common">
    <div class="footer-content">
      <p>© 2024 Ветеринарная система. Версия 1.0.0</p>
      <p>Все права защищены</p>
    </div>
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  @import '$lib/workspace.css';
  
  /* Дополнительные стили для ветеринара */
  .header-content {
    padding: 0 6.5vw;
    width: 100%;
  }
  
  .header-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.1vw;
    width: 100%;
  }
  
  .header-links {
    display: flex;
    align-items: center;
    gap: 0.1vw;
  }
  
  .user-side {
    display: flex;
    align-items: center;
    gap: 2vw;
  }
  
  .sidebar-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }
  
  .sidebar-menu .menu-button-common {
    width: 100%;
    padding: 0.8vw 1vw;
    justify-content: flex-start;
    height: auto;
    margin: 0.2vw 0;
  }
  
  .menu-button-icon {
    width: 1.5vw;
    height: 1.5vw;
    margin-right: 0.5vw;
  }
  
  .avatar-container {
    position: relative;
    display: inline-block;
  }
  
  .default-content {
    padding: 2rem;
    font-family: 'Montserrat', sans-serif;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    color: #666;
  }
  
  .footer-content p {
    margin: 0.2rem 0;
  }
</style>