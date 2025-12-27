---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Как перевести ваше приложение Next.js 15 с помощью next-i18next – руководство по i18n 2025
description: Практическое руководство, готовое к использованию в продакшене, по интернационализации приложения Next.js 15 с App Router с использованием i18next/next-i18next и улучшению с помощью Intlayer.
keywords:
  - Интернационализация
  - Документация
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

# Перевод вашего сайта на Next.js 15 с использованием next-i18next и Intlayer | Интернационализация (i18n)

### Для кого это руководство

- **Junior**: Следуйте точным шагам и копируйте блоки кода. Вы получите работающее многоязычное приложение.
- **Mid-level**: Используйте контрольные списки и рекомендации по лучшим практикам, чтобы избежать распространённых ошибок.
- **Senior**: Просмотрите разделы с общей структурой, SEO и автоматизацией; вы найдёте разумные настройки по умолчанию и точки расширения.

### Что вы создадите

- Проект с App Router и локализованными маршрутами (например, `/`, `/fr/...`)
- Конфигурация i18n с локалями, локаль по умолчанию, поддержка RTL
- Инициализация i18n на стороне сервера и провайдер на клиенте
- Пространства имён для переводов, загружаемые по требованию
- SEO с `hreflang`, локализованная карта сайта (`sitemap`), `robots`
- Middleware для маршрутизации по локали
- Интеграция Intlayer для автоматизации рабочих процессов перевода (тесты, заполнение AI, синхронизация JSON)

