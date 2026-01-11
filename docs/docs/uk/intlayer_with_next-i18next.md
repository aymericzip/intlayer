---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Як інтернаціоналізувати ваш Next.js 15 за допомогою next-i18next – керівництво i18n 2026
description: Практичне керівництво, готове до продакшену, з інтернаціоналізації застосунку Next.js 15 (App Router) за допомогою i18next/next-i18next та покращення його за допомогою Intlayer.
keywords:
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Як інтернаціоналізувати сайт на Next.js 15 з next-i18next та Intlayer | Internationalization (i18n)

### Для кого це керівництво

- **Junior**: Дотримуйтесь точних кроків та копіюйте блоки коду. Ви отримаєте робочий багатомовний додаток.
- **Mid-level**: Використовуйте чеклісти та позначки найкращих практик, щоб уникнути типових помилок.
- **Senior**: Перегляньте високорівневу структуру, розділи про SEO та автоматизацію; тут ви знайдете розумні налаштування за замовчуванням і точки розширення.

### Що ви створите

- Проєкт App Router з локалізованими маршрутами (наприклад, `/`, `/fr/...`)
- i18n-конфігурація з локалями, локаллю за замовчуванням та підтримкою RTL
- Ініціалізація i18n на сервері та клієнтський провайдер
- Переклади з неймспейсами, що завантажуються за потреби
- SEO з `hreflang`, локалізованим `sitemap` і `robots`
- Middleware для маршрутизації локалей
- Інтеграція Intlayer для автоматизації робочих процесів перекладу (тести, автозаповнення за допомогою AI, синхронізація JSON)

> Примітка: next-i18next побудований поверх i18next. Цей посібник використовує примітиви i18next, сумісні з next-i18next в App Router, одночасно зберігаючи архітектуру простою та готовою до продакшену.
> Для ширшого порівняння див. [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Структура проєкту

Встановіть залежності next-i18next:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

Почніть з чіткої структури. Тримайте повідомлення розділеними за locale та namespace.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Контрольний список (mid/senior):

- Майте по одному JSON-файлу на namespace для кожної locale
- Не централізуйте повідомлення надто; використовуйте невеликі простори імен (namespaces), орієнтовані на сторінку чи feature
- Уникайте імпорту всіх локалей одночасно; завантажуйте лише те, що потрібно

---

## 2) Встановлення залежностей

```bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Якщо ви плануєте використовувати API next-i18next або сумісність конфігурації, також додайте:

```bash
pnpm add next-i18next
```

---

## 3) Основна конфігурація i18n

Визначте локалі, локаль за замовчуванням, RTL та допоміжні функції для локалізованих шляхів/URL.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Примітка: Якщо ви використовуєте `next-i18next.config.js`, тримайте його узгодженим з `i18n.config.ts`, щоб уникнути розходжень.

---

## 4) Ініціалізація i18n на сервері

Ініціалізуйте i18next на сервері з динамічним бекендом, який імпортує лише потрібні JSON для локалі та namespace.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Завантажити JSON-ресурси з src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Проміжна примітка: Тримайте список неймспейсів коротким для кожної сторінки, щоб обмежити обсяг передаваних даних. Уникайте глобальних «catch-all» бандлів.

---

## 5) Клієнтський провайдер для React-компонентів

Оберніть клієнтські компоненти провайдером, який відповідає конфігурації сервера й завантажує лише запитані namespaces.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Порада для початківців: Не потрібно передавати всі повідомлення на клієнт. Почніть лише з namespaces сторінки.

---

## 6) Локалізований layout та routes

Встановіть мову й напрям тексту, та попередньо згенеруйте маршрути для кожної локалі, щоб віддати перевагу статичному рендерингу.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Приклад сторінки з використанням сервера та клієнта

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Примусове статичне рендерення сторінки
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Переклади (один файл JSON на неймспейс під `src/locales/...`):

```json fileName="src/locales/en/about.json"
{
  "title": "Про",
  "description": "Опис сторінки \"Про\"",
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "Про",
  "description": "Опис сторінки \"Про\"",
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити"
  }
}
```

Клієнтський компонент (завантажує лише потрібний неймспейс):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
tsx;
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Переконайтеся, що сторінка/провайдер включає лише ті простори імен, які вам потрібні (наприклад, `about`).
> Якщо ви використовуєте React < 19, мемоізуйте важкі форматери, такі як `Intl.NumberFormat`.

Синхронний серверний компонент, вбудований у клієнтську межу:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Метадані, Hreflang, Sitemap, Robots

Переклад контенту — це спосіб розширити охоплення. Ретельно налаштуйте багатомовне SEO.

Найкращі практики:

- Встановіть `lang` та `dir` у корені
- Додайте `alternates.languages` для кожної локалі (+ `x-default`)
- Перелічіть перекладені URL у `sitemap.xml` і використовуйте `hreflang`
- Виключайте локалізовані приватні розділи (наприклад, `/fr/admin`) у `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Імпортуйте правильний JSON bundle з src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>Про нас</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware для маршрутизації локалі

