---
createdAt: 2025-10-25
updatedAt: 2025-12-30
title: Як перекласти ваш додаток Next.js 15 — посібник з i18n 2026
description: Дізнайтеся, як зробити ваш вебсайт на Next.js 15 багатомовним. Дотримуйтесь документації для інтернаціоналізації (i18n) та перекладу.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.0.6
    date: 2025-11-01
    changes: Додано згадку про `x-default` в об'єкті `alternates`
  - version: 7.0.0
    date: 2025-10-25
    changes: Додано згадку про функцію `withIntlayerSync()`
  - version: 6.2.0
    date: 2025-10-09
    changes: Додано документацію для хука `useLocale` з опцією `onLocaleChange`
  - version: 5.6.6
    date: 2025-10-02
    changes: Додано документацію для функції `getLocale` у server actions
  - version: 5.6.2
    date: 2025-09-23
    changes: Додано документацію щодо відстеження змін словників у Turbopack
  - version: 5.6.2
    date: 2025-09-22
    changes: Додано документацію для хелпера `multipleMiddlewares`
  - version: 5.6.0
    date: 2025-07-06
    changes: Трансформовано функцію `withIntlayer()` на promise-based функцію
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
    changes: Додано згадку про функцію `withIntlayerSync()`
  - version: 6.2.0
    date: 2025-10-09
    changes: Додано документацію для хука `useLocale` з опцією `onLocaleChange`
  - version: 5.6.6
    date: 2025-10-02
    changes: Додано документацію для функції `getLocale` у server actions
  - version: 5.6.2
    date: 2025-09-23
    changes: Додано документацію щодо відстеження змін словників у Turbopack
  - version: 5.6.2
    date: 2025-09-22
    changes: Додано документацію для хелпера `multipleMiddlewares`
  - version: 5.6.0
    date: 2025-07-06
    changes: Перетворено функцію `withIntlayer()` на функцію, яка повертає Promise
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Перекладіть ваш вебсайт Next.js 15 за допомогою Intlayer | Інтернаціоналізація (i18n)

## Зміст

<TOC/>

## Що таке Intlayer?

