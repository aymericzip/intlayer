import { t, type Dictionary } from 'intlayer';

const content = {
  key: 'organization-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a name for your organization',
      fr: 'Veuillez saisir un nom pour votre organisation',
      es: 'Por favor, ingrese un nombre para su organización',
      'en-GB': 'Please enter a name for your organization',
      de: 'Bitte geben Sie einen Namen für Ihre Organisation ein',
      ja: '組織名を入力してください',
      ko: '조직 이름을 입력해 주세요',
      zh: '请输入您的组织名称',
      it: 'Si prega di inserire un nome per la propria organizzazione',
      pt: 'Por favor, insira um nome para sua organização',
      hi: 'कृपया अपनी संगठन का नाम दर्ज करें',
      ar: 'يرجى إدخال اسم لمنظمتك',
      ru: 'Пожалуйста, введите название вашей организации',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid name for your organization',
      fr: 'Veuillez saisir un nom valide pour votre organisation',
      es: 'Por favor, ingrese un nombre válido para su organización',
      'en-GB': 'Please enter a valid name for your organization',
      de: 'Bitte geben Sie einen validen Namen für Ihre Organisation ein',
      ja: '有効な組織名を入力してください',
      ko: '유효한 조직 이름을 입력해 주세요',
      zh: '请输入有效的组织名称',
      it: 'Si prega di inserire un nome valido per la propria organizzazione',
      pt: 'Por favor, insira um nome válido para sua organização',
      hi: 'कृपया अपनी संगठन का एक मान्य नाम दर्ज करें',
      ar: 'يرجى إدخال اسم صالح لمنظمتك',
      ru: 'Пожалуйста, введите корректное название вашей организации',
    }),
  },
} satisfies Dictionary;
export default content;
