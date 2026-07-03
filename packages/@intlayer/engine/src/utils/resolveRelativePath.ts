import { dirname, isAbsolute, normalize, resolve } from 'node:path';

export const resolveRelativePath = (
  path: string,
  sourcePath: string,
  baseDir: string
) => {
  // Handle absolute paths
  if (isAbsolute(path)) {
    const normalizedResult = normalize(path);
    const normalizedBaseDir = normalize(baseDir);

    // Check if it's relative to baseDir (starts with /)
    // but not a system path (like /usr/local)
    if (
      path.startsWith('/') &&
      !normalizedResult.startsWith(normalizedBaseDir)
    ) {
      // Try to resolve it relative to baseDir first
      const relativeToBase = resolve(baseDir, path.substring(1));

      // If the path doesn't exist in common system directories, treat as relative to baseDir
      if (
        !path.startsWith('/usr/') &&
        !path.startsWith('/etc/') &&
        !path.startsWith('/var/') &&
        !path.startsWith('/home/') &&
        !path.startsWith('/Users/') &&
        !path.startsWith('/tmp/') &&
        !path.startsWith('/private/') &&
        !path.startsWith('/opt/')
      ) {
        return relativeToBase;
      }
    }

    // It's a true system absolute path
    return normalizedResult;
  }

  // Handle relative paths (starting with ./ or ../)
  if (path.startsWith('./') || path.startsWith('../')) {
    const fileDir = dirname(sourcePath);
    return resolve(fileDir, path);
  }

  // Default case: treat as relative to baseDir
  return resolve(baseDir, path);
};
