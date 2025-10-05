import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'set-up-organization-schema',
  content: {
    requiredErrorOrganizationId: t({
      en: 'Please select an organization',
      'en-GB': 'Please select an organization',
      fr: 'Veuillez sélectionner une organisation',
      es: 'Por favor, seleccione una organización',
      de: 'Bitte wählen Sie eine Organisation',
      ja: '組織を選択してください',
      ko: '조직을 선택해 주세요',
      zh: '请选择一个组织',
      it: "Seleziona un'organizzazione",
      pt: 'Por favor, selecione uma organização',
      hi: 'कृपया एक संगठन चुनें',
      ar: 'يرجى اختيار منظمة',
      ru: 'Пожалуйста, выберите организацию',
      tr: 'Lütfen bir organizasyon seçin',
    }),
  },
} satisfies Dictionary;

export default content;
