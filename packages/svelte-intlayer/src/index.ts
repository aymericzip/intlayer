import type { IInterpreterPluginSvelte } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginSvelte<T> {}
}

export * from './client';
export * from './getDictionary';
export * from './getIntlayer';
export * from './markdown';
export * from './plugins';
