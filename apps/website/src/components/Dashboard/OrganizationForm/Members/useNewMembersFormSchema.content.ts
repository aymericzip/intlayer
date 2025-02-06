import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'new-members-form-schema',
  content: {
    emailError: t({
      en: 'Please enter a valid email address',
      fr: 'Veuillez entrer une adresse email valide',
      es: 'Por favor, introduzca una dirección de correo electrónico válida',
      'en-GB': 'Please enter a valid email address',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      ja: '有効なメールアドレスを入力してください',
      ko: '유효한 이메일 주소를 입력하세요',
      zh: '请输入有效的电子邮件地址',
      it: 'Si prega di inserire un indirizzo email valido',
      pt: 'Por favor, insira um endereço de e-mail válido',
      hi: 'कृपया एक मान्य ईमेल पता दर्ज करें',
      ar: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      ru: 'Пожалуйста, введите правильный адрес электронной почты',
    }),
  },
} satisfies Dictionary;

export default content;
