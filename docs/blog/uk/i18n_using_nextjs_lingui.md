---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Next.js 16 i18n з Lingui: Посібник з налаштування App Router"
description: "Налаштуйте Lingui в Next.js 16 App Router: Server Components, SWC-макроси, маршрутизація proxy, generateMetadata, hreflang, sitemap та robots.txt з даними бенчмарків."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Інтернаціоналізація
  - i18n
  - SEO
  - Блог
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Початкова версія"
author: aymericzip
---

# Як інтернаціоналізувати ваш додаток Next.js за допомогою Lingui у 2026 році

## Зміст

<TOC/>

## Що таке Lingui?

**Lingui** - це бібліотека i18n, побудована навколо **макросів** та **вилучення повідомлень**. Ви пишете вихідний текст у своїх компонентах (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` збирає кожне повідомлення у каталоги (за замовчуванням PO-файли), а завантажувач компілює їх у компактний JavaScript. Повідомлення використовують ICU MessageFormat, і Lingui підтримує **React Server Components** в App Router.

Цей посібник налаштовує Lingui у проекті **Next.js 16 App Router** з:

- **Макросами, скомпільованими SWC**, щоб Turbopack зберігав свою швидкість.
- **Server та Client Components**, які використовують спільний API `Trans` та `useLingui`.
- **Маршрутизацією локалей** через `proxy.ts`: `/about` для локалі за замовчуванням, `/fr/about` для інших, а також визначенням мови під час першого візиту.
- **Статичним рендерингом** кожної локалі за допомогою `generateStaticParams`.
- **Повним багатомовним SEO**: перекладеним `generateMetadata`, canonical, `hreflang` з `x-default`, локалями Open Graph, JSON-LD, `sitemap.ts`, `robots.ts` та локалізованими сторінками 404.

> Шукаєте іншу бібліотеку?

- [посібник з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-intl.md)
- [посібник з next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-i18next.md)
- [посібник з Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)

> Використовуєте TanStack Start?

- [посібник з TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_lingui.md)

> Порівнюєте бібліотеки?

- [Lingui проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer.md)
- [next-i18next проти next-intl проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md)

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)

## Що каже бенчмарк про Lingui на Next.js

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) запускає один і той самий додаток Next.js на 10 сторінок та 10 локалей з кожною популярною бібліотекою і вимірює, що насправді завантажує браузер.

- [Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Ключові показники для `@lingui/core@6.6.0` на Next.js 16, виміряні 2026-09-26 (gzip):

| Конфігурація                        | Розмір бібліотеки | JS на сторінку | Витік інших локалей | Витік інших сторінок |
| :---------------------------------- | ----------------: | -------------: | ------------------: | -------------------: |
| Без i18n (базовий додаток)          |                 - |       141.0 KB |                  0% |                   0% |
| Lingui, один каталог на локаль      |           72.1 KB |       145.4 KB |                2.8% |                89.9% |
| `@intlayer/lingui` (сумісність)     |           10.7 KB |       221.6 KB |                 50% |                  90% |
| `next-intlayer` (нативний Intlayer) |            4.9 KB |       141.5 KB |                  0% |                   0% |

Головні висновки:

- **Один каталог на локаль все одно призводить до витоку повідомлень інших сторінок** у клієнтський провайдер. Залишайте якомога більше тексту в Server Components, які надсилають відрендерений HTML, а не каталоги.
- **Рантайм Lingui важить ~72 KB gzip.** Адаптер сумісності `@intlayer/lingui` зменшує рантайм до ~11 KB, але в цьому бенчмарку налаштування сумісності для Next.js все ще надсилає цілі каталоги на сторінку. Нативний API `next-intlayer` - це конфігурація, яка залишається на рівні базового розміру додатка.

> Дивіться повні дані: [Звіт бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) та [репозиторій бенчмарку](https://github.com/intlayer-org/benchmark-i18n).

- [Звіт бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md)

## Порівняння функціональності на Next.js

Як Lingui виглядає у порівнянні з `next-intl` та Intlayer за функціями, які зазвичай потрібні у проекті Next.js App Router:

| Функціональність                      | `next-intlayer` (Intlayer)                            | Lingui                                                              | `next-intl`                                 |
| ------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| **Переклади поруч з компонентами**    | ✅ Контент розташований поруч з кожним компонентом    | ⚠️ Вихідний текст у компонентах, каталоги централізовані            | ❌ Централізований JSON                     |
| **Інтеграція з TypeScript**           | ✅ Автоматично згенеровані суворі типи                | ⚠️ Макроси типізовані, каталоги повідомлень - ні                    | ✅ Добре, через розширення `AppConfig`      |
| **Виявлення відсутніх перекладів**    | ✅ Помилки TypeScript та попередження під час збірки  | ⚠️ Fallback під час виконання на вихідний текст                     | ⚠️ Fallback під час виконання               |
| **Багатий контент (JSX, Markdown)**   | ✅ Пряма підтримка                                    | ✅ JSX всередині `<Trans>`, без Markdown                            | ⚠️ Теги через `t.rich`, без Markdown        |
| **AI-переклад**                       | ✅ Власний провайдер та API-ключ з контекстом додатка | ❌ Немає                                                            | ❌ Немає                                    |
| **Візуальний редактор / CMS**         | ✅ Локальний візуальний редактор + опціональна CMS    | ❌ Через сторонні платформи                                         | ❌ Через сторонні платформи                 |
| **Локалізована маршрутизація**        | ✅ Вбудована                                          | ❌ Потрібно писати власний `proxy.ts`                               | ✅ Вбудований сегмент `[locale]`            |
| **Плюралізація**                      | ✅ На основі перелічення (enumeration)                | ✅ ICU, макрос `<Plural>`                                           | ✅ ICU                                      |
| **Формати контенту**                  | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`      | ✅ PO, JSON, CSV                                                    | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                 | ✅ Через `format: "icu"`                              | ✅ Нативно                                                          | ✅ Нативно                                  |
| **SEO-помічники (hreflang, sitemap)** | ✅ Помічники для metadata, sitemap та robots.txt      | ❌ Вручну                                                           | ✅ Добре                                    |
| **Server Components**                 | ✅ Прямий доступ у будь-якому Server Component        | ⚠️ `setI18n` у кожному макеті та на кожній сторінці                 | ⚠️ `await getTranslations()` на компонент   |
| **Tree-shaking на рівні компонентів** | ✅ Під час збірки (Babel / SWC)                       | ⚠️ Один каталог на локаль, екстрактор на сторінку експериментальний | ⚠️ Вручну, за допомогою `pick()` на маршрут |
| **Розмір рантайму (gzip, бенчмарк)**  | 4.9 KB                                                | 72.1 KB                                                             | 14.7 KB                                     |
| **Відсутні переклади в CI**           | ✅ `npx intlayer test`                                | ✅ `lingui compile --strict`                                        | ⚠️ Не вбудовано                             |
| **Екосистема / спільнота**            | ⚠️ Менша, але швидко зростає                          | ✅ Зріла                                                            | ✅ Велика                                   |

> Розміри рантайму взяті з [бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md). Для детального аналізу читайте [Lingui проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer.md).

- [бенчмарку Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md)
- [Lingui проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer.md)

> Інші посібники з Next.js:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)

