---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n в Next.js 16 с Lingui: руководство по настройке App Router"
description: "Настройка Lingui в App Router Next.js 16: Server Components, SWC-макросы, маршрутизация через proxy, generateMetadata, hreflang, sitemap и robots.txt, а также данные бенчмарков."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Интернационализация
  - i18n
  - SEO
  - Блог
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Начальная версия"
author: aymericzip
---

# Как интернационализировать приложение Next.js с помощью Lingui в 2026 году

## Содержание

<TOC/>

## Что такое Lingui?

**Lingui** - это библиотека i18n, построенная вокруг **макросов** и **извлечения сообщений** (message extraction). Вы пишете исходный текст прямо в компонентах (`` t`Hello` ``, `<Trans>Hello</Trans>`), команда `lingui extract` собирает все сообщения в каталоги (по умолчанию PO-файлы), а загрузчик компилирует их в компактный JavaScript. Сообщения используют ICU MessageFormat, и Lingui поддерживает **React Server Components** в App Router.

В этом руководстве настраивается Lingui в проекте с **Next.js 16 App Router**, включая:

- **Макросы, скомпилированные с помощью SWC**, благодаря чему сохраняется скорость работы Turbopack.
- **Server и Client Components**, использующие единый API `Trans` и `useLingui`.
- **Локализованную маршрутизацию** через `proxy.ts`: `/about` для локали по умолчанию, `/fr/about` для остальных языков, а также определение языка при первом посещении.
- **Статический рендеринг** всех локалей с помощью `generateStaticParams`.
- **Полное многоязычное SEO**: переведенные `generateMetadata`, canonical, `hreflang` с `x-default`, локали Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` и локализованные страницы 404.

> Ищете другую библиотеку?

- [руководством по next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-intl.md)
- [руководством по next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-i18next.md)
- [руководством по Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)

> Используете TanStack Start?

- [руководство по TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_lingui.md)

> Сравниваете библиотеки?

- [Lingui против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer.md)
- [next-i18next против next-intl против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md)

> Чтобы понять, откуда взялись эти библиотеки, прочитайте историю i18n в JavaScript.

- [История i18n в JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/history_of_i18n.md)

## Что говорит бенчмарк о Lingui в Next.js

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md) запускает одно и то же приложение Next.js на 10 страниц и 10 локалей с каждой популярной библиотекой и измеряет фактический объем загружаемых браузером данных.

- [Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Ключевые показатели для `@lingui/core@6.6.0` на Next.js 16, измеренные 26.09.2026 (gzip):

| Конфигурация                        | Размер библиотеки | JS на страницу | Утечка других локалей | Утечка других страниц |
| :---------------------------------- | ----------------: | -------------: | --------------------: | --------------------: |
| Без i18n (базовое приложение)       |                 - |       141.0 KB |                    0% |                    0% |
| Lingui, один каталог на локаль      |           72.1 KB |       145.4 KB |                  2.8% |                 89.9% |
| `@intlayer/lingui` (совместимость)  |           10.7 KB |       221.6 KB |                   50% |                   90% |
| `next-intlayer` (нативный Intlayer) |            4.9 KB |       141.5 KB |                    0% |                    0% |

Главные выводы:

- **Один каталог на локаль по-прежнему приводит к утечке сообщений других страниц** в клиентский провайдер. Оставляйте как можно больше текста в Server Components, которые отправляют готовый HTML, а не каталоги.
- **Размер рантайма Lingui составляет ~72 KB gzip.** Адаптер совместимости `@intlayer/lingui` уменьшает рантайм до ~11 KB, но в этом бенчмарке настройка совместимости Next.js все еще отправляет целые каталоги на страницу. Только нативный API `next-intlayer` сохраняет размер на уровне базового приложения.

> Смотрите полные данные: [отчет о бенчмарке Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md) и [репозиторий бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

- [отчет о бенчмарке Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md)

## Сравнение возможностей в Next.js

Сравнение Lingui с `next-intl` и Intlayer по функциям, которые обычно требуются в проекте Next.js App Router:

| Возможность                           | `next-intlayer` (Intlayer)                          | Lingui                                                   | `next-intl`                               |
| ------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------- |
| **Переводы рядом с компонентами**     | ✅ Контент расположен рядом с компонентом           | ⚠️ Исходный текст в компонентах, каталоги централизованы | ❌ Централизованный JSON                  |
| **Интеграция с TypeScript**           | ✅ Автоматически генерируемые строгие типы          | ⚠️ Макросы типизированы, каталоги сообщений нет          | ✅ Хорошая, через расширение `AppConfig`  |
| **Поиск отсутствующих переводов**     | ✅ Ошибки TypeScript и предупреждения при сборке    | ⚠️ Рантайм-фоллбэк на исходный текст                     | ⚠️ Рантайм-фоллбэк                        |
| **Форматированный контент (JSX, MD)** | ✅ Прямая поддержка                                 | ✅ JSX внутри `<Trans>`, без Markdown                    | ⚠️ Теги через `t.rich`, без Markdown      |
| **AI-перевод**                        | ✅ Собственный провайдер и API-ключ с контекстом    | ❌ Нет                                                   | ❌ Нет                                    |
| **Визуальный редактор / CMS**         | ✅ Локальный визуальный редактор + опциональная CMS | ❌ Через внешние платформы                               | ❌ Через внешние платформы                |
| **Локализованная маршрутизация**      | ✅ Встроенная                                       | ❌ Написание собственного `proxy.ts`                     | ✅ Встроенный сегмент `[locale]`          |
| **Плюрализация**                      | ✅ На основе перечислений                           | ✅ ICU, макрос `<Plural>`                                | ✅ ICU                                    |
| **Форматы контента**                  | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`    | ✅ PO, JSON, CSV                                         | ✅ `.json`, `.js`, `.ts`                  |
| **ICU MessageFormat**                 | ✅ Через `format: "icu"`                            | ✅ Нативный                                              | ✅ Нативный                               |
| **SEO-хелперы (hreflang, sitemap)**   | ✅ Хелперы для метаданных, sitemap и robots.txt     | ❌ Вручную                                               | ✅ Хорошие                                |
| **Server Components**                 | ✅ Прямой доступ в любом Server Component           | ⚠️ `setI18n` в каждом layout и page                      | ⚠️ `await getTranslations()` на компонент |
| **Tree-shaking по компонентам**       | ✅ Во время сборки (Babel / SWC)                    | ⚠️ Один каталог на локаль, экстрактор по страницам эксп. | ⚠️ Вручную через `pick()` для маршрута    |
| **Размер рантайма (gzip, бенчмарк)**  | 4.9 KB                                              | 72.1 KB                                                  | 14.7 KB                                   |
| **Проверка переводов в CI**           | ✅ `npx intlayer test`                              | ✅ `lingui compile --strict`                             | ⚠️ Не встроено                            |
| **Экосистема / сообщество**           | ⚠️ Меньше, быстро растет                            | ✅ Зрелая                                                | ✅ Большая                                |

