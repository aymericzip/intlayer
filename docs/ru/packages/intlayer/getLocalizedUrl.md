# Документация: Функция `getLocalizedUrl` в `intlayer`

## Описание:

Функция `getLocalizedUrl` генерирует локализованный URL, добавляя указанный язык в начало данного URL. Она обрабатывает как абсолютные, так и относительные URL, гарантируя, что правильный префикс языка применяется в зависимости от конфигурации.

---

## Параметры:

- `url: string`

  - **Описание**: Исходная строка URL, к которой будет добавлен язык.
  - **Тип**: `string`

- `currentLocale: Locales`

  - **Описание**: Текущий язык, для которого происходит локализация URL.
  - **Тип**: `Locales`

- `locales: Locales[]`

  - **Описание**: Необязательный массив поддерживаемых языков. По умолчанию предоставляются сконфигурированные языки в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: [`Настройки проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Описание**: Язык по умолчанию для приложения. По умолчанию предоставляются сконфигурированный язык по умолчанию в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: [`Настройки проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Описание**: Нужно ли добавлять префикс языка для языка по умолчанию. По умолчанию предоставляется сконфигурированное значение в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: [`Настройки проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#middleware)

### Возвращает:

- **Тип**: `string`
- **Описание**: Локализованный URL для указанного языка.

---

## Пример использования:

### Относительные URL:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Вывод: "/fr/about" для французского языка
// Вывод: "/about" для языка по умолчанию (английский)
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

// Вывод: "/fr/about" для французского языка
// Вывод: "/about" для языка по умолчанию (английский)
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

// Вывод: "/fr/about" для французского языка
// Вывод: "/about" для языка по умолчанию (английский)
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

// Вывод: "/fr/about" для французского языка
// Вывод: "/about" для языка по умолчанию (английский)
```

### Абсолютные URL:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Текущий язык
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые языки
  Locales.ENGLISH, // Язык по умолчанию
  false // Префикс языка по умолчанию
); // Вывод: "https://example.com/fr/about" для французского языка

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущий язык
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые языки
  Locales.ENGLISH, // Язык по умолчанию
  false // Префикс языка по умолчанию
); // Вывод: "https://example.com/about" для английского языка

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущий язык
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые языки
  Locales.ENGLISH, // Язык по умолчанию
  true // Префикс языка по умолчанию
); // Вывод: "https://example.com/en/about" для английского языка
```

### Неподдерживаемый язык:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Текущий язык
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые языки
  Locales.ENGLISH // Язык по умолчанию
); // Вывод: "/about" (префикс не добавлен для неподдерживаемого языка)
```

---

## Граничные случаи:

- **Отсутствие сегмента языка:**

  - Если URL не содержит сегмента языка, функция безопасно добавляет соответствующий язык.

- **Язык по умолчанию:**

  - Когда `prefixDefault` равно `false`, функция не добавляет префикс к URL для языка по умолчанию.

- **Неподдерживаемые языки:**
  - Для языков, не указанных в `locales`, функция не добавляет никакого префикса.

---

## Использование в приложениях:

В многоязычном приложении важно настроить параметры интернационализации с помощью `locales` и `defaultLocale` для обеспечения отображения правильного языка. Ниже приведен пример того, как `getLocalizedUrl` можно использовать в настройках приложения:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Конфигурация для поддерживаемых языков и языка по умолчанию
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

Вышеуказанная конфигурация гарантирует, что приложение распознает `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемые языки и использует `ENGLISH` как запасной язык.

Используя эту конфигурацию, функция `getLocalizedUrl` может динамически генерировать локализованные URL на основе предпочтений языка пользователя:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Вывод: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Вывод: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Вывод: "/about"
```

Интегрируя `getLocalizedUrl`, разработчики могут поддерживать согласованную структуру URL на нескольких языках, улучшая как пользовательский опыт, так и SEO.
