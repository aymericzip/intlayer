/**
 * Runtime transformer: converts TypeScript source code to ESM or CommonJS format.
 *
 * Design constraints:
 * - Regex/string based (no AST) — runs in the browser
 * - Handles patterns that actually appear in the Intlayer docs
 * - Intentionally limited: exotic TypeScript features may not transform perfectly
 */

export type TargetCodeFormat = 'esm' | 'commonjs' | 'typescript';

// ── Helpers ─────────────────────────────────────────────────────────────────

const trim = (text: string) => text.trim();

/**
 * Given a string like `{ A, type B, C as D }`, return the non-type named
 * members preserving aliases: `[{ name:'A', alias:undefined }, { name:'C', alias:'D' }]`.
 */
const parseNamedImports = (
  inner: string
): Array<{ name: string; alias?: string; isType: boolean }> =>
  inner
    .split(',')
    .map(trim)
    .filter(Boolean)
    .map((member) => {
      const isType = /^type\s+/.test(member);
      const clean = member.replace(/^type\s+/, '').trim();
      const asParts = clean.split(/\s+as\s+/);
      return {
        name: trim(asParts[0]),
        alias: asParts[1] ? trim(asParts[1]) : undefined,
        isType,
      };
    });

/** Render a named imports list back to `{ A, B as C }` style. */
const renderNamedImports = (
  members: Array<{ name: string; alias?: string }>
) => {
  return `{ ${members.map((member) => (member.alias ? `${member.name} as ${member.alias}` : member.name)).join(', ')} }`;
};

// ── Import parser ────────────────────────────────────────────────────────────

interface ParsedImport {
  raw: string; // original source lines (may be multi-line)
  source: string;
  defaultImport?: string;
  named: Array<{ name: string; alias?: string; isType: boolean }>;
  isSideEffect: boolean; // `import 'mod'`
  isTypeOnly: boolean; // `import type { ... }`
}

/**
 * Parse all import statements from `code`.
 * Returns them in order together with their start/end char positions.
 */
