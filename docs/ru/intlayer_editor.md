# Документация по редактору Intlayer

Редактор Intlayer — это инструмент, который превращает ваше приложение в визуальный редактор. С помощью редактора Intlayer ваши команды могут управлять контентом вашего сайта на всех настроенных языках.

![Интерфейс редактора Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Пакет `intlayer-editor` основан на Intlayer и доступен для JavaScript-приложений, таких как React (Create React App), Vite + React и Next.js.

## Интеграция

Для получения дополнительной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js смотрите [руководство по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App смотрите [руководство по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React смотрите [руководство по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md).

## Как работает редактор Intlayer

Каждый раз, когда вы вносите изменения с помощью редактора Intlayer, сервер автоматически вставляет ваши изменения в ваши [файлы декларации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md), где бы эти файлы ни были объявлены в вашем проекте.

Таким образом, вам не нужно беспокоиться о том, где файл объявлен, или о том, как найти ваш ключ в вашей коллекции словарей.

## Установка

После настройки Intlayer в вашем проекте просто установите `intlayer-editor` как зависимость для разработки:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Настройка

### 1. Включите редактор в вашем файле intlayer.config.ts

В вашем файле конфигурации Intlayer вы можете настроить параметры редактора:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие параметры конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор не активен и недоступен.
    // Идентификатор клиента и секрет клиента необходимы для включения редактора.
    // Они позволяют идентифицировать пользователя, который редактирует контент.
    // Их можно получить, создав нового клиента в панели инструментов Intlayer - Проекты (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... другие параметры конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор не активен и недоступен.
    // Идентификатор клиента и секрет клиента необходимы для включения редактора.
    // Они позволяют идентифицировать пользователя, который редактирует контент.
    // Их можно получить, создав нового клиента в панели инструментов Intlayer - Проекты (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... другие параметры конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор не активен и недоступен.
    // Идентификатор клиента и секрет клиента необходимы для включения редактора.
    // Они позволяют идентифицировать пользователя, который редактирует контент.
    // Их можно получить, создав нового клиента в панели инструментов Intlayer - Проекты (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> Если у вас нет идентификатора клиента и секрета клиента, вы можете получить их, создав нового клиента в [панели инструментов Intlayer - Проекты](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### 2. Вставьте провайдер редактора Intlayer в ваше приложение

Чтобы включить редактор, вам нужно вставить провайдер редактора Intlayer в ваше приложение.

Пример для приложений React JS или Vite + React:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Пример для приложений Next.js:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. Добавьте таблицы стилей в ваше приложение

Чтобы отобразить стили редактора, вам нужно добавить таблицы стилей в ваше приложение.

Если используется tailwind, вы можете добавить таблицы стилей в ваш файл `tailwind.config.js`:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... остальной ваш контент
  ],
  // ...
};
```

В противном случае вы можете добавить импорт таблиц стилей в ваше приложение:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

Или

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Использование редактора

Когда редактор установлен, включен и запущен, вы можете просматривать каждое поле, индексированное Intlayer, наведя курсор на ваш контент.

![Наведение на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Если ваш контент выделен, вы можете долго удерживать его, чтобы отобразить панель редактирования.
