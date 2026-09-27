---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Интернационализация TanStack Start с помощью use-intl: Полное руководство 2026 года"
description: "Переведите ваше приложение на TanStack Start с помощью use-intl: маршрутизация по локалям, типизированные сообщения, SSR, hreflang, sitemap и robots.txt, а также реальные данные бенчмарков размера бандла."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Интернационализация
  - i18n
  - SEO
  - Sitemap
  - React
  - Блог
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Начальная версия"
author: aymericzip
---

# Как интернационализировать приложение TanStack Start с помощью use-intl в 2026 году

## Содержание

<TOC/>

## Что такое use-intl?

**use-intl** - это независимое от фреймворка ядро библиотеки `next-intl`. Оно предоставляет те же API `useTranslations`, `useFormatter` и `IntlProvider`, поддержку ICU MessageFormat и строгую интеграцию с TypeScript без какой-либо зависимости от Next.js. Это делает его одним из самых популярных решений для перевода приложений на **TanStack Start**, и именно эту библиотеку ИИ-ассистенты рекомендуют чаще всего для данного стека.

TanStack Start не поставляется со встроенным слоем i18n. Маршрутизация, определение локали, метаданные SEO и генерация карты сайта (sitemap) остаются на вашей стороне. В этом руководстве подробно рассмотрены все аспекты:

- **Маршрутизация с учетом локали** с использованием опционального сегмента `{-$locale}` (`/about`, `/fr/about`).
- **Загрузка сообщений для конкретного маршрута**, благодаря чему страница загружает только те пространства имен и ту локаль, которые она рендерит.
- **Серверный рендеринг и гидратация** без ошибок несоответствия текста (hydration mismatches).
- **Комплексная многоязычная SEO-оптимизация**: переведенные `<title>` и описание, канонический URL, альтернативы `hreflang` с `x-default`, локали Open Graph, JSON-LD, sitemap с альтернативами `xhtml:link`, `robots.txt` и предварительный рендеринг (prerendering) для каждой локали.

