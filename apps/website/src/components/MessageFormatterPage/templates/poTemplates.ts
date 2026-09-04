import type { MessageTemplate } from '../types';

export const PO_TEMPLATES: MessageTemplate[] = [
  // ==================== BASIC ====================
  {
    id: 'po-simple-msgid',
    title: 'Basic msgid / msgstr',
    description:
      'Simple GNU Gettext Portable Object key-value translation entry.',
    category: 'basic',
    dialect: 'po',
    tags: ['msgid', 'msgstr', 'basic'],
    template: `# Simple greeting
msgid "Hello, world!"
msgstr "Bonjour, le monde !"`,
    defaultVariables: {},
    defaultLocale: 'fr',
  },
  {
    id: 'po-printf-string',
    title: 'Printf Interpolation (%s, %d)',
    description: 'Traditional C-style string and numeric placeholders.',
    category: 'basic',
    dialect: 'po',
    tags: ['printf', 'placeholders', 'variables'],
    template: `#, c-format
msgid "User %s uploaded %d files."
msgstr "L'utilisateur %s a téléversé %d fichiers."`,
    defaultVariables: { '0': 'Sophie', '1': 5 },
    defaultLocale: 'fr',
  },
  {
    id: 'po-python-format',
    title: 'Python Named Format (%(var)s)',
    description:
      'Named parameter placeholders used in Python gettext workflows.',
    category: 'basic',
    dialect: 'po',
    tags: ['python', 'named', 'variables'],
    template: `#, python-format
msgid "Welcome back, %(username)s! You have %(unread)d unread emails."
msgstr "Bienvenue, %(username)s ! Vous avez %(unread)d e-mails non lus."`,
    defaultVariables: { username: 'Aymeric', unread: 4 },
    defaultLocale: 'fr',
  },

  // ==================== PLURALIZATION ====================
  {
    id: 'po-english-plural',
    title: 'Plural (English 2 Forms)',
    description:
      'Standard msgid_plural with msgstr[0] (singular) and msgstr[1] (plural).',
    category: 'pluralization',
    dialect: 'po',
    tags: ['plural', 'gettext', 'count'],
    template: `#, c-format
msgid "You have %d apple"
msgid_plural "You have %d apples"
msgstr[0] "You have %d apple"
msgstr[1] "You have %d apples"`,
    defaultVariables: { '0': 3 },
    defaultLocale: 'en',
  },
  {
    id: 'po-french-plural',
    title: 'Plural (French 2 Forms)',
    description: 'French plural rules where 0 and 1 take singular form.',
    category: 'pluralization',
    dialect: 'po',
    tags: ['french', 'plural'],
    template: `#, c-format
msgid "%d item"
msgid_plural "%d items"
msgstr[0] "%d élément"
msgstr[1] "%d éléments"`,
    defaultVariables: { '0': 0 },
    defaultLocale: 'fr',
  },
  {
    id: 'po-russian-plural',
    title: 'Plural (Russian 3 Forms)',
    description: 'Slavic 3-branch plural rules (one, few, many).',
    category: 'pluralization',
    dialect: 'po',
    tags: ['russian', 'slavic', 'plural'],
    template: `#, c-format
msgid "%d file"
msgid_plural "%d files"
msgstr[0] "%d файл"
msgstr[1] "%d файла"
msgstr[2] "%d файлов"`,
    defaultVariables: { '0': 5 },
    defaultLocale: 'ru',
  },
  {
    id: 'po-arabic-plural',
    title: 'Plural (Arabic 6 Forms)',
    description: 'Arabic 6-branch plural (zero, one, two, few, many, other).',
    category: 'pluralization',
    dialect: 'po',
    tags: ['arabic', 'plural', '6-forms'],
    template: `#, c-format
msgid "%d message"
msgid_plural "%d messages"
msgstr[0] "لا رسائل"
msgstr[1] "رسالة واحدة"
msgstr[2] "رسالتان"
msgstr[3] "%d رسائل"
msgstr[4] "%d رسالة"
msgstr[5] "%d رسالة"`,
    defaultVariables: { '0': 2 },
    defaultLocale: 'ar',
  },

  // ==================== CONTEXT ====================
  {
    id: 'po-context-msgctxt',
    title: 'Disambiguation with msgctxt',
    description:
      'Disambiguate identical strings with distinct meanings (e.g. Post = Publish vs Article).',
    category: 'select',
    dialect: 'po',
    tags: ['context', 'msgctxt'],
    template: `msgctxt "social post button"
msgid "Post"
msgstr "Publier"

msgctxt "blog article noun"
msgid "Post"
msgstr "Article"`,
    defaultVariables: {},
    defaultLocale: 'fr',
  },

  // ==================== HEADERS ====================
  {
    id: 'po-full-header',
    title: 'Complete PO File Header',
    description:
      'Standard GNU Gettext file headers including Plural-Forms definition.',
    category: 'advanced',
    dialect: 'po',
    tags: ['header', 'metadata', 'plural-forms'],
    template: `msgid ""
msgstr ""
"Project-Id-Version: Intlayer 1.0\\n"
"Report-Msgid-Bugs-To: contact@intlayer.org\\n"
"POT-Creation-Date: 2026-09-04 12:00+0000\\n"
"PO-Revision-Date: 2026-09-04 12:30+0000\\n"
"Language: fr\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"Plural-Forms: nplurals=2; plural=(n > 1);\\n"`,
    defaultVariables: {},
    defaultLocale: 'fr',
  },
];
