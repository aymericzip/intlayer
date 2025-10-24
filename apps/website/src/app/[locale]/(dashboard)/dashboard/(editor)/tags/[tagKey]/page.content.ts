import { type Dictionary, t } from 'intlayer';

const tagDashboardContent = {
  key: 'tag-dashboard-page',
  content: {
    title: t({
      en: 'Edit tag',
      fr: 'Modifier le tag',
      es: 'Editar tag',
      'en-GB': 'Edit tag',
      de: 'Tag bearbeiten',
      ja: 'タグを編集',
      ko: '태그 편집',
      zh: '编辑标签',
      it: 'Modifica tag',
      pt: 'Editar tag',
      hi: 'टैग संपादित करें',
      ar: 'تعديل الوسم',
      ru: 'Редактировать тег',
      tr: 'Etiketi düzenle',
      pl: 'Edytuj tag',
    }),
  },
  title: 'Tag editor dashboard page',
  description:
    'Content declaration for the tag editor page within the dashboard. It includes the page title for editing existing tags in the CMS interface.',
  tags: ['dashboard', 'tag editor', 'cms'],
} satisfies Dictionary;

export default tagDashboardContent;