**Intlayer** — інноваційна бібліотека для інтернаціоналізації (i18n) з відкритим кодом, створена для спрощення багатомовної підтримки в сучасних веб‑додатках. Intlayer плавно інтегрується з останньою версією **Next.js 15**, включаючи його потужний **App Router**. Вона оптимізована для роботи з **Server Components** для ефективного рендерингу і повністю сумісна з [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

З Intlayer ви можете:

- **Легко керувати перекладами** за допомогою декларативних словників на рівні компонентів.
- **Динамічно локалізувати метадані**, маршрути та вміст.
- **Отримувати доступ до перекладів як у клієнтських, так і в серверних компонентах**.
- **Забезпечте підтримку TypeScript** за допомогою автогенерованих типів, що покращують автозаповнення та виявлення помилок.
- **Отримайте переваги від розширених функцій**, таких як динамічне визначення локалі та її перемикання.

> Intlayer сумісний з Next.js 12, 13, 14 та 15. Якщо ви використовуєте Next.js Page Router, ви можете звернутися до цього [посібника](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_page_router.md). Для Next.js 12, 13, 14 з App Router зверніться до цього [посібника](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_14.md).

---

## Покроковий посібник з налаштування Intlayer у додатку Next.js

<Tab defaultTab="video">
  <TabItem label="Відео" value="video">

<iframe title="Найкраще i18n-рішення для Next.js? Дізнайтеся про Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-15-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox — Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Дивіться [Application Template](https://github.com/aymericzip/intlayer-next-15-template) на GitHub.

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

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладів, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

  Пакет, що інтегрує Intlayer з Next.js. Він забезпечує провайдери контексту та хуки для інтернаціоналізації в Next.js. Крім того, він включає плагін для Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також middleware для визначення пріоритетної локалі користувача, керування cookies та обробки перенаправлень URL.

  Основний пакет, який надає інструменти інтернаціоналізації для управління конфігурацією, перекладу, [декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

  Пакет, який інтегрує Intlayer з Next.js. Він надає провайдери контексту та хуки для інтернаціоналізації в Next.js. Крім того, включає плагін Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також middleware для виявлення переважної локалі користувача, керування cookie та обробки перенаправлень URL.

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

Створіть файл конфігурації, щоб налаштувати мови вашого застосунку:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
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
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через цей файл конфігурації ви можете налаштувати локалізовані URL-адреси, перенаправлення через middleware, назви cookie, розташування та розширення ваших декларацій контенту, відключити логи Intlayer у консолі та інше. Для повного переліку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

### Крок 3: Інтеграція Intlayer у конфігурацію Next.js

Налаштуйте конфігурацію Next.js для використання Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* параметри конфігурації тут */
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

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer з Next.js. Він забезпечує побудову файлів декларації контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Додатково він надає aliases для оптимізації продуктивності та забезпечує сумісність із серверними компонентами.
>
> Функція `withIntlayer()` повертає проміс. Вона дозволяє підготувати словники Intlayer перед початком збірки. Якщо ви хочете використовувати її з іншими плагінами, ви можете використати await. Приклад:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Якщо ви хочете використовувати його синхронно, ви можете скористатися функцією `withIntlayerSync()`. Приклад:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Крок 4: Визначення динамічних маршрутів локалі

Видаліть усе з `RootLayout` і замініть на наступний код:

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

> Залишаючи компонент `RootLayout` порожнім, ви дозволяєте встановлювати атрибути [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) та [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Щоб реалізувати динамічну маршрутизацію, вкажіть шлях для локалі, додавши новий layout у ваш каталог `[locale]`:

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

> Сегмент шляху `[locale]` використовується для визначення локалі. Приклад: `/en-US/about` відповідатиме `en-US`, а `/fr/about` — `fr`.

> На цьому етапі ви зіткнетесь з помилкою: `Error: Missing <html> and <body> tags in the root layout.`. Це очікувано, оскільки файл `/app/page.tsx` більше не використовується і його можна видалити. Натомість сегмент шляху `[locale]` активуватиме сторінку `/app/[locale]/page.tsx`. Отже, сторінки будуть доступні за шляхами на кшталт `/en`, `/fr`, `/es` у вашому браузері. Щоб встановити локаль за замовчуванням для кореневої сторінки, зверніться до налаштування `middleware` у кроці 7.

Далі реалізуйте функцію `generateStaticParams` у Layout вашого застосунку.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Line to insert

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Решта коду */
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Рядок для вставки

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Решта коду*/
};

// ... Решта коду
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Рядок для вставки

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Решта коду*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` гарантує, що ваш додаток попередньо збирає необхідні сторінки для всіх локалей, зменшуючи обчислення під час виконання та покращуючи взаємодію користувача. Для детальнішої інформації зверніться до [документації Next.js щодо generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer працює з `export const dynamic = 'force-static';`, щоб забезпечити попередню збірку сторінок для всіх локалей.

### Крок 5: Оголосіть контент

Створіть і керуйте оголошеннями контенту для збереження перекладів:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        uk: "Почніть із редагування",
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
        uk: "Почніть із редагування",
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

javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
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

> Декларації контенту можна визначати будь-де у вашому застосунку, якщо вони включені в директорію `contentDir` (за замовчуванням — `./src`). І вони повинні відповідати розширенню файлу декларації контенту (за замовчуванням — `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для детальнішої інформації зверніться до [документації щодо декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

### Крок 6: Використання контенту у коді

Отримуйте доступ до словників контенту у всьому застосунку:

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
    </IntlayerClientProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** використовується для передачі локалі клієнтським компонентам. Його можна розмістити в будь-якому батьківському компоненті, включно з layout. Однак рекомендовано розміщувати його в layout, оскільки Next.js ділиться кодом layout між сторінками, що робить це ефективнішим. Використовуючи `IntlayerClientProvider` у layout, ви уникаєте повторної ініціалізації для кожної сторінки, покращуєте продуктивність і підтримуєте послідовний контекст локалізації у всьому вашому додатку.
- **`IntlayerServerProvider`** використовується для надання локалі серверним дочірнім компонентам. Його не можна встановлювати в layout.

  > Layout і сторінка не можуть спільно використовувати спільний server context, оскільки система server context базується на сховищі даних для кожного запиту (через механізм [React's cache](https://react.dev/reference/react/cache)), що призводить до повторного створення кожного "контексту" для різних сегментів додатку. Розміщення провайдера в загальному layout порушить цю ізоляцію і не дозволить правильно передавати значення server context вашим server components.

  > Layout і page не можуть мати спільного server context, оскільки система server context базується на сховищі даних на запит (через механізм [React's cache](https://react.dev/reference/react/cache)), внаслідок чого кожен «context» створюється заново для різних сегментів застосунку. Розміщення провайдера в спільному layout порушило б цю ізоляцію й не дозволило б коректно пропагувати значення server context до ваших server components.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Створити пов'язану декларацію вмісту

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
  const content = useIntlayer("client-component-example"); // Створити пов'язану декларацію контенту

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
  const content = useIntlayer("client-component-example"); // Створити пов'язану декларацію контенту

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
  const content = useIntlayer("server-component-example"); // Створити пов'язане оголошення контенту

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
  const content = useIntlayer("server-component-example"); // Створити пов'язане оголошення контенту

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
  const content = useIntlayer("server-component-example"); // Створіть декларацію пов'язаного контенту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Якщо ви хочете використовувати свій вміст в атрибуті типу `string`, наприклад `alt`, `title`, `href`, `aria-label` тощо, ви повинні викликати значення функції, наприклад:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, див. [документацію](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

### (Необов'язково) Крок 7: Налаштування middleware для визначення локалі

Налаштуйте middleware для визначення переважної локалі користувача:

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

> `intlayerMiddleware` використовується для визначення переважної мови користувача та перенаправлення його на відповідний URL, як вказано в [конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md). Крім того, він дозволяє зберігати перевагу мови користувача в cookie.

> Якщо вам потрібно зв'язати кілька middleware разом (наприклад, `intlayerMiddleware` з автентифікацією або кастомними middleware), Intlayer тепер надає хелпер під назвою `multipleMiddlewares`.

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

### (Необов'язково) Крок 8: Інтернаціоналізація ваших метаданих

Якщо ви хочете інтернаціоналізувати свої метадані, такі як заголовок вашої сторінки, ви можете використати функцію `generateMetadata`, яку надає Next.js. Всередині неї ви можете отримати вміст через функцію `getIntlayer`, щоб перекласти свої метадані.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Створити додаток Next",
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

// ... Rest of the code
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
   * ```ts```
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

// ... Rest of the code
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

// ... Rest of the code
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
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

// ... Решта коду
````

> Зверніть увагу, що функція `getIntlayer`, імпортована з `next-intlayer`, повертає ваш контент, обгорнутий в `IntlayerNode`, що дозволяє інтеграцію з візуальним редактором. Натомість функція `getIntlayer`, імпортована з `intlayer`, повертає ваш контент без додаткових властивостей.

Альтернативно, ви можете використовувати функцію `getTranslation` для оголошення ваших метаданих. Проте рекомендується використовувати файли декларацій контенту, щоб автоматизувати переклад ваших метаданих і згодом винести контент.

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

// ... Rest of the code
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

// ... Rest of the code
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

### (Необов'язково) Крок 9: Інтернаціоналізація вашого sitemap.xml та robots.txt

Щоб інтернаціоналізувати `sitemap.xml` та `robots.txt`, ви можете використати функцію `getMultilingualUrls`, надану Intlayer. Ця функція дозволяє генерувати багатомовні URL-адреси для вашого sitemap.

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

### (Необов'язково) Крок 10: Зміна мови вашого контенту

Щоб змінити мову вашого контенту в Next.js, рекомендується використовувати компонент `Link` для перенаправлення користувачів на відповідну локалізовану сторінку. Компонент `Link` дозволяє виконувати prefetch сторінки, що допомагає уникнути повного перезавантаження сторінки.

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
            replace // Забезпечить, що кнопка "назад" у браузері перенаправлятиме на попередню сторінку
          >
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
            replace // Гарантує, що кнопка «назад» в браузері перенаправлятиме на попередню сторінку
          >
            <span>
              {/* Локаль — наприклад, FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі — наприклад, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — наприклад, Francés коли поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською — наприклад, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
            <span>
              {/* Локаль — наприклад: FR */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови в її власній локалі — наприклад: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови в поточній локалі — наприклад: Francés при поточній локалі Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською — наприклад: French */}
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
            replace // Це гарантує, що кнопка "назад" в браузері перенаправить на попередню сторінку
          >
            <span>
              {/* Локаль — напр., FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі — напр., Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі — напр., Francés коли поточна локаль встановлена в Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Назва мови англійською — напр., French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Забезпечить, що кнопка браузера "назад" у браузері перенаправлятиме на попередню сторінку
          >
            <span>
              {/* Локаль - напр. FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі - напр. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі - напр. Francés коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською - напр. French */}
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
            replace // Забезпечить, що кнопка браузера "назад" у браузері перенаправлятиме на попередню сторінку
          >
            <span>
              {/* Локаль - напр. FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі - напр. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова у поточній локалі - напр. Francés коли поточна локаль встановлена як Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською - напр. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Це гарантує, що кнопка браузера "назад" перенаправлятиме на попередню сторінку
          >
            <span>
              {/* Локаль — наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Назва мови у власній локалі — наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Назва мови у поточній локалі — наприклад Francés, коли поточна локаль встановлена на Locales.SPANISH */}
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

> Іншим способом є використання функції `setLocale`, яку надає хук `useLocale`. Ця функція не дозволяє робити prefetch сторінки. Див. документацію по [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md) для детальнішої інформації.

> Ви також можете встановити функцію в опції `onLocaleChange`, щоб викликати користувацьку функцію при зміні локалі.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Rest of the code

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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [атрибут `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [атрибут `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [атрибут `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [атрибут `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Необов'язково) Крок 11: Створення локалізованого компонента `Link`

Щоб гарантувати, що навігація вашого додатку враховує поточну локаль, ви можете створити кастомний компонент `Link`. Цей компонент автоматично додає префікс внутрішнім URL відповідно до поточної мови. Наприклад, коли франкофонний користувач клікає на посилання на сторінку "About", він буде перенаправлений на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та User Experience**: Локалізовані URL допомагають пошуковим системам правильно індексувати мовно-специфічні сторінки та надавати користувачам контент їхньою бажаною мовою.
- **Consistency**: Використовуючи локалізоване посилання в усьому додатку, ви гарантуєте, що навігація залишатиметься в межах поточної локалі, запобігаючи несподіваним перемиканням мови.
- **Підтримуваність**: Централізація логіки локалізації в одному компоненті спрощує керування URL-адресами, роблячи вашу codebase легшою для підтримки та розширення у міру зростання застосунку.

Нижче наведено реалізацію локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Утилітна функція для перевірки, чи є вказаний URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Кастомний компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація відбувається в межах тієї ж локалі.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє і передано дійсний href, отримати локалізований URL.
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
 * Утилітна функція для перевірки, чи є даний URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Кастомний компонент Link, який адаптує атрибут href відповідно до поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl` для додавання префіксу локалі в URL (наприклад, /fr/about).
 * Це забезпечує, що навігація відбувається в межах тієї самої локалі.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє і передано дійсний href, отримати локалізовану URL.
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
 * Утиліта для перевірки, чи є даний URL зовнішнім.
 * Якщо URL починається з http:// або https://, він вважається зовнішнім.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Користувацький компонент Link, який адаптує атрибут href залежно від поточної локалі.
 * Для внутрішніх посилань він використовує `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в контексті тієї ж локалі.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє і надано дійсний href, отримати локалізований URL.
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

- **Визначення зовнішніх посилань**:

  Допоміжна функція `checkIsExternalLink` визначає, чи є URL зовнішнім. Зовнішні посилання залишаються без змін, оскільки їх не потрібно локалізувати.

- **Отримання поточної локалі**:  
  Хук `useLocale` надає поточну локаль (наприклад, `fr` для французької).

- **Локалізація URL**:  
  Для внутрішніх посилань (тобто таких, що не є зовнішніми) використовується `getLocalizedUrl` для автоматичного додавання префіксу з поточною локаллю. Це означає, що якщо ваш користувач використовує французьку, передання `/about` як `href` перетвориться на `/fr/about`.

- **Повернення посилання**:  
  Компонент повертає елемент `<a>` з локалізованим URL, гарантуючи, що навігація відповідає локалі.

Інтегруючи цей компонент `Link` у вашому застосунку, ви підтримуєте узгоджений і орієнтований на мову досвід користувача, а також отримуєте переваги покращеного SEO та зручності використання.

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

> Функція `getLocale` дотримується каскадної стратегії для визначення локалі користувача:
>
> 1. Спочатку перевіряє заголовки запиту на наявність значення локалі, яке могло бути встановлене middleware
> 2. Якщо локаль не знайдена в заголовках, вона шукає локаль у cookies
> 3. Якщо cookie не знайдено, вона намагається визначити мову, переважну для користувача, за налаштуваннями браузера
> 4. Як останній варіант, вона повертається до локалі за замовчуванням, налаштованої в застосунку
>
> Це забезпечує вибір найвідповіднішої локалі на основі наявного контексту.

### (Необов'язково) Крок 13: Оптимізуйте розмір bundle

Під час використання `next-intlayer` словники за замовчуванням включаються в bundle для кожної сторінки. Щоб оптимізувати розмір bundle, Intlayer пропонує необов'язковий плагін для SWC, який за допомогою макросів інтелектуально замінює виклики `useIntlayer`. Це гарантує, що словники будуть включені в bundle лише для сторінок, які їх справді використовують.

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

> Примітка: Ця оптимізація доступна тільки для Next.js 13 і новіших версій.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки SWC-плагіни в Next.js все ще є експериментальними. Це може змінитися в майбутньому.

> Примітка: Якщо ви встановите опцію як `importMode: 'dynamic'` або `importMode: 'live'`, це буде покладатися на Suspense, тож вам доведеться обгорнути виклики `useIntlayer` у межу `Suspense`. Це означає, що ви не зможете використовувати `useIntlayer` безпосередньо на верхньому рівні вашого компоненту Page / Layout.

### Слідкування за змінами словників у Turbopack

При використанні Turbopack як серверу розробки за допомогою команди `next dev --turbopack`, зміни в словниках за замовчуванням не будуть автоматично виявлятися.

Це обмеження виникає тому, що Turbopack не може запускати webpack-плагіни паралельно для відстеження змін у ваших файлах контенту. Щоб обійти це, потрібно використовувати команду `intlayer watch`, яка дозволяє одночасно запускати сервер розробки та спостерігача збірки Intlayer.

```json5 fileName="package.json"
{
  // ... Ваші існуючі конфігурації package.json
  "scripts": {
    // ... Ваші існуючі налаштування скриптів
    "dev": "intlayer watch --with 'next dev --turbopack'",
  },
}
```

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб скористатися перевагами TypeScript і зробити вашу codebase надійнішою.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що ваша конфігурація TypeScript включає автогенеровані типи.

```json5 fileName="tsconfig.json"
{
  // ... Ваші поточні конфігурації TypeScript
  "include": [
    // ... Ваші поточні конфігурації TypeScript
    ".intlayer/**/*.ts", // Включити автогенеровані типи
  ],
}
```

### Налаштування Git

Рекомендується ігнорувати файли, згенеровані Intlayer. Це дозволяє уникнути додавання їх у ваш Git-репозиторій.

Для цього ви можете додати наступні інструкції до файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення для VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **розширення Intlayer для VS Code**.

[Встановити з Marketplace для VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудований перегляд** перекладеного контенту.
- **Швидкі дії** для зручного створення та оновлення перекладів.

Для детальнішої інформації про використання розширення зверніться до [документації розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Далі

Щоб розширити можливості, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент, використовуючи [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).
