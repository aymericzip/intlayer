import { type Dictionary, t } from 'intlayer';

const terminalContent = {
  key: 'terminal',
  content: {
    closeTab: t({
      en: 'Close tab',
      fr: "Fermer l'onglet",
      es: 'Cerrar pestaña',
      'en-GB': 'Close tab',
      de: 'Tab schließen',
      ja: 'タブを閉じる',
      ko: '탭 닫기',
      zh: '关闭标签',
      it: 'Chiudi tab',
      pt: 'Fechar aba',
      hi: 'टैब बंद करें',
      ar: 'إغلاق التاب',
      ru: 'Закрыть вкладку',
      tr: 'Sekmeyi kapat',
      pl: 'Zamknij kartę',
      id: 'Tutup tab',
      vi: 'Đóng tab',
      uk: 'Закрити вкладку',
    }),
    terminalInput: t({
      en: 'Terminal input',
      fr: 'Entrée du terminal',
      es: 'Entrada del terminal',
      'en-GB': 'Terminal input',
      de: 'Terminaleingabe',
      ja: 'ターミナル入力',
      ko: '터미널 입력',
      zh: '终端输入',
      it: 'Input del terminale',
      pt: 'Entrada do terminal',
      hi: 'टर्मिनल इनपुट',
      ar: 'إدخال الترميز',
      ru: 'Ввод терминала',
      tr: 'Terminal girişi',
      pl: 'Wejście terminala',
      id: 'Masukan terminal',
      vi: 'Đầu vào terminal',
      uk: 'Ввід терміналу',
    }),
  },
  title: 'Terminal component content',
  description:
    "Localized content for the Terminal component, providing labels such as 'Close tab' and 'Terminal input'.",
  tags: ['component', 'terminal', 'ui', 'localization', 'labels'],
} satisfies Dictionary;

export default terminalContent;
