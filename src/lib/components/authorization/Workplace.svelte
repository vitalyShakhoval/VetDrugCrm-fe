<script lang="ts">
	  import TextInput from '$lib/components/authorization/TextInput.svelte';
    import Button from '$lib/components/authorization/Button.svelte';

    type WorkplaceType = 'create' | 'verify' | 'login';
    
    type Props = {
        type?: WorkplaceType;
        // Для формы создания аккаунта
        email?: string;
        password?: string;
        confirmPassword?: string;
        // Для формы верификации
        verificationCode?: string;
        // Роль (если бэкенд не возвращает роль при логине)
        role?: string;
        emailAddress?: string;
        // Общие пропсы
        title?: string;
        // События (используем onclick вместо on:event)
        onCreateAccount?: () => void;
        onVerify?: () => void;
        onLogin?: () => void;
        onSendCodeAgain?: () => void;
        onCreateAccountClick?: () => void;
    }

    let {
        type = 'create',
        email = $bindable(),
        password = $bindable(),
        confirmPassword = $bindable(),
        role = $bindable('veterinarian'),
        verificationCode = $bindable(),
        emailAddress = 'example@mail.ru',
        title,
        onCreateAccount,
        onVerify,
        onLogin,
        onSendCodeAgain,
        onCreateAccountClick
    }: Props = $props();

    // Вычисляемые значения
    const computedTitle = $derived(
        title || {
            create: 'Создание аккаунта',
            verify: 'Создание аккаунта',
            login: 'Вход'
        }[type]
    );

    // Обработчики
    const handleCreateAccount = () => {
        if (onCreateAccount) onCreateAccount();
    };

    const handleVerify = () => {
        if (onVerify) onVerify();
    };

    const handleLogin = () => {
        if (onLogin) onLogin();
    };

    const handleSendCodeAgain = () => {
        if (onSendCodeAgain) onSendCodeAgain();
    };

    const handleCreateAccountClick = () => {
        if (onCreateAccountClick) onCreateAccountClick();
    };
</script>

				<section class="workplace">
							<p class="title">{computedTitle}</p>
							
							{#if type === 'create'}
									<!-- Форма создания аккаунта -->
									<section class="input">
							<TextInput
									title="Почта"
									type="email"
									bind:value={email}
									placeholder="example@mail.com"
									required={true}
							/>
							<TextInput 
									title="Пароль" 
									bind:value={password}
									type="password"
									placeholder="Введите пароль"
									showPasswordToggle={true}
									maxlength={20}
							/>
							<!-- Добавьте это поле -->
							<TextInput 
									title="Подтвердите пароль" 
									bind:value={confirmPassword}
									type="password"
									placeholder="Повторите пароль"
									showPasswordToggle={true}
									maxlength={20}
							/>

									<!-- Роль -->
									<div class="role-field">
										<label class="role-label">Роль</label>
										<select class="role-select" bind:value={role}>
											<option value="manager">Менеджер</option>
											<option value="veterinarian">Ветеринар</option>
											<option value="warehouseman">Кладовщик</option>
										</select>
									</div>
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
            <!-- Используем onclick вместо on:click -->
            <Button 
                type="reg" 
                title="Создать аккаунт"
                onclick={handleCreateAccount}
            />
        </section>
        
    {:else if type === 'verify'}
        <!-- Форма верификации -->
        <section class="direction_left">
            <section class="notif">
                <section class="notif_abt_code">
                    На почту:<p class="mail_adress">{emailAddress}</p>
                </section>
                Отправлен код подтверждения
            </section>
            
            <section class="input">
                <TextInput
                    title="Код"
                    bind:value={verificationCode}
                    type="text"
                    placeholder="Введите 6-значный код"
                    maxlength={6}
                />
            </section>
            
            <section class="send_code_again">
                Не пришёл код? 
                <button
                    type="button"
                    class="send_code_again_btn"
                    onclick={handleSendCodeAgain}
                >
                    Отправить ещё раз
                </button>
            </section>
        </section>
        
        <section class="btns">
            <Button
                type="accept"
                title="Подтвердить"
                onclick={handleVerify}
            />
        </section>
        
    {:else if type === 'login'}
        <!-- Форма входа -->
        <section class="input">
            <TextInput
                title="Почта"
                bind:value={email}
                type="email"
                placeholder="example@mail.com"
                required={true}
            />
            <TextInput
                title="Пароль"
                bind:value={password}
                type="password"
                placeholder="Введите пароль"
                showPasswordToggle={true}
                maxlength={20}
            />

									<!-- Роль -->
									<div class="role-field">
										<label class="role-label">Роль</label>
										<select class="role-select" bind:value={role}>
											<option value="manager">Менеджер</option>
											<option value="veterinarian">Ветеринар</option>
											<option value="warehouseman">Кладовщик</option>
										</select>
									</div>
        </section>
        
        <section class="btns">
            <Button 
                type="signin" 
                title="Войти" 
                icon="src/lib/assets/icon_sign_in.svg"
                onclick={handleLogin}
            />
            <Button 
                type="log" 
                title="Создать аккаунт"
                onclick={handleCreateAccountClick}
            />
        </section>
    {/if}
</section>

<style>
    /* ОБЩИЕ СТИЛИ */
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

    .input {
        margin-bottom: 1vw;
    }

    .btns {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    /* СТИЛИ ДЛЯ ТИПА CREATE */
    .notif {
        font-family: "Montserrat", sans-serif;
        font-size: 1vw;
        font-weight: 300;
        margin-bottom: 1.2vw;
    }

    .password_points {
        margin-left: 1.3vw;
    }

    /* СТИЛИ ДЛЯ ТИПА VERIFY */
    .send_code_again {
        font-family: "Montserrat", sans-serif;
        font-size: 1vw;
        font-weight: 300;
        margin-bottom: 2vw;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3vw;
    }

    .send_code_again_btn {
        background: none;
        border: none;
        color: #5B89FF;
        cursor: pointer;
        font-weight: 500;
        font-size: 1vw;
        font-family: "Montserrat", sans-serif;
        padding: 0;
        text-decoration: underline;
        transition: color 0.2s ease;
    }
    
    .send_code_again_btn:hover {
        color: #3A70F8;
    }
    
    .send_code_again_btn:focus {
        outline: 2px solid #5B89FF;
        outline-offset: 2px;
        border-radius: 2px;
    }

    .notif {
        font-family: "Montserrat", sans-serif;
        font-size: 1.5vw;
        margin: 1vw 0vw;
    }
    
    .notif_abt_code {
        display: flex;
        text-align: justify;
        align-items: center;
        margin-bottom: 0.5vw;
    }

    .mail_adress {
        color: #5B89FF;
        font-weight: 800;
        margin-left: 2.5vw;
    }
    
    .direction_left {
        text-align: center;
    }


	.role-field{
		display:flex;
		flex-direction:column;
		gap:6px;
		margin-top:12px;
	}
	.role-label{
		font-size:14px;
		font-weight:600;
		color:#2d2d2d;
		font-family:'Montserrat', sans-serif;
	}
	.role-select{
		padding:12px 14px;
		border-radius:12px;
		border:1px solid #d0d0d0;
		font-family:'Montserrat', sans-serif;
		font-size:14px;
		background:white;
	}
</style>