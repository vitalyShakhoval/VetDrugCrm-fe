<script lang="ts">
	import TextInput from '$lib/components/authorization/create_acc/verify/TextInput.svelte';
	import AcceptBtn from '$lib/components/authorization/create_acc/verify/AcceptBtn.svelte';
</script>

<section class="workplace">
	<p class="title">Создание аккаунта</p>
	<section class="direction_left">
		<section class="notif">
			<section class="notif_abt_code">
				На почту:<p class="mail_adress">example@mail.ru</p>
			</section>
			Отправлен код подтверждения
		</section>
			<section class="input">
				<TextInput
					title="Код"
				/>
			</section>
		<section class="send_code_again">
			Не пришёл код? <p class="send_code_again_btn">Отправить ещё раз</p>
		</section>
	</section>
	<section class="btns">
		<AcceptBtn
			title="Подтвердить"
		/>
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

	.send_code_again {
		font-family: "Montserrat", sans-serif;
		font-size: 1vw;
		font-weight: 300;
		margin-bottom: 2vw;
		display: flex;
		justify-content: center;
	}

	.send_code_again_btn {
		margin-left: 0.3vw;
		color: #5B89FF;
	}

	.notif {
		font-family: "Montserrat", sans-serif;
		font-size: 1.5vw;
		margin: 1vw 0vw;
	}
	
	.notif_abt_code {
		display: flex;
		text-align: justify;
	}

	.mail_adress {
		color: #5B89FF;
		font-weight: 800;
		margin-left: 2.5vw;
	}
	
</style>