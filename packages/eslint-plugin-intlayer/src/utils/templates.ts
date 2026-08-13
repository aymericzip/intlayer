import type { AstNode, AstNodeWithParent } from './ast';

/**
 * Template-language support for text-coverage rules.
 *
 * Intlayer ships integrations for React, Vue, Svelte, Angular, Astro, Solid,
 * Preact and Lit, and each ecosystem's ESLint parser models markup differently:
 *
 * | Framework | Parser                          | Text node   | Attribute node  | Lives in        |
 * | --------- | ------------------------------- | ----------- | --------------- | --------------- |
 * | React/JSX | espree, typescript-eslint       | `JSXText`   | `JSXAttribute`  | main AST        |
 * | Astro     | astro-eslint-parser             | `JSXText`   | `JSXAttribute`  | main AST        |
 * | Svelte    | svelte-eslint-parser            | `SvelteText`| `SvelteAttribute`| main AST       |
 * | Angular   | @angular-eslint/template-parser | `Text`      | `TextAttribute` | main AST        |
 * | Vue       | vue-eslint-parser               | `VText`     | `VAttribute`    | `templateBody`  |
 *
 * Vue is the only one that hides its template behind
 * `parserServices.defineTemplateBodyVisitor`; every other parser exposes markup
 * in the AST a normal visitor already walks. Node type names do not collide
 * across parsers, so one merged visitor is safe to hand to any of them — a
 * Svelte file simply never emits a `VText`.
 */

/** One piece of literal text found in markup. */
export type TemplateTextFinding = {
  /** Node to report on. */
  node: AstNode;
  /** The literal text. */
  text: string;
  /** Attribute name when the text is an attribute value, else `null`. */
  attributeName: string | null;
  /** Tag name of the enclosing element, when resolvable. */
  elementName: string | null;
};

/** Callback invoked for every literal text node the visitors find. */
export type TemplateTextReporter = (finding: TemplateTextFinding) => void;

/** A visitor object as returned from a rule's `create`. */
export type TemplateVisitor = Record<string, (node: never) => void>;

/**
 * Element node types whose text content is never user-facing copy, regardless
 * of the `ignoreElements` option (which matches on tag name, and these carry
 * none in some parsers).
 */
const NON_CONTENT_ELEMENT_TYPES = new Set([
  'SvelteScriptElement',
  'SvelteStyleElement',
]);

/** Element node types, per parser, that carry a tag name. */
const ELEMENT_TYPES = new Set([
  'VElement',
  'SvelteElement',
  'Element',
  'JSXElement',
  'JSXOpeningElement',
]);

/**
 * Read the tag name off an element node, normalising the three shapes parsers
 * use: a plain string (Vue, Angular), a `SvelteName` node (Svelte), and a JSX
 * name node.
 *
 * @param element - An element node.
 */
const readElementName = (element: AstNode): string | null => {
  const name = element['name'];

  if (typeof name === 'string') return name;

  if (name && typeof name === 'object') {
    const nameNode = name as AstNode;

    if (typeof nameNode['name'] === 'string') return nameNode['name'];
  }

  // JSXElement holds its name on the opening element.
  const openingElement = element['openingElement'] as AstNode | undefined;

  if (openingElement) return readElementName(openingElement);

  return null;
};

/**
 * Walk up to the nearest enclosing element and return its tag name, or the
 * sentinel `false` when the text sits inside a `<script>`/`<style>` block that
 * should never be reported.
 *
 * @param node - The text or attribute node to start from.
 */
export const resolveEnclosingElement = (
  node: AstNodeWithParent | undefined
): string | null | false => {
  let current = node?.parent;

  while (current) {
    if (NON_CONTENT_ELEMENT_TYPES.has(current.type)) return false;

    if (ELEMENT_TYPES.has(current.type)) return readElementName(current);

    current = current.parent;
  }

  return null;
};

/**
 * Report a finding unless it sits inside a non-content element.
 *
 * @param report - The rule's reporter.
 * @param node - Node to report on.
 * @param text - The literal text.
 * @param attributeName - Attribute name, or `null` for element text.
 */
