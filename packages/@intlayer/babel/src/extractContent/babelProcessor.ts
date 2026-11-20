import _traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import {
  ATTRIBUTES_TO_EXTRACT,
  getExtractionIgnoreDirectives,
  shouldExtract,
} from '@intlayer/config/extract';
import type { IntlayerConfig } from '@intlayer/types/config';
import { resolveDictionaryKey } from '../extractContent/utils';
import {
  type ExistingIntlayerInfo,
  getComponentName,
  getExistingIntlayerInfo,
  getOrGenerateKey,
  getReadFieldsOfComponent,
} from './utils';

export type BabelReplacement = {
  path: NodePath;
  key: string;
  type:
    | 'jsx-text'
    | 'jsx-attribute'
    | 'string-literal'
    | 'jsx-insertion'
    | 'jsx-text-combined'
    | 'template-literal';
  componentKey: string;
  childrenToReplace?: t.Node[];
  variables?: string[];
  /**
   * `jsx-insertion` only: the expression of each variable, in source order.
   * They stay in place so the edits nested in them (an extracted string in a
   * ternary) still apply.
   */
  insertionExpressions?: { name: string; node: t.Expression }[];
};

/** Offset range of the source, end exclusive. */
export type SourceSelection = { start: number; end: number };

/**
 * Source span a replacement rewrites: its JSX children for combined text,
 * its node otherwise.
 */
export const getReplacementSpan = (
  replacement: BabelReplacement
): SourceSelection => {
  const children = replacement.childrenToReplace;

  if (children && children.length > 0) {
    return {
      start: children[0]!.start ?? 0,
      end: children[children.length - 1]!.end ?? 0,
    };
  }

  return {
    start: replacement.path.node.start ?? 0,
    end: replacement.path.node.end ?? 0,
  };
};

/** Whether a replacement rewrites any part of `selection`. */
const isReplacementInSelection = (
  replacement: BabelReplacement,
  selection: SourceSelection
): boolean => {
  const span = getReplacementSpan(replacement);

  return span.start < selection.end && selection.start < span.end;
};

/** Top-level content field names already declared under `dictionaryKey`. */
const getDeclaredFieldNames = (
  unmergedDictionaries: Record<string, unknown>,
  dictionaryKey: string
): Set<string> => {
  const dictionaries = [unmergedDictionaries[dictionaryKey] ?? []].flat() as {
    content?: unknown;
  }[];

  return new Set(
    dictionaries.flatMap((dictionary) =>
      typeof dictionary.content === 'object' && dictionary.content !== null
        ? Object.keys(dictionary.content)
        : []
    )
  );
};

// CJS/ESM interop: @babel/traverse exports its function as `.default` in CJS bundles
const traverse = (
  typeof _traverse === 'function' ? _traverse : (_traverse as any).default
) as typeof _traverse;

/**
 * Method names whose string arguments are technical operands — lookups,
 * comparisons, DOM queries, storage keys, event names — rather than translatable
 * display text. A string literal passed to one of these (e.g.
 * `message.includes('Loading chunk')`) is code, not content, and is skipped.
 */
/**
 * Binary operators whose string operands are code constants / enum values
 * (e.g. `msg.step === 'ERROR'`) rather than translatable display text.
 */
const COMPARISON_OPERATORS = new Set(['===', '!==', '==', '!=']);

/**
 * Object property names whose string values are technical/non-translatable
 * (e.g. `icon: 'Globe'`, `variant: 'primary'`). String values under other
 * property names (e.g. `label: 'Language'`) are still extracted.
 */
const TECHNICAL_KEYS = new Set<string>([
  'icon',
  'className',
  'class',
  'style',
  'cssText',
  'id',
  'type',
  'variant',
  'color',
  'theme',
  'size',
  'align',
  'placement',
  'target',
  'rel',
  'method',
  'mode',
  'direction',
  'orientation',
  'scope',
  'role',
  'lang',
  'locale',
  'href',
  'src',
  'width',
  'height',
  'as',
  'to',
  'key',
  'value',
  'defaultValue',
  'prop',
  'property',
  'state',
  'action',
  'event',
  'handler',
  'callback',
  'url',
  'uri',
  'path',
  'route',
  'slug',
  'endpoint',
  'headers',
  'contentType',
  'toolName',
  'toolDescription',
  'toolParamDescription',
  // SVG props, reached through compiled `jsx('svg', { … })` calls
  'viewBox',
  'd',
  'points',
  'transform',
  'xmlns',
  'preserveAspectRatio',
  // Inline style props
  'transition',
  'animation',
  'clipPath',
  'fontFamily',
  'boxShadow',
  'gridTemplateColumns',
  'gridTemplateRows',
]);

