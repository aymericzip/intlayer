import { type Dictionary, t } from 'intlayer';

const passkeyButtonContent = {
  key: 'passkey-button',
  content: {
    ariaLabel: t({
      en: 'Sign in with passkey',
      ar: 'تسجيل الدخول باستخدام Passkey',
      de: 'Mit Passkey anmelden',
      'en-GB': 'Sign in with passkey',
      es: 'Iniciar sesión con Passkey',
      fr: 'Se connecter avec un Passkey',
      'he-IL': 'התחברות עם מפתח גישה (Passkey)',
      hi: 'पासकी के साथ साइन इन करें',
      id: 'Masuk dengan Passkey',
      it: 'Accedi con Passkey',
      ja: 'パスキーでログイン',
      ko: '패스키로 로그인',
      nl: 'Inloggen met Passkey',
      pl: 'Zaloguj się przy użyciu Passkey',
      pt: 'Entrar com Passkey',
      ru: 'Войти с помощью Passkey',
      tr: 'Passkey ile giriş yap',
      uk: 'Увійти за допомогою ключа доступу',
      vi: 'Đăng nhập bằng Passkey',
      zh: '使用通行密钥登录',
    }),
    text: 'Passkey',
  },
  title: 'Passkey button',
  description:
    'Content for the Passkey sign-in button component, including visible text and an accessible aria label for signing in with a passkey.',
  tags: ['auth', 'button', 'component', 'passkey', 'accessibility'],
} satisfies Dictionary;

export default passkeyButtonContent;
