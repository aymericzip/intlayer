import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'define-new-password-form',
  content: {
    goToLoginButton: {
      text: t({
        en: 'Go to login',
        fr: 'Aller à la connexion',
        es: 'Ir a la conexión',
        de: 'Gehen Sie zur Anmeldung',
        ja: 'ログインに行く',
        ko: '로그인',
        zh: '进入登录',
        it: 'Vai a login',
        pt: 'Ir para login',
        hi: 'लॉगिन पर जाएँ',
        ar: 'اذهب إلى تسجيل الدخول',
        ru: 'Перейти к входу',
        'en-GB': 'Go to login',
      }),
      ariaLabel: t({
        en: 'Click to go to login',
        fr: 'Cliquez pour aller à la connexion',
        es: 'Haz clic para ir a la conexión',
        de: 'Klicken Sie, um zur Anmeldung zu gehen',
        ja: 'ログインに行くにはクリックしてください',
        ko: '로그인으로 가는 방법을 클릭하세요',
        zh: '点击进入登录',
        it: 'Clicca per andare a login',
        pt: 'Clique para ir para login',
        hi: 'लॉगिन पर जाएँ को क्लिक करें',
        ar: 'انقر للذهاب إلى تسجيل الدخول',
        ru: 'Нажмите, чтобы перейти к входу',
        'en-GB': 'Click to go to login',
      }),
    },
  },
} satisfies Dictionary;

export default content;
