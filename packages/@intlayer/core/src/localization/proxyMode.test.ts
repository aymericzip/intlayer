import { afterEach, describe, expect, it } from 'vitest';
import {
  formatProxyEnabledMessage,
  isProxyStorageLocaleEnabled,
  resolveProxyMode,
} from './proxyMode';

describe('resolveProxyMode', () => {
  afterEach(() => {
    delete process.env.INTLAYER_ROUTING_ENABLE_PROXY;
  });

  it('resolves an unset option to auto', () => {
    expect(resolveProxyMode(undefined)).toBe('auto');
    expect(resolveProxyMode()).toBe('auto');
  });

  it('resolves the explicit booleans', () => {
    expect(resolveProxyMode(true)).toBe('forced');
    expect(resolveProxyMode(false)).toBe('disabled');
  });

  it('lets the build-time env var win over the configuration value', () => {
    // The var is injected by `getConfigEnvVars` so bundlers can eliminate the
    // guarded branches; it must therefore take precedence.
    process.env.INTLAYER_ROUTING_ENABLE_PROXY = 'false';
    expect(resolveProxyMode(true)).toBe('disabled');

    process.env.INTLAYER_ROUTING_ENABLE_PROXY = 'true';
    expect(resolveProxyMode(false)).toBe('forced');
  });

  it('falls back to the configuration value for any other env var content', () => {
    // Only the two explicit states are ever emitted; anything else means auto
    // and must not be parsed as a boolean.
    process.env.INTLAYER_ROUTING_ENABLE_PROXY = '';
    expect(resolveProxyMode(undefined)).toBe('auto');
    expect(resolveProxyMode(true)).toBe('forced');
  });
});

describe('isProxyStorageLocaleEnabled', () => {
  it('suppresses the stored locale only in auto mode on a dev server', () => {
    expect(isProxyStorageLocaleEnabled('auto', true)).toBe(false);
  });

  it('keeps the stored locale active in every other combination', () => {
    expect(isProxyStorageLocaleEnabled('auto', false)).toBe(true);
    expect(isProxyStorageLocaleEnabled('forced', true)).toBe(true);
    expect(isProxyStorageLocaleEnabled('forced', false)).toBe(true);
    expect(isProxyStorageLocaleEnabled('disabled', true)).toBe(true);
  });
});

describe('formatProxyEnabledMessage', () => {
  /** Strips ANSI colour codes so the wording can be asserted directly. */
  const plain = (message: string): string =>
    // biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escapes
    message.replace(/\[[0-9;]*m/g, '');

  it('names the suppression when the stored locale is barred', () => {
    expect(plain(formatProxyEnabledMessage(true))).toBe(
      'Intlayer proxy enabled - storage redirection disabled for dev purpose'
    );
  });

  it('reports a plain enabled state otherwise', () => {
    expect(plain(formatProxyEnabledMessage(false))).toBe(
      'Intlayer proxy enabled'
    );
  });

  it('never claims suppression for auto mode outside a dev server', () => {
    // Guards the reason the signature takes a boolean rather than a ProxyMode:
    // in production, auto behaves like forced, so a production caller (the
    // Nitro handler) must not announce a suppression that is not in effect.
    const suppressed = !isProxyStorageLocaleEnabled('auto', false);
    expect(plain(formatProxyEnabledMessage(suppressed))).toBe(
      'Intlayer proxy enabled'
    );
  });
});
