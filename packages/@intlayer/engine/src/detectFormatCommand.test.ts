import { describe, expect, it } from 'vitest';
import { buildFormatCommand, escapeShellFilePath } from './detectFormatCommand';

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
    const cmd = buildFormatCommand(
      'prettier --write "{{file}}" --log-level silent',
      '/Users/user/app/src/routes/{-$locale}/index.content.ts',
      'darwin'
    );

    expect(cmd).toBe(
      'prettier --write "/Users/user/app/src/routes/{-\\$locale}/index.content.ts" --log-level silent'
    );
  });

  it('does not treat $& or $` in file paths as String.replace special patterns', () => {
    const cmd = buildFormatCommand(
      'prettier --write "{{file}}"',
      'C:\\app\\routes\\$&\\file.ts',
      'win32'
    );

    expect(cmd).toBe('prettier --write "C:\\app\\routes\\$&\\file.ts"');
  });
});
