<script lang="ts">
		type Props = {
		title?:String;
	}

	let {
		title = "Создать аккаунт",
	}: Props = $props();
</script>

<button class="logout__button">
	{title}
</button>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
	
	* {
		transition: 200ms ease;
		margin: 0px;
		padding: 0px;
	}

	.logout__button {
		width: 12.5vw;
		height: 4vw;
		background-color: transparent;
		font-family: "Montserrat", sans-serif;
		color: black;
		font-size: 1vw;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0.15vw solid #22376c;
		border-radius: 1vw;
		box-shadow: 
			0px 4px 10px 1px #CDCDCD;
		margin-bottom: 1vw;
	}

	.logout__button:hover {
		box-shadow: 
			0px 4px 10px 1px #CDCDCD;
		cursor: pointer;
	}

	.logout__button:active {
		width: 12.3vw;
		height: 3.8vw;
		background-color: #f6f6f6;
		box-shadow: 
			0px 3px 10px 1px #CDCDCD;
	}
</style>