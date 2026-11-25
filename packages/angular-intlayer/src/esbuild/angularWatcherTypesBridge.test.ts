import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, normalize } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  type AngularWatcher,
  type AngularWatcherModule,
  bridgeTypesToAngularWatcher,
  type ChangedFilesLike,
  diffFileContents,
  type FileContents,
  getTypesRevisionContents,
  mergeInjectedChanges,
  readFileContents,
  TYPES_REVISION_FILE_NAME,
} from './angularWatcherTypesBridge';

/** Mirror of `@angular/build`'s `ChangedFiles`. */
class ChangedFiles implements ChangedFilesLike {
  added = new Set<string>();
  modified = new Set<string>();
  removed = new Set<string>();

  get all(): string[] {
    return [...this.added, ...this.modified, ...this.removed];
  }
}

const createChangedFiles = (modified: string[]): ChangedFiles => {
  const changedFiles = new ChangedFiles();
  for (const filePath of modified) changedFiles.modified.add(filePath);
  return changedFiles;
};

/** Watcher whose batches are pushed by the test. */
const createFakeWatcher = () => {
  const resolvers: ((result: IteratorResult<ChangedFilesLike>) => void)[] = [];
  let isClosed = false;

  const watcher: AngularWatcher = {
    [Symbol.asyncIterator]: () => watcher,
    next: () =>
      new Promise((resolve) => {
        resolvers.push(resolve);
      }),
    add: () => undefined,
    remove: () => undefined,
    close: async () => {
      isClosed = true;
      resolvers.shift()?.({ value: undefined, done: true });
    },
  };

  return {
    watcher,
    emit: (changedFiles: ChangedFilesLike) =>
      resolvers.shift()?.({ value: changedFiles, done: false }),
    getIsClosed: () => isClosed,
  };
};

/** Subscription the test triggers by hand. */
const createManualSource = () => {
  let listener: ((changedFiles: ChangedFilesLike) => void) | undefined;

  return {
    subscribe: (newListener: (changedFiles: ChangedFilesLike) => void) => {
      listener = newListener;
      return () => {
        listener = undefined;
      };
    },
    inject: (changedFiles: ChangedFilesLike) => listener?.(changedFiles),
    getIsSubscribed: () => listener !== undefined,
  };
};

const temporaryDirectories: string[] = [];

const createTemporaryDirectory = (): string => {
  const directory = mkdtempSync(join(tmpdir(), 'angular-types-bridge-'));
  temporaryDirectories.push(directory);
  return directory;
};

afterEach(() => {
  temporaryDirectories.length = 0;
});

describe('readFileContents', () => {
  it('reads the TypeScript files and skips the revision script', () => {
    const directory = createTemporaryDirectory();
    writeFileSync(join(directory, 'app.ts'), 'export default {};');
    writeFileSync(join(directory, 'intlayer.d.ts'), 'import "intlayer";');
    writeFileSync(join(directory, 'notes.md'), '# not a type');
    writeFileSync(join(directory, TYPES_REVISION_FILE_NAME), 'interface X {}');

    const fileContents = readFileContents([directory]);

    expect([...fileContents.keys()].sort()).toEqual([
      normalize(join(directory, 'app.ts')),
      normalize(join(directory, 'intlayer.d.ts')),
    ]);
    expect(fileContents.get(normalize(join(directory, 'app.ts')))).toBe(
      'export default {};'
    );
  });

  it('treats a missing directory as empty', () => {
    const directory = join(createTemporaryDirectory(), 'missing');

    expect(readFileContents([directory]).size).toBe(0);
  });
});

