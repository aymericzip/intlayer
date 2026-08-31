---
createdAt: 2025-08-23
updatedAt: 2026-08-30
title: Intlayer CMS | Внешнее управление контентом через Intlayer CMS
description: Внешнее управление вашим контентом через Intlayer CMS для делегирования управления контентом вашей команде.
keywords:
  - CMS
  - Визуальный редактор
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Раздел «Живая синхронизация» перенесён на отдельную страницу (live-sync.md); здесь оставлено краткое введение со ссылкой"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Добавлен раздел «Самостоятельное размещение»: начальная загрузка Docker Compose, инвентаризация сервисов, конфигурация SDK, необязательные функции и примечания по обновлению"
  - version: 9.0.0
    date: 2026-06-29
    changes: "Добавлен раздел SDK @intlayer/api (createIntlayerCMS) для программного доступа к CMS"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Добавлена документация по live sync"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Заменено поле `hotReload` на `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Документация по системе управления контентом Intlayer (CMS)

<iframe title="Визуальный редактор + CMS для вашего веб-приложения: объяснение Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS, это приложение, которое позволяет вам вынести контент проекта Intlayer во внешнее управление.

Для этого Intlayer вводит концепцию «удалённых словарей».

![Интерфейс Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Оглавление

<TOC/>

---

## Понимание удалённых словарей

Intlayer различает «локальные» и «удалённые» словари.

- «Локальный» словарь, это словарь, который объявлен в вашем проекте Intlayer. Например, файл объявления кнопки или ваша навигационная панель. Вынесение такого контента во внешнее управление не имеет смысла, так как этот контент не предполагается часто менять.

- «Удалённый» словарь, это словарь, который управляется через Intlayer CMS. Это может быть полезно, чтобы ваша команда могла управлять контентом непосредственно на вашем сайте, а также для использования функций A/B тестирования и автоматической SEO-оптимизации.

## Визуальный редактор против CMS

Редактор [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для локальных словарей. После внесения изменений контент будет заменён в кодовой базе. Это означает, что приложение будет пересобрано, и страница перезагрузится для отображения нового контента.

В отличие от этого, Intlayer CMS, это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для удалённых словарей. После внесения изменений контент **не** повлияет на вашу кодовую базу. И сайт автоматически отобразит изменённый контент.

## Интеграция

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

## Конфигурация

Выполните следующую команду для входа в Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Это откроет ваш браузер по умолчанию для завершения процесса аутентификации и получения необходимых учетных данных (Client ID и Client Secret) для использования сервисов Intlayer.

В вашем конфигурационном файле Intlayer вы можете настроить параметры CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Обязательно
     *
     * URL приложения.
     * Это URL, на который нацелен визуальный редактор.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Обязательно
     *
     * Для включения редактора требуются client ID и client secret.
     * Они позволяют идентифицировать пользователя, который редактирует контент.
     * Их можно получить, создав нового клиента в Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Необязательно
     *
     * В случае самостоятельного размещения Intlayer CMS, вы можете указать URL CMS.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необязательно
     *
     * В случае самостоятельного размещения Intlayer CMS, вы можете указать URL бэкенда.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> Если у вас нет client ID и client secret, вы можете получить их, создав нового клиента в [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование CMS

### Отправка вашей конфигурации

Для настройки Intlayer CMS вы можете использовать команды [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ru/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Если вы используете переменные окружения в вашем файле конфигурации `intlayer.config.ts`, вы можете указать нужное окружение с помощью аргумента `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Эта команда загружает вашу конфигурацию в Intlayer CMS.

### Отправка словаря

Чтобы преобразовать ваши локальные словари в удалённый словарь, вы можете использовать команды [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ru/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Если вы используете переменные окружения в вашем файле конфигурации `intlayer.config.ts`, вы можете указать нужное окружение с помощью аргумента `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Эта команда загружает ваши исходные словари контента, делая их доступными для асинхронного получения и редактирования через платформу Intlayer.

### Редактирование словаря

После этого вы сможете просматривать и управлять вашим словарём в [Intlayer CMS](https://app.intlayer.org/content).

## Программный доступ с помощью SDK `@intlayer/api`

Помимо CLI и визуального редактора, Intlayer поставляется с типизированным SDK в пакете [`@intlayer/api`](https://www.npmjs.com/package/@intlayer/api). Он позволяет вам рассматривать CMS как **бесголовую базу данных контента**: вы можете получать проекты, получать словари, а также отправлять или обновлять их непосредственно из вашего собственного приложения, скриптов или CI-конвейера.

SDK обрабатывает аутентификацию за вас. Пока ваши `clientId` и `clientSecret` доступны (в вашей конфигурации Intlayer или переменных окружения), он автоматически получает и обновляет токен доступа OAuth2 и подписывает каждый запрос.

### Установка

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="bun"
bun add @intlayer/api
```

### Как это работает: аутентификатор + эндпоинты

SDK разделён на **два отдельных импорта** специально, чтобы сохранить размер вашего бандла небольшим:

1. `createIntlayerCMS` — создаёт легковесный **аутентификатор**. Он содержит только учётные данные и управляемый токен доступа; он ничего не знает о каком-либо конкретном домене.
2. `dictionaryEndpoint`, `projectEndpoint`, … — **биндинги эндпоинтов** для каждого домена, каждый импортируется из своего подпути (`@intlayer/api/dictionary`, `@intlayer/api/project`, …). Вы передаёте аутентификатор нужному эндпоинту.

Поскольку каждый эндпоинт импортируется отдельно, ваш бандл включает только те домены, которые вы фактически используете — импорт `dictionaryEndpoint` никогда не подтягивает проект, ИИ или любой другой клиент домена.

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

// Конфигурация необязательна: если она пропущена, учётные данные считываются из
// `@intlayer/config/built`, который разрешает переменные окружения INTLAYER_CLIENT_ID и
// INTLAYER_CLIENT_SECRET.
export const cmsAuthenticator = createIntlayerCMS();
```

> [!WARNING]
> Учётные данные CMS (`clientId` / `clientSecret`) предоставляют **доступ на запись** к вашему контенту. Создавайте аутентификатор только на **серверной стороне** (серверные действия, обработчики маршрутов, скрипты, CI). Никогда не импортируйте его в клиентский код и не раскрывайте свои учётные данные в браузере.

Если вы предпочитаете не полагаться на конфигурацию времени сборки, передайте учётные данные явно:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";

export const cmsAuthenticator = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    // Необязательно, для самостоятельно размещённых бэкендов:
    // backendURL: process.env.INTLAYER_BACKEND_URL,
  },
});
```

> Получите свои учётные данные, создав новый ключ доступа в [Панели управления Intlayer - Проекты](https://app.intlayer.org/projects).

### Получение проектов

```typescript fileName="projects.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { projectEndpoint } from "@intlayer/api/project";

const cmsAuthenticator = createIntlayerCMS();

// Список проектов, доступных с вашими учётными данными
const { data: projects } =
  await projectEndpoint(cmsAuthenticator).getProjects();

// Чтение агрегированных данных о локализации выбранного проекта
const { data: insights } =
  await projectEndpoint(cmsAuthenticator).getProjectInsights();
```

### Получение словарей

```typescript fileName="read-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Вывести каждый удалённый словарь проекта
const { data: dictionaries } =
  await dictionaryEndpoint(cmsAuthenticator).getDictionaries();

// Или получить один словарь по ключу
const { data: dictionary } = await dictionaryEndpoint(
  cmsAuthenticator
).getDictionary("my-first-dictionary-key");
```

### Отправка и обновление словарей

Используйте CMS как базу данных для записи контента:

```typescript fileName="write-dictionaries.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cmsAuthenticator = createIntlayerCMS();

// Создать новый словарь
await dictionaryEndpoint(cmsAuthenticator).addDictionary({
  key: "my-first-dictionary-key",
  content: { title: "Hello world" },
});

// Обновить или вставить партию словарей (создать или обновить их за один вызов)
await dictionaryEndpoint(cmsAuthenticator).pushDictionaries([
  { key: "home", content: { title: "Home" } },
  { key: "about", content: { title: "About" } },
]);

// Обновить существующий словарь
await dictionaryEndpoint(cmsAuthenticator).updateDictionary({
  id: "<dictionary-id>",
  key: "home",
  content: { title: "Updated title" },
});
```

> Совет: повторно используйте связанный эндпоинт, чтобы избежать повторений:
>
> ```typescript codeFormat="typescript"
> const dictionary = dictionaryEndpoint(cmsAuthenticator);
> await dictionary.pushDictionaries([myDictionary]);
> const { data } = await dictionary.getDictionaries();
> ```

### Извлечение отдельного метода

Каждый метод эндпоинта уже аутентифицирован и самодостаточен (он обрабатывает свой собственный токен), поэтому вы можете извлечь его и передавать — например, для инъекции в качестве зависимости:

```typescript fileName="push.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const dictionary = dictionaryEndpoint(createIntlayerCMS());

// Уже аутентифицирован — автоматически обновляет токен при каждом вызове
export const pushDictionaries = dictionary.pushDictionaries;

// Использование
await pushDictionaries([{ key: "home", content: { title: "Home" } }]);
```

## Живая синхронизация

Живая синхронизация позволяет вашему приложению отражать изменения контента CMS в режиме реального времени. Пересборка или повторный деплой не требуются. Когда функция включена, обновления передаются на сервер живой синхронизации, который обновляет словари, используемые вашим приложением.

Полное руководство по настройке (включение, запуск сервера Live Sync, рабочий процесс локальной разработки и ограничения) см. в [документации Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/live-sync.md).

## Самостоятельное размещение (Self-Hosting)

Intlayer может работать полностью на вашей собственной инфраструктуре. Одна команда поднимает весь стек (дашборд, API, база данных, хранилище объектов и электронная почта) с помощью Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Полное руководство по настройке, справочник по переменным окружения, инструкции по обновлению и процедуры резервного копирования/восстановления см. в [Руководстве по самостоятельному размещению](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

---

## Отладка

Если вы столкнулись с проблемами в CMS, проверьте следующее:

- Приложение запущено.

- Конфигурация [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) корректно настроена в вашем конфигурационном файле Intlayer.
  - Обязательные поля:
    - URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).
    - URL CMS

- Убедитесь, что конфигурация проекта была отправлена в Intlayer CMS.

- Визуальный редактор использует iframe для отображения вашего сайта. Убедитесь, что политика безопасности контента (CSP) вашего сайта разрешает URL CMS в качестве `frame-ancestors` (по умолчанию 'https://app.intlayer.org'). Проверьте консоль редактора на наличие ошибок.

## Часто задаваемые вопросы

<FAQ>

<Question title="В чём разница между Intlayer CMS и визуальным редактором?">

[Визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) редактирует локальные словари и записывает изменение обратно в вашу кодовую базу, поэтому приложение пересобирается, и изменение проходит через ваш обычный процесс проверки и развёртывания. CMS редактирует удалённые словари: изменение не затрагивает вашу кодовую базу, и работающий сайт подхватывает его без развёртывания. Команды часто используют оба: редактор для контента, которым владеют разработчики, и CMS для контента, который маркетинг меняет еженедельно.

</Question>

<Question title="Насколько i18n увеличивает размер моего бандла?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Разметка, отрендеренная на сервере, разрешает свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются. [Динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next`, `next-intl` или `react-i18next`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md) или [руководства по миграции с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` и `Lingui`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов — нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Какой контент следует перенести в CMS?">

Контент, который часто меняется и не относится к релизу: текст лендинга, формулировки цен, объявления — всё, чем владеет маркетинговая команда. Контент, который является частью интерфейса, например надписи на кнопках и ошибки форм, лучше оставить в локальных словарях, где он проверяется вместе с кодом, который его использует.

</Question>

<Question title="Что происходит, если CMS недоступна?">

Приложение откатывается к локальному объявлению словаря, поэтому сбой сети или простой деградирует до контента, поставленного с вашей сборкой, а не до пустой страницы. Вот почему важно держать локальное объявление для каждого удалённого словаря.

</Question>

<Question title="Могу ли я разместить CMS самостоятельно?">

Да. CMS может работать на вашей собственной инфраструктуре, что является обычным ответом, когда контент не должен покидать вашу сеть. См. [самостоятельный хостинг Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

<Question title="Нужен ли редакторам контента разработчик, чтобы опубликовать изменение?">

Нет. В этом и смысл удалённых словарей: редактор меняет текст в CMS, и сайт это отражает, при этом [живая синхронизация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/live.md) применяет обновление во время выполнения, а не ждёт сборки.

</Question>

<Question title="Могу ли я автоматизировать CMS вместо использования интерфейса?">

Да. SDK `@intlayer/api` предоставляет те же эндпоинты, что и интерфейс, поэтому вы можете получать проекты, читать словари и отправлять обновления из скрипта или конвейера. Раздел выше показывает аутентификатор и эндпоинты.

</Question>

<Question title="Поддерживает ли CMS A/B-тестирование переводов?">

Да. Удалённые словари поддерживают [варианты контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/variants.md), а [аналитика](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/analytics.md) сообщает, как каждый вариант показывается, поэтому изменение формулировки можно измерить, а не спорить о нём.

</Question>

<Question title="Бесплатна ли CMS?">

Библиотека Intlayer, CLI, компилятор и визуальный редактор бесплатны и с открытым исходным кодом по лицензии Apache 2.0. Размещённая CMS — это необязательный платный сервис, и его можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
