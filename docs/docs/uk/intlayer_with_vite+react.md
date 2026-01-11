---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Як перекласти ваш додаток на Vite і React – посібник з i18n 2026
description: Дізнайтеся, як додати інтернаціоналізацію (i18n) до вашого додатка на Vite і React за допомогою Intlayer. Дотримуйтеся цього посібника, щоб зробити ваш додаток багатомовним.
keywords:
  - Інтернаціоналізація
  - Документація
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
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Перекладіть свій вебсайт на Vite і React за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна open-source бібліотека для інтернаціоналізації (i18n), створена для спрощення підтримки кількох мов у сучасних вебзастосунках.

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращують автозаповнення та виявлення помилок.
- **Отримати переваги від розширених можливостей**, таких як динамічне визначення локалі та переключення.

---

## Покроковий посібник з налаштування Intlayer у застосунку на Vite та React

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Найкраще рішення i18n для Vite та React? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Див. [Шаблон застосунку](https://github.com/aymericzip/intlayer-vite-react-template) на GitHub.

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer у React-додаток. Надає провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Містить плагін для Vite, що інтегрує Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення локалі, якої надає перевагу користувач, керування cookies та обробки перенаправлень URL.

### Крок 2: Налаштування вашого проєкту

Створіть файл конфігурації для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Інші локалі
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
      // Інші локалі
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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/ (документація конфігурації Vite)
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/ (документація конфігурації Vite)
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та контролює їх у режимі розробки. Він визначає змінні середовища Intlayer у застосунку Vite. Додатково надає аліаси для оптимізації продуктивності.

### Крок 4: Оголосіть свій контент

Створюйте та керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      uk: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      uk: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      uk: "лічильник: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      uk: (
        <>
          Редагуйте <code>src/App.tsx</code> і збережіть, щоб перевірити HMR
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
      uk: "Натисніть на логотипи Vite і React, щоб дізнатися більше",
      en: "Click on the Vite and React logos to learn more",
      uk: "Натисніть на логотипи Vite та React, щоб дізнатися більше",
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
      uk: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      uk: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      uk: "лічильник: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Не забудьте імпортувати React, якщо ви використовуєте React node у своєму контенті
        uk: (
          <>
            Редагуйте <code>src/App.tsx</code> і збережіть, щоб протестувати HMR
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
      uk: "Клацніть на логотипи Vite та React, щоб дізнатися більше",
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
      uk: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      uk: "Логотип React",
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      uk: "лічильник: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Не забудьте імпортувати React, якщо ви використовуєте React node у вашому вмісті
        uk: (
          <>
            Редагуйте <code>src/App.tsx</code> та збережіть, щоб протестувати
            HMR
          </>
        ),
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        uk: (
          <>
            Відредагуйте <code>src/App.tsx</code> та збережіть, щоб перевірити
            HMR
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
      uk: "Натисніть на логотипи Vite і React, щоб дізнатися більше",
      en: "Click on the Vite and React logos to learn more",
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
        "en": "Vite logo",
        "uk": "Логотип Vite",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "uk": "Логотип React",
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "uk": "Vite + React",
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "uk": "лічильник: ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "uk": "Редагуйте src/App.tsx і збережіть, щоб протестувати HMR",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "uk": "Натисніть на логотипи Vite та React, щоб дізнатися більше",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, як тільки вони будуть додані до директорії `contentDir` (за замовчуванням, `./src`). І збігатися з розширенням файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для більш детальної інформації див. [документацію з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

> Якщо ваш файл контенту містить код TSX, слід розглянути імпорт `import React from "react";` у вашому файлі контенту.

### Крок 5: Використання Intlayer у вашому коді

Отримуйте доступ до словників контенту по всьому застосунку:

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

> Якщо ви хочете використовувати ваш контент у атрибуті типу `string`, наприклад `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, як-от:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md).

### (Необов'язково) Крок 6: Змініть мову вашого контенту

Щоб змінити мову вашого контенту, ви можете використати функцію `setLocale`, що надається хуком `useLocale`. Ця функція дозволяє встановити локаль додатку і відповідно оновити контент.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Змінити мову на англійську
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
      Змінити мову на англійську
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
      Змінити мову на англійську
    </button>
  );
};
```

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md).

### (Необов'язково) Крок 7: Додайте локалізовану маршрутизацію до вашого застосунку

Мета цього кроку — зробити унікальні маршрути для кожної мови. Це корисно для SEO та дружніх до SEO URL-адрес.
Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> За замовчуванням маршрути не мають префікса для локалі за замовчуванням. Якщо ви хочете додати префікс для локалі за замовчуванням, ви можете встановити опцію `middleware.prefixDefault` в `true` у вашій конфігурації. Див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для отримання додаткової інформації.

Щоб додати локалізовану маршрутизацію у ваш додаток, ви можете створити компонент `LocaleRouter`, який обгортає маршрути вашого додатка та обробляє маршрутизацію на основі локалі. Ось приклад із використанням [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer"; // Утиліти та типи з 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Типи React для функціональних компонентів та props
import { IntlayerProvider } from "react-intlayer"; // Провайдер для контексту інтернаціоналізації
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Компоненти роутера для керування навігацією

/**
 * Компонент маршрутизатора, який налаштовує маршрути для конкретних локалей.
 * Він використовує React Router для керування навігацією та відображення локалізованих компонентів.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Шаблон маршруту для захоплення локалі (наприклад, /en/, /fr/) та відповідності всіх наступних шляхів
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Обгортає дочірні компоненти для керування локаллю
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
import { localeMap } from 'intlayer'; // Утилітні функції та типи з 'intlayer'
import type { FC, PropsWithChildren } from 'react'; // Типи React для функціональних компонентів та пропсів
import { IntlayerProvider } from 'react-intlayer'; // Провайдер контексту інтернаціоналізації
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Компоненти маршрутизації для керування навігацією

/**
 * Компонент роутера, який налаштовує маршрути для конкретних локалей.
 * Використовує React Router для керування навігацією та відображення локалізованих компонентів.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Шаблон маршруту для захоплення локалі (наприклад, /en/, /fr/) і для відповідності всім наступним шляхам
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Обгортає children управлінням локалі
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
const { localeMap } = require("intlayer"); // Утиліти та типи з 'intlayer'
const React = require("react"); // Імпортує React
const { IntlayerProvider } = require("react-intlayer"); // Провайдер контексту інтернаціоналізації
const { BrowserRouter, Route, Routes } = require("react-router-dom"); // Компоненти роутера для керування навігацією

/**
 * Компонент роутера, який налаштовує маршрути, специфічні для локалі.
 * Використовує React Router для керування навігацією та відображення локалізованих компонентів.
 */
const LocaleRouter = ({ children }) =>
  React.createElement(
    BrowserRouter,
    {},
    React.createElement(
      Routes,
      {},
      localeMap(({ locale, urlPrefix }) =>
        React.createElement(Route, {
          path: `${urlPrefix}/*`,
          key: locale,
          element: React.createElement(IntlayerProvider, { locale }, children),
        })
      )
    )
  );

exports.LocaleRouter = LocaleRouter;
```

> Примітка: Якщо ви використовуєте `routing.mode: 'no-prefix' | 'search-params'`, ймовірно, вам не потрібно використовувати функцію `localeMap`.

Потім ви можете використовувати компонент `LocaleRouter` у вашому застосунку:

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

Паралельно, ви також можете використовувати `intlayerProxy` для додавання серверного маршрутизування до вашого додатка. Цей плагін автоматично визначатиме поточну локаль на основі URL і встановлюватиме відповідний cookie для локалі. Якщо локаль не вказана, плагін визначить найбільш відповідну локаль на основі мовних налаштувань браузера користувача. Якщо локаль так і не буде виявлена, він перенаправить на локаль за замовчуванням.

> Заувага: щоб використовувати `intlayerProxy` у production, потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/ - документація Vite
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/ - документація Vite
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

### (Необов'язково) Крок 8: Змінити URL при зміні локалі

Щоб змінювати URL при зміні локалі, ви можете використати проп `onLocaleChange`, який надає хук `useLocale`. Паралельно, ви можете використати хуки `useLocation` та `useNavigate` з `react-router-dom`, щоб оновлювати шлях URL.

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
  const { pathname, search } = useLocation(); // Отримати поточний шлях URL. Приклад: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Побудувати URL з оновленою локаллю
      // Приклад: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Оновити шлях URL
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
              {/* Локаль - наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі - наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова поточною локаллю - наприклад Francés, якщо поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — наприклад, French */}
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
  const { pathname, search } = useLocation(); // Отримує поточний шлях URL. Приклад: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Сформувати URL з оновленою локаллю
      // Приклад: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Оновити шлях URL
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
              {/* Локаль - наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі — наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — наприклад Francés, коли поточна локаль встановлена в Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — наприклад French */}
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
  const { pathname, search } = useLocation(); // Отримати поточний шлях URL. Приклад: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Сформувати URL з оновленою локаллю
      // Приклад: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Оновити шлях URL
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
              {/* Локаль — наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі — наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — напр., «Francés», якщо поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — напр., «French» */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Посилання на документацію:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Нижче наведено оновлений **Крок 9** з додатковими поясненнями та вдосконаленими прикладами коду:

---

### (Необов'язково) Крок 9: Змінити атрибути мови та напрямку в HTML

Якщо ваш додаток підтримує кілька мов, важливо оновлювати атрибути `lang` і `dir` тегу `<html>`, щоб вони відповідали поточній локалі. Це забезпечує:

- **Accessibility**: Зчитувачі екрана та допоміжні технології покладаються на правильний атрибут `lang` для коректної вимови та інтерпретації контенту.
- **Text Rendering**: Атрибут `dir` (напрямок) гарантує, що текст відображається в правильному порядку (наприклад, `ltr` для англійської, `rtl` для арабської або івриту), що є критично важливим для читабельності.
- **SEO**: Пошукові системи використовують атрибут `lang` для визначення мови вашої сторінки, що допомагає відображати правильний локалізований контент у результатах пошуку.

Оновлюючи ці атрибути динамічно при зміні локалі, ви гарантуєте послідовний та доступний досвід для користувачів у всіх підтримуваних мовах.

#### Реалізація хука

Створіть кастомний хук для керування атрибутами HTML. Хук слухає зміни локалі і відповідно оновлює атрибути:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Оновлює атрибути `lang` та `dir` елемента <html> залежно від поточної локалі.
 * - `lang`: Повідомляє браузерам та пошуковим системам мову сторінки.
 * - `dir`: Забезпечує правильний порядок читання (наприклад, 'ltr' для англійської, 'rtl' для арабської).
 *
 * Це динамічне оновлення є важливим для коректного відображення тексту, доступності та SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Оновлює атрибут мови для поточної локалі.
    document.documentElement.lang = locale;

    // Встановлює напрямок тексту залежно від поточної локалі.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Оновлює атрибути `lang` та `dir` елемента <html> залежно від поточної локалі.
 * - `lang`: Повідомляє браузерам та пошуковим системам про мову сторінки.
 * - `dir`: Забезпечує правильний порядок читання (наприклад, 'ltr' для англійської, 'rtl' для арабської).
 *
 * Це динамічне оновлення необхідне для коректного відображення тексту, доступності та SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Оновлює атрибут lang відповідно до поточної локалі.
    document.documentElement.lang = locale;

    // Встановлює напрямок тексту відповідно до поточної локалі.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Оновлює атрибути `lang` та `dir` елемента <html> на основі поточної локалі.
 * - `lang`: Повідомляє браузерам та пошуковим системам мову сторінки.
 * - `dir`: Забезпечує правильний порядок читання (наприклад, 'ltr' для англійської, 'rtl' для арабської).
 *
 * Це динамічне оновлення необхідне для коректного відображення тексту, доступності та SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Оновити атрибут мови відповідно до поточної локалі.
    document.documentElement.lang = locale;

    // Встановити напрямок тексту на основі поточної локалі.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Використання хука у вашому застосунку

Інтегруйте хук у ваш головний компонент, щоб атрибути HTML оновлювалися щоразу при зміні локалі:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Застосувати хук, щоб оновити атрибути lang і dir елемента <html> залежно від локалі.
  useI18nHTMLAttributes();

  // ... Решта вашого компонента
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
  // Застосувати хук, щоб оновлювати атрибути lang і dir елемента <html> відповідно до локалі.
  useI18nHTMLAttributes();

  // ... Решта вашого компонента
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
  // Застосувати хук для оновлення атрибутів lang і dir тега <html> на основі локалі.
  useI18nHTMLAttributes();

  // ... Решта вашого компонента
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Після застосування цих змін ваш застосунок:

- Переконатися, що атрибут **lang** (мова) правильно відображає поточну локаль, що важливо для SEO та поведінки браузера.
- Налаштувати **напрямок тексту** (`dir`) відповідно до локалі, покращуючи читабельність та зручність для мов з різним порядком читання.
- Забезпечити більш **доступний** досвід, оскільки допоміжні технології залежать від цих атрибутів для оптимальної роботи.

### (Необов'язково) Крок 10: Створення локалізованого компонента Link

Щоб переконатися, що навігація вашого застосунку враховує поточну локаль, ви можете створити власний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес. Наприклад, коли французькомовний користувач натискає на посилання на сторінку "About", його буде перенаправлено на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та User Experience**: Локалізовані URL допомагають пошуковим системам правильно індексувати сторінки для конкретної мови і надавати користувачам контент їхньою мовою.
- **Послідовність**: Використовуючи локалізований `Link` у всьому застосунку, ви гарантуєте, що навігація залишатиметься в межах поточної локалі, запобігаючи несподіваним переключенням мови.
- **Підтримуваність**: Централізація логіки локалізації в одному компоненті спрощує керування URL-ами, роблячи вашу codebase легшою для підтримки та розширення в міру зростання застосунку.

Нижче наведено реалізацію локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Кастомний компонент Link, який адаптує атрибут href відповідно до поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишається в контексті тієї ж локалі.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Якщо посилання внутрішнє і надано дійсний href, отримати локалізований URL.
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
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Користувацький компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в межах тієї ж локалі.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Якщо посилання внутрішнє і вказано дійсний href, отримати локалізований URL.
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
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, вважати його зовнішнім.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Користувацький компонент Link, що адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в межах тієї самої локалі.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Якщо посилання внутрішнє і вказано валідний href, отримати локалізований URL.
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

#### Як це працює

- **Виявлення зовнішніх посилань**:  
  Допоміжна функція `checkIsExternalLink` визначає, чи є URL зовнішнім. Зовнішні посилання залишаються без змін, оскільки їх не потрібно локалізувати.

- **Отримання поточної локалі**:  
  Хук `useLocale` повертає поточну локаль (наприклад, `fr` для французької).

- **Локалізація URL**:  
  Для внутрішніх посилань (тобто не зовнішніх) використовується `getLocalizedUrl`, яка автоматично додає префікс поточної локалі до URL. Це означає, що якщо ваш користувач перебуває в французькій локалі, передача `/about` як `href` перетвориться на `/fr/about`.

- **Повернення компонента Link**:  
  Компонент повертає елемент `<a>` з локалізованою URL-адресою, що гарантує відповідність навігації поточній локалі.

Інтегруючи цей компонент `Link` у весь ваш застосунок, ви підтримуєте узгоджений та орієнтований на мову досвід користувача, а також отримуєте переваги у вигляді покращеного SEO та зручності використання.

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зробити ваш codebase більш надійним.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі налаштування TypeScript
  "include": [
    // ... Ваші існуючі налаштування TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх коміту у ваш репозиторій Git.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Autocompletion** для ключів перекладу.
- **Real-time error detection** для відсутніх перекладів.
- **Inline previews** перекладеного контенту.
- **Quick actions** для швидкого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до документації [Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Розширені можливості

Щоб розширити можливості, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