/** HTTP header names, compared lowercased (`authorization`, `'User-Agent'`). */
const HTTP_HEADER_KEYS = new Set<string>([
  'accept',
  'accept-language',
  'authorization',
  'cache-control',
  'content-type',
  'cookie',
  'user-agent',
  'useragent',
  'x-api-key',
]);

/**
 * Functions and objects that only log (`log = console.log`, `logger.warn()`):
 * their arguments are developer output, not display text.
 */
const LOGGING_NAMES = new Set<string>(['console', 'log', 'logger', 'debug']);

/**
 * Sibling keys marking an AI tool definition (`tool({ description,
 * inputSchema, execute })`): its `description` is a prompt for the model.
 */
const AI_TOOL_DEFINITION_KEYS = new Set<string>([
  'inputSchema',
  'parameters',
  'execute',
]);

const NON_TRANSLATABLE_CALL_METHODS = new Set<string>([
  // Schema metadata read by models and validators (`z.string().describe()`)
  'describe',
  'includes',
  'startsWith',
  'endsWith',
  'indexOf',
  'lastIndexOf',
  'match',
  'matchAll',
  'search',
  'localeCompare',
  'split',
  'getAttribute',
  'setAttribute',
  'hasAttribute',
  'removeAttribute',
  'querySelector',
  'querySelectorAll',
  'getElementById',
  'getElementsByClassName',
  'getElementsByTagName',
  'addEventListener',
  'removeEventListener',
  'dispatchEvent',
  'matchMedia',
  'getItem',
  'setItem',
  'removeItem',
  'getPropertyValue',
  'setProperty',
]);

/**
 * Whether `path` is a braced JSX attribute value (`viewBox={`0 0 ${width}`}`,
 * `title={"Hello"}`) of an attribute outside `ATTRIBUTES_TO_EXTRACT`, the
 * allowlist the plain `title="Hello"` form follows.
 */
const isNonTranslatableJsxAttributeValue = (
  path: NodePath<t.StringLiteral | t.TemplateLiteral>
): boolean => {
  const parent = path.parentPath;

  if (!parent?.isJSXExpressionContainer()) return false;

  const attributePath = parent.parentPath;

  if (!attributePath?.isJSXAttribute()) return false;

  const attributeName = attributePath.node.name.name;

  return (
    typeof attributeName !== 'string' ||
    !ATTRIBUTES_TO_EXTRACT.includes(
      attributeName as (typeof ATTRIBUTES_TO_EXTRACT)[number]
    )
  );
};

/**
 * Whether `path` is the value of a `TECHNICAL_KEYS` property, looking through
 * ternaries and logical operators (`transition: busy ? 'none' : 'width 1s'`).
 */
const isTechnicalPropertyValue = (path: NodePath): boolean => {
  let valuePath: NodePath = path;

  while (
    valuePath.parentPath?.isConditionalExpression() ||
    valuePath.parentPath?.isLogicalExpression()
  ) {
    if (
      valuePath.parentPath.isConditionalExpression() &&
      valuePath.parentPath.node.test === valuePath.node
    )
      return false;
    valuePath = valuePath.parentPath;
  }

  const propertyPath = valuePath.parentPath;

  if (
    !propertyPath?.isObjectProperty() ||
    propertyPath.node.value !== valuePath.node
  )
    return false;

  const { key } = propertyPath.node;
  const keyName = t.isIdentifier(key)
    ? key.name
    : t.isStringLiteral(key)
      ? key.value
      : undefined;

  if (keyName === undefined) return false;

  if (
    TECHNICAL_KEYS.has(keyName) ||
    HTTP_HEADER_KEYS.has(keyName.toLowerCase())
  )
    return true;

  const objectNode = propertyPath.parentPath?.node;

  return (
    keyName === 'description' &&
    t.isObjectExpression(objectNode) &&
    objectNode.properties.some(
      (property) =>
        (t.isObjectProperty(property) || t.isObjectMethod(property)) &&
        t.isIdentifier(property.key) &&
        AI_TOOL_DEFINITION_KEYS.has(property.key.name)
    )
  );
};

