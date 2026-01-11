---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація функції getTranslation | intlayer
description: Дивіться, як використовувати функцію getTranslation для пакета intlayer
keywords:
  - getTranslation
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getTranslation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getTranslationContent` в `intlayer`

## Опис

Функція `getTranslationContent` отримує вміст, що відповідає певній локалі, із набору налаштовуваного мовного вмісту. Якщо вказаної локалі не знайдено, вона за замовчуванням повертає вміст для локалі за замовчуванням, налаштованої в проєкті.

## Параметри

- `languageContent: CustomizableLanguageContent<Content>`
  - **Опис**: Об'єкт, що містить переклади для різних локалей. Кожний ключ відповідає локалі, а його значення — відповідний вміст.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` може бути будь-якого типу, за замовчуванням — `string`.

- `locale: Locales`
  - **Опис**: Локаль, для якої потрібно отримати вміст.
  - **Тип**: `Locales`

## Повертає

- **Тип**: `Content`
- **Опис**: Контент, який відповідає вказаній локалі. Якщо локаль не знайдена, повертається контент локалі за замовчуванням.

## Приклад використання

### Базове використання

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Виведе: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Виведе: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вивід: "Bonjour"
```

### Відсутня локаль:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вивід: "Hello" (вміст локалі за замовчуванням)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вивід: "Hello" (вміст локалі за замовчуванням)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вивід: "Hello" (вміст мови за замовчуванням)
```

### Використання власних типів контенту:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вивід: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Особливі випадки

- **Локаль не знайдена:**
  - Коли `locale` не знайдено в `languageContent`, функція повертає вміст для локалі за замовчуванням.
- **Неповний вміст мови:**
- Якщо локаль визначена частково, функція не об'єднує вміст. Вона суворо повертає значення зазначеної локалі або використовує локаль за замовчуванням.
- **Забезпечення TypeScript:**
  - Якщо локалі в `languageContent` не відповідають конфігурації проєкту, TypeScript вимагатиме визначення всіх необхідних локалей, гарантуючи, що вміст повний і безпечний з точки зору типів.
