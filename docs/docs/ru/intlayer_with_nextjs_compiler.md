---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - Полное руководство по переводу вашего приложения"
description: "Больше никакого i18next. Руководство 2026 по созданию многоязычного (i18n) приложения Next.js. Переводите с помощью ИИ-агентов и оптимизируйте размер бандла, SEO и производительность."
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Компилятор
  - ИИ
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Обновление использования API useIntlayer в Solid для прямого доступа к свойствам"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Начальный выпуск"
author: aymericzip
---

# Как сделать многоязычным (i18n) существующее приложение Next.js (руководство i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">

<iframe title="Лучшее i18n решение для Next.js? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Оглавление

<TOC/>

## Почему сложно интернационализировать существующее приложение?

Если вы когда-либо пытались добавить несколько языков в приложение, которое было создано только для одного, вы знаете, как это сложно. Это не просто «сложно», это утомительно. Вам приходится просматривать каждый файл, находить каждую текстовую строку и переносить их в отдельные файлы словарей.

Затем наступает рискованная часть: замена всего этого текста программными хуками без нарушения верстки или логики. Это работа, которая останавливает разработку новых функций на недели и ощущается как бесконечный рефакторинг.

## Что такое компилятор Intlayer?

**Компилятор Intlayer** был создан, чтобы избавить вас от этой рутины. Вместо того чтобы вручную извлекать строки, компилятор делает это за вас. Он сканирует ваш код, находит текст и использует ИИ для генерации словарей в фоновом режиме.
Затем он изменяет ваш код во время сборки (build time), чтобы добавить необходимые i18n-хуки. По сути, вы продолжаете писать приложение так, как будто оно на одном языке, а компилятор автоматически обрабатывает многоязычное преобразование.

> Документация компилятора: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)

### Ограничения

Поскольку компилятор выполняет анализ и преобразование кода (вставку хуков и генерацию словарей) на этапе **компиляции**, он может **замедлить процесс сборки** вашего приложения.

Чтобы смягчить это влияние во время разработки, вы можете настроить компилятор для работы в режиме [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) или полностью отключить его, если он не нужен.

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
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Пакет, интегрирующий Intlayer в Next.js. Он предоставляет контекстные провайдеры и хуки для интернационализации Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также прокси для определения предпочтительного языка пользователя, управления файлами cookie и обработки перенаправлений URL.

</Step>

<Step number={2} title="Настройка проекта">

Создайте файл конфигурации для настройки языков вашего приложения:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.RUSSIAN],
    defaultLocale: Locales.RUSSIAN,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Указывает, должен ли компилятор быть включен.
     */
    enabled: true,

    /**
     * Выходной каталог для оптимизированных словарей.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Вставьте только содержимое в сгенерированный файл, без ключа.
     */
    noMetadata: false,

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     * Таким образом, компилятор можно запустить только один раз для трансформации приложения, а затем удалить.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Это приложение является приложением карт",
  },
};

export default config;
```

> **Примечание**: Убедитесь, что ваш `OPEN_AI_API_KEY` настроен в переменных окружения.

> С помощью этого конфигурационного файла вы можете настроить локализованные URL-адреса, перенаправление прокси, названия куки, расположение и расширение ваших объявлений контента, отключить логи Intlayer в консоли и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Step>

<Step number={3} title="Интеграция Intlayer в конфигурацию Next.js">

Настройте параметры Next.js для использования Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* параметры конфигурации здесь */};

export default withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает сборку файлов объявления контента и отслеживает их изменения в режиме разработки. Он определяет переменные среды Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

</Step>

<Step number={4} title="Настройка Babel">

Компилятору Intlayer требуется Babel для извлечения и оптимизации вашего контента. Обновите ваш `babel.config.js` (или `babel.config.json`), чтобы включить плагины Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

</Step>

<Step number={5} title="Определение языка на ваших страницах">

Удалите все содержимое из `RootLayout` и замените его следующим кодом:

```tsx fileName="src/app/layout.tsx"
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

</Step>

<Step number={6} title="Компиляция компонентов">

При включенном компиляторе вам **больше не нужно** вручную объявлять словари контента (такие как файлы `.content.ts`).

Вместо этого вы можете писать свой контент прямо в коде в виде строк. Intlayer проанализирует ваш код, сгенерирует переводы с помощью настроенного ИИ-провайдера и заменит строки локализованным контентом во время сборки (build time).

Просто пишите свои компоненты с захардкоженными строками на вашем языке по умолчанию. Компилятор позаботится об остальном.

Пример того, как может выглядеть ваша страница:

<Tabs>
<Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Начните с редактирования</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

