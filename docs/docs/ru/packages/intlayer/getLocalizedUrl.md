---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация функции getLocalizedUrl | intlayer
description: Узнайте, как использовать функцию getLocalizedUrl для пакета intlayer
keywords:
  - getLocalizedUrl
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `getLocalizedUrl` в `intlayer`

## Описание

Функция `getLocalizedUrl` генерирует локализованный URL, добавляя префикс с указанной локалью к заданному URL. Она обрабатывает как абсолютные, так и относительные URL, гарантируя, что правильный префикс локали применяется на основе конфигурации.

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

  - **Описание**: Локаль по умолчанию для приложения. По умолчанию используется локаль, настроенная в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Описание**: Указывает, нужно ли добавлять префикс к URL для локали по умолчанию. По умолчанию используется значение, настроенное в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md#middleware)

### Возвращаемое значение

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
  false // Префикс для локали по умолчанию
); // Вывод: "https://example.com/fr/about" для французской локали

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  false // Префикс для локали по умолчанию
); // Вывод: "https://example.com/about" для английской локали

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  true // Префикс для локали по умолчанию
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

  - Если URL не содержит сегмента локали, функция безопасно добавляет соответствующий префикс локали.

- **Локаль по умолчанию:**

  - Когда `prefixDefault` равно `false`, функция не добавляет префикс к URL для локали по умолчанию.

- **Неподдерживаемые локали:**
  - Для локалей, не указанных в `locales`, функция не применяет префикс.

---

## Использование в приложениях

В многоязычном приложении настройка параметров интернационализации с помощью `locales` и `defaultLocale` является критически важной для обеспечения отображения правильного языка. Ниже приведен пример использования функции `getLocalizedUrl` в настройке приложения:

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

Эта конфигурация гарантирует, что приложение распознает `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемые языки и использует `ENGLISH` в качестве резервного языка.

Используя эту конфигурацию, функция `getLocalizedUrl` может динамически генерировать локализованные URL на основе предпочтений пользователя:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Вывод: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Вывод: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Вывод: "/about"
```

Интеграция `getLocalizedUrl` позволяет разработчикам поддерживать согласованную структуру URL для нескольких языков, улучшая пользовательский опыт и SEO.
