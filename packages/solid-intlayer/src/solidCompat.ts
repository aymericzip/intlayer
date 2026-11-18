/**
 * Version bridge between Solid 1.x and Solid 2.x.
 *
 * Solid 2 removed or reshaped several primitives this package relies on
 * (`createResource`, `onMount`, `Suspense`, `createComputed`, `on`,
 * `startTransition`, single-argument effects, `Context.Provider`). Every
 * version-sensitive call goes through this module (and `LoadingBoundary`),
 * which feature-detects the installed runtime, so one build of
 * `solid-intlayer` runs on both.
 *
 * Types are written against the Solid 1 declarations (the dev dependency);
 * Solid 2 call shapes are described by {@link SolidTwoRuntime}.
 *
 * Members are read directly on the namespace, never through a computed key or
 * an alias of it, so bundlers can still tree-shake `solid-js`. The only
 * members missing from one major are `createResource` and `startTransition`
 * (Solid 1 only), which a Solid 2 build reports as always-undefined imports.
 */
import * as Solid from 'solid-js';
import type { Accessor, Component, Context } from 'solid-js';

/** Cleanup returned by an effect callback. */
type EffectCleanup = void | (() => void);

/** Solid 2 call shapes of members that exist under the same name in Solid 1. */
type SolidTwoRuntime = {
  createEffect: <T>(
    compute: () => T,
    effect: (value: T, previous: T | undefined) => EffectCleanup
  ) => void;
  createMemo: <T>(compute: () => T | Promise<T>) => Accessor<T>;
  createSignal: <T>(
    compute: (previous: T | undefined) => T
  ) => [Accessor<T>, (value: T) => void];
};

/**
 * Whether the installed `solid-js` is a 2.x runtime. `createResource` was
 * removed in Solid 2, which makes it a reliable discriminant.
 *
 * A static member read on purpose: `'createResource' in Solid` makes bundlers
 * materialize the whole namespace and keep every `solid-js` export (+2.4 KB
 * gzip in a lean app).
 */
export const isSolidTwo: boolean = typeof Solid.createResource !== 'function';

/**
 * Side effect split into a tracked `compute` and an untracked `effect`, the
 * shape Solid 2 requires. `effect` may return a cleanup, which runs before the
 * next execution and on disposal.
 */
export const createWatchEffect = <T>(
  compute: () => T,
  effect: (value: T, previous: T | undefined) => EffectCleanup
): void => {
  if (isSolidTwo) {
    (Solid as unknown as SolidTwoRuntime).createEffect(compute, effect);
    return;
  }

  let previous: T | undefined;

  Solid.createEffect(() => {
    const value = compute();
    const cleanup = Solid.untrack(() => effect(value, previous));

    previous = value;

    if (typeof cleanup === 'function') Solid.onCleanup(cleanup);
  });
};

/**
 * Runs `callback` once, after the component has mounted. A returned function
 * runs on disposal.
 */
export const onMounted = (callback: () => EffectCleanup): void =>
  createWatchEffect(
    () => undefined,
    () => callback()
  );

/**
 * Like {@link createWatchEffect}, but skips the initial run: `effect` only
 * fires when `compute` produces a value after the first one.
 */
export const createChangeEffect = <T>(
  compute: () => T,
  effect: (value: T, previous: T | undefined) => EffectCleanup
): void => {
  let isInitialRun = true;

  createWatchEffect(compute, (value, previous) => {
    if (isInitialRun) {
      isInitialRun = false;
      return;
    }

    return effect(value, previous);
  });
};

/**
 * Signal whose value `compute` re-derives whenever its tracked reads change,
 * and that can also be written in between; the latest of the two wins. Reads
 * are always consistent, so nothing renders against a stale value
 * (`createSignal(fn)` in Solid 2, two memos ordered by a write clock in
 * Solid 1).
 */
