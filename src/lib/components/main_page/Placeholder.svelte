<script lang="ts">
  type Props = {
    title: string;
    description?: string;
    icon?: string;
    actionText?: string;
    onAction?: () => void;
  }

  let {
    title,
    description = 'Этот раздел в разработке',
    icon = '📋',
    actionText,
    onAction
  }: Props = $props();
</script>

<div class="placeholder">
  <div class="placeholder-icon">{icon}</div>
  <h2 class="placeholder-title">{title}</h2>
  <p class="placeholder-description">{description}</p>
  
  {#if actionText && onAction}
    <button class="placeholder-action" onclick={onAction}>
      {actionText}
    </button>
  {/if}
</div>

<style>
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3rem 2rem;
    min-height: 300px;
  }
  
  .placeholder-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }
  
  .placeholder-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .placeholder-description {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: #666;
    max-width: 500px;
    line-height: 1.5;
    margin-bottom: 2rem;
  }
  
  .placeholder-action {
    background-color: #5B89FF;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .placeholder-action:hover {
    background-color: #3A70F8;
  }
</style>