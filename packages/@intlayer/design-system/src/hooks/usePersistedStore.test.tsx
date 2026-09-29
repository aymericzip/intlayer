import { act, render } from '@testing-library/react';
import type { FC } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { usePersistedStore as UsePersistedStore } from './usePersistedStore';

let usePersistedStore: typeof UsePersistedStore;

beforeEach(async () => {
  // The store keeps module-level state: start every test from a fresh copy.
  vi.resetModules();
  ({ usePersistedStore } = await import('./usePersistedStore'));
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

type ProbeProps = {
  storageKey?: string;
  initialValue?: boolean;
  renderedValues?: boolean[];
  onSetter?: (setValue: (value: boolean) => void) => void;
};

const Probe: FC<ProbeProps> = ({
  storageKey = 'probe',
  initialValue = false,
  renderedValues,
  onSetter,
}) => {
  const [value, setValue] = usePersistedStore<boolean>(
    storageKey,
    initialValue
  );
  renderedValues?.push(value);
  onSetter?.(setValue);

  return <span data-testid="value">{String(value)}</span>;
};

describe('usePersistedStore', () => {
  it('uses the initial state when nothing is stored', () => {
    const { getByTestId } = render(<Probe initialValue />);

    expect(getByTestId('value').textContent).toBe('true');
  });

  it('reads the persisted value on the first client render', () => {
    localStorage.setItem('probe', 'true');
    const renderedValues: boolean[] = [];

    render(<Probe renderedValues={renderedValues} />);

    expect(renderedValues[0]).toBe(true);
    expect(renderedValues).not.toContain(false);
  });

  it('hydrates with the initial state, then applies the persisted value', async () => {
    const container = document.createElement('div');
    container.innerHTML = renderToString(<Probe />);
    expect(container.textContent).toBe('false');

    localStorage.setItem('probe', 'true');
    const recoverableErrors: unknown[] = [];

    await act(async () => {
      hydrateRoot(container, <Probe />, {
        onRecoverableError: (error) => recoverableErrors.push(error),
      });
    });

    expect(recoverableErrors).toEqual([]);
    expect(container.textContent).toBe('true');
  });

  it('persists updates and shares them between hooks using the same key', () => {
    let setValue: (value: boolean) => void = () => {};
    const { getAllByTestId } = render(
      <>
        <Probe onSetter={(setter) => (setValue = setter)} />
        <Probe />
      </>
    );

    act(() => setValue(true));

    expect(localStorage.getItem('probe')).toBe('true');
    expect(getAllByTestId('value').map((node) => node.textContent)).toEqual([
      'true',
      'true',
    ]);
  });

  it('passes the current value to functional updates', () => {
    localStorage.setItem('counter', '1');
    let increment = () => {};

    const Counter: FC = () => {
      const [count, setCount] = usePersistedStore<number>('counter', 0);
      increment = () => setCount((previousCount) => previousCount + 1);
      return <span data-testid="count">{count}</span>;
    };

    const { getByTestId } = render(<Counter />);
    act(() => {
      increment();
      increment();
    });

    expect(getByTestId('count').textContent).toBe('3');
  });

  it('follows values written by another tab', () => {
    const { getByTestId } = render(<Probe />);

    act(() => {
      localStorage.setItem('probe', 'true');
      window.dispatchEvent(new StorageEvent('storage', { key: 'probe' }));
    });

    expect(getByTestId('value').textContent).toBe('true');
  });

  it('keeps working in memory when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    let setValue: (value: boolean) => void = () => {};
    const { getByTestId } = render(
      <Probe onSetter={(setter) => (setValue = setter)} />
    );

    act(() => setValue(true));

    expect(getByTestId('value').textContent).toBe('true');
  });

  it('falls back to the initial state after clearState', () => {
    localStorage.setItem('probe', 'true');
    let clear = () => {};

    const Clearable: FC = () => {
      const [value, , , clearState] = usePersistedStore<boolean>(
        'probe',
        false
      );
      clear = clearState;
      return <span data-testid="value">{String(value)}</span>;
    };

    const { getByTestId } = render(<Clearable />);
    act(() => clear());

    expect(localStorage.getItem('probe')).toBeNull();
    expect(getByTestId('value').textContent).toBe('false');
  });
});
