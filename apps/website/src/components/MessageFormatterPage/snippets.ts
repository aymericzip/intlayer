import type { FormatterDialect, QuickSnippet } from './types';

export const SNIPPETS_BY_DIALECT: Record<FormatterDialect, QuickSnippet[]> = {
  icu: [
    {
      id: 'var',
      label: 'Variable',
      description: 'Insert dynamic variable placeholder',
      code: '{name}',
    },
    {
      id: 'plural',
      label: 'Plural Branch',
      description: 'Standard singular / plural clauses',
      code: '{count, plural, one {# item} other {# items}}',
    },
    {
      id: 'plural-zero',
      label: 'Plural with =0',
      description: 'Plural with zero empty match',
      code: '{count, plural, =0 {No items} one {# item} other {# items}}',
    },
    {
      id: 'plural-offset',
      label: 'Plural with Offset',
      description: '"You and X others" pattern',
      code: '{count, plural, offset:1 =0 {No one} =1 {You} one {You and # other} other {You and # others}}',
    },
    {
      id: 'select',
      label: 'Select (Context/Gender)',
      description: 'Conditional text branching',
      code: '{gender, select, male {He} female {She} other {They}}',
    },
    {
      id: 'ordinal',
      label: 'Selectordinal',
      description: 'Ordinal indicators (1st, 2nd, 3rd)',
      code: '{rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}',
    },
    {
      id: 'number',
      label: 'Formatted Number',
      description: 'Locale-aware number formatting',
      code: '{amount, number}',
    },
    {
      id: 'percent',
      label: 'Percentage',
      description: 'Percentage formatting',
      code: '{rate, number, percent}',
    },
    {
      id: 'currency',
      label: 'Currency',
      description: 'Currency format',
      code: '{price, number, currency}',
    },
    {
      id: 'date',
      label: 'Date',
      description: 'Localized date',
      code: '{timestamp, date, medium}',
    },
    {
      id: 'time',
      label: 'Time',
      description: 'Localized time',
      code: '{timestamp, time, short}',
    },
  ],
  i18next: [
    {
      id: 'var',
      label: 'Variable',
      description: 'Double curly brace variable',
      code: '{{name}}',
    },
    {
      id: 'unescaped',
      label: 'Unescaped HTML',
      description: 'Bypass HTML escaping',
      code: '{{- rawHtml}}',
    },
    {
      id: 'plural-keys',
      label: 'Plural Keys Block',
      description: 'JSON keys for pluralization',
      code: `"item_one": "{{count}} item",\n"item_other": "{{count}} items"`,
    },
    {
      id: 'nesting',
      label: 'Nesting $t()',
      description: 'Reference other translation keys',
      code: '$t(common.key)',
    },
    {
      id: 'formatter-num',
      label: 'Number Formatter',
      description: 'Built-in number formatting',
      code: '{{val, number}}',
    },
    {
      id: 'formatter-date',
      label: 'DateTime Formatter',
      description: 'Built-in datetime formatting',
      code: '{{val, datetime}}',
    },
    {
      id: 'context-keys',
      label: 'Context Keys Block',
      description: 'Gender/context variants',
      code: `"friend_male": "Boyfriend",\n"friend_female": "Girlfriend",\n"friend": "Friend"`,
    },
  ],
  'vue-i18n': [
    {
      id: 'var',
      label: 'Named Variable',
      description: 'Named single brace parameter',
      code: '{name}',
    },
    {
      id: 'index-var',
      label: 'Index Variable',
      description: 'Positional argument {0}',
      code: '{0}',
    },
    {
      id: 'pipe-plural',
      label: 'Pipe Plural (3 choices)',
      description: 'no items | 1 item | {n} items',
      code: 'no items | 1 item | {n} items',
    },
    {
      id: 'pipe-simple',
      label: 'Pipe Plural (2 choices)',
      description: '1 item | {n} items',
      code: '1 item | {n} items',
    },
    {
      id: 'linked',
      label: 'Linked Message',
      description: '@:message.key reference',
      code: '@:common.title',
    },
    {
      id: 'modifier-upper',
      label: 'Uppercase Modifier',
      description: '@.upper:key transform',
      code: '@.upper:common.button',
    },
    {
      id: 'escape-brackets',
      label: 'Escape Brackets',
      description: "Literal curly braces {'{}'}",
      code: "{'{'}",
    },
  ],
  po: [
    {
      id: 'string-token',
      label: '%s (String)',
      description: 'Printf string placeholder',
      code: '%s',
    },
    {
      id: 'number-token',
      label: '%d (Integer)',
      description: 'Printf integer placeholder',
      code: '%d',
    },
    {
      id: 'python-token',
      label: '%(name)s (Named)',
      description: 'Python gettext named variable',
      code: '%(name)s',
    },
    {
      id: 'plural-block',
      label: 'Plural Block',
      description: 'msgid_plural and msgstr[0]/[1]',
      code: `#, c-format\nmsgid "%d item"\nmsgid_plural "%d items"\nmsgstr[0] "%d item"\nmsgstr[1] "%d items"`,
    },
    {
      id: 'context-block',
      label: 'Context (msgctxt)',
      description: 'Disambiguation context',
      code: `msgctxt "menu title"\nmsgid "File"\nmsgstr "Fichier"`,
    },
  ],
};
