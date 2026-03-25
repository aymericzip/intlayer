<script lang="ts">
  export let Renderer: any = undefined;
  export let rendererProps: Record<string, any> = {};
  export let value: any = undefined;
</script>

{#if typeof Renderer === 'string'}
  <svelte:element this={Renderer} {...rendererProps}>
    {value}
  </svelte:element>
{:else if typeof Renderer === 'function'}
  <svelte:component this={Renderer} {...rendererProps}>
    {value}
  </svelte:component>
{:else}
  {value}
{/if}

