import { type Dictionary, insert, t } from 'intlayer';

const relatedPostsContent = {
  key: 'related-posts',
  fill: true,
  importMode: 'dynamic',
  content: {
    relatedPosts: t({
      en: 'Related Posts',
      'en-GB': 'Related Posts',
      fr: 'Articles similaires',
      es: 'Artículos relacionados',
      de: 'Ähnliche Beiträge',
      ja: '関連記事',
      ko: '관련 게시물',
      zh: '相关文章',
      it: 'Articoli correlati',
      pt: 'Artigos relacionados',
      hi: 'संबंधित पोस्ट',
      ar: 'مقالات ذات صلة',
      ru: 'Похожие сообщения',
      tr: 'İlgili Gönderiler',
      pl: 'Powiązane posty',
      id: 'Postingan Terkait',
      vi: 'Bài viết liên quan',
      uk: 'Схожі публікації',
    }),

    visitBlogTitle: insert(
      t({
        en: 'Visit blog - {{title}}',
        'en-GB': 'Visit blog - {{title}}',
        fr: 'Visiter le blog - {{title}}',
        es: 'Visitar el blog - {{title}}',
        de: 'Blog besuchen - {{title}}',
        ja: 'ブログへ - {{title}}',
        ko: '블로그 방문 - {{title}}',
        zh: '访问博客 - {{title}}',
        it: 'Visita il blog - {{title}}',
        pt: 'Visitar o blog - {{title}}',
        hi: 'ब्लॉग पर जाएँ - {{title}}',
        ar: 'زيارة المدونة - {{title}}',
        ru: 'Перейти в блог - {{title}}',
        tr: 'Blogu ziyaret et - {{title}}',
        pl: 'Odwiedź blog - {{title}}',
        id: 'Kunjungi blog - {{title}}',
        vi: 'Truy cập blog - {{title}}',
        uk: 'Відвідати блог - {{title}}',
      })
    ),
  },
} satisfies Dictionary;

export default relatedPostsContent;
