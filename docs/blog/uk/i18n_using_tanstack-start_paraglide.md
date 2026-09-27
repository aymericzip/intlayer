---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n для TanStack Start за допомогою Paraglide JS: Посібник з налаштування 2026"
description: "Перекладіть ваш застосунок TanStack Start за допомогою Paraglide JS: стратегія URL, переписування роутера, middleware для SSR, hreflang, sitemap і robots.txt, а також реальні дані бенчмарків."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Інтернаціоналізація
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
    changes: "Початкова версія"
author: aymericzip
---

# Як інтернаціоналізувати застосунок TanStack Start за допомогою Paraglide JS у 2026 році

## Зміст

<TOC/>

## Що таке Paraglide JS?

**Paraglide JS** (від inlang) - це бібліотека i18n, **побудована на компіляторі**. Замість того, щоб поставляти runtime, який шукає ключі в об'єкті JSON, вона компілює кожне повідомлення у типізовану функцію JavaScript (`m.about_title()`). Невикористані повідомлення можуть бути видалені збіркою (bundler), а друкарська помилка в ключі є помилкою компіляції.

Paraglide - це підхід до i18n, який використовується в офіційних прикладах TanStack Router, і він інтегрується з TanStack Start через три складові:

- **плагін Vite**, який компілює повідомлення та runtime у `src/paraglide`;
- **серверний middleware**, який визначає локаль кожного запиту;
- **переписування роутера (rewrite)**, яке зіставляє локалізовані URL (`/fr/about`) з вашим деревом маршрутів (`/about`), тому вам не потрібен сегмент `$locale`.

