---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація функції getLocaleLang | intlayer
description: Дізнайтеся, як використовувати функцію getLocaleLang у пакеті intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getLocaleLang` у `intlayer`

## Опис

Функція `getLocaleLang` витягує код мови з рядка локалі. Вона підтримує локалі як з кодами країн, так і без них. Якщо локаль не вказана, за замовчуванням повертається пустий рядок.

## Параметри

- `locale?: Locales`
  - **Опис**: Рядок локалі (наприклад, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), з якого витягується код мови.
  - **Тип**: `Locales` (необов'язково)

## Повертає

- **Тип**: `string`
- **Опис**: Код мови, витягнутий з локалі. Якщо локаль не вказана, повертається порожній рядок (`''`).

## Приклад використання

### Отримання кодів мов:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Output: "en"
getLocaleLang(Locales.ENGLISH); // Output: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Output: "fr"
getLocaleLang(Locales.FRENCH); // Output: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Вивід: "en"
getLocaleLang(Locales.ENGLISH); // Вивід: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Вивід: "fr"
getLocaleLang(Locales.FRENCH); // Вивід: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Вивід: "en"
getLocaleLang(Locales.ENGLISH); // Вивід: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Вивід: "fr"
getLocaleLang(Locales.FRENCH); // Вивід: "fr"
```

## Крайові випадки

- **Locale не вказано:**
  - Функція повертає порожній рядок, коли `locale` є `undefined`.

- **Некоректні рядки locale:**
  - Якщо `locale` не відповідає формату `language-country` (наприклад, `Locales.ENGLISH-US`), функція безпечно повертає частину перед `'-'` або весь рядок, якщо `'-'` відсутній.
