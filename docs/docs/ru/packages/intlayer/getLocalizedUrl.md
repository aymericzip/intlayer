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
    changes: Инициализация истории
---

# Документация: функция `getLocalizedUrl` в `intlayer`

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

### Относительные URL

```typescript codeFormat="typescript"
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

```tsx codeFormat="typescript"
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

Данная конфигурация гарантирует, что приложение распознаёт `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемые языки и использует `ENGLISH` в качестве языка по умолчанию.

Используя эту конфигурацию, функция `getLocalizedUrl` может динамически генерировать локализованные URL-адреса в зависимости от предпочтений языка пользователя:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Вывод: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Вывод: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Вывод: "/about"
```

Интегрируя `getLocalizedUrl`, разработчики могут поддерживать единообразную структуру URL на нескольких языках, улучшая как пользовательский опыт, так и SEO.