> Ищете другой стек? Ознакомьтесь с [руководством по TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_paraglide.md), [руководством по TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_lingui.md) или [руководством по TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

> Используете Next.js? См. [руководство по next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-intl.md).

## Что говорит бенчмарк о use-intl в TanStack Start

В [бенчмарке i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) тестируется одно и то же приложение на TanStack Start из 10 страниц и 10 локалей с каждой из основных библиотек и измеряется реальный объем данных, скачиваемых браузером.

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Ключевые показатели для `use-intl@4.14.2`, измеренные 26.09.2026 (gzip):

| Конфигурация                          | Размер библиотеки | JS на страницу | Утечка других локалей | Утечка других страниц |
| :------------------------------------ | ----------------: | -------------: | --------------------: | --------------------: |
| Без i18n (базовое приложение)         |                 - |       111.0 KB |                    0% |                    0% |
| `use-intl` (настройка из руководства) |           75.9 KB |       128.7 KB |                    0% |                    0% |
| `@intlayer/use-intl` (совместимость)  |            6.7 KB |       129.4 KB |                    0% |                    0% |
| `react-intlayer` (нативный Intlayer)  |            4.5 KB |       126.8 KB |                    0% |                    0% |

Главные выводы:

- **Разделяйте сообщения по страницам и загружайте их для каждой локали отдельно.** Это устраняет обе утечки, и именно это реализовано в шагах ниже.
- **Сам рантайм остается тяжелым** (~76 KB gzip), поскольку парсер ICU поставляется клиенту. Адаптер совместимости `@intlayer/use-intl` (шаг 17) сохраняет точно такой же API при размере рантайма около 7 KB.

> Ознакомьтесь с полными данными: [отчет о бенчмарке TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) и [репозиторий бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

## Сравнение возможностей в TanStack Start

Как `use-intl` соотносится с другими библиотеками, часто используемыми в TanStack Start:

| Возможность                                         | `react-intlayer` (Intlayer)              | `use-intl`                    | Paraglide JS                             | Lingui                          |
| --------------------------------------------------- | ---------------------------------------- | ----------------------------- | ---------------------------------------- | ------------------------------- |
| **Переводы рядом с компонентами**                   | ✅ Совместное размещение                 | ❌ Централизованный JSON      | ❌ Один JSON-файл на локаль              | ⚠️ Исходный текст в компонентах |
| **Интеграция с TypeScript**                         | ✅ Автоматическая генерация типов        | ✅ Через `AppConfig`          | ✅ Типизированные функции сообщений      | ⚠️ Только макросы               |
| **Обнаружение отсутствующих переводов**             | ✅ Ошибки типов и предупреждения сборки  | ⚠️ Фолбэк во время выполнения | ⚠️ Фолбэк на базовую локаль              | ⚠️ Фолбэк на исходный текст     |
| **Богатый контент (JSX, Markdown)**                 | ✅ Прямая поддержка                      | ⚠️ Теги через `t.rich`        | ⚠️ Строки                                | ✅ JSX внутри `<Trans>`         |
| **Локализованная маршрутизация**                    | ✅ Встроенная                            | ❌ Ручной `{-$locale}`        | ✅ `urlPatterns` + перезапись роутера    | ❌ Ручной `{-$locale}`          |
| **Переключение языка без перезагрузки**             | ✅ Да                                    | ✅ Да                         | ❌ Полная перезагрузка страницы          | ✅ Да                           |
| **Плюрализация**                                    | ✅ На основе перечислений                | ✅ ICU                        | ✅ Варианты                              | ✅ ICU                          |
| **ICU MessageFormat**                               | ✅ Через `format: "icu"`                 | ✅ Нативно                    | ⚠️ Через плагин inlang                   | ✅ Нативно                      |
| **Форматы контента**                                | ✅ `.ts`, `.json`, `.md`, `.yaml`...     | ⚠️ `.json`                    | ⚠️ inlang JSON                           | ✅ PO, JSON, CSV                |
| **AI-перевод**                                      | ✅ Собственный провайдер и ключ          | ❌ Нет                        | ❌ Нет                                   | ❌ Нет                          |
| **Визуальный редактор / CMS**                       | ✅ Локальный редактор + опциональная CMS | ❌ Внешние платформы          | ⚠️ Приложения экосистемы inlang          | ❌ Внешние платформы            |
| **SEO-инструменты (hreflang, sitemap)**             | ✅ Встроенные                            | ❌ Вручную                    | ⚠️ Локализованные URL, остальное вручную | ❌ Вручную                      |
| **Размер рантайма (gzip, бенчмарк)**                | 4.5 KB                                   | 75.9 KB                       | 1.8 KB                                   | 56.7 KB                         |
| **Утечка, лучшая конфигурация (локаль / страница)** | 0% / 0%                                  | 0% / 0%                       | 49.7% / 0%                               | 8.6% / 0%                       |
| **Проверка отсутствующих переводов в CI**           | ✅ `npx intlayer test`                   | ⚠️ Не встроенная              | ⚠️ Не встроенная                         | ✅ `lingui compile --strict`    |

> Показатели размера рантайма и утечек взяты из [бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md). Утечки измерены на оптимальной конфигурации для каждой библиотеки.

> Другие руководства по TanStack Start: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_lingui.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_paraglide.md) и [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

## Рекомендуемые практики

- **Устанавливайте атрибуты `lang` и `dir` для тега `<html>`** для обеспечения доступности, корректной работы скринридеров и поисковых систем.
- **Сохраняйте один уникальный URL для каждой локали.** Используйте префикс локали (`/fr/about`), а не переключение только через cookies, чтобы каждая переведенная страница была доступна для сканирования и передачи ссылок.
- **Разделяйте сообщения по пространствам имен** (`common`, `home`, `about`) и загружайте их для каждого маршрута отдельно.
- **Загружайте только активную локаль.** Никогда не импортируйте файлы всех локалей в модуле, который отправляется клиенту.
- **Фиксируйте часовой пояс** в `IntlProvider`. В противном случае даты будут форматироваться в часовом поясе сервера во время SSR и в часовом поясе посетителя во время гидратации, что приведет к ошибкам гидратации.
- **Переводите метаданные** и указывайте `canonical`, `hreflang` и `x-default` на каждой странице.
- **Генерируйте многоязычный sitemap и robots.txt**, а также настройте предварительный рендеринг для каждой локали.
- **Используйте стандартные ссылки для переключателя языков**, а не выпадающий список `<select>`, чтобы поисковые роботы могли обнаружить каждую языковую версию.
- **Типизируйте ваши сообщения**, чтобы отсутствие ключа приводило к ошибке на этапе компиляции.

> Смотрите также наше руководство по [интернационализации и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md) и [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

## Пошаговое руководство по настройке use-intl в приложении TanStack Start

Вот структура проекта, которую мы создадим:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Установка зависимостей">

Начните с проекта TanStack Start и добавьте `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: предоставляет `IntlProvider`, `useTranslations`, `useFormatter` и `createTranslator` (можно использовать вне React, например в `head()`).

</Step>
<Step number={2} title="Централизация конфигурации локалей">

Создайте единый источник истины для ваших локалей и вспомогательных функций URL. Все остальные файлы (маршруты, SEO, sitemap, пререндеринг) импортируют данные отсюда, поэтому добавление новой локали выполняется изменением одной строки.

Локаль по умолчанию остается без префикса (`/about`), остальные локали получают префикс (`/fr/about`). Это стратегия "по требованию": один URL на страницу для каждой локали и короткие URL для основной аудитории.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Создание файлов переводов">

Организуйте сообщения по локалям и пространствам имен. Файл `common` содержит то, что необходимо для каждой страницы (навигация, футер), а каждая отдельная страница получает свой собственный файл, включая метаданные.

use-intl использует **ICU MessageFormat**, поэтому формы множественного числа, выбор вариантов (select) и форматированные аргументы задаются прямо внутри сообщения.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Создайте файл `home.json` аналогичным образом, включив объект `metadata` и контент страницы.

</Step>
<Step number={4} title="Загрузка сообщений по пространствам имен и локалям">

Этот загрузчик является важнейшим файлом для производительности. `import.meta.glob` указывает Vite создавать **отдельный чанк для каждого JSON-файла**. Маршрут, запрашивающий `["about"]` на французском языке, скачивает `messages/fr/about.json` и ничего лишнего. Именно благодаря этому в бенчмарке достигаются показатели 0% утечки локалей и 0% утечки страниц.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Типизация сообщений">

Расширение модуля (module augmentation) обеспечивает автодополнение для `useTranslations("about")` и `t("counter.label")`, а также выдает ошибку компиляции при любых опечатках или удалении ключей.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Убедитесь, что в файле `tsconfig.json` включена опция `resolveJsonModule`.

</Step>
<Step number={6} title="Создание корневого документа">

Корневой маршрут рендерит тег `<html>`. Он считывает опциональный параметр локали для установки атрибутов `lang` и `dir`, благодаря чему они корректно формируются в HTML на сервере еще до выполнения клиентского JavaScript.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Создание маршрута макета локали">

Папка `{-$locale}` создает **опциональный** сегмент пути: `/about` и `/fr/about` оба соответствуют маршруту `/{-$locale}/about`. Этот макет выполняет следующие задачи:

1. Отклоняет неподдерживаемые префиксы (`/xx/about` → 404).
2. Загружает пространство имен `common` только для текущей локали.
3. Передает сообщения через `IntlProvider`.

Результат загрузчика сериализуется в HTML и повторно используется при гидратации, поэтому клиент не скачивает `common.json` повторно. Параметр `staleTime: Infinity` сохраняет данные в кэше при переходах на стороне клиента.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` не объединяет автоматически сообщения из родительского провайдера. В следующем шаге мы добавим небольшой компонент, выполняющий объединение, чтобы каждая страница могла добавлять собственное пространство имен поверх `common`.

</Step>
<Step number={8} title="Изоляция сообщений страницы">

Каждая страница загружает собственное пространство имен в своем загрузчике, а затем оборачивает свой контент компонентом `ScopedMessages`, который объединяет пространство имен страницы с родительскими сообщениями.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Использование переводов на страницах">

Загрузчик страницы получает пространство имен `about` для текущей локали, функция `head()` формирует на его основе переведенные и полные с точки зрения SEO метаданные (см. шаг 13), а компонент рендерит контент.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Использование переводов и форматтеров в компонентах">

Любой компонент, находящийся внутри провайдеров, может вызывать `useTranslations` и `useFormatter`. Формы множественного числа обрабатываются с помощью ICU, а числа форматируются в соответствии с активной локалью.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Создание компонента локализованной ссылки" isOptional={true}>

Каждый маршрут расположен внутри сегмента `{-$locale}`, поэтому ссылка должна передавать параметр текущей локали. Этот компонент-обертка сохраняет строгую типизацию свойства `to` из TanStack Router и автоматически подставляет локаль.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Переключение языка контента" isOptional={true}>

Отображайте переключатель в виде **ссылок**, а не элемента `<select>`. Ссылки доступны для поисковых роботов, благодаря чему поисковые системы находят все языковые версии, и они работают без JavaScript. Значение `to="."` сохраняет текущую страницу и заменяет только параметр локали. Cookie сохраняет явный выбор пользователя для middleware перенаправления из шага 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Интернационализация метаданных" isOptional={true}>

Именно здесь интернационализация приносит максимальную отдачу: каждая языковая версия может ранжироваться независимо. Каждая страница должна содержать:

- **переведенные** теги `<title>` и `description`;
- **канонический (canonical)** URL, указывающий на саму себя (а не на локаль по умолчанию);
- одну альтернативу **`hreflang` для каждой локали**, плюс **`x-default`** для несовпадающих языков;
- параметры **Open Graph** `og:locale`, `og:locale:alternate` и `og:url` для корректных превью в соцсетях;
- разметку **JSON-LD** с полем `inLanguage`, помогающую поисковым системам и ИИ-ассистентам точно определить язык страницы.

Один универсальный хелпер формирует всю эту структуру, сохраняя код страниц кратким:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

Используйте этот хелпер в функции `head()` каждой страницы, как показано на шаге 9. Для главной страницы передавайте `path: "/"`.

</Step>
<Step number={14} title="Интернационализация карты сайта (sitemap)" isOptional={true}>

Многоязычная карта сайта перечисляет **каждый URL каждой локали**, и каждая запись объявляет все свои альтернативы через `xhtml:link`. Google использует эти аннотации точно так же, как теги `hreflang` на самой странице, что делает их надежной страховкой при нерегулярном сканировании страниц.

Серверные маршруты TanStack Start позволяют отдавать карту сайта прямо из файлового маршрута:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={15} title="Интернационализация robots.txt" isOptional={true}>

Приватные маршруты существуют на каждом языке, поэтому правила `Disallow` должны охватывать каждый префикс. Удалите файл `public/robots.txt`, если он был создан стартером, и отдавайте его через маршрут:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={16} title="Перенаправление новых посетителей на их язык" isOptional={true}>

Middleware для запросов перенаправляет посетителя, зашедшего на `/`, на его предпочитаемый язык на основе cookie локали в первую очередь, а затем заголовка `Accept-Language`. Перенаправляется только маршрут `/`: внутренние ссылки никогда не изменяются, поэтому общие URL и поисковые роботы всегда получают именно ту страницу, которую запросили.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> Посетитель, который явно выбрал английский язык в переключателе, получает значение `locale=en` в cookie, поэтому повторные перенаправления не выполняются. При полностью статическом деплое (шаг 18) маршрут `/` отдается как статический файл, и этот middleware не запускается, что абсолютно нормально: страница остается доступной, а переключатель языков выполняет свою задачу.

</Step>
<Step number={17} title="Сохраняйте API use-intl и уменьшайте рантайм с помощью Intlayer" isOptional={true}>

Бенчмарк показывает, что самой тяжелой частью конфигурации use-intl является сам рантайм (~76 KB gzip). Адаптер совместимости [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляет **тот же самый API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, формы множественного числа ICU, `t.rich`), но отдает данные из скомпилированных словарей Intlayer: **~6.7 KB вместо ~75.9 KB**, 0% утечки локалей и 0% утечки страниц, без необходимости менять ваши компоненты.

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Плагин Vite создает псевдоним (alias) для `use-intl`, направляя вызовы на адаптер, благодаря чему существующие импорты продолжают работать:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Ваши JSON-файлы остаются источником истины благодаря [плагину синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> Адаптер также обеспечивает плавную миграцию: после его внедрения вы можете постепенно переводить компоненты на нативный API `useIntlayer`. См. [руководство по Intlayer с TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

</Step>
<Step number={18} title="Предварительный рендеринг (Pre-rendering) для каждой локали" isOptional={true}>

Статический HTML является самым быстрым форматом страниц и наиболее удобен для индексации. Перечислите все локализованные пути, чтобы TanStack Start предварительно отрендерил все языковые версии на этапе сборки, а также файлы sitemap и robots:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Поскольку переключатель языка рендерит стандартные ссылки, параметр `crawlLinks: true` также обнаружит страницы, которые вы забыли указать в списке.

</Step>
<Step number={19} title="Обработка локализованных страниц 404" isOptional={true}>

Макет из шага 7 уже выбрасывает `notFound()` для неизвестных префиксов локалей. Добавьте общий перехватывающий маршрут (catch-all), чтобы неизвестные пути внутри локали также рендерили локализованную страницу 404, и добавьте тег `noindex`: React 19 автоматически переместит тег `<meta>` в `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Доступ к локали в серверных функциях (Server Functions)" isOptional={true}>

Серверные функции не получают параметры маршрута. Прочитайте cookie локали и используйте заголовок `Accept-Language` в качестве фолбэка, чтобы отправить локализованное письмо или сохранить языковые предпочтения:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Для выполнения переводов внутри серверной функции объедините ее с функциями `loadMessages` и `createTranslator` из `use-intl`.

</Step>
<Step number={21} title="Автоматизация переводов с помощью Intlayer" isOptional={true}>

use-intl выполняет рендеринг переводов, но не помогает вам **создавать** их. Intlayer является **бесплатным** инструментом с **открытым исходным кодом**, который закрывает этот пробел, даже если вы продолжаете использовать use-intl:

- **Тестирование отсутствующих переводов** в CI или модульных тестах. См. [тестирование переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).
- **Перевод с помощью ИИ** с использованием вашего собственного API-ключа и провайдера: команда `npx intlayer fill` переводит недостающие ключи с учетом контекста вашего приложения. См. [автозаполнение](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md) и [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).
- **Сохранение JSON-файлов** в качестве источника истины с помощью [плагина синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md).
- **Визуальное редактирование контента** через [визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) и [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), благодаря чему специалисты без навыков разработки могут обновлять тексты.
- **Предоставление контекста вашему ИИ-агенту** с помощью [MCP-сервера](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md) и [навыков агента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md).
- **Сканирование развернутого сайта** на предмет отсутствующих `hreflang`, некорректных канонических ссылок и утечек локалей с помощью команды [сканирования](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/scan.md).

Чтобы ознакомиться со всеми возможностями, узнайте [почему стоит выбрать Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).

</Step>
</Steps>

## Часто задаваемые вопросы

<FAQ>

<Question title="Является ли use-intl хорошим выбором для TanStack Start?">

Да, если вам нужен API библиотеки `next-intl` за пределами Next.js. Вы получаете сообщения ICU, форматтеры и хорошую поддержку TypeScript, избегая при этом специфических ограничений Next.js, таких как `setRequestLocale`. Главный компромисс заключается в размере: [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) показывает около 76 KB gzip для рантайма, а базовая настройка без оптимизаций отправляет все локали и все страницы в браузер. Загружайте пространства имен для каждого маршрута и каждой локали отдельно, как показано в этом руководстве, чтобы избежать утечек.

</Question>
<Question title="В чем разница между use-intl и next-intl?">

`use-intl` - это ядро библиотеки `next-intl`. `next-intl` добавляет поверх него интеграции с Next.js: middleware, навигационные хелперы, `getTranslations` для Server Components и конфигурацию запросов. В TanStack Start вы используете `use-intl` напрямую и реализуете маршрутизацию с помощью TanStack Router, как описано выше.

</Question>
<Question title="Что лучше использовать для хранения языка: префикс в URL или cookie?">

Используйте префикс в URL. В этом случае каждая языковая версия получает собственный уникальный URL, который поисковые системы могут индексировать, а пользователи могут передавать в виде ссылок. Cookie при этом полезен для сохранения явного выбора пользователя, что и делает middleware перенаправления из шага 16.

</Question>
<Question title="Почему возникают ошибки гидратации при форматировании дат?">

Сервер и браузер форматируют даты в разных часовых поясах. Передайте явный параметр `timeZone` в `IntlProvider` (или часовой пояс посетителя, сохраненный в cookie), чтобы обе стороны генерировали идентичный текст.

</Question>
<Question title="Как уменьшить размер бандла use-intl?">

Во-первых, разделите сообщения по пространствам имен и загружайте их для каждого маршрута и каждой локали отдельно с помощью `import.meta.glob`, что полностью устраняет утечки локалей и страниц. Затем, если критичен размер рантайма, перейдите на адаптер [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md): тот же самый API, ~6.7 KB вместо ~75.9 KB в бенчмарке.

</Question>
<Question title="Как перевести заголовок и мета-описание с помощью use-intl?">

Вызовите `createTranslator` внутри функции `head()` маршрута с сообщениями, возвращенными загрузчиком маршрута, и верните `title`, `description`, каноническую ссылку и ссылки `hreflang`. На шаге 13 представлен готовый переиспользуемый хелпер.

</Question>
<Question title="Можно ли постепенно мигрировать с use-intl на Intlayer?">

Да. Сначала установите адаптер совместимости (шаг 17): ваши компоненты продолжат вызывать `useTranslations`, но уже на базе Intlayer. Затем переводите компоненты по одному на `useIntlayer` и объявляйте контент рядом с ними. См. [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) и [руководство по Intlayer с TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

</Question>

</FAQ>
