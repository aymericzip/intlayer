---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: адаптер сумісності для next-i18next"
description: "Збережіть код на next-i18next і обслуговуйте його через Intlayer: встановіть @intlayer/next-i18next, налаштуйте аліаси імпортів і дізнайтеся, що адаптер змінює під капотом."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/next-i18next: адаптер сумісності для next-i18next

Для повного та детального покрокового посібника, будь ласка, див. наш [Посібник з міграції next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-i18next_to_intlayer.md).

Intlayer прозоро обробляє всі реалізації Next.js Pages Router та App Router. Використання адаптера дозволяє вам перенести вашу реалізацію `next-i18next` без переписування коду.

## Що робити

Для початку виконайте:

```bash
npx intlayer init --interactive
```

Це створює необхідний файл конфігурації Intlayer. Щоб інтегрувати Intlayer в фоновому режимі, оновіть ваш `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Що він робить під капотом

`createNextI18nPlugin` поєднує нативну поведінку Next.js разом з основним плагіном `next-intlayer`, інжектуючи всі необхідні псевдоніми Webpack/Turbopack для `next-i18next`, `react-i18next` та `i18next`.

Під капотом:

- **`serverSideTranslations` & `appWithTranslation`:** Тепер вони функціонують як обгортки для внутрішніх завантажувачів Intlayer, обходячи велику статичну ін'єкцію JSON.
- **Client hooks:** Негайно делегує до `@intlayer/react-i18next`, збереження всі функції форматування, множин та вкладених просторів імен.

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)
