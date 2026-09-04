import type { MessageTemplate } from '../types';

export const I18NEXT_TEMPLATES: MessageTemplate[] = [
  // ==================== BASIC ====================
  {
    id: 'i18next-simple-interpolation',
    title: 'Simple Interpolation',
    description: 'Basic variable substitution using double curly braces.',
    category: 'basic',
    dialect: 'i18next',
    tags: ['greeting', 'interpolation', 'basic'],
    template: 'Hello {{name}}, welcome to our platform!',
    defaultVariables: { name: 'Sarah' },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-nested-path',
    title: 'Object Path Property',
    description: 'Access nested properties within variable objects.',
    category: 'basic',
    dialect: 'i18next',
    tags: ['nested', 'object', 'dot-path'],
    template: 'Signed in as {{user.profile.displayName}} ({{user.email}}).',
    defaultVariables: {
      'user.profile.displayName': 'Alex Rivera',
      'user.email': 'alex@example.com',
    },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-multiple-variables',
    title: 'Multiple Variables',
    description: 'Multiple variables embedded in a single sentence.',
    category: 'basic',
    dialect: 'i18next',
    tags: ['multiple', 'variables'],
    template: 'Project {{projectName}} was updated by {{author}} on {{date}}.',
    defaultVariables: {
      projectName: 'Intlayer v9',
      author: 'Aymeric',
      date: 'September 4, 2026',
    },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-unescaped',
    title: 'Unescaped HTML / Raw Value',
    description: 'Prevent automatic HTML escaping using {{- variable}} syntax.',
    category: 'basic',
    dialect: 'i18next',
    tags: ['unescape', 'html', 'raw'],
    template: 'Visit {{- companyUrl}} for more details.',
    defaultVariables: {
      companyUrl: 'https://intlayer.org',
    },
    defaultLocale: 'en',
  },

  // ==================== PLURALIZATION ====================
  {
    id: 'i18next-plural-suffixes',
    title: 'Plural Form Keys (v4/v5)',
    description:
      'Standard i18next plural keys: _one and _other JSON dictionary.',
    category: 'pluralization',
    dialect: 'i18next',
    tags: ['plural', 'suffixes', 'count'],
    template: JSON.stringify(
      {
        item_one: '{{count}} item in your basket',
        item_other: '{{count}} items in your basket',
      },
      null,
      2
    ),
    defaultVariables: { count: 3 },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-plural-with-zero',
    title: 'Plural with Zero Form',
    description: 'Explicit empty case using _zero suffix.',
    category: 'pluralization',
    dialect: 'i18next',
    tags: ['plural', 'zero', 'count'],
    template: JSON.stringify(
      {
        message_zero: 'No new notifications',
        message_one: 'You have {{count}} notification',
        message_other: 'You have {{count}} notifications',
      },
      null,
      2
    ),
    defaultVariables: { count: 0 },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-icu-plugin-plural',
    title: 'i18next with ICU Plugin',
    description:
      'ICU plural syntax embedded inside i18next when using i18next-icu plugin.',
    category: 'pluralization',
    dialect: 'i18next',
    tags: ['icu-plugin', 'plural'],
    template:
      '{count, plural, =0 {No followers yet} one {# follower} other {# followers}}',
    defaultVariables: { count: 42 },
    defaultLocale: 'en',
  },

  // ==================== CONTEXT / SELECT ====================
  {
    id: 'i18next-context-gender',
    title: 'Contextual Variants (Gender)',
    description: 'Context suffix keys for gender or situational variations.',
    category: 'select',
    dialect: 'i18next',
    tags: ['context', 'gender'],
    template: JSON.stringify(
      {
        friend_male: 'A message from his profile',
        friend_female: 'A message from her profile',
        friend: 'A message from their profile',
      },
      null,
      2
    ),
    defaultVariables: { context: 'female' },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-context-plural-combination',
    title: 'Combined Context + Plural',
    description:
      'Keys combining both context and count (e.g. friend_male_other).',
    category: 'select',
    dialect: 'i18next',
    tags: ['context', 'plural', 'advanced'],
    template: JSON.stringify(
      {
        friend_male_one: '{{count}} male friend',
        friend_male_other: '{{count}} male friends',
        friend_female_one: '{{count}} female friend',
        friend_female_other: '{{count}} female friends',
      },
      null,
      2
    ),
    defaultVariables: { context: 'female', count: 4 },
    defaultLocale: 'en',
  },

  // ==================== NESTING ====================
  {
    id: 'i18next-nesting-references',
    title: 'Nested Key References ($t)',
    description: 'Reuse common terms inside larger messages using $t(key).',
    category: 'nested',
    dialect: 'i18next',
    tags: ['nesting', 'reuse'],
    template: JSON.stringify(
      {
        appName: 'Intlayer',
        welcome: 'Welcome to $t(appName)! Start internationalizing your code.',
      },
      null,
      2
    ),
    defaultVariables: {},
    defaultLocale: 'en',
  },
  {
    id: 'i18next-nesting-with-params',
    title: 'Nesting with Variable Forwarding',
    description: 'Pass variables down into nested key references.',
    category: 'nested',
    dialect: 'i18next',
    tags: ['nesting', 'forwarding'],
    template: JSON.stringify(
      {
        badge: 'Tier: {{tier}}',
        statusCard: 'Account Status: $t(badge, {"tier": "{{tier}}"})',
      },
      null,
      2
    ),
    defaultVariables: { tier: 'Pro' },
    defaultLocale: 'en',
  },

  // ==================== FORMATTING ====================
  {
    id: 'i18next-formatting-functions',
    title: 'Built-in Formatter Functions',
    description:
      'Format dates, currencies, and numbers using pipe/formatter syntax.',
    category: 'numbers',
    dialect: 'i18next',
    tags: ['formatter', 'currency', 'number'],
    template:
      'Total balance: {{val, currency(USD)}} (Fee: {{fee, number(minimumFractionDigits: 2)}})',
    defaultVariables: { val: 249.5, fee: 3.5 },
    defaultLocale: 'en',
  },
  {
    id: 'i18next-datetime-formatter',
    title: 'DateTime Formatting',
    description: 'Format timestamps with standard date formatters.',
    category: 'dates',
    dialect: 'i18next',
    tags: ['date', 'datetime', 'formatter'],
    template:
      'Event start: {{val, datetime(year: "numeric", month: "long", day: "numeric")}}',
    defaultVariables: { val: '2026-10-15T18:00:00Z' },
    defaultLocale: 'en',
  },

  // ==================== REAL WORLD ====================
  {
    id: 'i18next-ecommerce-dictionary',
    title: 'Full E-commerce JSON Dictionary',
    description:
      'Complete e-commerce bundle with plural counts and nested button keys.',
    category: 'real-world',
    dialect: 'i18next',
    tags: ['ecommerce', 'cart', 'checkout'],
    template: JSON.stringify(
      {
        cart_empty: 'Your shopping bag is empty',
        cart_count_one: 'You have {{count}} item totaling {{total}}',
        cart_count_other: 'You have {{count}} items totaling {{total}}',
        checkout_button:
          'Proceed to Payment ($t(cart_count, {"count": {{count}}}))',
      },
      null,
      2
    ),
    defaultVariables: { count: 2, total: '$49.90' },
    defaultLocale: 'en',
  },
];
