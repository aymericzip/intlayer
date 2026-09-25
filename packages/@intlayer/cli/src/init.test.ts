import { describe, expect, it } from 'vitest';
import {
  getRoutingInitOptions,
  LOCALE_ROUTING_CHOICES,
  parseLocaleRoutingChoice,
} from './init';

describe('getRoutingInitOptions', () => {
  it('routes through the proxy for a routing mode', () => {
    expect(getRoutingInitOptions('prefix-all')).toEqual({
      routingMode: 'prefix-all',
      enableProxy: true,
    });
  });

  it('disables the proxy when no locale routing is wanted', () => {
    expect(getRoutingInitOptions('none')).toEqual({
      routingMode: 'no-prefix',
      enableProxy: false,
    });
  });
});

describe('parseLocaleRoutingChoice', () => {
  it('accepts every offered choice', () => {
    for (const choice of LOCALE_ROUTING_CHOICES) {
      expect(parseLocaleRoutingChoice(choice)).toBe(choice);
    }
  });

  it('rejects an unknown choice', () => {
    expect(() => parseLocaleRoutingChoice('prefix')).toThrow(
      'Invalid --routing value'
    );
  });
});
