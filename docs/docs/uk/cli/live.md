---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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

**Параметри логування:**

- **`--verbose`**: Увімкнути детальне логування для відлагодження. (за замовчуванням true у CLI)
