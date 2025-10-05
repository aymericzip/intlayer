import { type Dictionary, t } from 'intlayer';
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
        'en-GB': 'Home',
        fr: 'Accueil',
        es: 'Inicio',
        de: 'Startseite',
        ja: 'ホーム',
        ko: '홈',
        zh: '首页',
        it: 'Home',
        pt: 'Início',
        hi: 'मुख्य पृष्ठ',
        ar: 'الصفحة الرئيسية',
        ru: 'Главная',
        tr: 'Ana Sayfa',
      }),
      label: t({
        en: 'Go to the Intlayer home page',
        'en-GB': 'Go to the Intlayer home page',
        fr: "Aller sur la page d'accueil d'Intlayer",
        es: 'Ir a la página principal de Intlayer',
        de: 'Zur Intlayer-Startseite gehen',
        ja: 'Intlayerのホームページへ行く',
        ko: 'Intlayer 홈페이지로 이동',
        zh: '前往Intlayer首页',
        it: 'Vai alla homepage di Intlayer',
        pt: 'Ir para a página inicial do Intlayer',
        hi: 'Intlayer होम पेज पर जाएं',
        ar: 'اذهب إلى الصفحة الرئيسية لـ Intlayer',
        ru: 'Перейти на главную страницу Intlayer',
        tr: 'Intlayer ana sayfasına git',
      }),
    },
    github: {
      url: ExternalLinks.Github,
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
      }),
    },
  },
} satisfies Dictionary<DashboardFooterContent>;

export default dashboardFooterContent;
