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
---

# Документация: функция `getMultilingualUrls` в `intlayer`

## Описание

Функция `getMultilingualUrls` генерирует отображение многоязычных URL, добавляя префикс с каждым поддерживаемым языком к заданному URL. Она может обрабатывать как абсолютные, так и относительные URL, применяя соответствующий префикс языка на основе предоставленной конфигурации или значений по умолчанию.

---

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

### Возвращаемое значение

- **Тип**: `IConfigLocales<string>`
- **Описание**: Объект, сопоставляющий каждый язык с соответствующим многоязычным URL.

---

## Пример использования

### Относительные URL

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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
// Конфигурация для поддержки локалей и локали по умолчанию
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
// Конфигурация для поддержки локалей и локали по умолчанию
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
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

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
