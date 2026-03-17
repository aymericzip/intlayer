import { sep } from 'node:path';

const normalizePattern = (pattern: RegExp | string): string => {
  // On Windows, path separators are backslashes; double-escape for use inside a RegExp source string
  const separators = sep === '\\' ? '\\\\' : '/';

  if (pattern instanceof RegExp) {
    return pattern.source.replace(/\//g, separators);
  }

  if (typeof pattern === 'string') {
    const escaped = pattern.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
    return escaped.replace(/\//g, separators);
  }

  throw new Error(`Unexpected exclusion pattern: ${pattern}`);
};

export const exclusionList = (
  additionalExclusions: (RegExp | string)[]
): RegExp[] => [
  new RegExp(`(${additionalExclusions.map(normalizePattern).join('|')})$`),
];
