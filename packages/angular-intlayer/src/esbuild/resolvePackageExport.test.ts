import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  findPackageManifest,
  parsePackageSpecifier,
  resolvePackageExport,
} from './resolvePackageExport';

const IMPORT_CONDITIONS = ['browser', 'module', 'import'] as const;
const REQUIRE_CONDITIONS = ['browser', 'module', 'require'] as const;

let workspaceDir: string;
let appDir: string;

/** Writes a fake package under `<root>/node_modules/<name>`. */
const writePackage = (
  root: string,
  name: string,
  manifest: Record<string, unknown>,
  files: string[] = []
): string => {
  const packageDir = join(root, 'node_modules', name);
  mkdirSync(packageDir, { recursive: true });
  writeFileSync(join(packageDir, 'package.json'), JSON.stringify(manifest));

  for (const file of files) {
    mkdirSync(join(packageDir, file, '..'), { recursive: true });
    writeFileSync(join(packageDir, file), '');
  }

  return packageDir;
};

beforeAll(() => {
  workspaceDir = mkdtempSync(join(tmpdir(), 'resolve-package-export-'));
  appDir = join(workspaceDir, 'app');
  mkdirSync(join(appDir, 'src'), { recursive: true });

  writePackage(appDir, '@intlayer/core', {
    sideEffects: false,
    exports: {
      '.': {
        types: './dist/types/index.d.ts',
        require: './dist/cjs/index.cjs',
        import: './dist/esm/index.mjs',
      },
      './file': {
        types: './dist/types/file.d.ts',
        node: { import: './dist/esm/file.mjs' },
        browser: { import: './dist/esm/fileBrowser.mjs' },
        default: { import: './dist/esm/file.mjs' },
      },
      './package.json': './package.json',
    },
  });

  writePackage(appDir, '@intlayer/dictionaries-entry', {
    exports: {
      './*': {
        browser: './dist/esm/index.browser.mjs',
        import: './dist/esm/index.mjs',
      },
    },
  });

  writePackage(appDir, 'intlayer', {
    exports: {
      './plugins/*': { import: './dist/esm/plugins/*.mjs' },
    },
  });

  writePackage(
    appDir,
    'legacy-package',
    { main: './lib/index.js', module: './lib/index.mjs' },
    ['lib/index.js', 'lib/index.mjs', 'lib/deep.js']
  );

  // Hoisted one level above the app, the way a workspace lays packages out.
  writePackage(workspaceDir, 'angular-intlayer', {
    exports: { '.': { import: './dist/esm/index.mjs' } },
  });
});

afterAll(() => {
  rmSync(workspaceDir, { recursive: true, force: true });
});

describe('parsePackageSpecifier', () => {
  it('splits scoped and unscoped specifiers into name and subpath', () => {
    expect(parsePackageSpecifier('@intlayer/core/interpreter')).toEqual({
      packageName: '@intlayer/core',
      subpath: './interpreter',
    });
    expect(parsePackageSpecifier('angular-intlayer')).toEqual({
      packageName: 'angular-intlayer',
      subpath: '.',
    });
    expect(parsePackageSpecifier('intlayer/plugins/sync')).toEqual({
      packageName: 'intlayer',
      subpath: './plugins/sync',
    });
  });
});

describe('findPackageManifest', () => {
  it('walks up from the importing directory to the hoisted package', () => {
    expect(findPackageManifest('angular-intlayer', join(appDir, 'src'))).toBe(
      join(workspaceDir, 'node_modules', 'angular-intlayer', 'package.json')
    );
  });

  it('returns undefined when no ancestor holds the package', () => {
    expect(findPackageManifest('missing-package', appDir)).toBeUndefined();
  });
});

describe('resolvePackageExport', () => {
  it('picks the import entry and reports the package side-effect free', () => {
    expect(
      resolvePackageExport('@intlayer/core', appDir, IMPORT_CONDITIONS)
    ).toEqual({
      path: join(appDir, 'node_modules/@intlayer/core/dist/esm/index.mjs'),
      sideEffects: false,
    });
  });

  it('picks the require entry for require conditions', () => {
    expect(
      resolvePackageExport('@intlayer/core', appDir, REQUIRE_CONDITIONS)?.path
    ).toBe(join(appDir, 'node_modules/@intlayer/core/dist/cjs/index.cjs'));
  });

  it('descends nested condition maps in manifest order', () => {
    expect(
      resolvePackageExport('@intlayer/core/file', appDir, IMPORT_CONDITIONS)
        ?.path
    ).toBe(
      join(appDir, 'node_modules/@intlayer/core/dist/esm/fileBrowser.mjs')
    );

    expect(
      resolvePackageExport('@intlayer/core/file', appDir, ['import'])?.path
    ).toBe(join(appDir, 'node_modules/@intlayer/core/dist/esm/file.mjs'));
  });

  it('matches wildcard subpaths and substitutes the wildcard', () => {
    expect(
      resolvePackageExport(
        '@intlayer/dictionaries-entry/anything',
        appDir,
        IMPORT_CONDITIONS
      )
    ).toEqual({
      path: join(
        appDir,
        'node_modules/@intlayer/dictionaries-entry/dist/esm/index.browser.mjs'
      ),
      sideEffects: undefined,
    });

    expect(
      resolvePackageExport('intlayer/plugins/sync', appDir, IMPORT_CONDITIONS)
        ?.path
    ).toBe(join(appDir, 'node_modules/intlayer/dist/esm/plugins/sync.mjs'));
  });

  it('returns undefined for a subpath the exports map does not expose', () => {
    expect(
      resolvePackageExport('@intlayer/core/private', appDir, IMPORT_CONDITIONS)
    ).toBeUndefined();
  });

  it('falls back to module/main and plain files without an exports map', () => {
    expect(
      resolvePackageExport('legacy-package', appDir, IMPORT_CONDITIONS)?.path
    ).toBe(join(appDir, 'node_modules/legacy-package/lib/index.mjs'));

    expect(
      resolvePackageExport('legacy-package/lib/deep.js', appDir, [])?.path
    ).toBe(join(appDir, 'node_modules/legacy-package/lib/deep.js'));

    expect(
      resolvePackageExport('legacy-package/lib/missing.js', appDir, [])
    ).toBeUndefined();
  });

  it('returns undefined when the package is not installed', () => {
    expect(
      resolvePackageExport('@intlayer/unknown', appDir, IMPORT_CONDITIONS)
    ).toBeUndefined();
  });
});
