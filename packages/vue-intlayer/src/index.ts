import type { IInterpreterPluginVue } from './plugins';

declare module '@intlayer/core' {
  // biome-ignore lint/correctness/noUnusedVariables: <All declarations of 'IInterpreterPlugin' must have identical type parameters>
  interface IInterpreterPlugin<T, S, L> extends IInterpreterPluginVue<T> {}
}

export * from './client';
export * from './editor';
export * from './getDictionary';
export * from './getDictionary';
export * from './getIntlayer';
export * from './getIntlayer';
export * from './markdown';
export * from './plugins';
