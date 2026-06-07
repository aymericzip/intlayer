---
createdAt: 2025-11-01
updatedAt: 2026-05-31
title: Як інтернаціоналізувати ваш додаток Next.js за допомогою next-intl у 2025 році - Повний посібник з перекладу Translate Next.js 16 with next-intl — App Router Setup
description: Найкраще рішення для розміру бандлу, SEO, продуктивності & підтримуваності. Зробіть Next.js 16 сайт багатомовним у 2026, переклад LLM, Agent Skills & MCP.
keywords:
  - next-intl
  - Інтернаціоналізація
  - Блог
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Початкова версія
---

# Як інтернаціоналізувати ваш додаток Next.js за допомогою next-intl у 2025 році

## Зміст

<TOC/>

## Що таке next-intl?

**next-intl**, популярна бібліотека для інтернаціоналізації (i18n), спеціально створена для Next.js App Router. Вона забезпечує зручний спосіб створення багатомовних додатків на Next.js з відмінною підтримкою TypeScript і вбудованими оптимізаціями.

> Якщо бажаєте, також можете звернутися до [посібника next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/i18n_using_next-i18next.md), або безпосередньо використати [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_next-intl.md).

> Див. порівняння у [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/next-i18next_vs_next-intl_vs_intlayer.md).

## Практики, яких слід дотримуватися

Перш ніж приступити до реалізації, ось кілька практик, яких варто дотримуватись:

- **Set HTML `lang` and `dir` attributes**
  У вашому layout обчислюйте `dir` за допомогою `getLocaleDirection(locale)` і встановлюйте `<html lang={locale} dir={dir}>` для коректної доступності та SEO.
- **Split messages by namespace**
  Організовуйте файли JSON за локаллю та namespace (наприклад, `common.json`, `about.json`), щоб завантажувати лише те, що потрібно.
- **Minimize client payload**
  На сторінках надсилайте до `NextIntlClientProvider` лише потрібні namespace (наприклад, `pick(messages, ['common', 'about'])`).
- **Prefer static pages**
  Якнайчастіше використовуйте статичні сторінки для кращої продуктивності та SEO.
- **I18n in server components**
  I18n у серверних компонентах
  Серверні компоненти, наприклад сторінки або всі компоненти, які не позначені як `client`, є статичними і можуть бути попередньо відрендерені під час збірки. Тому нам доведеться передавати функції перекладу їм як props.
- **Set up TypeScript types**
  Налаштуйте типи TypeScript для ваших локалей, щоб забезпечити типобезпеку в усьому додатку.
- **Proxy for redirection**
  Використовуйте проксі для обробки визначення локалі та маршрутизації і перенаправлення користувача на відповідний URL з префіксом локалі.
- **Internationalization of your metadata, sitemap, robots.txt**
  Інтернаціоналізуйте ваші метадані, sitemap, robots.txt, використовуючи функцію `generateMetadata`, надану Next.js, щоб забезпечити краще індексування пошуковими системами у всіх локалях.
- **Localize Links**
  Локалізуйте посилання
  Локалізуйте посилання, використовуючи компонент `Link`, щоб перенаправляти користувача на URL із відповідним префіксом локалі. Це важливо для забезпечення індексації ваших сторінок у всіх локалях.
- **Автоматизуйте тести та переклади**
  Автоматизація тестів і перекладів допомагає економити час на підтримці вашого багатомовного додатка.

> Дивіться нашу документацію з переліком усього, що потрібно знати про інтернаціоналізацію та SEO: [Інтернаціоналізація (i18n) з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/uk/internationalization_and_SEO.md).

---

## Покроковий посібник з налаштування next-intl у застосунку Next.js

<iframe
  src="https://ide.intlayer.org/aymericzip/next-intl-template?file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Демо CodeSandbox. Як інтернаціоналізувати ваш застосунок за допомогою Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Див. [Шаблон застосунку](https://github.com/aymericzip/next-intl-template) на GitHub.

Ось структура проєкту, яку ми створимо:

