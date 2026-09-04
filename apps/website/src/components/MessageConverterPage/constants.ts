import type { DialectInfo, MessageDialect, PresetExample } from './types';

/** Detailed metadata and syntax guides for each format dialect. */
export const DIALECTS: Record<MessageDialect, DialectInfo> = {
  icu: {
    id: 'icu',
    name: 'ICU MessageFormat',
    badge: 'formatjs / next-intl',
    description:
      'Standard ICU syntax with single-bracket variables, plurals, select, and formatted arguments.',
    placeholder: '{count, plural, =0 {No items} one {# item} other {# items}}',
    syntaxGuide:
      'Variables: {name}\nPlural: {count, plural, one {# item} other {# items}}\nSelect: {gender, select, male {He} female {She} other {They}}\nFormat: {val, number, percent}',
  },
  i18next: {
    id: 'i18next',
    name: 'i18next',
    badge: 'react-i18next',
    description:
      'Double-bracket interpolation, ICU plugin support, and nested dictionary structures.',
    placeholder: 'Hello {{name}}! You have {{count}} notification.',
    syntaxGuide:
      'Variables: {{name}}\nICU Plural: {count, plural, one {# item} other {# items}}\nNesting: $t(otherKey)',
  },
  'vue-i18n': {
    id: 'vue-i18n',
    name: 'Vue I18n',
    badge: 'vue-i18n / nuxt',
    description:
      'Single-bracket variables and pipe-delimited choice pluralization (0 | 1 | other).',
    placeholder: 'no apples | one apple | {count} apples',
    syntaxGuide:
      'Variables: {name}\nPlural: 0 items | 1 item | {count} items\nLinked: @:otherKey',
  },
  po: {
    id: 'po',
    name: 'Gettext PO',
    badge: 'GNU gettext',
    description:
      'Traditional Portable Object format with msgid, msgid_plural, msgstr, and %(var)s interpolation.',
    placeholder:
      '{\n  "msgid": "apple",\n  "msgid_plural": "apples",\n  "msgstr": ["apple", "apples"]\n}',
    syntaxGuide:
      'Variables: %(name)s or %(count)d\nPlural: msgid "one", msgid_plural "many", msgstr[0] / msgstr[1]',
  },
  intlayer: {
    id: 'intlayer',
    name: 'Intlayer',
    badge: 'Compiler-driven i18n',
    description:
      'Type-safe Intlayer format with {{var}} interpolation, enu(), plural(), select(), gender(), and .content.ts declarations.',
    placeholder: 'Hello {{name}}',
    syntaxGuide:
      'Variables: {{name}}\nEnumeration: enu({ 0: "None", 1: "One", fallback: "{{count}} items" })\nPlural: plural({ one: "One item", other: "{{count}} items" })\nSelect: select({ admin: "Admin", fallback: "User" }, "role")',
  },
};

/** List of available dialects for UI pickers. */
export const DIALECT_OPTIONS: MessageDialect[] = [
  'icu',
  'i18next',
  'vue-i18n',
  'po',
  'intlayer',
];

/** Curated preset examples for quick testing. */
export const PRESET_EXAMPLES: PresetExample[] = [
  {
    id: 'icu-plural',
    title: 'ICU Plural with Exact Match',
    category: 'plural',
    sourceDialect: 'icu',
    description: 'ICU plural statement with =0 exact match and # replacement',
    input:
      '{count, plural, =0 {No items yet} one {# item in cart} other {# items in cart}}',
    defaultVariables: { count: 1 },
    defaultLocale: 'en',
  },
  {
    id: 'icu-select',
    title: 'ICU Select (Gender / Role)',
    category: 'select',
    sourceDialect: 'icu',
    description: 'ICU select discriminant for conditional branching',
    input:
      '{gender, select, male {He liked your post} female {She liked your post} other {They liked your post}}',
    defaultVariables: { gender: 'female' },
    defaultLocale: 'en',
  },
  {
    id: 'icu-ordinal',
    title: 'ICU Selectordinal (Rankings)',
    category: 'plural',
    sourceDialect: 'icu',
    description: 'Ordinal indicators based on numeric category',
    input:
      'You finished {rank, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place!',
    defaultVariables: { rank: 2 },
    defaultLocale: 'en',
  },
  {
    id: 'vue-pipe-plural',
    title: 'Vue I18n Pipe Plural',
    category: 'plural',
    sourceDialect: 'vue-i18n',
    description: 'Positional 3-choice plural in Vue I18n',
    input: 'No apples | One apple | {count} apples',
    defaultVariables: { count: 4 },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-interpolation',
    title: 'i18next Simple Interpolation',
    category: 'interpolation',
    sourceDialect: 'i18next',
    description: 'Standard double-bracket parameter replacement',
    input: 'Welcome back, {{user.name}}! You have {{count}} unread messages.',
    defaultVariables: { 'user.name': 'Sarah', count: 3 },
    defaultLocale: 'en',
  },
  {
    id: 'icu-format-number',
    title: 'ICU Number & Percentage Format',
    category: 'formatting',
    sourceDialect: 'icu',
    description: 'ICU formatted arguments with styles',
    input: 'Total amount: {amount, number, percent} (Fee: {fee, number})',
    defaultVariables: { amount: 0.15, fee: 1250 },
    defaultLocale: 'en',
  },
  {
    id: 'html-rich-text',
    title: 'HTML / Rich Text Formatting',
    category: 'html',
    sourceDialect: 'icu',
    description: 'Embedded HTML tags with interpolated parameters',
    input:
      'Read our <a href="/terms">Terms of Service</a> or visit <strong>{siteName}</strong>.',
    defaultVariables: { siteName: 'Intlayer' },
    defaultLocale: 'en',
  },
  {
    id: 'full-dictionary',
    title: 'Full JSON Dictionary',
    category: 'complex',
    sourceDialect: 'icu',
    description: 'Multi-key JSON dictionary converted all at once',
    input: JSON.stringify(
      {
        greeting: 'Hello {name}!',
        cartSummary:
          '{count, plural, =0 {Your cart is empty} one {# item ready for checkout} other {# items ready for checkout}}',
        discount: 'Save {discount, number, percent} today!',
        cta: 'Click <button>here</button> to proceed',
      },
      null,
      2
    ),
    defaultVariables: { name: 'Alex', count: 2, discount: 0.2 },
    defaultLocale: 'en',
  },
];
