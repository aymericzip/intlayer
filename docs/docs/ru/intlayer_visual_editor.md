---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Intlayer визуальный редактор | Изменяйте свой контент, используя визуальный редактор
description: Узнайте, как использовать редактор Intlayer для управления вашим многоязычным веб-сайтом. Следуйте шагам в этой онлайн-документации, чтобы настроить ваш проект за несколько минут.
keywords:
  - Редактор
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Документация по Intlayer Visual Editor

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor - это инструмент, который оборачивает ваш веб-сайт для взаимодействия с файлами декларации контента с использованием визуального редактора.

![Интерфейс Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Пакет `intlayer-editor` основан на Intlayer и доступен для JavaScript-приложений, таких как React (Create React App), Vite + React и Next.js.

## Визуальный редактор vs CMS

Intlayer Visual Editor - это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для локальных словарей. После внесения изменений контент будет заменён в кодовой базе. Это означает, что приложение будет пересобрано, и страница будет перезагружена для отображения нового контента.

В отличие от этого, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) - это инструмент, который позволяет управлять вашим контентом в визуальном редакторе для удалённых словарей. После внесения изменений контент **не** повлияет на вашу кодовую базу. И веб-сайт автоматически отобразит изменённый контент.

## Интеграция Intlayer в ваше приложение

Для получения более подробной информации о том, как интегрировать Intlayer, см. соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md).

## Как работает Intlayer Editor

Визуальный редактор в приложении включает в себя две вещи:

- Фронтенд-приложение, которое отображает ваш веб-сайт в iframe. Если ваш веб-сайт использует Intlayer, визуальный редактор автоматически обнаружит ваш контент и позволит вам взаимодействовать с ним. После внесения изменений вы сможете скачать изменения.

- После нажатия кнопки загрузки визуальный редактор отправит запрос на сервер для замены ваших файлов декларации контента новым контентом (где бы эти файлы ни были объявлены в вашем проекте).

> Обратите внимание, что на данный момент Intlayer Editor записывает ваши файлы декларации контента в формате JSON.

## Установка

После настройки Intlayer в вашем проекте просто установите `intlayer-editor` как зависимость для разработки:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

## Конфигурация

В вашем файле конфигурации Intlayer вы можете настроить параметры редактора:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Обязательно
     * URL приложения.
     * Это URL, на который нацелен визуальный редактор.
     * Пример: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необязательно
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора в определённых средах по соображениям безопасности, например, в продакшене.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Необязательно
     * По умолчанию `8000`.
     * Порт сервера редактора.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Необязательно
     * По умолчанию "http://localhost:8000"
     * URL сервера редактора.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * URL приложения.
     * Это URL, на который нацелен визуальный редактор.
     * Пример: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необязательно
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора в определённых средах по соображениям безопасности, например, в продакшене.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Необязательно
     * По умолчанию `8000`.
     * Порт, используемый сервером визуального редактора.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Необязательно
     * По умолчанию "http://localhost:8000"
     * URL сервера редактора для доступа из приложения. Используется для ограничения источников, которые могут взаимодействовать с приложением по соображениям безопасности. Если установлено значение `'*'`, редактор доступен из любого источника. Должен быть установлен, если порт изменён или если редактор размещён на другом домене.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
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
     * URL приложения.
     * Это URL, на который нацелен визуальный редактор.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необязательно
     * По умолчанию `8000`.
     * Порт сервера редактора.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Необязательно
     * По умолчанию "http://localhost:8000"
     * URL сервера редактора.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
    /**
     * Необязательно
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора в определенных средах по соображениям безопасности, например, в продакшене.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование редактора

1. После установки редактора вы можете запустить его с помощью следующей команды:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Обратите внимание, что ваше приложение должно работать параллельно.** URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).

2. Затем откройте предоставленный URL. По умолчанию `http://localhost:8000`.

   Вы можете просмотреть каждое поле, индексированное Intlayer, наведя курсор на ваш контент.

   ![Наведение на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Если ваш контент выделен, вы можете долго нажимать на него, чтобы отобразить панель редактирования.

## Конфигурация окружения

Редактор можно настроить на использование конкретного файла окружения. Это полезно, когда вы хотите использовать один и тот же файл конфигурации для разработки и продакшена.

Чтобы использовать конкретный файл окружения, вы можете использовать флаг `--env-file` или `-f` при запуске редактора:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Обратите внимание, что файл окружения должен находиться в корневой директории вашего проекта.

Или вы можете использовать флаг `--env` или `-e`, чтобы указать окружение:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Отладка

Если вы столкнулись с какими-либо проблемами с визуальным редактором, проверьте следующее:

- Визуальный редактор и приложение работают.

- Конфигурация [`editor`](https://intlayer.org/ru/doc/concept/configuration#editor-configuration) правильно настроена в вашем файле конфигурации Intlayer.
  - Обязательные поля:
    - URL приложения должен совпадать с тем, который вы указали в конфигурации редактора (`applicationURL`).

- Визуальный редактор использует iframe для отображения вашего сайта. Убедитесь, что политика безопасности контента (Content Security Policy, CSP) вашего сайта разрешает URL CMS в качестве `frame-ancestors` (по умолчанию 'http://localhost:8000'). Проверьте консоль редактора на наличие ошибок.
