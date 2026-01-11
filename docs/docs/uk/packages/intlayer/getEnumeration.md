---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація функції getEnumeration | intlayer
description: Дивіться, як використовувати функцію getEnumeration у пакеті intlayer
keywords:
  - getEnumeration
  - переклад
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getEnumeration` в `intlayer`

## Опис

Функція `getEnumeration` повертає контент, що відповідає певній кількості, на основі заздалегідь визначених умов в об'єкті перечислення. Умови задаються як ключі, а їхній пріоритет визначається порядком їх розташування в об'єкті.

## Параметри

- `enumerationContent: QuantityContent<Content>`
  - **Опис**: Об'єкт, де ключі представляють умови (наприклад `<=`, `<`, `>=`, `=`), а значення — відповідний вміст. Порядок ключів визначає пріоритет їхнього зіставлення.
  - **Тип**: `QuantityContent<Content>`
    - `Content` може бути будь-якого типу.

- `quantity: number`
  - **Опис**: Числове значення, яке використовується для співставлення з умовами в `enumerationContent`.
  - **Тип**: `number`

## Повертає

- **Тип**: `Content`
- **Опис**: Вміст, що відповідає першій умові, яка збіглася в `enumerationContent`. Якщо збігів не знайдено, поведінка залежить від реалізації (наприклад, помилка або запасний вміст).

## Приклад використання

### Базове використання

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "У вас менше ніж -2.3",
    "<1": "У вас менше ніж один",
    "2": "У вас два",
    ">=3": "У вас три або більше",
  },
  2
);

console.log(content); // Вивід: "У вас два"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "У вас менше ніж один",
    "2": "У вас два",
    ">=3": "У вас три або більше",
  },
  2
);

console.log(content); // Вивід: "У вас два"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "У вас менше ніж один",
    "2": "У вас два",
    ">=3": "У вас три або більше",
  },
  2
);

console.log(content); // Вивід: "You have two"
```

### Пріоритет умов

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // Вивід: "You have less than four"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // Вивід: "You have less than four"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "You have less than four",
    "2": "You have two",
  },
  2
);

console.log(content); // Вивід: "You have less than four"
```

## Граничні випадки

- **Відсутність відповідної умови:**
  - Якщо жодна умова не відповідає переданій кількості, функція або поверне `undefined`, або явно обробить сценарій за замовчуванням (fallback).

- **Неоднозначні умови:**
  - Якщо умови перекриваються, пріоритет має перша знайдена умова (в порядку визначення в об'єкті).

- **Невірні ключі:**
  - Функція припускає, що всі ключі в `enumerationContent` є дійсними та розбираються як умови. Невірні або неправильно відформатовані ключі можуть призвести до непередбаченої поведінки.

- **Забезпечення TypeScript:**
  - Функція гарантує, що тип `Content` узгоджений для всіх ключів, що дозволяє забезпечити типобезпеку при отриманні вмісту.

## Примітки

- Утиліта `findMatchingCondition` використовується для визначення відповідної умови на основі заданої кількості.
