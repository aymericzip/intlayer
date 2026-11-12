import { type Dictionary, t } from 'intlayer';

const lastUsedIndicatorContent = {
  key: 'last-used-indicator',
  content: {
    label: t({
      en: 'Last used',
      ar: 'آخر استخدام',
      de: 'Zuletzt verwendet',
      'en-GB': 'Last used',
      es: 'Último acceso',
      fr: 'Dernière connexion',
      'he-IL': 'בשימוש אחרון',
      hi: 'पिछली बार उपयोग किया गया',
      id: 'Terakhir digunakan',
      it: 'Ultimo accesso',
      ja: '前回使用',
      ko: '최근 사용',
      pl: 'Ostatnio użyte',
      pt: 'Último acesso',
      ru: 'Последний вход',
      tr: 'Son kullanılan',
      uk: 'Останній вхід',
      vi: 'Dùng gần nhất',
      zh: '上次使用',
    }),
  },
  title: 'Last used login method indicator',
  description:
    'Label for the tag highlighting which authentication method the visitor used the last time they signed in.',
  tags: ['authentication', 'login', 'indicator'],
} satisfies Dictionary;

export default lastUsedIndicatorContent;
