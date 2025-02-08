# intlayer: NPM Пакет для Управления Объявлением Многоязычного Контента (i18n)

**Intlayer** — это набор пакетов, разработанный специально для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `intlayer`** позволяет вам объявлять ваш контент в любом месте вашего кода. Он преобразует объявления многоязычного контента в структурированные словари, которые бесшовно интегрируются в ваше приложение. С TypeScript **Intlayer** повышает вашу разработку, предоставляя более сильные и эффективные инструменты.

## Почему стоит интегрировать Intlayer?

- **Управление Контентом на JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная Среда**: Используйте TypeScript, чтобы гарантировать, что все ваши определения контента точны и безошибочны.
- **Интегрированные Файлы Контента**: Храните ваши переводы рядом с их соответствующими компонентами, улучшая поддерживаемость и ясность.

## Установка

Установите необходимый пакет, используя ваш предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Настройка Intlayer

Intlayer предоставляет файл конфигурации для настройки вашего проекта. Поместите этот файл в корень вашего проекта.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.RUSSIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.RUSSIAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.RUSSIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.RUSSIAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.RUSSIAN, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.RUSSIAN,
  },
};

module.exports = config;
```

> Для получения полного списка доступных параметров, обратитесь к [документации конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Пример использования

С Intlayer вы можете объявлять свой контент структурированным образом в любом месте вашего кода.

По умолчанию Intlayer сканирует файлы с расширением `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Вы можете изменить значение по умолчанию, установив свойство `contentDir` в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Объявите ваш контент

Вот пример объявления контента:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ru: "Привет, мир",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ru: "Привет, мир",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
};

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      ru: "Привет, мир",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
};

module.exports = clientComponentContent;
```

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "ru": "Привет, мир",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Меньше чем одна машина",
        "-1": "Минус одна машина",
        "0": "Нет машин",
        "1": "Одна машина",
        ">5": "Несколько машин",
        ">19": "Много машин"
      }
    }
  }
}
```

### Постройте свои словари

Вы можете построить свои словари, используя [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Эта команда сканирует все `*.content.*` файлы, компилирует их и записывает результаты в директорию, указанную в вашем **`intlayer.config.ts`** (по умолчанию, `./.intlayer`).

Типичный вывод может выглядеть так:

```bash
.
├── .intlayer
│   ├── dictionary  # Содержит словарь вашего контента
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # Содержит точку входа вашего словаря для использования в приложении
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # Содержит автоматически сгенерированные определения типов вашего словаря
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Содержит автоматически сгенерированные определения типов Intlayer
```

### Построить ресурсы i18next

Intlayer можно настроить для сборки словарей для [i18next](https://www.i18next.com/). Для этого вам нужно добавить следующую конфигурацию в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["i18next"],

    // Директория, куда Intlayer будет записывать ваши файлы JSON сообщений
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["i18next"],

    // Директория, куда Intlayer будет записывать ваши файлы JSON сообщений
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["i18next"],

    // Директория, куда Intlayer будет записывать ваши файлы JSON сообщений
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Для получения полного списка доступных параметров, обратитесь к [документации конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

Вывод:

```bash
.
└── i18next
    └── resources
        ├── ru
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Например, **ru/client-component.json** может выглядеть следующим образом:

```json filePath="intlayer/dictionary/ru/client-component.json"
{
  "myTranslatedContent": "Привет, мир",
  "zero_numberOfCar": "Нет машин",
  "one_numberOfCar": "Одна машина",
  "two_numberOfCar": "Две машины",
  "other_numberOfCar": "Несколько машин"
}
```

### Построить словари для i18next или next-intl

Intlayer можно настроить для сборки словарей для [i18next](https://www.i18next.com/) или [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Для этого вам нужно добавить следующую конфигурацию в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["next-intl"],

    // Директория, куда Intlayer будет записывать ваши файлы JSON сообщений
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["next-intl"],

    // Директория, куда Intlayer будет записывать ваши файлы JSON сообщений
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["next-intl"],

    // Директория, куда Intlayer будет записывать ваши файлы JSON сообщений
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Для получения полного списка доступных параметров, обратитесь к [документации конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

Вывод:

```bash
.
└── intl
    └── messages
        ├── ru
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Например, **ru/client-component.json** может выглядеть следующим образом:

```json filePath="intlayer/dictionary/ru/client-component.json"
{
  "myTranslatedContent": "Привет, мир",
  "zero_numberOfCar": "Нет машин",
  "one_numberOfCar": "Одна машина",
  "two_numberOfCar": "Две машины",
  "other_numberOfCar": "Несколько машин"
}
```

## CLI инструменты

Intlayer предоставляет инструмент CLI для:

- аудита ваших объявлений контента и заполнения пропущенных переводов
- построения словарей из ваших объявлений контента
- отправки и получения удалённых словарей из вашей CMS в ваш проект локали

Обратитесь к [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md) для получения дополнительной информации.

## Используйте Intlayer в вашем приложении

Как только ваш контент объявлен, вы можете использовать ваши словари Intlayer в вашем приложении.

Intlayer доступен как пакет для вашего приложения.

### React Приложение

Чтобы использовать Intlayer в вашем React приложении, вы можете использовать [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/index.md).

### Приложение Next.js

Чтобы использовать Intlayer в вашем приложении Next.js, вы можете использовать [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/index.md).

### Приложение Express

Чтобы использовать Intlayer в вашем приложении Express, вы можете использовать [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/express-intlayer/index.md).

## Функции, предоставляемые пакетом `intlayer`

Пакет `intlayer` также предоставляет некоторые функции, которые помогут вам интернационализировать ваше приложение.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getPathWithoutLocale.md)
