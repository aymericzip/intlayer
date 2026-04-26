#!/usr/bin/env bun
/**
 * Batch-edit localized markdown under `docs/docs/<locale>/`.
 *
 * Run from the `docs` package root:
 *
 *   bun tools/editLocalizedDocs.ts list-locales
 *   bun tools/editLocalizedDocs.ts run --transform zh-code-tab-label --locale zh --dry-run
 *   bun tools/editLocalizedDocs.ts run --transform zh-codesandbox-title --locale zh --write
 *   bun tools/editLocalizedDocs.ts run --transform align-tab-iframes --write
 *   bun tools/editLocalizedDocs.ts replace --pattern foo --with bar --locale en --glob intlayer_with_astro.md --write
 *   bun tools/editLocalizedDocs.ts replace --regex Demo --with Demo2 --locale zh --write
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import fg from 'fast-glob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_LOCALIZED_ROOT = join(__dirname, '..', 'docs');

const EXCLUDED: string[] = ['**/node_modules/**', '**/dist/**', '**/src/**'];

type TransformId =
  | 'zh-code-tab-label'
  | 'zh-codesandbox-title'
  | 'align-tab-iframes';

function isLocalePath(relPath: string, locale: string): boolean {
  const n = relPath.replaceAll('\\', '/');
  return n.startsWith(`${locale}/`);
}

const TRANSFORMS: Record<
  TransformId,
  (content: string, relPath: string) => string
> = {
  'zh-code-tab-label': (content, relPath) => {
    if (!isLocalePath(relPath, 'zh')) return content;
    return content.replaceAll(
      '<Tab label="Code" value="code">',
      '<Tab label="代码" value="code">'
    );
  },
  'zh-codesandbox-title': (content, relPath) => {
    if (!isLocalePath(relPath, 'zh')) return content;
    return content.replaceAll(
      'title="Demo CodeSandbox',
      'title="演示 CodeSandbox'
    );
  },
  'align-tab-iframes': (content) => alignTabIframesUnderTabs(content),
};

function listLocales(): string[] {
  return readdirSync(DOCS_LOCALIZED_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/**
 * Under `<Tab …>`, if the iframe starts with four spaces (`<Tab>\\n    <iframe`),
 * unindent the iframe block by four spaces per line and insert a blank line before `<iframe`,
 * matching Video / Code tab embeds (column-0 `<iframe`, two-space attributes).
 * Also inserts a blank line between a lone `/>` closing line and `  </Tab>` when missing.
 */
function alignTabIframesUnderTabs(text: string): string {
  const lines = text.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.includes('<Tab') && line.includes('value=')) {
      out.push(line);
      i += 1;
      const blanksStart = i;
      while (i < lines.length && lines[i].trim() === '') {
        i += 1;
      }
      if (i < lines.length && lines[i].startsWith('    <iframe')) {
        out.push('');
        let k = i;
        while (k < lines.length) {
          const ln = lines[k];
          const ded = ln.startsWith('    ') ? ln.slice(4) : ln;
          out.push(ded);
          const st = ded.trim();
          if (st === '/>' || (st.endsWith('/>') && !st.startsWith('<'))) {
            k += 1;
            break;
          }
          k += 1;
        }
        i = k;
        continue;
      }
      for (let j = blanksStart; j < i; j++) {
        out.push(lines[j]);
      }
      continue;
    }
    out.push(line);
    i += 1;
  }
  let joined = out.join('\n');
  joined = joined.replace(/\n\/>\n( {2}<\/Tab>)/g, '\n/>\n\n$1');
  return joined;
}

