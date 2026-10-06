import {
  getFilteredLocalesDictionary,
  getPerLocaleDictionary,
} from '@intlayer/core/plugins';
import { parseYaml, stringifyYaml } from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { MARKDOWN } from '@intlayer/types/nodeType';
import {
  type Extension,
  getFormatFromExtension,
} from '../utils/getFormatFromExtension';
import {
  type ExternalFileHandler,
  processContentDeclarationContent,
} from './processContentDeclarationContent';
import { transformJSFile } from './transformJSFile';
import { transformJSONFile } from './transformJSONFile';

/**
 * Fields that are internal to the build and must never be persisted in a
 * content declaration file.
 */
const INTERNAL_FIELDS = new Set<string>([
  '$schema',
  'filePath',
  'localId',
  'localIds',
  'projectIds',
]);

/** Fields that are auto-generated or runtime-only, not persisted in YAML. */
const EXCLUDED_YAML_KEYS = new Set<string>(['$schema', 'id', 'filePath']);

/** Fields that must not appear in a markdown frontmatter. */
const EXCLUDED_FRONTMATTER_KEYS = new Set<string>([
  ...INTERNAL_FIELDS,
  'content',
]);

const JS_EXTENSIONS = new Set<string>([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
]);

const JSON_EXTENSIONS = new Set<string>(['.json', '.jsonc', '.json5']);

const MARKDOWN_EXTENSIONS = new Set<string>(['.md', '.mdx']);

const YAML_EXTENSIONS = new Set<string>(['.yaml', '.yml']);

const getExtension = (filePath: string): string => {
  const fileName = filePath.split(/[\\/]/).pop() ?? '';
  const dotIndex = fileName.lastIndexOf('.');

  return dotIndex === -1 ? '' : fileName.slice(dotIndex).toLowerCase();
};

const omitFields = (
  record: Record<string, unknown>,
  excludedFields: Set<string>
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(record).filter(
      ([fieldName, value]) =>
        !excludedFields.has(fieldName) && value !== undefined
    )
  );

/**
 * Whether a content declaration file can be rewritten from a dictionary.
 * Other extensions (e.g. `.po`) are owned by plugins.
 */
export const isRenderableContentDeclarationPath = (
  filePath: string
): boolean => {
  const extension = getExtension(filePath);

  return (
    JS_EXTENSIONS.has(extension) ||
    JSON_EXTENSIONS.has(extension) ||
    MARKDOWN_EXTENSIONS.has(extension) ||
    YAML_EXTENSIONS.has(extension)
  );
};

type FormatContentDeclarationOptions = {
  /** Plugins `formatOutput` hooks are applied when provided. */
  configuration?: IntlayerConfig;
  localeList?: LocalesValues[];
  /** Collects `file()` node contents instead of writing them to disk. */
  onExternalFile?: ExternalFileHandler;
};

/**
 * Cleans a dictionary before persisting it: strips auto-generated node
 * metadata, filters locales, and applies the plugins `formatOutput` hooks.
 */
export const formatContentDeclaration = async (
  dictionary: Dictionary,
  options: FormatContentDeclarationOptions = {}
): Promise<Dictionary> => {
  const { configuration, localeList, onExternalFile } = options;

  const processedDictionary = await processContentDeclarationContent(
    dictionary,
    onExternalFile
  );

  let content = processedDictionary.content;

  if (dictionary.locale) {
    content = getPerLocaleDictionary(
      processedDictionary,
      dictionary.locale
    ).content;
  } else if (localeList) {
    content = getFilteredLocalesDictionary(
      processedDictionary,
      localeList
    ).content;
  }

  let pluginFormatResult: any = {
    ...dictionary,
    content,
  } satisfies Dictionary;

  for await (const plugin of configuration?.plugins ?? []) {
    if (plugin.formatOutput && configuration) {
      const formattedResult = await plugin.formatOutput({
        dictionary: pluginFormatResult,
        configuration,
      });

      if (formattedResult) {
        pluginFormatResult = formattedResult;
      }
    }
  }

  const isDictionaryFormat =
    pluginFormatResult.content && pluginFormatResult.key;

  if (!isDictionaryFormat) return pluginFormatResult;

  // Build result from the original dictionary so that extra user-defined
  // fields (e.g. custom frontmatter in markdown files) are preserved.
  let result = {
    ...omitFields(dictionary as Record<string, unknown>, INTERNAL_FIELDS),
    content,
  } as Dictionary;

  const extension = (
    dictionary.filePath ? getExtension(dictionary.filePath) : '.json'
  ) as Extension;

  if (getFormatFromExtension(extension) === 'json') {
    result = {
      $schema: 'https://intlayer.org/schema.json',
      ...result,
    } as Dictionary;
  }

  return result;
};

