# Начало работы с интернационализацией (i18n) с Intlayer, Vite и React

## Что такое Intlayer?

**Intlayer** - это инновационная библиотека для интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения поддержки нескольких языков в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автоматически сгенерированными типами, улучшая автозаполнение и обнаружение ошибок.
- **Воспользуйтесь расширенными возможностями**, такими как динамическое обнаружение и переключение языков.

---

## Пошаговое руководство по настройке Intlayer в приложении Vite и React

### Шаг 1: Установите зависимости

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  Основной пакет, который предоставляет инструменты интернационализации для управления конфигурацией, перевода, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляции и [CLI команд](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **react-intlayer**
  Пакет, который интегрирует Intlayer с приложением React. Он предоставляет контекстные провайдеры и хуки для интернационализации в React. Кроме того, он включает плагин Vite для интеграции Intlayer с [пакетным менеджером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для обнаружения предпочтительного языка пользователя, управления cookies и обработки перенаправления URL.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.RUSSIAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие языки
    ],
    defaultLocale: Locales.RUSSIAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.RUSSIAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие языки
    ],
    defaultLocale: Locales.RUSSIAN,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.RUSSIAN,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие языки
    ],
    defaultLocale: Locales.RUSSIAN,
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL-адреса, перенаправление промежуточного ПО, имена cookies, местоположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для получения полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> Плагин `intlayerPlugin()` Vite используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов декларации контента и их мониторинг в режиме разработки. Он определяет переменные среды Intlayer внутри приложения Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Декларируйте ваш контент

Создайте и управляйте вашими декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ru: "количество равно ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Не забудьте импортировать React, если вы используете узел React в вашем контенте
      ru: (
        <>
          Отредактируйте <code>src/App.tsx</code> и сохраните, чтобы
          протестировать HMR
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
      ru: "Щелкните на логотипы Vite и React, чтобы узнать больше",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ru: "количество равно ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Не забудьте импортировать React, если вы используете узел React в вашем контенте
        ru: (
          <>
            Отредактируйте <code>src/App.tsx</code> и сохраните, чтобы
            протестировать HMR
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
      },

    readTheDocs: t({
      ru: "Щелкните на логотипы Vite и React, чтобы узнать больше",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ru: "количество равно ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Не забудьте импортировать React, если вы используете узел React в вашем контенте
        ru: (
          <>
            Отредактируйте <code>src/App.tsx</code> и сохраните, чтобы
            протестировать HMR
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
      },

    readTheDocs: t({
      ru: "Щелкните на логотипы Vite и React, чтобы узнать больше",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "ru": "Логотип Vite",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "ru": "Логотип React",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "ru": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "ru": "количество равно ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "ru": "Отредактируйте src/App.tsx и сохраните, чтобы протестировать HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ru": "Щелкните на логотипы Vite и React, чтобы узнать больше",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, как только они будут включены в директорию `contentDir` (по умолчанию `./src`). И соответствовать расширению файла декларации контента (по умолчанию `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Для более подробной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).
> Если ваш файл контента включает код TSX, вы должны рассмотреть возможность импорта `import React from "react";` в ваш файл контента.

### Шаг 5: Используйте Intlayer в вашем коде

Получите доступ к вашим словарям контента по всему вашему приложению:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
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
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
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
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
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
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и др., вы должны вызвать значение функции, как:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md).

### (Дополнительно) Шаг 6: Измените язык вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставленную хуком `useLocale`. Эта функция позволяет вам установить локаль приложения и обновить контент соответственно.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Russian)}>
      Изменить язык на русский
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Russian)}>
      Изменить язык на русский
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.Russian)}>
      Изменить язык на русский
    </button>
  );
};
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md).

### (Дополнительно) Шаг 7: Добавьте локализованный маршрутизацию в ваше приложение

Цель этого шага - создать уникальные маршруты для каждого языка. Это полезно для SEO и удобочитаемых URL-адресов.
Пример:

