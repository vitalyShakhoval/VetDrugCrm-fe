<script lang="ts">
  type TableColumn = {
    key: string;
    label: string;
    width?: string;
  }

  type Props = {
    columns: TableColumn[];
    data: any[];
    title?: string;
    actions?: boolean;
  }

  let {
    columns,
    data = [],
    title,
    actions = false
  }: Props = $props();
</script>

<div class="data-table">
  {#if title}
    <h3 class="table-title">{title}</h3>
  {/if}
  
  <div class="table-container">
    <table>
      <thead>
        <tr>
          {#each columns as column}
            <th style={column.width ? `width: ${column.width}` : ''}>
              {column.label}
            </th>
          {/each}
          {#if actions}
            <th>Действия</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each data as row, i}
          <tr>
            {#each columns as column}
              <td>{row[column.key]}</td>
            {/each}
            {#if actions}
              <td class="actions-cell">
                <button class="action-btn" onclick={() => console.log('Редактировать', row)}>
                  ✏️
                </button>
                <button class="action-btn" onclick={() => console.log('Удалить', row)}>
                  🗑️
                </button>
              </td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .data-table {
    font-family: 'Montserrat', sans-serif;
  }
  
  .table-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
  }
  
  .table-container {
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th {
    background-color: #f9fafb;
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
  }
  
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
    color: #4b5563;
  }
  
  tr:hover {
    background-color: #f9fafb;
  }
  
  .actions-cell {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
  }
  
  .action-btn:hover {
    background-color: #f3f4f6;
  }
</style>