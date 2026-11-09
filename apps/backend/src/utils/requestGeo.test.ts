import { describe, expect, it } from 'vitest';
import { resolveGeoFromHeaders } from './requestGeo';

/** Header reader over a plain record. */
const headers =
  (values: Record<string, string>) =>
  (name: string): string | undefined =>
    values[name];

describe('resolveGeoFromHeaders', () => {
  it('reads Cloudflare visitor location headers', () => {
    expect(
      resolveGeoFromHeaders(
        headers({
          'cf-ipcountry': 'fr',
          'cf-ipcity': 'Lyon',
          'cf-iplatitude': '45.75801',
          'cf-iplongitude': '4.83501',
        })
      )
    ).toEqual({
      country: 'FR',
      city: 'Lyon',
      latitude: 45.76,
      longitude: 4.84,
    });
  });

  it('decodes the URI-encoded Vercel city header', () => {
    expect(
      resolveGeoFromHeaders(
        headers({
          'x-vercel-ip-country': 'BR',
          'x-vercel-ip-city': 'S%C3%A3o%20Paulo',
          'x-vercel-ip-latitude': '-23.5475',
          'x-vercel-ip-longitude': '-46.63611',
        })
      )
    ).toEqual({
      country: 'BR',
      city: 'São Paulo',
      latitude: -23.55,
      longitude: -46.64,
    });
  });

  it('falls back to an unknown country without any header', () => {
    expect(resolveGeoFromHeaders(headers({}))).toEqual({
      country: 'ZZ',
      city: undefined,
      latitude: undefined,
      longitude: undefined,
    });
  });

  it('rejects Tor / malformed countries', () => {
    expect(
      resolveGeoFromHeaders(headers({ 'cf-ipcountry': 'XX' })).country
    ).toBe('ZZ');
    expect(
      resolveGeoFromHeaders(headers({ 'cf-ipcountry': 'T1X' })).country
    ).toBe('ZZ');
  });

  it('drops out-of-range, non-numeric or lone coordinates', () => {
    const outOfRange = resolveGeoFromHeaders(
      headers({ 'cf-iplatitude': '95', 'cf-iplongitude': '10' })
    );
    const notANumber = resolveGeoFromHeaders(
      headers({ 'cf-iplatitude': 'abc', 'cf-iplongitude': '10' })
    );
    const lone = resolveGeoFromHeaders(headers({ 'cf-iplatitude': '10' }));

    for (const geo of [outOfRange, notANumber, lone]) {
      expect(geo.latitude).toBeUndefined();
      expect(geo.longitude).toBeUndefined();
    }
  });

  it('caps the city length and keeps malformed encodings raw', () => {
    expect(
      resolveGeoFromHeaders(headers({ 'cf-ipcity': 'a'.repeat(500) })).city
    ).toHaveLength(128);
    expect(resolveGeoFromHeaders(headers({ 'cf-ipcity': '100%' })).city).toBe(
      '100%'
    );
  });
});
