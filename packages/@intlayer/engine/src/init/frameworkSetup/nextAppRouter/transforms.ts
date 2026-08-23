import * as recast from 'recast';
import { babelTsParser } from '../../../utils/babelParser';
import { ensureNamedImport, firstInsertIndex } from '../../utils/astImports';

const { builders: b } = recast.types;

/** babel-ts parser handles TypeScript *and* JSX (the `typescript` parser does not). */
const parseTsx = (code: string): any =>
  recast.parse(code, { parser: babelTsParser });

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
        (d: any) =>
          // const locale = ...
          (d.id?.type === 'Identifier' && d.id.name === 'locale') ||
          // const { locale } = ... or const { locale: locale } = ...
          (d.id?.type === 'ObjectPattern' &&
            d.id.properties?.some(
              (prop: any) =>
                prop.value?.type === 'Identifier' &&
                prop.value?.name === 'locale'
            ))
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
 * Wraps the `{children}` of a Next.js App Router **layout** with the unified
 * `IntlayerProvider`, deriving the locale via `getLocale()`. Safe and
 * idempotent: bails (returns the original code) for client components, when no
 * `{children}` placeholder is found, or when there is no default export.
 *
 * `IntlayerProvider` seeds both the server context and the client provider in
 * one mount, so this is the only provider a Next.js App Router app needs —
 * pages below the locale layout read locale/variant from it without wrapping
 * themselves individually (see the removed `wrapPageWithProvider`).
 */
export const wrapLayoutWithProvider = (code: string): TransformResult => {
  const ast = parseTsx(code);

  if (isClientComponent(ast)) return { code, status: 'skipped-client' };
  if (code.includes('IntlayerProvider')) return { code, status: 'already' };

  const funcNode = findDefaultExportFunction(ast);
  if (!funcNode) return { code, status: 'skipped' };

  let wrapped = false;
  recast.visit(funcNode, {
    visitJSXExpressionContainer(path) {
      if (wrapped) return false;
      const expression = path.node.expression;
      if (expression?.type === 'Identifier' && expression.name === 'children') {
        path.replace(buildProviderElement('IntlayerProvider', path.node));
        wrapped = true;
        return false;
      }
      this.traverse(path);
    },
  });

  if (!wrapped) return { code, status: 'skipped' };

  ensureNamedImport(ast, 'IntlayerProvider', 'next-intlayer/server');
  ensureNamedImport(ast, 'getLocale', 'next-intlayer/server');
  ensureExportFrom(ast, 'generateStaticParams', 'next-intlayer');
  ensureAwaitedLocale(funcNode);
  setHtmlLang(ast);

  return { code: recast.print(ast).code, status: 'wrapped' };
};
