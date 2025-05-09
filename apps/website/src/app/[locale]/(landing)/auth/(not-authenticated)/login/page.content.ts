import { t, type Dictionary } from 'intlayer';

const signInContent = {
  key: 'sign-in-page',
  content: {
    title: t({
      en: 'Sign in',
      'en-GB': 'Sign in',
      fr: 'Se connecter',
      es: 'Iniciar sesión',
      de: 'Anmelden',
      ja: 'サインイン',
      ko: '로그인',
      zh: '登录',
      it: 'Accedi',
      pt: 'Entrar',
      hi: 'साइन इन',
      ar: 'تسجيل الدخول',
      ru: 'Войти',
    }),
    title2: t({
      en: 'Sign in',
      'en-GB': 'Sign in',
      fr: 'Se connecter',
      es: 'Se iniciar sesión',
      de: 'Anmelden',
      ja: 'サインイン',
      ko: '로그인',
      zh: '登录',
      it: 'Accedi',
      pt: 'Entrar',
      hi: 'साइन इन',
      ar: 'تسجيل الدخول',
      ru: 'Войти',
    }),
    description: t({
      en: 'Enter your email and password to log in.',
      'en-GB': 'Enter your email and password to log in.',
      fr: 'Entrez votre adresse e-mail et votre mot de passe pour vous connecter.',
      es: 'Ingrese su correo electrónico y contraseña para iniciar sesión.',
      de: 'Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden.',
      ja: 'メールアドレスとパスワードを入力してログインしてください。',
      ko: '로그인하려면 이메일과 비밀번호를 입력하세요.',
      zh: '请输入您的电子邮件和密码登录。',
      it: 'Inserisci la tua email e password per accedere.',
      pt: 'Insira seu email e senha para entrar.',
      hi: 'लॉग इन करने के लिए अपनी ईमेल और पासवर्ड दर्ज करें।',
      ar: 'أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول.',
      ru: 'Введите свой адрес электронной почты и пароль, чтобы войти.',
    }),
  },
} satisfies Dictionary;

export default signInContent;
