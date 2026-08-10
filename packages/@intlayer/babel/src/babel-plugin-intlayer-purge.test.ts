import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { LogConfig } from '@intlayer/types/config';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  type PurgePluginOptions,
  runIntlayerPurgePipeline,
} from './babel-plugin-intlayer-purge';

// ── Fixtures ──────────────────────────────────────────────────────────────────

/** A compiled translation node, as emitted by `intlayer build`. */
const translationNode = (value: string) => ({
  nodeType: 'translation',
  translation: { en: value },
});

/**
 * Builds a throwaway project holding one compiled dictionary with a consumed
 * field and an unused one, plus the component that reads the consumed field.
 */
const createProjectFixture = () => {
  const baseDir = mkdtempSync(join(tmpdir(), 'intlayer-purge-'));
  const dictionariesDir = join(baseDir, '.intlayer', 'dictionaries');
  const dynamicDictionariesDir = join(
    baseDir,
    '.intlayer',
    'dynamic_dictionaries'
  );
  const componentFilePath = join(baseDir, 'Component.tsx');

  mkdirSync(dictionariesDir, { recursive: true });

  writeFileSync(
    join(dictionariesDir, 'about.json'),
    JSON.stringify({
      key: 'about',
      content: {
        title: translationNode('Title'),
        unusedField: translationNode('Unused'),
      },
    }),
    'utf-8'
  );

  writeFileSync(
    componentFilePath,
    `
      import { useIntlayer } from 'react-intlayer';

      export const Component = () => {
        const { title } = useIntlayer('about');
        return title;
      };
    `,
    'utf-8'
  );

  return {
    baseDir,
    dictionariesDir,
    dynamicDictionariesDir,
    componentFilePath,
  };
};

/** Reads the compiled dictionary back from disk. */
const readDictionary = (dictionariesDir: string): Record<string, unknown> =>
  JSON.parse(
    readFileSync(join(dictionariesDir, 'about.json'), 'utf-8')
  ) as Record<string, unknown>;

// ── Log capture ───────────────────────────────────────────────────────────────

type CapturedLogs = {
  /** Every line printed, whatever its level, flattened to a single string. */
  lines: string[];
  /** Only the lines printed at `warn` level. */
  warnings: string[];
  /** The `log` config wiring the capture in. */
  logConfig: { log: LogConfig };
};

/**
 * Matches the ANSI colour sequences the logger emits. Built from the escape
 * character's code point so the pattern holds no literal control character.
 */
const ANSI_COLOR_PATTERN = new RegExp(
  `${String.fromCharCode(27)}\\[[0-9;]*m`,
  'g'
);

/** Drops the ANSI colour codes the logger adds, so assertions read the text. */
const stripAnsiCodes = (value: string): string =>
  value.replace(ANSI_COLOR_PATTERN, '');

/**
 * Captures what the pipeline reports by overriding the logger's output
 * functions, so the assertions read the real formatted messages.
 */
const captureLogs = (mode: LogConfig['mode'] = 'verbose'): CapturedLogs => {
  const lines: string[] = [];
  const warnings: string[] = [];

  const record =
    (target: string[]) =>
    (...parts: unknown[]) => {
      const line = stripAnsiCodes(parts.map(String).join(' '));
      lines.push(line);
      if (target !== lines) target.push(line);
    };

  return {
    lines,
    warnings,
    logConfig: {
      log: {
        mode,
        prefix: '',
        info: record(lines),
        log: record(lines),
        warn: record(warnings),
        error: record(warnings),
        debug: record(lines),
      },
    },
  };
};

// ── Options ───────────────────────────────────────────────────────────────────

