---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: "Як перекласти Next.js 15 за допомогою next-intl — керівництво з i18n 2026"
description: "Дізнайтеся, як зробити ваш вебсайт на Next.js 15 (App Router) багатомовним. Дотримуйтеся документації, щоб інтернаціоналізувати (i18n) та перекласти його."
keywords:
  - Інтернаціоналізація
  - Документація
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

# Перекладіть ваш вебсайт Next.js 15 з next-intl за допомогою Intlayer | Інтернаціоналізація (i18n)

Цей посібник проведе вас через кращі практики next-intl у застосунку Next.js 15 (App Router) і покаже, як накласти Intlayer зверху для надійного керування перекладами та автоматизації.

Дивіться порівняння в [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md).

- Для junior-розробників: дотримуйтесь покрокових розділів, щоб отримати працездатний мультимовний додаток.
- Для mid-level розробників: зверніть увагу на оптимізацію payload та розділення server/client.
- Для senior-розробників: зверніть увагу на static generation, middleware, інтеграцію SEO та automation hooks.

Що ми розглянемо:

- Налаштування та структура файлів
- Оптимізація завантаження повідомлень
- Використання клієнтських та серверних компонентів
- Метадані, sitemap, robots для SEO
- Middleware для маршрутизації локалі
- Додавання Intlayer поверх (CLI та автоматизація)

## Налаштуйте свій додаток за допомогою next-intl

Встановіть залежності next-intl:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash packageManager="bun"
bun add next-intl
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

#### Налаштування та завантаження контенту

Завантажуйте лише ті простори імен, які потрібні вашим маршрутам, і перевіряйте локалі на ранньому етапі. За можливості тримайте серверні компоненти синхронними та надсилайте на клієнт лише необхідні повідомлення.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Завантажуйте лише ті namespaces, які потрібні вашим layout/pages
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

  // Встановіть активну локаль запиту для цього серверного рендерингу (RSC)
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

  // Повідомлення завантажуються на сервері. Передавайте клієнту лише те, що потрібно.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Переклади та форматування, що виконуються виключно на сервері
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

### Використання в клієнтському компоненті

Розглянемо приклад клієнтського компонента, який відображає лічильник.

**Переклади (структура збережена; завантажте їх у повідомлення next-intl на свій розсуд)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити"
  }
}
```

**Клієнтський компонент**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Задаємо область безпосередньо для вкладеного об'єкта
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

> Не забудьте додати повідомлення "about" у клієнтські повідомлення сторінки
> (включайте лише ті простори імен, які справді потрібні вашому клієнтському компоненту).

### Використання в серверному компоненті

Цей UI-компонент є серверним компонентом і може рендеритися під клієнтським компонентом (page → client → server). Зберігайте його синхронним, передаючи попередньо обчислені рядки.

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

Примітки:

- Обчислюйте `formattedCount` на сервері (наприклад, `const initialFormattedCount = format.number(0)`).
- Уникайте передачі функцій або несеріалізованих об'єктів у server components.

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

// ... Rest of the page code
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
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
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

### Middleware для маршрутизації локалі

Додайте middleware для виявлення локалі та маршрутизації:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Пропустити API, внутрішні компоненти Next і статичні файли
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Найкращі практики

- **Встановіть атрибути `lang` та `dir` для html**: У `src/app/[locale]/layout.tsx` обчисліть `dir` за допомогою `getLocaleDirection(locale)` і встановіть `<html lang={locale} dir={dir}>`.
- **Розділяйте повідомлення за просторами імен**: Організуйте JSON за локалями та просторами імен (наприклад, `common.json`, `about.json`).
- **Мінімізуйте навантаження на клієнт**: На сторінках надсилайте в `NextIntlClientProvider` лише необхідні простори імен (наприклад, `pick(messages, ['common', 'about'])`).
- **Віддавайте перевагу статичним сторінкам**: Експортуйте `export const dynamic = 'force-static'` та генеруйте статичні параметри для всіх `locales`.
- **Синхронні серверні компоненти**: Передавайте попередньо обчислені рядки (перекладені підписи, відформатовані числа) замість асинхронних викликів або несеріалізованих функцій.

## Впровадження Intlayer поверх next-intl

Встановіть залежності intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

Створіть файл конфігурації intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Підтримуйте структуру папок для кожного namespace синхронізованою з Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Додайте скрипти в `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Примітки:

- `intlayer fill`: використовує вашого AI-провайдера для заповнення відсутніх перекладів на основі налаштованих локалей.
- `intlayer test`: перевіряє на наявність відсутніх/недійсних перекладів (використовуйте у CI).

Ви можете налаштувати аргументи та провайдерів; див. [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