> Размеры рантайма взяты из [бенчмарка Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md). Для подробного анализа читайте [Lingui против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer.md).

- [бенчмарка Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md)
- [Lingui против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer.md)

> Другие руководства по Next.js:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)

## Рекомендуемые практики

- **Устанавливайте `lang` и `dir` для `<html>`** в layout сегмента `[locale]`.
- **Отдавайте предпочтение Server Components** для отображения текста: они рендерят HTML на сервере и не требуют отправки каталогов на клиент.
- **Вызывайте `initLingui(locale)` в каждом layout и page.** Layout не рендерятся повторно при навигации, поэтому страница не может рассчитывать на то, что layout уже установил локаль.
- **Сохраняйте один URL на локаль** и выполняйте предварительный рендеринг каждой локали с помощью `generateStaticParams`.
- **Переводите метаданные** в `generateMetadata`, включая `canonical`, `hreflang` и `x-default`.
- **Генерируйте многоязычные sitemap и robots.txt** с помощью соглашений `sitemap.ts` и `robots.ts`.
- **Используйте настоящие ссылки для переключателя языков**, чтобы поисковые роботы могли обнаружить все языковые версии.
- **Запускайте `lingui extract` в CI**, чтобы ни одно новое сообщение не попало в продакшн непереведенным.

- [интернационализации и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md)
- [руководством по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md)
- [сравнением многоязычного SEO в Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/nextjs-multilingual-seo-comparison.md)

