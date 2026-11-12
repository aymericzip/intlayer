import { type Dictionary, t } from 'intlayer';

export const breadCrumbContent = {
  key: 'breadcrumb',
  content: {
    linkLabel: t({
      en: 'Go to',
      ar: 'اذهب إلى',
      de: 'Gehe zu',
      'en-GB': 'Go to',
      es: 'Ir a',
      fr: 'Aller à',
      'he-IL': 'מעבר אל',
      hi: 'कर जाएं',
      id: 'Pergi ke',
      it: 'Vai a',
      ja: 'に移動',
      ko: '로 이동',
      pl: 'Przejdź do',
      pt: 'Ir para',
      ru: 'Перейти на',
      tr: 'Git',
      uk: 'Перейти до',
      vi: 'Đi tới',
      zh: '转到',
    }),
  },
  title: 'Breadcrumb navigation',
  description:
    "Content declaration for the breadcrumb component's navigation label, used to guide users through hierarchical structures within the interface.",
  tags: ['navigation', 'breadcrumb'],
} satisfies Dictionary;

export default breadCrumbContent;
