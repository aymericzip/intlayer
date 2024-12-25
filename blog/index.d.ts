declare module '@intlayer/blog' {
  enum BlogKeysEnum {
    index,
    intlayer_with_i18next,
    internationalization_and_SEO,
  }

  export type DocsKeys = keyof typeof BlogKeysEnum;

  export function getBlogs(lang: string): Docs;
  export function getBlog<T extends DocsKeys>(
    docName: T,
    lang: string
  ): Docs[T];

  export type Docs = Record<DocsKeys, string>;
}
