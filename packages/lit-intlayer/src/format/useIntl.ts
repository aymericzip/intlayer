import { bindIntl, type WrappedIntl } from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * ReactiveController that provides a locale-bound `Intl` object.
 *
 * Acts exactly like the native `Intl` namespace but automatically uses the
 * current application locale, updating the host whenever the locale changes.
 *
 * @internal
 */
class IntlController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private readonly _overrideLocale: LocalesValues | undefined;
  private _unsubscribe: (() => void) | null = null;

  /** The locale-bound Intl object. */
  value: WrappedIntl;

  constructor(host: ReactiveControllerHost, locale?: LocalesValues) {
    this.host = host;
    this._overrideLocale = locale;

    const client = getIntlayerClient();
    this.value = bindIntl(this._overrideLocale ?? client.locale);

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.value = bindIntl(this._overrideLocale ?? newLocale);
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

/**
 * Reactive hook that provides a locale-bound `Intl` object.
 *
 * The returned controller's `.value` property gives access to locale-aware
 * `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, etc. without
 * needing to pass the current locale manually.
 *
 * @param host   - The LitElement (or any ReactiveControllerHost).
 * @param locale - Optional locale override.
 * @returns An `IntlController` with a `.value: WrappedIntl` property.
 *
 * @example
 * ```ts
 * class PriceTag extends LitElement {
 *   private intl = useIntl(this);
 *
 *   render() {
 *     const formatted = new this.intl.value.NumberFormat({
 *       style: 'currency',
 *       currency: 'USD',
 *     }).format(9.99);
 *
 *     return html`<span>${formatted}</span>`;
 *   }
 * }
 * ```
 */
export const useIntl = (
  host: ReactiveControllerHost,
  locale?: LocalesValues
): IntlController => new IntlController(host, locale);
