---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Міграція з Next Translate на Intlayer"
description: "Дізнайтеся, як перенести вашу програму Next.js з next-translate на Intlayer, використовуючи адаптер сумісності."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Міграція з Next Translate на Intlayer

Міграція з `next-translate` на Intlayer є практично прямою заміною, яка зберігає вашу існуючу синтаксис та теги.

## Що робити

Initialize Intlayer у вашому проекті:

```bash
npx intlayer init
```

CLI створить вашу конфігурацію. Потім ви можете застосувати плагін Intlayer у вашому `next.config.ts`, який injects build-time subpath aliases mapping `next-translate/useTranslation` to `@intlayer/next-translate`.

## Як це працює під капотом

`next-translate` надає хуки як `useTranslation('ns')`, `t('ns:key.path')` та компонент `<Trans>`.

Під капотом:

- **Інтерполяція та множини:** Він тісно покладається на поведінку адаптера `react-i18next`. Динамічно обробляються заповнювачі `{{var}}` та плюралізація, відображена з суфіксів як `key_0`, `key_one` та `key_other`.
- **Компонент `<Trans>`:** Безпосередньо підтримується для аналізу HTML-подібних тегів разом із реквізитом `components` на основі масиву.
- **Простори імен:** Aliasing підпутей забезпечує, що ваш `useTranslation` посилається на правильні внутрішні простори імен словника без ручного змінення.
