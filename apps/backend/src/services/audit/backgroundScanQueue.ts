import { logger } from '@logger';
import { getCachedAudit, setCachedAudit } from './auditCache.service';
import { getAuditScorePercent } from './auditScore';
import { getHostFromUrl, saveAuditHostScan } from './scannedHost.service';
import { runSingleAudit } from './seoAudit.service';

/**
 * Pending audits beyond this are dropped: each one launches a headless
 * browser, so the queue must stay bounded under a burst of reports.
 */
const MAX_PENDING_SCANS = 100;

/** URLs waiting for (or running) an automatic audit, one per host. */
const pendingUrlByHost = new Map<string, string>();
let isProcessing = false;

/** Audit one URL and record it on its host, reusing a cached result. */
const runBackgroundScan = async (url: string): Promise<void> => {
  const cachedAudit = await getCachedAudit(url);
  // A cached audit was already recorded when it ran.
  if (cachedAudit) return;

  const { events } = await runSingleAudit(url, () => {});
  await setCachedAudit(url, events);
  await saveAuditHostScan(
    url,
    events,
    getAuditScorePercent(events),
    'background'
  );
};

/** Run the pending audits one at a time (one headless browser at once). */
const processQueue = async (): Promise<void> => {
  if (isProcessing) return;
  isProcessing = true;

  try {
    // Hosts stay in the map while audited, so a new report cannot requeue them.
    for (
      let nextEntry = pendingUrlByHost.entries().next();
      !nextEntry.done;
      nextEntry = pendingUrlByHost.entries().next()
    ) {
      const [host, url] = nextEntry.value;
      try {
        await runBackgroundScan(url);
        logger.info(`[backgroundScan] audited ${url}`);
      } catch (error) {
        logger.warn(`[backgroundScan] audit of ${url} failed: ${error}`);
      } finally {
        pendingUrlByHost.delete(host);
      }
    }
  } finally {
    isProcessing = false;
  }
};

/**
 * Queue an automatic backend audit of a page, to complete what a client
 * reported (score, routing, sitemap…). One pending audit per host; the queue
 * runs in the background, never blocking the caller.
 *
 * @returns Whether the audit was queued.
 */
export const enqueueBackgroundScan = (url: string): boolean => {
  const host = getHostFromUrl(url);
  if (pendingUrlByHost.has(host)) return false;
  if (pendingUrlByHost.size >= MAX_PENDING_SCANS) return false;

  pendingUrlByHost.set(host, url);
  void processQueue();

  return true;
};