const parseImports = (
  code: string
): Array<ParsedImport & { start: number; end: number }> => {
  const result: Array<ParsedImport & { start: number; end: number }> = [];
  // Match the full import statement (possibly multi-line), stopping at the semicolon.
  // Do NOT consume trailing whitespace/newlines — those belong to the surrounding code.
  const importStatementRegex =
    /^import\s+(type\s+)?(?:([^\s{,;"'`]+)\s*,?\s*)?(?:\{([^}]*)\}\s*,?\s*)?(?:from\s+["']([^"']+)["'])?(?:\s*["']([^"']+)["'])?;?/gm;

  let importMatch: RegExpExecArray | null = importStatementRegex.exec(code);
  while (importMatch !== null) {
    const isTypeOnly = !!importMatch[1];
    const defaultPart = importMatch[2] ? trim(importMatch[2]) : undefined;
    const namedPart = importMatch[3] ?? '';
    const fromModule = importMatch[4] ?? importMatch[5] ?? '';

    const isSideEffect =
      !defaultPart && !namedPart && !isTypeOnly && !!fromModule;

    const named = namedPart ? parseNamedImports(namedPart) : [];

    result.push({
      raw: importMatch[0],
      start: importMatch.index,
      end: importMatch.index + importMatch[0].length,
      source: fromModule,
      defaultImport: defaultPart,
      named,
      isSideEffect,
      isTypeOnly,
    });
    importMatch = importStatementRegex.exec(code);
  }
  return result;
};

// ── Type map ─────────────────────────────────────────────────────────────────

/** Build map: typeName → module path, from parsed imports. */
const buildTypeMap = (imports: ParsedImport[]): Map<string, string> => {
  const map = new Map<string, string>();
  for (const parsedImport of imports) {
    if (parsedImport.isTypeOnly) {
      for (const namedMember of parsedImport.named) {
        if (!map.has(namedMember.name))
          map.set(namedMember.name, parsedImport.source);
      }
    } else {
      for (const namedMember of parsedImport.named) {
        if (namedMember.isType && !map.has(namedMember.name))
          map.set(namedMember.name, parsedImport.source);
      }
    }
  }
  return map;
};

// ── Import renderers ─────────────────────────────────────────────────────────

const renderImportESM = (parsedImport: ParsedImport): string | null => {
  if (parsedImport.isTypeOnly) return null; // remove entirely
  const valueNamed = parsedImport.named.filter(
    (namedMember) => !namedMember.isType
  );
  if (
    !valueNamed.length &&
    !parsedImport.defaultImport &&
    !parsedImport.isSideEffect
  )
    return null;
  if (parsedImport.isSideEffect) return `import '${parsedImport.source}';`;

  if (parsedImport.defaultImport && valueNamed.length) {
    return `import ${parsedImport.defaultImport}, ${renderNamedImports(valueNamed)} from '${parsedImport.source}';`;
  }
  if (parsedImport.defaultImport)
    return `import ${parsedImport.defaultImport} from '${parsedImport.source}';`;
  return `import ${renderNamedImports(valueNamed)} from '${parsedImport.source}';`;
};

const renderImportCJS = (parsedImport: ParsedImport): string | null => {
  if (parsedImport.isTypeOnly) return null;
  const valueNamed = parsedImport.named.filter(
    (namedMember) => !namedMember.isType
  );
  const hasDefault = !!parsedImport.defaultImport;
  const hasNamed = valueNamed.length > 0;

  if (parsedImport.isSideEffect) return `require('${parsedImport.source}');`;

  if (hasDefault && hasNamed) {
    // e.g. import express, { Router } from 'express'
    // → const { default: express, Router } = require('express') OR two lines
    const allMembers = [
      { name: 'default', alias: parsedImport.defaultImport },
      ...valueNamed,
    ];
    return `const ${renderNamedImports(allMembers)} = require('${parsedImport.source}');`;
  }
  if (hasDefault && !hasNamed) {
    return `const ${parsedImport.defaultImport} = require('${parsedImport.source}');`;
  }
  if (!hasDefault && hasNamed) {
    return `const ${renderNamedImports(valueNamed)} = require('${parsedImport.source}');`;
  }
  return null;
};

// ── Type annotation stripping ────────────────────────────────────────────────

/**
 * Strip TypeScript type annotations from a code string (line by line with
 * some multi-line awareness). Returns the stripped code and a list of JSDoc
 * comments to insert before specific lines (indexed by original line number).
 */
const stripTypeAnnotations = (
  code: string,
  typeMap: Map<string, string>
): { code: string; jsdocInserts: Map<number, string> } => {
  const lines = code.split('\n');
  const jsdocInserts = new Map<number, string>();
  const out: string[] = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    let line = lines[lineIndex];

    // 1. `const/let/var name: SimpleType =` — simple variable type annotation
    //    Add JSDoc if the type resolves to a known import module.
    const varTypeMatch = line.match(
      /^(\s*(?:export\s+)?(?:const|let|var)\s+\w+)\s*:\s*([A-Z]\w*)\s*=/
    );
    if (varTypeMatch) {
      const typeName = varTypeMatch[2];
      const modulePath = typeMap.get(typeName);
      if (modulePath) {
        jsdocInserts.set(
          out.length,
          `/** @type {import('${modulePath}').${typeName}} */`
        );
      }
      line = line.replace(
        /^(\s*(?:export\s+)?(?:const|let|var)\s+\w+)\s*:\s*[A-Z][\w<>, ]*?\s*=/,
        '$1 ='
      );
    }

    // 2. `const/let/var name: FC<Props> =` — generic type annotation (no JSDoc)
    line = line.replace(
      /^(\s*(?:export\s+)?(?:const|let|var)\s+\w+)\s*:\s*\w+<[^>]*>\s*=/,
      '$1 ='
    );

    // 3. Destructured parameter with type: `}: TypeName):` → `}):`
    //    Also handles return type: `): ReturnType =>` → `) =>`
    line = line.replace(/\}\s*:\s*\w[\w<>, .]*\s*\)/, '})');

    // 4. Return type after `)`: `): Promise<X> =>` or `): Type {`
    line = line.replace(/\)\s*:\s*\w[\w<>, .]*\s*(=>|\{)/, ') $1');

    // 5. `satisfies TypeName` at end of expression
    line = line.replace(/\s+satisfies\s+\w[\w<>, .]*\s*;/, ';');

    // 6. `as TypeName` type casts (excluding `as const`)
    line = line.replace(/\s+as\s+(?!const\b)\w[\w<>, .]*/, '');

    // 7. Generic type parameter in arrow function: `<T>(` at start of arrow fn
    //    e.g. `const t = <T>(content: IConfigLocales<T>) =>`
    line = line.replace(/(<\w+>)\(/, '(');

    // 8. Generic calls: `fn<Type>(` → `fn(`
    //    Only strip when angle brackets look like type params, not JSX
    line = line.replace(/(\w+)<[A-Z]\w*(?:,\s*[A-Z]\w*)*>\(/g, '$1(');

    // 9. Remove typed function parameters: `(param: Type)`, `param: Type,`
    //    Simple single-param-with-type: `: TypeName)` → `)`
    //    Avoid breaking object spread or return annotation already handled
    line = line.replace(/(\w)\s*:\s*[A-Z]\w*(\))/g, '$1$2');

    out.push(line);
  }

  // Insert JSDoc lines (reverse order so indices stay valid)
  const insertPositions = [...jsdocInserts.entries()].sort(
    (first, second) => second[0] - first[0]
  );
  for (const [pos, jsdoc] of insertPositions) {
    // Preserve indent of the following line
    const indent = (out[pos] ?? '').match(/^(\s*)/)?.[1] ?? '';
    out.splice(pos, 0, indent + jsdoc);
  }

  return { code: out.join('\n'), jsdocInserts };
};

