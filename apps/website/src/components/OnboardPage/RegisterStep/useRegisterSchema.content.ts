import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'register-password-schema',
  content: {
    requiredErrorEmail: t({
      en: 'Please enter your email address',
      'en-GB': 'Please enter your email address',
      fr: 'Veuillez saisir votre adresse e-mail',
      es: 'Por favor, ingrese su dirección de correo electrónico',
      de: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
      ja: 'メールアドレスを入力してください',
      ko: '이메일 주소를 입력하세요',
      zh: '请输入您的电子邮件地址',
      it: 'Si prega di inserire il proprio indirizzo email',
      pt: 'Por favor, insira seu endereço de e-mail',
      hi: 'कृपया अपना ईमेल पता दर्ज करें',
      ar: 'يرجى إدخال عنوان بريدك الإلكتروني',
      ru: 'Пожалуйста, введите ваш адрес электронной почты',
      tr: 'Lütfen e-posta adresinizi girin',
      pl: 'Proszę podać adres e-mail',
    }),

    invalidTypeErrorEmail: t({
      en: 'Please enter a valid email address',
      'en-GB': 'Please enter a valid email address',
      fr: 'Veuillez saisir une adresse e-mail valide',
      es: 'Por favor, ingrese una dirección de correo electrónico válida',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      ja: '有効なメールアドレスを入力してください',
      ko: '유효한 이메일 주소를 입력하세요',
      zh: '请输入有效的电子邮件地址',
      it: 'Si prega di inserire un indirizzo email valido',
      pt: 'Por favor, insira um endereço de e-mail válido',
      hi: 'कृपया एक मान्य ईमेल पता दर्ज करें',
      ar: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      ru: 'Пожалуйста, введите действующий адрес электронной почты',
      tr: 'Lütfen geçerli bir e-posta adresi girin',
      pl: 'Proszę podać prawidłowy adres e-mail',
    }),
  },
  title: 'Register password schema',
  description:
    'Validation schema content for the password registration step, including user-friendly error messages for email input fields.',
  tags: ['form validation', 'registration', 'user onboarding'],
} satisfies Dictionary;

export default content;
