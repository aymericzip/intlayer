import path from 'node:path';

const escapeRegExp = (pattern: RegExp | string) => {
  if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
    return (pattern as RegExp).source.replace(/\/|\\\//g, '\\' + path.sep);
  } else if (typeof pattern === 'string') {
    var escaped = pattern.replace(/[-[\]{}()*+?.\\^$|]/g, '\\$&');
    return escaped.replaceAll('/', '\\' + path.sep);
  } else {
    throw new Error('Unexpected exclusion pattern: ' + pattern);
  }
};

export const exclusionList = (additionalExclusions?: (RegExp | string)[]) =>
  new RegExp(
    '(' + (additionalExclusions || []).map(escapeRegExp).join('|') + ')$'
  );
