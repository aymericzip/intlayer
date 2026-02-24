---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Как сделать существующее приложение Next.js мультиязычным (i18n) позднее (Руководство по i18n 2026)
description: Узнайте, как сделать ваше существующее приложение Next.js мультиязычным, используя компилятор Intlayer. Следуйте документации для интернационализации (i18n) и перевода с использованием ИИ.
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
  - конфигурация
  - nextjs
  - компилятор
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Первоначальный релиз
---

# Как сделать существующее приложение Next.js мультиязычным (i18n) позднее (Руководство по i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Видео" value="video">
  
<iframe title="Лучшее i18n решение для Next.js? Откройте для себя Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Код" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Смотрите [шаблон приложения](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Оглавление

<TOC/>

## Почему сложно интернационализировать существующее приложение?

Если вы когда-либо пытались добавить несколько языков в приложение, которое было создано только для одного, вы знаете, как это больно. Это не просто "сложно" - это утомительно. Приходится просматривать каждый файл, находить каждую текстовую строку и переносить ее в отдельные файлы словарей.

А затем наступает самая рискованная часть: замена всего этого текста на хуки (hooks) кода, не сломав макет (layout) или логику. Это та работа, которая останавливает разработку новых функций на недели и ощущается как бесконечный рефакторинг.

## Что такое компилятор Intlayer?

**Компилятор Intlayer** был создан, чтобы избавить вас от этой рутины. Вместо того, чтобы вручную извлекать строки, за вас это делает компилятор. Он сканирует ваш код, находит текст и использует ИИ для автогенерации словарей в фоновом режиме.
Во время сборки (build) проекта, он изменяет ваш код, чтобы добавить необходимые i18n хуки. По сути, вы продолжаете писать приложение так, как будто оно на одном языке, а компилятор автоматически обрабатывает многоязычное преобразование.

> Документация по компилятору: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md

### Ограничения

Поскольку компилятор выполняет анализ и преобразование кода (вставку хуков и генерацию словарей) **во время компиляции**, он может **замедлить процесс сборки** вашего приложения.

Чтобы смягчить это влияние во время разработки, вы можете настроить компилятор на работу в режиме [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) или отключить его, когда он не нужен.

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

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Пакет, интегрирующий Intlayer в Next.js. Предоставляет контекстные провайдеры и хуки для Next.js. Дополнительно включает плагин Next.js для интеграции с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также прокси для определения языка пользователя, управления файлами cookie и перенаправления URL (redirecting).

### Шаг 2: Настройте свой проект

Создайте файл конфигурации, чтобы определить языки вашего приложения:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Можно переключить в 'build-only', чтобы избежать замедлений при dev-разработке
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Отключаем префиксы вроде 'comp-'
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Это приложение — просто карты (maps app)",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Можно переключить в 'build-only', чтобы избежать замедлений при dev-разработке
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Отключаем префиксы вроде 'comp-'
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Это приложение — просто карты (maps app)",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Можно переключить в 'build-only', чтобы избежать замедлений при dev-разработке
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Отключаем префиксы вроде 'comp-'
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Это приложение — просто карты (maps app)",
  },
};

