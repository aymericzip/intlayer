import { type Dictionary, t } from 'intlayer';

const rightDrawerContent = {
  key: 'right-drawer',
  content: {
    goBack: t({
      en: 'Go back',
      'en-GB': 'Go back',
      ru: 'Назад',
      ja: '戻る',
      fr: 'Retour',
      ko: '뒤로',
      zh: '返回',
      es: 'Volver',
      de: 'Zurück',
      ar: 'رجوع',
      it: 'Indietro',
      pt: 'Voltar',
      hi: 'वापस जाएं',
      tr: 'Geri dön',
      pl: 'Wstecz',
      id: 'Kembali',
      vi: 'Quay lại',
      uk: 'Назад',
    }),
    closeDrawer: t({
      en: 'Close Drawer',
      'en-GB': 'Close Drawer',
      ru: 'Закрыть панель',
      ja: '引き出しを閉じる',
      fr: 'Fermer le tiroir',
      ko: '서랍 닫기',
      zh: '关闭抽屉',
      es: 'Cerrar cajón',
      de: 'Schublade schließen',
      ar: 'إغلاق الدرج',
      it: 'Chiudi cassetto',
      pt: 'Fechar gaveta',
      hi: 'दराज बंद करें',
      tr: 'Çekmeceyi kapat',
      pl: 'Zamknij szufladę',
      id: 'Tutup laci',
      vi: 'Đóng ngăn kéo',
      uk: 'Закрити бічну панель',
    }),
  },
  title: 'Right Drawer',
  description:
    'Localized UI strings for the Right Drawer component (labels: "Go back" and "Close Drawer").',
  tags: ['component', 'right-drawer', 'ui', 'localization'],
} satisfies Dictionary;

export default rightDrawerContent;
