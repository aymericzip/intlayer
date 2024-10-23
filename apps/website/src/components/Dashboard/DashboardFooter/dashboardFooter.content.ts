import { type DeclarationContent, t } from 'intlayer';
import { ExternalLinks } from '@/Routes';

type DashboardFooterContent = {
  logo: {
    url: ExternalLinks;
    title: string;
    label: string;
  };
  github: {
    url: ExternalLinks;
    title: string;
    label: string;
    alt: string;
  };
};

const dashboardFooterContent = {
  key: 'dashboard-footer',
  content: {
    logo: {
      url: ExternalLinks.Github,
      title: t({
        en: 'Home',
        fr: 'home',
        es: 'Home',
      }),
      label: t({
        en: 'Go to the Intlayer home page',
        fr: 'Aller sur ',
        es: 'Ir al',
      }),
    },
    github: {
      url: ExternalLinks.Github,
      title: t({
        en: 'Github',
        fr: 'Github',
        es: 'Github',
      }),
      label: t({
        en: 'Go to the github repo',
        fr: 'Aller sur le dépôt github',
        es: 'Ir al repositorio de github',
      }),
      alt: t({
        en: 'Github logo',
        fr: 'Logo Github',
        es: 'Logo de Github',
      }),
    },
  },
} satisfies DeclarationContent<DashboardFooterContent>;

export default dashboardFooterContent;
