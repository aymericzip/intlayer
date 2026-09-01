---
createdAt: 2024-12-06
updatedAt: 2026-08-30
title: "Next.js 14 i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Next.js 14. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
author: aymericzip
---

# Переведите ваш сайт Next.js 14 и App Router с помощью Intlayer | Интернационализация (i18n)

## Оглавление

<TOC/>

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

Совместное размещение контента **уменьшает контекст, необходимый** для моделей большого языка (LLM). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствия переводов,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать работу разработчика (DX) еще более удобной для агентов ИИ.

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

## Пошаговое руководство по настройке Intlayer в приложении Next.js

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [Application Template](https://github.com/aymericzip/intlayer-next-14-template) на GitHub.

<Steps>

<Step number={1} title="Установите зависимости">

Установите необходимые пакеты с помощью npm:

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводами, [декларацией контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляцией и [CLI-командами](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Пакет, интегрирующий Intlayer с Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации в Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также middleware для определения предпочтительной локали пользователя, управления cookies и обработки перенаправлений URL.

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

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправления middleware, имена cookies, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Next.js">

Настройте ваш проект Next.js для использования Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Плагин `withIntlayer()` для Next.js используется для интеграции Intlayer с Next.js. Он обеспечивает создание файлов декларации контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

> Функция `withIntlayer()` является асинхронной функцией. Если вы хотите использовать её с другими плагинами, вы можете её ожидать. Пример:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

</Step>

<Step number={4} title="Настройка Middleware для определения локали">

Настройте middleware для определения предпочтительной локали пользователя:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerMiddleware` используется для определения предпочтительной локали пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочтительную локаль пользователя в cookie.

> Начиная с Intlayer v9, это middleware соблюдает опцию `routing.enableProxy` (`true` по умолчанию). Установите `routing.enableProxy: false` в вашей конфигурации, чтобы превратить его в pass-through без удаления этого файла. См. [примечания к выпуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/releases/v9.md).

> Адаптируйте параметр `matcher` для соответствия маршрутам вашего приложения. Для получения дополнительной информации обратитесь к [документации Next.js по настройке matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

> Если вам нужно связать несколько middlewares вместе (например, `intlayerMiddleware` с аутентификацией или пользовательскими middlewares), Intlayer теперь предоставляет вспомогательный инструмент под названием `multipleMiddlewares`.

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

</Step>

<Step number={5} title="Определите динамические маршруты локали">

Удалите все из `RootLayout` и замените следующим кодом:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
```

> Оставляя компонент `RootLayout` пустым, вы можете установить атрибуты [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) и [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Для реализации динамической маршрутизации укажите путь для локали, добавив новый layout в вашу директорию `[locale]`:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type Next14LayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <IntlayerProvider locale={locale}>
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  </IntlayerProvider>
);

export default LocaleLayout;
```

> Один `IntlayerProvider` охватывает обе части дерева: он инициализирует контекст сервера, привязанный к запросу и читаемый серверными хуками, и монтирует клиентский провайдер, чтобы клиентские компоненты получали ту же локаль.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type Next14LayoutIntlayer, IntlayerProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>
      <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
    </body>
  </html>
);
```

 </Tab>
</Tabs>

> Сегмент пути `[locale]` используется для определения локали. Пример: `/en-US/about` будет относиться к `en-US`, а `/fr/about` к `fr`.

> На этом этапе вы столкнетесь с ошибкой: `Ошибка: Отсутствуют теги <html> и <body> в корневом макете.`. Это ожидаемо, так как файл `/app/page.tsx` больше не используется и может быть удален. Вместо этого сегмент пути `[locale]` активирует страницу `/app/[locale]/page.tsx`. Таким образом, страницы будут доступны по путям, таким как `/en`, `/fr`, `/es` в вашем браузере. Чтобы установить локаль по умолчанию в качестве корневой страницы, обратитесь к настройке `middleware` на шаге 4.

Затем реализуйте функцию `generateStaticParams` в вашем приложении Layout.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Строка для вставки

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Остальной код*/
};

export default LocaleLayout;
```

> `generateStaticParams` гарантирует, что ваше приложение предварительно создает необходимые страницы для всех локалей, уменьшая вычисления во время выполнения и улучшая пользовательский опыт. Для получения дополнительной информации обратитесь к [документации Next.js о generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

</Step>

<Step number={6} title="Объявите ваш контент">

Создайте и управляйте вашими декларациями контента для хранения переводов:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "ru": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Ваши декларации контента могут быть определены в любом месте вашего приложения, если они включены в каталог `contentDir` (по умолчанию, `./src`) и соответствуют расширению файла декларации контента (по умолчанию, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`). Для получения дополнительной информации обратитесь к [документации по декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

> Для получения дополнительной информации обратитесь к [документации объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={7} title="Используйте контент в вашем коде">

Получите доступ к словарям контента в вашем приложении:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { useIntlayer } from "next-intlayer";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <ServerComponentExample />
      <ClientComponentExample />
    </>
  );
};

export default Page;
```

- **`IntlayerProvider`** монтируется один раз в макете локали. Он предоставляет локаль как серверным, так и клиентским компонентам, поэтому страницы больше не оборачиваются сами в себя.
- Серверные хуки разрешают локаль в следующем порядке: локаль, переданная на месте вызова, затем контекст сервера, заполненный провайдером, затем локаль, переносимая запросом (заголовок `x-intlayer-locale`, установленный прокси Intlayer, затем cookie локали). Этот последний шаг обеспечивает правильность содержимого при навигации на стороне клиента, которая переотрисовывает только сегмент страницы, где макет — и с ним провайдер — не переполняется.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
        <ClientComponentExample />
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** используется для предоставления локали клиентским компонентам. Он может быть размещен в любом родительском компоненте, включая layout. Однако рекомендуется размещать его в layout, так как Next.js использует общий код layout для страниц, что делает его более эффективным. Используя `IntlayerClientProvider` в layout, вы избегаете его повторной инициализации для каждой страницы, улучшая производительность и поддерживая единый контекст локализации во всем приложении.
- **`IntlayerServerProvider`** используется для предоставления локали серверным дочерним элементам. Он не может быть установлен в layout.

> Layout и page не могут использовать общий server context, потому что система server context основана на хранилище данных для каждого запроса (через механизм [React's cache](https://react.dev/reference/react/cache)), что приводит к пересозданию каждого "context" для разных сегментов приложения. Размещение provider в общем layout нарушит эту изоляцию, предотвращая правильное распространение значений server context на ваши server components.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Создание связанной декларации контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Создание связанного объявления контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` — это изоморфный путь импорта: условие экспорта `react-server` предоставляет серверным компонентам реализацию с внешней локалью, а клиентские компоненты получают реализацию на основе контекста. Один и тот же вызов работает на обеих сторонах.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Создание связанной декларации контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> Если вы хотите использовать ваш контент в атрибуте `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Интернационализация ваших метаданных" isOptional={true}>

Если вы хотите интернационализировать свои метаданные, такие как заголовок страницы, вы можете использовать функцию `generateMetadata`, предоставляемую Next.js. Внутри вы можете получить содержимое из функции `getIntlayer` для перевода ваших метаданных.

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
} satisfies Dictionary<Metadata>;

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
          "es": "Logo Preact",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "ru": "Создано с помощью create next app",
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
      },
    },
  },
};
```

````javascript fileName="src/app/[locale]/layout.msx or src/app/[locale]/page.msx" codeFormat="javascript"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  /**
   * Генерирует объект, содержащий все URL для каждого локаля.
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
    title: t({
      ru: "Мой заголовок",
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      ru: "Мое описание",
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: multilingualUrls[locale],
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Остальной код
````

> Обратите внимание, что функция `getIntlayer`, импортированная из `next-intlayer`, возвращает ваш контент, обернутый в `IntlayerNode`, что позволяет интеграцию с визуальным редактором. В отличие от этого, функция `getIntlayer`, импортированная из `intlayer`, возвращает ваш контент напрямую без дополнительных свойств.

> Узнайте больше об оптимизации метаданных [в официальной документации Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Интернационализация вашего sitemap.xml и robots.txt" isOptional={true}>

Для интернационализации вашего `sitemap.xml` и `robots.txt` вы можете использовать функцию `getMultilingualUrls`, предоставляемую Intlayer. Эта функция позволяет генерировать мультиязычные URL для вашего sitemap.

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
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

import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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

> Узнайте больше об оптимизации карты сайта [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Узнайте больше об оптимизации robots.txt [в официальной документации Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Изменение языка вашего контента" isOptional={true}>

Чтобы изменить язык вашего контента в Next.js, рекомендуется использовать компонент `Link` для перенаправления пользователей на соответствующую локализованную страницу. Компонент `Link` позволяет предварительно загружать страницу, что помогает избежать полной перезагрузки страницы.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
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
              {/* Язык в своей локали - например, Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык в текущей локали - например, Francés с текущей локалью, установленной на Locales.SPANISH */}
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

