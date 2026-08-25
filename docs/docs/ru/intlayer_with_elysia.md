---
createdAt: 2026-08-23
updatedAt: 2026-08-24
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
    date: 2026-08-24
    changes: "Приведение руководства в соответствие с шаблоном Elysia (типизация контекста, настройка Bun, скрипты)"
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

> Elysia рассчитан на runtime **Bun**. `elysia-intlayer` опирается на `AsyncLocalStorage` (вместо библиотеки `cls-hooked`, используемой плагинами Intlayer на базе Node) именно потому, что Bun не реализует `async_hooks.createHook`.

### Настройка

Настройте параметры интернационализации, создав `intlayer.config.ts` в корневой папке вашего проекта:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Локаль по умолчанию, используемая как fallback, если запрошенная локаль не найдена.
     */
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
      es: "Ejemplo de contenido devuelto en español",
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
        "es": "Ejemplo de contenido devuelto en español"
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
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Загрузка плагина интернационализации
  .use(intlayer())
  // Маршруты
  .get("/", ({ intlayer }) => ({
    // Локаль, используемая для этого запроса, согласованная `Accept-Language` или прочитанная из хранилища
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      ru: "Привет",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Плагин регистрирует свой контекст через **глобальный** `derive`, который Elysia типизирует как `Partial<{ intlayer: IntlayerContext }>`. Во время выполнения значение всегда присутствует для маршрутов, зарегистрированных после `.use(intlayer())`, поэтому используйте non-null assertion (`intlayer!.locale`) — или optional chaining — чтобы удовлетворить TypeScript в режиме `strict`.

Контекст маршрута предоставляет:

| Свойство          | Описание                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `locale`          | Локаль, используемая для этого запроса; `locale_storage` имеет приоритет над `locale_detected`. |
| `locale_storage`  | Локаль, явно запрошенная клиентом через cookie или header.                                      |
| `locale_detected` | Локаль, согласованная по заголовкам запроса.                                                    |
| `defaultLocale`   | Локаль, настроенная как fallback в `intlayer.config.ts`.                                        |
| `t`               | Функция перевода.                                                                               |
| `getIntlayer`     | Функция для получения словарей по ключу.                                                        |
| `getDictionary`   | Функция для обработки объектов словарей.                                                        |

Те же helpers также экспортируются как standalone. Они получают текущий запрос через `AsyncLocalStorage`, поэтому их можно вызывать без деструктуризации контекста:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      ru: "Пример возвращаемого контента на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> Контекст запроса освобождается сразу после маппинга ответа, поэтому отдельные хелперы никогда не разрешаются относительно уже завершённого запроса. При вызове вне запроса, обрабатываемого плагином, они возвращаются к настроенной локали по умолчанию.

### Запуск вашего приложения

Добавьте скрипты Intlayer в ваш `package.json`. `intlayer build` компилирует ваши декларации контента в директорию `.intlayer` и генерирует типы TypeScript:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Затем запустите сервер:

```bash
bun run dev
```

Проверьте согласование локали с помощью `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` не является строго обязательным перед `bun run src/index.ts`: плагин также готовит словари при старте приложения Elysia. Запуск заранее поддерживает сгенерированные типы в актуальном состоянии для вашего редактора и избавляет от затрат на сборку при первом запросе.

### Совместимость

`elysia-intlayer` полностью совместим с:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/index.md) для приложений React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/index.md) для приложений Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/index.md) для приложений Vite

Он также работает без проблем с любым решением интернационализации в различных окружениях, включая браузеры и API запросы.

По умолчанию плагин определяет локаль в следующем порядке:

1. Cookie `INTLAYER_LOCALE`.
2. Заголовок `x-intlayer-locale`.
3. Согласование через заголовок `Accept-Language`.

Вы можете настроить cookie и заголовок, используемые для определения локали:

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
