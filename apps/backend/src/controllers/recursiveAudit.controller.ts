import {
  cancelAuditJob,
  discoverUrlsFromSitemap,
  getAuditJobStatus,
  pauseAuditJob,
  resumeAuditJob,
  startRecursiveAuditJob,
} from '@services/audit/recursiveAudit.service';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type StartRecursiveAuditResult = {
  jobId: string;
};

export type DiscoverUrlsResult = {
  urls: string[];
};

export type RecursiveAuditJobInfo = {
  _id: string;
  targetUrl: string;
  userId?: string;
  status:
    | 'pending'
    | 'running'
    | 'paused'
    | 'cancelled'
    | 'completed'
    | 'failed';
  progress: number;
  totalPageCount: number;
  completedPageCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type RecursiveAuditPageInfo = {
  _id: string;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  score?: number;
  error?: string;
  results?: any[];
};

export type GetRecursiveAuditStatusResult = {
  job: RecursiveAuditJobInfo;
  pages: RecursiveAuditPageInfo[];
};

export const discoverUrls = async (
  request: FastifyRequest<{ Querystring: { url: string } }>,
  reply: FastifyReply
) => {
  const { url } = request.query;

  if (!url || typeof url !== 'string') {
    return reply.status(400).send({ error: 'URL is required' });
  }

  try {
    new URL(url);
  } catch {
    return reply.status(400).send({ error: 'Invalid URL format' });
  }

  try {
    const urls = await discoverUrlsFromSitemap(url);
    return reply.send({ urls });
  } catch (err) {
    return reply.status(500).send({ error: String(err) });
  }
};

export const startRecursiveAudit = async (
  request: FastifyRequest<{
    Querystring: { url: string };
    Body: { urls?: string[] };
  }>,
  reply: FastifyReply
) => {
  const { url } = request.query;
  const { urls } = request.body ?? {};
  const userId = request.headers['x-user-id'] as string;

  if (!url || typeof url !== 'string') {
    return reply.status(400).send({ error: 'URL is required' });
  }

  try {
    const jobId = await startRecursiveAuditJob(url, userId, urls);
    return reply.send({ jobId });
  } catch (err) {
    return reply.status(500).send({ error: String(err) });
  }
};

export const getRecursiveAuditStatus = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
) => {
  const { jobId } = request.params;

  if (!jobId) {
    return reply.status(400).send({ error: 'jobId is required' });
  }

  try {
    const status = await getAuditJobStatus(jobId);
    if (!status) {
      return reply.status(404).send({ error: 'Job not found' });
    }
    return reply.send(status);
  } catch (err) {
    return reply.status(500).send({ error: String(err) });
  }
};

export const cancelRecursiveAudit = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
) => {
  const { jobId } = request.params;

  if (!jobId) {
    return reply.status(400).send({ error: 'jobId is required' });
  }

  try {
    const success = await cancelAuditJob(jobId);
    if (!success) {
      return reply.status(404).send({ error: 'Job not found' });
    }
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: String(err) });
  }
};

export const pauseRecursiveAudit = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
) => {
  const { jobId } = request.params;

  if (!jobId) {
    return reply.status(400).send({ error: 'jobId is required' });
  }

  try {
    const success = await pauseAuditJob(jobId);
    if (!success) {
      return reply.status(404).send({ error: 'Job not found' });
    }
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: String(err) });
  }
};

export const resumeRecursiveAudit = async (
  request: FastifyRequest<{ Params: { jobId: string } }>,
  reply: FastifyReply
) => {
  const { jobId } = request.params;

  if (!jobId) {
    return reply.status(400).send({ error: 'jobId is required' });
  }

  try {
    const success = await resumeAuditJob(jobId);
    if (!success) {
      return reply.status(404).send({ error: 'Job not found' });
    }
    return reply.send({ success: true });
  } catch (err) {
    return reply.status(500).send({ error: String(err) });
  }
};
