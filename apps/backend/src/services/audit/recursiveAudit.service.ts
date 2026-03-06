import { logger } from '@logger';
import { AuditJobModel, AuditJobStatus } from '@models/auditJob.model';
import { AuditPageModel, AuditPageStatus } from '@models/auditPage.model';
import { runSingleAudit } from './seoAudit.service';

const SLEEP_TIME = 30000;
const MAX_PAGES = 50;

let isProcessing = false;

export const startRecursiveAuditJob = async (
  targetUrl: string,
  userId?: string
): Promise<string> => {
  const existingJob = await AuditJobModel.findOne({
    targetUrl,
    status: { $in: [AuditJobStatus.PENDING, AuditJobStatus.RUNNING] },
  });

  if (existingJob) {
    return (existingJob._id as any).toString();
  }

  const job = await AuditJobModel.create({
    targetUrl,
    userId,
    status: AuditJobStatus.PENDING,
  });

  await AuditPageModel.create({
    jobId: job._id,
    url: targetUrl,
    status: AuditPageStatus.PENDING,
  });

  await AuditJobModel.findByIdAndUpdate(job._id, { totalPageCount: 1 });

  processAuditJobs().catch((err) => logger.error(err));

  return (job._id as any).toString();
};

export const processAuditJobs = async (): Promise<void> => {
  if (isProcessing) return;
  isProcessing = true;

  try {
    while (true) {
      const job = await AuditJobModel.findOne({
        status: { $in: [AuditJobStatus.PENDING, AuditJobStatus.RUNNING] },
      }).sort({ createdAt: 1 });

      if (!job) break;

      if (job.status === AuditJobStatus.PENDING) {
        job.status = AuditJobStatus.RUNNING;
        await job.save();
      }

      const pendingPage = await AuditPageModel.findOne({
        jobId: job._id,
        status: AuditPageStatus.PENDING,
      });

      if (!pendingPage) {
        const hasMorePages = await AuditPageModel.exists({
          jobId: job._id,
          status: { $in: [AuditPageStatus.PENDING, AuditPageStatus.RUNNING] },
        });

        if (!hasMorePages) {
          job.status = AuditJobStatus.COMPLETED;
          job.progress = 100;
          await job.save();
        }
        continue;
      }

      pendingPage.status = AuditPageStatus.RUNNING;
      await pendingPage.save();

      try {
        const { internalUrls, events } = await runSingleAudit(
          pendingPage.url,
          () => {}
        );

        pendingPage.status = AuditPageStatus.COMPLETED;
        pendingPage.results = events;
        const lastScoreEvent = [...events]
          .reverse()
          .find((e) => e.score !== undefined);
        pendingPage.score = lastScoreEvent?.score ?? 0;
        await pendingPage.save();

        const targetHostname = new URL(job.targetUrl).hostname;
        const currentPageCount = await AuditPageModel.countDocuments({
          jobId: job._id,
        });

        if (currentPageCount < MAX_PAGES) {
          for (const url of internalUrls) {
            try {
              if (new URL(url).hostname === targetHostname) {
                const count = await AuditPageModel.countDocuments({
                  jobId: job._id,
                });
                if (count >= MAX_PAGES) break;

                await AuditPageModel.create({
                  jobId: job._id,
                  url,
                  status: AuditPageStatus.PENDING,
                }).catch(() => {
                  /* ignore duplicate key errors */
                });
              }
            } catch {
              /* ignore invalid URLs */
            }
          }
        }

        const totalPages = await AuditPageModel.countDocuments({
          jobId: job._id,
        });
        const completedPages = await AuditPageModel.countDocuments({
          jobId: job._id,
          status: AuditPageStatus.COMPLETED,
        });

        job.totalPageCount = totalPages;
        job.completedPageCount = completedPages;
        job.progress = Math.round((completedPages / totalPages) * 100);
        await job.save();
      } catch (err) {
        logger.error(`Failed to audit page ${pendingPage.url}:`, err);
        pendingPage.status = AuditPageStatus.FAILED;
        pendingPage.error = String(err);
        await pendingPage.save();
      }

      await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
    }
  } finally {
    isProcessing = false;
  }
};

export const getAuditJobStatus = async (jobId: string) => {
  const job = await AuditJobModel.findById(jobId);
  if (!job) return null;

  const pages = await AuditPageModel.find({ jobId }).select(
    'url status score error'
  );

  return { job, pages };
};
