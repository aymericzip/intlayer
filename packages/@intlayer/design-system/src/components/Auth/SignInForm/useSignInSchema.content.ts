import { type Dictionary, t } from 'intlayer';

export const signInSchemaContent = {
  key: 'sign-in-schema',
  content: {
    requiredErrorEmail: t({
      en: 'Please enter your username',
      'en-GB': 'Please enter your username',
      fr: 'Veuillez saisir votre nom d’utilisateur',
      es: 'Por favor, ingrese su nombre de usuario',
      de: 'Bitte geben Sie Ihren Benutzernamen ein',
      ja: 'ユーザー名を入力してください',
      ko: '사용자 이름을 입력해 주세요',
      zh: '请输入您的用户名',
      it: 'Per favore, inserisci il tuo nome utente',
      pt: 'Por favor, insira seu nome de usuário',
      hi: 'कृपया अपना उपयोगकर्ता नाम दर्ज करें',
      ar: 'يرجى إدخال اسم المستخدم الخاص بك',
      ru: 'Пожалуйста, введите ваше имя пользователя',
    }),

    invalidTypeErrorEmail: t({
      en: 'Please enter a valid username',
      'en-GB': 'Please enter a valid username',
      fr: 'Veuillez saisir un nom d’utilisateur valide',
      es: 'Por favor, ingrese un nombre de usuario válido',
      de: 'Bitte geben Sie einen gültigen Benutzernamen ein',
      ja: '有効なユーザー名を入力してください',
      ko: '유효한 사용자 이름을 입력해 주세요',
      zh: '请输入有效的用户名',
      it: 'Per favore, inserisci un nome utente valido',
      pt: 'Por favor, insira um nome de usuário válido',
      hi: 'कृपया एक मान्य उपयोगकर्ता नाम दर्ज करें',
      ar: 'يرجى إدخال اسم مستخدم صالح',
      ru: 'Пожалуйста, введите корректное имя пользователя',
    }),

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
    }),
  },
} satisfies Dictionary;

export default signInSchemaContent;
