import { t, type DeclarationContent } from 'intlayer';

const changePasswordContent = {
  key: 'change-password-page',
  content: {
    title: t({
      en: 'Change password',
      'en-GB': 'Change password',
      fr: 'Changer de mot de passe',
      es: 'Cambiar contraseña',
      de: 'Passwort ändern',
      ja: 'パスワードを変更する',
      ko: '비밀번호 변경',
      zh: '更改密码',
      it: 'Cambia la password',
      pt: 'Alterar a senha',
      hi: 'पासवर्ड बदलें',
      ar: 'تغيير كلمة المرور',
      ru: 'Изменить пароль',
    }),
    title2: t({
      en: 'Change your password',
      'en-GB': 'Change your password',
      fr: 'Changer votre mot de passe',
      es: 'Cambiar su contraseña',
      de: 'Ändern Sie Ihr Passwort',
      ja: 'パスワードを変更してください',
      ko: '비밀번호를 변경하세요',
      zh: '更改您的密码',
      it: 'Cambia la tua password',
      pt: 'Altere sua senha',
      hi: 'अपना पासवर्ड बदलें',
      ar: 'غير كلمة المرور الخاصة بك',
      ru: 'Измените ваш пароль',
    }),
    description: t({
      en: 'Change your password to access your account.',
      'en-GB': 'Change your password to access your account.',
      fr: 'Changez votre mot de passe pour accéder à votre compte.',
      es: 'Cambie su contraseña para acceder a su cuenta.',
      de: 'Ändern Sie Ihr Passwort, um auf Ihr Konto zuzugreifen.',
      ja: 'アカウントにアクセスするためにパスワードを変更してください。',
      ko: '계정에 접근하기 위해 비밀번호를 변경하세요.',
      zh: '更改您的密码以访问您的帐户。',
      it: 'Cambia la tua password per accedere al tuo account.',
      pt: 'Altere sua senha para acessar sua conta.',
      hi: 'अपने खाते में पहुँचने के लिए अपना पासवर्ड बदलें।',
      ar: 'غيّر كلمة المرور الخاصة بك للوصول إلى حسابك.',
      ru: 'Измените ваш пароль, чтобы получить доступ к вашей учетной записи.',
    }),
  },
} satisfies DeclarationContent;

export default changePasswordContent;
