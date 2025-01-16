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
    'what_is_internationalization',
    'list_i18n_technologies__frameworks__angular',
    'list_i18n_technologies__frameworks__react',
    'list_i18n_technologies__frameworks__react-native',
    'list_i18n_technologies__frameworks__vue',
    'list_i18n_technologies__frameworks__svelte',
    'list_i18n_technologies__frameworks__flutter',
    'list_i18n_technologies__CMS__wordpress',
    'list_i18n_technologies__CMS__drupal',
    'list_i18n_technologies__CMS__wix',
  }

  export type DocsKeys = keyof typeof BlogKeysEnum;

  export function getBlogs(lang?: string): Docs;
  export function getBlog<T extends DocsKeys>(
    docName: T,
    lang?: string
  ): Docs[T];

  export type Docs = Record<DocsKeys, string>;
}
