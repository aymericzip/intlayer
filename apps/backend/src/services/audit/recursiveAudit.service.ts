import { discoverSitemapUrls } from '@intlayer/engine/scan';
import { logger } from '@logger';
import { AuditJobModel, AuditJobStatus } from '@schemas/auditJob.schema';
import { AuditPageModel, AuditPageStatus } from '@schemas/auditPage.schema';
import { isPublicHttpUrl } from '@utils/isPublicUrl';
import { getCachedAudit, setCachedAudit } from './auditCache.service';
import { getAuditScorePercent } from './auditScore';
import { saveAuditHostScan } from './scannedHost.service';
import { runSingleAudit } from './seoAudit.service';

const SLEEP_TIME = 30000;
const MAX_PAGES = 10;

let isProcessing = false;

/** Keep the public URLs, resolving each origin only once. */
const filterPublicUrls = async (urls: string[]): Promise<string[]> => {
  const publicOrigins = new Map<string, boolean>();
  const publicUrls: string[] = [];
  for (const url of urls) {
    let origin: string;
    try {
      origin = new URL(url).origin;
    } catch {
      continue;
    }
    if (!publicOrigins.has(origin)) {
      publicOrigins.set(origin, await isPublicHttpUrl(origin));
    }
    if (publicOrigins.get(origin)) publicUrls.push(url);
  }
  return publicUrls;
};

/**
 * Lists the page URLs of a site from its sitemaps (robots.txt `Sitemap:`
 * directives or default locations, sitemap indexes included), keeping only
 * public URLs. Falls back to `[targetUrl]` when no sitemap is found.
 */
export const discoverUrlsFromSitemap = async (
  targetUrl: string
): Promise<string[]> => {
  try {
    const urls = await discoverSitemapUrls(targetUrl, {
      userAgent: 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)',
      timeoutMs: 10_000,
      shouldFetchUrl: isPublicHttpUrl,
    });
    const publicUrls = await filterPublicUrls(urls);
    return publicUrls.length > 0 ? publicUrls : [targetUrl];
  } catch {
    return [targetUrl];
  }
};

export const startRecursiveAuditJob = async (
  targetUrl: string,
  userId?: string,
  urls?: string[]
): Promise<string> => {
  const existingJob = await AuditJobModel.findOne({
    targetUrl: String(targetUrl),
    status: { $in: [AuditJobStatus.PENDING, AuditJobStatus.RUNNING] },
  });

  if (existingJob) {
    return (existingJob._id as any).toString();
  }

  const candidateUrls =
    urls && urls.length > 0
      ? [...new Set(urls)].slice(0, MAX_PAGES)
      : [targetUrl];
  const pageUrls = await filterPublicUrls(candidateUrls);

  const job = await AuditJobModel.create({
    targetUrl,
    userId,
    status: AuditJobStatus.PENDING,
    totalPageCount: pageUrls.length,
  });

  for (const url of pageUrls) {
    await AuditPageModel.create({
      jobId: job._id,
      url,
      status: AuditPageStatus.PENDING,
    }).catch(() => {
      /* ignore duplicate key errors */
    });
  }

  processAuditJobs().catch((err) => logger.error(err));

  return (job._id as any).toString();
};

export const cancelAuditJob = async (jobId: string): Promise<boolean> => {
  const result = await AuditJobModel.findByIdAndUpdate(jobId, {
    status: AuditJobStatus.CANCELLED,
  });
  return !!result;
};

export const pauseAuditJob = async (jobId: string): Promise<boolean> => {
  const result = await AuditJobModel.findByIdAndUpdate(jobId, {
    status: AuditJobStatus.PAUSED,
  });
  return !!result;
};

export const resumeAuditJob = async (jobId: string): Promise<boolean> => {
  const result = await AuditJobModel.findByIdAndUpdate(jobId, {
    status: AuditJobStatus.RUNNING,
  });
  if (!result) return false;
  processAuditJobs().catch((err) => logger.error(err));
  return true;
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

      // Re-fetch to detect external cancellation / pause between pages
      const freshJob = await AuditJobModel.findById(job._id);
      if (
        !freshJob ||
        freshJob.status === AuditJobStatus.CANCELLED ||
        freshJob.status === AuditJobStatus.PAUSED
      ) {
        logger.info(
          `Job ${job._id} is ${freshJob?.status ?? 'missing'} — stopping processor`
        );
        break;
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
        break;
      }

      pendingPage.status = AuditPageStatus.RUNNING;
      await pendingPage.save();

      let isPageFromCache = false;

      try {
        // Reuse a page audited less than an hour ago (single scan or job).
        const cachedAudit = await getCachedAudit(pendingPage.url);
        const events =
          cachedAudit?.events ??
          (await runSingleAudit(pendingPage.url, () => {})).events;
        if (!cachedAudit) await setCachedAudit(pendingPage.url, events);
        isPageFromCache = Boolean(cachedAudit);

        pendingPage.status = AuditPageStatus.COMPLETED;
        pendingPage.results = events;
        pendingPage.score = getAuditScorePercent(events);
        await pendingPage.save();

        if (!isPageFromCache) {
          await saveAuditHostScan(
            pendingPage.url,
            events,
            pendingPage.score,
            'recursive'
          );
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

      // Throttle real audits only: cached pages cost no browser run.
      if (!isPageFromCache) {
        await new Promise((resolve) => setTimeout(resolve, SLEEP_TIME));
      }
    }
  } finally {
    isProcessing = false;
  }
};

export const getAuditJobStatus = async (jobId: string) => {
  const job = await AuditJobModel.findById(jobId);
  if (!job) return null;

  const pages = await AuditPageModel.find({ jobId }).select(
    'url status score error results'
  );

  return { job, pages };
};