> Альтернативный способ — использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция не позволит предварительно загружать страницу. Дополнительные сведения см. в [документации хука `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md).

> Вы также можете установить функцию в опции `onLocaleChange` для запуска пользовательской функции при изменении локали.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Остальной код

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Изменить на французский
  </button>
);
```

> Ссылки на документацию:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Создание локализованного компонента ссылки" isOptional={true}>

Чтобы обеспечить, что навигация вашего приложения учитывает текущую локаль, вы можете создать пользовательский компонент `Link`. Этот компонент автоматически добавляет префикс к внутренним URL-адресам с текущим языком. Например, когда пользователь, говорящий на французском, нажимает на ссылку на страницу "О нас", он перенаправляется на `/fr/about` вместо `/about`.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL-адреса помогают поисковым системам правильно индексировать страницы на разных языках и предоставляют пользователям контент на их предпочтительном языке.
- **Согласованность**: Используя локализованную ссылку по всему приложению, вы гарантируете, что навигация остается в текущей локали, предотвращая неожиданные переключения языка.
- **Удобство поддержки**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами, делая ваш код более удобным для поддержки и расширения по мере роста приложения.

Ниже представлена реализация локализованного компонента `Link` на TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Утилита для проверки, является ли данный URL внешним.
 * Если URL начинается с http:// или https://, он считается внешним.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Пользовательский компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок используется `getLocalizedUrl`, чтобы добавить префикс локали к URL (например, /fr/about).
 * Это гарантирует, что навигация остается в контексте текущей локали.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Если ссылка внутренняя и предоставлен корректный href, получить локализованный URL.
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

#### Как это работает

- **Определение внешних ссылок**:  
  Вспомогательная функция `checkIsExternalLink` определяет, является ли URL внешним. Внешние ссылки остаются неизменными, так как они не требуют локализации.

- **Получение текущей локали**:  
  Хук `useLocale` предоставляет текущую локаль (например, `fr` для французского).

- **Локализация URL**:  
  Для внутренних ссылок (т.е. не внешних) используется `getLocalizedUrl`, чтобы автоматически добавить префикс локали к URL. Это означает, что если ваш пользователь находится на французском языке, передача `/about` в качестве `href` преобразуется в `/fr/about`.

- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL, обеспечивая согласованную навигацию в рамках локали.

Интегрируя этот компонент `Link` в ваше приложение, вы поддерживаете согласованный и языково-осведомленный пользовательский опыт, а также улучшаете SEO и удобство использования.

</Step>

<Step number={12} title="Оптимизация размера вашего бандла" isOptional={true}>

Если вам нужна активная локаль внутри Server Action (например, для локализации писем или выполнения логики с учетом локали), вызовите `getLocale` из `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Сделайте что-нибудь с локалью
};
```

> Функция `getLocale` следует каскадной стратегии для определения локали пользователя:
>
> 1. Сначала она проверяет заголовки запроса на наличие значения локали, которое могло быть установлено middleware
> 2. Если локаль не найдена в заголовках, она ищет локаль, сохранённую в cookies
> 3. Если cookie не найдена, она пытается определить предпочитаемый язык пользователя из параметров его браузера
> 4. В крайнем случае она возвращается к настроенной по умолчанию локали приложения
>
> Это гарантирует, что будет выбрана наиболее подходящая локаль на основе доступного контекста.

</Step>

<Step number={13} title="Оптимизировать размер вашего пакета" isOptional={true}>

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Чтобы оптимизировать размер бандла, Intlayer предоставляет опциональный SWC плагин, который интеллектуально заменяет вызовы `useIntlayer` с помощью макросов. Это гарантирует, что словари включаются только в бандлы тех страниц, которые их действительно используют.

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

> Примечание: Эта оптимизация доступна только в Next.js 13 и выше.

> Примечание: Этот пакет не устанавливается по умолчанию, потому что плагин SWC еще находится на этапе экспериментального использования в Next.js. Это может измениться в будущем.

> Примечание: Если вы установите параметр `importMode: 'dynamic'` или `importMode: 'fetch'` (в конфигурации `dictionary`), это будет зависеть от Suspense, поэтому вам придётся обернуть ваши вызовы `useIntlayer` в границу `Suspense`. Это означает, что вы не сможете использовать `useIntlayer` напрямую на верхнем уровне вашего компонента Page / Layout.

</Step>

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

Для получения дополнительной информации о том, как использовать расширение, обратитесь к [документации расширения Intlayer для VS Code](https://intlayer.org/ru/doc/vs-code-extension).

### Продвинутые возможности

Для расширения возможностей вы можете реализовать [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения Next.js 14?">

Поле `i18n` в `next.config.js` не применяется к App Router, поэтому слой локализации - это всегда выбор библиотеки:

- **`next-intl`**, **`next-i18next` / `i18next`** и **`react-intl`**: исторические варианты, основанные на каталогах сообщений JSON или ICU, загружаемых для каждого пространства имён.
- **`Lingui`**: на основе извлечения, с сообщениями ICU, скомпилированными во время сборки.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом, скомпилированный во время сборки в словари для каждого компонента, полностью типизированный, с ИИ-переводом, визуальным редактором и CMS в комплекте.

Практическая разница - в том, что доходит до браузера. Библиотеки на основе пространств имён поставляют на страницу целые каталоги JSON, тогда как Intlayer поставляет только тот контент, который используют отрендеренные компоненты, что сокращает размер бандла и страницы до 50%. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк i18n для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md).

</Question>

<Question title="Насколько i18n увеличивает размер бандла моего Next.js?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Серверные компоненты разрешают свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются, а [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md).

</Question>

<Question title="Могу ли я мигрировать с `next-intl`, `next-i18next` или `i18next`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md) или [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `next-intl`, `react-i18next` и `react-intl`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов - нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Какие версии Next.js поддерживает Intlayer?">

Next.js 12, 13, 14, 15 и 16. Это руководство охватывает Next.js 14. Для Next.js 16 следуйте [руководству по Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md). Для Next.js 15 следуйте [руководству по Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md). Для Pages Router следуйте [руководству по Pages Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="Работает ли Intlayer с React Server Components?">

Да. В Next.js 14 `params` в App Router всё ещё синхронны, поэтому локаль читается напрямую из сегмента маршрута и передаётся провайдеру. Контент разрешается на сервере внутри серверных компонентов, поэтому для серверно отрендеренного текста клиенту не отправляется никакой словарь, а клиентские компоненты читают те же словари через провайдер.

</Question>

<Question title="Должен ли я помещать локаль в URL, например /fr/about?">

Нет. `routing.mode` принимает `"prefix-no-default"` (по умолчанию, `/about` для локали по умолчанию и `/fr/about` для остальных), `"prefix-all"`, `"no-prefix"` (разрешается из cookie, заголовка или домена) и `"search-params"` (`/about?locale=fr`). `routing.domains` сопоставляет каждую локаль с её собственным доменом. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) и [руководство без пути локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="Как добавить теги hreflang и локализованные метаданные для SEO?">

Шаг 8 охватывает `generateMetadata`, а шаг 9 охватывает `sitemap.xml` и `robots.txt`. `getMultilingualUrls` строит карту `alternates.languages` для каждой объявленной локали, включая запись `x-default`, поэтому поисковые системы обслуживают правильную языковую версию.

</Question>

<Question title="Нужен ли мне middleware?">

Именно он определяет локаль посетителя и перенаправляет на соответствующий префикс, поэтому он вам нужен, если только вы не обрабатываете маршрутизацию локали самостоятельно. Шаг 4 показывает конфигурацию, включая matcher, который держит маршруты API, статические ресурсы и `_next` в стороне.

</Question>

<Question title="Как создать локализованный компонент Link?">

Шаг 11 показывает это. Компонент оборачивает `Link` из Next.js и пропускает href через `getLocalizedUrl`, поэтому внутренняя ссылка, написанная как `/about`, становится `/fr/about` для французского посетителя без повторения локали в каждом месте вызова.

</Question>

<Question title="Как автоматически перевести приложение с помощью ИИ?">

Запустите `npx intlayer fill`. Она заполняет недостающие переводы с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск контентом, изменённым в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род и форматированный текст?">

Да: [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) и [форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) для чисел, дат и валют.

</Question>

<Question title="Как переводчики могут редактировать контент, не касаясь кода?">

Через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md), который работает на вашей собственной инфраструктуре и позволяет любому редактировать текст на месте в работающем приложении, или [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), которая выносит контент вовне, чтобы он мог меняться без развёртывания.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да, по лицензии Apache 2.0, включая коммерческое использование. Размещённая CMS - это необязательный платный сервис, который также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
