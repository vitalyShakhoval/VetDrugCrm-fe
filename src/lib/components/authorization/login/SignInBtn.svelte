<script lang="ts">
		type Props = {
		title?:String;
		icon?:string;
	}

	let {
		title = "Выход",
		icon ="src/lib/assets/icon_sign_in.svg"
	}: Props = $props();
</script>

<button class="logout__button">
	{#if icon}
		<img src={icon} alt="" class="button__icon">
	{/if}
	{title}
</button>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
	
	* {
		transition: 200ms ease;
		margin: 0px;
		padding: 0px;
	}

	.button__icon {
		width: 1.5vw;
		height: 1.5vw;
		margin-right: 0.3vw;
	}

	.logout__button {
		width: 12.5vw;
		height: 4vw;
		background-color: #5B89FF;
		font-family: "Montserrat", sans-serif;
		color: white;
		font-size: 1vw;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0px;
		border-radius: 1vw;
		box-shadow: 
			inset 0px 5px 5px #517CEC,
			0px 4px 10px 1px #CDCDCD;
		margin-bottom: 1vw;
	}

	.logout__button:hover {
		background-color: #3A70F8;
		box-shadow: 
			inset 0px 5px 5px #315fd3,
			0px 4px 10px 1px #CDCDCD;
		cursor: pointer;
	}

	.logout__button:active {
		width: 12.3vw;
		height: 3.8vw;
		background-color: #2D5ACB;
		box-shadow: 
			inset 0px 5px 5px rgba(46, 90, 199, 1),
			0px 3px 10px 1px #CDCDCD;
	}

</style>