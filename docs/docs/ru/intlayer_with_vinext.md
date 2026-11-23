---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Полное руководство по переводу приложения Next.js на Vite"
description: "Настройте Intlayer с vinext, API Next.js поверх Vite: маршрутизация по локали через proxy.ts, Server и Client Components, локализованные метаданные, sitemap и деплой на Cloudflare Workers."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Начальная история"
author: aymericzip
---

# Переведите свой сайт на vinext с помощью Intlayer

[vinext](https://github.com/cloudflare/vinext) заново реализует API Next.js поверх Vite. Ваш каталог `app/`, импорты `next/*` и `proxy.ts` продолжают работать, но сборка идёт через Vite вместо Turbopack или webpack.

Intlayer встраивается в эту связку двумя пакетами: `next-intlayer` для хуков, провайдеров и прокси, которые ваши компоненты уже используют в Next.js, и `vite-intlayer` для сборки (компиляция словарей, watch и оптимизация бандла).

> Используете Next.js с его собственным тулчейном? Следуйте [руководству по Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md).

- [Руководство по Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)

## Содержание

<TOC/>

## Почему Intlayer, а не альтернативы?

По сравнению с решениями вроде `next-intl` или `i18next`, Intlayer поставляется со встроенными оптимизациями:

<AccordionGroup>
<Accordion header="Создан для API Next.js, на Vite">

Один и тот же код `next-intlayer` работает и в Next.js, и в vinext. Server Components получают контент на сервере, Client Components читают его через провайдер, а маршрутизация по локали выполняется из вашего `proxy.ts`. Переход между двумя тулчейнами не затрагивает ваши компоненты.

</Accordion>
<Accordion header="Размер бандла">

Вместо загрузки огромных JSON-файлов на страницы загружайте только нужный контент. Плагин Vite заменяет каждый вызов `useIntlayer` теми записями, которые компонент действительно использует, что **уменьшает размер бандла и страниц до 50 %**.

</Accordion>
<Accordion header="Удобство поддержки">

Разделение контента по компонентам **упрощает поддержку** больших приложений. Вы можете дублировать или удалять папку функции, не проверяя весь код контента, а Intlayer **полностью типизирован**, чтобы контент оставался корректным.

</Accordion>
<Accordion header="ИИ-агент">

Размещение контента рядом с компонентом **сокращает контекст**, необходимый LLM. Intlayer поставляется с **CLI** для поиска отсутствующих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**, **[MCP-сервером](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)** и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)
- [MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)

</Accordion>
<Accordion header="Автоматизация">

Переводите в своём CI/CD-пайплайне с помощью LLM на ваш выбор, за счёт вашего ИИ-провайдера. Intlayer также предлагает **компилятор** для автоматического извлечения контента и [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) для **перевода в фоновом режиме**.

- [Веб-платформа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)

</Accordion>
<Accordion header="Масштабирование вместе с не-разработчиками">

Intlayer предоставляет **[визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) для самостоятельного хостинга** и **[полноценную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)** для управления многоязычным контентом в **реальном времени** вместе с переводчиками и копирайтерами. Контент можно хранить локально и/или удалённо.

