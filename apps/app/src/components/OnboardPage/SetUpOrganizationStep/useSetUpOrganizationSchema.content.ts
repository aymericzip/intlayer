import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'set-up-organization-schema',
  content: {
    requiredErrorOrganizationId: t({
      en: 'Please select an organization',
      ar: 'يرجى اختيار منظمة',
      de: 'Bitte wählen Sie eine Organisation',
      'en-GB': 'Please select an organization',
      es: 'Por favor, seleccione una organización',
      fr: 'Veuillez sélectionner une organisation',
      'he-IL': 'אנא בחרו ארגון',
      hi: 'कृपया एक संगठन चुनें',
      id: 'Silakan pilih organisasi',
      it: "Seleziona un'organizzazione",
      ja: '組織を選択してください',
      ko: '조직을 선택해 주세요',
      pl: 'Proszę wybrać organizację',
      pt: 'Por favor, selecione uma organização',
      ru: 'Пожалуйста, выберите организацию',
      tr: 'Lütfen bir organizasyon seçin',
      uk: 'Будь ласка, виберіть організацію',
      vi: 'Vui lòng chọn một tổ chức',
      zh: '请选择一个组织',
    }),
  },
  title: 'Set up organization schema',
  description:
    'Validation schema for setting up an organization during the onboarding process. Ensures that an organization is selected before submitting the form.',
  tags: ['onboarding', 'form validation', 'organization setup'],
} satisfies Dictionary;

export default content;
