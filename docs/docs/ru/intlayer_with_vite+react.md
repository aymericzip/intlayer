---
createdAt: 2024-03-07
updatedAt: 2024-03-07
title: Начало работы с Intlayer в Vite + React
description: Узнайте, как добавить интернационализацию (i18n) в ваше приложение на Vite и React с помощью Intlayer. Следуйте этому руководству, чтобы сделать ваше приложение многоязычным.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4---

# Начало работы с интернационализацией (i18n) с Intlayer, Vite и React

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-vite-react-template) на GitHub.

<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), созданная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управляйте переводами** с помощью декларативных словарей на уровне компонентов.
- **Динамически локализуйте метаданные**, маршруты и контент.
- **Обеспечьте поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Воспользуйтесь расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и React

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **react-intlayer**
  Пакет, который интегрирует Intlayer с приложением на React. Он предоставляет провайдеры контекста и хуки для интернационализации в React.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

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

> Через этот файл конфигурации вы можете настроить локализованные URL-адреса, перенаправление в промежуточном ПО, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

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

> Плагин Vite `intlayerPlugin()` используется для интеграции Intlayer с Vite. Он обеспечивает создание файлов деклараций контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявите Ваш Контент

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

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
      en: (
        <>
          Редактируйте <code>src/App.tsx</code> и сохраните, чтобы проверить HMR
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
      en: "Нажмите на логотипы Vite и React, чтобы узнать больше",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} соответствует Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Логотип Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "Логотип React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "счет: ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Не забудьте импортировать React, если используете React-узел в вашем контенте
        en: (
          <>
            Edit <code>src/App.tsx</code> и сохраните, чтобы проверить HMR
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
      en: "Нажмите на логотипы Vite и React, чтобы узнать больше",
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

    edit:
      t <
      ReactNode >
      {
        // Не забудьте импортировать React, если вы используете React node в вашем контенте
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
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      ru: "Нажмите на логотипы Vite и React, чтобы узнать больше",
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
        "ru": "счётчик равен "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "ru": "Отредактируйте src/App.tsx и сохраните, чтобы проверить HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "ru": "Нажмите на логотипы Vite и React, чтобы узнать больше"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они включены в каталог `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

> Если ваш файл контента включает код TSX, рекомендуется импортировать `import React from "react";` в вашем файле контента.

### Шаг 5: Использование Intlayer в вашем коде

Получайте доступ к вашим словарям контента по всему приложению:

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
            alt={content.reactLogo.value} // альтернативный текст для логотипа React
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

> Если вы хотите использовать ваш контент в атрибуте типа `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md).

### (Необязательно) Шаг 6: Изменение языка вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответственно.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
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

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md).

### (Необязательно) Шаг 7: Добавьте локализованную маршрутизацию в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и URL, дружественных к SEO.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для локали по умолчанию. Если вы хотите добавить префикс для локали по умолчанию, вы можете установить опцию `middleware.prefixDefault` в значение `true` в вашей конфигурации. Подробнее смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

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
} from "react-router-dom"; // Компоненты роутера для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением и проверкой локали на основе URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Получить текущий путь URL

  // Определить текущую локаль, используя локаль по умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для формирования базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, префикс локали по умолчанию должен всегда присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверить валидность локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на локаль по умолчанию с обновлённым путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Заменить текущую запись истории новой
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, локаль по умолчанию не префиксируется.
     * Убедиться, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправить на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты для конкретных локалей.
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
            // Шаблон маршрута для захвата локали (например, /en/, /fr/) и соответствия всем последующим путям
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалью
          />
        ))}

      {
        // Если префикс для локали по умолчанию отключен, рендерить дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением локалью
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
// Утилиты и типы из 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контекста интернационализации
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Компоненты роутера для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Получить текущий путь URL

  // Определить текущую локаль, используя локаль по умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, префикс локали по умолчанию должен всегда присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверить локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на локаль по умолчанию с обновлённым путем
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Заменить текущую запись в истории на новую
        />
      );
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Когда middleware.prefixDefault равно false, префикс для локали по умолчанию не используется.
     * Убедиться, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправить на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент маршрутизатора, который настраивает маршруты для конкретных локалей.
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
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалью
          />
        ))}

      {
        // Если префикс для локали по умолчанию отключен, рендерить дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением локалью
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
} = require("react-router-dom"); // Компоненты роутера для управления навигацией

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Получить текущий путь URL

  // Определить текущую локаль, используя локаль по умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удалить префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, локаль по умолчанию всегда должна иметь префикс.
   */
  if (middleware.prefixDefault) {
    // Проверить валидность локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправить на локаль по умолчанию с обновлённым путём
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
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
     * Когда middleware.prefixDefault равно false, префикс для локали по умолчанию не добавляется.
     * Убедиться, что текущая локаль валидна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, что текущая локаль есть в списке валидных локалей
    ) {
      // Перенаправить на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обернуть дочерние элементы в IntlayerProvider и установить текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Компонент роутера, который настраивает маршруты для конкретных локалей.
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
            // Шаблон маршрута для захвата локали (например, /en/, /fr/) и всех последующих путей
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Оборачивает дочерние элементы с управлением локалью
          />
        ))}

      {
        // Если префикс для локали по умолчанию отключен, рендерить дочерние элементы напрямую по корневому пути
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Оборачивает дочерние элементы с управлением локалью
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

Параллельно вы также можете использовать `intLayerMiddlewarePlugin` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующее cookie с локалью. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не будет обнаружена, произойдет перенаправление на локаль по умолчанию.

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

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Необязательно) Шаг 8: Изменение URL при смене локали

Чтобы изменить URL при смене локали, вы можете использовать проп `onLocaleChange`, предоставляемый хуком `useLocale`. Параллельно можно использовать хуки `useLocation` и `useNavigate` из `react-router-dom` для обновления пути URL.

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
  const { pathname, search } = useLocation(); // Получаем текущий путь URL. Пример: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Формируем URL с обновлённой локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Обновляем путь URL
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
              {/* Язык на его собственной локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés при текущей локали Locales.SPANISH */}
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Сформировать URL с обновленной локалью
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
              {/* Язык на его собственной локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем локале - например, Francés при установленном локале Locales.SPANISH */}
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
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

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Сформировать URL с обновленной локалью
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
              {/* Язык на его собственной локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском — например, French */}
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
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Ниже приведён обновлённый **Шаг 9** с дополнительными объяснениями и уточнёнными примерами кода:

---

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления в теге HTML

Когда ваше приложение поддерживает несколько языков, крайне важно обновлять атрибуты `lang` и `dir` тега `<html>`, чтобы они соответствовали текущей локали. Это обеспечивает:

- **Доступность**: программы чтения с экрана и вспомогательные технологии полагаются на правильный атрибут `lang` для точного произношения и интерпретации контента.
- **Отображение текста**: атрибут `dir` (направление) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для удобочитаемости.
- **SEO**: поисковые системы используют атрибут `lang` для определения языка вашей страницы, помогая показывать правильный локализованный контент в результатах поиска.

Обновляя эти атрибуты динамически при изменении локали, вы гарантируете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

#### Реализация хука

Создайте пользовательский хук для управления атрибутами HTML. Хук отслеживает изменения локали и обновляет атрибуты соответствующим образом:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента <html> в зависимости от текущей локали.
 * - `lang`: сообщает браузерам и поисковым системам язык страницы.
 * - `dir`: обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Это динамическое обновление необходимо для правильного отображения текста, доступности и SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновляет атрибут языка на текущую локаль.
    document.documentElement.lang = locale;

    // Устанавливает направление текста в зависимости от текущей локали.
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
 * Это динамическое обновление необходимо для правильного отображения текста, доступности и SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Обновить атрибут языка на текущую локаль.
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
    // Обновляем атрибут языка на текущую локаль.
    document.documentElement.lang = locale;

    // Устанавливаем направление текста в зависимости от текущей локали.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Использование хука в вашем приложении

Интегрируйте хук в ваш главный компонент, чтобы атрибуты HTML обновлялись при каждом изменении локали:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Применяем хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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
  // Применяем хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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
  // Применяем хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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

- Обеспечивать корректное отражение текущей локали в атрибуте **language** (`lang`), что важно для SEO и поведения браузера.
- Регулировать **направление текста** (`dir`) в соответствии с локалью, улучшая читаемость и удобство для языков с разным порядком чтения.
- Обеспечивать более **доступный** опыт, так как вспомогательные технологии зависят от этих атрибутов для оптимальной работы.

### (Необязательно) Шаг 10: Создание локализованного компонента ссылки

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Примените хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
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

- Обеспечивать корректное отражение текущей локали в атрибуте **языка** (`lang`), что важно для SEO и поведения браузера.
- Настраивать **направление текста** (`dir`) в соответствии с локалью, улучшая читаемость и удобство использования для языков с разным порядком чтения.
- Обеспечивать более **доступный** опыт, так как вспомогательные технологии зависят от этих атрибутов для оптимальной работы.

### (Необязательно) Шаг 10: Создание локализованного компонента Link

Чтобы обеспечить навигацию вашего приложения с учётом текущей локали, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс текущего языка к внутренним URL, например, когда франкоязычный пользователь нажимает на ссылку на страницу "О нас", его перенаправляет на `/fr/about` вместо `/about`.

Такое поведение полезно по нескольким причинам:

- **SEO и удобство для пользователя**: Локализованные URL помогают поисковым системам правильно индексировать страницы на разных языках и предоставлять пользователям контент на предпочитаемом языке.
- **Последовательность**: Используя локализованную ссылку по всему приложению, вы гарантируете, что навигация остаётся в рамках текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами, делая ваш код более удобным для поддержки и расширения по мере роста приложения.

Ниже приведена реализация локализованного компонента `Link` на TypeScript:

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
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация останется в контексте той же локали.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Если ссылка внутренняя и href валиден, получить локализованный URL.
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
 * Кастомный компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация остается в контексте одной локали.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Если ссылка внутренняя и предоставлен действительный href, получить локализованный URL.
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
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация останется в контексте той же локали.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Если ссылка внутренняя и задан корректный href, получить локализованный URL.
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
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются без изменений, так как им не требуется локализация.

- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль (например, `fr` для французского).

- **Локализация URL**:  
  Для внутренних ссылок (то есть не внешних) используется `getLocalizedUrl`, который автоматически добавляет префикс локали к URL. Это означает, что если пользователь использует французский язык, передача `/about` в качестве `href` преобразуется в `/fr/about`.

- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL, обеспечивая согласованную навигацию в соответствии с выбранной локалью.

Интегрируя этот компонент `Link` по всему вашему приложению, вы поддерживаете последовательный и ориентированный на язык пользовательский опыт, а также получаете преимущества улучшенного SEO и удобства использования.

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы использовать преимущества TypeScript и сделать вашу кодовую базу более надежной.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведенного контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент во внешний [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## История документа

- 5.5.10 - 2025-06-29: Инициализация истории
