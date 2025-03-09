# Начало работы с интернационализацией (i18n) с Intlayer и React Create App

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

## Пошаговое руководство по настройке Intlayer в React-приложении

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [декларацией контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **react-intlayer**

  Пакет, интегрирующий Intlayer с React-приложением. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

- **react-scripts-intlayer**

  Включает команды и плагины `react-scripts-intlayer` для интеграции Intlayer с приложением на основе Create React App. Эти плагины основаны на [craco](https://craco.js.org/) и включают дополнительную конфигурацию для сборщика [Webpack](https://webpack.js.org/).

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

> Через этот файл конфигурации вы можете настроить локализованные URL-адреса, перенаправление через middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию CRA

Измените ваши скрипты для использования react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Скрипты `react-scripts-intlayer` основаны на [CRACO](https://craco.js.org/). Вы также можете реализовать собственную настройку на основе плагина intlayer для craco. [См. пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Шаг 4: Декларация вашего контента

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      ru: (
        <>
          Редактируйте <code>src/App.tsx</code> и сохраните для перезагрузки
        </>
      ),
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ru: "Изучить React",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ru: "Начните с редактирования",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ru: "Изучить React",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      ru: "Начните с редактирования",
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        ru: "Изучить React",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию, `./src`) и соответствуют расширению файла декларации контента (по умолчанию, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Для получения более подробной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).
> Если ваш файл контента включает код TSX, вам следует импортировать `import React from "react";` в ваш файл контента.

### Шаг 5: Использование Intlayer в вашем коде

Получите доступ к вашим словарям контента по всему приложению:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
---

require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="логотип" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Примечание: Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md).

### (Опционально) Шаг 6: Изменение языка вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответствующим образом.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Изменить язык на английский
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Изменить язык на английский
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
    <button onClick={() => setLocale(Locales.English)}>
      Изменить язык на английский
    </button>
  );
};
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md).

