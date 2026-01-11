---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Функція getTranslation — документація Intlayer для JavaScript
description: Документація функції getTranslation у Intlayer, яка отримує локалізований контент для певної локалі з відкотом до локалі за замовчуванням.
keywords:
  - getTranslation
  - intlayer
  - function
  - localization
  - i18n
  - JavaScript
  - translation
  - locale
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Документація: функція `getTranslation` у `intlayer`

## Опис

Функція `getTranslation` отримує вміст, що відповідає певній локалі, з набору налаштовуваного мовного вмісту. Якщо вказана локаль не знайдена, за замовчуванням повертається вміст локалі за замовчуванням, налаштованої в проєкті.

## Параметри

- `languageContent: CustomizableLanguageContent<Content>`
  - **Опис**: Об'єкт, що містить переклади для різних локалей. Кожен ключ відповідає локалі, а його значення — відповідний вміст.
  - **Тип**: `CustomizableLanguageContent<Content>`
    - `Content` може бути будь-якого типу, за замовчуванням — `string`.

- `locale: Locales`
  - **Опис**: Локаль, для якої потрібно отримати вміст.
  - **Тип**: `Locales`

## Повертає

- **Тип**: `Content`
- **Опис**: Вміст, що відповідає вказаній локалі. Якщо локаль не знайдена, повертається вміст локалі за замовчуванням.

## Приклад використання

### Базове використання

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вивід: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Вивід: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
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
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вивід: "Hello" (вміст локалі за замовчуванням)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вивід: "Hello" (вміст локалі за замовчуванням)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Вивід: "Hello" (вміст локалі за замовчуванням)
```

### Використання власних типів вмісту:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вивід: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Вивід: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Виведе: "Bonjour"
```

## Особливі випадки

- **Локаль не знайдена:**
  - Коли `locale` не знайдено в `languageContent`, функція повертає вміст для локалі за замовчуванням.
- **Неповний вміст локалі:**
  - Якщо локаль частково визначена, функція не об'єднує вміст. Вона строго отримує значення заданої локалі або повертає локаль за замовчуванням.
- **Перевірка TypeScript:**
  - Якщо локалі в `languageContent` не відповідають конфігурації проєкту, TypeScript вимагатиме визначення всіх необхідних локалей, забезпечуючи повноту та типобезпеку вмісту.
