import type {
  ConditionCond,
  EnumerationCond,
  MarkdownCond,
  NestedCond,
  TranslationCond,
} from './interpreter/getContent';

export * from './transpiler/index';
export * from './transpiler/index';
export * from './interpreter/index';
export * from './dictionaryManipulator/index';
export * from './types/index';
export * from './utils/isSameKeyPath';
export * from './utils/checkIsURLAbsolute';
export * from './utils/isValidReactElement';
export * from './localization/index';

declare module './interpreter/getContent/deepTransform' {
  interface IPluginCond<T> {
    translation: TranslationCond<T>;
    enumeration: EnumerationCond<T>;
    condition: ConditionCond<T>;
    markdown: MarkdownCond<T>;
    nested: NestedCond<T>;
  }
}
