# react-intlayer: NPM пакет для интернационализации (i18n) React приложения

**Intlayer** — это набор пакетов, разработанных специально для разработчиков JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

**Пакет `react-intlayer`** позволяет вам интернационализировать ваше React приложение. Он предоставляет контекстные провайдеры и хуки для интернационализации в React.

## Почему интернационализировать ваше React приложение?

Интернационализация вашего React приложения необходима для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей с различным языковым фоном.

## Почему стоит интегрировать Intlayer?

- **Управление контентом на основе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript, чтобы гарантировать, что все ваши определения контента точны и без ошибок.
- **Интегрированные файлы контента**: Храните ваши переводы рядом с их соответствующими компонентами, что улучшает поддерживаемость и ясность.

## Установка

Установите необходимый пакет с использованием вашего предпочтительного менеджера пакетов:

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

С помощью Intlayer вы можете объявлять ваш контент структурированным образом в любой части вашего кода.

По умолчанию, Intlayer ищет файлы с расширением `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Вы можете изменить стандартное расширение, установив свойство `contentDir` в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

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

### Объявите ваш контент

`react-intlayer` разработан для работы с пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/index.md). `intlayer` — это пакет, который позволяет вам объявлять ваш контент в любой части вашего кода. Он преобразует многоязычные объявления контента в структурированные словари, которые интегрируются в ваше приложение без усилий.

Вот пример объявления контента:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
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
      "<-1": "Меньше чем одна машина",
      "-1": "Одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
} satisfies Dictionary;

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем одна машина",
      "-1": "Одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
};

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Меньше чем одна машина",
      "-1": "Одна машина",
      "0": "Нет машин",
      "1": "Одна машина",
      ">5": "Несколько машин",
      ">19": "Много машин",
    }),
  },
};

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
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
        "<-1": "Меньше чем одна машина",
        "-1": "Одна машина",
        "0": "Нет машин",
        "1": "Одна машина",
        ">5": "Несколько машин",
        ">19": "Много машин"
      }
    }
  }
}
```

### Используйте контент в вашем коде

После того как вы объявили ваш контент, вы можете использовать его в вашем коде. Вот пример того, как использовать контент в компоненте React:

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

## Осваивая интернационализацию вашего React приложения

Intlayer предоставляет множество возможностей для помощи в интернационализации вашего React приложения.

**Чтобы узнать больше об этих возможностях, ознакомьтесь с [интернационализацией React (i18n) с Intlayer и Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md) или с [интернационализацией React (i18n) с Intlayer и React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md) руководствами для Vite и React приложения.**

## Функции, предоставляемые пакетом `react-intlayer`

Пакет `react-intlayer` также предоставляет некоторые функции, которые помогут вам интернационализировать ваше приложение.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayerAsync.md)