Цей посібник охоплює налаштування всіх трьох компонентів, а потім розглядає все, що Paraglide залишає на ваш розсуд: `lang` та `dir`, перемикач мов, перекладені метадані, `canonical`, `hreflang` з `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, пререндеринг та локалізовані сторінки 404.

> Шукаєте інший стек?

- [посібник з TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_use-intl.md)
- [посібник з TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_lingui.md)
- [посібник з TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)

> Порівнюєте два підходи на основі компілятора? Читайте [чи є Intlayer легшим за Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_intlayer_lighter_than_paraglide.md).

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)

## Що каже бенчмарк про Paraglide на TanStack Start

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) запускає один і той самий застосунок TanStack Start на 10 сторінок і 10 мов з кожною основною бібліотекою та вимірює, що насправді завантажує браузер.

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Ключові показники для `@inlang/paraglide-js@2.15.1`, виміряні 2026-09-26 (gzip):

| Конфігурація                  | Розмір бібліотеки | JS на сторінку | Витік інших локалей | Витік інших сторінок | Завантаження сторінки |
| :---------------------------- | ----------------: | -------------: | ------------------: | -------------------: | --------------------: |
| Без i18n (базовий застосунок) |                 - |       111.0 KB |                  0% |                   0% |               15.7 ms |
| Paraglide JS                  |            1.8 KB |       125.1 KB |               49.7% |                   0% |               22.1 ms |
| `react-intlayer`              |            4.5 KB |       126.8 KB |                  0% |                   0% |               14.8 ms |
| `use-intl`                    |           75.9 KB |       128.7 KB |                  0% |                   0% |               17.4 ms |
| Lingui                        |           56.7 KB |       120.2 KB |                8.6% |                   0% |               21.9 ms |

Головні висновки:

- **Runtime крихітний, а сторінки не мають витоків.** Runtime генерується під вашу конфігурацію, а повідомлення імпортуються там, де вони використовуються.
- **Локалі мають витік.** Кожна функція повідомлення містить усі локалі, тому приблизно половина перекладених рядків, надісланих на сторінку, припадає на мови, які відвідувач не використовує. Чим більше локалей ви додаєте, тим більшою стає ця частка.
- **Завантаження сторінки є найповільнішим у групі**, частково тому, що локаль визначається через стратегії під час кожного виклику, а не зчитується з React context.

> Перегляньте повні дані: [Звіт про бенчмарки TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md), а також [репозиторій бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

## Порівняння функціональності на TanStack Start

Як Paraglide JS виглядає у порівнянні з іншими бібліотеками, що часто використовуються на TanStack Start:

| Можливість                                           | `react-intlayer` (Intlayer)             | `use-intl`                    | Paraglide JS                       | Lingui                          |
| ---------------------------------------------------- | --------------------------------------- | ----------------------------- | ---------------------------------- | ------------------------------- |
| **Переклади поруч із компонентами**                  | ✅ Спільне розташування (Co-located)    | ❌ Централізований JSON       | ❌ Один файл JSON на локаль        | ⚠️ Вихідний текст у компонентах |
| **Інтеграція з TypeScript**                          | ✅ Автоматично згенеровані типи         | ✅ Через `AppConfig`          | ✅ Типізовані функції повідомлень  | ⚠️ Тільки макроси               |
| **Виявлення відсутніх перекладів**                   | ✅ Помилки типів і попередження збірки  | ⚠️ Fallback під час виконання | ⚠️ Fallback до базової локалі      | ⚠️ Fallback до вихідного тексту |
| **Багатий контент (JSX, Markdown)**                  | ✅ Пряма підтримка                      | ⚠️ Теги через `t.rich`        | ⚠️ Рядки                           | ✅ JSX усередині `<Trans>`      |
| **Локалізований роутинг**                            | ✅ Вбудовано                            | ❌ Вручну `{-$locale}`        | ✅ `urlPatterns` + rewrite роутера | ❌ Вручну `{-$locale}`          |
| **Зміна мови без перезавантаження**                  | ✅ Так                                  | ✅ Так                        | ❌ Повне перезавантаження          | ✅ Так                          |
| **Форми множини (Pluralization)**                    | ✅ На основі перелічення                | ✅ ICU                        | ✅ Варіанти                        | ✅ ICU                          |
| **ICU MessageFormat**                                | ✅ Через `format: "icu"`                | ✅ Нативно                    | ⚠️ Через плагін inlang             | ✅ Нативно                      |
| **Формати контенту**                                 | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`                    | ⚠️ inlang JSON                     | ✅ PO, JSON, CSV                |
| **Переклад через AI**                                | ✅ Власний провайдер і ключ             | ❌ Ні                         | ❌ Ні                              | ❌ Ні                           |
| **Візуальний редактор / CMS**                        | ✅ Локальний редактор + опціональна CMS | ❌ Зовнішні платформи         | ⚠️ Застосунки екосистеми inlang    | ❌ Зовнішні платформи           |
| **SEO-інструменти (hreflang, sitemap)**              | ✅ Вбудовано                            | ❌ Вручну                     | ⚠️ Локалізовані URL, решта вручну  | ❌ Вручну                       |
| **Розмір runtime (gzip, бенчмарк)**                  | 4.5 KB                                  | 75.9 KB                       | 1.8 KB                             | 56.7 KB                         |
| **Витік, найкраща конфігурація (локаль / сторінка)** | 0% / 0%                                 | 0% / 0%                       | 49.7% / 0%                         | 8.6% / 0%                       |
| **Перевірка відсутніх перекладів у CI**              | ✅ `npx intlayer test`                  | ⚠️ Не вбудовано               | ⚠️ Не вбудовано                    | ✅ `lingui compile --strict`    |

> Дані про розмір runtime та витоки взяті з [бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md). Витік вимірюється на найкращій конфігурації для кожної бібліотеки.

> Інші посібники для TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)

## Практики, яких варто дотримуватися

- **Встановлюйте `lang` та `dir` на тегу `<html>`** на основі визначеної локалі на сервері.
- **Зберігайте окремий URL для кожної локалі** зі стратегією префіксів (`/fr/about`), щоб кожна мовна версія індексувалася.
- **Ставте `url` першим у вашій стратегії локалей**, щоб URL був єдиним джерелом правди, а пошукові роботи отримували саме ту сторінку, яку запитували.
- **Використовуйте плоскі описові ключі повідомлень** (`about_title`), які чітко трансформуються в назви функцій.
- **Фіксуйте в git ваші файли `messages/*.json`, а не згенеровану папку `src/paraglide`**, щоб уникнути конфліктів злиття у згенерованих файлах.
- **Перекладайте ваші метадані** та оголошуйте `canonical`, `hreflang` і `x-default` на кожній сторінці.
- **Генеруйте багатомовні sitemap та robots.txt** і виконуйте пререндеринг для кожної локалі.
- **Використовуйте справжні посилання для перемикача мов**, щоб пошукові роботи могли знаходити всі мовні версії.

