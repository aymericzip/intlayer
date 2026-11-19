import { isParsableExpression } from '@intlayer/lsp/utils';
import { ANGULAR_INLINE_TEMPLATE_PATTERN } from './extractScript';

/** Angular external component template (`templateUrl: './app.html'`). */
const ANGULAR_TEMPLATE_URL_PATTERN = /templateUrl\s*:\s*(["'`])(.*?)\1/g;

/** `{{ expression }}` */
const INTERPOLATION_PATTERN = /{{([\s\S]*?)}}/g;

/**
 * Attribute bindings: `[prop]="…"`, `(event)="…"`, `[(model)]="…"`,
 * `*ngIf="…"`, `bind-prop="…"`, `on-event="…"`.
 */
const ATTRIBUTE_BINDING_PATTERN =
  /(?:\[[^\]\s=]*\]|\([^)\s=]*\)|\*[\w-]+|(?:bind|on|bindon)-[\w.-]+)\s*=\s*(["'])([\s\S]*?)\1/g;

/** Control-flow blocks whose parameters are expressions. */
const CONTROL_FLOW_PATTERN = /@(?:if|else\s+if|for|switch|case)\s*\(/g;

/** `@let name = expression;` */
const LET_DECLARATION_PATTERN = /@let\s+[\w$]+\s*=\s*([^;]+);/g;

/** Pipe application: `value | date:'short'` (not `||`). */
const PIPE_PATTERN =
  /(?<!\|)\|(?!\|)\s*[\w$]+(?:\s*:\s*(?:'[^']*'|"[^"]*"|[^|:)\]},;]+))*/g;

/**
 * Micro-syntax segment prefixes: `let item of`, `let i = `, `track`,
 * `trackBy:`, `as alias`.
 */
const MICRO_SYNTAX_PREFIX_PATTERN =
  /^(?:let\s+[\w$]+\s*(?:=\s*|of\s+)?|[\w$]+\s+of\s+|track\s+|[\w$]+\s*:\s*)/;

/** Body of the parenthesis opened at `openIndex`, nesting-aware. */
const readParenthesized = (text: string, openIndex: number): string | null => {
  let depth = 0;

  for (let index = openIndex; index < text.length; index++) {
    if (text[index] === '(') depth++;
    if (text[index] === ')') depth--;
    if (depth === 0) return text.slice(openIndex + 1, index);
  }

  return null;
};

/**
 * Split an Angular expression (or micro-syntax: `let item of items; track
 * item.id`) into plain JS expressions, pipes and aliases removed.
 */
const toJavaScriptExpressions = (angularExpression: string): string[] =>
  angularExpression
    .replace(PIPE_PATTERN, '')
    .split(';')
    .map((segment) =>
      segment
        .trim()
        .replace(MICRO_SYNTAX_PREFIX_PATTERN, '')
        .replace(/\s+as\s+[\w$]+\s*$/, '')
        .trim()
    )
    .filter((expression) => expression && isParsableExpression(expression));

/**
 * The JS expressions an Angular template evaluates: interpolations,
 * attribute bindings, control-flow parameters and `@let` declarations.
 * Expressions that do not parse are dropped, so one unsupported syntax does
 * not void the file analysis.
 */
export const extractAngularTemplateExpressions = (
  template: string
): string[] => {
  const angularExpressions: string[] = [
    ...[...template.matchAll(INTERPOLATION_PATTERN)].map((match) => match[1]!),
    ...[...template.matchAll(ATTRIBUTE_BINDING_PATTERN)].map(
      (match) => match[2]!
    ),
    ...[...template.matchAll(LET_DECLARATION_PATTERN)].map(
      (match) => match[1]!
    ),
  ];

  for (const match of template.matchAll(CONTROL_FLOW_PATTERN)) {
    const parameters = readParenthesized(
      template,
      match.index + match[0].length - 1
    );

    if (parameters) angularExpressions.push(parameters);
  }

  return angularExpressions.flatMap(toJavaScriptExpressions);
};

/** `template: [expressions]` — read by the analyzer as decorator code. */
const toTemplateProperty = (template: string): string =>
  `template: [${extractAngularTemplateExpressions(template).join(', ')}]`;

/**
 * Rewrite the templates of an Angular component file (inline `template:` and
 * external `templateUrl:`) into `template: [expressions]`, so the analyzer
 * resolves their reads of the component fields.
 *
 * @param text - The component source.
 * @param readTemplateFile - Reads a `templateUrl` (as written), `null` when
 * unreadable.
 */
export const inlineAngularTemplates = async (
  text: string,
  readTemplateFile: (templateUrl: string) => Promise<string | null>
): Promise<string> => {
  if (!text.includes('@Component')) return text;

  const withInlineTemplates = text.replace(
    ANGULAR_INLINE_TEMPLATE_PATTERN,
    (_match, _quote, template: string) => toTemplateProperty(template)
  );

  const templateUrls = [
    ...withInlineTemplates.matchAll(ANGULAR_TEMPLATE_URL_PATTERN),
  ].map((match) => match[2]!);
  const templatesByUrl = new Map(
    await Promise.all(
      templateUrls.map(
        async (templateUrl) =>
          [templateUrl, await readTemplateFile(templateUrl)] as const
      )
    )
  );

  return withInlineTemplates.replace(
    ANGULAR_TEMPLATE_URL_PATTERN,
    (match, _quote, templateUrl: string) => {
      const template = templatesByUrl.get(templateUrl);

      return template === null || template === undefined
        ? match
        : toTemplateProperty(template);
    }
  );
};
