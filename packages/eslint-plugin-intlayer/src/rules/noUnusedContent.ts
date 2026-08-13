import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import { toAstNode } from '../utils/ast';
import {
  type ContentDeclaration,
  readContentDeclaration,
} from '../utils/contentDeclaration';
import { createRule } from '../utils/createRule';
import {
  type DictionaryUsage,
  getDuplicateDeclarations,
  getProjectConfiguration,
  getProjectUsageIndex,
  type ProjectUsageIndex,
  stripModuleExtension,
} from '../utils/projectUsage';

/** Lifetime of the cached project scan, in milliseconds. */
const DEFAULT_CACHE_TTL_MS = 30_000;

export type NoUnusedContentOptions = {
  /** Report a dictionary whose key is never referenced anywhere. Default: `true`. */
  reportUnusedDictionaries?: boolean;
  /** Report a content field that is never read anywhere. Default: `true`. */
  reportUnusedFields?: boolean;
  /**
   * Report a dictionary key that is also declared elsewhere. Needs the unmerged
   * dictionaries on disk, so it stays silent until the project has been built.
   * Default: `true`.
   */
  reportDuplicateKeys?: boolean;
  /** Regular-expression sources for field paths that are never reported. */
  ignoreFields?: string[];
  /**
   * Project root the scan starts from. Defaults to ESLint's working directory,
   * which is the right answer unless one lint run spans several Intlayer
   * projects in a monorepo.
   */
  baseDir?: string;
  /**
   * How long one project scan is reused, in milliseconds. Lower it when linting
   * from a long-lived editor server and you want edits reflected sooner; `0`
   * rescans on every file. Default: `30000`.
   */
  cacheTtl?: number;
};

type MessageIds = 'unusedDictionary' | 'unusedField' | 'duplicateDictionary';

/**
 * True for a content declaration file — the only files this rule inspects.
 *
 * @param filename - Absolute path of the linted file.
 * @param contentFileExtensions - Extensions the project declares content with.
 */
const isContentDeclarationFile = (
  filename: string,
  contentFileExtensions: string[]
): boolean =>
  contentFileExtensions.some((extension) => filename.endsWith(extension));

/**
 * True when a shorter prefix of `fieldPath` is already reported, so the nested
 * field would only repeat what the parent report says.
 *
 * @param fieldPath - Dotted path being considered.
 * @param reportedPaths - Paths already reported for this dictionary.
 */
const hasReportedAncestor = (
  fieldPath: string,
  reportedPaths: Set<string>
): boolean => {
  const segments = fieldPath.split('.');

  for (let depth = 1; depth < segments.length; depth++) {
    if (reportedPaths.has(segments.slice(0, depth).join('.'))) return true;
  }

  return false;
};

/**
 * Compile the `ignoreFields` option, dropping any source that is not a valid
 * regular expression rather than failing the whole lint run.
 *
 * @param sources - Regular-expression sources from the rule options.
 */
const compileIgnorePatterns = (sources: string[]): RegExp[] => {
  const patterns: RegExp[] = [];

  for (const source of sources) {
    try {
      patterns.push(new RegExp(source));
    } catch {
      // An unparsable pattern ignores nothing; the rest still apply.
    }
  }

  return patterns;
};

export const noUnusedContent = createRule<
  [NoUnusedContentOptions?],
  MessageIds
