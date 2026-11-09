import { describe, expect, it } from 'vitest';
import { mergeIpLocation, resolveGeoFromHeaders } from './requestGeo';

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

describe('mergeIpLocation', () => {
  it('places a country-only visitor on the IP city', () => {
    expect(
      mergeIpLocation(
        { country: 'TR' },
        {
          country: 'TR',
          city: 'İzmir',
          latitude: 38.41885,
          longitude: 27.12872,
        }
      )
    ).toEqual({
      country: 'TR',
      city: 'İzmir',
      latitude: 38.42,
      longitude: 27.13,
    });
  });

  it('keeps CDN coordinates over the IP lookup', () => {
    const headerGeo = {
      country: 'FR',
      city: 'Lyon',
      latitude: 45.76,
      longitude: 4.84,
    };

    expect(
      mergeIpLocation(headerGeo, {
        country: 'FR',
        city: 'Paris',
        latitude: 48.85,
        longitude: 2.35,
      })
    ).toBe(headerGeo);
  });

  it('ignores a lookup in another country than the CDN reports', () => {
    expect(
      mergeIpLocation(
        { country: 'ES' },
        { country: 'NL', city: 'Amsterdam', latitude: 52.37, longitude: 4.9 }
      )
    ).toEqual({ country: 'ES' });
  });

  it('takes the IP country when the CDN sent none', () => {
    expect(
      mergeIpLocation(
        { country: 'ZZ' },
        { country: 'de', latitude: 52.52, longitude: 13.4049 }
      )
    ).toEqual({
      country: 'DE',
      city: undefined,
      latitude: 52.52,
      longitude: 13.4,
    });
  });
});
