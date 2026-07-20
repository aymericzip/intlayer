import * as recast from 'recast';
import { describe, expect, it } from 'vitest';
import { babelTsParser } from '../../utils/babelParser';
import { ensureNamedImport, isModuleScopeBinding } from './astImports';

const parse = (code: string): any =>
  recast.parse(code, { parser: babelTsParser });

const print = (ast: any): string => recast.print(ast).code;

/** Counts module-scope bindings of `name` across imports + declarations. */
const countBindings = (code: string, name: string): number => {
  const importMatches =
    code.match(new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`, 'g')) ??
    [];
  const declMatches =
    code.match(
      new RegExp(`(?:const|let|var|function|class)\\s+${name}\\b`, 'g')
    ) ?? [];
  return importMatches.length + declMatches.length;
};

describe('isModuleScopeBinding', () => {
  it('detects an import from any source (by local name)', () => {
    const ast = parse(`import { defaultLocale } from "../i18n/lingui";`);
    expect(isModuleScopeBinding(ast, 'defaultLocale')).toBe(true);
  });

  it('detects an aliased import by its local name', () => {
    const ast = parse(`import { x as defaultLocale } from "elsewhere";`);
    expect(isModuleScopeBinding(ast, 'defaultLocale')).toBe(true);
  });

  it('detects a top-level const declaration', () => {
    const ast = parse(`const defaultLocale = "en";`);
    expect(isModuleScopeBinding(ast, 'defaultLocale')).toBe(true);
  });

  it('detects an exported function declaration', () => {
    const ast = parse(`export function getHTMLTextDir() {}`);
    expect(isModuleScopeBinding(ast, 'getHTMLTextDir')).toBe(true);
  });

  it('returns false for an unbound name', () => {
    const ast = parse(`import { other } from "x";`);
    expect(isModuleScopeBinding(ast, 'defaultLocale')).toBe(false);
  });
});

describe('ensureNamedImport', () => {
  it('reuses an existing binding from a different source (no duplicate)', () => {
    const ast = parse(
      `import { defaultLocale } from "../i18n/lingui";\nconst x = 1;`
    );
    ensureNamedImport(ast, 'defaultLocale', 'intlayer');
    const out = print(ast);

    expect(countBindings(out, 'defaultLocale')).toBe(1);
    expect(out).not.toContain('from "intlayer"');
  });

  it('reuses a locally declared binding (no import added)', () => {
    const ast = parse(`const defaultLocale = "en";`);
    ensureNamedImport(ast, 'defaultLocale', 'intlayer');
    expect(print(ast)).not.toContain('import');
  });

  it('merges into an existing import from the same source', () => {
    const ast = parse(`import { getHTMLTextDir } from "intlayer";`);
    ensureNamedImport(ast, 'defaultLocale', 'intlayer');
    const out = print(ast);

    expect(out).toMatch(/import \{[^}]*getHTMLTextDir[^}]*\} from "intlayer"/);
    expect(out).toMatch(/import \{[^}]*defaultLocale[^}]*\} from "intlayer"/);
    // Single import statement from "intlayer".
    expect(out.match(/from "intlayer"/g)?.length).toBe(1);
  });

  it('inserts a fresh import when the name is unbound', () => {
    const ast = parse(`const x = 1;`);
    ensureNamedImport(ast, 'defaultLocale', 'intlayer');
    expect(print(ast)).toContain('import { defaultLocale } from "intlayer"');
  });
});
