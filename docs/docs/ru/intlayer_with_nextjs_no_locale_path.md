---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Как перевести ваше приложение Next.js 16 (без [locale] в пути страницы) — руководство по i18n 2026
description: Узнайте, как сделать ваш сайт на Next.js 16 многоязычным без [locale] в пути страницы. Следуйте документации, чтобы выполнить интернационализацию (i18n) и перевести его.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 1.0.0
    date: 2026-01-10
    changes: Первоначальный релиз
---

# Переведите ваш сайт Next.js 16 (без [locale] в пути страницы) с помощью Intlayer | Интернационализация (i18n)

<Tab defaultTab="video">
  <TabItem label="Видео" value="video">
  
<iframe title="Лучшее i18n-решение для Next.js? Узнайте об Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Содержание

<TOC/>

## Что такое Intlayer?

**Intlayer** — это инновационная, открытая библиотека для интернационализации (i18n), созданная для упрощения поддержки нескольких языков в современных веб-приложениях. Intlayer бесшовно интегрируется с последним фреймворком **Next.js 16**, включая его мощный **App Router**. Он оптимизирован для работы с **Server Components** для эффективного рендеринга и полностью совместим с [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

С Intlayer вы можете:

- **Легко управлять переводами** с помощью декларативных словарей на уровне компонентов.
- **Динамически локализовать метаданные**, маршруты и контент.
- **Получать доступ к переводам как в клиентских, так и в серверных компонентах**.
- **Обеспечить поддержку TypeScript** с автогенерируемыми типами, улучшающими автодополнение и обнаружение ошибок.
- **Воспользуйтесь продвинутыми возможностями**, такими как динамическое определение локали и её переключение.

> Intlayer совместим с Next.js 12, 13, 14 и 16. Если вы используете Next.js Page Router, вы можете обратиться к этому [руководству](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md). Для Next.js 12, 13, 14 с App Router — см. это [руководство](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_14.md).

---

## Пошаговое руководство по настройке Intlayer в приложении Next.js

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводов, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

Пакет, который интегрирует Intlayer с Next.js. Он предоставляет context providers и хуки для интернационализации в Next.js. Дополнительно он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также прокси для определения предпочтительной локали пользователя, управления cookies и обработки перенаправлений URL.

### Шаг 2: Настройка вашего проекта

Ниже приведена итоговая структура, которую мы получим:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Если вы не хотите маршрутизацию по локалям, intlayer можно использовать как простой provider / hook. См. [это руководство](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_no_locale_path.md) для получения дополнительных сведений.

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
  routing: {
    mode: "search-params", // или `no-prefix` — полезно для обнаружения в middleware
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
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // или `no-prefix` — полезно для обнаружения в middleware
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
      // Ваши другие локали
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // или `no-prefix` — полезно для обнаружения в middleware
  },
};

module.exports = config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление через прокси, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров см. [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Next.js

Настройте ваш проект Next.js для использования Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* параметры конфигурации здесь */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* параметры конфигурации здесь */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* параметры конфигурации здесь */
};

