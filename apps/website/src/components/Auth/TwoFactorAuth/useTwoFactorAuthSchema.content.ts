import { type Dictionary, t } from 'intlayer';

export const twoFactorAuthSchemaContent = {
  key: 'two-factor-auth-schema',
  content: {
    requiredErrorPassword: t({
      en: 'Please enter your password',
      'en-GB': 'Please enter your password',
      fr: 'Veuillez saisir votre mot de passe',
      es: 'Por favor, ingrese su contraseña',
      de: 'Bitte geben Sie Ihr Passwort ein',
      ja: 'パスワードを入力してください',
      ko: '비밀번호를 입력해 주세요',
      zh: '请您输入密码',
      it: 'Si prega di inserire la password',
      pt: 'Por favor, insira sua senha',
      hi: 'कृपया अपना पासवर्ड दर्ज करें',
      ar: 'يرجى إدخال كلمة المرور الخاصة بك',
      ru: 'Пожалуйста, введите ваш пароль',
      tr: 'Lütfen şifrenizi girin',
      pl: 'Proszę podać hasło',
      id: 'Silakan masukkan password Anda',
      vi: 'Vui lòng nhập password',
    }),

    invalidTypeErrorPassword: t({
      en: 'Please enter a valid password',
      'en-GB': 'Please enter a valid password',
      fr: 'Veuillez saisir un mot de passe valide',
      es: 'Por favor, ingrese una contraseña válida',
      de: 'Bitte geben Sie ein gültiges Passwort ein',
      ja: '有効なパスワードを入力してください',
      ko: '유효한 비밀번호를 입력해 주세요',
      zh: '请输入有效的密码',
      it: 'Per favore, inserisci una password valida',
      pt: 'Por favor, insira uma senha válida',
      hi: 'कृपया एक मान्य पासवर्ड दर्ज करें',
      ar: 'يرجى إدخال كلمة مرور صالحة',
      ru: 'Пожалуйста, введите корректный пароль',
      tr: 'Lütfen geçerli bir şifre girin',
      pl: 'Proszę podać poprawne hasło',
      id: 'Silakan masukkan password yang valid',
      vi: 'Vui lòng nhập một password hợp lệ',
    }),
  },
  title: 'Two-factor authentication form validation schema',
  description:
    'Validation messages for the two-factor authentication form, including required and type errors for password field.',
  tags: ['form validation', 'authentication', 'two-factor'],
} satisfies Dictionary;

export default twoFactorAuthSchemaContent;
