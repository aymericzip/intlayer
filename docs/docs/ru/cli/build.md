---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Построение словарей
description: Узнайте, как создавать словари Intlayer из файлов декларации контента.
keywords:
  - Построение
  - Словари
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "Добавлен флаг `--ci`"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Добавить опцию checkTypes"
author: aymericzip
---

# Построение словарей

Для построения ваших словарей вы можете выполнить команды:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

или в режиме наблюдения

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

Эта команда по умолчанию найдет ваши файлы декларации контента по пути `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}` и построит словари в директории `.intlayer`.

## Псевдонимы:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Аргументы:

- **`--base-dir`**: Укажите базовую директорию для проекта. Для получения конфигурации intlayer команда будет искать файл `intlayer.config.{ts,js,json,cjs,mjs}` в базовой директории.

  > Пример: `npx intlayer build --base-dir ./src`

- **`--env`**: Укажите окружение (например, `development`, `production`). Полезно, если вы используете переменные окружения в вашем файле конфигурации intlayer.

  > Пример: `npx intlayer build --env production`

- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных. Полезно, если вы используете переменные окружения в вашем файле конфигурации intlayer.

  > Пример: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Запустить команду параллельно с процессом сборки.

  > Пример: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Пропустить этап подготовки.

  > Пример: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Отключить кэш.

  > Пример: `npx intlayer build --no-cache`

- **`--ci`**: Выполняет команду в каждом проекте Intlayer монорепозитория (или только в текущем при запуске из директории проекта). Учетные данные для каждого проекта можно подставить через `INTLAYER_PROJECT_CREDENTIALS` — JSON-объект, сопоставляющий путь проекта с `{ "clientId", "clientSecret" }`.

  > Пример: `npx intlayer build --ci`

- **`--check-types`**: Проверяет типы файлов объявления контента.

  > Пример: `npx intlayer build --check-types`
