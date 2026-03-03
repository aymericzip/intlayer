---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Как интернационализировать ваше приложение Next.js с помощью next-intl
description: Настройка i18n с next-intl - лучшие практики и советы по SEO для многоязычных приложений Next.js, охватывающие интернационализацию, организацию контента и техническую настройку.
keywords:
  - next-intl
  - Internationalization
  - Blog
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
    changes: Начальная версия
---

# Как интернационализировать ваше приложение Next.js с помощью next-intl в 2025 году

## Содержание

<TOC/>

## Что такое next-intl?

**next-intl**, это популярная библиотека интернационализации (i18n), разработанная специально для Next.js App Router. Она обеспечивает бесшовный способ создания многоязычных приложений Next.js с отличной поддержкой TypeScript и встроенными оптимизациями.

> Если хотите, вы также можете ознакомиться с [руководством по next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/i18n_using_next-i18next.md) или использовать напрямую [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_next-intl.md).

> Сравнение доступно в статье [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/next-i18next_vs_next-intl_vs_intlayer.md).

## Практики, которые следует соблюдать

Прежде чем перейти к реализации, вот несколько рекомендаций, которым следует следовать:

- **Установите атрибуты HTML `lang` и `dir`**  
  В вашем layout вычисляйте `dir` с помощью `getLocaleDirection(locale)` и задавайте `<html lang={locale} dir={dir}>` для правильной доступности и SEO.
- **Разделяйте сообщения по namespace**  
  Организуйте JSON-файлы по локалям и namespace (например, `common.json`, `about.json`), чтобы загружать только необходимое.
- **Минимизируйте нагрузку на клиент**  
  На страницах отправляйте в `NextIntlClientProvider` только необходимые namespace (например, `pick(messages, ['common', 'about'])`).
- **Предпочитайте статические страницы**  
  Используйте статические страницы по максимуму для лучшей производительности и SEO.
- **Интернационализация в серверных компонентах**  
  Компоненты сервера, такие как страницы или все компоненты, не помеченные как `client`, являются статическими и могут быть предварительно отрендерены во время сборки. Поэтому нам нужно будет передавать функции перевода им через props.
- **Настройте типы TypeScript**  
  Для ваших локалей, чтобы обеспечить типобезопасность во всем приложении.
- **Прокси для перенаправления**  
  Используйте прокси для обработки определения локали и маршрутизации, а также для перенаправления пользователя на соответствующий URL с префиксом локали.
- **Интернационализация ваших метаданных, sitemap, robots.txt**  
  Интернационализируйте ваши метаданные, sitemap, robots.txt с помощью функции `generateMetadata`, предоставляемой Next.js, чтобы обеспечить лучшее обнаружение страниц поисковыми системами во всех локалях.
- **Локализация ссылок**  
  Локализуйте ссылки, используя компонент `Link`, чтобы перенаправлять пользователя на URL с соответствующим префиксом локали. Это важно для обеспечения обнаружения ваших страниц во всех локалях.
- **Автоматизация тестов и переводов**  
  Автоматизация тестов и переводов помогает экономить время на поддержку вашего многоязычного приложения.

> См. нашу документацию, в которой перечислено все, что нужно знать об интернационализации и SEO: [Интернационализация (i18n) с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ru/internationalization_and_SEO.md).

---

## Пошаговое руководство по настройке next-intl в приложении Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  
className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"  
title="Демонстрация CodeSandbox - Как интернационализировать ваше приложение с помощью Intlayer"  
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"  
loading="lazy"

> См. [Шаблон приложения](https://github.com/aymericzip/next-intl-template) на GitHub.

Вот структура проекта, которую мы будем создавать:

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
└── src # Src является необязательным
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Группа маршрутов, чтобы не засорять все страницы ресурсами домашней страницы)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Шаг 1: Установка зависимостей

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Основная библиотека интернационализации для Next.js App Router, предоставляющая хуки, серверные функции и клиентские провайдеры для управления переводами.

### Шаг 2: Настройка проекта

Создайте файл конфигурации, который определяет поддерживаемые локали и настраивает конфигурацию запросов next-intl. Этот файл служит единственным источником правды для вашей настройки i18n и обеспечивает типобезопасность во всём приложении.

