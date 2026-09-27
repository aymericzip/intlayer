import type {
  RoutingStrategy,
  TechnologyCategory,
} from '@intlayer/engine/scan/detection';
import { logger } from '@logger';
import { enqueueBackgroundScan } from '@services/audit/backgroundScanQueue';
import {
  claimBackgroundScan,
  findScannedHosts,
  getHostFromUrl,
  getScannedHost,
  getTechnologyUsage,
  recordHostScan,
  resolveReportedTechnologies,
  type ScannedHostDetail,
  type ScannedHostSummary,
  type TechnologyUsage,
} from '@services/audit/scannedHost.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { isPublicHttpUrl } from '@utils/isPublicUrl';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

/** Categories accepted by the usage report filters. */
const TECHNOLOGY_CATEGORIES = new Set<TechnologyCategory>([
  'framework',
  'i18n-library',
  'tms',
  'translation-proxy',
  'cms',
]);

/** Narrow a query-string value to a {@link TechnologyCategory}. */
const parseTechnologyCategory = (
  value: string | undefined
): TechnologyCategory | undefined =>
  value && TECHNOLOGY_CATEGORIES.has(value as TechnologyCategory)
    ? (value as TechnologyCategory)
    : undefined;

/** Whether the request comes from an admin session. */
const isAdminRequest = (request: FastifyRequest): boolean =>
  Boolean(request.session?.roles?.includes('admin'));

export type ReportHostDetectionBody = {
  /** Page the detection ran on. */
  url: string;
  /** Technologies detected by the client (resolved against the signatures). */
  technologies: { id: string; version?: string }[];
  routingStrategy?: RoutingStrategy;
  locales?: string[];
  title?: string;
};
export type ReportHostDetectionResult = ResponseData<{
  /** Whether a backend audit of the page was queued. */
  isBackgroundScanQueued: boolean;
}>;

/**
 * Public — POST /api/scan/hosts/detections
 * Record the technologies a client (the Chrome extension) detected on a page,
 * then queue a backend audit of the host when it has not had one recently.
 * The body is validated by the route schema; technology names and categories
 * are resolved server-side.
 */
export const reportHostDetectionHandler = async (
  request: FastifyRequest<{ Body: ReportHostDetectionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { url, technologies, routingStrategy, locales, title } = request.body;

  if (!(await isPublicHttpUrl(url))) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SCAN_URL_NOT_PUBLIC'
    );
  }

  try {
    await recordHostScan({
      url,
      source: 'extension',
      technologies: resolveReportedTechnologies(technologies),
      routingStrategy,
      locales,
      title: title?.trim() || undefined,
      scannedAt: new Date(),
    });

    const isBackgroundScanQueued =
      (await claimBackgroundScan(getHostFromUrl(url))) &&
      enqueueBackgroundScan(url);

    return reply.send(
      formatResponse<{ isBackgroundScanQueued: boolean }>({
        data: { isBackgroundScanQueued },
      })
    );
  } catch (error) {
    logger.error(
      `[scannedHost] failed to record a detection on ${url}:`,
      error
    );
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetTechnologyUsageQuery = { category?: string };
export type GetTechnologyUsageResult = ResponseData<TechnologyUsage[]>;

/**
 * Admin — GET /api/scan/technologies[?category=tms]
 * Number of scanned hosts using each technology (latest scan per host).
 */
export const getTechnologyUsageHandler = async (
  request: FastifyRequest<{ Querystring: GetTechnologyUsageQuery }>,
  reply: FastifyReply
): Promise<void> => {
  if (!isAdminRequest(request)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const technologyUsage = await getTechnologyUsage(
      parseTechnologyCategory(request.query.category)
    );

    return reply.send(
      formatResponse<TechnologyUsage[]>({ data: technologyUsage })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetScannedHostsQuery = {
  technologyId?: string;
  category?: string;
  search?: string;
  page?: string;
  pageSize?: string;
};
export type GetScannedHostsResult = PaginatedResponse<ScannedHostSummary>;

/** Upper bound of `pageSize`, to keep the query cheap. */
const MAX_PAGE_SIZE = 100;

/**
 * Admin — GET /api/scan/hosts[?technologyId=crowdin&category=&search=&page=&pageSize=]
 * Scanned hosts, most recently scanned first, optionally filtered.
 */
export const getScannedHostsHandler = async (
  request: FastifyRequest<{ Querystring: GetScannedHostsQuery }>,
  reply: FastifyReply
): Promise<void> => {
  if (!isAdminRequest(request)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { technologyId, category, search } = request.query;
  const page = Math.max(1, Number(request.query.page) || 1);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Number(request.query.pageSize) || 20)
  );

  try {
    const { data, totalItems, totalPages } = await findScannedHosts({
      technologyId: technologyId || undefined,
      category: parseTechnologyCategory(category),
      search: search || undefined,
      page,
      pageSize,
    });

    return reply.send(
      formatPaginatedResponse<ScannedHostSummary>({
        data,
        page,
        pageSize,
        totalPages,
        totalItems,
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetScannedHostParams = { host: string };
export type GetScannedHostResult = ResponseData<ScannedHostDetail>;

/**
 * Admin — GET /api/scan/hosts/:host
 * A scanned host with its stored scans, newest first.
 */
export const getScannedHostHandler = async (
  request: FastifyRequest<{ Params: GetScannedHostParams }>,
  reply: FastifyReply
): Promise<void> => {
  if (!isAdminRequest(request)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const scannedHost = await getScannedHost(request.params.host);

    if (!scannedHost) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'SCANNED_HOST_NOT_FOUND'
      );
    }

    return reply.send(formatResponse<ScannedHostDetail>({ data: scannedHost }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