## Практики, яких слід дотримуватися

- **Встановлюйте `lang` та `dir` на тегу `<html>`** у макеті `[locale]`.
- **Надавайте перевагу Server Components** для тексту: вони рендерять HTML на сервері та не потребують каталогу на клієнті.
- **Викликайте `initLingui(locale)` у кожному макеті та на кожній сторінці.** Макети не перерендериваються під час навігації, тому сторінка не може покладатися на те, що її макет встановив локаль.
- **Зберігайте один URL для кожної локалі** та попередньо рендеріть кожну локаль за допомогою `generateStaticParams`.
- **Перекладайте ваші метадані** у `generateMetadata`, включно з `canonical`, `hreflang` та `x-default`.
- **Генеруйте багатомовний sitemap та robots.txt** за конвенціями `sitemap.ts` та `robots.ts`.
- **Використовуйте справжні посилання для перемикача мов**, щоб пошукові роботи знаходили кожну мовну версію.
- **Запускайте `lingui extract` у CI**, щоб жодне нове повідомлення ніколи не потрапляло у реліз неперекладеним.

- [інтернаціоналізації та SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md)
- [посібник з hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md)
- [порівняння багатомовного SEO в Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/nextjs-multilingual-seo-comparison.md)

## Покроковий посібник з налаштування Lingui у додатку Next.js

