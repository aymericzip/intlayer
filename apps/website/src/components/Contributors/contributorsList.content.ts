import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const contributorsListContent = {
  key: 'contributors-list',
  content: {
    label: t({
      en: 'contributions',
      ar: 'مساهمات',
      de: 'Beiträge',
      'en-GB': 'contributions',
      es: 'contribuciones',
      fr: 'contributions',
      'he-IL': 'תרומות',
      hi: 'योगदान',
      id: 'kontribusi',
      it: 'contributi',
      ja: '貢献',
      ko: '기여',
      pl: 'wkłady',
      pt: 'contribuições',
      ru: 'вклады',
      tr: 'katkılar',
      uk: 'внески',
      vi: 'Đóng góp',
      zh: '贡献',
    }),
  },
  title: 'Contributors list',
  description:
    'Contains the declaration for the contributors list component, including display label and related textual elements for multilingual rendering.',
  tags: ['contributors', 'component content'],
} satisfies Dictionary;

export default contributorsListContent;
