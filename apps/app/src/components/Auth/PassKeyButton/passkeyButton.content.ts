import { type Dictionary, t } from 'intlayer';

const passkeyButtonContent = {
  key: 'passkey-button',
  content: {
    text: 'Passkey',
    ariaLabel: t({
      en: 'Sign in with passkey',
      'en-GB': 'Sign in with passkey',
      fr: 'Se connecter avec une clé de sécurité',
      es: 'Iniciar sesión con llave',
      de: 'Mit Passkey anmelden',
      ja: 'パスキーでログイン',
      ko: '패스키로 로그인',
      zh: '使用通行密钥登录',
      it: 'Accedi con Passkey',
      pt: 'Entrar com Passkey',
      hi: 'पासकी के साथ साइन इन करें',
      ar: 'تسجيل الدخول باستخدام Passkey',
      ru: 'Войти с помощью Passkey',
      tr: 'Passkey ile giriş yap',
      pl: 'Zaloguj się przy użyciu Passkey',
      nl: 'Inloggen met Passkey',
      id: 'Masuk dengan Passkey',
      vi: 'Đăng nhập bằng Passkey',
      uk: 'Увійти за допомогою ключа доступу',
    }),
  },
  title: 'Passkey button',
  description:
    'Content for the Passkey sign-in button component, including visible text and an accessible aria label for signing in with a passkey.',
  tags: ['auth', 'button', 'component', 'passkey', 'accessibility'],
} satisfies Dictionary;

export default passkeyButtonContent;