## Пошаговое руководство по настройке Lingui в приложении Next.js

Ниже представлена структура проекта, которую мы создадим:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Локализованная маршрутизация и определение языка
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Создается с помощью `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Локали, хелперы для URL
    │   ├── appRouterI18n.ts        # Каталоги и экземпляры только для сервера
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Генератор generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Локализованная 404 для неизвестных путей
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Установка зависимостей">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: рантайм, `I18nProvider`, `setI18n` для Server Components и макросы (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: компилирует макросы внутри конвейера SWC Next.js.
- **@lingui/loader**: компилирует `.po` каталоги при импорте, устраняя необходимость в отдельной команде `lingui compile`.
- **@lingui/cli**: команда `lingui extract` для сбора сообщений в каталоги.

> `@lingui/swc-plugin` представляет собой WebAssembly-плагин, привязанный к версии SWC в Next.js. Если сборка завершается с ошибкой после обновления Next.js, обновите плагин до версии, указанной как совместимая в его README.

</Step>
<Step number={2} title="Централизация конфигурации локалей">

Единый файл определяет локали и хелперы URL. Маршрутизация, метаданные, sitemap и Lingui считывают данные из него.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Публичный origin, используемый для канонических URL, hreflang и sitemap. */
export const siteUrl = "https://example.com";

/** Cookie, сохраняющий локаль, явно выбранную пользователем. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph ожидает коды формата `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, локаль по умолчанию без префикса. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Настройка Lingui и Next.js">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

SWC-плагин компилирует макросы, а загрузчик компилирует `.po` файлы как для Turbopack (по умолчанию в Next.js 16), так и для webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Добавьте скрипты для извлечения сообщений:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Загрузка каталогов и создание экземпляров на сервере">

Server Components не имеют контекста React, поэтому Lingui предоставляет `setI18n` для регистрации экземпляра на время текущего рендера. Этот модуль загружает каждый каталог **один раз на процесс сервера** и создает один экземпляр `I18n` для каждой локали. Он помечен как `server-only`: каталоги других локалей никогда не попадут в клиентский бандл.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Регистрирует экземпляр для текущего рендера Server Component.
 * Вызывайте его в каждом layout и page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Чтобы TypeScript корректно обрабатывал импорт `.po` файлов, добавьте объявление модуля:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Создание клиентского провайдера">

Client Components считывают переводы из контекста React. Провайдер получает каталог активной локали из серверного layout и создает собственный экземпляр один раз.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Определение динамических маршрутов локалей">

