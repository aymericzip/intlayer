---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація функції getConfiguration | intlayer
description: Дізнайтесь, як використовувати функцію getConfiguration для пакета intlayer
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getConfiguration` у `intlayer`

## Опис

Функція `getConfiguration` отримує повну конфігурацію для застосунку `intlayer`, витягуючи змінні оточення. Ця функція дає змогу використовувати одну й ту саму конфігурацію як на клієнтській, так і на серверній стороні, забезпечуючи узгодженість по всьому застосунку.

---

## Параметри

Функція не приймає жодних параметрів. Замість цього вона використовує змінні оточення для налаштування.

### Повертає

- **Тип**: `IntlayerConfig`
- **Опис**: Об'єкт, що містить повну конфігурацію для `intlayer`. Конфігурація включає такі розділи:
  - `internationalization`: Налаштування, пов'язані з локалями та strict mode.
  - `middleware`: Налаштування, пов'язані з керуванням URL та cookie.
  - `content`: Налаштування, пов'язані з файлами контенту, директоріями та шаблонами.
  - `editor`: Налаштування, специфічні для редактора.

Див. [документацію з конфігурації Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для отримання додаткової інформації.

---

## Приклад використання

### Отримання повної конфігурації

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Вивід:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Вивід:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Вивід:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Отримання `availableLocales` та `defaultLocale`

Розділ `internationalization` конфігурації надає налаштування, пов'язані з локалями, такі як `locales` (доступні локалі) та `defaultLocale` (мова за замовчуванням).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Приклад виводу: ["en", "fr", "es"]
console.log(defaultLocale); // Приклад виводу: "en"
console.log(cookieName); // Вивід: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Приклад виводу: ["en", "fr", "es"]
console.log(defaultLocale); // Приклад виводу: "en"
console.log(cookieName); // Вивід: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Приклад виводу: ["en", "fr", "es"]
console.log(defaultLocale); // Приклад виводу: "en"
console.log(cookieName); // Вивід: "INTLAYER_LOCALE"
```

## Примітки

- Переконайтеся, що всі необхідні змінні середовища правильно встановлені перед викликом цієї функції. Відсутні змінні спричинять помилки під час ініціалізації.
- Цю функцію можна використовувати як на клієнті, так і на сервері, що робить її універсальним інструментом для керування конфігураціями в уніфікований спосіб.

## Використання в застосунках

Функція `getConfiguration` є ключовою утилітою для ініціалізації та керування конфігурацією застосунку `intlayer`. Надаючи доступ до налаштувань, таких як locales, middleware та content directories, вона забезпечує узгодженість і масштабованість багатомовних і контент-орієнтованих застосунків.
