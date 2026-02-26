---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite + Solid i18n - Як перекласти додаток Solid у 2026
description: Дізнайтеся, як зробити ваш вебсайт на Vite та Solid багатомовним. Слідуйте документації, щоб інтернаціоналізувати (i18n) і перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Перекладіть свій вебсайт на Vite і Solid за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Solid? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

> Цей пакет знаходиться в розробці. Див. [issue](https://github.com/aymericzip/intlayer/issues/117) для отримання додаткової інформації. Підтримайте зацікавленість до Intlayer для Solid, поставивши лайк цьому issue

<!-- Див. [шаблон додатка](https://github.com/aymericzip/intlayer-solid-template) на GitHub. -->

## Що таке Intlayer?

**Intlayer** — інноваційна, open-source бібліотека для інтернаціоналізації (i18n), створена щоб спростити підтримку багатомовності в сучасних вебзастосунках.

За допомогою Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Забезпечити підтримку TypeScript** з автоматично згенерованими типами, що покращують автодоповнення та виявлення помилок.
- **Отримайте переваги розширених можливостей**, таких як динамічне виявлення мови та перемикання.

---

## Покроковий посібник з налаштування Intlayer у додатку на Vite і Solid

## Зміст

<TOC/>

### Крок 1: Встановіть залежності

Встановіть необхідні пакети, використовуючи npm:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **solid-intlayer**
  Пакет, що інтегрує Intlayer з додатком на Solid. Надає провайдери контексту та хуки для інтернаціоналізації в Solid.

- **vite-intlayer**
  Містить плагін для Vite для інтеграції Intlayer зі [збірником Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookies та обробки перенаправлень URL.

### Крок 2: Конфігурація вашого проєкту

Створіть файл конфігурації, щоб налаштувати мови вашого застосунку:

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

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, імена cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у вашу конфігурацію Vite

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// Документація: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// Документація: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// Документація Vite: https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій вмісту та відстежує їх у режимі розробки. Він визначає змінні оточення Intlayer у застосунку Vite. Додатково він надає aliases для оптимізації продуктивності.

### Крок 4: Оголосіть свій вміст

Створіть і керуйте деклараціями вмісту, щоб зберігати переклади:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {},
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

// Тип: інтерфейс Dictionary з пакету intlayer
/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// Тип: інтерфейс Dictionary з пакету intlayer
/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {},
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {}
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, щойно вони будуть включені до директорії `contentDir` (за замовчуванням, `./src`). І відповідати розширенню файлів декларацій контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Для детальнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 5: Використання Intlayer у вашому коді

Отримайте доступ до ваших словників контенту в усьому додатку:

```tsx {1,11} fileName="src/App.tsx" codeFormat="typescript"
import { createSignal, type Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "solid-intlayer";

const AppContent: Component = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content().viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content().solidLogo.value}
          />
        </a>
      </div>
      <h1>{content().title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content().count({ count: count() })}
        </button>
        <p>{content().edit}</p>
      </div>
      <p class="read-the-docs">{content().readTheDocs}</p>
    </>
  );
};

const App: Component = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> [!NOTE]
> У Solid, `useIntlayer` повертає функцію **accessor** (наприклад, `content()`). Ви повинні викликати цю функцію для доступу до реактивного контенту.

> Якщо ви хочете використовувати ваш контент у атрибуті `string`, такому як `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, як:
>
> ```jsx
> <img src={content().image.src.value} alt={content().image.value} />
> ```

### (Необов'язково) Крок 6: Змінити мову вашого контенту

Щоб змінити мову вашого контенту, ви можете використовувати функцію `setLocale`, надану хуком `useLocale`. Ця функція дозволяє вам встановити locale додатку та оновити контент відповідно.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { Locales } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as Locales)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### (Необов'язково) Крок 7: Додати локалізовану маршрутизацію до вашого додатку

Мета цього кроку - створити унікальні маршрути для кожної мови. Це корисно для SEO та SEO-дружніх URL.
Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

Щоб додати локалізовану маршрутизацію до вашого додатку, ви можете використовувати `@solidjs/router`.

Спочатку встановіть необхідні залежності:

```bash packageManager="npm"
npm install @solidjs/router
```

Потім обгорніть ваш додаток у `Router` та визначте ваші маршрути, використовуючи `localeMap`:

```tsx fileName="src/index.tsx"  codeFormat="typescript"
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
```

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { type Component } from "solid-js";
import { Route } from "@solidjs/router";
import { localeMap } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import Home from "./pages/Home";
import About from "./pages/About";

const App: Component = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || "/"}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>{props.children}</IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    ))}
  </IntlayerProvider>
);

export default App;
```

### (Необов'язково) Крок 8: Змінити URL при зміні locale

Щоб змінити URL при зміні locale, ви можете використовувати prop `onLocaleChange`, наданий хуком `useLocale`. Ви можете використовувати хуки `useNavigate` та `useLocation` з `@solidjs/router` для оновлення шляху URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

### (Необов'язково) Крок 9: Переключити атрибути мови та напрямку HTML

Оновіть атрибути `lang` та `dir` тега `<html>`, щоб вони відповідали поточному locale для доступності та SEO.

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { createEffect, type Component } from "solid-js";
import { useLocale } from "solid-intlayer";
import { getHTMLTextDir } from "intlayer";

const AppContent: Component = () => {
  const { locale } = useLocale();

  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    // ... Контент вашого додатку
  );
};
```

### (Необов'язково) Крок 10: Створення локалізованого компонента посилання

Створіть користувацький компонент `Link`, який автоматично додає префікс внутрішніх URL поточною мовою.

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { type ParentComponent } from "solid-js";
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const Link: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => props.href.startsWith("http");
  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

### (Необов'язково) Крок 11: Рендеринг Markdown

Intlayer підтримує рендеринг контенту Markdown безпосередньо у вашому додатку Solid, використовуючи власний внутрішній парсер. За замовчуванням Markdown обробляється як звичайний текст. Щоб відрендерити його як багатий HTML, обгорніть ваш додаток у `MarkdownProvider`.

```tsx fileName="src/index.tsx"
import { render } from "solid-js/web";
import { MarkdownProvider } from "solid-intlayer";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <MarkdownProvider>
      <App />
    </MarkdownProvider>
  ),
  root!
);
```

Потім ви можете використовувати його у ваших компонентах:

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-content");

  return (
    <div>
      {/* Рендериться як HTML через MarkdownProvider */}
      {content().markdownContent}
    </div>
  );
};
```

### Налаштування TypeScript

Переконайтеся, що ваша конфігурація TypeScript включає автоматично згенеровані типи.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Конфігурація Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволить уникнути їх додавання до вашого Git-репозиторію.

Для цього можна додати такі інструкції до файлу `.gitignore`:

```plaintext
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне розширення **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про те, як користуватися розширенням, зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

### Розширені можливості

Щоб піти далі, ви можете реалізувати [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій вміст, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

---
