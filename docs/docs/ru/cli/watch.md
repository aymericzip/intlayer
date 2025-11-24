---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Наблюдение за словарями

```bash
npx intlayer watch
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

  > Пример: `npx intlayer watch --with "next dev --turbopack"`
