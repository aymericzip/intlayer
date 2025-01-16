# intlayer-editor: NPM пакет для использования визуального редактора Intlayer

**Intlayer** — это набор пакетов, специально разработанных для разработчиков JavaScript. Он совместим с такими фреймворками, как React и Express.js.

Пакет **`intlayer-editor`** — это NPM пакет, который интегрирует визуальный редактор Intlayer в ваш проект React.

## Как работает редактор Intlayer

Редактор Intlayer позволяет взаимодействовать с удаленным словарем Intlayer. Его можно установить на стороне клиента и превратить ваше приложение в редактор, похожий на CMS, для управления контентом вашего сайта на всех настроенных языках.

![Интерфейс редактора Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/assets/intlayer_editor_ui.png)

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Конфигурация

В вашем файле конфигурации Intlayer вы можете настроить параметры редактора:

```typescript
const config: IntlayerConfig = {
  // ... другие параметры конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор не активен и недоступен.
    // Клиентский ID и секрет клиента необходимы для активации редактора.
    // Они позволяют идентифицировать пользователя, редактирующего контент.
    // Их можно получить, создав нового клиента в панели управления Intlayer - Проекты (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Если у вас нет клиентского ID и секрета клиента, вы можете получить их, создав нового клиента в [панели управления Intlayer - Проекты](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md)

Пакет `intlayer-editor` основан на Intlayer и доступен для приложений на JavaScript, таких как React (Create React App), Vite + React и Next.js.

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md)

### Пример интеграции

Чтобы интегрировать визуальный редактор Intlayer в ваш проект React, выполните следующие шаги:

- Импортируйте компонент редактора Intlayer в ваше приложение React:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* Контент вашего приложения здесь */}
          </IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Импортируйте стили редактора Intlayer в ваше приложение Next.js:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Использование редактора

Когда редактор установлен, активирован и запущен, вы можете просматривать каждое поле, индексируемое Intlayer, наведя курсор на ваш контент.

![Наведение на контент](https://github.com/aymericzip/intlayer/blob/main/docs/ru/assets/intlayer_editor_hover_content.png)

Если ваш контент выделен, вы можете долго удерживать его, чтобы показать панель редактирования.
