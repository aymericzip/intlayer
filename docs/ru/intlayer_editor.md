# Документация по редактору Intlayer

Редактор Intlayer — это инструмент, который преобразует ваше приложение в визуальный редактор. С помощью редактора Intlayer ваши команды могут управлять контентом вашего сайта на всех настроенных языках.

![Интерфейс редактора Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Пакет `intlayer-editor` основан на Intlayer и доступен для JavaScript-приложений, таких как React (Create React App), Vite + React и Next.js.

## Интеграция

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js смотрите [руководство по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App смотрите [руководство по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).

### Интеграция с Vite + React

Для интеграции с Vite + React смотрите [руководство по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md).

## Как работает редактор Intlayer

Каждый раз, когда вы вносите изменения с помощью редактора Intlayer, сервер автоматически вставляет ваши изменения в ваши [файлы декларации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md), где бы эти файлы ни были объявлены в вашем проекте.

Таким образом, вам не нужно беспокоиться о том, где объявлен файл или о том, как найти ваш ключ в вашей коллекции словарей.

## Установка

После настройки Intlayer в вашем проекте просто установите `intlayer-editor` как зависимость для разработки:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Конфигурация

### 1. Включите редактор в вашем файле intlayer.config.ts

В вашем файле конфигурации Intlayer вы можете настроить параметры редактора:

```typescript
const config: IntlayerConfig = {
  // ... другие параметры конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор неактивен и не может быть accessed.
    // Client ID и client secret обязательны для включения редактора.
    // Они позволяют идентифицировать пользователя, редактирующего контент.
    // Их можно получить, создав нового клиента на Панели управления Intlayer - Проекты (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Если у вас нет client ID и client secret, вы можете получить их, создав нового клиента на [Панели управления Intlayer - Проекты](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, смотрите [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### 2. Вставьте провайдер редактора Intlayer в ваше приложение

Чтобы включить редактор, вам необходимо вставить провайдер редактора Intlayer в ваше приложение.

Пример для приложений React JS или Vite + React:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Пример для приложений Next.js:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ваше приложение */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Добавьте таблицы стилей в ваше приложение

Чтобы отобразить стили редактора, вам необходимо добавить таблицы стилей в ваше приложение.

Если используется tailwind, вы можете добавить таблицы стилей в ваш файл `tailwind.config.js`:

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... остальная часть вашего контента
  ],
  // ...
};
```

В противном случае вы можете импортировать таблицы стилей в ваше приложение:

```tsx
// app.tsx
import "intlayer-editor/css";
```

Или

```css
/* app.css */
@import "intlayer-editor/css";
```

## Использование редактора

Когда редактор установлен, включен и запущен, вы можете просмотреть каждое поле, индексируемое Intlayer, наведя курсор на ваш контент.

![Наведение курсора на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Если ваш контент выделен, вы можете долго удерживать его, чтобы отобразить панель редактирования.
