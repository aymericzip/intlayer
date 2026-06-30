---
createdAt: 2025-08-23
updatedAt: 2026-06-30
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

Включите живую синхронизацию, обновив конфигурацию Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Включает горячую перезагрузку конфигураций локалей при обнаружении изменений.
     * Например, когда словарь добавляется или обновляется, приложение обновляет
     * отображаемый на странице контент.
     *
     * Поскольку горячая перезагрузка требует постоянного подключения к серверу,
     * она доступна только для клиентов с тарифным планом `enterprise`.
     *
     * По умолчанию: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Управляет способом импорта словарей:
     *
     * - "fetch": словари загружаются динамически с использованием Live Sync API.
     *   Заменяет useIntlayer на useDictionaryDynamic.
     *
     * Примечание: Режим "fetch" использует Live Sync API для загрузки словарей. Если вызов API
     * не удаётся, словари импортируются динамически.
     * Примечание: Только словари с удалённым содержимым и флагом "live" используют режим "fetch".
     * Остальные используют динамический режим для повышения производительности.
     */
    importMode: "fetch",
  },
};

export default config;
```

Запустите сервер Live Sync, чтобы обернуть ваше приложение:

Пример использования автономного сервера:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "live:start": "npx intlayer live",
  },
}
```

Вы также можете использовать сервер вашего приложения параллельно, используя аргумент `--process`.

Пример с использованием Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Пример с использованием Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Сервер Live Sync оборачивает ваше приложение и автоматически применяет обновлённый контент по мере его поступления.

Чтобы получать уведомления об изменениях из CMS, сервер Live Sync поддерживает SSE-соединение с бэкендом. Когда контент в CMS изменяется, бэкенд пересылает обновление серверу Live Sync, который записывает новые словари. Ваше приложение отобразит обновление при следующей навигации или перезагрузке браузера, пересборка не требуется.

Блок-схема (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Схема потока Live Sync CMS/Backend/Live Sync Server/Application Server/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Как это работает:

![Схема логики Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### Рабочий процесс разработки (локально)

- В процессе разработки все удалённые словари загружаются при запуске приложения, чтобы вы могли быстро тестировать обновления.
- Чтобы протестировать Live Sync локально с Next.js, оберните ваш dev-сервер:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Для Vite
  },
}
```

Включите оптимизацию, чтобы Intlayer применял трансформации Live импорта во время разработки:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

Эта настройка оборачивает ваш dev-сервер сервером Live Sync, загружает удалённые словари при запуске и транслирует обновления из CMS через SSE. Обновите страницу, чтобы увидеть изменения.

Примечания и ограничения:

- Добавьте источник live sync в политику безопасности вашего сайта (CSP). Убедитесь, что URL live sync разрешён в `connect-src` (и в `frame-ancestors`, если это актуально).
- Live Sync не работает со статическим выводом. Для Next.js страница должна быть динамической, чтобы получать обновления во время выполнения (например, используйте `generateStaticParams`, `generateMetadata`, `getServerSideProps` или `getStaticProps` соответствующим образом, чтобы избежать ограничений полностью статического вывода).
- В CMS у каждого словаря есть флаг `live`. Только словари с `live=true` загружаются через API live sync; остальные импортируются динамически и остаются неизменными во время выполнения.
- Флаг `live` оценивается для каждого словаря во время сборки. Если удалённый контент не был помечен как `live=true` во время сборки, необходимо выполнить повторную сборку, чтобы включить Live Sync для этого словаря.
- Сервер live sync должен иметь возможность записывать в `.intlayer`. В контейнерах убедитесь, что есть права на запись в `/.intlayer`.

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