- [Визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
- [Полноценная CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Пошаговое руководство по настройке Intlayer в приложении vinext

<Steps>
<Step number={1} title="Установите зависимости">

Начните с рабочего проекта vinext. Чтобы создать его, выполните `npm create vinext-app@latest`. Чтобы перенести существующее приложение Next.js, выполните `npx vinext init`.

Затем установите Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Основной пакет с инструментами интернационализации: управление конфигурацией, перевод, [объявление контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляция и [команды CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Предоставляет провайдеры, хуки и прокси для API Next.js. vinext направляет `next/navigation`, `next/headers` и `next/server` на собственные реализации, поэтому `next-intlayer` работает без изменений.

- **vite-intlayer**

  Плагин Vite, который собирает ваши объявления контента, отслеживает их в режиме разработки и оптимизирует словари в продакшен-бандле. Он заменяет плагин Next.js `withIntlayer()`, который vinext не запускает.

</Step>
<Step number={2} title="Настройте проект">

Выберите, должно ли приложение использовать локализованные пути URL (например, `/en/about`, `/fr/about`) или отдавать контент без сегмента локали в пути (например, `/about`, определяя локаль по cookie, заголовкам или параметрам запроса).

<Tabs group="routing-mode">
<Tab label="С локалью в пути" value="with-locale-path">

### Архитектура

Все локализованные страницы вложены в динамический сегмент `[locale]`. Это рекомендуется для SEO и статического рендеринга, потому что у каждого языка свой URL:

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
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Конфигурация

Создайте файл `intlayer.config.ts`, чтобы объявить поддерживаемые языки:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Без локали в пути" value="without-locale-path">

### Архитектура

В маршрутах нет сегмента `[locale]`. Все страницы лежат прямо в `src/app/`, а локаль берётся из cookie, заголовков или параметров запроса. Это подходит для дашбордов и приложений с авторизацией:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Конфигурация

Задайте для `routing.mode` значение `"search-params"` (например, `/about?locale=fr`) или `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Этот файл также задаёт редирект прокси, имена cookie, расположение и расширение ваших объявлений контента, логи и многое другое. Полный список смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

- [Документация по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

</Step>
<Step number={3} title="Подключите Intlayer в конфигурации Vite">

Добавьте плагин `intlayer()` рядом с `vinext()` в `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Плагин `intlayer()` собирает ваши словари до начала сборки, отслеживает файлы контента в режиме разработки и настраивает алиасы и оптимизации, которые `next-intlayer` использует в окружениях RSC, SSR и клиента.

> `intlayer()` также поставляется с middleware маршрутизации по локали для dev-сервера Vite. В vinext эту задачу уже выполняет `src/proxy.ts`, и в разработке, и в продакшен-рантайме, поэтому опция `ignore` отключает версию Vite, чтобы не маршрутизировать каждый запрос дважды.

> Не добавляйте `withIntlayer()` в `next.config.ts`. vinext читает `next.config.ts` ради таких опций, как `redirects`, `rewrites` и `headers`, но не запускает плагины webpack или Turbopack.

Если вы деплоите на Cloudflare Workers, оставьте плагин `cloudflare()`, созданный командой `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => true } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Определите динамические маршруты локали">

<Tabs group="routing-mode">
<Tab label="С локалью в пути" value="with-locale-path">

Удалите всё содержимое `RootLayout` и замените его следующим кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Если оставить `RootLayout` пустым, layout локали сможет задать атрибуты [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) и [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Добавьте layout в каталог `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Один `IntlayerProvider` охватывает обе половины дерева: он передаёт локаль в Server Components и подключает клиентский провайдер, чтобы Client Components получали ту же локаль.

> Сегмент `[locale]` содержит локаль: `/en-US/about` разрешается в `en-US`, `/fr/about` в `fr`. Прежний `src/app/page.tsx` больше не используется и может быть удалён. Прокси (шаг 7) отдаёт локаль по умолчанию в корне.

> `generateStaticParams` заставляет vinext пререндерить каждую страницу для каждой локали. vinext также применяет `dynamicParams`, поэтому неизвестная локаль возвращает 404, если задать `export const dynamicParams = false`.

</Tab>
<Tab label="Без локали в пути" value="without-locale-path">

Каталога `[locale]` нет. Настройте `src/app/layout.tsx` так, чтобы он читал локаль из запроса и оборачивал приложение в `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
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
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Объявите контент">

Создайте объявления контента для хранения переводов:

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
      "main": {
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
}
```

> Объявления контента могут находиться в любом месте каталога `contentDir` (по умолчанию `./src`), если они соответствуют расширению объявлений контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Подробнее смотрите в [документации по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

- [Документация по объявлению контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)

</Step>
<Step number={6} title="Используйте контент в коде">

Обращайтесь к словарям из любого компонента:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

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
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` изоморфен: условие экспорта `react-server`, которое vinext применяет в своём окружении RSC, даёт Server Components серверную реализацию, а Client Components получают реализацию на основе контекста. Один и тот же вызов работает с обеих сторон.

> Чтобы использовать контент в атрибуте типа `string`, например `alt`, `title`, `href` или `aria-label`, прочитайте его значение:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Подробнее в [документации по `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

- [Документация по `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md)

> Если приложение уже существует, [компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) и [команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) преобразуют тысячи компонентов за секунду.

- [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)
- [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md)

</Step>
<Step number={7} title="Настройте прокси для определения локали">

vinext запускает `proxy.ts` (и `middleware.ts`) как Next.js 16, в разработке и в продакшене, в том числе на Cloudflare Workers. Экспортируйте прокси Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` определяет предпочитаемую локаль пользователя, перенаправляет на соответствующий URL согласно [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) и сохраняет локаль в cookie. Он также передаёт локаль в `getLocale()` и серверные хуки, поэтому оставьте его даже при архитектуре без локали в пути.

- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

> Чтобы объединить несколько прокси в цепочку (например, `intlayerProxy` с аутентификацией), используйте `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Интернационализация метаданных" isOptional={true}>

vinext поддерживает API Metadata. Используйте `generateMetadata` вместе с `getIntlayer`, чтобы переводить метаданные страниц:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      ru: "Моё приложение vinext",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      ru: "Приложение Next.js, работающее на Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
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
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

> Функция `getIntlayer`, импортированная из `intlayer`, возвращает необработанные значения, готовые для объекта метаданных. Версия из `next-intlayer` оборачивает их для визуального редактора.

</Step>
<Step number={9} title="Интернационализация sitemap.xml и robots.txt" isOptional={true}>

`sitemap.ts` и `robots.ts` работают так же, как в Next.js. Используйте `getMultilingualUrls`, чтобы перечислить каждый локализованный URL:

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
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Смена языка контента" isOptional={true}>

Используйте `next/link` для перехода на локализованную страницу. vinext сохраняет клиентскую навигацию и prefetching, поэтому переключение происходит без полной перезагрузки:

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
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Ссылки на документацию:
>
> - [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
> - [Функция `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> - [Функция `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [Функция `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Создание компонента локализованной ссылки" isOptional={true}>

Пользовательский компонент `Link` добавляет к внутренним URL текущую локаль, поэтому французский пользователь, нажавший `/about`, попадает на `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Получение текущей локали в Server Actions" isOptional={true}>

Вызовите `getLocale` из `next-intlayer/server` внутри Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` читает локаль, установленную прокси, из заголовков запроса, затем cookie локали, затем заголовок `Accept-Language` браузера и в конце использует локаль по умолчанию.

</Step>
<Step number={13} title="Деплой на Cloudflare Workers" isOptional={true}>

Intlayer компилирует словари в бандл во время сборки, поэтому во время выполнения ничто не читает файловую систему, и приложение работает в workerd как есть. Соберите и задеплойте через CLI vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Чтобы деплоить в другое место (Vercel, Netlify, AWS, Node.js), добавьте плагин Vite [Nitro](https://v3.nitro.build/) рядом с `vinext()` или задайте `output: "standalone"` в `next.config.ts`. Настройка Intlayer не меняется.

</Step>
<Step number={14} title="Извлечение контента из компонентов" isOptional={true}>

В существующей кодовой базе Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) и [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md), чтобы переносить захардкоженные строки в объявления контента.

- [Компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)
- [Экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md)

Включите компилятор в `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Запустите экстрактор, чтобы преобразовать компоненты и извлечь контент:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Vite compiler'>

Плагин Vite `intlayer()` включает компилятор. Как только задано `compiler.enabled`, запускайте dev-сервер или сборку как обычно:

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы типизировать ключи и значения контента.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Добавьте сгенерированные типы в конфигурацию TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Настройка Git

Игнорируйте файлы, сгенерированные Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Расширение для VS Code

Установите официальное **[расширение Intlayer для VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)**: автодополнение ключей, ошибки об отсутствующих переводах, встроенные превью и быстрые действия. Смотрите [документацию расширения](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md).

- [Документация расширения](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)

### Что дальше

Добавьте [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынесите контент во внешнюю [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

- [Визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)

## Часто задаваемые вопросы

<FAQ>

<Question title="Что такое vinext?">

vinext это open source плагин Vite, который поддерживает Cloudflare и заново реализует публичный API Next.js: App Router и Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlers и модули `next/*`. Ваш код Next.js выполняется на Vite и нативно деплоится на Cloudflare Workers или на другие платформы через Nitro.

</Question>
<Question title="Что меняется по сравнению с настройкой для Next.js?">

Только интеграция со сборкой. В Next.js `withIntlayer()` оборачивает `next.config.ts`. В vinext плагин `intlayer()` из `vite-intlayer` вместо этого добавляется в `vite.config.ts`. Провайдеры, хуки, `proxy.ts`, метаданные и код sitemap остаются прежними, поэтому для всего, что не описано на этой странице, можно следовать [руководству по Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md).

- [Руководство по Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)

</Question>
<Question title="Нужны ли конфигурация i18n Next.js или плагин SWC?">

Нет. Поле `i18n` в `next.config.ts` в vinext охватывает только префиксы локали Pages Router, а Intlayer выполняет собственную маршрутизацию через `proxy.ts`. Плагин `@intlayer/swc` тоже не нужен: плагин Vite уже заменяет вызовы `useIntlayer`, так что каждая страница получает только те словари, которые использует. Смотрите [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md).

- [Оптимизация бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)

</Question>
<Question title="Нужен ли `intlayer watch` в режиме разработки?">

Нет. Плагин Vite `intlayer()` запускает отслеживание контента вместе с `vite dev`, а изменение контента горячо обновляет только те компоненты, которые читают изменённый словарь.

</Question>
<Question title="Можно ли перейти с `next-intl` или `i18next`, не переписывая компоненты?">

Да. Следуйте [руководству по миграции с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md) или [руководству по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md), либо сохраните текущий API с помощью [адаптеров совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md), которые предоставляют API `next-intl`, `react-i18next` и `react-intl` поверх словарей Intlayer.

- [Руководство по миграции с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md)
- [Руководство по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md)
- [Адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md)

</Question>
<Question title="Нужно ли указывать локаль в URL, например /fr/about?">

Нет. `routing.mode` принимает:

- `"prefix-no-default"` (по умолчанию): `/about` для локали по умолчанию, `/fr/about` для остальных.
- `"prefix-all"`: префикс есть у каждой локали, `/en/about` и `/fr/about`.
- `"no-prefix"`: локали в пути нет, она определяется по cookie или заголовку.
- `"search-params"`: `/about?locale=fr`.

Смотрите [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) и архитектуру без локали в пути на шаге 2.

- [Справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)

</Question>
<Question title="Как автоматически перевести приложение с помощью ИИ?">

Выполните `npx intlayer fill`. CLI находит отсутствующие переводы и заполняет их с помощью LLM на ваш выбор, через вашего провайдера и ваш API-ключ. Смотрите [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию с CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

- [Команда fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md)
- [Интеграция с CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md)

</Question>
<Question title="Как поймать отсутствующие переводы до релиза?">

Запускайте `npx intlayer test` в CI. Сборка падает, если в объявленной локали не хватает контента. [Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md) показывает те же ошибки прямо при вводе, а [плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md) отмечает захардкоженные строки.

- [Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)
- [Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)

</Question>
<Question title="Intlayer бесплатный и с открытым исходным кодом?">

Да. Intlayer распространяется с открытым исходным кодом под лицензией Apache 2.0, а библиотека, CLI, визуальный редактор и компилятор бесплатны, в том числе для коммерческого использования. Размещённая CMS это необязательный платный сервис, и её также можно [развернуть самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

- [Самостоятельный хостинг](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md)

</Question>

</FAQ>
