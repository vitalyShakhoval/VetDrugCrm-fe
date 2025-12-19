<script lang="ts">
    type Props = {
        icon?: string;
        alt?: string;
        onclick?: () => void;
        showDropdown?: boolean;
        dropdownContent?: () => any;
    }

    let {
        icon = "src/lib/assets/user_icon.svg",
        alt = "Аватар пользователя",
        onclick,
        showDropdown = false,
        dropdownContent = () => ''
    }: Props = $props();
</script>

<div class="avatar-container">
    <button 
        class="user__avatar"
        onclick={onclick}
        aria-label="Профиль пользователя"
    >
        <img src={icon} alt={alt} class="user__icon">
    </button>
    
    {#if showDropdown}
        <div class="dropdown">
            <!-- Используем @render вместо slot -->
            {@render dropdownContent()}
        </div>
    {/if}
</div>

<style>
    * {
        transition: 200ms ease;
        margin: 0px;
        padding: 0px;
    }
    
    .avatar-container {
        position: relative;
        display: inline-block;
    }
    
    .user__avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.2vw;
        height: 3.2vw;
        border-radius: 5vw;
        border: 1px solid #D9D9D9;
        background-color: transparent;
        cursor: pointer;
    }

    .user__icon {
        width: 2.2vw;
        height: 2.2vw;
        border-radius: 50%;
        object-fit: cover;
    }

    .user__avatar:hover {
        border-color: #5B89FF;
        box-shadow: 0 0 0 2px rgba(91, 137, 255, 0.1);
    }
    
    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.5vw;
        background: white;
        border-radius: 0.5vw;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 12vw;
        z-index: 1000;
        border: 1px solid #E3E3E3;
    }
</style>