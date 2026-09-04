import type { MessageTemplate } from '../types';

export const VUE_I18N_TEMPLATES: MessageTemplate[] = [
  // ==================== BASIC ====================
  {
    id: 'vue-named-formatting',
    title: 'Named Formatting',
    description: 'Single curly brace variable interpolation ({name}).',
    category: 'basic',
    dialect: 'vue-i18n',
    tags: ['named', 'variables', 'basic'],
    template: 'Hello {name}, welcome to Vue i18n!',
    defaultVariables: { name: 'Lucas' },
    defaultLocale: 'en',
  },
  {
    id: 'vue-list-formatting',
    title: 'List / Index Formatting',
    description:
      'Positional numeric indices ({0}, {1}) matching array arguments.',
    category: 'basic',
    dialect: 'vue-i18n',
    tags: ['list', 'index', 'positional'],
    template: '{0} cannot be combined with {1}.',
    defaultVariables: { '0': 'Apple', '1': 'Orange' },
    defaultLocale: 'en',
  },
  {
    id: 'vue-literal-brackets',
    title: 'Literal Brackets Escape',
    description: "Output literal curly braces using the {'{}'} escape syntax.",
    category: 'basic',
    dialect: 'vue-i18n',
    tags: ['escape', 'brackets'],
    template: "Wrap your code block with {'{'} and {'}'} in template.",
    defaultVariables: {},
    defaultLocale: 'en',
  },

  // ==================== PLURALIZATION ====================
  {
    id: 'vue-pipe-simple-plural',
    title: 'Pipe Delimited Plural (3 Choices)',
    description:
      'Standard Vue i18n pluralization: 0 items | 1 item | {count} items.',
    category: 'pluralization',
    dialect: 'vue-i18n',
    tags: ['pipe', 'plural', 'count'],
    template: 'no apples | one apple | {count} apples',
    defaultVariables: { count: 5 },
    defaultLocale: 'en',
  },
  {
    id: 'vue-pipe-2-choices',
    title: 'Pipe Plural (2 Choices)',
    description: 'Simplified singular and plural: 1 banana | {n} bananas.',
    category: 'pluralization',
    dialect: 'vue-i18n',
    tags: ['pipe', 'singular-plural'],
    template: '1 banana | {n} bananas',
    defaultVariables: { n: 3 },
    defaultLocale: 'en',
  },
  {
    id: 'vue-pipe-notifications',
    title: 'Notifications Plural',
    description: 'Zero, singular, and plural messages count.',
    category: 'pluralization',
    dialect: 'vue-i18n',
    tags: ['notifications', 'plural'],
    template:
      'No unread notifications | 1 unread notification | {count} unread notifications',
    defaultVariables: { count: 8 },
    defaultLocale: 'en',
  },

  // ==================== LINKED MESSAGES ====================
  {
    id: 'vue-linked-messages',
    title: 'Linked Messages (@:key)',
    description: 'Reference other translation keys using @:path syntax.',
    category: 'nested',
    dialect: 'vue-i18n',
    tags: ['linked', 'reference', 'nesting'],
    template: JSON.stringify(
      {
        message: {
          dio: 'DIO',
          linked: '@:message.dio says: Kono DIO da!',
        },
      },
      null,
      2
    ),
    defaultVariables: {},
    defaultLocale: 'en',
  },
  {
    id: 'vue-linked-case-modifiers',
    title: 'Linked Message Modifiers (@.upper / @.lower)',
    description:
      'Transform casing of linked messages: @.upper:key, @.lower:key, @.capitalize:key.',
    category: 'nested',
    dialect: 'vue-i18n',
    tags: ['modifiers', 'uppercase', 'capitalize'],
    template: JSON.stringify(
      {
        home: 'home',
        navHome: '@.capitalize:home',
        loudHome: '@.upper:home',
      },
      null,
      2
    ),
    defaultVariables: {},
    defaultLocale: 'en',
  },

  // ==================== RICH TEXT & HTML ====================
  {
    id: 'vue-html-tags',
    title: 'HTML & Component Slots',
    description:
      'HTML elements inside translation strings for v-html or <i18n-t>.',
    category: 'rich-text',
    dialect: 'vue-i18n',
    tags: ['html', 'slots'],
    template:
      'Read our <a href="{link}">Terms of Service</a> or visit <b>{site}</b>.',
    defaultVariables: { link: '/terms', site: 'Intlayer' },
    defaultLocale: 'en',
  },

  // ==================== REAL WORLD ====================
  {
    id: 'vue-ecommerce-cart',
    title: 'Shopping Cart Vue Dictionary',
    description:
      'Cart dictionary combining pipe pluralization and named amount variables.',
    category: 'real-world',
    dialect: 'vue-i18n',
    tags: ['cart', 'ecommerce', 'checkout'],
    template: JSON.stringify(
      {
        cartTitle: 'Shopping Cart ({count})',
        cartEmpty: 'Your bag is empty',
        itemCount: 'no items | 1 item | {n} items',
        summary: 'Subtotal: {amount} for {n} items',
      },
      null,
      2
    ),
    defaultVariables: { count: 3, n: 3, amount: '$74.99' },
    defaultLocale: 'en',
  },
];
