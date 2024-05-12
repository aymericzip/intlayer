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
      title: t({
        en: 'Services',
        es: 'Servicios',
        fr: 'Services',
      }),
      links: [
        {
          href: PagesRoutes.Pricing,
          text: t({
            en: 'Pricing',
            es: 'Precios',
            fr: 'Tarification',
          }),
          label: t({
            en: 'Go to the online estimation page',
            es: 'Ir a la página de estimación en línea',
            fr: 'Aller à la page d’estimation en ligne',
          }),
        },
        {
          href: PagesRoutes.ChatWithUs,
          text: t({
            en: 'Chat with us',
            es: 'Chatea con nosotros',
            fr: 'Discutez avec nous',
          }),
          label: t({
            en: 'Display chatbot interface',
            es: 'Muestra la interfaz del chatbot',
            fr: 'Afficher l’interface du chatbot',
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
