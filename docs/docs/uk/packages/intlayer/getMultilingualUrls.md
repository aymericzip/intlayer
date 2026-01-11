---
createdAt: 2025-08-23
updatedAt: 2025-11-16
title: Документація функції getMultilingualUrls | intlayer
description: Дізнайтеся, як використовувати функцію getMultilingualUrls у пакеті intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Refactored to use options parameter with mode instead of prefixDefault
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Документація: функція `getMultilingualUrls` в `intlayer`

## Опис

Функція `getMultilingualUrls` генерує відображення багатомовних URL, додаючи префікс локалі до заданого URL для кожної підтримуваної локалі. Вона може обробляти як абсолютні, так і відносні URL, застосовуючи відповідний префікс локалі на основі наданої конфігурації або значень за замовчуванням.

**Ключові особливості:**

- Потрібен лише один параметр: `url`
- Необов'язковий об'єкт `options` з полями `locales`, `defaultLocale` та `mode`
- Використовує конфігурацію інтернаціоналізації вашого проєкту за замовчуванням
- Підтримує кілька режимів маршрутизації: `prefix-no-default`, `prefix-all`, `no-prefix` та `search-params`
- Повертає об'єкт-мапу, де ключами є всі локалі, а значеннями — відповідні URL

---

## Підпис функції

```typescript
getMultilingualUrls(
  url: string,                   // Обов'язково
  options?: {                    // Необов'язково
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Параметри

### Обов'язкові параметри

- `url: string`
  - **Опис**: Початковий рядок URL, до якого будуть додані префікси локалей.
  - **Тип**: `string`
  - **Обов'язково**: Так

### Необов'язкові параметри

- `options?: object`
  - **Опис**: Об'єкт конфігурації для поведінки локалізації URL.
  - **Тип**: `object`
  - **Обов'язково**: Ні (Необов'язково)

  - `options.locales?: Locales[]`
    - **Опис**: Масив підтримуваних локалей. Якщо не вказано, використовуються налаштовані локалі з конфігурації вашого проєкту.
    - **Тип**: `Locales[]`
    - **За замовчуванням**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Опис**: Мова за замовчуванням для додатка. Якщо не вказано, використовується мова за замовчуванням, налаштована у конфігурації вашого проєкту.
    - **Тип**: `Locales`
    - **За замовчуванням**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Опис**: Режим маршрутизації URL для обробки локалі. Якщо не вказано, використовується режим, налаштований у конфігурації вашого проєкту.
    - **Тип**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **За замовчуванням**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)
    - **Режими**:
      - `prefix-no-default`: Без префікса для мови за замовчуванням, префікс для всіх інших
      - `prefix-all`: Префікс для всіх мов, включно зі мовою за замовчуванням
      - `no-prefix`: Немає префікса локалі в URL
      - `search-params`: Використовувати параметри запиту для локалі (наприклад, `?locale=fr`)

### Повертає

- **Тип**: `StrictModeLocaleMap<string>`
- **Опис**: Об'єкт, який зіставляє кожну локаль з відповідним багатомовним URL.

---

## Приклад використання

### Базове використання (використовує конфігурацію проєкту)

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

// Використовує конфігурацію вашого проєкту для locales, defaultLocale і mode
getMultilingualUrls("/dashboard");
// Вивід (припускаючи, що в конфігурації проєкту є en і fr з mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard");
// Вивід: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls("/dashboard");
// Вивід: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Відносні URL з опціями

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Абсолютні URL-адреси

```typescript
getMultilingualUrls("https://example.com/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Вивід: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

### Різні режими маршрутизації

```typescript
// prefix-no-default: Без префіксу для локалі за замовчуванням
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Префікс для всіх локалей
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Вихід: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Відсутній префікс локалі в URL
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Вихід: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Локаль як параметр запиту
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Вихід: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Крайні випадки

- **Відсутній сегмент локалі:**
  - Функція видаляє будь-який існуючий сегмент локалі з URL перед генерацією багатомовних відповідностей.

- **Локаль за замовчуванням:**
  - Коли `mode` дорівнює `'prefix-no-default'`, функція не додає префікс до URL для локалі за замовчуванням.
  - Коли `mode` дорівнює `'prefix-all'`, функція додає префікси для всіх локалей, включно з локаллю за замовчуванням.

- **Непідтримувані локалі:**
  - Лише локалі, вказані в масиві locales, враховуються під час генерації URL.

- **Режими маршрутизації:**
  - `'prefix-no-default'`: для локалі за замовчуванням префікс відсутній, для інших — є (наприклад, `/dashboard`, `/fr/dashboard`)
  - `'prefix-all'`: усі локалі мають префікси (наприклад, `/en/dashboard`, `/fr/dashboard`)
  - `'no-prefix'`: Немає префіксів локалі в URL (для всіх локалей повертається той самий URL)
  - `'search-params'`: Локаль вказується через параметр запиту (наприклад, `/dashboard?locale=fr`)

---

## Використання в застосунках

У багатомовному застосунку налаштування параметрів інтернаціоналізації через `locales` та `defaultLocale` є критично важливим для забезпечення відображення правильної мови. Нижче наведено приклад того, як `getMultilingualUrls` може бути використана в конфігурації застосунку:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Конфігурація підтримуваних локалей та локалі за замовчуванням
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

Показана вище конфігурація гарантує, що додаток розпізнає `ENGLISH`, `FRENCH` і `SPANISH` як підтримувані мови та використовує `ENGLISH` як мову за замовчуванням.

З цією конфігурацією функція `getMultilingualUrls` може динамічно генерувати відповідності багатомовних URL на основі підтримуваних у додатку локалей:

```typescript
// Використання конфігурації проєкту (опції не потрібні)
getMultilingualUrls("/dashboard");
// Вивід:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// З явними опціями
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Вивід:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// Абсолютні URL з режимом "prefix-all"
getMultilingualUrls("https://example.com/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Вивід:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Інтегруючи `getMultilingualUrls`, розробники можуть підтримувати узгоджену структуру URL для кількох мов, що покращує як досвід користувача, так і SEO.
