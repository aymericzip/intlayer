import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname as pathDirname, resolve as pathResolve } from 'node:path';

type StartEditorOptions = {
  env?: string;
  envFile?: string;
};

export const startEditor = (options: StartEditorOptions): void => {
  const args: string[] = ['start'];

  if (options.env) args.push('--env', options.env);
  if (options.envFile) args.push('--env-file', options.envFile);

  const spawnNodeProcess = (binPath: string) =>
    spawn(process.execPath, [binPath, ...args], {
      stdio: 'inherit',
      env: { ...process.env },
    });

  const spawnWith = (cmd: string, cmdArgs: string[]) =>
    spawn(cmd, cmdArgs, {
      stdio: 'inherit',
      env: { ...process.env },
    });

  try {
    const require = createRequire(import.meta.url);
    const pkgJsonPath = require.resolve('intlayer-editor/package.json');
    const pkgDir = pathDirname(pkgJsonPath);
    const binPath = pathResolve(pkgDir, 'bin', 'intlayer-editor.mjs');

    const child = spawnNodeProcess(binPath);
    child.on('error', () => runFallback());
    child.on('exit', (code) => {
      if (code === 255) process.exit(code ?? 0);
    });
  } catch {
    runFallback();
  }

  function runFallback() {
    const pnpm = spawnWith('pnpm', ['dlx', 'intlayer-editor', ...args]);
    pnpm.on('error', () => {
      const npx = spawnWith('npx', ['-y', 'intlayer-editor', ...args]);
      npx.on('error', (err) => {
        console.error('Unable to execute intlayer-editor via pnpm or npx.');
        console.error(String(err?.message ?? err));
        process.exit(1);
      });
    });
  }
};
