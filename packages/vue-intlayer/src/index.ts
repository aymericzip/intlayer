import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { IInterpreterPluginVue } from './plugins';

declare module '@intlayer/core/interpreter' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginVue<T, S, L> {}
}

export * from './client';
export * from './editor/useEditor';
export * from './format/useIntl';
export * from './getDictionary';
export * from './getDictionary';
export * from './getIntlayer';
export * from './getIntlayer';
export * from './html';
export * from './markdown';
export * from './plugins';