Сегмент `[locale]` содержит корневой layout. `generateStaticParams` выполняет предварительный рендеринг каждой локали во время сборки, а параметр `dynamicParams = false` возвращает 404 для любого другого префикса.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Неизвестные префиксы (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Разрешает относительные канонические URL и Open Graph URL
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Клиентский провайдер получает весь каталог активной локали. Это именно то, что бенчмарк фиксирует как "утечку других страниц". Размещение текста в Server Components минимизирует объем данных, необходимых клиенту. Для крупных приложений экспериментальный экстрактор страниц Lingui (`experimental.extractor` в `lingui.config.ts`) разделяет каталоги по точкам входа.

</Step>
<Step number={7} title="Использование переводов в Server Components">

Server Components используют те же макросы, что и Client Components. Вызов `initLingui` должен выполняться и на самой странице, поскольку layout не рендерится повторно при переходе между страницами внутри него.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Использование переводов в Client Components">

Client Components используют те же импорты. Макросы считывают экземпляр из `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Извлечение и перевод сообщений">

Запустите команду извлечения. Lingui запишет каждое сообщение, найденное в директории `src`, в каталог каждой локали:

```bash
npm run i18n:extract
```

Затем переведите поле `msgstr` для каждой записи:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Плейсхолдеры вида `<0>` сохраняют позиции JSX-элементов внутри `<Trans>`, позволяя переводчикам перемещать их без изменения разметки.

</Step>
<Step number={10} title="Настройка Proxy для локализованной маршрутизации" isOptional={true}>

В Next.js 16 файл `middleware.ts` был переименован в `proxy.ts`. Прокси реализует стратегию префиксов "по необходимости" (as-needed):

- `/fr/about` отдается напрямую;
- `/en/about` перенаправляет на `/about`, благодаря чему локаль по умолчанию имеет единственный URL;
- `/about` внутренне переписывается (rewrite) в `/en/about` без изменения URL в адресной строке;
- первое посещение `/` перенаправляет на предпочитаемый язык пользователя (сначала проверяется cookie, затем заголовок `Accept-Language`).

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: один URL для локали по умолчанию
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Первое посещение "/": перенаправляем пользователя на его язык
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → обрабатывается через /en/about, URL в адресной строке не меняется
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Пропускаем API-маршруты, системные файлы Next.js и статические ресурсы (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Смена языка контента" isOptional={true}>

Хук `usePathname` возвращает URL, отображаемый в браузере (`/about` или `/fr/about`). Удалите локаль из пути, затем сформируйте ссылку для каждого языка. Переключатель отображает реальные ссылки, чтобы поисковые роботы могли обойти каждую языковую версию, а cookie сохраняет явный выбор пользователя.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Создание компонента локализованной ссылки" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Путь без префикса локали, например "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Компонент работает и в Server Components, поскольку рендерится внутри `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Интернационализация метаданных" isOptional={true}>

Каждая языковая версия может успешно ранжироваться независимо при условии, что каждая страница предоставляет:

- **переведенные** `title` и `description`;
- **канонический** URL (`canonical`), указывающий на саму страницу;
- один **альтернативный `hreflang` на каждую локаль**, а также **`x-default`**;
- теги **Open Graph**: `locale`, `alternateLocale` и `url`;
- разметку **JSON-LD** с атрибутом `inLanguage`.

Функция `generateMetadata` выполняется вне дерева компонентов React, поэтому она напрямую использует серверный экземпляр с макросом `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Путь без префикса локали, например "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... компонент страницы из шага 7
```

Разметка JSON-LD рендерится самой страницей. Файлы страниц могут экспортировать только стандартные поля Next.js, поэтому вынесите компонент в отдельный файл:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// Внутри AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Интернационализация sitemap" isOptional={true}>

Соглашение `sitemap.ts` поддерживает свойство `alternates.languages`, которое Next.js преобразует в теги `xhtml:link`. Перечислите каждый URL для каждой локали:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Интернационализация robots.txt" isOptional={true}>

Приватные маршруты существуют на каждом языке, поэтому директива `disallow` должна охватывать все локализованные пути:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Обработка локализованных страниц 404" isOptional={true}>

Файл `not-found.tsx` рендерится внутри layout `[locale]`, благодаря чему он имеет доступ к клиентскому провайдеру. Catch-all маршрут перенаправляет неизвестные пути внутри локали на него. Next.js автоматически добавляет `noindex` к ответам 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → локализованный not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Доступ к локали в Server Actions" isOptional={true}>

Server Actions не получают параметры маршрута автоматически. Наиболее надежный подход - передавать локаль вместе с формой из страницы, которой она известна:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Сохранение макросов и сокращение рантайма с Intlayer" isOptional={true}>

Адаптер совместимости [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md) позволяет оставить исходный код без изменений: макросы компилируются как и раньше, а вызовы `i18n._()`, `useLingui()` и `<Trans>` обслуживаются словарями Intlayer. В бенчмарке Next.js размер рантайма снижается с **~72.1 KB до ~10.7 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md)

В Next.js адаптер подключается путем создания псевдонимов (alias) `@lingui/core` и `@lingui/react` на `@intlayer/lingui` в `next.config.ts` (как для webpack, так и для Turbopack), а также оборачиванием конфигурации в функцию `withIntlayer` из `next-intlayer/server`. Сохраните `@lingui/swc-plugin`, чтобы макросы продолжали компилироваться первыми. Полная конфигурация описана в [руководстве по совместимости с Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md).

- [руководстве по совместимости с Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md)

