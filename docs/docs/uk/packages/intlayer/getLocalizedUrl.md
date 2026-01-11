---
createdAt: 2025-08-23
updatedAt: 2025-11-16
title: Документація функції getLocalizedUrl | intlayer
description: Дізнайтеся, як використовувати функцію getLocalizedUrl у пакеті intlayer
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Рефакторинг: використання параметра options з полем mode замість prefixDefault
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація: функція `getLocalizedUrl` у `intlayer`

## Опис

Функція `getLocalizedUrl` генерує локалізований URL, додаючи префікс з вказаною локаллю до переданого URL. Вона обробляє як абсолютні, так і відносні URL, гарантуючи застосування правильного локалізаційного префікса відповідно до конфігурації.

**Ключові особливості:**

- Потрібні лише 2 параметри: `url` та `currentLocale`
- Необов'язковий об'єкт `options` з полями `locales`, `defaultLocale` та `mode`
- Використовує конфігурацію інтернаціоналізації вашого проекту як значення за замовчуванням
- Може використовуватись з мінімальною кількістю параметрів для простих випадків або бути повністю налаштована для складніших сценаріїв
- Підтримує кілька режимів маршрутизації: `prefix-no-default`, `prefix-all`, `no-prefix` та `search-params`

---

## Підпис функції

```typescript
getLocalizedUrl(
  url: string,                   // Обов'язковий
  currentLocale: Locales,        // Обов'язковий
  options?: {                    // Необов'язковий
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Параметри

### Обов'язкові параметри

- `url: string`
  - **Опис**: Початковий рядок URL, якому буде додано префікс локалі.
  - **Тип**: `string`
  - **Обов'язковий**: Так

- `currentLocale: Locales`
  - **Опис**: Поточна локаль, для якої локалізується URL.
  - **Тип**: `Locales`
  - **Обов'язковий**: Так

### Необов'язкові параметри

- `options?: object`
  - **Опис**: Об'єкт конфігурації для поведінки локалізації URL.
  - **Тип**: `object`
  - **Обов'язковий**: Ні (Необов'язковий)

  - `options.locales?: Locales[]`
  - `options.locales?: Locales[]`
    - **Description**: Масив підтримуваних локалей. Якщо не вказано, використовуються локалі, налаштовані у конфігурації вашого проєкту.
    - **Type**: `Locales[]`
    - **Default**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Локаль за замовчуванням для застосунку. Якщо не вказано, використовується локаль за замовчуванням, налаштована у конфігурації вашого проєкту.
    - **Type**: `Locales`
    - **Default**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Опис**: Режим маршрутизації URL для обробки локалі. Якщо не вказано, використовується режим, налаштований у конфігурації проєкту.
    - **Тип**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **За замовчуванням**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)
    - **Режими**:
      - `prefix-no-default`: Без префіксу для локалі за замовчуванням, префікс для всіх інших
      - `prefix-all`: Префікс для всіх локалей, включаючи локаль за замовчуванням
      - `no-prefix`: Відсутність префіксу локалі в URL
      - `search-params`: Використовувати параметри запиту для локалі (наприклад, `?locale=fr`)

### Повертає

- **Тип**: `string`
- **Опис**: Локалізований URL для вказаної локалі.

---

## Приклад використання

### Основне використання (тільки обов'язкові параметри)

Коли ви налаштували свій проєкт з параметрами інтернаціоналізації, ви можете використовувати цю функцію, передавши лише обов'язкові параметри:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Використовує налаштування вашого проєкту для locales, defaultLocale та mode
getLocalizedUrl("/about", Locales.FRENCH);
// Вихід: "/fr/about" (за умови, що французька підтримується і режим 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Вихід: "/about" або "/en/about" (залежно від налаштування режиму)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Використовує налаштування вашого проєкту
getLocalizedUrl("/about", Locales.FRENCH);
// Вихід: "/fr/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Використовує конфігурацію вашого проєкту
getLocalizedUrl("/about", Locales.FRENCH);
// Вивід: "/fr/about"
```

