---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Интернационализация TanStack Start с помощью Paraglide JS: руководство по настройке 2026 года"
description: "Переведите ваше приложение TanStack Start с помощью Paraglide JS: стратегия URL, переписывание маршрутизатора, middleware для SSR, hreflang, sitemap и robots.txt, а также реальные данные бенчмарков."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Интернационализация
  - i18n
  - SEO
  - React
  - Блог
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Начальная версия"
author: aymericzip
---

# Как интернационализировать приложение TanStack Start с помощью Paraglide JS в 2026 году

## Содержание

<TOC/>

## Что такое Paraglide JS?

**Paraglide JS** (от inlang) - это библиотека i18n **на основе компилятора**. Вместо поставки рантайма, который ищет ключи в объекте JSON, она компилирует каждое сообщение в типизированную JavaScript-функцию (`m.about_title()`). Неиспользуемые сообщения могут быть удалены сборщиком, а опечатка в ключе приводит к ошибке компиляции.

Paraglide - это подход к i18n, используемый в официальных примерах TanStack Router, и он интегрируется с TanStack Start через три компонента:

- **плагин Vite**, который компилирует сообщения и рантайм в `src/paraglide`;
- **серверный middleware**, определяющий локаль для каждого запроса;
- **переписывание маршрутизатора (router rewrite)**, которое сопоставляет локализованные URL (`/fr/about`) с деревом маршрутов (`/about`), поэтому вам не нужен сегмент `$locale`.

