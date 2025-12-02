<script lang="ts">
		type Props = {
		title?:String;
		icon?:string;
	}

	let {
		title = "Выход",
		icon ="src/lib/assets/icon_sign_out.svg"
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
		background-color: #FF5858;
		font-family: "Montserrat", sans-serif;
		color: white;
		font-size: 1vw;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0px;
		border-radius: 10px;
		box-shadow: 
			inset 0px 5px 5px #F05252,
			0px 3px 10px 1px #CDCDCD;
		margin-bottom: 1vw;
	}

	.logout__button:hover {
		background-color: #FF3535;
		cursor: pointer;
	}

	.logout__button:active {
		width: 12.3vw;
		height: 3.8vw;
		background-color: #BA2A2A;
		box-shadow: 
			inset 0px 5px 5px #B22929,
			0px 3px 10px 1px #CDCDCD;
	}

</style>