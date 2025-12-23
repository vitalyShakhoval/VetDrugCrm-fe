<!-- src/routes/vet/+page.svelte -->
<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  import WorkspaceShell from '$lib/components/workspace/WorkspaceShell.svelte';

  import Dashboard from '$lib/components/vet/Dashboard.svelte';
  import Dispense from '$lib/components/vet/Dispense.svelte';
  import Notifications from '$lib/components/vet/Notifications.svelte';
  import History from '$lib/components/vet/History.svelte';
  import Returns from '$lib/components/vet/Returns.svelte';

  let activeItemId = $state('1');

  const headerItems = [
    { id: '1', title: 'Главная' },
    { id: '2', title: 'Выдача' },
    { id: '3', title: 'Уведомления' },
    { id: '4', title: 'История' },
    { id: '5', title: 'Возврат' }
  ];

  const sidebarItems = [
    { id: '1', title: 'Главная', icon: 'src/lib/assets/Home.svg' },
    { id: '2', title: 'Выдача', icon: 'src/lib/assets/pills.svg' },
    { id: '3', title: 'Уведомления', icon: 'src/lib/assets/Property 1=Default.svg' },
    { id: '4', title: 'История', icon: 'src/lib/assets/icon_журнал_действий.svg' },
    { id: '5', title: 'Возврат', icon: 'src/lib/assets/icon_возврат.svg' }
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
  footerLeft="© 2025 • Ветеринар"
  footerRight="Все права защищены"
>
  {#if activeItemId === '1'}
    <Dashboard />
  {:else if activeItemId === '2'}
    <Dispense />
  {:else if activeItemId === '3'}
    <Notifications />
  {:else if activeItemId === '4'}
    <History />
  {:else if activeItemId === '5'}
    <Returns />
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