>('no-unused-content', {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Report Intlayer dictionaries and content fields that nothing in the project reads',
    },
    schema: [
      {
        type: 'object',
        properties: {
          reportUnusedDictionaries: { type: 'boolean' },
          reportUnusedFields: { type: 'boolean' },
          reportDuplicateKeys: { type: 'boolean' },
          ignoreFields: { type: 'array', items: { type: 'string' } },
          baseDir: { type: 'string' },
          cacheTtl: { type: 'number', minimum: 0 },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unusedDictionary:
        'The dictionary `{{dictionaryKey}}` is never read: no `useIntlayer`, `getIntlayer` or compat caller in the project asks for it, and no module imports this declaration.',
      unusedField:
        'The content field `{{fieldPath}}` of `{{dictionaryKey}}` is never read. The compiler strips it from the build, so it only costs translation work.',
      duplicateDictionary:
        'The dictionary key `{{dictionaryKey}}` is also declared in {{locations}}. Declarations sharing a key are merged, so a field defined twice silently keeps one of the two values.',
    },
  },

  create: (context) => {
    const [options = {}] = context.options;
    const {
      reportUnusedDictionaries = true,
      reportUnusedFields = true,
      reportDuplicateKeys = true,
      ignoreFields = [],
      baseDir = context.cwd,
      cacheTtl = DEFAULT_CACHE_TTL_MS,
    } = options;

    const configuration = getProjectConfiguration(baseDir, cacheTtl);
    const contentFileExtensions =
      configuration?.content.fileExtensions ?? FILE_EXTENSIONS;

    if (!isContentDeclarationFile(context.filename, contentFileExtensions)) {
      return {};
    }

    const ignorePatterns = compileIgnorePatterns(ignoreFields);

    /** Intlayer declares one dictionary per file; the outermost match is it. */
    let hasHandledDeclaration = false;

    /** Report every field of a dictionary that nothing in the project reads. */
    const reportUnusedFieldsOf = (
      declaration: ContentDeclaration,
      usage: DictionaryUsage
    ): void => {
      if (usage.tracksEveryField || declaration.isPartiallyEnumerated) return;

      const reportedPaths = new Set<string>();

      for (const field of declaration.fields) {
        if (usage.usedFieldPaths.has(field.path)) continue;

        if (hasReportedAncestor(field.path, reportedPaths)) continue;

        if (ignorePatterns.some((pattern) => pattern.test(field.path)))
          continue;

        reportedPaths.add(field.path);

        context.report({
          node: field.keyNode as never,
          messageId: 'unusedField',
          data: {
            fieldPath: field.path,
            dictionaryKey: declaration.dictionaryKey,
          },
        });
      }
    };

    /** Report the key when the same dictionary is declared somewhere else too. */
    const reportDuplicatesOf = (declaration: ContentDeclaration): void => {
      if (!reportDuplicateKeys || !configuration) return;

      const duplicates = getDuplicateDeclarations(
        configuration,
        declaration.dictionaryKey,
        context.filename
      );

      if (duplicates.length === 0) return;

      context.report({
        node: declaration.keyNode as never,
        messageId: 'duplicateDictionary',
        data: {
          dictionaryKey: declaration.dictionaryKey,
          locations: duplicates
            .map((duplicate) =>
              duplicate.location === 'remote'
                ? 'the CMS'
                : `\`${duplicate.filePath}\``
            )
            .join(', '),
        },
      });
    };

    /** Report the declaration itself when nothing references its key. */
    const reportUsage = (
      declaration: ContentDeclaration,
      index: ProjectUsageIndex
    ): void => {
      // A declaration imported directly (`useDictionary(myDictionary)`) is
      // consumed without ever naming its key.
      const isImportedDirectly = index.importedModulePaths.has(
        stripModuleExtension(context.filename)
      );

      const usage = index.byDictionaryKey.get(declaration.dictionaryKey);

      if (!usage) {
        if (reportUnusedDictionaries && !isImportedDirectly) {
          context.report({
            node: declaration.keyNode as never,
            messageId: 'unusedDictionary',
            data: { dictionaryKey: declaration.dictionaryKey },
          });
        }

        return;
      }

      if (reportUnusedFields && !isImportedDirectly) {
        reportUnusedFieldsOf(declaration, usage);
      }
    };

    return {
      ObjectExpression: (node) => {
        if (hasHandledDeclaration) return;

        const declaration = readContentDeclaration(toAstNode(node));

        if (!declaration) return;

        hasHandledDeclaration = true;

        reportDuplicatesOf(declaration);

        if (!reportUnusedDictionaries && !reportUnusedFields) return;

        const index = getProjectUsageIndex(baseDir, cacheTtl);

        // Nothing could be scanned — reporting every dictionary as unused would
        // be the worst possible answer.
        if (!index.isAvailable) return;

        reportUsage(declaration, index);
      },
    };
  },
});
