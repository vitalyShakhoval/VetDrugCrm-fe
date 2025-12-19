<script lang="ts">
    type Props = {
        placeholder?: string;
        query?: string;
        onsearch?: (query: string) => void;
        onclear?: () => void;
    }

    let {
        placeholder = "Поиск",
        query = "",
        onsearch,
        onclear
    }: Props = $props();

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        query = target.value;
        if (onsearch) onsearch(query);
    };

    const handleClear = () => {
        query = "";
        if (onsearch) onsearch("");
        if (onclear) onclear();
    };
</script>

<div class="search-container">
    <input
        type="text"
        class="search"
        placeholder={placeholder}
        value={query}
        oninput={handleInput}
    />
    
    {#if query}
        <button class="clear-btn" onclick={handleClear} aria-label="Очистить поиск">
            ✕
        </button>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    
    * {
        transition: 200ms ease;
        margin: 0px;
        padding: 0px;
    }

    .search-container {
        position: relative;
        display: inline-block;
    }

    .search {
        width: 15vw;
        height: 2.5vw;
        border: 1px solid #D9D9D9;
        border-radius: 10px;
        background-image: url('src/lib/assets/Search.svg');
        background-repeat: no-repeat;
        background-size: 2vw;
        background-position: 0.5vw center;
        font-family: "Montserrat", sans-serif;
        font-size: 1.5vw;
        text-indent: 3vw;
        padding-right: 2vw;
    }

    .search:focus {
        outline: none;
        border: 1px solid #5B89FF;
        box-shadow: 0 0 0 2px rgba(91, 137, 255, 0.2);
    }
    
    .clear-btn {
        position: absolute;
        right: 0.5vw;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 1vw;
        padding: 0.2vw;
        border-radius: 50%;
    }
    
    .clear-btn:hover {
        background-color: rgba(0, 0, 0, 0.05);
        color: #666;
    }
</style>