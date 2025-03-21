import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const metadataContent = {
  key: 'dashboard-not-found-metadata',
  content: {
    title: t({
      en: '404 - Page Not Found | Intlayer',
      'en-GB': '404 - Page Not Found | Intlayer',
      fr: '404 - Page Non Trouvée | Intlayer',
      es: '404 - Página No Encontrada | Intlayer',
      de: '404 - Seite Nicht Gefunden | Intlayer',
      ja: '404 - ページが見つかりません | Intlayer',
      ko: '404 - 페이지를 찾을 수 없습니다 | Intlayer',
      zh: '404 - 找不到页面 | Intlayer',
      it: '404 - Pagina Non Trovata | Intlayer',
      pt: '404 - Página Não Encontrada | Intlayer',
      hi: '404 - पृष्ठ नहीं मिला | Intlayer',
      ar: '404 - الصفحة غير موجودة | Intlayer',
      ru: '404 - Страница Не Найдена | Intlayer',
    }),
    description: t({
      en: 'Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Navigate back to our homepage or use the search function to find what you need.',
      'en-GB':
        'Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Navigate back to our homepage or use the search function to find what you need.',
      fr: "Oups ! La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible. Retournez à notre page d'accueil ou utilisez la fonction de recherche pour trouver ce dont vous avez besoin.",
      es: '¡Ups! La página que estás buscando puede haber sido eliminada, cambiado de nombre o estar temporalmente no disponible. Vuelve a la página principal o utiliza la función de búsqueda para encontrar lo que necesitas.',
      de: 'Oops! Die Seite, die Sie suchen, wurde möglicherweise entfernt, hat ihren Namen geändert oder ist vorübergehend nicht verfügbar. Navigieren Sie zurück zu unserer Homepage oder verwenden Sie die Suchfunktion, um zu finden, was Sie benötigen.',
      ja: 'おっと！お探しのページが削除されたか、名前が変更されたか、一時的に利用できない可能性があります。ホームページに戻るか、検索機能を使用して必要なものを見つけてください。',
      ko: '죄송합니다! 찾고 있는 페이지가 삭제되었거나 이름이 변경되었거나 일시적으로 사용할 수 없습니다. 홈페이지로 돌아가거나 검색 기능을 사용하여 필요한 정보를 찾으세요.',
      zh: '抱歉！您要找的页面可能已被删除、更改名称或暂时无法使用。请返回我们的主页或使用搜索功能寻找您所需的内容。',
      it: 'Ops! La pagina che stai cercando potrebbe essere stata rimossa, aver cambiato nome o essere temporaneamente non disponibile. Torna alla nostra homepage o utilizza la funzione di ricerca per trovare ciò di cui hai bisogno.',
      pt: 'Ops! A página que você está procurando pode ter sido removida, ter seu nome alterado ou estar temporariamente indisponível. Volte para nossa página inicial ou use a função de busca para encontrar o que precisa.',
      hi: 'अरे! जिस पृष्ठ की आप तलाश कर रहे हैं वह शायद हटा दिया गया है, इसका नाम बदल गया है, या अस्थायी रूप से अनुपलब्ध है। हमारे होमपेज पर वापस जाएँ या जो आपको चाहिए उसे खोजने के लिए खोज कार्यक्षमता का उपयोग करें।',
      ar: 'عذرًا! قد تكون الصفحة التي تبحث عنها قد أزيلت، أو تغير اسمها، أو أنها غير متاحة مؤقتًا. عد إلى صفحتنا الرئيسية أو استخدم وظيفة البحث للعثور على ما تحتاجه.',
      ru: 'Упс! Возможно, запрашиваемая вами страница была удалена, ее имя изменено или она временно недоступна. Вернитесь на нашу главную страницу или используйте функцию поиска, чтобы найти то, что вам нужно.',
    }),

    keywords: t<string[]>({
      en: [
        '404 error',
        'page not found',
        'error',
        'Intlayer',
        'JavaScript',
        'React',
        'web development',
        'i18n',
      ],
      'en-GB': [
        '404 error',
        'page not found',
        'error',
        'Intlayer',
        'JavaScript',
        'React',
        'web development',
        'i18n',
      ],
      fr: [
        'erreur 404',
        'page non trouvée',
        'erreur',
        'Intlayer',
        'JavaScript',
        'React',
        'développement web',
        'i18n',
      ],
      es: [
        'error 404',
        'página no encontrada',
        'error',
        'Intlayer',
        'JavaScript',
        'React',
        'desarrollo web',
        'i18n',
      ],
      de: [
        '404 Fehler',
        'Seite nicht gefunden',
        'Fehler',
        'Intlayer',
        'JavaScript',
        'React',
        'Webentwicklung',
        'i18n',
      ],
      ja: [
        '404エラー',
        'ページが見つかりません',
        'エラー',
        'Intlayer',
        'JavaScript',
        'React',
        'ウェブ開発',
        'i18n',
      ],
      ko: [
        '404 오류',
        '페이지를 찾을 수 없습니다',
        '오류',
        'Intlayer',
        'JavaScript',
        'React',
        '웹 개발',
        'i18n',
      ],
      zh: [
        '404错误',
        '找不到页面',
        '错误',
        'Intlayer',
        'JavaScript',
        'React',
        '网页开发',
        'i18n',
      ],
      it: [
        'errore 404',
        'pagina non trovata',
        'errore',
        'Intlayer',
        'JavaScript',
        'React',
        'sviluppo web',
        'i18n',
      ],
      pt: [
        'erro 404',
        'página não encontrada',
        'erro',
        'Intlayer',
        'JavaScript',
        'React',
        'desenvolvimento web',
        'i18n',
      ],
      hi: [
        '404 त्रुटि',
        'पृष्ठ नहीं मिला',
        'त्रुटि',
        'Intlayer',
        'JavaScript',
        'React',
        'वेब विकास',
        'i18n',
      ],
      ar: [
        'خطأ 404',
        'الصفحة غير موجودة',
        'خطأ',
        'Intlayer',
        'JavaScript',
        'React',
        'تطوير الويب',
        'i18n',
      ],
      ru: [
        'ошибка 404',
        'страница не найдена',
        'ошибка',
        'Intlayer',
        'JavaScript',
        'React',
        'веб-разработка',
        'i18n',
      ],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
