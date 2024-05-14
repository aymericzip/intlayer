import type { LinkGroup } from '@intlayer/design-system';
import { t, type DeclarationContent } from 'intlayer';
import { PagesRoutes } from '../../Routes';

type FooterContent = {
  content: LinkGroup[];
};

export const footerContent: DeclarationContent<FooterContent> = {
  id: 'footer',
  content: [
    {
      title: 'Docs',
      links: [
        {
          href: 'https://github.com/aypineau/intlayer/blob/main/docs/content_declaration/get_started.md',
          text: t({
            en: 'Getting started',
            es: 'Empezando',
            fr: 'Mise en route',
          }),
          label: t({
            en: 'See getting started documentation',
            es: 'Ver documentación de inicio',
            fr: 'Voir la documentation de démarrage',
          }),
        },
        {
          href: 'https://github.com/aypineau/intlayer/blob/main/docs/intlayer_with_nextjs.md',
          text: t({
            en: 'Intlayer with NextJs',
            es: 'Intlayer con NextJs',
            fr: 'Intlayer avec NextJs',
          }),
          label: t({
            en: 'See Intlayer with NextJs documentation',
            es: 'Ver documentación de Intlayer con NextJs',
            fr: 'Voir la documentation de Intlayer avec NextJs',
          }),
        },
        {
          href: 'https://github.com/aypineau/intlayer/blob/main/docs/intlayer_with_create_react_app.md',
          text: t({
            en: 'Intlayer with ReactJS (CRA)',
            es: 'Intlayer con ReactJS (CRA)',
            fr: 'Intlayer avec ReactJS (CRA)',
          }),
          label: t({
            en: 'See Intlayer with ReactJS (CRA) documentation',
            es: 'Ver documentación de Intlayer con ReactJS (CRA)',
            fr: 'Voir la documentation de Intlayer avec ReactJS (CRA)',
          }),
        },
        {
          href: 'https://github.com/aypineau/intlayer/blob/main/docs/intlayer_with_vite%2Breact.md',
          text: t({
            en: 'Intlayer with React+Vite',
            es: 'Intlayer con React+Vite',
            fr: 'Intlayer avec React+Vite',
          }),
          label: t({
            en: 'See Intlayer with React+Vite documentation',
            es: 'Ver documentación de Intlayer con React+Vite',
            fr: 'Voir la documentation de Intlayer avec React+Vite',
          }),
        },
      ],
    },
    {
      title: t({
        en: 'Lean more',
        es: 'Aprende más',
        fr: 'En savoir plus',
      }),
      links: [
        {
          href: PagesRoutes.TermsOfService,
          text: t({
            en: 'Terms of service',
            es: 'Términos de servicio',
            fr: 'Conditions de service',
          }),
          label: t({
            en: 'Read our terms of service',
            es: 'Lee nuestros términos de servicio',
            fr: 'Lisez nos conditions de service',
          }),
        },
        {
          href: PagesRoutes.PrivacyPolicy,
          text: t({
            en: 'Privacy Notice',
            es: 'Aviso de privacidad',
            fr: 'Avis de confidentialité',
          }),
          label: t({
            en: 'Read our privacy notice',
            es: 'Lee nuestro aviso de privacidad',
            fr: 'Lisez notre avis de confidentialité',
          }),
        },
        {
          href: 'https://www.linkedin.com/',
          text: 'LinkedIn',
          label: t({
            en: 'Go to our LinkedIn page',
            es: 'Ir a nuestra página de LinkedIn',
            fr: 'Aller sur notre page LinkedIn',
          }),
        },
      ],
    },
  ],
};