> Примечание: next-i18next построен на основе i18next. В этом руководстве используются примитивы i18next, совместимые с next-i18next в App Router, при этом архитектура остаётся простой и готовой к продакшену.
> Для более широкого сравнения смотрите [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Структура проекта

Установите зависимости next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

Начните с чёткой структуры. Держите сообщения разделёнными по локалям и namespace.

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

Контрольный список (mid/senior):

- Храните по одному JSON на namespace для каждой локали
- Не централизуйте сообщения чрезмерно; используйте небольшие namespace, ограниченные страницей или функционалом
- Избегайте одновременного импорта всех локалей; загружайте только то, что нужно

---

## 2) Установка зависимостей

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Если вы планируете использовать API или конфигурацию next-i18next, также выполните:

```bash
pnpm add next-i18next
```

---

## 3) Основная конфигурация i18n

Определите локали, локаль по умолчанию, RTL и вспомогательные функции для локализованных путей/URL.

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

Важное замечание: если вы используете `next-i18next.config.js`, поддерживайте его в синхронизации с `i18n.config.ts`, чтобы избежать рассогласования.

---

## 4) Инициализация i18n на стороне сервера

Инициализируйте i18next на сервере с динамическим backend, который импортирует только необходимые JSON-файлы локали/пространства имён.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Загрузка JSON-ресурсов из src/locales/<locale>/<namespace>.json
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

Среднее замечание: Держите список пространств имён коротким для каждой страницы, чтобы ограничить объём загружаемых данных. Избегайте глобальных «ловящих всё» пакетов.

---

## 5) Провайдер клиента для React-компонентов

Оборачивайте клиентские компоненты провайдером, который повторяет конфигурацию сервера и загружает только запрошенные пространства имён.

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
  resources?: Record<string, any>; // { ns: пакет }
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

Совет для начинающих: вам не нужно передавать все сообщения клиенту. Начинайте только с пространств имён страницы.

---

## 6) Локализованный layout и маршруты

Установите язык и направление, а также предварительно сгенерируйте маршруты для каждой локали, чтобы способствовать статической отрисовке.

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

## 7) Пример страницы с использованием на сервере и клиенте

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Принудительный статический рендеринг для страницы
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

Переводы (один JSON на namespace в папке `src/locales/...`):

```json fileName="src/locales/ru/about.json"
{
  "title": "О проекте",
  "description": "Описание страницы О проекте",
  "counter": {
    "label": "Счётчик",
    "increment": "Увеличить"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Клиентский компонент (загружает только необходимый namespace):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
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

> Убедитесь, что страница/провайдер включает только необходимые вам пространства имён (например, `about`).
> Если вы используете React ниже версии 19, мемоизируйте тяжёлые форматтеры, такие как `Intl.NumberFormat`.

Синхронный серверный компонент, встроенный в клиентскую границу:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string; // функция перевода по ключу
  locale: string; // локаль для форматирования
  count: number; // счётчик
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

## 8) SEO: Метаданные, Hreflang, Sitemap, Robots

Перевод контента — это способ расширить охват. Тщательно настройте многоязычное SEO.

Лучшие практики:

- Установите `lang` и `dir` в корне
- Добавьте `alternates.languages` для каждого локали (+ `x-default`)
- Включите переведённые URL в `sitemap.xml` и используйте `hreflang`
- Исключите локализованные приватные области (например, `/fr/admin`) в `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Импорт правильного JSON-пакета из src/locales
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
  return <h1>О нас</h1>;
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

// Функция для расширения пути на все локали
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

## 9) Middleware для маршрутизации локали

Определяет локаль и перенаправляет на локализованный маршрут, если он отсутствует.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // исключить файлы с расширениями

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
    // Совпадение со всеми путями, кроме тех, что начинаются с этих и файлов с расширением
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Лучшие практики производительности и удобства разработки (DX)

- **Установите атрибуты html `lang` и `dir`**: Выполнено в `src/app/[locale]/layout.tsx`.
- **Разделяйте сообщения по namespace**: Держите бандлы маленькими (`common.json`, `about.json` и т.д.).
- **Минимизируйте нагрузку на клиент**: На страницах передавайте провайдеру только необходимые namespace.
- **Предпочитайте статические страницы**: Используйте `export const dynamic = 'force-static'` и `generateStaticParams` для каждого локаля.
- **Синхронизируйте серверные компоненты**: Передавайте заранее вычисленные строки/форматирование вместо асинхронных вызовов во время рендера.
- **Мемоизируйте тяжёлые операции**: Особенно в клиентском коде для старых версий React.
- **Кэш и заголовки**: Предпочитайте статический рендеринг или `revalidate` вместо динамического, когда это возможно.

---

## 11) Тестирование и CI

- Добавьте unit-тесты для компонентов, использующих `t`, чтобы гарантировать наличие ключей.
- Проверяйте, что в каждом namespace присутствуют одинаковые ключи во всех локалях.
- Отображайте отсутствующие ключи во время CI перед деплоем.

Intlayer автоматизирует большую часть этого (см. следующий раздел).

---

## 12) Добавление Intlayer сверху (автоматизация)

Intlayer помогает поддерживать JSON-переводы в синхронизации, тестировать отсутствие ключей и заполнять их с помощью ИИ при необходимости.

Установите зависимости intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
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
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Добавьте скрипты в package.json:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Типичные сценарии использования:

- `pnpm i18n:test` в CI для прерывания сборки при отсутствии ключей
- `pnpm i18n:fill` локально для предложения AI-переводов для недавно добавленных ключей

> Вы можете передавать аргументы CLI; смотрите [документацию Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

---

## 13) Устранение неполадок

- **Ключи не найдены**: Убедитесь, что страница/провайдер перечисляет правильные пространства имён, и что JSON-файл существует по пути `src/locales/<locale>/<namespace>.json`.
- **Неправильный язык/мигание английского**: Проверьте обнаружение локали в `middleware.ts` и параметр `lng` у провайдера.
- **Проблемы с RTL-версткой**: Убедитесь, что `dir` получается из `isRtl(locale)`, и что ваш CSS учитывает `[dir="rtl"]`.
- **Отсутствуют SEO-альтернативы**: Проверьте, что `alternates.languages` включает все локали и `x-default`.
- **Слишком большие бандлы**: Разбейте пространства имён на более мелкие и избегайте импорта всего дерева `locales` на клиенте.

---

## 14) Что дальше

- Добавляйте больше локалей и пространств имён по мере роста функционала
- Локализуйте страницы ошибок, электронные письма и контент, управляемый через API
- Расширяйте рабочие процессы Intlayer для автоматического открытия PR с обновлениями переводов

Если вы предпочитаете стартовый шаблон, попробуйте: `https://github.com/aymericzip/intlayer-next-i18next-template`.
