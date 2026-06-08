import { currency } from '@intlayer/core/formatters';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

class CurrencyController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _unsubscribe: (() => void) | null = null;
  value: (...args: Parameters<typeof currency>) => string;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    const client = getIntlayerClient();
    this.value = (...args) =>
      currency(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? client.locale,
      });

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.value = (...args) =>
        currency(args[0], {
          ...args[1],
          locale: args[1]?.locale ?? newLocale,
        });
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

export const useCurrency = (host: ReactiveControllerHost): CurrencyController =>
  new CurrencyController(host);
