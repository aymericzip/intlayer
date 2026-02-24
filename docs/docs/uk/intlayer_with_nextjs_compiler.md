---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Перетворення існуючого додатка Next.js на багатомовний додаток (посібник i18n 2026)
description: Дізнайтеся, як зробити ваш існуючий додаток Next.js багатомовним за допомогою Intlayer Compiler. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти ваш додаток за допомогою ШІ.
keywords:
  - Інтернаціоналізація
  - Переклад
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Компілятор
  - ШІ
slugs:
  - doc
  - налаштування
  - nextjs
  - компілятор
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Перший випуск
---

# Як зробити багатомовним (i18n) існуючий додаток Next.js (посібник i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Відео" value="video">
  
<iframe title="Найкраще рішення i18n для Next.js? Відкрийте для себе Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="CodeSandbox Демо - Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Ознайомтеся з [Шаблоном додатку](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Зміст

<TOC/>

## Чому інтернаціоналізація існуючого додатку є складною?

Якщо ви коли-небудь намагалися додати кілька мов до програми, яка була створена лише для однієї, ви знаєте про всі труднощі. Це не просто "важко" - це виснажливо. Вам доводиться переглядати кожен файл, знаходити кожен рядок тексту та переміщувати їх у спеціальні файли словників (dictionaries).

Потім настає найризикованіша частина: заміна всього цього тексту на хуки коду (code hooks), при цьому не ламаючи макет сторінки (layout) чи логіку коду. Це робота, яка інколи призупиняє розробку нових функцій на тижні й здається нескінченим рефакторингом (переробкою).

## Що таке Intlayer Compiler?

**Intlayer Compiler** (Компілятор Intlayer) був створений, щоб пропустити цю ручну роботу. Замість того, щоб змушувати вас вручну витягувати всі рядки коду, компілятор робить це за вас. Він сканує ваш код, знаходить текст та використовує Штучний Інтелект (АІ), щоб генерувати словники у фоновому режимі (background).
Потім він змінює ваш вихідний код під час етапу збірки (build step), щоб запровадити необхідні i18n хуки. По суті, ви продовжуєте писати свій додаток, ніби пишете однією мовою, а компілятор автоматично обробляє багатомовне перетворення.

> Документація компілятора: https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md

### Обмеження

Оскільки компілятор виконує аналіз коду і його трансформацію (впровадження хуків та генерування словників) під час **часу збірки (compile time)**, він може **уповільнити процес збірки (збирання)** вашого додатку.

Щоб обмежити цей вплив під час розробки (dev mode), ви можете налаштувати компілятор на роботу у режимі [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md) або відключити його, коли в ньому немає потреби.

---

## Покрокова інструкція з налаштування Intlayer в додатку Next.js

### Крок 1: Встановлення залежностей (Dependencies)

Встановіть необхідні пакети за допомогою вашого улюбленого менеджера пакетів (npm, pnpm тощо):

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Головний пакет, що забезпечує інструменти інтернаціоналізації для управління конфігурацією, перекладом, [декларацією змісту словників](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляцією (кодом), та містить [CLI команди](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

  Пакет, який безпосередньо інтегрує Intlayer з фреймворком Next.js. Він надає контекст-провайдери та хуки для інтернаціоналізації Next.js. Крім того, він включає в себе плагін Next.js для інтеграції Intlayer в середовища [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також прошарок (middleware) для виявлення бажаної мови користувача (locale), керування файлами файлів cookie та обробки перенаправлення (redirecting) URL-адрес.

### Крок 2: Налаштування вашого проєкту

Створіть конфігураційний файл, щоб визначити мови вашого додатку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Це налаштування можна перевести в 'build-only', щоб обмежити навантаження в режимі розробника (dev)
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Не має префікса компіляції (за замовчуванням comp-)
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Це є прикладом простого додатку карти",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Це налаштування можна перевести в 'build-only', щоб обмежити навантаження в режимі розробника (dev)
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Не має префікса компіляції (за замовчуванням comp-)
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Це є прикладом простого додатку карти",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Це налаштування можна перевести в 'build-only', щоб обмежити навантаження в режимі розробника (dev)
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Не має префікса компіляції (за замовчуванням comp-)
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Це є прикладом простого додатку карти",
  },
};

module.exports = config;
```

> **Примітка**: Переконайтеся, що ви налаштували `OPEN_AI_API_KEY` у ваших змінних середовища (env variables).

> За допомогою цього конфігураційного файлу ви можете налаштувати локалізовані (localized) URL-адреси, проксі-перенаправлення, мапінг (встановлення) файлів cookie, розташування та розширення файлів ваших декларацій змісту (content declarations), вимкнути логи Intlayer в консолі та багато іншого. Для ознайомлення з повним списком доступних параметрів, перегляньте документацію до [конфігурацій](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer до вашої конфігурації Next.js

Налаштуйте вашу конфігурацію Next.js для можливості використання Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Якщо у вас є інші налаштування Next.js - пишіть їх тут */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Якщо у вас є інші налаштування Next.js - пишіть їх тут */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Якщо у вас є інші налаштування Next.js - пишіть їх тут */
};

module.exports = withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer із Next.js. Він гарантує побудову файлів декларації змісту та словників (dictionary files) і слідкує (watch) за ними під час режиму розробника (dev mode). Він визначає змінні середовища Intlayer для [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). В додаток, він забезпечує псевдоніми (aliases) для оптимізації продуктивності та повністю підтримує роботу із Server Components (Серверними компонентами).

### Налаштування Babel

Компілятор Intlayer вимагає Babel для вилучення та оптимізації вашого контенту. Оновіть ваш `babel.config.js` (або `babel.config.json`), щоб долучити плагіни Intlayer:

```js fileName="babel.config.js" codeFormat="commonjs"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Крок 4: Визначення динамічної маршрутизації мов (Locale Routing)

Очистіть все (весь код) всередині компонента `RootLayout` та замініть його прикладом коду нижче:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Крок 5: Декларування вашого змісту (Автоматично)

При ввімкненому компіляторі вам **більше не потрібно** складати та декларувати словники вмісту вручну (наприклад, файли `.content.ts`).

Натомість, ви можете просто написати ваш вміст у вигляді прямих текстових рядків в коді. Intlayer самостійно просканує ваш код (вихідний код), згенерує переклади за допомогою налаштованого ШІ (AI) провайдера і замінить ці рядки на локалізований (перекладений) вміст безпосередньо в момент збірки (build compile time). Все це робиться повністю автоматично.

### Крок 6: Використання вашого контенту в коді

Просто пишіть свої компоненти з захардкодженими рядками у вашій мові за замовчуванням. Компілятор зробить все інше.

Приклад того, як може виглядати ваша сторінка:

<Tabs>
  <Tab value="Code" label="Код">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Почніть з редагування</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output" label="Вивід">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      uk: {
        getStartedByEditing: "Почніть з редагування",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- Пам'ятайте, що **`IntlayerClientProvider`** використовується для розповсюдження мови (locale) зверху вниз до всіх елементів-нащадків в компонентах клієнтського типу (Client-side components).
- Водночас **`IntlayerServerProvider`** натомість має функцію забезпечення мови для елементів-нащадків всередині структур "Серверних" (Server nodes) компонентів.

### (Опціонально) Крок 7: Заповнення відсутніх перекладів

Intlayer надає інструмент CLI, який допоможе вам заповнити відсутні переклади. Ви можете використовувати команду `intlayer` для тестування та заповнення відсутніх перекладів із вашого коду.

```bash
npx intlayer test         # Перевірити наявність відсутніх перекладів
```

```bash
npx intlayer fill         # Заповнити відсутні переклади
```

### (Необов'язково) Крок 8: Налаштування проксі (Proxy) для визначення мови

Якщо ви бажаєте автоматично відстежувати та виявляти улюблену мову вашого користувача, налаштуйте проксі:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` використовується для того, щоб виявити обрану мову вашого користувача та успішно перенаправити клієнта (відвідувача) до потрібної URL-адреси на основі налаштувань у файлі [конфігурацій (Configuration file)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Вона додатково уможливлює збереження цієї бажаної мови в cookie браузера (браузерній сесії) для зручності доступу користувача у майбутньому.

### (Необов'язково) Крок 9: Переключення мов (Language Switcher)

Найефективніший спосіб зміни мови всередині Next.js (щоб уникнути жорсткого перезавантаження сторонки 'hard refresh') полягає у використанні компонента "посилання" (`Link`), аби направити користувача за потрібним маршрутом (route) для правильної мови. Такий спосіб використовує вбудовану технологію 'prefetch' (попереднього завантаження) фреймворку Next.js і захищає від небажаного перезавантаження екрану і всіх скриптів браузера.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Коротка назва мови (Locale) - наприклад: UK */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови в перекладі поточною локаллю - наприклад: Українська (якщо зараз українська) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Те, як власне сама мова називається "собою" - наприклад: Español (для Іспанської) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Для базового розуміння - англійський еквівалент імені мови, наприклад: Ukrainian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Коротка назва мови (Locale) - наприклад: UK */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови в перекладі поточною локаллю - наприклад: Українська (якщо зараз українська) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Те, як власне сама мова називається "собою" - наприклад: Español (для Іспанської) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Для базового розуміння - англійський еквівалент імені мови, наприклад: Ukrainian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Коротка назва мови (Locale) - наприклад: UK */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови в перекладі поточною локаллю - наприклад: Українська (якщо зараз українська) */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Те, як власне сама мова називається "собою" - наприклад: Español (для Іспанської) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Для базового розуміння - англійський еквівалент імені мови, наприклад: Ukrainian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Опціональною альтернативою є виклик функції `setLocale`, яка надається хуком `useLocale`. Детально про вдосконалені можливості хуків ви можете прочитати на [сторінці з довідником щодо роботи з `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md).

### (Необов'язково) Крок 10: Отримуйте або вказуйте поточну мову на Серверному рівні (в Server Action)

Якщо вам вкрай необхідно витягти мову користувача для виконання Серверних дій / "Server action" (як-от відправка цільового Email повідомлення певною мовою чи звернення до певного API на бекенді), інноваційне рішення лежить у функції `getLocale` з пакету `@next-intlayer/server` (яка автоматично визначає мову вашого запиту, що розглядається сервером).

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Тепер без жодних перепон можете маніпулювати (відправити лист на цьому ж locale мовному ключі) дією!
};
```

> Інтуїтивний алгоритм функції `getLocale`, що вимагає виклик, визначає мову з такою жорсткою системною ієрархією пріоритетів:
>
> 1. Вона зчитує системні запити (заголовки HTTP Request Header), на які відсилається Next.js за замовчуванням при наявності Middleware чи проксі запиту.
> 2. Вона перевіряє (cookie), чи немає там вже збереженої та виокремленої мови від попередніх взаємодій.
> 3. Вона оцінює мову системних налаштувань вашого клієнта-пристрою (Client Device Preferences/Browser Headers).
> 4. Коли всі верхні кроки відкладені (пусті), система переводить управління у безпечний "аварійний режим", де гарантовано вибирає Мову За Замовчуванням (Default Locale set-up in parameters of config) як найпридатнішу!

### (Необов'язково) Крок 11: Зменшуйте файлові розміри збірки вашого додатку / Bundle-Optimizing. (Тільки із застосуванням SWC Транспілятора для фреймворку Next.JS)

Діючи за стандартним сценарієм інтеграції, пакет `next-intlayer` збиратиме весь масив створених словників ("словникового пулу додатку") в одну "зв'язку" ("Client Bundle") й дотисно прикріплюватиме його до кодів кожної Client Component сторінки (Page route). Зрозуміло, якщо багато словникових перекладів - це швидко тягне на занадто важкий трафік при завантажені сайту на пристрої клієнтів (величезні мегабайти JS на мережу). Розв'язати інцидент по-сучасному можна: Ви отримаєте доступ до плагіна Next.js SWC, та ще точніше `@intlayer/swc`. Плагін розпізнає контент і назавжди позбавляє ваш загальний клієнт-файл від маси непотрібних перекладів у мовах, залишаючи за собою лише ТУ саму фразу (text output data), безповоротно очищуючи весь масив.

Підготуйте інсталяцію плагіна з:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Просимо мати на увазі (УВАГА): Інтегрований інструмент-флаг "SWC experimental feature next.js environment" залишається на етапі експериментального розширення Vercel (Experimental Extension test framework) та має право існувати в системах, як мінімум, Next.js починаючи із 13 покоління версій та вище!

> УВАГА - При необхідності динамічного рендерингу додатку, тобто тих аспектів "async - data load / hooks usage", де фігурують Server Component Components обгорнуті `importMode: dynamic/fetch` хуку `useIntlayer`, використання елементів обгортання `<Suspense>` від React навколо них повинно забезпечитись розробником обов'язково 100%. Адже це призведе до безвідмовної обробки "render-layout fallback delay". В іншому випадку фреймворк Next JS безкомпромісно "полетить в аварію/впаде" та завадить нормальному перетворенню екранів HTML-layout!!

### Створення механізму Автооновлення "Live Watch mode Development" Разом із "Turbopack" середовищем!

Беручи до уваги алгоритми розробки всередині фреймворків Next.js "Dev Build Watch", відомо те що Turbopack (Новітня розробка потужного оптимізатору Next на заміну Webpack plugin loaders - "compo generator turbopack next dev mode"), він має не надто стабільну систему паралельних завантажень від зовнішніх плагінів ("Turbopack doesn't support async side-compile Webpack plugin modules"). Такий хід речей призвів би до прикростей: коли Intlayer Auto-Compiler перебуває в Background Watch-Process і формує словник `.content build/update`, Turbopack "не бачить" його (відсікається), та гальмуватиме відображення оновлених текстів наживо ("Hot-reload issues" в консолі).

Слід застосувати перевірений та міцний спосіб, що дозволяє у повній мірі працювати синхронізовано з подвійним Watcher Engine (Next & Intlayer): Запуск на постійній основі CLI скрипт функції "intlayer watch --with".

Керуйтеся до редагування своїх сценаріїв / scripts в кореневому `package.json`:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Подвійна активація "Watching CLI" режиму. Стартує і Intlayer і сам пусковий конвеєр "next dev Development".
  },
}
```

