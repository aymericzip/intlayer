---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з Polyglot.js на Intlayer"
description: "Дізнайтеся, як перейти з Polyglot.js на Intlayer, використовуючи адаптер сумісності."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Міграція з Polyglot.js на Intlayer

Якщо ви використовуєте Polyglot.js від Airbnb, міграція на Intlayer є надзвичайно простою за допомогою рівня сумісності.

## Що робити

Просто запустіть команду ініціалізації у вашому проекті:

```bash
npx intlayer init
```

Це генерує `intlayer.config.ts`. Потім ви можете використовувати alias bundler plugin для прозорого перенаправлення Polyglot imports на `@intlayer/polyglot`.

## Що робиться під капотом

Синтаксис Polyglot.js зазвичай спирається на `polyglot.t('key', {name})` з інтерполяціями `%{name}` та множинами `smart_count`, розділеними на `"singular |||| plural"`.

Під капотом:

- **Interpolation:** Рівень сумісності обробляє заповнювачі `%{var}` нативно.
- **Plurals:** Рядок розділяється на `||||` і оцінюється проти нативного `Intl.PluralRules` відповідно до активної локалі, дзеркалюючи власний порядок buckets Polyglot за локаллю.
- **Dictionaries:** Ви обходите потребу надавати великі конфігурації JSON до `new Polyglot()` – Intlayer обробляє словники динамічно та обрізує їх автоматично.
