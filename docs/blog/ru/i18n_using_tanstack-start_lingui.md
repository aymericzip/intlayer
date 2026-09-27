---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Интернационализация TanStack Start с Lingui: Полное руководство 2026"
description: "Переводите приложение TanStack Start с помощью Lingui: макросы, каталоги PO, SSR, локализованная маршрутизация, hreflang, sitemap и robots.txt, а также реальные данные бенчмарков размера бандла."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Интернационализация
  - i18n
  - SEO
  - PO-файлы
  - React
  - Блог
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Начальная версия"
author: aymericzip
---

# Как интернационализировать приложение TanStack Start с помощью Lingui в 2026 году

## Содержание

<TOC/>

## Что такое Lingui?

**Lingui** - это библиотека i18n, построенная вокруг **макросов** и **извлечения сообщений** (message extraction). Вы пишете исходный текст прямо в компонентах (`` t`Hello` ``, `<Trans>Hello</Trans>`), команда `lingui extract` собирает каждое сообщение в каталоги (по умолчанию PO-файлы), переводчики заполняют их, а плагин Vite компилирует их в компактный JavaScript. Сообщения используют ICU MessageFormat, поэтому поддерживаются множественные числа (plurals) и выборки (selects).

TanStack Start не поставляется со встроенным слоем i18n, поэтому в этом руководстве мы настроим Lingui с нуля:

- **Макросы, компилируемые Babel** через `@rolldown/plugin-babel` (требуется для `@vitejs/plugin-react` v6 и Vite 8).
- **Локализованная маршрутизация** с опциональным сегментом `{-$locale}` (`/about`, `/fr/about`).
- **Один каталог на локаль, загружаемый по требованию**, и отдельный экземпляр `I18n` на каждый рендер, чтобы параллельные SSR-запросы никогда не делили одну локаль.
- **Полное мультиязычное SEO**: переведенные `<title>` и описание, канонический URL, `hreflang` с `x-default`, локали Open Graph, JSON-LD, sitemap, `robots.txt`, предварительный рендеринг (pre-rendering) и локализованные страницы 404.

> Ищете другой стек? Ознакомьтесь с [руководством по TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_use-intl.md), [руководством по TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_paraglide.md) или [руководством по TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

> Используете Next.js? См. [руководство по Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_nextjs_lingui.md). Сравниваете библиотеки? Читайте [Lingui против Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer.md).

## Что показывают бенчмарки Lingui на TanStack Start

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) запускает одинаковое приложение на TanStack Start из 10 страниц и 10 локалей с каждой популярной библиотекой и измеряет то, что реально скачивает браузер.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Ключевые показатели для `@lingui/core@6.6.0`, измеренные 2026-09-26 (gzip):

| Конфигурация                         | Размер библиотеки | JS на страницу | Утечка других локалей | Утечка других страниц |
| :----------------------------------- | ----------------: | -------------: | --------------------: | --------------------: |
| Без i18n (базовое приложение)        |                 - |       111.0 KB |                    0% |                    0% |
| Lingui (настройка из этого гайда)    |           56.7 KB |       115.2 KB |                  9.3% |                    0% |
| `@intlayer/lingui` (совместимость)   |            9.8 KB |       136.7 KB |                  9.9% |                    0% |
| `react-intlayer` (нативный Intlayer) |            4.5 KB |       126.8 KB |                    0% |                    0% |

Главные выводы:

- **Загружайте один каталог на локаль по требованию.** Это сохраняет размер страниц близким к базовому приложению.
- **Рантайм остается тяжелым** (~57 KB gzip). Адаптер совместимости `@intlayer/lingui` (шаг 16) сохраняет ваши макросы и сокращает его до ~10 KB.

