---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Перевод вашего сайта на Vite и Preact (i18n)
description: Узнайте, как сделать ваш сайт на Vite и Preact многоязычным. Следуйте документации по интернационализации (i18n) и переводу.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
---

# Начало работы с интернационализацией (i18n) с Intlayer, Vite и Preact

> Этот пакет находится в разработке. Подробнее смотрите в [issue](https://github.com/aymericzip/intlayer/issues/118). Покажите свой интерес к Intlayer для Preact, поставив лайк этому issue.

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-vite-preact-template) на GitHub.

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), созданная для упрощения поддержки многоязычности в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автодополнение и обнаружение ошибок.
- **Воспользуйтесь расширенными возможностями**, такими как динамическое определение и переключение локали.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Preact

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

- **preact-intlayer**
  Пакет, который интегрирует Intlayer с приложением на Preact. Он предоставляет провайдеры контекста и хуки для интернационализации Preact.

- **vite-intlayer**
  Включает плагин Vite для интеграции Intlayer с [сборщиком Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а также middleware для определения предпочтительной локали пользователя, управления cookie и обработки перенаправления URL.

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
// Конфигурация интернационализации
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

> Через этот конфигурационный файл вы можете настроить локализованные URL, перенаправление в промежуточном ПО, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в вашу конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> Плагин Vite `intlayerPlugin()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов деклараций контента и отслеживает их в режиме разработки. Определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявите Ваш Контент

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Логотип Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Редактируйте <code>src/app.tsx</code> и сохраните, чтобы проверить HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Нужно, если вы используете JSX напрямую в .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Логотип Vite",
      es: "Логотип Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Логотип Preact",
      es: "Логотип Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Нажмите на логотипы Vite и Preact, чтобы узнать больше",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Нужно, если вы используете JSX напрямую в .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Логотип Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Логотип Preact",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      ru: "счётчик равен ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      ru: "Отредактируйте src/app.tsx и сохраните, чтобы проверить HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      ru: "Нажмите на логотипы Vite и Preact, чтобы узнать больше",
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
        "ru": "Логотип Vite" // комментарий: перевод для русского языка
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "ru": "Логотип Preact" // комментарий: перевод для русского языка
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "ru": "Vite + Preact" // комментарий: название технологии не переводится
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "ru": "счётчик равен " // комментарий: перевод для русского языка
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "ru": "Отредактируйте src/app.tsx и сохраните, чтобы проверить HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "ru": "Нажмите на логотипы Vite и Preact, чтобы узнать больше"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они будут включены в каталог `contentDir` (по умолчанию, `./src`). И соответствовать расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

> Если ваш файл контента содержит код TSX, возможно, вам потребуется импортировать `import { h } from "preact";` или убедиться, что ваш JSX pragma правильно настроен для Preact.

### Шаг 5: Используйте Intlayer в вашем коде

Получайте доступ к вашим словарям контента по всему приложению:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Предполагается, что у вас есть preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Предполагается, что ваш CSS-файл называется app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> Примечание: В Preact `className` обычно пишется как `class`.

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md) (API аналогично для `preact-intlayer`).

### (Необязательно) Шаг 6: Изменение языка вашего контента

Для изменения языка вашего контента вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответственно.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Изменить язык на английский
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Изменить язык на английский
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Изменить язык на английский
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API аналогично для `preact-intlayer`).

### (Необязательно) Шаг 7: Добавьте локализованную маршрутизацию в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и URL, дружественных к SEO.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для локали по умолчанию. Если вы хотите добавить префикс для локали по умолчанию, вы можете установить опцию `middleware.prefixDefault` в значение `true` в вашей конфигурации. Подробнее смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который обернет маршруты вашего приложения и будет обрабатывать маршрутизацию на основе локали. Вот пример с использованием [preact-iso](https://github.com/preactjs/preact-iso):

Сначала установите `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением и проверкой локали на основе URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Определяем текущую локаль, используя локаль по умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удаляем префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault установлено в true, префикс с локалью по умолчанию должен всегда использоваться.
   */
  if (middleware.prefixDefault) {
    // Проверка локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправление на локаль по умолчанию с обновлённым путём
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
     * Когда middleware.prefixDefault равно false, префикс локали по умолчанию не используется.
     * Убедитесь, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, входит ли текущая локаль в список допустимых локалей
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

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент маршрутизатора, который настраивает маршруты с учетом локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Импорт необходимых зависимостей и функций
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Необходимо для JSX

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Он управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Определяем текущую локаль, используя локаль по умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удаляем префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, префикс локали по умолчанию всегда должен присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверяем корректность локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправляем на локаль по умолчанию с обновлённым путём
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Заменяем текущую запись в истории на новую
        />
      );
    }

    // Оборачиваем дочерние элементы в IntlayerProvider и устанавливаем текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Если middleware.prefixDefault равно false, локаль по умолчанию не префиксируется.
     * Убедитесь, что текущая локаль валидна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверить, входит ли текущая локаль в список допустимых локалей
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент маршрутизатора, который настраивает маршруты с учетом локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Импорт необходимых зависимостей и функций
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Необходимо для JSX

