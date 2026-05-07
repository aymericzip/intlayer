---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: Список файлов декларации контента
description: Узнайте, как вывести список всех файлов декларации контента в вашем проекте.
keywords:
  - Список
  - Декларация контента
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: "Добавлена опция вывода абсолютных путей для команды list"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Добавлена опция вывода JSON для команды list"
---

# Список файлов декларации контента

```bash packageManager="npm"
npx intlayer content list
```

```bash packageManager="yarn"
yarn intlayer content list
```

```bash packageManager="pnpm"
pnpm intlayer content list
```

```bash packageManager="bun"
bun x intlayer content list
```

## Псевдонимы:

- `npx intlayer list`

Эта команда отображает все файлы декларации контента в вашем проекте, показывая их ключи словаря и пути к файлам. Это полезно для получения обзора всех ваших файлов контента и проверки того, что они корректно обнаружены Intlayer.

## Аргументы:

- **`--json`**: Выводит результаты в формате JSON вместо форматированного текста. Полезно для скриптов и программного доступа.

  > Пример: `npx intlayer content list --json`

## Примеры:

### Список файлов декларации контента:

```bash packageManager="npm"
npx intlayer content list
```

```bash packageManager="yarn"
yarn intlayer content list
```

```bash packageManager="pnpm"
pnpm intlayer content list
```

```bash packageManager="bun"
bun x intlayer content list
```

### Вывод в формате JSON:

```bash packageManager="npm"
npx intlayer content list --json
```

```bash packageManager="yarn"
yarn intlayer content list --json
```

```bash packageManager="pnpm"
pnpm intlayer content list --json
```

```bash packageManager="bun"
bun x intlayer content list --json
```

### Вывод в виде абсолютных путей:

```bash packageManager="npm"
npx intlayer content list --absolute
```

```bash packageManager="yarn"
yarn intlayer content list --absolute
```

```bash packageManager="pnpm"
pnpm intlayer content list --absolute
```

```bash packageManager="bun"
bun x intlayer content list --absolute
```

## Пример вывода:

### Форматированный вывод:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Всего файлов декларации контента: 3
```

### Вывод JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Эта команда выведет:

- Отформатированный список всех файлов декларации контента с их ключами и относительными путями к файлам
- Общее количество найденных файлов декларации контента

Вывод помогает убедиться, что все ваши файлы контента правильно настроены и доступны системе Intlayer.