В этом руководстве настраиваются все три компонента, а затем рассматривается все, что Paraglide оставляет на ваше усмотрение: `lang` и `dir`, переключатель локалей, переведенные метаданные, `canonical`, `hreflang` с `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, предварительный рендеринг и локализованные страницы 404.

> Ищете другой стек? См. [руководство по TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_use-intl.md), [руководство по TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_lingui.md) или [руководство по TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

> Сравниваете два подхода на основе компилятора? Читайте [легче ли Intlayer, чем Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/is_intlayer_lighter_than_paraglide.md).

## Что говорит бенчмарк о Paraglide на TanStack Start

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) запускает одно и то же приложение TanStack Start на 10 страниц и 10 локалей с каждой популярной библиотекой и измеряет то, что браузер фактически загружает.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Ключевые показатели для `@inlang/paraglide-js@2.15.1`, измеренные 2026-09-26 (gzip):

| Конфигурация                  | Размер библиотеки | JS на страницу | Утечка других локалей | Утечка других страниц | Загрузка страницы |
| :---------------------------- | ----------------: | -------------: | --------------------: | --------------------: | ----------------: |
| Без i18n (базовое приложение) |                 - |       111.0 KB |                    0% |                    0% |           15.7 ms |
| Paraglide JS                  |            1.8 KB |       125.1 KB |                 49.7% |                    0% |           22.1 ms |
| `react-intlayer`              |            4.5 KB |       126.8 KB |                    0% |                    0% |           14.8 ms |
| `use-intl`                    |           75.9 KB |       128.7 KB |                    0% |                    0% |           17.4 ms |
| Lingui                        |           56.7 KB |       120.2 KB |                  8.6% |                    0% |           21.9 ms |

Главные выводы:

- **Рантайм крошечный, и страницы не утекают.** Рантайм генерируется для вашей конфигурации, а сообщения импортируются там, где они используются.
- **Локали утекают.** Каждая функция сообщения содержит все локали, поэтому около половины переведенных строк, отправляемых на страницу, относятся к языкам, которые посетитель не использует. Чем больше локалей вы добавляете, тем больше становится эта доля.
- **Загрузка страницы самая медленная в группе**, отчасти потому, что локаль разрешается через стратегии при каждом вызове, а не считывается из контекста React.

> Смотрите полные данные: [отчет бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md), а также [репозиторий бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

## Сравнение возможностей на TanStack Start

Как Paraglide JS сравнивается с другими библиотеками, часто используемыми на TanStack Start:

| Возможность                                      | `react-intlayer` (Intlayer)             | `use-intl`                    | Paraglide JS                             | Lingui                          |
| ------------------------------------------------ | --------------------------------------- | ----------------------------- | ---------------------------------------- | ------------------------------- |
| **Переводы рядом с компонентами**                | ✅ Совместное размещение                | ❌ Централизованный JSON      | ❌ Один JSON-файл на локаль              | ⚠️ Исходный текст в компонентах |
| **Интеграция с TypeScript**                      | ✅ Автоматически создаваемые типы       | ✅ Через `AppConfig`          | ✅ Типизированные функции сообщений      | ⚠️ Только макросы               |
| **Обнаружение отсутствующих переводов**          | ✅ Ошибки типов и предупреждения сборки | ⚠️ Фолбэк во время выполнения | ⚠️ Фолбэк на базовую локаль              | ⚠️ Фолбэк на исходный текст     |
| **Богатый контент (JSX, Markdown)**              | ✅ Прямая поддержка                     | ⚠️ Теги через `t.rich`        | ⚠️ Строки                                | ✅ JSX внутри `<Trans>`         |
| **Локализованная маршрутизация**                 | ✅ Встроена                             | ❌ Вручную `{-$locale}`       | ✅ `urlPatterns` + rewrite роутера       | ❌ Вручную `{-$locale}`         |
| **Смена локали без перезагрузки**                | ✅ Да                                   | ✅ Да                         | ❌ Полная перезагрузка страницы          | ✅ Да                           |
| **Плюрализация**                                 | ✅ На основе перечислений               | ✅ ICU                        | ✅ Варианты                              | ✅ ICU                          |
| **ICU MessageFormat**                            | ✅ Через `format: "icu"`                | ✅ Нативно                    | ⚠️ Через плагин inlang                   | ✅ Нативно                      |
| **Форматы контента**                             | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`                    | ⚠️ inlang JSON                           | ✅ PO, JSON, CSV                |
| **Перевод с помощью ИИ**                         | ✅ Собственный провайдер и ключ         | ❌ Нет                        | ❌ Нет                                   | ❌ Нет                          |
| **Визуальный редактор / CMS**                    | ✅ Локальный редактор + CMS по желанию  | ❌ Внешние платформы          | ⚠️ Приложения экосистемы inlang          | ❌ Внешние платформы            |
| **SEO-хелперы (hreflang, sitemap)**              | ✅ Встроены                             | ❌ Вручную                    | ⚠️ Локализованные URL, остальное вручную | ❌ Вручную                      |
| **Размер рантайма (gzip, бенчмарк)**             | 4.5 KB                                  | 75.9 KB                       | 1.8 KB                                   | 56.7 KB                         |
| **Утечка, лучшая настройка (локаль / страница)** | 0% / 0%                                 | 0% / 0%                       | 49.7% / 0%                               | 8.6% / 0%                       |
| **Отсутствующие переводы в CI**                  | ✅ `npx intlayer test`                  | ⚠️ Не встроено                | ⚠️ Не встроено                           | ✅ `lingui compile --strict`    |

> Данные о размере рантайма и утечках взяты из [бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md). Утечка измеряется при наилучшей настройке каждой библиотеки.

