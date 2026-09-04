import type { LocalesValues } from '@intlayer/types/module_augmentation';

/** Supported message format dialects. */
export type MessageDialect = 'icu' | 'i18next' | 'vue-i18n' | 'po' | 'intlayer';

/** Dialect display configuration. */
export type DialectInfo = {
  id: MessageDialect;
  name: string;
  badge: string;
  description: string;
  placeholder: string;
  syntaxGuide: string;
};

/** Output presentation modes when target is Intlayer. */
export type OutputViewMode = 'content_ts' | 'content_json' | 'clean';

/** Preset category grouping. */
export type PresetCategory =
  | 'interpolation'
  | 'plural'
  | 'select'
  | 'formatting'
  | 'html'
  | 'complex';

/** Preset example definition. */
export type PresetExample = {
  id: string;
  title: string;
  category: PresetCategory;
  sourceDialect: MessageDialect;
  description: string;
  input: string;
  defaultVariables: Record<string, unknown>;
  defaultLocale?: LocalesValues;
};

/** Result of a conversion operation. */
export type ConversionResult = {
  success: boolean;
  output: string;
  cleanString?: string;
  contentDeclaration?: string;
  contentJsonDeclaration?: string;
  intermediateAst?: unknown;
  error?: string;
};

/** Test variable representation for interactive resolution. */
export type VariableEntry = {
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean';
};
