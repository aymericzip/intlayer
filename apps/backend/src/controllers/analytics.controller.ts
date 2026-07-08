import * as analyticsService from '@services/analytics.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';
import type {
  AnalyticsOverviewRow,
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
 */
export const ingestAnalyticsEvents = async (
  request: FastifyRequest<{ Body: IngestAnalyticsBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { clientId, sessionId, events } = request.body ?? {};

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
 * Authenticated — audience report for the active project: distinct visitors
 * (today / 7d / window), page views, the daily evolution series, and locale +
 * country breakdowns. Accepts an optional `?days=` window (default 30).
 */
export const getAnalyticsAudience = async (
  request: FastifyRequest<{ Querystring: { days?: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { project } = request.session ?? {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_NOT_FOUND');
  }

  const rangeDays = Number.parseInt(request.query.days ?? '30', 10);

  try {
    const data = await analyticsService.getAudience(
      new Types.ObjectId(String(project.id)),
      Number.isFinite(rangeDays) ? rangeDays : 30
    );
    return reply.status(200).send(formatResponse<AudienceStats>({ data }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
