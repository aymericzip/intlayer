---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getMultilingualUrls | intlayer
description: Узнайте, как использовать функцию getMultilingualUrls для пакета intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Документация: функция `getMultilingualUrls` в `intlayer`

## Описание

Функция `getMultilingualUrls` генерирует отображение многоязычных URL-адресов путём добавления префикса локали к заданному URL-адресу. Она может обрабатывать как абсолютные, так и относительные URL-адреса, применяя подходящий префикс локали на основе предоставленной конфигурации или значений по умолчанию.

**Ключевые возможности:**

- Требуется только 1 параметр: `url`
- Опциональный объект `options` с параметрами `locales`, `defaultLocale` и `mode`
- Использует конфигурацию интернационализации вашего проекта в качестве значений по умолчанию
- Поддерживает несколько режимов маршрутизации: `prefix-no-default`, `prefix-all`, `no-prefix` и `search-params`
- Возвращает объект отображения со всеми локалями в качестве ключей и соответствующими URL-адресами в качестве значений

---

## Описание

Функция `getMultilingualUrls` генерирует отображение многоязычных URL, добавляя префикс с каждым поддерживаемым языком к заданному URL. Она может обрабатывать как абсолютные, так и относительные URL, применяя соответствующий префикс языка на основе предоставленной конфигурации или значений по умолчанию.

---

## Параметры

## Параметры

- `url: string`
  - **Описание**: Исходная строка URL, к которой будут добавлены префиксы языков.
  - **Тип**: `string`

- `locales: Locales[]`
  - **Описание**: Необязательный массив поддерживаемых языков. По умолчанию используется конфигурируемый список языков в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: `localesDefault`

- `defaultLocale: Locales`
  - **Описание**: Язык по умолчанию для приложения. По умолчанию используется конфигурируемый язык по умолчанию в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Описание**: Нужно ли добавлять префикс для языка по умолчанию. По умолчанию используется настроенное значение в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: `prefixDefaultDefault`

### Опциональные параметры

- `options?: object`
  - **Description**: Объект конфигурации для поведения локализации URL.
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: Массив поддерживаемых локалей. Если не предоставлен, использует настроенные локали из конфигурации вашего проекта.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Локаль по умолчанию для приложения. Если не предоставлена, использует настроенную локаль по умолчанию из конфигурации вашего проекта.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Режим маршрутизации URL для обработки локалей. Если не предоставлен, использует настроенный режим из конфигурации вашего проекта.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Без префикса для локали по умолчанию, с префиксом для всех остальных
      - `prefix-all`: Префикс для всех локалей, включая локаль по умолчанию
      - `no-prefix`: Без префикса локали в URL
      - `search-params`: Использование параметров запроса для локали (например, `?locale=fr`)

### Возвращаемое значение

- **Тип**: `IConfigLocales<string>`
- **Описание**: Объект, сопоставляющий каждый язык с соответствующим многоязычным URL.

---

## Пример использования

### Базовое использование (использует конфигурацию проекта)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Использует конфигурацию вашего проекта для локалей, defaultLocale и mode
getMultilingualUrls("/dashboard");
// Output (assuming project config has en, fr with mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Относительные URL

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Вывод: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Абсолютные URL

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Вывод: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### Различные режимы маршрутизации

```typescript
// prefix-no-default: Без префикса для локали по умолчанию
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Префикс для всех локалей
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Без префикса локали в URL-адресах
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Локаль в качестве параметра запроса
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Особые случаи

- **Отсутствие сегмента языка:**
  - Функция удаляет любой существующий сегмент локали из URL перед генерацией многоязычных отображений.

- **Локаль по умолчанию:**
  - Когда `prefixDefault` равно `false`, функция не добавляет префикс к URL для локали по умолчанию.

- **Неподдерживаемые локали:**
  - Для генерации URL учитываются только локали, указанные в массиве `locales`.

---

## Использование в приложениях

В многоязычном приложении настройка параметров интернационализации с помощью `locales` и `defaultLocale` имеет решающее значение для отображения правильного языка. Ниже приведён пример того, как `getMultilingualUrls` может использоваться в настройках приложения:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Конфигурация поддерживаемых локалей и локали по умолчанию
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

Данная конфигурация гарантирует, что приложение распознает `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемые языки и использует `ENGLISH` в качестве языка по умолчанию.

Используя эту конфигурацию, функция `getMultilingualUrls` может динамически генерировать многозначные URL-адреса на основе поддерживаемых локалей приложения:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Вывод:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Вывод:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Интегрируя `getMultilingualUrls`, разработчики могут поддерживать согласованную структуру URL-адресов на нескольких языках, улучшая как пользовательский опыт, так и SEO.
