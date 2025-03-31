# intlayer-editor: NPM Пакет для использования визуального редактора Intlayer

**Intlayer** , это набор пакетов, специально разработанных для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`intlayer-editor`** , это NPM пакет, который интегрирует визуальный редактор Intlayer в ваш проект на React.

## Как работает редактор Intlayer

Редактор Intlayer позволяет взаимодействовать с удаленным словарем Intlayer. Он может быть установлен на стороне клиента и преобразовать ваше приложение в редактор, похожий на CMS, для управления содержимым вашего сайта на всех настроенных языках.

![Интерфейс редактора Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

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
  // ... другие настройки конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор неактивен и недоступен.
    // Client ID и client secret необходимы для включения редактора.
    // Они позволяют идентифицировать пользователя, редактирующего содержимое.
    // Их можно получить, создав нового клиента в Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Если у вас нет Client ID и client secret, вы можете получить их, создав нового клиента в [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md)

Пакет `intlayer-editor` основан на Intlayer и доступен для JavaScript приложений, таких как React (Create React App), Vite + React и Next.js.

Для получения более подробной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md)

### Пример интеграции

Чтобы интегрировать визуальный редактор Intlayer в ваш проект на React, выполните следующие шаги:

- Импортируйте компонент редактора Intlayer в ваше React-приложение:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>
            {/* Ваше содержимое приложения здесь */}
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

Когда редактор установлен, включен и запущен, вы можете просматривать каждое поле, индексированное Intlayer, наводя курсор на ваше содержимое.

![Наведение на содержимое](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Если ваше содержимое выделено, вы можете долго нажимать на него, чтобы отобразить панель редактирования.