Виявляє локаль і перенаправляє на локалізований маршрут, якщо він відсутній.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // виключити файли з розширеннями

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Відповідає всім шляхам, окрім тих, що починаються з наведених і файлів з розширенням
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Кращі практики продуктивності та DX

- **Встановіть атрибути html `lang` і `dir`**: Зроблено в `src/app/[locale]/layout.tsx`.
- **Розділяйте повідомлення за namespace**: Тримайте бандли маленькими (`common.json`, `about.json`, тощо).
- **Мінімізуйте payload клієнта**: На сторінках передавайте провайдеру лише потрібні namespace.
- **Надавайте перевагу статичним сторінкам**: Використовуйте `export const dynamic = 'force-static'` та `generateStaticParams` для кожної локалі.
- **Синхронізуйте server components**: Передавайте попередньо обчислені рядки/форматування замість асинхронних викликів під час рендерингу.
- **Застосовуйте memoization для важких операцій**: Особливо в клієнтському коді для старіших версій React.
- **Кеш і заголовки**: Віддавайте перевагу статичному рендерингу або `revalidate` замість динамічного, коли це можливо.

---

## 11) Тестування та CI

- Додайте юніт-тести для компонентів, що використовують `t`, щоб переконатися, що ключі існують.
- Перевіряйте, що в кожному namespace однакові ключі в усіх локалях.
- Забезпечуйте виявлення відсутніх ключів у CI перед деплоєм.

Intlayer автоматизує більшість цього (див. наступний розділ).

---

## 12) Додайте Intlayer зверху (автоматизація)

Intlayer допомагає синхронізувати JSON-переклади, перевіряти відсутні ключі та за потреби заповнювати їх за допомогою AI.

Встановіть залежності intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Додайте скрипти у package.json:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Типові сценарії:

- `pnpm i18n:test` у CI — щоб CI завершувався з помилкою при відсутніх ключах
- `pnpm i18n:fill` локально — пропонує AI-переклади для щойно доданих ключів

> Ви можете передавати аргументи CLI; див. [документацію Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

---

## 13) Усунення неполадок

- **Ключі не знайдені**: Переконайтесь, що сторінка/провайдер перераховують правильні простори імен (namespaces) і файл JSON існує за шляхом `src/locales/<locale>/<namespace>.json`.
- **Неправильна мова / мерехтіння англійською**: Перевірте визначення локалі в `middleware.ts` та значення `lng` у провайдері.
- **Проблеми з RTL-розкладкою**: Переконайтесь, що `dir` встановлюється через `isRtl(locale)` і що ваш CSS поважає `[dir="rtl"]`.
- **Відсутні SEO alternates**: Підтвердіть, що `alternates.languages` включає всі локалі та `x-default`.
- **Занадто великі бандли**: Розбивайте namespaces ще дрібніше та уникайте імпорту цілих дерев `locales` на клієнті.

---

## 14) Що далі

- Додайте більше локалей та namespaces у міру розвитку функціоналу (features)
- Локалізуйте сторінки помилок, електронні листи та контент, що подається через API
- Розширте робочі процеси Intlayer, щоб автоматично відкривати PR для оновлень перекладів

Якщо ви віддаєте перевагу стартовому шаблону, спробуйте: `https://github.com/aymericzip/intlayer-next-i18next-template`.
