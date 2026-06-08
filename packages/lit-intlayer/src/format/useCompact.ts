import { compact } from '@intlayer/core/formatters';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

class CompactController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _unsubscribe: (() => void) | null = null;
  value: (...args: Parameters<typeof compact>) => string;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    const client = getIntlayerClient();
    this.value = (...args) =>
      compact(args[0], {
        ...args[1],
        locale: args[1]?.locale ?? client.locale,
      });

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.value = (...args) =>
        compact(args[0], {
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

export const useCompact = (host: ReactiveControllerHost): CompactController =>
  new CompactController(host);
