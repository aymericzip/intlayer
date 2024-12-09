import Script from 'next/script';
import { t } from 'next-intlayer/server';
import { type FC } from 'react';

export const SoftwareApplicationHeader: FC = () => {
  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Intlayer',
    url: 'https://www.votresite.com',
    description: t({
      en: 'i18n for Next.js & React. Easily build multilingual sites with AI-powered visual editor for your translations. TypeScript internationalization.',
      fr: "i18n pour Next.js & React. Créez des sites multilingues grâce à un éditeur visuel boosté par l'IA pour vos traductions. Internationalisation basée sur TypeScript.",
      es: 'i18n para Next.js & React. Crea sitios multilingües con un editor visual impulsado por IA para tus traducciones. Internacionalización con TypeScript.',
    }),
    softwareVersion: '3.3.4',
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
        'Next.js',
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
    platform: 'Web, React, nextjs, Vite',
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
  };

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(softwareApplication),
      }}
    />
  );
};
