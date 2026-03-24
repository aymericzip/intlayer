import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { getIntlayerClient } from './installIntlayer';

/**
 * ReactiveController that keeps a raw dictionary object up to date with
 * the current locale and triggers re-renders when the locale changes.
 *
 * @internal
 */
class DictionaryController<
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
> implements ReactiveController
{
  private readonly host: ReactiveControllerHost;
  private readonly dictionary: T;
  private readonly _overrideLocale: L | undefined;
  private _unsubscribe: (() => void) | null = null;

  _currentValue: DeepTransformContent<T['content'], L>;

  constructor(host: ReactiveControllerHost, dictionary: T, locale?: L) {
    this.host = host;
    this.dictionary = dictionary;
    this._overrideLocale = locale;

    const client = getIntlayerClient();
    this._currentValue = getDictionary(
      dictionary,
      (this._overrideLocale ?? client.locale) as L
    );

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this._currentValue = getDictionary(
        this.dictionary,
        (this._overrideLocale ?? newLocale) as L
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
 * Reactive hook that returns the translated content for a raw dictionary object.
 *
 * Unlike `useIntlayer` (which takes a registered key), this hook accepts a
 * dictionary object directly — useful for dictionaries loaded asynchronously
 * or defined inline.
 *
 * @param host       - The LitElement (or any ReactiveControllerHost).
 * @param dictionary - The raw dictionary object.
 * @param locale     - Optional locale override.
 * @returns A reactive proxy to the dictionary content.
 *
 * @example
 * ```ts
 * import myDict from './myDictionary.content';
 *
 * class MyElement extends LitElement {
 *   private content = useDictionary(this, myDict);
 *
 *   render() {
 *     return html`<p>${this.content.greeting.value}</p>`;
 *   }
 * }
 * ```
 */
export const useDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  host: ReactiveControllerHost,
  dictionary: T,
  locale?: L
): DeepTransformContent<T['content'], L> => {
  const controller = new DictionaryController(host, dictionary, locale);

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
  }) as DeepTransformContent<T['content'], L>;
};
