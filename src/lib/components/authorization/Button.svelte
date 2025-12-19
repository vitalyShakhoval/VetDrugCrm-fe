<script lang="ts">
    type Props = {
        title?: string;
        type?: 'reg' | 'log' | 'signin' | 'accept';
        icon?: string;
        onclick?: (event: MouseEvent) => void;
    }

    let {
        title = "Кнопка",
        type = 'reg',
        icon = '',
        onclick
    }: Props = $props();
</script>

<button 
    class:log={type === 'log'}
    class:reg={type === 'reg'}
    class:signin={type === 'signin'}
    class:accept={type === 'accept'}
    class="button"
    onclick={onclick}
>
    {#if icon && type === 'signin'}
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

    .button {
        font-family: "Montserrat", sans-serif;
        font-size: 1vw;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0px;
        border-radius: 1vw;
        margin-bottom: 1vw;
        width: 12.5vw;
        height: 4vw;
        cursor: pointer;
    }

    .button__icon {
        width: 1.5vw;
        height: 1.5vw;
        margin-right: 0.3vw;
    }

    /* reg (CreateAccREGBtn - синяя кнопка) */
    .reg {
        background-color: #5B89FF;
        color: white;
        box-shadow: 
            inset 0px 5px 5px #517CEC,
            0px 4px 10px 1px #CDCDCD;
        border: 0px;
    }

    .reg:hover {
        background-color: #3A70F8;
        box-shadow: 
            inset 0px 5px 5px #315fd3,
            0px 4px 10px 1px #CDCDCD;
    }

    .reg:active {
        width: 12.3vw;
        height: 3.8vw;
        background-color: #2D5ACB;
        box-shadow: 
            inset 0px 5px 5px rgba(46, 90, 199, 1),
            0px 3px 10px 1px #CDCDCD;
    }

    /* accept (AcceptBtn - синяя кнопка) */
    .accept {
        background-color: #5B89FF;
        color: white;
        box-shadow: 
            inset 0px 5px 5px #517CEC,
            0px 4px 10px 1px #CDCDCD;
        border: 0px;
    }

    .accept:hover {
        background-color: #3A70F8;
        box-shadow: 
            inset 0px 5px 5px #315fd3,
            0px 4px 10px 1px #CDCDCD;
    }

    .accept:active {
        width: 12.3vw;
        height: 3.8vw;
        background-color: #2D5ACB;
        box-shadow: 
            inset 0px 5px 5px rgba(46, 90, 199, 1),
            0px 3px 10px 1px #CDCDCD;
    }

    /* log (CreateAccLOGBtn - прозрачная кнопка) */
    .log {
        background-color: transparent;
        color: black;
        border: 0.15vw solid #22376c;
        box-shadow: 0px 4px 10px 1px #CDCDCD;
    }

    .log:hover {
        box-shadow: 0px 4px 10px 1px #CDCDCD;
    }

    .log:active {
        width: 12.3vw;
        height: 3.8vw;
        background-color: #f6f6f6;
        box-shadow: 0px 3px 10px 1px #CDCDCD;
    }

    /* signin (SignInBtn - синяя кнопка с иконкой) */
    .signin {
        background-color: #5B89FF;
        color: white;
        box-shadow: 
            inset 0px 5px 5px #517CEC,
            0px 4px 10px 1px #CDCDCD;
        border: 0px;
    }

    .signin:hover {
        background-color: #3A70F8;
        box-shadow: 
            inset 0px 5px 5px #315fd3,
            0px 4px 10px 1px #CDCDCD;
    }

    .signin:active {
        width: 12.3vw;
        height: 3.8vw;
        background-color: #2D5ACB;
        box-shadow: 
            inset 0px 5px 5px rgba(46, 90, 199, 1),
            0px 3px 10px 1px #CDCDCD;
    }
</style>