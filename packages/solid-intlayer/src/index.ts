import { IInterpreterPluginSolid } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S> extends IInterpreterPluginSolid<T> {}
}

export * from './client';
export * from './getDictionary';
export * from './getIntlayer';
export * from './markdown';
export * from './plugins';
