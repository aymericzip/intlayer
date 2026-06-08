import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { IInterpreterPluginLit } from './plugins';

declare module '@intlayer/core/interpreter' {
  interface IInterpreterPlugin<T, S, L extends LocalesValues>
    extends IInterpreterPluginLit<T, S, L> {}
}

export * from './client';
export * from './editor/useEditor';
export * from './getDictionary';
export * from './getIntlayer';
export * from './plugins';
