---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: "AdonisJS i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения AdonisJS. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
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
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Инициализация истории"
author: aymericzip
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
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonis-template) on GitHub.

### Установка

Чтобы начать использовать `adonis-intlayer`, установите пакет с помощью npm:

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

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Настройка

Настройте параметры интернационализации, создав файл `intlayer.config.ts` в корне вашего проекта:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Объявление контента

Создавайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию `./src` или `./app`) и соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации бэкенда на AdonisJS?">

AdonisJS поставляется с `@adonisjs/i18n`, который покрывает сообщения ICU в файлах `resources/lang` с сервисом, ограниченным областью запроса. Альтернатива — `Intlayer` через `adonis-intlayer`, который объявляет контент в типизированных файлах, общих с вашим фронтендом, разрешает локаль для каждого запроса и добавляет ИИ-перевод, проверки недостающих переводов и CMS.

Причина интернационализировать бэкенд вообще в том, что большая часть текста, который читает пользователь, никогда не проходит через фронтенд: сообщения об ошибках API, транзакционные письма, push-уведомления, SMS и экспорт в PDF. Для них нужен язык получателя, разрешаемый для каждого запроса, а не для каждой сессии.

См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего сервера AdonisJS?">

Очень немного. Словари компилируются заранее, и включаются только те локали, которые вы объявляете, поэтому нет ни загрузки каталогов при старте, ни чтения файлов на пути запроса. Это важнее всего в serverless- и edge-развёртываниях, где размер бандла определяет время холодного старта. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next`, не переписывая свои обработчики?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `i18next`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код обработчиков — нет.

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

По умолчанию `adonis-intlayer` читает заголовок `Accept-Language` входящего запроса и выбирает ближайшую объявленную локаль, откатываясь к вашей локали по умолчанию. Вы можете изменить источник с помощью `routing.storage`, например пользовательский заголовок или cookie, установленный вашим фронтендом, чтобы API отвечал на языке, который пользователь действительно выбрал, а не на том, который рекламирует его браузер. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Изолирована ли локаль для каждого запроса?">

Да. Middleware ограничивает активную локаль областью запроса, поэтому два параллельных запроса на разных языках никогда не читают локаль друг друга. Именно это делает безопасным вызов `t()` и `getIntlayer()` из сервиса без протаскивания аргумента локали через каждую функцию.

</Question>

<Question title="Как отправлять транзакционные письма на языке получателя?">

Объявите контент письма в файле контента, как любой другой контент, затем разрешите его с помощью `getIntlayer` для сохранённой локали получателя, а не для локали запроса. Это важно для задач и очередей, где язык принадлежит записи пользователя и нет входящего запроса, из которого можно прочитать заголовок.

</Question>

<Question title="Как локализовать сообщения об ошибках API?">

Оберните сообщение в `t()` в том месте, где строится ошибка. Активная локаль запроса разрешает его, поэтому клиент получает сообщение, которое может отобразить напрямую, и вашему фронтенду не нужен параллельный каталог кодов ошибок.

</Question>

<Question title="Как использовать переводы внутри контроллера или сервиса?">

Вызовите `getIntlayer` с ключом вашего словаря или оберните сообщение в `t()`. Активная локаль берётся из контекста запроса, установленного middleware, поэтому нет ни сервиса для внедрения, ни аргумента локали для передачи вниз.

</Question>

<Question title="Работает ли это с шаблонами Edge?">

Да. Разрешите контент в контроллере и передайте его в представление, чтобы шаблон отображал уже переведённые значения, а не разрешал ключи сам.

</Question>

<Question title="Как автоматически перевести контент бэкенда с помощью ИИ?">

Запустите `npx intlayer fill`, которая заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ. Добавьте `--git-diff`, чтобы перевести только контент, изменённый в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и интерполированные значения на сервере?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md) для интерполированных значений, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) для тел писем и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Получаю ли я автодополнение TypeScript на сервере?">

Да. Intlayer генерирует типы ваших словарей в `./types/intlayer.d.ts`, поэтому несуществующий ключ — это ошибка компиляции, а не пустая строка во время выполнения. Запустите `npx intlayer test` в CI, чтобы провалить сборку, когда объявленной локали не хватает контента.

</Question>

<Question title="Могут ли фронтенд и бэкенд использовать один и тот же контент?">

Да, и это обычная настройка. `adonis-intlayer` работает вместе с `react-intlayer`, `next-intlayer` и `vite-intlayer` на одном объявленном контенте, поэтому надпись, используемая и в ответе API, и на странице, объявляется один раз. См. [как работает Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/how_works_intlayer.md).

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) — это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
