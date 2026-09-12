---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Наблюдение за словарями
description: Узнайте, как отслеживать изменения в ваших файлах деклараций контента и автоматически создавать словари.
keywords:
  - Наблюдение
  - Словари
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# Наблюдение за словарями

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

Эта команда будет отслеживать изменения в ваших файлах деклараций контента и создавать словари в директории `.intlayer`.
Эта команда эквивалентна `npx intlayer build --watch --skip-prepare`.

## Псевдонимы:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Аргументы:

- **`--with`**: Запустить команду параллельно с наблюдением.

  > Пример: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Выполняет команду в каждом проекте Intlayer монорепозитория (или только в текущем при запуске из директории проекта). Учетные данные для каждого проекта можно подставить через `INTLAYER_PROJECT_CREDENTIALS` — JSON-объект, сопоставляющий путь проекта с `{ "clientId", "clientSecret" }`.

  > Пример: `npx intlayer watch --ci`