module.exports = config;
```

> **Примечание**: Убедитесь, что вы настроили свой `OPEN_AI_API_KEY` в переменных окружения.

> С помощью этого файла конфигурации вы можете настроить локализованные URL-адреса, перенаправление прокси-серверов, имена файлов cookie, местоположение и расширение ваших объявлений контента, отключить журналы консоли Intlayer и многое другое. Полный список доступных параметров см. в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

### Шаг 3: Интеграция Intlayer в конфигурацию Next.js

Настройте параметры Next.js на использование Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* сюда передавайте необходимые параметры */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* сюда передавайте необходимые параметры */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* сюда передавайте необходимые параметры */
};

module.exports = withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает компиляцию файлов словарей и контролирует их изменения. Определяет среду Intlayer как в [Webpack](https://webpack.js.org/), так и в [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). В довершение всего, он добавляет алиасы (алиасы) для лучшей оптимизации компонентов Server Components.

### Шаг 4: Настройка параметров компонентов RootLayout

Очистите содержимое внутри `RootLayout` и замените на следующий код:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
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
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
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

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

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

### Шаг 5: Объявление вашего контента (автоматически)

При включенном компиляторе вам **больше не нужно** вручную объявлять словари контента (такие как файлы `.content.ts`).

Вместо этого вы можете просто написать свой контент непосредственно в коде в виде строк. Intlayer проанализирует ваш код, сгенерирует переводы, используя настроенного провайдера ИИ, и заменит строки на локализованный контент во время компиляции.

### Шаг 6: Используем перевод

Просто пишите компоненты с захардкоденными строками прямо в дефолтной локали (на вашем родном языке). Остальное сделает компилятор.

К примеру страница `page.tsx` будет выглядеть так:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const PageContent: FC = () => {
  return (
    <>
      <p>Начните редактирование</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Начните редактирование</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Начните редактирование</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** используется для обеспечения локализации дочерних узлов Server-Side.
- **`IntlayerServerProvider`** необходим для распространения языковой привязки серверным компонентам (SSR).

### (Необязательно) Шаг 7: Конфигурация прокси-сервера

Установка прокси на авто-обнаружение языковых предпочтений пользователя:

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

> Прокси `intlayerProxy` анализирует предпочтительную языковую версию (из cookie-файлов или браузера), перенаправляет трафик по [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) и запоминает ее путем установки cookie.

### (Необязательно) Шаг 8: Смена локали (Переключатель языков)

Чтобы менять язык, лучшее решение это NextJS компонент `Link`, который будет грамотно производить _prefetch_ статики для страниц и не будет вызывать жесткую перезагрузку приложения (full page reload).

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
              {/* Локаль - напр. RU */}
              {localeItem}
            </span>
            <span>
              {/* Локаль на своем собственном языке - напр. Русский */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Локаль на текущем языке - напр. Французский (если текущая локаль ru-RU) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Локаль на английском - напр. Russian */}
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
              {/* Локаль - напр. RU */}
              {localeItem}
            </span>
            <span>
              {/* Локаль на своем собственном языке - напр. Русский */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Локаль на текущем языке - напр. Французский (если текущая локаль ru-RU) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Локаль на английском - напр. Russian */}
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
              {/* Локаль - напр. RU */}
              {localeItem}
            </span>
            <span>
              {/* Локаль на своем собственном языке - напр. Русский */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Локаль на текущем языке - напр. Французский (если текущая локаль ru-RU) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Локаль на английском - напр. Russian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Кроме прочего, вы можете устанавливать свойства локали через функцию `setLocale` из хука `useLocale`. Более сложный и продвинутый функционал детально описан по ссылке: [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md).

### (Необязательно) Шаг 9: Автоматизации на стороне сервера.

Для использования текущего языка выполнения в функциях Server Actions (пример для отправки e-mail рассылок на разных языках, либо в API запросах) предусмотрена отдельная функция `getLocale` из пакета `@next-intlayer/server` :

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Добавьте логику обработки.
};
```

> Функция получения локали работает через стратегию каскадных резервных путей (fallbacks) в строгом соответствии с приоритизацией:
>
> 1. Если заданы параметры поиска - он ищет из них (Next Request header/query).
> 2. При перенаправлениях, если установлена Cookie - используется она.
> 3. Анализирует настройки предпочтений пользователя ОС \ устройства (User preferences ОС \ User-Agent).
> 4. Все сломалось? Установки файла `intlayer.config.ts` в качестве default (Default locale).

### (Необязательно) Шаг 10: Ускорение рендера: Плагин SWC

В связи со слабой встроенной поддержкой Next.js (через Webpack) и неимением встроенного парсинга `Chunk/Bundle` словарей по файлам. И для того чтобы оптимизировать загрузку приложения, рекомендуется использовать плагин расширения `@intlayer/swc`. Плагин удаляет (заменяет в самом билде) "мертвый" функционал и подключает нужные словари строго по месту использования - что критически экономит ресурсы.

Для его запуска используйте:

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

> Важное примечание. Это для проектов которые юзают новую базу (SWC \ Turbopack) (т.е. Next.js >=13 версии).

