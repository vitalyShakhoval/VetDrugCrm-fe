<script lang="ts">
	type Props = {
		title?:String;
	}

	let {
		title = "Вкладка_1",
	}: Props = $props();
</script>

<button class="menu__button">
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
		justify-content: center;
	}

	.menu__button__text {
		font-family: "Montserrat", sans-serif;
		font-size: 1vw;
	}

		.menu__button:hover {
		cursor: pointer;
		background-color: rgba(151, 151, 151, 0.1);
		border-radius: 10px;
		padding: 0.1vw;
	}

	.menu__button:active {
		background-color: rgba(49, 49, 49, 0.1);
	}
</style>