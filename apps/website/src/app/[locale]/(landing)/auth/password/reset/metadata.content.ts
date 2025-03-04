import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const metadataContent = {
  key: 'reset-password-metadata',
  content: {
    title: t({
      en: 'Forgotten Password | Intlayer',
      'en-GB': 'Forgotten Password | Intlayer',
      fr: 'Mot de passe oublié | Intlayer',
      es: 'Contraseña olvidada | Intlayer',
      de: 'Passwort vergessen | Intlayer',
      ja: 'パスワードを忘れた | Intlayer',
      ko: '비밀번호 잊어버리기 | Intlayer',
      zh: '忘记密码 | Intlayer',
      it: 'Password dimenticata | Intlayer',
      pt: 'Esqueceu a senha | Intlayer',
      hi: 'पासवर्ड भूल गए | Intlayer',
      ar: 'كلمة المرور منسية | Intlayer',
      ru: 'Забыли пароль | Intlayer',
    }),
    description: t({
      en: 'Recover your Intlayer account by resetting your forgotten password. Follow the instructions to restore access.',
      'en-GB':
        'Recover your Intlayer account by resetting your forgotten password. Follow the instructions to restore access.',
      fr: "Récupérez votre compte Intlayer en réinitialisant votre mot de passe oublié. Suivez les instructions pour restaurer l'accès.",
      es: 'Recupera tu cuenta de Intlayer restableciendo tu contraseña olvidada. Sigue las instrucciones para restaurar el acceso.',
      de: 'Stellen Sie Ihr Intlayer-Konto wieder her, indem Sie Ihr vergessenes Passwort zurücksetzen. Befolgen Sie die Anweisungen, um den Zugriff wiederherzustellen.',
      ja: '忘れたパスワードをリセットしてIntlayerアカウントを回復します。アクセスを復元するための指示に従ってください。',
      ko: '잊어버린 비밀번호를 재설정하여 Intlayer 계정을 복구하세요. 액세스를 복원하려면 지침을 따르세요.',
      zh: '通过重置忘记的密码来恢复您的Intlayer帐户。请按照说明恢复访问权限。',
      it: "Recupera il tuo account Intlayer reimpostando la password dimenticata. Segui le istruzioni per ripristinare l'accesso.",
      pt: 'Recupere sua conta Intlayer redefinindo sua senha esquecida. Siga as instruções para restaurar o acesso.',
      hi: 'अपना Intlayer खाता पुनर्प्राप्त करने के लिए अपना भूल गया पासवर्ड रीसेट करें। एक्सेस बहाल करने के लिए निर्देशों का पालन करें।',
      ar: 'استعد حسابك في Intlayer عن طريق إعادة تعيين كلمة المرور المنسية. اتبع التعليمات لاستعادة الوصول.',
      ru: 'Восстановите свой аккаунт Intlayer, сбросив забытый пароль. Следуйте инструкциям, чтобы восстановить доступ.',
    }),

    keywords: t<string[]>({
      en: [
        'Forgotten password',
        'Password recovery',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      'en-GB': [
        'Forgotten password',
        'Password recovery',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      fr: [
        'Mot de passe oublié',
        'Récupération de mot de passe',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      es: [
        'Contraseña olvidada',
        'Recuperación de contraseña',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      de: [
        'Passwort vergessen',
        'Passwortwiederherstellung',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ja: [
        'パスワードを忘れた',
        'パスワード回復',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ko: [
        '비밀번호 잊어버리기',
        '비밀번호 복구',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      zh: ['忘记密码', '密码恢复', 'Intlayer', 'React', 'JavaScript'],
      it: [
        'Password dimenticata',
        'Recupero password',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      pt: [
        'Esqueceu a senha',
        'Recuperação de senha',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      hi: [
        'पासवर्ड भूल गए',
        'पासवर्ड पुनर्प्राप्ति',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ar: [
        'كلمة المرور منسية',
        'استعادة كلمة المرور',
        'Intlayer',
        'React',
        'JavaScript',
      ],
      ru: [
        'Забыли пароль',
        'Восстановление пароля',
        'Intlayer',
        'React',
        'JavaScript',
      ],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
