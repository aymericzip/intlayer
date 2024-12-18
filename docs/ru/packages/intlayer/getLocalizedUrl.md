# Документация: Функция `getLocalizedUrl` в `intlayer`

## Описание:

Функция `getLocalizedUrl` генерирует локализованный URL, добавляя префикс с указанной локалью к заданному URL. Она обрабатывает как абсолютные, так и относительные URL, обеспечивая применение правильного префикса локали в зависимости от конфигурации.

---

## Параметры:

- `url: string`

  - **Описание**: Исходная строка URL, к которой будет добавлен префикс с локалью.
  - **Тип**: `string`

- `currentLocale: Locales`

  - **Описание**: Текущая локаль, для которой локализуется URL.
  - **Тип**: `Locales`

- `locales: Locales[]`

  - **Описание**: Необязательный массив поддерживаемых локалей. По умолчанию предоставляются сконфигурированные локали в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Описание**: Локаль по умолчанию для приложения. По умолчанию предоставляется сконфигурированная локаль по умолчанию в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Описание**: Нужно ли добавлять префикс к URL для локали по умолчанию. По умолчанию предоставляется сконфигурированное значение в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: [`Конфигурация проекта`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md#middleware)

### Возвращает:

- **Тип**: `string`
- **Описание**: Локализованный URL для указанной локали.

---

## Пример использования:

### Относительные URL:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Выход: "/fr/about" для французской локали
// Выход: "/about" для локали по умолчанию (английской)
```

### Абсолютные URL:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  false // Префикс локали по умолчанию
); // Выход: "https://example.com/fr/about" для французской

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  false // Префикс локали по умолчанию
); // Выход: "https://example.com/about" для английской

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH, // Локаль по умолчанию
  true // Префикс локали по умолчанию
); // Выход: "https://example.com/en/about" для английской
```

### Неподдерживаемая локаль:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Текущая локаль
  [Locales.ENGLISH, Locales.FRENCH], // Поддерживаемые локали
  Locales.ENGLISH // Локаль по умолчанию
); // Выход: "/about" (префикс не применен для неподдерживаемой локали)
```

---

## Граничные случаи:

- **Нет сегмента локали:**

  - Если URL не содержит сегмента локали, функция безопасно добавляет соответствующий префикс локали.

- **Локаль по умолчанию:**

  - Когда `prefixDefault` равен `false`, функция не добавляет префикс к URL для локали по умолчанию.

- **Неподдерживаемые локали:**
  - Для локалей, не перечисленных в `locales`, функция не добавляет никаких префиксов.

---

## Использование в приложениях:

В многоязычном приложении настройка международных параметров с `locales` и `defaultLocale` имеет критическое значение для обеспечения корректного отображения языка. Ниже приведен пример того, как `getLocalizedUrl` может быть использован в настройке приложения:

```tsx
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

Вышеуказанная конфигурация обеспечивает признание приложением `ENGLISH`, `FRENCH` и `SPANISH` в качестве поддерживаемых языков и использует `ENGLISH` в качестве языка по умолчанию.

Используя эту конфигурацию, функция `getLocalizedUrl` может динамически генерировать локализованные URL в зависимости от языковых предпочтений пользователя:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Выход: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Выход: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Выход: "/about"
```

Интегрировав `getLocalizedUrl`, разработчики могут поддерживать консистентную структуру URL для нескольких языков, улучшая как пользовательский опыт, так и SEO.