> Другие руководства по TanStack Start: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_lingui.md), [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_tanstack-start_use-intl.md) и [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

## Практики, которым следует следовать

- **Устанавливайте `lang` и `dir` для `<html>`** на основе определенной локали на сервере.
- **Сохраняйте один URL на локаль** со стратегией префиксов (`/fr/about`), чтобы каждая языковая версия индексировалась.
- **Ставьте `url` на первое место в стратегии локалей**, чтобы URL был источником истины, а поисковые роботы получали именно запрошенную страницу.
- **Используйте плоские, описательные ключи сообщений** (`about_title`), которые аккуратно преобразуются в имена функций.
- **Фиксируйте в коммитах `messages/*.json`, а не сгенерированную папку `src/paraglide`**, чтобы избежать конфликтов слияния в автоматически генерируемых файлах.
- **Переводите метаданные** и объявляйте `canonical`, `hreflang` и `x-default` на каждой странице.
- **Генерируйте мультиязычный sitemap и robots.txt**, а также предварительно рендерите каждую локаль.
- **Используйте настоящие ссылки для переключателя локалей**, чтобы поисковые роботы могли обнаружить каждый язык.

> См. наше руководство по [интернационализации и SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md) и [руководство по hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/hreflang_guide_multilingual_seo.md).

## Пошаговое руководство по настройке Paraglide JS в приложении TanStack Start

Вот структура проекта, которую мы создадим:

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Обратите внимание, что папки `$locale` нет: переписывание маршрутизатора удаляет префикс перед сопоставлением маршрутов.

<Steps>
<Step number={1} title="Установите зависимости">

Начните с проекта TanStack Start, затем инициализируйте Paraglide. Команда init создает `project.inlang/settings.json`, первый файл `messages/en.json` и устанавливает пакет.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: компилятор и его плагин для Vite. Пакет среды выполнения устанавливать не нужно: рантайм генерируется прямо в ваш проект.

</Step>
<Step number={2} title="Настройте ваши локали">

`project.inlang/settings.json` является единым источником истины для локалей. Плагин формата сообщений считывает по одному JSON-файлу для каждой локали.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Настройте плагин Vite и стратегию URL">

Плагин компилирует сообщения при каждом изменении. Для TanStack Start важны три параметра:

- **`strategy`**: упорядоченный список мест для извлечения локали. Значение `url` на первом месте делает URL источником истины. `cookie` и `preferredLanguage` используются middleware, когда URL не содержит локали.
- **`urlPatterns`**: как локаль сопоставляется с URL. Локали, отличные от дефолтной, указываются первыми, так как побеждает первый совпавший паттерн. В данном случае локаль по умолчанию остается без префикса (`/about`), а остальные локали получают префикс (`/fr/about`).
- **`outputStructure: "message-modules"`**: один модуль на каждое сообщение, что позволяет сборщику удалять сообщения, которые страница не импортирует.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Добавьте сгенерированную папку в `.gitignore`. Она пересоздается при `dev` и `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Создайте файлы переводов">

Каждый ключ становится функцией, экспортируемой из `src/paraglide/messages`. Плоские ключи в snake_case дают самые чистые имена функций. Для переменных используются плейсхолдеры `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Для форм множественного числа используется синтаксис вариантов (variants) формата сообщений inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Добавьте серверный middleware">

Middleware определяет локаль каждого запроса с помощью вашей стратегии и делает ее доступной для `getLocale()` на протяжении всего серверного рендеринга через область видимости `AsyncLocalStorage`. Это обеспечивает безопасность параллельных запросов на разных языках.

В TanStack Start оберните стандартную точку входа сервера:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Настройте переписывание локализованных URL в маршрутизаторе">

Опция `rewrite` в TanStack Router транслирует URL на границе маршрутизатора:

- **input**: `/fr/about` де-локализуется в `/about` перед сопоставлением, поэтому один маршрут `about.tsx` обслуживает все языки;
- **output**: каждый сгенерированный `href` (ссылки, редиректы, навигация) локализуется для активной локали, поэтому `<Link to="/about">` рендерит `/fr/about` на французской странице.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Поскольку ссылки локализуются механизмом rewrite, вам не нужен специальный компонент `LocalizedLink`: используйте стандартный `Link` из TanStack Router.

</Step>
<Step number={7} title="Создайте корневой документ">

`getLocale()` возвращает локаль, определенную middleware на сервере, и локаль из URL в браузере, благодаря чему `lang` и `dir` совпадают в серверном HTML и после гидратации.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

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

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Используйте переводы на ваших страницах">

Сообщения представляют собой обычные функции: импортируйте `m`, вызовите функцию, передайте переменные в виде объекта. Все типизировано, включая переменные.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Функция сообщения также принимает явную локаль: `m.about_title({}, { locale: "fr" })`. Это полезно в серверном коде, который рендерит язык, отличный от языка запроса (например, в письмах).

</Step>
<Step number={9} title="Смена языка вашего контента" isOptional={true}>

Отображайте переключатель в виде **ссылок** с помощью `localizeHref`, чтобы поисковые роботы могли обнаружить каждый язык. `setLocale` сохраняет выбор в cookie и перезагружает страницу на новом языке: полная перезагрузка является ожидаемым поведением Paraglide, поскольку функции сообщений считывают локаль при каждом вызове вместо подписки на состояние React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Интернационализация ваших метаданных" isOptional={true}>

Каждая языковая версия может ранжироваться самостоятельно, если каждая страница предоставляет:

- **переведенные** `<title>` и `description`;
- **canonical** URL, указывающий на саму себя;
- один **альтернативный `hreflang` для каждой локали**, плюс **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` и `og:url`;
- **JSON-LD** с `inLanguage`.

Функция `localizeUrl` из Paraglide создает альтернативные URL на основе ваших `urlPatterns`, поэтому они никогда не разойдутся с реальной маршрутизацией:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
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
        href: getAbsoluteUrl(path, baseLocale),
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
<Step number={11} title="Интернационализация sitemap" isOptional={true}>

Мультиязычная карта сайта (sitemap) перечисляет каждый URL для каждой локали, и каждая запись объявляет все свои альтернативы с помощью `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
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
<Step number={12} title="Интернационализация robots.txt" isOptional={true}>

Приватные маршруты существуют на каждом языке, поэтому правила `Disallow` должны охватывать каждый локализованный путь. Удалите `public/robots.txt`, если он был создан шаблоном, и отдавайте его через маршрут:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
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
<Step number={13} title="Предварительный рендеринг каждой локали" isOptional={true}>

Укажите локализованный путь для каждой страницы, чтобы TanStack Start предварительно отрендерил все языковые версии. Функция `localizeHref` представляет собой сгенерированный код без зависимостей от браузера, поэтому ее можно запускать в `vite.config.ts`, но этот файл появляется только после первой компиляции. Ручное перечисление путей, как показано ниже, позволяет избежать проблем с порядком сборки:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Поскольку переключатель отображает настоящие ссылки, параметр `crawlLinks: true` также найдет страницы, которые вы забыли указать.

</Step>
<Step number={14} title="Обработка локализованных страниц 404" isOptional={true}>

Благодаря механизму rewrite путь `/fr/does-not-exist` сопоставляется как `/does-not-exist`, а `getLocale()` по-прежнему возвращает `fr`, поэтому корневой `notFoundComponent` из шага 7 отображается на французском языке. Маршрут catch-all гарантирует, что вложенные пути также попадут на эту страницу. Отметьте страницу тегом `noindex`: React 19 переместит `<meta>` в `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Доступ к локали в серверных функциях" isOptional={true}>

Серверные функции выполняются внутри контекста middleware Paraglide, поэтому `getLocale()` работает и там:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Сравнение с Intlayer" isOptional={true}>

Прямого адаптера для перехода с Paraglide на Intlayer нет, так как обе библиотеки следуют схожей концепции: компиляция контента во время сборки и минимальный объем рантайма. Различия заключаются в том, что попадает в браузер и как организован контент:

- **Локали**: Intlayer загружает [динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) для каждой локали (0% утечки локалей в бенчмарке), тогда как каждая функция сообщений Paraglide содержит все локали (49.7%).
- **Организация контента**: контент может располагаться в файлах `.content.ts` рядом с каждым компонентом или в централизованных файлах. См. [покомпонентная или централизованная i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/per-component_vs_centralized_i18n.md).
- **Смена локали**: контент считывается из контекста React, поэтому смена локали приводит к повторному рендерингу без перезагрузки страницы.
- **Генерируемый код**: ничего не генерируется внутри `src`, поэтому перед коммитом не нужно ничего пересоздавать.

Если вы переходите с другой библиотеки, а не с Paraglide, [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) сохраняют API `use-intl`, `next-intl`, `react-i18next`, `react-intl` или Lingui, заменяя только рантайм.

См. статью [легче ли Intlayer, чем Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/is_intlayer_lighter_than_paraglide.md) и [руководство по Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Автоматизация переводов с помощью Intlayer" isOptional={true}>

Paraglide отображает переводы, но не помогает вам **создавать** их. Intlayer является **бесплатным** решением с **открытым исходным кодом**, и его инструменты полезны даже в проекте на Paraglide:

- **Переводите с помощью ИИ**, используя собственный ключ API и провайдера. См. [автозаполнение](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md) и [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).
- **Сохраняйте ваши JSON-файлы** в качестве источника истины с помощью [плагина синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md).
- **Проверяйте отсутствие переводов** в CI. См. [тестирование переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).
- **Сканируйте развернутый сайт** на предмет отсутствующих тегов `hreflang`, неправильных канонических ссылок и утечек локалей с помощью [команды scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/scan.md).

</Step>
</Steps>

## Часто задаваемые вопросы

<FAQ>

<Question title="Является ли Paraglide JS хорошим выбором для TanStack Start?">

Это надежный выбор: он используется в официальных примерах TanStack Router, имеет наименьший размер рантайма в [бенчмарке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/tanstack.md) (~1.8 KB gzip), а сообщения полностью типизированы. Компромиссы состоят в том, что каждая функция сообщения содержит все локали, из-за чего примерно половина переведенных строк утекает посетителям на других языках, а смена локали перезагружает страницу.

</Question>
<Question title="Нужен ли мне сегмент маршрута $locale при использовании Paraglide?">

Нет. Механизм `rewrite` маршрутизатора удаляет префикс локали перед сопоставлением маршрутов и добавляет его обратно к сгенерированным ссылкам, поэтому один файл `about.tsx` обслуживает `/about`, `/fr/about` и `/es/about`.

</Question>
<Question title="Почему смена языка перезагружает страницу?">

Функции сообщений считывают локаль в момент вызова, они не подписаны на состояние React. Поэтому `setLocale` по умолчанию перезагружает страницу, чтобы каждое сообщение повторно отрендерилось на новом языке. Вы можете передать `{ reload: false }`, но в таком случае вам придется обновить дерево компонентов самостоятельно.

</Question>
<Question title="Стоит ли фиксировать в коммитах сгенерированную папку src/paraglide?">

Лучше этого не делать. Папка пересоздается при каждом `dev` и `build`, и ее фиксация приводит к конфликтам слияния в сгенерированных файлах. Вместо этого фиксируйте `messages/*.json` и `project.inlang/settings.json`.

</Question>
<Question title="Как добавить теги hreflang с помощью Paraglide?">

Используйте `localizeUrl` для создания одного абсолютного URL для каждой локали в `head()` маршрута и добавьте `x-default`, указывающий на базовую локаль. На шаге 10 представлен готовый вспомогательный хелпер, а на шаге 11 эти же альтернативы добавляются в sitemap.

</Question>
<Question title="Выполняет ли Paraglide tree-shaking неиспользуемых переводов?">

Неиспользуемые **сообщения** удаляются, если вы используете `outputStructure: "message-modules"`, поэтому контент других страниц не утекает. Неиспользуемые **локали** не удаляются: каждая функция сообщения содержит все переводы, именно поэтому бенчмарк фиксирует утечку локалей на уровне 49.7%.

</Question>
<Question title="Могу ли я перейти с Paraglide на Intlayer?">

Да. Обе библиотеки основаны на компиляторе, поэтому подход очень похож. Сохраните свои JSON-файлы с помощью [плагина синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md), а затем замените вызовы `m.key()` на `useIntlayer`, страницу за страницей. См. [руководство по Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md).

</Question>

</FAQ>
