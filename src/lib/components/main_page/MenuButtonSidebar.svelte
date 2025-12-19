<script lang="ts">
    type Props = {
        title?: string;
        icon?: string;
        description?: string;
        active?: boolean;
        badge?: number;
        onclick?: () => void;
    }

    let {
        title = "Вкладка_1",
        icon = "src/lib/assets/Home.svg",
        description = "Иконка меню",
        active = false,
        badge,
        onclick
    }: Props = $props();
</script>

<button 
    class="menu__button"
    class:active={active}
    onclick={onclick}
>
    {#if icon}
        <img src={icon} alt={description} class="menu__button__icon"> 
    {/if}
    <p class="menu__button__text">{title}</p>
    
    {#if badge && badge > 0}
        <span class="badge">{badge > 99 ? '99+' : badge}</span>
    {/if}
</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    
    * {
        transition: 200ms ease;
        margin: 0px;
        padding: 0px;
    }
    
    .menu__button {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 11vw;
        height: 5vh;
        border: 0px;
        display: flex;
        align-items: center;
        background-color: transparent;
        margin-top: 1.5vw;
    }

    .menu__button__icon {
        width: 1.5vw;
        height: 1.5vw;
        margin-right: 0.2vw;
    }

    .menu__button__text {
        font-family: "Montserrat", sans-serif;
        font-size: 0.8vw;
    }

    .menu__button:hover {
        cursor: pointer;
        background-color: rgba(151, 151, 151, 0.1);
        border-radius: 10px;
        padding: 0.5vw;
    }

    .menu__button:active {
        background-color: rgba(49, 49, 49, 0.1);
    }
    
    /* Активное состояние */
    .menu__button.active {
        background-color: rgba(91, 137, 255, 0.1);
        border-left: 3px solid #5B89FF;
        padding-left: calc(0.5vw - 3px);
    }
    
    /* Стили для текста активного состояния */
    .menu__button.active .menu__button__text {
        color: #5B89FF;
        font-weight: 600;
    }
    
    /* Бейдж для уведомлений */
    .badge {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #FF4757;
        color: white;
        font-size: 0.7vw;
        font-weight: 600;
        border-radius: 50%;
        min-width: 1.2vw;
        height: 1.2vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.1vw;
    }
</style>