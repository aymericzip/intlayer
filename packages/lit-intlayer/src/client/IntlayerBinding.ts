import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from './installIntlayer';

/**
 * Proxy type returned by every `use*` hook in `lit-intlayer`.
 *
 * Wraps the translated content object with a reactive `.observe()` method so
 * Lit elements participate in the reactive update cycle via a
 * {@link IntlayerBinding} `ReactiveController`.
 *
 * ```ts
 * private content = useIntlayer('app').observe(this);
 * private content = useDictionary(_hash).observe(this);
 * private content = useDictionaryDynamic(_dyn, 'app').observe(this);
 * ```
 */
export type IntlayerLitProxy<T> = T & {
  observe: (host: ReactiveControllerHost) => IntlayerLitProxy<T>;
};

/**
 * `ReactiveController` that keeps a Lit element in sync with Intlayer locale
 * changes and, optionally, async dictionary load events.
 *
 * Registered automatically by `.observe(this)` — you should never need to
 * instantiate it directly.
 *
 * @param host         - The Lit element to update.
 * @param onConnect    - Called inside `hostConnected` (after locale subscription
 *                       is set up). Useful for triggering an immediate update
 *                       when the dictionary is already cached.
 * @param onDisconnect - Called inside `hostDisconnected`. Useful for removing
 *                       the host from a dictionary's update-host registry.
 */
export class IntlayerBinding implements ReactiveController {
  private host: ReactiveControllerHost;
  private unsubscribeLocale: (() => void) | null = null;
  private readonly onConnect?: () => void;
  private readonly onDisconnect?: () => void;

  constructor(
    host: ReactiveControllerHost,
    onConnect?: () => void,
    onDisconnect?: () => void
  ) {
    this.host = host;
    this.onConnect = onConnect;
    this.onDisconnect = onDisconnect;
    this.host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this.unsubscribeLocale = client.subscribe(() => {
      this.host.requestUpdate();
    });
    this.onConnect?.();
  }

  hostDisconnected(): void {
    this.unsubscribeLocale?.();
    this.unsubscribeLocale = null;
    this.onDisconnect?.();
  }
}
