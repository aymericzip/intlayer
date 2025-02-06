# Начало международной настройки (i18n) с Intlayer и Next.js с использованием маршрутизатора страницы

## Что такое Intlayer?

**Intlayer** — это инновационная, обладающая открытым исходным кодом библиотека интернационализации (i18n), разработанная для упрощения многоязычной поддержки в современных веб-приложениях. Intlayer плавно интегрируется с последним фреймворком **Next.js**, включая его традиционный **маршрутизатор страниц**.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Пользоваться продвинутыми функциями**, такими как динамическое определение и переключение локали.

> Intlayer совместим с Next.js 12, 13, 14 и 15. Если вы используете маршрутизатор приложения Next.js, обратитесь к [руководству по маршрутизатору приложений](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md). Для Next.js 15 следуйте этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

---

## Пошаговое руководство по настройке Intlayer в приложении Next.js с использованием маршрутизатора страниц

### Шаг 1: Установите зависимости

Установите необходимые пакеты с использованием вашего предпочтительного менеджера пакетов:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

  Основной пакет, который предоставляет инструменты интернационализации для управления конфигурацией, переводом, [декларацией контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **next-intlayer**

  Пакет, который интегрирует Intlayer с Next.js. Он предоставляет контекстные провайдеры и хуки для интернационализации Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также промежуточное ПО для определения предпочтительной локали пользователя, управления куками и обработки перенаправления URL.

### Шаг 2: Настройте ваш проект

Создайте файл конфигурации, чтобы определить языки, поддерживаемые вашим приложением:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Добавьте ваши другие локали здесь
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
      // Добавьте ваши другие локали здесь
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
      // Добавьте ваши другие локали здесь
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление промежуточного ПО, имена кук, место и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров смотрите [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интегрируйте Intlayer с конфигурацией Next.js

Измените конфигурацию Next.js для интеграции Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ваша существующая конфигурация Next.js
};

export default withIntlayer(nextConfig);
```

> Плагин `withIntlayer()` Next.js используется для интеграции Intlayer с Next.js. Он обеспечивает создание файлов декларации контента и отслеживание их в режиме разработки. Он определяет переменные среды Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет псевдонимы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

### Шаг 4: Настройте промежуточное ПО для определения локали

Настройте промежуточное ПО для автоматического определения и обработки предпочтительной локали пользователя:

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

> Подстройте параметр `matcher`, чтобы соответствовать маршрутам вашего приложения. Для более подробной информации смотрите [документацию Next.js по конфигурации матчера](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Шаг 5: Определите динамические маршруты локалей

Реализуйте динамическую маршрутизацию для подачи локализованного контента в зависимости от локали пользователя.

1. **Создайте страницы, специфичные для локали:**

   Переименуйте файл главной страницы, чтобы включить динамический сегмент `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Обновите `_app.tsx`, чтобы обработать локализацию:**

   Измените ваш `_app.tsx`, чтобы включить провайдеры Intlayer.

   ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
   import type { FC } from "react";
   import type { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";

   const App: FC<AppProps> = ({ Component, pageProps }) => {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   };

   export default App;
   ```

   ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
   import { IntlayerClientProvider } from "next-intlayer";

   const App = ({ Component, pageProps }) => (
     <IntlayerClientProvider locale={locale}>
       <Component {...pageProps} />
     </IntlayerClientProvider>
   );

   export default App;
   ```

   ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
   const { IntlayerClientProvider } = require("next-intlayer");

   const App = ({ Component, pageProps }) => (
     <IntlayerClientProvider locale={locale}>
       <Component {...pageProps} />
     </IntlayerClientProvider>
   );

   module.exports = App;
   ```

3. **Настройте `getStaticPaths` и `getStaticProps`:**

   В вашем `[locale]/index.tsx` определите пути и свойства для обработки различных локалей.

   ```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
   import type { FC } from "react";
   import type { GetStaticPaths, GetStaticProps } from "next";
   import { type Locales, getConfiguration } from "intlayer";

   const HomePage: FC = () => <div>{/* Ваш контент здесь */}</div>;

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

   const HomePage = () => <div>{/* Ваш контент здесь */}</div>;

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

   const HomePage = () => <div>{/* Ваш контент здесь */}</div>;

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

> `getStaticPaths` и `getStaticProps` гарантируют, что ваше приложение предварительно построит необходимые страницы для всех локалей в маршрутизаторе страниц Next.js. Этот подход снижает вычисления во время выполнения и приводит к улучшенному пользовательскому опыту. Для получения более подробной информации смотрите документацию Next.js по [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) и [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Шаг 6: Объявите ваш контент

Создайте и управляйте вашими декларациями контента, чтобы хранить переводы.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Добро пожаловать на мой сайт",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Начните с редактирования этой страницы.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Начните с редактирования этой страницы.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Начните с редактирования этой страницы.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Начните с редактирования этой страницы.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

Для получения дополнительной информации о декларации контента смотрите [руководство по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

### Шаг 7: Используйте контент в вашем коде

Получите доступ к своим словарям контента по всему вашему приложению, чтобы отображать переведенный контент.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
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
      {/* Дополнительные компоненты */}
    </div>
  );
};

// ... Остальная часть кода, включая getStaticPaths и getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Дополнительные компоненты */}
    </div>
  );
};

