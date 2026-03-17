import path from 'node:path';

const escapeRegExp = (pattern: RegExp | string): string => {
  // Pre-compute separator to avoid template literal issues on Windows
  const sep = path.sep === '\\' ? '\\\\' : '/';

  if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
    return (pattern as RegExp).source.replace(/\//g, sep);
  } else if (typeof pattern === 'string') {
    var escaped = pattern.replace(/[\-\[\]{}()*+?.\\^$|]/g, '\\$&');
    return escaped.replace(/\//g, sep);
  } else {
    throw new Error(`Unexpected exclusion pattern: ${pattern}`);
  }
};

export const exclusionList = (additionalExclusions?: (RegExp | string)[]) =>
  new RegExp(`(${(additionalExclusions || []).map(escapeRegExp).join('|')})$`);
