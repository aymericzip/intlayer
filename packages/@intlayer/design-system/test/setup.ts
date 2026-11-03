// Mock react-dom/test-utils to provide a working act implementation under React 19
import { vi } from 'vitest';

// Ensure React exports a working act implementation
vi.mock('react', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;

  const act = async (callback: () => unknown | Promise<unknown>) => {
    const result = callback();
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      await (result as Promise<unknown>);
    }
    await Promise.resolve();
  };

  return {
    ...actual,
    act,
  };
});

// Keep test-utils import working too
vi.mock('react-dom/test-utils', () => {
  const act = async (callback: () => unknown | Promise<unknown>) => {
    const result = callback();
    if (result && typeof (result as Promise<unknown>).then === 'function') {
      await (result as Promise<unknown>);
    }
    await Promise.resolve();
  };

  return { act };
});

// jsdom ships no ResizeObserver, yet layout-aware components (TabSelector,
// useItemSelector…) instantiate one on mount.
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

// jsdom's Blob has no stream(), yet shiki's inlined oniguruma WASM is
// decompressed through `new Blob([binary]).stream()` on import.
if (typeof Blob.prototype.stream !== 'function') {
  Blob.prototype.stream = function stream(this: Blob) {
    return new ReadableStream<Uint8Array>({
      start: async (controller) => {
        controller.enqueue(new Uint8Array(await this.arrayBuffer()));
        controller.close();
      },
    }) as ReturnType<Blob['stream']>;
  };
}