// ── Export processing (CJS) ──────────────────────────────────────────────────

interface CollectedExport {
  localName: string;
  exportedName: string;
}

const processExportsCJS = (code: string): string => {
  const lines = code.split('\n');
  const collected: CollectedExport[] = [];
  let defaultExport: string | null = null;
  const requireLines: string[] = []; // for re-exports
  const out: string[] = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];

    // `export default X;` or `export default X`
    const defMatch = line.match(/^(\s*)export\s+default\s+(.+?);?\s*$/);
    if (defMatch) {
      defaultExport = trim(defMatch[2]);
      continue; // skip line, emit module.exports later
    }

    // `export const/let/var name = ...`
    const exportConstMatch = line.match(
      /^(\s*)export\s+(const|let|var)\s+(\w+)/
    );
    if (exportConstMatch) {
      const name = exportConstMatch[3];
      collected.push({ localName: name, exportedName: name });
      out.push(line.replace(/^(\s*)export\s+/, '$1'));
      continue;
    }

    // `export function name(...)` or `export async function name(...)`
    const exportFnMatch = line.match(
      /^(\s*)export\s+(?:async\s+)?function\s+(\w+)/
    );
    if (exportFnMatch) {
      const name = exportFnMatch[2];
      collected.push({ localName: name, exportedName: name });
      out.push(line.replace(/^(\s*)export\s+/, '$1'));
      continue;
    }

    // `export { A, B as C } from 'mod'` — re-export
    const reexportFromMatch = line.match(
      /^(\s*)export\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?\s*$/
    );
    if (reexportFromMatch) {
      const members = parseNamedImports(reexportFromMatch[2]);
      const modulePath = reexportFromMatch[3];
      // Only value members (no types)
      const valueMembers = members.filter((namedMember) => !namedMember.isType);
      if (valueMembers.length) {
        // require the original names
        const origNames = valueMembers.map((namedMember) => namedMember.name);
        requireLines.push(
          `const ${renderNamedImports(origNames.map((name) => ({ name })))} = require('${modulePath}');`
        );
        for (const namedMember of valueMembers) {
          collected.push({
            localName: namedMember.name,
            exportedName: namedMember.alias ?? namedMember.name,
          });
        }
      }
      continue;
    }

    // `export { A, B as C }` — named re-export (same module)
    const namedExportMatch = line.match(/^(\s*)export\s+\{([^}]+)\};?\s*$/);
    if (namedExportMatch) {
      const members = parseNamedImports(namedExportMatch[2]).filter(
        (namedMember) => !namedMember.isType
      );
      for (const namedMember of members) {
        collected.push({
          localName: namedMember.name,
          exportedName: namedMember.alias ?? namedMember.name,
        });
      }
      continue;
    }

    out.push(line);
  }

  // Prepend any require lines for re-exports
  const finalLines = requireLines.length ? [...requireLines, '', ...out] : out;

  // Append module.exports
  if (defaultExport !== null && collected.length === 0) {
    finalLines.push(`module.exports = ${defaultExport};`);
  } else if (defaultExport !== null && collected.length > 0) {
    const parts = collected.map((exportEntry) =>
      exportEntry.localName === exportEntry.exportedName
        ? exportEntry.localName
        : `${exportEntry.exportedName}: ${exportEntry.localName}`
    );
    finalLines.push(
      `module.exports = { default: ${defaultExport}, ${parts.join(', ')} };`
    );
  } else if (collected.length > 0) {
    const parts = collected.map((exportEntry) =>
      exportEntry.localName === exportEntry.exportedName
        ? exportEntry.localName
        : `${exportEntry.exportedName}: ${exportEntry.localName}`
    );
    finalLines.push(`module.exports = { ${parts.join(', ')} };`);
  }

  return finalLines.join('\n');
};

