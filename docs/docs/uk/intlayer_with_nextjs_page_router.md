---
createdAt: 2024-12-07
updatedAt: 2026-06-23
title: "Next.js Page Router i18n - Повний посібник з перекладу вашого застосунку"
description: "Більше ніякого i18next. Посібник 2026 зі створення багатомовного (i18n) застосунку Next.js Page Router. Перекладайте за допомогою ШІ-агентів та оптимізуйте розмір бандлу, SEO та продуктивність."
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Оновлення використання API useIntlayer у Solid для прямого доступу до властивостей"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано команду init"
  - version: 5.6.0
    date: 2025-07-06
    changes: "Перетворено функцію `withIntlayer()` на функцію на основі промісів"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Перекладіть свій вебсайт на Next.js із Page Router за допомогою Intlayer | Інтернаціоналізація (i18n)

<Tabs defaultTab="code">
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Зміст

<TOC/>

## Чому варто обрати Intlayer, а не альтернативи?

Порівняно з основними рішеннями, такими як `next-intl` або `i18next`, Intlayer — це рішення, яке має такі інтегровані оптимізації, як:

<AccordionGroup>

<Accordion header="Повна підтримка Next.js">

Intlayer оптимізовано для роботи з **компонентами сервера** для ефективного відтворення та повністю сумісно з [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Він не блокує статичний рендеринг і пропонує проміжне програмне забезпечення, а також усі функції, необхідні для інтернаціоналізації масштабування (i18n).

> Intlayer сумісний із Next.js 12, 13, 14, 15 і 16. Якщо ви використовуєте маршрутизатор сторінок Next.js, ви можете переглянути цей [посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Локальна маршрутизація корисна для SEO, розміру пакета та продуктивності. Якщо він вам не потрібен, ви можете звернутися до цього [посібника](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Щодо Next.js 12, 13, 14 і 15 із маршрутизатором програм див. цей [посібник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Розмір бандлу">

Замість того, щоб завантажувати великі файли JSON на свої сторінки, завантажуйте лише необхідний вміст. Intlayer допомагає **зменшити розмір бандлу і сторінок до 50%**.

</Accordion>

<Accordion header="Підтримуваність">

Організація вмісту за окремими областями (scoping) **полегшує технічне обслуговування** великомасштабних програм. Ви можете скопіювати або видалити окрему папку функцій без розумового навантаження перегляду всієї кодової бази вмісту. Крім того, Intlayer **повністю типізований (fully typed)**, щоб забезпечити точність вашого вмісту.

</Accordion>

<Accordion header="Агент AI">

Спільне розміщення вмісту **зменшує контекст, необхідний** для великих мовних моделей (LLM). Intlayer також постачається з набором інструментів, наприклад **CLI** для перевірки відсутніх перекладів,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** і **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити роботу розробника (DX) ще зручнішою для агентів ШІ.

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

## Покроковий посібник щодо налаштування Intlayer у застосунку Next.js із Page Router

<Steps>

<Step number={1} title="Встановіть залежності">

Встановіть необхідні пакунки, використовуючи обраний менеджер пакетів:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> прапорець `--interactive` не є обов'язковим. Використовуйте `intlayer-cli init`, якщо ви є ШІ-агентом.

> Ця команда виявить ваше середовище та встановить необхідні пакети. Наприклад:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Основний пакет, який надає інструменти інтернаціоналізації для керування конфігурацією, перекладу, [оголошення вмісту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md), транспіляції та [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

- **next-intlayer**

Пакет, що інтегрує Intlayer з Next.js. Забезпечує провайдери контексту та хуки для інтернаціоналізації у Next.js. Додатково містить плагін для Next.js для інтеграції Intlayer з [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а також middleware для визначення переважної локалі користувача, керування cookie та обробки перенаправлення URL.

</Step>

<Step number={2} title="Налаштуйте свій проєкт">

Створіть файл конфігурації, щоб визначити мови, які підтримує ваш застосунок:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Локалі, які підтримуються вашим додатком.
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Додайте тут інші локалі
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Через цей конфігураційний файл ви можете налаштувати локалізовані URL-адреси, перенаправлення в middleware, імена cookie, розташування та розширення файлів декларацій вмісту, вимкнути логи Intlayer у консолі тощо. Для повного переліку доступних параметрів зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Step>

<Step number={3} title="Інтеграція Intlayer з конфігурацією Next.js">

Змініть конфігурацію Next.js, щоб інтегрувати Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ваша існуюча конфігурація Next.js
};

export default withIntlayer(nextConfig);
```

> Плагін Next.js `withIntlayer()` використовується для інтеграції Intlayer з Next.js. Він забезпечує побудову файлів декларацій контенту та відстежує їх у режимі розробки. Він визначає змінні середовища Intlayer у середовищах [Webpack](https://webpack.js.org/) або [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Крім того, він надає алиаси для оптимізації продуктивності й забезпечує сумісність із серверними компонентами.

> Функція `withIntlayer()` повертає проміс. Якщо ви хочете використовувати її разом з іншими плагінами, ви можете дочекатися її виконання за допомогою await. Приклад:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>

<Step number={4} title="Налаштуйте middleware для визначення локалі">

Налаштуйте middleware для автоматичного визначення та обробки бажаної користувачем локалі:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Налаштуйте параметр `matcher`, щоб відповідати маршрутам вашого застосунку. Для детальнішої інформації див. [документацію Next.js щодо конфігурації matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

</Step>

<Step number={5} title="Визначте динамічні маршрути локалей">

Реалізуйте динамічну маршрутизацію для подачі локалізованого контенту залежно від локалі користувача.

1.  **Створіть сторінки для конкретної локалі:**

    Перейменуйте головний файл сторінки, щоб додати динамічний сегмент `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Оновіть `_app.tsx`, щоб обробляти локалізацію:**

    Змініть свій `_app.tsx`, щоб включити провайдери Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat=["typescript", 'esm', 'cjs']
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerProvider>
      );
    }

    export default MyApp;
    ```

3.  **Налаштуйте `getStaticPaths` та `getStaticProps`:**

    У файлі `[locale]/index.tsx` визначте paths і props для обробки різних локалей.

    ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { GetStaticPaths, GetStaticProps } from "next";
    import { type Locales, getConfiguration } from "intlayer";

    const HomePage: FC = () => <div>{/* Ваш контент тут */}</div>;

    export const getStaticPaths: GetStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps: GetStaticProps = ({ params }) => {
      const locale = params?.locale as string;

      return {
        props: {
          locale,
        },
      };
    };

    export default HomePage;
    ```

    ```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
    import { getConfiguration } from "intlayer";
    import { ComponentExample } from "@components/ComponentExample";

    const HomePage = () => <div>{/* Ваш контент тут */}</div>;

    export const getStaticPaths = () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    export const getStaticProps = ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };
    ```

    ```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
    const { getConfiguration } = require("intlayer");
    const { ComponentExample } = require("@components/ComponentExample");

    const HomePage = () => <div>{/* Ваш контент тут */}</div>;

    const getStaticPaths = async () => {
      const { internationalization } = getConfiguration();
      const { locales } = internationalization;

      const paths = locales.map((locale) => ({
        params: { locale },
      }));

      return { paths, fallback: false };
    };

    const getStaticProps = async ({ params }) => {
      const locale = params?.locale;

      return {
        props: {
          locale,
        },
      };
    };

    module.exports = {
      getStaticProps,
      getStaticPaths,
      default: HomePage,
    };
    ```

> `getStaticPaths` та `getStaticProps` гарантують, що ваш застосунок попередньо збудує необхідні сторінки для всіх локалей у Next.js Page Router. Такий підхід зменшує обчислення під час виконання і покращує взаємодію з користувачем. Для детальнішої інформації зверніться до документації Next.js щодо [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) та [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

</Step>

<Step number={6} title="Оголосіть свій контент">

Створіть та керуйте деклараціями контенту для зберігання перекладів.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      uk: "Ласкаво просимо на мій вебсайт",
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      uk: "Почніть, редагуючи цю сторінку.",
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "uk": "Почніть з редагування цієї сторінки.",
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
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

Для отримання додаткової інформації про оголошення контенту зверніться до [керівництва з оголошення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

</Step>

<Step number={7} title="Використання контенту у вашому коді">

Отримуйте доступ до словників контенту у всьому застосунку, щоб відображати перекладений вміст.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Додаткові компоненти */}
    </div>
  );
};

// ... Решта коду, включаючи getStaticPaths та getStaticProps

export default HomePage;
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Переконайтесь, що у вас є відповідна декларація вмісту

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Коли ви використовуєте переклади в рядкових атрибутах (наприклад, `alt`, `title`, `href`, `aria-label`), викликайте

> значення функції таким чином:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Щоб дізнатися більше про хук `useIntlayer`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Інтернаціоналізація ваших метаданих" isOptional={true}>

Якщо ви хочете інтернаціоналізувати метадані, наприклад заголовок вашої сторінки, ви можете використовувати функцію `getStaticProps`, яку надає Next.js Page Router. Всередині ви можете отримати контент за допомогою функції `getIntlayer`, щоб перекласти ваші метадані.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      uk: "Створити додаток Next.js",
      en: "Create Next App",
      uk: "Створити додаток Next.js",
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

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
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

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
`
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Генерує теги hreflang для SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Вміст сторінки */}
      <main>{/* Ваш вміст сторінки тут */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

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

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Решта коду, включаючи getStaticPaths
````

> Зверніть увагу, що функція `getIntlayer`, імпортована з `next-intlayer`, повертає ваш контент, обгорнутий у `IntlayerNode`, що дозволяє інтеграцію з візуальним редактором. Натомість функція `getIntlayer`, імпортована з `intlayer`, повертає контент напряму без додаткових властивостей.

> Дізнайтеся більше про оптимізацію метаданих [в офіційній документації Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Змініть мову вашого вмісту" isOptional={true}>

Щоб змінити мову вашого вмісту в Next.js, рекомендовано використовувати компонент `Link` для перенаправлення користувачів на відповідну локалізовану сторінку. Компонент `Link` дає змогу передзавантажувати (prefetch) сторінку, що допомагає уникнути повного перезавантаження сторінки.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat={["typescript", "esm"]}
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

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
          >
            <span>
              {/* Локаль, наприклад FR */}
              {localeItem}
            </span>
            <span>
              {/* Мова у власній локалі, наприклад Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Мова в поточній локалі, наприклад Francés, коли поточна локаль встановлена на Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Мова англійською, наприклад French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативний спосіб, використати функцію `setLocale`, яку надає хук `useLocale`. Ця функція не дозволяє попереднє завантаження (prefetch) сторінки і призведе до перезавантаження сторінки.

> У такому випадку, без перенаправлення через `router.push`, змінить локаль вмісту лише ваш серверний код.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Решта коду

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Change to French</button>
);
```

> API `useLocalePageRouter` такий же, як `useLocale`. Щоб дізнатися більше про хук `useLocale`, зверніться до [документації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md).

> Посилання на документацію:
>
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={10} title="Створення локалізованого компонента Link" isOptional={true}>

Щоб гарантувати, що навігація вашого застосунку враховує поточну локаль, ви можете створити кастомний компонент `Link`. Цей компонент автоматично додає префікс поточної мови до внутрішніх URL-адрес, так щоб, наприклад, коли франкомовний користувач натискає на посилання на сторінку "About", він буде перенаправлений на `/fr/about` замість `/about`.

Ця поведінка корисна з кількох причин:

- **SEO та досвід користувача**: локалізовані URL-адреси допомагають пошуковим системам правильно індексувати сторінки для конкретних мов і надають користувачам контент їхньою переважною мовою.
- **Послідовність**: Використовуючи локалізоване посилання в усьому вашому застосунку, ви гарантуєте, що навігація залишатиметься в межах поточної локалі, запобігаючи несподіваним змінам мови.
- **Підтримуваність**: Централізація логіки локалізації в одному компоненті спрощує управління URL-адресами, роблячи вашу codebase простішою для підтримки та розширення у міру зростання застосунку.

Нижче наведено реалізацію локалізованого компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
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
 * Для внутрішніх посилань використовується `getLocalizedUrl`, щоб додати префікс локалі до URL (наприклад, /fr/about).
 * Це гарантує, що навігація залишатиметься в межах одного мовного контексту.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Якщо посилання внутрішнє й надано дійсний href, отримати локалізований URL.
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

#### Як це працює

- **Виявлення зовнішніх посилань**:  
  Допоміжна функція `checkIsExternalLink` визначає, чи є URL зовнішнім. Зовнішні посилання залишаються без змін, оскільки їх не потрібно локалізувати.

- **Отримання поточної локалі**:  
  Хук `useLocale` повертає поточну локаль (наприклад, `fr` для французької).

- **Локалізація URL**:  
  Для внутрішніх посилань (тобто не зовнішніх) використовується `getLocalizedUrl`, яка автоматично додає префікс поточної локалі до URL. Це означає, що якщо ваш користувач перебуває у французькій локалі, передавання `/about` як `href` перетвориться на `/fr/about`.

- **Повернення посилання**:  
  Компонент повертає елемент `<a>` з локалізованим URL, що забезпечує узгоджену навігацію відповідно до локалі.

Інтегруючи цей компонент `Link` у ваш додаток, ви підтримуєте послідовний і орієнтований на мову досвід користувача, а також отримуєте переваги у вигляді покращеного SEO та зручності використання.

</Step>

<Step number={11} title="Оптимізуйте розмір bundle" isOptional={true}>

Коли використовується `next-intlayer`, словники за замовчуванням включаються в бандл для кожної сторінки. Щоб оптимізувати розмір бандла, Intlayer надає опційний SWC-плагін, який розумно замінює виклики `useIntlayer` за допомогою макросів. Це гарантує, що словники включаються в бандли лише для сторінок, які дійсно їх використовують.

Щоб увімкнути цю оптимізацію, встановіть пакет `@intlayer/swc`. Після встановлення `next-intlayer` автоматично виявить і використовуватиме плагін:

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

> Примітка: Ця оптимізація доступна лише для Next.js 13 та новіших версій.

> Примітка: Цей пакет не встановлюється за замовчуванням, оскільки SWC-плагіни все ще є експериментальними в Next.js. Це може змінитися в майбутньому.
> </Step>

</Steps>

### Налаштування TypeScript

Intlayer використовує module augmentation, щоб отримати переваги TypeScript і зробити вашу codebase більш надійною.

![Автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Помилка перекладу](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Переконайтеся, що у вашій конфігурації TypeScript включені автогенеровані типи.

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

Щоб зберегти репозиторій чистим і уникнути коміту згенерованих файлів, рекомендується ігнорувати файли, створені Intlayer.

Додайте наступні рядки до вашого файлу `.gitignore`:

```plaintext fileName=".gitignore"
# Ігнорувати файли, згенеровані Intlayer
.intlayer
```

### Розширення для VS Code

Щоб покращити ваш досвід розробки з Intlayer, ви можете встановити офіційне **Intlayer VS Code Extension**.

[Встановити з VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Це розширення надає:

- **Автодоповнення** для ключів перекладу.
- **Виявлення помилок у реальному часі** для відсутніх перекладів.
- **Вбудовані попередні перегляди** перекладеного вмісту.
- **Швидкі дії** для легкого створення та оновлення перекладів.

Для детальнішої інформації про використання розширення див. [Документація розширення Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

## Додаткові ресурси

- **Документація Intlayer:** [Репозиторій GitHub](https://github.com/aymericzip/intlayer)
- **Посібник словника:** [Словник](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)
- **Документація з конфігурації:** [Керівництво з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)

Дотримуючись цього посібника, ви можете ефективно інтегрувати Intlayer у ваш Next.js застосунок, що використовує Page Router, забезпечивши надійну та масштабовану підтримку інтернаціоналізації для ваших веб‑проєктів.

### Далі

Щоб піти далі, ви можете реалізувати [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) або винести свій контент за допомогою [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

## Часто задавані запитання

<FAQ>

<Question title="Які є різні рішення для інтернаціоналізації додатків Next.js Pages Router?">

- **`next-intl`**: популярна бібліотека для App Router, завантажує JSON файли під час виконання.
- **`next-i18next`**: класичне рішення для Pages Router.
- **`Intlayer`**: найбільш передове рішення. Вміст оголошується поруч із компонентом, компілюється під час збирання, має сувору типізацію TypeScript, переклад за допомогою AI, візуальний редактор та CMS.

Оголошення на рівні компонентів гарантує, що сторінка завантажує лише потрібні рядки замість усього каталогу. Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Скільки i18n додає до розміру бандла Next.js?">

Значно менше, ніж рішення на основі просторів імен (namespaces), оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Серверні компоненти обробляють контент на сервері, а компілятор під час збирання замінює виклики `useIntlayer` точними записами словника. [Динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за локалями, зменшуючи розмір бандла до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з next-intl, next-i18next або i18next без переписування моїх компонентів?">

Так, є два шляхи. Ви можете переносити вміст поступово за допомогою [посібника з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md) або [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md). Або зберегти поточний API: [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надають абсолютно той самий API для `next-intl` та `i18next`, але працюють на словниках Intlayer.

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування всіх перекладів в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші вихідні файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повної автоматизації [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання для коду JSX, TSX, Vue та Svelte, генеруючи словники під час кожної зміни без необхідності підтримувати ключі вручну. Оскільки він працює на основі статичного аналізу, динамічні рядки середовища виконання залишаються поза його межами.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Чи працює вбудована опція i18n у Pages Router із Intlayer?">

Так. Вбудована конфігурація `i18n` у Next.js Pages Router повністю сумісна з Intlayer: Next.js відповідає за маршрутизацію, а Intlayer керує контентом.

</Question>

<Question title="Чи залишатися на Pages Router, чи мігрувати на App Router?">

Існуючі проекти на Pages Router працюють надійно. Для нових проектів або використання переваг React Server Components рекомендується App Router.

</Question>

<Question title="Чи обов'язково додавати локаль до URL, наприклад /uk/about?">

Ні. Налаштування `routing.mode` приймає `"prefix-no-default"` (за замовчуванням: `/about` для основної мови та `/uk/about` для інших), `"prefix-all"`, `"no-prefix"` та `"search-params"`. Налаштування `routing.domains` прив'язує кожну мову до власного домену. Див. [довідник конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Question>

<Question title="Як додати теги hreflang та локалізовані метадані для SEO?">

Кроки `generateMetadata` та `sitemap.xml` описують це. Функція `getMultilingualUrls` створює відображення `alternates.languages` для кожної оголошеної локалі, включно з `x-default`, щоб пошукові системи правильно індексували сторінки.

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта CLI знаходить відсутні переклади та заповнює їх за допомогою обраної LLM, використовуючи вашого власного провайдера та ключ API. Прапорець `--git-diff` обмежує операцію вмістом, зміненим у поточній гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Чи підтримує Intlayer форми множини, стать та форматований текст (rich text)?">

Так: [форми множини](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/plurial.md), [контент з урахуванням статі](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/gender.md), умови, [вставки (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md) та [форматування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) для чисел, дат і валют.

</Question>

<Question title="Як перекладачі можуть редагувати вміст без втручання в код?">

Через [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), який дозволяє будь-кому редагувати тексти безпосередньо у працюючому додатку, або через [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), яка відокремлює вміст і дозволяє оновлювати його без повторного розгортання коду.

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так, під ліцензією Apache 2.0, включно з комерційним використанням. Хмарна CMS - це додаткова платна послуга, яку також можна [розгорнути самостійно (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
