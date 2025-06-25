---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация функции getMultilingualUrls | intlayer
description: Узнайте, как использовать функцию getMultilingualUrls для пакета intlayer
keywords:
  - getMultilingualUrls
  - перевод
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# Документация: Функция `getMultilingualUrls` в `intlayer`

## Описание

Функция `getMultilingualUrls` генерирует сопоставление многоязычных URL-адресов, добавляя к заданному URL-адресу префикс для каждого поддерживаемого языка. Она может обрабатывать как абсолютные, так и относительные URL-адреса, применяя соответствующий языковой префикс на основе предоставленной конфигурации или значений по умолчанию.

---

## Параметры

- `url: string`

  - **Описание**: Исходная строка URL-адреса, к которой будут добавлены языковые префиксы.
  - **Тип**: `string`

- `locales: Locales[]`

  - **Описание**: Необязательный массив поддерживаемых языков. По умолчанию используется конфигурация языков в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: `localesDefault`

- `defaultLocale: Locales`

  - **Описание**: Язык по умолчанию для приложения. По умолчанию используется конфигурация языка по умолчанию в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Описание**: Указывает, следует ли добавлять префикс для языка по умолчанию. По умолчанию используется значение из конфигурации проекта.
  - **Тип**: `boolean`
  - **По умолчанию**: `prefixDefaultDefault`

### Возвращает

- **Тип**: `IConfigLocales<string>`
- **Описание**: Объект, сопоставляющий каждый язык с соответствующим многоязычным URL-адресом.

---

## Пример использования

### Относительные URL-адреса

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

### Абсолютные URL-адреса

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

## Граничные случаи

- **Отсутствие языкового сегмента:**

  - Функция удаляет любой существующий языковой сегмент из URL-адреса перед генерацией многоязычных сопоставлений.

- **Язык по умолчанию:**

  - Если `prefixDefault` имеет значение `false`, функция не добавляет префикс для URL-адреса языка по умолчанию.

- **Неподдерживаемые языки:**
  - Для генерации URL-адресов учитываются только языки, указанные в массиве `locales`.

---

## Использование в приложениях

В многоязычном приложении настройка параметров интернационализации с помощью `locales` и `defaultLocale` является критически важной для обеспечения правильного отображения языка. Ниже приведен пример использования функции `getMultilingualUrls` в настройке приложения:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Конфигурация поддерживаемых языков и языка по умолчанию
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

Используя эту конфигурацию, функция `getMultilingualUrls` может динамически генерировать многоязычные сопоставления URL-адресов на основе поддерживаемых языков приложения:

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

Интеграция `getMultilingualUrls` позволяет разработчикам поддерживать согласованную структуру URL-адресов для разных языков, улучшая как пользовательский опыт, так и SEO.
