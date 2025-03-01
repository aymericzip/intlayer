# Начало работы с интернационализацией (i18n) с Intlayer и React Create App

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека с открытым исходным кодом для интернационализации (i18n), разработанная для упрощения поддержки нескольких языков в современных веб-приложениях.

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Использовать расширенные функции**, такие как динамическое определение и переключение локали.

## Пошаговое руководство по настройке Intlayer в React-приложении

### Шаг 1: Установите зависимости

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

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

> С помощью этого файла конфигурации вы можете настроить локализованные URL-адреса, перенаправление через middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров можно найти в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию CRA

Измените ваши скрипты для использования react-intlayer:

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Скрипты `react-scripts-intlayer` основаны на [CRACO](https://craco.js.org/). Вы также можете реализовать собственную настройку на основе плагина intlayer craco. [См. пример здесь](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Шаг 4: Объявите ваш контент

Создайте и управляйте декларациями контента для хранения переводов:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
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
      ru: (
        <>
          Редактируйте <code>src/App.tsx</code> и сохраните для перезагрузки
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        ru: "Изучить React",
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
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
      ru: "Начните с редактирования",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        ru: "Изучить React",
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
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
      ru: "Начните с редактирования",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        ru: "Изучить React",
      }),
    },
  },
};

module.exports = appContent;
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию, `./src`) и соответствуют расширению файла декларации контента (по умолчанию, `.content.{ts,tsx,js,jsx,mjs,cjs}`). Для получения дополнительной информации обратитесь к [документации по декларациям контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md). Если ваш файл контента включает код TSX, вам следует импортировать `import React from "react";` в вашем файле контента.

### Шаг 5: Используйте Intlayer в вашем коде

Получите доступ к вашим словарям контента в вашем приложении:

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
  </IntlayerProvider>
);
```

> Примечание: Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вам нужно вызвать значение функции, например:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/react-intlayer/useIntlayer.md).

...