```plaintext
- https://example.com/about
- https://example.com/ru/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для языка по умолчанию. Если вы хотите добавить префикс для языка по умолчанию, вы можете установить параметр `middleware.prefixDefault` в `true` в вашей конфигурации. Смотрите [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительной информации.

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который обернет маршруты вашего приложения и обработает маршрутизацию на основе языка. Вот пример с использованием [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Импорт необходимых зависимостей и функций
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Утилиты и типы из 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Типы React для функциональных компонентов и свойств
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты маршрутизации для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст языка.
 * Он управляет обнаружением и проверкой языка на основе URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Получите текущий URL-адрес
  const { locale } = useParams<{ locale: Locales }>(); // Извлеките параметр языка из URL

  // Определите текущий язык, возвращая язык по умолчанию, если он не указан
  const currentLocale = locale ?? defaultLocale;

  // Удалите префикс языка из пути, чтобы составить базовый путь
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL-адрес
  );

  /**
   * Если middleware.prefixDefault истинно, язык по умолчанию всегда должен быть префиксирован.
   */
  if (middleware.prefixDefault) {
    // Проверьте правильность языка
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на язык по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Замените текущую запись истории новой
        />
      );
    }

    // Оберните дочерние элементы в IntlayerProvider и установите текущий язык
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault ложно, язык по умолчанию не префиксирован.
     * Убедитесь, что текущий язык действителен и не является языком по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключите язык по умолчанию
        )
        .includes(currentLocale) // Проверьте, что текущий язык есть в списке действительных языков
    ) {
      // Перенаправить к пути без префикса языка
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Оберните дочерние элементы в IntlayerProvider и установите текущий язык
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфические для языка.
 * Использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата языка (например, /ru/, /fr/) и сопоставления всех последующих путей
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление языком
      />

      {
        // Если префикса языка по умолчанию не добавлено, выведите дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление языком
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Импорт необходимых зависимостей и функций
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Утилиты и типы из 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты маршрутизации для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст языка.
 * Он управляет обнаружением и проверкой языка на основе URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Получите текущий URL-адрес
  const { locale } = useParams(); // Извлеките параметр языка из URL

  // Определите текущий язык, возвращая язык по умолчанию, если он не указан
  const currentLocale = locale ?? defaultLocale;

  // Удалите префикс языка из пути, чтобы составить базовый путь
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL-адрес
  );

  /**
   * Если middleware.prefixDefault истинно, язык по умолчанию всегда должен быть префиксирован.
   */
  if (middleware.prefixDefault) {
    // Проверьте правильность языка
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на язык по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Замените текущую запись истории новой
        />
      );
    }

    // Оберните дочерние элементы в IntlayerProvider и установите текущий язык
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault ложно, язык по умолчанию не префиксирован.
     * Убедитесь, что текущий язык действителен и не является языком по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключите язык по умолчанию
        )
        .includes(currentLocale) // Проверьте, что текущий язык есть в списке действительных языков
    ) {
      // Перенаправить к пути без префикса языка
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Оберните дочерние элементы в IntlayerProvider и установите текущий язык
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфические для языка.
 * Использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата языка (например, /ru/, /fr/) и сопоставления всех последующих путей
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление языком
      />

      {
        // Если префикса языка по умолчанию не добавлено, выведите дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление языком
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Импорт необходимых зависимостей и функций
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Утилиты и типы из 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Провайдер для контекста интернационализации
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Компоненты маршрутизации для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст языка.
 * Он управляет обнаружением и проверкой языка на основе URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Получите текущий URL-адрес
  const { locale } = useParams(); // Извлеките параметр языка из URL

  // Определите текущий язык, возвращая язык по умолчанию, если он не указан
  const currentLocale = locale ?? defaultLocale;

  // Удалите префикс языка из пути, чтобы составить базовый путь
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL-адрес
  );

  /**
   * Если middleware.prefixDefault истинно, язык по умолчанию всегда должен быть префиксирован.
   */
  if (middleware.prefixDefault) {
    // Проверьте правильность языка
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на язык по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Замените текущую запись истории новой
        />
      );
    }

    // Оберните дочерние элементы в IntlayerProvider и установите текущий язык
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault ложно, язык по умолчанию не префиксирован.
     * Убедитесь, что текущий язык действителен и не является языком по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключите язык по умолчанию
        )
        .includes(currentLocale) // Проверьте, что текущий язык есть в списке действительных языков
    ) {
      // Перенаправить к пути без префикса языка
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Оберните дочерние элементы в IntlayerProvider и установите текущий язык
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфические для языка.
 * Использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата языка (например, /ru/, /fr/) и сопоставления всех последующих путей
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление языком
      />

      {
        // Если префикса языка по умолчанию не добавлено, выведите дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление языком
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Параллельно вы также можете использовать `intLayerMiddlewarePlugin` для добавления серверной маршрутизации в ваше приложение. Этот плагин автоматически определит текущий язык на основе URL и установит соответствующий язык cookie. Если язык не указан, плагин определит наиболее подходящий язык на основе языковых предпочтений браузера пользователя. Если язык не будет определен, он будет перенаправлен на язык по умолчанию.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Дополнительно) Шаг 8: Измените URL при изменении локали

Чтобы изменить URL, когда локаль меняется, вы можете использовать пропс `onLocaleChange`, предоставленный хуком `useLocale`. Параллельно вы можете использовать хуки `useLocation` и `useNavigate` из `react-router-dom` для обновления пути URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const location = useLocation(); // Получите текущий URL-адрес. Пример: /ru/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Сформировать URL с обновленной локалью
    // Пример: /es/about с установленной локалью на испанский
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Обновить путь URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык в своём собственном языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés с текущей локалью, установленной на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык в своём собственном языке - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // Получите текущий URL-адрес. Пример: /ru/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Сформировать URL с обновленной локалью
    // Пример: /es/about с установленной локалью на испанский
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Обновить путь URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык в своем собственном языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés с текущей локалью, установленной на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык в своем собственном языке - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // Получите текущий URL-адрес. Пример: /ru/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Сформировать URL с обновленной локалью
    // Пример: /es/about с установленной локалью на испанский
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Обновить путь URL
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык в своём собственном языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés с текущей локалью, установленной на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык в своём собственном языке - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Ссылки на документацию:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Конфигурация TypeScript

Intlayer использует расширение модуля, чтобы получить преимущества TypeScript и сделать вашу кодовую базу более надежной.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ваша пользовательская конфигурация
  "include": [
    "src",
    "types", // <- Включите автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, создаваемые Intlayer. Это позволяет избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорируйте файлы, создаваемые Intlayer
.intlayer
```
