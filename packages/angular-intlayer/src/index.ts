import type { IInterpreterPluginAngular } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginAngular<T> {}
}

export * from './client';
export * from './getDictionary';
export * from './getIntlayer';
export * from './markdown';
export * from './plugins';