module.exports = withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает генерацию файлов декларации контента и их отслеживание в режиме разработки. Он определяет переменные окружения Intlayer внутри сред [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Дополнительно он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.
>
> Функция `withIntlayer()` возвращает Promise. Она позволяет подготовить словари intlayer перед началом сборки. Если вы хотите использовать её вместе с другими плагинами, вы можете дождаться её выполнения с помощью await. Пример:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Если вы хотите использовать его синхронно, вы можете воспользоваться функцией `withIntlayerSync()`. Пример:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer автоматически определяет, использует ли ваш проект **webpack** или **Turbopack** на основе флагов командной строки `--webpack`, `--turbo` или `--turbopack`, а также вашей текущей версии **Next.js**.
>
> Поскольку `next>=16`, если вы используете **Rspack**, вы должны явно заставить Intlayer использовать конфигурацию webpack, отключив Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Шаг 4: Определение динамических маршрутов локализации

Удалите всё из `RootLayout` и замените его следующим кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
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
import { headers, cookies } from "next/headers";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // Ожидание headers и cookies в Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Сначала проверяет cookie intlayer (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Затем проверяет header intlayer (по умолчанию: 'x-intlayer-locale')
    // И, наконец, проверить заголовок accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

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
const { headers, cookies } = require("next/headers");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  // Ожидаем заголовки и куки в Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Сначала проверяем cookie intlayer (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Затем проверяем заголовок intlayer (по умолчанию: 'x-intlayer-locale')
    // И, наконец, проверяем заголовок accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

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

### Шаг 5: Объявите ваш контент

Создавайте и управляйте вашими объявлениями контента для хранения переводов:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ru: "Заголовок моего проекта",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ru: "Ознакомьтесь с нашей инновационной платформой, созданной для оптимизации рабочего процесса и повышения продуктивности.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      ru: "Откройте для себя нашу инновационную платформу, созданную для оптимизации рабочего процесса и повышения продуктивности.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra su plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ru: ["инновации", "продуктивность", "рабочий процесс", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ru: "Название моего проекта",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ru: "Ознакомьтесь с нашей инновационной платформой, созданной для оптимизации рабочего процесса и повышения продуктивности.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ru: ["инновации", "продуктивность", "рабочий процесс", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// Тип: словарь метаданных для Next.js
/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      ru: "Название моего проекта",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      ru: "Ознакомьтесь с нашей инновационной платформой, созданной для оптимизации рабочего процесса и повышения продуктивности.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      ru: ["инновации", "продуктивность", "рабочий процесс", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "ru": "Название моего проекта",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ru": "Ознакомьтесь с нашей инновационной платформой, созданной для упрощения вашего рабочего процесса и повышения продуктивности.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "ru": "Откройте для себя нашу инновационную платформу, созданную для упрощения рабочего процесса и повышения вашей продуктивности.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "ru": ["инновации", "продуктивность", "рабочий процесс", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ru: "Начните с редактирования",
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ru: "Начните с редактирования",
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

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        ru: "Начните с редактирования",
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "ru": "Начните с редактирования",
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии что они включены в директорию `contentDir` (по умолчанию `./src`). И соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Для получения подробной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

### Шаг 6: Использование контента в коде

Получайте доступ к словарям контента по всему приложению:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { NextPage } from "next";
import { getLocale } from "intlayer";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Ожидайте headers и cookies в Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Сначала проверьте cookie intlayer (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Затем проверяем заголовок intlayer (по умолчанию: 'x-intlayer-locale')
    // И, наконец, проверяем заголовок accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

  // Ожидание headers и cookies в Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Сначала проверяем cookie intlayer (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Затем проверяем заголовок intlayer (по умолчанию: 'x-intlayer-locale')
    // И наконец проверяем заголовок accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  // Ожидание headers и cookies в Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // Сначала проверяем cookie intlayer (по умолчанию: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Затем проверяем заголовок intlayer (по умолчанию: 'x-intlayer-locale')
    // И, наконец, проверяем заголовок accept-language ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** используется для предоставления locale клиентским компонентам. Его можно разместить в любом родительском компоненте, включая layout. Однако рекомендуется помещать его в layout, потому что Next.js использует общий код layout между страницами, что делает это более эффективным. Используя `IntlayerClientProvider` в layout, вы избегаете повторной инициализации на каждой странице, повышаете производительность и поддерживаете единый контекст локализации во всём приложении.
- **`IntlayerServerProvider`** используется для предоставления locale серверным дочерним компонентам. Его нельзя установить в layout.

> Layout и page не могут разделять общий server context, потому что система server context основана на хранилище данных, привязанном к каждому запросу (через механизм [React's cache](https://react.dev/reference/react/cache)), из‑за чего каждый «context» воссоздаётся для разных сегментов приложения. Размещение provider в общем layout нарушит эту изоляцию и помешает корректной передаче значений server context в ваши server components.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Создаёт соответствующее объявление контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Создать объявление связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Создать декларацию связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Создать декларацию связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Создает объявление связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Создает объявление связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Если вы хотите использовать содержимое в строковом атрибуте, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, см. [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

### (Опционально) Шаг 7: Настройка прокси для определения локали

Настройте прокси для определения предпочитаемой пользователем локали:

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

> Прокси `intlayerProxy` используется для определения предпочитаемой локали пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочитаемую локаль пользователя в cookie.

> Если требуется связать несколько прокси вместе (например, `intlayerProxy` с прокси авторизации или пользовательскими прокси), Intlayer предоставляет вспомогательную функцию `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Необязательно) Шаг 8: Изменение языка вашего контента

Чтобы изменить язык содержимого в Next.js, рекомендуется использовать компонент `Link`, чтобы перенаправлять пользователей на соответствующую локализованную страницу. Компонент `Link` поддерживает предзагрузку страницы (prefetch), что помогает избежать полной перезагрузки страницы.

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
              {/* Локаль — например FR */}
              {localeItem}
            </span>
            <span>
              {/* Название языка в своей локали — например Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Название языка в текущей локали — например Francés при текущей локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Название языка на английском — напр., French */}
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
              {/* Локаль - например FR */}
              {localeItem}
            </span>
            <span>
              {/* Название языка в его собственной локали - например Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Название языка в текущей локали - например Francés, если текущая локаль установлена в Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Название языка на английском - например French */}
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
              {/* Локаль - напр., FR */}
              {localeItem}
            </span>
            <span>
              {/* Название языка на его собственном языке - напр., Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Название языка на текущем языке интерфейса - напр., Francés при текущей локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Название языка на английском - напр., French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативный способ — использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция не будет позволять предзагружать страницу. См. документацию по хуку [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md) для получения дополнительных сведений.

> Ссылки в документации:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/getLocalizedUrl.md)
> - [хук `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [атрибут `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [атрибут `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [атрибут `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [атрибут `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
>
> ### (Необязательно) Шаг 9: Получить текущую локаль в Server Actions
>
> Если вам нужна активная локаль внутри Server Action (например, чтобы локализовать письма или выполнить логику, зависящую от локали), вызовите `getLocale` из `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Выполните действия с локалью
};
```

> Функция `getLocale` использует каскадную стратегию для определения локали пользователя:
>
> 1. Сначала она проверяет заголовки запроса на наличие значения локали, которое могло быть установлено proxy
> 2. Если в заголовках локаль не найдена, она ищет локаль в cookies
> 3. Если cookies не найдено, она пытается определить предпочитаемый язык пользователя из настроек браузера
> 4. В крайнем случае используется локаль по умолчанию, настроенная в приложении
>
> Это гарантирует выбор наиболее подходящей локали на основе доступного контекста.

### (Необязательно) Шаг 10: Оптимизируйте размер бандла

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Чтобы оптимизировать размер бандла, Intlayer предоставляет опциональный SWC-плагин, который интеллектуально заменяет вызовы `useIntlayer` с помощью макросов. Это гарантирует, что словари будут включаться в бандлы только для тех страниц, которые действительно их используют.

Чтобы включить эту оптимизацию, установите пакет `@intlayer/swc`. После установки `next-intlayer` автоматически обнаружит и начнёт использовать плагин:

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

> Примечание: Эта оптимизация доступна только для Next.js 13 и выше.

> Примечание: Этот пакет не устанавливается по умолчанию, поскольку SWC-плагины в Next.js всё ещё экспериментальны. Это может измениться в будущем.

> Примечание: Если установить опцию как `importMode: 'dynamic'` или `importMode: 'live'`, будет полагаться на Suspense, поэтому вам придётся оборачивать вызовы `useIntlayer` в границу `Suspense`. Это означает, что вы не сможете использовать `useIntlayer` прямо на верхнем уровне вашего компонента Page / Layout.

### Отслеживание изменений словарей в Turbopack

Когда вы используете Turbopack в качестве сервера разработки с командой `next dev`, изменения словарей по умолчанию не будут автоматически обнаруживаться.

Это ограничение возникает из-за того, что Turbopack не может параллельно запускать плагины webpack для отслеживания изменений в ваших файлах с содержимым. Чтобы обойти это, вам нужно использовать команду `intlayer watch`, чтобы одновременно запустить сервер разработки и наблюдатель сборки Intlayer.

```json5 fileName="package.json"
{
  // ... Ваши существующие настройки package.json
  "scripts": {
    // ... Ваши существующие конфигурации скриптов
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Если вы используете next-intlayer@<=6.x.x, необходимо сохранять флаг `--turbopack`, чтобы приложение Next.js 16 корректно работало с Turbopack. Рекомендуем использовать next-intlayer@>=7.x.x, чтобы избежать этого ограничения.

### Настройка TypeScript

Intlayer использует module augmentation, чтобы получить преимущества TypeScript и укрепить вашу codebase.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что конфигурация TypeScript включает автогенерируемые типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволяет избежать их добавления в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Чтобы улучшить опыт разработки с Intlayer, вы можете установить официальное **Intlayer VS Code Extension**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенные превью** переведённого контента.
- **Быстрые действия** для простого создания и обновления переводов.

Для получения подробной информации о том, как использовать расширение, обратитесь к [документации Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Продвинутые возможности

Чтобы продолжить, вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести свой контент, используя [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