const stringifyYamlFrontmatter = (fields: Record<string, unknown>): string =>
  Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([fieldName, value]) => {
      if (Array.isArray(value)) {
        return `${fieldName}:\n${value.map((item) => `  - ${JSON.stringify(item)}`).join('\n')}`;
      }
      if (
        typeof value === 'string' &&
        (value.includes(':') || value.includes('\n') || value.includes('#'))
      ) {
        return `${fieldName}: ${JSON.stringify(value)}`;
      }
      return `${fieldName}: ${value}`;
    })
    .join('\n');

type SplitMarkdown = {
  /** Raw frontmatter text, without the `---` fences. */
  frontmatter: string | undefined;
  body: string;
};

/**
 * Splits a markdown string into its YAML frontmatter and its body.
 */
const splitMarkdown = (markdown: string): SplitMarkdown => {
  const lines = markdown.split(/\r?\n/);
  const firstNonEmptyIndex = lines.findIndex((line) => line.trim() !== '');

  if (
    firstNonEmptyIndex === -1 ||
    lines[firstNonEmptyIndex]?.trim() !== '---'
  ) {
    return { frontmatter: undefined, body: markdown };
  }

  const endIndex = lines.findIndex(
    (line, index) => index > firstNonEmptyIndex && line.trim() === '---'
  );

  if (endIndex === -1) return { frontmatter: undefined, body: markdown };

  return {
    frontmatter: lines.slice(firstNonEmptyIndex + 1, endIndex).join('\n'),
    body: lines
      .slice(endIndex + 1)
      .join('\n')
      .trimStart(),
  };
};

/**
 * Renders a `.content.md` file. When the current file is provided, its
 * frontmatter fields are kept and only overridden by the dictionary ones; the
 * original frontmatter text is reused verbatim when nothing changed.
 */
export const renderMarkdownContentDeclaration = (
  dictionary: Dictionary,
  existingFileContent?: string
): string => {
  const content = dictionary.content as Record<string, unknown> | undefined;
  const markdownRaw =
    typeof content === 'object' && content?.nodeType === MARKDOWN
      ? String(content[MARKDOWN] ?? '')
      : '';
  // content.markdown stores the full file (frontmatter + body)
  const { body } = splitMarkdown(markdownRaw);

  const dictionaryFields = omitFields(
    dictionary as Record<string, unknown>,
    EXCLUDED_FRONTMATTER_KEYS
  );

  const existingFrontmatter =
    existingFileContent === undefined
      ? undefined
      : splitMarkdown(existingFileContent).frontmatter;

  if (existingFrontmatter === undefined) {
    return `---\n${stringifyYamlFrontmatter(dictionaryFields)}\n---\n\n${body}`;
  }

  const existingFields =
    parseYaml<Record<string, unknown>>(existingFrontmatter) ?? {};
  const mergedFields = { ...existingFields, ...dictionaryFields };

  const mergedFrontmatter = stringifyYamlFrontmatter(mergedFields);
  const frontmatter =
    stringifyYamlFrontmatter(existingFields) === mergedFrontmatter
      ? existingFrontmatter
      : mergedFrontmatter;

  return `---\n${frontmatter}\n---\n\n${body}`;
};