```bash
.
├── global.ts
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
└── src # Src необов'язковий
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Група маршрутів, щоб не засмічувати всі сторінки ресурсами home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

<Steps>

<Step number={1} title="Встановіть залежності">

Встановіть необхідні пакети, використовуючи:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Основна бібліотека інтернаціоналізації для Next.js App Router, яка надає хуки, server-функції та клієнтські провайдери для керування перекладами.

</Step>

<Step number={2} title="Налаштуйте ваш проєкт">

Створіть файл конфігурації, який визначає підтримувані локалі та налаштовує конфігурацію запитів next-intl. Цей файл слугує єдиним джерелом правди для вашої налаштування i18n і забезпечує безпеку типів у всьому застосунку.

Централізація конфігурації локалей запобігає невідповідностям і полегшує додавання або видалення локалей у майбутньому. Функція `getRequestConfig` виконується для кожного запиту й завантажує лише ті переклади, які потрібні для конкретної сторінки, що дозволяє застосувати code-splitting і зменшити розмір бандла.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Визначте підтримувані локалі з безпекою типів
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Динамічно завантажує повідомлення для кожної локалі для підтримки code-splitting
// Promise.all завантажує простори імен паралельно для кращої продуктивності
async function loadMessages(locale: Locale) {
  // Завантажуйте лише ті простори імен, які потрібні вашому layout та сторінкам
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Майбутні JSON-файли слід додати тут
  ]);

  return { common, home, about } as const;
}

// Допоміжна функція для генерації локалізованих URL (наприклад, /about проти /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig виконується на кожен запит і надає повідомлення для серверних компонентів
// Це місце, де next-intl підключається до server-side rendering у Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 рік
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Змінити маршрут /en/... на /...
  // Опціонально: локалізовані шляхи
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // запобігати редіректу "/" -> "/en" через cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

</Step>

<Step number={3} title="Визначте динамічні маршрути локалей">

Налаштуйте динамічний роутинг для локалей, створивши директорію `[locale]` у вашій папці app. Це дозволяє Next.js обробляти маршрутизацію за локаллю, де кожна локаль стає сегментом URL (наприклад, `/en/about`, `/fr/about`).

Використання динамічних маршрутів дозволяє Next.js генерувати статичні сторінки для всіх локалей під час збірки, що покращує продуктивність і SEO. Компонент layout встановлює HTML-атрибути `lang` та `dir` на основі локалі, що є критично важливим для доступності та правильного розуміння сторінки пошуковими системами.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Попередньо згенерувати статичні сторінки для всіх локалей під час збірки (SSG)
// Це покращує продуктивність і SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // У Next.js App Router, params, це Promise (можна використовувати await)
  // Це дозволяє асинхронно вирішувати динамічні сегменти маршруту
  const { locale } = await params;

  // Критично: setRequestLocale повідомляє next-intl, яку локаль використовувати для цього запиту
  // Без цього getTranslations() не знатиме, яку локаль використовувати в серверних компонентах
  setRequestLocale(locale);

  // Отримати напрямок тексту (LTR/RTL) для правильного відображення HTML
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
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Повідомлення завантажуються на сервері. Передавайте на клієнт лише те, що потрібно
  // Це мінімізує розмір JavaScript-пакета, відправленого в браузер
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Переклади/форматування, що виконуються виключно на сервері
  // Ці виклики виконуються на сервері і можуть передаватися як пропси компонентам
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider робить переклади доступними для клієнтських компонентів
    // Передавайте лише ті неймспейси, які реально використовують ваші клієнтські компоненти
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

</Step>

<Step number={4} title="Створіть файли перекладів">

Створіть JSON-файли для кожної локалі та простору імен. Така структура дозволяє логічно організувати переклади та завантажувати лише те, що потрібно для кожної сторінки.

Організація перекладів за просторами імен (наприклад, `common.json`, `about.json`) дозволяє робити code splitting і зменшувати розмір бандла. Ви завантажуєте лише переклади, потрібні для конкретної сторінки, що покращує продуктивність.

```json fileName="locales/en/common.json"
{
  "welcome": "Ласкаво просимо",
  "greeting": "Привіт, світ!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Ласкаво просимо",
  "greeting": "Привіт, світ!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "Про",
  "description": "Опис сторінки «Про»",
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "Про",
  "description": "Опис сторінки «Про»",
  "counter": {
    "label": "Лічильник",
    "increment": "Збільшити"
  }
}
```

</Step>

<Step number={5} title="Використання перекладів на ваших сторінках">

Створіть компонент сторінки, який завантажує переклади на сервері та передає їх як серверним, так і клієнтським компонентам. Це гарантує, що переклади завантажені перед рендерингом і запобігає блиманню (content flashing).

Завантаження перекладів на сервері покращує SEO та запобігає FOUC (Flash of Untranslated Content). Використовуючи `pick` для відправки тільки необхідних просторів імен до клієнтського провайдера, ми мінімізуємо JavaScript-бандл, що відправляється в браузер.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Повідомлення завантажуються на сервері. Надсилайте в клієнт лише те, що потрібно.
  // Це мінімізує розмір JavaScript-бандла, який надсилається до браузера
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Суто серверні переклади/форматування
  // Ці функції виконуються на сервері і можуть передаватися як props до компонентів
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider робить переклади доступними для клієнтських компонентів
    // Передавайте лише ті простори імен (namespaces), які дійсно використовують ваші клієнтські компоненти
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

</Step>

<Step number={6} title="Використання перекладів у клієнтських компонентах">

Клієнтські компоненти можуть використовувати хуки `useTranslations` та `useFormatter` для доступу до перекладів і функцій форматування. Ці хуки читають дані з контексту `NextIntlClientProvider`.

Клієнтські компоненти потребують React-хуків для доступу до перекладів. Хуки `useTranslations` та `useFormatter` безшовно інтегруються з next-intl і забезпечують реактивні оновлення при зміні локалі.

> Не забудьте додати необхідні namespaces до client messages сторінки (включайте лише ті namespaces, які дійсно потрібні вашим клієнтським компонентам).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Застосувати область безпосередньо до вкладеного об'єкта
  // useTranslations/useFormatter, це хуки, які читають контекст NextIntlClientProvider
  // Вони працюють лише якщо компонент обгорнутий у NextIntlClientProvider
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

</Step>

<Step number={7} title="Використання перекладів у серверних компонентах">

Серверні компоненти не можуть використовувати React‑хуки, тому вони отримують переклади та функції форматування як props від батьківських компонентів. Такий підхід зберігає серверні компоненти синхронними й дозволяє вкладати їх усередину клієнтських компонентів.

Серверні компоненти, які можуть бути вкладені в клієнтські межі, мають бути синхронними. Передаючи перекладені рядки та відформатовані значення як props, ми уникаємо асинхронних операцій і забезпечуємо правильне рендерення. Попередньо обчисліть переклади та форматування в батьківському компоненті сторінки.

```tsx fileName="src/components/ServerComponent.tsx"
// Серверні компоненти, вкладені всередині клієнтських компонентів, мають бути синхронними
// React не може серіалізувати асинхронні функції через межу сервер/клієнт
// Рішення: попередньо обчислювати переклади/формати в батьківському компоненті та передавати їх як props
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