/** Class-name builders whose string arguments are CSS classes, at any depth. */
const CLASS_NAME_BUILDER_FUNCTIONS = new Set<string>([
  'cva',
  'cx',
  'cn',
  'clsx',
  'classnames',
  'classNames',
  'twMerge',
  'twJoin',
  'tv',
]);

/**
 * Whether `path` sits inside the arguments of a class-name builder call
 * (`cva('flex', { variants: { size: { sm: 'px-3 text-xs' } } })`), stopping
 * at the enclosing function.
 */
const isInsideClassNameBuilderCall = (path: NodePath): boolean =>
  Boolean(
    path
      .findParent((ancestor) => {
        if (ancestor.isFunction()) return true;
        if (!ancestor.isCallExpression()) return false;

        const { callee } = ancestor.node;

        return (
          t.isIdentifier(callee) &&
          CLASS_NAME_BUILDER_FUNCTIONS.has(callee.name)
        );
      })
      ?.isCallExpression()
  );

/**
 * Whether `path` is an argument of a technical or logging call:
 * `foo.includes('bar')`, `el.getAttribute('data-id')`, `console.log('…')`,
 * `logger.warn(`…`)` or `log(`…`)` (a `log = console.log` alias).
 */
const isNonTranslatableCallArgument = (
  path: NodePath<t.StringLiteral | t.TemplateLiteral>
): boolean => {
  const parent = path.parentPath;
  if (!parent?.isCallExpression() && !parent?.isOptionalCallExpression()) {
    return false;
  }

  const callNode = parent.node as t.CallExpression | t.OptionalCallExpression;
  if (!callNode.arguments.includes(path.node)) return false;

  const { callee } = callNode;

  if (t.isIdentifier(callee)) return LOGGING_NAMES.has(callee.name);

  if (!t.isMemberExpression(callee) && !t.isOptionalMemberExpression(callee)) {
    return false;
  }

  const isLoggingObject =
    t.isIdentifier(callee.object) && LOGGING_NAMES.has(callee.object.name);
  const isTechnicalMethod =
    t.isIdentifier(callee.property) &&
    NON_TRANSLATABLE_CALL_METHODS.has(callee.property.name);

  return isLoggingObject || isTechnicalMethod;
};

/**
 * Source text already written with `{{placeholder}}` syntax belongs to another
 * template engine (email or markdown templates filled at runtime). Extracting
 * it would turn it into an Intlayer insertion and change what the code reads.
 */
const hasLiteralPlaceholder = (text: string): boolean =>
  /\{\{[^{}]+\}\}/.test(text);

/**
 * JSX text as React renders it: each line trimmed, whitespace-only lines
 * dropped, lines joined by a space (`\n  , first contact` → `, first contact`).
 */
const normalizeJsxText = (text: string): string => {
  if (!text.includes('\n')) return text;

  const lines = text.split(/\r\n|\n|\r/);

  return lines
    .map((line, index) => {
      let normalizedLine = line;
      if (index > 0) normalizedLine = normalizedLine.trimStart();
      if (index < lines.length - 1) normalizedLine = normalizedLine.trimEnd();
      return normalizedLine;
    })
    .filter((line) => line.length > 0)
    .join(' ');
};

/**
 * Whether an expression renders markup (`cond && <b>x</b>`): such values are
 * not plain insertion strings in every framework.
 */
const containsJsx = (expression: t.Node): boolean => {
  let hasJsx = false;
  t.traverseFast(expression, (node) => {
    if (t.isJSXElement(node) || t.isJSXFragment(node)) hasJsx = true;
  });
  return hasJsx;
};

/**
 * Readable insertion variable name for an expression: `count` → `count`,
 * `user.name` → `name`, `formatDate(at)` → `formatDate`, otherwise `value`.
 */
const getInsertionVariableName = (expression: t.Expression): string => {
  if (t.isIdentifier(expression)) return expression.name;

  if (
    (t.isMemberExpression(expression) ||
      t.isOptionalMemberExpression(expression)) &&
    t.isIdentifier(expression.property)
  )
    return expression.property.name;

  if (t.isCallExpression(expression) || t.isOptionalCallExpression(expression))
    return t.isExpression(expression.callee)
      ? getInsertionVariableName(expression.callee)
      : 'value';

  if (t.isTSNonNullExpression(expression) || t.isTSAsExpression(expression))
    return getInsertionVariableName(expression.expression);

  return 'value';
};

