import { mutateScore, type Score, toScorePercent } from '@intlayer/engine/scan';
import { logger } from '@logger';
import { AuditModel } from '@schemas/audit.schema';
import {
  getCachedAudit,
  setCachedAudit,
} from '@services/audit/auditCache.service';
import { runSingleAudit } from '@services/audit/seoAudit.service';
import type { AuditEvent } from '@services/audit/types';
import { isPublicHttpUrl } from '@utils/isPublicUrl';
import type { FastifyReply, FastifyRequest } from 'fastify';

const sendSSE = (res: FastifyReply, data: AuditEvent) => {
  res.raw.write(`data: ${JSON.stringify(data)}\n\n`);
};

/**
 * Adds the running score and progress to raw audit events, so a live audit
 * and a cached replay stream exactly the same payloads.
 */
const createScoreTracker = () => {
  let score: Score = { score: 0, totalScore: 0 };
  let currentProgress = 0;

  return {
    track: (event: AuditEvent): AuditEvent => {
      score = mutateScore(score, event);
      if (event.progress !== undefined) currentProgress = event.progress;
      return {
        ...event,
        progress: currentProgress,
        score: toScorePercent(score),
      };
    },
    getScorePercent: () => toScorePercent(score),
  };
};

/**
 * GET /api/scan?url=<targetUrl>[&refresh=true]
 * Streams audit results as Server-Sent Events.
 *
 * A URL audited less than an hour ago is replayed from cache, preceded by a
 * `{ cachedAt }` event. `refresh=true` forces a new audit and updates the cache.
 */
export const auditGetHandler = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  res.hijack();

  const headers = res.getHeaders();
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      res.raw.setHeader(key, value as string | number | readonly string[]);
    }
  }

  res.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  res.raw.setHeader('Connection', 'keep-alive');
  res.raw.setHeader('X-Accel-Buffering', 'no');

  if ((res.raw as any).flushHeaders) {
    (res.raw as any).flushHeaders();
  }

  res.raw.write(': connected\n\n');

  const { url: targetUrl, refresh } = req.query as {
    url?: string;
    refresh?: string;
  };
  const isRefreshRequested = refresh === 'true' || refresh === '1';
  const scoreTracker = createScoreTracker();

  if (!targetUrl) {
    sendSSE(res, { status: 'error', globalError: 'Missing URL parameter' });
    res.raw.end();
    return;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    sendSSE(res, { status: 'error', globalError: 'Invalid URL format' });
    res.raw.end();
    return;
  }

  // Only allow http: and https: — block file://, data:, ftp://, etc.
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    sendSSE(res, {
      status: 'error',
      globalError: 'Only http and https URLs are allowed',
    });
    res.raw.end();
    return;
  }

  // Block private / loopback / link-local addresses (SSRF prevention)
  if (!(await isPublicHttpUrl(parsedUrl.href))) {
    sendSSE(res, {
      status: 'error',
      globalError: 'URL resolves to a private or reserved address',
    });
    res.raw.end();
    return;
  }

  if (!isRefreshRequested) {
    const cachedAudit = await getCachedAudit(parsedUrl.href);
    if (cachedAudit) {
      sendSSE(res, { cachedAt: cachedAudit.cachedAt });
      for (const event of cachedAudit.events) {
        sendSSE(res, scoreTracker.track(event));
      }
      res.raw.end();
      return;
    }
  }

  let aborted = false;

  req.raw.on('close', () => {
    logger.info('Client connection closed');
    aborted = true;
  });

  try {
    const { events } = await runSingleAudit(targetUrl, (event) => {
      const trackedEvent = scoreTracker.track(event);
      if (!aborted) sendSSE(res, trackedEvent);
    });

    await setCachedAudit(parsedUrl.href, events);

    try {
      const domain = parsedUrl.hostname;
      const finalScore = scoreTracker.getScorePercent();

      const audit = new AuditModel({ domain, score: finalScore });
      await audit.save();
      logger.info(
        `Audit saved for domain: ${domain} with score: ${finalScore}`
      );
    } catch (dbError) {
      logger.error('Failed to save audit to database:', dbError);
    }

    res.raw.end();
  } catch (error) {
    logger.error('Audit GET error:', error);
    if (!aborted) {
      sendSSE(res, {
        globalError:
          error instanceof Error ? error.message : 'Internal server error',
      });
      res.raw.end();
    }
  }
};
