<!-- src/lib/components/warehouse_manager/WarehouseNotifications.svelte -->
<script lang="ts">
  import NotificationsTab, { type NotificationUnread, type NotificationRead } from '$lib/components/common/NotificationsTab.svelte';

  const unread: NotificationUnread[] = [
    {
      id: 'N-07',
      level: 'warning',
      title: 'Низкий остаток',
      description: 'Антисептик “пример” — осталось 12 шт.',
      time: '10:24'
    },
    {
      id: 'N-06',
      level: 'alert',
      title: 'Поставка задерживается',
      description: 'S-1018 — задержка на 1 день.',
      time: '09:10'
    },
    {
      id: 'N-05',
      level: 'info',
      title: 'Успешно принято',
      description: 'S-1019 — принято на склад.',
      time: 'Вчера'
    }
  ];

  const read: NotificationRead[] = [
    {
      id: 'N-04',
      level: 'info',
      title: 'Поставка оформлена',
      description: 'S-1017 — создана накладная и отправлена в работу.',
      date: '26.07.2024'
    },
    {
      id: 'N-03',
      level: 'warning',
      title: 'Проверить срок годности',
      description: 'Партия B-204 — истекает через 30 дней.',
      date: '25.07.2024'
    }
  ];
</script>

<NotificationsTab
  title="Уведомления"
  subtitle="Оповещения по остаткам, поставкам и партиям"
  initialUnread={unread}
  initialRead={read}
  showImportantToggle={true}
/>
