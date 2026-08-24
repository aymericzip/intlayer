---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: "Elysia i18n - Полное руководство по переводу вашего приложения"
description: "Больше не i18next. Руководство 2026 года по созданию многоязычного (i18n) приложения Elysia. Переводите с помощью AI-агентов и оптимизируйте размер пакета, SEO и производительность."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Переведите свой backend-сайт Elysia с помощью Intlayer | Internationalization (i18n)

`elysia-intlayer` — это мощный плагин интернационализации (i18n) для приложений Elysia, разработанный для того, чтобы сделать ваши backend-сервисы доступными во всём мире, предоставляя локализованные ответы на основе предпочтений клиента.

> Смотрите реализацию пакета на GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Практические примеры использования

- **Отображение ошибок backend на языке пользователя**: Когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает разочарование. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах front-end, таких как всплывающие уведомления или модальные окна.
- **Получение многоязычного контента**: Для приложений, которые получают контент из базы данных, интернационализация обеспечивает возможность предоставлять этот контент на нескольких языках. Это критически важно для платформ, таких как сайты электронной коммерции или системы управления контентом, которым необходимо отображать описания продуктов, статьи и другой контент на предпочтительном языке пользователя.
- **Отправка многоязычных писем**: Будь то транзакционные письма, маркетинговые кампании или уведомления, отправка писем на языке получателя может значительно увеличить вовлеченность и эффективность.
- **Многоязычные push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочтительном языке пользователя может улучшить взаимодействие и удержание пользователей. Такой личный подход может сделать уведомления более релевантными и действенными.
- **Другие виды коммуникации**: Любые формы коммуникации из backend, такие как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывают от того, что они на языке пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя backend, ваше приложение не только уважает культурные различия, но и лучше соответствует глобальным потребностям рынка, что делает это ключевым шагом в масштабировании ваших услуг по всему миру.

## Начало работы

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

См. [шаблон приложения](https://github.com/aymericzip/intlayer-elysia-template) на GitHub.

### Установка

Для начала использования `elysia-intlayer` установите пакет с помощью npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> флаг `--interactive` необязателен. Используйте `intlayer-cli init`, если вы AI-агент.

> Эта команда обнаружит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

### Настройка

Настройте параметры интернационализации, создав `intlayer.config.ts` в корневой папке вашего проекта:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Объявите Ваш Контент

Создавайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      ru: "Пример возвращаемого контента на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "ru": "Пример возвращаемого контента на русском",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Объявления контента могут быть определены в любом месте вашего приложения при условии, что они включены в директорию `contentDir` (по умолчанию `./src`). И соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения дополнительной информации см. [документацию по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Настройка приложения Elysia

Настройте ваше приложение Elysia для использования `elysia-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Загрузка плагина интернационализации
  .use(intlayer())
  // Маршруты
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(`Listening on http://${app.server?.hostname}:${app.server?.port}`);
```

Плагин также внедряет объект `intlayer` в контекст маршрута. Используйте его, когда хотите явную зависимость вместо вспомогательных функций:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) => ({
  // Локаль, используемая для этого запроса, согласованная `Accept-Language` или прочитанная из хранилища
  locale: intlayer.locale,
  greeting: intlayer.t({
    en: "Hello",
    fr: "Bonjour",
  }),
  content: intlayer.getIntlayer("index").exampleOfContent,
}));
```

> Контекст маршрута предоставляет `locale`, `defaultLocale`, `locale_storage` (локаль, явно установленная клиентом), `locale_detected` (локаль, согласованная из заголовков), `t`, `getIntlayer` и `getDictionary`.

### Совместимость

`elysia-intlayer` полностью совместим с:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md)>) для приложений React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md)>) для приложений Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md)>) для приложений Vite

Он также работает без проблем с любым решением интернационализации в различных окружениях, включая браузеры и API запросы. Вы можете настроить middleware для определения локали через заголовки или cookies:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Другие параметры конфигурации
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

По умолчанию `elysia-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочитаемого языка клиента.

> Для получения дополнительной информации о конфигурации и продвинутых темах, посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Настройка TypeScript

`elysia-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, снижая риск пропущенных переводов и повышая поддерживаемость.

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

### Расширение VS Code

Чтобы улучшить ваш опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенные предпросмотры** переведённого контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для более подробной информации об использовании расширения обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их коммита в ваш Git репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, созданные Intlayer
.intlayer
```
