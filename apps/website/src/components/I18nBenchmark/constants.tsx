import FluentVueLogo from './logo/fluent-vue.png';
import FormatJSLogo from './logo/format-js.svg';
import GTLogo from './logo/general-translation.svg';
import I18nextLogo from './logo/i18next.svg';
import LingoDevLogo from './logo/lingo.dev.png';
import LinguiLogo from './logo/lingui.svg';
import NextInternationalLogo from './logo/next-international.png';
import NextIntlLogo from './logo/next-intl.svg';
import NextTranslateLogo from './logo/next-translate.svg';
import ParaglideLogo from './logo/paraglide.svg';
import ParaglideJSLogo from './logo/paragrlidejs.png';
import SolidPrimitivesI18nLogo from './logo/solid-primitive.png';
import SvelteI18nLogo from './logo/svelte-i18n.png';
import TolgeeLogo from './logo/tolgee.svg';
import VueI18nLogo from './logo/vue-i18n.png';
import WuchaleLogo from './logo/wuchale.png';
/** Frameworks covered by the benchmark reports. */
export type FrameworkKey =
  | 'nextjs'
  | 'tanstack'
  | 'vite-vue'
  | 'vite-solid'
  | 'vite-svelte';

/** Loading strategy an app was built with (one summary file per category). */
export type BenchmarkCategory =
  | 'static'
  | 'dynamic'
  | 'scoped-static'
  | 'scoped-dynamic';

/** Average of a measurement with the range observed across runs. */
export type MetricData = { avg: number; min: number; max: number };

/**
 * One measured area of a report (`pageBundle`, `components`, `reactivity`,
 * `rendering`). Fields vary per section, so values are read defensively.
 */
export type BenchmarkSection = {
  status?: string;
  byLocale?: Record<string, Record<string, unknown>>;
  [field: string]: unknown;
};

export type CategoryBenchmark = {
  isFallback?: boolean;
  pageBundle?: BenchmarkSection;
  components?: BenchmarkSection;
  reactivity?: BenchmarkSection;
  rendering?: BenchmarkSection;
};

export type LibraryBenchmark = {
  global?: {
    version?: string | null;
    libSize?: { status?: string; gzip?: number };
  };
} & Partial<Record<BenchmarkCategory, CategoryBenchmark | null>>;

/** Shape of `summarize-<framework>-<category>.json` from benchmark-i18n. */
export type BenchmarkSummary = {
  meta?: { framework?: string; generatedAt?: string };
  libs: Record<string, LibraryBenchmark>;
};

export type ChartItem = {
  label: string;
  libId: string;
  value: number;
  min: number;
  max: number;
  color: string;
  version: string | null;
};

export type LibInfo = {
  id: string;
  name: string;
  version: string | null;
};

export const isIntlayerLib = (id: string): boolean =>
  id.includes('intlayer') || id.startsWith('@intlayer/');

const DEFAULT_LIB_COLOR = '#94a3b8';

const LIB_COLORS: Record<string, string> = {
  'next-intl': '#64b5dc',
  'use-intl': '#64b5dc',
  'next-i18next': '#0b786e',
  'react-i18next': '#0b786e',
  i18next: '#0b786e',
  lingui: '#d8403e',
  'gt-next': '#73807c',
  'gt-react': '#73807c',
  tolgee: '#ec407a',
  'paraglide-next': '#d09028',
  paraglide: '#d09028',
  'paraglide-js': '#d09028',
  'lingo.dev': '#6ae301',
  'react-intl': '#8b5cf6',
  wuchale: '#80dcd1',
  'next-translate': '#752424',
  'next-international': '#5b5b5b',
  'vue-i18n': '#41b883',
  'fluent-vue': '#41b883',
  'svelte-i18n': '#ff3e00',
  'primitives-i18n': '#2c4f7c',
  base: '#334155',
};

/** Bar/legend color of a library; every Intlayer package shares one color. */
export const getLibColor = (libId: string, isDarkMode: boolean): string => {
  if (isIntlayerLib(libId)) return isDarkMode ? '#c4c4c4' : '#1e1e1e';

  return LIB_COLORS[libId] ?? DEFAULT_LIB_COLOR;
};

/** Logo URL per library id; Intlayer packages resolve to the site logo. */
const LIB_LOGOS: Record<string, string> = {
  'next-intl': NextIntlLogo,
  'use-intl': NextIntlLogo,
  lingui: LinguiLogo,
  'next-i18next': I18nextLogo,
  'react-i18next': I18nextLogo,
  i18next: I18nextLogo,
  'gt-next': GTLogo,
  'gt-react': GTLogo,
  tolgee: TolgeeLogo,
  'paraglide-next': ParaglideLogo,
  paraglide: ParaglideLogo,
  'paraglide-js': ParaglideJSLogo,
  'lingo.dev': LingoDevLogo,
  'react-intl': FormatJSLogo,
  'next-translate': NextTranslateLogo,
  'next-international': NextInternationalLogo,
  wuchale: WuchaleLogo,
  'vue-i18n': VueI18nLogo,
  'svelte-i18n': SvelteI18nLogo,
  'fluent-vue': FluentVueLogo,
  'primitives-i18n': SolidPrimitivesI18nLogo,
};

const INTLAYER_LOGO_URL = '/logo.svg';

export const getLibLogoUrl = (libId: string): string | undefined =>
  isIntlayerLib(libId) ? INTLAYER_LOGO_URL : LIB_LOGOS[libId];

/** Every distinct logo URL, used to preload the chart images. */
export const LOGO_URLS: string[] = [
  ...new Set([INTLAYER_LOGO_URL, ...Object.values(LIB_LOGOS)]),
];
