---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Відстеження словників
description: Дізнайтеся, як відстежувати зміни у ваших файлах декларації контенту та автоматично створювати словники.
keywords:
  - Відстеження
  - Словники
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
---

# Відстеження словників

```bash
npx intlayer watch
```

Ця команда відстежуватиме зміни у ваших файлах декларації контенту та автоматично створюватиме словники в каталозі `.intlayer`.
Ця команда еквівалентна `npx intlayer build --watch --skip-prepare`.

## Псевдоніми:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Аргументи:

- **`--with`**: Запускає команду паралельно з відстеженням.

  > Приклад: `npx intlayer watch --with "next dev --turbopack"`