</Tab>
<Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      ru: {
        getStartedByEditing: "Начните с редактирования",
      },
    }
  }
}
```

</Tab>
</Tabs>

<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerProvider`** монтируется один раз в корневом layout. Он предоставляет locale как серверным, так и клиентским компонентам, поэтому страницы больше не оборачивают себя.
- Без сегмента пути `[locale]` locale всегда берётся из запроса — заголовка `x-intlayer-locale`, установленного прокси Intlayer, затем из cookie locale — которые серверные хуки читают самостоятельно, когда провайдер ещё не запущен.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

- **`IntlayerClientProvider`** используется для предоставления языка компонентам на стороне клиента.
- **`IntlayerServerProvider`** используется для предоставления языка дочерним элементам сервера.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

</Tab>

</Tabs>

</Step>

<Step number={7} title="Заполнение недостающих переводов" isOptional={true}>

Intlayer предоставляет инструмент CLI, помогающий заполнить недостающие переводы. Вы можете использовать команду `intlayer` для проверки и заполнения недостающих переводов в вашем коде.

```bash packageManager="npm"
npx intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="yarn"
yarn intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="pnpm"
pnpm intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="bun"
bun x intlayer test         # Проверить наличие недостающих переводов
```

```bash packageManager="npm"
npx intlayer fill         # Заполнить недостающие переводы
```

```bash packageManager="yarn"
yarn intlayer fill         # Заполнить недостающие переводы
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Заполнить недостающие переводы
```

```bash packageManager="bun"
bun x intlayer fill         # Заполнить недостающие переводы
```

> Для получения более подробной информации обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/ci.md)

</Step>

<Step number={8} title="Настройка прокси для определения языка" isOptional={true}>

Настройте прокси для определения предпочтительного языка пользователя:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` используется для определения предпочтительного языка пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочтительный язык пользователя в куки.

> Начиная с Intlayer v9, этот middleware соблюдает опцию `routing.enableProxy` (`true` по умолчанию). Установите `routing.enableProxy: false` в вашей конфигурации, чтобы превратить его в pass-through без удаления этого файла. См. [примечания к выпуску v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/releases/v9.md).

</Step>

<Step number={9} title="Изменение языка контента" isOptional={true}>

Для изменения языка контента в Next.js рекомендуется использовать компонент `Link` для перенаправления пользователей на соответствующую локализованную страницу. Компонент `Link` обеспечивает предзагрузку страницы, что помогает избежать полной перезагрузки.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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
              {/* Язык - напр. RU */}
              {localeItem}
            </span>
            <span>
              {/* Язык на своем языке - напр. Русский */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Язык на текущем языке - напр. Французский, когда текущий язык Locales.RUSSIAN */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Язык на английском - напр. Russian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Альтернативный способ, использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция не позволит предзагружать страницу. См. [документацию хука `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md) для получения подробной информации.

</Step>

<Step number={10} title="Оптимизация размера бандла" isOptional={true}>

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Для оптимизации размера бандла Intlayer предоставляет дополнительный плагин SWC, который интеллектуально заменяет вызовы `useIntlayer` макросами. Это гарантирует, что словари включаются только в те бандлы страниц, которые их действительно используют.

Плагин `@intlayer/babel` уже интегрирует оптимизацию бандлинга (см. `babel.config.js`). Но плагин `@intlayer/swc` более производителен. Если вы удалите плагин `@intlayer/babel`, вы можете использовать плагин `@intlayer/swc`.

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

> Примечание: Эта оптимизация доступна только для Next.js 13 и выше.

> Примечание: Этот пакет не устанавливается по умолчанию, так как плагины SWC в Next.js все еще являются экспериментальными. Это может измениться в будущем.

> Примечание: Если вы установите параметр `importMode: 'dynamic'` или `importMode: 'fetch'` (в конфигурации `dictionary`), он будет полагаться на Suspense, поэтому вам придется обернуть вызовы `useIntlayer` в границу `Suspense`. Это означает, что вы не сможете использовать `useIntlayer` непосредственно на верхнем уровне вашего компонента Страницы / Лейаута.

</Step>

<Step number={11} title="Извлечение содержимого ваших компонентов" isOptional={true}>

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
<Tab value='Extract command'>

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
<Tab value='Babel compiler'>

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

### Настройка TypeScript

Intlayer использует расширение модулей (module augmentation), чтобы использовать преимущества TypeScript и сделать вашу кодовую базу более надежной.

