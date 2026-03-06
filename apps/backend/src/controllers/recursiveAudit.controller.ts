import {
  getAuditJobStatus,
  startRecursiveAuditJob,
} from '@services/audit/recursiveAudit.service';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type StartRecursiveAuditResult = {
  jobId: string;
};

export type RecursiveAuditJobInfo = {
  _id: string;
  targetUrl: string;
  userId?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
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
};

export type GetRecursiveAuditStatusResult = {
  job: RecursiveAuditJobInfo;
  pages: RecursiveAuditPageInfo[];
};

export const startRecursiveAudit = async (
  request: FastifyRequest<{ Querystring: { url: string } }>,
  reply: FastifyReply
) => {
  const { url } = request.query;
  const userId = request.headers['x-user-id'] as string;

  if (!url || typeof url !== 'string') {
    return reply.status(400).send({ error: 'URL is required' });
  }

  try {
    const jobId = await startRecursiveAuditJob(url, userId);
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
