<!-- src/lib/components/vet/Notifications.svelte -->
<script lang="ts">
  import NotificationsTab, { type NotificationUnread, type NotificationRead } from '$lib/components/common/NotificationsTab.svelte';

  const unread: NotificationUnread[] = [
    {
      id: 1,
      level: 'warning',
      title: 'Низкий запас препарата',
      description: 'Антибиотик "Байтрил" — осталось 8 ед.',
      time: 'Сегодня'
    },
    {
      id: 2,
      level: 'alert',
      title: 'Срок годности заканчивается',
      description: 'Вакцина "Нобиван" — истекает через 3 дня.',
      time: '09:15'
    },
    {
      id: 3,
      level: 'info',
      title: 'Новая поставка',
      description: 'Поступила партия витаминов "Гамавит" — 150 ед.',
      time: 'Вчера'
    }
  ];

  const read: NotificationRead[] = [
    {
      id: 4,
      level: 'info',
      title: 'Завершена инвентаризация',
      description: 'Завершена инвентаризация склада А.',
      date: '26.07.2024'
    },
    {
      id: 5,
      level: 'info',
      title: 'Обновлен каталог препаратов',
      description: 'Обновлен каталог препаратов.',
      date: '25.07.2024'
    },
    {
      id: 6,
      level: 'info',
      title: 'Новый пользователь',
      description: 'Добавлен новый пользователь: Петров А.В.',
      date: '24.07.2024'
    }
  ];
</script>

<NotificationsTab
  title="Уведомления"
  subtitle="Системные уведомления и предупреждения"
  initialUnread={unread}
  initialRead={read}
  showImportantToggle={true}
/>
