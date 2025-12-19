<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    type Props = {
        title?: string;
        value?: string;
        placeholder?: string;
        type?: 'text' | 'email' | 'password' | 'tel' | 'number';
        required?: boolean;
        disabled?: boolean;
        error?: string;
        id?: string;
        name?: string;
        maxlength?: number;
        showPasswordToggle?: boolean;
    }

    const dispatch = createEventDispatcher<{
        input: string;
        change: string;
    }>();

    // Используем $bindable() для пропсов, которые хотим связывать
    let {
        title = "Надпись",
        value = $bindable(),
        placeholder = "",
        type = 'text',
        required = false,
        disabled = false,
        error = "",
        id,
        name,
        maxlength,
        showPasswordToggle = false
    }: Props = $props();

    // Используем $state для локального состояния
    let showPassword = $state(false);

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        value = target.value;
        dispatch('input', value);
    };

    const handleChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        value = target.value;
        dispatch('change', value);
    };

    // Используем $derived для вычисляемых значений
    const computedType = $derived(type === 'password' && showPassword ? 'text' : type);
    const isPassword = $derived(type === 'password');
</script>

<section class="text__input__position">
    <p class="text">
        {title}
        {#if required}*{/if}
    </p>
    
    <div class="input-container">
        <input
            {id}
            {name}
            type={computedType}
            {placeholder}
            {required}
            {disabled}
            {maxlength}
            class="text__input"
            oninput={handleInput}
            onchange={handleChange}
            value={value}
        />
        
        {#if isPassword && showPasswordToggle}
            <button
                type="button"
                class="password-toggle"
                onclick={() => showPassword = !showPassword}
            >
                {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
        {/if}
    </div>
    
    {#if error}
        <div class="error">{error}</div>
    {/if}
</section>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    * {
        margin: 0;
        padding: 0;
    }
    
    .text__input__position {
        margin: 1vw 0vw;
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
    
    .input-container {
        position: relative;
        display: inline-block;
    }
    
    .password-toggle {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 16px;
    }
    
    .error {
        color: #ff0000;
        font-size: 14px;
        margin-left: 10px;
        margin-top: 4px;
    }
</style>