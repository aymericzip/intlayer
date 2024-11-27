import { BackgroundLayout } from '@components/BackgroundLayout';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams, NextLayoutIntlayer } from 'next-intlayer';
import { locales } from '../../../../../../../intlayer.config';
import { PagesRoutes } from '@/Routes';

export type DocProps = {
  doc: string[];
};

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t({
      en: 'Intlayer | Search in documentation',
      fr: 'Intlayer | Rechercher dans la documentation',
      es: 'Intlayer | Buscar en la documentación',
    }),
    description: t({
      en: 'Search documentation',
      fr: 'Rechercher la documentation',
      es: 'Buscar documentación',
    }),
    keywords: t({
      en: ['search', 'documentation', 'intlayer'],
      fr: ['rechercher', 'documentation', 'intlayer'],
      es: ['buscar', 'documentación', 'intlayer'],
    }),
    alternates: {
      canonical: PagesRoutes.Doc_Search,
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: `/${locale}${PagesRoutes.Doc_Search}`,
        }),
        {}
      ),
    },
  };
};

const DocLayout: NextLayoutIntlayer<DocProps> = ({
  children,
  params: { locale },
}) => (
  <DocPageLayout locale={locale} displayDocNavTitles={false}>
    <BackgroundLayout>{children}</BackgroundLayout>
  </DocPageLayout>
);

export default DocLayout;
