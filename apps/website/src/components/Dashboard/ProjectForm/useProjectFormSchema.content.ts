import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'project-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a name for your project',
      'en-GB': 'Please enter a name for your project',
      fr: 'Veuillez saisir un nom pour votre projet',
      es: 'Por favor, ingrese un nombre para su proyecto',
      de: 'Bitte geben Sie einen Namen für Ihr Projekt ein',
      ja: 'プロジェクトの名前を入力してください',
      ko: '프로젝트의 이름을 입력하십시오',
      zh: '请为您的项目输入名称',
      it: 'Si prega di inserire un nome per il proprio progetto',
      pt: 'Por favor, insira um nome para o seu projeto',
      hi: 'कृपया अपने प्रोजेक्ट का नाम दर्ज करें',
      ar: 'يرجى إدخال اسم لمشروعك',
      ru: 'Пожалуйста, введите название вашего проекта',
      tr: 'Lütfen projeniz için bir isim girin',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid name for your project',
      'en-GB': 'Please enter a valid name for your project',
      fr: 'Veuillez saisir un nom valide pour votre projet',
      es: 'Por favor, ingrese un nombre válido para su proyecto',
      de: 'Bitte geben Sie einen gültigen Namen für Ihr Projekt ein',
      ja: 'プロジェクトの有効な名前を入力してください',
      ko: '유효한 프로젝트 이름을 입력하십시오',
      zh: '请输入项目的有效名称',
      it: 'Si prega di inserire un nome valido per il proprio progetto',
      pt: 'Por favor, insira um nome válido para o seu projeto',
      hi: 'कृपया अपने प्रोजेक्ट का एक वैध नाम दर्ज करें',
      ar: 'يرجى إدخال اسم صالح لمشروعك',
      ru: 'Пожалуйста, введите допустимое имя для вашего проекта',
      tr: 'Lütfen projeniz için geçerli bir isim girin',
    }),
  },
} satisfies Dictionary;

export default content;
