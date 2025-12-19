<script lang="ts">
  import type { MenuItem } from '$lib/menu';
  import type { Snippet } from 'svelte';

  import '$lib/workspace.css';

  import Search from '$lib/components/main_page/Search.svelte';
  import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';

  type Props = {
    headerItems: MenuItem[];
    sidebarItems: MenuItem[];
    activeItemId: MenuItem['id'];
    searchQuery: string;

    onMenuItemClick: (item: MenuItem) => void;
    onSearch: (query: string) => void;

    onNotificationsClick?: () => void;
    onAvatarClick?: () => void;
    onLogout: () => void;

    notificationsIconSrc?: string;
    userIconSrc?: string;

    /** Контент страницы */
    children?: () => Snippet;

    /** Контент футера (опционально) */
    footerChildren?: () => Snippet;
  };

  const props = $props() as Props;

  const {
    headerItems,
    sidebarItems,
    activeItemId,
    searchQuery,
    onMenuItemClick,
    onSearch,
    onNotificationsClick,
    onAvatarClick,
    onLogout,
    notificationsIconSrc = 'src/lib/assets/Property 1=Variant2.svg',
    userIconSrc = 'src/lib/assets/user_icon.svg',
    children,
    footerChildren
  } = props;

  const handleNotifications = () => onNotificationsClick?.();
  const handleAvatar = () => onAvatarClick?.();
</script>

<section class="workspace-common">
  <!-- HEADER -->
  <header class="workspace-header-common">
    <div class="header-inner">
      <nav class="header-links" aria-label="Верхнее меню">
        {#each headerItems as item (item.id)}
          <button
            type="button"
            class="menu-button-common header-btn {item.id === activeItemId ? 'menu-button-active' : ''}"
            aria-current={item.id === activeItemId ? 'page' : undefined}
            onclick={() => onMenuItemClick(item)}
          >
            <span class="menu-button-text-common">{item.title}</span>
          </button>
        {/each}
      </nav>

      <div class="header-right">
        <button
          type="button"
          class="notifications-btn-common"
          aria-label="Открыть уведомления"
          onclick={handleNotifications}
        >
          <img class="notifications-icon-common" src={notificationsIconSrc} alt="" />
        </button>

        <div class="search-wrap">
          <Search query={searchQuery} onsearch={onSearch} />
        </div>

        <button
          type="button"
          class="user-avatar-common"
          aria-label="Профиль"
          onclick={handleAvatar}
        >
          <img class="user-icon-common" src={userIconSrc} alt="" />
        </button>
      </div>
    </div>
  </header>

  <!-- CONTENT -->
  <section class="workspace-content-common">
    <!-- SIDEBAR -->
    <aside class="workspace-sidebar-common" aria-label="Боковое меню">
      <div class="sidebar-menu">
        {#each sidebarItems as item (item.id)}
          <button
            type="button"
            class="menu-button-common sidebar-btn {item.id === activeItemId ? 'active' : ''}"
            onclick={() => onMenuItemClick(item)}
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
        <LogoutButton onclick={onLogout} />
      </div>
    </aside>

    <!-- MAIN -->
    <main class="workspace-main-common">
      <div class="workspace-main-scroll">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </main>
  </section>

  <!-- FOOTER -->
  <footer class="workspace-footer-common">
    {#if footerChildren}
      {@render footerChildren()}
    {/if}
  </footer>
</section>

<style>
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
    gap: 0.8vw;
    flex: 1 1 auto;
    overflow-x: auto;
    max-width: 100%;
    padding-bottom: 0.4vh;
  }

  .header-btn {
    min-width: max(9vw, 12vh);
    height: 5vh;
    padding: 0 1vw;
    flex: 0 0 auto;
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

  /* Узкие экраны: header становится двухрядным */
  @media (max-width: 980px) {
    .header-inner {
      padding: 1vh 3.5vw;
      flex-direction: column;
      align-items: stretch;
      gap: 1vh;
    }

    .header-right {
      width: 100%;
      justify-content: flex-end;
    }

    .search-wrap {
      width: 60vw;
    }
  }

  @media (max-width: 560px) {
    .header-right {
      justify-content: space-between;
    }

    .search-wrap {
      width: 55vw;
    }
  }
</style>
