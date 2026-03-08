import { logger } from '@logger';
import {
  deleteShowcaseScreenshot,
  uploadShowcaseScreenshot,
} from '@services/showcase/showcaseUploadScreenshot.service';
import { launchBrowser } from '@utils/puppeteer/launchBrowser';

const PRIVATE_HOSTNAMES =
  /^(localhost|127\.\d+\.\d+\.\d+|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|::1)$/i;

/**
 * Returns true if the URL is a publicly reachable domain suitable for screenshotting.
 */
const isPublicUrl = (url: string): boolean => {
  try {
    const { hostname, protocol } = new URL(url);
    if (protocol !== 'http:' && protocol !== 'https:') return false;
    if (PRIVATE_HOSTNAMES.test(hostname)) return false;
    // Must contain at least one dot (e.g. "example.com") and no bare hostnames
    if (!hostname.includes('.')) return false;
    return true;
  } catch {
    return false;
  }
};

/**
 * Takes a screenshot of the given URL and uploads it to R2.
 * Returns the public image URL, or null on failure.
 */
export const takeAndUploadProjectScreenshot = async (
  applicationUrl: string,
  projectId: string
): Promise<string | null> => {
  const browser = await launchBrowser({ pipe: false, dumpio: false });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(applicationUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });
    await page.waitForSelector('body', { timeout: 10000 });
    await page
      .waitForNetworkIdle({ idleTime: 1000, timeout: 10000 })
      .catch(() => {});

    const screenshotBuffer = (await page.screenshot({
      type: 'jpeg',
      quality: 30,
    })) as Buffer;

    await page.close();

    return await uploadShowcaseScreenshot(
      screenshotBuffer,
      applicationUrl,
      projectId
    );
  } catch (err) {
    logger.error(
      `[projectScreenshot] Failed to screenshot ${applicationUrl}: ${err}`
    );
    return null;
  } finally {
    await browser.close();
  }
};

/**
 * Refreshes the screenshot for a project's applicationURL if it changed.
 * Returns the new imageUrl, or the existing one if unchanged / no URL.
 */
export const refreshProjectScreenshotIfChanged = async ({
  newApplicationUrl,
  previousApplicationUrl,
  existingImageUrl,
  projectId,
}: {
  newApplicationUrl?: string;
  previousApplicationUrl?: string;
  existingImageUrl?: string;
  projectId: string;
}): Promise<string | undefined> => {
  if (!newApplicationUrl) return existingImageUrl;
  if (newApplicationUrl === previousApplicationUrl) return existingImageUrl;
  if (!isPublicUrl(newApplicationUrl)) return existingImageUrl;

  const imageUrl = await takeAndUploadProjectScreenshot(
    newApplicationUrl,
    projectId
  );

  // If the URL changed and there was an old screenshot for a different URL, clean it up
  if (
    existingImageUrl &&
    previousApplicationUrl &&
    newApplicationUrl !== previousApplicationUrl
  ) {
    deleteShowcaseScreenshot(existingImageUrl).catch(() => {});
  }

  return imageUrl ?? existingImageUrl;
};