Как видно из таблицы бенчмарка, адаптер уменьшает размер рантайма, но пока не исключает передачу каталогов на страницу в Next.js. Его лучше всего использовать как мост для плавной миграции: после его запуска вы можете постепенно переводить компоненты на нативный API `useIntlayer`, который отправляет только тот контент, который фактически рендерится компонентом. Смотрите [руководство по Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md), [Lingui против @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer-lingui.md) и все [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md).

- [руководство по Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)
- [Lingui против @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer-lingui.md)
- [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md)

</Step>
<Step number={19} title="Автоматизация переводов с помощью Intlayer" isOptional={true}>

Lingui извлекает сообщения, но заполнение десятков каталогов вручную отнимает больше всего времени. Intlayer является **бесплатным** решением с **открытым исходным кодом**, и его инструменты отлично работают в связке с Lingui:

- **Перевод с помощью AI** с использованием вашего собственного API-ключа и провайдера. Смотрите [автозаполнение](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md) и [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).
- **Использование ваших PO-файлов** как основного источника истины с помощью [плагина синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md).
- **Тестирование отсутствующих переводов** в CI. Смотрите [тестирование переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).
- **Аудит развернутого сайта** на предмет отсутствующих `hreflang`, некорректных канонических URL и утечек локалей с помощью [команды scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/scan.md).

</Step>
</Steps>

## Часто задаваемые вопросы

<FAQ>

<Question title="Поддерживает ли Lingui App Router в Next.js и Server Components?">

Да. `@lingui/react` поддерживает React Server Components. Server Components регистрируют экземпляр с помощью `setI18n` из `@lingui/react/server`, Client Components считывают его из `I18nProvider`, и оба типа компонентов используют одинаковые макросы `Trans` и `useLingui`.

</Question>
<Question title="Почему необходимо вызывать initLingui в каждой странице и каждом layout?">

Server Components не имеют контекста React, поэтому экземпляр регистрируется для каждого рендера отдельно. Layout сохраняются между переходами по страницам и не рендерятся заново, поэтому страница не может полагаться на то, что layout установил локаль. Вызов `initLingui(locale)` в начале каждого layout и page обеспечивает их независимость.

</Question>
<Question title="Стоит ли использовать SWC-плагин или Babel в Next.js?">

Используйте `@lingui/swc-plugin`. Это сохраняет конвейер компиляции SWC и работу Turbopack. Добавление конфигурации Babel отключает SWC в Next.js и существенно замедляет сборку. Единственное требование - поддерживать версию плагина, совместимую с версией SWC в вашем релизе Next.js.

</Question>
<Question title="Как переводить generateMetadata с помощью Lingui?">

Получите серверный экземпляр через `getI18nInstance(locale)` и переведите дескрипторы, объявленные с помощью макроса `msg`: ``i18n._(msg`About us`)``. Возвращайте `alternates.canonical`, `alternates.languages` с `x-default` и `openGraph.locale`. В шаге 13 представлен готовый хелпер.

</Question>
<Question title="Какой объем занимает Lingui в бандле Next.js?">

[Бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md) показывает размер рантайма около ~72 KB gzip. При использовании одного каталога на локаль страницы весят ~145 KB по сравнению со 141 KB без i18n, однако каждая страница все еще получает сообщения других страниц через клиентский провайдер.

- [Бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl или next-i18next: что выбрать для Next.js?">

Lingui подходит командам, которые предпочитают писать исходный текст прямо в компонентах и работать с PO-файлами и профессиональными переводчиками. next-intl подходит тем, кто предпочитает каталоги JSON и API вида `t("key")`, тесно интегрированный с Next.js. next-i18next предоставляет экосистему плагинов i18next. Смотрите [next-i18next против next-intl против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md) и [бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md).

- [next-i18next против next-intl против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md)
- [бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/nextjs.md)

</Question>
<Question title="Можно ли мигрировать с Lingui на Intlayer без переписывания компонентов?">

Да. Адаптер [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md) сохраняет макросы и заменяет рантайм, после чего вы можете поэтапно переводить компоненты на `useIntlayer`. Смотрите [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md)
- [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md)

</Question>

</FAQ>
