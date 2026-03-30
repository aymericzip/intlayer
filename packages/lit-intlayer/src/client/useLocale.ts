import { internationalization } from '@intlayer/config/built';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from './installIntlayer';
import { setLocaleInStorage } from './useLocaleStorage';

type UseLocaleProps = {
  isCookieEnabled?: boolean;
  onLocaleChange?: (locale: LocalesValues) => void;
};

/**
 * ReactiveController that exposes the current locale and a `setLocale` setter.
 * The host element re-renders whenever the locale changes.
 */
export class LocaleController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private readonly _isCookieEnabled: boolean | undefined;
  private readonly _onLocaleChange:
    | ((locale: LocalesValues) => void)
    | undefined;
  private _unsubscribe: (() => void) | null = null;

  /** The currently active locale. */
  locale: DeclaredLocales;
  /** The application's default locale (from config). */
  readonly defaultLocale: DeclaredLocales;
  /** All available locales (from config). */
  readonly availableLocales: DeclaredLocales[];

  constructor(host: ReactiveControllerHost, props: UseLocaleProps = {}) {
    this.host = host;
    this._isCookieEnabled = props.isCookieEnabled;
    this._onLocaleChange = props.onLocaleChange;

    const client = getIntlayerClient();
    const { defaultLocale, locales: availableLocales } =
      internationalization ?? {};

    this.locale = client.locale as DeclaredLocales;
    this.defaultLocale = defaultLocale as DeclaredLocales;
    this.availableLocales = (availableLocales ?? []) as DeclaredLocales[];

    host.addController(this);
  }

  /**
   * Change the application locale.
   * Validates against `availableLocales`, persists to storage, and triggers a re-render.
   */
  setLocale = (newLocale: LocalesValues): void => {
    if (!this.availableLocales.map(String).includes(newLocale)) {
      console.error(`Locale "${newLocale}" is not available.`);
      return;
    }

    const client = getIntlayerClient();
    client.setLocale(newLocale);

    setLocaleInStorage(
      newLocale,
      this._isCookieEnabled ?? client.isCookieEnabled ?? true
    );

    this._onLocaleChange?.(newLocale);
  };

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.locale = newLocale as DeclaredLocales;
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

/**
 * Reactive hook that provides locale management.
 *
 * Returns a `LocaleController` with:
 * - `locale` — the current locale (updates the host on change)
 * - `defaultLocale` — the config default locale
 * - `availableLocales` — all configured locales
 * - `setLocale(locale)` — switches the app locale
 *
 * @param host  - The LitElement (or any ReactiveControllerHost).
 * @param props - Optional configuration.
 * @returns A `LocaleController`.
 *
 * @example
 * ```ts
 * class LocaleSwitcher extends LitElement {
 *   private locale = useLocale(this);
 *
 *   render() {
 *     return html`
 *       <select @change=${(e: Event) => this.locale.setLocale((e.target as HTMLSelectElement).value as any)}>
 *         ${this.locale.availableLocales.map(
 *           (loc) => html`<option value=${loc} ?selected=${loc === this.locale.locale}>${loc}</option>`
 *         )}
 *       </select>
 *     `;
 *   }
 * }
 * ```
 */
export const useLocale = (
  host: ReactiveControllerHost,
  props: UseLocaleProps = {}
): LocaleController => new LocaleController(host, props);