/**
 * Renders a `.content.yaml` file. When the current file is provided, its
 * fields are kept and only overridden by the dictionary ones; the original
 * text is returned untouched when nothing changed.
 */
export const renderYamlContentDeclaration = (
  dictionary: Dictionary,
  existingFileContent?: string
): string => {
  const dictionaryFields = omitFields(
    dictionary as Record<string, unknown>,
    EXCLUDED_YAML_KEYS
  );

  if (existingFileContent === undefined) {
    return stringifyYaml(dictionaryFields);
  }

  const existingFields =
    parseYaml<Record<string, unknown>>(existingFileContent) ?? {};
  const mergedFields = { ...existingFields, ...dictionaryFields };

  if (stringifyYaml(existingFields) === stringifyYaml(mergedFields)) {
    return existingFileContent;
  }

  return stringifyYaml(mergedFields);
};

/**
 * Whether a content declaration source declares only the content (compiler
 * `noMetadata` mode) rather than a `{ key, content }` dictionary.
 */
const isContentOnlyDeclaration = (
  fileContent: string,
  extension: string
): boolean => {
  if (JSON_EXTENSIONS.has(extension)) {
    try {
      const parsed = JSON.parse(fileContent) as Record<string, unknown>;

      return !('content' in parsed) && !('key' in parsed);
    } catch {
      return false;
    }
  }

  return !/(^|[\s{,])['"]?content['"]?\s*:/m.test(fileContent);
};

export type RenderContentDeclarationOptions = {
  /** Path of the content declaration file, used to pick its format. */
  filePath: string;
  /** Current source of the file. */
  fileContent: string;
  /** Applies the plugins `formatOutput` hooks when provided. */
  configuration?: IntlayerConfig;
  localeList?: LocalesValues[];
  /** Forces the `noMetadata` mode; detected from the source when omitted. */
  noMetadata?: boolean;
};

export type RenderedContentDeclaration = {
  /** New source of the content declaration file. */
  fileContent: string;
  /** Content of the `file()` nodes, keyed by path relative to the base dir. */
  externalFiles: Record<string, string>;
};

/**
 * Renders the new source of an existing content declaration file from a
 * dictionary, without touching the file system. JS/TS and JSON sources are
 * updated through their AST so untouched code keeps its formatting.
 *
 * Returns `undefined` for formats owned by plugins (e.g. `.po`).
 */
export const renderContentDeclaration = async (
  dictionary: Dictionary,
  options: RenderContentDeclarationOptions
): Promise<RenderedContentDeclaration | undefined> => {
  const { filePath, fileContent, configuration, localeList } = options;
  const extension = getExtension(filePath);

  if (!isRenderableContentDeclarationPath(filePath)) return undefined;

  const externalFiles: Record<string, string> = {};

  const formattedDictionary = await formatContentDeclaration(
    { ...dictionary, filePath },
    {
      configuration,
      localeList,
      onExternalFile: (externalFilePath, externalFileContent) => {
        externalFiles[externalFilePath] = externalFileContent;
      },
    }
  );

  if (MARKDOWN_EXTENSIONS.has(extension)) {
    return {
      fileContent: renderMarkdownContentDeclaration(
        formattedDictionary,
        fileContent
      ),
      externalFiles,
    };
  }

  if (YAML_EXTENSIONS.has(extension)) {
    return {
      fileContent: renderYamlContentDeclaration(
        formattedDictionary,
        fileContent
      ),
      externalFiles,
    };
  }

  const noMetadata =
    options.noMetadata ?? isContentOnlyDeclaration(fileContent, extension);

  if (JSON_EXTENSIONS.has(extension)) {
    return {
      fileContent: transformJSONFile(
        fileContent,
        formattedDictionary,
        noMetadata
      ),
      externalFiles,
    };
  }

  return {
    fileContent: await transformJSFile(
      fileContent,
      formattedDictionary,
      dictionary.locale as Locale | undefined,
      noMetadata
    ),
    externalFiles,
  };
};
