import { type Dictionary, t } from 'intlayer';

export const stepsContent = {
  key: 'steps',
  content: {
    stepLabel: t({
      en: 'Step',
      'en-GB': 'Step',
      fr: 'Étape',
      es: 'Paso',
      de: 'Schritt',
      ja: 'ステップ',
      ko: '단계',
      zh: '步骤',
      it: 'Passo',
      pt: 'Passo',
      hi: 'चरण',
      ar: 'خطوة',
      ru: 'Шаг',
      tr: 'Adım',
      pl: 'Krok',
      id: 'Langkah',
      vi: 'Bước',
      uk: 'Крок',
    }),
    optionalLabel: t({
      en: 'Optional',
      'en-GB': 'Optional',
      fr: 'Facultatif',
      es: 'Opcional',
      de: 'Optional',
      ja: 'オプション',
      ko: '선택사항',
      zh: '可选',
      it: 'Opzionale',
      pt: 'Opcional',
      hi: 'वैकल्पिक',
      ar: 'اختياري',
      ru: 'Необязательно',
      tr: 'İsteğe bağlı',
      pl: 'Opcjonalne',
      id: 'Opsional',
      vi: 'Tùy chọn',
      uk: "Необов'язково",
    }),
  },
  title: 'Steps component',
  description:
    'Content declaration for the steps component, providing accessible labels for step headings and optional step badges.',
  tags: ['component', 'steps'],
} satisfies Dictionary;

export default stepsContent;
