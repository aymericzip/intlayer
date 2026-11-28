import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildFormatCommand,
  detectFormatCommand,
  detectProjectFormatter,
  escapeShellFilePath,
  type FormatCommandConfiguration,
  runFormatCommand,
} from './detectFormatCommand';

const temporaryDirectories: string[] = [];

/** Creates an empty project directory removed after each test. */
const createProjectDirectory = (): string => {
  const projectDirectory = mkdtempSync(join(tmpdir(), 'intlayer-format-'));
  temporaryDirectories.push(projectDirectory);
  return projectDirectory;
};

/** Writes a `package.json` declaring `devDependencies` in `directory`. */
const writePackageJson = (
  directory: string,
  devDependencies: Record<string, string>
): void => {
  mkdirSync(directory, { recursive: true });
  writeFileSync(
    join(directory, 'package.json'),
    JSON.stringify({ name: 'project', devDependencies })
  );
};

/** Creates a fake `node_modules/.bin/<binaryName>` in `directory`. */
const writeBinary = (directory: string, binaryName: string): string => {
  const binaryPath = join(directory, 'node_modules', '.bin', binaryName);
  mkdirSync(dirname(binaryPath), { recursive: true });
  writeFileSync(binaryPath, '');
  return binaryPath;
};

const createConfiguration = (
  baseDir: string,
  formatCommand?: string,
  warn: typeof console.warn = vi.fn()
): FormatCommandConfiguration => ({
  system: { baseDir },
  content: { formatCommand },
  log: { mode: 'default', prefix: '', warn },
});

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('escapeShellFilePath', () => {
  it('escapes $ and backticks on POSIX platforms', () => {
    expect(
      escapeShellFilePath(
        '/Users/user/app/src/routes/{-$locale}/about.content.ts',
        'darwin'
      )
    ).toBe('/Users/user/app/src/routes/{-\\$locale}/about.content.ts');

    expect(
      escapeShellFilePath('/home/user/$project/`name`/file.ts', 'linux')
    ).toBe('/home/user/\\$project/\\`name\\`/file.ts');
  });

  it('leaves paths untouched on Windows', () => {
    expect(
      escapeShellFilePath(
        'C:\\Users\\user\\app\\src\\routes\\{-$locale}\\about.content.ts',
        'win32'
      )
    ).toBe('C:\\Users\\user\\app\\src\\routes\\{-$locale}\\about.content.ts');
  });
});

describe('buildFormatCommand', () => {
  it('interpolates {{file}} with escaped $ in TanStack Start route paths on POSIX', () => {
    const command = buildFormatCommand(
      'prettier --write "{{file}}" --log-level silent',
      '/Users/user/app/src/routes/{-$locale}/index.content.ts',
      'darwin'
    );

    expect(command).toBe(
      'prettier --write "/Users/user/app/src/routes/{-\\$locale}/index.content.ts" --log-level silent'
    );
  });

  it('does not treat $& or $` in file paths as String.replace special patterns', () => {
    const command = buildFormatCommand(
      'prettier --write "{{file}}"',
      'C:\\app\\routes\\$&\\file.ts',
      'win32'
    );

    expect(command).toBe('prettier --write "C:\\app\\routes\\$&\\file.ts"');
  });
});

