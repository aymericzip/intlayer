---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Список проектов Intlayer
description: Узнайте, как перечислить все проекты Intlayer в директории или git-репозитории.
keywords:
  - List
  - Projects
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: Добавить опцию вывода абсолютных путей к команде list projects
---

# Список проектов Intlayer

```bash
npx intlayer projects list
```

Эта команда ищет и выводит список всех проектов Intlayer, находя директории, которые содержат файлы конфигурации Intlayer. Это полезно для обнаружения всех проектов Intlayer в монорепозитории, workspace или git-репозитории.

## Алиасы:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Аргументы:

- **`--base-dir [path]`**: Укажите базовую директорию для поиска. По умолчанию используется текущая рабочая директория.

  > Пример: `npx intlayer projects list --base-dir /path/to/workspace`

  > Пример: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Выполнять поиск из корня git-репозитория вместо базовой директории. Это полезно для поиска всех проектов Intlayer в монорепозитории или git-репозитории.

  > Пример: `npx intlayer projects list --git-root`

- **`--json`**: Выводит результаты в формате JSON вместо форматированного текста. Полезно для скриптов и программного доступа.

  > Пример: `npx intlayer projects list --json`

- **`--absolute`**: Выводит результаты в виде абсолютных путей вместо относительных путей.

  > Пример: `npx intlayer projects list --absolute`

## Как это работает:

Команда ищет файлы конфигурации Intlayer в указанной директории (или в корне git, если используется `--git-root`). Она ищет следующие шаблоны файлов конфигурации:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Каждая директория, содержащая один из этих файлов, считается проектом Intlayer и будет перечислена в выводе.

## Примеры:

### Перечислить проекты в текущей директории:

```bash
npx intlayer projects list
```

### Список проектов в указанной директории:

```bash
npx intlayer projects list --base-dir ./packages
```

### Список всех проектов в git-репозитории:

```bash
npx intlayer projects list --git-root
```

### Использование сокращённого алиаса:

```bash
npx intlayer pl --git-root
```

### Вывод в формате JSON:

```bash
npx intlayer projects list --json
```

## Пример вывода:

### Форматированный вывод:

```bash
$ npx intlayer projects list --git-root

Найдено 3 проекта Intlayer:

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Вывод JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Примеры использования:

- **Управление monorepo**: Обнаружить все проекты Intlayer в структуре monorepo
- **Обнаружение проектов**: Найти все проекты с поддержкой Intlayer в рабочем пространстве
- **CI/CD**: Проверять проекты Intlayer в автоматизированных конвейерах
- **Документация**: Генерировать документацию, перечисляющую все проекты, использующие Intlayer

Вывод предоставляет абсолютные пути к каждой директории проекта, что упрощает навигацию к ним или автоматизацию операций над несколькими проектами Intlayer.
