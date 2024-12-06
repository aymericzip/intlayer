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
    intlayer_with_nextjs_14,
    intlayer_with_nextjs_15,
    intlayer_with_express,
    intlayer_with_vite_react,
    content_declaration__content_extention_customization,
    content_declaration__enumeration,
    content_declaration__function_fetching,
    content_declaration__get_started,
    content_declaration__translation,
    terms_of_service,
    privacy_notice,
    't_express-intlayer',
    't_react-intlayer',
    'useLocale_react-intlayer',
    'useDictionary_react-intlayer',
    'useIntlayer_react-intlayer',
    't_next-intlayer',
    'useLocale_next-intlayer',
    'useDictionary_next-intlayer',
    'useIntlayer_next-intlayer',
  }

  export type DocsKeys = keyof typeof DocsKeysEnum;

  export function getDocs(lang: string): Docs;
  export function getDoc<T extends DocsKeys>(docName: T, lang: string): Docs[T];

  export type Docs = Record<DocsKeys, string>;
}
