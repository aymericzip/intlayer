import { t, type Dictionary } from 'intlayer';

const docHeaderContent = {
  key: 'doc-header',
  content: {
    authorLabel: t({
      en: 'Author',
      fr: 'Auteur',
      ar: 'المؤلف',
      de: 'Autor',
      es: 'Autor',
      it: 'Autore',
      ja: '著者',
      ko: '작가',
      pt: 'Autor',
      ru: 'Автор',
      zh: '作者',
      'en-GB': 'Author',
      hi: 'Author',
    }),
    creationLabel: t({
      en: 'Creation',
      fr: 'Création',
      ar: 'إنشاء',
      de: 'Erstellung',
      es: 'Creación',
      it: 'Creazione',
      ja: '作成',
      ko: '생성',
      pt: 'Criação',
      ru: 'Создание',
      'en-GB': 'Creation',
      hi: 'Creation',
      zh: 'Creation',
    }),
    lastUpdateLabel: t({
      en: 'Last update',
      fr: 'Dernière mise à jour',
      'en-GB': 'Last update',
      hi: 'Last update',
      zh: 'Last update',
      ar: 'آخر تحديث',
      de: 'Letzte Aktualisierung',
      es: 'Última actualización',
      it: 'Ultimo aggiornamento',
      ja: '最終更新',
      ko: '마지막 업데이트',
      pt: 'Última atualização',
      ru: 'Последнее обновление',
    }),
  },
} satisfies Dictionary;

export default docHeaderContent;
