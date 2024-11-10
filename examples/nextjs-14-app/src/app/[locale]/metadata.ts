import { getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  return {
    title: getTranslationContent<string>(
      {
        en: 'page title',
        fr: 'titre de la page',
        es: 'título de la página',
      },
      locale
    ),
    description: getTranslationContent(
      {
        en: 'page description',
        es: 'descripción de la página',
        fr: '',
      },
      locale
    ),
  };
};
