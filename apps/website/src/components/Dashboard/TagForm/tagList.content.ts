import { t, type DeclarationContent } from 'intlayer';

const tagListContent = {
  key: 'tag-list',
  content: {
    noTagView: {
      title: t({
        en: 'No tag',
        fr: 'Aucun tag',
        es: 'Sin tag',
        'en-GB': 'No tag',
        de: 'Kein Tag',
        ja: 'タグなし',
        ko: '태그 없음',
        zh: '没有标签',
        it: 'Nessun tag',
        pt: 'Sem tag',
        hi: 'कोई टैग नहीं',
        ar: 'لا توجد وسم',
        ru: 'Нет тега',
      }),
      description: t({
        en: 'Create your first tag to indicate how AI can structure your content',
        fr: 'Créez votre premier tag pour indiquer comment l’IA peut structurer votre contenu',
        es: 'Cree su primer tag para indicar cómo la IA puede estructurar su contenido',
        'en-GB':
          'Create your first tag to indicate how AI can structure your content',
        de: 'Erstellen Sie Ihr erstes Tag, um anzugeben, wie die KI Ihren Inhalt strukturieren kann',
        ja: 'AIがコンテンツを構成する方法を示すために、最初のタグを作成してください',
        ko: 'AI가 콘텐츠를 구성하는 방법을 나타내는 첫 번째 태그를 만들어주세요',
        zh: '创建您的第一个标签，以指示 AI 如何构建您的内容',
        it: 'Crea il tuo primo tag per indicare come l’IA può strutturare il tuo contenuto',
        pt: 'Crie seu primeiro tag para indicar como a IA pode estruturar seu conteúdo',
        hi: 'अपनी सामग्री को AI कैसे संरचित कर सकती है इसे दिखाने के लिए अपना पहला टैग बनाएं',
        ar: 'أنشئ مشروعك الأول للبدء في استخدام Intlayer',
        ru: 'Создайте свой первый тег, чтобы показать, как ИИ может структурировать ваш контент',
      }),
    },

    createTagButton: {
      text: t({
        en: 'Create tag',
        fr: 'Créer un tag',
        es: 'Crear un tag',
        'en-GB': 'Create tag',
        de: 'Tag erstellen',
        ja: 'タグを作成',
        ko: '태그 만들기',
        zh: '创建标签',
        it: 'Crea tag',
        pt: 'Criar tag',
        hi: 'टैग बनाएँ',
        ar: 'إنشاء وسم',
        ru: 'Создать тег',
      }),
      ariaLabel: t({
        en: 'Click to create tag',
        fr: 'Cliquez pour créer un tag',
        es: 'Haga clic para crear un tag',
        'en-GB': 'Click to create tag',
        de: 'Klicken Sie, um ein Tag zu erstellen',
        ja: 'タグを作成するにはクリックしてください',
        ko: '태그를 만들려면 클릭하세요',
        zh: '点击创建标签',
        it: 'Clicca per creare il tag',
        pt: 'Clique para criar o tag',
        hi: 'टैग बनाने के लिए क्लिक करें',
        ar: 'انقر لإنشاء وسم',
        ru: 'Нажмите, чтобы создать тег',
      }),
    },
    tagList: {
      title: t({
        en: 'Tags list',
        fr: 'Liste des tags',
        es: 'Lista de tags',
        'en-GB': 'Tags list',
        de: 'Tags-Liste',
        ja: 'タグリスト',
        ko: '태그 목록',
        zh: '标签列表',
        it: 'Elenco dei tag',
        pt: 'Lista de tags',
        hi: 'टैग सूची',
        ar: 'قائمة الوسوم',
        ru: 'Список тегов',
      }),
    },
  },
} satisfies DeclarationContent;

export default tagListContent;