> До відома для субаплікацій: на більш старих, з застарілим кодом версіях модулів `@6.X.X series` "next-intlayer", обов'язково треба підключати команду суворо за правилами `--turbopack` параметра: `"intlayer watch --with 'next dev --turbopack'"`. Хоча, на переконструйованих новими пакетами `>= 7.X.X version` (сучасний Intlayer) - це стає базовою опцією (default background processing behavior).

### Функціонал та Типізація (Type Configuration Base) - TypeScript! Підказки Autocomplete / Editor Types

Механіка Intlayer Compiler, так би мовити "нишком" (хоча і без збоїв), при обробці генерує до всього ще й спеціально марковані Типи (Type/Typescript Declarations Models) "під капот / Output generate folder code".

У цій ситуації дуже вигідно повідомити редактору Visual Studio Code або ж іншому середовищу - "Де брати" дані словників. Підключення цього трюку виведе у ваш простір роботи дуже красиву магію "Intellisense Hints / Text Autocomplete Type Support" (прогнозування клавіш і попередження про помилки/неповні переклади "Missing Types keys check"):

![Проектування підказок-віджету Auto-Complete Suggestion Preview](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Розмітка помилки Type Check Error Lint Report Line red error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Хутко навідайте файл `tsconfig.json` у вашому проєкті (Project Root Typescript Settings) та додайте таку "include"-закладку (для того, аби ваш компілятор у процесі змішування та аналізу звернув увагу на файли папки генерації `.intlayer`):

```json5 fileName="tsconfig.json"
{
  "include": [
    // Вкажіть усі ваші стандартні шляхи фреймворку "next file paths"...
    ".intlayer/**/*.ts", // Секретна папка авто-перекладів розширена до екосистеми TS.
  ],
}
```

### Git Налаштування та уникнення небажаних конфліктів у Репозиторіях (Repo Configurations)

Грунтуючись на механіці фонових операцій Compiler'а: усі ці корисні, але важкі, динамічно створювані речі, включно зі словниками JSON `.content files`, та спеціально затипізовуваними схемами (`TS interface definitions`), за підсумком збираються в одній тимчасовій Root папці (`/.intlayer`).
Досвід підказує, що пушити («завантажувати на загальну гілку Code Repository Version Node Controls») всі ці матеріали на Git / Cloud Server Git Pipelines чи до Branch Merge Commits Team - категорично неефективна й часто руйнівна для код-рев'ю операція.

Рятівним кроком (і обов'язковою практикою розробника!) буде заблокувати "Git'у" можливість відстежувати її:

Ось що має бути у вашому `.gitignore`:

```plaintext fileName=".gitignore"
# Ніяк не тягніть на Git Repository сміття зі сторони генерування Intlayer "Background Processing Build Outputs"!
.intlayer
```

### Розширте межі можливостей - Ваш редактор кодів з VS Code / Extension "Плагін Розробника".

Кредо Intlayer не тільки в інфраструктурі, але й в інструментарії! Ви можете розраховувати на оптимізовані інструменти покращення ефективності вашого кодування завдяки - Microsoft Windows/Mac OS VS Code Tool Editor. Інсталюйте офіційний плагін! `Intlayer VS Code Extension` (офіційний VS App Add-on).

Тікайте мерщій в Visual Code Market і завантажте:
[Visual Studio Tools Web Extension Link (Натискай та поринай у магію).](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Список крутих "Бустів":

- **Екран спливаючих Підказок Над Вказівником / Auto Content Data Viewer**: Якщо ви наводите курсор-стрілочку в IDE поверх `I18n hook content dictionary key code`, плагін підхоплює вашу дію, та зверху на літу матеріалізує (як Pop-up Preview Dialog Box Box Message) розбірливий текст, власне "переклад" - позбавивши необхідності розгортати та клікати десяток різних Root Content Файликів словника для перевірок контенту.
- **Коректор Червоного кольору / Line Missing Error Warning Lint Indicator Tool**: Плагін самостійно шурхотить у пам'яті словників і коли бачить обірваний і не знайдений запит "Dictionary Data Key is not found" - світить на нього червоним хрестом, уберігаючи від злісних багів.
- **Машиніст Швидкого Доступу / Macro Automation Text-To-Code Shortcuts**: Оберіть вашому серцю милі "Захардкоджені рядки (String in text line Component code)" > натискаєте кнопки Keyboard Hot-keys Shortcut Combo System > Інструмент вирізає цю текстову частину, за кадром шле до Root Content словникового блоку JSON/Config і автоматично! 100% Самостійно! Рефакторить (імпортує необхідний 'useIntlayer()') прямо замість попередньої "вирізаної фрази". Насолоджуйтесь видатним рефакторингом (без жодного болісного перехода по File Explorer Tool Screen Tabs Tree!!!). Перегляньте та ознайомтесь із роз'ясненнями на сторінці - [Настройки Розширення Від Розробника VS App Plugin Settings Setup Guidelines Instruction manual Website.](https://intlayer.org/doc/vs-code-extension).

### Наступні Звершення! / Розширення "На Крок Ближче До Cloud" / Backend Setup & Team Collaboration?

Звершення першого інтеграційного етапу "React NextJS I18n Compiler Local Repository Integration" позаду! Та ви відчуваєте свербіж у плані можливості редагувати всю цю масу "Словосполучень/Текстів" з візуального UI / Редактора для адміністраторів ("Content Manager Users"), аби не морочити голову вашим "Non-Tech Data Editor/Copywriter Creators Users / Translators" відкриванням VS CODE? Рухайтесь за слідами у світ розширеної Web Panel CMS UI [Розділу про Візуальний UI Едітор на базі Component Screen Site React - Hướng Tới Giao Diện Tooling Trực Tiếp](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Вас заманила надія деплоїти ваші Data Database CMS файли у серверні інстанції Amazon Cloud, Vercel Remote Server Database, Remote Fetch End-point CMS API Node System Storage Structure / Vercel Edge Server CMS Setup? Приєднуйтесь до вищих ліг. Більше дивіться та опановуйте тут! - [Створіть свій потужний Intlayer I18n Node Headless CMS Backend Config Server Module Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