![Автодополнение](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Ошибка перевода](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Убедитесь, что ваша конфигурация TypeScript включает автоматически созданные типы.

```json5 fileName="tsconfig.json"
{
  // ... Ваши существующие конфигурации TypeScript
  "include": [
    // ... Ваши существующие конфигурации TypeScript
    ".intlayer/**/*.ts", // Включить автоматически созданные типы
  ],
}
```

### Конфигурация Git

Рекомендуется игнорировать файлы, созданные Intlayer. Это позволит избежать их добавления в ваш Git-репозиторий.

Для этого добавьте следующие инструкции в файл `.gitignore`:

```plaintext fileName=".gitignore"
# Игнорировать файлы, созданные Intlayer
.intlayer
```

### Расширение для VS Code

Чтобы улучшить процесс разработки с Intlayer, вы можете установить официальное **расширение Intlayer для VS Code**.

[Установить из VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Это расширение предоставляет:

- **Автодополнение** для ключей перевода.
- **Обнаружение ошибок в реальном времени** для отсутствующих переводов.
- **Инлайновое превью** переведенного контента.
- **Быстрые действия** для легкого создания и обновления переводов.

Для получения подробной информации об использовании расширения см. [документацию расширения Intlayer для VS Code](https://intlayer.org/doc/vs-code-extension).

### Идите дальше

Чтобы пойти еще дальше, вы можете внедрить [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или вынести свой контент во внешнюю среду с помощью [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).

## Часто задаваемые вопросы

<FAQ>

<Question title="Какие существуют решения для интернационализации приложения Next.js?">

Поле `i18n` в `next.config.js` не применяется к App Router, поэтому слой локализации - это всегда выбор библиотеки:

- **`next-intl`**, **`next-i18next` / `i18next`** и **`react-intl`**: каталоги JSON или ICU, загружаемые для каждого пространства имён, с ключами, написанными вручную в каждом месте вызова.
- **`Lingui`**: на основе извлечения, с сообщениями ICU, скомпилированными во время сборки.
- **`Intlayer`**: контент, скомпилированный из ваших компонентов во время сборки, полностью типизированный, с ИИ-переводом, визуальным редактором и CMS.

Это руководство использует настройку с компилятором, где вы продолжаете писать обычные строки в своих компонентах, а словари генерируются за вас. См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) и [бенчмарк i18n для Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md).

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

Нет, и именно это настраивает данное руководство. Вы пишете свои компоненты с обычными строками на вашей локали по умолчанию, а [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) сканирует исходный код при каждой сборке, извлекает текст, видимый пользователю, и генерирует словари, поэтому нет ключей, которые нужно создавать или поддерживать вручную.

Стоит знать о двух ограничениях. Компилятор работает через статический анализ, поэтому строки, существующие только во время выполнения, такие как коды ошибок API или поля CMS, остаются недоступными и всё ещё нуждаются в объявленном словаре. И ему нужно отличать текст, видимый пользователю, от логики приложения вроде `className="active"` или кода статуса, что требует нескольких аннотаций в большой кодовой базе.

Если вы предпочитаете сохранять контроль, `npx intlayer extract` выполняет то же извлечение один раз, на выбранных вами файлах, и записывает файл `.content` рядом с каждым компонентом для вашего просмотра. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Стоит ли использовать компилятор или объявлять контент самостоятельно?">

Используйте компилятор, когда хотите добавить i18n в существующую кодовую базу с минимальными изменениями: ваши компоненты остаются как есть, и словари следуют за ними. Объявляйте контент сами, как показано в [стандартном руководстве по Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md), когда хотите явный контроль над ключами, структурой и переиспользованием. Оба могут сосуществовать в одном слое словарей.

</Question>

<Question title="Зачем мне настраивать Babel?">

Шаг 4 охватывает это. Компилятор читает ваши компоненты через преобразование Babel, поэтому Next.js нужен `babel.config.js`, чтобы прошёл этап извлечения. `npx intlayer init --interactive` создаёт его за вас, когда вы выбираете настройку с компилятором.

</Question>

<Question title="Что происходит со строками, которые компилятор не видит?">

Они остаются непереведёнными, потому что компилятор работает через статический анализ. Всё, что собирается во время выполнения, например сообщение об ошибке API, поле CMS или строка, построенная конкатенацией, должно быть объявлено в файле контента обычным способом. Запустите `npx intlayer test`, чтобы найти то, что отсутствует.

</Question>

<Question title="Как заполнить недостающие переводы?">

Шаг 7 охватывает это. `npx intlayer fill` отправляет извлечённый контент выбранной вами LLM, используя ваш собственный провайдер и API-ключ, а `--git-diff` ограничивает запуск тем, что изменилось в ветке. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Как определяется локаль?">

Шаг 5 читает её в ваших страницах, а шаг 8 добавляет прокси, который разрешает её из URL, cookie или заголовка `Accept-Language`. `routing.mode` решает, появляется ли локаль в пути вообще. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

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
