<!-- src/routes/warehouse_manager/+page.svelte -->
<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  import WorkspaceShell from '$lib/components/workspace/WorkspaceShell.svelte';

  import WarehouseDashboard from '$lib/components/warehouse_manager/WarehouseDashboard.svelte';
  import WarehouseCatalog from '$lib/components/warehouse_manager/WarehouseCatalog.svelte';
  import WarehouseNotifications from '$lib/components/warehouse_manager/WarehouseNotifications.svelte';
  import WarehouseSupplies from '$lib/components/warehouse_manager/WarehouseSupplies.svelte';
  import WarehouseInventory from '$lib/components/warehouse_manager/WarehouseInventory.svelte';

  let activeItemId = $state('1');

  const headerItems = [
    { id: '1', title: 'Главная' },
    { id: '2', title: 'Каталог' },
    { id: '3', title: 'Уведомления' },
    { id: '4', title: 'Поставки' },
    { id: '5', title: 'Инвентаризация' }
  ];

  const sidebarItems = [
    { id: '1', title: 'Главная', icon: 'src/lib/assets/Home.svg' },
    { id: '2', title: 'Каталог', icon: 'src/lib/assets/каталог.svg' },
    { id: '3', title: 'Уведомления', icon: 'src/lib/assets/Property 1=Default.svg' },
    { id: '4', title: 'Поставки', icon: 'src/lib/assets/icon_поставки.svg' },
    { id: '5', title: 'Инвентаризация', icon: 'src/lib/assets/icon_инвентаризация.svg' }
  ];

  function handleSelect(id: string) {
    activeItemId = id;
  }

  function handleLogout() {
    navigateTo.logout();
  }
</script>

<WorkspaceShell
  headerItems={headerItems}
  sidebarItems={sidebarItems}
  activeId={activeItemId}
  onSelect={handleSelect}
  onLogout={handleLogout}
  footerLeft="© 2025 • Склад"
  footerRight="Все права защищены"
>
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
</WorkspaceShell>

<style>
  @import '$lib/workspace.css';
  .empty { padding: 2vw; }
</style>
