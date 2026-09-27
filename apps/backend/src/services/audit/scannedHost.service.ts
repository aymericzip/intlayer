import {
  type RoutingStrategy,
  type TechnologyCategory,
  technologySignatures,
} from '@intlayer/engine/scan/detection';
import { logger } from '@logger';
import {
  type HostScan,
  type HostScanSource,
  type HostTechnology,
  type IScannedHost,
  ScannedHostModel,
} from '@schemas/scannedHost.schema';
import type { AuditEvent, DomainData } from './types';

/** Scans kept per host; older ones are dropped from the array. */
export const MAX_SCANS_PER_HOST = 50;

/** Minimum delay between two automatic backend audits of the same host. */
export const BACKGROUND_SCAN_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

/** Lower-cased hostname of a URL (`https://WWW.Example.com/fr` → `www.example.com`). */
export const getHostFromUrl = (url: string): string =>
  new URL(url).hostname.toLowerCase();

/** Merge the partial `domainData` payloads emitted along an audit. */
const mergeDomainData = (events: AuditEvent[]): Partial<DomainData> =>
  Object.assign(
    {},
    ...events.flatMap(({ domainData }) => (domainData ? [domainData] : []))
  );

/**
 * Build the scan entry of a completed audit from its events. The detection
 * evidence is dropped: only what the usage reports need is kept.
 */
export const buildAuditHostScan = (
  url: string,
  events: AuditEvent[],
  score: number,
  source: HostScanSource
): HostScan => {
  const { title, technologies, routing, discoveredLocales } =
    mergeDomainData(events);

  return {
    url,
    source,
    score,
    title: title || undefined,
    technologies: (technologies ?? []).map(
      ({ id, name, category, version }): HostTechnology => ({
        id,
        name,
        category,
        ...(version ? { version } : {}),
      })
    ),
    routingStrategy: routing?.strategy,
    locales: routing?.locales.length ? routing.locales : discoveredLocales,
    scannedAt: new Date(),
  };
};

/** Signature of every known technology, by id. */
const signatureById = new Map(
  technologySignatures.map((signature) => [signature.id, signature])
);

/** Longest version string accepted from a client report. */
const MAX_VERSION_LENGTH = 32;

/**
 * Resolve technologies reported by a client against the known signatures:
 * names and categories come from the server, unknown ids are dropped, so a
 * report cannot inject arbitrary technologies.
 */
export const resolveReportedTechnologies = (
  reportedTechnologies: { id: string; version?: string }[]
): HostTechnology[] => {
  const technologyById = new Map<string, HostTechnology>();

  for (const { id, version } of reportedTechnologies) {
    const signature = signatureById.get(id);
    if (!signature || technologyById.has(id)) continue;

    const trimmedVersion = version?.trim().slice(0, MAX_VERSION_LENGTH);
    technologyById.set(id, {
      id,
      name: signature.name,
      category: signature.category,
      ...(trimmedVersion ? { version: trimmedVersion } : {}),
    });
  }

  return [...technologyById.values()];
};

/**
 * Append a scan to its host document (created on first scan) and refresh the
 * host summary from it. The scan array keeps the latest
 * {@link MAX_SCANS_PER_HOST} entries.
 */
export const recordHostScan = async (scan: HostScan): Promise<void> => {
  await ScannedHostModel.updateOne(
    { host: getHostFromUrl(scan.url) },
    {
      $set: {
        technologies: scan.technologies,
        lastScannedAt: scan.scannedAt,
        ...(scan.routingStrategy
          ? { routingStrategy: scan.routingStrategy }
          : {}),
        ...(scan.locales?.length ? { locales: scan.locales } : {}),
        ...(scan.title ? { title: scan.title } : {}),
        ...(scan.score !== undefined ? { lastScore: scan.score } : {}),
      },
      $push: { scans: { $each: [scan], $slice: -MAX_SCANS_PER_HOST } },
      $inc: { scanCount: 1 },
    },
    { upsert: true }
  );
};

/**
 * Record a completed audit on its host. Failed audits (with a `globalError`)
 * are skipped and storage errors are logged, never thrown: recording must not
 * break a scan.
 */
export const saveAuditHostScan = async (
  url: string,
  events: AuditEvent[],
  score: number,
  source: HostScanSource
): Promise<void> => {
  if (events.some(({ globalError }) => globalError !== undefined)) return;

  try {
    await recordHostScan(buildAuditHostScan(url, events, score, source));
  } catch (error) {
    logger.error(`[scannedHost] failed to record the scan of ${url}:`, error);
  }
};

/**
 * Atomically claim the automatic backend audit of a host: succeeds for at most
 * one caller (across backend instances) per {@link BACKGROUND_SCAN_INTERVAL_MS}.
 *
 * @returns Whether the caller should run the audit.
 */
