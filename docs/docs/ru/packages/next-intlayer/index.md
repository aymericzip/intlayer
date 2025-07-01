---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация пакета | next-intlayer
description: Узнайте, как использовать пакет next-intlayer
keywords:
  - Intlayer
  - next-intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
---

# next-intlayer: NPM пакет для интернационализации (i18n) приложения Next.js

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `next-intlayer`** позволяет интернационализировать ваше приложение Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации в Next.js. Кроме того, в него входит плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также middleware для определения предпочтительной локали пользователя, управления cookies и обработки перенаправления URL.

## Зачем интернационализировать ваше приложение Next.js?

Интернационализация вашего приложения Next.js необходима для эффективного обслуживания глобальной аудитории. Она позволяет вашему приложению предоставлять контент и сообщения на предпочитаемом языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет охват вашего приложения, делая его более доступным и релевантным для людей с разным языковым фоном.

## Зачем интегрировать Intlayer?

- **Управление контентом на JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript, чтобы все определения контента были точными и безошибочными.
- **Интегрированные файлы контента**: Держите переводы рядом с соответствующими компонентами, что повышает удобство поддержки и ясность.

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

С Intlayer вы можете объявлять свой контент в структурированном виде в любом месте вашего кода.

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

### Объявите ваш контент

`next-intlayer` создан для работы с пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/index.md). `intlayer` — это пакет, который позволяет объявлять ваш контент в любом месте кода. Он преобразует многоязычные объявления контента в структурированные словари, которые бесшовно интегрируются в ваше приложение.

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
      "<-1": "Less than minus one car",
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
        ">5": "Несколько машин",
        ">19": "Много машин"
      }
    }
  }
}
```

### Использование контента в вашем коде

После того, как вы объявили свой контент, вы можете использовать его в своем коде. Вот пример того, как использовать контент в React-компоненте:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Создать связанное объявление контента

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Создать связанное объявление контента

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Создать связанное объявление контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Освоение интернационализации вашего приложения Next.js

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение Next.js. Вот некоторые из ключевых возможностей:

- **Интернационализация серверных компонентов**: Intlayer позволяет интернационализировать ваши серверные компоненты так же, как и клиентские. Это означает, что вы можете использовать одни и те же объявления контента как для клиентских, так и для серверных компонентов.
- **Промежуточное ПО для определения локали**: Intlayer предоставляет промежуточное ПО для определения предпочтительной локали пользователя. Это промежуточное ПО используется для определения предпочтительной локали пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
- **Интернационализация метаданных**: Intlayer предоставляет способ интернационализировать ваши метаданные, такие как заголовок страницы, используя функцию `generateMetadata`, предоставляемую Next.js. Вы можете использовать функцию `getTranslation` для перевода ваших метаданных.
- **Интернационализация sitemap.xml и robots.txt**: Intlayer позволяет интернационализировать ваши файлы sitemap.xml и robots.txt. Вы можете использовать функцию `getMultilingualUrls` для генерации многоязычных URL-адресов для вашей карты сайта.
- **Интернационализация URL-адресов**: Intlayer позволяет интернационализировать ваши URL-адреса с помощью функции `getMultilingualUrls`. Эта функция генерирует многоязычные URL-адреса для вашей карты сайта.

**Чтобы узнать больше об этих функциях, обратитесь к руководству [Next.js Internationalization (i18n) с Intlayer и Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).**

## Функции, предоставляемые пакетом `next-intlayer`

Пакет `next-intlayer` также предоставляет некоторые функции, которые помогут вам интернационализировать ваше приложение.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayerAsync.md)

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
