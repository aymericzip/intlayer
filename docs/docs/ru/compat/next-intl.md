---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: адаптер совместимости для next-intl"
description: "Сохраните код на next-intl и обслуживайте его через Intlayer: установите @intlayer/next-intl, настройте алиасы импортов и узнайте, что адаптер меняет под капотом."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# @intlayer/next-intl: адаптер совместимости для next-intl

Для полного и подробного пошагового учебника см. наше полное [руководство по миграции next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md).

- [руководство по миграции next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md)

Миграция с `next-intl` на Intlayer позволяет вам полностью сохранить маршрутизацию и синтаксис приложения.

## Что делать

Выполните следующую команду в вашем репозитории:

```bash
npx intlayer init --interactive
```

Это создаст `intlayer.config.ts`. В вашем `next.config.ts`, используйте обертку плагина для беспрепятственного впрыскивания псевдонимов `next-intl` в `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Что происходит под капотом

Обертка bundler заменяет переводы, но **оставляет функции `next-intl/navigation` нетронутыми** (например, `Link`, `redirect`, `usePathname`).

Под капотом:

- **ICU runtime:** Множественное число (`=0`, `one`, `other`), select/selectordinal, аргументы `#` и отформатированные аргументы (`{ts, date, long}`) работают правильно, используя общий resolver `resolveMessage(..., 'icu')`.
- **`useTranslations()` & `getTranslations()`:** Вызовы пустой области извлекают первый сегмент ключа как правильный идентификатор словаря. Вложенные пространства имён грациозно расщепляются на пути словаря и префиксы.
- **Форматирование Rich:** Оба `t.rich()` и `t.markup()` полностью изначально реализованы, преобразуя HTML-подобные узлы в отображаемые куски React.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` и именованные форматы из конфигурации моста к основным встроенным форматерам `Intl`.

> Чтобы понять, откуда взялись эти библиотеки, прочитайте историю i18n в JavaScript.

- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
