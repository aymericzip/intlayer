---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація функції getLocale | intlayer
description: Дивіться, як використовувати функцію getLocale у пакеті intlayer
keywords:
  - getLocale
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Документація функції getLocale

Функція `getLocale` дозволяє визначити локаль за заданим рядком, наприклад з URL або шляху.

## Використання

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Параметри

| Параметр | Тип      | Опис                                               |
| -------- | -------- | -------------------------------------------------- |
| `path`   | `string` | Шлях або рядок, з якого потрібно витягнути локаль. |

## Повертає

Виявлена локаль, або локаль за замовчуванням, якщо локаль не виявлена.
