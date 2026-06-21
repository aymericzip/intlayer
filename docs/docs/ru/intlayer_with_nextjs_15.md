---
createdAt: 2024-12-06
updatedAt: 2026-05-31
title: "Next.js 15 i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Next.js 15. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
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
applicationShowcase: https://next-15-intlayer-template-xt83.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Переведите ваш Next.js 15 с Intlayer | Интернационализация (i18n)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">
  
<iframe title="Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-15-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://next-15-intlayer-template-xt83.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-next-15-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-next-15-template) на GitHub.

## Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как next-intl или i18next, Intlayer представляет собой решение со встроенными оптимизациями, такими как:

<AccordionGroup>

<Accordion header="Полное покрытие Next.js">

Intlayer оптимизирован для работы с **Серверными компонентами** для эффективного рендеринга и полностью совместим с [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Он не блокирует статический рендеринг и предлагает промежуточное программное обеспечение, а также все функции, необходимые для масштабирования интернационализации (i18n).

> Intlayer совместим с Next.js 12, 13, 14, 15 и 16. Если вы используете маршрутизатор страниц Next.js, вы можете обратиться к этому [руководству] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Маршрутизация локали полезна для SEO, размера пакета и производительности. Если вам это не нужно, вы можете обратиться к этому [руководству] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Для Next.js 12, 13, 14 и 15 с App Router обратитесь к этому [руководству] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Размер бандла">

Вместо загрузки огромных файлов JSON на свои страницы загружайте только необходимый контент. Intlayer помогает **уменьшить размер бандла и страниц до 50 %**.

</Accordion>

<Accordion header="Удобство обслуживания">

Определение области содержимого вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить отдельную папку функций, не утруждав себя мысленным бременем проверки всей кодовой базы контента. Кроме того, Intlayer **полностью типизирован**, что обеспечивает точность вашего контента.

</Accordion>

<Accordion header="Агент ИИ">

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[навыки агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

</Accordion>

<Accordion header="Автоматизация">

Используйте автоматизацию для перевода в своем конвейере CI/CD, используя LLM по вашему выбору за счет вашего поставщика ИИ. Intlayer также предлагает **компилятор** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), которая помогает **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность">

Подключение больших файлов JSON к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабирование с помощью не-разработчиками">

Intlayer — это больше, чем просто решение i18n. Он предоставляет **автономный [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** и **[полный CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, чтобы помочь вам управлять многоязычным контентом в **реальном времени**, упрощая сотрудничество с переводчиками, копирайтерами и другими членами команды. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

---

## Пошаговое руководство по установке Intlayer в приложение Next.js

<Steps>

<Step number={1} title="Установка зависимостей">

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> флаг `--interactive` не является обязательным. Используйте `intlayer-cli init`, если вы являетесь ИИ-агентом.

> Эта команда определит вашу среду и установит необходимые пакеты. Например:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Пакет, который интегрирует Intlayer с Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации в Next.js. Кроме того, включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также middleware для определения предпочтительной локали пользователя, управления cookie и обработки перенаправления URL.

</Step>

<Step number={2} title="Настройте ваш проект">

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

> If you don't want locale routing, intlayer can be used as a simple provider / hook. See [this guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md) for more details.

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> С помощью этого файла конфигурации вы можете настроить локализованные URL-адреса, перенаправление через middleware, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в вашу конфигурацию Next.js">

Настройте ваш Next.js для использования Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* параметры конфигурации здесь */
};

export default withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает сборку файлов деклараций контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

</Step>

<Step number={4} title="Определение динамических маршрутов локалей">

Удалите всё из `RootLayout` и замените следующим кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> Оставляя компонент `RootLayout` пустым, вы позволяете установить атрибуты [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) и [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Для реализации динамической маршрутизации укажите путь для локали, добавив новый layout в директорию `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

// Локальный макет для обработки маршрутизации с учетом локали
const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params; // Получаем текущую локаль из параметров
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Сегмент пути `[locale]` используется для определения локали. Например: `/en-US/about` будет соответствовать `en-US`, а `/fr/about` - `fr`.

> На этом этапе вы столкнетесь с ошибкой: `Error: Missing <html> and <body> tags in the root layout.`. Это ожидаемо, поскольку файл `/app/page.tsx` больше не используется и может быть удален. Вместо этого сегмент пути `[locale]` активирует страницу `/app/[locale]/page.tsx`. Следовательно, страницы будут доступны по путям, таким как `/en`, `/fr`, `/es` в вашем браузере. Чтобы установить локаль по умолчанию в качестве корневой страницы, обратитесь к настройке `middleware` на шаге 7.

Затем реализуйте функцию `generateStaticParams` в вашем Layout приложения.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Строка для вставки

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Остальная часть кода*/
};

export default LocaleLayout;
```

> `generateStaticParams` гарантирует, что ваше приложение предварительно собирает необходимые страницы для всех локалей, уменьшая вычисления во время выполнения и улучшая опыт пользователя. Для получения дополнительной информации обратитесь к [документации Next.js по generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

</Step>

<Step number={5} title="Объявите Ваш Контент">

Создайте и управляйте объявлениями контента для хранения переводов:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, как только они включены в каталог `contentDir` (по умолчанию, `./src`). И соответствуют расширению файла объявления контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения дополнительной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={6} title="Использование контента в вашем коде">

Получайте доступ к вашим словарям контента по всему приложению:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p> {/* основной текст начала работы */}
      <code>{content.getStarted.pageLink}</code>{" "}
      {/* ссылка на страницу начала работы */}
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params; // получение локали из параметров

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

- **`IntlayerClientProvider`** используется для предоставления локали компонентам на стороне клиента. Его можно разместить в любом родительском компоненте, включая layout. Однако рекомендуется размещать его в layout, так как Next.js разделяет код layout между страницами, что делает это более эффективным. Используя `IntlayerClientProvider` в layout, вы избегаете повторной инициализации для каждой страницы, улучшая производительность и поддерживая единый контекст локализации во всем приложении.
- **`IntlayerServerProvider`** используется для предоставления локали дочерним серверным компонентам. Его нельзя устанавливать в layout.

  > Layout и страница не могут использовать общий серверный контекст, потому что система серверного контекста основана на хранилище данных для каждого запроса (через механизм [React's cache](https://react.dev/reference/react/cache)), из-за чего каждый "контекст" создаётся заново для разных сегментов приложения. Размещение провайдера в общем layout нарушит эту изоляцию и помешает правильной передаче значений серверного контекста вашим серверным компонентам.

  > Макет и страница не могут использовать общий серверный контекст, поскольку система серверного контекста основана на хранилище данных для каждого запроса (через механизм [кэша React](https://react.dev/reference/react/cache)), из-за чего каждый "контекст" создаётся заново для разных сегментов приложения. Размещение провайдера в общем макете нарушит эту изоляцию, что помешает правильной передаче значений серверного контекста вашим серверным компонентам.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Создаём декларацию связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Создать объявление связанного контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Если вы хотите использовать ваш контент в атрибуте типа `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Настройка Middleware для определения локали" isOptional={true}>

Настройте middleware для определения предпочитаемой пользователем локали:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Для получения дополнительной информации о хуке `useIntlayer` обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Настройка Middleware для определения локали" isOptional={true}>

Настройте middleware для определения предпочтительной локали пользователя:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware` используется для определения предпочтительной локали пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочтительную локаль пользователя в cookie.

</Step>

<Step number={8} title="Интернационализация ваших метаданных" isOptional={true}>

В случае, если вы хотите интернационализировать ваши метаданные, такие как заголовок страницы, вы можете использовать функцию `generateMetadata`, предоставляемую Next.js. Внутри вы можете получить содержимое из функции `getIntlayer` для перевода ваших метаданных.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} удовлетворяет Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "ru": "Логотип Preact",
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ru": "Сгенерировано с помощью create next app",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерирует объект, содержащий все URL для каждого языка.
   *
   * Пример:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Возвращает
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  *   es: '/es/about',
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

// ... Остальная часть кода
````

> Обратите внимание, что функция `getIntlayer`, импортируемая из `next-intlayer`, возвращает ваш контент, обёрнутый в `IntlayerNode`, что позволяет интегрироваться с визуальным редактором. В то время как функция `getIntlayer`, импортируемая из `intlayer`, возвращает ваш контент напрямую без дополнительных свойств.

В качестве альтернативы вы можете использовать функцию `getTranslation` для объявления ваших метаданных. Однако рекомендуется использовать файлы декларации контента, чтобы автоматизировать перевод ваших метаданных и в какой-то момент вынести контент отдельно.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
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
      ru: "Мой заголовок",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      ru: "Моё описание",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Остальная часть кода
```

> Узнайте больше об оптимизации метаданных [в официальной документации Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Интернационализация вашего sitemap.xml и robots.txt" isOptional={true}>

Для интернационализации ваших файлов `sitemap.xml` и `robots.txt` вы можете использовать функцию `getMultilingualUrls`, предоставляемую Intlayer. Эта функция позволяет генерировать многоязычные URL для вашего sitemap.

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]), // запрещаем доступ к страницам входа и регистрации
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Узнайте больше об оптимизации sitemap [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Узнайте больше об оптимизации robots.txt [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Изменение языка вашего контента" isOptional={true}>

Для изменения языка вашего контента в Next.js рекомендуется использовать компонент `Link` для перенаправления пользователей на соответствующую локализованную страницу. Компонент `Link` позволяет предварительно загружать страницу, что помогает избежать полной перезагрузки страницы.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Локаль - например, FR */}
              {localeItem}
            </span>
            <span>
              {/* Язык на его собственной локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущей локали - например, Francés при установленной локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - например, French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативный способ - использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция не позволит предварительно загрузить страницу и перезагрузит страницу.

> В этом случае, без перенаправления с помощью `router.push`, только ваш серверный код изменит локаль контента.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Остальная часть кода

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Переключиться на французский
  </button>
);
```

> Ссылки на документацию:
>
> - [`useLocale` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` хук](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` атрибут](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` атрибут](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` атрибут](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Создание локализованного компонента Link" isOptional={true}>

Чтобы навигация вашего приложения учитывала текущую локаль, вы можете создать собственный компонент `Link`. Этот компонент автоматически добавляет префикс с текущим языком к внутренним URL, например, когда пользователь, говорящий по-французски, кликает на ссылку на страницу "О нас", его перенаправляет на `/fr/about` вместо `/about`.

Такое поведение полезно по нескольким причинам:

- **SEO и удобство для пользователя**: Локализованные URL помогают поисковым системам правильно индексировать страницы на разных языках и предоставлять пользователям контент на предпочитаемом языке.
- **Последовательность**: Используя локализованные ссылки по всему приложению, вы гарантируете, что навигация останется в рамках текущей локали, предотвращая неожиданные переключения языка.
- **Поддерживаемость**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами, делая ваш код более удобным для поддержки и расширения по мере роста приложения.

Ниже приведена реализация локализованного компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Вспомогательная функция для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl` для добавления префикса локали к URL (например, /fr/about).
 * Это гарантирует, что навигация останется в контексте той же локали.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Если ссылка внутренняя и href валиден, получить локализованный URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Как это работает

- **Определение внешних ссылок**:  
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются без изменений, так как они не требуют локализации.

- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль (например, `fr` для французского).

- **Локализация URL**:  
  Для внутренних ссылок (то есть не внешних) используется `getLocalizedUrl`, который автоматически добавляет префикс локали к URL. Это означает, что если пользователь использует французский язык, передача `/about` в качестве `href` преобразуется в `/fr/about`.

- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL, обеспечивая согласованную навигацию в соответствии с локалью.

Интегрируя этот компонент `Link` по всему вашему приложению, вы поддерживаете последовательный и ориентированный на язык пользовательский опыт, а также получаете преимущества улучшенного SEO и удобства использования.

</Step>

<Step number={12} title="Оптимизация размера бандла" isOptional={true}>

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Чтобы оптимизировать размер бандла, Intlayer предоставляет необязательный плагин SWC, который интеллектуально заменяет вызовы `useIntlayer` с помощью макросов. Это гарантирует, что словари включаются в бандлы только для тех страниц, которые действительно их используют.

Чтобы включить эту оптимизацию, установите пакет `@intlayer/swc`. После установки `next-intlayer` автоматически обнаружит и использует плагин:

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

> Примечание: Эта оптимизация доступна только для Next.js версии 13 и выше.

> Примечание: Этот пакет не устанавливается по умолчанию, так как плагины SWC в Next.js всё ещё находятся в экспериментальной стадии. В будущем это может измениться.
> </Step>

</Steps>

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы использовать преимущества TypeScript и сделать ваш код более надёжным.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие настройки TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически сгенерированные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, сгенерированные Intlayer. Это позволит избежать их коммита в ваш репозиторий Git.

Для этого вы можете добавить следующие инструкции в файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, сгенерированные Intlayer
.intlayer
```

### Расширение VS Code

Для улучшения вашего опыта разработки с Intlayer вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей переводов.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный просмотр** переведённого контента.
- **Быстрые действия** для лёгкого создания и обновления переводов.

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/doc/ru/vs-code-extension).

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
