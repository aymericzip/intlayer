---
docName: package__intlayer
url: https://intlayer.org/doc/packages/intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | intlayer
description: Узнайте, как использовать пакет intlayer
keywords:
  - Intlayer
  - intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# intlayer: NPM Пакет для Управления Многоязычным Словарем (i18n)

**Intlayer** , это набор пакетов, специально разработанных для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `intlayer`** позволяет объявлять ваш контент в любом месте вашего кода. Он преобразует многоязычные декларации контента в структурированные словари, которые легко интегрируются в ваше приложение. С TypeScript **Intlayer** улучшает ваш процесс разработки, предоставляя более мощные и эффективные инструменты.

## Почему стоит интегрировать Intlayer?

- **Управление контентом на основе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Безопасная типизация**: Используйте TypeScript для обеспечения точности и отсутствия ошибок в определениях контента.
- **Интегрированные файлы контента**: Держите переводы рядом с их соответствующими компонентами, улучшая удобство сопровождения и ясность.

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

Intlayer предоставляет файл конфигурации для настройки вашего проекта. Разместите этот файл в корне вашего проекта.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
// Импортируем необходимые модули
import { Locales, type IntlayerConfig } from "intlayer";

// Конфигурация Intlayer
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
// Импортируем необходимые модули
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
// Импортируем необходимые модули
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

> Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Пример использования

С помощью Intlayer вы можете структурированно объявлять ваш контент в любом месте вашего кода.

По умолчанию Intlayer сканирует файлы с расширением `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

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

### Объявление контента

Пример объявления контента:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
// Импортируем функции и типы
import { t, type Dictionary } from "intlayer";

// Объявляем контент для компонента клиента
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
    numberOfCar: enu({
      "<-1": "Меньше минус одной машины",
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
// Импортируем функции
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
    numberOfCar: enu({
      "<-1": "Меньше минус одной машины",
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
// Импортируем функции
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
    numberOfCar: enu({
      "<-1": "Меньше минус одной машины",
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

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ru": "Привет, мир"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Меньше минус одной машины",
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

### Сборка словарей

Вы можете собрать свои словари, используя [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Эта команда сканирует все файлы `*.content.*`, компилирует их и записывает результаты в директорию, указанную в вашем **`intlayer.config.ts`** (по умолчанию `./.intlayer`).

Пример вывода:

```bash
.
└── .intlayer
    ├── dictionary  # Содержит словарь вашего контента
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Содержит точку входа словаря для использования в приложении
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Содержит автоматически сгенерированные определения типов словаря
        ├── intlayer.d.ts  # Определения типов Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

...
