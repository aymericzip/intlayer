---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з i18n-js на Intlayer"
description: "Дізнайтеся, як перенести вашу програму з i18n-js на Intlayer за допомогою адаптера сумісності."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Міграція з i18n-js на Intlayer

Перехід з бібліотеки `i18n-js` на Intlayer — це високооптимізована міграція, розроблена для переведення великих конфігурацій перекладів у структуровану систему розділення файлів Intlayer.

## Що робити

Виконайте наступну команду налаштування у вашому репозиторії:

```bash
npx intlayer init
```

З підготовленим `intlayer.config.ts`, ви можете додати alias Intlayer до конфігурації вашого bundler, щоб будь-які імпорти `i18n-js` спрямовувалися на пакет сумісності `@intlayer/i18n-js`.

## Що він робить під капотом

`i18n-js` accesses namespaces through expressions like `i18n.t('scope.key', {name})` along with locale fallbacks and specific plural mappings.

Under the hood:

- **Interpolation:** The compat adapter easily parses `%{name}` mappings into your targeted runtime dictionary value.
- **Pluralization:** Replaces `one/other` subkeys and maps them against Intlayer's powerful underlying plural mechanisms (`Intl.PluralRules`), abstracting away manual mappings.
- **Locales:** Instead of loading monolithic language payloads at bootstrap, dictionaries are served up optimally based on the current context setup via the native Intlayer configuration.