- [інтернаціоналізацію та SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md)
- [посібник з hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md)

## Покроковий посібник з налаштування Paraglide JS у застосунку TanStack Start

Ось структура проєкту, яку ми створимо:

```bash
.
├── project.inlang
│   └── settings.json          # Локалі та формат повідомлень
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Згенеровано, додано в git-ignore
    ├── server.ts              # Middleware Paraglide
    ├── router.tsx             # Переписування URL (URL rewrite)
    ├── i18n
    │   ├── config.ts          # URL сайту, допоміжні функції
    │   └── seo.ts             # Конструктор head()
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / та /fr
        ├── about.tsx          # /about та /fr/about
        ├── $.tsx              # Локалізована 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Зверніть увагу, що папки `$locale` немає: переписування роутера видаляє префікс перед зіставленням маршрутів.

<Steps>
<Step number={1} title="Встановіть залежності">

Почніть із проєкту TanStack Start, а потім ініціалізуйте Paraglide. Команда init створює `project.inlang/settings.json`, перший `messages/en.json` та встановлює пакет.

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

- **@inlang/paraglide-js**: компілятор та його плагін Vite. Окремого runtime-пакету встановлювати не потрібно: runtime генерується прямо у вашому проєкті.

</Step>
<Step number={2} title="Налаштуйте ваші локалі">

`project.inlang/settings.json` є єдиним джерелом правди для локалей. Плагін формату повідомлень зчитує один файл JSON для кожної локалі.

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
<Step number={3} title="Налаштуйте плагін Vite та стратегію URL">

Плагін компілює повідомлення при кожній зміні. Для TanStack Start мають значення три параметри:

- **`strategy`**: впорядкований список місць, звідки зчитувати локаль. `url` на першому місці робить URL єдиним джерелом правди. `cookie` та `preferredLanguage` використовуються middleware, коли URL не дає однозначної відповіді.
- **`urlPatterns`**: те, як локаль співвідноситься з URL. Нетипові локалі вказуються першими, оскільки спрацьовує перший шаблон, що збігся. Тут базова локаль залишається без префікса (`/about`), а інші отримують префікс (`/fr/about`).
- **`outputStructure: "message-modules"`**: один модуль на кожне повідомлення, що дозволяє збірнику видаляти повідомлення, які не імпортуються на сторінці.

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

Додайте згенеровану папку до `.gitignore`. Вона перебудовується під час `dev` та `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Створіть файли перекладів">

Кожен ключ перетворюється на функцію, експортовану з `src/paraglide/messages`. Плоскі ключі у форматі snake_case забезпечують найчистіші назви функцій. Змінні використовують плейсхолдери у вигляді `{name}`.

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

Форми множини використовують синтаксис варіантів формату повідомлень inlang:

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
<Step number={5} title="Додайте серверний Middleware">

Middleware визначає локаль кожного запиту згідно з вашою стратегією та робить її доступною для `getLocale()` під час усього рендерингу на сервері через область видимості `AsyncLocalStorage`. Саме це забезпечує безпеку паралельних запитів різними мовами.

У TanStack Start оберніть стандартну точку входу сервера:

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
<Step number={6} title="Перепишіть локалізовані URL у роутері">

Опція `rewrite` у TanStack Router трансформує URL на межі роутера:

- **вхідні дані (input)**: `/fr/about` де-локалізується у `/about` перед зіставленням, тому єдиний маршрут `about.tsx` обслуговує всі мови;
- **вихідні дані (output)**: кожен згенерований `href` (посилання, перенаправлення, навігація) локалізується для активної локалі, тому `<Link to="/about">` рендерить `/fr/about` на французькій сторінці.

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

> Оскільки посилання локалізуються механізмом rewrite, вам не потрібен кастомний компонент `LocalizedLink`: використовуйте звичайний `Link` з TanStack Router.

</Step>
<Step number={7} title="Створіть кореневий документ">

`getLocale()` повертає локаль, визначену middleware на сервері, та локаль з URL у браузері, тому атрибути `lang` і `dir` залишаються ідентичними в серверному HTML та після гідратації.

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
<Step number={8} title="Використовуйте переклади на ваших сторінках">

