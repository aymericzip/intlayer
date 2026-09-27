---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-i18next: адаптер совместимости для next-i18next"
description: "Сохраните код на next-i18next и обслуживайте его через Intlayer: установите @intlayer/next-i18next, настройте алиасы импортов и узнайте, что адаптер меняет под капотом."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# @intlayer/next-i18next: адаптер совместимости для next-i18next

Для полного и подробного пошагового учебника см. наше полное [руководство по миграции next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-i18next_to_intlayer.md).

Intlayer прозрачно обрабатывает все реализации Next.js Pages Router и App Router. Использование адаптера позволяет вам перенести вашу реализацию `next-i18next` без переписывания кода.

## Что делать

Чтобы начать, запустите:

```bash
npx intlayer init --interactive
```

Это создает требуемый файл настройки Intlayer. Чтобы переключиться на Intlayer за кулисами, обновите ваш `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## Что происходит под капотом

`createNextI18nPlugin` компонует встроенное поведение Next.js вместе с основным плагином `next-intlayer`, вводя все необходимые псевдонимы Webpack/Turbopack для `next-i18next`, `react-i18next` и `i18next`.

Под капотом:

- **`serverSideTranslations` & `appWithTranslation`:** Теперь они функционируют как обертки для внутренних загрузчиков Intlayer, обходя большие статические впрыскивания JSON.
- **Клиентские хуки:** Немедленно делегирует на `@intlayer/react-i18next`, сохраняя все возможности форматирования, множественного числа и вложенных пространств имён.

> Чтобы понять, откуда взялись эти библиотеки, прочитайте историю i18n в JavaScript.

- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)
