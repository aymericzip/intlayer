<script lang="ts">
// `Renderer` is either a component or — when it comes from a code-split chunk
// that had not landed at interpretation time — a promise for one.
export let Renderer: any = undefined;
export let rendererProps: Record<string, any> = {};
export let value: any = undefined;

// Capitalised so Svelte resolves it as a component rather than an HTML element.
let ResolvedRenderer: any;
let isAwaitingRenderer = false;

// Already-available renderers resolve synchronously, so SSR and the first paint
// are never deferred; only a genuinely pending chunk is awaited.
$: {
  if (typeof Renderer?.then === 'function') {
    isAwaitingRenderer = true;

    Renderer.then((component: any) => {
      ResolvedRenderer = component;
      isAwaitingRenderer = false;
    });
  } else {
    ResolvedRenderer = Renderer;
    isAwaitingRenderer = false;
  }
}
</script>

{#if isAwaitingRenderer}
  <!-- Render nothing while the chunk loads: falling through to `value` would
       flash the raw source (e.g. `**bold**`) before the renderer arrives. -->
{:else if typeof ResolvedRenderer === 'string'}
  <svelte:element this={ResolvedRenderer} {...rendererProps}>
    {value}
  </svelte:element>
{:else if typeof ResolvedRenderer === 'function'}
  <ResolvedRenderer {...rendererProps}>
    {value}
  </ResolvedRenderer>
{:else}
  {value}
{/if}
