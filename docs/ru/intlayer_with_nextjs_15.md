# Начало работы с интернационализацией (i18n) с помощью Intlayer и Next.js 15 App Router

## Что такое Intlayer?

**Intlayer** — это инновационная библиотека интернационализации (i18n) с открытым исходным кодом, разработанная для упрощения многоязычной поддержки в современных веб-приложениях. Intlayer бесшовно интегрируется с последней версией **Next.js 15**, включая его мощный **App Router**. Он оптимизирован для работы с **Server Components** для эффективного рендеринга и полностью совместим с [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

С помощью Intlayer вы можете:

- **Легко управлять переводами**, используя декларативные словари на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и содержимое.
- **Получать доступ к переводам как в клиентских, так и в серверных компонентах**.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, улучшая автозавершение и обнаружение ошибок.
- **Воспользоваться расширенными функциями**, такими как динамическое обнаружение и переключение локалей.

> Примечание: Intlayer совместим с Next.js 12, 13, 14 и 15. Если вы используете Next.js Page Router, вы можете обратиться к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_page_router.md). Для Next.js 12, 13, 14 с App Router, обратитесь к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md).

---

## Пошаговое руководство по настройке Intlayer в приложении Next.js

### Шаг 1: Установите зависимости

Установите необходимые пакеты с помощью npm:

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

Создайте конфигурационный файл для настройки языков вашего приложения:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Чтобы увидеть все доступные параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).

### Шаг 3: Интегрируйте Intlayer в вашу конфигурацию Next.js

Настройте вашу конфигурацию Next.js для использования Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Шаг 4: Настройте промежуточное программное обеспечение для обнаружения локали

Настройте промежуточное программное обеспечение для определения предпочтительной локали пользователя:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Шаг 5: Определите динамические маршруты локали

Реализуйте динамический маршрутизацию для локализованного содержимого:

Измените `src/app/page.ts` на `src/app/[locale]/page.ts`

Затем реализуйте функцию generateStaticParams в вашем приложении Layout.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Строка для вставки

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Затем добавьте новую компоновку в ваш каталог `[locale]`:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
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

### Шаг 6: Объявите ваше содержимое

Создайте и управляйте вашими словарями содержимого:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[Посмотрите, как объявить ваши файлы декларации Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

### Шаг 7: Используйте содержимое в вашем коде

Получите доступ к вашим словарям содержимого на протяжении всего вашего приложения:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

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
    <>
      {/**
       *   IntlayerServerProvider используется для передачи локали серверным дочерним компонентам
       *   Не работает, если задан в компоновке
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider используется для передачи локали клиентским дочерним компонентам
       *   Может быть задан в любом родительском компоненте, включая компоновку
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Создайте соответствующую декларацию содержимого

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Создайте соответствующую декларацию содержимого

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Примечание: Если вы хотите использовать ваше содержимое в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Для более подробного использования intlayer в клиентском или серверном компоненте, смотрите [пример nextJS здесь](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

### (Дополнительно) Шаг 8: Интернационализация ваших метаданных

В случае, если вы хотите интернационализировать ваши метаданные, такие как заголовок вашей страницы, вы можете использовать функцию `generateMetadata`, предоставленную NextJS. Внутри функции используйте функцию `getTranslationContent` для перевода ваших метаданных.

````typescript
// src/app/[locale]/layout.tsx или src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const url = `/`;

  /**
   * Генерирует объект, содержащий все url для каждой локали.
   *
   * Пример:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // Возвращает
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * Получите локализованный URL для текущей локали
   *
   * Пример:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * Возвращает:
   * '/fr/about' для французской локали
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Остальной код
````

> Узнайте больше об оптимизации метаданных [в официальной документации Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Дополнительно) Шаг 9: Интернационализация вашей карты сайта

Чтобы интернационализировать вашу карту сайта, вы можете использовать функцию `getMultilingualUrls`, предоставленную Intlayer. Эта функция позволяет вам генерировать многоязычные URL для вашей карты сайта.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> Узнайте больше об оптимизации карты сайта [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).

### (Дополнительно) Шаг 10: Изменение языка вашего содержимого

Чтобы изменить язык вашего содержимого, вы можете использовать функцию `setLocale`, предоставленную хуком `useLocale`. Эта функция позволяет вам установить локаль приложения и обновить содержимое соответственно.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Изменить язык</button>
  );
};
```

### Настройте TypeScript

Intlayer использует модульное расширение для получения преимуществ TypeScript и усиления вашего кода.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5
// tsconfig.json

{
  // ваша пользовательская конфигурация
  include: [
    "src",
    "types", // <- Включите автогенерируемые типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```gitignore
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```
