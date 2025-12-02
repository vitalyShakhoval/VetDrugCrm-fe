<script lang="ts">
	import TextInput from '$lib/components/authorization/login/TextInput.svelte';
	import CreateAccBtn from '$lib/components/authorization/create_acc/CreateAccBtn.svelte';
</script>

<section class="workplace">
	<p class="title">Создание аккаунта</p>
		<section class="input">
			<TextInput
				title="Почта"
			/>
			<TextInput
				title="Пароль"
			/>
		</section>
	<section class="notif">
		Пароль должен содержать:
		<ul class="password_points"> 
			<li class="point">Цифры (0-9)</li>
			<li class="point">Строчные и заглавные буквы (a-z, A-Z)</li> 
			<li class="point">Спец. символы (&#33;&#34;&#35;&#36;&#37;&#38;&#39;&#40;&#41;&#42;&#43;&#44;&#45;&#46;&#47;&#58;&#59;&#60;&#61;&#62;&#63;&#64;&#91;&#92;&#93;&#94;&#95;&#96;&#123;&#124;&#125;&#126;)</li>
		</ul>
	</section>
	<section class="btns">
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

	.notif {
		font-family: "Montserrat", sans-serif;
		font-size: 1vw;
		font-weight: 300;
		margin-bottom: 1.2vw;
	}

	.password_points {
	margin-left: 1.3vw;}
</style>