// ── Main transform entry point ────────────────────────────────────────────────

export const transformCode = (
  code: string,
  target: TargetCodeFormat
): string => {
  // 1. Parse all imports
  const imports = parseImports(code);
  const typeMap = buildTypeMap(imports);

  // 2. Replace import statements in the code
  let result = code;
  // Process in reverse order so string offsets stay valid
  const sorted = [...imports].sort(
    (firstImport, secondImport) => secondImport.start - firstImport.start
  );
  for (const parsedImport of sorted) {
    const rendered =
      target === 'esm'
        ? renderImportESM(parsedImport)
        : renderImportCJS(parsedImport);
    // rendered === null means remove the import
    const replacement = rendered ?? '';
    result =
      result.slice(0, parsedImport.start) +
      replacement +
      result.slice(parsedImport.end);
  }

  // 3. Collapse consecutive blank lines that may result from removed imports
  result = result.replace(/\n{3,}/g, '\n\n');

  // 4. Strip TypeScript type annotations
  const stripped = stripTypeAnnotations(result, typeMap);
  result = stripped.code;

  // 5. Process exports (CJS only)
  if (target === 'commonjs') {
    result = processExportsCJS(result);
  }

  // 6. Final cleanup: collapse any triple+ blank lines introduced by export processing,
  //    then trim leading/trailing blank lines.
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.replace(/^\n+/, '').replace(/\n+$/, '');

  return result;
};

/**
 * Derive the file name for a transformed format.
 * `next.config.ts` → `next.config.mjs` (ESM) / `next.config.cjs` (CJS)
 * `layout.tsx`     → `layout.jsx` (ESM or CJS — JSX always stays .jsx)
 */
export const deriveFileName = (
  fileName: string,
  target: TargetCodeFormat
): string => {
  if (target === 'esm') {
    // TSX → .jsx (standard ESM JSX), TS → .mjs (standard ESM module)
    return fileName.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.mjs');
  }
  // CJS: TSX → .jsx (JSX stays .jsx), TS → .cjs
  return fileName.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.cjs');
};

/**
 * Derive the syntax-highlighting language for a transformed format.
 * `typescript` → `javascript`; `tsx` → `jsx`
 */
export const deriveLanguage = (
  language: string,
  target: TargetCodeFormat
): string => {
  if (target === 'typescript') return language;
  return language === 'tsx'
    ? 'jsx'
    : language === 'typescript'
      ? 'javascript'
      : language;
};