> Имейте ввиду плагин `@intlayer/swc` все еще помечен флажками "Экспериментальный" в исходном коде фреймворка (так как `Vercel\Next` все еще не до конца выпустили свой SWC Plugin API в стейбл).

> При использовании Next.js `<Suspense>` с опциями `importMode` равными `dynamic` или `fetch` для `useIntlayer` нужно помнить, что хук переводит запрос в асинхронный (рендер останавливается и ждет получения данных из сети \ файла на диске). В компоненте его рекомендуется "обрамить" вызовом React Suspense в противном случае Next упадет с ошибкой (в случае отсутствия Suspense Next.js зависает с ошибкой компиляции).

### Настройка наблюдателя (Watch-файлов) - Для проектов на Turbopack

В отличие от стандартного Webpack - Turbopack, являясь относительно новым бандлером от команды Vercel, в режиме разработки `next dev` может обрываться или теряться, если плагины пытаются сбилдится на параллельных процессах - (Intlayer может обновлять сгенерированное хранилище `JSON` прямо по ходу верстки файлов без рестарта).
Поэтому для Turbopack добавлен свой отдельный CLI наблюдатель `intlayer watch`, который прослушивает процессы и запускает Next по-особенному.

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Вот так мы добавляем Turbopack-fix!
  },
}
```

> Если ваша версия плагинов `< ` `Intlayer @6.x.x` то `Intlayer Turbopack Watcher` потребует установки флага: `--turbopack`. Если у вас свежая версия (>= `Intlayer @7.0.0`), все будет работать из коробки автоматически.

### Настройка под TypeScript

Компилятор под капотом использует TypeScript фичу "Type Module augmentation" которая генерирует виртуальный "Module/Map". Для успешной подсветки синтаксиса, а также исключения неверных параметров, ваш текстовый редактор VS Code \ Cursor должен иметь возможность провалиться к этим типам:

![Пример Автокомплита (Auto Completion View)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Обработка исключений перевода (Errors View)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Вам нужно всего-лишь добавить виртуальную директорию `.intlayer/**/*.ts` в параметр "Includes" к вашему конфигу TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... ваш JSON ...
  "include": [
    // ... ваш include лист ...
    ".intlayer/**/*.ts", // Сюда падают все авто-сгенерированные TypeScript Типы
  ],
}
```

### Git - Как добавлять в игнор

Кодогенерация компилятором генерирует файлы на лету в режиме реального времени - это значит, что при пуше в репозиторий папки `.intlayer` вы можете получать регулярные merge conflicts. Поэтому важно исключить ее из индексации в вашем Git:

```plaintext fileName=".gitignore"
# Этот файл мы не должны включать
.intlayer
```

### Настройка VS Code (Сниппеты и Подсветка)

Intlayer специально создавал для программистов отдельный пакет для VS Code: **Intlayer VS Code Extension**.

Плагин берет на себя все заботы. Вы можете скачать его тут - [Расширение Intlayer в VS Code магазине](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension).

Чем этот плагин полезен?

- **Умное дополнение кода**: Очередная суперфункция по поиску нужных ключей словарей через "Intellisence VS code IDE".
- **Интерактивный Error Log (Linting)**: Подсвечивает прямо в редакторе если строка с ключем в словарях пропущена, или ключ уже не актуален.
- **Инлайн-перевод (On-Hover pop-ups)**: Вы наводите курсор мыши в коде на хук `useIntlayer()` и во всплывающем окошке сразу читаете готовый текст для разных языков, без переключения между файлами словарей и кода компонентов.
- **Hot-Keys \ Snippets**: Быстро переформирует словарь или компонент одной командной клавишей в вашем реакте.

Детально о настройке можете почитать [тут](https://intlayer.org/doc/vs-code-extension).

### Что можно сделать еще?

После изучения основ, Next JS CMS (Управление системой контента сайта без кодинга) можно реализовать через удобный визуальный редактор: [Настройка и подключение Visual Editor к React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) или создать внешний API сервер с CMS без хранения контента в сборке (на облаке). Изучите более [развернутое руководство CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md).