Централизация конфигурации локалей предотвращает несоответствия и упрощает добавление или удаление локалей в будущем. Функция `getRequestConfig` выполняется при каждом запросе и загружает только те переводы, которые необходимы для каждой страницы, что позволяет использовать разделение кода и уменьшать размер бандла.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Определяем поддерживаемые локали с типобезопасностью
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  // Проверяет, является ли локаль языком с письмом справа налево
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Динамическая загрузка сообщений для каждой локали для поддержки code-splitting
// Promise.all загружает пространства имён параллельно для повышения производительности
async function loadMessages(locale: Locale) {
  // Загружает только те пространства имён, которые нужны вашему layout/страницам
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... Здесь следует добавлять будущие JSON файлы
  ]);

  return { common, home, about } as const;
}

// Вспомогательная функция для генерации локализованных URL (например, /about против /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig вызывается при каждом запросе и предоставляет сообщения серверным компонентам
// Здесь next-intl интегрируется с серверным рендерингом Next.js
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
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 год
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Изменить маршрут /en/... на /...
  // Необязательно: локализованные пути
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // предотвращает перенаправления "/" -> "/en" из cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Шаг 3: Определение динамических маршрутов локалей

Настройте динамическую маршрутизацию для локалей, создав каталог `[locale]` в вашей папке приложения. Это позволяет Next.js обрабатывать маршрутизацию на основе локали, где каждая локаль становится сегментом URL (например, `/en/about`, `/fr/about`).

Использование динамических маршрутов позволяет Next.js генерировать статические страницы для всех локалей во время сборки, что улучшает производительность и SEO. Компонент layout устанавливает атрибуты HTML `lang` и `dir` на основе локали, что важно для доступности и понимания поисковыми системами.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Предварительная генерация статических страниц для всех локалей во время сборки (SSG)
// Это улучшает производительность и SEO
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
  // В Next.js App Router params, это Promise (можно использовать await)
  // Это позволяет динамическим сегментам маршрута разрешаться асинхронно
  const { locale } = await params;

  // Важно: setRequestLocale сообщает next-intl, какую локаль использовать для этого запроса
  // Без этого getTranslations() не сможет определить локаль для серверных компонентов
  setRequestLocale(locale);

  // Получаем направление текста (LTR/RTL) для правильного рендеринга HTML
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
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

  // Сообщения загружаются на стороне сервера. Отправляем клиенту только необходимое.
  // Это минимизирует размер JavaScript-бандла, отправляемого в браузер
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Строго серверные переводы/форматирование
  // Эти функции выполняются на сервере и могут передаваться как props в компоненты
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider делает переводы доступными для клиентских компонентов
    // Передавайте только те пространства имён, которые действительно используются вашими клиентскими компонентами
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

### Шаг 4: Создайте файлы переводов

Создайте JSON-файлы для каждой локали и пространства имён. Такая структура позволяет логично организовать переводы и загружать только то, что необходимо для каждой страницы.

Организация переводов по пространствам имён (например, `common.json`, `about.json`) позволяет использовать разделение кода (code splitting) и уменьшает размер бандла. Вы загружаете только переводы, необходимые для каждой страницы, что улучшает производительность.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Шаг 5: Используйте переводы на своих страницах

Создайте компонент страницы, который загружает переводы на сервере и передает их как серверным, так и клиентским компонентам. Это гарантирует, что переводы загружены до рендеринга и предотвращает мерцание контента.

Загрузка переводов на стороне сервера улучшает SEO и предотвращает FOUC (Flash of Untranslated Content, мерцание непереведенного контента). Используя `pick` для передачи только необходимых пространств имен клиентскому провайдеру, мы минимизируем размер JavaScript-бандла, отправляемого в браузер.

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

  // Сообщения загружаются на стороне сервера. Отправляйте клиенту только необходимое.
  // Это минимизирует размер JavaScript-бандла, отправляемого в браузер
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Строго серверные переводы/форматирование
  // Они выполняются на сервере и могут быть переданы в компоненты как пропсы
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider предоставляет переводы клиентским компонентам
    // Передавайте только те пространства имён, которые действительно используются вашими клиентскими компонентами
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

### Шаг 6: Использование переводов в клиентских компонентах

Клиентские компоненты могут использовать хуки `useTranslations` и `useFormatter` для доступа к переводам и функциям форматирования. Эти хуки читают данные из контекста `NextIntlClientProvider`.

