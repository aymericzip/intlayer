import { External_Github } from '@intlayer/design-system/routes';
import { type Dictionary, t } from 'intlayer';

const dashboardFooterContent = {
  key: 'dashboard-footer',
  content: {
    github: {
      alt: t({
        en: 'Github logo',
        ar: 'شعار Github',
        de: 'Github-Logo',
        'en-GB': 'Github logo',
        es: 'Logo de Github',
        fr: 'Logo Github',
        'he-IL': 'הלוגו של GitHub',
        hi: 'Github का लोगो',
        id: 'Logo GitHub',
        it: 'Logo di Github',
        ja: 'Githubのロゴ',
        ko: 'Github 로고',
        pl: 'Logo GitHub',
        pt: 'Logo do Github',
        ru: 'Логотип Github',
        tr: 'Github logosu',
        uk: 'Логотип GitHub',
        vi: 'Logo GitHub',
        zh: 'Github标志',
      }),
      label: t({
        en: 'Go to the github repo',
        ar: 'اذهب إلى مستودع github',
        de: 'Zum Github-Repo gehen',
        'en-GB': 'Go to the github repo',
        es: 'Ir al repositorio de github',
        fr: 'Aller sur le dépôt github',
        'he-IL': 'מעבר למאגר ב-GitHub',
        hi: 'Github रेपो पर जाएं',
        id: 'Buka repositori GitHub',
        it: 'Vai al repository di github',
        ja: 'Githubリポジトリへ行く',
        ko: 'Github 저장소로 이동',
        pl: 'Przejdź do repozytorium na GitHubie',
        pt: 'Ir para o repositório do github',
        ru: 'Перейти к репозиторию github',
        tr: 'Github deposuna git',
        uk: 'Перейти до репозиторію GitHub',
        vi: 'Truy cập repo trên GitHub',
        zh: '前往Github仓库',
      }),
      title: 'Github',
      url: External_Github,
    },
  },
  title: 'Dashboard footer',
  description:
    'Content declaration for the dashboard footer, including links to the Intlayer homepage and GitHub repository with relevant labels and accessibility metadata.',
  tags: ['dashboard', 'footer'],
} satisfies Dictionary;

export default dashboardFooterContent;