> У вашому page/layout використовуйте `getTranslations` та `getFormatter` з `next-intl/server`, щоб попередньо обчислити переклади та форматування, а потім передайте їх як props серверним компонентам.

</Step>

<Step number={8} title="Змініть мову вашого контенту" isOptional={true}>

Щоб змінити мову контенту за допомогою next-intl, рендерте посилання з урахуванням локалі (locale-aware links), які вказують на той самий pathname при перемиканні локалі. Провайдер автоматично переписує URL-адреси, тож вам потрібно лише націлитися на поточний маршрут.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Видаляє префікс локалі з pathname, щоб отримати базовий шлях
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Вибір мови">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Побудова href залежно від того, чи це локаль за замовчуванням
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

</Step>

<Step number={9} title="Використовуйте локалізований компонент Link" isOptional={true}>

`next-intl` надає сабпакет `next-intl/navigation`, який містить локалізований компонент Link, що автоматично застосовує активну локаль. Ми вже експортували його для вас у файлі `@/i18n`, тож ви можете використовувати його так:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

</Step>

<Step number={10} title="Отримання активної локалі всередині Server Actions" isOptional={true}>

Server Actions можуть зчитувати поточну локаль за допомогою `next-intl/server`. Це корисно для надсилання локалізованих електронних листів або збереження мовних налаштувань разом із надісланими даними.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Використовуйте локаль для вибору шаблонів, міток аналітики тощо.
  console.log(`Received contact form from locale ${locale}`);
}
```

> `getLocale` читає локаль, встановлену проксі `next-intl`, тож функція працює у будь-якому місці на сервері: Route Handlers, Server Actions та edge functions.

</Step>

<Step number={11} title="Інтернаціоналізуйте свої метадані" isOptional={true}>

Переклад контенту важливий, але головна мета інтернаціоналізації, зробити ваш вебсайт більш помітним у світі. I18n, неймовірний важіль для підвищення видимості вашого вебсайту за допомогою правильної SEO.

Коректно інтернаціоналізовані метадані допомагають пошуковим системам зрозуміти, якими мовами доступні ваші сторінки. Це включає встановлення meta-тегів hreflang, переклад заголовків і описів, а також забезпечення правильності canonical URL для кожної локалі.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata виконується для кожної локалі, генеруючи метадані, оптимізовані для SEO
// Це допомагає пошуковим системам зрозуміти альтернативні мовні версії
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

// ... Решта коду сторінки
```

</Step>

<Step number={12} title="Інтернаціоналізуйте свій sitemap" isOptional={true}>

Створіть sitemap, який включає всі мовні версії ваших сторінок. Це допомагає пошуковим системам виявляти та індексувати всі мовні версії вашого контенту.

