---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Построение словарей

Для построения ваших словарей вы можете выполнить команды:

```bash
npx intlayer build
```

или в режиме наблюдения

```bash
npx intlayer build --watch
```

Эта команда по умолчанию найдет ваши файлы декларации контента по пути `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` и построит словари в директории `.intlayer`.

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
