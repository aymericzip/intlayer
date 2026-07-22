import { createSignal, Suspense } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLoadableProxy } from './client/useLoadDynamic';

/**
 * Reproduces how the markdown/HTML renderers used to be reached: as a component
 * pulled out of `useLoadDynamic`'s value proxy and invoked with props.
 *
 * A component invoked that way runs inside whichever effect reads the proxy, so
 * its own reactive reads become that effect's dependencies. The effect then
 * re-runs, re-invokes the component, and never settles — while each pass builds
 * a throwaway instance, so the corrected output never sticks.
 */
describe('lazily loaded renderer components', () => {
  let dispose: VoidFunction | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = '';
  });

  it('does not re-render forever when a component is invoked through the proxy', async () => {
    let renderCount = 0;

    // Reads a signal during setup and writes it back, like a renderer touching
    // its rendering context. Left tracked by the caller, this alone loops.
    const [renderTick, setRenderTick] = createSignal(0);

    const MarkdownRendererStub = (props: { value: string }) => {
      renderCount += 1;

      const currentTick = renderTick();

      setRenderTick(currentTick + 1);

      return (
        <span id="markdown">
          {props.value}#{currentTick}
        </span>
      );
    };

    // Mirrors `useLoadDynamic`, where the proxy reads a Solid resource: the read
    // must be reactive so the proxy re-runs once the chunk lands.
    const [loadedModule, setLoadedModule] = createSignal<
      { MarkdownRenderer: typeof MarkdownRendererStub } | undefined
    >(undefined);

    const App = () => {
      const proxy = createLoadableProxy(() => loadedModule());
      const Renderer = proxy.MarkdownRenderer as typeof MarkdownRendererStub;

      return (
        <Suspense>
          <Renderer value="compiled" />
        </Suspense>
      );
    };

    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(() => <App />, root);

    setLoadedModule({ MarkdownRenderer: MarkdownRendererStub });

    await vi.waitFor(() => {
      expect(root.querySelector('#markdown')).not.toBeNull();
    });

    // Let any runaway effect chain keep going before sampling.
    await new Promise((resolve) => setTimeout(resolve, 50));

    const countAfterSettling = renderCount;

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(renderCount).toBe(countAfterSettling);
    expect(renderCount).toBeLessThan(10);
    expect(root.querySelector('#markdown')?.textContent).toContain('compiled');
  });
});
