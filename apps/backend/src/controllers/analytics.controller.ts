import * as analyticsService from '@services/analytics.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { isBotRequest } from '@utils/isBotRequest';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import type {
  AnalyticsOverviewRow,
  AudienceRange,
  AudienceStats,
  ContentStatRow,
  ExperimentResult,
  IncomingAnalyticsEvent,
} from '@/types/analytics.types';

/** Hard cap on events accepted per ingestion request. */
const MAX_EVENTS_PER_BATCH = 1000;

/**
 * Extracts an ISO country code from common CDN/proxy geo headers, falling back
 * to `ZZ` (unknown). No IP address is read or stored.
 */
const resolveCountry = (request: FastifyRequest): string => {
  const header = (name: string): string | undefined => {
    const value = request.headers[name];
    return Array.isArray(value) ? value[0] : value;
  };

  const country =
    header('cf-ipcountry') ??
    header('x-vercel-ip-country') ??
    header('x-country-code') ??
    header('x-appengine-country');

  return country && country !== 'XX' ? country.toUpperCase() : 'ZZ';
};

export type IngestAnalyticsBody = {
  clientId?: string;
  sessionId: string;
  sdkVersion: string;
  events: IncomingAnalyticsEvent[];
};
export type IngestAnalyticsResult = ResponseData<{ accepted: number }>;
export type GetAnalyticsOverviewResult = ResponseData<AnalyticsOverviewRow[]>;
export type GetContentStatsResult = ResponseData<ContentStatRow[]>;
export type GetExperimentResultsResult = ResponseData<ExperimentResult>;
export type GetAudienceResult = ResponseData<AudienceStats>;

/**
 * Public — ingests a batch of analytics events. Attribution is by the public
 * `clientId` (reused from `editor.clientId`). Unknown keys are silently
 * accepted (no data is stored) so the endpoint never leaks project existence.
 *
 * Bot traffic is dropped here as well as in the SDK: this endpoint is public
 * and serves every already-deployed SDK version, so it must not rely on the
 * client-side gate alone.
 */
export const ingestAnalyticsEvents = async (
  request: FastifyRequest<{ Body: IngestAnalyticsBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { clientId, sessionId, events } = request.body ?? {};

  if (isBotRequest(request)) {
    // Silently accept — never tell a crawler its events were discarded.
    return reply
      .status(200)
      .send(formatResponse<{ accepted: number }>({ data: { accepted: 0 } }));
  }

  if (!clientId || !Array.isArray(events) || events.length === 0) {
    return reply
      .status(200)
      .send(formatResponse<{ accepted: number }>({ data: { accepted: 0 } }));
  }

  try {
    const projectId =
      await analyticsService.resolveProjectIdByClientId(clientId);

    if (!projectId) {
      // Silently accept — do not reveal whether the key exists.
      return reply
        .status(200)
        .send(formatResponse<{ accepted: number }>({ data: { accepted: 0 } }));
    }

    const boundedEvents = events.slice(0, MAX_EVENTS_PER_BATCH);
    await analyticsService.ingestEvents(projectId, boundedEvents, {
      sessionId,
      country: resolveCountry(request),
    });

    return reply.status(200).send(
      formatResponse<{ accepted: number }>({
        data: { accepted: boundedEvents.length },
      })
    );
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Authenticated — page/locale totals for the active project.
 */
export const getAnalyticsOverview = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project } = request.session ?? {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_NOT_FOUND');
  }

  try {
    const data = await analyticsService.getOverview(
      new Types.ObjectId(String(project.id))
    );
    return reply
      .status(200)
      .send(formatResponse<AnalyticsOverviewRow[]>({ data }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Authenticated — per-content exposure totals for the active project.
 */
export const getContentStats = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project } = request.session ?? {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_NOT_FOUND');
  }

  try {
    const data = await analyticsService.getContentStats(
      new Types.ObjectId(String(project.id))
    );
    return reply.status(200).send(formatResponse<ContentStatRow[]>({ data }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Authenticated — A/B experiment results for the active project.
 */
export const getExperimentResults = async (
  request: FastifyRequest<{ Params: { experimentKey: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { project } = request.session ?? {};
  const { experimentKey } = request.params;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_NOT_FOUND');
  }

  try {
    const data = await analyticsService.getExperimentResults(
      new Types.ObjectId(String(project.id)),
      experimentKey
    );
    return reply.status(200).send(formatResponse<ExperimentResult>({ data }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Resolves the requested audience window from the query string. Prefers the
 * named `?range=` parameter and falls back to the legacy `?days=` one, so
 * clients predating the named ranges keep working.
 */
const resolveAudienceRange = (query: {
  range?: string;
  days?: string;
}): AudienceRange => {
  if (query.range && analyticsService.isAudienceRange(query.range)) {
    return query.range;
  }

  if (query.days) {
    const days = Number.parseInt(query.days, 10);
    if (Number.isFinite(days) && days > 0) {
      return analyticsService.audienceRangeFromDays(days);
    }
  }

  return analyticsService.DEFAULT_AUDIENCE_RANGE;
};

/**
 * Authenticated — audience report for the active project: distinct visitors
 * (today / 7d / window), page views, the evolution series, and locale +
 * country breakdowns. Accepts an optional `?range=` window (`1h`, `24h`, `7d`,
 * `30d`, `90d`, `6mo`, `1y`, `3y`; default `30d`) or the legacy `?days=`.
 */
export const getAnalyticsAudience = async (
  request: FastifyRequest<{ Querystring: { range?: string; days?: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { project } = request.session ?? {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_NOT_FOUND');
  }

  try {
    const data = await analyticsService.getAudience(
      new Types.ObjectId(String(project.id)),
      resolveAudienceRange(request.query ?? {})
    );
    return reply.status(200).send(formatResponse<AudienceStats>({ data }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
