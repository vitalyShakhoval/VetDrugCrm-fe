<script lang="ts">
    import MenuButtonSidebar from './MenuButtonSidebar.svelte';
    import MenuButtonHeader from './MenuButtonHeader.svelte';
    import Search from './Search.svelte';
    import LogoutButton from './LogoutButton.svelte';
    import UserAvatar from './UserAvatar.svelte';
    
    type MenuItem = {
        id: string | number;
        title: string;
        icon?: string;
        path?: string;
        badge?: number;
    }
    
    type Props = {
        headerItems?: MenuItem[];
        sidebarItems?: MenuItem[];
        icon_notif?: string;
        userAvatar?: string;
        onMenuItemClick?: (item: MenuItem) => void;
        onSearch?: (query: string) => void;
        onNotificationsClick?: () => void;
        onAvatarClick?: () => void;
        onLogout?: () => void;
        activeItemId?: string | number;
        searchQuery?: string;
        children?: any;  // Должен быть компонент Svelte
        footerChildren?: () => any;
    }

    let {
        headerItems = [],
        sidebarItems = [],
        icon_notif = "src/lib/assets/Property 1=Variant2.svg",
        userAvatar = "src/lib/assets/user_icon.svg",
        onMenuItemClick,
        onSearch,
        onNotificationsClick,
        onAvatarClick,
        onLogout,
        activeItemId = 1,
        searchQuery = "",
        children = () => null,
        footerChildren = () => ''
    }: Props = $props();

    const handleMenuItemClick = (item: MenuItem) => {
        activeItemId = item.id;
        if (onMenuItemClick) onMenuItemClick(item);
    };

    const handleSearch = (query: string) => {
        if (onSearch) onSearch(query);
    };

    const handleNotificationsClick = () => {
        if (onNotificationsClick) onNotificationsClick();
    };

    const handleAvatarClick = () => {
        if (onAvatarClick) onAvatarClick();
    };

    const handleLogout = () => {
        if (onLogout) onLogout();
    };
</script>

<section class="workspace">
    <header class="workspace__header">
        <section class="header__content">
            <section class="header__menu">
                <section class="header__links">
                    {#each headerItems as item}
                        <MenuButtonHeader
                            title={item.title}
                            active={item.id === activeItemId}
                            onclick={() => handleMenuItemClick(item)}
                        />
                    {/each}
                </section>

                <section class="user__side">
                    <button 
                        type="button" 
                        class="notifications-btn"
                        onclick={handleNotificationsClick}
                    >
                        <img src={icon_notif} alt="Уведомления" class="notifications">
                    </button>
                    <Search
                        query={searchQuery}
                        onsearch={handleSearch}
                    />
                    <UserAvatar
                        icon={userAvatar}
                        onclick={handleAvatarClick}
                    />
                </section>
            </section>
        </section>
    </header>
    
    <section class="workspace__content">
        <aside class="workspace__sidebar">
            <section class="sidebar__menu">
                {#each sidebarItems as item}
                    <MenuButtonSidebar
                        title={item.title}
                        icon={item.icon}
                        active={item.id === activeItemId}
                        badge={item.badge}
                        onclick={() => handleMenuItemClick(item)}
                    />
                {/each}
            </section>
            <LogoutButton onclick={handleLogout} />
        </aside>
        
        <main class="workspace__main">
            <!-- Ключевой момент: рендерим компонент -->
            {#if children}
                {@render children()}
            {/if}
        </main>
    </section>
    
    <footer class="workspace__footer">
        {@html footerChildren()}
    </footer>
</section>

<style>
    * {
        margin: 0;
        padding: 0;
				transition: 200ms ease;
    }
    
    .workspace {
        margin-top: 10vh;
        margin-left: 2.5vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .workspace__header {
        width: 90vw;
        height: 10vh;
        background-color: white;
        border-radius: 10px 10px 0px 0px;
        box-shadow: 0px 4px 10px rgb(69 76 104/0.23);
        display: flex;
        align-items: center;
    }
    
    .workspace__content {
        display: flex;
        width: 90vw;
    }
    
    .workspace__main {
        width: 75vw;
        min-height: 60vh;
        background-color: #FBFBFB;
        box-shadow: inset 0 0 0 1px rgb(157 161 173/0.2);
        padding: 20px; /* Добавил padding для контента */
    }
    
    .workspace__sidebar {
        width: 15vw;
        min-height: 60vh;
        background-color: white;
        box-shadow: 
            inset 0 0 0 1px rgb(157 161 173/0.20),
            0px 4px 10px 2px rgb(38 42 51 /0.05);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    
    .workspace__footer {
        width: 90vw;
        height: 10vh;
        background-color: white;
        border-radius: 0px 0px 10px 10px;
        box-shadow: 0px 2px 10px rgb(69 76 104/0.1);
    }

    .sidebar__menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .header__content {
        padding: 0 6.5vw;
        width: 100%;
    }

    .header__menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.1vw;
        width: 100%;
    }

    .header__links {
        display: flex;
        align-items: center;
        gap: 0.1vw;
    }

    .user__side {
        display: flex;
        align-items: center;
        gap: 2vw;
    }

    .notifications-btn {
        background: none;
        border: none;
        padding: 0.5vw;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .notifications {
        width: 2.5vw;
        height: 2.5vw;
    }

    .notifications-btn:hover {
        background-color: rgba(151, 151, 151, 0.1);
    }
</style>