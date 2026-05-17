import { External_Github } from '@intlayer/design-system/routes';
import { type Dictionary, t } from 'intlayer';

type DashboardFooterContent = {
  logo: {
    url: string;
    title: string;
    label: string;
  };
  github: {
    url: string;
    title: string;
    label: string;
    alt: string;
  };
};

const dashboardFooterContent = {
  key: 'dashboard-footer',
  content: {
    github: {
      url: External_Github,
      title: 'Github',
      label: t({
        en: 'Go to the github repo',
        'en-GB': 'Go to the github repo',
        fr: 'Aller sur le dépôt github',
        es: 'Ir al repositorio de github',
        de: 'Zum Github-Repo gehen',
        ja: 'Githubリポジトリへ行く',
        ko: 'Github 저장소로 이동',
        zh: '前往Github仓库',
        it: 'Vai al repository di github',
        pt: 'Ir para o repositório do github',
        hi: 'Github रेपो पर जाएं',
        ar: 'اذهب إلى مستودع github',
        ru: 'Перейти к репозиторию github',
        tr: 'Github deposuna git',
        pl: 'Przejdź do repozytorium na GitHubie',
        id: 'Buka repositori GitHub',
        vi: 'Truy cập repo trên GitHub',
        uk: 'Перейти до репозиторію GitHub',
      }),
      alt: t({
        en: 'Github logo',
        'en-GB': 'Github logo',
        fr: 'Logo Github',
        es: 'Logo de Github',
        de: 'Github-Logo',
        ja: 'Githubのロゴ',
        ko: 'Github 로고',
        zh: 'Github标志',
        it: 'Logo di Github',
        pt: 'Logo do Github',
        hi: 'Github का लोगो',
        ar: 'شعار Github',
        ru: 'Логотип Github',
        tr: 'Github logosu',
        pl: 'Logo GitHub',
        id: 'Logo GitHub',
        vi: 'Logo GitHub',
        uk: 'Логотип GitHub',
      }),
    },
  },
  title: 'Dashboard footer',
  description:
    'Content declaration for the dashboard footer, including links to the Intlayer homepage and GitHub repository with relevant labels and accessibility metadata.',
  tags: ['dashboard', 'footer'],
} satisfies Dictionary<DashboardFooterContent>;

export default dashboardFooterContent;
