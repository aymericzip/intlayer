import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readWorkspacePackage } from './npm-release-utils.ts';
import type { ReleasePackage } from './npm-release-utils.ts';
import {
  canStageVersion,
  getDistTagFromVersion,
  isPublished,
  mapConcurrent,
  readReleaseManifest,
  rootDirectory,
  validateReleaseVersions,
} from './npm-release-utils.ts';
import { prepareNpmRelease } from './prepare-npm-release.ts';
import { publishNpmRelease } from './publish-npm-release.ts';

const { version } = readWorkspacePackage();

describe('npm release validation', () => {
  test('rejects empty releases, duplicate names and mismatched versions', () => {
    expect(() => validateReleaseVersions([], version)).toThrow(
      'No public packages'
    );
    expect(() =>
      validateReleaseVersions([{ name: 'example', version: '0.0.0' }], version)
    ).toThrow('must match');
    const packageVersion = { name: 'example', version };
    expect(() =>
      validateReleaseVersions([packageVersion, packageVersion], version)
    ).toThrow('Duplicate');
  });

  test.each([
    ['9.9.1', 'latest'],
    ['9.9.1-canary.0', 'canary'],
    ['9.9.1-rc.1', 'rc'],
    ['9.9.1-12', 'next'],
    ['9.9.1+build.2', 'latest'],
  ])('%s promotes to %s', (packageVersion, tag) => {
    expect(getDistTagFromVersion(packageVersion)).toBe(tag);
  });

  test('metadata with a missing tarball is unavailable', async () => {
    const requests: { url: string; options: RequestInit }[] = [];
    const available = await isPublished(
      { name: '@intlayer/example', version },
      {
        fetchRequest: async (url, options) => {
          requests.push({ url, options });
          return requests.length === 1
            ? Response.json({
                name: '@intlayer/example',
                version,
                dist: { tarball: 'https://registry.example/example.tgz' },
              })
            : new Response(null, { status: 404 });
        },
      }
    );
    expect(available).toBe(false);
    expect(new Headers(requests[1]!.options.headers).get('Range')).toBe(
      'bytes=0-0'
    );
  });

  test('accepts metadata only when the tarball is accessible', async () => {
    let requestCount = 0;
    expect(
      await isPublished(
        { name: 'example', version },
        {
          fetchRequest: async () =>
            ++requestCount === 1
              ? Response.json({
                  name: 'example',
                  version,
                  dist: { tarball: 'https://registry.example/example.tgz' },
                })
              : new Response('x', { status: 206 }),
        }
      )
    ).toBe(true);
  });

  test('network errors and invalid metadata remain unavailable', async () => {
    expect(
      await isPublished(
        { name: 'example', version },
        {
          fetchRequest: async () => {
            throw new Error('offline');
          },
        }
      )
    ).toBe(false);
    expect(
      await isPublished(
        { name: 'example', version },
        {
          fetchRequest: async () => Response.json({ name: 'wrong', version }),
        }
      )
    ).toBe(false);
  });

  test('bounds concurrency and preserves result order', async () => {
    let active = 0;
    let peak = 0;
    const result = await mapConcurrent(
      [1, 2, 3, 4, 5],
      async (item) => {
        active++;
        peak = Math.max(peak, active);
        await Promise.resolve();
        active--;
        return item * 2;
      },
      2
    );
    expect(peak).toBe(2);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });
});

