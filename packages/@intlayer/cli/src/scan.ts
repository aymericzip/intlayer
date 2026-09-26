import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import {
  type DetectedTechnology,
  formatSize,
  getCheckDetailLines,
  type ScanEvent,
  type ScanResult,
  scanWebsite,
} from '@intlayer/engine/scan';
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
  robots_noLocalizedUrlsForgotten: 'robots.txt keeps localized URLs crawlable',
  sitemap_sitemapPresent: 'sitemap present',
  sitemap_noLocalizedUrlsForgotten: 'sitemap lists every locale',
  sitemap_hasAlternates: 'sitemap has alternate links',
  sitemap_hasXDefault: 'sitemap has x-default',
  url_htmlLang: 'html lang attribute',
  url_htmlDir: 'html dir attribute',
  url_currentLocale: 'locale signals consistent (lang, URL, hreflang)',
  url_ogLocale: 'og:locale meta tag',
  url_hasCanonical: 'canonical link',
  url_hreflang: 'hreflang tags',
  url_hreflangReciprocal: 'hreflang alternates link back',
  url_hasXDefault: 'x-default hreflang',
  url_hasLocalizedLinks: 'localized internal links',
  url_allAnchorsLocalized: 'all internal links keep the locale',
  url_hasLangSelector: 'crawlable language switcher',
  url_unusedBundleContent: 'unused bundle locale content',
};

/** Human-readable labels of the routing strategies. */
const routingLabels: Record<ScanResult['routing']['strategy'], string> = {
  'prefix-all': 'locale prefix on every URL (/en/…, /fr/…)',
  'prefix-no-default': 'locale prefix except for the default locale',
  'search-params': 'locale in a query parameter',
  subdomain: 'locale subdomain (fr.example.com)',
  domain: 'one domain per locale',
  'no-prefix': 'no locale in the URL (cookie / header based)',
  unknown: 'unknown',
};

/** Human-readable labels of the technology categories. */
const categoryLabels: Record<DetectedTechnology['category'], string> = {
  framework: 'Framework',
  'i18n-library': 'i18n library',
  tms: 'TMS',
  'translation-proxy': 'Translation proxy',
  cms: 'CMS',
};

/** Maximum number of detail lines printed under a failing check. */
const MAX_DETAIL_LINES = 3;

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

/** Print a check with, when it fails, a short explanation. */
const logCheck = (
  appLogger: ReturnType<typeof getAppLogger>,
  event: ScanEvent
): void => {
  const type = event.type.split('\\')[0];
  if (!type) return;

  appLogger(`  ${statusIcon(event.status)} ${checkLabels[type] ?? type}`);

  if (event.status === 'success') return;

  const detailLines = getCheckDetailLines(event.details?.[event.status]);
  detailLines.slice(0, MAX_DETAIL_LINES).forEach((line, index) => {
    appLogger(
      colorize(`${index === 0 ? '      ' : '        '}${line}`, ANSIColors.GREY)
    );
  });
  if (detailLines.length > MAX_DETAIL_LINES) {
    appLogger(
      colorize(
        `      … ${detailLines.length - MAX_DETAIL_LINES} more (use --json)`,
        ANSIColors.GREY
      )
    );
  }
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

  const { routing } = result;
  appLogger(
    `Routing: ${colorize(routingLabels[routing.strategy], ANSIColors.BLUE)} ${colorize(
      `(${routing.evidence}${routing.defaultLocale ? `, default locale: ${routing.defaultLocale}` : ''})`,
      ANSIColors.GREY
    )}`
  );

  if (result.technologies.length > 0) {
    appLogger('\nStack:');
    for (const technology of result.technologies) {
      appLogger(
        `  ${colorize(categoryLabels[technology.category], ANSIColors.GREY)} ${technology.name}${
          technology.version ? ` ${technology.version}` : ''
        } ${colorize(`(${technology.evidence})`, ANSIColors.GREY)}`
      );
    }
  }

  appLogger('\nChecks:');
  for (const event of result.events) {
    logCheck(appLogger, event);
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
