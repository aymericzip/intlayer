import { type Dictionary, t } from 'intlayer';

const contentDashboardContent = {
  key: 'dictionary-dashboard-page',
  content: {
    title: t({
      ar: 'تعديل القاموس',
      de: 'Wörterbuch bearbeiten',
      en: 'Edit dictionary',
      'en-GB': 'Edit dictionary',
      es: 'Editar diccionario',
      fr: 'Modifier le dictionnaire',
      hi: 'शब्दकोश संपादित करें',
      it: 'Modifica dizionario',
      ja: '辞書を編集',
      ko: '사전 편집',
      pt: 'Editar dicionário',
      ru: 'Редактировать словарь',
      tr: 'Sözlüğü düzenle',
      zh: '编辑字典',
    }),
  },
} satisfies Dictionary;

export default contentDashboardContent;
