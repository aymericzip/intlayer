import FormatJSLogo from './logo/format-js.svg';
import GTLogo from './logo/general-translation.svg';
import I18nextLogo from './logo/i18next.svg';
import LingoDevLogo from './logo/lingo.dev.png';
import LinguiLogo from './logo/lingui.svg';
import NextInternationalLogo from './logo/next-international.png';
import NextIntlLogo from './logo/next-intl.svg';
import NextTranslateLogo from './logo/next-translate.svg';
import ParaglideLogo from './logo/paraglide.svg';
import TolgeeLogo from './logo/tolgee.svg';
import WuchaleLogo from './logo/wuchale.png';
export type FrameworkKey = 'nextjs' | 'tanstack';

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

export type LibInfo = { id: string; name: string; version: string | null };

export const getLibColors = (isDarkMode: boolean): Record<string, string> => ({
  intlayer: isDarkMode ? '#c4c4c4ff' : '#1e1e1eff',
  'next-intlayer': isDarkMode ? '#c4c4c4ff' : '#1e1e1eff',
  'next-intl': '#64b5dc',
  'use-intl': '#64b5dc',
  'next-i18next': '#0b786e',
  'react-i18next': '#0b786e',
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
  'base-app-nextjs': '#334155',
  'base-app-tanstack': '#334155',
  'base-app-vite-react': '#334155',
  base: '#334155',
});

export const LIB_LOGOS: Record<string, StaticImport | null> = {
  intlayer: null,
  'next-intlayer': null,
  'next-intl': NextIntlLogo as StaticImport,
  'use-intl': NextIntlLogo as StaticImport,
  'next-i18next': I18nextLogo as StaticImport,
  'react-i18next': I18nextLogo as StaticImport,
  lingui: LinguiLogo as StaticImport,
  'gt-next': GTLogo as StaticImport,
  'gt-react': GTLogo as StaticImport,
  tolgee: TolgeeLogo as StaticImport,
  'paraglide-next': ParaglideLogo as StaticImport,
  paraglide: ParaglideLogo as StaticImport,
  'lingo.dev-app-nextjs': LingoDevLogo as StaticImport,
  'lingo.dev': LingoDevLogo as StaticImport,
  'react-intl': FormatJSLogo as StaticImport,
  'next-translate': NextTranslateLogo as StaticImport,
  'next-international': NextInternationalLogo as StaticImport,
  wuchale: WuchaleLogo as StaticImport,
};
