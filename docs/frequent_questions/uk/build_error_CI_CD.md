---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Помилка збірки в CI/CD
description: Дізнайтеся, як виправити помилки збірки, що виникають у середовищах CI/CD.
keywords:
  - build
  - error
  - ci
  - cd
  - pipeline
  - intlayer
  - dictionaries
  - next.js
  - prebuild
  - automation
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# Помилка під час збірки в CI/CD

Якщо ви отримуєте таку помилку в Next.js:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

Ось кілька рішень:

## 1. Відсутні словники

Переконайтеся, що dictionaries будуються під час етапу збірки.

Часто збірка працює локально, але не в CI/CD. Причина в тому, що локально каталог `.intlayer` присутній, а в CI/CD його немає, бо він виключений із збірки.

Ви можете виправити це, додавши скрипт prebuild у `package.json` вашого проєкту.

```json5 fileName=package.json
{
  // інше ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // Виконається перед збіркою
    "build": "next build",
  },
}
```

> Зауважте, що якщо ви використовуєте функцію `withIntlayer`, або еквівалентний bundler plugin для вашого фреймворку, скрипт prebuild буде виконаний перед збіркою.

## 2. Відсутні змінні середовища під час збірки / виконання

У контейнері або на платформі з автоматичним деплоєм рекомендується виключати файл `.env` з процесу збірки.

```text fileName=".gitignore or .dockerignore"
# Змінні середовища
.env
**/.env
.env.*
**/.env.*
```

Якщо ваші змінні середовища недоступні під час збірки, буде викинута помилка.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

Ймовірно, це не пов'язано з Intlayer. Тому перевірте свої змінні середовища під час збірки на вашій CI/CD-платформі.
