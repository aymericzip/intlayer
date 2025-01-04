declare module '@intlayer/blog' {
  enum BlogKeysEnum {
    index,
    internationalization_and_SEO,
    'intlayer_with_next-i18next',
    'intlayer_with_next-intl',
    'intlayer_with_react-i18next',
    'intlayer_with_react-intl',
    'next-i18next_vs_next-intl_vs_intlayer',
    'react-i18next_vs_react-intl_vs_intlayer',
  }

  export type DocsKeys = keyof typeof BlogKeysEnum;

  export function getBlogs(lang?: string): Docs;
  export function getBlog<T extends DocsKeys>(
    docName: T,
    lang?: string
  ): Docs[T];

  export type Docs = Record<DocsKeys, string>;
}
