---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
---

# Документация по системе управления контентом Intlayer (CMS)

<iframe title="Визуальный редактор + CMS для вашего веб-приложения: объяснение Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS — это приложение, которое позволяет вам вынести контент проекта Intlayer во внешнее управление.

Для этого Intlayer вводит концепцию «удалённых словарей».

![Интерфейс Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Понимание удалённых словарей

Intlayer различает «локальные» и «удалённые» словари.

- «Локальный» словарь — это словарь, который объявлен в вашем проекте Intlayer. Например, файл объявления кнопки или ваша навигационная панель. Вынесение такого контента во внешнее управление не имеет смысла, так как этот контент не предполагается часто менять.

- «Удалённый» словарь — это словарь, который управляется через Intlayer CMS. Это может быть полезно, чтобы ваша команда могла управлять контентом непосредственно на вашем сайте, а также для использования функций A/B тестирования и автоматической SEO-оптимизации.

## Визуальный редактор против CMS

Редактор [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) — это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для локальных словарей. После внесения изменений контент будет заменён в кодовой базе. Это означает, что приложение будет пересобрано, и страница перезагрузится для отображения нового контента.

В отличие от этого, Intlayer CMS — это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для удалённых словарей. После внесения изменений контент **не** повлияет на вашу кодовую базу. И сайт автоматически отобразит изменённый контент.

## Интеграция

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

## Конфигурация

В вашем конфигурационном файле Intlayer вы можете настроить параметры CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
     * Их можно получить, создав нового клиента в Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * Их можно получить, создав нового клиента в Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
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
     * По умолчанию установлен на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необязательно
     *
     * В случае самостоятельного хостинга Intlayer CMS, вы можете указать URL бэкенда.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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
     * Их можно получить, создав нового клиента в Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Необязательно
     *
     * В случае самостоятельного хостинга Intlayer CMS, вы можете указать URL CMS.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необязательно
     *
     * В случае самостоятельного хостинга Intlayer CMS, вы можете указать URL бэкенда.
     *
     * URL бэкенда Intlayer CMS.
     * По умолчанию установлен https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Если у вас нет client ID и client secret, вы можете получить их, создав нового клиента в [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование CMS

### Отправка вашей конфигурации

Для настройки Intlayer CMS вы можете использовать команды [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ru/intlayer_cli.md).

```bash
npx intlayer config push
```

> Если вы используете переменные окружения в вашем файле конфигурации `intlayer.config.ts`, вы можете указать нужное окружение с помощью аргумента `--env`:

```bash
npx intlayer config push --env production
```

Эта команда загружает вашу конфигурацию в Intlayer CMS.

### Отправка словаря

Чтобы преобразовать ваши локальные словари в удалённый словарь, вы можете использовать команды [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ru/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Если вы используете переменные окружения в вашем файле конфигурации `intlayer.config.ts`, вы можете указать нужное окружение с помощью аргумента `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Эта команда загружает ваши исходные словари контента, делая их доступными для асинхронного получения и редактирования через платформу Intlayer.

### Редактирование словаря

После этого вы сможете просматривать и управлять вашим словарём в [Intlayer CMS](https://intlayer.org/dashboard/content).

## Живая синхронизация

Живая синхронизация позволяет вашему приложению отражать изменения контента CMS в режиме реального времени. Пересборка или повторный деплой не требуются. Когда функция включена, обновления передаются на сервер живой синхронизации, который обновляет словари, используемые вашим приложением.

> Живая синхронизация требует постоянного подключения к серверу и доступна в тарифном плане enterprise.

Включите живую синхронизацию, обновив конфигурацию Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
  build: {
    /**
     * Управляет способом импорта словарей:
     *
     * - "live": словари загружаются динамически с использованием Live Sync API.
     *   Заменяет useIntlayer на useDictionaryDynamic.
     *
     * Примечание: Режим live использует Live Sync API для загрузки словарей. Если вызов API
     * не удаётся, словари загружаются динамически.
     * Примечание: Режим live используется только для словарей с удалённым содержимым и флагом "live".
     * Другие используют динамический режим для повышения производительности.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Включает горячую перезагрузку конфигураций локалей при обнаружении изменений.
     * Например, когда словарь добавляется или обновляется, приложение обновляет
     * отображаемое на странице содержимое.
     *
     * Поскольку горячая перезагрузка требует постоянного соединения с сервером, она
     * доступна только для клиентов с планом `enterprise`.
     *
     * По умолчанию: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Управляет способом импорта словарей:
     *
     * - "live": словари загружаются динамически с использованием Live Sync API.
     *   Заменяет useIntlayer на useDictionaryDynamic.
     *
     * Примечание: Режим live использует Live Sync API для загрузки словарей. Если вызов API
     * не удаётся, словари загружаются динамически.
     * Примечание: только словари с удалённым содержимым и флагом "live" используют режим live.
     * Другие используют динамический режим для повышения производительности.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Включает горячую перезагрузку конфигураций локалей при обнаружении изменений.
     * Например, когда словарь добавляется или обновляется, приложение обновляет
     * отображаемое на странице содержимое.
     *
     * Поскольку горячая перезагрузка требует постоянного соединения с сервером, она
     * доступна только для клиентов с планом `enterprise`.
     *
     * По умолчанию: false
     */
    liveSync: true,

    /**
     * Порт сервера Live Sync.
     *
     * По умолчанию: 4000
     */
    liveSyncPort: 4000,

    /**
     * URL сервера Live Sync.
     *
     * По умолчанию: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Управляет способом импорта словарей:
     *
     * - "live": словари загружаются динамически с использованием Live Sync API.
     *   Заменяет useIntlayer на useDictionaryDynamic.
     *
     * Примечание: режим live использует Live Sync API для загрузки словарей. Если вызов API
     * не удаётся, словари импортируются динамически.
     * Примечание: только словари с удалённым содержимым и флагом "live" используют режим live.
     * Другие используют динамический режим для повышения производительности.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Запустите сервер Live Sync, чтобы обернуть ваше приложение:

Пример с использованием Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
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
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Сервер Live Sync оборачивает ваше приложение и автоматически применяет обновлённый контент по мере его поступления.

Чтобы получать уведомления об изменениях из CMS, сервер Live Sync поддерживает SSE-соединение с бэкендом. Когда контент в CMS изменяется, бэкенд пересылает обновление серверу Live Sync, который записывает новые словари. Ваше приложение отобразит обновление при следующей навигации или перезагрузке браузера — пересборка не требуется.

Блок-схема (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Схема логики Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Как это работает:

![Схема потока Live Sync CMS/Backend/Live Sync Server/Application Server/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

### Рабочий процесс разработки (локально)

- В процессе разработки все удалённые словари загружаются при запуске приложения, чтобы вы могли быстро тестировать обновления.
- Чтобы протестировать Live Sync локально с Next.js, оберните ваш dev-сервер:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Для Vite
  },
}
```

Включите оптимизацию, чтобы Intlayer применял трансформации Live импорта во время разработки:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true,
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация Intlayer для режима Live Sync
const config = {
  editor: {
    applicationURL: "http://localhost:5173", // URL приложения
    liveSyncURL: "http://localhost:4000", // URL сервера Live Sync
    liveSync: true, // Включение Live Sync
  },
  build: {
    optimize: true, // Включение оптимизации
    importMode: "live", // Режим импорта "live"
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
// Конфигурация Intlayer для режима Live Sync
const config = {
  editor: {
    applicationURL: "http://localhost:5173", // URL приложения
    liveSyncURL: "http://localhost:4000", // URL сервера Live Sync
    liveSync: true, // Включение Live Sync
  },
  build: {
    optimize: true, // Включение оптимизации
    importMode: "live", // Режим импорта "live"
  },
};

module.exports = config;
```

Эта настройка оборачивает ваш dev-сервер сервером Live Sync, загружает удалённые словари при запуске и транслирует обновления из CMS через SSE. Обновите страницу, чтобы увидеть изменения.

Примечания и ограничения:

- Добавьте источник live sync в политику безопасности вашего сайта (CSP). Убедитесь, что URL live sync разрешён в `connect-src` (и в `frame-ancestors`, если это актуально).
- Live Sync не работает со статическим выводом. Для Next.js страница должна быть динамической, чтобы получать обновления во время выполнения (например, используйте `generateStaticParams`, `generateMetadata`, `getServerSideProps` или `getStaticProps` соответствующим образом, чтобы избежать ограничений полностью статического вывода).
- В CMS у каждого словаря есть флаг `live`. Только словари с `live=true` загружаются через API live sync; остальные импортируются динамически и остаются неизменными во время выполнения.
- Флаг `live` оценивается для каждого словаря во время сборки. Если удалённый контент не был помечен как `live=true` во время сборки, необходимо выполнить повторную сборку, чтобы включить Live Sync для этого словаря.
- Сервер live sync должен иметь возможность записывать в `.intlayer`. В контейнерах убедитесь, что есть права на запись в `/.intlayer`.

## Отладка

Если вы столкнулись с проблемами в CMS, проверьте следующее:

- Приложение запущено.

- Конфигурация [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) корректно настроена в вашем конфигурационном файле Intlayer.
  - Обязательные поля:
- URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).
- URL CMS

- Убедитесь, что конфигурация проекта была отправлена в Intlayer CMS.

- Визуальный редактор использует iframe для отображения вашего сайта. Убедитесь, что политика безопасности контента (CSP) вашего сайта разрешает URL CMS в качестве `frame-ancestors` (по умолчанию 'https://intlayer.org'). Проверьте консоль редактора на наличие ошибок.

## История документации

| Версия | Дата       | Изменения                               |
| ------ | ---------- | --------------------------------------- |
| 6.0.1  | 2025-09-22 | Добавлена документация по live sync     |
| 6.0.0  | 2025-09-04 | Заменено поле `hotReload` на `liveSync` |
| 5.5.10 | 2025-06-29 | Инициализация истории                   |
