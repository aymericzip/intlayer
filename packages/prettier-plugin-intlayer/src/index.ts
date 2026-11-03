import type { Parser, ParserOptions, Plugin, SupportOptions } from 'prettier';
import { parsers as acornParsers } from 'prettier/plugins/acorn';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { parsers as flowParsers } from 'prettier/plugins/flow';
import { parsers as meriyahParsers } from 'prettier/plugins/meriyah';
import { parsers as typescriptParsers } from 'prettier/plugins/typescript';
import { collapseIdenticalTranslationsInAst } from './collapseTranslations';
import { isContentFile, sortContentKeysInAst } from './sortContentKeys';
import { sortContentNodesInAst } from './sortContentNodes';

export { collapseIdenticalTranslationsInAst } from './collapseTranslations';
export {
  createLocaleComparator,
  orderAlphabetically,
  orderEnumerationConditions,
  orderPluralCategories,
  orderSelectCases,
  PLURAL_CATEGORY_ORDER,
} from './keyOrderings';
export { isContentFile, sortContentKeysInAst } from './sortContentKeys';
export { sortContentNodesInAst } from './sortContentNodes';

/** Locales kept at the top of every translation when none are configured. */
export const DEFAULT_PINNED_LOCALES = ['en'] as const;

type IntlayerPluginOptions = ParserOptions & {
  intlayerPinnedLocales?: string[];
  intlayerSortContentKeys?: boolean;
  intlayerCollapseIdenticalTranslations?: boolean;
};

const readPinnedLocales = (options: ParserOptions): readonly string[] =>
  (options as IntlayerPluginOptions).intlayerPinnedLocales ??
  DEFAULT_PINNED_LOCALES;

/** Wraps a built-in parser so the parsed AST gets its content nodes sorted. */
const withSortedTranslations = <AstType>(
  parser: Parser<AstType>
): Parser<AstType> => ({
  ...parser,
  parse: async (text, options) => {
    const ast = await parser.parse(text, options);
    const pluginOptions = options as IntlayerPluginOptions;
    const isContentDeclaration = isContentFile(options.filepath);

    if (
      pluginOptions.intlayerCollapseIdenticalTranslations !== false &&
      isContentDeclaration
    ) {
      collapseIdenticalTranslationsInAst(ast);
    }

    sortContentNodesInAst(ast, readPinnedLocales(options));

    if (pluginOptions.intlayerSortContentKeys && isContentDeclaration) {
      sortContentKeysInAst(ast);
    }

    return ast;
  },
});

const wrapParsers = (
  sourceParsers: Record<string, Parser>,
  parserNames: readonly string[]
): Record<string, Parser> =>
  Object.fromEntries(
    parserNames.map((parserName) => [
      parserName,
      withSortedTranslations(sourceParsers[parserName]),
    ])
  );

export const parsers: Plugin['parsers'] = {
  ...wrapParsers(babelParsers, [
    'babel',
    'babel-flow',
    'babel-ts',
    'json',
    'json5',
    'jsonc',
  ]),
  ...wrapParsers(typescriptParsers, ['typescript']),
  ...wrapParsers(acornParsers, ['acorn', 'espree']),
  ...wrapParsers(flowParsers, ['flow']),
  ...wrapParsers(meriyahParsers, ['meriyah']),
};

export const options: SupportOptions = {
  intlayerPinnedLocales: {
    type: 'string',
    array: true,
    category: 'Intlayer',
    default: [{ value: [...DEFAULT_PINNED_LOCALES] }],
    description:
      'Locales kept first, in this order, in every t() translation. The other locales are sorted alphabetically.',
  },
  intlayerCollapseIdenticalTranslations: {
    type: 'boolean',
    category: 'Intlayer',
    default: true,
    description:
      "In .content files, replace a t() whose locales all hold the same string by that string: t({ en: 'Next.js', fr: 'Next.js' }) becomes 'Next.js'.",
  },
  intlayerSortContentKeys: {
    type: 'boolean',
    category: 'Intlayer',
    default: false,
    description:
      'In .content files, also sort the keys of the dictionary content and of its nested objects alphabetically.',
  },
};

const plugin: Plugin = { parsers, options };

export default plugin;
