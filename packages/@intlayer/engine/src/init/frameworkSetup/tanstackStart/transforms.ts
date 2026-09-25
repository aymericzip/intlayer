import * as recast from 'recast';
import { babelTsParser } from '../../../utils/babelParser';
import {
  ensureNamedImport,
  firstInsertIndex,
  isModuleScopeBinding,
} from '../../utils/astImports';
import { REQUEST_LOCALE_SERVER_FUNCTION } from './templates';

const { builders: b, namedTypes: n } = recast.types;

/** Module-scope identifier bound to the locale route's typed API. */
const LOCALE_ROUTE_API_VARIABLE = 'localeRoute';

/** babel-ts parser handles TypeScript *and* JSX. */
const parseTsx = (code: string): any =>
  recast.parse(code, { parser: babelTsParser });

/** Result of a source transform. `code` is unchanged for any non-`wrapped` status. */
export type TransformResult = {
  code: string;
  status: 'wrapped' | 'already' | 'skipped';
};

/**
 * Finds the single function that returns the `<html>` document element. Returns
 * `null` when there is no such function, or more than one (ambiguous).
 */
const findHtmlDocumentFunction = (ast: any): any => {
  const found = new Set<any>();

  recast.visit(ast, {
    visitJSXOpeningElement(path) {
      const node = path.node;
      if (node.name?.type === 'JSXIdentifier' && node.name.name === 'html') {
        // Walk up to the nearest enclosing function node.
        let current = path.parentPath;
        while (current) {
          const value = current.value;
          if (
            value &&
            (n.FunctionDeclaration.check(value) ||
              n.FunctionExpression.check(value) ||
              n.ArrowFunctionExpression.check(value))
          ) {
            found.add(value);
            break;
          }
          current = current.parentPath;
        }
      }
      this.traverse(path);
    },
  });

  return found.size === 1 ? [...found][0] : null;
};

/**
 * Whether the binding pattern `node` introduces a variable named `name`.
 * Recurses through destructuring patterns so all of `const locale`,
 * `const { locale } = …`, `const { locale = fallback } = …`,
 * `const { foo: locale } = …`, `const [locale] = …` and `...locale` are
 * detected — not just a bare identifier.
 */
const patternBindsName = (node: any, name: string): boolean => {
  if (!node) return false;
  switch (node.type) {
    case 'Identifier':
      return node.name === name;
    case 'AssignmentPattern':
      // `locale = fallback`
      return patternBindsName(node.left, name);
    case 'RestElement':
      // `...locale`
      return patternBindsName(node.argument, name);
    case 'ArrayPattern':
      return node.elements.some((element: any) =>
        patternBindsName(element, name)
      );
    case 'ObjectPattern':
      return node.properties.some((property: any) =>
        property.type === 'RestElement'
          ? patternBindsName(property.argument, name)
          : // The *value* is the binding target (`{ foo: locale }` binds `locale`).
            patternBindsName(property.value, name)
      );
    default:
      return false;
  }
};

/**
 * Inserts `const { locale = defaultLocale } = localeRoute.useParams();` once, at
 * the top of the function body. The destructuring form binds only `locale`, so
 * it can never collide with a `params` variable the document already declares.
 * Expression-bodied arrow functions are first converted to a block so the
 * declaration has somewhere to live.
 *
 * No-ops when `locale` is already bound in the function — whether as a simple
 * identifier, through a destructuring pattern (e.g.
 * `const { locale = defaultLocale } = Route.useLoaderData()`), or as a function
 * parameter — so the injected declaration never collides with one the document
 * already provides (which would produce an
 * `Identifier 'locale' has already been declared` parse error).
 *
 * @returns `true` when the declaration was injected, `false` when the document
 * already binds `locale` itself. Callers use this to skip the imports and the
 * route API declaration the injected statement would have needed.
 */
const ensureLocaleFromParams = (funcNode: any): boolean => {
  if (funcNode.body?.type !== 'BlockStatement') {
    funcNode.body = b.blockStatement([b.returnStatement(funcNode.body)]);
  }

  const declaredInBody = funcNode.body.body.some(
    (stmt: any) =>
      stmt.type === 'VariableDeclaration' &&
      stmt.declarations.some((d: any) => patternBindsName(d.id, 'locale'))
  );
  const declaredInParams = (funcNode.params ?? []).some((param: any) =>
    patternBindsName(param, 'locale')
  );
  if (declaredInBody || declaredInParams) return false;

  const statement = parseTsx(
    `const { locale = defaultLocale } = ${LOCALE_ROUTE_API_VARIABLE}.useParams();`
  ).program.body[0];
  funcNode.body.body.unshift(statement);
  return true;
};

