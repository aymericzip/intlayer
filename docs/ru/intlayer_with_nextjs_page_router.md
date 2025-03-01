# Начало работы с интернационализацией (i18n) с Intlayer и Next.js, используя Page Router

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), разработанная для упрощения поддержки нескольких языков в современных веб-приложениях. Intlayer бесшовно интегрируется с последней версией фреймворка **Next.js**, включая его традиционный **Page Router**.

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшая автозаполнение и обнаружение ошибок.
- **Получить преимущества передовых функций**, таких как динамическое определение и переключение локали.

> Intlayer совместим с Next.js 12, 13, 14 и 15. Если вы используете Next.js App Router, обратитесь к [руководству по App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md). Для Next.js 15 следуйте этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

---

## Пошаговое руководство по настройке Intlayer в приложении Next.js с использованием Page Router

### Шаг 1: Установите зависимости

Установите необходимые пакеты, используя предпочитаемый менеджер пакетов:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [декларацией контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).

- **next-intlayer**

  Пакет, интегрирующий Intlayer с Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации в Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также middleware для определения предпочтительной локали пользователя, управления cookies и обработки перенаправлений URL.

### Шаг 2: Настройте ваш проект

Создайте файл конфигурации для определения языков, поддерживаемых вашим приложением:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Добавьте другие локали здесь
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
      // Добавьте другие локали здесь
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
      // Добавьте другие локали здесь
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Через этот файл конфигурации вы можете настроить локализованные URL, перенаправления middleware, имена cookies, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer с конфигурацией Next.js

Измените конфигурацию Next.js для включения Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ваша существующая конфигурация Next.js
};

export default withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает построение файлов декларации контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

### Шаг 4: Настройте Middleware для определения локали

Настройте middleware для автоматического определения и обработки предпочтительной локали пользователя:

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

> Адаптируйте параметр `matcher` для соответствия маршрутам вашего приложения. Для получения дополнительной информации обратитесь к [документации Next.js по настройке matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Шаг 5: Определите динамические маршруты локали

Реализуйте динамическую маршрутизацию для предоставления локализованного контента на основе локали пользователя.

1.  **Создайте страницы для конкретной локали:**

    Переименуйте файл вашей главной страницы, чтобы включить динамический сегмент `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Обновите `_app.tsx` для обработки локализации:**

    Измените ваш `_app.tsx`, чтобы включить провайдеры Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
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

3.  **Настройте `getStaticPaths` и `getStaticProps`:**

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

> `getStaticPaths` и `getStaticProps` обеспечивают предварительную сборку необходимых страниц для всех локалей в Next.js Page Router. Этот подход снижает вычисления во время выполнения и улучшает пользовательский опыт. Для получения дополнительной информации обратитесь к документации Next.js по [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) и [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

...
