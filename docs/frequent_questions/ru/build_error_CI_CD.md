---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Ошибка сборки в CI/CD
description: Узнайте, как исправить ошибки сборки, возникающие в средах CI/CD.
keywords:
  - сборка
  - ошибка
  - ci
  - cd
  - конвейер
  - intlayer
  - словари
  - next.js
  - предварительная сборка
  - автоматизация
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Ошибка при сборке в CI/CD

Если вы получаете ошибку такого вида в Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Вот несколько решений:

## 1. Отсутствуют словари

Убедитесь, что словари собираются на этапе сборки.

Часто сборка работает локально, но не на CI/CD. Причина в том, что локально каталог `.intlayer` присутствует, а на CI/CD его нет, так как он исключён из сборки.

Вы можете исправить это, добавив скрипт предварительной сборки (prebuild) в `package.json` вашего проекта.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Будет выполнен перед сборкой
    "build": "next build",
  },
}
```

> Обратите внимание, что если вы используете функцию `withIntlayer` или эквивалентный плагин для сборщика вашего фреймворка, скрипт предварительной сборки будет выполнен перед сборкой.

## 2. Отсутствие переменных окружения во время сборки или выполнения

В контейнере или на платформе с автоматическим деплоем рекомендуется исключать файл `.env` из сборки.

```text fileName=".gitignore or .dockerignore"
# Переменные окружения
.env
**/.env
.env.*
**/.env.*
```

Если ваши переменные окружения недоступны во время сборки, будет выброшена ошибка.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL), // Базовый URL из переменной окружения
});
```

Вероятно, это не связано с Intlayer. Поэтому проверьте ваши переменные окружения во время сборки на вашей CI/CD платформе.
