import { Suspense } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useLoadDynamic } from './useLoadDynamic';

describe('useLoadDynamic integration', () => {
  let dispose: VoidFunction | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = '';
  });

  it('uses real createResource with Suspense and forwards the resolved value', async () => {
    let resolveLoader:
      | ((value: { message: { value: string } }) => void)
      | undefined;
    const loader = vi.fn(
      () =>
        new Promise<{ message: { value: string } }>((resolve) => {
          resolveLoader = resolve;
        })
    );
    const App = () => {
      const content = useLoadDynamic('integration.en', loader);

      return (
        <Suspense fallback={<span id="fallback">Loading</span>}>
          <span id="message">{content.message.value}</span>
        </Suspense>
      );
    };
    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(() => <App />, root);

    expect(loader).toHaveBeenCalledTimes(1);
    expect(root.querySelector('#fallback')?.textContent).toBe('Loading');

    resolveLoader?.({ message: { value: 'Loaded' } });

    await vi.waitFor(() => {
      expect(root.querySelector('#message')?.textContent).toBe('Loaded');
    });
    expect(root.querySelector('#fallback')).toBeNull();
  });
});
