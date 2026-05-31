import { type Dictionary, t } from 'intlayer';

const clickToOpenIframeContent = {
  key: 'click-to-open-iframe',
  content: {
    enter: t({
      en: 'Enter',
      'en-GB': 'Enter',
      fr: 'Entrée',
      es: 'Intro',
      de: 'Enter',
      it: 'Invio',
      pt: 'Enter',
      ru: 'Ввод',
      ja: 'Enter',
      ko: 'Enter',
      zh: '回车',
      ar: 'Enter',
      hi: 'Enter',
      tr: 'Enter',
      pl: 'Enter',
      id: 'Enter',
      vi: 'Enter',
      uk: 'Ввід',
    }),

    openIframe: t({
      en: 'Open iframe',
      'en-GB': 'Open iframe',
      fr: "Ouvrir l'iframe",
      es: 'Abrir iframe',
      de: 'Iframe öffnen',
      it: 'Apri iframe',
      pt: 'Abrir iframe',
      ru: 'Открыть iframe',
      ja: 'iframeを開く',
      ko: 'iframe 열기',
      zh: '打开 iframe',
      ar: 'فتح iframe',
      hi: 'iframe खोलें',
      tr: 'iframe aç',
      pl: 'Otwórz iframe',
      id: 'Buka iframe',
      vi: 'Mở iframe',
      uk: 'Відкрити iframe',
    }),
  },
} satisfies Dictionary;

export default clickToOpenIframeContent;
