<script lang="ts">
  type Props = {
    title: string;
    value: string | number;
    change?: string;
    icon?: string;
    trend?: 'up' | 'down' | 'neutral';
  }

  let {
    title,
    value,
    change,
    icon = '📊',
    trend = 'neutral'
  }: Props = $props();
</script>

<div class="metric-card">
  <div class="metric-header">
    <span class="metric-icon">{icon}</span>
    <h3 class="metric-title">{title}</h3>
  </div>
  <div class="metric-value">{value}</div>
  {#if change}
    <div class="metric-change" class:up={trend === 'up'} class:down={trend === 'down'}>
      {change}
    </div>
  {/if}
</div>

<style>
  .metric-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    font-family: 'Montserrat', sans-serif;
  }
  
  .metric-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .metric-icon {
    font-size: 1.5rem;
  }
  
  .metric-title {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
    margin: 0;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .metric-change {
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .metric-change.up {
    color: #10b981;
  }
  
  .metric-change.down {
    color: #ef4444;
  }
  
</style>