import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { IInterpreterPluginSvelte } from './plugins';

declare module '@intlayer/core/interpreter' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginSvelte<T, S, L> {}
}

export * from './client';
export * from './getDictionary';
export * from './getIntlayer';
export * from './plugins';