export const createWritableMemo = <T>(
  compute: (previous: T | undefined) => T
): [Accessor<T>, (value: T) => void] => {
  if (isSolidTwo) {
    return (Solid as unknown as SolidTwoRuntime).createSignal(compute);
  }

  type OrderedValue = { value: T; order: number };

  let clock = 0;
  let currentValue: T | undefined;

  const [written, setWritten] = Solid.createSignal<OrderedValue | undefined>(
    undefined
  );
  // `currentValue` is a plain variable, so only `compute`'s own reads track.
  const derived = Solid.createMemo<OrderedValue>(() => ({
    value: compute(currentValue),
    order: (clock += 1),
  }));
  const value = Solid.createMemo<T>(() => {
    const derivedValue = derived();
    const writtenValue = written();

    currentValue =
      writtenValue && writtenValue.order > derivedValue.order
        ? writtenValue.value
        : derivedValue.value;

    return currentValue;
  });

  const setValue = (nextValue: T): void => {
    setWritten({ value: nextValue, order: (clock += 1) });
  };

  return [value, setValue];
};

/**
 * Runs `update` inside a transition where the runtime offers one. Solid 2
 * holds pending async reads on its own, so `update` runs directly.
 */
export const runInTransition = (update: () => void): void => {
  if (isSolidTwo) {
    update();
    return;
  }

  void Solid.startTransition(update);
};

/** Options shared by {@link createAsyncValue} across Solid versions. */
export type AsyncValueOptions<T> = {
  /** Value exposed while `source` yields nothing to fetch. */
  initialValue?: T;
  /**
   * Solid 1 only: `'initial'` keeps the value out of the SSR serialization
   * payload. Ignored by Solid 2.
   */
  ssrLoadFrom?: 'initial' | 'server';
};

/**
 * Async value derived from a reactive `source` (`createResource` in Solid 1,
 * an async `createMemo` in Solid 2).
 *
 * Reading the returned accessor under a `LoadingBoundary` holds the boundary
 * while the fetch is pending. Outside a boundary, Solid 1 reads `undefined`
 * until it settles, while Solid 2 defers the mount instead.
 *
 * A `source` yielding `false`, `null` or `undefined` skips the fetch and
 * exposes `initialValue`, as `createResource` does.
 */
export const createAsyncValue = <Source, T>(
  source: () => Source | false | null | undefined,
  fetcher: (resolvedSource: Source) => T | Promise<T>,
  options: AsyncValueOptions<T> = {}
): Accessor<T | undefined> => {
  if (isSolidTwo) {
    return (Solid as unknown as SolidTwoRuntime).createMemo<T | undefined>(
      () => {
        const resolvedSource = source();

        if (
          resolvedSource === false ||
          resolvedSource === null ||
          resolvedSource === undefined
        ) {
          return options.initialValue;
        }

        return fetcher(resolvedSource);
      }
    );
  }

  const [resource] = Solid.createResource<T, Source>(
    source,
    (resolvedSource) => fetcher(resolvedSource),
    options as Solid.ResourceOptions<T, Source>
  );

  return resource;
};

/**
 * Subscribes the enclosing Solid 1 `Suspense` to `accessor`, so it waits for
 * the value without aborting the component body.
 *
 * A no-op on Solid 2: reads there suspend the boundary they render under, and
 * an extra read from the component body would hold the boundary above the
 * component instead — or defer the whole root mount when there is none.
 */
export const trackAsyncValue = (accessor: Accessor<unknown>): void => {
  if (isSolidTwo) return;

  Solid.createRenderEffect(() => {
    accessor();
  });
};

/**
 * `lazy` from `solid-js`. SolidStart's server build rewrites any
 * `import { lazy } from 'solid-js'` in JSX modules — dependencies included — to
 * `@solidjs/start/server`, which this package cannot resolve under strict
 * installs. Reading it here keeps that rewrite away; the lazily loaded
 * renderers carry no CSS for SolidStart to collect.
 */
export const lazyComponent = <T extends Component<any>>(
  load: () => Promise<{ default: T }>
): T & { preload: () => Promise<{ default: T }> } => Solid.lazy(load);

/**
 * Provider component of a context: `Context.Provider` in Solid 1, the context
 * object itself in Solid 2.
 */
export const getContextProvider = <T>(
  context: Context<T>
): Context<T>['Provider'] =>
  (context as Partial<Context<T>>).Provider ??
  (context as unknown as Context<T>['Provider']);
