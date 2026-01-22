import type { LocalesValues } from '@intlayer/types';
import type { IInterpreterPluginVue } from './plugins';

declare module '@intlayer/core' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginVue<T, S, L> {}
}

export * from './client';
export * from './editor';
export * from './format/useIntl';
export * from './getDictionary';
export * from './getDictionary';
export * from './getIntlayer';
export * from './getIntlayer';
export * from './html';
export * from './markdown';
export * from './plugins';
