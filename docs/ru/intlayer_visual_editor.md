# Документация по визуальному редактору Intlayer

Визуальный редактор Intlayer — это инструмент, который позволяет вам взаимодействовать с вашими файлами деклараций контента с помощью визуального редактора.

![Интерфейс визуального редактора Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif)

Пакет `intlayer-editor` основан на Intlayer и доступен для приложений на JavaScript, таких как React (Create React App), Vite + React и Next.js.

## Визуальный редактор против CMS

Визуальный редактор Intlayer — это инструмент, который позволяет вам управлять вашим контентом в визуальном редакторе для локальных словарей. Как только изменен контент, он будет заменен в кодовой базе. Это означает, что приложение будет пересобрано, и страница будет перезагружена, чтобы отобразить новый контент.

В отличие от [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md), инструмент, который позволяет вам управлять вашим контентом в визуальном редакторе для удаленных словарей. Как только изменения сделаны, контент **не** повлияет на вашу кодовую базу. И сайт автоматически отобразит измененный контент.

## Интеграция Intlayer в ваше приложение

Для получения более подробной информации о том, как интегрировать Intlayer, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md).

## Как работает редактор Intlayer

Визуальный редактор в приложении включает в себя две вещи:

- Фронтенд-приложение, которое будет отображать ваш сайт в iframe. Если ваш сайт использует Intlayer, визуальный редактор автоматически обнаружит ваш контент и позволит вам взаимодействовать с ним. Как только будет внесено изменение, вы сможете скачать ваши изменения.

- Как только вы нажмете кнопку загрузки, визуальный редактор отправит запрос на сервер, чтобы заменить ваши файлы деклараций контента на новый контент (где бы эти файлы ни были объявлены в вашем проекте).

> Обратите внимание, что на данный момент редактор Intlayer будет записывать ваши файлы деклараций контента в формате JSON.

## Установка

После того, как Intlayer настроен в вашем проекте, просто установите `intlayer-editor` как зависимость разработки:

```bash packageManager="npm"
npm install intlayer-editor -D
```

```bash packageManager="yarn"
yarn add intlayer-editor -D
```

```bash packageManager="pnpm"
pnpm add intlayer-editor -D
```

## Конфигурация

### 1. Включите редактор в вашем файле intlayer.config.ts

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
     * Может использоваться для отключения редактора для конкретных сред по соображениям безопасности, например, в производственной среде.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

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
     * Может использоваться для отключения редактора для конкретных сред по соображениям безопасности, например, в производственной среде.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

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
     * Может использоваться для отключения редактора для конкретных сред по соображениям безопасности, например, в производственной среде.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Использование редактора

1. Когда редактор установлен, вы можете запустить редактор, используя следующую команду:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

2. Затем откройте предоставленный URL. По умолчанию `http://localhost:8000`.

   Вы можете видеть каждое поле, индексируемое Intlayer, наведя курсор на ваш контент.

   ![Наведение курсора на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Если ваш контент выделен, вы можете долго нажимать на него, чтобы отобразить панель редактирования.
