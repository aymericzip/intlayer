---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с i18next на Intlayer"
description: "Узнайте, как перенести ваше приложение на Vanilla JS/TS с i18next на Intlayer, используя адаптер совместимости."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с i18next на Intlayer

Для подробного пошагового обучения см. наше полное [руководство по миграции i18next](../migration_from_i18next_to_intlayer.md).

Intlayer идеально воспроизводит основные характеристики runtime `i18next`. Используя пакет совместимости, ваши приложения Vanilla или внутренние модули могут продолжать использовать знакомый синтаксис.

## Что делать

Чтобы начать, инициализируйте Intlayer в вашем проекте:

```bash
npx intlayer init
```

Если вы используете Vite, включите плагин Intlayer, чтобы маршрутизировать импорты на `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Что происходит под капотом

`i18nextVitePlugin` создает псевдонимы импортов `i18next` на `@intlayer/i18next`, избегая раздувания bundle от включений JSON файлов.

Под капотом:

- **Конфигурация экземпляра:** `createInstance` правильно анализирует и применяет откат пространства имён, используя pipeline компиляции Intlayer для получения словаря.
- **Интерполяция:** Встроенная поддержка замен `{{name}}` и вложения `$t(key)` рекурсивно.
- **Контекст и множественное число:** Идентифицирует и разрешает форматы суффиксов как `key_male` и `key_one`/`key_other`, оцениваемые против стандарта `Intl.PluralRules`.
- **Возвратные объекты:** Режим `returnObjects: true` безопасно извлекает деревья из словарей Intlayer.
