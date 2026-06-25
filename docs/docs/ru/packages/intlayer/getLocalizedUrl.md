---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getLocalizedUrl | intlayer
description: Узнайте, как использовать функцию getLocalizedUrl для пакета intlayer
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Документация: функция `getLocalizedUrl` в `intlayer`

## Описание

Функция `getLocalizedUrl` генерирует локализованный URL, добавляя префикс с указанной локалью к заданному URL. Она обрабатывает как абсолютные, так и относительные URL, обеспечивая правильное применение префикса локали на основе конфигурации.

**Основные возможности:**

- Требуются только 2 параметра: `url` и `currentLocale`
- Опциональный объект `options` с `locales`, `defaultLocale` и `mode`
- Использует конфигурацию интернационализации вашего проекта по умолчанию
- Может использоваться с минимальными параметрами для простых случаев или полностью настраиваться для сложных сценариев
- Поддерживает несколько режимов маршрутизации: `prefix-no-default`, `prefix-all`, `no-prefix` и `search-params`

---

## Сигнатура функции

```typescript
getLocalizedUrl(
  url: string,                   // Обязательно
  currentLocale: Locales,        // Обязательно
  options?: {                    // Опционально
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Параметры

## Описание

Функция `getLocalizedUrl` генерирует локализованный URL, добавляя в начало заданного URL указанный локаль. Она обрабатывает как абсолютные, так и относительные URL, обеспечивая применение правильного префикса локали в соответствии с конфигурацией.

---

## Параметры

- `url: string`
  - **Описание**: Исходная строка URL, к которой будет добавлен префикс локали.
  - **Тип**: `string`

- `currentLocale: Locales`
  - **Описание**: Текущая локаль, для которой локализуется URL.
  - **Тип**: `Locales`

- `locales: Locales[]`
  - **Описание**: Необязательный массив поддерживаемых локалей. По умолчанию используются локали, настроенные в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

- `defaultLocale: Locales`
  - **Описание**: Локаль по умолчанию для приложения. По умолчанию используется локаль по умолчанию, настроенная в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Описание**: Нужно ли добавлять префикс для локали по умолчанию. По умолчанию используется значение, настроенное в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

### Возвращает

- **Тип**: `string`
- **Описание**: Локализованный URL для указанной локали.

---

## Пример использования

### Базовое использование (только необходимые параметры)

Когда вы настроили свой проект с параметрами интернационализации, вы можете использовать функцию только с необходимыми параметрами:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// Использует конфигурацию вашего проекта для locales, defaultLocale и mode
getLocalizedUrl("/about", Locales.FRENCH);
// Вывод: "/fr/about" (при условии, что французский поддерживается и mode установлен на 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Вывод: "/about" или "/en/about" (в зависимости от параметра mode)
```

### Advanced Usage (With Optional Parameters)

Вы можете переопределить конфигурацию по умолчанию, предоставив необязательный параметр `options`:

### Относительные URL

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Вывод: "/fr/about" для французской локали
// Вывод: "/about" для локали по умолчанию (английский)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Вывод: "/fr/about" для французской локали
// Вывод: "/about" для локали по умолчанию (английский)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Вывод: "/fr/about" для французской локали
// Вывод: "/about" для локали по умолчанию (английский)
```

### Частичное переопределение конфигурации

Вы также можете предоставить только некоторые необязательные параметры. Функция будет использовать конфигурацию вашего проекта для любых параметров, которые вы не указали:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Переопределить только locales, использовать конфигурацию проекта для defaultLocale и mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Переопределить только mode, использовать конфигурацию проекта для locales и defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Принудительный префикс для всех локалей, включая значение по умолчанию
});

// Переопределить несколько опций
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Использовать параметры запроса: /about?locale=fr
});
```

### Абсолютные URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  false // Добавлять префикс для локали по умолчанию
); // Вывод: "https://example.com/fr/about" для французской локали

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  false // Добавлять префикс для локали по умолчанию
); // Вывод: "https://example.com/about" для английской локали

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  true // Добавлять префикс для локали по умолчанию
); // Вывод: "https://example.com/en/about" для английской локали
```

### Неподдерживаемая локаль

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH // Локаль по умолчанию
); // Вывод: "/about" (префикс не применяется для неподдерживаемой локали)
```

---

## Особые случаи

- **Отсутствие сегмента локали:**
  - Если URL не содержит сегмента локали, функция безопасно добавляет соответствующую локаль в префикс.

- **Локаль по умолчанию:**
  - Когда `prefixDefault` равно `false`, функция не добавляет префикс для URL локали по умолчанию.

- **Неподдерживаемые локали:**
  - Для локалей, не указанных в списке `locales`, функция не применяет никакого префикса.

---

## Использование в приложениях

В многоязычном приложении настройка параметров интернационализации с помощью `locales` и `defaultLocale` имеет решающее значение для обеспечения отображения правильного языка. Ниже приведён пример того, как функция `getLocalizedUrl` может использоваться в настройках приложения:

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

Данная конфигурация гарантирует, что приложение распознаёт `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемые языки и использует `ENGLISH` в качестве языка по умолчанию.

Используя эту конфигурацию, функция `getLocalizedUrl` может динамически генерировать локализованные URL-адреса в зависимости от предпочтений языка пользователя:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Вывод: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Вывод: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Вывод: "/about"
```

Интегрируя `getLocalizedUrl`, разработчики могут поддерживать единообразную структуру URL на нескольких языках, улучшая как пользовательский опыт, так и SEO.
