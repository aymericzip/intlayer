import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'new-members-form-schema',
  content: {
    emailError: t({
      en: 'Please enter a valid email address',
      ar: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      'en-GB': 'Please enter a valid email address',
      es: 'Por favor, introduzca una dirección de correo electrónico válida',
      fr: 'Veuillez entrer une adresse e-mail valide',
      'he-IL': 'אנא הזינו כתובת אימייל תקינה',
      hi: 'कृपया एक मान्य ईमेल पता दर्ज करें',
      id: 'Silakan masukkan alamat email yang valid',
      it: 'Inserisci un indirizzo email valido',
      ja: '有効なメールアドレスを入力してください',
      ko: '유효한 이메일 주소를 입력하세요',
      pl: 'Proszę podać prawidłowy adres e-mail.',
      pt: 'Por favor, insira um endereço de e-mail válido',
      ru: 'Пожалуйста, введите правильный адрес электронной почты',
      tr: 'Lütfen geçerli bir e-posta adresi girin',
      uk: 'Будь ласка, введіть дійсну адресу електронної пошти.',
      vi: 'Vui lòng nhập địa chỉ email hợp lệ',
      zh: '请输入有效的电子邮件地址',
    }),
  },
  title: 'New members form validation schema',
  description:
    'Validation error messages for the new members form, including input validation logic such as email format verification.',
  tags: ['form validation', 'dashboard', 'organization members'],
} satisfies Dictionary;

export default content;
