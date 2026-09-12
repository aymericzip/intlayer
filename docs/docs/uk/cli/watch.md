---
createdAt: 2024-08-11
updatedAt: 2026-09-12
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
author: aymericzip
---

# Відстеження словників

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

Ця команда відстежуватиме зміни у ваших файлах декларації контенту та автоматично створюватиме словники в каталозі `.intlayer`.
Ця команда еквівалентна `npx intlayer build --watch --skip-prepare`.

## Псевдоніми:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Аргументи:

- **`--with`**: Запускає команду паралельно з відстеженням.

  > Приклад: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Виконує команду в кожному проєкті Intlayer монорепозиторію (або лише в поточному при запуску з директорії проєкту). Облікові дані для кожного проєкту можна підставити через `INTLAYER_PROJECT_CREDENTIALS` — JSON-об'єкт, що зіставляє шлях проєкту з `{ "clientId", "clientSecret" }`.

  > Приклад: `npx intlayer watch --ci`
