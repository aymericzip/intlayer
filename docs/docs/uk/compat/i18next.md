---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/i18next: адаптер сумісності для i18next"
description: "Збережіть код на i18next і обслуговуйте його через Intlayer: встановіть @intlayer/i18next, налаштуйте аліаси імпортів і дізнайтеся, що адаптер змінює під капотом."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/i18next: адаптер сумісності для i18next

Для детального покрокового посібника дивіться наш повний [Посібник з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md).

Intlayer ідеально повторює основні характеристики виконання `i18next`. Використовуючи пакет compat, ваші Vanilla-додатки або внутрішні модулі можуть продовжувати використовувати звичний синтаксис.

## Що робити

Щоб розпочати, ініціалізуйте Intlayer у своєму проекті:

```bash
npx intlayer init --interactive
```

Якщо ви використовуєте Vite, включіть плагін Intlayer для маршрутизації імпортів до `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Як це працює під капотом

`i18nextVitePlugin` переспрямовує імпорти `i18next` на `@intlayer/i18next`, уникаючи збільшення розміру bundle через включення JSON файлів.

Під капотом:

- **Конфігурація екземпляра:** `createInstance` правильно парсить та застосовує fallbacks простору імен, одночасно використовуючи конвеєр компіляції Intlayer для отримання словників.
- **Інтерполяція:** Нативна підтримка замін `{{name}}` та вкладеного `$t(key)` рекурсивно.
- **Контекст і плюралізація:** Визначає та розв'язує формати суфіксів на кшталт `key_male` та `key_one`/`key_other`, оцінюючи їх за стандартом `Intl.PluralRules`.
- **Повернення об'єктів:** Режим `returnObjects: true` безпечно витягує дерева з словників Intlayer.

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)
