---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Побудова словників
description: Дізнайтеся, як побудувати словники Intlayer зі файлів декларації контенту.
keywords:
  - Build
  - Dictionaries
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# Побудова словників

Щоб побудувати ваші словники, ви можете виконати команди:

```bash
npx intlayer build
```

або в режимі відстеження

```bash
npx intlayer build --watch
```

Ця команда за замовчуванням знайде ваші файли декларації контенту за шляхом `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` і побудує словники в директорії `.intlayer`.

## Аліаси:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Аргументи:

- **`--base-dir`**: Вказати базовий каталог проєкту. Щоб знайти конфігурацію intlayer, команда шукатиме файл `intlayer.config.{ts,js,json,cjs,mjs}` у базовому каталозі.

  > Приклад: `npx intlayer build --base-dir ./src`

- **`--env`**: Вказати середовище (наприклад, `development`, `production`). Корисно, якщо ви використовуєте змінні середовища в файлі конфігурації intlayer.

  > Приклад: `npx intlayer build --env production`

- **`--env-file`**: Вказати кастомний файл середовища, звідки завантажувати змінні. Корисно, якщо ви використовуєте змінні середовища в файлі конфігурації intlayer.

  > Приклад: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Запустити команду паралельно зі збіркою.

  > Приклад: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Пропустити крок підготовки.

  > Приклад: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Вимкнути кеш.

  > Приклад: `npx intlayer build --no-cache`
