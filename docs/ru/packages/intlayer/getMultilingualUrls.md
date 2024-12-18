# Документация: Функция `getMultilingualUrls` в `intlayer`

## Описание:

Функция `getMultilingualUrls` создает отображение многоязычных URL, добавляя к данному URL каждый поддерживаемый язык. Она может обрабатывать как абсолютные, так и относительные URL, применяя соответствующий префикс языка на основе предоставленной конфигурации или значений по умолчанию.

---

## Параметры:

- `url: string`

  - **Описание**: Оригинальная строка URL, к которой будет добавлен префикс языков.
  - **Тип**: `string`

- `locales: Locales[]`

  - **Описание**: Необязательный массив поддерживаемых языков. По умолчанию используется настроенный языковой массив в проекте.
  - **Тип**: `Locales[]`
  - **По умолчанию**: `localesDefault`

- `defaultLocale: Locales`

  - **Описание**: Язык по умолчанию для приложения. По умолчанию используется настроенный язык по умолчанию в проекте.
  - **Тип**: `Locales`
  - **По умолчанию**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Описание**: Нужно ли добавлять префикс для языка по умолчанию. По умолчанию используется настроенное значение в проекте.
  - **Тип**: `boolean`
  - **По умолчанию**: `prefixDefaultDefault`

### Возвращает:

- **Тип**: `IConfigLocales<string>`
- **Описание**: Объект, отображающий каждый язык на соответствующий многоязычный URL.

---

## Пример использования:

### Относительные URL:

```typescript
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

## Граничные случаи:

- **Нет сегмента языка:**

  - Функция удаляет любые существующие сегменты языка из URL перед созданием многоязычных отображений.

- **Язык по умолчанию:**

  - Когда `prefixDefault` равно `false`, функция не добавляет префикс URL для языка по умолчанию.

- **Неподдерживаемые языки:**
  - Учитываются только языки, предоставленные в массиве `locales`, для генерации URL.

---

## Использование в приложениях:

В многоязычном приложении настройка параметров интернационализации с помощью `locales` и `defaultLocale` критически важна для обеспечения отображения правильного языка. Ниже приведен пример того, как `getMultilingualUrls` может быть использован в настройке приложения:

```tsx
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

Вышеуказанная конфигурация гарантирует, что приложение распознает `ENGLISH`, `FRENCH` и `SPANISH` как поддерживаемые языки и использует `ENGLISH` в качестве языка по умолчанию.

Используя эту конфигурацию, функция `getMultilingualUrls` может динамически создавать многоязычные отображения URL на основе поддерживаемых языков приложения:

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

Интегрируя `getMultilingualUrls`, разработчики могут поддерживать единообразные структуры URL по нескольким языкам, улучшая как пользовательский опыт, так и SEO.
