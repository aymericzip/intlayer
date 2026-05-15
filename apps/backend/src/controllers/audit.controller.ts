import { lookup as dnsLookup } from 'node:dns/promises';
import net from 'node:net';
import { logger } from '@logger';
import { AuditModel } from '@models/audit.model';
import {
  mutateScore,
  type Score,
} from '@services/audit/analysis/calculateScore';
import { runSingleAudit } from '@services/audit/seoAudit.service';
import type { AuditEvent } from '@services/audit/types';
import type { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Returns true if the given IP address is private, loopback, or link-local.
 * Covers IPv4 and IPv6.
 */
const isPrivateOrReservedIp = (ip: string): boolean => {
  if (net.isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    const [a, b] = parts;
    // Loopback: 127.0.0.0/8
    if (a === 127) return true;
    // Any address starting with 0
    if (a === 0) return true;
    // Private: 10.0.0.0/8
    if (a === 10) return true;
    // Private: 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) return true;
    // Private: 192.168.0.0/16
    if (a === 192 && b === 168) return true;
    // Link-local: 169.254.0.0/16
    if (a === 169 && b === 254) return true;
    return false;
  }

  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    // Loopback: ::1
    if (normalized === '::1') return true;
    // Link-local: fe80::/10
    if (
      normalized.startsWith('fe80:') ||
      normalized.startsWith('fe8') ||
      normalized.startsWith('fe9') ||
      normalized.startsWith('fea') ||
      normalized.startsWith('feb')
    )
      return true;
    // IPv4-mapped: ::ffff:x.x.x.x — check the embedded IPv4
    const ipv4MappedMatch = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (ipv4MappedMatch) return isPrivateOrReservedIp(ipv4MappedMatch[1]);
    return false;
  }

  // Unknown format — block it
  return true;
};

const sendSSE = (res: FastifyReply, data: AuditEvent) => {
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

  // Resolve the hostname and block private / loopback / link-local addresses (SSRF prevention)
  try {
    const { address } = await dnsLookup(parsedUrl.hostname);
    if (isPrivateOrReservedIp(address)) {
      sendSSE(res, {
        status: 'error',
        globalError: 'URL resolves to a private or reserved address',
      });
      res.raw.end();
      return;
    }
  } catch {
    sendSSE(res, {
      status: 'error',
      globalError: 'Could not resolve hostname',
    });
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
