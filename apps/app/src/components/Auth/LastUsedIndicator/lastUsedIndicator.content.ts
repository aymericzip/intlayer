import { type Dictionary, t } from 'intlayer';

const lastUsedIndicatorContent = {
  key: 'last-used-indicator',
  content: {
    label: t({
      en: 'Last used',
      fr: 'Dernière connexion',
      es: 'Último acceso',
      de: 'Zuletzt verwendet',
      ja: '前回使用',
      ko: '최근 사용',
      zh: '上次使用',
      it: 'Ultimo accesso',
      pt: 'Último acesso',
      hi: 'पिछली बार उपयोग किया गया',
      ar: 'آخر استخدام',
      ru: 'Последний вход',
      'en-GB': 'Last used',
      tr: 'Son kullanılan',
      pl: 'Ostatnio użyte',
      id: 'Terakhir digunakan',
      vi: 'Dùng gần nhất',
      uk: 'Останній вхід',
    }),
  },
  title: 'Last used login method indicator',
  description:
    'Label for the tag highlighting which authentication method the visitor used the last time they signed in.',
  tags: ['authentication', 'login', 'indicator'],
} satisfies Dictionary;

export default lastUsedIndicatorContent;
