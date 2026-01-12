import { type Dictionary, t } from 'intlayer';
import { ExternalLinks, LandingRoutes, PagesRoutes } from '@/Routes';

type SectionsContent = {
  github: {
    id: string;
    url: string;
    title: string;
    label: string;
    gitHubLogoAlt: string;
  };
  discord: {
    id: string;
    url: string;
    title: string;
    label: string;
  };
  logo: {
    label: string;
    url: string;
  };
  logout: {
    title: string;
    label: string;
  };
  login: {
    url: string;
    title: string;
    label: string;
  };
};

export const navbarContent = {
  key: 'navbar',
  content: {
    logo: {
      label: t({
        en: 'Company logo - Go to home page',
        fr: "Logo de l'entreprise - Aller à la page d’accueil",
        es: 'Logotipo de la empresa - Ir a la página de inicio',
        'en-GB': 'Company logo - Go to home page',
        de: 'Unternehmenslogo - Gehe zur Startseite',
        ja: '会社のロゴ - ホームページへ移動',
        ko: '회사 로고 - 홈페이지로 이동',
        zh: '公司标志 - 返回首页',
        it: "Logo dell'azienda - Vai alla home page",
        pt: 'Logotipo da empresa - Ir para a página inicial',
        hi: 'कंपनी का लोगो - घर के पृष्ठ पर जाएं',
        ar: 'شعار الشركة - انتقل إلى الصفحة الرئيسية',
        ru: 'Логотип компании - Перейти на главную страницу',
        tr: 'Şirket logosu - Ana sayfaya git',
        pl: 'Logo firmy - przejdź do strony głównej',
        id: 'Logo perusahaan - Buka beranda',
        vi: 'Logo công ty - Đến trang chủ',
        uk: 'Логотип компанії — перейти на головну сторінку',
      }),
      url: PagesRoutes.Home,
    },
    github: {
      id: 'github',
      url: ExternalLinks.Github,
      title: 'Github',
      label: t({
        en: 'Go to the github repo',
        fr: 'Aller sur le dépôt github',
        es: 'Ir al repositorio de github',
        'en-GB': 'Go to the github repo',
        de: 'Gehe zum Github-Repo',
        ja: 'Githubリポジトリに移動',
        ko: 'Github 리포지토리로 이동',
        zh: '访问Github仓库',
        it: 'Vai al repository di Github',
        pt: 'Ir para o repositório do Github',
        hi: 'Github रिपॉजिटरी पर जाएं',
        ar: 'اذهب إلى مستودع Github',
        ru: 'Перейти в репозиторий Github',
        tr: 'Github deposuna git',
        pl: 'Przejdź do repozytorium na GitHubie',
        id: 'Buka repositori GitHub',
        vi: 'Đi đến kho GitHub',
        uk: 'Перейти до репозиторію GitHub',
      }),
      gitHubLogoAlt: t({
        en: 'Github logo',
        fr: 'Logo Github',
        es: 'Logo de Github',
        'en-GB': 'Github logo',
        de: 'Github-Logo',
        ja: 'Githubロゴ',
        ko: 'Github 로고',
        zh: 'Github标志',
        it: 'Logo di Github',
        pt: 'Logotipo do Github',
        hi: 'Github लोगो',
        ar: 'شعار Github',
        ru: 'Логотип Github',
        tr: 'Github logosu',
        pl: 'Logo GitHuba',
        id: 'Logo GitHub',
        vi: 'Biểu tượng GitHub',
        uk: 'Логотип GitHub',
      }),
    },
    discord: {
      id: 'discord',
      url: ExternalLinks.Discord,
      title: 'Discord',
      label: t({
        en: 'Go to the discord server',
        fr: 'Aller sur le serveur discord',
        es: 'Ir al servidor de discord',
        'en-GB': 'Go to the discord server',
        de: 'Zur Discord-Server gehen',
        ja: 'Discordサーバーに移動',
        ko: 'Discord 서버로 이동',
        zh: '访问Discord服务器',
        it: 'Vai al server di Discord',
        pt: 'Ir para o servidor do Discord',
        hi: 'Discord सर्वर पर जाएं',
        ar: 'اذهب إلى خادم Discord',
        ru: 'Перейти на сервер Discord',
        tr: 'Discord sunucusuna git',
        pl: 'Przejdź do serwera Discord',
        id: 'Buka server Discord',
        vi: 'Tham gia máy chủ Discord',
        uk: 'Перейти на сервер Discord',
      }),
    },

    logout: {
      title: t({
        en: 'Logout',
        fr: 'Déconnexion',
        es: 'Cerrar sesión',
        'en-GB': 'Logout',
        de: 'Abmelden',
        ja: 'ログアウト',
        ko: '로그아웃',
        zh: '登出',
        it: 'Disconnessione',
        pt: 'Sair',
        hi: 'लॉग आउट',
        ar: 'تسجيل الخروج',
        ru: 'Выйти',
        tr: 'Çıkış Yap',
        pl: 'Wyloguj',
        id: 'Keluar',
        vi: 'Đăng xuất',
        uk: 'Вихід',
      }),
      label: t({
        en: 'Logout',
        fr: 'Se déconnecter',
        es: 'Cerrar sesión',
        'en-GB': 'Logout',
        de: 'Abmelden',
        ja: 'ログアウト',
        ko: '로그아웃',
        zh: '登出',
        it: 'Disconnettersi',
        pt: 'Sair',
        hi: 'लॉग आउट',
        ar: 'تسجيل الخروج',
        ru: 'Выйти',
        tr: 'Çıkış Yap',
        pl: 'Wyloguj się',
        id: 'Keluar',
        vi: 'Đăng xuất',
        uk: 'Вийти',
      }),
    },
    login: {
      url: PagesRoutes.Auth_SignIn,
      title: t({
        en: 'Login',
        fr: 'Connexion',
        es: 'Iniciar sesión',
        'en-GB': 'Login',
        de: 'Anmelden',
        ja: 'ログイン',
        ko: '로그인',
        zh: '登录',
        it: 'Accesso',
        pt: 'Entrar',
        hi: 'लॉग इन करें',
        ar: 'تسجيل الدخول',
        ru: 'Войти',
        tr: 'Giriş Yap',
        pl: 'Zaloguj',
        id: 'Masuk',
        vi: 'Đăng nhập',
        uk: 'Вхід',
      }),
      label: t({
        en: 'Go to login page',
        fr: 'Aller à la page de connexion',
        es: 'Ir a la página de inicio de sesión',
        'en-GB': 'Go to login page',
        de: 'Gehe zur Anmeldeseite',
        ja: 'ログインページに移動',
        ko: '로그인 페이지로 이동',
        zh: '访问登录页面',
        it: 'Vai alla pagina di accesso',
        pt: 'Ir para a página de login',
        hi: 'लॉगिन पृष्ठ पर जाएं',
        ar: 'اذهب إلى صفحة تسجيل الدخول',
        ru: 'Перейти на страницу входа',
        tr: 'Giriş sayfasına git',
        pl: 'Przejdź do strony logowania',
        id: 'Buka halaman masuk',
        vi: 'Đi đến trang đăng nhập',
        uk: 'Перейти на сторінку входу',
      }),
    },
  },
  title: 'Navbar content',
  description:
    'Content declaration for the navigation bar, including labels, titles and links for sections like home, dashboard, documentation, blog, and external links such as GitHub and Discord.',
  tags: ['navbar', 'navigation', 'header'],
} satisfies Dictionary<SectionsContent>;

export default navbarContent;
