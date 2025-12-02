<script lang="ts">
		type Props = {
		title?:string;
	}

	let {
		title="Надпись",
	}: Props = $props();
</script>

<section class="text__input__position">
	<p class="text">{title}</p>
	<input type="text" class="text__input">
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		margin: 0;
		padding: 0;
	}
	
	.text__input__position {
		margin: 1vw;
	}

	.text__input {
		font-family: "Montserrat", sans-serif;
		font-size: 1.2vw;
		background-color: #F8F8F8;
		border: 0.15vw solid #D6D6D6;
		box-shadow: -1px 3px 10px rgba(180, 180, 180, 0.5);
		border-radius: 1vw;
		width: 25vw;
		aspect-ratio: 20/2;
	}

	.text {
		margin-left: 1vw;
		font-family: "Montserrat", sans-serif;
		font-size: 1.5vw;
		font-weight: 600;
	}
</style>