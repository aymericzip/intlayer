---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Як перекласти ваш додаток на Vite та Preact – посібник з i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на Vite і Preact багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
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
    changes: Додано команду init
  - version: 7.0.0
    date: 2025-10-28
    changes: Оновлено компонент LocaleRouter для використання нової конфігурації маршрутів
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть свій вебсайт на Vite і Preact за допомогою Intlayer | Інтернаціоналізація (i18n)

> Цей пакет знаходиться в розробці. Див. [issue](https://github.com/aymericzip/intlayer/issues/118) для детальнішої інформації. Підтримайте Intlayer для Preact, поставивши лайк цьому issue

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна open-source бібліотека для інтернаціоналізації (i18n), створена для спрощення багатомовної підтримки в сучасних вебзастосунках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та вміст.
- **Забезпечити підтримку TypeScript** через автогенеровані типи, що покращують автодоповнення та виявлення помилок.
- **Отримайте переваги розширених можливостей**, таких як динамічне визначення локалі та її перемикання.

---

## Покроковий посібник із налаштування Intlayer у застосунку на Vite і Preact

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Перегляньте [шаблон застосунку](https://github.com/aymericzip/intlayer-vite-preact-template) на GitHub.

### Крок 1: Встановіть залежності

Встановіть необхідні пакети за допомогою npm:

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

  Основний пакет, що надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/cli/index.md).

- **preact-intlayer**
  Пакет, який інтегрує Intlayer у Preact-застосунок. Надає провайдери контексту та хуки для інтернаціоналізації в Preact.

- **vite-intlayer**
  Містить плагін для Vite для інтеграції Intlayer з [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookie та обробки перенаправлень URL.

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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // За замовчуванням: префіксувати всі локалі, крім локалі за замовчуванням
    storage: ["cookie", "header"], // За замовчуванням: зберігати локаль у cookie та визначати з заголовка
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
      // Ваші інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // За замовчуванням: додавати префікс для всіх локалей, окрім локалі за замовчуванням
    storage: ["cookie", "header"], // За замовчуванням: зберігати локаль у cookie та визначати її з заголовка
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
  routing: {
    mode: "prefix-no-default", // За замовчуванням: додавати префікс для всіх локалей, окрім локалі за замовчуванням
    storage: ["cookie", "header"], // За замовчуванням: зберігати локаль в cookie і визначати з заголовка (header)
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, режими маршрутизації, опції збереження, імена cookie, місце розташування та розширення файлів з описом контенту, відключити логи Intlayer у консолі та інше. Для повного переліку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у конфігурацію.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/ — документація Vite
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/ — документація Vite
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/ — документація Vite
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у застосунку Vite. Додатково, він надає aliases для оптимізації продуктивності.

### Крок 4: Оголосіть свій контент

Створіть і керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      uk: "Логотип Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      uk: "Логотип Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      uk: "лічильник: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      uk: (
        <>
          Редагуйте <code>src/app.tsx</code> і збережіть, щоб перевірити HMR
        </>
      ),
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
      uk: "Натисніть на логотипи Vite і Preact, щоб дізнатися більше",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      uk: "Клацніть на логотипи Vite та Preact, щоб дізнатися більше",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Потрібно, якщо ви використовуєте JSX безпосередньо в .mjs

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
    preactLogo: t({
      uk: "Логотип Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      uk: "лічильник ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      uk: (
        <>
          Редагуйте <code>src/app.mjs</code> і збережіть, щоб перевірити HMR
        </>
      ),
      edit: t({
      uk: "Редагуйте src/app.jsx і збережіть, щоб протестувати HMR",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      uk: "Натисніть на логотипи Vite і Preact, щоб дізнатися більше",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Потрібно, якщо ви використовуєте JSX безпосередньо в .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      uk: "Логотип Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      uk: "Логотип Preact",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      uk: "Кількість: ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      uk: "Редагуйте src/app.tsx і збережіть, щоб протестувати HMR",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      uk: "Натисніть на логотипи Vite і Preact, щоб дізнатися більше",
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
        "uk": "Логотип Vite",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "uk": "Логотип Preact",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "uk": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "uk": "кількість ",
        "en": "count is ",
        "uk": "лічильник: ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "uk": "Редагуйте src/app.tsx і збережіть, щоб перевірити HMR",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "uk": "Натисніть на логотипи Vite та Preact, щоб дізнатися більше",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Ваші декларації контенту можна розміщувати в будь-якій частині вашого застосунку, за умови, що вони включені в директорію `contentDir` (за замовчуванням `./src`). І вони повинні відповідати розширенню файлу декларації контенту (за замовчуванням `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації див. [документацію з оголошень контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

> Якщо ваш файл контенту містить TSX-код, можливо, потрібно імпортувати `import { h } from "preact";` або переконатися, що JSX pragma правильно налаштований для Preact.

### Крок 5: Використання Intlayer у вашому коді

Отримуйте доступ до ваших словників контенту у всьому застосунку:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Припускаємо, що у вас є preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Припускаємо, що ваш файл CSS називається app.css
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

> Якщо ви хочете використати ваш вміст у атрибуті типу `string`, наприклад `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, наприклад:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Примітка: у Preact `className` зазвичай пишеться як `class`.

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md) (API схожий для `preact-intlayer`).

### (Необов'язково) Крок 6: Змініть мову вашого контенту

Щоб змінити мову вашого контенту, ви можете використовувати функцію `setLocale`, надану хуком `useLocale`. Ця функція дозволяє встановити локаль застосунку та відповідно оновити контент.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Змінити мову на англійську
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
      Змінити мову на англійську
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

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md) (API схоже для `preact-intlayer`).

### (Необов'язково) Крок 7: Додайте локалізовану маршрутизацію до вашого застосунку

Мета цього кроку — створити унікальні маршрути для кожної мови. Це корисно для SEO та SEO-дружніх URL-адрес.
Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> За замовчуванням маршрути не мають префікса для мови за замовчуванням (`routing.mode: "prefix-no-default"`). Якщо ви хочете додати префікс і для мови за замовчуванням, ви можете встановити опцію `routing.mode` в `"prefix-all"` у вашій конфігурації. Див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для додаткової інформації.

Щоб додати локалізовану маршрутизацію до вашого застосунку, ви можете створити компонент `LocaleRouter`, який обгортає маршрути вашого застосунку та обробляє маршрутизацію на основі локалі. Ось приклад із використанням [preact-iso](https://github.com/preactjs/preact-iso):

Спочатку встановіть `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add preact-iso
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { configuration, getPathWithoutLocale, type Locale } from "intlayer";
import type { ComponentChildren, FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";

const { internationalization, routing } = configuration;
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
 * Компонент, який обробляє локалізацію і обгортає дочірні елементи у відповідний контекст локалі.
 * Він керує визначенням локалі на основі URL та її валідацією.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locale;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Визначає поточну локаль — використовується передана locale або локаль за замовчуванням
  const currentLocale = locale ?? defaultLocale;

  // Видаляє префікс локалі з шляху для побудови базового шляху
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Поточний шлях URL
  );

  /**
   * Якщо routing.mode === 'prefix-all', локаль за замовчуванням повинна завжди мати префікс.
   */
  if (routing.mode === "prefix-all") {
    // Перевірити локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправити на локаль за замовчуванням з оновленим шляхом
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замінити поточний запис історії новим
        />
      );
    }

    // Огорнути children через IntlayerProvider і встановити поточну локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Коли routing.mode не дорівнює 'prefix-all', локаль за замовчуванням не має префікса.
     * Переконатися, що поточна локаль дійсна і не є локаллю за замовчуванням.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Виключити локаль за замовчуванням
        )
        .includes(currentLocale) // Перевірити, чи поточна локаль є в списку дійсних локалей
    ) {
      // Перенаправити на шлях без префікса локалі
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обгорнути children у IntlayerProvider і встановити поточну локаль
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

  const pathLocale = path.split("/")[1] as Locale;

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент роутера, який налаштовує маршрути, специфічні для локалі.
 * Використовує preact-iso для керування навігацією та рендерингу локалізованих компонентів.
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
// Імпорт необхідних залежностей та функцій
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Потрібно для JSX

// Деструктуризація конфігурації з Intlayer
const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Компонент, що обробляє локалізацію та обгортає children відповідним контекстом локалі.
 * Він керує визначенням локалі на основі URL та перевіркою коректності локалі.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Визначає поточну локаль, за замовчуванням використовується defaultLocale, якщо не передано
  const currentLocale = locale ?? defaultLocale;

  // Видаляє префікс локалі з шляху для побудови базового шляху
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Поточний шлях URL
  );

  /**
   * Якщо routing.mode === "prefix-all", локаль за замовчуванням завжди має бути з префіксом.
   */
  if (routing.mode === "prefix-all") {
    // Перевіряє локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправлення до мови за замовчуванням з оновленим шляхом
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замінити поточний запис історії на новий
        />
      );
    }

    // Обгорнути дочірні елементи IntlayerProvider та встановити поточну локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Коли routing.mode не 'prefix-all', префікс мови за замовчуванням не додається.
     * Переконайтесь, що поточна локаль дійсна і не є локаллю за замовчуванням.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Не включати мову за замовчуванням
        )
        .includes(currentLocale) // Перевіряє, чи поточна локаль є в списку дійсних локалей
    ) {
      // Перенаправити на шлях без префікса локалі
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обгорнути children у IntlayerProvider та встановити поточну локаль
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
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент роутера, що налаштовує маршрути з урахуванням локалі.
 * Використовує preact-iso для керування навігацією та рендерингу локалізованих компонентів.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Імпорт необхідних залежностей та функцій
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Потрібно для JSX

// Деструктуризація конфігурації з Intlayer
const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Компонент, який обробляє локалізацію та обгортає дочірні елементи відповідним локалізованим контекстом.
 * Він керує визначенням локалі на основі URL та її валідацією.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Визначаємо поточну локаль, за відсутності — використовується локаль за замовчуванням
  const currentLocale = locale ?? defaultLocale;

  // Видаляємо префікс локалі з шляху, щоб створити базовий шлях
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Поточний шлях URL
  );

  /**
   * Якщо routing.mode === 'prefix-all', локаль за замовчуванням завжди повинна мати префікс.
   */
  if (routing.mode === "prefix-all") {
    // Перевіряємо локаль
    if (!locale || !locales.includes(locale)) {
      // Перенаправляємо на локаль за замовчуванням з оновленим шляхом
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Замінити поточний запис у історії на новий
        />
      );
    }

    // Обгорнути children у IntlayerProvider і встановити поточну локаль
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Коли routing.mode не 'prefix-all', префікс для локалі за замовчуванням не додається.
     * Переконайтесь, що поточна локаль дійсна і не є локаллю за замовчуванням.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Виключити локаль за замовчуванням
        )
        .includes(currentLocale) // Перевірити, чи поточна локаль є в списку дійсних локалей
    ) {
      // Перенаправлення на шлях без префіксу локалі
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Обгорнути дочірні елементи в IntlayerProvider і встановити поточну локаль
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
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Компонент роутера, який налаштовує маршрути для конкретних локалей.
 * Він використовує preact-iso для керування навігацією та відображення локалізованих компонентів.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Потім ви можете використовувати компонент `LocaleRouter` у вашому застосунку:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Ваш компонент AppContent (визначено в кроці 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Ваш компонент AppContent (визначений у кроці 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Ваш компонент AppContent (визначений у кроці 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Паралельно ви також можете використовувати `intlayerProxy` для додавання серверної маршрутизації до вашого додатка. Цей плагін автоматично визначатиме поточну локаль на основі URL і встановлюватиме відповідний cookie локалі. Якщо локаль не вказана, плагін визначить найвідповіднішу локаль на основі мовних налаштувань браузера користувача. Якщо ж локаль не буде виявлена, він перенаправить на локаль за замовчуванням.

> Зауважте, що для використання `intlayerProxy` у production потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/ (див. документацію Vite)
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// Документація: https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// Документація: https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### (Необов'язково) Крок 8: Змінити URL при зміні локалі

Щоб змінювати URL при зміні локалі, ви можете використовувати пропс `onLocaleChange`, який надає хук `useLocale`. Паралельно можна використовувати `useLocation` та `route` з `preact-iso` для оновлення шляху URL.

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
      const currentFullPath = location.url; // preact-iso надає повний URL
      // Сформувати URL з оновленою локаллю
      // Приклад: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Оновити шлях URL
      route(pathWithLocale, true); // true для заміни
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
              // Програмна навігація після зміни локалі обробляється onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Локаль — наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у своїй локалі — наприклад Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — наприклад Francés коли поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
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

> Посилання на документацію:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md) (API схоже для `preact-intlayer`)> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)> - [атрибут `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)> - [атрибут `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)> - [атрибут `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [атрибут `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Нижче оновлений **Крок 9** з додатковими поясненнями та вдосконаленими прикладами коду:

---

### (Необов'язково) Крок 9: Переключення атрибутів мови та напрямку в HTML

Коли ваш додаток підтримує кілька мов, важливо оновлювати атрибути `lang` та `dir` тегу `<html>`, щоб вони відповідали поточній локалі. Це гарантує:

- **Доступність**: Скрінрідери та допоміжні технології покладаються на правильний атрибут `lang` для коректного промовляння та інтерпретації вмісту.
- **Відображення тексту**: Атрибут `dir` (direction) забезпечує правильний порядок відображення тексту (наприклад, зліва направо для англійської, справа наліво для арабської чи івриту), що є необхідним для читабельності.
- **SEO**: Пошукові системи використовують атрибут `lang`, щоб визначити мову вашої сторінки, що допомагає показувати відповідний локалізований контент у результатах пошуку.

Оновлюючи ці атрибути динамічно при зміні локалі, ви забезпечуєте послідовний та доступний досвід для користувачів усіх підтримуваних мов.

#### Реалізація хука

Створіть власний хук для керування HTML-атрибутами. Хук відслідковує зміни локалі й відповідно оновлює атрибути:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Оновлює атрибути `lang` та `dir` елемента <html> на основі поточної локалі.
 * - `lang`: Повідомляє браузерам та пошуковим системам мову сторінки.
 * - `dir`: Забезпечує правильний порядок читання (наприклад, 'ltr' для англійської, 'rtl' для арабської).
 *
 * Це динамічне оновлення має вирішальне значення для правильного відтворення тексту, доступності та SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Оновлює атрибут lang елемента відповідно до поточної локалі.
    document.documentElement.lang = locale;

    // Встановлює напрямок тексту залежно від поточної локалі.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Оновлює атрибути `lang` та `dir` елемента <html> залежно від поточної локалі.
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
 * Оновлює атрибути `lang` та `dir` елемента <html> залежно від поточної локалі.
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

#### Використання хука у вашому застосунку

Інтегруйте хук у ваш головний компонент, щоб атрибути HTML оновлювалися щоразу при зміні локалі:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer вже імпортовано, якщо AppContent його потребує
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Визначення AppContent з Кроку 5

const AppWithHooks: FunctionalComponent = () => {
  // Застосовуємо хук, щоб оновити атрибути lang і dir елемента <html> відповідно до локалі.
  useI18nHTMLAttributes();

  // Припускаючи, що AppContent — ваш основний компонент для відображення вмісту з Кроку 5
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
// Визначення AppContent з Кроку 5

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
// Визначення AppContent із кроку 5

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

Застосувавши ці зміни, ваш додаток буде:

- Забезпечувати, що атрибут **language** (`lang`) правильно відображає поточну локаль, що важливо для SEO та поведінки браузера.
- Підлаштовувати **напрямок тексту** (`dir`) відповідно до локалі, покращуючи читабельність та зручність використання для мов із різними напрямками читання.
- Забезпечити більш **доступний** досвід, оскільки засоби допомоги (assistive technologies) залежать від цих атрибутів для оптимальної роботи.

### (Необов'язково) Крок 10: Створення локалізованого компонента `Link`

Щоб переконатися, що навігація вашого додатка дотримується поточної локалі, ви можете створити власний компонент `Link`. Цей компонент автоматично додає префікс мови до внутрішніх URL.

Ця поведінка корисна з кількох причин:

- **SEO та User Experience**: локалізовані URL допомагають пошуковим системам правильно індексувати сторінки за мовами та надають користувачам контент їхньою бажаною мовою.
- **Consistency**: використовуючи локалізоване посилання по всьому додатку, ви гарантуєте, що навігація залишатиметься в поточній локалі, запобігаючи несподіваним перемиканням мови.
- **Підтримуваність**: Централізація логіки локалізації в одному компоненті спрощує керування URL-адресами.

Для Preact з `preact-iso` зазвичай використовуються стандартні теги `<a>` для навігації, а `preact-iso` відповідає за маршрутизацію. Якщо вам потрібна програмна навігація по кліку (наприклад, щоб виконати дії перед переходом), ви можете використовувати функцію `route` з `useLocation`. Ось як можна створити власний компонент anchor, що локалізує URL-адреси:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Припускається, що useLocation та route можуть бути експортовані з preact-iso через preact-intlayer, або імпортуватися безпосередньо
// Якщо не реекспортується, імпортуйте безпосередньо: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Для HTMLAttributes
import { forwardRef } from "preact/compat"; // Для передачі ref

export interface LocalizedLinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Необов'язково: замінює стан історії
}

/**
 * Утиліта для перевірки, чи є вказаний URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Кастомний компонент Link, який адаптує атрибут href відповідно до поточної локалі.
 */
 * Для внутрішніх посилань використовується `getLocalizedUrl` для додавання префіксу локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в межах контексту тієї самої локалі.
 * Використовується стандартний тег <a>, але може ініціювати навігацію на клієнті за допомогою `route` з preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // з preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Переконайтесь, що href визначено
        event.button === 0 && // Лівий клік
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Перевірка стандартних модифікаторів
        !props.target // Не відкривати в новій вкладці/вікні
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Перехід лише якщо URL відрізняється
          route(hrefI18n, replace); // Використовуємо route з preact-iso
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
import { useLocation, route } from "preact-iso"; // Імпортуємо з preact-iso
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
const { useLocation, route } = require("preact-iso"); // Імпорт з preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Для JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
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

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Як це працює

- **Виявлення зовнішніх посилань**:  
  Допоміжна функція `checkIsExternalLink` визначає, чи є URL зовнішнім. Зовнішні посилання залишаються без змін.
- **Отримання поточної локалі**:  
  Хук `useLocale` повертає поточну локаль.
- **Локалізація URL**:  
  Для внутрішніх посилань `getLocalizedUrl` додає префікс поточної локалі до URL.
- **Клієнтська навігація**:
  Функція `handleClick` перевіряє, чи посилання є внутрішнім і чи слід запобігти стандартній навігації. У такому випадку вона використовує функцію `route` з `preact-iso` (отриману через `useLocation` або імпортовану напряму) для виконання навігації на клієнтській стороні. Це забезпечує поведінку, подібну до SPA, без повного перезавантаження сторінки.
- **Повернення посилання**:  
  Компонент повертає елемент `<a>` з локалізованою URL-адресою та власним обробником кліку.

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб скористатися перевагами TypeScript і посилити вашу codebase.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі налаштування TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Рекомендовано для Preact 10+
    // ...
  },
  "include": [
    // ... Ваші існуючі налаштування TypeScript
    ".intlayer/**/*.ts", // Включіть автогенеровані типи
  ],
}
```

> Переконайтеся, що ваш `tsconfig.json` налаштований для Preact, особливо параметри `jsx` та `jsxImportSource`, або `jsxFactory`/`jsxFragmentFactory` для старіших версій Preact, якщо ви не використовуєте значення за замовчуванням від `preset-vite`.

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх коміту в ваш репозиторій Git.

Для цього ви можете додати такі інструкції до файлу `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення для VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне розширення **Intlayer VS Code Extension**.

[Встановити з Marketplace для VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у режимі реального часу** для відсутніх перекладів.
- **Вбудований перегляд** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для детальнішої інформації щодо використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Далі

Щоб просунутися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---
