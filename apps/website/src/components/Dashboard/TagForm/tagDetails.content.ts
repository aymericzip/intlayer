import { t, type Dictionary } from 'intlayer';

const tagFormContent = {
  key: 'tag-details',
  content: {
    returnToTagList: {
      text: t({
        en: 'Return to tags list',
        fr: 'Retourner à la liste des tags',
        es: 'Volver a la lista de etiquetas',
        'en-GB': 'Return to tags list',
        de: 'Zur Tags-Liste zurückkehren',
        ja: 'タグリストに戻る',
        ko: '태그 목록으로 돌아가기',
        zh: '返回标签列表',
        it: 'Ritorna alla lista dei tag',
        pt: 'Retornar à lista de tags',
        hi: 'टैग सूची पर वापस जाएं',
        ar: 'العودة إلى قائمة الوسوم',
        ru: 'Вернуться к списку тегов',
      }),
      label: t({
        en: 'Click to return to tags list',
        fr: 'Cliquez pour retourner à la liste des tags',
        es: 'Haga clic para volver a la lista de etiquetas',
        'en-GB': 'Click to return to tags list',
        de: 'Klicken Sie, um zur Tags-Liste zurückzukehren',
        ja: 'タグリストに戻るにはクリックしてください',
        ko: '태그 목록으로 돌아가려면 클릭하세요',
        zh: '点击返回标签列表',
        it: 'Clicca per ritornare alla lista dei tag',
        pt: 'Clique para retornar à lista de tags',
        hi: 'टैग सूची पर वापस जाने के लिए क्लिक करें',
        ar: 'انقر للعودة إلى قائمة الوسوم',
        ru: 'Нажмите, чтобы вернуться к списку тегов',
      }),
    },

    detailsTitle: t({
      en: 'Tag details',
      'en-GB': 'Tag details',
      fr: 'Détails du tag',
      es: 'Detalles del tag',
      de: 'Tag-Details',
      ja: 'タグの詳細',
      ko: '태그 세부 정보',
      zh: '标签详情',
      it: 'Dettagli tag',
      pt: 'Detalhes da tag',
      hi: 'टैग विवरण',
      ar: 'تفاصيل الوسم',
      ru: 'Детали тега',
    }),

    dictionariesListTitle: t({
      en: 'Dictionaries associated with this tag',
      fr: 'Dictionnaires associés à ce tag',
      es: 'Diccionarios asociados con este tag',
      'en-GB': 'Dictionaries associated with this tag',
      de: 'Wörterbücher, die mit diesem Tag verbunden sind',
      ja: 'このタグに関連付けられた辞書',
      ko: '이 태그와 관련된 사전',
      zh: '与此标签相关的字典',
      it: 'Dizionari associati a questo tag',
      pt: 'Dicionários associados a este tag',
      hi: 'इस टैग के साथ संबंधित डिक्शन्स',
      ar: 'قاموس مرتبطة بهذا الوسم',
      ru: 'Словари, связанные с этим тегом',
    }),
  },
} satisfies Dictionary;

export default tagFormContent;
