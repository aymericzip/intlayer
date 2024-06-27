declare module '@intlayer/docs' {
  export enum DocsKeys {
    introduction,
    how_works_intlayer,
    configuration,
    interest_of_intlayer,
    intlayer_cli,
    intlayer_editor,
    intlayer_with_create_react_app,
    intlayer_with_i18n,
    intlayer_with_nextjs,
    intlayer_with_vite_react,
    content_declaration__declaration_watching,
    content_declaration__enumeration,
    content_declaration__function_fetching,
    content_declaration__get_started,
    content_declaration__nested_id,
    content_declaration__translation,
  }

  export function getDocs(lang: string): Docs;
  export function getDoc<T extends DocsKeys>(docName: T, lang: string): Docs[T];

  export type Docs = Record<DocsKeys, string>;
}