/**
 * Handles JSX insertions (elements with multiple children, including expressions).
 * Replaces complex JSX structures with variable-based translations.
 */
export const handleJsxInsertionBabel = (
  path: NodePath<t.JSXElement | t.JSXFragment>,
  fileCode: string,
  existingKeys: Set<string>,
  getComponentKeyForPath: (path: NodePath) => string,
  extractedContent: Record<string, Record<string, string>>,
  replacements: BabelReplacement[],
  handledNodes: Set<t.Node>
): boolean => {
  const children = path.node.children;

  if (children.length <= 1) return false;

  const parts: {
    type: 'text' | 'var';
    value: string;
    originalExpr?: string;
  }[] = [];
  let hasSignificantText = false;
  let hasVariables = false;

  /** Insertion variable name per source expression, unique within the text. */
  const variableNames = new Map<string, string>();
  const insertionExpressions: { name: string; node: t.Expression }[] = [];
  /** Nodes folded into the message, so no other replacement rewrites them. */
  const foldedNodes: t.Node[] = [];

  const pushVariable = (expression: t.Expression): void => {
    const originalExpr = fileCode.substring(expression.start!, expression.end!);
    let name = variableNames.get(originalExpr);

    if (name) {
      // A repeated expression is dropped from the code: keep its strings as is
      t.traverseFast(expression, (node) => {
        if (t.isStringLiteral(node) || t.isTemplateLiteral(node))
          foldedNodes.push(node);
      });
    } else {
      const baseName = getInsertionVariableName(expression);
      const usedNames = new Set(variableNames.values());
      name = baseName;
      for (let index = 2; usedNames.has(name); index++) {
        name = `${baseName}${index}`;
      }
      variableNames.set(originalExpr, name);
      insertionExpressions.push({ name, node: expression });
    }

    parts.push({ type: 'var', value: name, originalExpr });
    hasVariables = true;
  };

  for (const child of children) {
    if (t.isJSXText(child)) {
      const text = normalizeJsxText(child.value);

      if (text.trim().length > 0) hasSignificantText = true;

      parts.push({ type: 'text', value: text });
    } else if (t.isJSXExpressionContainer(child)) {
      const expression = child.expression;

      if (t.isJSXEmptyExpression(expression)) {
        parts.push({ type: 'text', value: '' });
      } else if (t.isStringLiteral(expression)) {
        // `{' '}` and `{'text'}` are text of the message
        if (hasLiteralPlaceholder(expression.value)) return false;
        if (expression.value.trim().length > 0) hasSignificantText = true;
        parts.push({ type: 'text', value: expression.value });
        foldedNodes.push(expression);
      } else if (t.isTemplateLiteral(expression)) {
        foldedNodes.push(expression);
        if (
          expression.quasis.some((quasi) =>
            hasLiteralPlaceholder(quasi.value.raw)
          )
        )
          return false;
        for (let index = 0; index < expression.quasis.length; index++) {
          parts.push({
            type: 'text',
            value: expression.quasis[index]?.value.raw ?? '',
          });
          const subExpression = expression.expressions[index];
          if (subExpression) {
            if (!t.isExpression(subExpression) || containsJsx(subExpression))
              return false;
            pushVariable(subExpression);
          }
        }
      } else if (containsJsx(expression)) {
        // Elements as values are framework-specific: keep the texts apart
        return false;
      } else {
        pushVariable(expression);
      }
    } else {
      return false;
    }
  }

  if (!hasSignificantText) return false;

  let combinedString = '';
  for (const part of parts) {
    if (part.type === 'var') combinedString += `{{${part.value}}}`;
    else combinedString += part.value;
  }

  const cleanString = combinedString.replace(/\s+/g, ' ').trim();

  if (shouldExtract(cleanString)) {
    const componentKey = getComponentKeyForPath(path);
    const key = getOrGenerateKey(
      cleanString,
      componentKey,
      existingKeys,
      extractedContent
    );

    const varMap = parts
      .filter((part) => part.type === 'var')
      .map((part) => `${part.value}: ${part.originalExpr}`);
    const uniqueVars = Array.from(new Set(varMap));

    if (hasVariables) {
      replacements.push({
        path,
        key,
        type: 'jsx-insertion',
        componentKey,
        childrenToReplace: children,
        variables: uniqueVars,
        insertionExpressions,
      });
    } else {
      replacements.push({
        path,
        key,
        type: 'jsx-text-combined',
        componentKey,
        childrenToReplace: children,
      });
    }

    for (const node of [...children, ...foldedNodes]) handledNodes.add(node);
    return true;
  }

  return false;
};

