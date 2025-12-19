<script lang="ts">
  type Props = {
    title?: string;
    subtitle?: string;
    children?: any;
  }

  let { title, subtitle, children }: Props = $props();
</script>

<section class="content-section">
  {#if title}
    <header class="section-header">
      <h1 class="section-title">{title}</h1>
      {#if subtitle}
        <p class="section-subtitle">{subtitle}</p>
      {/if}
    </header>
  {/if}
  
  <div class="section-content">
    {#if children}
      {@render children()}
    {/if}
  </div>
</section>

<style>
  .content-section {
    padding: 2rem;
    font-family: 'Montserrat', sans-serif;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    color: #666;
    line-height: 1.5;
  }
  
  .section-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    min-height: 400px;
  }
</style>