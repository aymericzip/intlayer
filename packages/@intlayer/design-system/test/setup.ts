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
