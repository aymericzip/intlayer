import { t, type DeclarationContent } from 'intlayer';

const versionSwitcherContent = {
  key: 'version-switcher',
  content: {
    versionSwitcherLabel: t({
      en: 'Version selector',
      'en-GB': 'Version selector',
      fr: 'Sélecteur de version',
      es: 'Selector de versión',
      de: 'Version wähler',
      ja: 'バージョンセレクター',
      ko: '버전 선택기',
      zh: '版本选择器',
      it: 'Selettore di versione',
      pt: 'Seletor de versão',
      hi: 'संस्करण चयनकर्ता',
      ar: 'منتقي الإصدار',
      ru: 'Выбор версии',
    }),
    versionListLabel: t({
      en: 'Version list',
      'en-GB': 'Version list',
      fr: 'Liste des versions',
      es: 'Lista de versiones',
      de: 'Versionsliste',
      ja: 'バージョンリスト',
      ko: '버전 목록',
      zh: '版本列表',
      it: 'Elenco delle versioni',
      pt: 'Lista de versões',
      hi: 'संस्करण सूची',
      ar: 'قائمة الإصدارات',
      ru: 'Список версий',
    }),
    switchTo: t({
      en: 'Switch to',
      fr: 'Passer à',
      es: 'Cambiar a',
      'en-GB': 'Switch to',
      de: 'Wechseln Sie zu',
      ja: 'に切り替える',
      ko: '전환',
      zh: '切换到',
      it: 'Passa a',
      pt: 'Mudar para',
      hi: 'स्विच करें',
      ar: 'التبديل إلى',
      ru: 'Переключиться на',
    }),
  },
} satisfies DeclarationContent;

export default versionSwitcherContent;
