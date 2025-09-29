---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO и i18n в Next.js
description: Узнайте, как настроить многоязычный SEO в вашем приложении Next.js с использованием next-intl, next-i18next и Intlayer.
keywords:
  - Intlayer
  - SEO
  - Интернационализация
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - seo
  - i18n
  - nextjs
---

# SEO и i18n в Next.js: Перевода недостаточно

Когда разработчики думают об интернационализации (i18n), их первой реакцией часто является: _перевести контент_. Но обычно забывают, что главная цель интернационализации — сделать ваш сайт более заметным для всего мира.
Если ваше многоязычное приложение Next.js не сообщает поисковым системам, как сканировать и понимать различные языковые версии, большая часть ваших усилий может остаться незамеченной.

В этом блоге мы рассмотрим, **почему i18n — это суперсила SEO**, и как правильно реализовать её в Next.js с помощью `next-intl`, `next-i18next` и `Intlayer`.

---

## Почему SEO и i18n

Добавление языков — это не только про удобство пользователя (UX). Это также мощный рычаг для **органической видимости**. Вот почему:

1. **Лучшая обнаруживаемость:** Поисковые системы индексируют локализованные версии и ранжируют их для пользователей, ищущих на своем родном языке.
2. **Избежание дублированного контента:** Правильные канонические и альтернативные теги сообщают поисковым роботам, какая страница относится к какому языку.
3. **Лучший UX:** Посетители сразу попадают на правильную версию вашего сайта.
4. **Конкурентное преимущество:** Немногие сайты хорошо реализуют многоязычное SEO, что даёт вам возможность выделиться.

---

## Лучшие практики многоязычного SEO в Next.js

Вот чеклист, который должно реализовать каждое многоязычное приложение:

- **Устанавливайте метатеги `hreflang` в `<head>`**  
  Помогает Google понять, какие версии существуют для каждого языка.

- **Включайте все переведённые страницы в `sitemap.xml`**  
  Используйте схему `xhtml`, чтобы поисковые роботы могли легко находить альтернативные версии.

- **Исключайте приватные/локализованные маршруты в `robots.txt`**  
  Например, не позволяйте индексировать `/dashboard`, `/fr/dashboard`, `/es/dashboard`.

- **Используйте локализованные ссылки**  
  Пример: `<a href="/fr/about">À propos</a>` вместо ссылки на стандартную `/about`.

Это простые шаги — но их пропуск может стоить вам видимости.

---

## Примеры реализации

Разработчики часто забывают правильно ссылаться на свои страницы в разных локалях, поэтому давайте посмотрим, как это работает на практике с различными библиотеками.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// Функция для получения локализованного пути
function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  // Получаем переводы для текущей локали и namespace "about"
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
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
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

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
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    // Правила для роботов
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Добавляет префикс локали к пути, если это не локаль по умолчанию */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Помощник для абсолютного URL */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Динамически импортировать правильный JSON-файл
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
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
    locales.map((l) => [l, abs(l, "/about")])
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
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Генерирует объект, содержащий все URL для каждого языка.
   *
   * Пример:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Возвращает
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Остальной код страницы
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// Функция для получения всех многоязычных URL из массива URL
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Конфигурация robots.txt с правилами для поисковых роботов
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // Правила применяются ко всем роботам
    allow: ["/"], // Разрешенные пути
    disallow: getAllMultilingualUrls(["/dashboard"]), // Запрещенные пути (все языковые версии /dashboard)
  },
  host: "https://example.com", // Хост сайта
  sitemap: `https://example.com/sitemap.xml`, // Путь к карте сайта
});

export default robots;
```

> Intlayer предоставляет функцию `getMultilingualUrls` для генерации многоязычных URL-адресов для вашей карты сайта.

  </TabItem>
</Tabs>

---

## Заключение

Правильная реализация i18n в Next.js — это не просто перевод текста, а обеспечение того, чтобы поисковые системы и пользователи точно знали, какую версию вашего контента показывать.
Настройка hreflang, карт сайта и правил для robots — это то, что превращает переводы в реальную SEO-ценность.

Хотя next-intl и next-i18next предоставляют надежные способы для этого, они обычно требуют много ручной настройки, чтобы поддерживать согласованность между локалями.

Именно здесь Intlayer действительно выделяется:

Он поставляется с встроенными помощниками, такими как getMultilingualUrls, что делает интеграцию hreflang, карты сайта и robots практически без усилий.

Метаданные остаются централизованными, а не разбросанными по JSON-файлам или пользовательским утилитам.

Он разработан специально для Next.js с нуля, поэтому вы тратите меньше времени на отладку конфигурации и больше времени на выпуск продукта.

Если ваша цель — не просто переводить, а масштабировать многоязычное SEO без лишних сложностей, Intlayer предоставляет вам самое чистое и перспективное решение.
