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
  - version: 7.5.11
    date: 2026-01-06
    changes: Добавлена опция вывода JSON для команды list
---

# Список файлов декларации контента

```bash
npx intlayer content list
```

## Псевдонимы:

- `npx intlayer list`

Эта команда отображает все файлы декларации контента в вашем проекте, показывая их ключи словаря и пути к файлам. Это полезно для получения обзора всех ваших файлов контента и проверки того, что они корректно обнаружены Intlayer.

## Аргументы:

- **`--json`**: Выводит результаты в формате JSON вместо форматированного текста. Полезно для скриптов и программного доступа.

  > Пример: `npx intlayer content list --json`

## Примеры:

### Список файлов декларации контента:

```bash
npx intlayer content list
```

### Вывод в формате JSON:

```bash
npx intlayer content list --json
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
