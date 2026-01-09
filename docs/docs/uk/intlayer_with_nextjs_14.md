---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Як перекласти ваш сайт на Next.js 14 та App Router — посібник i18n 2026
description: Дізнайтеся, як зробити ваш сайт на Next.js 14 з App Router багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду `init`
  - version: 6.2.0
    date: 2025-10-09
    changes: Додано документацію для хука `useLocale` з опцією `onLocaleChange`
  - version: 5.6.6
    date: 2025-10-02
    changes: Додано документацію для функції `getLocale` у server actions
  - version: 5.6.2
    date: 2025-09-22
    changes: Додано документацію для хелпера `multipleMiddlewares`
  - version: 5.6.0
    date: 2025-07-06
    changes: Перетворено функцію `withIntlayer()` на функцію, що повертає Promise
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Перекладіть ваш сайт на Next.js 14 та App Router за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна відкрита бібліотека інтернаціоналізації (i18n), створена для спрощення підтримки кількох мов у сучасних вебзастосунках. Intlayer безшовно інтегрується з останнім фреймворком **Next.js 14**, включаючи його потужний **App Router**. Вона оптимізована для роботи з **Server Components** для ефективного рендерингу і повністю сумісна з [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (з Next.js >= 15).

With Intlayer, you can:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Отримувати доступ до перекладів як у клієнтських (client-side), так і у серверних (server-side) компонентах**.
- **Забезпечте підтримку TypeScript** за допомогою автогенерованих типів, що покращує автозаповнення та виявлення помилок.
- **Отримайте користь від розширених можливостей**, таких як динамічне виявлення локалі та її перемикання.

> Intlayer сумісний з Next.js 12, 13, 14 та 15. Якщо ви використовуєте Next.js Page Router, ви можете ознайомитися з цим [посібником](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_page_router.md). Для Next.js 15 з turbopack або без нього див. цей [посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md).

---

## Покроковий посібник з налаштування Intlayer у застосунку Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-14-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демонстрація CodeSandbox — Як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Дивіться [Шаблон додатку](https://github.com/aymericzip/intlayer-next-14-template) на GitHub.

### Крок 1: Встановіть залежності

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

Пакет, що інтегрує Intlayer з Next.js. Він надає провайдери контексту та хуки для інтернаціоналізації в Next.js. Також включає плагін Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також middleware для визначення переважної локалі користувача, керування cookies та обробки перенаправлень URL.

### Крок 2: Налаштуйте свій проєкт

Here is the final structure that we will make:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── middleware.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://intlayer.org/frequent-questions/next-no-locale-path) for more details.

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
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> За допомогою цього файлу конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, імена cookie, розташування та розширення ваших декларацій контенту, вимикати логи Intlayer у консолі та інше. Для повного списку доступних параметрів див. [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у конфігурацію Next.js

Налаштуйте Next.js для використання Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer з Next.js. Він забезпечує побудову файлів декларацій контенту та відслідковує їх у режимі розробки. Він визначає змінні середовища Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Додатково він надає aliases для оптимізації продуктивності та забезпечує сумісність із серверними компонентами.

> Функція `withIntlayer()` повертає проміс. Якщо ви хочете використовувати її з іншими плагінами, ви можете дочекатися її виконання за допомогою await. Приклад:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Крок 4: Налаштування middleware для виявлення локалі

Налаштуйте middleware, щоб виявляти переважну локаль користувача:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` використовується для виявлення пріоритетної локалі користувача та перенаправлення його на відповідний URL згідно з [конфігурацією](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Додатково, воно дозволяє зберігати пріоритетну локаль користувача в cookie.

> Налаштуйте параметр `matcher`, щоб він відповідав маршрутам вашого застосунку. Для детальнішої інформації зверніться до [документації Next.js щодо конфігурації matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

> Якщо потрібно послідовно виконувати кілька middleware (наприклад, `intlayerMiddleware` разом із автентифікацією або кастомними middleware), Intlayer тепер надає хелпер під назвою `multipleMiddlewares`.

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

### Крок 5: Визначте динамічні маршрути локалі

Видаліть усе з `RootLayout` та замініть наступним кодом:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Ви все ще можете обгорнути children іншими providers, такими як `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Ви все ще можете обгорнути children іншими providers, такими як `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Ви все ще можете обгорнути children іншими providers, такими як `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Залишаючи компонент `RootLayout` порожнім, ви можете встановити атрибути [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) та [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тегу `<html>`.

Щоб реалізувати динамічну маршрутизацію, вкажіть шлях для локалі, додавши новий layout у вашу директорію `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> Сегмент шляху `[locale]` використовується для визначення локалі. Наприклад: `/en-US/about` відповідатиме `en-US`, а `/fr/about` — `fr`.

> На цьому етапі ви зіткнетеся з помилкою: `Error: Missing <html> and <body> tags in the root layout.`. Це очікувано, оскільки файл `/app/page.tsx` більше не використовується і його можна видалити. Натомість сегмент шляху `[locale]` активує сторінку `/app/[locale]/page.tsx`. Внаслідок цього сторінки будуть доступні за шляхами типу `/en`, `/fr`, `/es` у вашому браузері. Щоб встановити локаль за замовчуванням як кореневу сторінку, зверніться до налаштування `middleware` у кроці 4.

Тоді реалізуйте функцію `generateStaticParams` у Layout вашого застосунку.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Рядок для вставки

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Решта коду */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Рядок для вставки

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Решта коду */
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Рядок для вставки

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Решта коду */
};

module.exports = LocaleLayout;
```

> `generateStaticParams` гарантує, що ваш застосунок попередньо збудує необхідні сторінки для всіх локалей (locales), зменшуючи обчислення під час виконання і покращуючи досвід користувача. Для детальнішої інформації зверніться до [документації Next.js щодо generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Крок 6: Оголосіть ваш контент

Створіть і керуйте деклараціями контенту, щоб зберігати переклади:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        uk: "Почніть з редагування",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        uk: "Почніть з редагування",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        uk: "Почніть з редагування",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "uk": "Почніть з редагування",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "uk": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Ваші декларації вмісту можуть бути визначені будь-де у вашому застосунку, як тільки вони будуть додані до директорії `contentDir` (за замовчуванням, `./src`). І відповідати розширенню файлу декларації вмісту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для докладніших відомостей зверніться до [документації щодо декларацій контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 7: Використання контенту у вашому коді

Отримуйте доступ до своїх словників контенту в усьому застосунку:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** використовується для надання локалі компонентам на боці клієнта. Його можна розмістити в будь-якому батьківському компоненті, включно з layout. Проте рекомендується розміщувати його в layout, оскільки Next.js ділить код layout між сторінками, що робить це більш ефективним. Використовуючи `IntlayerClientProvider` у layout, ви уникаєте повторної ініціалізації на кожній сторінці, покращуєте продуктивність і підтримуєте послідовний контекст локалізації в усьому додатку.
- **`IntlayerServerProvider`** використовується для надання локалі серверним дочірнім елементам. Його не можна встановлювати в layout.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React’s cache](https://react.dev/reference/react/cache) mechanism), causing each “context” to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.
  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React’s cache](https://react.dev/reference/react/cache) mechanism), causing each “context” to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Створити декларацію пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Створює декларацію пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Створює декларацію пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Створення декларації пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Створення декларації пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Створити пов'язане оголошення контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Якщо ви хочете використати свій контент в атрибуті типу `string`, наприклад `alt`, `title`, `href`, `aria-label` тощо, вам потрібно викликати значення функції, наприклад:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

### (Необов'язково) Крок 8: Інтернаціоналізація метаданих

Якщо ви хочете інтернаціоналізувати свої метадані, наприклад заголовок сторінки, ви можете використати функцію `generateMetadata`, надану Next.js. Всередині ви можете отримати контент за допомогою функції `getIntlayer`, щоб перекласти метадані.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Створити додаток Next.js",
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      uk: "Згенеровано за допомогою create next app",
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Створити додаток Next.js",
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      uk: "Згенеровано за допомогою create next app",
      en: "Generated by create next app",
      uk: "Згенеровано за допомогою create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// Словник метаданих сторінки
/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Створити додаток Next.js",
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      uk: "Згенеровано за допомогою create next app",
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "uk": "Логотип Preact",
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "uk": "Згенеровано за допомогою create next app",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерує об'єкт, що містить усі URL для кожної локалі.
   *
   * Приклад:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Повертає
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Решта коду
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерує об'єкт, що містить усі URL для кожної локалі.
   *
   * Приклад:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Повертає
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = ({ params: { locale } }) => {
  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерує об'єкт, що містить усі URL для кожної локалі.
   *
   * Приклад:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Повертає
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... Rest of the code
````

> Зверніть увагу, що функція `getIntlayer`, імпортована з `next-intlayer`, повертає ваш контент, обгорнутий в `IntlayerNode`, що дозволяє інтеграцію з візуальним редактором. Натомість функція `getIntlayer`, імпортована з `intlayer`, повертає ваш контент без додаткових властивостей.

Альтернативно, ви також можете використовувати функцію `getTranslation` для оголошення ваших метаданих. Проте рекомендується використовувати файли декларації контенту, щоб автоматизувати переклад метаданих і згодом винести контент у зовнішні файли.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      uk: "Мій заголовок",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      uk: "Мій опис",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Решта коду
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      uk: "Мій заголовок",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      uk: "Мій опис",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Решта коду
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      uk: "Мій заголовок",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      uk: "Мій опис",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... Решта коду
```

> Дізнайтеся більше про оптимізацію метаданих в офіційній документації Next.js: [on the official Next.js documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Необов'язково) Крок 9: Інтернаціоналізація вашого sitemap.xml та robots.txt

Щоб інтернаціоналізувати ваші файли `sitemap.xml` та `robots.txt`, ви можете використовувати функцію `getMultilingualUrls`, надану Intlayer. Ця функція дозволяє генерувати багатомовні URL-адреси для вашого sitemap.

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Дізнайтеся більше про оптимізацію sitemap у [офіційній документації Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Дізнайтеся більше про оптимізацію robots.txt у [офіційній документації Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Необов'язково) Крок 10: Зміна мови вашого контенту

Щоб змінити мову вашого контенту в Next.js, рекомендований спосіб — використовувати компонент `Link` для перенаправлення користувачів на відповідну локалізовану сторінку. Компонент `Link` дозволяє попередньо завантажувати сторінку (prefetch), що допомагає уникнути повного перезавантаження сторінки.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Гарантує, що кнопка "Назад" у браузері перенаправить на попередню сторінку
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
              {/* Мова в поточній локалі - наприклад Francés при поточній локалі, встановленій на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською - наприклад French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Гарантує, що кнопка браузера «назад» перенаправлятиме на попередню сторінку
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
              {/* Мова в поточному локалі — наприклад Francés при встановленому Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — наприклад French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Забезпечить, що кнопка "назад" у браузері перенаправлятиме на попередню сторінку
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
              {/* Мова в поточній локалі - наприклад Francés якщо поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською - наприклад French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативний спосіб — використати функцію `setLocale`, надану хуком `useLocale`. Ця функція не дозволяє prefetching сторінки. Див. документацію хуку [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md) для детальнішої інформації.

> Ви також можете вказати функцію в опції `onLocaleChange`, щоб викликати власну функцію при зміні локалі.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Решта коду

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Change to French</button>
);
```

> Посилання на документацію:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Необов'язково) Крок 11: Створення локалізованого компоненту `Link`

Щоб переконатися, що навігація вашого застосунку відповідає поточній локалі, ви можете створити власний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес, так що. Наприклад, коли франкомовний користувач натисне на посилання на сторінку "About", він буде перенаправлений на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та досвід користувача**: локалізовані URL допомагають пошуковим системам правильно індексувати сторінки для конкретних мов і надають користувачам контент обраною мовою.
- **Послідовність**: Використовуючи локалізовані посилання по всьому додатку, ви гарантуєте, що навігація залишатиметься в поточній локалі, запобігаючи несподіваним перемиканням мови.
- **Підтримуваність**: Централізація логіки локалізації в одному компоненті спрощує управління URL, роблячи кодову базу легшою для підтримки та розширення у міру зростання вашого додатку.

Нижче наведено реалізацію локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Кастомний компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація відбувається в межах одного локального контексту.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання є внутрішнім і надано дійсний href, отримати локалізований URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Кастомний компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в межах тієї ж локалі.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє і передано дійсний href, отримати локалізований URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // If the link is internal and a valid href is provided, get the localized URL.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Як це працює

- **Виявлення зовнішніх посилань**:  
  Допоміжна функція `checkIsExternalLink` визначає, чи є URL зовнішнім. Зовнішні посилання залишаються без змін, оскільки їх не потрібно локалізувати.

- **Отримання поточної локалі**:  
  Хук `useLocale` повертає поточну локаль (наприклад, `fr` для французької).

- **Локалізація URL**:  
  Для внутрішніх посилань (тобто не зовнішніх) використовується `getLocalizedUrl`, щоб автоматично додати префікс локалі до URL. Це означає, що якщо ваш користувач має французьку локаль, передача `/about` як `href` перетвориться на `/fr/about`.

- **Повернення посилання**:  
  Компонент повертає елемент `<a>` з локалізованим URL, що гарантує узгодженість навігації з локаллю.

Інтегруючи цей компонент `Link` по всьому застосунку, ви забезпечуєте послідовний і орієнтований на мову користувацький досвід, а також отримуєте переваги покращеного SEO та зручності використання.

### (Необов'язково) Крок 12: Отримати поточну локаль у Server Actions

Якщо вам потрібна активна локаль всередині Server Action (наприклад, щоб локалізувати електронні листи або виконувати логіку, залежну від локалі), викличте `getLocale` з `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Виконайте дію з локаллю
};
```

> Функція `getLocale` використовує каскадну стратегію для визначення локалі користувача:
>
> 1. По-перше, вона перевіряє заголовки запиту на наявність значення локалі, яке могло бути встановлене middleware
> 2. Якщо локалі немає в заголовках, вона шукає локаль, збережену в cookies
> 3. Якщо cookie не знайдено, вона намагається визначити пріоритетну мову користувача за налаштуваннями браузера
> 4. Як останній засіб, використовується локаль за замовчуванням, налаштована в додатку
>
> Це гарантує, що буде обрана найбільш відповідна локаль на основі доступного контексту.

### (Необов'язково) Крок 13: Оптимізуйте розмір бандла

При використанні `next-intlayer` словники за замовчуванням включаються в бандл для кожної сторінки. Щоб оптимізувати розмір бандла, Intlayer надає необов'язковий плагін SWC, який інтелектуально замінює виклики `useIntlayer` за допомогою макросів. Це гарантує, що словники включатимуться лише в бандли для сторінок, які їх фактично використовують.

Щоб увімкнути цю оптимізацію, встановіть пакет `@intlayer/swc`. Після встановлення `next-intlayer` автоматично виявить і використовуватиме плагін:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Примітка: Ця оптимізація доступна лише для Next.js 13 та вище.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки плагіни SWC все ще є експериментальними в Next.js. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановите опцію як `importMode: 'dynamic'` або `importMode: 'live'`, це буде залежати від Suspense, тому вам доведеться обгорнути виклики `useIntlayer` у межі `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні компоненту Page / Layout.

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб скористатися перевагами TypeScript і зробити вашу codebase більш надійною.

![Автодоповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші існуючі конфігурації TypeScript
  "include": [
    // ... Ваші існуючі конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути їх додавання до вашого Git-репозиторію.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігноруйте файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Перевірку помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Подальші кроки

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент зовнішньо, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