/**
 * Ensures the module-scope `const localeRoute = getRouteApi("/<segment>");`
 * declaration the injected locale statement reads from, inserted right after the
 * import block.
 *
 * Referencing the locale route by id keeps the root document free of an import
 * of `<segment>/route` — importing a child route module from `__root` is
 * discouraged, since the generated route tree already imports the root.
 *
 * No-ops when `localeRoute` is already bound at module scope, reusing that
 * binding rather than redeclaring it (which would be a parse error).
 *
 * @returns `true` when the declaration was inserted, `false` when an existing
 * binding was reused.
 */
const ensureLocaleRouteApi = (ast: any, localeSegment: string): boolean => {
  if (isModuleScopeBinding(ast, LOCALE_ROUTE_API_VARIABLE)) return false;

  const declaration = parseTsx(
    `const ${LOCALE_ROUTE_API_VARIABLE} = getRouteApi("/${localeSegment}");`
  ).program.body[0];
  ast.program.body.splice(firstInsertIndex(ast), 0, declaration);
  return true;
};

/**
 * Puts a blank line between the import block and the inserted route API
 * declaration — recast prints a spliced statement flush against the preceding
 * line, which reads as part of the imports.
 */
const separateRouteApiDeclaration = (printedCode: string): string =>
  printedCode.replace(
    new RegExp(
      `([^\\n])\\n(const ${LOCALE_ROUTE_API_VARIABLE} = getRouteApi\\()`
    ),
    '$1\n\n$2'
  );

/** Sets `lang={locale}` and `dir={getHTMLTextDir(locale)}` on the first `<html>` element. */
const setHtmlLangAndDir = (ast: any): void => {
  recast.visit(ast, {
    visitJSXOpeningElement(path) {
      const node = path.node;
      if (node.name?.type !== 'JSXIdentifier' || node.name.name !== 'html') {
        this.traverse(path);
        return;
      }

      const upsertAttribute = (name: string, value: any): void => {
        const existing = node.attributes?.find(
          (attr: any) =>
            attr.type === 'JSXAttribute' && attr.name?.name === name
        ) as any;
        if (existing) {
          existing.value = value;
        } else {
          node.attributes?.push(b.jsxAttribute(b.jsxIdentifier(name), value));
        }
      };

      upsertAttribute('lang', b.jsxExpressionContainer(b.identifier('locale')));
      upsertAttribute(
        'dir',
        b.jsxExpressionContainer(
          b.callExpression(b.identifier('getHTMLTextDir'), [
            b.identifier('locale'),
          ])
        )
      );
      return false;
    },
  });
};

/**
 * Wraps the first `{children}` expression inside `funcNode` with
 * `<IntlayerProvider locale={locale}>`. Returns whether a wrap happened.
 */
const wrapChildrenWithProvider = (funcNode: any): boolean => {
  let wrapped = false;
  recast.visit(funcNode, {
    visitJSXExpressionContainer(path) {
      if (wrapped) return false;
      const expression = path.node.expression;
      if (expression?.type === 'Identifier' && expression.name === 'children') {
        const template = parseTsx(
          'const __wrap = <IntlayerProvider locale={locale}>{__child__}</IntlayerProvider>;'
        );
        const providerElement = template.program.body[0].declarations[0].init;
        providerElement.children = [path.node];
        path.replace(providerElement);
        wrapped = true;
        return false;
      }
      this.traverse(path);
    },
  });
  return wrapped;
};

/** Whether `funcNode` already binds `locale` in its body or parameters. */
const bindsLocale = (funcNode: any): boolean =>
  (funcNode.body?.type === 'BlockStatement' &&
    funcNode.body.body.some(
      (stmt: any) =>
        stmt.type === 'VariableDeclaration' &&
        stmt.declarations.some((d: any) => patternBindsName(d.id, 'locale'))
    )) ||
  (funcNode.params ?? []).some((param: any) =>
    patternBindsName(param, 'locale')
  );

/**
 * Finds the options object of the root route declaration —
 * `createRootRoute({…})` or `createRootRouteWithContext<…>()({…})`. Returns
 * `null` when absent or not an object literal.
 */
const findRootRouteOptions = (ast: any): any => {
  let options: any = null;

  recast.visit(ast, {
    visitCallExpression(path) {
      const { callee, arguments: args } = path.node as any;
      const isCreateRootRoute =
        callee.type === 'Identifier' && callee.name === 'createRootRoute';
      const isCreateRootRouteWithContext =
        callee.type === 'CallExpression' &&
        callee.callee?.type === 'Identifier' &&
        callee.callee.name === 'createRootRouteWithContext';

      if (
        (isCreateRootRoute || isCreateRootRouteWithContext) &&
        args[0]?.type === 'ObjectExpression'
      ) {
        options = args[0];
        return false;
      }
      this.traverse(path);
    },
  });

  return options;
};

/** Module-scope identifier of the injected request-locale server function. */
const REQUEST_LOCALE_FUNCTION_NAME = 'getRequestLocale';

