import * as recast from 'recast';

const { builders: b, namedTypes: n } = recast.types;

/** babel-ts parser handles TypeScript *and* JSX. */
const parseTsx = (code: string): any =>
  recast.parse(code, { parser: require('recast/parsers/babel-ts') });

/** Result of a source transform. `code` is unchanged for any non-`wrapped` status. */
export type TransformResult = {
  code: string;
  status: 'wrapped' | 'already' | 'skipped';
};

/** Index just past the leading directives + import declarations. */
const firstInsertIndex = (ast: any): number => {
  const body = ast.program.body;
  let index = 0;
  while (
    index < body.length &&
    ((body[index].type === 'ExpressionStatement' &&
      body[index].expression?.type === 'StringLiteral') ||
      body[index].type === 'ImportDeclaration')
  ) {
    index++;
  }
  return index;
};

/** Ensures `import { importName } from source`, merging into an existing import from the same source. */
const ensureNamedImport = (
  ast: any,
  importName: string,
  source: string
): void => {
  for (const stmt of ast.program.body) {
    if (stmt.type === 'ImportDeclaration' && stmt.source.value === source) {
      const hasSpecifier = stmt.specifiers.some(
        (spec: any) =>
          spec.type === 'ImportSpecifier' && spec.imported?.name === importName
      );
      if (!hasSpecifier) {
        stmt.specifiers.push(b.importSpecifier(b.identifier(importName)));
      }
      return;
    }
  }

  ast.program.body.splice(
    firstInsertIndex(ast),
    0,
    b.importDeclaration(
      [b.importSpecifier(b.identifier(importName))],
      b.stringLiteral(source)
    )
  );
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
 * Inserts `const locale = …` once, at the top of the function body. A single
 * self-contained statement is used (rather than an intermediate `params` const)
 * so it can never collide with a `params` variable the document already
 * declares. Expression-bodied arrow functions are first converted to a block so
 * the declaration has somewhere to live.
 */
const ensureLocaleFromParams = (funcNode: any): void => {
  if (funcNode.body?.type !== 'BlockStatement') {
    funcNode.body = b.blockStatement([b.returnStatement(funcNode.body)]);
  }

  const hasLocale = funcNode.body.body.some(
    (stmt: any) =>
      stmt.type === 'VariableDeclaration' &&
      stmt.declarations.some(
        (d: any) => d.id?.type === 'Identifier' && d.id.name === 'locale'
      )
  );
  if (hasLocale) return;

  const statement = parseTsx(
    'const locale = useParams({ strict: false }).locale ?? defaultLocale;'
  ).program.body[0];
  funcNode.body.body.unshift(statement);
};

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
          node.attributes.push(b.jsxAttribute(b.jsxIdentifier(name), value));
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
 * Wraps the `{children}` of a TanStack Start root document with
 * `IntlayerProvider`, deriving the locale from the `{-$locale}` route param.
 * Safe and idempotent: bails (returns the original code) when the provider is
 * already present, when no `<html>` document function is found, or when there is
 * no `{children}` placeholder to wrap.
 */
export const wrapRootWithProvider = (code: string): TransformResult => {
  const ast = parseTsx(code);

  if (code.includes('IntlayerProvider')) return { code, status: 'already' };

  const funcNode = findHtmlDocumentFunction(ast);
  if (!funcNode) return { code, status: 'skipped' };

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

  if (!wrapped) return { code, status: 'skipped' };

  ensureNamedImport(ast, 'IntlayerProvider', 'react-intlayer');
  ensureNamedImport(ast, 'useParams', '@tanstack/react-router');
  ensureNamedImport(ast, 'defaultLocale', 'intlayer');
  ensureNamedImport(ast, 'getHTMLTextDir', 'intlayer');
  ensureLocaleFromParams(funcNode);
  setHtmlLangAndDir(ast);

  return { code: recast.print(ast).code, status: 'wrapped' };
};
