import { t, type Dictionary } from 'intlayer';

const translatedContentMessageContent = {
  key: 'translated-content-message',
  content: {
    message: t({
      en: 'The content of this page was translated using an AI.',
      fr: "Le contenu de cette page a été traduit à l'aide d'une IA.",
      es: 'El contenido de esta página ha sido traducido con una IA.',
      hi: 'इस पृष्ठ की सामग्री एक AI द्वारा अनुवादित की गई है।',
      ru: 'Содержимое этой страницы было переведено с помощью ИИ.',
      de: 'Der Inhalt dieser Seite wurde mit einer KI übersetzt.',
      pt: 'O conteúdo desta página foi traduzido com uma IA.',
      ja: 'このページのコンテンツはAIを使用して翻訳されました。',
      ko: '이 페이지의 콘텐츠는 AI를 사용하여 번역되었습니다.',
      zh: '此页面的内容已使用 AI 翻译。',
      ar: 'تمت ترجمة محتوى هذه الصفحة باستخدام الذكاء الاصطناعي.',
      'en-GB': 'The content of this page was translated using an AI.',
      it: "Il contenuto di questa pagina è stato tradotto con un'IA.",
    }),
    link: {
      content: t({
        en: 'See the last version of the original content in English',
        fr: 'Voir la dernière version du contenu original en anglais',
        es: 'Ver la última versión del contenido original en inglés',
        hi: 'अंग्रेजी में मूल सामग्री के अंतिम संस्करण देखें',
        ru: 'Смотреть последнюю версию оригинального контента на английском',
        de: 'Den englischen Originaltext ansehen',
        pt: 'Veja a última versão do conteúdo original em inglês',
        ja: '英語の元のコンテンツの最新バージョンを見る',
        ko: '영어 원본 내용의 최신 버전을 보기',
        zh: '查看英文原文的最新版本',
        it: "Vedi l'ultima versione del contenuto originale in inglese",
        ar: 'اعرض آخر نسخة المحتوى الأصلي باللغة الإنكليزية',
        'en-GB': 'See the last version of the original content in English',
      }),
      label: t({
        en: 'Click to change the language to English',
        fr: 'Cliquez pour changer la langue en anglais',
        es: 'Haga clic para cambiar el idioma a inglés',
        hi: 'अंग्रेजी में भाषा बदलने के लिए क्लिक करें',
        ru: 'Нажмите, чтобы сменить язык на английский',
        de: 'Klicken Sie hier, um die Sprache auf Englisch zu ändern',
        ja: '英語に言語を変更するにはクリックしてください',
        ko: '영어로 언어를 변경하려면 클릭하십시오',
        zh: '点击更改语言为英语',
        ar: 'انقر لتغيير اللغة إلى الإنكليزية',
        pt: 'Clique para alterar o idioma para inglês',
        'en-GB': 'Click to change the language to English',
        it: 'Fai clic per cambiare la lingua in inglese',
      }),
    },
  },
} satisfies Dictionary;

export default translatedContentMessageContent;