const reportWithElement = (
  report: TemplateTextReporter,
  node: AstNodeWithParent,
  text: string,
  attributeName: string | null
): void => {
  const elementName = resolveEnclosingElement(node);

  if (elementName === false) return;

  report({ node, text, attributeName, elementName });
};

/**
 * Visitors covering every non-JSX template language Intlayer supports.
 *
 * JSX (React, Preact, Solid, Astro, Lit templates compiled through JSX) is
 * handled by the rule itself, since `JSXText`/`JSXAttribute` also need the
 * non-template code paths.
 *
 * @param report - Called for each literal text node found.
 */
export const createTemplateVisitor = (
  report: TemplateTextReporter
): TemplateVisitor => ({
  // ── Vue ────────────────────────────────────────────────────────────────
  VText: (node: never) => {
    const astNode = node as AstNodeWithParent;

    reportWithElement(report, astNode, astNode['value'] as string, null);
  },

  VAttribute: (node: never) => {
    const astNode = node as AstNodeWithParent;

    // Directives (`:title`, `v-bind:title`) hold an expression, not literal text.
    if (astNode['directive'] === true) return;

    const key = astNode['key'] as AstNode | undefined;
    const value = astNode['value'] as AstNode | undefined;
    const attributeName = key?.['name'];
    const text = value?.['value'];

    if (typeof attributeName !== 'string' || typeof text !== 'string') return;

    reportWithElement(report, astNode, text, attributeName);
  },

  // ── Svelte ─────────────────────────────────────────────────────────────
  SvelteText: (node: never) => {
    const astNode = node as AstNodeWithParent;

    reportWithElement(report, astNode, astNode['value'] as string, null);
  },

  SvelteAttribute: (node: never) => {
    const astNode = node as AstNodeWithParent;
    const key = astNode['key'] as AstNode | undefined;
    const attributeName = key?.['name'];

    if (typeof attributeName !== 'string') return;

    // The value is a list of parts; a single literal part means a static value,
    // anything else interpolates and is not raw copy.
    const parts = astNode['value'] as AstNode[] | undefined;

    if (parts?.length !== 1) return;

    const part = parts[0];

    if (part?.type !== 'SvelteLiteral') return;

    const text = part['value'];

    if (typeof text !== 'string') return;

    reportWithElement(report, astNode, text, attributeName);
  },

  // ── Angular ────────────────────────────────────────────────────────────
  Text: (node: never) => {
    const astNode = node as AstNodeWithParent;
    const text = astNode['value'];

    if (typeof text !== 'string') return;

    reportWithElement(report, astNode, text, null);
  },

  TextAttribute: (node: never) => {
    const astNode = node as AstNodeWithParent;
    const attributeName = astNode['name'];
    const text = astNode['value'];

    if (typeof attributeName !== 'string' || typeof text !== 'string') return;

    reportWithElement(report, astNode, text, attributeName);
  },
});

/** Parser services that expose a Vue template body. */
type VueParserServices = {
  defineTemplateBodyVisitor?: (
    templateVisitor: TemplateVisitor,
    scriptVisitor: TemplateVisitor
  ) => TemplateVisitor;
};

/**
 * Combine a script visitor and a template visitor into the single object the
 * active parser expects.
 *
 * Vue keeps its template in a side AST reachable only through
 * `defineTemplateBodyVisitor`; every other parser puts markup in the main AST,
 * where a merged visitor object is enough.
 *
 * @param parserServices - `context.sourceCode.parserServices`.
 * @param scriptVisitor - Handlers for ordinary script nodes.
 * @param templateVisitor - Handlers for markup nodes.
 */
export const combineVisitors = (
  parserServices: unknown,
  scriptVisitor: TemplateVisitor,
  templateVisitor: TemplateVisitor
): TemplateVisitor => {
  const services = parserServices as VueParserServices | undefined;

  if (typeof services?.defineTemplateBodyVisitor === 'function') {
    return services.defineTemplateBodyVisitor(templateVisitor, scriptVisitor);
  }

  return { ...scriptVisitor, ...templateVisitor };
};
