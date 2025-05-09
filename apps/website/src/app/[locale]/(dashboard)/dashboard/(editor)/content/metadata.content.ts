import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const metadataContent = {
  key: 'content-dashboard-metadata',
  content: {
    title: t({
      en: 'Content | Dashboard | Intlayer',
      'en-GB': 'Content | Dashboard | Intlayer',
      fr: 'Contenu | Tableau de bord | Intlayer',
      es: 'Contenido | Panel de control | Intlayer',
      de: 'Inhalt | Dashboard | Intlayer',
      ja: 'コンテンツ | ダッシュボード | Intlayer',
      ko: '콘텐츠 | 대시보드 | Intlayer',
      zh: '内容 | 仪表板 | Intlayer',
      it: 'Contenuto | Cruscotto | Intlayer',
      pt: 'Conteúdo | Painel | Intlayer',
      hi: 'सामग्री | डैशबोर्ड | Intlayer',
      ar: 'المحتوى | لوحة التحكم | Intlayer',
      ru: 'Контент | Приборная панель | Intlayer',
    }),
    description: t({
      en: 'Manage your content settings in the Intlayer dashboard. Edit, update, and configure your content to ensure it meets your standards.',
      'en-GB':
        'Manage your content settings in the Intlayer dashboard. Edit, update, and configure your content to ensure it meets your standards.',
      fr: 'Gérez les paramètres de votre contenu dans le tableau de bord Intlayer. Modifiez, mettez à jour et configurez votre contenu pour qu’il réponde à vos attentes.',
      es: 'Administra la configuración de tu contenido en el panel de control de Intlayer. Edita, actualiza y configura tu contenido para que cumpla con tus estándares.',
      de: 'Verwalten Sie Ihre Inhaltseinstellungen im Intlayer-Dashboard. Bearbeiten, aktualisieren und konfigurieren Sie Ihre Inhalte, um sicherzustellen, dass sie Ihren Standards entsprechen.',
      ja: 'Intlayerダッシュボードでコンテンツの設定を管理します。コンテンツを編集、更新、構成し、基準を満たすようにしてください。',
      ko: 'Intlayer 대시보드에서 콘텐츠 설정을 관리하세요. 콘텐츠를 편집, 업데이트 및 구성하여 기준에 부합하도록 하세요.',
      zh: '在Intlayer仪表板中管理您的内容设置。编辑、更新并配置您的内容，以确保它符合您的标准。',
      it: 'Gestisci le impostazioni dei tuoi contenuti nel dashboard di Intlayer. Modifica, aggiorna e configura i tuoi contenuti per assicurarti che rispettino gli standard.',
      pt: 'Gerencie as configurações do seu conteúdo no painel do Intlayer. Edite, atualize e configure seu conteúdo para garantir que ele atenda aos seus padrões.',
      hi: 'Intlayer डैशबोर्ड में अपनी सामग्री की सेटिंग्स प्रबंधित करें। अपनी सामग्री को संपादित, अपडेट और कॉन्फ़िगर करें ताकि यह आपके मानकों पर खरा उतरे।',
      ar: 'قم بإدارة إعدادات المحتوى الخاص بك في لوحة تحكم Intlayer. حرر وقم بتحديث وتكوين المحتوى الخاص بك لضمان مطابقته لمعاييرك.',
      ru: 'Управляйте настройками контента в панели инструментов Intlayer. Редактируйте, обновляйте и настраивайте контент, чтобы он соответствовал вашим стандартам.',
    }),
    keywords: t<string[]>({
      en: [
        'Content',
        'Settings',
        'Editor',
        'Management',
        'Updates',
        'Publishing',
      ],
      'en-GB': [
        'Content',
        'Settings',
        'Editor',
        'Management',
        'Updates',
        'Publishing',
      ],
      fr: [
        'Contenu',
        'Paramètres',
        'Éditeur',
        'Gestion',
        'Mises à jour',
        'Publication',
      ],
      es: [
        'Contenido',
        'Configuración',
        'Editor',
        'Gestión',
        'Actualizaciones',
        'Publicación',
      ],
      de: [
        'Inhalt',
        'Einstellungen',
        'Editor',
        'Verwaltung',
        'Aktualisierungen',
        'Veröffentlichung',
      ],
      ja: ['コンテンツ', '設定', 'エディター', '管理', '更新', '公開'],
      ko: ['콘텐츠', '설정', '편집기', '관리', '업데이트', '게시'],
      zh: ['内容', '设置', '编辑器', '管理', '更新', '发布'],
      it: [
        'Contenuto',
        'Impostazioni',
        'Editor',
        'Gestione',
        'Aggiornamenti',
        'Pubblicazione',
      ],
      pt: [
        'Conteúdo',
        'Configurações',
        'Editor',
        'Gestão',
        'Atualizações',
        'Publicação',
      ],
      hi: ['सामग्री', 'सेटिंग्स', 'एडीटर', 'प्रबंधन', 'अपडेट्स', 'प्रकाशन'],
      ar: ['المحتوى', 'الإعدادات', 'المحرر', 'الإدارة', 'التحديثات', 'النشر'],
      ru: [
        'Контент',
        'Настройки',
        'Редактор',
        'Управление',
        'Обновления',
        'Публикация',
      ],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
