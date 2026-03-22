---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Fastify i18n - Как перевести приложение Fastify в 2026 году
description: Узнайте, как сделать ваш бэкенд на Fastify многоязычным. Следуйте документации по интернационализации (i18n) и переводу.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Fastify
  - JavaScript
  - Бэкенд
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: "Добавлена команда init"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Инициализирована история"
---

# Переведите свой бэкенд-сайт на Fastify с помощью Intlayer | Интернационализация (i18n)

`fastify-intlayer` — это мощный плагин интернационализации (i18n) для приложений Fastify, разработанный для того, чтобы сделать ваши бэкенд-сервисы доступными во всем мире, предоставляя локализованные ответы на основе предпочтений клиента.

> Посмотреть реализацию пакета на GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer

### Практические варианты использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда возникает ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает раздражение. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах фронтенда, таких как тосты или модальные окна.
- **Получение многоязычного контента**: Для приложений, извлекающих контент из базы данных, интернационализация гарантирует, что вы сможете предоставлять этот контент на нескольких языках. Это крайне важно для таких платформ, как сайты электронной коммерции или системы управления контентом, которым необходимо отображать описания продуктов, статьи и другой контент на языке, предпочитаемом пользователем.
- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.
- **Многоязычные пуш-уведомления**: Для мобильных приложений отправка пуш-уведомлений на предпочитаемом языке пользователя может повысить взаимодействие и лояльность. Этот персональный подход делает уведомления более актуальными и побуждающими к действию.
- **Другие виды коммуникации**: Любая форма коммуникации со стороны бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что является ключевым шагом в масштабировании ваших услуг по всему миру.

## Начало работы

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-fastify-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Посмотреть [шаблон приложения](https://github.com/aymericzip/intlayer-fastify-template) на GitHub.

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

/** @type {import('intlayer').IntlayerConfig} */
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

/** @type {import('intlayer').IntlayerConfig} */
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

### Объявление контента

Создавайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
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

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
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
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии, что они включены в каталог `contentDir` (по умолчанию `./src`). И соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для получения более подробной информации обратитесь к [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Настройка приложения Fastify

Настройте ваше приложение Fastify для использования `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Загрузить плагин интернационализации
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

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Загрузить плагин интернационализации
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

// Обертка для запуска сервера для async/await
const start = async () => {
  try {
    // Загрузить плагин интернационализации
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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для React-приложений
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для Next.js-приложений
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для Vite-приложений

Он также бесшовно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО (middleware) для определения локали через заголовки или куки:

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

По умолчанию `fastify-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

> Для получения дополнительной информации о настройке и продвинутых темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Настройка TypeScript

`fastify-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, снижая риск отсутствия переводов и улучшая поддерживаемость.

Убедитесь, что автоматически сгенерированные типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Расширение VS Code

Чтобы улучшить ваш опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer VS Code Extension**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предварительный просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Более подробную информацию об использовании расширения можно найти в [документации расширения Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфигурация Git

Рекомендуется игнорировать файлы, генерируемые Intlayer. Это позволит вам избежать их коммита в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, генерируемые Intlayer
.intlayer

```
