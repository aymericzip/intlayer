---
createdAt: 2025-08-23
updatedAt: 2026-09-27
priority: 5
title: Документація функції getPathWithoutLocale | intlayer
description: "Використовуйте getPathWithoutLocale, щоб прибрати сегмент локалі з URL чи шляху, як для абсолютних URL, так і для відносних шляхів."
keywords:
  - getPathWithoutLocale
  - переклад
  - Intlayer
  - intlayer
  - інтернаціоналізація
  - документація
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
    changes: "Init history"
author: aymericzip
---

# Документація: Функції `getPathWithoutLocale` у `intlayer`

## Опис

Видаляє сегмент локалі з вказаного URL або pathname, якщо він присутній. Працює як з абсолютними URL, так і з відносними шляхами.

## Параметри

- `inputUrl: string`
  - **Опис**: Повний рядок URL або шлях (pathname) для обробки.
  - **Тип**: `string`

- `locales: Locales[]`
  - **Опис**: Необов’язковий масив підтримуваних локалей. За замовчуванням використовуються локалі, налаштовані в проєкті.
  - **Тип**: `Locales[]`

## Повертає

- **Тип**: `string`
- **Опис**: Рядок URL або шлях без сегмента локалі.

## Приклад використання

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Виведе: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Виведе: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Виведе: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Вивід: "https://example.com/dashboard"
```
