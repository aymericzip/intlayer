import fs from 'node:fs';
import path from 'node:path';

/**
 * Detect the installed React version for ESLint configuration.
 *
 * `eslint-plugin-react` versions <= 7.37.5 rely on `context.getFilename()` to detect
 * the React version when `settings.react.version` is set to `"detect"`.
 * Because ESLint 10 removed `context.getFilename()`, every `react/*` rule throws on load
 * when `settings.react.version` is `"detect"`.
 *
 * Specifying an explicit detected React version in `settings.react.version`
 * bypasses the broken `detectReactVersion` codepath in `eslint-plugin-react`, allowing
 * Next.js and React projects using `eslint-config-next` / `eslint-plugin-react` to work
 * seamlessly under both ESLint 9 and ESLint 10 without needing manual configuration hacks.
 */
export const getReactVersion = (dir = process.cwd()): string => {
  try {
    let currentDir = dir;
    while (currentDir) {
      const reactPkgPath = path.join(
        currentDir,
        'node_modules',
        'react',
        'package.json'
      );
      if (fs.existsSync(reactPkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(reactPkgPath, 'utf8'));
        if (pkg.version) {
          return pkg.version;
        }
      }

      const pkgJsonPath = path.join(currentDir, 'package.json');
      if (fs.existsSync(pkgJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        const reactDep =
          pkg.dependencies?.react ||
          pkg.devDependencies?.react ||
          pkg.peerDependencies?.react;
        if (typeof reactDep === 'string') {
          const match = reactDep.match(/\d+(\.\d+)*/);
          if (match) {
            return match[0];
          }
        }
      }

      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) break;
      currentDir = parentDir;
    }
  } catch {}

  return '19.0';
};