// Деструктуризация конфигурации из Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Компонент, который обрабатывает локализацию и оборачивает дочерние элементы в соответствующий контекст локали.
 * Управляет определением и проверкой локали на основе URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Определяем текущую локаль, по умолчанию используем локаль по умолчанию, если не указана
  const currentLocale = locale ?? defaultLocale;

  // Удаляем префикс локали из пути для построения базового пути
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Текущий путь URL
  );

  /**
   * Если middleware.prefixDefault равно true, префикс локали по умолчанию всегда должен присутствовать.
   */
  if (middleware.prefixDefault) {
    // Проверяем валидность локали
    if (!locale || !locales.includes(locale)) {
      // Перенаправляем на локаль по умолчанию с обновлённым путём
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
     * Когда middleware.prefixDefault равно false, префикс для локали по умолчанию не используется.
     * Убедиться, что текущая локаль действительна и не является локалью по умолчанию.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Исключить локаль по умолчанию
        )
        .includes(currentLocale) // Проверяем, находится ли текущая локаль в списке допустимых локалей
    ) {
      // Перенаправляем на путь без префикса локали
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Оборачиваем дочерние элементы в IntlayerProvider и устанавливаем текущую локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент маршрутизатора, который настраивает маршруты с учетом локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Затем вы можете использовать компонент `LocaleRouter` в вашем приложении:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Ваш компонент AppContent (определённый на Шаге 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Ваш компонент AppContent (определённый на Шаге 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Ваш компонент AppContent (определённый на Шаге 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Параллельно вы также можете использовать `intLayerMiddlewarePlugin` для добавления маршрутизации на стороне сервера в ваше приложение. Этот плагин автоматически определит текущую локаль на основе URL и установит соответствующее cookie с локалью. Если локаль не указана, плагин определит наиболее подходящую локаль на основе языковых предпочтений браузера пользователя. Если локаль не будет обнаружена, произойдет перенаправление на локаль по умолчанию.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Необязательно) Шаг 8: Изменение URL при смене локали

Чтобы изменить URL при смене локали, вы можете использовать проп `onLocaleChange`, предоставляемый хуком `useLocale`. Параллельно вы можете использовать `useLocation` и `route` из `preact-iso` для обновления пути URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso предоставляет полный URL
      // Формируем URL с обновлённой локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Обновляем путь URL
      route(pathWithLocale, true); // true для замены
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Программная навигация после установки локали будет обработана в onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль - например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык на его собственной локали - например, Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Для JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Для JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Ссылки на документацию:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API аналогично для `preact-intlayer`)
> > - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> > - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> > - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> > - Атрибут [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ru)
> > - Атрибут [`lang`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/lang)
> > - Атрибут [`dir`](https://developer.mozil
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API аналогично для `preact-intlayer`)
> > - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> > - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> > - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> > - Атрибут [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ru)
> > - Атрибут [`lang`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/lang)
> > - Атрибут [`dir`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/dir)
> > - Атрибут [`aria-current`](https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> > - [API Popover](https://developer.mozilla.org/ru/docs/Web/API/Popover_API) la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Ниже приведён обновлённый **Шаг 9** с дополнительными пояснениями и уточнёнными примерами кода:

---

### (Необязательно) Шаг 9: Переключение атрибутов языка и направления в HTML

Когда ваше приложение поддерживает несколько языков, крайне важно обновлять атрибуты `lang` и `dir` тега `<html>`, чтобы они соответствовали текущей локали. Это обеспечивает:

- **Доступность**: Экранные читалки и вспомогательные технологии полагаются на правильный атрибут `lang` для корректного произношения и интерпретации контента.
- **Отображение текста**: Атрибут `dir` (направление) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для удобочитаемости.
- **SEO**: Поисковые системы используют атрибут `lang` для определения языка вашей страницы, что помогает показывать правильный локализованный контент в результатах поиска.

Обновляя эти атрибуты динамически при смене локали, вы обеспечиваете последовательный и доступный опыт для пользователей на всех поддерживаемых языках.

#### Реализация хука

Создайте пользовательский хук для управления атрибутами HTML. Хук отслеживает изменения локали и обновляет атрибуты соответствующим образом:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента <html> в зависимости от текущей локали.
 * - `lang`: Информирует браузеры и поисковые системы о языке страницы.
 * - `dir`: Обеспечивает правильный порядок чтения (например, 'ltr' для английского, 'rtl' для арабского).
 *
 * Динамическое обновление необходимо для правильного отображения текста, доступности и SEO.
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Обновляет атрибуты `lang` и `dir` элемента HTML <html> в зависимости от текущей локали.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Использование хука в вашем приложении

Интегрируйте хук в ваш главный компонент, чтобы атрибуты HTML обновлялись при каждом изменении локали:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer уже импортирован, если AppContent его требует
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Определение AppContent из Шага 5

const AppWithHooks: FunctionalComponent = () => {
  // Применяем хук для обновления атрибутов lang и dir тега <html> в зависимости от локали.
  useI18nHTMLAttributes();

  // Предполагается, что AppContent — это ваш основной компонент отображения контента из Шага 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Определение AppContent из Шага 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Определение AppContent из Шага 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Применяя эти изменения, ваше приложение будет:

- Обеспечивать корректное отражение текущей локали в атрибуте **языка** (`lang`), что важно для SEO и поведения браузера.
- Настраивать **направление текста** (`dir`) в соответствии с локалью, улучшая читаемость и удобство использования для языков с разным порядком чтения.
- Обеспечить более **доступный** опыт, так как вспомогательные технологии зависят от этих атрибутов для оптимальной работы.

### (Необязательно) Шаг 10: Создание локализованного компонента Link

Чтобы гарантировать, что навигация вашего приложения учитывает текущую локаль, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс текущего языка к внутренним URL.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL помогают поисковым системам правильно индексировать страницы на разных языках и предоставлять пользователям контент на предпочитаемом языке.
- **Последовательность**: Используя локализованную ссылку во всем приложении, вы гарантируете, что навигация останется в пределах текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL.

Для Preact с `preact-iso` обычно используются стандартные теги `<a>` для навигации, а маршрутизацию обрабатывает `preact-iso`. Если вам нужна программная навигация по клику (например, чтобы выполнить действия перед переходом), вы можете использовать функцию `route` из `useLocation`. Вот как можно создать пользовательский компонент ссылки, который локализует URL:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Предполагается, что useLocation и route могут быть из preact-iso через preact-intlayer, если они реэкспортированы, или импортировать напрямую
// Если не реэкспортируется, импортируйте напрямую: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Для HTMLAttributes
import { forwardRef } from "preact/compat"; // Для передачи ref

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Необязательно: для замены состояния истории
}

/**
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Кастомный компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl` для добавления префикса локали к URL (например, /fr/about).
 * Это гарантирует, что навигация останется в контексте той же локали.
 * Используется стандартный тег <a>, но может инициировать навигацию на стороне клиента с помощью `route` из preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // из preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Убедиться, что href определён
        event.button === 0 && // Левая кнопка мыши
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Проверка стандартных модификаторов
        !props.target // Не открывать в новой вкладке/окне
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Переходить только если URL отличается
          route(hrefI18n, replace); // Использовать route из preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // Импорт из preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Для JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Импорт из preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Для JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

// Проверяет, является ли ссылка внешней
const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // Получение текущей локали
    const location = useLocation(); // Получение текущего местоположения
    const isExternalLink = checkIsExternalLink(href); // Проверка, внешняя ли ссылка

    // Локализованный URL, если ссылка внутренняя
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Как это работает

- **Определение внешних ссылок**:  
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются без изменений.
- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль.
- **Локализация URL**:  
  Для внутренних ссылок функция `getLocalizedUrl` добавляет префикс текущей локали к URL.
- **Навигация на стороне клиента**:
  Функция `handleClick` проверяет, является ли ссылка внутренней и нужно ли предотвратить стандартную навигацию. Если да, она использует функцию `route` из `preact-iso` (полученную через `useLocation` или импортированную напрямую) для выполнения навигации на стороне клиента. Это обеспечивает поведение, похожее на SPA, без полной перезагрузки страницы.
- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL и пользовательским обработчиком клика.

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы получить преимущества TypeScript и сделать вашу кодовую базу более надежной.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Рекомендуется для Preact 10+
    // ...
  },
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

> Убедитесь, что ваш `tsconfig.json` настроен для Preact, особенно параметры `jsx` и `jsxImportSource` или `jsxFactory`/`jsxFragmentFactory` для старых версий Preact, если вы не используете настройки по умолчанию `preset-vite`.

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш Git-репозиторий.

Чтобы сделать это, вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из магазина расширений VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автозаполнение** ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведенного контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации по расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