Ось структура проекту, яку ми створимо:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Маршрутизація та визначення локалей
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Створюється за допомогою `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Локалі, помічники URL
    │   ├── appRouterI18n.ts        # Серверні каталоги та екземпляри
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Конструктор generateMetadata
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
            │   └── page.tsx        # Локалізована 404 для невідомих шляхів
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Встановіть залежності">

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

- **@lingui/core** / **@lingui/react**: рантайм, `I18nProvider`, `setI18n` для Server Components та макроси (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: компілює макроси всередині SWC пайплайну Next.js.
- **@lingui/loader**: компілює `.po` каталоги під час імпорту, тому `lingui compile` не потрібен.
- **@lingui/cli**: `lingui extract` для збору повідомлень у каталоги.

> `@lingui/swc-plugin` є WebAssembly плагіном, прив'язаним до версії SWC у Next.js. Якщо збірка зазнає помилки після оновлення Next.js, оновіть плагін до версії, зазначеної як сумісна у його README.

</Step>
<Step number={2} title="Централізуйте конфігурацію локалей">

Один файл визначає локалі та помічники URL. Маршрутизація, метадані, sitemap та Lingui читають з нього.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
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

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
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
<Step number={3} title="Налаштуйте Lingui та Next.js">

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

Плагін SWC компілює макроси, а завантажувач компілює файли `.po` як для Turbopack (за замовчуванням у Next.js 16), так і для webpack:

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

Додайте скрипти вилучення:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Завантажте каталоги та створіть серверні екземпляри">

У Server Components немає контексту React, тому Lingui надає `setI18n` для реєстрації екземпляра для поточного рендерингу. Цей модуль завантажує кожен каталог **один раз на процес сервера** та створює один екземпляр `I18n` на локаль. Він є `server-only`: каталоги інших локалей ніколи не потрапляють у клієнтський бандл.

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
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Щоб TypeScript приймав імпорт `.po`, оголосіть модуль один раз:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Створіть клієнтський провайдер">

Client Components читають переклади з контексту React. Провайдер отримує каталог активної локалі від серверного макета та створює власний екземпляр один раз.

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
<Step number={6} title="Визначте динамічні маршрути локалей">

Сегмент `[locale]` містить кореневий макет. `generateStaticParams` попередньо рендерить кожну локаль під час збірки, а `dynamicParams = false` повертає 404 для будь-якого іншого префікса.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
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

> Клієнтський провайдер отримує весь каталог активної локалі. Це те, що бенчмарк вимірює як "витік інших сторінок". Збереження тексту в Server Components обмежує те, що насправді потрібно клієнту. Для великих додатків експериментальний екстрактор Lingui на сторінку (`experimental.extractor` у `lingui.config.ts`) розділяє каталоги за точками входу.

</Step>
<Step number={7} title="Використовуйте переклади в Server Components">

Server Components використовують ті самі макроси, що й Client Components. `initLingui` повинен запускатися і на сторінці, оскільки макет не перерендеривається під час переходу між своїми сторінками.

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
<Step number={8} title="Використовуйте переклади в Client Components">

Client Components використовують ті самі імпорти. Макроси зчитують екземпляр з `LinguiClientProvider`.

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
<Step number={9} title="Витягніть та перекладіть ваші повідомлення">

Запустіть вилучення. Lingui записує кожне повідомлення, знайдене в `src`, у каталог кожної локалі:

```bash
npm run i18n:extract
```

Потім перекладіть `msgstr` для кожного запису:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
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

> Плейсхолдери `<0>` зберігають позиції JSX-елементів усередині `<Trans>`, щоб перекладачі могли переміщувати їх без порушення розмітки.

</Step>
<Step number={10} title="Налаштуйте Proxy для маршрутизації локалей" isOptional={true}>

Next.js 16 перейменував `middleware.ts` на `proxy.ts`. Proxy реалізує стратегію префікса за потребою ("as-needed"):

- `/fr/about` обслуговується як є;
- `/en/about` перенаправляє на `/about`, тому локаль за замовчуванням має єдиний URL;
- `/about` внутрішньо перезаписується (rewrite) на `/en/about` без зміни URL;
- перший візит на `/` перенаправляє на бажану мову (спочатку cookie, потім `Accept-Language`).

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
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
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

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Змініть мову вашого контенту" isOptional={true}>

`usePathname` повертає URL, який бачить браузер (`/about` або `/fr/about`). Вилучіть локаль, а потім побудуйте посилання для кожної мови. Перемикач рендерить справжні посилання, щоб пошукові роботи могли отримати доступ до кожної мовної версії, а cookie зберігає явний вибір.

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
<Step number={12} title="Створіть компонент LocalizedLink" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Це працює також із Server Components, оскільки рендериться всередині `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Інтернаціоналізуйте ваші метадані" isOptional={true}>