### (Опционально) Шаг 7: Добавление локализованной маршрутизации в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и SEO-дружественных URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для локали по умолчанию. Если вы хотите добавить префикс для локали по умолчанию, вы можете установить опцию `middleware.prefixDefault` в `true` в вашей конфигурации. Подробнее смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который оборачивает маршруты вашего приложения и обрабатывает маршрутизацию на основе локали. Вот пример с использованием [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Импорт необходимых зависимостей и функций
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Утилиты и типы из 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Типы React для функциональных компонентов и пропсов
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты маршрутизации для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет обнаружением и проверкой локали на основе URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Получение текущего пути URL

  // Определение текущей локали, с использованием локали по умолчанию, если она не указана
  const currentLocale = locale ?? defaultLocale;

  // Удаление префикса локали из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault установлено в true, локаль по умолчанию всегда должна быть с префиксом.
   */
  if (middleware.prefixDefault) {
    // Проверка локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замена текущей записи в истории на новую
        />
      );
    }

    // Оборачивание дочерних элементов с использованием IntlayerProvider и установки текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault установлено в false, локаль по умолчанию не имеет префикса.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключение локали по умолчанию
        )
        .includes(currentLocale) // Проверка, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправление на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачивание дочерних элементов с использованием IntlayerProvider и установки текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Шаблон маршрута для захвата локали (например, /en/, /fr/) и сопоставления всех последующих путей
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалями
          />
        ))}

      {
        // Если префиксирование локали по умолчанию отключено, рендеринг дочерних элементов непосредственно в корневом пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением локалями
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Импорт необходимых зависимостей и функций
import { configuration, getPathWithoutLocale } from "intlayer"; // Утилиты и типы из 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты маршрутизации для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Получение текущего пути URL

  // Определение текущей локали, с использованием локали по умолчанию, если она не указана
  const currentLocale = locale ?? defaultLocale;

  // Удаление префикса локали из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, локаль по умолчанию всегда должна быть с префиксом.
   */
  if (middleware.prefixDefault) {
    // Проверка локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замена текущей записи в истории на новую
        />
      );
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, локаль по умолчанию не имеет префикса.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключение локали по умолчанию
        )
        .includes(currentLocale) // Проверка, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправление на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Шаблон маршрута для захвата локали (например, /en/, /fr/) и сопоставления всех последующих путей
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалями
          />
        ))}

      {
        // Если префикс локали по умолчанию отключен, рендеринг дочерних элементов непосредственно в корневом пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением локалями
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Импорт необходимых зависимостей и функций
const { configuration, getPathWithoutLocale } = require("intlayer"); // Утилиты и типы из 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Провайдер для контекста интернационализации
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Компоненты маршрутизатора для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Получение текущего пути URL

  // Определение текущей локали, с использованием локали по умолчанию, если она не указана
  const currentLocale = locale ?? defaultLocale;

  // Удаление префикса локали из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, локаль по умолчанию всегда должна быть с префиксом.
   */
  if (middleware.prefixDefault) {
    // Проверка локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замена текущей записи в истории на новую
        />
      );
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, локаль по умолчанию не имеет префикса.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключение локали по умолчанию
        )
        .includes(currentLocale) // Проверка, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправление на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Использует React Router для управления навигацией и рендеринга локализованных компонентов.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Шаблон маршрута для захвата локали (например, /en/, /fr/) и сопоставления всех последующих путей
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалями
          />
        ))}

      {
        // Если префикс локали по умолчанию отключен, рендеринг дочерних элементов непосредственно в корневом пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением локалями
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Затем вы можете использовать компонент `LocaleRouter` в вашем приложении:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import { FC } from "react";

// ... Ваш компонент AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Ваш компонент AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Ваш компонент AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Опционально) Шаг 8: Изменение URL при смене локали

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
  const { pathname, search } = useLocation(); // Получить текущий путь URL. Пример: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Построить URL с обновленной локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Обновить путь URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль - например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык в своей локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык в текущей локали - например, Francés при текущей локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // Получить текущий путь URL. Пример: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Построить URL с обновленной локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Обновить путь URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль - например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык в своей локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык в текущей локали - например, Francés при текущей локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // Получить текущий путь URL. Пример: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Построить URL с обновленной локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Обновить путь URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль - например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык в своей локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык в текущей локали - например, Francés при текущей локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления HTML

Когда ваше приложение поддерживает несколько языков, важно обновлять атрибуты `lang` и `dir` тега `<html>` в соответствии с текущей локалью. Это обеспечивает:

- **Доступность**: Читалки экрана и вспомогательные технологии полагаются на правильный атрибут `lang` для точного произношения и интерпретации контента.
- **Отображение текста**: Атрибут `dir` (направление) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для читаемости.

Обновляя эти атрибуты динамически при изменении локали, вы гарантируете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

#### Реализация хука

Создайте пользовательский хук для управления HTML-атрибутами. Хук отслеживает изменения локали и соответственно обновляет атрибуты:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> на основе текущей локали.
 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для правильного отображения текста, доступности и SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновляет атрибут языка на текущую локаль.
    document.documentElement.lang = locale;

    // Устанавливает направление текста на основе текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> на основе текущей локали.
 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для правильного отображения текста, доступности и SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновляет атрибут языка на текущую локаль.
    document.documentElement.lang = locale;

    // Устанавливает направление текста на основе текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> на основе текущей локали.
 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для правильного отображения текста, доступности и SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновляет атрибут языка на текущую локаль.
    document.documentElement.lang = locale;

    // Устанавливает направление текста на основе текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Использование хука в вашем приложении

Интегрируйте хук в ваш основной компонент, чтобы атрибуты HTML обновлялись при изменении локали:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Примените хук для обновления атрибутов lang и dir тега <html> на основе локали.
  useI18nHTMLAttributes();

  // ... Остальная часть вашего компонента
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Примените хук для обновления атрибутов lang и dir тега <html> на основе локали.
  useI18nHTMLAttributes();

  // ... Остальная часть вашего компонента
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Примените хук для обновления атрибутов lang и dir тега <html> на основе локали.
  useI18nHTMLAttributes();

  // ... Остальная часть вашего компонента
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Применяя эти изменения, ваше приложение будет:

- Обеспечивать, чтобы атрибут **языка** (`lang`) корректно отражал текущую локаль, что важно для SEO и поведения браузера.
- Настраивать **направление текста** (`dir`) в соответствии с локалью, улучшая читаемость и удобство использования для языков с различными порядками чтения.
- Предоставлять более **доступный** опыт, так как вспомогательные технологии зависят от этих атрибутов для оптимальной работы.

### Настройка TypeScript

Intlayer использует расширение модулей для получения преимуществ TypeScript и укрепления вашего кода.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие настройки TypeScript
    ".intlayer/**/*.ts", // Включите автогенерируемые типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их добавления в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Дальнейшие шаги

Для дальнейшего развития вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с использованием [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md).
