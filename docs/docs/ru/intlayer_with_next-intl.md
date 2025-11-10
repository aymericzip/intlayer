---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Как перевести ваше приложение Next.js 15 с помощью next-intl – руководство по i18n 2025
description: Узнайте, как сделать ваш сайт на Next.js 15 App Router многоязычным. Следуйте документации для интернационализации (i18n) и перевода.
keywords:
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Перевод вашего сайта на Next.js 15 с использованием next-intl и Intlayer | Интернационализация (i18n)

Это руководство проведет вас через лучшие практики использования next-intl в приложении Next.js 15 (App Router) и покажет, как наложить Intlayer сверху для надежного управления переводами и автоматизации.

Смотрите сравнение в [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

- Для начинающих: следуйте пошаговым разделам, чтобы получить рабочее многоязычное приложение.
- Для разработчиков среднего уровня: обратите внимание на оптимизацию payload и разделение серверной/клиентской части.
- Для опытных разработчиков: обратите внимание на статическую генерацию, middleware, интеграцию SEO и хуки автоматизации.

Что мы рассмотрим:

- Настройка и структура файлов
- Оптимизация загрузки сообщений
- Использование клиентских и серверных компонентов
- Метаданные, sitemap, robots для SEO
- Middleware для маршрутизации по локали
- Добавление Intlayer сверху (CLI и автоматизация)

## Настройка вашего приложения с использованием next-intl

Установите зависимости next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Настройка и загрузка контента

Загружайте только те пространства имён, которые нужны вашим маршрутам, и проверяйте локали на раннем этапе. По возможности держите серверные компоненты синхронными и отправляйте на клиент только необходимые сообщения.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Загружайте только те пространства имён, которые нужны вашему layout/страницам
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Установить активную локаль запроса для этого серверного рендера (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Сообщения загружаются на стороне сервера. Отправляем клиенту только необходимое.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Строго серверные переводы/форматирование
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Использование в клиентском компоненте

Рассмотрим пример клиентского компонента, который отображает счетчик.

**Переводы (структура повторяется; загружайте их в сообщения next-intl по вашему усмотрению)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Счетчик",
    "increment": "Увеличить"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Счётчик",
    "increment": "Увеличить"
  }
}
```

**Клиентский компонент**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Область видимости непосредственно для вложенного объекта
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Не забудьте добавить сообщение "about" в клиентские сообщения страницы
> (включайте только те пространства имён, которые действительно нужны вашему клиенту).

### Использование в серверном компоненте

Этот UI-компонент является серверным компонентом и может быть отрендерен внутри клиентского компонента (страница → клиент → сервер). Поддерживайте его синхронным, передавая заранее вычисленные строки.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Примечания:

- Вычисляйте `formattedCount` на стороне сервера (например, `const initialFormattedCount = format.number(0)`).
- Избегайте передачи функций или несериализуемых объектов в серверные компоненты.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Остальная часть кода страницы
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Функция для генерации путей со всеми локалями
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  // Запрет доступа к определённым путям для всех локалей
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware для маршрутизации локалей

Добавьте middleware для обработки определения локали и маршрутизации:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Пропустить API, внутренние части Next и статические ресурсы
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Лучшие практики

- **Установите html атрибуты `lang` и `dir`**: В `src/app/[locale]/layout.tsx` вычисляйте `dir` с помощью `getLocaleDirection(locale)` и задавайте `<html lang={locale} dir={dir}>`.
- **Разделяйте сообщения по namespace**: Организуйте JSON по локалям и namespace (например, `common.json`, `about.json`).
- **Минимизируйте нагрузку на клиент**: На страницах отправляйте в `NextIntlClientProvider` только необходимые пространства имён (например, `pick(messages, ['common', 'about'])`).
- **Предпочитайте статические страницы**: Экспортируйте `export const dynamic = 'force-static'` и генерируйте статические параметры для всех `locales`.
- **Синхронные серверные компоненты**: Передавайте заранее вычисленные строки (переведённые метки, отформатированные числа), а не асинхронные вызовы или несериализуемые функции.

## Реализация Intlayer поверх next-intl

Установите зависимости intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

Создайте файл конфигурации intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // локали для интернационализации
    defaultLocale: Locales.ENGLISH, // локаль по умолчанию
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // ключ API для AI
  },
  plugins: [
    // Синхронизируйте структуру папок по namespace с Intlayer
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`, // путь к JSON-файлам с переводами
    }),
  ],
};

export default config;
```

Добавьте скрипты в `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill", // заполнение переводов с помощью AI
    "i18n:test": "intlayer test" // проверка отсутствующих/некорректных переводов
  }
}
```

Примечания:

- `intlayer fill`: использует вашего AI-провайдера для заполнения отсутствующих переводов на основе настроенных локалей.
- `intlayer test`: проверяет отсутствующие/недействительные переводы (используйте в CI).

Вы можете настроить аргументы и провайдеров; смотрите [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).