### Розширене використання (з необов'язковими параметрами)

Ви можете перевизначити конфігурацію за замовчуванням, передавши необов'язковий параметр `options`:

### Відносні URL (вказано всі параметри)

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Явно вказуємо всі необов'язкові параметри
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "/fr/about" для французької локалі

getLocalizedUrl("/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "/about" для мови за замовчуванням (English)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Явне вказання всіх необов'язкових параметрів
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "/fr/about" для французької локалі
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Явне вказання всіх необов'язкових параметрів
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "/fr/about" для французької локалі
```

### Часткове перевизначення конфігурації

Ви також можете вказати лише деякі з необов'язкових параметрів. Функція використовуватиме конфігурацію вашого проєкту для параметрів, які ви не вкажете:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Перевизначити лише locales, використати конфіг проєкту для defaultLocale та mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Перевизначити лише mode, використати конфіг проєкту для locales та defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Примусово додавати префікс для всіх локалей, включно зі значенням за замовчуванням
});

// Перевизначити кілька опцій
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Використати параметри запиту: /about?locale=fr
});
```

### Абсолютні URL-адреси

```typescript
getLocalizedUrl("https://example.com/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "https://example.com/fr/about" для французької локалі

getLocalizedUrl("https://example.com/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "https://example.com/about" для англійської (без префікса для мови за замовчуванням)

getLocalizedUrl("https://example.com/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Вивід: "https://example.com/en/about" для англійської (префікс для всіх)

getLocalizedUrl("https://example.com/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Вивід: "https://example.com/about?locale=fr" (використовуючи параметри запиту)
```

### Непідтримувана локаль

```typescript
getLocalizedUrl("/about", Locales.ITALIAN, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: "/about" (жодного префікса не застосовано для непідтримуваної локалі)
```

---

## Особливі випадки

- **Відсутній сегмент локалі:**
  - Якщо URL не містить сегмента локалі, функція коректно додає відповідну локаль як префікс залежно від режиму маршрутизації.

- **Локаль за замовчуванням:**
  - Якщо `mode` дорівнює `'prefix-no-default'`, функція не додає префікс до URL для локалі за замовчуванням.
  - Якщо `mode` дорівнює `'prefix-all'`, функція додає префікси для всіх локалей, включаючи локаль за замовчуванням.

- **Непідтримувані локалі:**
  - Для локалей, які не перелічені в `locales`, функція не застосовує жодного префіксу.

- **Режими маршрутизації:**
  - `'prefix-no-default'`: локаль за замовчуванням без префікса, інші мають префікс (наприклад, `/about`, `/fr/about`)
  - `'prefix-all'`: всі локалі мають префікси (наприклад, `/en/about`, `/fr/about`)
  - `'no-prefix'`: префіксів локалі у URL немає (локаль обробляється в іншому місці)
  - `'search-params'`: Локаль вказується через параметр запиту (наприклад, `/about?locale=fr`)

---

## Використання у застосунках

У багатомовному застосунку конфігурація налаштувань інтернаціоналізації через `locales` та `defaultLocale` є критичною для забезпечення відображення правильної мови. Нижче наведено приклад того, як `getLocalizedUrl` можна використовувати в налаштуванні застосунку:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Конфігурація для підтримуваних локалей та локалі за замовчуванням
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Вищенаведена конфігурація гарантує, що застосунок розпізнає `ENGLISH`, `FRENCH` і `SPANISH` як підтримувані мови та використовує `ENGLISH` як мову за замовчуванням.

За цією конфігурацією функція `getLocalizedUrl` може динамічно створювати локалізовані URL-адреси залежно від мовних налаштувань користувача:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Вивід: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Вивід: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Вивід: "/about"
```

Інтегруючи `getLocalizedUrl`, розробники можуть зберігати узгоджену структуру URL-адрес у кількох мовах, покращуючи як зручність для користувачів, так і SEO.
