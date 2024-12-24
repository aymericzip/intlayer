# Начало работы с интернационализацией (i18n) с помощью Intlayer и Next.js, используя Page Router

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, предназначенная для упрощения поддержки нескольких языков в современных веб-приложениях. Intlayer бесшовно интегрируется с последней версией **Next.js**, включая его традиционный **Page Router**.

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Обеспечить поддержку TypeScript** с автоматически генерируемыми типами, что улучшает автозаполнение и обнаружение ошибок.
- **Воспользоваться расширенными функциями**, такими как динамическое определение и переключение локалей.

> Примечание: Intlayer совместим с Next.js 12, 13, 14 и 15. Если вы используете Next.js App Router, ознакомьтесь с [руководством по App Router](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md). Для Next.js 15 следуйте этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).

---

## Пошаговое руководство по установке Intlayer в приложении Next.js с использованием Page Router

### Шаг 1: Установите зависимости

Установите необходимые пакеты с помощью вашего предпочтительного менеджера пакетов:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Шаг 2: Настройте ваш проект

Создайте файл конфигурации, чтобы определить поддерживаемые языки вашего приложения:

```typescript
// intlayer.config.ts

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

Для полного списка доступных параметров конфигурации обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer с конфигурацией Next.js

Измените вашу конфигурацию Next.js, чтобы включить Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ваша существующая конфигурация Next.js
};

export default withIntlayer(nextConfig);
```

### Шаг 4: Настройка промежуточного ПО для определения локали

Настройте промежуточное ПО для автоматического определения и обработки предпочтительной локали пользователя:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Шаг 5: Определите динамические маршруты локалей

Реализуйте динамическую маршрутизацию, чтобы обслуживать локализованный контент на основе локали пользователя.

1. **Создайте страницы для конкретных локалей:**

   Переименуйте файл вашей главной страницы, чтобы включить динамический сегмент `[locale]`.

   ```bash
   mv src/pages/index.tsx src/pages/[locale]/index.tsx
   ```

2. **Обновите `_app.tsx` для обработки локализации:**

   Измените ваш `_app.tsx`, чтобы включить провайдеры Intlayer.

   ```tsx
   // src/pages/_app.tsx

   import { AppProps } from "next/app";
   import { IntlayerClientProvider } from "next-intlayer";
   import { IntlayerServerProvider } from "next-intlayer/server";
   import intlayerConfig from "../../intlayer.config";

   function MyApp({ Component, pageProps }: AppProps) {
     const { locale } = pageProps;

     return (
       <IntlayerClientProvider locale={locale}>
         <Component {...pageProps} />
       </IntlayerClientProvider>
     );
   }

   export default MyApp;
   ```

3. **Настройте `getStaticPaths` и `getStaticProps`:**

   В вашем `[locale]/index.tsx` определите пути и параметры для обработки различных локалей.

   ```tsx
   // src/pages/[locale]/index.tsx

   import { GetStaticPaths, GetStaticProps } from "next";
   import { useIntlayer } from "next-intlayer";
   import { Locales } from "intlayer";

   const HomePage = () => {
     return <div>{/* Ваш контент здесь */}</div>;
   };

   export const getStaticPaths: GetStaticPaths = async () => {
     const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH]; // Добавьте ваши локали здесь

     const paths = locales.map((locale) => ({
       params: { locale },
     }));

     return { paths, fallback: false };
   };

   export const getStaticProps: GetStaticProps = async ({ params }) => {
     const locale = params?.locale as string;

     return {
       props: {
         locale,
       },
     };
   };

   export default HomePage;
   ```

### Шаг 6: Объявите ваш контент

Создайте и управляйте вашими словарями контента для хранения переводов.

```tsx
// src/pages/[locale]/home.content.ts
import { t, type DeclarationContent } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies DeclarationContent;

export default homeContent;
```

Для получения дополнительной информации о том, как объявить контент, обратитесь к [руководству по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

### Шаг 7: Используйте контент в вашем коде

Доступ к вашим словарям контента в вашем приложении для отображения переведенного контента.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { useIntlayer } from "next-intlayer";
import { Locales } from "intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
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

```tsx
// src/components/ComponentExample.tsx

import { useIntlayer } from "next-intlayer";

export const ComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Убедитесь, что у вас есть соответствующее объявление контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> **Примечание:** При использовании переводов в атрибутах `string` (например, `alt`, `title`, `href`, `aria-label`) вызывайте значение функции следующим образом:

```tsx
<img src={content.image.src.value} alt={content.image.value} />
```

### (Опционально) Шаг 8: Интернационализировать ваши метаданные

Чтобы интернационализировать метаданные, такие как названия страниц и описания, используйте функцию `getStaticProps` в сочетании с функцией `getTranslationContent` от Intlayer.

```tsx
// src/pages/[locale]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import { type IConfigLocales, getTranslationContent, Locales } from "intlayer";
import { useIntlayer } from "next-intlayer";

interface HomePageProps {
  locale: string;
  metadata: Metadata;
}

const HomePage = ({ metadata }: HomePageProps) => {
  // Метаданные могут использоваться в head или других компонентах по мере необходимости
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
      en: "My Website",
      fr: "Mon Site Web",
      es: "Mi Sitio Web",
    }),
    description: t({
      en: "Welcome to my website.",
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

### (Опционально) Шаг 9: Изменить язык вашего контента

Чтобы позволить пользователям динамически переключать языки, используйте функцию `setLocale`, предоставляемую хуком `useLocale`.

```tsx
// src/components/LanguageSwitcher.tsx

import { Locales } from "intlayer";
import { useLocalePageRouter } from "next-intlayer";

const LanguageSwitcher = () => {
  const { setLocale } = useLocalePageRouter();

  return (
    <div>
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
      {/* Добавьте больше кнопок для дополнительных локалей */}
    </div>
  );
};

export default LanguageSwitcher;
```

### Настройка TypeScript

Intlayer использует расширение модуля для повышения возможностей TypeScript, обеспечивая лучшую безопасность типов и автозаполнение.

1. **Убедитесь, что TypeScript включает автоматически генерируемые типы:**

   Обновите ваш `tsconfig.json`, чтобы включить автоматически генерируемые типы.

   ```json
   // tsconfig.json

   {
     "compilerOptions": {
       // Ваша существующая конфигурация TypeScript
     },
     "include": [
       "src",
       "types" // Включите авто-сгенерированные типы
     ]
   }
   ```

2. **Пример преимуществ TypeScript:**

   ![Пример автозаполнения](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

   ![Пример ошибки перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

### Конфигурация Git

Чтобы сохранить ваш репозиторий в чистоте и избежать коммита генерируемых файлов, рекомендуется игнорировать файлы, созданные Intlayer.

1. **Обновите `.gitignore`:**

   Добавьте следующие строки в ваш файл `.gitignore`:

   ```plaintext
   # Игнорировать файлы, сгенерированные Intlayer
   .intlayer
   ```

## Дополнительные ресурсы

- **Документация Intlayer:** [GitHub Repository](https://github.com/aymericzip/intlayer)
- **Руководство по объявлению контента:** [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md)
- **Документация по конфигурации:** [Конфигурационное руководство](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md)

Следуя этому руководству, вы сможете эффективно интегрировать Intlayer в ваше приложение Next.js с использованием Page Router, обеспечивая надежную и масштабируемую поддержку интернационализации для ваших веб-проектов.