describe('prepared npm release', () => {
  let directory: string;
  const packages: [ReleasePackage, ReleasePackage] = [
    { name: '@intlayer/example', version, tarball: 'example.tgz' },
    { name: '@intlayer/docs', version, tarball: 'docs.tgz' },
  ];

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), 'intlayer-release-test-'));
    writeFileSync(
      join(directory, 'manifest.json'),
      JSON.stringify({ version, packages })
    );
    for (const { tarball } of packages) {
      writeFileSync(join(directory, tarball), 'prepared archive fixture');
    }
  });

  afterEach(() => rmSync(directory, { recursive: true, force: true }));

  test('waits for tarballs without staging a version already tagged latest', async () => {
    let ready = false;
    let uploads = 0;
    await publishNpmRelease({
      phase: 'staging',
      directory,
      maxAttempts: 2,
      canStage: (entry) =>
        canStageVersion(entry, {
          fetchRequest: async () =>
            Response.json({
              name: entry.name,
              'dist-tags': { latest: version },
              versions: {},
            }),
        }),
      checkPublished: async () => ready,
      executeNpm: async () => {
        uploads++;
        return true;
      },
      wait: async () => {
        ready = true;
      },
    });
    expect(uploads).toBe(0);
  });

  test('retries only unavailable archives and waits between attempts', async () => {
    const published = new Set([packages[0].name]);
    const commands: string[][] = [];
    const delays: number[] = [];
    await publishNpmRelease({
      phase: 'staging',
      directory,
      canStage: async ({ name }) => !published.has(name),
      checkPublished: async ({ name }) => published.has(name),
      executeNpm: async (commandArguments: string[]) => {
        commands.push(commandArguments);
        if (commands.length === 2) published.add(packages[1].name);
        return commands.length === 2;
      },
      wait: async (delay) => {
        delays.push(delay);
      },
    });
    expect(commands).toHaveLength(2);
    expect(
      commands.every(
        (commandArguments) =>
          commandArguments[0] === 'publish' &&
          commandArguments[1] === join(directory, 'docs.tgz')
      )
    ).toBe(true);
    expect(commands[0]).toContain('staging');
    expect(commands[0]).toContain('--ignore-scripts');
    expect(delays).toEqual([30_000]);
  });

  test('stops after 20 attempts with 19 pauses', async () => {
    let calls = 0;
    const delays: number[] = [];
    await expect(
      publishNpmRelease({
        phase: 'staging',
        directory,
        canStage: async ({ name }) => name !== packages[0].name,
        checkPublished: async ({ name }) => name === packages[0].name,
        executeNpm: async () => {
          calls++;
          return false;
        },
        wait: async (delay) => {
          delays.push(delay);
        },
      })
    ).rejects.toThrow('after 20 attempts');
    expect(calls).toBe(20);
    expect(delays).toEqual(Array(19).fill(30_000));
  });

  test('blocks every tag update when any package or tarball is missing', async () => {
    let calls = 0;
    await expect(
      publishNpmRelease({
        phase: 'promote',
        directory,
        checkPublished: async ({ name }) => name !== packages[1].name,
        executeNpm: async () => {
          calls++;
          return true;
        },
      })
    ).rejects.toThrow('Promotion blocked');
    expect(calls).toBe(0);
  });

  test('resumes a partial promotion and verifies the resulting tags', async () => {
    const promoted = new Set([packages[0].name]);
    const commands: string[][] = [];
    await publishNpmRelease({
      phase: 'promote',
      directory,
      checkPublished: async () => true,
      checkPromoted: async ({ name }) => promoted.has(name),
      executeNpm: async (commandArguments: string[]) => {
        commands.push(commandArguments);
        if (commands.length === 2) promoted.add(packages[1].name);
        return commands.length === 2;
      },
      wait: async () => {},
    });
    expect(commands).toHaveLength(2);
    expect(commands[0]!.slice(0, 4)).toEqual([
      'dist-tag',
      'add',
      `${packages[1].name}@${version}`,
      'latest',
    ]);
  });

  test('does not trust a successful command before the tag is visible', async () => {
    let calls = 0;
    await expect(
      publishNpmRelease({
        phase: 'promote',
        directory,
        maxAttempts: 2,
        checkPublished: async () => true,
        checkPromoted: async () => false,
        executeNpm: async () => {
          calls++;
          return true;
        },
        wait: async () => {},
      })
    ).rejects.toThrow('after 2 attempts');
    expect(calls).toBe(4);
  });

  test('dry run publishes with --dry-run and performs no registry checks or tag writes', async () => {
    const commands: string[][] = [];
    const failRegistryCheck = async () => {
      throw new Error('unexpected registry check');
    };
    const options = {
      directory,
      dryRun: true,
      checkPublished: failRegistryCheck,
      checkPromoted: failRegistryCheck,
      executeNpm: async (commandArguments: string[]) => {
        commands.push(commandArguments);
        return true;
      },
    };
    await publishNpmRelease({ ...options, phase: 'staging' });
    await publishNpmRelease({ ...options, phase: 'promote' });
    expect(commands).toHaveLength(2);
    expect(
      commands.every((commandArguments) =>
        commandArguments.includes('--dry-run')
      )
    ).toBe(true);
  });

  test('rejects mismatched artifacts and missing archives before publishing', async () => {
    writeFileSync(
      join(directory, 'manifest.json'),
      JSON.stringify({ version: '0.0.0', packages })
    );
    expect(() => readReleaseManifest(directory)).toThrow('does not match');
    writeFileSync(
      join(directory, 'manifest.json'),
      JSON.stringify({ version, packages })
    );
    rmSync(join(directory, packages[0].tarball));
    await expect(
      publishNpmRelease({ phase: 'staging', directory })
    ).rejects.toThrow('Missing prepared archive');
  });

  test('runs the TypeScript publish CLI with Bun and prepared archives without installing dependencies', () => {
    const binaryDirectory = join(directory, 'bin');
    const commandLog = join(directory, 'npm-commands.txt');
    mkdirSync(binaryDirectory);
    writeFileSync(
      join(binaryDirectory, 'npm'),
      '#!/bin/sh\nprintf "%s\\n" "$@" >> "$RELEASE_TEST_COMMAND_LOG"\n',
      { mode: 0o755 }
    );
    const result = spawnSync(
      'bun',
      [
        join(rootDirectory, 'scripts/publish-npm-release.ts'),
        '--phase',
        'staging',
        '--dry-run',
        '--directory',
        directory,
      ],
      {
        cwd: directory,
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${binaryDirectory}:${process.env.PATH}`,
          RELEASE_TEST_COMMAND_LOG: commandLog,
        },
      }
    );
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
    const commands = readFileSync(commandLog, 'utf8');
    expect(commands.match(/--dry-run/g)).toHaveLength(2);
    expect(commands.match(/--ignore-scripts/g)).toHaveLength(2);
    expect(commands).not.toContain('pack');
    expect(commands).not.toContain('build');
  });

  test('Bun archives rewrite workspace dependencies without running lifecycle builds', () => {
    const workspaceDirectory = join(directory, 'workspace');
    const packageDirectory = join(workspaceDirectory, 'packages', 'example');
    mkdirSync(packageDirectory, { recursive: true });
    writeFileSync(
      join(workspaceDirectory, 'package.json'),
      JSON.stringify({
        name: 'release-fixture',
        private: true,
        workspaces: ['packages/*'],
      })
    );
    for (const name of [
      'release-dependency',
      'release-caret',
      'release-tilde',
    ]) {
      const dependencyDirectory = join(workspaceDirectory, 'packages', name);
      mkdirSync(dependencyDirectory, { recursive: true });
      writeFileSync(
        join(dependencyDirectory, 'package.json'),
        JSON.stringify({ name, version })
      );
    }
    writeFileSync(
      join(packageDirectory, 'package.json'),
      JSON.stringify({
        name: 'release-example',
        version,
        dependencies: {
          'release-dependency': 'workspace:*',
          'release-caret': 'workspace:^',
          'release-tilde': 'workspace:~',
        },
        scripts: { prepublishOnly: 'exit 1' },
      })
    );
    const result = spawnSync(
      'bun',
      ['pm', 'pack', '--quiet', '--ignore-scripts', '--destination', directory],
      { cwd: packageDirectory, encoding: 'utf8' }
    );
    expect(result.status).toBe(0);
    const archive = spawnSync(
      'tar',
      ['-xOf', result.stdout.trim(), 'package/package.json'],
      {
        encoding: 'utf8',
      }
    );
    expect(archive.status).toBe(0);
    expect(JSON.parse(archive.stdout).dependencies['release-dependency']).toBe(
      version
    );
    expect(JSON.parse(archive.stdout).dependencies['release-caret']).toBe(
      `^${version}`
    );
    expect(JSON.parse(archive.stdout).dependencies['release-tilde']).toBe(
      `~${version}`
    );
  });

  test('preserves scoped and unscoped archives and never rebuilds during retries', async () => {
    const workspacePackages = [
      '@intlayer/cli',
      'intlayer-cli',
      '@intlayer/editor',
      'intlayer-editor',
    ].map((name, index) => {
      const packageDirectory = join(directory, 'sources', String(index));
      mkdirSync(packageDirectory, { recursive: true });
      const scripts = { prepublishOnly: 'bun prepublish.ts' };
      writeFileSync(
        join(packageDirectory, 'package.json'),
        JSON.stringify({ name, version, scripts })
      );
      writeFileSync(
        join(packageDirectory, 'prepublish.ts'),
        'import { appendFileSync } from "node:fs"; appendFileSync("build-count.txt", "built\\n");'
      );
      return { name, version, scripts, directory: packageDirectory };
    });
    const archiveDirectory = join(directory, 'archives');
    prepareNpmRelease({
      packages: workspacePackages,
      version,
      directory: archiveDirectory,
    });
    const manifest = readReleaseManifest(archiveDirectory);
    expect(new Set(manifest.packages.map(({ tarball }) => tarball)).size).toBe(
      4
    );
    for (const packageVersion of manifest.packages) {
      const contents = spawnSync(
        'tar',
        [
          '-xOf',
          join(archiveDirectory, packageVersion.tarball),
          'package/package.json',
        ],
        { encoding: 'utf8' }
      );
      expect(JSON.parse(contents.stdout).name).toBe(packageVersion.name);
    }
    let calls = 0;
    await publishNpmRelease({
      phase: 'staging',
      directory: archiveDirectory,
      canStage: async () => true,
      checkPublished: async () => calls >= 8,
      executeNpm: async () => {
        calls++;
        return calls > 4;
      },
      wait: async () => {},
    });
    expect(calls).toBe(8);
    for (const packageVersion of workspacePackages) {
      expect(
        readFileSync(join(packageVersion.directory, 'build-count.txt'), 'utf8')
      ).toBe('built\n');
    }
  });

  test('removes an old manifest if lifecycle preparation fails', () => {
    const packageDirectory = join(directory, 'broken');
    mkdirSync(packageDirectory);
    const scripts = { prepublishOnly: 'exit 1' };
    writeFileSync(
      join(packageDirectory, 'package.json'),
      JSON.stringify({ name: 'broken', version, scripts })
    );
    expect(() =>
      prepareNpmRelease({
        packages: [
          { name: 'broken', version, scripts, directory: packageDirectory },
        ],
        version,
        directory,
      })
    ).toThrow('prepublishOnly failed');
    expect(existsSync(join(directory, 'manifest.json'))).toBe(false);
  });
});
