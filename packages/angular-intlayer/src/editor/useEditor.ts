import {
  DestroyRef,
  effect,
  Injector,
  inject,
  provideAppInitializer,
  runInInjectionContext,
  signal,
} from '@angular/core';
import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
// Import from the standalone token file to avoid a circular dependency:
//   installIntlayer.ts → useEditor.ts → ../client → installIntlayer.ts
import { INTLAYER_TOKEN, type IntlayerProvider } from '../client/intlayerToken';

/**
 * Initialises the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from the provided Intlayer client into the editor
 * manager so the editor always knows which locale the app is displaying.
 *
 * Must be called inside an Angular injection context (e.g. a component
 * constructor, `provideAppInitializer`, or `runInInjectionContext`).
 *
 * @param client - The IntlayerProvider instance to sync locale from.
 *   When omitted the function injects `INTLAYER_TOKEN` from the DI tree,
 *   so it still works when called directly from a component.
 */
export const useEditor = (client?: IntlayerProvider | null): void => {
  if (!isEnabled) return;

  const destroyRef = inject(DestroyRef, { optional: true });
  const injector = inject(Injector);

  // Resolve the client: use the passed-in reference or fall back to injection.
  const resolvedClient =
    client ??
    inject<IntlayerProvider>(INTLAYER_TOKEN, { optional: true } as any);

  // `manager` signal is set once the async import resolves.
  // Using a signal lets an `effect()` react to it becoming available.
  const manager = signal<EditorStateManager | null>(null);

  // Guard: prevents the async callback from acting after the view is destroyed.
  let stopped = false;

  // Initialise the editor client
  import('@intlayer/editor').then(({ initEditorClient }) => {
    if (stopped) return;
    manager.set(initEditorClient());
  });

  // Keep the editor locale in sync with the Angular locale signal
  const effectRef = runInInjectionContext(injector, () =>
    effect(() => {
      const m = manager();
      const locale = resolvedClient?.locale();
      if (m && locale) m.currentLocale.set(locale as Locale);
    })
  );

  // Tear down on destroy
  destroyRef?.onDestroy(() => {
    stopped = true;
    effectRef.destroy();
    manager.set(null);
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  });
};

/**
 * Angular provider that wires `useEditor` into the application initialisation
 * phase via `provideAppInitializer`.
 *
 * `provideIntlayer()` already calls this internally, so you only need this
 * function when you want to manage providers individually.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { provideIntlayer, provideIntlayerEditor } from 'angular-intlayer';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideIntlayer(), provideIntlayerEditor()],
 * };
 * ```
 */
export const provideIntlayerEditor = (client?: IntlayerProvider | null) =>
  provideAppInitializer(() => useEditor(client));
