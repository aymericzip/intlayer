import * as recast from 'recast';

const { builders: b } = recast.types;

/** babel-ts parser handles TypeScript *and* JSX (the `typescript` parser does not). */
const parseTsx = (code: string): any =>
  recast.parse(code, { parser: require('recast/parsers/babel-ts') });

/** Result of a source transform. `code` is unchanged for any non-`wrapped` status. */
export type TransformResult = {
  code: string;
  status: 'wrapped' | 'already' | 'skipped-client' | 'skipped';
};

/** Detects a top-level `'use client'` directive (client components can't be async server providers). */
const isClientComponent = (ast: any): boolean => {
  const directives = ast.program.directives ?? [];
  if (
    directives.some((directive: any) => directive.value?.value === 'use client')
  ) {
    return true;
  }
  return ast.program.body.some(
    (stmt: any) =>
      stmt.type === 'ExpressionStatement' &&
      stmt.expression?.type === 'StringLiteral' &&
      stmt.expression.value === 'use client'
  );
};

/** Finds the function node behind `export default`, following an identifier reference if needed. */
const findDefaultExportFunction = (ast: any): any => {
  const body = ast.program.body;

  const asFunction = (node: any): any =>
    node &&
    (node.type === 'ArrowFunctionExpression' ||
      node.type === 'FunctionExpression' ||
      node.type === 'FunctionDeclaration')
      ? node
      : null;

  for (const stmt of body) {
    if (stmt.type !== 'ExportDefaultDeclaration') continue;

    const direct = asFunction(stmt.declaration);
    if (direct) return direct;

    if (stmt.declaration?.type === 'Identifier') {
      const name = stmt.declaration.name;
      for (const candidate of body) {
        if (candidate.type === 'VariableDeclaration') {
          for (const declarator of candidate.declarations) {
            if (
              declarator.id?.type === 'Identifier' &&
              declarator.id.name === name
            ) {
              const fn = asFunction(declarator.init);
              if (fn) return fn;
            }
          }
        }
        if (
          candidate.type === 'FunctionDeclaration' &&
          candidate.id?.name === name
        ) {
          return candidate;
        }
      }
    }
  }

  return null;
};

/** Index just past the leading directives + import declarations, where new top-level code is safe to insert. */
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

  const declaration = b.importDeclaration(
    [b.importSpecifier(b.identifier(importName))],
    b.stringLiteral(source)
  );
  ast.program.body.splice(firstInsertIndex(ast), 0, declaration);
};

/** Ensures `export { exportedName } from source`, skipping when already declared/re-exported. */
const ensureExportFrom = (
  ast: any,
  exportedName: string,
  source: string
): void => {
  const body = ast.program.body;

  const alreadyPresent = body.some((stmt: any) => {
    if (
      stmt.type === 'ExportNamedDeclaration' &&
      stmt.source?.value === source
    ) {
      return stmt.specifiers.some(
        (spec: any) => spec.exported?.name === exportedName
      );
    }
    // Locally declared `export const/function generateStaticParams`
    if (stmt.type === 'ExportNamedDeclaration' && stmt.declaration) {
      const decl = stmt.declaration;
      if (decl.type === 'FunctionDeclaration' && decl.id?.name === exportedName)
        return true;
      if (decl.type === 'VariableDeclaration') {
        return decl.declarations.some(
          (d: any) => d.id?.type === 'Identifier' && d.id.name === exportedName
        );
      }
    }
    return false;
  });

  if (alreadyPresent) return;

  const exportNode = parseTsx(`export { ${exportedName} } from "${source}";`)
    .program.body[0];
  ast.program.body.splice(firstInsertIndex(ast), 0, exportNode);
};

/** Makes the function async and inserts `const locale = await getLocale();` once, at the top of its body. */
const ensureAwaitedLocale = (funcNode: any): void => {
  funcNode.async = true;

  if (funcNode.body.type !== 'BlockStatement') {
    funcNode.body = b.blockStatement([b.returnStatement(funcNode.body)]);
  }

  const hasLocale = funcNode.body.body.some(
    (stmt: any) =>
      stmt.type === 'VariableDeclaration' &&
      stmt.declarations.some(
        (d: any) => d.id?.type === 'Identifier' && d.id.name === 'locale'
      )
  );

  if (!hasLocale) {
    const localeStatement = parseTsx('const locale = await getLocale();')
      .program.body[0];
    funcNode.body.body.unshift(localeStatement);
  }
};

/** Builds `<providerName locale={locale}>{child}</providerName>` around an existing JSX child node. */
const buildProviderElement = (providerName: string, childNode: any): any => {
  const template = parseTsx(
    `const __wrap = <${providerName} locale={locale}>{__child__}</${providerName}>;`
  );
  const providerElement = template.program.body[0].declarations[0].init;
  providerElement.children = [childNode];
  return providerElement;
};

