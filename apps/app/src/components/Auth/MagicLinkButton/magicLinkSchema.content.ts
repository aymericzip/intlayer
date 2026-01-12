import { type Dictionary, t } from 'intlayer';

const magicLinkSchemaContent = {
  key: 'magic-link-schema',
  content: {
    requiredErrorEmail: t({
      en: 'Email is required',
      fr: "L'adresse e-mail est requise",
      es: 'El correo electrónico es obligatorio',
      de: 'E-Mail ist erforderlich',
      ja: 'メールアドレスは必須です',
      ko: '이메일은 필수입니다',
      zh: '电子邮件为必填项',
      it: "L'email è obbligatoria",
      pt: 'O e-mail é obrigatório',
      hi: 'ईमेल आवश्यक है',
      ar: 'البريد الإلكتروني مطلوب',
      ru: 'Требуется электронная почта',
      'en-GB': 'Email is required',
      tr: 'E-posta gerekli',
      pl: 'E-mail jest wymagany',
      id: 'Email wajib diisi',
      vi: 'Email là bắt buộc',
      uk: 'Електронну адресу потрібно вказати',
    }),
    invalidTypeErrorEmail: t({
      en: 'Invalid email address',
      fr: 'Adresse e-mail invalide',
      es: 'Dirección de correo electrónico inválida',
      de: 'Ungültige E-Mail-Adresse',
      ja: '無効なメールアドレス',
      ko: '잘못된 이메일 주소',
      zh: '无效的电子邮件地址',
      it: 'Indirizzo email non valido',
      pt: 'Endereço de e-mail inválido',
      hi: 'अमान्य ईमेल पता',
      ar: 'عنوان البريد الإلكتروني غير صالح',
      ru: 'Неверный адрес электронной почты',
      'en-GB': 'Invalid email address',
      tr: 'Geçersiz e-posta adresi',
      pl: 'Nieprawidłowy adres e-mail',
      id: 'Alamat email tidak valid',
      vi: 'Địa chỉ email không hợp lệ',
      uk: 'Некоректна електронна адреса',
    }),
  },
  title: 'Magic link schema',
  description:
    'Validation messages for the Magic Link authentication form, including required email and invalid email error messages.',
  tags: ['auth', 'magic link', 'validation', 'email'],
} satisfies Dictionary;

export default magicLinkSchemaContent;
