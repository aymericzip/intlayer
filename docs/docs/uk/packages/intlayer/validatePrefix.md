---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Документація функції validatePrefix | intlayer
description: "Використовуйте validatePrefix, щоб перевірити, чи є сегмент URL допустимим префіксом локалі згідно з конфігурацією Intlayer."
keywords:
  - validatePrefix
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Документація функції validatePrefix

Функція `validatePrefix` перевіряє, чи є вказаний префікс дійсним префіксом локалі відповідно до конфігурації.

## Використання

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## Параметри

| Параметр | Тип      | Опис                   |
| -------- | -------- | ---------------------- |
| `prefix` | `string` | Префікс для перевірки. |

## Повертає

`true`, якщо префікс є дійсним, `false` в іншому випадку.