Повідомлення є звичайними функціями: імпортуйте `m`, викличте функцію, передайте змінні як об'єкт. Усе типізовано, включно зі змінними.

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

> Функція повідомлення також приймає явну локаль: `m.about_title({}, { locale: "fr" })`. Це корисно в серверному коді, який рендерить іншу мову, ніж у запиті, наприклад для електронних листів.

</Step>
<Step number={9} title="Змініть мову вашого контенту" isOptional={true}>

Рендерите перемикач як **посилання** за допомогою `localizeHref`, щоб пошукові системи знаходили кожну мову. `setLocale` зберігає вибір у cookie та перезавантажує сторінку з новою мовою: повне перезавантаження є очікуваною поведінкою Paraglide, оскільки функції повідомлень читають локаль під час кожного виклику, а не підписуються на стан React.

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
<Step number={10} title="Інтернаціоналізуйте ваші метадані" isOptional={true}>

Кожна мовна версія може ранжуватися окремо, якщо кожна сторінка містить:

- **перекладені** `<title>` та `description`;
- **canonical** URL, що вказує на саму себе;
- один **альтернативний `hreflang` для кожної локалі**, плюс **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` та `og:url`;
- **JSON-LD** із параметром `inLanguage`.

Функція `localizeUrl` у Paraglide будує альтернативні URL на основі ваших `urlPatterns`, тому вони ніколи не розійдуться з реальним роутингом:

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
<Step number={11} title="Інтернаціоналізуйте ваш Sitemap" isOptional={true}>

Багатомовна карта сайту (sitemap) перелічує кожен URL кожної локалі, а кожен запис декларує всі свої альтернативи за допомогою `xhtml:link`:

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
<Step number={12} title="Інтернаціоналізуйте ваш robots.txt" isOptional={true}>

Приватні маршрути існують кожною мовою, тому правила `Disallow` мають охоплювати кожен локалізований шлях. Видаліть `public/robots.txt`, якщо стартовий шаблон створив його, а потім повертайте його через маршрут:

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
<Step number={13} title="Здійснюйте пререндеринг кожної локалі" isOptional={true}>

Вкажіть локалізований шлях кожної сторінки, щоб TanStack Start робив пререндеринг для всіх мовних версій. `localizeHref` - це згенерований код без залежностей від браузера, тому він може виконуватися у `vite.config.ts`, однак файл існує лише після першої компіляції. Вказання шляхів вручну, як показано нижче, дозволяє уникнути проблем із порядком виконання:

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

Оскільки перемикач рендерить справжні посилання, параметр `crawlLinks: true` також знаходитиме сторінки, які ви забули вказати.

</Step>
<Step number={14} title="Обробіть локалізовані сторінки 404" isOptional={true}>

Завдяки переписуванню роутера шлях `/fr/does-not-exist` зіставляється як `/does-not-exist`, а `getLocale()` повертає `fr`, тому кореневий `notFoundComponent` з кроку 7 рендериться французькою. Маршрут catch-all гарантує, що вкладені шляхи також дістануться цієї обробки. Позначте сторінку як `noindex`: React 19 піднімає тег `<meta>` у `<head>`.

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
<Step number={15} title="Отримуйте доступ до локалі в Server Functions" isOptional={true}>

Серверні функції виконуються всередині області видимості middleware Paraglide, тому `getLocale()` працює і там:

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
<Step number={16} title="Порівняйте з Intlayer" isOptional={true}>

Прямого адаптера з Paraglide на Intlayer немає, оскільки обидві бібліотеки використовують схожу концепцію: компілювати контент під час збірки та поставляти якомога менший runtime. Відмінності полягають у тому, що саме потрапляє до браузера та як організовано контент:

- **Локалі**: Intlayer завантажує [динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) для кожної локалі (0% витоку локалей у бенчмарку), тоді як кожна функція повідомлення Paraglide містить усі локалі (49.7%).
- **Організація контенту**: контент може знаходитися у файлах `.content.ts` поруч із кожним компонентом або в централізованих файлах. Дивіться [локалізація на рівні компонентів проти централізованої i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/per-component_vs_centralized_i18n.md).
- **Перемикання мови**: контент зчитується з React context, тому зміна локалі викликає повторний рендеринг без перезавантаження сторінки.
- **Згенерований код**: усередині `src` нічого не генерується, тому не потрібно нічого повторно генерувати перед комітом.

Якщо ви переходите з іншої бібліотеки, а не з Paraglide, [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) зберігають API `use-intl`, `next-intl`, `react-i18next`, `react-intl` або Lingui, замінюючи лише runtime.

Дивіться [чи є Intlayer легшим за Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/is_intlayer_lighter_than_paraglide.md) та [посібник з Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

</Step>
<Step number={17} title="Автоматизуйте ваші переклади за допомогою Intlayer" isOptional={true}>

Paraglide рендерить переклади, але не допомагає їх **створювати**. Intlayer є **безкоштовним** та має **відкритий вихідний код**, а його інструменти корисні навіть у проєкті з Paraglide:

- **Перекладайте за допомогою AI**, використовуючи власний ключ API та провайдера. Дивіться [автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md) та [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
- **Зберігайте ваші файли JSON** як єдине джерело правди за допомогою [плагіна синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).
- **Тестуйте відсутні переклади** у CI. Дивіться [тестування перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).
- **Скануйте ваш розгорнутий сайт** на наявність відсутніх `hreflang`, неправильних canonical та витоків локалей за допомогою [команди scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/scan.md).

</Step>
</Steps>

## Поширені запитання

<FAQ>

<Question title="Чи є Paraglide JS гарним вибором для TanStack Start?">

Це надійне рішення: воно використовується в офіційних прикладах TanStack Router, має найменший runtime у [бенчмарку](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) (~1.8 KB gzip), а повідомлення повністю типізовані. Компроміси полягають у тому, що кожна функція повідомлення містить усі локалі, що призводить до витоку приблизно половини перекладених рядків відвідувачам іншими мовами, а зміна мови перезавантажує сторінку.

</Question>
<Question title="Чи потрібен мені сегмент маршруту $locale з Paraglide?">

Ні. Механізм `rewrite` у роутері видаляє префікс локалі перед зіставленням маршрутів і додає його назад до згенерованих посилань, тому один файл `about.tsx` обслуговує `/about`, `/fr/about` та `/es/about`.

</Question>
<Question title="Чому зміна мови перезавантажує сторінку?">

Функції повідомлень зчитують локаль у момент виклику, вони не підписані на стан React. Тому `setLocale` за замовчуванням перезавантажує сторінку, щоб кожне повідомлення повторно відрендерилося новою мовою. Ви можете передати `{ reload: false }`, але тоді вам доведеться повторно рендерити дерево самостійно.

</Question>
<Question title="Чи слід додавати до коміту згенеровану папку src/paraglide?">

Краще цього не робити. Папка генерується повторно під час кожного запуску `dev` та `build`, а її фіксація в репозиторії спричиняє конфлікти злиття у згенерованих файлах. Натомість додавайте до комітів файли `messages/*.json` та `project.inlang/settings.json`.

</Question>
<Question title="Як додати теги hreflang з Paraglide?">

Використовуйте `localizeUrl` для побудови одного абсолютного URL на кожну локаль у `head()` маршруту та додайте `x-default`, що вказує на базову локаль. Крок 10 надає готовий допоміжний модуль, а крок 11 додає такі самі альтернативні посилання до sitemap.

</Question>
<Question title="Чи виконує Paraglide tree-shaking невикористаних перекладів?">

Невикористані **повідомлення** відкидаються, якщо ви використовуєте `outputStructure: "message-modules"`, тому контент інших сторінок не витікає. Невикористані **локалі** не відкидаються: кожна функція повідомлення містить усі переклади, через що бенчмарк фіксує 49.7% витоку локалей.

</Question>
<Question title="Чи можу я перейти з Paraglide на Intlayer?">

Так. Обидві бібліотеки побудовані на компіляторі, тому ментальна модель дуже схожа. Збережіть ваші файли JSON за допомогою [плагіна синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md), а потім замінюйте виклики `m.key()` на `useIntlayer` сторінка за сторінкою. Дивіться [посібник з Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

</Question>

</FAQ>