describe('diffFileContents', () => {
  it('reports added, modified and removed files', () => {
    const previousContents: FileContents = new Map([
      ['/types/kept.ts', 'same'],
      ['/types/changed.ts', 'before'],
      ['/types/removed.ts', 'gone'],
    ]);
    const currentContents: FileContents = new Map([
      ['/types/kept.ts', 'same'],
      ['/types/changed.ts', 'after'],
      ['/types/added.ts', 'new'],
    ]);

    const changedFiles = diffFileContents(
      previousContents,
      currentContents,
      new ChangedFiles()
    );

    expect([...changedFiles.added]).toEqual(['/types/added.ts']);
    expect([...changedFiles.modified]).toEqual(['/types/changed.ts']);
    expect([...changedFiles.removed]).toEqual(['/types/removed.ts']);
  });

  it('ignores an identical rewrite', () => {
    const contents: FileContents = new Map([['/types/app.ts', 'same']]);

    expect(
      diffFileContents(contents, new Map(contents), new ChangedFiles()).all
    ).toEqual([]);
  });
});

describe('getTypesRevisionContents', () => {
  it('is a global script whose declaration changes with the revision', () => {
    const firstRevision = getTypesRevisionContents(1);
    const secondRevision = getTypesRevisionContents(2);

    // An import or export would make it a module, which no longer re-checks
    // every file when it changes.
    expect(firstRevision).not.toMatch(/^\s*(import|export)\b/m);
    expect(firstRevision).toMatch(/^interface \w+ \{ revision: 1 \}$/m);
    expect(firstRevision).not.toBe(secondRevision);
  });
});

describe('mergeInjectedChanges', () => {
  it('passes through the batches of the Angular watcher', async () => {
    const fakeWatcher = createFakeWatcher();
    const manualSource = createManualSource();
    const bridgedWatcher = mergeInjectedChanges(
      fakeWatcher.watcher,
      manualSource.subscribe
    );

    const nextResult = bridgedWatcher.next();
    fakeWatcher.emit(createChangedFiles(['/src/app.ts']));

    expect((await nextResult).value.all).toEqual(['/src/app.ts']);
  });

  it('yields an injected batch while the Angular watcher is idle', async () => {
    const fakeWatcher = createFakeWatcher();
    const manualSource = createManualSource();
    const bridgedWatcher = mergeInjectedChanges(
      fakeWatcher.watcher,
      manualSource.subscribe
    );

    const nextResult = bridgedWatcher.next();
    manualSource.inject(createChangedFiles(['/.intlayer/types/app.ts']));

    expect((await nextResult).value.all).toEqual(['/.intlayer/types/app.ts']);
  });

  it('keeps the pending Angular batch after yielding an injected one', async () => {
    const fakeWatcher = createFakeWatcher();
    const manualSource = createManualSource();
    const bridgedWatcher = mergeInjectedChanges(
      fakeWatcher.watcher,
      manualSource.subscribe
    );

    const firstResult = bridgedWatcher.next();
    manualSource.inject(createChangedFiles(['/.intlayer/types/app.ts']));
    await firstResult;

    const secondResult = bridgedWatcher.next();
    fakeWatcher.emit(createChangedFiles(['/src/app.ts']));

    expect((await secondResult).value.all).toEqual(['/src/app.ts']);
  });

  it('folds batches injected before the next call', async () => {
    const fakeWatcher = createFakeWatcher();
    const manualSource = createManualSource();
    const bridgedWatcher = mergeInjectedChanges(
      fakeWatcher.watcher,
      manualSource.subscribe
    );

    manualSource.inject(createChangedFiles(['/.intlayer/types/app.ts']));
    manualSource.inject(createChangedFiles(['/.intlayer/types/extra.ts']));

    expect((await bridgedWatcher.next()).value.all).toEqual([
      '/.intlayer/types/app.ts',
      '/.intlayer/types/extra.ts',
    ]);
  });

  it('unsubscribes and closes the Angular watcher on close', async () => {
    const fakeWatcher = createFakeWatcher();
    const manualSource = createManualSource();
    const bridgedWatcher = mergeInjectedChanges(
      fakeWatcher.watcher,
      manualSource.subscribe
    );

    const nextResult = bridgedWatcher.next();
    await bridgedWatcher.close();

    expect((await nextResult).done).toBe(true);
    expect(fakeWatcher.getIsClosed()).toBe(true);
    expect(manualSource.getIsSubscribed()).toBe(false);
  });
});

