---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "Інтернаціоналізація TanStack Start за допомогою Lingui: повний посібник з налаштування у 2026 році"
description: "Перекладайте свій застосунок TanStack Start за допомогою Lingui: макроси, каталоги PO, SSR, маршрутизація локалей, hreflang, sitemap і robots.txt, а також реальні дані бенчмарків розміру бандла."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Інтернаціоналізація
  - i18n
  - SEO
  - Файли PO
  - React
  - Блог
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Початкова версія"
author: aymericzip
---

# Як інтернаціоналізувати ваш застосунок TanStack Start за допомогою Lingui у 2026 році

## Зміст

<TOC/>

## Що таке Lingui?

**Lingui** - це бібліотека i18n, побудована навколо **макросів** та **вилучення повідомлень**. Ви пишете вихідний текст безпосередньо у ваших компонентах (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` збирає кожне повідомлення у каталоги (за замовчуванням файли PO), перекладачі заповнюють їх, а плагін Vite компілює їх у компактний JavaScript. Повідомлення використовують ICU MessageFormat, тому підтримуються форми множини та селектори.

TanStack Start не містить вбудованого рівня i18n, тому цей посібник інтегрує Lingui з нуля:

- **Макроси, скомпільовані Babel** через `@rolldown/plugin-babel` (необхідно з `@vitejs/plugin-react` v6 та Vite 8).
- **Маршрутизація локалей** з необов'язковим сегментом `{-$locale}` (`/about`, `/fr/about`).
- **Один каталог на локаль, що завантажується за вимогою**, та окремий екземпляр `I18n` на кожен рендеринг, щоб одночасні SSR-запити ніколи не ділили спільну локаль.
- **Повне багатомовне SEO**: перекладені `<title>` та опис, канонічна URL-адреса, `hreflang` із `x-default`, локалі Open Graph, JSON-LD, sitemap, `robots.txt`, попередній рендеринг і локалізовані сторінки 404.

> Шукаєте інший стек? Перегляньте [посібник з TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_use-intl.md), [посібник з TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_paraglide.md) або [посібник з TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

> Використовуєте Next.js? Перегляньте [посібник з Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_nextjs_lingui.md). Порівнюєте бібліотеки? Читайте [Lingui проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer.md).

## Що показує бенчмарк про Lingui на TanStack Start

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) запускає один і той самий застосунок TanStack Start на 10 сторінок і 10 локалей з усіма основними бібліотеками та вимірює, що браузер фактично завантажує.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Ключові показники для `@lingui/core@6.6.0`, виміряні 2026-09-26 (gzip):

| Налаштування                          | Розмір бібліотеки | JS на сторінку | Витік інших локалей | Витік інших сторінок |
| :------------------------------------ | ----------------: | -------------: | ------------------: | -------------------: |
| Без i18n (базовий застосунок)         |                 - |       111.0 KB |                  0% |                   0% |
| Lingui (налаштування цього посібника) |           56.7 KB |       115.2 KB |                9.3% |                   0% |
| `@intlayer/lingui` (сумісність)       |            9.8 KB |       136.7 KB |                9.9% |                   0% |
| `react-intlayer` (нативний Intlayer)  |            4.5 KB |       126.8 KB |                  0% |                   0% |

Головні висновки:

- **Завантажуйте один каталог на локаль за вимогою.** Це утримує розмір сторінок близьким до базового застосунку.
- **Розмір середовища виконання залишається значним** (~57 KB gzip). Адаптер сумісності `@intlayer/lingui` (крок 16) зберігає ваші макроси та зменшує його до ~10 KB.

> Перегляньте повні дані: [звіт бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md), а також [репозиторій бенчмарка](https://github.com/intlayer-org/benchmark-i18n).

## Порівняння можливостей на TanStack Start

Як Lingui порівнюється з іншими популярними бібліотеками для TanStack Start:

| Можливість                                           | `react-intlayer` (Intlayer)             | `use-intl`                  | Paraglide JS                             | Lingui                          |
| ---------------------------------------------------- | --------------------------------------- | --------------------------- | ---------------------------------------- | ------------------------------- |
| **Переклади поруч із компонентами**                  | ✅ Співрозміщені                        | ❌ Централізований JSON     | ❌ Один JSON-файл на локаль              | ⚠️ Вихідний текст у компонентах |
| **Інтеграція з TypeScript**                          | ✅ Автозгенеровані типи                 | ✅ Через `AppConfig`        | ✅ Типізовані функції повідомлень        | ⚠️ Тільки макроси               |
| **Виявлення відсутніх перекладів**                   | ✅ Помилки типів та попередження збірки | ⚠️ Фолбек під час виконання | ⚠️ Фолбек на базову локаль               | ⚠️ Фолбек на вихідний текст     |
| **Збагачений контент (JSX, Markdown)**               | ✅ Пряма підтримка                      | ⚠️ Теги через `t.rich`      | ⚠️ Рядки                                 | ✅ JSX всередині `<Trans>`      |
| **Локалізована маршрутизація**                       | ✅ Вбудована                            | ❌ Вручну `{-$locale}`      | ✅ `urlPatterns` + переписування роутера | ❌ Вручну `{-$locale}`          |
| **Перемикання локалі без перезавантаження**          | ✅ Так                                  | ✅ Так                      | ❌ Повне перезавантаження сторінки       | ✅ Так                          |
| **Форми множини**                                    | ✅ На основі перерахування              | ✅ ICU                      | ✅ Варіанти                              | ✅ ICU                          |
| **ICU MessageFormat**                                | ✅ Через `format: "icu"`                | ✅ Нативно                  | ⚠️ Через плагін inlang                   | ✅ Нативно                      |
| **Формати контенту**                                 | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`                  | ⚠️ inlang JSON                           | ✅ PO, JSON, CSV                |
| **AI-переклад**                                      | ✅ Власний провайдер і ключ             | ❌ Ні                       | ❌ Ні                                    | ❌ Ні                           |
| **Візуальний редактор / CMS**                        | ✅ Локальний редактор + опціональна CMS | ❌ Зовнішні платформи       | ⚠️ Застосунки екосистеми inlang          | ❌ Зовнішні платформи           |
| **SEO-помічники (hreflang, sitemap)**                | ✅ Вбудовані                            | ❌ Вручну                   | ⚠️ Локалізовані URL, решта вручну        | ❌ Вручну                       |
| **Розмір runtime (gzip, бенчмарк)**                  | 4.5 KB                                  | 75.9 KB                     | 1.8 KB                                   | 56.7 KB                         |
| **Витік, найкраще налаштування (локаль / сторінка)** | 0% / 0%                                 | 0% / 0%                     | 49.7% / 0%                               | 8.6% / 0%                       |
| **Відсутні переклади в CI**                          | ✅ `npx intlayer test`                  | ⚠️ Немає вбудованого        | ⚠️ Немає вбудованого                     | ✅ `lingui compile --strict`    |

> Показники розміру runtime та витоку взяті з [бенчмарка TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md). Витік вимірюється на найкращій конфігурації кожної бібліотеки.

> Інші посібники з TanStack Start: [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_use-intl.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_paraglide.md) та [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

## Практики, яких варто дотримуватися

- **Встановлюйте `lang` та `dir` на `<html>`** з локалі маршруту, щоб вони були коректними в серверному HTML.
- **Зберігайте окремий URL для кожної локалі** з префіксом, щоб кожна мовна версія індексувалася.
- **Створюйте один екземпляр `I18n` на локаль**, ніколи не змінюйте глобальний екземпляр під час SSR: два одночасні запити перезапишуть локаль один одного.
- **Завантажуйте лише активний каталог**, ніколи не імпортуйте їх усі в клієнтському коді.
- **Оберіть один стиль макросів** (`useLingui` + `t` у компонентах, `msg` для відкладених дескрипторів) і дотримуйтеся його. Змішування `t`, `i18n._`, `i18n.t` та `<Trans>` ускладнює читання коду для людей і AI-асистентів.
- **Запускайте `lingui extract` у CI**, щоб нове повідомлення ніколи не потрапляло у реліз неперекладеним.
- **Перекладайте метадані** та оголошуйте `canonical`, `hreflang` і `x-default` на кожній сторінці.
- **Генеруйте багатомовні sitemap і robots.txt** та виконуйте попередній рендеринг кожної локалі.
- **Використовуйте справжні посилання для перемикача локалей**, щоб пошукові роботи знаходили кожну мову.

> Перегляньте наш посібник з [інтернаціоналізації та SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md) та [посібник з hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md).

## Покроковий посібник з налаштування Lingui у застосунку TanStack Start

Ось структура проєкту, яку ми створимо:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Згенеровано за допомогою `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware запитів (перенаправлення локалей)
    ├── i18n
    │   ├── config.ts           # Локалі, помічники URL
    │   ├── lingui.ts           # Завантажувач каталогів, екземпляри I18n
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
            ├── route.tsx       # Макет локалі + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Локалізована сторінка 404
```

<Steps>
<Step number={1} title="Встановлення залежностей">

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

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` та макроси (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract` для збору повідомлень у каталоги.
- **@lingui/vite-plugin**: компілює каталоги `.po` під час імпорту, тому `lingui compile` не потрібен.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: трансформують макроси під час збірки.

</Step>
<Step number={2} title="Централізація конфігурації локалей">

Локаль за замовчуванням залишається без префікса (`/about`), інші локалі отримують префікс (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Публічний origin, використовується для канонічних URL, hreflang та sitemap. */
export const siteUrl = "https://example.com";

/** Cookie для збереження локалі, явно обраної відвідувачем. */
export const localeCookieName = "locale";

/** Open Graph очікує коди у форматі `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Зіставляє необов'язковий параметр маршруту `{-$locale}` із підтримуваною локаллю. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** Значення для передачі як параметр `locale`: `undefined` для локалі за замовчуванням. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, локаль за замовчуванням без префікса. */
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
<Step number={3} title="Налаштування Lingui">

Конфігурація Lingui повторно використовує той самий список локалей, тому каталоги, роутер і sitemap завжди узгоджені.

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

Додайте скрипти вилучення:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` завершується з помилкою в CI, якщо компонент містить повідомлення, яке не було вилучено та зафіксовано в git.

</Step>
<Step number={4} title="Налаштування Vite">

З `@vitejs/plugin-react` v6 Babel більше не вбудований за замовчуванням. `@rolldown/plugin-babel` запускає плагін макросів Lingui, а `linguiTransformerBabelPreset` обробляє лише файли, які імпортують макрос, що зберігає високу швидкість збірки.

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
<Step number={5} title="Завантаження каталогів для кожної локалі">

Шаблонний рядок в `import()` дозволяє Vite генерувати **один чанк на кожен каталог**, а плагін Lingui компілює файл `.po` у нього. Французький відвідувач завантажує лише французький каталог.

Скомпільовані повідомлення є звичайними даними, тому вони можуть повертатися завантажувачем маршруту (loader), серіалізуватися в HTML і повторно використовуватися під час гідратації.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Завантажує скомпільований каталог однієї локалі (один чанк на локаль).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Створює ізольований екземпляр I18n: безпечно для одночасних SSR-запитів.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Завантажує каталог і повертає готовий до використання екземпляр для лоадерів
 * та серверних функцій.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Щоб TypeScript приймав імпорт `.po`, оголосіть модуль один раз:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Створення кореневого документа">

Кореневий маршрут зчитує необов'язковий параметр локалі, щоб встановити `lang` та `dir` на серверно відрендереному `<html>`.

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
<Step number={7} title="Створення маршруту макета локалі">

Папка `{-$locale}` створює необов'язковий сегмент шляху: і `/about`, і `/fr/about` відповідають маршруту `/{-$locale}/about`. Макет відхиляє невідомі префікси, завантажує каталог поточної локалі та надає виділений екземпляр `I18n`.

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
  // Каталог ніколи не змінюється для певної локалі
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // Один екземпляр на локаль, ніколи не ділиться між запитами
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
<Step number={8} title="Використання перекладів на ваших сторінках">

Пишіть вихідний текст у компоненті. Макроси перетворюють його на ідентифікатори повідомлень під час збірки, а `lingui extract` збирає їх.

- `<Trans>` для контенту JSX, включаючи вкладені елементи;
- `useLingui().t` для рядків (атрибути, пропси);
- `<Plural>` для форм множини ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Перекладайте метадані в лоадері: head() залишається синхронним
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

> Динамічний `import()` каталогу кешується системою модулів, тому виклик `loadI18n` у кількох лоадерах не завантажує каталог двічі.

</Step>
<Step number={9} title="Вилучення та переклад ваших повідомлень">

Запустіть процес вилучення. Lingui записує кожне повідомлення у каталог кожної локалі:

```bash
npm run i18n:extract
```

Потім перекладіть `msgstr` для кожного запису:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

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

> За замовчуванням ідентифікатори повідомлень є хешами вихідного тексту: зміна тексту англійською створює нове повідомлення. Використовуйте явні ID (`<Trans id="about.title">About us</Trans>`) для текстів, які часто змінюються.

</Step>
<Step number={10} title="Створення компонента локалізованого посилання" isOptional={true}>

Кожен маршрут розташований під `{-$locale}`, тому посилання повинні містити параметр поточної локалі.

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
<Step number={11} title="Зміна мови вашого контенту" isOptional={true}>

Відображайте перемикач у вигляді **посилань**, щоб пошукові роботи знаходили кожну мовну версію. `to="."` зберігає поточну сторінку та замінює параметр локалі. Після цього лоадер макета локалі завантажує новий каталог.

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
  // Версія макросу також повертає екземпляр i18n
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
<Step number={12} title="Інтернаціоналізація ваших метаданих" isOptional={true}>

Кожна мовна версія може ранжуватися самостійно за умови, що кожна сторінка містить перекладені `<title>` та опис, самопосилальне канонічне посилання, по одному `hreflang` на кожну локаль плюс `x-default`, локалі Open Graph і JSON-LD з `inLanguage`. Метадані перекладаються в лоадері (крок 8), а ця допоміжна функція формує решту:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Шлях без префікса локалі, наприклад "/about" */
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
<Step number={13} title="Інтернаціоналізація sitemap та robots.txt" isOptional={true}>

Sitemap перераховує кожен URL кожної локалі, де кожен запис оголошує всі свої альтернативні версії за допомогою `xhtml:link`. `robots.txt` блокує приватні маршрути для кожної мови та вказує на sitemap. Видаліть `public/robots.txt`, якщо стартовий шаблон створив його.

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
<Step number={14} title="Попередній рендеринг кожної локалі" isOptional={true}>

Перерахуйте всі локалізовані шляхи, щоб TanStack Start виконав попередній рендеринг (pre-render) усіх мовних версій під час збірки:

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
<Step number={15} title="Перенаправлення нових відвідувачів та обробка сторінок 404" isOptional={true}>

Middleware запитів спрямовує відвідувача, який переходить на `/`, на його бажану мову (спочатку cookie, потім `Accept-Language`). Глибокі посилання ніколи не перенаправляються, тому пошукові роботи та користувачі за спільними посиланнями завжди отримують запитану сторінку.

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

Для сторінок 404 універсальний маршрут (catch-all) відображає локалізований `notFoundComponent` макета. Позначте його як `noindex`: React 19 піднімає `<meta>` у `<head>`.

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
<Step number={16} title="Збережіть ваші макроси та зменшіть розмір runtime за допомогою Intlayer" isOptional={true}>

Адаптер сумісності [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md) залишає ваш вихідний код незмінним: макроси компілюються так само, як і раніше, а результуючі виклики `i18n._()`, `useLingui()` та `<Trans>` обслуговуються скомпільованими словниками Intlayer. У бенчмарку розмір runtime знижується з **~56.7 KB до ~9.8 KB** gzip.

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

Додайте плагін після трансформації макросів, щоб він перенаправляв аліаси `@lingui/core` та `@lingui/react` на адаптер:

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

Каталоги синхронізуються за допомогою [плагіна sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) (каталоги JSON) або [плагіна sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) (каталоги PO). Повні інструкції з налаштування дивіться в [посібнику з сумісності Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md), а також у порівнянні [Lingui проти @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Автоматизуйте ваші переклади за допомогою Intlayer" isOptional={true}>

Lingui вилучає повідомлення, але ручне заповнення десятків каталогів займає найбільше часу. Intlayer є **безкоштовним** та **open-source** інструментом, і його інструментарій працює разом із Lingui:

- **Перекладайте за допомогою AI**, використовуючи власний API-ключ та провайдера. Дивіться [автоматичне заповнення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md) та [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
- **Зберігайте ваші PO-файли** як єдине джерело правди за допомогою [плагіна sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md).
- **Тестуйте відсутні переклади** в CI. Дивіться [тестування перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).
- **Проводьте аудит вашого розгорнутого сайту** на наявність відсутніх `hreflang`, неправильних канонічних посилань та витоків локалей за допомогою [команди scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/scan.md).

</Step>
</Steps>

## Часті запитання

<FAQ>

<Question title="Чи працює Lingui з TanStack Start?">

Так. Lingui не має спеціальної інтеграції для TanStack Start, але його плагін Vite та плагін макросів Babel працюють як є. Дві важливі речі, які потрібно налаштувати: запуск макросів через `@rolldown/plugin-babel` (Vite 8 та `@vitejs/plugin-react` v6 більше не включають Babel) і створення окремого екземпляра `I18n` для кожної локалі замість активації глобального під час SSR.

</Question>
<Question title="Чому б не використовувати глобальний об'єкт i18n з @lingui/core?">

На сервері один процес обробляє багато запитів одночасно. Виклик `i18n.activate("fr")` на спільному об'єкті змінив би мову запиту, який паралельно рендериться англійською. `setupI18n` створює ізольований екземпляр для кожної локалі, що є безпечним.

</Question>
<Question title="Чи потрібно мені запускати lingui compile?">

Ні. `@lingui/vite-plugin` компілює каталоги `.po` безпосередньо під час їх імпорту. Вам потрібно запускати лише `lingui extract` для збору нових повідомлень.

</Question>
<Question title="Як перекласти заголовок сторінки та мета-опис за допомогою Lingui?">

Оголосіть їх за допомогою макросу `msg` та перекладіть у лоадері маршруту за допомогою ``i18n._(msg`...`)``. Лоадер повертає звичайні рядки, тому `head()` залишається синхронним, а значення серіалізуються для гідратації. Кроки 8 та 12 демонструють повне налаштування.

</Question>
<Question title="Який розмір Lingui у бандлі TanStack Start?">

[Бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) показує ~56.7 KB gzip для runtime. При завантаженні одного каталогу на локаль за вимогою розмір сторінок становить ~115 KB проти 111 KB без i18n. Статичний імпорт усіх каталогів збільшує його до ~152 KB.

</Question>
<Question title="Чи можу я зберегти макроси Lingui та мігрувати на Intlayer?">

Так. Адаптер [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md) зберігає макроси та замінює runtime. Після цього ви можете поступово переводити компоненти на `useIntlayer`. Дивіться [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md).

</Question>

</FAQ>