function parseLocaleList(values: string[] | undefined): string[] | null {
  if (!values?.length) return null;
  const flat = values.flatMap((v) => v.split(',').map((s) => s.trim()));
  if (flat.includes('*') || flat.includes('all')) return null;
  return flat.filter(Boolean);
}

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      transform: { type: 'string', multiple: true },
      locale: { type: 'string', multiple: true },
      glob: { type: 'string', default: '**/*.md' },
      pattern: { type: 'string' },
      with: { type: 'string' },
      regex: { type: 'boolean', default: false },
      write: { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
    },
  });

  const cmd = positionals[0];
  if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
    printHelp();
    process.exit(cmd ? 0 : 1);
    return;
  }

  if (cmd === 'list-locales') {
    for (const loc of listLocales()) console.log(loc);
    return;
  }

  if (cmd === 'run') {
    const rawT = values.transform;
    const transforms = (
      Array.isArray(rawT) ? rawT : rawT ? [rawT] : []
    ) as TransformId[];
    if (!transforms.length) {
      console.error('Missing --transform <id> (repeatable).');
      printHelp();
      process.exit(1);
      return;
    }
    for (const t of transforms) {
      if (!(t in TRANSFORMS)) {
        console.error(`Unknown transform: ${t}`);
        process.exit(1);
        return;
      }
    }
    const rawL = values.locale;
    const localeList = Array.isArray(rawL) ? rawL : rawL ? [rawL] : undefined;
    const localeFilter = parseLocaleList(localeList);
    const dryRun = Boolean(values['dry-run']) || !values.write;
    await applyTransforms(
      transforms,
      values.glob ?? '**/*.md',
      localeFilter,
      dryRun
    );
    return;
  }

  if (cmd === 'replace') {
    const pattern = values.pattern;
    const withStr = values.with;
    if (pattern === undefined || withStr === undefined) {
      console.error('replace requires --pattern and --with');
      process.exit(1);
      return;
    }
    const rawL = values.locale;
    const localeList = Array.isArray(rawL) ? rawL : rawL ? [rawL] : undefined;
    const localeFilter = parseLocaleList(localeList);
    const dryRun = Boolean(values['dry-run']) || !values.write;
    const replacer = values.regex
      ? (s: string) => s.replace(new RegExp(pattern, 'g'), withStr)
      : (s: string) => s.split(pattern).join(withStr);
    await applyReplacer(
      replacer,
      values.glob ?? '**/*.md',
      localeFilter,
      dryRun
    );
    return;
  }

  console.error(`Unknown command: ${cmd}`);
  printHelp();
  process.exit(1);
}

function printHelp(): void {
  console.log(`
editLocalizedDocs — edit markdown under docs/docs/<locale>/

Commands:
  list-locales
  run --transform <id> [--transform <id> ...] [--locale xx] [--glob '**/*.md'] [--write | --dry-run]
  replace --pattern <s> --with <s> [--regex] [--locale xx] [--glob '**/*.md'] [--write | --dry-run]

Transforms:
  zh-code-tab-label     <Tab label="Code" value="code"> → 代码 (zh only)
  zh-codesandbox-title  title="Demo CodeSandbox → 演示 CodeSandbox (zh only)
  align-tab-iframes     unindent <iframe> under <Tab> to match Video/Code blocks (all locales)

Defaults to --dry-run unless --write is passed.
--locale may be repeated or comma-separated. Omit or use * for all locales.
`);
}

async function collectFiles(
  globPattern: string,
  localeFilter: string[] | null
): Promise<string[]> {
  const patterns =
    localeFilter === null
      ? [join(DOCS_LOCALIZED_ROOT, globPattern)]
      : localeFilter.map((loc) => join(DOCS_LOCALIZED_ROOT, loc, globPattern));
  return fg(patterns, { ignore: EXCLUDED, onlyFiles: true, absolute: true });
}

async function applyTransforms(
  transformIds: TransformId[],
  globPattern: string,
  localeFilter: string[] | null,
  dryRun: boolean
): Promise<void> {
  const files = await collectFiles(globPattern, localeFilter);
  let changed = 0;
  for (const abs of files) {
    const rel = relative(DOCS_LOCALIZED_ROOT, abs);
    let text = readFileSync(abs, 'utf-8');
    const original = text;
    for (const id of transformIds) {
      text = TRANSFORMS[id](text, rel.replaceAll('\\', '/'));
    }
    if (text !== original) {
      changed += 1;
      console.log(`${dryRun ? '[dry-run] ' : ''}update ${rel}`);
      if (!dryRun) {
        const endsWithNl = original.endsWith('\n');
        writeFileSync(
          abs,
          endsWithNl && !text.endsWith('\n') ? `${text}\n` : text,
          'utf-8'
        );
      }
    }
  }
  console.log(`Done. ${changed} file(s) ${dryRun ? 'would be ' : ''}modified.`);
}

async function applyReplacer(
  replacer: (s: string) => string,
  globPattern: string,
  localeFilter: string[] | null,
  dryRun: boolean
): Promise<void> {
  const files = await collectFiles(globPattern, localeFilter);
  let changed = 0;
  for (const abs of files) {
    const rel = relative(DOCS_LOCALIZED_ROOT, abs);
    const original = readFileSync(abs, 'utf-8');
    const next = replacer(original);
    if (next !== original) {
      changed += 1;
      console.log(`${dryRun ? '[dry-run] ' : ''}update ${rel}`);
      if (!dryRun) {
        const endsWithNl = original.endsWith('\n');
        writeFileSync(
          abs,
          endsWithNl && !next.endsWith('\n') ? `${next}\n` : next,
          'utf-8'
        );
      }
    }
  }
  console.log(`Done. ${changed} file(s) ${dryRun ? 'would be ' : ''}modified.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