const buildOptions = (
  fixture: ReturnType<typeof createProjectFixture>,
  overrides: Partial<PurgePluginOptions> = {}
): PurgePluginOptions => ({
  baseDir: fixture.baseDir,
  purge: true,
  minify: true,
  optimize: true,
  editorEnabled: false,
  dictionariesDir: fixture.dictionariesDir,
  dynamicDictionariesDir: fixture.dynamicDictionariesDir,
  componentFilesList: [fixture.componentFilePath],
  dictionaryKeyToImportModeMap: { about: 'static' },
  ...overrides,
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('runIntlayerPurgePipeline', () => {
  let fixture: ReturnType<typeof createProjectFixture>;

  beforeEach(() => {
    fixture = createProjectFixture();
  });

  it('removes unused fields and renames the remaining ones', () => {
    const pruneContext = runIntlayerPurgePipeline(buildOptions(fixture));

    // `title` sorts before `unusedField`, so it takes the first alias.
    expect(readDictionary(fixture.dictionariesDir)).toEqual({
      key: 'about',
      content: { a: translationNode('Title') },
    });

    expect(pruneContext.dictionaryKeyToFieldUsageMap.get('about')).toEqual(
      new Set(['title'])
    );
  });

  it('leaves announcing the enabled steps to the bundler plugin', () => {
    const { lines, logConfig } = captureLogs();

    runIntlayerPurgePipeline(buildOptions(fixture, { logConfig }));

    expect(lines).not.toContain('Dictionary purge enabled');
    expect(lines).not.toContain('Dictionary minification enabled');
  });

  it('reports the pruned fields and the build summary', () => {
    const { lines, logConfig } = captureLogs();

    runIntlayerPurgePipeline(buildOptions(fixture, { logConfig }));

    expect(lines).toContain('Pruned 1 unused field from about: unusedField');
    expect(lines).toContain('Pruned 1 unused field across 1 dictionary.');
  });

  it('keeps the per-field detail out of a non-verbose build', () => {
    const { lines, logConfig } = captureLogs('default');

    runIntlayerPurgePipeline(buildOptions(fixture, { logConfig }));

    // The summary is unconditional; the per-dictionary breakdown is verbose.
    expect(lines).toContain('Pruned 1 unused field across 1 dictionary.');
    expect(lines).not.toContain(
      'Pruned 1 unused field from about: unusedField'
    );
  });

  it('reports nothing when logging is disabled', () => {
    const { lines, warnings, logConfig } = captureLogs('disabled');

    runIntlayerPurgePipeline(buildOptions(fixture, { logConfig }));

    expect(lines).toEqual([]);
    expect(warnings).toEqual([]);
  });

  it('explains that the visual editor stands the pipeline down', () => {
    const { lines, logConfig } = captureLogs();

    const pruneContext = runIntlayerPurgePipeline(
      buildOptions(fixture, { logConfig, editorEnabled: true })
    );

    expect(lines).toContain('Dictionary purge is disabled');
    expect(lines).toContain('Dictionary minification is disabled');

    // Content is left fully intact for the editor.
    expect(readDictionary(fixture.dictionariesDir)).toEqual({
      key: 'about',
      content: {
        title: translationNode('Title'),
        unusedField: translationNode('Unused'),
      },
    });
    expect(pruneContext.dictionaryKeyToFieldUsageMap.size).toBe(0);
  });

  it('warns about a dictionary whose consumption cannot be tracked', () => {
    writeFileSync(
      fixture.componentFilePath,
      `
        import { useIntlayer } from 'react-intlayer';

        export const Component = () => {
          const content = useIntlayer('about');
          return renderAnything(content);
        };
      `,
      'utf-8'
    );

    const { warnings, logConfig } = captureLogs();

    runIntlayerPurgePipeline(buildOptions(fixture, { logConfig }));

    expect(
      warnings.some(
        (warning) =>
          warning.includes('about') &&
          warning.includes('cannot be purged or minified')
      )
    ).toBe(true);
  });

  it('runs at most once per base directory', () => {
    const firstContext = runIntlayerPurgePipeline(buildOptions(fixture));

    const { lines, logConfig } = captureLogs();
    const secondContext = runIntlayerPurgePipeline(
      buildOptions(fixture, { logConfig })
    );

    // A second run would derive the aliases from the already-renamed JSON.
    expect(secondContext).toBe(firstContext);
    expect(lines).toEqual([]);
  });
});
