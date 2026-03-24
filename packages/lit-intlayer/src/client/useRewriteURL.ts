import configuration from '@intlayer/config/built';
import { getRewritePath } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from './installIntlayer';

/**
 * ReactiveController that keeps the browser URL in sync with the current locale.
 *
 * Uses `window.history.replaceState` to update the address bar without
 * triggering a full navigation.
 *
 * @example
 * ```ts
 * class AppShell extends LitElement {
 *   private _rewrite = useRewriteURL(this);
 * }
 * ```
 */
class RewriteURLController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _unsubscribe: (() => void) | null = null;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  private _rewrite(locale: string): void {
    const rewrite = configuration?.routing?.rewrite;
    if (typeof window === 'undefined' || !rewrite) return;

    const pathname = window.location.pathname;
    const targetPath = getRewritePath(pathname, locale as Locale, rewrite);

    if (targetPath && targetPath !== pathname) {
      window.history.replaceState(
        window.history.state,
        '',
        targetPath + window.location.search + window.location.hash
      );
    }
  }

  hostConnected(): void {
    const client = getIntlayerClient();

    // Rewrite on initial connect
    this._rewrite(client.locale);

    this._unsubscribe = client.subscribe((newLocale) => {
      this._rewrite(newLocale);
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

export const useRewriteURL = (host: ReactiveControllerHost): void => {
  new RewriteURLController(host);
};
