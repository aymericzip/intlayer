---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - Как перевести приложение Hono в 2026
description: Узнайте, как сделать ваш бэкенд на Hono многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - интернационализация
  - документация
  - Intlayer
  - Hono
  - JavaScript
  - бэкенд
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Добавлена команда init
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Переведите ваш бэкенд на Hono с помощью Intlayer | Интернационализация (i18n)

`hono-intlayer`, это мощное промежуточное ПО (middleware) для интернационализации (i18n) приложений Hono, разработанное для того, чтобы сделать ваши бэкенд-сервисы доступными во всем мире, предоставляя локализованные ответы на основе предпочтений клиента.

### Практические сценарии использования

- **Отображение ошибок бэкенда на языке пользователя**: когда происходит ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает раздражение. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться во фронтенд-компонентах, таких как уведомления (toasts) или модальные окна.

- **Получение многоязычного контента**: для приложений, извлекающих контент из базы данных, интернационализация гарантирует, что вы сможете предоставлять этот контент на нескольких языках. Это критически важно для таких платформ, как сайты электронной коммерции или системы управления контентом, где необходимо отображать описания товаров, статьи и другой контент на языке, предпочтительном для пользователя.

- **Отправка многоязычных писем**: будь то транзакционные письма, маркетинговые кампании или уведомления, отправка электронных писем на языке получателя может значительно повысить вовлеченность и эффективность.

- **Многоязычные push-уведомления**: для мобильных приложений отправка push-уведомлений на предпочтительном языке пользователя может улучшить взаимодействие и удержание. Этот персональный подход делает уведомления более актуальными и побуждающими к действию.

- **Другие коммуникации**: любая форма коммуникации со стороны бэкенда, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и улучшая общий пользовательский опыт.

Интернационализируя бэкенд, ваше приложение не только уважает культурные различия, но и лучше соответствует потребностям глобального рынка, что является ключевым шагом в масштабировании ваших услуг по всему миру.

## Начало работы

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### Установка

Чтобы начать использовать `hono-intlayer`, установите пакет с помощью npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
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
      Locales.RUSSIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
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
      ru: "Пример возвращаемого контента на русском языке",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию `./src`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для получения более подробной информации обратитесь к [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Настройка приложения Hono

Настройте ваше приложение Hono для использования `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Загрузка обработчика запросов интернационализации
app.use("*", intlayer());

// Маршруты
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      ru: "Пример возвращаемого контента на русском языке",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Совместимость

`hono-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для React-приложений
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для Next.js-приложений
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для Vite-приложений

Он также бесшовно работает с любым решением для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или файлы cookie:

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

По умолчанию `hono-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

> Для получения дополнительной информации о конфигурации и расширенных темах посетите нашу [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Настройка TypeScript

`hono-intlayer` использует возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, что снижает риск пропущенных переводов и улучшает поддерживаемость.

Убедитесь, что автоматически сгенерированные типы (по умолчанию в `./types/intlayer.d.ts`) включены в ваш файл `tsconfig.json`.

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

Для улучшения процесса разработки с Intlayer вы можете установить официальное **расширение Intlayer VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для пропущенных переводов.
- **Встроенный просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения более подробной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Настройка Git

Рекомендуется игнорировать файлы, генерируемые Intlayer. Это позволит избежать их фиксации в вашем Git-репозитории.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, генерируемые Intlayer
.intlayer
```
