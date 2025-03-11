# Начало работы с интернационализацией (i18n) с Intlayer, Vite и React

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека с открытым исходным кодом для интернационализации (i18n), разработанная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении Vite и React

### Шаг 1: Установка зависимостей

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **react-intlayer**
  Пакет, интегрирующий Intlayer с приложением React. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также middleware для определения предпочтительной локали пользователя, управления cookies и обработки перенаправлений URL.

### Шаг 2: Конфигурация вашего проекта

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправления middleware, имена cookies, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

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

> Плагин `intlayerPlugin()` для Vite используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов декларации контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в приложении Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявление вашего контента

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      ru: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Не забудьте импортировать React, если вы используете React node в вашем контенте
      ru: (
        <>
          Редактируйте <code>src/App.tsx</code> и сохраните, чтобы
          протестировать HMR
        </>
      ),
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
      ru: "Нажмите на логотипы Vite и React, чтобы узнать больше",
      en: "Click on the Vite and React logos to learn more",
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
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Не забудьте импортировать React, если вы используете React node в вашем контенте
        ru: (
          <>
            Редактируйте <code>src/App.tsx</code> и сохраните, чтобы
            протестировать HMR
          </>
        ),
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
      },

    readTheDocs: t({
      ru: "Нажмите на логотипы Vite и React, чтобы узнать больше",
      en: "Click on the Vite and React logos to learn more",
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
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      ru: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      ru: "счет равен ",
      en: "count is ",
      fr: "le compte est ",
---

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "ru": "Логотип Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "ru": "Логотип React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "ru": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ru": "счёт равен "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "ru": "Отредактируйте src/App.tsx и сохраните, чтобы протестировать HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "ru": "Нажмите на логотипы Vite и React, чтобы узнать больше"
      }
    }
  }
}
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла декларации контента (по умолчанию, `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Для получения более подробной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).
> Если ваш файл контента включает код TSX, вам следует рассмотреть возможность импорта `import React from "react";` в ваш файл контента.

### Шаг 5: Используйте Intlayer в вашем коде

Получите доступ к словарям контента через ваше приложение:

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

> Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md).

### (Опционально) Шаг 6: Измените язык вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответствующим образом.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Изменить язык на английский
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

### (Необязательно) Шаг 7: Добавьте локализованные маршруты в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и SEO-дружественных URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для языка по умолчанию. Если вы хотите добавить префикс для языка по умолчанию, вы можете установить опцию `middleware.prefixDefault` в `true` в вашей конфигурации. Подробнее см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

Чтобы добавить локализованные маршруты в ваше приложение, вы можете создать компонент `LocaleRouter`, который оборачивает маршруты вашего приложения и обрабатывает маршрутизацию на основе языка. Вот пример с использованием [React Router](https://reactrouter.com/home):

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
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст языка.
 * Управляет определением и проверкой языка на основе URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Получение текущего пути URL

  // Определение текущего языка, с использованием языка по умолчанию, если не указан
  const currentLocale = locale ?? defaultLocale;

  // Удаление префикса языка из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault установлено в true, язык по умолчанию всегда должен быть с префиксом.
   */
  if (middleware.prefixDefault) {
    // Проверка языка
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на язык по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замена текущей записи в истории на новую
        />
      );
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущего языка
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault установлено в false, язык по умолчанию не имеет префикса.
     * Убедитесь, что текущий язык действителен и не является языком по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключение языка по умолчанию
        )
        .includes(currentLocale) // Проверка, находится ли текущий язык в списке допустимых языков
    ) {
      // Перенаправление на путь без префикса языка
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущего языка
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты для конкретных языков.
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
            // Шаблон маршрута для захвата языка (например, /en/, /fr/) и соответствия всем последующим путям
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением языком
          />
        ))}

      {
        // Если префикс для языка по умолчанию отключен, рендеринг дочерних элементов непосредственно в корневом пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением языком
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
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст языка.
 * Управляет определением и проверкой языка на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Получение текущего пути URL

  // Определение текущего языка, с использованием языка по умолчанию, если не указан
  const currentLocale = locale ?? defaultLocale;

  // Удаление префикса языка из пути для создания базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault установлено в true, язык по умолчанию всегда должен быть с префиксом.
   */
  if (middleware.prefixDefault) {
    // Проверка языка
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на язык по умолчанию с обновленным путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замена текущей записи в истории на новую
        />
      );
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущего языка
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault установлено в false, язык по умолчанию не имеет префикса.
     * Убедитесь, что текущий язык действителен и не является языком по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключение языка по умолчанию
        )
        .includes(currentLocale) // Проверка, находится ли текущий язык в списке допустимых языков
    ) {
      // Перенаправление на путь без префикса языка
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачивание дочерних элементов с помощью IntlayerProvider и установка текущего языка
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

// Импорт необходимых зависимостей и функций
const { configuration, getPathWithoutLocale } = require("intlayer"); // Утилиты и типы из 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Провайдер для контекста интернационализации
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Компоненты маршрутизации для управления навигацией

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

    // Оборачивание дочерних элементов с использованием IntlayerProvider и установка текущей локали
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

    // Оборачивание дочерних элементов с использованием IntlayerProvider и установка текущей локали
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты, зависящие от локали.
 * Использует React Router для управления навигацией и отображения локализованных компонентов.
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
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивание дочерних элементов с управлением локалями
          />
        ))}

      {
        // Если префикс локали по умолчанию отключен, отображайте дочерние элементы непосредственно в корневом пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивание дочерних элементов с управлением локалями
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Затем вы можете использовать компонент `LocaleRouter` в своем приложении:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

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

Параллельно вы также можете использовать `intLayerMiddlewarePlugin` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определяет текущую локаль на основе URL и устанавливает соответствующий cookie локали. Если локаль не указана, плагин определяет наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не обнаружена, он перенаправляет на локаль по умолчанию.

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

### (Опционально) Шаг 8: Изменение URL при смене локали

Чтобы изменить URL при смене локали, вы можете использовать проп `onLocaleChange`, предоставляемый хуком `useLocale`. Параллельно вы можете использовать хуки `useLocation` и `useNavigate` из `react-router-dom` для обновления пути URL.

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
  const { pathname, search } = useLocation(); // Получение текущего пути URL. Пример: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Построить URL с обновленным языком
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
              {/* Язык на своем языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés, если текущая локаль установлена на Locales.SPANISH */}
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
      // Построить URL с обновленным языком
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
              {/* Язык на своем языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés, если текущая локаль установлена на Locales.SPANISH */}
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
      // Построить URL с обновленным языком
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
              {/* Язык на своем языке - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - например, Francés, если текущая локаль установлена на Locales.SPANISH */}
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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ru)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (Опционально) Шаг 9: Переключение атрибутов языка и направления HTML

Когда ваше приложение поддерживает несколько языков, важно обновлять атрибуты `lang` и `dir` тега `<html>` в соответствии с текущей локалью. Это обеспечивает:

- **Доступность**: Читалки экрана и вспомогательные технологии используют правильный атрибут `lang` для точного произношения и интерпретации контента.
- **Отображение текста**: Атрибут `dir` (направление) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для читаемости.
- **SEO**: Поисковые системы используют атрибут `lang` для определения языка вашей страницы, помогая предоставлять правильный локализованный контент в результатах поиска.

Динамически обновляя эти атрибуты при изменении локали, вы гарантируете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

#### Реализация Hook

Создайте пользовательский hook для управления атрибутами HTML. Hook отслеживает изменения локали и обновляет атрибуты соответствующим образом:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для корректного отображения текста, доступности и SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновить атрибут языка до текущей локали.
    document.documentElement.lang = locale;

    // Установить направление текста в зависимости от текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для корректного отображения текста, доступности и SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновить атрибут языка до текущей локали.
    document.documentElement.lang = locale;

    // Установить направление текста в зависимости от текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для корректного отображения текста, доступности и SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновить атрибут языка до текущей локали.
    document.documentElement.lang = locale;

    // Установить направление текста в зависимости от текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Использование хука в вашем приложении

Интегрируйте хук в ваш основной компонент, чтобы атрибуты HTML обновлялись при изменении локали:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Применить хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Применить хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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
  // Применить хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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
- Настраивать **направление текста** (`dir`) в соответствии с локалью, улучшая читаемость и удобство использования для языков с разным порядком чтения.
- Предоставлять более **доступный** опыт, так как вспомогательные технологии зависят от этих атрибутов для оптимальной работы.

### (Опционально) Шаг 10: Создание локализованного компонента Link

Чтобы обеспечить, что навигация вашего приложения учитывает текущую локаль, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс к внутренним URL-адресам с текущим языком, например, когда пользователь, говорящий на французском, нажимает на ссылку на страницу "О нас", он будет перенаправлен на `/ru/about` вместо `/about`.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL-адреса помогают поисковым системам правильно индексировать страницы на определенных языках и предоставляют пользователям контент на их предпочтительном языке.
- **Последовательность**: Используя локализованную ссылку по всему приложению, вы гарантируете, что навигация остается в рамках текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами, делая ваш код более удобным для поддержки и расширения по мере роста приложения.

Ниже представлена реализация локализованного компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Утилита для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl` для добавления префикса URL с локалью (например, /ru/about).
 * Это гарантирует, что навигация остается в рамках текущей локали.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Если ссылка внутренняя и предоставлен допустимый href, получить локализованный URL.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Утилита для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl` для добавления префикса URL с локалью (например, /ru/about).
 * Это гарантирует, что навигация остается в рамках текущей локали.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Если ссылка внутренняя и предоставлен допустимый href, получить локализованный URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Утилита для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Кастомный компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /ru/about).
 * Это гарантирует, что навигация остается в рамках одной локали.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Если ссылка внутренняя и предоставлен допустимый href, получить локализованный URL.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Как это работает

- **Определение внешних ссылок**:  
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются неизменными, так как они не требуют локализации.

- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль (например, `ru` для русского).

- **Локализация URL**:  
  Для внутренних ссылок (т.е. не внешних) используется `getLocalizedUrl`, чтобы автоматически добавить префикс локали к URL. Это означает, что если ваш пользователь находится на русском языке, передача `/about` в качестве `href` преобразует его в `/ru/about`.

- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL, обеспечивая навигацию, соответствующую локали.

Интегрируя этот компонент `Link` в вашем приложении, вы поддерживаете согласованный и ориентированный на язык пользовательский опыт, а также улучшаете SEO и удобство использования.

### Настройка TypeScript

Intlayer использует расширение модулей для получения преимуществ TypeScript и укрепления вашей кодовой базы.

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

### Настройка TypeScript

Intlayer использует расширение модулей для получения преимуществ TypeScript и укрепления вашей кодовой базы.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваша существующая конфигурация TypeScript
  "include": [
    // ... Ваша существующая конфигурация TypeScript
    ".intlayer/**/*.ts", // Включите автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит вам избежать их добавления в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Дальнейшие шаги

Чтобы углубиться, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md).
