---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация функции getEnumeration | intlayer
description: Узнайте, как использовать функцию getEnumeration для пакета intlayer
keywords:
  - getEnumeration
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `getEnumeration` в `intlayer`

## Описание

Функция `getEnumeration` извлекает контент, соответствующий определенному количеству, на основе предопределенных условий в объекте перечисления. Условия определяются как ключи, а их приоритет определяется их порядком в объекте.

## Параметры

- `enumerationContent: QuantityContent<Content>`

  - **Описание**: Объект, где ключи представляют условия (например, `<=`, `<`, `>=`, `=`), а значения представляют соответствующий контент. Порядок ключей определяет их приоритет соответствия.
  - **Тип**: `QuantityContent<Content>`
    - `Content` может быть любого типа.

- `quantity: number`

  - **Описание**: Числовое значение, используемое для сопоставления с условиями в `enumerationContent`.
  - **Тип**: `number`

## Возвращаемое значение

- **Тип**: `Content`
- **Описание**: Контент, соответствующий первому совпадающему условию в `enumerationContent`. Если совпадение не найдено, возвращается значение по умолчанию в зависимости от реализации (например, ошибка или резервный контент).

## Пример использования

### Базовое использование

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "У вас меньше чем -2.3",
    "<1": "У вас меньше одного",
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
    "<1": "У вас меньше одного",
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
    "<1": "У вас меньше одного",
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
    "<4": "У вас меньше четырех",
    "2": "У вас два",
  },
  2
);

console.log(content); // Вывод: "У вас меньше четырех"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "У вас меньше четырех",
    "2": "У вас два",
  },
  2
);

console.log(content); // Вывод: "У вас меньше четырех"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "У вас меньше четырех",
    "2": "У вас два",
  },
  2
);

console.log(content); // Вывод: "У вас меньше четырех"
```

## Граничные случаи

- **Нет совпадающего условия:**

  - Если ни одно условие не соответствует предоставленному количеству, функция либо возвращает `undefined`, либо явно обрабатывает сценарий по умолчанию/резервный.

- **Неоднозначные условия:**

  - Если условия пересекаются, приоритет имеет первое совпадающее условие (на основе порядка в объекте).

- **Недопустимые ключи:**

  - Функция предполагает, что все ключи в `enumerationContent` являются допустимыми и могут быть интерпретированы как условия. Недопустимые или неправильно отформатированные ключи могут привести к неожиданному поведению.

- **Применение TypeScript:**
  - Функция гарантирует, что тип `Content` является согласованным для всех ключей, обеспечивая типобезопасность извлекаемого контента.

## Заметки

- Утилита `findMatchingCondition` используется для определения соответствующего условия на основе заданного количества.

[Документация на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/getEnumeration.md)