> Ознакомьтесь с полными данными: [отчет бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) и [репозиторий бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

## Сравнение возможностей на TanStack Start

Как Lingui соотносится с другими библиотеками, часто используемыми в TanStack Start:

| Возможность                                      | `react-intlayer` (Intlayer)             | `use-intl`                    | Paraglide JS                             | Lingui                          |
| ------------------------------------------------ | --------------------------------------- | ----------------------------- | ---------------------------------------- | ------------------------------- |
| **Переводы рядом с компонентами**                | ✅ Совместное размещение                | ❌ Централизованный JSON      | ❌ Один JSON-файл на локаль              | ⚠️ Исходный текст в компонентах |
| **Интеграция с TypeScript**                      | ✅ Автогенерация типов                  | ✅ Через `AppConfig`          | ✅ Типизированные функции сообщений      | ⚠️ Только макросы               |
| **Обнаружение отсутствующих переводов**          | ✅ Ошибки типов и предупреждения сборки | ⚠️ Фолбэк во время выполнения | ⚠️ Фолбэк на базовую локаль              | ⚠️ Фолбэк на исходный текст     |
| **Форматированный контент (JSX, Markdown)**      | ✅ Прямая поддержка                     | ⚠️ Теги через `t.rich`        | ⚠️ Строки                                | ✅ JSX внутри `<Trans>`         |
| **Локализованная маршрутизация**                 | ✅ Встроенная                           | ❌ Вручную `{-$locale}`       | ✅ `urlPatterns` + rewrite роутера       | ❌ Вручную `{-$locale}`         |
| **Переключение языка без перезагрузки**          | ✅ Да                                   | ✅ Да                         | ❌ Полная перезагрузка страницы          | ✅ Да                           |
| **Плюрализация**                                 | ✅ На основе перечислений               | ✅ ICU                        | ✅ Варианты                              | ✅ ICU                          |
| **ICU MessageFormat**                            | ✅ Через `format: "icu"`                | ✅ Нативно                    | ⚠️ Через плагин inlang                   | ✅ Нативно                      |
| **Форматы контента**                             | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`                    | ⚠️ inlang JSON                           | ✅ PO, JSON, CSV                |
| **AI-перевод**                                   | ✅ Свой провайдер и API-ключ            | ❌ Нет                        | ❌ Нет                                   | ❌ Нет                          |
| **Визуальный редактор / CMS**                    | ✅ Локальный редактор + CMS по желанию  | ❌ Внешние платформы          | ⚠️ Приложения экосистемы inlang          | ❌ Внешние платформы            |
| **SEO-хелперы (hreflang, sitemap)**              | ✅ Встроенные                           | ❌ Вручную                    | ⚠️ Локализованные URL, остальное вручную | ❌ Вручную                      |
| **Размер рантайма (gzip, бенчмарк)**             | 4.5 KB                                  | 75.9 KB                       | 1.8 KB                                   | 56.7 KB                         |
| **Утечка, лучшая настройка (локаль / страница)** | 0% / 0%                                 | 0% / 0%                       | 49.7% / 0%                               | 8.6% / 0%                       |
| **Проверка отсутствующих переводов в CI**        | ✅ `npx intlayer test`                  | ⚠️ Не встроено                | ⚠️ Не встроено                           | ✅ `lingui compile --strict`    |

> Показатели размера рантайма и утечек взяты из [бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md). Утечка измеряется на оптимальной конфигурации для каждой библиотеки.

> Другие руководства по TanStack Start: [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_use-intl.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_paraglide.md) и [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

## Рекомендуемые практики

- **Устанавливайте `lang` и `dir` для `<html>`** на основе локали маршрута, чтобы они были корректными в серверном HTML.
- **Сохраняйте один URL для каждой локали** с префиксом, чтобы каждая языковая версия индексировалась.
- **Создавайте один экземпляр `I18n` на каждую локаль**, никогда не изменяйте глобальный экземпляр во время SSR: два параллельных запроса перезапишут локали друг друга.
- **Загружайте только активный каталог**, никогда не импортируйте все каталоги разом в клиентском коде.
- **Выберите один стиль макросов** (`useLingui` + `t` в компонентах, `msg` для отложенных дескрипторов) и придерживайтесь его. Смешивание `t`, `i18n._`, `i18n.t` и `<Trans>` усложняет чтение кода как для людей, так и для AI-ассистентов.
- **Запускайте `lingui extract` в CI**, чтобы новое сообщение никогда не попало в продакшн непереведенным.
- **Переводите метаданные** и объявляйте `canonical`, `hreflang` и `x-default` на каждой странице.
- **Генерируйте мультиязычные sitemap и robots.txt** и выполняйте пререндеринг для каждой локали.
- **Используйте реальные ссылки для переключателя языка**, чтобы поисковые роботы находили каждую языковую версию.

> См. наше руководство по [интернационализации и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md), а также [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

## Пошаговое руководство по настройке Lingui в приложении TanStack Start

Вот структура проекта, которую мы создадим:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Сгенерировано `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware запросов (редирект локали)
    ├── i18n
    │   ├── config.ts           # Локали, URL-хелперы
    │   ├── lingui.ts           # Загрузчик каталогов, экземпляры I18n
    │   ├── negotiateLocale.ts  # Парсинг Accept-Language
    │   └── seo.ts              # Конструктор head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Лейаут локали + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Локализованная 404
```

<Steps>
<Step number={1} title="Установка зависимостей">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: рантайм, `I18nProvider` и макросы (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: утилита `lingui extract` для сбора сообщений в каталоги.
- **@lingui/vite-plugin**: компилирует каталоги `.po` при импорте, поэтому `lingui compile` выполнять не требуется.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: трансформируют макросы во время сборки.

</Step>
<Step number={2} title="Централизация конфигурации локалей">

Локаль по умолчанию остается без префикса (`/about`), остальные локали получают префикс (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Публичный домен, используемый для канонических URL, hreflang и sitemap. */
export const siteUrl = "https://example.com";

/** Cookie, хранящий локаль, явно выбранную посетителем. */
export const localeCookieName = "locale";

/** Open Graph ожидает коды вида `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Сопоставляет опциональный параметр маршрута `{-$locale}` с поддерживаемой локалью. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** Значение для передачи в параметр `locale`: `undefined` для дефолтной локали. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, локаль по умолчанию остается без префикса. */
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
<Step number={3} title="Настройка Lingui">

Конфигурация Lingui повторно использует тот же список локалей, благодаря чему каталоги, роутер и sitemap всегда согласованы.

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

Добавьте скрипты извлечения сообщений:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

Скрипт `i18n:check` завершится с ошибкой в CI, если компонент содержит сообщение, которое не было извлечено и закоммичено.

</Step>
<Step number={4} title="Настройка Vite">

В `@vitejs/plugin-react` v6 Babel больше не встроен по умолчанию. `@rolldown/plugin-babel` запускает плагин макросов Lingui, а `linguiTransformerBabelPreset` обрабатывает только файлы, импортирующие макрос, что сохраняет высокую скорость сборки.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Загрузка каталогов для каждой локали">

Шаблонная строка в `import()` позволяет Vite создавать **отдельный чанк для каждого каталога**, а плагин Lingui компилирует файл `.po` прямо в него. Посетитель из Франции загружает только французский каталог.

Скомпилированные сообщения представляют собой обычные данные, поэтому они могут возвращаться загрузчиком маршрута (loader), сериализоваться в HTML и повторно использоваться при гидратации.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Загружает скомпилированный каталог для одной локали (один чанк на локаль).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Создает изолированный экземпляр I18n: безопасно для параллельных SSR-запросов.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Загружает каталог и возвращает готовый к использованию экземпляр для загрузчиков
 * и серверных функций.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Чтобы TypeScript распознавал импорт файлов `.po`, объявите модуль:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Создание корневого документа">

Корневой маршрут считывает опциональный параметр локали для установки атрибутов `lang` и `dir` на сервере в теге `<html>`.

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
<Step number={7} title="Создание маршрута-лейаута локали">

Папка `{-$locale}` создает опциональный сегмент пути: `/about` и `/fr/about` оба соответствуют `/{-$locale}/about`. Лейаут отклоняет неизвестные префиксы, загружает каталог текущей локали и предоставляет отдельный экземпляр `I18n`.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // Каталог никогда не меняется для заданной локали
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // Один экземпляр на локаль, никогда не разделяется между запросами
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Использование переводов на страницах">

Пишите исходный текст прямо в компоненте. Макросы преобразуют его в идентификаторы сообщений во время сборки, а `lingui extract` собирает их.

- `<Trans>` для JSX-контента, включая вложенные элементы;
- `useLingui().t` для строк (атрибуты, пропсы);
- `<Plural>` для плюрализации ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Переводим метаданные в загрузчике: функция head() остается синхронной
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> Динамический `import()` каталога кэшируется системой модулей, поэтому вызов `loadI18n` в нескольких загрузчиках не скачивает каталог повторно.

</Step>
<Step number={9} title="Извлечение и перевод сообщений">

Запустите извлечение. Lingui запишет каждое сообщение в каталог каждой локали:

```bash
npm run i18n:extract
```

Затем переведите поле `msgstr` для каждой записи:

<Tabs group="locale">
 <Tab value='fr' label='Французский'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Испанский'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> По умолчанию идентификаторы сообщений представляют собой хэши исходного текста: изменение текста на английском языке создает новое сообщение. Используйте явные идентификаторы (`<Trans id="about.title">About us</Trans>`) для часто меняющихся текстов.

</Step>
<Step number={10} title="Создание компонента LocalizedLink" isOptional={true}>

Каждый маршрут расположен внутри `{-$locale}`, поэтому ссылки должны передавать параметр текущей локали.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Смена языка контента" isOptional={true}>

Отображайте переключатель в виде **ссылок**, чтобы поисковые роботы могли находить все языковые версии. Параметр `to="."` сохраняет текущую страницу и заменяет параметр локали. Загрузчик лейаута локали затем получает новый каталог.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // Версия макроса также возвращает экземпляр i18n
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
<Step number={12} title="Интернационализация метаданных" isOptional={true}>

Каждая языковая версия может ранжироваться самостоятельно, если каждая страница предоставляет переведенные `<title>` и описание, самоссылающийся канонический URL, один `hreflang` на локаль плюс `x-default`, локали Open Graph и JSON-LD с `inLanguage`. Метаданные переводятся в загрузчике (шаг 8), а вспомогательная функция формирует остальное:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Путь без префикса локали, например "/about" */
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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
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

</Step>
<Step number={13} title="Интернационализация Sitemap и robots.txt" isOptional={true}>

Файл sitemap перечисляет все URL для каждой локали, при этом каждая запись объявляет все свои альтернативные версии с помощью `xhtml:link`. Файл `robots.txt` блокирует закрытые маршруты для всех языков и указывает на sitemap. Удалите `public/robots.txt`, если он был создан шаблоном проекта.

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Предварительный рендеринг для каждой локали" isOptional={true}>

Перечислите все локализованные пути, чтобы TanStack Start выполнил предварительный рендеринг (prerender) для всех языковых версий во время сборки:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Редирект новых посетителей и обработка страниц 404" isOptional={true}>

Middleware запроса направляет посетителя, перешедшего на `/`, на его предпочтительный язык (сначала проверяется cookie, затем заголовок `Accept-Language`). Прямые ссылки никогда не перенаправляются, поэтому поисковые роботы и пользователи по внешним ссылкам всегда получают запрошенную страницу.

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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

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

Для страниц 404 универсальный catch-all маршрут отрисовывает локализованный `notFoundComponent` лейаута. Добавьте директиву `noindex`: React 19 автоматически переместит `<meta>` в `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Сохраните макросы, сократив рантайм с помощью Intlayer" isOptional={true}>

Адаптер совместимости [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md) позволяет оставить исходный код без изменений: макросы компилируются так же, как и раньше, а результирующие вызовы `i18n._()`, `useLingui()` и `<Trans>` обслуживаются скомпилированными словарями Intlayer. В бенчмарке размер рантайма уменьшается с **~56.7 KB до ~9.8 KB** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Добавьте плагин после трансформации макросов, чтобы он сопоставил псевдонимы `@lingui/core` и `@lingui/react` с адаптером:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Каталоги синхронизируются с помощью [плагина sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) (каталоги JSON) или [плагина sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) (каталоги PO). Подробную настройку смотрите в [руководстве по совместимости с Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md), а прямое сравнение - в статье [Lingui против @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Автоматизация переводов с помощью Intlayer" isOptional={true}>

Lingui извлекает сообщения, но заполнение десятков каталогов вручную отнимает больше всего времени. Intlayer - **бесплатный** инструмент с **открытым исходным кодом**, который работает в связке с Lingui:

- **Переводите с помощью AI**, используя собственный API-ключ и провайдера. См. [автозаполнение](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md) и [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).
- **Сохраняйте ваши PO-файлы** в качестве единого источника правды с помощью [плагина sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md).
- **Проверяйте отсутствие переводов** в CI. См. [тестирование переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).
- **Проводите аудит развернутого сайта** на отсутствие `hreflang`, неправильные канонические URL и утечки локалей с помощью [команды scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/scan.md).

</Step>
</Steps>

## Часто задаваемые вопросы

<FAQ>

<Question title="Работает ли Lingui с TanStack Start?">

Да. У Lingui нет отдельной официальной интеграции для TanStack Start, но его плагин Vite и плагин макросов Babel работают без изменений. Два ключевых момента, которые нужно настроить правильно: запуск макросов через `@rolldown/plugin-babel` (Vite 8 и `@vitejs/plugin-react` v6 больше не включают Babel) и создание отдельного экземпляра `I18n` на каждую локаль вместо активации глобального экземпляра во время SSR.

</Question>
<Question title="Почему нельзя использовать глобальный объект i18n из @lingui/core?">

На сервере один процесс обрабатывает множество запросов одновременно. Вызов `i18n.activate("fr")` на общем объекте изменит язык для запроса, параллельно рендерящегося на английском языке. `setupI18n` создает изолированный экземпляр для каждой локали, что полностью безопасно.

</Question>
<Question title="Нужно ли запускать lingui compile?">

Нет. `@lingui/vite-plugin` компилирует каталоги `.po` при их импорте. Вам нужно запускать только `lingui extract` для сбора новых сообщений.

</Question>
<Question title="Как перевести заголовок страницы и мета-описание с помощью Lingui?">

Объявите их с помощью макроса `msg` и переведите в загрузчике маршрута с помощью ``i18n._(msg`...`)``. Загрузчик возвращает обычные строки, поэтому `head()` остается синхронной функцией, а значения сериализуются для гидратации. Полная настройка показана на шаге 8 и шаге 12.

</Question>
<Question title="Сколько места занимает Lingui в бандле TanStack Start?">

[Бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) фиксирует размер рантайма ~56.7 KB gzip. При загрузке одного каталога на локаль по требованию страницы весят ~115 KB по сравнению со 111 KB без i18n. Статический импорт всех каталогов сразу увеличивает этот размер до ~152 KB.

</Question>
<Question title="Можно ли сохранить макросы Lingui и перейти на Intlayer?">

Да. Адаптер [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/lingui.md) сохраняет макросы и заменяет рантайм. Затем вы можете постепенно переводить компоненты на `useIntlayer` по одному. См. [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md).

</Question>

</FAQ>
