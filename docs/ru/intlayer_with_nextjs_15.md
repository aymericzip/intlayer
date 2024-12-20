# Получение начальных знаний о интернационализации (i18n) с Intlayer и Next.js 15 App Router

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека интернационализации (i18n), разработанная для упрощения многозначной поддержки в современных веб-приложениях. Intlayer бесшовно интегрируется с последней версией **Next.js 15**, включая его мощный **App Router**. Он оптимизирован для работы с **Серверными Компонентами** для эффективной отрисовки и полностью совместим с [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

С помощью Intlayer вы можете:

- **Легко управлять переводами** с использованием декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Получать доступ к переводам как в клиентских, так и в серверных компонентах**.
- **Обеспечить поддержку TypeScript** с помощью автогенерируемых типов, что улучшает автозаполнение и обнаружение ошибок.
- **Воспользоваться продвинутыми функциями**, такими как динамическое определение локали и переключение.

> Примечание: Intlayer совместим с Next.js 12, 13, 14 и 15. Если вы используете Next.js Page Router, вы можете обратиться к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_page_router.md). Для Next.js 12, 13, 14 с App Router обратитесь к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_14.md).

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

### Шаг 2: Настройте проект

Создайте файл конфигурации для настройки языков вашего приложения:

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

Настройте вашу сборку Next.js для использования Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Шаг 4: Настройте Middleware для определения локали

Настройте middleware для обнаружения предпочтительной локали пользователя:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Шаг 5: Определите динамические маршруты локали

Реализуйте динамическую маршрутизацию для локализованного контента:

Смените `src/app/page.ts` на `src/app/[locale]/page.ts`

Затем реализуйте функцию generateStaticParams в вашей компоновке приложения.

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

Затем добавьте новую компоновку в вашей директории `[locale]`:

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

### Шаг 6: Объявите ваш контент

Создайте и управляйте вашими словарями контента:

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

[Посмотрите, как объявить ваши файлы деклараций Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

### Шаг 7: Используйте контент в вашем коде

Получите доступ к вашим словарям контента по всему вашему приложению:

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
       *   IntlayerServerProvider используется для предоставления локали серверным дочерним элементам
       *   Не работает, если установлено в компоновке
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider используется для предоставления локали клиентским дочерним элементам
       *   Может быть установлен в любом родительском компоненте, включая компоновку
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
  const content = useIntlayer("client-component-example"); // Создайте соответствующее объявление контента

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
  const content = useIntlayer("server-component-example"); // Создайте соответствующее объявление контента

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Примечание: Если вы хотите использовать свой контент в атрибутах `string`, таких как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

Для более подробного использования intlayer в клиентских или серверных компонентах смотрите [пример Next.js здесь](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app).

### (Дополнительно) Шаг 8: Интернационализация ваших метаданных

В случае если вы хотите интернационализировать ваши метаданные, такие как заголовок вашей страницы, вы можете использовать функцию `generateMetadata`, предоставленную Next.js. Внутри функции используйте функцию `getTranslationContent`, чтобы перевести ваши метаданные.

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

  /**
   * Генерирует объект, содержащий все URL для каждой локали.
   *
   * Пример:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Возвращает
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Остальная часть кода
````

> Узнайте больше о оптимизации метаданных [в официальной документации Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Дополнительно) Шаг 9: Интернационализация вашего sitemap.xml и robots.txt

Для интернационализации вашего `sitemap.xml` и `robots.txt`, вы можете использовать функцию `getMultilingualUrls`, предоставленную Intlayer. Эта функция позволяет вам генерировать многоязычные URL для вашего sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
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

> Узнайте больше об оптимизации sitemap [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Узнайте больше об оптимизации robots.txt [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Дополнительно) Шаг 10: Изменение языка вашего контента

Чтобы изменить язык вашего контента, вы можете использовать функцию `setLocale`, предоставленную хуком `useLocale`. Эта функция позволяет вам установить локаль приложения и обновить контент соответственно.

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

### Настройка TypeScript

Intlayer использует модульную расширяемость, чтобы получить преимущества TypeScript и сделать ваш код более надежным.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Убедитесь, что ваша конфигурация TypeScript включает автогенерируемые типы.

```json5
// tsconfig.json

{
  // ваша настраиваемая конфигурация
  include: [
    "src",
    "types", // <- Включите авто сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит вам избежать их коммита в ваш Git репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```gitignore
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```
