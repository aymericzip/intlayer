---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Інтернаціоналізація TanStack Start за допомогою use-intl: повний посібник з налаштування у 2026 році"
description: "Перекладіть ваш застосунок TanStack Start за допомогою use-intl: локалізована маршрутизація, типізовані повідомлення, SSR, hreflang, sitemap та robots.txt, а також реальні дані бенчмарку розміру бандла."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Інтернаціоналізація
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
    changes: "Початкова версія"
author: aymericzip
---

# Як інтернаціоналізувати ваш застосунок TanStack Start за допомогою use-intl у 2026 році

## Зміст

<TOC/>

## Що таке use-intl?

**use-intl** - це незалежне від фреймворків ядро `next-intl`. Воно надає ті самі API `useTranslations`, `useFormatter` та `IntlProvider`, підтримку ICU MessageFormat і надійну інтеграцію з TypeScript без будь-якої залежності від Next.js. Це робить його одним із найпопулярніших варіантів для перекладу застосунків **TanStack Start**, і саме цю бібліотеку найчастіше радять ШІ-асистенти для цього стека.

TanStack Start не містить вбудованого шару i18n. Маршрутизація, визначення локалі, метадані SEO та генерація карти сайту (sitemap) залишаються за вами. Цей посібник охоплює все від початку до кінця:

- **Маршрутизація з урахуванням локалі** за допомогою необов'язкового сегмента `{-$locale}` (`/about`, `/fr/about`).
- **Завантаження повідомлень для окремих маршрутів**, завдяки чому сторінка завантажує лише потрібні простори імен і локаль, яку рендерить.
- **Серверний рендеринг та гідратація** без розбіжностей у тексті.
- **Повне багатомовне SEO**: перекладені `<title>` та description, канонічна URL-адреса, альтернативи `hreflang` з `x-default`, локалі Open Graph, JSON-LD, sitemap з альтернативами `xhtml:link`, `robots.txt` та пререндеринг кожної локалі.

> Шукаєте інший стек?

- [посібник з TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_paraglide.md)
- [посібник з TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_lingui.md)
- [посібник з TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)

> Використовуєте Next.js? Перегляньте [посібник з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-intl.md).

- [посібник з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-intl.md)

> Щоб зрозуміти, звідки взялися ці бібліотеки, прочитайте історію i18n у JavaScript.

- [Історія i18n у JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/history_of_i18n.md)

## Що показує бенчмарк про use-intl на TanStack Start

[Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) запускає один і той самий застосунок TanStack Start на 10 сторінок і 10 локалей з кожною основною бібліотекою та вимірює, що насправді завантажує браузер.

