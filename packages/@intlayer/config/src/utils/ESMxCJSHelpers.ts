import { createRequire } from 'module';

export const isESModule = typeof import.meta.url === 'string';

export const ESMxCJSRequire = isESModule
  ? createRequire(import.meta.url)
  : require;
