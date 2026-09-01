---
createdAt: 2026-01-10
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
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Первоначальный релиз"
author: aymericzip
---

# Переведите ваш сайт Next.js 16 (без [locale] в пути страницы) с помощью Intlayer | Интернационализация (i18n)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Лучшее i18n-решение для Next.js? Узнайте об Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, переводов, [декларации контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

Пакет, который интегрирует Intlayer с Next.js. Он предоставляет context providers и хуки для интернационализации в Next.js. Дополнительно он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также прокси для определения предпочтительной локали пользователя, управления cookies и обработки перенаправлений URL.

</Step>

<Step number={2} title="Настройка вашего проекта">

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
  routing: {
    mode: "search-params", // или `no-prefix`, полезно для обнаружения в middleware
  },
};

export default config;
```

> С помощью этого файла конфигурации вы можете настроить локализованные URL, перенаправление через прокси, имена cookie, расположение и расширение ваших деклараций контента, отключить логи Intlayer в консоли и многое другое. Для полного списка доступных параметров см. [документацию по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Next.js">

Настройте ваш проект Next.js для использования Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* параметры конфигурации здесь */};

export default withIntlayer(nextConfig);
```

> Плагин `withIntlayer()` Next.js используется для интеграции Intlayer с Next.js. Он обеспечивает построение файлов объявления контента и отслеживает их в режиме разработки. Он определяет переменные окружения Intlayer в окружениях [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет псевдонимы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

> Функция `withIntlayer()` — это асинхронная функция. Она позволяет подготовить словари intlayer перед началом сборки. Если вы хотите использовать её с другими плагинами, вы можете ожидать её выполнения. Пример:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Если вы хотите использовать её синхронно, вы можете использовать функцию `withIntlayerSync()`. Пример:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

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

</Step>

<Step number={4} title="Определение динамических маршрутов локализации">

Удалите всё из `RootLayout` и замените его следующим кодом:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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

> Один `IntlayerProvider` охватывает обе части дерева: он инициализирует контекст сервера с областью действия запроса, который читается серверными хуками, и монтирует клиентский провайдер, чтобы клиентские компоненты получали ту же локаль.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

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
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

 </Tab>
</Tabs>

</Step>

<Step number={5} title="Объявите ваш контент">

Создавайте и управляйте вашими объявлениями контента для хранения переводов:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Ваши объявления контента могут быть определены в любом месте вашего приложения, при условии что они включены в директорию `contentDir` (по умолчанию `./src`). И соответствуют расширению файла объявления контента (по умолчанию `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Для получения подробной информации обратитесь к [документации по объявлениям контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md).

</Step>

<Step number={6} title="Использование контента в коде">

Получайте доступ к словарям контента по всему приложению:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** монтируется один раз в корневом макете. Он предоставляет локаль как серверным, так и клиентским компонентам, поэтому страницы больше не оборачиваются сами в себя.
- Без сегмента пути `[locale]` локаль всегда поступает из запроса — заголовка `x-intlayer-locale`, установленного прокси Intlayer, затем из cookie локали — которые серверные хуки читают самостоятельно, когда провайдер еще не был запущен.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
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

- **`IntlayerClientProvider`** используется для предоставления locale клиентским компонентам. Его можно разместить в любом родительском компоненте, включая layout. Однако рекомендуется помещать его в layout, потому что Next.js использует общий код layout между страницами, что делает это более эффективным. Используя `IntlayerClientProvider` в layout, вы избегаете повторной инициализации на каждой странице, повышаете производительность и поддерживаете единый контекст локализации во всём приложении.
- **`IntlayerServerProvider`** используется для предоставления locale серверным дочерним компонентам. Его нельзя установить в layout.

> Layout и page не могут разделять общий server context, потому что система server context основана на хранилище данных, привязанном к каждому запросу (через механизм [React's cache](https://react.dev/reference/react/cache)), из‑за чего каждый «context» воссоздаётся для разных сегментов приложения. Размещение provider в общем layout нарушит эту изоляцию и помешает корректной передаче значений server context в ваши server components.

</Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> `next-intlayer` — это изоморфный путь импорта: условие экспорта `react-server` предоставляет компонентам сервера реализацию ambient-locale, а клиентским компонентам — реализацию на основе контекста. Один и тот же вызов работает с обеих сторон.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

> Если вы хотите использовать содержимое в строковом атрибуте, таком как `alt`, `title`, `href`, `aria-label` и т.д., вы должны вызвать значение функции, например:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Чтобы узнать больше о хуке `useIntlayer`, см. [документацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useIntlayer.md).

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

> Прокси `intlayerProxy` используется для определения предпочитаемой локали пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочитаемую локаль пользователя в cookie.

> Начиная с версии Intlayer v9, этот middleware соблюдает опцию `routing.enableProxy` (`true` по умолчанию). Установите `routing.enableProxy: false` в вашей конфигурации, чтобы превратить его в pass-through без удаления этого файла. См. [примечания к выпуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/releases/v9.md).

> Если требуется связать несколько прокси вместе (например, `intlayerProxy` с прокси авторизации или пользовательскими прокси), Intlayer предоставляет вспомогательную функцию `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Изменение языка вашего контента" isOptional={true}>

Чтобы изменить язык содержимого в Next.js, рекомендуется использовать компонент `Link`, чтобы перенаправлять пользователей на соответствующую локализованную страницу. Компонент `Link` поддерживает предзагрузку страницы (prefetch), что помогает избежать полной перезагрузки страницы.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* Локаль, например FR */}
              {localeItem}
            </span>
            <span>
              {/* Название языка в своей локали, например Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Название языка в текущей локали, например Francés при текущей локали Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Название языка на английском, напр., French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативный способ, использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция не будет позволять предзагружать страницу. См. документацию по хуку [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md) для получения дополнительных сведений.

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

</Step>

<Step number={9} title="Получить текущую локаль в Server Actions" isOptional={true}>

Если вам нужна активная локаль внутри Server Action (например, для локализации писем или выполнения логики с учетом локали), вызовите `getLocale` из `next-intlayer/server`:

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

</Step>

<Step number={10} title="Оптимизируйте размер бандла" isOptional={true}>

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Чтобы оптимизировать размер бандла, Intlayer предоставляет опциональный SWC-плагин, который интеллектуально заменяет вызовы `useIntlayer` с помощью макросов. Это гарантирует, что словари будут включаться в бандлы только для тех страниц, которые действительно их используют.

Чтобы включить эту оптимизацию, установите пакет `@intlayer/swc`. После установки `next-intlayer` автоматически обнаружит и начнёт использовать плагин:

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

> Примечание: Этот пакет не устанавливается по умолчанию, поскольку SWC-плагины в Next.js всё ещё экспериментальны. Это может измениться в будущем.

> Примечание: Если установить опцию как `importMode: 'dynamic'` или `importMode: 'fetch'` (in the `dictionary` configuration), будет полагаться на Suspense, поэтому вам придётся оборачивать вызовы `useIntlayer` в границу `Suspense`. Это означает, что вы не сможете использовать `useIntlayer` прямо на верхнем уровне вашего компонента Page / Layout.
> </Step>

</Steps>

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

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения Next.js?">

Поле `i18n` в `next.config.js` не применяется к App Router, поэтому слой локализации - это всегда выбор библиотеки:

- **`next-intl`**, **`next-i18next` / `i18next`** и **`react-intl`**: каталоги JSON или ICU, загружаемые для каждого пространства имён.
- **`Lingui`**: на основе извлечения, с сообщениями ICU, скомпилированными во время сборки.
- **`Intlayer`**: контент, объявленный рядом с каждым компонентом и скомпилированный по компонентам, полностью типизированный, с ИИ-переводом, визуальным редактором и CMS.

Это руководство охватывает настройку без локали в пути. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк i18n для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md).

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

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши компоненты, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной.

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

<Question title="Зачем обслуживать приложение без локали в URL?">

Потому что локаль не всегда является частью идентичности страницы. У аутентифицированной панели управления, внутреннего инструмента или приложения за логином нет причин выставлять `/fr/` в каждом URL: язык - это пользовательская настройка, а не другой документ. Отказ от префикса также держит ваши маршруты, ваши ссылки и вашу аналитику на едином наборе путей.

</Question>

<Question title="Каковы последствия для SEO при отсутствии локали в URL?">

Они реальны, поэтому выбирайте осознанно. Без отдельного URL для каждого языка у поисковых систем нет отдельной страницы для индексации каждой локали, `hreflang` некуда указывать, и краулер видит только тот язык, который обслуживает ваше определение по умолчанию. Это нормально для контента за логином, который всё равно не индексируется, и плохо подходит для публичного маркетингового сайта или документации. Если органический трафик по языкам имеет значение, используйте вместо этого настройку с префиксом из [руководства по Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md).

</Question>

<Question title="В чём разница между режимами `no-prefix` и `search-params`?">

`"no-prefix"` полностью держит локаль вне URL и разрешает её из cookie, заголовка или домена, поэтому каждый язык делит один адрес. `"search-params"` помещает её в строку запроса как `/dashboard?locale=fr`, что всё же даёт каждому языку отдельный URL, на который можно сослаться и добавить в закладки, без изменения вашего дерева маршрутов. Предпочтите `"search-params"`, когда хотите ссылки, которыми можно делиться, для каждого языка.

</Question>

<Question title="Как же тогда определяется локаль?">

Из источников, перечисленных в `routing.storage`, по умолчанию сначала cookie, а затем заголовок `Accept-Language`, с откатом к вашей локали по умолчанию. Шаг 7 добавляет прокси, который её применяет. Язык, который пользователь выбирает явно, сохраняется, поэтому переживает следующий визит. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Могу ли я вместо этого сопоставить каждый язык с его собственным доменом?">

Да, и это вариант, который стоит рассмотреть, если вы отказались от префикса по косметическим причинам, но всё ещё хотите SEO. `routing.domains` сопоставляет локаль с именем хоста, поэтому домен идентифицирует язык, префикс к пути не добавляется, и каждый язык получает индексируемый URL, на который может указывать `hreflang`.

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
