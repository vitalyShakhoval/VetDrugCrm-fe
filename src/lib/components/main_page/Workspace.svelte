<script lang="ts">
	import MenuButtonSidebar from '$lib/components/main_page/MenuButtonSidebar.svelte';
	import MenuButtonHeader from '$lib/components/main_page/MenuButtonHeader.svelte';
	import Search from '$lib/components/main_page/Search.svelte';
	import LogoutButton from '$lib/components/main_page/LogoutButton.svelte';
	import UserAvatar from '$lib/components/main_page/UserAvatar.svelte';

	type Props = {
		icon_notif?:string;
		title1?:string;
		title2?:string;
		title3?:string;
		title4?:string;
		title5?:string;
		icon1?:string;
		icon2?:string;
		icon3?:string;
		icon4?:string;
		icon5?:string;
	}

	let {
		icon_notif ="src/lib/assets/Property 1=Variant2.svg",
		title1 = "Вкладка",
		title2 = "Вкладка",
		title3 = "Вкладка",
		title4 = "Вкладка",
		title5 = "Вкладка",
		icon1 = "src/lib/assets/Property 1=Variant2.svg",
		icon2 = "src/lib/assets/Property 1=Variant2.svg",
		icon3 = "src/lib/assets/Property 1=Variant2.svg",
		icon4 = "src/lib/assets/Property 1=Variant2.svg",
		icon5 = "src/lib/assets/Property 1=Variant2.svg"
	}: Props = $props();

	const headerButtons = $derived([
		{ title: title1, id: 1 },
		{ title: title2, id: 2 },
		{ title: title3, id: 3 },
		{ title: title4, id: 4 },
		{ title: title5, id: 5 }
	].filter(item => item.title && item.title !== "Вкладка"));

	const sidebarButtons = $derived([
		{ title: title1, icon: icon1, id: 1 },
		{ title: title2, icon: icon2, id: 2 },
		{ title: title3, icon: icon3, id: 3 },
		{ title: title4, icon: icon4, id: 4 },
		{ title: title5, icon: icon5, id: 5 }
	].filter(item => item.title && item.title !== "Вкладка"));
</script>

<section class="workspace">
	<header class="workspace__header">
		<section class="header__content">
			<section class="header__menu">
				<!-- Левая часть - ссылки -->
				<section class="header__links">
					{#each headerButtons as button}
						<MenuButtonHeader title={button.title} />
					{/each}
				</section>

				<section class="user__side">
					<img src={icon_notif} alt="" class="notifications">
					<Search/>
					<UserAvatar />
				</section>
			</section>
		</section>
	</header>
	<section class="workspace__content">
		<aside class="workspace__sidebar">
			<section class="sidebar__menu">
				{#each sidebarButtons as button}
					<MenuButtonSidebar
						title={button.title}
						icon={button.icon} 
					/>
				{/each}
			</section>
			<LogoutButton />
		</aside>
		<main class="workspace__main"></main>
	</section>
	<footer class="workspace__footer"></footer>
</section>


<style>
	* {
    margin: 0;
    padding: 0;
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
    height: 60vh;
    background-color: #FBFBFB;
    box-shadow: inset 0 0 0 1px rgb(157 161 173/0.2);
}
.workspace__sidebar {
    width: 15vw;
    height: 60vh;
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

.notifications {
    width: 2.5vw;
    height: 2.5vw;
}

.notifications:hover {
    cursor: pointer;
    background-color: rgba(151, 151, 151, 0.1);
    border-radius: 10px;
}

</style>