<script lang="ts">
export let Renderer: any;
export let rendererProps: Record<string, any>;
export let value: any;
</script>

<svelte:component this={Renderer} {...rendererProps}>
  {value}
</svelte:component>

