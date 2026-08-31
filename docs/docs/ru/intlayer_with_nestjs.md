---
createdAt: 2025-09-09
updatedAt: 2026-08-30
title: "NestJS i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения NestJS. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - NestJS
  - JavaScript
  - Бэкенд
slugs:
  - doc
  - environment
  - nest
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Начальная версия документа"
---

# Переведите ваш Nest backend с Intlayer | Интернационализация (i18n)

`express-intlayer`, это мощный middleware для интернационализации (i18n) в приложениях на Express, разработанный для того, чтобы сделать ваши бэкенд-сервисы доступными по всему миру, предоставляя локализованные ответы в зависимости от предпочтений клиента. Поскольку NestJS построен поверх Express, вы можете без проблем интегрировать `express-intlayer` в ваши приложения на NestJS для эффективной работы с многоязычным контентом.

тические сценарии использования

- **Отображение ошибок бэкенда на языке пользователя**: Когда возникает ошибка, отображение сообщений на родном языке пользователя улучшает понимание и снижает разочарование. Это особенно полезно для динамических сообщений об ошибках, которые могут отображаться в компонентах фронтенда, таких как toast-уведомления или модальные окна.

- **Получение многоязычного контента**: Для приложений, извлекающих контент из базы данных, интернационализация гарантирует, что вы можете предоставлять этот контент на нескольких языках. Это критически важно для платформ, таких как сайты электронной коммерции или системы управления контентом, которым необходимо отображать описания продуктов, статьи и другой контент на языке, предпочитаемом пользователем.

- **Отправка многоязычных писем**: Отправка писем (будь то транзакционные письма, маркетинговые кампании или уведомления) на языке получателя может значительно повысить engagement и эффективность.

- **Многоязычные Push-уведомления**: Для мобильных приложений отправка push-уведомлений на предпочитаемом пользователем языке может повысить взаимодействие и удержание пользователей. Такой личный подход может сделать уведомления более релевантными и полезными.

- **Прочие коммуникации**: Любая форма коммуникации из backend-части, такая как SMS-сообщения, системные оповещения или обновления пользовательского интерфейса, выигрывает от использования языка пользователя, обеспечивая ясность и повышая общее удовлетворение пользователя.

Интернационализируя backend, ваше приложение не только учитывает культурные различия, но и лучше соответствует потребностям глобального рынка, что является ключевым шагом в расширении ваших услуг по всему миру.

## Начало работы

### Создание нового проекта NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Установка

Чтобы начать использовать `express-intlayer`, установите пакет с помощью npm:

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
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
```

### Настройка tsconfig.json

Чтобы использовать Intlayer с TypeScript, убедитесь, что ваш файл `tsconfig.json` настроен для поддержки ES-модулей. Для этого установите параметры `module` и `moduleResolution` в значение `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... другие параметры
  },
}
```

### Настройка

Настройте параметры интернационализации, создав файл `intlayer.config.ts` в корне вашего проекта:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // поддерживаемые локали
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
};

export default config;
```

### Объявление вашего контента

Создайте и управляйте объявлениями контента для хранения переводов:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии, что они включены в директорию `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](/doc/concept/content).

### Настройка промежуточного ПО Express

Интегрируйте промежуточное ПО `express-intlayer` в ваше приложение NestJS для обработки интернационализации:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Применить ко всем маршрутам
  }
}
```

### Использование переводов в ваших сервисах или контроллерах

Теперь вы можете использовать функцию `getIntlayer` для доступа к переводам в ваших сервисах или контроллерах:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // Получить приветствие из переводов
  }
}
```

### Совместимость

`express-intlayer` полностью совместим с:

- [`react-intlayer`](/doc/packages/react-intlayer) для приложений на React
- [`next-intlayer`](/doc/packages/next-intlayer) для приложений на Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) для приложений на Vite

Он также без проблем работает с любыми решениями для интернационализации в различных средах, включая браузеры и API-запросы. Вы можете настроить промежуточное ПО для определения локали через заголовки или куки:

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

По умолчанию `express-intlayer` будет интерпретировать заголовок `Accept-Language` для определения предпочтительного языка клиента.

> Для получения дополнительной информации о конфигурации и продвинутых темах посетите нашу [документацию](/doc/concept/configuration).

### Настройка TypeScript

`express-intlayer` использует мощные возможности TypeScript для улучшения процесса интернационализации. Статическая типизация TypeScript гарантирует, что каждый ключ перевода учтен, снижая риск отсутствия переводов и повышая удобство сопровождения.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что автогенерируемые типы (по умолчанию в ./types/intlayer.d.ts) включены в ваш файл tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  include: [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включить автогенерируемые типы
  ],
}
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведенного содержимого.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Чтобы сделать это, вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации бэкенда на NestJS?">

У NestJS есть `nestjs-i18n`, который является обычным выбором и покрывает каталоги JSON или YAML с сервисом, ограниченным областью запроса. Альтернатива — `Intlayer` через `express-intlayer`, который использует тот же объявленный контент, что и ваш фронтенд, типизирован по вашим словарям и поставляется с ИИ-переводом и CMS.

Причина интернационализировать бэкенд вообще в том, что большая часть текста, который читает пользователь, никогда не проходит через фронтенд: сообщения об ошибках API, транзакционные письма, push-уведомления, SMS и экспорт в PDF. Для них нужен язык получателя, разрешаемый для каждого запроса, а не для каждой сессии.

См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего сервера NestJS?">

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

По умолчанию `express-intlayer` читает заголовок `Accept-Language` входящего запроса и выбирает ближайшую объявленную локаль, откатываясь к вашей локали по умолчанию. Вы можете изменить источник с помощью `routing.storage`, например пользовательский заголовок или cookie, установленный вашим фронтендом, чтобы API отвечал на языке, который пользователь действительно выбрал, а не на том, который рекламирует его браузер. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

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

<Question title="Могу ли я внедрять переводы в сервис или контроллер NestJS?">

Да. Вызовите `getIntlayer("app")` внутри сервиса или контроллера, как показано выше. Нет модуля для регистрации на каждую функцию и нет токена для внедрения, потому что активная локаль берётся из контекста запроса, установленного middleware.

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

Да, и это обычная настройка. `express-intlayer` работает вместе с `react-intlayer`, `next-intlayer` и `vite-intlayer` на одном объявленном контенте, поэтому надпись, используемая и в ответе API, и на странице, объявляется один раз. См. [как работает Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/how_works_intlayer.md).

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) — это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
