import type {
  DictionaryKeys,
  DictionaryRegistryContent,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';

/**
 * ReactiveController that keeps a single dictionary up to date with the
 * current locale and triggers re-renders when the locale changes.
 *
 * @internal
 */
class IntlayerController<T extends DictionaryKeys>
  implements ReactiveController
{
  private readonly host: ReactiveControllerHost;
  private readonly key: T;
  private readonly _overrideLocale: LocalesValues | undefined;
  private _unsubscribe: (() => void) | null = null;

  /** The current, locale-resolved dictionary content. */
  _currentValue: DeepTransformContent<DictionaryRegistryContent<T>>;

  constructor(host: ReactiveControllerHost, key: T, locale?: LocalesValues) {
    this.host = host;
    this.key = key;
    this._overrideLocale = locale;

    const client = getIntlayerClient();
    this._currentValue = getIntlayer(
      key,
      this._overrideLocale ?? client.locale
    );

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this._currentValue = getIntlayer(
        this.key,
        this._overrideLocale ?? newLocale
      );
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

/**
 * Reactive hook that returns the translated dictionary for the given key.
 *
 * Works as a Lit ReactiveController: the host element automatically
 * re-renders whenever the locale changes.
 *
 * The returned value is a transparent proxy of the dictionary content.
 * Access fields directly without an extra `.value` wrapper.
 *
 * @param host - The LitElement (or any ReactiveControllerHost) that owns this hook.
 * @param key  - The dictionary key registered in your intlayer content files.
 * @param locale - Optional locale override (defaults to the current app locale).
 * @returns A reactive proxy to the dictionary content.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement {
 *   private content = useIntlayer(this, 'my-component');
 *
 *   render() {
 *     return html`<h1>${this.content.title.value}</h1>`;
 *   }
 * }
 * ```
 */
export const useIntlayer = <T extends DictionaryKeys>(
  host: ReactiveControllerHost,
  key: T,
  locale?: LocalesValues
): DeepTransformContent<DictionaryRegistryContent<T>> => {
  const controller = new IntlayerController(host, key, locale);

  return new Proxy({} as any, {
    get(_t, prop) {
      return (controller._currentValue as any)?.[prop as string];
    },
    has(_t, prop) {
      return prop in ((controller._currentValue as any) ?? {});
    },
    ownKeys() {
      return Reflect.ownKeys((controller._currentValue as any) ?? {});
    },
    getOwnPropertyDescriptor(_t, prop) {
      if (Reflect.has((controller._currentValue as any) ?? {}, prop)) {
        return { enumerable: true, configurable: true };
      }
      return undefined;
    },
  }) as DeepTransformContent<DictionaryRegistryContent<T>>;
};
