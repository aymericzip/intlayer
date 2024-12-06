import type { LinkGroup } from '@intlayer/design-system';
import { t, type DeclarationContent } from 'intlayer';
import { ExternalLinks, PagesRoutes } from '../../Routes';

type FooterContent = {
  content: LinkGroup[];
};

const footerContent = {
  key: 'footer',
  content: {
    content: [
      {
        title: 'Docs',
        links: [
          {
            href: PagesRoutes.Doc,
            text: t({
              en: 'Getting started',
              es: 'Empezando',
              fr: 'Commencez facilement',
            }),
            label: t({
              en: 'See getting started documentation',
              es: 'Ver documentación de inicio',
              fr: 'Voir la documentation de démarrage',
            }),
          },
          {
            href: PagesRoutes.Doc_Environment_NextJS_15,
            text: t({
              en: 'Intlayer with nextjs',
              es: 'Intlayer con nextjs',
              fr: 'Intlayer avec nextjs',
            }),
            label: t({
              en: 'See Intlayer with nextjs documentation',
              es: 'Ver documentación de Intlayer con nextjs',
              fr: 'Voir la documentation de Intlayer avec nextjs',
            }),
          },
          {
            href: PagesRoutes.Doc_Environment_CRA,
            text: t({
              en: 'Intlayer with react (CRA)',
              es: 'Intlayer con react (CRA)',
              fr: 'Intlayer avec react (CRA)',
            }),
            label: t({
              en: 'See Intlayer with react (CRA) documentation',
              es: 'Ver documentación de Intlayer con react (CRA)',
              fr: 'Voir la documentation de Intlayer avec react (CRA)',
            }),
          },
          {
            href: PagesRoutes.Doc_Environment_ViteAndReact,
            text: t({
              en: 'Intlayer with react and vite',
              es: 'Intlayer con react y vite',
              fr: 'Intlayer avec react et vite',
            }),
            label: t({
              en: 'See Intlayer with react and vite documentation',
              es: 'Ver documentación de Intlayer con react y vite',
              fr: 'Voir la documentation de Intlayer avec react et vite',
            }),
          },
        ],
      },
      {
        title: t({
          en: 'Examples',
          es: 'Ejemplos',
          fr: 'Exemples',
        }),
        links: [
          {
            href: ExternalLinks.ExampleIntlayerWithNextjs,
            text: t({
              en: 'Intlayer with nextjs',
              es: 'Intlayer con nextjs',
              fr: 'Intlayer avec nextjs',
            }),
            label: t({
              en: 'See how to set up Intlayer with nextjs',
              es: 'Ver cómo configurar Intlayer con nextjs',
              fr: 'Voir comment configuer Intlayer avec nextjs',
            }),
          },
          {
            href: ExternalLinks.ExampleIntlayerWithReactJS,
            text: t({
              en: 'Intlayer with react (CRA)',
              es: 'Intlayer con react (CRA)',
              fr: 'Intlayer avec react (CRA)',
            }),
            label: t({
              en: 'See how to set up Intlayer with react (CRA)',
              es: 'Ver cómo configurar Intlayer con react (CRA)',
              fr: 'Voir comment configuer Intlayer avec react (CRA)',
            }),
          },
          {
            href: ExternalLinks.ExampleIntlayerWithViteAndReact,
            text: t({
              en: 'Intlayer with Vite and React',
              es: 'Intlayer con Vite and React',
              fr: 'Intlayer avec Vite and React',
            }),
            label: t({
              en: 'See how to set up Intlayer with Vite and React',
              es: 'Ver cómo configurar Intlayer con Vite and React',
              fr: 'Voir comment configuer Intlayer avec Vite and React',
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
            href: ExternalLinks.LinkedIn,
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
  },
} satisfies DeclarationContent<FooterContent>;
export default footerContent;
