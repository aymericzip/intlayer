---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с next-intl на Intlayer"
description: "Узнайте, как перенести ваше приложение Next.js с next-intl на Intlayer, используя адаптер совместимости."
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

# Миграция с next-intl на Intlayer

Для полного и подробного пошагового учебника см. наше полное [руководство по миграции next-intl](../migration_from_next-intl_to_intlayer.md).

Миграция с `next-intl` на Intlayer позволяет вам полностью сохранить маршрутизацию и синтаксис приложения.

## Что делать

Выполните следующую команду в вашем репозитории:

```bash
npx intlayer init
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
