import { type Dictionary, t } from 'intlayer';

const addPasskeySchemaContent = {
  key: 'add-passkey-schema',
  content: {
    nameInput: {
      error: t({
        en: 'Name is required',
        fr: 'Le nom est requis',
        es: 'El nombre es obligatorio',
        de: 'Name ist erforderlich',
        ja: '名前は必須です',
        ko: '이름은 필수입니다',
        zh: '姓名为必填项',
        it: 'Il nome è obbligatorio',
        pt: 'O nome é obrigatório',
        hi: 'नाम आवश्यक है',
        ar: 'الاسم مطلوب',
        ru: 'Имя обязательно',
        tr: 'İsim gereklidir',
        pl: 'Imię jest wymagane',
        nl: 'Naam is verplicht',
        id: 'Nama diperlukan',
        vi: 'Tên là bắt buộc',
        mi: 'Me hiahiatia te ingoa',
        'en-GB': 'Name is required',
      }),
    },
  },
} satisfies Dictionary;

export default addPasskeySchemaContent;
