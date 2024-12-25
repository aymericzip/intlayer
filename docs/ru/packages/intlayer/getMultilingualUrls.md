# Документация: Функция `getMultilingualUrls` в `intlayer`

## Описание:

Функция `getMultilingualUrls` генерирует сопоставление многоязычных URL, добавляя префикс с данным языком к каждому поддерживаемому языку. Она может обрабатывать как абсолютные, так и относительные URL, применяя соответствующий префикс языка в зависимости от заданной конфигурации или значений по умолчанию.

---

## Параметры:

- `url: string`

  - **Описание**: Исходная строка URL, к которой будут добавлены языковые префиксы.
  - **Тип**: `string`

- `locales: Locales[]`

  - **Описание**: Необязательный массив поддерживаемых языков. По умолчанию используются настроенные языки в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: `localesDefault`

- `defaultLocale: Locales`

  - **Описание**: Язык по умолчанию для приложения. По умолчанию используется настроенный язык по умолчанию в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Описание**: Нужно ли добавлять префикс языка по умолчанию. По умолчанию используется настроенное значение в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: `prefixDefaultDefault`

### Возвращает:

- **Тип**: `IConfigLocales<string>`
- **Описание**: Объект, сопоставляющий каждый язык с его соответствующим многоязычным URL.

---

## Пример использования:

### Относительные URL:

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

### Абсолютные URL:

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

## Краевые случаи:

- **Нет сегмента языка:**

  - Функция удаляет любой существующий сегмент языка из URL перед тем, как сгенерировать многоязычные сопоставления.

- **Язык по умолчанию:**

  - Когда `prefixDefault` равно `false`, функция не добавляет префикс URL для языка по умолчанию.

- **Не поддерживаемые языки:**
  - Только языки, указанные в массиве `locales`, учитываются при генерации URL.

---

## Использование в приложениях:

В многоязычном приложении настройка параметров интернационализации с `locales` и `defaultLocale` критически важна для обеспечения корректного отображения языка. Ниже приведен пример того, как `getMultilingualUrls` может быть использован в конфигурации приложения:

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

Указанная выше конфигурация обеспечивает распознавание приложения языков `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемых и использование `ENGLISH` в качестве языка по умолчанию.

Используя эту конфигурацию, функция `getMultilingualUrls` может динамически генерировать сопоставления многоязычных URL на основе поддерживаемых языков приложения:

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

Интегрируя `getMultilingualUrls`, разработчики могут поддерживать согласованную структуру URL на нескольких языках, улучшая как пользовательский опыт, так и SEO.
