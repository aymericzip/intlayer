import type { FastifyRequest } from 'fastify';

/** Visitor location derived from CDN / proxy geo headers. No IP is read. */
export type RequestGeo = {
  /** ISO 3166-1 alpha-2 country code, `ZZ` when unknown. */
  country: string;
  /** City name, when the CDN provides it. */
  city?: string;
  /** City-level latitude, rounded to ~1 km. */
  latitude?: number;
  /** City-level longitude, rounded to ~1 km. */
  longitude?: number;
};

/** Longest city name kept — the header is client-reachable, so it is capped. */
const MAX_CITY_LENGTH = 128;

/** Decimal places kept on coordinates: two is ~1 km, i.e. city level. */
const COORDINATE_DECIMALS = 2;

/** Reads a header as a single string. */
type HeaderReader = (name: string) => string | undefined;

/** First header among `names` that is set. */
const firstHeader = (
  readHeader: HeaderReader,
  names: string[]
): string | undefined =>
  names.map(readHeader).find((value) => value !== undefined && value !== '');

/**
 * Parses a coordinate header, rejecting anything outside `[-limit, limit]`.
 * The CDN reports a city centroid; rounding keeps it at city precision.
 */
const parseCoordinate = (
  value: string | undefined,
  limit: number
): number | undefined => {
  if (value === undefined) return undefined;

  const coordinate = Number(value);

  if (!Number.isFinite(coordinate) || Math.abs(coordinate) > limit) {
    return undefined;
  }

  return Number(coordinate.toFixed(COORDINATE_DECIMALS));
};

/** Decodes a city header (Vercel URI-encodes it) and caps its length. */
const parseCity = (value: string | undefined): string | undefined => {
  if (!value) return undefined;

  let city = value;
  try {
    city = decodeURIComponent(value);
  } catch {
    // Not URI-encoded (Cloudflare sends it raw) — keep as is.
  }

  const trimmedCity = city.trim().slice(0, MAX_CITY_LENGTH);

  return trimmedCity || undefined;
};

/**
 * Resolves the visitor location from common CDN geo headers (Cloudflare with
 * "visitor location headers" enabled, Vercel, App Engine). Missing city or
 * coordinates are left `undefined`; the dashboard then falls back to the
 * country centroid.
 *
 * @param readHeader - Returns a request header value by lower-case name.
 */
export const resolveGeoFromHeaders = (readHeader: HeaderReader): RequestGeo => {
  const country = firstHeader(readHeader, [
    'cf-ipcountry',
    'x-vercel-ip-country',
    'x-country-code',
    'x-appengine-country',
  ]);

  const latitude = parseCoordinate(
    firstHeader(readHeader, ['cf-iplatitude', 'x-vercel-ip-latitude']),
    90
  );
  const longitude = parseCoordinate(
    firstHeader(readHeader, ['cf-iplongitude', 'x-vercel-ip-longitude']),
    180
  );
  // A lone coordinate cannot be placed on a map.
  const hasCoordinates = latitude !== undefined && longitude !== undefined;

  return {
    country:
      country && /^[A-Za-z]{2}$/.test(country) && country !== 'XX'
        ? country.toUpperCase()
        : 'ZZ',
    city: parseCity(
      firstHeader(readHeader, [
        'cf-ipcity',
        'x-vercel-ip-city',
        'x-appengine-city',
      ])
    ),
    latitude: hasCoordinates ? latitude : undefined,
    longitude: hasCoordinates ? longitude : undefined,
  };
};

/** {@link resolveGeoFromHeaders} for a Fastify request. */
export const resolveRequestGeo = (request: FastifyRequest): RequestGeo =>
  resolveGeoFromHeaders((name) => {
    const value = request.headers[name];
    return Array.isArray(value) ? value[0] : value;
  });
