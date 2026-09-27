---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/i18next: адаптер совместимости для i18next"
description: "Сохраните код на i18next и обслуживайте его через Intlayer: установите @intlayer/i18next, настройте алиасы импортов и узнайте, что адаптер меняет под капотом."
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

# @intlayer/i18next: адаптер совместимости для i18next

Для подробного пошагового обучения см. наше полное [руководство по миграции i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md).

- [руководство по миграции i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md)

Intlayer идеально воспроизводит основные характеристики runtime `i18next`. Используя пакет совместимости, ваши приложения Vanilla или внутренние модули могут продолжать использовать знакомый синтаксис.

## Что делать

Чтобы начать, инициализируйте Intlayer в вашем проекте:

```bash
npx intlayer init --interactive
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

> Чтобы понять, откуда взялись эти библиотеки, прочитайте историю i18n в JavaScript.

- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
