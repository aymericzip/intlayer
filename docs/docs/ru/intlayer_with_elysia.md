---
createdAt: 2026-08-23
updatedAt: 2026-08-30
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

> Смотрите [реализацию пакета на GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer).

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

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации бэкенда на Elysia?">

У Elysia нет собственного слоя i18n, поэтому варианты - это универсальная библиотека вроде `i18next`, вручную подключённая к hook, или `Intlayer` через `elysia-intlayer`, который регистрирует плагин за вас, разрешает локаль для каждого запроса и делит тот же типизированный контент с вашим фронтендом.

Причина интернационализировать бэкенд вообще в том, что большая часть текста, который читает пользователь, никогда не проходит через фронтенд: сообщения об ошибках API, транзакционные письма, push-уведомления, SMS и экспорт в PDF. Для них нужен язык получателя, разрешаемый для каждого запроса, а не для каждой сессии.

См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего сервера Elysia?">

Очень немного. Словари компилируются заранее, и включаются только те локали, которые вы объявляете, поэтому нет ни загрузки каталогов при старте, ни чтения файлов на пути запроса. Это важнее всего в serverless- и edge-развёртываниях, где размер бандла определяет время холодного старта. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next`, не переписывая свои обработчики?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `i18next`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код обработчиков - нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

На стороне фронтенда того же проекта [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) идёт дальше и генерирует словари во время сборки из вашего исходного кода JSX, TSX, Vue или Svelte, поэтому обе половины приложения делят один слой контента без ключей, поддерживаемых вручную.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Как Intlayer узнаёт, на каком языке отвечать?">

По умолчанию `elysia-intlayer` читает заголовок `Accept-Language` входящего запроса и выбирает ближайшую объявленную локаль, откатываясь к вашей локали по умолчанию. Вы можете изменить источник с помощью `routing.storage`, например пользовательский заголовок или cookie, установленный вашим фронтендом, чтобы API отвечал на языке, который пользователь действительно выбрал, а не на том, который рекламирует его браузер. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Изолирована ли локаль для каждого запроса?">

Да. Плагин ограничивает активную локаль областью запроса, поэтому два параллельных запроса на разных языках никогда не читают локаль друг друга. Именно это делает безопасным вызов `t()` и `getIntlayer()` из сервиса без протаскивания аргумента локали через каждую функцию.

</Question>

<Question title="Как отправлять транзакционные письма на языке получателя?">

Объявите контент письма в файле контента, как любой другой контент, затем разрешите его с помощью `getIntlayer` для сохранённой локали получателя, а не для локали запроса. Это важно для задач и очередей, где язык принадлежит записи пользователя и нет входящего запроса, из которого можно прочитать заголовок.

</Question>

<Question title="Как локализовать сообщения об ошибках API?">

Оберните сообщение в `t()` в том месте, где строится ошибка. Активная локаль запроса разрешает его, поэтому клиент получает сообщение, которое может отобразить напрямую, и вашему фронтенду не нужен параллельный каталог кодов ошибок.

</Question>

<Question title="Работает ли это на Bun и в edge-средах выполнения?">

Elysia в первую очередь ориентирован на Bun, а Intlayer разрешает контент из словарей, скомпилированных во время сборки, а не читает файлы каталогов с диска во время выполнения, что обычно и ломается на edge-средах выполнения. Оставьте `dictionary.importMode` со значением по умолчанию `"static"`, чтобы контент упаковывался вместе с сервером.

</Question>

<Question title="Сохраняет ли плагин сквозной вывод типов Elysia?">

Да. Плагин регистрируется через `.use()`, как любой другой плагин Elysia, поэтому цепочки типов продолжают работать, а ключи вашего словаря типизированы отдельно от сгенерированного `types/intlayer.d.ts`.

</Question>

<Question title="Как автоматически перевести контент бэкенда с помощью ИИ?">

Запустите `npx intlayer fill`, которая заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ. Добавьте `--git-diff`, чтобы перевести только контент, изменённый в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и интерполированные значения на сервере?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md) для интерполированных значений, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) для тел писем и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Получаю ли я автодополнение TypeScript на сервере?">

Да. Intlayer генерирует типы ваших словарей в `./types/intlayer.d.ts`, поэтому несуществующий ключ - это ошибка компиляции, а не пустая строка во время выполнения. Запустите `npx intlayer test` в CI, чтобы провалить сборку, когда объявленной локали не хватает контента.

</Question>

<Question title="Могут ли фронтенд и бэкенд использовать один и тот же контент?">

Да, и это обычная настройка. `elysia-intlayer` работает вместе с `react-intlayer`, `next-intlayer` и `vite-intlayer` на одном объявленном контенте, поэтому надпись, используемая и в ответе API, и на странице, объявляется один раз. См. [как работает Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/how_works_intlayer.md).

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) - это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
