---
docName: package__intlayer
url: https://intlayer.org/doc/packages/intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | intlayer
description: Узнайте, как использовать пакет intlayer
keywords:
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# intlayer: NPM пакет для управления многоязычным словарём (i18n)

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `intlayer`** позволяет объявлять ваш контент в любом месте вашего кода. Он преобразует многоязычные объявления контента в структурированные словари, которые бесшовно интегрируются в ваше приложение. С TypeScript **Intlayer** улучшает процесс разработки, предоставляя более мощные и эффективные инструменты.

## Зачем интегрировать Intlayer?

- **Управление контентом на базе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript, чтобы все определения контента были точными и безошибочными.
- **Интегрированные файлы контента**: Держите переводы рядом с соответствующими компонентами, что повышает удобство поддержки и ясность.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // доступные локали
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // доступные локали
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // доступные локали
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

module.exports = config;
```

> Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Пример использования

С помощью Intlayer вы можете объявлять свой контент структурированным образом в любом месте вашего кода.

По умолчанию Intlayer сканирует файлы с расширениями `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Вы можете изменить расширение по умолчанию, установив свойство `contentDir` в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

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

### Объявление вашего контента

Вот пример объявления контента:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем минус одна машина",
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

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем минус одна машина",
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

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем минус одна машина",
      "-1": "Минус одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Некоторые машины",
      ">19": "Много машин",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Меньше чем минус одна машина",
        "-1": "Минус одна машина",
        "0": "Нет машин",
        "1": "Одна машина",
        ">5": "Некоторые машины",
        ">19": "Много машин"
      }
    }
  }
}
```

### Создайте свои словари

Вы можете создавать свои словари с помощью [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Эта команда сканирует все файлы с расширением `*.content.*`, компилирует их и записывает результаты в каталог, указанный в вашем файле **`intlayer.config.ts`** (по умолчанию, `./.intlayer`).

Типичный результат может выглядеть следующим образом:

```bash
.
└── .intlayer
    ├── dictionary  # Содержит словарь вашего контента
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Содержит точку входа вашего словаря для использования в приложении
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Содержит автоматически сгенерированные определения типов вашего словаря
        ├── intlayer.d.ts  # Содержит автоматически сгенерированные определения типов Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Создание ресурсов i18next

Intlayer можно настроить для создания словарей для [i18next](https://www.i18next.com/). Для этого необходимо добавить следующую конфигурацию в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["i18next"],

    // Каталог, в который Intlayer будет записывать JSON-файлы сообщений
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

    // Каталог, в который Intlayer будет записывать ваши JSON-файлы сообщений
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

    // Каталог, в который Intlayer будет записывать ваши JSON-файлы сообщений
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

Вывод:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Например, файл **en/client-component.json** может выглядеть так:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Некоторые машины"
}
```

### Создание словарей next-intl

Intlayer можно настроить для создания словарей для [i18next](https://www.i18next.com/) или [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). Для этого необходимо добавить следующую конфигурацию в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Указывает Intlayer генерировать файлы сообщений для i18next
    dictionaryOutput: ["next-intl"],

    // Каталог, в который Intlayer будет записывать ваши JSON-файлы сообщений
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

    // Каталог, куда Intlayer будет записывать ваши JSON-файлы сообщений
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

    // Каталог, куда Intlayer будет записывать ваши JSON-файлы сообщений
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

Вывод:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Например, файл **en/client-component.json** может выглядеть так:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Привет, мир",
  "zero_numberOfCar": "Нет машин",
  "one_numberOfCar": "Одна машина",
  "two_numberOfCar": "Две машины",
  "other_numberOfCar": "Несколько машин"
}
```

## CLI инструменты

Intlayer предоставляет CLI-инструмент для:

- аудита ваших объявлений контента и дополнения отсутствующих переводов
- создания словарей из ваших объявлений контента
- загрузки и выгрузки удалённых словарей из вашей CMS в локальный проект

Подробнее смотрите в [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

## Использование Intlayer в вашем приложении

После объявления вашего контента вы можете использовать словари Intlayer в вашем приложении.

Intlayer доступен как пакет для вашего приложения.

### React-приложение

Чтобы использовать Intlayer в вашем React-приложении, вы можете использовать [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md).

### Next.js приложение

Чтобы использовать Intlayer в вашем Next.js-приложении, вы можете использовать [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md).

### Express приложение

Чтобы использовать Intlayer в вашем Express-приложении, вы можете использовать [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/express-intlayer/index.md).

## Функции, предоставляемые пакетом `intlayer`

Пакет `intlayer` также предоставляет некоторые функции, которые помогут вам интернационализировать ваше приложение.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
