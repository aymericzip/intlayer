import { type Dictionary, t } from 'intlayer';

const notFountContent = {
  key: 'not-found',
  content: {
    title: t({
      en: '404 - Page not found',
      'en-GB': '404 - Page not found',
      fr: '404 - Page non trouvée',
      es: '404 - Página no encontrada',
      de: '404 - Seite nicht gefunden',
      ja: '404 - ページが見つかりません',
      ko: '404 - 페이지를 찾을 수 없습니다',
      zh: '404 - 页面未找到',
      it: '404 - Pagina non trovata',
      pt: '404 - Página não encontrada',
      hi: '404 - पृष्ठ नहीं मिला',
      ar: '404 - الصفحة غير موجودة',
      ru: '404 - Страница не найдена',
      tr: '404 - Sayfa Bulunamadı',
      pl: '404 - Strona nie znaleziona',
    }),
    content: t({
      en: 'Page not found',
      'en-GB': 'Page not found',
      fr: 'Page non trouvée',
      es: 'Página no encontrada',
      de: 'Seite nicht gefunden',
      ja: 'ページが見つかりません',
      ko: '페이지를 찾을 수 없습니다',
      zh: '页面未找到',
      it: 'Pagina non trovata',
      pt: 'Página não encontrada',
      hi: 'पृष्ठ नहीं मिला',
      ar: 'الصفحة غير موجودة',
      ru: 'Страница не найдена',
      tr: 'Sayfa bulunamadı',
      pl: 'Strona nie znaleziona',
    }),
  },
  title: '404 page content',
  description:
    'Content displayed when a user visits a non-existing page. It informs the user that the requested page was not found.',
  tags: ['error page', '404 content'],
} satisfies Dictionary;

export default notFountContent;
