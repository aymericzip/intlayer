import { logger } from '@logger';
import { AuditJobModel, AuditJobStatus } from '@models/auditJob.model';
import { AuditPageModel, AuditPageStatus } from '@models/auditPage.model';
import { load } from 'cheerio';
import { mutateScore, type Score } from './analysis/calculateScore';
import { runSingleAudit } from './seoAudit.service';

const SLEEP_TIME = 30000;
const MAX_PAGES = 10;

let isProcessing = false;

/**
 * Fetches sitemap.xml for the given URL and extracts all <loc> entries.
 * Falls back to [targetUrl] if no sitemap is found.
 */
export const discoverUrlsFromSitemap = async (
  targetUrl: string
): Promise<string[]> => {
  try {
    const { origin } = new URL(targetUrl);
    const sitemapUrl = `${origin}/sitemap.xml`;

    const response = await fetch(sitemapUrl, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)' },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return [targetUrl];

    const sitemapContent = await response.text();
    const $ = load(sitemapContent, { xmlMode: true });

    const urls: string[] = [];

    // Primary <loc> entries
    $('loc').each((_, el) => {
      const url = $(el).text().trim();
      if (url) urls.push(url);
    });

    // Alternate hreflang URLs from <xhtml:link rel="alternate" href="...">
    // Cheerio in xmlMode parses these as "xhtml:link" elements
    $('xhtml\\:link[rel="alternate"], link[rel="alternate"]').each((_, el) => {
      const href = $(el).attr('href')?.trim();
      if (href && href !== 'x-default') urls.push(href);
    });

    const uniqueUrls = [...new Set(urls)];
    return uniqueUrls.length > 0 ? uniqueUrls : [targetUrl];
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
    targetUrl,
    status: { $in: [AuditJobStatus.PENDING, AuditJobStatus.RUNNING] },
  });

  if (existingJob) {
    return (existingJob._id as any).toString();
  }

  const pageUrls =
    urls && urls.length > 0
      ? [...new Set(urls)].slice(0, MAX_PAGES)
      : [targetUrl];

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

      try {
        const { events } = await runSingleAudit(pendingPage.url, () => {});

        // Compute score the same way the single-page SSE controller does
        let score: Score = { score: 0, totalScore: 0 };
        for (const event of events) {
          score = mutateScore(score, event);
        }

        pendingPage.status = AuditPageStatus.COMPLETED;
        pendingPage.results = events;
        pendingPage.score = Math.round(
          score.totalScore > 0 ? (score.score / score.totalScore) * 100 : 0
        );
        await pendingPage.save();

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
    'url status score error results'
  );

  return { job, pages };
};
