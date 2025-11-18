import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const contributorsListContent = {
  key: 'contributors-list',
  content: {
    label: t({
      en: 'contributions',
      fr: 'contributions',
      es: 'contribuciones',
      de: 'Beiträge',
      it: 'contributi',
      pt: 'contribuições',
      ru: 'вклады',
      ja: '貢献',
      ko: '기여',
      zh: '贡献',
      hi: 'योगदान',
      tr: 'katkılar',
      ar: 'مساهمات',
      'en-GB': 'contributions',
      pl: 'wkłady',
      id: 'kontribusi',
      vi: 'Đóng góp',
    }),
  },
  title: 'Contributors list',
  description:
    'Contains the declaration for the contributors list component, including display label and related textual elements for multilingual rendering.',
  tags: ['contributors', 'component content'],
} satisfies Dictionary;

export default contributorsListContent;