Кожна мовна версія може ранжуватися окремо, за умови, що кожна сторінка містить:

- **перекладені** `title` та `description`;
- **canonical** URL, що вказує на саму себе;
- один **альтернативний `hreflang` на локаль** плюс **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` та `url`;
- **JSON-LD** з `inLanguage`.

`generateMetadata` виконується поза деревом React, тому використовує серверний екземпляр безпосередньо з макросом `msg`:

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
  /** Path without locale prefix, e.g. "/about" */
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

// ... page component from step 7
```

JSON-LD рендериться самою сторінкою. Файли сторінок можуть експортувати лише поля Next.js, тому тримайте компонент в окремому файлі:

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
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Інтернаціоналізуйте ваш Sitemap" isOptional={true}>

Конвенція `sitemap.ts` підтримує `alternates.languages`, які Next.js рендерить як альтернативи `xhtml:link`. Перелічіть кожен URL кожної локалі:

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
<Step number={15} title="Інтернаціоналізуйте ваш robots.txt" isOptional={true}>

Приватні маршрути існують у кожній мові, тому `disallow` має охоплювати кожен локалізований шлях:

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
<Step number={16} title="Обробляйте локалізовані сторінки 404" isOptional={true}>

`not-found.tsx` рендериться всередині макета `[locale]`, тому має доступ до клієнтського провайдера. Маршрут catch-all направляє до нього невідомі шляхи всередині локалі. Next.js автоматично додає `noindex` до відповідей 404.

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

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Отримайте доступ до локалі в Server Actions" isOptional={true}>

Server Actions не отримують параметри маршруту. Найнадійніший підхід - надсилати локаль разом із формою зі сторінки, яка її знає:

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
<Step number={18} title="Збережіть макроси, зменшіть розмір рантайму з Intlayer" isOptional={true}>

Адаптер сумісності [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md) зберігає ваш вихідний код без змін: макроси компілюються як і раніше, а отримані виклики `i18n._()`, `useLingui()` та `<Trans>` обслуговуються словниками Intlayer. У бенчмарку Next.js розмір рантайму зменшується з **~72.1 KB до ~10.7 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md)

У Next.js адаптер підключається через створення аліасів `@lingui/core` та `@lingui/react` на `@intlayer/lingui` у `next.config.ts` (webpack та Turbopack) і огортання конфігурації за допомогою `withIntlayer` з `next-intlayer/server`. Залиште `@lingui/swc-plugin`, щоб макроси спочатку компілювалися. Повна конфігурація доступна у [посібнику з сумісності з Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md).

- [посібнику з сумісності з Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md)

