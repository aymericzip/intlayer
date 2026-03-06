import { logger } from '@logger';
import { AuditModel } from '@models/audit.model';
import {
  mutateScore,
  type Score,
} from '@services/audit/analysis/calculateScore';
import { runSingleAudit } from '@services/audit/seoAudit.service';
import type { AuditEvent } from '@services/audit/types';
import type { FastifyReply, FastifyRequest } from 'fastify';

const sendSSE = (res: FastifyReply, data: AuditEvent) => {
  logger.info(JSON.stringify(data, null, 2));
  res.raw.write(`data: ${JSON.stringify(data)}\n\n`);
};

/**
 * GET /api/scan?url=<targetUrl>
 * Streams audit results as Server-Sent Events.
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

  const { url: targetUrl } = req.query as { url?: string };

  let score: Score = { score: 0, totalScore: 0 };
  let currentProgress = 0;

  if (!targetUrl) {
    sendSSE(res, { status: 'error', globalError: 'Missing URL parameter' });
    res.raw.end();
    return;
  }

  try {
    new URL(targetUrl);
  } catch {
    sendSSE(res, { status: 'error', globalError: 'Invalid URL format' });
    res.raw.end();
    return;
  }

  let aborted = false;

  req.raw.on('close', () => {
    logger.info('Client connection closed');
    aborted = true;
  });

  try {
    await runSingleAudit(targetUrl, (event) => {
      score = mutateScore(score, event);

      if (event.progress !== undefined) {
        currentProgress = event.progress;
      }

      if (!aborted) {
        logger.info(`Processing event: ${event.type || 'no-type'}`, {
          status: event.status,
          progress: event.progress,
        });

        sendSSE(res, {
          ...event,
          progress: currentProgress,
          score: Math.round(
            score.totalScore > 0 ? (score.score / score.totalScore) * 100 : 0
          ),
        });
      }
    });

    try {
      const url = new URL(targetUrl);
      const domain = url.hostname;
      const finalScore = Math.round(
        score.totalScore > 0 ? (score.score / score.totalScore) * 100 : 0
      );

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
