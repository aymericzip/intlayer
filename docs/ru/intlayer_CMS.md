# Intlayer Система Управления Контентом (CMS) Документация

Система управления контентом Intlayer — это приложение, которое позволяет вам вынести ваш контент проекта Intlayer.

Для этого Intlayer вводит концепцию «удаленных словарей».

## Понимание удаленных словарей

Intlayer проводит различие между «локальными» и «удаленными» словарями.

- «Локальный» словарь — это словарь, который объявлен в вашем проекте Intlayer. Например, файл объявления кнопки или ваша панель навигации. Вынесение вашего контента не имеет смысла в этом случае, так как этот контент не должен часто изменяться.

- «Удаленный» словарь — это словарь, который управляется через CMS Intlayer. Это может быть полезно для того, чтобы ваша команда могла управлять вашим контентом прямо на вашем веб-сайте, а также использовать функции A/B тестирования и автоматической SEO-оптимизации.

## Визуальный редактор против CMS

[Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) — это инструмент, который позволяет вам управлять вашим контентом в визуальном редакторе для локальных словарей. Как только изменение внесено, контент будет заменен в кодовой базе. Это означает, что приложение будет пересобрано, и страница будет перезагружена, чтобы отобразить новый контент.

В отличие от этого, CMS Intlayer — это инструмент, который позволяет вам управлять вашим контентом в визуальном редакторе для удаленных словарей. Как только изменение внесено, контент **не** повлияет на вашу кодовую базу. И веб-сайт автоматически отобразит измененный контент.

## Интеграция

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [инструкции по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [инструкции по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [инструкции по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md).

## Конфигурация

### 1. Включите редактор в файле intlayer.config.ts

В вашем конфигурационном файле Intlayer вы можете настроить параметры редактора:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Идентификатор клиента и секрет клиента необходимы для включения редактора.
     * Они позволяют идентифицировать пользователя, который редактирует контент.
     * Их можно получить, создав нового клиента в Панели управления Intlayer - Проекты (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Необязательный
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора для конкретных сред по соображениям безопасности, таких как продакшн.
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
     * Идентификатор клиента и секрет клиента необходимы для включения редактора.
     * Они позволяют идентифицировать пользователя, который редактирует контент.
     * Их можно получить, создав нового клиента в Панели управления Intlayer - Проекты (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,    /**
     * Необязательный
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора для конкретных сред по соображениям безопасности, таких как продакшн.
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
     * Идентификатор клиента и секрет клиента необходимы для включения редактора.
     * Они позволяют идентифицировать пользователя, который редактирует контент.
     * Их можно получить, создав нового клиента в Панели управления Intlayer - Проекты (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Необязательный
     * По умолчанию `true`. Если `false`, редактор неактивен и недоступен.
     * Может использоваться для отключения редактора для конкретных сред по соображениям безопасности, таких как продакшн.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> Если у вас нет идентификатора клиента и секрета клиента, вы можете получить их, создав нового клиента в [Панели управления Intlayer - Проекты](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

## Использование CMS

Когда редактор установлен, вы можете просматривать каждое поле, индексируемое Intlayer, наведя курсор на ваш контент.

![Наведение на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Если ваш контент выделен, вы можете долго удерживать его, чтобы отобразить панель редактирования.
