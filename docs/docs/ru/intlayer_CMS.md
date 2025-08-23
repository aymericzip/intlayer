---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer CMS | Вынесите свой контент в Intlayer CMS
description: Вынесите свой контент в Intlayer CMS, чтобы делегировать управление вашим контентом вашей команде.
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

<iframe title="Visual Editor + CMS для вашего веб-приложения: объяснение Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS - это приложение, которое позволяет вам выносить контент из проекта Intlayer.

Для этого Intlayer вводит концепцию «удалённых словарей».

![Интерфейс Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Понимание удалённых словарей

Intlayer различает «локальные» и «удалённые» словари.

- 'Локальный' словарь - это словарь, который объявлен в вашем проекте Intlayer. Например, файл объявления кнопки или вашей навигационной панели. Вынесение такого контента не имеет смысла, так как этот контент не предполагается часто изменять.

- 'Удалённый' словарь - это словарь, который управляется через Intlayer CMS. Это может быть полезно, чтобы позволить вашей команде управлять контентом напрямую на вашем сайте, а также использовать функции A/B тестирования и автоматической оптимизации SEO.

## Визуальный редактор vs CMS

[Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) - это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для локальных словарей. После внесения изменений контент будет заменён в кодовой базе. Это означает, что приложение будет пересобрано, и страница будет перезагружена для отображения нового контента.

В отличие от этого, Intlayer CMS - это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для удалённых словарей. После внесения изменений контент **не** повлияет на вашу кодовую базу. И сайт автоматически отобразит изменённый контент.

## Интеграция

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

## Конфигурация

В вашем файле конфигурации Intlayer вы можете настроить параметры CMS:

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
     * Идентификатор клиента и секрет клиента необходимы для включения редактора.
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
     * Если вы самостоятельно размещаете Intlayer CMS, вы можете указать URL CMS.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необязательно
     *
     * Если вы самостоятельно размещаете Intlayer CMS, вы можете указать URL бэкенда.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://back.intlayer.org
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
     * Идентификатор клиента и секрет клиента необходимы для включения редактора.
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
     * Если вы самостоятельно размещаете Intlayer CMS, вы можете указать URL CMS.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необязательно
     *
     * Если вы самостоятельно размещаете Intlayer CMS, вы можете указать URL бэкенда.
     *
     * URL бэкенда Intlayer CMS.
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
     * Идентификатор клиента и секрет клиента необходимы для включения редактора.
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
     * Если вы самостоятельно размещаете Intlayer CMS, вы можете указать URL CMS.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необязательно
     *
     * Если вы самостоятельно размещаете Intlayer CMS, вы можете указать URL бэкенда.
     *
     * URL Intlayer CMS.
     * По умолчанию установлен на https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Если у вас нет идентификатора клиента и секрета клиента, вы можете получить их, создав нового клиента в [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование CMS

### Загрузка вашей конфигурации

Для настройки Intlayer CMS вы можете использовать команды [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ru/intlayer_cli.md).

```bash
npx intlayer config push
```

> Если вы используете переменные окружения в вашем файле конфигурации `intlayer.config.ts`, вы можете указать желаемую среду с помощью аргумента `--env`:

```bash
npx intlayer config push --env production
```

Эта команда загружает вашу конфигурацию в Intlayer CMS.

### Загрузка словаря

Чтобы преобразовать ваши локальные словари в удаленные словари, вы можете использовать команды [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/ru/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Если вы используете переменные окружения в вашем файле конфигурации `intlayer.config.ts`, вы можете указать желаемую среду с помощью аргумента `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Эта команда загружает ваши начальные словари контента, делая их доступными для асинхронного получения и редактирования через платформу Intlayer.

### Редактирование словаря

После этого вы сможете видеть и управлять вашим словарем в [Intlayer CMS](https://intlayer.org/dashboard/content).

## Горячая перезагрузка

Intlayer CMS может выполнять горячую перезагрузку словарей при обнаружении изменений.

Без горячей перезагрузки потребуется новая сборка приложения для отображения нового контента.
Активировав конфигурацию [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration), приложение автоматически заменит обновленный контент при его обнаружении.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    // ... другие настройки конфигурации

    /**
     * Указывает, должна ли приложение выполнять горячую перезагрузку конфигураций локали при обнаружении изменений.
     * Например, когда добавляется или обновляется новый словарь, приложение обновит контент для отображения на странице.
     *
     * Поскольку горячая перезагрузка требует постоянного соединения с сервером, она доступна только для клиентов плана `enterprise`.
     *
     * По умолчанию: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... другие настройки конфигурации
  editor: {
    // ... другие настройки конфигурации

    /**
     * Указывает, должна ли приложение выполнять горячую перезагрузку конфигураций локали при обнаружении изменений.
     * Например, когда добавляется или обновляется новый словарь, приложение обновит контент для отображения на странице.
     *
     * Поскольку горячая перезагрузка требует постоянного соединения с сервером, она доступна только для клиентов плана `enterprise`.
     *
     * По умолчанию: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... другие настройки конфигурации
  editor: {
    // ... другие настройки конфигурации

    /**
     * Указывает, должна ли приложение выполнять горячую перезагрузку конфигураций локали при обнаружении изменений.
     * Например, когда добавляется или обновляется новый словарь, приложение обновит контент для отображения на странице.
     *
     * Поскольку горячая перезагрузка требует постоянного соединения с сервером, она доступна только для клиентов плана `enterprise`.
     *
     * По умолчанию: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

Горячая перезагрузка заменяет контент как на стороне сервера, так и на стороне клиента.

- На стороне сервера вы должны убедиться, что процесс приложения имеет права записи в каталог `.intlayer/dictionaries`.
- На стороне клиента горячая перезагрузка позволяет приложению обновлять контент в браузере без необходимости перезагрузки страницы. Однако эта функция доступна только для клиентских компонентов.
  > Поскольку горячая перезагрузка требует постоянного соединения с сервером с использованием `EventListener`, она доступна только для клиентов плана `enterprise`.

## Отладка

Если вы столкнулись с проблемами с CMS, проверьте следующее:

- Приложение запущено.

- Конфигурация [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) правильно настроена в вашем файле конфигурации Intlayer.
  - Обязательные поля:
    - URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).
    - URL CMS.

- Убедитесь, что конфигурация проекта была загружена в Intlayer CMS.
- Визуальный редактор использует iframe для отображения вашего сайта. Убедитесь, что Политика безопасности контента (CSP) вашего сайта разрешает URL CMS в качестве `frame-ancestors` ('https://intlayer.org' по умолчанию). Проверьте консоль редактора на наличие ошибок.

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
