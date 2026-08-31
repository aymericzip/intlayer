---
createdAt: 2024-12-06
updatedAt: 2026-08-30
title: "Next.js 16 i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Next.js 16. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавить команду init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Добавлено упоминание `x-default` в объекте `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Перевод вашего сайта на Next.js 16 с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Лучшее решение i18n для Next.js? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Демо" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [Шаблон приложения](https://github.com/aymericzip/intlayer-next-16-template) на GitHub.

## Содержание

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

<Steps>

<Step number={1} title="Установка зависимостей">

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [CLI-команд](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Пакет, который интегрирует Intlayer с Next.js. Он предоставляет провайдеры контекста и хуки для интернационализации в Next.js. Кроме того, включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также прокси для определения предпочтительной локали пользователя, управления куки и обработки перенаправления URL.

</Step>

<Step number={2} title="Настройте ваш проект">

Вот окончательная структура, которую мы создадим:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Локальный макет для провайдера Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Корневой макет для стилей и глобальных провайдеров
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
├── package.json
└── tsconfig.json
```

> Если вы не хотите использовать локальный роутинг, intlayer можно использовать как простой провайдер / хук. Смотрите [это руководство](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_no_locale_path.md) для получения подробной информации.

Создайте конфигурационный файл для настройки языков вашего приложения:

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

> С помощью этого файла конфигурации вы можете настроить локализованные URL, прокси-перенаправление, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров обратитесь к [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в вашу конфигурацию Next.js">

Настройте ваш Next.js для использования Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* параметры конфигурации здесь */};

export default withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает сборку файлов деклараций контента и их мониторинг в режиме разработки. Он определяет переменные окружения Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

> Функция `withIntlayer()` является асинхронной функцией. Она позволяет подготовить словари Intlayer перед началом сборки. Если вы хотите использовать её с другими плагинами, вы можете использовать await. Пример:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Если вы хотите использовать его синхронно, вы можете использовать функцию `withIntlayerSync()`. Пример:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer автоматически определяет, использует ли ваш проект **webpack** или **Turbopack**, на основе флагов командной строки `--webpack`, `--turbo` или `--turbopack`, а также вашей текущей **версии Next.js**.
>
> Начиная с `next>=16`, если вы используете **Rspack**, вы должны явно заставить Intlayer использовать конфигурацию webpack, отключив Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Определите динамические маршруты локалей">

Удалите всё из `RootLayout` и замените следующим кодом:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Вы всё ещё можете обернуть children в другие провайдеры, такие как `next-themes`, `react-query`, `framer-motion` и т.д.
  <>{children}</>
);

export default RootLayout;
```

> Оставляя компонент `RootLayout` пустым, вы позволяете установить атрибуты [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) и [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) для тега `<html>`.

Для реализации динамической маршрутизации укажите путь для локали, добавив новый макет в ваш каталог `[locale]`:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Один `IntlayerProvider` охватывает обе части дерева: он инициализирует контекст сервера, привязанный к запросу, который читается серверными хуками, и монтирует клиентского провайдера, чтобы клиентские компоненты получали одну и ту же локаль.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
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

</Tab>
</Tabs>

> Сегмент пути `[locale]` используется для определения локали. Пример: `/en-US/about` будет соответствовать `en-US`, а `/fr/about`, `fr`.

> На этом этапе вы столкнетесь с ошибкой: `Error: Missing <html> and <body> tags in the root layout.`. Это ожидаемо, так как файл `/app/page.tsx` больше не используется и может быть удален. Вместо этого сегмент пути `[locale]` активирует страницу `/app/[locale]/page.tsx`. Следовательно, страницы будут доступны по путям, таким как `/en`, `/fr`, `/es` в вашем браузере. Чтобы установить локаль по умолчанию как корневую страницу, обратитесь к настройке `proxy` в шаге 7.

Затем реализуйте функцию `generateStaticParams` в макете вашего приложения.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Строка для вставки

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Остальная часть кода*/
};

export default LocaleLayout;
```

> `generateStaticParams` гарантирует, что ваше приложение предварительно собирает необходимые страницы для всех локалей, уменьшая вычисления во время выполнения и улучшая пользовательский опыт. Для получения дополнительной информации обратитесь к [документации Next.js по generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer работает с `export const dynamic = 'force-static';`, чтобы обеспечить предварительную сборку страниц для всех локалей.

</Step>

<Step number={5} title="Объявите ваш контент">

Создайте и управляйте объявлениями контента для хранения переводов:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** монтируется один раз в локальном layout. Он предоставляет локаль как серверным, так и клиентским компонентам, поэтому страницы больше не оборачиваются сами в себя.
- Серверные hooks разрешают локаль в следующем порядке: локаль, передаваемая на месте вызова, затем контекст сервера, инициализированный provider'ом, затем локаль, содержащаяся в запросе (заголовок `x-intlayer-locale`, установленный прокси-сервером Intlayer, затем cookie локали). Этот последний шаг — это то, что сохраняет контент в актуальном состоянии при навигации на стороне клиента, которая перестраивает только сегмент страницы, где layout — и вместе с ним provider — не перезапускается.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

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
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

- **`IntlayerClientProvider`** используется для предоставления локали компонентам на стороне клиента. Его можно разместить в любом родительском компоненте, включая макет. Однако рекомендуется размещать его в макете, так как Next.js разделяет код макета между страницами, что делает это более эффективным. Используя `IntlayerClientProvider` в макете, вы избегаете повторной инициализации для каждой страницы, улучшая производительность и поддерживая единый контекст локализации во всем приложении.
- **`IntlayerServerProvider`** используется для предоставления локали дочерним компонентам на сервере. Его нельзя устанавливать в макете.

  > Макет и страница не могут использовать общий серверный контекст, поскольку система серверного контекста основана на хранилище данных для каждого запроса (через механизм [React's cache](https://react.dev/reference/react/cache)), из-за чего каждый "контекст" создаётся заново для разных сегментов приложения. Размещение провайдера в общем макете нарушит эту изоляцию, препятствуя правильной передаче значений серверного контекста вашим серверным компонентам.

</Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Создайте декларацию связанного контента

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

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Создать связанное объявление контента

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` — это изоморфный путь импорта: условие экспорта `react-server` предоставляет серверным компонентам реализацию с окружающей локалью, в то время как клиентские компоненты получают реализацию на основе контекста. Один и тот же вызов работает с обеих сторон.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Создание связанного объявления контента

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

> Если вы хотите использовать ваш контент в атрибуте типа `string`, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, обратитесь к [документации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

> Если ваше приложение уже существует, вы можете использовать [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) в сочетании с [командой extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md), чтобы преобразовать тысячи компонентов за одну секунду.

</Step>

<Step number={7} title="Настройка прокси для определения локали" isOptional={true}>

Настройте прокси для определения предпочитаемой пользователем локали:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` используется для определения предпочтительной локали пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочтительную локаль пользователя в cookie.

> С версии Intlayer v9 это middleware соответствует параметру `routing.enableProxy` (`true` по умолчанию). Установите `routing.enableProxy: false` в вашей конфигурации, чтобы превратить его в pass-through без удаления этого файла. См. [примечания к выпуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/releases/v9.md).

> Если необходимо объединить несколько прокси вместе (например, `intlayerProxy` с аутентификацией или кастомными прокси), Intlayer теперь предоставляет помощник под названием `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Интернационализация ваших метаданных" isOptional={true}>

Если вы хотите интернационализировать ваши метаданные, такие как заголовок вашей страницы, вы можете использовать функцию `generateMetadata`, предоставляемую Next.js. Внутри вы можете получить содержимое из функции `getIntlayer` для перевода ваших метаданных.

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
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
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

> Узнайте больше об оптимизации метаданных [в официальной документации Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Интернационализация ваших sitemap.xml и robots.txt" isOptional={true}>

Чтобы интернационализировать ваши `sitemap.xml` и `robots.txt`, вы можете использовать функцию `getMultilingualUrls`, предоставляемую Intlayer. Эта функция позволяет генерировать многоязычные URL-адреса для вашей карты сайта.

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
            replace // Будет гарантировать, что кнопка "назад" в браузере перенаправит на предыдущую страницу
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

> Альтернативным способом является использование функции `setLocale`, предоставляемой хуком `useLocale`. Эта функция не позволяет предварительно загружать страницу. См. [документацию хука `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md) для получения подробной информации.

> Вы также можете установить функцию в опции `onLocaleChange`, чтобы вызвать пользовательскую функцию при изменении локали.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Остальная часть кода

const { setLocale } = useLocale();

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Переключить на французский
  </button>
);
```

> Ссылки на документацию:
>
> - [хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md)
> - [хук `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocaleName.md)
> - [хук `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getLocalizedUrl.md)
> - [хук `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getHTMLTextDir.md)
> - [атрибут `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [атрибут `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [атрибут `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [атрибут `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={11} title="Создание локализованного компонента Link" isOptional={true}>

Чтобы навигация вашего приложения соответствовала текущей локали, вы можете создать кастомный компонент `Link`. Этот компонент автоматически добавляет префикс текущего языка к внутренним URL-адресам. Например, когда франкоязычный пользователь нажимает на ссылку "О нас", он перенаправляется на `/fr/about` вместо `/about`.

Это поведение полезно по нескольким причинам:

- **SEO и пользовательский опыт**: Локализованные URL-адреса помогают поисковым системам правильно индексировать страницы на определенных языках и предоставляют пользователям контент на их предпочтительном языке.
- **Согласованность**: Используя локализованную ссылку во всем приложении, вы гарантируете, что навигация остается в пределах текущей локали, предотвращая неожиданные переключения языков.
- **Поддержка**: Централизация логики локализации в одном компоненте упрощает управление URL-адресами, делая ваш код более простым в поддержке и расширении по мере роста вашего приложения.

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
 * Кастомный компонент Link, который адаптирует атрибут href в зависимости от текущей локали.
 * Для внутренних ссылок он использует `getLocalizedUrl` для добавления префикса локали к URL (например, /fr/about).
 * Это гарантирует, что навигация остается в контексте той же локали.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Если ссылка внутренняя и указан валидный href, получаем локализованный URL.
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
  Для внутренних ссылок (т. е. не внешних) используется `getLocalizedUrl` для автоматического добавления префикса текущей локали к URL. Это означает, что если ваш пользователь находится на французской версии сайта, передача `/about` в качестве `href` преобразует его в `/fr/about`.

- **Возврат ссылки**:  
  Компонент возвращает элемент `<a>` с локализованным URL, обеспечивая соответствие навигации локали.

Интегрируя этот компонент `Link` во все приложение, вы поддерживаете согласованный и учитывающий язык пользовательский интерфейс, а также извлекаете выгоду из улучшенного SEO и удобства использования.

</Step>

<Step number={12} title="Получение текущей локали в Server Actions" isOptional={true}>

Если вам нужна активная локаль внутри Server Action (например, для локализации электронных писем или запуска логики, зависящей от локали), вызовите `getLocale` из `next-intlayer/server`:

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
> 1. Сначала она проверяет заголовки запроса на наличие значения локали, которое могло быть установлено прокси.
> 2. Если локаль не найдена в заголовках, она ищет локаль, сохраненную в куки.
> 3. Если куки не найдены, она пытается определить предпочтительный язык пользователя по настройкам его браузера.
> 4. В крайнем случае она возвращается к настроенной в приложении локали по умолчанию.
>
> Это гарантирует выбор наиболее подходящей локали на основе доступного контекста.

</Step>

<Step number={13} title="Оптимизация размера вашего бандла" isOptional={true}>

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Для оптимизации размера бандла Intlayer предоставляет дополнительный плагин SWC, который интеллектуально заменяет вызовы `useIntlayer` с помощью макросов. Это гарантирует, что словари включаются в бандлы только для тех страниц, которые их действительно используют.

Чтобы включить эту оптимизацию, установите пакет `@intlayer/swc`. После установки `next-intlayer` автоматически обнаружит и начнет использовать плагин:

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

> Примечание: Эта оптимизация доступна только для Next.js 13 и выше.

> Примечание: Этот пакет не устанавливается по умолчанию, так как плагины SWC всё ещё являются экспериментальными в Next.js. Это может измениться в будущем.

> Примечание: Если вы установите опцию `importMode: 'dynamic'` или `importMode: 'fetch'` (в конфигурации `dictionary`), она будет полагаться на Suspense, поэтому вам придется обернуть ваши вызовы `useIntlayer` в границу `Suspense`. Это означает, что вы не сможете использовать `useIntlayer` непосредственно на верхнем уровне вашего компонента Page / Layout.
> </Step>

</Step>

<Step number={1} title="Извлечение содержимого ваших компонентов" isOptional={true}>

Если у вас есть существующая кодовая база, преобразование тысяч файлов может занять много времени.

Чтобы упростить этот процесс, Intlayer предлагает [компилятор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) / [экстрактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) для преобразования ваших компонентов и извлечения содержимого.

Чтобы настроить его, вы можете добавить раздел `compiler` в ваш файл `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Остальная часть вашей конфигурации
  compiler: {
    /**
     * Указывает, должен ли быть включен компилятор.
     */
    enabled: true,

    /**
     * Определяет путь к выходным файлам
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Указывает, должны ли компоненты сохраняться после преобразования. Таким образом, компилятор можно запустить только один раз для преобразования приложения, а затем удалить.
     */
    saveComponents: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Команда извлечения'>

Запустите экстрактор для преобразования компонентов и извлечения содержимого

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
 <Tab value='Компилятор Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Извлечение содержимого из компонентов в словари
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Или npm run dev
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

### Отслеживание изменений словарей в Turbopack

При использовании Turbopack в качестве сервера разработки с помощью команды `next dev` изменения в словарях по умолчанию не будут обнаруживаться автоматически.

Это ограничение возникает из-за того, что Turbopack не может запускать плагины webpack параллельно для мониторинга изменений в ваших файлах контента. Чтобы обойти это, вам нужно будет использовать команду `intlayer watch`, чтобы одновременно запустить сервер разработки и наблюдатель за сборкой Intlayer.

```json5 fileName="package.json"
{
  // ... Ваши существующие конфигурации package.json
  "scripts": {
    // ... Ваши существующие конфигурации скриптов
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Если вы используете next-intlayer@<=6.x.x, вам нужно оставить флаг `--turbopack`, чтобы приложение Next.js 16 корректно работало с Turbopack. Мы рекомендуем использовать next-intlayer@>=7.x.x, чтобы избежать этого ограничения.

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы получить преимущества TypeScript и сделать вашу кодовую базу более надежной.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автоматически сгенерированные типы.

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

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволяет избежать их коммита в ваш Git-репозиторий.

Для этого вы можете добавить следующие инструкции в ваш файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение VS Code

Чтобы улучшить ваш опыт разработки с Intlayer, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Встроенный предварительный просмотр** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Более подробную информацию о том, как использовать расширение, можно найти в [документации расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Идите дальше

Чтобы пойти дальше, вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или экстернализировать ваш контент с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения Next.js?">

У Next.js нет встроенного слоя сообщений с тех пор, как поле `i18n` в `next.config.js` перестало применяться к App Router, поэтому слой локализации - это всегда выбор библиотеки:

- **`next-intl`**, **`i18next` / `next-i18next`** и **`react-intl`**: исторические варианты, основанные на каталогах сообщений JSON или ICU, загружаемых для каждого пространства имён.
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

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши компоненты, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. Шаг 14 этого руководства проводит вас через это.

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки: он сканирует исходный код JSX, TSX, Vue и Svelte при каждом изменении, генерирует словари и поддерживает их синхронизацию через горячую замену модулей, поэтому вручную поддерживать ключи вообще не нужно.

Стоит знать о двух ограничениях, прежде чем включать компилятор. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, такие как коды ошибок API или поля CMS, остаются недоступными. И ему нужно отличать текст, видимый пользователю, от логики приложения вроде `className="active"` или кода статуса, что требует нескольких аннотаций в большой кодовой базе. [Команда extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md) избегает обоих ограничений, оставляя вас в процессе.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Работает ли Intlayer с Next.js App Router и React Server Components?">

Да. `next-intlayer` создан для App Router: контент разрешается на сервере внутри серверных компонентов, поэтому для серверно отрендеренного текста клиенту не отправляется никакой словарь. Клиентские компоненты используют тот же хук `useIntlayer` через провайдер. Intlayer не блокирует статический рендеринг и совместим с Turbopack.

</Question>

<Question title="Какие версии Next.js поддерживает Intlayer?">

Intlayer поддерживает Next.js 12, 13, 14, 15 и 16. Это руководство охватывает Next.js 16. Для более старых настроек следуйте [руководству по Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md), [руководству по Next.js 14](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_14.md) или [руководству по Pages Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="Должен ли я помещать локаль в URL, например /fr/about?">

Нет. Схема URL - это опция конфигурации, а не ограничение. `routing.mode` принимает:

- `"prefix-no-default"` (по умолчанию): `/about` для локали по умолчанию, `/fr/about` для остальных.
- `"prefix-all"`: каждая локаль имеет префикс, `/en/about` и `/fr/about`.
- `"no-prefix"`: нет локали в пути, разрешается из cookie, заголовка или домена.
- `"search-params"`: `/about?locale=fr`.

Вы также можете сопоставить каждую локаль с её собственным доменом с помощью `routing.domains`. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) и [руководство без пути локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="Как добавить теги hreflang и локализованные метаданные для SEO?">

Используйте функцию `generateMetadata` из Next.js вместе с `getMultilingualUrls` из Intlayer. Она строит карту `alternates.languages` для каждой объявленной локали, включая запись `x-default`, поэтому поисковые системы обслуживают правильную языковую версию. Тот же помощник локализует `sitemap.ts` и `robots.ts`. Шаг 8 и шаг 9 этого руководства показывают полный код.

</Question>

<Question title="Как автоматически перевести приложение Next.js с помощью ИИ?">

Запустите `npx intlayer fill`. CLI обнаруживает недостающие переводы во всех ваших файлах контента и заполняет их с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, поэтому вы платите провайдеру напрямую и ничего не проходит через третью сторону. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Поддерживает ли Intlayer множественное число, род, условия и форматированный текст?">

Да. Объявления контента поддерживают [формы множественного числа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/plurial.md), [контент на основе рода](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/gender.md), условия, [вставки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md) для интерполированных значений и [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md) для форматированного текста, такого как юридические страницы или тела блогов. Числа, даты и валюты обрабатываются [форматтерами](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md).

</Question>

<Question title="Как переводчики и не-разработчики могут редактировать контент?">

Два варианта, оба опциональные. [Визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) работает на вашей собственной инфраструктуре и позволяет любому кликнуть на текст вашего сайта, чтобы отредактировать его на месте. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) выносит контент вовне, чтобы его можно было обновлять без развёртывания, при этом [живая синхронизация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/live.md) отражает изменения во время выполнения.

</Question>

<Question title="Как отловить недостающие переводы перед выпуском?">

Запустите `npx intlayer test` в CI. Она проваливает сборку, когда объявленной локали не хватает контента, поэтому непереведённая строка никогда не попадёт в продакшен. [Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md) показывает те же ошибки по мере набора, а [плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md) и его правило `no-raw-text` ловят жёстко закодированные строки. См. [тестирование вашего контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да. Intlayer имеет открытый исходный код по лицензии Apache 2.0, и вся библиотека, CLI, визуальный редактор и компилятор бесплатны в использовании, в том числе в коммерческих целях. Размещённая CMS - это необязательный платный сервис, и его также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
