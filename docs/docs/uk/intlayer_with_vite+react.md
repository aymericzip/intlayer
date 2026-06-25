---
createdAt: 2024-03-07
updatedAt: 2026-06-23
title: "Vite + React i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Vite + React. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
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
applicationShowcase: https://intlayer-vite-react-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Перекладіть свій вебсайт на Vite і React за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `react-i18next` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка Vite і React">

Intlayer оптимізовано для ідеальної роботи з Vite і React, пропонуючи **визначення вмісту на рівні компонентів**, **відкладні переклади** та всі функції, необхідні для масштабування інтернаціоналізації (i18n).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[навички агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

</Accordion>

<Accordion header="Автоматизація">

Використовуйте автоматизацію для перекладу в конвеєрі CI/CD за допомогою LLM за вашим вибором за рахунок вашого постачальника штучного інтелекту. Intlayer також пропонує **компілятор** для автоматизації екстракція вмісту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність">

Підключення великих файлів JSON до компонентів може призвести до проблем з продуктивністю та реакцією. Intlayer оптимізує завантаження вмісту під час збірки (build time).

</Accordion>

<Accordion header="Співпраця з не-розробниками">

Більше ніж просто рішення i18n, Intlayer пропонує **власний [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** і **[повний CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, щоб допомогти вам керувати своїм багатомовним вмістом у **реальному часі**, спрощуючи співпрацю з перекладачами, копірайтерами та іншими членами команди. Контент можна зберігати локально та/або віддалено.

</Accordion>
</AccordionGroup>

---

## Покроковий посібник з налаштування Intlayer у застосунку на Vite та React

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">
  
<iframe title="Найкраще рішення i18n для Vite та React? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-react-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox, як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-vite-react-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-vite-react-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Див. [Шаблон застосунку](https://github.com/aymericzip/intlayer-vite-react-template) на GitHub.

<Steps>

<Step number={1} title="Встановлення залежностей">

Встановіть необхідні пакети:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **react-intlayer**
  Пакет, який інтегрує Intlayer у React-додаток. Надає провайдери контексту та хуки для інтернаціоналізації в React.

- **vite-intlayer**
  Містить плагін для Vite, що інтегрує Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення локалі, якої надає перевагу користувач, керування cookies та обробки перенаправлень URL.

</Step>

<Step number={2} title="Налаштування вашого проєкту">

Створіть файл конфігурації для налаштування мов вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, назви cookie, розташування та розширення ваших декларацій контенту, вимкнути логи Intlayer у консолі та інше. Для повного списку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтегруйте Intlayer у вашу конфігурацію Vite">

Додайте плагін intlayer у вашу конфігурацію.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/ (документація конфігурації Vite)
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

> Плагін Vite `intlayer()` використовується для інтеграції Intlayer з Vite. Він забезпечує побудову файлів декларацій контенту та контролює їх у режимі розробки. Він визначає змінні середовища Intlayer у застосунку Vite. Додатково надає аліаси для оптимізації продуктивності.

</Step>

<Step number={4} title="Оголосіть свій контент">

Створюйте та керуйте деклараціями контенту для зберігання перекладів:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Ваші декларації контенту можуть бути визначені будь-де у вашому застосунку, як тільки вони будуть додані до директорії `contentDir` (за замовчуванням, `./src`). І збігатися з розширенням файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для більш детальної інформації див. [документацію з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

> Якщо ваш файл контенту містить код TSX, слід розглянути імпорт `import React from "react";` у вашому файлі контенту.

</Step>

<Step number={5} title="Використання Intlayer у вашому коді">

Отримуйте доступ до словників контенту по всьому застосунку:

```tsx {5,9} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

> Якщо ви хочете використовувати ваш контент у атрибуті типу `string`, наприклад `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, як-от:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useIntlayer.md).

> Якщо ваш застосунок уже існує, ви можете скористатися [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) у поєднанні з [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md), щоб перетворити тисячі компонентів за одну секунду.

</Step>

<Step number={6} title="Змініть мову вашого контенту" isOptional={true}>

Щоб змінити мову вашого контенту, ви можете використати функцію `setLocale`, що надається хуком `useLocale`. Ця функція дозволяє встановити локаль додатку і відповідно оновити контент.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md).

</Step>

<Step number={7} title="Додайте локалізовану маршрутизацію до вашого застосунку" isOptional={true}>

Мета цього кроку, зробити унікальні маршрути для кожної мови. Це корисно для SEO та дружніх до SEO URL-адрес.
Приклад:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> За замовчуванням маршрути не мають префікса для локалі за замовчуванням. Якщо ви хочете додати префікс для локалі за замовчуванням, ви можете встановити опцію `middleware.prefixDefault` в `true` у вашій конфігурації. Див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) для отримання додаткової інформації.

Щоб додати локалізовану маршрутизацію у ваш додаток, ви можете створити компонент `LocaleRouter`, який обгортає маршрути вашого додатка та обробляє маршрутизацію на основі локалі. Ось приклад із використанням [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
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

> Примітка: Якщо ви використовуєте `routing.mode: 'no-prefix' | 'search-params'`, ймовірно, вам не потрібно використовувати функцію `localeMap`.

Потім ви можете використовувати компонент `LocaleRouter` у вашому застосунку:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Ваш компонент AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

Паралельно, ви також можете використовувати `intlayerProxy` для додавання серверного маршрутизування до вашого додатка. Цей плагін автоматично визначатиме поточну локаль на основі URL і встановлюватиме відповідний cookie для локалі. Якщо локаль не вказана, плагін визначить найбільш відповідну локаль на основі мовних налаштувань браузера користувача. Якщо локаль так і не буде виявлена, він перенаправить на локаль за замовчуванням.

> Заувага: щоб використовувати `intlayerProxy` у production, потрібно перемістити пакет `vite-intlayer` з `devDependencies` до `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/ - документація Vite
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={8} title="Змінити URL при зміні локалі" isOptional={true}>

Щоб змінювати URL при зміні локалі, ви можете використати проп `onLocaleChange`, який надає хук `useLocale`. Паралельно, ви можете використати хуки `useLocation` та `useNavigate` з `react-router-dom`, щоб оновлювати шлях URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* Мова англійською, наприклад, French */}
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

</Step>

<Step number={9} title="Змінити атрибути мови та напрямку в HTML" isOptional={true}>

Якщо ваш додаток підтримує кілька мов, важливо оновлювати атрибути `lang` і `dir` тегу `<html>`, щоб вони відповідали поточній локалі. Це забезпечує:

- **Accessibility**: Зчитувачі екрана та допоміжні технології покладаються на правильний атрибут `lang` для коректної вимови та інтерпретації контенту.
- **Text Rendering**: Атрибут `dir` (напрямок) гарантує, що текст відображається в правильному порядку (наприклад, `ltr` для англійської, `rtl` для арабської або івриту), що є критично важливим для читабельності.
- **SEO**: Пошукові системи використовують атрибут `lang` для визначення мови вашої сторінки, що допомагає відображати правильний локалізований контент у результатах пошуку.

Оновлюючи ці атрибути динамічно при зміні локалі, ви гарантуєте послідовний та доступний досвід для користувачів у всіх підтримуваних мовах.

#### Реалізація хука

Створіть кастомний хук для керування атрибутами HTML. Хук слухає зміни локалі і відповідно оновлює атрибути:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
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

#### Використання хука у вашому застосунку

Інтегруйте хук у ваш головний компонент, щоб атрибути HTML оновлювалися щоразу при зміні локалі:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
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

Після застосування цих змін ваш застосунок:

- Переконатися, що атрибут **lang** (мова) правильно відображає поточну локаль, що важливо для SEO та поведінки браузера.
- Налаштувати **напрямок тексту** (`dir`) відповідно до локалі, покращуючи читабельність та зручність для мов з різним порядком читання.
- Забезпечити більш **доступний** досвід, оскільки допоміжні технології залежать від цих атрибутів для оптимальної роботи.

</Step>

<Step number={10} title="Створення локалізованого компонента Link" isOptional={true}>

Щоб переконатися, що навігація вашого застосунку враховує поточну локаль, ви можете створити власний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес. Наприклад, коли французькомовний користувач натискає на посилання на сторінку "About", його буде перенаправлено на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та User Experience**: Локалізовані URL допомагають пошуковим системам правильно індексувати сторінки для конкретної мови і надавати користувачам контент їхньою мовою.
- **Послідовність**: Використовуючи локалізований `Link` у всьому застосунку, ви гарантуєте, що навігація залишатиметься в межах поточної локалі, запобігаючи несподіваним переключенням мови.
- **Підтримуваність**: Централізація логіки локалізації в одному компоненті спрощує керування URL-ами, роблячи вашу codebase легшою для підтримки та розширення в міру зростання застосунку.

Нижче наведено реалізацію локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
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
</Step>

<Step number={1} title="Витягніть вміст ваших компонентів" isOptional={true}>

Якщо у вас є існуюча кодова база, перетворення тисяч файлів може зайняти багато часу.

Щоб спростити цей процес, Intlayer пропонує [компілятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) / [екстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md) для перетворення ваших компонентів і витягування вмісту.

Щоб налаштувати його, ви можете додати розділ `compiler` у свій файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Інша частина вашої конфігурації
  compiler: {
    /**
     * Вказує, чи повинен бути включений компілятор.
     */
    enabled: true,

    /**
     * Визначає шлях до вихідних файлів
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Вказує, чи повинні компоненти зберігатися після перетворення. Таким чином, компілятор можна запустити лише один раз для перетворення програми, а потім видалити.
     */
    saveComponents: false,

    /**
     * Префікс ключа словника
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда витягування'>

Запустіть екстрактор для перетворення компонентів і витягування вмісту

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Компілятор Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Оновіть свій `vite.config.ts`, щоб включити плагін `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Або npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (Опційно) Sitemap і robots.txt (генерація під час збірки)

Intlayer надає `generateSitemap` і `getMultilingualUrls` - утиліти для формування багатомовних `sitemap.xml` і `robots.txt` для краулерів та автоматичного запису в `public/`. Зазвичай запускають невеликий Node-скрипт **перед** Vite (наприклад, npm-хуки `predev` / `prebuild`).

#### Sitemap

Генератор sitemap враховує локалі й додає метадані для краулерів.

> Підтримується простір імен `xhtml:link` (hreflang). Замість плоского списку URL Intlayer пов’язує всі мовні версії сторінки в обидва боки (наприклад `/about`, `/fr/about` або `/about?lang=fr` залежно від режиму маршрутизації).

#### Robots.txt

Використовуйте `getMultilingualUrls`, щоб правила `Disallow` покривали всі локалізовані варіанти шляхів.

#### 1. Файл `generate-seo.mjs` у корені проєкту

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Пакет `intlayer` має бути встановлений. У продакшені задайте `SITE_URL` у середовищі (наприклад у CI).

> Для Node ESM краще `generate-seo.mjs`. Для `generate-seo.js` додайте `"type": "module"` у `package.json` або ввімкніть ESM інакше.

#### 2. Запуск скрипта перед Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Підлаштуйте команди для pnpm або yarn. Можна викликати скрипт із CI.

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
