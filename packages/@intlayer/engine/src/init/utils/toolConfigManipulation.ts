import * as recast from 'recast';
import { typescriptParser } from '../../utils/babelParser';
import { firstInsertIndex, isModuleScopeBinding } from './astImports';
import { LINT_PLUGIN_PACKAGE_NAME } from './lintConfig';
import { PRETTIER_PLUGIN_PACKAGE_NAME } from './prettierConfig';

const { builders: b, namedTypes: n } = recast.types;

/** ESLint flat config file names, in the order ESLint resolves them. */
export const ESLINT_FLAT_CONFIG_FILES = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.ts',
  'eslint.config.mts',
  'eslint.config.cts',
];

/** Prettier config files holding JavaScript / TypeScript. */
export const SCRIPT_PRETTIER_CONFIG_FILES = [
  'prettier.config.js',
  'prettier.config.mjs',
  'prettier.config.cjs',
  'prettier.config.ts',
  'prettier.config.mts',
  'prettier.config.cts',
  '.prettierrc.js',
  '.prettierrc.mjs',
  '.prettierrc.cjs',
  '.prettierrc.ts',
  '.prettierrc.mts',
  '.prettierrc.cts',
];

/** Prettier config files holding YAML. */
export const YAML_PRETTIER_CONFIG_FILES = [
  '.prettierrc.yaml',
  '.prettierrc.yml',
];

/**
 * Outcome of a config patch: `updated` carries the rewritten file, `already`
 * means the plugin is wired, `unsupported` that the file shape is not one the
 * patcher can edit safely (the caller prints the manual snippet instead).
 */
export type ToolConfigPatchResult =
  | { status: 'updated'; content: string }
  | { status: 'already' | 'unsupported' };

/** Local name the plugin default import is bound to. */
const LINT_PLUGIN_BINDING = 'intlayer';

/**
 * Prints the AST with the quote style the file already uses (single quotes
 * unless the source prefers double ones), so injected strings match it.
 */
