import { Locales } from '@intlayer/config';
import * as _docEntries from './docEntries';
import { getAbsolutePath, getFileContent } from './fs';
import { localeObject, LocalesListTypeKeys } from './localeList';

const getMultilingualDocsPath = (
  docPath: string
): Record<LocalesListTypeKeys, string> =>
  Object.keys(localeObject).reduce(
    (acc, locale) => {
      acc[locale as LocalesListTypeKeys] = `../../${locale}/${docPath}.md`;
      return acc;
    },
    {} as Record<LocalesListTypeKeys, string>
  );

const docs: Record<string, Record<LocalesListTypeKeys, string>> = {
  introduction: getMultilingualDocsPath(`introduction`),
  configuration: getMultilingualDocsPath(`configuration`),
  interest_of_intlayer: getMultilingualDocsPath(`interest_of_intlayer`),
  intlayer_cli: getMultilingualDocsPath(`intlayer_cli`),
  intlayer_editor: getMultilingualDocsPath(`intlayer_editor`),
  intlayer_with_create_react_app: getMultilingualDocsPath(
    `intlayer_with_create_react_app`
  ),
  how_works_intlayer: getMultilingualDocsPath(`how_works_intlayer`),
  intlayer_with_i18next: getMultilingualDocsPath(`intlayer_with_i18next`),
  intlayer_with_nextjs_14: getMultilingualDocsPath(`intlayer_with_nextjs_14`),
  intlayer_with_nextjs_15: getMultilingualDocsPath(`intlayer_with_nextjs_15`),
  intlayer_with_nextjs_page_router: getMultilingualDocsPath(
    `intlayer_with_nextjs_page_router`
  ),
  intlayer_with_express: getMultilingualDocsPath(`intlayer_with_express`),
  intlayer_with_vite_react: getMultilingualDocsPath(`intlayer_with_vite+react`),
  content_declaration__translation: getMultilingualDocsPath(
    `content_declaration/translation`
  ),
  content_declaration__enumeration: getMultilingualDocsPath(
    `content_declaration/enumeration`
  ),
  content_declaration__function_fetching: getMultilingualDocsPath(
    `content_declaration/function_fetching`
  ),
  content_declaration__get_started: getMultilingualDocsPath(
    `content_declaration/get_started`
  ),
  content_declaration__content_extention_customization: getMultilingualDocsPath(
    `content_declaration/content_extention_customization`
  ),
  terms_of_service: getMultilingualDocsPath(`terms_of_service`),
  privacy_notice: getMultilingualDocsPath(`privacy_notice`),
  't_express-intlayer': getMultilingualDocsPath(`packages/express-intlayer/t`),
  't_react-intlayer': getMultilingualDocsPath(`packages/react-intlayer/t`),
  'useIntlayer_react-intlayer': getMultilingualDocsPath(
    `packages/react-intlayer/useIntlayer`
  ),
  'useDictionary_react-intlayer': getMultilingualDocsPath(
    `packages/react-intlayer/useDictionary`
  ),
  'useLocale_react-intlayer': getMultilingualDocsPath(
    `packages/react-intlayer/useLocale`
  ),
  't_next-intlayer': getMultilingualDocsPath(`packages/next-intlayer/t`),
  'useIntlayer_next-intlayer': getMultilingualDocsPath(
    `packages/next-intlayer/useIntlayer`
  ),
  'useDictionary_next-intlayer': getMultilingualDocsPath(
    `packages/next-intlayer/useDictionary`
  ),
  'useLocale_next-intlayer': getMultilingualDocsPath(
    `packages/next-intlayer/useLocale`
  ),
};

export type DocsKeys = keyof typeof docs;

export const getDocs = (lang: Locales) =>
  Object.fromEntries(
    Object.entries(docs).map(([key, value]) => [
      key,
      getFileContent(getAbsolutePath(value[lang as LocalesListTypeKeys])),
    ])
  );

export const getDoc = (docName: DocsKeys, lang: Locales) =>
  getFileContent(
    getAbsolutePath(docs[docName]?.[lang as LocalesListTypeKeys])
  ) ?? '';