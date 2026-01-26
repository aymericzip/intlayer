---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация функции getLocale | intlayer
description: Как использовать функцию getLocale в пакете intlayer
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

# Документация функции getLocale

Функция `getLocale` позволяет определить локаль по заданной строке, например URL или пути.

## Использование

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Параметры

| Параметр | Тип      | Описание                                          |
| -------- | -------- | ------------------------------------------------- |
| `path`   | `string` | Путь или строка, из которой нужно извлечь локаль. |

## Возвращаемое значение

Обнаруженная локаль или локаль по умолчанию, если локаль не обнаружена.
