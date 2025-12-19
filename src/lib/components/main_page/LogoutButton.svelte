<script lang="ts">
    type Props = {
        title?: string;
        icon?: string;
        onclick?: () => void;
        confirm?: boolean;
        confirmMessage?: string;
    }

    let {
        title = "Выход",
        icon = "src/lib/assets/icon_sign_out.svg",
        onclick,
        confirm = true,
        confirmMessage = "Вы уверены, что хотите выйти?"
    }: Props = $props();

    let showConfirm = $state(false);

    const handleClick = () => {
        if (confirm && !showConfirm) {
            showConfirm = true;
            return;
        }
        
        if (onclick) onclick();
        showConfirm = false;
    };

    const handleCancel = () => {
        showConfirm = false;
    };
</script>

<div class="logout-container">
    {#if showConfirm}
        <div class="confirm-dialog">
            <p class="confirm-message">{confirmMessage}</p>
            <div class="confirm-buttons">
                <button class="confirm-btn confirm-yes" onclick={handleClick}>
                    Да
                </button>
                <button class="confirm-btn confirm-no" onclick={handleCancel}>
                    Нет
                </button>
            </div>
        </div>
    {:else}
        <button class="logout__button" onclick={handleClick}>
            {#if icon}
                <img src={icon} alt="" class="button__icon">
            {/if}
            {title}
        </button>
    {/if}
</div>

<!-- Стили без изменений + добавим стили для подтверждения -->
<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    
    * {
        transition: 200ms ease;
        margin: 0px;
        padding: 0px;
    }

    .logout-container {
        position: relative;
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
        cursor: pointer;
    }

    .logout__button:hover {
        background-color: #FF3535;
    }

    .logout__button:active {
        width: 12.3vw;
        height: 3.8vw;
        background-color: #BA2A2A;
        box-shadow: 
            inset 0px 5px 5px #B22929,
            0px 3px 10px 1px #CDCDCD;
    }
    
    /* Стили для диалога подтверждения */
    .confirm-dialog {
        width: 12.5vw;
        padding: 1vw;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid #E3E3E3;
        margin-bottom: 1vw;
    }
    
    .confirm-message {
        font-family: "Montserrat", sans-serif;
        font-size: 0.9vw;
        margin-bottom: 1vw;
        text-align: center;
    }
    
    .confirm-buttons {
        display: flex;
        gap: 0.5vw;
        justify-content: center;
    }
    
    .confirm-btn {
        padding: 0.5vw 1vw;
        border: none;
        border-radius: 5px;
        font-family: "Montserrat", sans-serif;
        font-size: 0.8vw;
        cursor: pointer;
        font-weight: 500;
    }
    
    .confirm-yes {
        background-color: #FF5858;
        color: white;
    }
    
    .confirm-yes:hover {
        background-color: #FF3535;
    }
    
    .confirm-no {
        background-color: #F0F0F0;
        color: #333;
    }
    
    .confirm-no:hover {
        background-color: #E0E0E0;
    }
</style>