<!-- src/routes/manager/+page.svelte -->
<script lang="ts">
  import { navigateTo } from '$lib/navigation';
  import WorkspaceShell from '$lib/components/workspace/WorkspaceShell.svelte';

  import Dashboard from '$lib/components/manager/Dashboard.svelte';
  import Users from '$lib/components/manager/Users.svelte';
  import Notifications from '$lib/components/manager/Notifications.svelte';
  import ActivityLog from '$lib/components/manager/ActivityLog.svelte';
  import Reports from '$lib/components/manager/Reports.svelte';

  let activeItemId = $state('1');

  const headerItems = [
    { id: '1', title: 'Главная' },
    { id: '2', title: 'Пользователи' },
    { id: '3', title: 'Уведомления' },
    { id: '4', title: 'Журнал действий' },
    { id: '5', title: 'Отчёты' }
  ];

  const sidebarItems = [
    { id: '1', title: 'Главная', icon: 'src/lib/assets/Home.svg' },
    { id: '2', title: 'Пользователи', icon: 'src/lib/assets/users.svg' },
    { id: '3', title: 'Уведомления', icon: 'src/lib/assets/Property 1=Default.svg' },
    { id: '4', title: 'Журнал действий', icon: 'src/lib/assets/журнал_действий.svg' },
    { id: '5', title: 'Отчёты', icon: 'src/lib/assets/отчеты_ocin.svg' }
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
  footerLeft="© 2025 • Менеджер"
  footerRight="Все права защищены"
>
  {#if activeItemId === '1'}
    <Dashboard />
  {:else if activeItemId === '2'}
    <Users />
  {:else if activeItemId === '3'}
    <Notifications />
  {:else if activeItemId === '4'}
    <ActivityLog />
  {:else if activeItemId === '5'}
    <Reports />
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