/** Sets `lang={locale}` on the first `<html>` element, if present. */
const setHtmlLang = (ast: any): void => {
  recast.visit(ast, {
    visitJSXOpeningElement(path) {
      const node = path.node;
      if (node.name?.type === 'JSXIdentifier' && node.name.name === 'html') {
        const langAttr = node.attributes?.find(
          (attr: any) =>
            attr.type === 'JSXAttribute' && attr.name?.name === 'lang'
        ) as any;
        const localeExpression = b.jsxExpressionContainer(
          b.identifier('locale')
        );
        if (langAttr) {
          langAttr.value = localeExpression;
        } else {
          node.attributes.push(
            b.jsxAttribute(b.jsxIdentifier('lang'), localeExpression)
          );
        }
        return false;
      }
      this.traverse(path);
    },
  });
};

/**
 * Wraps the `{children}` of a Next.js App Router **layout** with
 * `IntlayerClientProvider`, deriving the locale via `getLocale()`. Safe and
 * idempotent: bails (returns the original code) for client components, when no
 * `{children}` placeholder is found, or when there is no default export.
 */
export const wrapLayoutWithProvider = (code: string): TransformResult => {
  const ast = parseTsx(code);

  if (isClientComponent(ast)) return { code, status: 'skipped-client' };
  if (code.includes('IntlayerClientProvider'))
    return { code, status: 'already' };

  const funcNode = findDefaultExportFunction(ast);
  if (!funcNode) return { code, status: 'skipped' };

  let wrapped = false;
  recast.visit(funcNode, {
    visitJSXExpressionContainer(path) {
      if (wrapped) return false;
      const expression = path.node.expression;
      if (expression?.type === 'Identifier' && expression.name === 'children') {
        path.replace(buildProviderElement('IntlayerClientProvider', path.node));
        wrapped = true;
        return false;
      }
      this.traverse(path);
    },
  });

  if (!wrapped) return { code, status: 'skipped' };

  ensureNamedImport(ast, 'IntlayerClientProvider', 'next-intlayer');
  ensureNamedImport(ast, 'getLocale', 'next-intlayer/server');
  ensureExportFrom(ast, 'generateStaticParams', 'next-intlayer');
  ensureAwaitedLocale(funcNode);
  setHtmlLang(ast);

  return { code: recast.print(ast).code, status: 'wrapped' };
};

/** Returns the single top-level JSX return of a function, or the JSX of an expression-bodied arrow. */
const findSingleJsxReturn = (
  funcNode: any
): { kind: 'return'; node: any } | { kind: 'arrow'; node: any } | null => {
  if (
    funcNode.type === 'ArrowFunctionExpression' &&
    funcNode.body.type !== 'BlockStatement'
  ) {
    const body =
      funcNode.body.type === 'JSXElement' ||
      funcNode.body.type === 'JSXFragment'
        ? funcNode.body
        : null;
    return body ? { kind: 'arrow', node: funcNode } : null;
  }

  if (funcNode.body.type !== 'BlockStatement') return null;

  // Collect every JSX-returning `return` inside this function, but do not
  // descend into nested function scopes (e.g. an inner component defined in the
  // same file). More than one top-level JSX return is ambiguous — bail.
  const jsxReturns: any[] = [];
  let functionDepth = 0;
  recast.visit(funcNode, {
    visitFunction(path) {
      functionDepth++;
      if (functionDepth === 1) {
        this.traverse(path);
      }
      functionDepth--;
      return false;
    },
    visitReturnStatement(path) {
      const argument = path.node.argument;
      if (argument?.type === 'JSXElement' || argument?.type === 'JSXFragment') {
        jsxReturns.push(path.node);
      }
      this.traverse(path);
    },
  });

  if (jsxReturns.length !== 1) return null;
  return { kind: 'return', node: jsxReturns[0] };
};

/**
 * Wraps the returned JSX of a Next.js App Router **page** with
 * `IntlayerServerProvider`, deriving the locale via `getLocale()`. Safe and
 * idempotent: bails for client components, when the page has no single
 * top-level JSX return, or when there is no default export.
 */
export const wrapPageWithProvider = (code: string): TransformResult => {
  const ast = parseTsx(code);

  if (isClientComponent(ast)) return { code, status: 'skipped-client' };
  if (code.includes('IntlayerServerProvider'))
    return { code, status: 'already' };

  const funcNode = findDefaultExportFunction(ast);
  if (!funcNode) return { code, status: 'skipped' };

  const jsxReturn = findSingleJsxReturn(funcNode);
  if (!jsxReturn) return { code, status: 'skipped' };

  if (jsxReturn.kind === 'return') {
    jsxReturn.node.argument = buildProviderElement(
      'IntlayerServerProvider',
      jsxReturn.node.argument
    );
  } else {
    jsxReturn.node.body = buildProviderElement(
      'IntlayerServerProvider',
      jsxReturn.node.body
    );
  }

  ensureNamedImport(ast, 'IntlayerServerProvider', 'next-intlayer/server');
  ensureNamedImport(ast, 'getLocale', 'next-intlayer/server');
  ensureAwaitedLocale(funcNode);

  return { code: recast.print(ast).code, status: 'wrapped' };
};
