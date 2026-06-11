import {
  formatSize,
  type ScanEvent,
  scanWebsite,
} from '@intlayer/chokidar/scan';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { ConfigurationOptions } from './cli';

/** Options accepted by the {@link scan} command. */
export type ScanCommandOptions = {
  /** Disable the deeper puppeteer-based render scan. */
  deep?: boolean;
  /** Output the raw {@link ScanResult} as JSON instead of formatted text. */
  json?: boolean;
  configOptions?: ConfigurationOptions;
};

/** Human-readable labels for each scorable check type. */
const checkLabels: Record<string, string> = {
  robots_robotsPresent: 'robots.txt present',
  robots_noLocalizedUrlsForgotten: 'robots.txt keeps locale paths crawlable',
  sitemap_sitemapPresent: 'sitemap.xml present',
  sitemap_noLocalizedUrlsForgotten: 'sitemap lists every locale',
  sitemap_hasAlternates: 'sitemap has alternate links',
  sitemap_hasXDefault: 'sitemap has x-default',
  url_htmlLang: 'html lang attribute',
  url_htmlDir: 'html dir attribute',
  url_hasCanonical: 'canonical link',
  url_hreflang: 'hreflang tags',
  url_hasLocalizedLinks: 'localized internal links',
  url_hasXDefault: 'x-default hreflang',
  url_allAnchorsLocalized: 'all internal links localized',
  url_currentLocale: 'current locale detected',
  url_unusedBundleContent: 'unused bundle locale content',
};

const statusIcon = (status: ScanEvent['status']): string => {
  if (status === 'success') return colorize('✓', ANSIColors.GREEN);
  if (status === 'warning') return colorize('⚠', ANSIColors.YELLOW);
  return colorize('✗', ANSIColors.RED);
};

const scoreColor = (score: number) => {
  if (score >= 80) return ANSIColors.GREEN;
  if (score >= 50) return ANSIColors.YELLOW;
  return ANSIColors.RED;
};

/**
 * Scan a website for i18n/SEO health and bundle weight, printing a formatted
 * report (or JSON with `--json`).
 *
 * @example
 * ```sh
 * npx intlayer scan https://intlayer.org
 * ```
 */
export const scan = async (
  url: string,
  options: ScanCommandOptions = {}
): Promise<void> => {
  const configuration = getConfiguration(options.configOptions);
  const appLogger = getAppLogger(configuration);

  const result = await scanWebsite(url, { deep: options.deep });

  if (options.json) {
    appLogger(JSON.stringify(result, null, 2));
    return;
  }

  appLogger(
    `\n🔍 Scanned ${colorize(result.url, ANSIColors.GREY_LIGHT)} ${colorize(
      `(${result.mode} mode)`,
      ANSIColors.GREY
    )}\n`
  );

  appLogger(
    `Score: ${colorize(`${result.score}/100`, scoreColor(result.score))}`
  );
  appLogger(
    `Page size: ${colorize(formatSize(result.totalPageSize), ANSIColors.BLUE)} ${colorize(
      `(HTML ${formatSize(result.htmlSize)})`,
      ANSIColors.GREY
    )}`
  );
  if (result.locales.length > 0) {
    appLogger(
      `Locales: ${colorize(result.locales.join(', '), ANSIColors.GREEN)}`
    );
  }

  appLogger('\nChecks:');
  for (const event of result.events) {
    const type = event.type.split('\\')[0];

    if (!type) continue;

    const label = checkLabels[type] ?? type;
    appLogger(`  ${statusIcon(event.status)} ${label}`);
  }

  if (result.bundle && result.bundle.totalLocaleSize > 0) {
    const { bundle } = result;
    appLogger('\nBundle locale weight:');
    appLogger(
      `  Translations shipped: ${colorize(formatSize(bundle.totalLocaleSize), ANSIColors.BLUE)}`
    );
    appLogger(
      `  Unused (other locales): ${colorize(
        `${formatSize(bundle.totalUnusedLocaleSize)} (${bundle.unusedPercentOfLocale}%)`,
        bundle.unusedPercentOfLocale > 30
          ? ANSIColors.RED
          : bundle.unusedPercentOfLocale > 0
            ? ANSIColors.YELLOW
            : ANSIColors.GREEN
      )}`
    );
  }
};
