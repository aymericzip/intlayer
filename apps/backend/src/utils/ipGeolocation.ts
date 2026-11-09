import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { isIP } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { gunzip } from 'node:zlib';
import { logger } from '@logger';
import { type CityResponse, Reader } from 'mmdb-lib';

/** City-level location of an IP address. */
export type IpLocation = {
  /** ISO 3166-1 alpha-2 country code. */
  country?: string;
  city?: string;
  latitude: number;
  longitude: number;
};

/** How often the loaded database is checked against the current month. */
const REFRESH_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000;

/** Delay before retrying a failed download. */
const RETRY_DELAY_MS = 60 * 60 * 1000;

/** DB-IP publishes a new "IP to City Lite" database each month. */
const getDbIpDatabaseUrl = (month: string): string =>
  `https://download.db-ip.com/free/dbip-city-lite-${month}.mmdb.gz`;

const DB_IP_FILE_PREFIX = 'dbip-city-lite-';

const gunzipAsync = promisify(gunzip);

/** `YYYY-MM` of `date`, `monthsBack` months earlier (UTC). */
export const getDatabaseMonth = (date: Date, monthsBack = 0): string => {
  const monthDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - monthsBack, 1)
  );

  return monthDate.toISOString().slice(0, 7);
};

/** Whether a buffer starts with the gzip magic number. */
const isGzip = (buffer: Buffer): boolean =>
  buffer.length > 2 && buffer[0] === 0x1f && buffer[1] === 0x8b;

let reader: Reader<CityResponse> | null = null;
/** Month of the loaded DB-IP database, `null` for a custom file. */
let loadedMonth: string | null = null;
let loading: Promise<void> | null = null;

/** Opens an `.mmdb` (optionally gzipped) buffer as a city reader. */
const openReader = async (
  databaseBuffer: Buffer
): Promise<Reader<CityResponse>> =>
  new Reader<CityResponse>(
    isGzip(databaseBuffer) ? await gunzipAsync(databaseBuffer) : databaseBuffer
  );

/**
 * Returns the cached DB-IP database of `month`, downloading it when missing.
 * Older cached months are deleted. `null` when the month is not published yet.
 */
const loadDbIpDatabase = async (
  cacheDirectory: string,
  month: string
): Promise<Buffer | null> => {
  const fileName = `${DB_IP_FILE_PREFIX}${month}.mmdb.gz`;
  const filePath = join(cacheDirectory, fileName);

  const cached = await readFile(filePath).catch(() => null);
  if (cached) return cached;

  const response = await fetch(getDbIpDatabaseUrl(month));
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GeoIP download failed with status ${response.status}`);
  }

  const downloaded = Buffer.from(await response.arrayBuffer());

  await mkdir(cacheDirectory, { recursive: true });
  await writeFile(filePath, downloaded);

  const staleFiles = (await readdir(cacheDirectory)).filter(
    (name) => name.startsWith(DB_IP_FILE_PREFIX) && name !== fileName
  );
  await Promise.all(
    staleFiles.map((name) => rm(join(cacheDirectory, name), { force: true }))
  );

  return downloaded;
};

/** Loads the database: `GEOIP_DATABASE_PATH`, else this (or last) month's DB-IP. */
const loadDatabase = async (): Promise<void> => {
  const customPath = process.env.GEOIP_DATABASE_PATH;

  if (customPath) {
    reader = await openReader(await readFile(customPath));
    loadedMonth = null;
    logger.info(`GeoIP database loaded from ${customPath}`);
    return;
  }

  const cacheDirectory =
    process.env.GEOIP_CACHE_DIR ?? join(tmpdir(), 'intlayer-geoip');
  const now = new Date();

  // Early in the month the new file may not be published yet.
  for (const monthsBack of [0, 1]) {
    const month = getDatabaseMonth(now, monthsBack);
    if (month === loadedMonth) return;

    const databaseBuffer = await loadDbIpDatabase(cacheDirectory, month);
    if (!databaseBuffer) continue;

    reader = await openReader(databaseBuffer);
    loadedMonth = month;
    logger.info(`GeoIP database loaded (DB-IP City Lite ${month})`);
    return;
  }

  throw new Error('No DB-IP City Lite database is available');
};

/** Single-flight load; failures are logged and retried later. */
const refreshDatabase = (): Promise<void> => {
  loading ??= loadDatabase()
    .catch((error: unknown) => {
      logger.warn(
        `GeoIP database unavailable, visitors are placed by country: ${String(error)}`
      );
      setTimeout(() => void refreshDatabase(), RETRY_DELAY_MS).unref();
    })
    .finally(() => {
      loading = null;
    });

  return loading;
};

/**
 * Loads the IP → city database in the background, so live visitors can be
 * placed on their city when the CDN sends no coordinates. Defaults to DB-IP
 * "IP to City Lite" (CC BY 4.0, attribution shown on the live map), cached on
 * disk and refreshed monthly. `GEOIP_DATABASE_PATH` points to another `.mmdb`
 * (e.g. MaxMind GeoLite2-City); `GEOIP_DISABLED=true` turns lookups off.
 */
export const startIpGeolocation = (): void => {
  if (process.env.GEOIP_DISABLED === 'true') return;

  void refreshDatabase();
  setInterval(() => {
    if (loadedMonth !== null && loadedMonth !== getDatabaseMonth(new Date())) {
      void refreshDatabase();
    }
  }, REFRESH_CHECK_INTERVAL_MS).unref();
};

/** Maps a database record to a location; `undefined` without coordinates. */
export const toIpLocation = (
  record: CityResponse | null
): IpLocation | undefined => {
  const location = record?.location;

  if (
    typeof location?.latitude !== 'number' ||
    typeof location.longitude !== 'number'
  ) {
    return undefined;
  }

  return {
    country: record?.country?.iso_code,
    city: record?.city?.names.en,
    latitude: location.latitude,
    longitude: location.longitude,
  };
};

/**
 * City-level location of an IP address. `undefined` while the database is
 * loading, for private / unknown addresses, or when lookups are disabled. The
 * address is only read here, never stored.
 */
export const lookupIpLocation = (
  ipAddress: string | undefined
): IpLocation | undefined => {
  if (!reader || !ipAddress || !isIP(ipAddress)) return undefined;

  try {
    return toIpLocation(reader.get(ipAddress));
  } catch {
    return undefined;
  }
};
