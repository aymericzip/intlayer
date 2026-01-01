---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Как перевести ваш Fastify backend — руководство по i18n 2026
description: Узнайте, как сделать ваш Fastify backend мультиязычным. Следуйте документации, чтобы интернационализировать (i18n) и перевести его.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: Добавлена команда init
  - version: 7.6.0
    date: 2025-12-31
    changes: Инициализация истории
---

# Перевод вашего Fastify-бэкенда с помощью Intlayer | Интернационализация (i18n)

`fastify-intlayer` — это мощный плагин для интернационализации (i18n) для приложений на Fastify, разработанный, чтобы сделать ваши бэкенд-сервисы доступными глобально, предоставляя локализованные ответы в соответствии с предпочтениями клиента.

### Практические сценарии использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда возникает ошибка, отображение сообщений на родном языке пользователя повышает понимание и снижает фрустрацию. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться во фронтенд-компонентах, таких как toast-уведомления или модальные окна.
- **Получение многоязычного контента**: Для приложений, которые извлекают контент из базы данных, интернационализация гарантирует, что вы сможете выдавать этот контент на нескольких языках. Это критично для платформ, таких как e-commerce-сайты или системы управления контентом (CMS), которым необходимо отображать описания товаров, статьи и другой контент на языке, предпочитаемом пользователем.
- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлечённость и эффективность.
- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочитаемом пользователем языке может повысить вовлеченность и удержание. Этот персонализированный подход делает уведомления более релевантными и побуждающими к действию.
- **Другие виды коммуникаций**: Любая форма коммуникации с backend, такая как SMS-сообщения, системные оповещения или обновления интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя backend, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что делает это ключевым шагом при масштабировании ваших сервисов по всему миру.

## Начало работы

### Установка

Чтобы начать использовать `fastify-intlayer`, установите пакет с помощью npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Настройка

Настройте параметры интернационализации, создав файл `intlayer.config.ts` в корне вашего проекта:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */ // Тип конфигурации Intlayer
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */ // Тип конфигурации Intlayer
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Объявление содержимого

Создавайте и управляйте объявлениями содержимого для хранения переводов:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ru: "Пример возвращаемого содержимого на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ru: "Пример возвращаемого содержимого на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ru: "Пример возвращаемого содержимого на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ru: "Пример возвращаемого содержимого на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ru": "Пример возвращаемого содержимого на русском",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваши декларации содержимого могут быть определены в любом месте вашего приложения, при условии, что они находятся в директории `contentDir` (по умолчанию `./src`). И соответствуют расширению файла декларации содержимого (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для подробностей смотрите [документацию по декларации содержимого](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Настройка приложения Fastify

Настройте ваше приложение Fastify для использования `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true }); // Инициализация Fastify с логированием

// Подключение плагина интернационализации
await fastify.register(intlayer);

// Маршруты
fastify.get("/t_example", async (_req, reply) => {
  return t({
    ru: "Пример возвращаемого контента на английском языке",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Загрузка плагина интернационализации
await fastify.register(intlayer);

// Маршруты
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Обёртка для запуска сервера с async/await
const start = async () => {
  try {
    // Загрузка плагина интернационализации
    await fastify.register(intlayer);

    // Маршруты
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        ru: "Пример возвращаемого содержимого на русском языке",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Совместимость

`fastify-intlayer` полностью совместим с:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md)>) для React-приложений
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md)>) для приложений Next.js

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для приложений React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для приложений Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md)>) для приложений на Vite

Он также бесшовно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить middleware для определения локали через заголовки или cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Другие параметры конфигурации
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

По умолчанию `fastify-intlayer` будет интерпретировать заголовок `Accept-Language`, чтобы определить предпочитаемый язык клиента.

> Для получения дополнительной информации о конфигурации и продвинутых темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Настройка TypeScript

`fastify-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript обеспечивает учёт каждого ключа перевода, снижая риск отсутствующих переводов и упрощая поддержку.

Убедитесь, что автогенерируемые типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

### Расширение для VS Code

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное расширение **Intlayer VS Code Extension**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенные превью** переведённого содержимого.
- **Быстрые действия** для простого создания и обновления переводов.

Для получения дополнительных сведений о том, как использовать расширение, обратитесь к [документации Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Настройка Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Для этого вы можете добавить следующие строки в файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```
