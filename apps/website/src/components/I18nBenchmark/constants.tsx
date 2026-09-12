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
export type FrameworkKey =
  | 'nextjs'
  | 'tanstack'
  | 'vite-vue'
  | 'vite-solid'
  | 'vite-svelte';

export type StaticImport = { src: string; height: number; width: number };

export type MetricData = { avg: number; min: number; max: number };

export type MetricDef = {
  id: string;
  label: string;
  extract: (categoryData: any, libraryData: any) => MetricData | null;
  unit: string;
  transform: (value: number) => number;
  whatIsIt: string;
  whyItsImportant: string;
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
  logoId?: string;
  name: string;
  version: string | null;
};

export const isIntlayerLib = (id: string): boolean =>
  id.includes('intlayer') || id.startsWith('@intlayer/');

export const getLibColors = (isDarkMode: boolean): Record<string, string> => {
  const intlayerColor = isDarkMode ? '#c4c4c4ff' : '#1e1e1eff';

  const baseColors: Record<string, string> = {
    intlayer: intlayerColor,
    'react-intlayer': intlayerColor,
    'vue-intlayer': intlayerColor,
    'svelte-intlayer': intlayerColor,
    'solid-intlayer': intlayerColor,
    'next-intlayer': intlayerColor,
    'intlayer-compat-use-intl': intlayerColor,
    'intlayer-compat-lingui': intlayerColor,
    'intlayer-compat-i18next': intlayerColor,
    'intlayer-compat-next-i18next': intlayerColor,
    'intlayer-compat-next-intl': intlayerColor,
    'intlayer-compat-react-i18next': intlayerColor,
    'intlayer-compat-react-intl': intlayerColor,
    'intlayer-compat-vue-i18n': intlayerColor,
    '@intlayer/use-intl': intlayerColor,
    '@intlayer/lingui': intlayerColor,
    '@intlayer/i18next': intlayerColor,
    '@intlayer/next-i18next': intlayerColor,
    '@intlayer/next-intl': intlayerColor,
    '@intlayer/react-i18next': intlayerColor,
    '@intlayer/react-intl': intlayerColor,
    '@intlayer/vue-i18n': intlayerColor,
    'next-intl': '#64b5dc',
    'use-intl': '#64b5dc',
    'next-i18next': '#0b786e',
    'react-i18next': '#0b786e',
    i18next: '#0b786e',
    'vite-solid-i18next': '#0b786e',
    lingui: '#d8403e',
    'gt-next': '#73807cff',
    'gt-react': '#73807cff',
    tolgee: '#ec407a',
    'paraglide-next': '#d09028',
    paraglide: '#d09028',
    'lingo.dev-app-nextjs': '#6ae301',
    'lingo.dev': '#6ae301',
    'react-intl': '#8b5cf6',
    wuchale: '#80dcd1',
    'next-translate': '#752424',
    'next-international': '#5b5b5b',
    'vue-i18n': '#41b883',
    'vite-vue-i18n': '#41b883',
    'svelte-i18n': '#ff3e00',
    'vite-svelte-i18n': '#ff3e00',
    'fluent-vue': '#41b883',
    '@solid-primitives/i18n': '#2c4f7c',
    'primitives-i18n': '#2c4f7c',
    'paraglide-js': '#d09028',
    'base-app-nextjs': '#334155',
    'base-app-tanstack': '#334155',
    'base-app-vite-react': '#334155',
    'base-app-vite-vue': '#334155',
    'base-app-vite-solid': '#334155',
    'base-app-vite-svelte': '#334155',
    base: '#334155',
  };

  return new Proxy(baseColors, {
    get: (target, prop) => {
      if (typeof prop === 'string') {
        if (prop in target) return target[prop];
        if (isIntlayerLib(prop)) return intlayerColor;
      }
      return target[prop as string];
    },
  });
};

export const LIB_LOGOS: Record<string, StaticImport | string | null> = {
  intlayer: null,
  'react-intlayer': null,
  'vue-intlayer': null,
  'svelte-intlayer': null,
  'solid-intlayer': null,
  'next-intlayer': null,
  'intlayer-compat-i18next': null,
  'intlayer-compat-lingui': null,
  'intlayer-compat-next-i18next': null,
  'intlayer-compat-next-intl': null,
  'intlayer-compat-react-i18next': null,
  'intlayer-compat-react-intl': null,
  'intlayer-compat-use-intl': null,
  'intlayer-compat-vue-i18n': null,
  '@intlayer/i18next': null,
  '@intlayer/lingui': null,
  '@intlayer/next-i18next': null,
  '@intlayer/next-intl': null,
  '@intlayer/react-i18next': null,
  '@intlayer/react-intl': null,
  '@intlayer/use-intl': null,
  '@intlayer/vue-i18n': null,
  'next-intl': NextIntlLogo as unknown as StaticImport,
  'use-intl': NextIntlLogo as unknown as StaticImport,
  lingui: LinguiLogo as unknown as StaticImport,
  'next-i18next': I18nextLogo as unknown as StaticImport,
  'react-i18next': I18nextLogo as unknown as StaticImport,
  i18next: I18nextLogo as unknown as StaticImport,
  'vite-solid-i18next': I18nextLogo as unknown as StaticImport,
  'gt-next': GTLogo as unknown as StaticImport,
  'gt-react': GTLogo as unknown as StaticImport,
  tolgee: TolgeeLogo as unknown as StaticImport,
  'paraglide-next': ParaglideLogo as unknown as StaticImport,
  paraglide: ParaglideLogo as unknown as StaticImport,
  'lingo.dev-app-nextjs': LingoDevLogo as unknown as StaticImport,
  'lingo.dev': LingoDevLogo as unknown as StaticImport,
  'react-intl': FormatJSLogo as unknown as StaticImport,
  'next-translate': NextTranslateLogo as unknown as StaticImport,
  'next-international': NextInternationalLogo as unknown as StaticImport,
  wuchale: WuchaleLogo as unknown as StaticImport,
  'vue-i18n': VueI18nLogo as unknown as StaticImport,
  'vite-vue-i18n': VueI18nLogo as unknown as StaticImport,
  'svelte-i18n': SvelteI18nLogo as unknown as StaticImport,
  'vite-svelte-i18n': SvelteI18nLogo as unknown as StaticImport,
  'fluent-vue': FluentVueLogo as unknown as StaticImport,
  '@solid-primitives/i18n': SolidPrimitivesI18nLogo as unknown as StaticImport,
  'primitives-i18n': SolidPrimitivesI18nLogo as unknown as StaticImport,
  'paraglide-js': ParaglideJSLogo as unknown as StaticImport,
};