describe('detectProjectFormatter', () => {
  it('skips a formatter installed only as a transitive dependency', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { vite: '1.0.0' });
    writeBinary(projectDirectory, 'prettier');

    expect(detectProjectFormatter(projectDirectory, 'darwin')).toBeUndefined();
  });

  it('skips a declared formatter whose binary is not installed', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { prettier: '3.0.0' });

    expect(detectProjectFormatter(projectDirectory, 'darwin')).toBeUndefined();
  });

  it('calls the oxfmt binary by its absolute path', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { oxfmt: '0.80.0' });
    const binaryPath = writeBinary(projectDirectory, 'oxfmt');

    expect(detectProjectFormatter(projectDirectory, 'darwin')).toEqual({
      command: `"${binaryPath}" "{{file}}" --no-error-on-unmatched-pattern`,
      workingDirectory: projectDirectory,
    });
  });

  it('prefers oxfmt over prettier when both are declared', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { prettier: '3.0.0', oxfmt: '0.80.0' });
    writeBinary(projectDirectory, 'prettier');
    const oxfmtBinaryPath = writeBinary(projectDirectory, 'oxfmt');

    expect(
      detectProjectFormatter(projectDirectory, 'darwin')?.command
    ).toContain(`"${oxfmtBinaryPath}"`);
  });

  it('detects biome through its @biomejs/biome package', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { '@biomejs/biome': '2.0.0' });
    const binaryPath = writeBinary(projectDirectory, 'biome');

    expect(detectProjectFormatter(projectDirectory, 'darwin')?.command).toBe(
      `"${binaryPath}" format "{{file}}" --write --log-level none`
    );
  });

  it('runs `vp fmt` of a Vite+ monorepo from its workspace root', () => {
    const workspaceDirectory = createProjectDirectory();
    const applicationDirectory = join(workspaceDirectory, 'apps', 'web');
    writePackageJson(workspaceDirectory, { 'vite-plus': '1.8.0' });
    writePackageJson(applicationDirectory, { 'vite-plus': '1.8.0' });
    const binaryPath = writeBinary(applicationDirectory, 'vp');

    expect(detectProjectFormatter(applicationDirectory, 'darwin')).toEqual({
      command: `"${binaryPath}" fmt "{{file}}" --no-error-on-unmatched-pattern`,
      workingDirectory: workspaceDirectory,
    });
  });

  it('runs other formatters from the project directory', () => {
    const workspaceDirectory = createProjectDirectory();
    const applicationDirectory = join(workspaceDirectory, 'apps', 'web');
    writePackageJson(workspaceDirectory, { prettier: '3.0.0' });
    writePackageJson(applicationDirectory, {});
    writeBinary(workspaceDirectory, 'prettier');

    expect(
      detectProjectFormatter(applicationDirectory, 'darwin')?.workingDirectory
    ).toBe(applicationDirectory);
  });

  it('looks for the `.cmd` shim on Windows', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { prettier: '3.0.0' });
    writeBinary(projectDirectory, 'prettier');

    expect(detectProjectFormatter(projectDirectory, 'win32')).toBeUndefined();

    const shimPath = writeBinary(projectDirectory, 'prettier.cmd');

    expect(detectProjectFormatter(projectDirectory, 'win32')?.command).toBe(
      `"${shimPath}" --write "{{file}}" --log-level silent`
    );
  });
});

describe('detectFormatCommand', () => {
  it('returns the configured command over the detected one', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, { oxfmt: '0.80.0' });
    writeBinary(projectDirectory, 'oxfmt');

    expect(
      detectFormatCommand(
        createConfiguration(projectDirectory, 'custom "{{file}}"')
      )
    ).toBe('custom "{{file}}"');
  });

  it('returns undefined when the project has no formatter', () => {
    const projectDirectory = createProjectDirectory();
    writePackageJson(projectDirectory, {});

    expect(
      detectFormatCommand(createConfiguration(projectDirectory))
    ).toBeUndefined();
  });
});

describe('runFormatCommand', () => {
  it('runs the command on the file', () => {
    const projectDirectory = createProjectDirectory();
    const filePath = join(projectDirectory, 'file.content.json');
    const formatterPath = join(projectDirectory, 'formatter.mjs');
    const warn = vi.fn();
    writeFileSync(filePath, '');
    // A script file, not `node -e`: Bun's `node` shim (`bun --bun`) drops the
    // arguments following an `-e` script
    writeFileSync(
      formatterPath,
      "import { writeFileSync } from 'node:fs';\nwriteFileSync(process.argv.at(-1), 'formatted');\n"
    );

    runFormatCommand(
      filePath,
      createConfiguration(
        projectDirectory,
        `node "${formatterPath}" "{{file}}"`,
        warn
      )
    );

    expect(warn).not.toHaveBeenCalled();
    expect(readFileSync(filePath, 'utf-8')).toBe('formatted');
  });

  it('warns once then skips a command whose binary is missing', () => {
    const projectDirectory = createProjectDirectory();
    const warn = vi.fn();
    const configuration = createConfiguration(
      projectDirectory,
      'intlayer-missing-formatter "{{file}}"',
      warn
    );

    expect(() =>
      runFormatCommand(join(projectDirectory, 'a.json'), configuration)
    ).not.toThrow();
    runFormatCommand(join(projectDirectory, 'b.json'), configuration);

    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0])).toContain('Format command not found');
  });

  it('warns without throwing when the formatter fails', () => {
    const projectDirectory = createProjectDirectory();
    const warn = vi.fn();

    runFormatCommand(
      join(projectDirectory, 'file.json'),
      createConfiguration(
        projectDirectory,
        'node -e "console.error(\'syntax error\'); process.exit(2)" "{{file}}"',
        warn
      )
    );

    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0])).toContain('syntax error');
  });
});
