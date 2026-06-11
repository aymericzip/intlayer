---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Керування конфігурацією
description: Дізнайтеся, як отримувати та завантажувати вашу конфігурацію Intlayer у CMS.
keywords:
  - Конфігурація
  - Налаштування
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Керування конфігурацією

## Отримати конфігурацію

Команда `configuration get` отримує поточну конфігурацію для Intlayer, зокрема налаштування локалі. Це корисно для перевірки вашої установки.

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

## Аліаси:

- `npx intlayer config get`
- `npx intlayer conf get`

## Аргументи:

- **`--env`**: Вкажіть середовище (наприклад, `development`, `production`).
- **`--env-file`**: Надайте власний файл середовища для завантаження змінних.
- **`--base-dir`**: Вказати базовий каталог проекту.
- **`--verbose`**: Увімкнути детальне логування для відлагодження. (за замовчуванням true при використанні CLI)
- **`--no-cache`**: Вимкнути кеш.

## Надіслати конфігурацію

Команда `configuration push` завантажує вашу конфігурацію в Intlayer CMS та редактор. Цей крок необхідний для увімкнення використання віддалених словників в Intlayer Visual Editor.

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

## Аліаси:

- `npx intlayer config push`
- `npx intlayer conf push`

## Аргументи:

- **`--env`**: Вказати середовище (наприклад, `development`, `production`).
- **`--env-file`**: Надати власний файл середовища для завантаження змінних.
- **`--base-dir`**: Вказати базовий каталог проекту.
- **`--verbose`**: Увімкнути детальне логування для налагодження. (за замовчуванням true при використанні CLI)
- **`--no-cache`**: Вимкнути кеш.

Після пушу конфігурації ваш проєкт повністю інтегрується з Intlayer CMS, що дозволяє безшовне керування словниками між командами.
