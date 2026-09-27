---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Документация функции getLocale | intlayer
description: "Используйте getLocale, чтобы определить локаль по строке вроде URL или пути, с откатом на локаль по умолчанию."
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
    changes: "Init doc"
author: aymericzip
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
