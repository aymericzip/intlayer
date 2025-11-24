---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Список файлов декларации контента

```bash
npx intlayer content list
```

## Псевдонимы:

- `npx intlayer list`

Эта команда отображает все файлы декларации контента в вашем проекте, показывая их ключи словаря и пути к файлам. Это полезно для получения обзора всех ваших файлов контента и проверки того, что они корректно обнаружены Intlayer.

## Пример:

```bash
npx intlayer content list
```

## Пример вывода:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Всего файлов декларации контента: 3
```

Эта команда выведет:

- Отформатированный список всех файлов декларации контента с их ключами и относительными путями к файлам
- Общее количество найденных файлов декларации контента

Вывод помогает убедиться, что все ваши файлы контента правильно настроены и доступны системе Intlayer.