Клиентским компонентам необходимы React хуки для доступа к переводам. Хуки `useTranslations` и `useFormatter` интегрируются с next-intl и обеспечивают реактивное обновление при изменении локали.

> Не забудьте добавить необходимые пространства имён в клиентские сообщения страницы (включайте только те пространства имён, которые действительно нужны вашим клиентским компонентам).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Область видимости непосредственно вложенного объекта
  // useTranslations/useFormatter, это хуки, которые читают данные из контекста NextIntlClientProvider
  // Они работают только если компонент обернут в NextIntlClientProvider
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

### Шаг 7: Использование переводов в серверных компонентах

Серверные компоненты не могут использовать React хуки, поэтому они получают переводы и форматтеры через props от родительских компонентов. Такой подход сохраняет серверные компоненты синхронными и позволяет вкладывать их внутрь клиентских компонентов.

Компоненты сервера, которые могут быть вложены в клиентские границы, должны быть синхронными. Передавая переведённые строки и отформатированные значения через props, мы избегаем асинхронных операций и обеспечиваем корректный рендеринг. Предварительно вычисляйте переводы и форматирование в родительском компоненте страницы.

```tsx fileName="src/components/ServerComponent.tsx"
// Компоненты сервера, вложенные в клиентские компоненты, должны быть синхронными
// React не может сериализовать асинхронные функции через границу сервер/клиент
// Решение: предварительно вычислять переводы/форматы в родительском компоненте и передавать через props
type ServerComponentProps = {
  formattedCount: string; // отформатированное число
  label: string; // метка для aria-label
  increment: string; // текст кнопки увеличения
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

> В вашем компоненте страницы/макета используйте `getTranslations` и `getFormatter` из `next-intl/server` для предварительного вычисления переводов и форматирования, затем передавайте их как пропсы в серверные компоненты.

---

### (Необязательно) Шаг 8: Изменение языка вашего контента

Чтобы изменить язык вашего контента с помощью next-intl, отображайте ссылки с учетом локали, которые указывают на тот же путь, но с переключением локали. Провайдер автоматически переписывает URL, поэтому вам нужно лишь указать текущий маршрут.

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

  // Удалить префикс локали из пути, чтобы получить базовый путь
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
    <nav aria-label="Выбор языка">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Формируем href в зависимости от того, является ли локаль локалью по умолчанию
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

### (Необязательно) Шаг 9: Использование локализованного компонента Link

`next-intl` предоставляет подпакет `next-intl/navigation`, который содержит локализованный компонент ссылки, автоматически применяющий активную локаль. Мы уже вынесли его для вас в файл `@/i18n`, так что вы можете использовать его следующим образом:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Необязательно) Шаг 10: Доступ к активной локали внутри Server Actions

Server Actions могут читать текущую локаль с помощью `next-intl/server`. Это полезно для отправки локализованных писем или сохранения языковых предпочтений вместе с отправленными данными.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Используйте locale для выбора шаблонов, меток аналитики и т.д.
  console.log(`Получена контактная форма с локали ${locale}`);
}
```

> `getLocale` читает локаль, установленную прокси `next-intl`, поэтому работает в любом месте на сервере: Route Handlers, Server Actions и edge functions.

### (Опционально) Шаг 11: Интернационализация ваших метаданных

Перевод контента важен, но главная цель интернационализации, сделать ваш сайт более заметным для всего мира. I18n, это невероятный рычаг для улучшения видимости вашего сайта через правильное SEO.

Правильно интернационализированные метаданные помогают поисковым системам понять, какие языки доступны на ваших страницах. Это включает установку метатегов hreflang, перевод заголовков и описаний, а также обеспечение корректной установки канонических URL для каждой локали.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata запускается для каждой локали, создавая SEO-дружественные метаданные
// Это помогает поисковым системам понимать альтернативные языковые версии
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

### (Необязательно) Шаг 12: Интернационализация вашей карты сайта

Создайте sitemap, который включает все локализованные версии ваших страниц. Это помогает поисковым системам обнаруживать и индексировать все языковые версии вашего контента.

Правильно интернационализированный sitemap гарантирует, что поисковые системы смогут найти и индексировать все языковые версии ваших страниц. Это улучшает видимость в международных результатах поиска.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Получить карту всех локалей и их локализованных путей
 *
 * Пример вывода:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Генерация sitemap со всеми локалями для улучшения SEO
