---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Пакет визуального редактора переводов
description: Пакет визуального редактора для Intlayer, предоставляющий интуитивно понятный интерфейс для управления переводами и совместного редактирования контента с помощью ИИ.
keywords:
  - intlayer
  - редактор
  - визуальный
  - перевод
  - совместный
  - ИИ
  - NPM
  - интерфейс
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: NPM пакет для использования визуального редактора Intlayer

**Intlayer** - это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`intlayer-editor`** - это NPM-пакет, который интегрирует визуальный редактор Intlayer в ваш проект на React.

## Как работает редактор Intlayer

Редактор Intlayer позволяет взаимодействовать с удалённым словарём Intlayer. Его можно установить на стороне клиента, превратив ваше приложение в редактор, похожий на CMS, для управления содержимым сайта на всех настроенных языках.

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

В вашем конфигурационном файле Intlayer вы можете настроить параметры редактора:

```typescript
const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Если false, редактор неактивен и к нему нельзя получить доступ.
    // Для активации редактора требуются client ID и client secret.
    // Они позволяют идентифицировать пользователя, который редактирует содержимое.
    // Их можно получить, создав нового клиента в Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Если у вас нет client ID и client secret, вы можете получить их, создав нового клиента в [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

Пакет `intlayer-editor` основан на Intlayer и доступен для JavaScript-приложений, таких как React (Create React App), Vite + React и Next.js.

Для получения дополнительной информации о том, как установить пакет, смотрите соответствующий раздел ниже:

### Интеграция с Next.js

Для интеграции с Next.js обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md).

### Интеграция с Create React App

Для интеграции с Create React App обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)

### Интеграция с Vite + React

Для интеграции с Vite + React обратитесь к [руководству по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)

### Пример интеграции

Чтобы интегрировать визуальный редактор Intlayer в ваш React-проект, выполните следующие шаги:

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

Когда редактор установлен, включен и запущен, вы можете просматривать каждое поле, индексируемое Intlayer, наведя курсор на ваш контент.

![Наведение курсора на контент](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Если ваш контент выделен контуром, вы можете долго нажать на него, чтобы открыть панель редактирования.

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
