import { type Dictionary, t } from 'intlayer';

const paginationContent = {
  key: 'pagination',
  content: {
    goToNextPage: t({
      en: 'Go to next page',
      fr: 'Aller à la page suivante',
      es: 'Ir a la página siguiente',
      'en-GB': 'Go to next page',
      de: 'Zur nächsten Seite',
      ja: '次のページに移動',
      ko: '다음 페이지로 이동',
      zh: '转到下一页',
      it: 'Vai alla pagina successiva',
      pt: 'Ir para a página seguinte',
      hi: 'अगली पृष्ठ पर जाएं',
      ar: 'اذهب إلى الصفحة التالية',
      ru: 'Перейти к следующей странице',
      tr: 'Sonraki sayfaya git',
    }),
    goToPreviousPage: t({
      en: 'Go to previous page',
      fr: 'Aller à la page précédente',
      es: 'Ir a la página anterior',
      'en-GB': 'Go to previous page',
      de: 'Zur vorherigen Seite',
      ja: '前のページに移動',
      ko: '이전 페이지로 이동',
      zh: '转到上一页',
      it: 'Vai alla pagina precedente',
      pt: 'Ir para a página anterior',
      hi: 'पिछली पृष्ठ पर जाएं',
      ar: 'اذهب إلى الصفحة السابقة',
      ru: 'Перейти к предыдущей странице',
      tr: 'Önceki sayfaya git',
    }),
  },
} satisfies Dictionary;

export default paginationContent;