// Поле alternates сообщает поисковым системам о языковых версиях
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

### (Необязательно) Шаг 13: Интернационализация вашего файла robots.txt

Создайте файл robots.txt, который корректно обрабатывает все языковые версии ваших защищённых маршрутов. Это гарантирует, что поисковые системы не будут индексировать страницы админки или панели управления на любом языке.

Правильная настройка robots.txt для всех локалей предотвращает индексацию поисковыми системами чувствительных страниц, когда ваши маршруты отличаются для каждой локали.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Генерация путей для всех локалей (например, /admin, /fr/admin, /es/admin)
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

### (Необязательно) Шаг 14: Настройка прокси для маршрутизации по локали

Создайте прокси, который автоматически определяет предпочитаемую пользователем локаль и перенаправляет его на соответствующий URL с префиксом локали. next-intl предоставляет удобную функцию прокси, которая обрабатывает это автоматически.

Прокси обеспечивает автоматическое перенаправление пользователей на предпочитаемый ими язык при посещении вашего сайта. Он также сохраняет предпочтения пользователя для будущих посещений, улучшая пользовательский опыт.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware запускается перед маршрутами, обрабатывая определение локали и маршрутизацию
// localeDetection: true использует заголовок Accept-Language для автоматического определения локали
export default proxy;

export const config = {
  // Пропустить API, внутренние маршруты Next и статические ресурсы
  // Regex: совпадает со всеми маршрутами, кроме тех, что начинаются с api, _next или содержат точку (файлы)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Optional) Step 15: Настройка типов TypeScript для локали

Настройка TypeScript поможет вам получить автодополнение и типобезопасность для ваших ключей.

Для этого вы можете создать файл global.ts в корне вашего проекта и добавить следующий код:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... В будущем сюда также следует добавлять новые JSON-файлы
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Этот код использует расширение модуля (Module Augmentation), чтобы добавить локали и сообщения в тип AppConfig из next-intl.

### (Опционально) Шаг 15: Автоматизация переводов с помощью Intlayer

Intlayer, это **бесплатная** и **открытая** библиотека, предназначенная для помощи в процессе локализации вашего приложения. В то время как next-intl отвечает за загрузку и управление переводами, Intlayer помогает автоматизировать рабочий процесс перевода.

Управление переводами вручную может занимать много времени и быть подвержено ошибкам. Intlayer автоматизирует тестирование, генерацию и управление переводами, экономя ваше время и обеспечивая согласованность по всему приложению.

Intlayer позволяет вам:

- **Объявлять ваш контент там, где вы хотите, в вашей кодовой базе**  
  Intlayer позволяет объявлять ваш контент там, где вы хотите, в вашей кодовой базе, используя файлы `.content.{ts|js|json}`. Это обеспечит лучшую организацию вашего контента, улучшая читаемость и поддерживаемость вашей кодовой базы.

- **Тестировать отсутствующие переводы**  
  Intlayer предоставляет функции тестирования, которые можно интегрировать в ваш CI/CD pipeline или в ваши модульные тесты. Узнайте больше о [тестировании ваших переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).

- **Автоматизация ваших переводов**  
  Intlayer предоставляет CLI и расширение для VSCode для автоматизации ваших переводов. Это можно интегрировать в ваш CI/CD pipeline. Узнайте больше о [автоматизации ваших переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).  
  Вы можете использовать **свой собственный API-ключ и выбранного вами AI-провайдера**. Также поддерживаются контекстно-зависимые переводы, см. [заполнение контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/autoFill.md).

- **Подключение внешнего контента**  
  Intlayer позволяет подключать ваш контент к внешней системе управления контентом (CMS). Для оптимального получения данных и вставки их в ваши JSON-ресурсы. Узнайте больше о [получении внешнего контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md).

- **Визуальный редактор**  
  Intlayer предлагает бесплатный визуальный редактор для редактирования вашего контента с помощью визуального интерфейса. Узнайте больше о [визуальном редактировании ваших переводов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

И многое другое. Чтобы узнать обо всех функциях, предоставляемых Intlayer, пожалуйста, обратитесь к [документации о преимуществах Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md).
