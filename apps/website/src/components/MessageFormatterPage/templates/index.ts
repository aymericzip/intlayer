import type {
  CategoryMeta,
  FormatterDialect,
  MessageTemplate,
  TemplateCategory,
} from '../types';
import { I18NEXT_TEMPLATES } from './i18nextTemplates';
import { ICU_TEMPLATES } from './icuTemplates';
import { PO_TEMPLATES } from './poTemplates';
import { VUE_I18N_TEMPLATES } from './vueI18nTemplates';

export const TEMPLATES_BY_DIALECT: Record<FormatterDialect, MessageTemplate[]> =
  {
    icu: ICU_TEMPLATES,
    i18next: I18NEXT_TEMPLATES,
    'vue-i18n': VUE_I18N_TEMPLATES,
    po: PO_TEMPLATES,
  };

export const TEMPLATE_CATEGORIES: CategoryMeta[] = [
  { id: 'basic', label: 'Basic', iconName: 'Type' },
  { id: 'pluralization', label: 'Pluralization', iconName: 'Hash' },
  { id: 'select', label: 'Select / Context', iconName: 'GitBranch' },
  { id: 'ordinal', label: 'Ordinal', iconName: 'ListOrdered' },
  { id: 'nested', label: 'Nested', iconName: 'Layers' },
  { id: 'numbers', label: 'Numbers', iconName: 'Calculator' },
  { id: 'dates', label: 'Dates & Time', iconName: 'Calendar' },
  { id: 'rich-text', label: 'Rich Text', iconName: 'Bold' },
  { id: 'social', label: 'Social', iconName: 'Heart' },
  { id: 'ecommerce', label: 'E-commerce', iconName: 'ShoppingCart' },
  { id: 'forms', label: 'Forms', iconName: 'RectangleEllipsis' },
  { id: 'notifications', label: 'Notifications', iconName: 'Bell' },
  { id: 'time', label: 'Time & Duration', iconName: 'Clock' },
  { id: 'advanced', label: 'Advanced', iconName: 'Zap' },
  { id: 'real-world', label: 'Real World', iconName: 'Briefcase' },
];
