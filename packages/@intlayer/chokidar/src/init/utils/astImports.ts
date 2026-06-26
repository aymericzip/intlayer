import * as recast from 'recast';

const { builders: b } = recast.types;

/**
 * Index just past the leading directives (e.g. `'use client'`) and import
 * declarations — the safe insertion point for a new import.
 */
export const firstInsertIndex = (ast: any): number => {
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

/**
 * Whether `name` is already bound at module scope — by any import (under that
 * local name, regardless of source) or by a top-level
 * `const`/`let`/`var`/`function`/`class` declaration.
 *
 * Used to avoid redeclaring an identifier the file already provides (e.g. a
 * `defaultLocale` re-exported from a local `i18n` module), which would otherwise
 * produce an `Identifier '…' has already been declared` parse error.
 */
export const isModuleScopeBinding = (ast: any, name: string): boolean =>
  ast.program.body.some((statement: any) => {
    // `export const x = …` / `export function x` / `export default class x`
    const node =
      (statement.type === 'ExportNamedDeclaration' ||
        statement.type === 'ExportDefaultDeclaration') &&
      statement.declaration
        ? statement.declaration
        : statement;

    if (node.type === 'ImportDeclaration') {
      return node.specifiers.some((spec: any) => spec.local?.name === name);
    }
    if (node.type === 'VariableDeclaration') {
      return node.declarations.some(
        (decl: any) => decl.id?.type === 'Identifier' && decl.id.name === name
      );
    }
    if (
      node.type === 'FunctionDeclaration' ||
      node.type === 'ClassDeclaration'
    ) {
      return node.id?.name === name;
    }
    return false;
  });

/**
 * Ensures `import { importName } from source`, merging into an existing import
 * from the same source. No-ops when `importName` is already bound at module
 * scope (imported from another source or declared locally), reusing that binding
 * instead of redeclaring it.
 *
 * Shared across every framework adapter so injected identifiers never collide
 * with bindings the user's file already provides.
 */
export const ensureNamedImport = (
  ast: any,
  importName: string,
  source: string
): void => {
  if (isModuleScopeBinding(ast, importName)) return;

  for (const statement of ast.program.body) {
    if (
      statement.type === 'ImportDeclaration' &&
      statement.source.value === source
    ) {
      const hasSpecifier = statement.specifiers.some(
        (spec: any) =>
          spec.type === 'ImportSpecifier' && spec.imported?.name === importName
      );
      if (!hasSpecifier) {
        statement.specifiers.push(b.importSpecifier(b.identifier(importName)));
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
