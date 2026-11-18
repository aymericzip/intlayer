import * as Solid from 'solid-js';
import { createRoot, createSignal } from 'solid-js';
import { describe, expect, it } from 'vitest';
import {
  createChangeEffect,
  createWatchEffect,
  createWritableMemo,
  getContextProvider,
  isSolidTwo,
  onMounted,
} from './solidCompat';

/** Applies pending writes and effects now: Solid 2 batches them until a flush. */
const flushUpdates = (): void => {
  if (isSolidTwo) (Solid as unknown as { flush: () => void }).flush();
};

/** Lets effects scheduled after mount run (both Solid majors). */
const settle = async (): Promise<void> => {
  flushUpdates();
  await Promise.resolve();
  flushUpdates();
};

describe('solidCompat', () => {
  it('detects the installed Solid major', () => {
    expect(isSolidTwo).toBe(!('createResource' in Solid));
  });

  describe('createWritableMemo', () => {
    /** Creates the memo in a root; writes then happen outside any owner. */
    const setup = () => {
      const [source, setSource] = createSignal('en');
      const { value, setValue, dispose } = createRoot((disposeRoot) => {
        const [memoValue, setMemoValue] = createWritableMemo<string>(
          (previous) => source() || previous || 'fallback'
        );

        return {
          value: memoValue,
          setValue: setMemoValue,
          dispose: disposeRoot,
        };
      });

      return { value, setValue, setSource, dispose };
    };

    it('follows its source and lets the latest write or source change win', () => {
      const { value, setValue, setSource, dispose } = setup();

      expect(value()).toBe('en');

      setValue('fr');
      flushUpdates();
      expect(value()).toBe('fr');

      setSource('es');
      flushUpdates();
      expect(value()).toBe('es');

      setValue('de');
      flushUpdates();
      expect(value()).toBe('de');

      dispose();
    });

    it('passes the current value as `previous` when the source empties', () => {
      const { value, setValue, setSource, dispose } = setup();

      setValue('fr');
      flushUpdates();
      setSource('');
      flushUpdates();

      expect(value()).toBe('fr');

      dispose();
    });
  });

  describe('effects', () => {
    it('runs a watch effect with the computed value and its cleanup', async () => {
      const calls: string[] = [];
      const [source, setSource] = createSignal('a');

      const dispose = createRoot((disposeRoot) => {
        createWatchEffect(source, (value, previous) => {
          calls.push(`run:${value}:${previous ?? '-'}`);

          return () => calls.push(`cleanup:${value}`);
        });

        return disposeRoot;
      });

      await settle();
      setSource('b');
      await settle();
      dispose();

      expect(calls).toEqual(['run:a:-', 'cleanup:a', 'run:b:a', 'cleanup:b']);
    });

    it('skips the initial run of a change effect', async () => {
      const changes: string[] = [];
      const [source, setSource] = createSignal('a');

      const dispose = createRoot((disposeRoot) => {
        createChangeEffect(source, (value) => {
          changes.push(value);
        });

        return disposeRoot;
      });

      await settle();
      setSource('b');
      await settle();
      dispose();

      expect(changes).toEqual(['b']);
    });

    it('runs onMounted once and its cleanup on disposal', async () => {
      const calls: string[] = [];

      const dispose = createRoot((disposeRoot) => {
        onMounted(() => {
          calls.push('mounted');

          return () => calls.push('disposed');
        });

        return disposeRoot;
      });

      await settle();
      expect(calls).toEqual(['mounted']);

      dispose();
      expect(calls).toEqual(['mounted', 'disposed']);
    });
  });

  it('resolves the provider component of a context', () => {
    const context = Solid.createContext('default');

    expect(typeof getContextProvider(context)).toBe('function');
  });
});
