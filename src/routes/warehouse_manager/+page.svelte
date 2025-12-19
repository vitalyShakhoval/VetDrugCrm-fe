<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  import type { MenuItem } from '$lib/menu';

  // IMPORTANT: подключаем общий адаптивный стиль (vw/vh)
  import '$lib/workspace.css';

  // Склад — странички (можно потом заменить на реальные, сейчас макет)
  import WarehouseDashboard from '$lib/components/warehouse_manager/WarehouseDashboard.svelte';
  import WarehouseCatalog from '$lib/components/warehouse_manager/WarehouseCatalog.svelte';
  import WarehouseNotifications from '$lib/components/warehouse_manager/WarehouseNotifications.svelte';
  import WarehouseSupplies from '$lib/components/warehouse_manager/WarehouseSupplies.svelte';
  import WarehouseInventory from '$lib/components/warehouse_manager/WarehouseInventory.svelte';

  // Общие компоненты (как у менеджера)
  import Search from '$lib/components/main_page/Search.svelte';
  import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';

  let activeItemId = $state<MenuItem['id']>('1');
  let searchQuery = $state('');

  const headerItems: MenuItem[] = [
    { id: '1', title: 'Главная', path: '/warehouse_manager' },
    { id: '2', title: 'Каталог', path: '/warehouse_manager' },
    { id: '3', title: 'Уведомления', path: '/warehouse_manager' },
    { id: '4', title: 'Поставки', path: '/warehouse_manager' },
    { id: '5', title: 'Инвентаризация', path: '/warehouse_manager' }
  ];

  const sidebarItems: MenuItem[] = [
    { id: '1', title: 'Главная', icon: 'src/lib/assets/Home.svg', path: '/warehouse_manager' },
    { id: '2', title: 'Каталог', icon: 'src/lib/assets/каталог.svg', path: '/warehouse_manager' },
    { id: '3', title: 'Уведомления', icon: 'src/lib/assets/Property 1=Default.svg', path: '/warehouse_manager', badge: 7 },
    { id: '4', title: 'Поставки', icon: 'src/lib/assets/icon_поставки.svg', path: '/warehouse_manager' },
    { id: '5', title: 'Инвентаризация', icon: 'src/lib/assets/icon_инвентаризация.svg', path: '/warehouse_manager' }
  ];

  function handleMenuItemClick(item: MenuItem) {
    activeItemId = item.id;
  }

  function handleSearch(query: string) {
    searchQuery = query;
    console.log('[warehouse] search:', query);
  }

  function handleNotificationsClick() {
    activeItemId = '3';
  }

  function handleAvatarClick() {
    console.log('[warehouse] profile click');
  }

  function handleLogout() {
    navigateTo.logout();
  }
</script>

