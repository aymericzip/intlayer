---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Команди Live Sync
description: Дізнайтеся, як використовувати Live Sync для відображення змін контенту CMS під час виконання.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
author: aymericzip
---

# Команди Live Sync

Live Sync дозволяє вашому застосунку відображати зміни контенту CMS під час виконання. Перебудова або повторне розгортання не потрібні. Коли увімкнено, оновлення передаються на сервер Live Sync, який оновлює словники, які читає ваш застосунок. Детальніше див. [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Аргументи:

**Параметри конфігурації:**

- **`--base-dir`**: Вкажіть базову директорію проєкту. Щоб отримати конфігурацію intlayer, команда шукатиме файл `intlayer.config.{ts,js,json,cjs,mjs}` у базовій директорії.

- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer dictionary push --env-file .env.production.local`

- **`--ci`**: Виконує команду в кожному проєкті Intlayer монорепозиторію (або лише в поточному при запуску з директорії проєкту). Облікові дані для кожного проєкту можна підставити через `INTLAYER_PROJECT_CREDENTIALS` — JSON-об'єкт, що зіставляє шлях проєкту з `{ "clientId", "clientSecret" }`.

  > Приклад: `npx intlayer live --ci`

**Параметри логування:**

- **`--verbose`**: Увімкнути детальне логування для відлагодження. (за замовчуванням true у CLI)
