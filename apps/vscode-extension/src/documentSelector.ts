/** Source languages whose files may use dictionaries. */
const SOURCE_LANGUAGES = [
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact',
  'vue',
  'svelte',
  'astro',
  'html',
];

/** Languages the LSP server is registered for. */
export const LSP_LANGUAGES = new Set([...SOURCE_LANGUAGES, 'yaml', 'markdown']);

/** Languages the extension-side providers answer for (content files too). */
const PROVIDER_LANGUAGES = [...LSP_LANGUAGES, 'json', 'jsonc', 'json5'];

/** Plain filters: assignable to both the VS Code and LSP client selectors. */
type FileDocumentFilter = { language: string; scheme: 'file' };

const toFileSelector = (languages: Iterable<string>): FileDocumentFilter[] =>
  [...languages].map((language) => ({ language, scheme: 'file' }));

export const LSP_DOCUMENT_SELECTOR = toFileSelector(LSP_LANGUAGES);

export const PROVIDER_DOCUMENT_SELECTOR = toFileSelector(PROVIDER_LANGUAGES);
