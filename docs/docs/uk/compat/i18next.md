---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Перейти з i18next на Intlayer"
description: "Дізнайтеся, як перенести вашу програму Vanilla JS/TS з i18next на Intlayer, використовуючи адаптер сумісності."
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

# Міграція з i18next на Intlayer

Для детального покрокового посібника дивіться наш повний [Посібник з міграції з i18next](../migration_from_i18next_to_intlayer.md).

Intlayer ідеально повторює основні характеристики виконання `i18next`. Використовуючи пакет compat, ваші Vanilla-додатки або внутрішні модулі можуть продовжувати використовувати звичний синтаксис.

## Що робити

Щоб розпочати, ініціалізуйте Intlayer у своєму проекті:

```bash
npx intlayer init
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
