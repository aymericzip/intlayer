---
docName: package__next-intlayer
url: https://intlayer.org/doc/packages/next-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация пакета | next-intlayer
description: Узнайте, как использовать пакет next-intlayer
keywords:
  - Intlayer
  - next-intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
---

# next-intlayer: Пакет NPM для интернационализации (i18n) приложения Next.js

**Intlayer** , это набор пакетов, специально разработанных для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `next-intlayer`** позволяет интернационализировать ваше приложение Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также middleware для определения предпочтительного языка пользователя, управления cookies и обработки перенаправления URL.

## Зачем интернационализировать ваше приложение Next.js?

Интернационализация вашего приложения Next.js необходима для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению предоставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и актуальным для людей с разным языковым фоном.

## Почему стоит интегрировать Intlayer?

- **Управление контентом на JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Безопасная типизация**: Используйте TypeScript, чтобы все определения вашего контента были точными и безошибочными.
- **Интеграция файлов контента**: Держите переводы рядом с их соответствующими компонентами, улучшая удобство поддержки и ясность.

## Установка

Установите необходимый пакет с помощью предпочитаемого менеджера пакетов:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Пример использования

С помощью Intlayer вы можете объявлять ваш контент структурированным образом в любом месте вашего кода.

По умолчанию Intlayer сканирует файлы с расширением `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Вы можете изменить расширение по умолчанию, установив свойство `contentDir` в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
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
    └── components
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
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Объявление контента

`next-intlayer` создан для работы с пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). `intlayer` , это пакет, который позволяет объявлять ваш контент в любом месте вашего кода. Он преобразует многоязычные объявления контента в структурированные словари, которые легко интегрируются в ваше приложение.

Пример объявления контента:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

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

### Использование контента в коде

После объявления контента вы можете использовать его в своем коде. Пример использования контента в React-компоненте:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Создание связанного объявления контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Создание связанного объявления контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Создание связанного объявления контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Освоение интернационализации вашего приложения Next.js

Intlayer предоставляет множество функций для помощи в интернационализации вашего приложения Next.js. Вот некоторые из ключевых функций:

- **Интернационализация серверных компонентов**: Intlayer позволяет интернационализировать серверные компоненты так же, как и клиентские. Это означает, что вы можете использовать одни и те же объявления контента для клиентских и серверных компонентов.
- **Middleware для определения языка**: Intlayer предоставляет middleware для определения предпочтительного языка пользователя. Этот middleware используется для определения предпочтительного языка пользователя и перенаправления их на соответствующий URL, указанный в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
- **Интернационализация метаданных**: Intlayer предоставляет способ интернационализировать ваши метаданные, такие как заголовок страницы, с использованием функции `generateMetadata`, предоставляемой Next.js. Вы можете использовать функцию `getTranslation` для перевода ваших метаданных.
- **Интернационализация sitemap.xml и robots.txt**: Intlayer позволяет интернационализировать ваши файлы sitemap.xml и robots.txt. Вы можете использовать функцию `getMultilingualUrls` для генерации многоязычных URL для вашего sitemap.
- **Интернационализация URL**: Intlayer позволяет интернационализировать ваши URL, используя функцию `getMultilingualUrls`. Эта функция генерирует многоязычные URL для вашего sitemap.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [Интернационализация (i18n) Next.js с Intlayer и маршрутизатором App Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).**

## Функции, предоставляемые пакетом `next-intlayer`

Пакет `next-intlayer` также предоставляет несколько функций для помощи в интернационализации вашего приложения.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayerAsync.md)
