---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | react-intlayer
description: Узнайте, как использовать пакет react-intlayer
keywords:
  - Intlayer
  - react-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
---

# react-intlayer: NPM пакет для интернационализации (i18n) React-приложения

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-intlayer`** позволяет интернационализировать ваше React-приложение. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

## Зачем интернационализировать ваше React-приложение?

Интернационализация вашего React-приложения необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

## Почему стоит интегрировать Intlayer?

- **Управление контентом на базе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript, чтобы все определения вашего контента были точными и безошибочными.
- **Интегрированные файлы контента**: Держите ваши переводы рядом с соответствующими компонентами, что повышает удобство поддержки и ясность.

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## Пример использования

С Intlayer вы можете объявлять ваш контент в структурированном виде в любом месте вашего кода.

По умолчанию Intlayer сканирует файлы с расширением `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Вы можете изменить расширение по умолчанию, установив свойство `contentDir` в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### Объявление вашего контента

`react-intlayer` создан для работы с пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). `intlayer` — это пакет, который позволяет объявлять ваш контент в любом месте вашего кода. Он преобразует многоязычные объявления контента в структурированные словари, которые бесшовно интегрируются в ваше приложение.

Вот пример объявления контента:

```tsx fileName="src/Component1/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const component1Content = {
  key: "component-1",
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

export default component1Content;
```

```jsx fileName="src/Component1/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
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

export default component1Content;
```

```jsx fileName="src/Component1/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const component1Content = {
  key: "component-1",
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

module.exports = component1Content;
```

```json fileName="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
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
        "<-1": "Меньше чем минус одна машина",
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

### Использование контента в вашем коде

После того, как вы объявили ваш контент, вы можете использовать его в вашем коде. Вот пример того, как использовать контент в React-компоненте:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Создание связанного объявления контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Создание связанного объявления контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Создание связанного объявления контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Освоение интернационализации вашего React-приложения

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше React-приложение.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [Интернационализация React (i18n) с Intlayer и Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md) для приложений на Vite и React, или к руководству [Интернационализация React (i18n) с Intlayer и React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md) для React Create App.**

## Функции, предоставляемые пакетом `react-intlayer`

Пакет `react-intlayer` также предоставляет некоторые функции, которые помогут вам интернационализировать ваше приложение.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayerAsync.md)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
