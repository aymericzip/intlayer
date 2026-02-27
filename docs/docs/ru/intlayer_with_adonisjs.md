---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Как перевести приложение AdonisJS в 2026
description: Узнайте, как сделать ваш бэкенд на AdonisJS многоязычным. Следуйте документации по интернационализации (i18n) и переводу.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - AdonisJS
  - JavaScript
  - Бэкенд
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Инициализация истории
---

# Переведите ваш бэкенд на AdonisJS с помощью Intlayer | Интернационализация (i18n)

`adonis-intlayer`, это мощный пакет интернационализации (i18n) для приложений AdonisJS, разработанный для того, чтобы сделать ваши бэкенд-сервисы доступными во всем мире, предоставляя локализованные ответы на основе предпочтений клиента.

### Практические примеры использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает раздражение. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах фронтенда, таких как тосты или модальные окна.

- **Получение многоязычного контента**: Для приложений, извлекающих контент из базы данных, интернационализация гарантирует, что вы сможете предоставлять этот контент на нескольких языках. Это крайне важно для таких платформ, как сайты электронной коммерции или системы управления контентом, которым необходимо отображать описания продуктов, статьи и другой контент на языке, предпочтительном для пользователя.

- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочтительном языке пользователя может улучшить взаимодействие и удержание. Такой персонализированный подход делает уведомления более актуальными и побуждающими к действию.

- **Другие коммуникации**: Любая форма коммуникации со стороны бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что является ключевым шагом в масштабировании ваших услуг по всему миру.

## Начало работы

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### Установка

Чтобы начать использовать `adonis-intlayer`, установите пакет с помощью npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Объявление контента

Создавайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ru: "Пример возвращаемого контента на русском языке",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ru: "Пример возвращаемого контента на русском языке",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ru: "Пример возвращаемого контента на русском языке",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "ru": "Пример возвращаемого контента на русском языке",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию `./src` или `./app`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для получения более подробной информации обратитесь к [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Настройка приложения AdonisJS

Настройте ваше приложение AdonisJS для использования `adonis-intlayer`.

#### Регистрация промежуточного ПО (middleware)

Сначала вам нужно зарегистрировать промежуточное ПО `intlayer` в вашем приложении.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Определение маршрутов

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    ru: "Пример возвращаемого контента на русском языке",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Функции

`adonis-intlayer` экспортирует несколько функций для обработки интернационализации в вашем приложении:

- `t(content, locale?)`: Базовая функция перевода.
- `getIntlayer(key, locale?)`: Получение контента по ключу из ваших словарей.
- `getDictionary(dictionary, locale?)`: Получение контента из конкретного объекта словаря.
- `getLocale()`: Получение текущей локали из контекста запроса.

#### Использование в контроллерах

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        ru: "Привет из контроллера",
      })
    );
  }
}
```

### Совместимость

`adonis-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для приложений React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для приложений Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для приложений Vite

Он также беспрепятственно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для обнаружения локали через заголовки или куки:

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

По умолчанию `adonis-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

> Для получения дополнительной информации о настройке и расширенных темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Настройка TypeScript

`adonis-intlayer` использует широкие возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учитывается, снижая риск отсутствия переводов и улучшая поддерживаемость.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что автоматически сгенерированные типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включите автоматически сгенерированные типы
  ],
}
```

### Расширение VS Code

Чтобы улучшить ваш опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предварительный просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения более подробной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer VS Code](https://intlayer.org/ru/doc/vs-code-extension).

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их фиксации в вашем Git-репозитории.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, созданные Intlayer
.intlayer
```
