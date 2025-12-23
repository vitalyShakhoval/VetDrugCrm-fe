<script lang="ts">
  import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';

  export type ShellMenuItem = {
    id: string;
    title: string;
    icon?: string;
    /**
     * Badge intentionally unsupported in UI.
     * (We hide .badge-common globally so it never flashes anywhere.)
     */
    badge?: number;
  };

  type Props = {
    headerItems: ShellMenuItem[];
    sidebarItems: ShellMenuItem[];
    activeId: string;
    onSelect: (id: string) => void;
    onLogout: () => void;
    footerLeft?: string;
    footerRight?: string;
  };

  let {
    headerItems,
    sidebarItems,
    activeId,
    onSelect,
    onLogout,
    footerLeft = '© 2025 VetDrugCRM',
    footerRight = 'Все права защищены'
  }: Props = $props();
</script>

<section class="workspace-common">
  <header class="workspace-header-common">
    <div class="shell-header-inner" role="navigation" aria-label="Верхнее меню">
      <div class="shell-header-links">
        {#each headerItems as item (item.id)}
          <button
            type="button"
            class="menu-button-common shell-header-btn {item.id === activeId ? 'menu-button-active' : ''}"
            onclick={() => onSelect(item.id)}
            aria-current={item.id === activeId ? 'page' : undefined}
          >
            <span class="menu-button-text-common">{item.title}</span>
          </button>
        {/each}
      </div>
    </div>
  </header>

  <section class="workspace-content-common">
    <aside class="workspace-sidebar-common" aria-label="Боковое меню">
      <div class="shell-sidebar-menu">
        {#each sidebarItems as item (item.id)}
          <button
            type="button"
            class="menu-button-common shell-sidebar-btn {item.id === activeId ? 'active' : ''}"
            onclick={() => onSelect(item.id)}
          >
            {#if item.icon}
              <img src={item.icon} alt="" class="shell-sidebar-icon" />
            {/if}
            <span class="menu-button-text-common">{item.title}</span>
            {#if item.badge && item.badge > 0}
              <span class="badge-common">{item.badge > 99 ? '99+' : item.badge}</span>
            {/if}
          </button>
        {/each}
      </div>

      <div class="shell-logout-wrap">
        <LogoutButton onclick={onLogout} />
      </div>
    </aside>

    <main class="workspace-main-common">
      <div class="workspace-main-scroll">
        <slot />
      </div>
    </main>
  </section>

  <footer class="workspace-footer-common">
    <div class="shell-footer">
      <p class="shell-footer-text">{footerLeft}</p>
      <p class="shell-footer-text">{footerRight}</p>
    </div>
  </footer>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  @import '$lib/workspace.css';

  .shell-header-inner {
    width: 100%;
    padding: 0 6.5vw;
    display: flex;
    align-items: center;
  }

  .shell-header-links {
    display: flex;
    align-items: center;
    gap: 3vw;
    flex-wrap: wrap;
    overflow-x: auto;
    max-width: 100%;
    padding-bottom: 0.4vh;
  }

  .shell-header-btn {
    min-width: max(9vw, 12vh);
    height: 5vh;
    padding: 0 1vw;
    flex: 0 0 auto;
  }

  .shell-sidebar-menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  .shell-sidebar-btn {
    width: 100%;
    padding: 0.8vw 1vw;
    justify-content: flex-start;
    height: auto;
    margin: 0.2vw 0;
    gap: 0.6vw;
  }

  .shell-sidebar-icon {
    width: max(1.3vw, 2.2vh);
    height: max(1.3vw, 2.2vh);
    flex: 0 0 auto;
  }

  .shell-logout-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.8vw 0;
  }

  .shell-footer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.2vw;
    font-family: var(--font-family);
  }

  .shell-footer-text {
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }
</style>