const printWithSourceQuotes = (ast: any, source: string): string => {
  const singleQuoteCount = (source.match(/'/g) ?? []).length;
  const doubleQuoteCount = (source.match(/"/g) ?? []).length;

  return recast.print(ast, {
    quote: doubleQuoteCount > singleQuoteCount ? 'double' : 'single',
  }).code;
};

/** Whether the file is CommonJS (`require` / `module.exports`). */
const isCommonJsFile = (content: string, extension: string): boolean =>
  extension === 'cjs' ||
  extension === 'cts' ||
  (content.includes('module.exports') && !/^\s*import\s/m.test(content));

/** Strips `satisfies` / `as` / parentheses wrappers from an expression. */
const unwrapExpression = (expression: any): any => {
  let current = expression;

  while (
    current &&
    (current.type === 'TSSatisfiesExpression' ||
      current.type === 'TSAsExpression' ||
      current.type === 'ParenthesizedExpression')
  ) {
    current = current.expression;
  }

  return current;
};

/** Finds the initializer of a top-level `const|let|var <name> = …`. */
const findTopLevelInitializer = (ast: any, name: string): any => {
  for (const statement of ast.program.body) {
    const declaration =
      statement.type === 'ExportNamedDeclaration'
        ? statement.declaration
        : statement;

    if (declaration?.type !== 'VariableDeclaration') continue;

    for (const declarator of declaration.declarations) {
      if (declarator.id?.type === 'Identifier' && declarator.id.name === name) {
        return declarator.init;
      }
    }
  }

  return undefined;
};

/**
 * Resolves the exported config expression (`export default …` or
 * `module.exports = …`), following one identifier indirection
 * (`const config = …; export default config`).
 */
const findExportedConfigExpression = (ast: any): any => {
  let exported: any;

  for (const statement of ast.program.body) {
    if (statement.type === 'ExportDefaultDeclaration') {
      exported = statement.declaration;
    } else if (
      statement.type === 'ExpressionStatement' &&
      statement.expression.type === 'AssignmentExpression' &&
      recast.print(statement.expression.left).code === 'module.exports'
    ) {
      exported = statement.expression.right;
    }
  }

  const unwrapped = unwrapExpression(exported);

  if (unwrapped?.type === 'Identifier') {
    return unwrapExpression(findTopLevelInitializer(ast, unwrapped.name));
  }

  return unwrapped;
};

/** Adds `import <binding> from '<source>'` (or its `require` form). */
const addDefaultImport = (
  ast: any,
  binding: string,
  source: string,
  isCommonJs: boolean
): void => {
  const declaration = isCommonJs
    ? b.variableDeclaration('const', [
        b.variableDeclarator(
          b.identifier(binding),
          b.callExpression(b.identifier('require'), [b.stringLiteral(source)])
        ),
      ])
    : b.importDeclaration(
        [b.importDefaultSpecifier(b.identifier(binding))],
        b.stringLiteral(source)
      );

  const body = ast.program.body;
  let insertIndex = firstInsertIndex(ast);

  if (isCommonJs) {
    // Group with the leading `const … = require(…)` statements.
    while (
      insertIndex < body.length &&
      body[insertIndex].type === 'VariableDeclaration' &&
      body[insertIndex].declarations.every(
        (declarator: any) =>
          declarator.init?.type === 'CallExpression' &&
          declarator.init.callee?.name === 'require'
      )
    ) {
      insertIndex++;
    }
  }

  body.splice(insertIndex, 0, declaration);
};

/**
 * Adds `...intlayer.configs.recommended` to an ESLint flat config, importing
 * `eslint-plugin-intlayer` when needed. Handles the exported array, and the
 * `defineConfig(…)` / `tseslint.config(…)` / `composer(…)`-style helpers
 * (array argument or variadic configs).
 */
export const addIntlayerPresetToEslintFlatConfig = (
  content: string,
  extension: string
): ToolConfigPatchResult => {
  if (content.includes(LINT_PLUGIN_PACKAGE_NAME)) return { status: 'already' };

  let ast: any;
  try {
    ast = recast.parse(content, { parser: typescriptParser });
  } catch {
    return { status: 'unsupported' };
  }

  const configExpression = findExportedConfigExpression(ast);

  /** Array the preset is spread into, when the config is (or wraps) one. */
  const targetArray =
    configExpression?.type === 'ArrayExpression'
      ? configExpression
      : configExpression?.type === 'CallExpression' &&
          configExpression.arguments.length === 1 &&
          unwrapExpression(configExpression.arguments[0])?.type ===
            'ArrayExpression'
        ? unwrapExpression(configExpression.arguments[0])
        : undefined;

  const isVariadicHelper =
    !targetArray && configExpression?.type === 'CallExpression';

  if (!targetArray && !isVariadicHelper) return { status: 'unsupported' };

  // A name clash with an unrelated `intlayer` binding falls back to an alias.
  const binding = isModuleScopeBinding(ast, LINT_PLUGIN_BINDING)
    ? 'intlayerPlugin'
    : LINT_PLUGIN_BINDING;

  if (isModuleScopeBinding(ast, binding)) return { status: 'unsupported' };

  const presetSpread = b.spreadElement(
    b.memberExpression(
      b.memberExpression(b.identifier(binding), b.identifier('configs')),
      b.identifier('recommended')
    )
  );

  if (targetArray) {
    targetArray.elements.push(presetSpread);
  } else {
    configExpression.arguments.push(presetSpread);
  }

  addDefaultImport(
    ast,
    binding,
    LINT_PLUGIN_PACKAGE_NAME,
    isCommonJsFile(content, extension)
  );

  return { status: 'updated', content: printWithSourceQuotes(ast, content) };
};

/**
 * Adds `prettier-plugin-intlayer` to the `plugins` of a JavaScript /
 * TypeScript Prettier config (`export default {…}`, `module.exports = {…}`,
 * or an exported `const config = {…}`).
 */
export const addIntlayerPluginToPrettierScriptConfig = (
  content: string
): ToolConfigPatchResult => {
  if (content.includes(PRETTIER_PLUGIN_PACKAGE_NAME)) {
    return { status: 'already' };
  }

  let ast: any;
  try {
    ast = recast.parse(content, { parser: typescriptParser });
  } catch {
    return { status: 'unsupported' };
  }

  const configObject = findExportedConfigExpression(ast);

  if (!n.ObjectExpression.check(configObject)) {
    return { status: 'unsupported' };
  }

  const pluginsProperty = (configObject.properties as any[]).find(
    (property) =>
      (property.key?.name ?? property.key?.value) === 'plugins' &&
      property.type !== 'SpreadElement'
  );
  const pluginLiteral = b.stringLiteral(PRETTIER_PLUGIN_PACKAGE_NAME);

  if (!pluginsProperty) {
    configObject.properties.push(
      b.property(
        'init',
        b.identifier('plugins'),
        b.arrayExpression([pluginLiteral])
      )
    );
  } else if (
    unwrapExpression(pluginsProperty.value)?.type === 'ArrayExpression'
  ) {
    unwrapExpression(pluginsProperty.value).elements.push(pluginLiteral);
  } else {
    return { status: 'unsupported' };
  }

  return { status: 'updated', content: printWithSourceQuotes(ast, content) };
};

/**
 * Adds `prettier-plugin-intlayer` to a YAML Prettier config: appends a
 * `plugins` block, or extends an existing block / flow list.
 */
export const addIntlayerPluginToPrettierYamlConfig = (
  content: string
): ToolConfigPatchResult => {
  if (content.includes(PRETTIER_PLUGIN_PACKAGE_NAME)) {
    return { status: 'already' };
  }

  const pluginsLineMatch = content.match(/^plugins:[ \t]*(.*)$/m);

  if (!pluginsLineMatch) {
    const separator = content.length > 0 && !content.endsWith('\n') ? '\n' : '';
    return {
      status: 'updated',
      content: `${content}${separator}plugins:\n  - ${PRETTIER_PLUGIN_PACKAGE_NAME}\n`,
    };
  }

  const inlineValue = (pluginsLineMatch[1] ?? '').trim();

  // Flow list: `plugins: [a, b]` / `plugins: []`.
  const flowListMatch = inlineValue.match(/^\[(.*)\]$/);
  if (flowListMatch) {
    const items = (flowListMatch[1] ?? '').trim();
    const nextList = items
      ? `[${items}, ${PRETTIER_PLUGIN_PACKAGE_NAME}]`
      : `[${PRETTIER_PLUGIN_PACKAGE_NAME}]`;

    return {
      status: 'updated',
      content: content.replace(pluginsLineMatch[0], `plugins: ${nextList}`),
    };
  }

  if (inlineValue !== '') return { status: 'unsupported' };

  // Block list: append after the last `- item` of the block.
  const lines = content.split('\n');
  const pluginsLineIndex = lines.findIndex((line) =>
    line.startsWith('plugins:')
  );
  let lastItemIndex = pluginsLineIndex;
  let indentation = '  ';

  for (let index = pluginsLineIndex + 1; index < lines.length; index++) {
    const line = lines[index] ?? '';
    const itemMatch = line.match(/^([ \t]*)-\s/);
    if (itemMatch) {
      lastItemIndex = index;
      indentation = itemMatch[1] ?? '';
    } else if (line.trim() !== '' && !/^\s/.test(line)) {
      break;
    }
  }

  lines.splice(
    lastItemIndex + 1,
    0,
    `${indentation}- ${PRETTIER_PLUGIN_PACKAGE_NAME}`
  );

  return { status: 'updated', content: lines.join('\n') };
};

/** Content declaration extensions TanStack Router must not treat as routes. */
export const CONTENT_DECLARATION_ROUTE_IGNORE_PATTERN =
  '\\.content\\.(ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml)$';

/** TanStack plugins accepting a router config, and where it lives. */
const TANSTACK_ROUTER_PLUGINS: Record<string, 'root' | 'router'> = {
  tanstackStart: 'router',
  tanstackRouter: 'root',
  TanStackRouterVite: 'root',
};

/** Whether a Vite config registers a TanStack Router / Start plugin. */
export const hasTanStackRouterVitePlugin = (content: string): boolean =>
  Object.keys(TANSTACK_ROUTER_PLUGINS).some((pluginName) =>
    content.includes(`${pluginName}(`)
  );

/**
 * Sets `routeFileIgnorePattern` on the TanStack Start / Router Vite plugin so
 * co-located `.content.*` files are not picked up as route files. An existing
 * string pattern is combined with the content one.
 */
export const setTanStackRouteFileIgnorePattern = (
  content: string
): ToolConfigPatchResult => {
  let ast: any;
  try {
    ast = recast.parse(content, { parser: typescriptParser });
  } catch {
    return { status: 'unsupported' };
  }

  // Mutated inside the visitor: an object keeps TS from narrowing it away.
  const outcome: { status: ToolConfigPatchResult['status'] } = {
    status: 'unsupported',
  };

  recast.visit(ast, {
    visitCallExpression(path) {
      const { callee, arguments: callArguments } = path.node as any;
      const location =
        callee.type === 'Identifier'
          ? TANSTACK_ROUTER_PLUGINS[callee.name]
          : undefined;

      if (!location) return this.traverse(path);

      if (callArguments.length === 0) {
        callArguments.push(b.objectExpression([]));
      }

      let optionsObject = callArguments[0];
      if (optionsObject.type !== 'ObjectExpression') return false;

      if (location === 'router') {
        let routerProperty = optionsObject.properties.find(
          (property: any) =>
            (property.key?.name ?? property.key?.value) === 'router'
        );

        if (!routerProperty) {
          routerProperty = b.property(
            'init',
            b.identifier('router'),
            b.objectExpression([])
          );
          optionsObject.properties.push(routerProperty);
        }

        if (routerProperty.value?.type !== 'ObjectExpression') return false;
        optionsObject = routerProperty.value;
      }

      const ignoreProperty = optionsObject.properties.find(
        (property: any) =>
          (property.key?.name ?? property.key?.value) ===
          'routeFileIgnorePattern'
      );

      if (!ignoreProperty) {
        optionsObject.properties.push(
          b.property(
            'init',
            b.identifier('routeFileIgnorePattern'),
            b.stringLiteral(CONTENT_DECLARATION_ROUTE_IGNORE_PATTERN)
          )
        );
        outcome.status = 'updated';
      } else if (
        ignoreProperty.value?.type === 'StringLiteral' &&
        ignoreProperty.value.value.includes('.content')
      ) {
        outcome.status = 'already';
      } else if (ignoreProperty.value?.type === 'StringLiteral') {
        ignoreProperty.value = b.stringLiteral(
          `(?:${ignoreProperty.value.value})|(?:${CONTENT_DECLARATION_ROUTE_IGNORE_PATTERN})`
        );
        outcome.status = 'updated';
      }

      return false;
    },
  });

  if (outcome.status === 'updated') {
    return { status: 'updated', content: printWithSourceQuotes(ast, content) };
  }

  return { status: outcome.status };
};
