````markdown
# Начало работы с интернационализацией (i18n) с Intlayer и React Create App

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, созданная для упрощения многоязычной поддержки в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и содержимое.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Воспользоваться продвинутыми функциями**, такими как динамическое определение и переключение локали.

---

## Пошаговая инструкция по настройке Intlayer в приложении React

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
```
````

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
```

- **intlayer**

  Основной пакет, который предоставляет инструменты интернационализации для управления конфигурацией, переводами, [декларацией содержимого](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md), транспиляцией и [CLI командами](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **react-intlayer**

  Пакет, который интегрирует Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации React. Кроме того, он включает плагин для интеграции Intlayer с приложением на основе Create React App.

### Шаг 2: Настройка вашего проекта

Создайте файл конфигурации, чтобы настроить языки вашего приложения:

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

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправления промежуточного ПО, имена файлов cookie, расположение и расширение ваших деклараций содержимого, отключить логи Intlayer в консоли и многое другое. Для получения полного списка доступных параметров ознакомьтесь с [документацией по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию CRA

Измените ваши скрипты для использования react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-intlayer build",
    "start": "react-intlayer start",
    "transpile": "intlayer build"
  },
```

> Скрипты `react-intlayer` основаны на [craco](https://craco.js.org/). Вы также можете реализовать свою собственную настройку на основе плагина intlayer craco. [Смотрите пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Шаг 4: Объявите ваше содержимое

Создайте и управляйте вашими декларациями содержимого для хранения переводов:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Измените <code>src/App.tsx</code> и сохраните для перезагрузки
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
        en: "Изучите React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Начните с редактирования",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Изучите React",
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

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Начните с редактирования",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Изучите React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Ваши декларации содержимого могут быть определены в любом месте вашего приложения, как только они включены в директорию `contentDir` (по умолчанию `./src`). И соответствуют расширению файла декларации содержимого (по умолчанию `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Для получения более подробной информации ознакомьтесь с [документацией по декларации содержимого](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).
> Если ваш файл содержимого включает код TSX, вам следует рассмотреть возможность импорта `import React from "react";` в ваш файл содержимого.

### Шаг 5: Используйте Intlayer в вашем коде

Получите доступ к вашим словарям содержимого на протяжении всего вашего приложения:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
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

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
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

> Примечание: Если вы хотите использовать ваше содержимое в строковом атрибуте, таком как `alt`, `title`, `href`, `aria-label` и т.д., вам нужно вызвать значение функции, например:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md).

### (Необязательно) Шаг 6: Измените язык вашего содержимого

Чтобы сменить язык вашего содержимого, вы можете использовать функцию `setLocale`, предоставленную хуком `useLocale`. Эта функция позволяет вам установить локаль приложения и обновить содержимое соответственно.

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

### (Необязательно) Шаг 7: Добавьте локализованную маршрутизацию в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и дружелюбных URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для локали по умолчанию. Если вы хотите префиксировать локаль по умолчанию, вы можете установить опцию `middleware.prefixDefault` в `true` в вашей конфигурации. Смотрите [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md) для получения дополнительной информации.

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который обернет маршруты вашего приложения и обработает маршрутизацию на основе локали. Вот пример с использованием [React Router](https://reactrouter.com/home):

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
} from "react-router-dom"; // Компоненты маршрутизатора для управления навигацией

// Деструктуризация конфигурации Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением и валидацией локали на основе URL.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Получить текущий URL путь
  const { locale } = useParams<{ locale: Locales }>(); // Извлечь параметр локали из URL

  // Определить текущую локаль, используя значение по умолчанию, если оно не предоставлено
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL путь
  );

  /**
   * Если middleware.prefixDefault равно true, префикс по умолчанию всегда должен присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверить локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Заменить текущую запись истории на новую
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, для локали по умолчанию префикс отсутствует.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Убедитесь, что текущая локаль находится в списке действительных локалей
    ) {
      // Перенаправить на путь без префикса локали
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Он использует React Router для управления навигацией и отображения локализованных компонентов.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата локали (например, /en/, /fr/) и соответствия всем последующим путям
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление локализацией
      />

      {
        // Если префикс локали по умолчанию отключен, отрисовывает дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление локализацией
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
} from "react-router-dom"; // Компоненты маршрутизатора для управления навигацией

// Деструктуризация конфигурации Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением и валидацией локали на основе URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Получить текущий URL путь
  const { locale } = useParams(); // Извлечь параметр локали из URL

  // Определить текущую локаль, используя значение по умолчанию, если оно не предоставлено
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL путь
  );

  /**
   * Если middleware.prefixDefault равно true, префикс по умолчанию всегда должен присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверить локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Заменить текущую запись истории на новую
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, для локали по умолчанию префикс отсутствует.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Убедитесь, что текущая локаль находится в списке действительных локалей
    ) {
      // Перенаправить на путь без префикса локали
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Он использует React Router для управления навигацией и отображения локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата локали (например, /en/, /fr/) и соответствия всем последующим путям
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление локализацией
      />

      {
        // Если префикс локали по умолчанию отключен, отрисовывает дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление локализацией
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
} = require("react-router-dom"); // Компоненты маршрутизатора для управления навигацией

// Деструктуризация конфигурации Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением и валидацией локали на основе URL.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Получить текущий URL путь
  const { locale } = useParams(); // Извлечь параметр локали из URL

  // Определить текущую локаль, используя значение по умолчанию, если оно не предоставлено
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    path // Текущий URL путь
  );

  /**
   * Если middleware.prefixDefault равно true, префикс по умолчанию всегда должен присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверить локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на локаль по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Заменить текущую запись истории на новую
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, для локали по умолчанию префикс отсутствует.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Убедитесь, что текущая локаль находится в списке действительных локалей
    ) {
      // Перенаправить на путь без префикса локали
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, специфичные для локали.
 * Он использует React Router для управления навигацией и отображения локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Шаблон маршрута для захвата локали (например, /en/, /fr/) и соответствия всем последующим путям
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление локализацией
      />

      {
        // Если префикс локали по умолчанию отключен, отрисовывает дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Оборачивает дочерние элементы в управление локализацией
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Необязательно) Шаг 8: Измените URL, когда изменяется локаль

Чтобы изменить URL, когда меняется локаль, вы можете использовать свойство `onLocaleChange`, предоставляемое хуком `useLocale`. Параллельно вы можете использовать хуки `useLocation` и `useNavigate` из `react-router-dom` для обновления URL пути.

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
  const location = useLocation(); // Получить текущий URL путь. Пример: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Построить URL с обновленной локалью
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
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на его локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés с установленной текущей локалью на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на его локали - например, FR */}
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
  const location = useLocation(); // Получить текущий URL путь. Пример: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Построить URL с обновленной локалью
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
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на его локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés с установленной текущей локалью на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на его локали - например, FR */}
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
  const location = useLocation(); // Получить текущий URL путь. Пример: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Построить URL с обновленной локалью
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
            href={getLocalizedUrl(location, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на его локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés с установленной текущей локалью на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на его локали - например, FR */}
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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### Настройка TypeScript

Intlayer использует модульную увеличение для получения преимуществ TypeScript и улучшения надежности вашего кода.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает сгенерированные автоматически типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие настройки TypeScript
    "types", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы
```
