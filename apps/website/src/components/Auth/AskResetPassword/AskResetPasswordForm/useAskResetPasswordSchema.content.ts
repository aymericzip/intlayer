import { type Dictionary, t } from 'intlayer';

export const useAskResetPasswordSchemaContent = {
  key: 'ask-reset-password-schema',
  content: {
    requiredErrorEmail: t({
      ar: 'يرجى إدخال عنوان بريدك الإلكتروني',
      de: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
      en: 'Please enter your email address',
      'en-GB': 'Please enter your email address',
      es: 'Por favor, ingrese su dirección de correo electrónico',
      fr: 'Veuillez saisir votre adresse e-mail',
      hi: 'कृपया अपना ईमेल पता डालें',
      it: 'Si prega di inserire il proprio indirizzo email',
      ja: 'メールアドレスを入力してください',
      ko: '이메일 주소를 입력하십시오',
      pt: 'Por favor, insira seu endereço de e-mail',
      ru: 'Пожалуйста, введите свой адрес электронной почты',
      tr: 'Lütfen e-posta adresinizi girin',
      zh: '请输入您的电子邮件地址',
    }),

    invalidTypeErrorEmail: t({
      ar: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      en: 'Please enter a valid email address',
      'en-GB': 'Please enter a valid email address',
      es: 'Por favor, ingrese una dirección de correo electrónico válida',
      fr: 'Veuillez saisir une adresse e-mail valide',
      hi: 'कृपया एक वैध ईमेल पता दर्ज करें',
      it: 'Si prega di inserire un indirizzo email valido',
      ja: '有効なメールアドレスを入力してください',
      ko: '유효한 이메일 주소를 입력하십시오',
      pt: 'Por favor, insira um endereço de e-mail válido',
      ru: 'Пожалуйста, введите действующий адрес электронной почты',
      tr: 'Lütfen geçerli bir e-posta adresi girin',
      zh: '请输入有效的电子邮件地址',
    }),

    invalidLengthErrorEmail: t({
      ar: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      en: 'Please enter a valid email address',
      'en-GB': 'Please enter a valid email address',
      es: 'Por favor, ingrese una dirección de correo electrónico válida',
      fr: 'Veuillez saisir une adresse e-mail valide',
      hi: 'कृपया एक वैध ईमेल पता दर्ज करें',
      it: 'Si prega di inserire un indirizzo email valido',
      ja: '有効なメールアドレスを入力してください',
      ko: '유효한 이메일 주소를 입력하십시오',
      pt: 'Por favor, insira um endereço de e-mail válido',
      ru: 'Пожалуйста, введите действующий адрес электронной почты',
      tr: 'Lütfen geçerli bir e-posta adresi girin',
      zh: '请输入有效的电子邮件地址',
    }),
  },
} satisfies Dictionary;

export default useAskResetPasswordSchemaContent;