<section class="workspace-common">
  <!-- HEADER -->
  <header class="workspace-header-common">
    <div class="header-inner">
      <div class="header-links" role="navigation" aria-label="Склад: верхнее меню">
        {#each headerItems as item (item.id)}
          <button
            type="button"
            class="menu-button-common header-btn {item.id === activeItemId ? 'menu-button-active' : ''}"
            onclick={() => handleMenuItemClick(item)}
            aria-current={item.id === activeItemId ? 'page' : undefined}
          >
            <span class="menu-button-text-common">{item.title}</span>
          </button>
        {/each}
      </div>

      <div class="header-right">
        <button
          type="button"
          class="notifications-btn-common"
          onclick={handleNotificationsClick}
          aria-label="Открыть уведомления"
        >
          <img
            src="src/lib/assets/Property 1=Variant2.svg"
            alt=""
            class="notifications-icon-common"
          />
        </button>

        <div class="search-wrap">
          <Search query={searchQuery} onsearch={handleSearch} />
        </div>

        <button class="user-avatar-common" type="button" onclick={handleAvatarClick} aria-label="Профиль">
          <img src="src/lib/assets/user_icon.svg" alt="" class="user-icon-common" />
        </button>
      </div>
    </div>
  </header>

  <!-- CONTENT -->
  <section class="workspace-content-common">
    <!-- SIDEBAR -->
    <aside class="workspace-sidebar-common">
      <div class="sidebar-menu" aria-label="Склад: боковое меню">
        {#each sidebarItems as item (item.id)}
          <button
            type="button"
            class="menu-button-common sidebar-btn {item.id === activeItemId ? 'active' : ''}"
            onclick={() => handleMenuItemClick(item)}

          >
            {#if item.icon}
              <img src={item.icon} alt="" class="sidebar-icon" />
            {/if}
            <span class="menu-button-text-common">{item.title}</span>
            {#if item.badge && item.badge > 0}
              <span class="badge-common">{item.badge > 99 ? '99+' : item.badge}</span>
            {/if}
          </button>
        {/each}
      </div>

      <div class="logout-wrap">
        <LogoutButton onclick={handleLogout} />
      </div>
    </aside>

    <!-- MAIN -->
    <main class="workspace-main-common">
      <div class="workspace-main-scroll">
        {#if activeItemId === '1'}
          <WarehouseDashboard />
        {:else if activeItemId === '2'}
          <WarehouseCatalog />
        {:else if activeItemId === '3'}
          <WarehouseNotifications />
        {:else if activeItemId === '4'}
          <WarehouseSupplies />
        {:else if activeItemId === '5'}
          <WarehouseInventory />
        {:else}
          <div class="empty">
            <h1 class="section-title">Выберите раздел</h1>
            <p class="muted">Используйте меню для навигации</p>
          </div>
        {/if}
      </div>
    </main>
  </section>

  <!-- FOOTER -->
  <footer class="workspace-footer-common">
    <div class="footer-inner">
      <div class="footer-links">
        <button type="button" class="footer-link" onclick={() => console.log('Быстрые ссылки')}>Быстрые ссылки</button>
        <button type="button" class="footer-link" onclick={() => console.log('Юридическая информация')}>Юридическая информация</button>
        <button type="button" class="footer-link" onclick={() => console.log('Контакты')}>Контакты</button>
      </div>
      <div class="footer-copy">© 2025 • Склад • v0.1 (макет)</div>
    </div>
  </footer>
</section>

<style>
  /* локальные стили страницы склада (дополняют workspace.css) */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  :global(*) {
    box-sizing: border-box;
  }

  .header-inner {
    width: 100%;
    padding: 0 6.5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1vw;
  }

  .header-links {
    display: flex;
    align-items: center;
    gap: 0.6vw;
    flex: 1 1 auto;
    overflow: auto;
    padding-bottom: 0.4vh;
  }

  .header-btn {
    width: max(9vw, 12vh);
    height: 5vh;
    padding: 0 1vw;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1.2vw;
    flex: 0 0 auto;
  }

  .search-wrap {
    width: max(18vw, 18vh);
  }

  .sidebar-btn {
    width: 100%;
    justify-content: flex-start;
    padding: 0.9vw 1vw;
    margin: 0.25vw 0;
    gap: 0.6vw;
  }

  .sidebar-icon {
    width: max(1.3vw, 2.2vh);
    height: max(1.3vw, 2.2vh);
    flex: 0 0 auto;
  }

  .logout-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.8vw 0;
  }

  .empty {
    padding: 2vw;
  }

  .footer-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.2vw;
    font-family: var(--font-family);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    gap: 1vw;
  }

  .footer-links {
    display: flex;
    gap: 1.4vw;
    flex-wrap: wrap;
  }

  .footer-link {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .footer-link:hover {
    color: var(--primary-color);
  }

  @media (max-width: 980px) {
    .header-inner {
      padding: 0 3.5vw;
    }

    .search-wrap {
      width: 34vw;
    }
  }

  @media (max-width: 560px) {
    .header-btn {
      width: 40vw;
    }

    .search-wrap {
      width: 44vw;
    }

    .footer-inner {
      flex-direction: column;
      justify-content: center;
      gap: 0.6vh;
      padding: 1vh 2vw;
      text-align: center;
    }

    .footer-links {
      justify-content: center;
    }
  }
</style>
