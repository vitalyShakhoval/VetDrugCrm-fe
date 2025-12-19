<!-- src\routes\manager\+page.svelte -->
<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  import Dashboard from '$lib/components/manager/Dashboard.svelte';
  import Users from '$lib/components/manager/Users.svelte';
  import Notifications from '$lib/components/manager/Notifications.svelte';
  import ActivityLog from '$lib/components/manager/ActivityLog.svelte';
  import Reports from '$lib/components/manager/Reports.svelte';
  import Search from '$lib/components/main_page/Search.svelte';
  import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';
  
  let activeItemId = $state(1);
  let searchQuery = $state('');
  
  const headerItems = [
    { id: "1", title: "Главная", path: "#" },
    { id: "2", title: "Пользователи", path: "#" },
    { id: "3", title: "Уведомления", path: "#" },
    { id: "4", title: "Журнал действий", path: "#" },
    { id: "5", title: "Отчёты", path: "#" }
  ];
  
  const sidebarItems = [
    { id: "1", title: "Главная", icon: "src/lib/assets/Home.svg", path: "#" },
    { id: "2", title: "Пользователи", icon: "src/lib/assets/users.svg", path: "#" },
    { id: "3", title: "Уведомления", icon: "src/lib/assets/Property 1=Default.svg", path: "#", badge: 5 },
    { id: "4", title: "Журнал действий", icon: "src/lib/assets/журнал_действий.svg", path: "#" },
    { id: "5", title: "Отчёты", icon: "src/lib/assets/отчеты_ocin.svg", path: "#" }
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
        <Users />
      {:else if activeItemId === 3}
        <Notifications />
      {:else if activeItemId === 4}
        <ActivityLog />
      {:else if activeItemId === 5}
        <Reports />
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
      <p>© 2025 Господи помоги мне Версия 1.0.0</p>
      <p>Все права защищены</p>
    </div>
  </footer>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  @import '$lib/workspace.css';
  
  /* Дополнительные стили для менеджера */
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
		gap: 3vw;          /* главное — расстояние между пунктами */
		flex-wrap: wrap;     /* чтобы на узких экранах переносилось, а не “слипалось” */
		overflow-x: auto;    /* если пунктов много — будет горизонтальный скролл */
		max-width: 100%;
		padding-bottom: 0.4vh;
	}
  
	.header-btn {
		min-width: max(9vw, 12vh);
		height: 5vh;
		padding: 0 1vw;
		flex: 0 0 auto; /* не даём схлопываться */
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