/**
 * Traverses the AST to identify components and extract content.
 * Returns extraction results and metadata about which components need Intlayer hooks.
 */
export const extractBabelContentForComponents = (
  ast: t.File,
  fileCode: string,
  existingKeys: Set<string>,
  defaultKey: string = 'default',
  configuration: IntlayerConfig,
  filePath: string,
  unmergedDictionaries: Record<string, unknown> = {},
  selection?: SourceSelection
): {
  extractedContent: Record<string, Record<string, string>>;
  replacements: BabelReplacement[];
  componentsNeedingHooks: Set<NodePath>;
  componentKeyMap: Map<t.Node, string>;
  componentPaths: NodePath[];
  hookMap: Map<t.Node, 'useIntlayer' | 'getIntlayer'>;
  /** Cached `getExistingIntlayerInfo` result per component node, so callers do not re-traverse. */
  existingInfoByNode: Map<t.Node, ExistingIntlayerInfo | undefined>;
  isSolid: boolean;
} => {
  let extractedContent: Record<string, Record<string, string>> = {};
  const replacements: BabelReplacement[] = [];
  const handledNodes = new Set<t.Node>();
  const componentKeyMap = new Map<t.Node, string>();
  const hookMap = new Map<t.Node, 'useIntlayer' | 'getIntlayer'>();
  const usedKeysInFile = new Set<string>();
  let globalFileKey: string | undefined;

  const componentPaths: NodePath[] = [];

  traverse(ast, {
    Program(path) {
      componentPaths.push(path);
    },
    FunctionDeclaration(path) {
      componentPaths.push(path);
    },
    ArrowFunctionExpression(path) {
      componentPaths.push(path);
    },
    FunctionExpression(path) {
      componentPaths.push(path);
    },
  });

  // `getExistingIntlayerInfo` traverses the component body, so resolve it a
  // single time per component and share the cache with every later phase
  // (including the caller, via the returned `existingInfoByNode`).
  const existingInfoByNode = new Map<
    t.Node,
    ExistingIntlayerInfo | undefined
  >();
  const componentNodeToPath = new Map<t.Node, NodePath>();
  for (const path of componentPaths) {
    existingInfoByNode.set(path.node, getExistingIntlayerInfo(path));
    componentNodeToPath.set(path.node, path);
  }

  // Pre-scan non-Program paths to collect their existing dictionary keys before the
  // Program scope is assigned. Without this, Program is processed first (depth-first
  // traversal) and creates a new file-path-derived key even when a child component
  // already declares a specific dictionary (e.g. useIntlayer('dashboard-sidebar')).
  for (const path of componentPaths) {
    if (path.isProgram()) continue;
    const existingInfo = existingInfoByNode.get(path.node);
    if (existingInfo) {
      usedKeysInFile.add(existingInfo.key);
    }
  }

  for (const path of componentPaths) {
    const existingInfo = existingInfoByNode.get(path.node);

    if (existingInfo) {
      componentKeyMap.set(path.node, existingInfo.key);
      usedKeysInFile.add(existingInfo.key);
      hookMap.set(path.node, existingInfo.hook);
    } else {
      if (path.isProgram()) {
        if (!globalFileKey) {
          // Reuse the dominant existing key from child components so that
          // module-level strings join the same dictionary rather than
          // creating a new file-path-derived one (e.g. 'route').
          const dominantKey =
            usedKeysInFile.size > 0 ? [...usedKeysInFile][0] : undefined;
          if (dominantKey) {
            globalFileKey = dominantKey;
          } else {
            globalFileKey = resolveDictionaryKey(
              defaultKey,
              filePath,
              configuration,
              unmergedDictionaries,
              usedKeysInFile
            );
            usedKeysInFile.add(globalFileKey);
          }
        }
        componentKeyMap.set(path.node, globalFileKey);
        hookMap.set(path.node, 'getIntlayer');
      } else {
        let inheritedKey: string | undefined;
        let parent: NodePath | null = path.parentPath;
        while (parent) {
          if (componentKeyMap.has(parent.node)) {
            inheritedKey = componentKeyMap.get(parent.node);
            break;
          }
          parent = parent.parentPath;
        }

        if (!inheritedKey) {
          if (!globalFileKey) {
            globalFileKey = resolveDictionaryKey(
              defaultKey,
              filePath,
              configuration,
              unmergedDictionaries,
              usedKeysInFile
            );
            usedKeysInFile.add(globalFileKey);
          }
          inheritedKey = globalFileKey;
        }

        componentKeyMap.set(path.node, inheritedKey);

        const compName = getComponentName(path);
        const isComponent = compName ? /^[A-Z]/.test(compName) : false;
        const isHook = compName ? /^use[A-Z]/.test(compName) : false;
        hookMap.set(
          path.node,
          isComponent || isHook ? 'useIntlayer' : 'getIntlayer'
        );
      }
    }
  }

  // Field names a new string must not take: the ones the components already
  // read through their hook (their text may differ), and for a partial
  // extraction, which merges, every field declared in the target dictionaries.
  for (const path of componentPaths) {
    const existingInfo = existingInfoByNode.get(path.node);
    const readFields = existingInfo
      ? getReadFieldsOfComponent(path, existingInfo)
      : new Set<string>();
    const reservedNames =
      selection || readFields === 'all'
        ? getDeclaredFieldNames(
            unmergedDictionaries,
            componentKeyMap.get(path.node) ?? defaultKey
          )
        : readFields;

    for (const name of reservedNames) existingKeys.add(name);
  }

  const getComponentKeyForPath = (path: NodePath): string => {
    let current: NodePath | null = path;
    while (current) {
      if (componentKeyMap.has(current.node)) {
        return componentKeyMap.get(current.node)!;
      }
      current = current.parentPath;
    }
    return globalFileKey || defaultKey;
  };

  const ignoreDirectives = getExtractionIgnoreDirectives(fileCode);

  /**
   * Start offset of the JSX element a string directly belongs to: its text,
   * a `{'literal'}` child, or one of its attributes.
   */
  const getEnclosingJsxElementStart = (path: NodePath): number | undefined => {
    let current: NodePath | null = path.parentPath;

    if (current?.isJSXExpressionContainer()) current = current.parentPath;
    if (current?.isJSXAttribute()) current = current.parentPath;
    if (current?.isJSXOpeningElement()) current = current.parentPath;

    return current?.isJSXElement() || current?.isJSXFragment()
      ? (current.node.start ?? undefined)
      : undefined;
  };

  /**
   * Whether an `intlayer-ignore-line` / `intlayer-ignore-next-line` directive
   * covers the string: on the line where its text starts, or on the opening
   * tag of its JSX element.
   */
  const isIgnoredPath = (path: NodePath): boolean => {
    const { node } = path;

    if (typeof node.start === 'number') {
      const text = t.isJSXText(node) ? node.value : '';
      const leadingWhitespaceLength = text.length - text.trimStart().length;

      if (
        ignoreDirectives.isOffsetIgnored(node.start + leadingWhitespaceLength)
      )
        return true;
    }

    return ignoreDirectives.isOffsetIgnored(getEnclosingJsxElementStart(path));
  };

  traverse(ast, {
    JSXElement(path) {
      if (handledNodes.has(path.node)) return;
      if (isIgnoredPath(path)) return;

      handleJsxInsertionBabel(
        path,
        fileCode,
        existingKeys,
        getComponentKeyForPath,
        extractedContent,
        replacements,
        handledNodes
      );
    },
    JSXFragment(path) {
      if (handledNodes.has(path.node)) return;
      if (isIgnoredPath(path)) return;

      handleJsxInsertionBabel(
        path,
        fileCode,
        existingKeys,
        getComponentKeyForPath,
        extractedContent,
        replacements,
        handledNodes
      );
    },
    JSXText(path) {
      if (handledNodes.has(path.node)) return;
      if (isIgnoredPath(path)) return;

      const text = path.node.value;

      if (shouldExtract(text)) {
        const componentKey = getComponentKeyForPath(path);
        const key = getOrGenerateKey(
          text.replace(/\s+/g, ' ').trim(),
          componentKey,
          existingKeys,
          extractedContent
        );
        replacements.push({ path, key, type: 'jsx-text', componentKey });
      }
    },
    JSXAttribute(path) {
      if (handledNodes.has(path.node)) return;
      if (isIgnoredPath(path)) return;

      const name = path.node.name.name;

      if (
        typeof name !== 'string' ||
        !ATTRIBUTES_TO_EXTRACT.includes(name as any)
      )
        return;
      const value = path.node.value;

      if (
        t.isStringLiteral(value) &&
        !hasLiteralPlaceholder(value.value) &&
        shouldExtract(value.value)
      ) {
        const componentKey = getComponentKeyForPath(path);
        const key = getOrGenerateKey(
          value.value.trim(),
          componentKey,
          existingKeys,
          extractedContent
        );
        replacements.push({ path, key, type: 'jsx-attribute', componentKey });
      }
    },
    StringLiteral(path) {
      if (handledNodes.has(path.node)) return;
      if (isIgnoredPath(path)) return;

      const text = path.node.value;

      if (hasLiteralPlaceholder(text) || !shouldExtract(text)) return;

      const parent = path.parentPath;

      if (
        parent.isImportDeclaration() ||
        parent.isImportSpecifier() ||
        parent.isExportDeclaration()
      )
        return;

      if (parent.isJSXAttribute()) return;

      if (isNonTranslatableJsxAttributeValue(path)) return;

      if (isInsideClassNameBuilderCall(path)) return;

      // Skip string literals used as comparison operands (e.g. `msg.step === 'ERROR'`).
      // These are code constants / enum values, not translatable display text.
      if (
        parent.isBinaryExpression() &&
        COMPARISON_OPERATORS.has(parent.node.operator)
      ) {
        return;
      }

      // Skip string literals used as `switch` case tests (e.g. `case 'ERROR':`).
      // Like comparisons, these are code constants, not display text.
      if (parent.isSwitchCase() && parent.node.test === path.node) return;

      // Skip string literals passed to technical or logging calls, e.g.
      // `message.includes('Loading chunk')` or `console.log('...')`. These are
      // code operands and developer output, not display text.
      if (isNonTranslatableCallArgument(path)) return;

      if (parent.isObjectProperty() && parent.node.key === path.node) return;

      // Skip string values in known technical/non-translatable object properties (e.g. `icon: 'Globe'`).
      // String values in translatable object properties (e.g. `label: 'Language'`) are still extracted.
      if (isTechnicalPropertyValue(path)) return;

      if (parent.isMemberExpression() && parent.node.property === path.node)
        return;

      const componentKey = getComponentKeyForPath(path);
      const key = getOrGenerateKey(
        text.trim(),
        componentKey,
        existingKeys,
        extractedContent
      );
      replacements.push({ path, key, type: 'string-literal', componentKey });
    },
    TemplateLiteral(path) {
      if (handledNodes.has(path.node)) return;
      if (isIgnoredPath(path)) return;

      if (isNonTranslatableJsxAttributeValue(path)) return;

      if (isInsideClassNameBuilderCall(path)) return;

      if (isTechnicalPropertyValue(path)) return;

      if (isNonTranslatableCallArgument(path)) return;

      const { quasis, expressions } = path.node;

      if (quasis.some((quasi) => hasLiteralPlaceholder(quasi.value.raw)))
        return;

      // Build the combined string with placeholders
      let combinedString = '';
      const variables: string[] = [];
      let hasSignificantText = false;

      for (let i = 0; i < quasis.length; i++) {
        const text = quasis[i]?.value.raw ?? '';
        combinedString += text;
        if (text.trim().length > 0) hasSignificantText = true;

        if (i < expressions.length) {
          const expr = expressions[i];
          if (t.isIdentifier(expr)) {
            combinedString += `{{${expr.name}}}`;
            variables.push(`${expr.name}: ${expr.name}`);
          } else if (t.isMemberExpression(expr)) {
            const code = fileCode.substring(expr.start!, expr.end!);
            const varName = t.isIdentifier(expr.property)
              ? expr.property.name
              : 'var';
            combinedString += `{{${varName}}}`;
            variables.push(`${varName}: ${code}`);
          } else {
            // Complex expression in template literal, skip
            return;
          }
        }
      }

      if (!hasSignificantText) return;

      const cleanString = combinedString.replace(/\s+/g, ' ').trim();

      if (!shouldExtract(cleanString)) return;

      const componentKey = getComponentKeyForPath(path);
      const key = getOrGenerateKey(
        cleanString,
        componentKey,
        existingKeys,
        extractedContent
      );

      const uniqueVars = Array.from(new Set(variables));

      replacements.push({
        path,
        key,
        type: 'template-literal',
        componentKey,
        variables: uniqueVars,
      });
    },
  });

  // Extract only what the selection covers: hooks are then injected only in
  // the components that receive one of the kept replacements.
  if (selection) {
    const selectedReplacements = replacements.filter((replacement) =>
      isReplacementInSelection(replacement, selection)
    );
    const selectedContent: Record<string, Record<string, string>> = {};

    for (const { componentKey, key } of selectedReplacements) {
      const value = extractedContent[componentKey]?.[key];

      if (value === undefined) continue;

      selectedContent[componentKey] ??= {};
      selectedContent[componentKey][key] = value;
    }

    replacements.splice(0, replacements.length, ...selectedReplacements);
    extractedContent = selectedContent;
  }

  /** Returns true when `componentNode` encloses the replacement's path. */
  const replacementIsInside = (
    replacement: BabelReplacement,
    componentNode: t.Node
  ): boolean => {
    let current: NodePath | null = replacement.path;
    while (current) {
      if (current.node === componentNode) return true;
      current = current.parentPath;
    }
    return false;
  };

  const componentsNeedingHooks = new Set<NodePath>();
  for (const componentPath of componentPaths) {
    if (componentPath.isProgram()) {
      // Only count replacements that belong to the Program scope itself, not
      // to a nested component (which provides its own hook).
      const hasDirectReplacements = replacements.some((replacement) => {
        let current: NodePath | null = replacement.path;
        while (current) {
          if (current.node === componentPath.node) {
            return true;
          }
          if (componentNodeToPath.has(current.node)) {
            return false; // reached an enclosing component first
          }
          current = current.parentPath;
        }
        return false;
      });

      if (hasDirectReplacements) {
        componentsNeedingHooks.add(componentPath);
      }
      continue;
    }

    const hasReplacements = replacements.some((replacement) =>
      replacementIsInside(replacement, componentPath.node)
    );

    if (hasReplacements) {
      const key = componentKeyMap.get(componentPath.node)!;
      let ancestorProvidesKey = false;
      let currentPath: NodePath | null = componentPath.parentPath;
      while (currentPath) {
        const ancestorPath = componentNodeToPath.get(currentPath.node);

        if (ancestorPath && !ancestorPath.isProgram()) {
          const ancestorKey = componentKeyMap.get(ancestorPath.node);

          if (ancestorKey === key) {
            const ancestorHasReplacements = replacements.some((replacement) =>
              replacementIsInside(replacement, ancestorPath.node)
            );
            const existingInfo = existingInfoByNode.get(ancestorPath.node);

            if (ancestorHasReplacements || existingInfo) {
              ancestorProvidesKey = true;
              break;
            }
          }
        }
        currentPath = currentPath.parentPath;
      }

      if (!ancestorProvidesKey) {
        componentsNeedingHooks.add(componentPath);
      }
    }
  }

  return {
    extractedContent,
    replacements,
    componentsNeedingHooks,
    componentKeyMap,
    componentPaths,
    hookMap,
    existingInfoByNode,
    isSolid: false,
  };
};

/**
 * High-level function to extract content from TS/JS/JSX/TSX AST.
 */
export const extractTsContent = (
  ast: t.File,
  fileCode: string,
  existingKeys: Set<string>,
  configuration: IntlayerConfig,
  filePath: string,
  unmergedDictionaries: Record<string, unknown> = {}
): {
  extractedContent: Record<string, string>;
  replacements: BabelReplacement[];
} => {
  const { extractedContent, replacements } = extractBabelContentForComponents(
    ast,
    fileCode,
    existingKeys,
    'default',
    configuration,
    filePath,
    unmergedDictionaries
  );

  const flatContent: Record<string, string> = {};
  for (const group of Object.values(extractedContent)) {
    Object.assign(flatContent, group);
  }

  return { extractedContent: flatContent, replacements };
};
