# Начало работы с интернационализацией (i18n) с Intlayer, Vite и React

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), предназначенная для упрощения многоязычной поддержки в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, что улучшает автозавершение и обнаружение ошибок.
- **Воспользоваться расширенными возможностями**, такими как динамическое определение и переключение локалей.

---

## Пошаговое руководство по настройке Intlayer в приложении Vite и React

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash
npm install intlayer react-intlayer
```

```bash
yarn add intlayer react-intlayer
```

```bash
pnpm add intlayer react-intlayer
```

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin()],
});
```

### Шаг 4: Объявление вашего контента

Создайте и управляйте вашими словарями контента:

```tsx
// src/app.content.tsx
import { t, type DeclarationContent } from "intlayer";
import { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Не забудьте импортировать React, если вы используете узел React в вашем контенте
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

> Примечание: Если ваш файл контента включает код TSX, вам следует учитывать импорт `import React from "react";` в ваш файл контента.

[Смотрите, как объявить ваши файлы деклараций Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

### Шаг 5: Использование Intlayer в вашем коде

Доступ к вашим словарям контента в вашем приложении:

```tsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LocaleSwitcher } from "./components/LangSwitcherDropDown";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppContent() {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
      <div className="absolute bottom-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
    </>
  );
}

function App() {
  return (
    <IntlayerProvider>
      <AppContent />
    </IntlayerProvider>
  );
}

export default App;
```

> Примечание: Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т. д., вы должны вызвать значение функции, например:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

### (Опционально) Шаг 6: Изменение языка вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет вам установить локаль приложения и обновить контент соответственно.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### (Опционально) Шаг 7: Добавление локализованной маршрутизации в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и дружелюбных URL.
Пример:

```tsx
// /dashboard
// /es/dashboard
// /fr/dashboard
```

> По умолчанию маршруты не имеют префикса для локали по умолчанию. Если вы хотите префиксировать локаль по умолчанию, вы можете установить параметр `middleware.prefixDefault` в `true` в вашей конфигурации. См. [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительной информации.

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который оборачивает маршруты вашего приложения и обрабатывает маршрутизацию на основе локали. Вот пример с использованием [React Router](https://reactrouter.com/home):

```tsx
// Импорт необходимых зависимостей и функций
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Утилиты и типы из 'intlayer'
import { FC, PropsWithChildren } from "react"; // Типы React для функциональных компонентов и пропсов
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты роутера для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает детей в соответствующий контекст локали.
 * Он управляет определением локали на основе URL и её валидацией.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Получить текущий URL
  const { locale } = useParams<{ locale: Locales }>(); // Извлечь параметр локали из URL

  // Определить текущую локаль, возвращаясь к умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL
  );

  /**
   * Если middleware.prefixDefault равно true, то локаль по умолчанию всегда должна быть префиксирована.
   */
  if (middleware.prefixDefault) {
    // Проверка валидности локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Заменить текущую запись истории новой
        />
      );
    }

    // Обернуть детей в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, локаль по умолчанию не префиксирована.
     * Убедитесь, что текущая локаль валидна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, содержится ли текущая локаль в списке валидных локалей
    ) {
      // Перенаправление на путь без префикса локали
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Обернуть детей в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент роутера, который настраивает маршруты для конкретной локали.
 * Использует React Router для управления навигацией и отображения локализованных компонентов.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута, чтобы захватить локаль (например, /en/, /fr/) и соответствовать всем последующим путям
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Обернуть детей в управление локалью
      />

      {
        // Если префикса локали по умолчанию не требуется, отобразить детей непосредственно по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Обернуть детей в управление локалью
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Параллельно вы также можете использовать плагин intLayerMiddlewarePlugin для добавления серверной маршрутизации в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующий куки локали. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не найдена, будет перенаправление на локаль по умолчанию.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intLayerPlugin, intLayerMiddlewarePlugin } from "react-intlayer/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intLayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Опционально) Шаг 8: Изменение URL при изменении локали

Чтобы изменить URL при изменении локали, вы можете использовать свойство `onLocaleChange`, предоставленное хуком `useLocale`. Параллельно вы можете использовать хуки `useLocation` и `useNavigate` из `react-router-dom`, чтобы обновить путь URL.

```tsx
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router-dom";

const LocaleSwitcher = () => {
  const location = useLocation(); // Получить текущий URL. Пример: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Построить URL с обновленной локалью
    // Пример: /es/about с установленной локалью на испанский
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Обновить путь URL
    navigate(pathWithLocale);
  };

  const { setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

### Настройка TypeScript

Intlayer использует дополнение модуля для получения преимуществ от TypeScript и улучшения вашего кода.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5
// tsconfig.json

{
  // ваша пользовательская конфигурация
  include: [
    "src",
    "types", // <- Включите автогенерируемые типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, генерируемые Intlayer. Это позволяет избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, генерируемые Intlayer
.intlayer
```
