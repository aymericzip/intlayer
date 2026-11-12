import { type Dictionary, t } from 'intlayer';

const addPasskeySchemaContent = {
  key: 'add-passkey-schema',
  content: {
    nameInput: {
      error: t({
        en: 'Name is required',
        ar: 'الاسم مطلوب',
        de: 'Name ist erforderlich',
        'en-GB': 'Name is required',
        es: 'El nombre es obligatorio',
        fr: 'Le nom est requis',
        'he-IL': 'נדרש שם',
        hi: 'नाम आवश्यक है',
        id: 'Nama diperlukan',
        it: 'Il nome è obbligatorio',
        ja: '名前は必須です',
        ko: '이름은 필수입니다',
        mi: 'Me hiahiatia te ingoa',
        nl: 'Naam is verplicht',
        pl: 'Imię jest wymagane',
        pt: 'O nome é obrigatório',
        ru: 'Имя обязательно',
        tr: 'İsim gereklidir',
        uk: "Назва обов'язкова",
        vi: 'Tên là bắt buộc',
        zh: '姓名为必填项',
      }),
    },
  },
  title: 'Add passkey schema',
  description:
    'Validation messages for the add passkey form. Contains error text for the name input when it is missing.',
  tags: ['auth', 'form', 'validation', 'passkey', 'component'],
} satisfies Dictionary;

export default addPasskeySchemaContent;
