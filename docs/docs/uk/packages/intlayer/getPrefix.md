---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Документація функції getPrefix | intlayer
description: Дивіться, як використовувати функцію getPrefix для пакета intlayer
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Початкова документація
---

# Документація: функція `getPrefix` в `intlayer`

## Опис

Функція `getPrefix` визначає префікс URL для заданої локалі на основі конфігурації режиму маршрутизації. Вона порівнює локаль з локаллю за замовчуванням і повертає об'єкт, що містить три різні формати префіксів для гнучкого побудови URL.

**Ключові особливості:**

- Приймає локаль як перший параметр (обов'язково)
- Необов'язковий об'єкт `options` з полями `defaultLocale` та `mode`
- Повертає об'єкт з властивостями `prefix` та `localePrefix`
- Підтримує всі режими маршрутизації: `prefix-no-default`, `prefix-all`, `no-prefix` та `search-params`
- Легка утиліта для визначення, коли додавати префікси локалі

---

## Підпис функції

```typescript
getPrefix(
  locale: Locales,               // Обов'язково
  options?: {                    // Необов'язково
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // напр., 'fr/' або ''
  localePrefix?: Locale; // напр., 'fr' або undefined
}
```

---

## Параметри

- `locale: Locales`
  - **Опис**: Локаль, для якої потрібно згенерувати префікс. Якщо значення є falsy (undefined, null, порожній рядок), функція повертає порожній рядок.
  - **Тип**: `Locales`
  - **Обов'язкове**: Так

- `options?: object`
  - **Опис**: Об'єкт конфігурації для визначення префіксу.
  - **Тип**: `object`
  - **Обов'язкове**: Ні (Необов'язково)

  - `options.defaultLocale?: Locales`
    - **Опис**: Локаль за замовчуванням для застосунку. Якщо не вказано, використовується налаштована локаль за замовчуванням з конфігурації вашого проєкту.
    - **Тип**: `Locales`
    - **За замовчуванням**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Опис**: Режим маршрутизації URL для обробки локалі. Якщо не вказано, використовується режим, налаштований у конфігурації вашого проєкту.
    - **Тип**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **За замовчуванням**: [`Конфігурація проєкту`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md#middleware)
    - **Режими**:
      - `prefix-no-default`: Повертає порожні рядки, коли локаль збігається з локаллю за замовчуванням
      - `prefix-all`: Повертає префікс для всіх локалей, включно з локаллю за замовчуванням
      - `no-prefix`: Повертає порожні рядки (без префікса в URL)
      - `search-params`: Повертає порожні рядки (локаль у параметрах запиту)

### Повертає

- **Тип**: `GetPrefixResult`
- **Опис**: Об'єкт, що містить три різні формати префіксів:
  - `prefix`: Префікс шляху з кінцевим слешем (наприклад, `'fr/'`, `''`)
  - `localePrefix`: Ідентифікатор локалі без слешів (наприклад, `'fr'`, `undefined`)

---

## Приклад використання

### Базове використання

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Перевірка префіксу для англійської локалі
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Повертає: { prefix: 'en/', localePrefix: 'en' }

// Перевірка префіксу для французької локалі
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Повертає: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Повертає: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Повертає: { prefix: '', localePrefix: undefined }
```

### Різні режими маршрутизації

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Завжди повертає префікс
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Повертає: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Без префікса, коли локаль збігається зі значенням за замовчуванням
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Повертає: { prefix: '', localePrefix: undefined }

// prefix-no-default: Повертає префікс, коли локаль відрізняється від локалі за замовчуванням
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Повертає: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Ніколи не повертає префікс
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Повертає: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Повертає: { prefix: '', localePrefix: undefined }
```

### Практичний приклад

```typescript
import { getPrefix, Locales } from "intlayer";

// Формуємо URL з відповідним префіксом для конкретної локалі
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Використання prefix для побудови шляху
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Результат: "/fr/about"

// Використання localePrefix для ідентифікації локалі
console.log(`Current locale: ${localePrefix}`);
// Вивід: "Current locale: fr"
```

---

## Пов'язані функції

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md): Генерує локалізований URL для певної локалі
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getMultilingualUrls.md): Генерує URL-адреси для всіх налаштованих локалей

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Префікс шляху з кінцевим слешем (наприклад, 'fr/' або '')
  localePrefix?: Locale; // Ідентифікатор локалі без слешів (наприклад, 'fr' або undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
