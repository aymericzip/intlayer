import {
  App_Auth_SignIn,
  App_Home_Path,
  External_Discord,
  External_Github,
} from '@intlayer/design-system/routes';
import { type Dictionary, t } from 'intlayer';

type SectionsContent = {
  github: {
    url: string;
    label: string;
  };
  discord: {
    url: string;
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
    discord: {
      label: t({
        en: 'Go to the discord server',
        ar: 'اذهب إلى خادم Discord',
        de: 'Zur Discord-Server gehen',
        'en-GB': 'Go to the discord server',
        es: 'Ir al servidor de discord',
        fr: 'Aller sur le serveur discord',
        'he-IL': 'מעבר לשרת ה-Discord',
        hi: 'Discord सर्वर पर जाएं',
        id: 'Buka server Discord',
        it: 'Vai al server di Discord',
        ja: 'Discordサーバーに移動',
        ko: 'Discord 서버로 이동',
        pl: 'Przejdź do serwera Discord',
        pt: 'Ir para o servidor do Discord',
        ru: 'Перейти на сервер Discord',
        tr: 'Discord sunucusuna git',
        uk: 'Перейти на сервер Discord',
        vi: 'Tham gia máy chủ Discord',
        zh: '访问Discord服务器',
      }),
      url: External_Discord,
    },

    github: {
      label: t({
        en: 'Go to the github repo',
        ar: 'اذهب إلى مستودع Github',
        de: 'Gehe zum Github-Repo',
        'en-GB': 'Go to the github repo',
        es: 'Ir al repositorio de github',
        fr: 'Aller sur le dépôt github',
        'he-IL': 'מעבר למאגר ב-GitHub',
        hi: 'Github रिपॉजिटरी पर जाएं',
        id: 'Buka repositori GitHub',
        it: 'Vai al repository di Github',
        ja: 'Githubリポジトリに移動',
        ko: 'Github 리포지토리로 이동',
        pl: 'Przejdź do repozytorium na GitHubie',
        pt: 'Ir para o repositório do Github',
        ru: 'Перейти в репозиторий Github',
        tr: 'Github deposuna git',
        uk: 'Перейти до репозиторію GitHub',
        vi: 'Đi đến kho GitHub',
        zh: '访问Github仓库',
      }),
      url: External_Github,
    },
    login: {
      label: t({
        en: 'Go to login page',
        ar: 'اذهب إلى صفحة تسجيل الدخول',
        de: 'Gehe zur Anmeldeseite',
        'en-GB': 'Go to login page',
        es: 'Ir a la página de inicio de sesión',
        fr: 'Aller à la page de connexion',
        'he-IL': 'מעבר לדף ההתחברות',
        hi: 'लॉगिन पृष्ठ पर जाएं',
        id: 'Buka halaman masuk',
        it: 'Vai alla pagina di accesso',
        ja: 'ログインページに移動',
        ko: '로그인 페이지로 이동',
        pl: 'Przejdź do strony logowania',
        pt: 'Ir para a página de login',
        ru: 'Перейти на страницу входа',
        tr: 'Giriş sayfasına git',
        uk: 'Перейти на сторінку входу',
        vi: 'Đi đến trang đăng nhập',
        zh: '访问登录页面',
      }),
      title: t({
        en: 'Login',
        ar: 'تسجيل الدخول',
        de: 'Anmelden',
        'en-GB': 'Login',
        es: 'Iniciar sesión',
        fr: 'Connexion',
        'he-IL': 'התחברות',
        hi: 'लॉग इन करें',
        id: 'Masuk',
        it: 'Accesso',
        ja: 'ログイン',
        ko: '로그인',
        pl: 'Zaloguj',
        pt: 'Entrar',
        ru: 'Войти',
        tr: 'Giriş Yap',
        uk: 'Вхід',
        vi: 'Đăng nhập',
        zh: '登录',
      }),
      url: App_Auth_SignIn,
    },
    logo: {
      label: t({
        en: 'Company logo - Go to home page',
        ar: 'شعار الشركة - انتقل إلى الصفحة الرئيسية',
        de: 'Unternehmenslogo - Gehe zur Startseite',
        'en-GB': 'Company logo - Go to home page',
        es: 'Logotipo de la empresa - Ir a la página de inicio',
        fr: "Logo de l'entreprise - Aller à la page d’accueil",
        'he-IL': 'לוגו החברה - מעבר לדף הבית',
        hi: 'कंपनी का लोगो - घर के पृष्ठ पर जाएं',
        id: 'Logo perusahaan - Buka beranda',
        it: "Logo dell'azienda - Vai alla home page",
        ja: '会社のロゴ - ホームページへ移動',
        ko: '회사 로고 - 홈페이지로 이동',
        pl: 'Logo firmy - przejdź do strony głównej',
        pt: 'Logotipo da empresa - Ir para a página inicial',
        ru: 'Логотип компании - Перейти на главную страницу',
        tr: 'Şirket logosu - Ana sayfaya git',
        uk: 'Логотип компанії — перейти на головну сторінку',
        vi: 'Logo công ty - Đến trang chủ',
        zh: '公司标志 - 返回首页',
      }),
      url: App_Home_Path,
    },
    logout: {
      label: t({
        en: 'Logout',
        ar: 'تسجيل الخروج',
        de: 'Abmelden',
        'en-GB': 'Logout',
        es: 'Cerrar sesión',
        fr: 'Se déconnecter',
        'he-IL': 'התנתקות',
        hi: 'लॉग आउट',
        id: 'Keluar',
        it: 'Disconnettersi',
        ja: 'ログアウト',
        ko: '로그아웃',
        pl: 'Wyloguj się',
        pt: 'Sair',
        ru: 'Выйти',
        tr: 'Çıkış Yap',
        uk: 'Вийти',
        vi: 'Đăng xuất',
        zh: '登出',
      }),
      title: t({
        en: 'Logout',
        ar: 'تسجيل الخروج',
        de: 'Abmelden',
        'en-GB': 'Logout',
        es: 'Cerrar sesión',
        fr: 'Déconnexion',
        'he-IL': 'התנתקות',
        hi: 'लॉग आउट',
        id: 'Keluar',
        it: 'Disconnessione',
        ja: 'ログアウト',
        ko: '로그아웃',
        pl: 'Wyloguj',
        pt: 'Sair',
        ru: 'Выйти',
        tr: 'Çıkış Yap',
        uk: 'Вихід',
        vi: 'Đăng xuất',
        zh: '登出',
      }),
    },
  },
  title: 'Navbar content',
  description:
    'Content declaration for the navigation bar, including labels, titles and links for sections like home, dashboard, documentation, blog, and external links such as GitHub and Discord.',
  tags: ['navbar', 'navigation', 'header'],
} satisfies Dictionary<SectionsContent>;

export default navbarContent;
