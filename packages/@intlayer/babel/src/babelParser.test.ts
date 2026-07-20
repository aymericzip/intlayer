import { describe, expect, it } from 'vitest';
import { babelTsParser, typescriptParser } from './babelParser';

/**
 * `parse` returns a `@babel/parser` `File` node. Recast only relies on the
 * structural `{ parse(source): ast }` shape (validated here), so these tests
 * avoid pulling `recast` into `@intlayer/babel`.
 */
const getNodeType = (ast: unknown): string =>
  (ast as { type?: string; program?: { body: unknown[] } }).type ?? '';

describe('babelParser', () => {
  describe('typescriptParser', () => {
    it('parses TypeScript syntax into a File AST', () => {
      const ast = typescriptParser.parse('const value: number = 1;');

      expect(getNodeType(ast)).toBe('File');
    });

    it('tolerates modern syntax that is default-enabled in Babel 8', () => {
      const source = [
        'import data from "./data.json" with { type: "json" };',
        'class Store { #value = data ?? 0; static build() { return new Store(); } }',
        'const chained = data?.items?.[0] ?? 1_000;',
      ].join('\n');

      expect(() => typescriptParser.parse(source)).not.toThrow();
    });
  });

  describe('babelTsParser', () => {
    it('parses TypeScript *and* JSX', () => {
      const source = 'const el = <div className={x as string}>hi</div>;';

      expect(() => babelTsParser.parse(source)).not.toThrow();
      expect(getNodeType(babelTsParser.parse(source))).toBe('File');
    });
  });
});