/**
 * Wraps the `{children}` of a TanStack Start root document with
 * `IntlayerProvider` for routing modes without a locale path segment. The
 * locale is resolved per request by a server function exposed through the root
 * `loader`, and read with `Route.useLoaderData()`. Safe and idempotent: bails
 * when the provider is already present, when no `<html>` document or
 * `{children}` is found, or when the root route cannot safely take a loader
 * (no `Route` binding, no options object, or an existing `loader`).
 *
 * @param code Source of the project's `__root` document.
 */
export const wrapRootWithRequestLocaleProvider = (
  code: string
): TransformResult => {
  if (code.includes('IntlayerProvider')) return { code, status: 'already' };

  const ast = parseTsx(code);

  const funcNode = findHtmlDocumentFunction(ast);
  const rootRouteOptions = findRootRouteOptions(ast);
  const hasLoader = rootRouteOptions?.properties.some(
    (property: any) => (property.key?.name ?? property.key?.value) === 'loader'
  );
  if (
    !funcNode ||
    !rootRouteOptions ||
    hasLoader ||
    !isModuleScopeBinding(ast, 'Route')
  ) {
    return { code, status: 'skipped' };
  }

  if (!wrapChildrenWithProvider(funcNode)) return { code, status: 'skipped' };

  if (!bindsLocale(funcNode)) {
    if (funcNode.body?.type !== 'BlockStatement') {
      funcNode.body = b.blockStatement([b.returnStatement(funcNode.body)]);
    }
    funcNode.body.body.unshift(
      parseTsx('const locale = Route.useLoaderData();').program.body[0]
    );
  }

  rootRouteOptions.properties.unshift(
    b.property(
      'init',
      b.identifier('loader'),
      b.arrowFunctionExpression(
        [],
        b.callExpression(b.identifier(REQUEST_LOCALE_FUNCTION_NAME), [])
      )
    )
  );

  const insertsServerFunction = !isModuleScopeBinding(
    ast,
    REQUEST_LOCALE_FUNCTION_NAME
  );
  if (insertsServerFunction) {
    ast.program.body.splice(
      firstInsertIndex(ast),
      0,
      parseTsx(REQUEST_LOCALE_SERVER_FUNCTION).program.body[0]
    );
  }

  ensureNamedImport(ast, 'IntlayerProvider', 'react-intlayer');
  ensureNamedImport(ast, 'createServerFn', '@tanstack/react-start');
  ensureNamedImport(ast, 'getRequestHeader', '@tanstack/react-start/server');
  ensureNamedImport(ast, 'getCookie', 'intlayer');
  ensureNamedImport(ast, 'getLocale', 'intlayer');
  ensureNamedImport(ast, 'getHTMLTextDir', 'intlayer');
  setHtmlLangAndDir(ast);

  const printedCode = recast.print(ast).code;

  return {
    // recast prints the spliced declaration flush against the imports.
    code: insertsServerFunction
      ? printedCode.replace(
          new RegExp(`([^\\n])\\n(const ${REQUEST_LOCALE_FUNCTION_NAME} = )`),
          '$1\n\n$2'
        )
      : printedCode,
    status: 'wrapped',
  };
};

/**
 * Wraps the `{children}` of a TanStack Start root document with
 * `IntlayerProvider`, deriving the locale from the locale segment route params.
 * Safe and idempotent: bails (returns the original code) when the provider is
 * already present, when no `<html>` document function is found, or when there is
 * no `{children}` placeholder to wrap.
 *
 * @param code Source of the project's `__root` document.
 * @param localeSegment Locale segment directory in use — `{-$locale}` for every
 * routing mode but `prefix-all`, which uses the required `$locale`.
 */
export const wrapRootWithProvider = (
  code: string,
  localeSegment: string
): TransformResult => {
  const ast = parseTsx(code);

  if (code.includes('IntlayerProvider')) return { code, status: 'already' };

  const funcNode = findHtmlDocumentFunction(ast);
  if (!funcNode) return { code, status: 'skipped' };

  if (!wrapChildrenWithProvider(funcNode)) return { code, status: 'skipped' };

  const injectedLocaleDeclaration = ensureLocaleFromParams(funcNode);

  ensureNamedImport(ast, 'IntlayerProvider', 'react-intlayer');
  // Only needed by the injected declaration: a document that already derives its
  // own `locale` must not be given unused imports or a stray route API const.
  let insertedRouteApi = false;
  if (injectedLocaleDeclaration) {
    ensureNamedImport(ast, 'getRouteApi', '@tanstack/react-router');
    ensureNamedImport(ast, 'defaultLocale', 'intlayer');
    insertedRouteApi = ensureLocaleRouteApi(ast, localeSegment);
  }
  ensureNamedImport(ast, 'getHTMLTextDir', 'intlayer');
  setHtmlLangAndDir(ast);

  const printedCode = recast.print(ast).code;

  return {
    code: insertedRouteApi
      ? separateRouteApiDeclaration(printedCode)
      : printedCode,
    status: 'wrapped',
  };
};