describe('bridgeTypesToAngularWatcher', () => {
  /**
   * Lays out a minimal `@angular/build` and loads its build action, as the
   * running builder does before plugins are set up.
   */
  const loadFakeAngularBuild = (): AngularWatcherModule => {
    const packageDirectory = join(
      createTemporaryDirectory(),
      'node_modules',
      '@angular',
      'build'
    );
    const buildActionDirectory = join(
      packageDirectory,
      'src',
      'builders',
      'application'
    );
    const watcherDirectory = join(packageDirectory, 'src', 'tools', 'esbuild');
    mkdirSync(buildActionDirectory, { recursive: true });
    mkdirSync(watcherDirectory, { recursive: true });

    writeFileSync(
      join(buildActionDirectory, 'build-action.js'),
      "require('../../tools/esbuild/watcher.js');"
    );
    writeFileSync(
      join(watcherDirectory, 'watcher.js'),
      [
        'class ChangedFiles {',
        '  added = new Set(); modified = new Set(); removed = new Set();',
        '  get all() { return [...this.added, ...this.modified, ...this.removed]; }',
        '}',
        'exports.ChangedFiles = ChangedFiles;',
        'exports.createWatcher = () => {',
        '  const watcher = {',
        '    [Symbol.asyncIterator]: () => watcher,',
        '    next: () => new Promise(() => {}),',
        '    add() {}, remove() {}, async close() {},',
        '  };',
        '  return watcher;',
        '};',
      ].join('\n')
    );

    const require = createRequire(import.meta.url);
    require(join(buildActionDirectory, 'build-action.js'));

    return require(join(watcherDirectory, 'watcher.js'));
  };

  it('makes the Angular watcher report rewritten declarations', async () => {
    const watcherModule = loadFakeAngularBuild();
    const typesDirectory = createTemporaryDirectory();
    const typeFilePath = normalize(join(typesDirectory, 'app.ts'));
    const revisionFilePath = normalize(
      join(typesDirectory, TYPES_REVISION_FILE_NAME)
    );
    writeFileSync(typeFilePath, 'export default { title: "Hello" };');

    expect(bridgeTypesToAngularWatcher([typesDirectory], typesDirectory)).toBe(
      true
    );
    expect(readFileSync(revisionFilePath, 'utf-8')).toBe(
      getTypesRevisionContents(0)
    );

    const watcher = watcherModule.createWatcher();
    const nextResult = watcher.next();
    writeFileSync(typeFilePath, 'export default { title: "Hello", key: 1 };');

    const changedFiles = (await nextResult).value;

    expect([...changedFiles.modified].sort()).toEqual(
      [revisionFilePath, typeFilePath].sort()
    );
    expect(readFileSync(revisionFilePath, 'utf-8')).toBe(
      getTypesRevisionContents(1)
    );

    await watcher.close();
  });

  it('wraps a watcher module once across repeated setups', () => {
    const watcherModule = loadFakeAngularBuild();
    const typesDirectory = createTemporaryDirectory();

    bridgeTypesToAngularWatcher([typesDirectory], typesDirectory);
    const wrappedCreateWatcher = watcherModule.createWatcher;
    bridgeTypesToAngularWatcher([typesDirectory], typesDirectory);

    expect(watcherModule.createWatcher).toBe(wrappedCreateWatcher);
  });

  it('reports declarations rewritten before the watcher subscribes', async () => {
    const watcherModule = loadFakeAngularBuild();
    const typesDirectory = createTemporaryDirectory();
    const typeFilePath = normalize(join(typesDirectory, 'app.ts'));
    writeFileSync(typeFilePath, 'export default { title: "Hello" };');
    bridgeTypesToAngularWatcher([typesDirectory], typesDirectory);

    // No filesystem watcher exists during this rewrite.
    writeFileSync(typeFilePath, 'export default { title: "Updated" };');
    const watcher = watcherModule.createWatcher();
    try {
      const changedFiles = (await watcher.next()).value;
      expect([...changedFiles.modified]).toContain(typeFilePath);
    } finally {
      await watcher.close();
    }
  });
});
