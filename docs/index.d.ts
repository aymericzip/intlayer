declare module '@intlayer/docs' {
  enum DocsKeysEnum {
    introduction,
    how_works_intlayer,
    configuration,
    interest_of_intlayer,
    intlayer_cli,
    intlayer_editor,
    intlayer_with_create_react_app,
    intlayer_with_i18next,
    intlayer_with_nextjs_15,
    intlayer_with_nextjs_14,
    intlayer_with_nextjs_page_router,
    intlayer_with_vite_react,
    content_declaration__translation,
    content_declaration__enumeration,
    content_declaration__function_fetching,
    content_declaration__get_started,
    content_declaration__content_extention_customization,
    terms_of_service,
    privacy_notice,
    'package__express-intlayer__t',
    'package__next-intlayer__t',
    'package__next-intlayer__useDictionary',
    'package__next-intlayer__useIntlayer',
    'package__next-intlayer__useLocale',
    'package__react-intlayer__t',
    'package__react-intlayer__useDictionary',
    'package__react-intlayer__useIntlayer',
    'package__react-intlayer__useLocale',
  }

  export type DocsKeys = keyof typeof DocsKeysEnum;

  export function getDocs(lang: string): Docs;
  export function getDoc<T extends DocsKeys>(docName: T, lang: string): Docs[T];

  export type Docs = Record<DocsKeys, string>;
}
