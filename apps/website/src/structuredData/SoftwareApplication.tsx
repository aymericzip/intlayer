import { DeclarationContent, t } from 'intlayer';
import Head from 'next/head';
import { useDictionary } from 'next-intlayer/server';
import { type FC } from 'react';

const softwareApplication = {
  key: 'software-application-structured-data',
  content: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Intlayer',
    url: 'https://www.votresite.com',
    description: t({
      en: 'Intlayer offers a flexible, modern approach to internationalization, integrating seamlessly with Next.js and React. It supports various content formats, making it a powerful choice.',
      fr: "Intlayer propose une approche moderne et flexible de l'internationalisation, intégrant parfaitement avec Next.js et React.",
      es: 'Intlayer ofrece un enfoque moderno y flexible para la internacionalización, integrándose perfectamente con Next.js y React.',
    }),
    softwareVersion: '3.3.2',
    license:
      'https://raw.githubusercontent.com/aymericzip/intlayer/refs/heads/main/LICENSE',
    author: {
      '@type': 'Organization',
      name: 'Intlayer',
      url: 'https://www.votresite.com',
      logo: 'https://www.votresite.com/assets/logo.png',
      sameAs: ['https://github.com/aymericzip'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Intlayer',
      url: 'https://www.votresite.com',
      logo: 'https://www.votresite.com/assets/logo.png',
    },
    keywords: t({
      en: [
        'translation',
        'localization',
        'multilingual',
        'Internationalization',
        'i18n',
        'Web Development',
        'Next.js',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
      fr: [
        'Traduction',
        'Localisation',
        'Multilingue',
        'SEO',
        'Internationalisation',
        'i18n',
        'Développement Web',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
      es: [
        'Traducción',
        'Localización',
        'Multilingüe',
        'SEO',
        'Internacionalización',
        'i18n',
        'Next.js',
        'Desarrollo Web',
        'JavaScript',
        'Vite',
        'React',
        'CMS',
        'Content Management System',
      ],
    }),
    creator: {
      '@type': 'Person',
      name: 'Aymeric PINEAU',
      url: 'https://github.com/aymericzip',
    },
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Developer Tools',
    image: 'https://intlayer.org/cover.png',
    operatingSystem: 'Web, iOS, Android',
    platform: 'Web, React, Next.js, Vite',
    datePublished: '2024-08-26',
    audience: {
      '@type': 'Audience',
      audienceType: t({
        en: 'Developers, Content Managers',
        fr: 'Développeurs, Responsables de contenu',
        es: 'Desarrolladores, Gestores de Contenido',
      }),
    },
    mainEntityOfPage: 'https://intlayer.org',
  },
} satisfies DeclarationContent;

export const SoftwareApplicationHeader: FC = () => {
  const data = useDictionary(softwareApplication);
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data),
        }}
      />
    </Head>
  );
};
