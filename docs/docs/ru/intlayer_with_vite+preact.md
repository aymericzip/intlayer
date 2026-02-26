---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite + Preact i18n - Как перевести приложение Preact в 2026
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Добавить команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Переведите ваш сайт на Vite и Preact с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения поддержки многоязычности в современных веб-приложениях.

С Intlayer вы можете:

- **Легко управлять переводами** с помощью декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с помощью автоматически генерируемых типов, улучшающих автодополнение и обнаружение ошибок.
- **Пользоваться расширенными функциями**, такими как динамическое определение локали и переключение языков.

---

## Пошаговое руководство по настройке Intlayer в приложении на Vite и Preact

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-vite-preact-template) на GitHub.

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), компиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **preact-intlayer**

  Пакет, который интегрирует Intlayer с приложением на Preact. Он предоставляет провайдеры контекста и хуки для интернационализации Preact.

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
  routing: {
    mode: "prefix-no-default", // По умолчанию: префикс для всех локалей, кроме основной
    storage: ["cookie", "header"], // По умолчанию: хранение локали в куки и определение из заголовка
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
  routing: {
    mode: "prefix-no-default", // По умолчанию: префикс для всех локалей, кроме основной
    storage: ["cookie", "header"], // По умолчанию: хранение локали в куки и определение из заголовка
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
  routing: {
    mode: "prefix-no-default", // По умолчанию: префикс для всех локалей, кроме основной
    storage: ["cookie", "header"], // По умолчанию: хранение локали в куки и определение из заголовка
  },
};

module.exports = config;
```

> Через этот конфигурационный файл вы можете настроить локализованные URL, режимы маршрутизации, параметры хранения, имена куки, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Vite

Добавьте плагин intlayer в вашу конфигурацию.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Плагин Vite `intlayer()` используется для интеграции Intlayer с Vite. Он обеспечивает сборку файлов объявлений контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer внутри приложения Vite. Кроме того, он предоставляет алиасы для оптимизации производительности.

### Шаг 4: Объявление контента

Создайте и управляйте своими объявлениями контента для хранения переводов:

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
      es: "Logo Preact",
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
          Edit <code>src/app.tsx</code> and save to test HMR
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
// import { h } from 'preact'; // Требуется, если вы используете JSX напрямую в .mjs

/** @type {import('intlayer').Dictionary} */
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
      es: "Logo Preact",
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
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliqueз sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Требуется, если вы используете JSX напрямую в .cjs

/** @type {import('intlayer').Dictionary} */
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
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии, что они включены в каталог `contentDir` (по умолчанию `./src`). И соответствуют расширению файла объявлений контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Подробнее см. в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

> Если ваш файл контента содержит код TSX, вам может потребоваться импортировать `import { h } from "preact";` или убедиться, что ваша JSX прагма правильно настроена для Preact.

### Шаг 5: Использование Intlayer в коде

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
      {/* Markdown контент */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML контент */}
      <div>{content.myHtmlContent}</div>

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

> Если вы хотите использовать свой контент в строковом атрибуте, таком как `alt`, `title`, `href`, `aria-label` и т. д., вы должны вызвать значение функции, например:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Примечание: В Preact `className` обычно пишется как `class`.

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useIntlayer.md) (API для `preact-intlayer` аналогично).

> Если ваше приложение уже существует, вы можете использовать [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) в сочетании с [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md), чтобы преобразовать тысячи компонентов за одну секунду.

### (Необязательно) Шаг 6: Изменение языка контента

Для изменения языка контента вы можете использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция позволяет установить локаль приложения и обновить контент соответствующим образом.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
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
      Change Language to English
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
      Change Language to English
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Чтобы узнать больше о хуке `useLocale`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API для `preact-intlayer` аналогично).

### (Необязательно) Шаг 7: Добавьте локализованную маршрутизацию в ваше приложение

Цель этого шага — создать уникальные маршруты для каждого языка. Это полезно для SEO и создания дружественных к поисковым системам URL.
Пример:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> По умолчанию маршруты не имеют префикса для основной локали. Если вы хотите добавить префикс для основной локали, вы можете установить опцию `routing.mode` в значение `"prefix-all"` в вашей конфигурации. См. [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для получения дополнительной информации.

Чтобы добавить локализованную маршрутизацию в ваше приложение, вы можете создать компонент `LocaleRouter`, который оборачивает маршруты вашего приложения и обрабатывает маршрутизацию на основе локали. Вот пример использования [preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * Компонент маршрутизатора, который настраивает маршруты с учетом локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * Компонент маршрутизатора, который настраивает маршруты с учетом локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * Компонент маршрутизатора, который настраивает маршруты с учетом локали.
 * Использует preact-iso для управления навигацией и рендеринга локализованных компонентов.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

Затем вы можете использовать компонент `LocaleRouter` в своем приложении:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... Ваш компонент AppContent

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Ваш компонент AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Ваш компонент AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (Необязательно) Шаг 8: Изменяйте URL при смене локали

Чтобы изменить URL при смене локали, вы можете использовать проп `onLocaleChange`, предоставляемый хуком `useLocale`. Параллельно вы можете использовать метод `route` из `useLocation` библиотеки `preact-iso` для обновления пути URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // Создаем URL с обновленной локалью
      // Пример: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // Обновляем путь URL
      route(pathWithLocale, true); // true для замены (replace)
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Программная навигация после смены локали будет обработана в onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль — например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык на самой локали — например, Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали — например, Francés, если текущая локаль Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
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
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> Ссылки на документацию:
>
> > - [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useLocale.md) (API для `preact-intlayer` аналогично)> - [Хук `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)> - [Хук `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)> - [Хук `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)> - [Атрибут `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ru)> - [Атрибут `lang`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/lang)> - [Атрибут `dir`](https://developer.mozilla.org/ru/docs/Web/HTML/Global_attributes/dir)> - [Атрибут `aria-current`](https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/ru/docs/Web/API/Popover_API)

### (Необязательно) Шаг 9: Переключайте атрибуты языка и направления HTML

Когда ваше приложение поддерживает несколько языков, крайне важно обновлять атрибуты `lang` и `dir` тега `<html>`, чтобы они соответствовали текущей локали. Это обеспечивает:

- **Доступность**: Экранные дикторы и вспомогательные технологии полагаются на правильный атрибут `lang` для точного произношения и интерпретации контента.
- **Отображение текста**: Атрибут `dir` (direction) гарантирует, что текст отображается в правильном порядке (например, слева направо для английского, справа налево для арабского или иврита), что важно для удобочитаемости.
- **SEO**: Поисковые системы используют атрибут `lang` для определения языка вашей страницы, помогая показывать правильный локализованный контент в результатах поиска.

Обновляя эти атрибуты динамически при изменении локали, вы гарантируете согласованный и доступный опыт для пользователей на всех поддерживаемых языках.

#### Реализация хука

Создайте пользовательский хук для управления атрибутами HTML. Хук прослушивает изменения локали и соответствующим образом обновляет атрибуты:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` HTML-элемента <html> на основе текущей локали.
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

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Обновляет атрибуты `lang` и `dir` HTML-элемента <html> на основе текущей локали.
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
 * Обновляет атрибуты `lang` и `dir` HTML-элемента <html> на основе текущей локали.
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

Интегрируйте хук в свой основной компонент, чтобы атрибуты HTML обновлялись при каждом изменении локали:

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

### (Необязательно) Шаг 10: Создание компонента локализованной ссылки

Чтобы навигация в вашем приложении учитывала текущую локаль, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс текущего языка к внутренним URL.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL помогают поисковым системам правильно индексировать страницы на разных языках и предоставляют пользователям контент на их предпочтительном языке.
- **Последовательность**: Используя локализованную ссылку во всем приложении, вы гарантируете, что навигация остается в пределах текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL.

Ниже приведена реализация компонента локализованной ссылки `Link` в Preact:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок он использует `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация остается в контексте той же локали.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Если ссылка внутренняя и предоставлен валидный href, получаем локализованный URL.
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок он использует `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация остается в контексте той же локали.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Если ссылка внутренняя и предоставлен валидный href, получаем локализованный URL.
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок он использует `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация остается в контексте той же локали.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Если ссылка внутренняя и предоставлен валидный href, получаем локализованный URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### Как это работает

- **Определение внешних ссылок**:  
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются без изменений, так как они не нуждаются в локализации.
- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль (например, `fr` для французского).
- **Локализация URL**:  
  Для внутренних ссылок (т. е. не внешних) используется `getLocalizedUrl` для автоматического добавления префикса текущей локали к URL. Это означает, что если ваш пользователь использует французский язык, передача `/about` в качестве `href` преобразует его в `/fr/about`.
- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL, гарантируя, что навигация соответствует локали.

### (Необязательно) Шаг 11: Рендеринг Markdown и HTML

Intlayer поддерживает рендеринг контента в форматах Markdown и HTML в Preact.

Вы можете настроить рендеринг контента Markdown и HTML с помощью метода `.use()`. Этот метод позволяет переопределить стандартный рендеринг определенных тегов.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* Базовый рендеринг */}
    {myMarkdownContent}

    {/* Пользовательский рендеринг для Markdown */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* Базовый рендеринг для HTML */}
    {myHtmlContent}

    {/* Пользовательский рендеринг для HTML */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation) для получения преимуществ TypeScript и усиления вашей кодовой базы.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автоматически генерируемые типы.

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
    ".intlayer/**/*.ts", // Включить автоматически генерируемые типы
  ],
}
```

> Убедитесь, что ваш `tsconfig.json` настроен для Preact, особенно `jsx` и `jsxImportSource` или `jsxFactory`/`jsxFragmentFactory` для старых версий Preact, если вы не используете настройки по умолчанию `preset-vite`.

### Конфигурация Git

Рекомендуется игнорировать файлы, генерируемые Intlayer. Это позволит избежать их фиксации в вашем Git-репозитории.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext
# Игнорировать файлы, генерируемые Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предпросмотр** переведенного контента.
- **Быстрые действия** для удобного создания и обновления переводов.

Для получения более подробной информации о том, как использовать расширение, обратитесь к [документации по расширению Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Продвигайтесь дальше

Чтобы продвинуться дальше, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент вовне с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

---
