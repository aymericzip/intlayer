---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Превращение существующего приложения Next.js в многоязычное приложение в 2026
description: Узнайте, как сделать ваше существующее приложение Next.js многоязычным с помощью компилятора Intlayer. Следуйте документации для интернационализации (i18n) и перевода вашего приложения с помощью ИИ.
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
  - version: 8.1.6
    date: 2026-02-23
    changes: Начальный выпуск
---

# Как сделать многоязычным (i18n) существующее приложение Next.js (руководство i18n 2026)

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

См. [Шаблон приложения](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) на GitHub.

## Оглавление

<TOC/>

## Почему сложно интернационализировать существующее приложение?

Если вы когда-либо пытались добавить несколько языков в приложение, которое было создано только для одного, вы знаете, как это сложно. Это не просто «сложно» — это утомительно. Вам приходится просматривать каждый файл, находить каждую текстовую строку и переносить их в отдельные файлы словарей.

Затем наступает рискованная часть: замена всего этого текста программными хуками без нарушения верстки или логики. Это работа, которая останавливает разработку новых функций на недели и ощущается как бесконечный рефакторинг.

## Что такое компилятор Intlayer?

**Компилятор Intlayer** был создан, чтобы избавить вас от этой рутины. Вместо того чтобы вручную извлекать строки, компилятор делает это за вас. Он сканирует ваш код, находит текст и использует ИИ для генерации словарей в фоновом режиме.
Затем он изменяет ваш код во время сборки, чтобы добавить необходимые i18n-хуки. По сути, вы продолжаете писать приложение так, как будто оно на одном языке, а компилятор автоматически обрабатывает многоязычное преобразование.

> Документация компилятора: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md)

### Ограничения

Поскольку компилятор выполняет анализ и преобразование кода (вставку хуков и генерацию словарей) на этапе **компиляции**, он может **замедлить процесс сборки** вашего приложения.

Чтобы смягчить это влияние во время разработки, вы можете настроить компилятор для работы в режиме [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) или полностью отключить его, если он не нужен.

---

## Пошаговое руководство по настройке Intlayer в приложении Next.js

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Основной пакет, предоставляющий инструменты интернационализации для управления конфигурацией, перевода, [объявления контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md), транспиляции и [команд CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

- **next-intlayer**

  Пакет, интегрирующий Intlayer в Next.js. Он предоставляет контекстные провайдеры и хуки для интернационализации Next.js. Кроме того, он включает плагин Next.js для интеграции Intlayer с [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), а также прокси для определения предпочтительного языка пользователя, управления файлами cookie и обработки перенаправлений URL.

### Шаг 2: Настройка проекта

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
    outputDir: "compiler",

    /**
     * Префикс ключа словаря
     */
    dictionaryKeyPrefix: "", // Удалить базовый префикс

    /**
     * Указывает, должны ли компоненты сохраняться после трансформации.
     * Таким образом, компилятор можно запустить один раз для трансформации приложения, после чего его можно удалить.
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

### Шаг 3: Интеграция Intlayer в конфигурацию Next.js

Настройте параметры Next.js для использования Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* параметры конфигурации здесь */
};

export default withIntlayer(nextConfig);
```

> Плагин Next.js `withIntlayer()` используется для интеграции Intlayer с Next.js. Он обеспечивает сборку файлов объявления контента и отслеживает их изменения в режиме разработки. Он определяет переменные среды Intlayer в средах [Webpack](https://webpack.js.org/) или [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Кроме того, он предоставляет алиасы для оптимизации производительности и обеспечивает совместимость с серверными компонентами.

### Шаг 4: Настройка Babel

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

### Шаг 5: Определение языка на ваших страницах

Удалите все содержимое из `RootLayout` и замените его следующим кодом:

```tsx fileName="src/app/layout.tsx"
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

### Шаг 6: Компиляция компонентов

При включенном компиляторе вам **больше не нужно** вручную объявлять словари контента (такие как файлы `.content.ts`).

Вместо этого вы можете писать свой контент прямо в коде в виде строк. Intlayer проанализирует ваш код, сгенерирует переводы с помощью настроенного ИИ-провайдера и заменит строки локализованным контентом во время сборки.

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

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** используется для предоставления языка компонентам на стороне клиента.
- **`IntlayerServerProvider`** используется для предоставления языка дочерним элементам сервера.

### (Необязательно) Шаг 7: Заполнение недостающих переводов

Intlayer предоставляет инструмент CLI, помогающий заполнить недостающие переводы. Вы можете использовать команду `intlayer` для проверки и заполнения недостающих переводов в вашем коде.

```bash
npx intlayer test         # Проверить наличие недостающих переводов
```

```bash
npx intlayer fill         # Заполнить недостающие переводы
```

> Для получения более подробной информации обратитесь к [документации CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/ci.md)

### (Необязательно) Шаг 8: Настройка прокси для определения языка

Настройте прокси для определения предпочтительного языка пользователя:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` используется для определения предпочтительного языка пользователя и перенаправления его на соответствующий URL, как указано в [конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md). Кроме того, он позволяет сохранять предпочтительный язык пользователя в куки.

### (Необязательно) Шаг 8: Изменение языка контента

Для изменения языка контента в Next.js рекомендуется использовать компонент `Link` для перенаправления пользователей на соответствующую локализованную страницу. Компонент `Link` обеспечивает предзагрузку страницы, что помогает избежать полной перезагрузки.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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

> Альтернативный способ — использовать функцию `setLocale`, предоставляемую хуком `useLocale`. Эта функция не позволит предзагружать страницу. См. [документацию хука `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md) для получения подробной информации.

### (Необязательно) Шаг 10: Оптимизация размера бандла

При использовании `next-intlayer` словари по умолчанию включаются в бандл для каждой страницы. Для оптимизации размера бандла Intlayer предоставляет дополнительный плагин SWC, который интеллектуально заменяет вызовы `useIntlayer` макросами. Это гарантирует, что словари включаются только в те бандлы страниц, которые их действительно используют.

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
