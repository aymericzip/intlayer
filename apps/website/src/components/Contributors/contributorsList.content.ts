import type { Dictionary } from 'intlayer';
import { enu, t } from 'intlayer';

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
    }),
  },
} satisfies Dictionary;

export default contributorsListContent;