Правильно інтернаціоналізований sitemap гарантує, що пошукові системи зможуть знайти та індексувати всі мовні версії ваших сторінок. Це покращує видимість у міжнародних результатах пошуку.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Отримати карту всіх локалей та їх локалізованих шляхів
 *
 * Приклад результату:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
// Генерує sitemap, який містить усі локалізовані версії сторінок для кращого SEO
// Поле alternates повідомляє пошуковим системам про мовні версії
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

</Step>

<Step number={13} title="Інтернаціоналізуйте ваш robots.txt" isOptional={true}>

Створіть файл robots.txt, який правильно обробляє всі мовні версії ваших захищених маршрутів. Це гарантує, що пошукові системи не індексують сторінки admin або dashboard жодною мовою.

Правильна конфігурація robots.txt для всіх локалей запобігає індексації конфіденційних сторінок пошуковими системами, коли ваші маршрути відрізняються для кожної локалі.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Генерує шляхи для всіх локалей (наприклад, /admin, /fr/admin, /es/admin)
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

</Step>

<Step number={14} title="Налаштування proxy для маршрутизації локалі" isOptional={true}>

Створіть proxy, щоб автоматично визначати бажану користувачем локаль та перенаправляти його на відповідний URL з префіксом локалі. next-intl надає зручну функцію proxy, яка обробляє це автоматично.

Проксі забезпечує автоматичне перенаправлення користувачів на їхню пріоритетну мову під час відвідування сайту. Воно також зберігає мовні налаштування користувача для майбутніх відвідувань, покращуючи досвід користувача.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware виконується перед маршрутами, обробляючи визначення локалі та маршрутизацію
// localeDetection: true використовує заголовок Accept-Language для автоматичного визначення локалі
export default proxy;

export const config = {
  // Пропустити API, внутрішні маршрути Next та статичні ресурси
  // Regex: відповідає всім маршрутам, крім тих, що починаються з api, _next або містять крапку (файли)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>

<Step number={15} title="Налаштуйте типи TypeScript для локалі" isOptional={true}>

Налаштування TypeScript допоможе отримати автозаповнення та типобезпеку для ваших ключів.

Для цього ви можете створити файл global.ts у корені вашого проєкту та додати наступний код:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... Future JSON files should be added here too
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Цей код використовує Module Augmentation, щоб додати locales і messages до типу AppConfig з next-intl.

</Step>

<Step number={16} title="Автоматизуйте переклади за допомогою Intlayer" isOptional={true}>

Intlayer, це **безкоштовна** та **відкрита** бібліотека, створена для полегшення процесу локалізації у вашому застосунку. У той час як next-intl відповідає за завантаження та управління перекладами, Intlayer допомагає автоматизувати робочий процес перекладів.

Ручне керування перекладами може займати багато часу та бути схильним до помилок. Intlayer автоматизує тестування, генерацію та управління перекладами, заощаджуючи ваш час і забезпечуючи узгодженість у всьому застосунку.

Intlayer дозволить вам:

- **Оголошувати контент там, де вам зручно у вашій codebase**  
  Intlayer дозволяє оголошувати контент там, де вам зручно в codebase, використовуючи файли `.content.{ts|js|json}`. Це забезпечує кращу організацію контенту, покращуючи читабельність та підтримуваність вашої codebase.

- **Тестувати відсутні переклади**
  Intlayer надає функції тестування, які можна інтегрувати у ваші CI/CD-пайплайни або модульні тести. Дізнайтеся більше про [тестування ваших перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).

- **Автоматизуйте ваші переклади**,
  Intlayer надає CLI і розширення для VSCode для автоматизації ваших перекладів. Це можна інтегрувати у ваш CI/CD-пайплайн. Дізнайтеся більше про [автоматизацію ваших перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).
  Ви можете використовувати ваш **власний API-ключ та постачальника AI на ваш вибір**. Intlayer також забезпечує контекстно-залежні переклади, див. [автозаповнення контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/autoFill.md).

- **Підключайте зовнішній контент**
  Intlayer дозволяє підключати ваш контент до зовнішньої системи управління контентом (CMS), отримувати його оптимізовано та вставляти у ваші JSON-ресурси. Дізнайтеся більше про [отримання зовнішнього контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md).

- **Візуальний редактор**
  Intlayer пропонує безкоштовний візуальний редактор для редагування вашого контенту. Дізнайтеся більше про [візуальне редагування ваших перекладів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

І це ще не все. Щоб ознайомитися з усіма можливостями, які надає Intlayer, зверніться до документації про [переваги Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md).

</Step>

</Steps>
