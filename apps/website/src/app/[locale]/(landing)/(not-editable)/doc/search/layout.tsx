import { BackgroundLayout } from '@components/BackgroundLayout';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import {
  IConfigLocales,
  getLocalizedUrl,
  getMultilingualUrls,
  getTranslationContent,
} from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams, Next14LayoutIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

export type DocProps = {
  doc: string[];
};

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const title = t({
    en: 'Search in documentation | Intlayer',
    fr: 'Rechercher dans la documentation | Intlayer',
    es: 'Buscar en la documentación | Intlayer',
  });

  const description = t({
    en: 'Search documentation',
    fr: 'Rechercher la documentation',
    es: 'Buscar documentación',
  });

  return {
    title,
    description,
    keywords: t({
      en: ['search', 'documentation', 'intlayer'],
      fr: ['rechercher', 'documentation', 'intlayer'],
      es: ['buscar', 'documentación', 'intlayer'],
    }),
    alternates: {
      canonical: PagesRoutes.Doc_Search,
      languages: getMultilingualUrls(PagesRoutes.Doc_Search),
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Search}`,
        locale
      ),
      title,
      description,
    },
  };
};

const DocLayout: Next14LayoutIntlayer<DocProps> = ({
  children,
  params: { locale },
}) => (
  <DocPageLayout locale={locale} displayDocNavTitles={false}>
    <BackgroundLayout>{children}</BackgroundLayout>
  </DocPageLayout>
);

export default DocLayout;
