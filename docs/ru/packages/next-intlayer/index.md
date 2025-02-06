# next-intlayer: NPM пакет для интернационализации (i18n) приложения Next.js

**Intlayer** — это набор пакетов, разработанный специально для разработчиков JavaScript. Он совместим с такими фреймворками, как React, Next.js и Express.js.

**Пакет `next-intlayer`** позволяет вам интернационализировать ваше приложение Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также промежуточное ПО для определения предпочтительного языка пользователя, управления куками и обработки перенаправления URL.

## Почему нужно интернационализировать ваше приложение Next.js?

Интернационализация вашего приложения Next.js необходима для эффективного обслуживания глобальной аудитории. Это позволяет вашему приложению доставлять контент и сообщения на предпочтительном языке каждого пользователя. Эта возможность улучшает пользовательский опыт и расширяет доступность вашего приложения для людей из разных языковых групп.

## Почему стоит интегрировать Intlayer?

- **Управление контентом на основе JavaScript**: Используйте гибкость JavaScript для определения и управления вашим контентом эффективно.
- **Безопасная среда с типами**: Используйте TypeScript для обеспечения точности и отсутствия ошибок в ваших определениях контента.
- **Интегрированные файлы контента**: Храните свои переводы ближе к соответствующим компонентам, что улучшает поддержку и ясность.

## Установка

Установите необходимый пакет, используя ваш предпочтительный пакетный менеджер:

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

С Intlayer вы можете объявить свой контент структурированным образом в любом месте вашего кода.

По умолчанию Intlayer ищет файлы с расширением `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Вы можете изменить стандартное расширение, установив свойство `contentDir` в [файле конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

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

`next-intlayer` создан для работы с пакетом [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/index.md). `intlayer` — это пакет, который позволяет вам объявлять ваш контент в любом месте вашего кода. Он преобразует многоязычные декларации контента в структурированные словари, которые бесшовно интегрируются в ваше приложение.

Вот пример декларации контента:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
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
      "<-1": "Менее одной машины",
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
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Менее одной машины",
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
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Менее одной машины",
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
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Менее одной машины",
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

### Используйте контент в вашем коде

После того, как вы объявили свой контент, вы можете использовать его в своем коде. Вот пример, как использовать контент в компоненте React:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Создание связанной декларации контента

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Создание связанной декларации контента

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Создание связанной декларации контента

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Владение интернационализацией вашего приложения Next.js

Intlayer предоставляет множество функций, которые помогут вам интернационализировать ваше приложение Next.js. Вот некоторые ключевые функции:

- **Интернационализация серверных компонентов**: Intlayer позволяет вам интернационализировать ваши серверные компоненты так же, как и клиентские компоненты. Это означает, что вы можете использовать одни и те же декларации контента как для клиентских, так и для серверных компонентов.
- **Промежуточное ПО для определения языка**: Intlayer предоставляет промежуточное ПО для определения предпочтительного языка пользователя. Это промежуточное ПО используется для определения предпочтительного языка пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).
- **Интернационализация метаданных**: Intlayer предоставляет способ интернационализации ваших метаданных, таких как заголовок вашей страницы, используя функцию `generateMetadata`, предоставляемую Next.js. Вы можете использовать функцию `getTranslationContent` для перевода ваших метаданных.
- **Интернационализация sitemap.xml и robots.txt**: Intlayer позволяет вам интернационализировать ваши файлы sitemap.xml и robots.txt. Вы можете использовать функцию `getMultilingualUrls` для генерации многоязычных URL для вашего карты сайта.
- **Интернационализация URL**: Intlayer позволяет вам интернационализировать ваши URL с помощью функции `getMultilingualUrls`. Эта функция генерирует многоязычные URL для вашего карты сайта.

**Чтобы узнать больше об этих функциях, обратитесь к [интернационализации Next.js (i18n) с Intlayer и маршрутизатором Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).**

## Функции, предоставляемые пакетом `next-intlayer`

Пакет `next-intlayer` также предоставляет несколько функций, которые помогут вам интернационализировать ваше приложение.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useIntlayerAsync.md)
