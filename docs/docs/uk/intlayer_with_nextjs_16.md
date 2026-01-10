---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Як перекласти ваш додаток Next.js 16 — посібник з i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на Next.js 16 багатомовним. Дотримуйтесь документації, щоб інтернаціоналізувати (i18n) та перекласти його.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано згадку про `x-default` в об'єкті `alternates`
  - version: 7.0.0
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть ваш вебсайт на Next.js 16 за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">
  
<iframe title="Найкраще i18n-рішення для Next.js? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — як інтернаціоналізувати ваш додаток за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-next-16-template) на GitHub.

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — це інноваційна, open-source бібліотека інтернаціоналізації (i18n), створена для спрощення багато-мовної підтримки в сучасних вебзастосунках. Intlayer безшовно інтегрується з новітнім фреймворком **Next.js 16**, включно з його потужним **App Router**. Вона оптимізована для роботи з **Server Components** для ефективного рендерингу та повністю сумісна з [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та контент.
- **Отримувати доступ до перекладів як у клієнтських (client-side), так і в серверних (server-side) компонентах**.
- **Забезпечити підтримку TypeScript** за допомогою автогенерованих типів, що покращує автозавершення та виявлення помилок.
- **Скористайтеся розширеними функціями**, такими як динамічне визначення та перемикання локалі.

> Intlayer сумісний з Next.js 12, 13, 14 та 16. Якщо ви використовуєте Next.js Page Router, можна звернутися до цього [посібника](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_page_router.md). Для Next.js 12, 13, 14 з App Router див. цей [посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_14.md).

---

## Покроковий посібник з налаштування Intlayer у застосунку Next.js

### Крок 1: Встановлення залежностей

Встановіть необхідні пакети за допомогою npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [декларування контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

````

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
````

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладів, [оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

Пакет, який інтегрує Intlayer з Next.js. Він надає провайдери контексту та хуки для інтернаціоналізації в Next.js. Крім того, він містить плагін для Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також проксі для визначення преференційної локалі користувача, керування cookie та обробки перенаправлень URL.

### Крок 2: Налаштуйте ваш проєкт

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
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Створіть конфігураційний файл для налаштування мов вашого застосунку:

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
      // Інші ваші локалі
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

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення проксі, назви cookie, розташування та розширення декларацій вашого контенту, вимкнути логи Intlayer у консолі та інше. Повний перелік доступних параметрів див. у [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтегруйте Intlayer у конфігурацію Next.js

Налаштуйте Next.js для використання Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* опції конфігурації тут */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* опції конфігурації тут */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* опції конфігурації тут */
};

module.exports = withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* параметри конфігурації тут */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* параметри конфігурації тут */
};

module.exports = withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer з Next.js. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні оточення Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Крім того, він додає аліаси (aliases) для оптимізації продуктивності та гарантує сумісність із серверними компонентами.
>
> Функція `withIntlayer()` повертає Promise. Вона дозволяє підготувати словники intlayer перед початком збірки. Якщо ви хочете використовувати її разом з іншими плагінами, ви можете застосувати `await`. Приклад:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Якщо ви хочете використовувати його синхронно, ви можете скористатися функцією `withIntlayerSync()`. Приклад:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer автоматично визначає, чи ваш проєкт використовує **webpack** чи **Turbopack** на основі прапорів командного рядка `--webpack`, `--turbo` або `--turbopack`, а також вашої поточної версії **Next.js**.
>
> Оскільки `next>=16`, якщо ви використовуєте **Rspack**, ви повинні явно змусити Intlayer використовувати конфігурацію webpack, вимкнувши Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Крок 4: Визначте динамічні маршрути локалі

Видаліть усе з `RootLayout` і замініть наступним кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Ви все ще можете обгорнути children іншими провайдерами, наприклад `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Ви все ще можете обгорнути children іншими провайдерами, наприклад `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Ви все ще можете обгорнути children іншими провайдерами, наприклад `next-themes`, `react-query`, `framer-motion` тощо.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Утримання компонента `RootLayout` порожнім дозволяє встановити атрибути [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) та [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Щоб реалізувати динамічний роутинг, вкажіть шлях для локалі, додавши новий layout у директорію `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> Сегмент шляху `[locale]` використовується для визначення локалі. Наприклад: `/en-US/about` відповідатиме `en-US`, а `/fr/about` — `fr`.

> На цьому етапі ви зіткнетеся з помилкою: `Error: Missing <html> and <body> tags in the root layout.`. Це очікувано, оскільки файл `/app/page.tsx` більше не використовується і може бути видалений. Натомість сегмент шляху `[locale]` активуватиме сторінку `/app/[locale]/page.tsx`. Відповідно, сторінки будуть доступні за шляхами типу `/en`, `/fr`, `/es` у вашому браузері. Щоб встановити локаль за замовчуванням як кореневу сторінку, зверніться до налаштування `proxy` в кроці 7.

Потім реалізуйте функцію `generateStaticParams` у Layout вашого додатка.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Рядок для вставки

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Інша частина коду */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Рядок для вставки

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Решта коду */
};

// ... Решта коду
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Рядок для вставки

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Решта коду */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` гарантує, що ваш застосунок попередньо збирає необхідні сторінки для всіх локалей, зменшуючи обчислення під час виконання та покращуючи взаємодію користувача. Для детальнішої інформації зверніться до [документації Next.js щодо generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer працює з `export const dynamic = 'force-static';`, щоб забезпечити попередню збірку сторінок для всіх локалей.

### Крок 5: Оголосіть свій контент

Створіть і керуйте своїми деклараціями контенту для зберігання перекладів:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
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
        uk: "Почніть редагувати",
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
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ваші декларації контенту можуть бути визначені будь-де у вашому додатку, якщо вони включені в директорію `contentDir` (за замовчуванням, `./src`). І відповідають розширенню файлу декларації контенту (за замовчуванням, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації зверніться до [документації з декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 6: Використання контенту у вашому коді

Отримуйте доступ до ваших словників контенту по всьому додатку:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** використовується для надання локалі клієнтським компонентам. Його можна розмістити в будь-якому батьківському компоненті, включно з layout. Проте рекомендується розміщувати його в layout, оскільки Next.js ділиться кодом layout між сторінками, що робить це більш ефективним. Використання `IntlayerClientProvider` в layout дозволяє уникнути повторної ініціалізації для кожної сторінки, покращує продуктивність і підтримує послідовний контекст локалізації в усьому застосунку.
- **`IntlayerServerProvider`** використовується для надання локалі серверним дочірнім компонентам. Його не можна встановлювати в layout.

> Layout і сторінка не можуть ділитися спільним серверним контекстом, оскільки система серверного контексту базується на сховищі даних для кожного запиту (через механізм [React's cache](https://react.dev/reference/react/cache)), що призводить до повторного створення кожного «контексту» для різних сегментів застосунку. Розміщення провайдера в спільному layout порушить цю ізоляцію і не дозволить правильно передавати значення серверного контексту вашим серверним компонентам.

> Layout і сторінка не можуть спільно використовувати загальний серверний context, тому що система серверних контекстів базується на сховищі даних на кожен запит (через механізм [React's cache](https://react.dev/reference/react/cache)), унаслідок чого кожен «context» створюється заново для різних сегментів застосунку. Розміщення провайдера в спільному layout порушить цю ізоляцію та не дозволить правильно передати значення серверного контексту до ваших server components.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Створити відповідну декларацію контенту

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
  const content = useIntlayer("client-component-example"); // Створити відповідну декларацію контенту

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
  const content = useIntlayer("client-component-example"); // Створити відповідну декларацію контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Створити пов'язану декларацію контенту

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
  const content = useIntlayer("server-component-example"); // Створити пов'язану декларацію контенту

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
  const content = useIntlayer("server-component-example"); // Створити відповідну декларацію контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Якщо ви хочете використовувати свій контент у рядковому атрибуті, такому як `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, наприклад:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, перегляньте [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

### (Необов'язково) Крок 7: Налаштування проксі для визначення локалі

Налаштуйте проксі, щоб визначати пріоритетну локаль користувача:

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

> `intlayerProxy` використовується для виявлення преферованої локалі користувача та перенаправлення його на відповідний URL, як вказано в [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Крім того, він дозволяє зберігати преферовану локаль користувача в cookie.

> Якщо потрібно об'єднати кілька проксі в ланцюжок (наприклад, `intlayerProxy` разом із аутентифікацією або кастомними проксі), Intlayer тепер надає допоміжну функцію під назвою `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Необов'язково) Крок 8: Інтернаціоналізація ваших метаданих

Якщо ви хочете інтернаціоналізувати свої метадані, наприклад заголовок сторінки, ви можете використовувати функцію `generateMetadata`, яку надає Next.js. Всередині ви можете отримати вміст з функції `getIntlayer`, щоб перекласти свої метадані.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Створити додаток Next",
      en: "Create Next App",
      uk: "Створити застосунок Next.js",
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
      uk: "Створити застосунок Next.js",
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

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

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
import type { LocalPromiseParams } from "next-intlayer";
export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

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

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерує об'єкт, що містить всі URL для кожної локалі.
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

// ... Решта коду
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерує об'єкт, який містить усі URL для кожної локалі.
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
````

> Зауважте, що функція `getIntlayer`, імпортована з `next-intlayer`, повертає ваш контент, упакований у `IntlayerNode`, що дозволяє інтеграцію з візуальним редактором. Натомість функція `getIntlayer`, імпортована з `intlayer`, повертає ваш контент безпосередньо без додаткових властивостей.

Альтернативно, ви можете використовувати функцію `getTranslation` для оголошення ваших метаданих. Однак рекомендується використовувати файли декларації контенту, щоб автоматизувати переклад ваших метаданих і зовнішньо зберігати контент у якийсь момент.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      uk: "Мій заголовок",
      en: "My title",
      uk: "Мій заголовок",
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

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
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

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

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

// ... Rest of the code
```

> Дізнайтеся більше про оптимізацію метаданих [в офіційній документації Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Необов'язково) Крок 9: Інтернаціоналізація вашого sitemap.xml і robots.txt

Щоб інтернаціоналізувати ваші `sitemap.xml` та `robots.txt`, ви можете використати функцію `getMultilingualUrls`, надану Intlayer. Ця функція дозволяє згенерувати мультимовні URL для вашого sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
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

### (Необов'язково) Крок 10: Змініть мову вашого контенту

Щоб змінити мову вашого контенту в Next.js, рекомендовано використовувати компонент `Link` для перенаправлення користувачів на відповідну локалізовану сторінку. Компонент `Link` дозволяє попередньо завантажувати сторінку (prefetch), що допомагає уникнути повного перезавантаження сторінки.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Гарантує, що кнопка «Назад» в браузері перенаправить на попередню сторінку
          >
            <span>
              {/* Локаль — наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у своїй локалі — наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — наприклад «Francés», коли поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — наприклад «French» */}
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

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Це гарантує, що кнопка браузера «назад» перенаправить на попередню сторінку
          >
            <span>
              {/* Locale — наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови у власній локалі — наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови в поточній локалі — наприклад "Francés", коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською — наприклад "French" */}
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

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Це гарантує, що кнопка «назад» в браузері перенаправлятиме на попередню сторінку
          >
            <span>
              {/* Локаль — напр., FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у своїй локалі — напр., Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — напр., Francés при встановленій локалі Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — напр., French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативний спосіб — використовувати функцію `setLocale`, що надається хуком `useLocale`. Ця функція не дозволяє попереднє завантаження (prefetch) сторінки. Детальніше див. документацію хука [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md).

> Також можна передати функцію в опцію `onLocaleChange`, щоб запускати власну функцію при зміні локалі.

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
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Змінити на французьку
  </button>
);
```

> Посилання на документацію:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)

- [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
- [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
- [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (необов'язково) Крок 11: Створення локалізованого компонента `Link`

Щоб гарантувати, що навігація вашого додатка враховує поточну локаль, ви можете створити власний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес. Наприклад, коли користувач, що говорить французькою, клацає посилання на сторінку "About", його буде перенаправлено на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та користувацький досвід**: локалізовані URL допомагають пошуковим системам правильно індексувати сторінки для конкретних мов та надають користувачам контент їхньою переважною мовою.
- **Послідовність**: використовуючи локалізоване посилання в усьому застосунку, ви гарантуєте, що навігація залишатиметься в межах поточної локалі, запобігаючи несподіваним перемикам мов.
- **Підтримуваність**: централізація логіки локалізації в одному компоненті спрощує управління URL-адресами, роблячи ваш codebase легшим для підтримки та розширення у міру зростання застосунку.

Нижче — реалізація локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Утилітна функція для перевірки, чи є вказана URL-адреса зовнішньою.
 * Якщо URL починається з http:// або https://, вважається зовнішньою.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Користувацький компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в контексті тієї самої локалі.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє й передано дійсний href, отримати локалізований URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * Утилітна функція для перевірки, чи є заданий URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Користувацький компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі (наприклад, /fr/about).
 * Це забезпечує, що навігація залишається в контексті тієї самої локалі.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє і передано валідний href, отримаємо локалізований URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * Утилітна функція для перевірки, чи є вказаний URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Користувацький компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань використовується `getLocalizedUrl`, щоб префіксувати URL локаллю (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в контексті тієї самої локалі.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // If the link is internal and a valid href is provided, get the localized URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Як це працює

- **Виявлення зовнішніх посилань**:  
  Допоміжна функція `checkIsExternalLink` визначає, чи є URL зовнішнім. Зовнішні посилання залишаються без змін, оскільки їх не потрібно локалізувати.

- **Отримання поточної локалі**:  
  Хук `useLocale` повертає поточну локаль (наприклад, `fr` для французької).

- **Локалізація URL**:
- Для внутрішніх посилань (тобто не зовнішніх) використовується `getLocalizedUrl`, який автоматично додає префікс з поточної локалі до URL. Це означає, що якщо ваш користувач у французькій локалі, передача `/about` як `href` перетворить його на `/fr/about`.

- **Повернення посилання**:  
  Компонент повертає елемент `<a>` з локалізованою URL-адресою, що забезпечує узгодженість навігації з локаллю.

Інтегрувавши цей компонент `Link` по всьому застосунку, ви підтримуєте послідовний і орієнтований на мову досвід користувача, а також отримуєте переваги у вигляді покращеного SEO та зручності використання.

### (Необов'язково) Крок 12: Отримати поточну локаль у Server Actions

Якщо вам потрібна активна локаль всередині Server Action (наприклад, щоб локалізувати емейли або виконувати логіку з урахуванням локалі), викличте `getLocale` з `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Виконайте дію з locale
};
```

> Функція `getLocale` використовує каскадну стратегію для визначення локалі користувача:
>
> 1. Спочатку перевіряє заголовки запиту на наявність значення locale, яке могло бути встановлене проксі
> 2. Якщо в заголовках locale не знайдено, шукає locale, збережене в cookies
> 3. Якщо cookie не знайдено, намагається визначити переважну мову користувача за налаштуваннями браузера
> 4. Як останній захід, використовує локаль за замовчуванням, налаштовану в додатку
>
> Це забезпечує вибір найбільш доречного локалю на основі доступного контексту.

### (Необов'язково) Крок 13: Оптимізуйте розмір бандла

При використанні `next-intlayer` словники за замовчуванням включаються в бандл для кожної сторінки. Щоб оптимізувати розмір бандла, Intlayer надає необов'язковий плагін SWC, який інтелектуально замінює виклики `useIntlayer` за допомогою макросів. Це гарантує, що словники включаються лише в ті бандли сторінок, які дійсно їх використовують.

Щоб увімкнути цю оптимізацію, встановіть пакет `@intlayer/swc`. Після встановлення `next-intlayer` автоматично виявить і використає плагін:

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

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки SWC-плагіни ще є експериментальними в Next.js. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановите опцію як `importMode: 'dynamic'` або `importMode: 'live'`, це буде покладатися на Suspense, тому вам доведеться обгорнути виклики `useIntlayer` в межі `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні вашого компонента Page / Layout.

### Слідкування за змінами словників у Turbopack

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Примітка: Ця оптимізація доступна лише для Next.js 13 та новіших версій.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки SWC-плагіни все ще експериментальні в Next.js. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановите опцію як `importMode: 'dynamic'` або `importMode: 'live'`, вона буде покладатися на Suspense, тому вам доведеться обгорнути виклики `useIntlayer` у межу `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні компонента Page / Layout.

### Слідкування за змінами словників у Turbopack

Якщо ви використовуєте Turbopack як сервер розробки з командою `next dev`, зміни в словниках за замовчуванням не будуть виявлятися автоматично.

Це обмеження виникає через те, що Turbopack не може запускати webpack-плагіни паралельно для моніторингу змін у ваших файлах контенту. Щоб обійти це, вам потрібно використовувати команду `intlayer watch`, щоб одночасно запускати і сервер розробки, і спостерігача збірки Intlayer.

```json5 fileName="package.json"
{
  // ... Ваші наявні конфігурації package.json
  "scripts": {
    // ... Ваші наявні конфігурації скриптів
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Якщо ви використовуєте next-intlayer@<=6.x.x, вам потрібно зберегти прапорець `--turbopack`, щоб додаток Next.js 16 коректно працював з Turbopack. Ми рекомендуємо використовувати next-intlayer@>=7.x.x, щоб уникнути цього обмеження.

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зробити ваш codebase міцнішим.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

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

Для цього додайте наступні інструкції у файл `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення VS Code

Щоб покращити досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автозаповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Інлайн-попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для простого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Подальші кроки

Щоб просунутися далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести ваш вміст, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
