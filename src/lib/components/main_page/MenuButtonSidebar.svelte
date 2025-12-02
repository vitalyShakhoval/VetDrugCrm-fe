<script lang="ts">
	type Props = {
		title?:String;
		icon?:string;
		description?:string;
	}

	let {
		title = "Вкладка_1",
		icon ="src/lib/assets/Home.svg",
		description ="ххуй"
	}: Props = $props();
</script>

<button class="menu__button">
	{#if icon}
		<img src={icon} alt={description} class="menu__button__icon"> 
	{/if}
	<p class="menu__button__text">{title}</p>
</button>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
	
	* {
		transition: 200ms ease;
		margin: 0px;
		padding: 0px;
	}
	.menu__button {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 11vw;
		height: 5vh;
		border: 0px;
		display: flex;
		align-items: center;
		background-color: transparent;
		margin-top: 1.5vw;
	}

	.menu__button__icon {
		width: 1.5vw;
		height: 1.5vw;
		margin-right: 0.2vw;
	}

	.menu__button__text {
		font-family: "Montserrat", sans-serif;
		font-size: 0.8vw;
	}

	.menu__button:hover {
		cursor: pointer;
		background-color: rgba(151, 151, 151, 0.1);
		border-radius: 10px;
		padding: 0.5vw;
	}

	.menu__button:active {
		background-color: rgba(49, 49, 49, 0.1);
	}
</style>