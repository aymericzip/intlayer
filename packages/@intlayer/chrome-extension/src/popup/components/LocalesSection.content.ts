import { type Dictionary, t } from 'intlayer';

const localesSectionContent = {
  key: 'locales-section',
  content: {
    empty: t({
      en: 'No locale signal found on this page.',
      'en-GB': 'No locale signal found on this page.',
      fr: 'Aucun indice de langue trouvé sur cette page.',
      es: 'No se encontró ninguna señal de idioma en esta página.',
      de: 'Auf dieser Seite wurde kein Sprachhinweis gefunden.',
      ja: 'このページにはロケールの手がかりが見つかりませんでした。',
      ko: '이 페이지에서 로케일 신호를 찾을 수 없습니다.',
      zh: '此页面未发现任何语言区域信号。',
      it: 'Nessun indizio di lingua trovato in questa pagina.',
      pt: 'Nenhum sinal de idioma encontrado nesta página.',
      hi: 'इस पेज पर कोई लोकेल संकेत नहीं मिला।',
      ar: 'لم يتم العثور على أي إشارة للغة في هذه الصفحة.',
      ru: 'На этой странице не найдено признаков локали.',
      tr: 'Bu sayfada dil sinyali bulunamadı.',
      pl: 'Na tej stronie nie znaleziono żadnych oznak języka.',
      id: 'Tidak ditemukan sinyal lokal di halaman ini.',
      vi: 'Không tìm thấy dấu hiệu ngôn ngữ nào trên trang này.',
      uk: 'На цій сторінці не знайдено ознак локалі.',
    }),
    urlLocalePrefix: t({
      en: 'URL locale prefix:',
      'en-GB': 'URL locale prefix:',
      fr: 'Préfixe de langue dans l’URL :',
      es: 'Prefijo de idioma en la URL:',
      de: 'Sprachpräfix in der URL:',
      ja: 'URL のロケール接頭辞:',
      ko: 'URL 로케일 접두사:',
      zh: 'URL 语言前缀：',
      it: 'Prefisso di lingua nell’URL:',
      pt: 'Prefixo de idioma na URL:',
      hi: 'URL लोकेल प्रीफ़िक्स:',
      ar: 'بادئة اللغة في الرابط:',
      ru: 'Префикс локали в URL:',
      tr: 'URL dil öneki:',
      pl: 'Prefiks języka w URL:',
      id: 'Prefiks lokal URL:',
      vi: 'Tiền tố ngôn ngữ trong URL:',
      uk: 'Префікс локалі в URL:',
    }),
  },
  title: 'Detected locales section',
  description:
    'Labels of the locales, URL prefix and locale storage entries detected on the inspected page.',
  tags: ['chrome-extension', 'popup'],
} satisfies Dictionary;

export default localesSectionContent;
