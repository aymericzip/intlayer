---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Управление конфигурацией
description: Узнайте, как получить и отправить вашу конфигурацию Intlayer в CMS.
keywords:
  - Конфигурация
  - Настройка
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
author: aymericzip
---

# Управление конфигурацией

## Получение конфигурации

Команда `configuration get` получает текущую конфигурацию для Intlayer, в частности настройки локали. Это полезно для проверки вашей настройки.

```bash packageManager="npm"
npx intlayer configuration get
```

```bash packageManager="yarn"
yarn intlayer configuration get
```

```bash packageManager="pnpm"
pnpm intlayer configuration get
```

```bash packageManager="bun"
bun x intlayer configuration get
```

## Псевдонимы:

- `npx intlayer config get`
- `npx intlayer conf get`

## Аргументы:

- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовый каталог для проекта.
- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию true при использовании CLI)
- **`--no-cache`**: Отключить кэш.
- **`--ci`**: Выполняет команду в каждом проекте Intlayer монорепозитория (или только в текущем при запуске из директории проекта). Учетные данные для каждого проекта можно подставить через `INTLAYER_PROJECT_CREDENTIALS` — JSON-объект, сопоставляющий путь проекта с `{ "clientId", "clientSecret" }`.

## Отправка конфигурации

Команда `configuration push` загружает вашу конфигурацию в Intlayer CMS и редактор. Этот шаг необходим для включения использования удалённых словарей в визуальном редакторе Intlayer.

```bash packageManager="npm"
npx intlayer configuration push
```

```bash packageManager="yarn"
yarn intlayer configuration push
```

```bash packageManager="pnpm"
pnpm intlayer configuration push
```

```bash packageManager="bun"
bun x intlayer configuration push
```

## Псевдонимы:

- `npx intlayer config push`
- `npx intlayer conf push`

## Аргументы:

- **`--env`**: Укажите окружение (например, `development`, `production`).
- **`--env-file`**: Укажите пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Укажите базовый каталог для проекта.
- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию true при использовании CLI)
- **`--no-cache`**: Отключить кэш.
- **`--ci`**: Выполняет команду в каждом проекте Intlayer монорепозитория (или только в текущем при запуске из директории проекта). Учетные данные для каждого проекта можно подставить через `INTLAYER_PROJECT_CREDENTIALS` — JSON-объект, сопоставляющий путь проекта с `{ "clientId", "clientSecret" }`.

Отправляя конфигурацию, ваш проект полностью интегрируется с Intlayer CMS, что обеспечивает бесшовное управление словарями между командами.
