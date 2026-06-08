import { number } from '@intlayer/core/formatters';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * ReactiveController that provides a locale-bound number formatter.
 */
class NumberController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _unsubscribe: (() => void) | null = null;
  value: (...args: Parameters<typeof number>) => string;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    const client = getIntlayerClient();
    this.value = (...args) =>
      number(args[0], { ...args[1], locale: args[1]?.locale ?? client.locale });

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.value = (...args) =>
        number(args[0], { ...args[1], locale: args[1]?.locale ?? newLocale });
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

/**
 * Reactive hook that provides a locale-bound number formatter.
 */
export const useNumber = (host: ReactiveControllerHost): NumberController =>
  new NumberController(host);
