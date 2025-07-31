---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getEnumeration | intlayer
description: Узнайте, как использовать функцию getEnumeration для пакета intlayer
keywords:
  - getEnumeration
  - перевод
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
---

# Документация: функция `getEnumeration` в `intlayer`

## Описание

Функция `getEnumeration` извлекает содержимое, соответствующее определённому количеству, на основе заранее заданных условий в объекте перечисления. Условия определяются в виде ключей, а их приоритет определяется порядком следования в объекте.

## Параметры

- `enumerationContent: QuantityContent<Content>`

  - **Описание**: Объект, где ключи представляют условия (например, `<=`, `<`, `>=`, `=`), а значения — соответствующее содержимое. Порядок ключей определяет приоритет сопоставления.
  - **Тип**: `QuantityContent<Content>`
    - `Content` может быть любого типа.

- `quantity: number`

  - **Описание**: Числовое значение, используемое для сопоставления с условиями в `enumerationContent`.
  - **Тип**: `number`

## Возвращаемое значение

- **Тип**: `Content`
- **Описание**: Содержимое, соответствующее первому совпадающему условию в `enumerationContent`. Если совпадений не найдено, обработка происходит в соответствии с реализацией (например, ошибка или содержимое по умолчанию).

## Пример использования

### Базовое использование

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "У вас меньше чем -2.3",
    "<1": "У вас меньше чем один",
    "2": "У вас два",
    ">=3": "У вас три или больше",
  },
  2
);

console.log(content); // Вывод: "У вас два"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "У вас меньше чем один",
    "2": "У вас два",
    ">=3": "У вас три или больше",
  },
  2
);

console.log(content); // Вывод: "У вас два"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "У вас меньше чем один",
    "2": "У вас два",
    ">=3": "У вас три или больше",
  },
  2
);

console.log(content); // Вывод: "У вас два"
```

### Приоритет условий

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "У вас меньше чем четыре",
    "2": "У вас два",
  },
  2
);

console.log(content); // Вывод: "У вас меньше чем четыре"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "У вас меньше чем четыре",
    "2": "У вас два",
  },
  2
);

console.log(content); // Вывод: "У вас меньше чем четыре"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "У вас меньше чем четыре",
    "2": "У вас два",
  },
  2
);

console.log(content); // Вывод: "У вас меньше чем четыре"
```

## Особые случаи

- **Отсутствие подходящего условия:**

  - Если ни одно условие не соответствует заданному количеству, функция либо вернёт `undefined`, либо явно обработает сценарий по умолчанию/резервный вариант.

- **Двусмысленные условия:**

  - Если условия перекрываются, приоритет имеет первое подходящее условие (на основе порядка в объекте).

- **Неверные ключи:**

  - Функция предполагает, что все ключи в `enumerationContent` являются допустимыми и могут быть разобраны как условия. Недопустимые или неправильно отформатированные ключи могут привести к непредсказуемому поведению.

- **Проверка TypeScript:**
  - Функция гарантирует, что тип `Content` является согласованным для всех ключей, что обеспечивает типовую безопасность при получении содержимого.

## Примечания

- Утилита `findMatchingCondition` используется для определения подходящего условия на основе заданного количества.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
