import { type Dictionary, t } from 'intlayer';

const markdownPreviewContent = {
  key: 'markdown-preview',
  content: {
    title: t({
      ar: 'معاينة Markdown',
      de: 'Markdown-Vorschau',
      en: 'Markdown preview',
      'en-GB': 'Markdown preview',
      es: 'Vista previa de Markdown',
      fr: 'Aperçu Markdown',
      hi: 'Markdown पूर्वावलोकन',
      it: 'Anteprima Markdown',
      ja: 'Markdown プレビュー',
      ko: 'Markdown 미리보기',
      pt: 'Pré-visualização de Markdown',
      ru: 'Предпросмотр Markdown',
      tr: 'Markdown önizlemesi',
      zh: 'Markdown 预览',
      pl: 'Podgląd Markdown',
      id: 'Pratinjau Markdown',
      vi: 'Xem trước Markdown',
      uk: 'Попередній перегляд Markdown',
    }),
    unknownLoadError: t({
      ar: 'تعذّر تحميل Markdown.',
      de: 'Markdown konnte nicht geladen werden.',
      en: 'Could not load markdown.',
      'en-GB': 'Could not load markdown.',
      es: 'No se pudo cargar el Markdown.',
      fr: 'Impossible de charger le Markdown.',
      hi: 'Markdown लोड नहीं किया जा सका।',
      it: 'Impossibile caricare il Markdown.',
      ja: 'Markdown を読み込めませんでした。',
      ko: 'Markdown을 불러올 수 없습니다.',
      pt: 'Não foi possível carregar o Markdown.',
      ru: 'Не удалось загрузить Markdown.',
      tr: 'Markdown yüklenemedi.',
      zh: '无法加载 Markdown。',
      pl: 'Nie udało się wczytać Markdown.',
      id: 'Tidak dapat memuat Markdown.',
      vi: 'Không thể tải Markdown.',
      uk: 'Не вдалося завантажити Markdown.',
    }),
  },
  title: 'Markdown preview page copy',
  description:
    'UI strings for the remote Markdown preview (`/markdown?url=…`): page title and load errors.',
  tags: ['markdown', 'preview', 'i18n'],
} satisfies Dictionary;

export default markdownPreviewContent;
