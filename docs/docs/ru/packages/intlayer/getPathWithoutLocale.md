---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getPathWithoutLocale | intlayer
description: Узнайте, как использовать функцию getPathWithoutLocale для пакета intlayer
keywords:
  - getPathWithoutLocale
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
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Документация: функция `getPathWithoutLocale` в `intlayer`

## Описание

Удаляет сегмент локали из заданного URL или пути, если он присутствует. Работает как с абсолютными URL, так и с относительными путями.

## Параметры

- `inputUrl: string`

  - **Описание**: Полная строка URL или путь для обработки.
  - **Тип**: `string`

- `locales: Locales[]`
  - **Описание**: Необязательный массив поддерживаемых локалей. По умолчанию используется конфигурируемый список локалей в проекте.
  - **Тип**: `Locales[]`

## Возвращаемое значение

- **Тип**: `string`
- **Описание**: Строка URL или путь без сегмента локали.

## Пример использования

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вывод: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вывод: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Вывод: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вывод: "https://example.com/dashboard"
```
