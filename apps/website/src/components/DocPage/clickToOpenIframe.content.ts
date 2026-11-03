import { type Dictionary, t } from 'intlayer';

const clickToOpenIframeContent = {
  key: 'click-to-open-iframe',
  content: {
    enter: t({
      en: 'Enter',
      ar: 'Enter',
      de: 'Enter',
      'en-GB': 'Enter',
      es: 'Intro',
      fr: 'Entrée',
      'he-IL': 'כניסה',
      hi: 'Enter',
      id: 'Enter',
      it: 'Invio',
      ja: 'Enter',
      ko: 'Enter',
      pl: 'Enter',
      pt: 'Enter',
      ru: 'Ввод',
      tr: 'Enter',
      uk: 'Ввід',
      vi: 'Enter',
      zh: '回车',
    }),

    openIframe: t({
      en: 'Open iframe',
      ar: 'فتح iframe',
      de: 'Iframe öffnen',
      'en-GB': 'Open iframe',
      es: 'Abrir iframe',
      fr: "Ouvrir l'iframe",
      'he-IL': 'פתיחת iframe',
      hi: 'iframe खोलें',
      id: 'Buka iframe',
      it: 'Apri iframe',
      ja: 'iframeを開く',
      ko: 'iframe 열기',
      pl: 'Otwórz iframe',
      pt: 'Abrir iframe',
      ru: 'Открыть iframe',
      tr: 'iframe aç',
      uk: 'Відкрити iframe',
      vi: 'Mở iframe',
      zh: '打开 iframe',
    }),
  },
} satisfies Dictionary;

export default clickToOpenIframeContent;