- [Бенчмарк i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Ключові показники для `use-intl@4.14.2`, виміряні 2026-09-26 (gzip):

| Конфігурація                                | Розмір бібліотеки | JS на сторінку | Витік іншої локалі | Витік іншої сторінки |
| :------------------------------------------ | ----------------: | -------------: | -----------------: | -------------------: |
| Без i18n (базовий застосунок)               |                 - |       111.0 KB |                 0% |                   0% |
| `use-intl` (налаштування з цього посібника) |           75.9 KB |       128.7 KB |                 0% |                   0% |
| `@intlayer/use-intl` (сумісність)           |            6.7 KB |       129.4 KB |                 0% |                   0% |
| `react-intlayer` (нативний Intlayer)        |            4.5 KB |       126.8 KB |                 0% |                   0% |

Головні висновки:

- **Розділяйте повідомлення за сторінками та завантажуйте їх для кожної локалі окремо.** Це усуває обидва витоки, і саме це реалізовано в кроках нижче.
- **Сам runtime залишається важким** (~76 KB gzip), оскільки парсер ICU передається клієнту. Адаптер сумісності `@intlayer/use-intl` (крок 17) зберігає абсолютно той самий API з розміром runtime близько ~7 KB.

> Перегляньте повні дані: [Звіт бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) та [репозиторій бенчмарку](https://github.com/intlayer-org/benchmark-i18n).

- [Звіт бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)

## Порівняння функціональності на TanStack Start

Як `use-intl` виглядає на фоні інших популярних бібліотек для TanStack Start:

| Функція                                              | `react-intlayer` (Intlayer)             | `use-intl`                  | Paraglide JS                         | Lingui                          |
| ---------------------------------------------------- | --------------------------------------- | --------------------------- | ------------------------------------ | ------------------------------- |
| **Переклади поруч із компонентами**                  | ✅ Спільне розташування (co-located)    | ❌ Централізований JSON     | ❌ Один файл JSON на локаль          | ⚠️ Вихідний текст у компонентах |
| **Інтеграція з TypeScript**                          | ✅ Автоматично згенеровані типи         | ✅ Через `AppConfig`        | ✅ Типізовані функції повідомлень    | ⚠️ Тільки макроси               |
| **Виявлення відсутніх перекладів**                   | ✅ Помилки типів і попередження збірки  | ⚠️ Фолбек під час виконання | ⚠️ Фолбек на базову локаль           | ⚠️ Фолбек на вихідний текст     |
| **Розширений вміст (JSX, Markdown)**                 | ✅ Пряма підтримка                      | ⚠️ Теги через `t.rich`      | ⚠️ Рядки                             | ✅ JSX всередині `<Trans>`      |
| **Локалізована маршрутизація**                       | ✅ Вбудовано                            | ❌ Вручну `{-$locale}`      | ✅ `urlPatterns` + перезапис роутера | ❌ Вручну `{-$locale}`          |
| **Перемикання локалі без перезавантаження**          | ✅ Так                                  | ✅ Так                      | ❌ Повне перезавантаження сторінки   | ✅ Так                          |
| **Плюралізація**                                     | ✅ На основі перелічення                | ✅ ICU                      | ✅ Варіанти                          | ✅ ICU                          |
| **ICU MessageFormat**                                | ✅ Через `format: "icu"`                | ✅ Нативно                  | ⚠️ Через плагін inlang               | ✅ Нативно                      |
| **Формати вмісту**                                   | ✅ `.ts`, `.json`, `.md`, `.yaml`...    | ⚠️ `.json`                  | ⚠️ inlang JSON                       | ✅ PO, JSON, CSV                |
| **ШІ-переклад**                                      | ✅ Власний провайдер і ключ             | ❌ Ні                       | ❌ Ні                                | ❌ Ні                           |
| **Візуальний редактор / CMS**                        | ✅ Локальний редактор + опціональна CMS | ❌ Зовнішні платформи       | ⚠️ Застосунки екосистеми inlang      | ❌ Зовнішні платформи           |
| **SEO-помічники (hreflang, sitemap)**                | ✅ Вбудовано                            | ❌ Вручну                   | ⚠️ Локалізовані URL, решта вручну    | ❌ Вручну                       |
| **Розмір під час виконання (gzip, бенчмарк)**        | 4.5 KB                                  | 75.9 KB                     | 1.8 KB                               | 56.7 KB                         |
| **Витік, найкраще налаштування (локаль / сторінка)** | 0% / 0%                                 | 0% / 0%                     | 49.7% / 0%                           | 8.6% / 0%                       |
| **Відсутні переклади в CI**                          | ✅ `npx intlayer test`                  | ⚠️ Не вбудовано             | ⚠️ Не вбудовано                      | ✅ `lingui compile --strict`    |

> Показники розміру runtime та витоків взяті з [бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md). Витік вимірювався для найкращої конфігурації кожної бібліотеки.

- [бенчмарку TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)

> Інші посібники з TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)

## Практики, яких варто дотримуватися

- **Встановлюйте `lang` та `dir` на тегу `<html>`** для доступності, скринрідерів та пошукових систем.
- **Зберігайте одну URL-адресу на кожну локаль.** Використовуйте префікс локалі (`/fr/about`), а не лише перемикання через cookie, щоб кожна перекладена сторінка була доступна для сканування та поширення.
- **Розділяйте повідомлення за просторами імен** (`common`, `home`, `about`) та завантажуйте їх за маршрутами.
- **Завантажуйте лише активну локаль.** Ніколи не імпортуйте файли всіх локалей у модуль, який надсилається клієнту.
- **Зафіксуйте часовий пояс** в `IntlProvider`. Інакше дати форматуватимуться в часовому поясі сервера під час SSR і в часовому поясі відвідувача під час гідратації, що спричиняє розбіжності (hydration mismatches).
- **Перекладайте метадані** та вказуйте `canonical`, `hreflang` і `x-default` на кожній сторінці.
- **Генеруйте багатомовний sitemap та robots.txt**, а також виконуйте пререндеринг кожної локалі.
- **Використовуйте справжні посилання для перемикача мов**, а не `<select>`, щоб пошукові роботи могли виявити кожну мовну версію.
- **Типізуйте повідомлення**, щоб відсутній ключ призводив до помилки під час компіляції.

- [інтернаціоналізації та SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md)
- [посібник з hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/hreflang_guide_multilingual_seo.md)

## Покроковий посібник з налаштування use-intl у застосунку TanStack Start

Ось структура проєкту, яку ми створимо:

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
<Step number={1} title="Встановіть залежності">

Почніть із проєкту TanStack Start, а потім додайте `use-intl`:

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

- **use-intl**: надає `IntlProvider`, `useTranslations`, `useFormatter` та `createTranslator` (можна використовувати поза React, наприклад у `head()`).

</Step>
<Step number={2} title="Централізуйте конфігурацію локалей">

Створіть єдине джерело правди для ваших локалей та допоміжних функцій URL. Усі інші файли (маршрути, SEO, sitemap, пререндеринг) імпортують дані звідси, тому додавання нової локалі виконується в один рядок.

Локаль за замовчуванням залишається без префікса (`/about`), а інші локалі мають префікс (`/fr/about`). Це стратегія "за потребою" (as-needed): одна URL-адреса на сторінку для кожної локалі та короткі адреси для вашої основної аудиторії.

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
<Step number={3} title="Створіть файли перекладів">

Організуйте повідомлення за локалями та за просторами імен. `common` містить те, що потрібно кожній сторінці (навігація, футер), а кожна окрема сторінка отримує власний файл, включно з метаданими.

use-intl використовує **ICU MessageFormat**, тому множина, перемикачі (selects) та форматовані аргументи знаходяться безпосередньо в самому повідомленні.

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

Створіть `home.json` таким самим чином, з об'єктом `metadata` та вмістом сторінки.

</Step>
<Step number={4} title="Завантажуйте повідомлення за просторами імен та локалями">

Цей завантажувач є найважливішим файлом для продуктивності. `import.meta.glob` вказує Vite генерувати **один чанк на кожен JSON-файл**. Маршрут, який запитує `["about"]` французькою мовою, завантажує `messages/fr/about.json` і нічого зайвого - саме так бенчмарк досягає 0% витоку локалей та 0% витоку сторінок.

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
<Step number={5} title="Типізуйте ваші повідомлення">

Розширення модулів (module augmentation) забезпечує автодоповнення для `useTranslations("about")` та `t("counter.label")`, а також помилку компіляції за наявності друкарських помилок або видалених ключів.

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

Переконайтеся, що опція `resolveJsonModule` увімкнена у вашому `tsconfig.json`.

</Step>
<Step number={6} title="Створіть кореневий документ">

Кореневий маршрут рендерить `<html>`. Він зчитує необов'язковий параметр локалі для встановлення `lang` та `dir`, щоб атрибути були коректними в згенерованому сервером HTML ще до запуску JavaScript.

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
<Step number={7} title="Створіть маршрут макета локалі">

Папка `{-$locale}` створює **необов'язковий** сегмент шляху: `/about` та `/fr/about` обидва відповідають `/{-$locale}/about`. Цей макет:

1. Відхиляє непідтримувані префікси (`/xx/about` → 404).
2. Завантажує простір імен `common` лише для поточної локалі.
3. Передає повідомлення через `IntlProvider`.

Результат завантажувача серіалізується в HTML і повторно використовується під час гідратації, тому клієнт не завантажує `common.json` удруге. Значення `staleTime: Infinity` кешує його між переходами на стороні клієнта.

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

> `IntlProvider` не об'єднує автоматично повідомлення від батьківського провайдера. Наступний крок додає невеликий компонент, який це робить, щоб кожна сторінка могла додавати власний простір імен поверх `common`.

</Step>
<Step number={8} title="Ізолюйте повідомлення сторінок (Scoped Messages)">

Кожна сторінка завантажує власний простір імен у своєму лоадері, а потім огортає свій вміст компонентом `ScopedMessages`, який об'єднує простір імен сторінки з батьківськими повідомленнями.

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
<Step number={9} title="Використовуйте переклади на ваших сторінках">

Лоадер сторінки отримує простір імен `about` для поточної локалі, функція `head()` формує на його основі перекладені та повні метадані SEO (дивіться крок 13), а компонент рендерить вміст.

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
<Step number={10} title="Використовуйте переклади та форматування в компонентах">

Будь-який компонент під провайдерами може викликати `useTranslations` та `useFormatter`. Форми множини обробляються через ICU, а числа форматуються відповідно до активної локалі.

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
<Step number={11} title="Створіть компонент локалізованого посилання" isOptional={true}>

Кожен маршрут знаходиться під `{-$locale}`, тому посилання має містити поточний параметр локалі. Ця обгортка зберігає типізований `to` з TanStack Router та автоматично підставляє локаль за вас.

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
<Step number={12} title="Змінюйте мову вашого контенту" isOptional={true}>

Рендеріть перемикач як **посилання**, а не `<select>`. Посилання доступні для пошукових роботів, що дозволяє їм знаходити кожну мовну версію, і вони працюють навіть без JavaScript. `to="."` зберігає поточну сторінку і лише замінює параметр локалі. Файл cookie зберігає явний вибір для middleware перенаправлення з кроку 16.

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
<Step number={13} title="Інтернаціоналізуйте ваші метадані" isOptional={true}>

Ось де i18n дає найбільшу перевагу: кожна мовна версія може ранжуватися окремо. Кожна сторінка має надавати:

- **перекладені** `<title>` та `description`;
- **канонічну** URL-адресу, яка вказує на саму себе (а не на локаль за замовчуванням);
- по одній **альтернативі `hreflang` на кожну локаль**, плюс **`x-default`** для непідтримуваних мов;
- теги **Open Graph** `og:locale`, `og:locale:alternate` та `og:url`, які використовуються для попереднього перегляду в соцмережах;
- **JSON-LD** із полем `inLanguage`, що допомагає пошуковим системам та ШІ-асистентам точно визначати мову сторінки.

Єдина допоміжна функція формує все це разом, завдяки чому код сторінок залишається лаконічним:

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

Використовуйте її в `head()` кожної сторінки, як показано на кроці 9. Для головної сторінки передайте `path: "/"`.

</Step>
<Step number={14} title="Інтернаціоналізуйте ваш sitemap" isOptional={true}>

Багатомовна карта сайту (sitemap) містить **кожну URL-адресу кожної локалі**, і кожен запис оголошує всі свої альтернативи за допомогою `xhtml:link`. Google використовує ці анотації точно так само, як теги `hreflang` на самій сторінці, що робить їх надійною страховкою для сторінок, які рідко скануються.

Серверні маршрути TanStack Start дозволяють віддавати sitemap безпосередньо з файлового маршруту:

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
<Step number={15} title="Інтернаціоналізуйте ваш robots.txt" isOptional={true}>

Приватні маршрути існують кожною мовою, тому правила `Disallow` повинні охоплювати всі префікси. Видаліть `public/robots.txt`, якщо стартовий шаблон створив його, а потім віддавайте його з маршруту:

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
<Step number={16} title="Перенаправляйте нових відвідувачів на їхню мову" isOptional={true}>

Middleware обробки запитів спрямовує відвідувача, який заходить на `/`, на бажану мову, спираючись спершу на cookie локалі, а потім на заголовок `Accept-Language`. Перенаправляється лише `/`: глибокі посилання ніколи не змінюються, тому поширені URL та пошукові роботи завжди отримують саме ту сторінку, яку запитували.

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

> Відвідувач, який явно вибрав англійську в перемикачі, отримує `locale=en` у cookie, тому його більше ніколи не перенаправлятиме. При повністю статичному деплої (крок 18) `/` віддається як файл і цей middleware не виконується, що цілком нормально: сторінка залишається доступною, а перемикач бере на себе решту.

</Step>
<Step number={17} title="Збережіть API use-intl та скоротіть розмір runtime за допомогою Intlayer" isOptional={true}>

Бенчмарк показує, що найважчою частиною налаштування use-intl є сам runtime (~76 KB gzip). Адаптер сумісності [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надає **той самий API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ICU множини, `t.rich`), але віддає дані зі скомпільованих словників Intlayer: **~6.7 KB замість ~75.9 KB**, 0% витоку локалей та 0% витоку сторінок, без жодних змін у ваших компонентах.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

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

Плагін Vite створює аліас з `use-intl` на адаптер, тому наявні імпорти продовжують працювати без змін:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Ваші файли JSON залишаються єдиним джерелом правди завдяки [плагіну синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md):

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

- [плагіну синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md)

> Адаптер також є плавним шляхом міграції: після його підключення ви можете переводити компоненти один за одним на нативний API `useIntlayer`. Дивіться [посібник з Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

- [посібник з Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="Виконуйте пререндеринг кожної локалі" isOptional={true}>

Статичний HTML - це найшвидша сторінка, яку ви можете віддати, і найпростіша для індексації. Перелічіть усі локалізовані шляхи, щоб TanStack Start виконав пререндеринг усіх мовних версій під час збірки, а також файлів sitemap та robots:

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

Оскільки перемикач локалей містить справжні посилання, параметр `crawlLinks: true` також автоматично виявляє сторінки, які ви могли забути додати до списку.

</Step>
<Step number={19} title="Обробляйте локалізовані сторінки 404" isOptional={true}>

Макет з кроку 7 вже викликає `notFound()` для невідомих префіксів локалей. Додайте маршрут catch-all, щоб невідомі шляхи всередині локалі також відображали локалізовану сторінку 404 та позначали її тегом `noindex`: React 19 автоматично піднімає тег `<meta>` у `<head>`.

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
<Step number={20} title="Отримуйте доступ до локалі в серверних функціях" isOptional={true}>

Серверні функції не отримують параметри маршруту. Зчитуйте cookie локалі з фолбеком на заголовок `Accept-Language`, щоб надіслати локалізований лист або зберегти налаштування мови:

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

Для перекладу всередині серверної функції комбінуйте це з `loadMessages` та `createTranslator` з `use-intl`.

</Step>
<Step number={21} title="Автоматизуйте ваші переклади за допомогою Intlayer" isOptional={true}>

use-intl відображає переклади, але не допомагає вам їх **створювати**. Intlayer є **безкоштовним** інструментом із **відкритим кодом**, який закриває цю прогалину, навіть якщо ви продовжуєте використовувати use-intl:

- **Тестуйте відсутні переклади** в CI або юніт-тестах. Дивіться [тестування перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).
- **Перекладайте за допомогою ШІ**, використовуючи власний API-ключ та провайдера: команда `npx intlayer fill` перекладає відсутні ключі з урахуванням контексту вашого застосунку. Дивіться [автозаповнення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md) та [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
- **Зберігайте ваші файли JSON** як джерело правди за допомогою [плагіна синхронізації JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md).
- **Редагуйте вміст візуально** за допомогою [візуального редактора](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) та [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), щоб нетехнічні спеціалісти могли оновлювати переклади.
- **Надайте контекст вашому ШІ-агенту** за допомогою [MCP-сервера](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md) та [навичок агентів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md).
- **Скануйте ваш розгорнутий сайт** на наявність відсутніх `hreflang`, некоректних канонічних посилань та витоків локалей за допомогою [команди scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/scan.md).

Щоб ознайомитися з усіма можливостями, дивіться [переваги Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

- [переваги Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md)

</Step>
</Steps>

## Часті запитання

<FAQ>

<Question title="Чи є use-intl гарним вибором для TanStack Start?">

Так, якщо вам потрібен API `next-intl` поза межами Next.js. Ви отримуєте повідомлення ICU, форматувальники та надійну підтримку TypeScript, уникаючи специфічних для Next.js обмежень, таких як `setRequestLocale`. Компромісом є вага: [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md) фіксує ~76 KB gzip для runtime, а при звичайному налаштуванні в браузер завантажуються всі локалі та всі сторінки. Завантажуйте простори імен за маршрутами та локалями, як показано в цьому посібнику, щоб уникнути витоків.

- [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/tanstack.md)

</Question>
<Question title="У чому різниця між use-intl та next-intl?">

`use-intl` - це ядро `next-intl`. `next-intl` додає поверх нього інтеграції для Next.js: middleware, навігаційні хелпери, `getTranslations` для серверних компонентів та конфігурацію запитів. У TanStack Start ви використовуєте `use-intl` напряму та реалізуєте маршрутизацію через TanStack Router, як показано вище.

</Question>
<Question title="Чи варто використовувати префікс локалі або cookie для збереження мови?">

Використовуйте префікс в URL. У цьому випадку кожна мовна версія має власну URL-адресу, яку пошукові системи можуть індексувати, а користувачі - поширювати. Cookie все ще корисний для збереження явного вибору, що й робить middleware перенаправлення з кроку 16.

</Question>
<Question title="Чому виникають розбіжності гідратації (hydration mismatches) під час форматування дат?">

Сервер і браузер форматують дати в різних часових поясах. Передайте явний `timeZone` в `IntlProvider` (або часовий пояс відвідувача, збережений у cookie), щоб обидві сторони генерували однаковий текст.

</Question>
<Question title="Як зменшити розмір бандла use-intl?">

По-перше, розділіть повідомлення за просторами імен і завантажуйте їх за маршрутами та локалями за допомогою `import.meta.glob`, що усуває витоки локалей і сторінок. Далі, якщо розмір runtime критичний, перейдіть на адаптер [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md): той самий API, але ~6.7 KB замість ~75.9 KB за даними бенчмарку.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)

</Question>
<Question title="Як перекласти title та meta description за допомогою use-intl?">

Викличте `createTranslator` всередині функції `head()` маршруту з повідомленнями, повернутими лоадером маршруту, а потім поверніть `title`, `description`, canonical та посилання `hreflang`. Крок 13 містить готовий допоміжний модуль.

</Question>
<Question title="Чи можу я поступово мігрувати з use-intl на Intlayer?">

Так. Спочатку встановіть адаптер сумісності (крок 17): ваші компоненти продовжують викликати `useTranslations`, але вже на базі Intlayer. Потім поступово переносьте компоненти по одному на `useIntlayer` та оголошуйте вміст поруч із ними. Дивіться [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) та [посібник з Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md).

- [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md)
- [посібник з Intlayer для TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)

</Question>

</FAQ>
