<script lang="ts">
	import TextInput from '$lib/components/authorization/login/TextInput.svelte';
	import SignInBtn from '$lib/components/authorization/login/SignInBtn.svelte';
	import CreateAccBtn from '$lib/components/authorization/login/CreateAccBtn.svelte';
</script>

<section class="workplace">
	<p class="title">Вход</p>
		<section class="input">
			<TextInput
				title="Почта"
			/>
			<TextInput
				title="Пароль"
			/>
		</section>
	<section class="btns">
		<SignInBtn />
		<CreateAccBtn />
	</section>
</section>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

	.workplace {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 62.5vw;
		aspect-ratio: 12/7;
		background-color: rgb(255, 255, 255);
		border-radius: 1.5vw;
		border: 1px solid #E3E3E3;
		box-shadow: -0.5px 4px 6px rgba(107, 107, 107, 0.25);
	}

	.input {
		margin-bottom: 1vw;
	}

	.title {
		font-family: "Montserrat", sans-serif;
		font-weight: 750;
		font-size: 3.5vw;
	}

	.btns {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>