// ... Остальная часть кода, включая getStaticPaths и getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Дополнительные компоненты */}
    </div>
  );
};

// ... Остальная часть кода, включая getStaticPaths и getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Убедитесь, что у вас есть соответствующая декларация контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Убедитесь, что у вас есть соответствующая декларация контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Убедитесь, что у вас есть соответствующая декларация контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> При использовании переводов в атрибутах `string` (например, `alt`, `title`, `href`, `aria-label`) вызывайте
> значение функции следующим образом:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, смотрите [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useIntlayer.md).

### (Опционально) Шаг 8: Интернационализация ваших метаданных

Чтобы интернационализировать метаданные, такие как заголовки страниц и описания, используйте функцию `getStaticProps` в сочетании с функцией `getTranslationContent` от Intlayer.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Метаданные могут быть использованы в заголовке или других компонентах по мере необходимости
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Дополнительный контент */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = <T,>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Мой сайт",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Добро пожаловать на мой сайт.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Остальная часть кода, включая getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

const HomePage = ({ metadata }) => {
  // Метаданные могут быть использованы в заголовке или других компонентах по мере необходимости
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Дополнительный контент */}
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale as string;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Мой сайт",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Добро пожаловать на мой сайт.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

export default HomePage;

// ... Остальная часть кода, включая getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { GetStaticPaths, GetStaticProps } = require("next");
const { type IConfigLocales, getTranslationContent, Locales } = require("intlayer");
const { useIntlayer } = require("next-intlayer");

const HomePage = ({ metadata }) => {
  // Метаданные могут быть использованы в заголовке или других компонентах по мере необходимости
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      {/* Дополнительный контент */}
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const t = (content) =>
    getTranslationContent(content, locale);

  const metadata = {
    title: t({
      en: "Мой сайт",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Добро пожаловать на мой сайт.",
      fr: "Bienvenue sur mon site Web.",
      es: "Bienvenido a mi sitio web.",
    }),
  };

  return {
    props: {
      locale,
      metadata,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Остальная часть кода, включая getStaticPaths
```

### (Опционально) Шаг 9: Измените язык вашего контента

Чтобы позволить пользователям динамически переключать языки, используйте функцию `setLocale`, предоставляемую хуком `useLocale`.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на своем локале - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем локале - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на своем локале - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на своем локале - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем локале - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на своем локале - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocalePageRouter();

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Язык на своем локале - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем локале - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Язык на своем локале - например, FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> API `useLocalePageRouter` аналогичен `useLocale`. Чтобы узнать больше о хуке `useLocale`, смотрите [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/next-intlayer/useLocale.md).

> Ссылки на документацию:
>
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

2. **Пример преимуществ TypeScript:**

   ![Пример автозаполнения](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Пример ошибки перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Настройка Git

Чтобы поддерживать ваш репозиторий в чистоте и избежать коммита сгенерированных файлов, рекомендуется игнорировать файлы, созданные Intlayer.

Добавьте следующие строки в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

## Дополнительные ресурсы

- **Документация Intlayer:** [GitHub Репозиторий](https://github.com/aymericzip/intlayer)
- **Руководство по декларации контента:** [Декларация контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md)
- **Документация по конфигурации:** [Руководство по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md)

Следуя этому руководству, вы можете эффективно интегрировать Intlayer в ваше приложение Next.js, используя маршрутизатор страниц, позволяя надежную и масштабируемую поддержку интернационализации для ваших веб-проектов.
