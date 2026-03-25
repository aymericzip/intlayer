import { date, presets } from '@intlayer/core/formatters';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * ReactiveController that provides a locale-bound date formatter.
 */
class DateController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _unsubscribe: (() => void) | null = null;
  value: (...args: Parameters<typeof date>) => string;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    const client = getIntlayerClient();
    this.value = (...args) => {
      const options =
        typeof args[1] === 'string'
          ? { ...presets[args[1]], locale: client.locale }
          : { ...args[1], locale: args[1]?.locale ?? client.locale };
      return date(args[0], options as Parameters<typeof date>[1]);
    };

    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._unsubscribe = client.subscribe((newLocale) => {
      this.value = (...args) => {
        const options =
          typeof args[1] === 'string'
            ? { ...presets[args[1]], locale: newLocale }
            : { ...args[1], locale: args[1]?.locale ?? newLocale };
        return date(args[0], options as Parameters<typeof date>[1]);
      };
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
  }
}

/**
 * Reactive hook that provides a locale-bound date formatter.
 */
export const useDate = (host: ReactiveControllerHost): DateController =>
  new DateController(host);
