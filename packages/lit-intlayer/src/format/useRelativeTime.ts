import { relativeTime } from '@intlayer/core/formatters';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

class RelativeTimeController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _unsubscribe: (() => void) | null = null;
  value: (...args: Parameters<typeof relativeTime>) => string;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    const client = getIntlayerClient();
    this.value = (...args) =>
      relativeTime(args[0], args[1], {
        ...args[2],
        locale: args[2]?.locale ?? client.locale,
      });

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.value = (...args) =>
        relativeTime(args[0], args[1], {
          ...args[2],
          locale: args[2]?.locale ?? newLocale,
        });
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

export const useRelativeTime = (
  host: ReactiveControllerHost
): RelativeTimeController => new RelativeTimeController(host);
