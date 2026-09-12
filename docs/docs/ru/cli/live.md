---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Команды Live Sync
description: Узнайте, как использовать Live Sync для отражения изменений контента CMS во время выполнения.
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

# Команды Live Sync

Live Sync позволяет вашему приложению отражать изменения контента CMS во время выполнения. Пересборка или повторное развертывание не требуются. При включении обновления передаются на сервер Live Sync, который обновляет словари, используемые вашим приложением. Подробнее смотрите в разделе [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Аргументы:

**Опции конфигурации:**

- **`--base-dir`**: Укажите базовый каталог для проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовом каталоге.

- **`--no-cache`**: Отключить кэш.

  > Пример: `npx intlayer dictionary push --env-file .env.production.local`

- **`--ci`**: Выполняет команду в каждом проекте Intlayer монорепозитория (или только в текущем при запуске из директории проекта). Учетные данные для каждого проекта можно подставить через `INTLAYER_PROJECT_CREDENTIALS` — JSON-объект, сопоставляющий путь проекта с `{ "clientId", "clientSecret" }`.

  > Пример: `npx intlayer live --ci`

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию включено при использовании CLI)
