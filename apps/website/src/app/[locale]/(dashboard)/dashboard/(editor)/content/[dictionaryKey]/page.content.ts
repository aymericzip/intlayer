import { t, type Dictionary } from 'intlayer';

const contentDashboardContent = {
  key: 'dictionary-dashboard-page',
  content: {
    title: t({
      en: 'Edit dictionary',
      'en-GB': 'Edit dictionary',
      fr: 'Modifier le dictionnaire',
      es: 'Editar diccionario',
      de: 'Wörterbuch bearbeiten',
      ja: '辞書を編集',
      ko: '사전 편집',
      zh: '编辑字典',
      it: 'Modifica dizionario',
      pt: 'Editar dicionário',
      hi: 'शब्दकोश संपादित करें',
      ar: 'تعديل القاموس',
      ru: 'Редактировать словарь',
    }),
  },
} satisfies Dictionary;

export default contentDashboardContent;
