import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import { ATTRIBUTES_TO_EXTRACT, shouldExtract } from '@intlayer/config/extract';
import {
  type AstNode,
  type AstNodeWithParent,
  getJsxAttributeName,
  getJsxAttributeValueNode,
  getJsxElementName,
  getStaticStringValue,
  toAstNode,
} from '../utils/ast';
import { createRule } from '../utils/createRule';
import {
  combineVisitors,
  createTemplateVisitor,
  type TemplateVisitor,
} from '../utils/templates';

/**
 * Elements whose text is markup, code or metadata rather than user-facing copy.
 * Extracting them would be wrong, so they are skipped by default.
 */
const DEFAULT_IGNORED_ELEMENTS = ['code', 'pre', 'script', 'style'];

export type NoRawTextOptions = {
  /**
   * JSX attributes whose string value is user-facing copy.
   * Defaults to the compiler's own list, so the linter flags exactly what
   * `intlayer extract` would rewrite.
   */
  attributes?: string[];
  /** JSX elements whose children are never translatable. */
  ignoreElements?: string[];
  /** Regular-expression sources for text that should never be reported. */
  ignorePatterns?: string[];
  /**
   * Also report string literals outside JSX (function arguments, object values,
   * …). Off by default: outside JSX the false-positive rate is much higher, and
   * the compiler's own extractor is the better first pass.
   */
  includeStringLiterals?: boolean;
};

type MessageIds = 'rawText' | 'rawAttribute' | 'rawStringLiteral';

/**
 * True for a content declaration file, where raw strings are the whole point.
 *
 * @param filename - Absolute path of the linted file.
 */
const isContentDeclarationFile = (filename: string): boolean =>
  FILE_EXTENSIONS.some((extension) => filename.endsWith(extension));

/**
 * Walk up from a JSX child or attribute to the tag name that encloses it.
 *
 * @param node - The reported node.
 */
const getEnclosingElementName = (
  node: AstNodeWithParent | undefined
): string | null => {
  let current = node;

  while (current) {
    if (current.type === 'JSXElement') {
      return getJsxElementName(current['openingElement'] as AstNode);
    }

    if (current.type === 'JSXOpeningElement') {
      return getJsxElementName(current);
    }

    current = current.parent;
  }

  return null;
};

/**
 * True when the string literal sits in a position that is structural rather
 * than user-facing: module specifiers, property keys, directives, and the
 * arguments of the Intlayer getters themselves.
 *
 * @param node - The Literal node.
 */
const isStructuralPosition = (node: AstNodeWithParent): boolean => {
  const parent = node.parent;

  if (!parent) return true;

  switch (parent.type) {
    case 'ImportDeclaration':
    case 'ImportExpression':
    case 'ExportNamedDeclaration':
    case 'ExportAllDeclaration':
    case 'JSXAttribute':
    case 'TSLiteralType':
    case 'TSEnumMember':
    case 'ExpressionStatement':
      return true;

    case 'Property':
      // Keys are structural; values are not.
      return parent['key'] === node && parent['computed'] !== true;

    case 'MemberExpression':
      return parent['property'] === node;

    default:
      return false;
  }
};

export const noRawText = createRule<[NoRawTextOptions?], MessageIds>(
  'no-raw-text',
  {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Report user-facing strings that are not declared in an Intlayer dictionary',
      },
      messages: {
        rawText:
          'Untranslated text "{{text}}". Move it to a dictionary — `npx intlayer extract` can do it for this file.',
        rawAttribute:
          'Untranslated `{{attribute}}` value "{{text}}". Move it to a dictionary — `npx intlayer extract` can do it for this file.',
        rawStringLiteral:
          'Untranslated string "{{text}}". Move it to a dictionary — `npx intlayer extract` can do it for this file.',
      },
      schema: [
        {
          type: 'object',
          properties: {
            attributes: { type: 'array', items: { type: 'string' } },
            ignoreElements: { type: 'array', items: { type: 'string' } },
            ignorePatterns: { type: 'array', items: { type: 'string' } },
            includeStringLiterals: { type: 'boolean' },
          },
          additionalProperties: false,
        },
      ],
    },

    create: (context) => {
      const filename = context.filename;

      // Content declaration files hold the translations themselves.
      if (isContentDeclarationFile(filename)) return {};

      const [options = {}] = context.options;
      const attributes = new Set<string>(
        options.attributes ?? ATTRIBUTES_TO_EXTRACT
      );
      const ignoredElements = new Set<string>(
        options.ignoreElements ?? DEFAULT_IGNORED_ELEMENTS
      );
      const ignorePatterns = (options.ignorePatterns ?? []).map(
        (pattern) => new RegExp(pattern, 'u')
      );
      const includeStringLiterals = options.includeStringLiterals === true;

      /** True when the text is copy the extractor would pick up. */
      const isReportableText = (text: string): boolean =>
        shouldExtract(text) &&
        !ignorePatterns.some((pattern) => pattern.test(text.trim()));

      /** Collapse whitespace so multi-line JSX text reads well in the report. */
      const formatText = (text: string): string => {
        const normalized = text.replace(/\s+/gu, ' ').trim();

        return normalized.length > 40
          ? `${normalized.slice(0, 40)}…`
          : normalized;
      };

      /**
       * Handlers for the markup languages that are not JSX — Vue, Svelte and
       * Angular templates. Reports through the same predicate and options as
       * the JSX path so a project gets identical results whatever it is written
       * in.
       */
      const templateVisitor = createTemplateVisitor(
        ({ node, text, attributeName, elementName }) => {
          if (elementName && ignoredElements.has(elementName)) return;

          if (attributeName !== null && !attributes.has(attributeName)) return;

          if (!isReportableText(text)) return;

          context.report({
            node: node as never,
            messageId: attributeName === null ? 'rawText' : 'rawAttribute',
            data: {
              text: formatText(text),
              ...(attributeName === null ? {} : { attribute: attributeName }),
            },
          });
        }
      );

      const scriptVisitor: TemplateVisitor = {
        JSXText: (node) => {
          const astNode = toAstNode(node as never);
          const text = astNode['value'] as string;

          if (!isReportableText(text)) return;

          const elementName = getEnclosingElementName(astNode.parent);

          if (elementName && ignoredElements.has(elementName)) return;

          context.report({
            node: node as never,
            messageId: 'rawText',
            data: { text: formatText(text) },
          });
        },

        JSXAttribute: (node) => {
          const astNode = toAstNode(node as never);
          const attributeName = getJsxAttributeName(astNode);

          if (!attributeName || !attributes.has(attributeName)) return;

          const valueNode = getJsxAttributeValueNode(astNode);
          const text = getStaticStringValue(valueNode);

          if (text === null || !isReportableText(text)) return;

          const elementName = getEnclosingElementName(astNode.parent);

          if (elementName && ignoredElements.has(elementName)) return;

          context.report({
            node: node as never,
            messageId: 'rawAttribute',
            data: { attribute: attributeName, text: formatText(text) },
          });
        },

        Literal: (node) => {
          if (!includeStringLiterals) return;

          const astNode = toAstNode(node as never);

          if (typeof astNode['value'] !== 'string') return;

          if (isStructuralPosition(astNode)) return;

          const text = astNode['value'] as string;

          if (!isReportableText(text)) return;

          context.report({
            node: node as never,
            messageId: 'rawStringLiteral',
            data: { text: formatText(text) },
          });
        },
      };

      return combineVisitors(
        context.sourceCode.parserServices,
        scriptVisitor,
        templateVisitor
      );
    },
  }
);
