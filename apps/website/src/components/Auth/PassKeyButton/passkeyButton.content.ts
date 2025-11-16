import { type Dictionary, t } from 'intlayer';

const passkeyButtonContent = {
  key: 'passkey-button',
  content: {
    text: t({
      en: 'Use Passkey',
      'en-GB': 'Use Passkey',
      fr: 'Utiliser une clé',
      es: 'Usar llave',
      de: 'Passkey verwenden',
      ja: 'パスキーを使う',
      ko: '패스키 사용',
      zh: '使用通行密钥',
      it: 'Usa Passkey',
      pt: 'Usar Passkey',
      hi: 'पासकी का उपयोग करें',
      ar: 'استخدم Passkey',
      ru: 'Использовать Passkey',
      tr: 'Passkey Kullan',
      pl: 'Użyj Passkey',
      nl: 'Gebruik Passkey',
      id: 'Gunakan Passkey',
      vi: 'Sử dụng Passkey',
    }),
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
    }),
  },
} satisfies Dictionary;

export default passkeyButtonContent;
