---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация функции validatePrefix | intlayer
description: Посмотрите, как использовать функцию validatePrefix в пакете intlayer
keywords:
  - validatePrefix
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация функции validatePrefix

Функция `validatePrefix` проверяет, является ли заданный префикс допустимым префиксом локали в соответствии с конфигурацией.

## Использование

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Вывод: true
```

## Параметры

| Параметр | Тип      | Описание              |
| -------- | -------- | --------------------- |
| `prefix` | `string` | Префикс для проверки. |

## Возвращаемое значение

`true`, если префикс действителен, `false` в противном случае.
