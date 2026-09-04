import type { MessageTemplate } from '../types';

export const INTLAYER_TEMPLATES: MessageTemplate[] = [
  // ==================== BASIC ====================
  {
    id: 'intlayer-simple-interpolation',
    title: 'Variable Interpolation',
    description: 'Double curly brace variable substitution ({{name}}).',
    category: 'basic',
    dialect: 'intlayer',
    tags: ['interpolation', 'variables', 'basic'],
    template: 'Hello {{name}}, welcome to Intlayer!',
    defaultVariables: { name: 'Alex' },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-multilingual-translation',
    title: 'Multilingual Translation t()',
    description: 'Locale-keyed translation node using the t() helper.',
    category: 'basic',
    dialect: 'intlayer',
    tags: ['translation', 't', 'locales'],
    template:
      't({\n  en: "Welcome to our application!",\n  fr: "Bienvenue sur notre application !",\n  es: "¡Bienvenido a nuestra aplicación!",\n  de: "Willkommen in unserer Anwendung!"\n})',
    defaultVariables: {},
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-multiple-variables',
    title: 'Multiple Interpolations',
    description: 'Message with multiple dynamic fields across sentences.',
    category: 'basic',
    dialect: 'intlayer',
    tags: ['variables', 'user', 'role'],
    template:
      '{{userName}} logged in from {{device}} at {{time}}. Workspace: {{workspace}}.',
    defaultVariables: {
      userName: 'Sophie',
      device: 'MacBook Pro',
      time: '10:42 AM',
      workspace: 'Production',
    },
    defaultLocale: 'en',
  },

  // ==================== PLURALIZATION ====================
  {
    id: 'intlayer-plural-helper',
    title: 'Cardinal Plural (plural)',
    description:
      'Standard pluralization with CLDR categories (one, other, =0).',
    category: 'pluralization',
    dialect: 'intlayer',
    tags: ['plural', 'count', 'cardinal'],
    template:
      'plural({\n  "=0": "No items in your cart",\n  one: "1 item in your cart",\n  other: "{{count}} items in your cart"\n})',
    defaultVariables: { count: 3 },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-enumeration-helper',
    title: 'Exact Match Enumeration (enu)',
    description:
      'Matches numeric values explicitly with fallback for remaining counts.',
    category: 'pluralization',
    dialect: 'intlayer',
    tags: ['enu', 'enumeration', 'exact'],
    template:
      'enu({\n  0: "No messages yet",\n  1: "You have 1 new message",\n  2: "You have two messages waiting",\n  fallback: "You have {{count}} new messages"\n})',
    defaultVariables: { count: 2 },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-plural-multilingual',
    title: 'Plural with Multilingual t()',
    description: 'Combine pluralization with locale-specific translations.',
    category: 'pluralization',
    dialect: 'intlayer',
    tags: ['plural', 'multilingual', 'locales'],
    template:
      'plural({\n  "=0": t({\n    en: "No files found",\n    fr: "Aucun fichier trouvé"\n  }),\n  one: t({\n    en: "1 file selected",\n    fr: "1 fichier sélectionné"\n  }),\n  other: t({\n    en: "{{count}} files selected",\n    fr: "{{count}} fichiers sélectionnés"\n  })\n})',
    defaultVariables: { count: 5 },
    defaultLocale: 'fr',
  },

  // ==================== SELECT ====================
  {
    id: 'intlayer-select-role',
    title: 'Role-Based Selection (select)',
    description: 'Branch string output based on a selector variable.',
    category: 'select',
    dialect: 'intlayer',
    tags: ['select', 'role', 'permissions'],
    template:
      'select({\n  admin: "Administrator Console - Full Access",\n  manager: "Manager Dashboard - Team Access",\n  member: "Member Workspace - Standard Access",\n  fallback: "Guest Portal - Read Only"\n}, "role")',
    defaultVariables: { role: 'admin' },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-gender-agreement',
    title: 'Gender Agreement (gender)',
    description: 'Choose appropriate grammatical form based on gender context.',
    category: 'select',
    dialect: 'intlayer',
    tags: ['gender', 'pronoun', 'agreement'],
    template:
      'gender({\n  male: "{{name}} posted a new update on his profile.",\n  female: "{{name}} posted a new update on her profile.",\n  fallback: "{{name}} posted a new update on their profile."\n})',
    defaultVariables: { name: 'Elena', gender: 'female' },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-condition-boolean',
    title: 'Boolean Condition (cond)',
    description: 'Simple binary condition node for true / false state toggles.',
    category: 'select',
    dialect: 'intlayer',
    tags: ['cond', 'boolean', 'status'],
    template:
      'cond({\n  true: "Subscription is active: Full features unlocked.",\n  false: "Subscription has expired. Please renew to continue."\n})',
    defaultVariables: { condition: 'true' },
    defaultLocale: 'en',
  },

  // ==================== ORDINAL ====================
  {
    id: 'intlayer-ordinal-enu',
    title: 'Ordinal Ranking (enu)',
    description: 'Formatted ordinal place indicators (1st, 2nd, 3rd, Nth).',
    category: 'ordinal',
    dialect: 'intlayer',
    tags: ['ordinal', 'ranking', 'enu'],
    template:
      'enu({\n  1: "You finished in 1st place! 🥇",\n  2: "You finished in 2nd place! 🥈",\n  3: "You finished in 3rd place! 🥉",\n  fallback: "You finished in {{rank}}th place."\n})',
    defaultVariables: { count: 1, rank: 1 },
    defaultLocale: 'en',
  },

  // ==================== RICH TEXT & MARKDOWN ====================
  {
    id: 'intlayer-markdown-helper',
    title: 'Markdown Content (md)',
    description: 'Render structured Markdown content with variables.',
    category: 'rich-text',
    dialect: 'intlayer',
    tags: ['md', 'markdown', 'formatting'],
    template:
      'md(`\n# Welcome, {{name}}!\n\nHere is your daily summary:\n- **Completed Tasks**: {{completedCount}}\n- **Pending Reviews**: {{pendingCount}}\n\nCheck [your dashboard]({{dashboardUrl}}) for details.\n`)',
    defaultVariables: {
      name: 'Jordan',
      completedCount: '12',
      pendingCount: '3',
      dashboardUrl: 'https://intlayer.org/demo',
    },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-html-helper',
    title: 'HTML Tag Embedding (html)',
    description:
      'Embedded safe HTML markup for links, highlights, and emphasis.',
    category: 'rich-text',
    dialect: 'intlayer',
    tags: ['html', 'markup', 'links'],
    template:
      'html(\'<p>By clicking Continue, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.</p>\')',
    defaultVariables: {},
    defaultLocale: 'en',
  },

  // ==================== NUMBERS & DATES ====================
  {
    id: 'intlayer-formatted-currency',
    title: 'Currency & Total Calculation',
    description: 'Formatted monetary amounts with quantity multiplier.',
    category: 'numbers',
    dialect: 'intlayer',
    tags: ['currency', 'price', 'numbers'],
    template:
      'Total: {{currency}}{{amount}} for {{quantity}} license (Tax included: {{currency}}{{tax}}).',
    defaultVariables: {
      currency: '$',
      amount: '99.00',
      quantity: '2',
      tax: '19.80',
    },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-formatted-date-time',
    title: 'Scheduled Event & Date Time',
    description: 'Event invitation with dynamic date, time, and timezone.',
    category: 'dates',
    dialect: 'intlayer',
    tags: ['dates', 'time', 'calendar'],
    template:
      'Your appointment with {{doctor}} is confirmed for {{date}} at {{time}} ({{timezone}}).',
    defaultVariables: {
      doctor: 'Dr. Watson',
      date: 'October 15, 2026',
      time: '14:30',
      timezone: 'UTC+2',
    },
    defaultLocale: 'en',
  },

  // ==================== E-COMMERCE & REAL-WORLD ====================
  {
    id: 'intlayer-ecommerce-cart',
    title: 'E-commerce Cart Summary',
    description:
      'Complete checkout summary combining count, discount, and total.',
    category: 'ecommerce',
    dialect: 'intlayer',
    tags: ['ecommerce', 'cart', 'checkout'],
    template:
      'plural({\n  "=0": "Your shopping bag is empty.",\n  one: "You have 1 item in your bag (Total: {{total}}).",\n  other: "You have {{count}} items in your bag (Total: {{total}} with {{discount}} discount)."\n})',
    defaultVariables: { count: 3, total: '$149.00', discount: '15%' },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-notification-alert',
    title: 'System Security Notification',
    description:
      'Security alert notification with user, location, and IP address.',
    category: 'notifications',
    dialect: 'intlayer',
    tags: ['notifications', 'security', 'alert'],
    template:
      'Security Alert: A new login was detected on your account ({{email}}) from {{location}} (IP: {{ip}}).',
    defaultVariables: {
      email: 'user@example.com',
      location: 'Paris, France',
      ip: '192.168.1.42',
    },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-form-validation',
    title: 'Form Field Validation Error',
    description:
      'Dynamic error message with field name and min/max constraints.',
    category: 'forms',
    dialect: 'intlayer',
    tags: ['forms', 'validation', 'error'],
    template:
      'The field "{{fieldName}}" must contain between {{min}} and {{max}} characters (currently {{current}}).',
    defaultVariables: {
      fieldName: 'Password',
      min: '8',
      max: '32',
      current: '5',
    },
    defaultLocale: 'en',
  },
  {
    id: 'intlayer-social-activity',
    title: 'Social Activity Feed',
    description: 'Activity stream message with user mentions and counts.',
    category: 'social',
    dialect: 'intlayer',
    tags: ['social', 'activity', 'likes'],
    template:
      'plural({\n  one: "{{actor}} liked your photo.",\n  other: "{{actor}} and {{count}} others liked your photo."\n})',
    defaultVariables: { actor: 'Maya', count: 14 },
    defaultLocale: 'en',
  },
];
