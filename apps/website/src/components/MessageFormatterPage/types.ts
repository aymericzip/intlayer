import type { LocalesValues } from '@intlayer/types/module_augmentation';

/** Supported message format dialects for dedicated formatters */
export type FormatterDialect = 'icu' | 'i18next' | 'vue-i18n' | 'po';

/** All supported template categories */
export type TemplateCategory =
  | 'basic'
  | 'pluralization'
  | 'select'
  | 'ordinal'
  | 'nested'
  | 'numbers'
  | 'dates'
  | 'lists'
  | 'rich-text'
  | 'social'
  | 'ecommerce'
  | 'forms'
  | 'notifications'
  | 'time'
  | 'advanced'
  | 'real-world';

export type CategoryMeta = {
  id: TemplateCategory;
  label: string;
  iconName: string;
};

/** Definition of a curated template */
export type MessageTemplate = {
  id: string;
  title: string;
  description: string;
  category: TemplateCategory;
  dialect: FormatterDialect;
  tags: string[];
  template: string;
  defaultVariables: Record<string, unknown>;
  defaultLocale?: LocalesValues;
};

/** Real-time validation result */
export type SyntaxValidationResult = {
  isValid: boolean;
  errorMessage?: string;
  warningMessage?: string;
};

/** Quick insert snippet definition */
export type QuickSnippet = {
  id: string;
  label: string;
  description?: string;
  code: string;
  cursorOffset?: number;
};

/** Test variable field representation */
export type ExtractedVariable = {
  name: string;
  inferredType: 'string' | 'number' | 'boolean' | 'select';
  options?: string[];
  defaultValue: string;
};
