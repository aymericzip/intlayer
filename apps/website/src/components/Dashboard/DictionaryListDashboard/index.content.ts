import { type Dictionary, t } from 'intlayer';

const dictionaryFormContent = {
  key: 'dictionary-list',
  content: {
    searchPlaceholder: t({
      en: 'Search for a dictionary',
      fr: 'Rechercher un dictionnaire',
      es: 'Buscar un diccionario',
      'en-GB': 'Search for a dictionary',
      de: 'Wörterbuch suchen',
      ja: '辞書を検索',
      ko: '사전 검색',
      zh: '搜索字典',
      it: 'Cerca un dizionario',
      pt: 'Pesquisar um dicionário',
      hi: 'शब्दकोश खोजें',
      ar: 'قاموس 검색',
      ru: 'Найти словарь',
      tr: 'Sözlük arama',
    }),

    selectDictionaryButton: {
      label: t({
        en: 'Click to select a dictionary',
        fr: 'Cliquez pour sélectionner un dictionnaire',
        es: 'Haga clic para seleccionar un diccionario',
        'en-GB': 'Click to select a dictionary',
        de: 'Klicken Sie, um ein Wörterbuch auszuwählen',
        ja: '辞書を選択するにはクリックしてください',
        ko: '사전을 선택하려면 클릭하세요',
        zh: '单击以选择字典',
        it: 'Clicca per selezionare un dizionario',
        pt: 'Clique para selecionar um dicionário',
        hi: 'शब्दकोश का चयन करने के लिए क्लिक करें',
        ar: 'اضغط لتحديد قاموس',
        ru: 'Нажмите, чтобы выбрать словарь',
        tr: 'Bir sözlük seçmek için tıklayın',
      }),
    },
  },
} satisfies Dictionary;

export default dictionaryFormContent;