export const claimBackgroundScan = async (host: string): Promise<boolean> => {
  const now = new Date();
  const result = await ScannedHostModel.updateOne(
    {
      host,
      $or: [
        { backgroundScanClaimedAt: { $exists: false } },
        {
          backgroundScanClaimedAt: {
            $lt: new Date(now.getTime() - BACKGROUND_SCAN_INTERVAL_MS),
          },
        },
      ],
    },
    { $set: { backgroundScanClaimedAt: now } }
  );

  return result.modifiedCount === 1;
};

/** Number of hosts using a technology. */
export type TechnologyUsage = HostTechnology & {
  hostCount: number;
  /** Most recent scan of a host using it. */
  lastSeenAt: Date;
};

/**
 * Count, per technology, the hosts whose latest scan detected it.
 *
 * @param category - Restrict to one category (e.g. `i18n-library`, `tms`).
 * @returns Technologies sorted by host count, most used first.
 */
export const getTechnologyUsage = async (
  category?: TechnologyCategory
): Promise<TechnologyUsage[]> =>
  ScannedHostModel.aggregate<TechnologyUsage>([
    ...(category ? [{ $match: { 'technologies.category': category } }] : []),
    { $unwind: '$technologies' },
    ...(category ? [{ $match: { 'technologies.category': category } }] : []),
    {
      $group: {
        _id: '$technologies.id',
        name: { $first: '$technologies.name' },
        category: { $first: '$technologies.category' },
        hostCount: { $sum: 1 },
        lastSeenAt: { $max: '$lastScannedAt' },
      },
    },
    { $sort: { hostCount: -1, _id: 1 } },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        category: 1,
        hostCount: 1,
        lastSeenAt: 1,
      },
    },
  ]);

/** Summary of a scanned host, as listed in the usage report. */
export type ScannedHostSummary = {
  id: string;
  host: string;
  title?: string;
  technologies: HostTechnology[];
  routingStrategy?: RoutingStrategy;
  locales?: string[];
  lastScore?: number;
  lastScannedAt: Date;
  scanCount: number;
};

/** A scanned host with its stored scans, newest first. */
export type ScannedHostDetail = ScannedHostSummary & { scans: HostScan[] };

export type FindScannedHostsFilters = {
  /** Only hosts using this technology (`crowdin`, `next-intl`…). */
  technologyId?: string;
  /** Only hosts using a technology of this category. */
  category?: TechnologyCategory;
  /** Case-insensitive host substring. */
  search?: string;
  page: number;
  pageSize: number;
};

/** Escape a user string for use inside a regular expression. */
const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Map a stored host to its summary (the scan array is left out). */
const toScannedHostSummary = (
  scannedHost: Pick<
    IScannedHost,
    | 'host'
    | 'title'
    | 'technologies'
    | 'routingStrategy'
    | 'locales'
    | 'lastScore'
    | 'lastScannedAt'
    | 'scanCount'
  > & { _id: unknown }
): ScannedHostSummary => ({
  id: String(scannedHost._id),
  host: scannedHost.host,
  title: scannedHost.title,
  technologies: scannedHost.technologies,
  routingStrategy: scannedHost.routingStrategy,
  locales: scannedHost.locales,
  lastScore: scannedHost.lastScore,
  lastScannedAt: scannedHost.lastScannedAt,
  scanCount: scannedHost.scanCount,
});

/** List the scanned hosts, most recently scanned first. */
export const findScannedHosts = async ({
  technologyId,
  category,
  search,
  page,
  pageSize,
}: FindScannedHostsFilters): Promise<{
  data: ScannedHostSummary[];
  totalItems: number;
  totalPages: number;
}> => {
  const technologyFilter = {
    ...(technologyId ? { id: technologyId } : {}),
    ...(category ? { category } : {}),
  };
  const filter = {
    ...(Object.keys(technologyFilter).length > 0
      ? { technologies: { $elemMatch: technologyFilter } }
      : {}),
    ...(search
      ? { host: { $regex: escapeRegExp(search.trim()), $options: 'i' } }
      : {}),
  };

  const [scannedHosts, totalItems] = await Promise.all([
    ScannedHostModel.find(filter)
      .select('-scans')
      .sort({ lastScannedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean(),
    ScannedHostModel.countDocuments(filter),
  ]);

  return {
    data: scannedHosts.map(toScannedHostSummary),
    totalItems,
    totalPages: Math.max(1, Math.ceil(totalItems / pageSize)),
  };
};

/** A host with its stored scans (newest first), or `null` when unknown. */
export const getScannedHost = async (
  host: string
): Promise<ScannedHostDetail | null> => {
  const scannedHost = await ScannedHostModel.findOne({
    host: host.toLowerCase(),
  }).lean();

  if (!scannedHost) return null;

  return {
    ...toScannedHostSummary(scannedHost),
    scans: [...scannedHost.scans].reverse(),
  };
};