Як показує таблиця бенчмарку, адаптер зменшує розмір рантайму, але поки що не каталог, який надсилається на кожну сторінку у Next.js. Його найкраще використовувати як міст для міграції: після його запуску переносьте компоненти по одному на нативний API `useIntlayer`, який передає лише той вміст, який рендерить кожен компонент. Дивіться [посібник з Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md), [Lingui проти @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md) та всі [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md).

- [посібник з Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)
- [Lingui проти @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/lingui_vs_intlayer-lingui.md)
- [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

</Step>
<Step number={19} title="Автоматизуйте переклади за допомогою Intlayer" isOptional={true}>

Lingui витягує повідомлення, але заповнення десятків каталогів вручну забирає найбільше часу. Intlayer є **безкоштовним** та **з відкритим вихідним кодом**, а його інструменти працюють пліч-о-пліч з Lingui:

- **Перекладайте за допомогою AI**, використовуючи власний API-ключ та провайдера. Дивіться [автоматичне заповнення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md) та [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
- **Зберігайте ваші PO-файли** як джерело істини за допомогою [плагіна синхронізації PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md).
- **Тестуйте відсутні переклади** у CI. Дивіться [тестування перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).
- **Проводьте аудит розгорнутого сайту** на наявність відсутніх `hreflang`, неправильних canonical та витоків локалей за допомогою [команди scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/scan.md).

</Step>
</Steps>

## Часті запитання

<FAQ>

<Question title="Чи підтримує Lingui Next.js App Router та Server Components?">

Так. `@lingui/react` підтримує React Server Components. Server Components реєструють екземпляр за допомогою `setI18n` з `@lingui/react/server`, Client Components зчитують його з `I18nProvider`, і обидва типи компонентів використовують однакові макроси `Trans` та `useLingui`.

</Question>
<Question title="Чому потрібно викликати initLingui на кожній сторінці та у макеті?">

У Server Components немає контексту, тому екземпляр реєструється для кожного рендерингу окремо. Макети зберігаються під час навігації та не перерендериваються, тому сторінка не може покладатися на те, що її макет встановить локаль. Виклик `initLingui(locale)` на початку кожного макета та кожної сторінки забезпечує їхню незалежність.

</Question>
<Question title="Чи варто використовувати плагін SWC або Babel з Next.js?">

Використовуйте `@lingui/swc-plugin`. Він зберігає SWC пайплайн та Turbopack. Додавання конфігурації Babel вимикає SWC у Next.js та сповільнює збірку. Єдиною вимогою є підтримка сумісності версії плагіна з версією SWC вашого релізу Next.js.

</Question>
<Question title="Як перекласти generateMetadata за допомогою Lingui?">

Отримайте серверний екземпляр за допомогою `getI18nInstance(locale)` та перекладайте дескриптори, оголошені за допомогою макроса `msg`: ``i18n._(msg`About us`)``. Повертайте `alternates.canonical`, `alternates.languages` з `x-default` та `openGraph.locale`. Крок 13 містить готовий помічник для повторного використання.

</Question>
<Question title="Скільки важить Lingui у бандлі Next.js?">

[Бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md) показує ~72 KB gzip для рантайму. З одним каталогом на локаль сторінки важать ~145 KB проти 141 KB без i18n, але кожна сторінка все одно отримує повідомлення інших сторінок через клієнтський провайдер.

- [Бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl чи next-i18next: що вибрати для Next.js?">

Lingui підходить командам, яким подобається писати вихідний текст безпосередньо в компонентах і працювати з PO-файлами та перекладачами. next-intl підходить тим, хто віддає перевагу JSON-каталогам та API `t("key")`, тісно інтегрованому з Next.js. next-i18next надає екосистему плагінів i18next. Дивіться [next-i18next проти next-intl проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md) та [бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md).

- [next-i18next проти next-intl проти Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md)
- [бенчмарк Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/nextjs.md)

</Question>
<Question title="Чи можу я перейти з Lingui на Intlayer без переписування компонентів?">

Так. Адаптер [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md) зберігає макроси та замінює рантайм, після чого ви можете поступово переводити компоненти на `useIntlayer`. Дивіться [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/lingui.md)
- [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

</Question>

</FAQ>
