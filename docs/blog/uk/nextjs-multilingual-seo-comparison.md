---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO та i18n в Next.js
description: Дізнайтеся, як налаштувати багатомовне SEO у вашому додатку Next.js за допомогою next-intl, next-i18next та Intlayer.
keywords:
  - Intlayer
  - SEO
  - Інтернаціоналізація
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - blog-seo-i18n-nextjs
---

# SEO та i18n в Next.js: Перекладу недостатньо

Коли розробники думають про інтернаціоналізацію (i18n), першим рефлексом часто є: _перекласти контент_. Але зазвичай забувають, що головна мета інтернаціоналізації — зробити ваш вебсайт більш помітним для світу.
Якщо ваша багатомовна програма Next.js не повідомляє пошуковим системам, як сканувати й розуміти різні мовні версії, більшість ваших зусиль може залишитися непоміченою.

У цьому блозі ми розглянемо, чому **i18n — це суперсила для SEO**, і як правильно реалізувати її в Next.js за допомогою `next-intl`, `next-i18next` та `Intlayer`.

---

## Чому SEO та i18n

Додавання мов — це не лише про UX. Це також потужний важіль для **органічної видимості**. Ось чому:

1. **Краща виявлюваність:** Пошукові системи індексують локалізовані версії та ранжують їх для користувачів, які шукають рідною мовою.
2. **Уникнення дубльованого контенту:** Правильні канонічні та альтернативні теги повідомляють сканерам, яка сторінка належить до якої локалі.
3. **Кращий UX:** Відвідувачі потрапляють одразу на потрібну версію вашого сайту.
4. **Конкурентна перевага:** Лише небагато сайтів правильно реалізують багатомовне SEO, тож ви можете виділитися.

---

## Найкращі практики для багатомовного SEO в Next.js

Ось контрольний список, який має реалізувати кожен багатомовний додаток:

- **Встановіть мета-теги `hreflang` у `<head>`**  
  Допомагає Google зрозуміти, які версії існують для кожної мови.

- **Перелічіть всі перекладені сторінки у `sitemap.xml`**  
  Використовуйте схему `xhtml`, щоб пошукові роботи могли легко знаходити альтернативні версії.

- **Виключіть приватні/локалізовані маршрути в `robots.txt`**  
  Наприклад, не дозволяйте індексацію `/dashboard`, `/fr/dashboard`, `/es/dashboard`.

- **Використовуйте локалізовані посилання**  
  Приклад: `<a href="/fr/about">Про нас</a>` замість посилання на сторінку за замовчуванням `/about`.

Це прості кроки — але їх пропуск може коштувати вам видимості.

---

## Приклади реалізації

Розробники часто забувають правильно посилатися на свої сторінки для різних локалей, тож давайте подивимось, як це працює на практиці з різними бібліотеками.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
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

// ... решта коду сторінки
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

/** Додає префікс локалі до шляху, якщо це не локаль за замовчуванням */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Допоміжна функція для абсолютних URL */
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

  // Динамічно імпортуємо відповідний JSON-файл
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
  return <h1>Про нас</h1>;
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
   * Генерує об'єкт, що містить усі URL-адреси для кожної локалі.
   *
   * Приклад:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Повертає
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

// ... Решта коду сторінки
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

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer надає функцію `getMultilingualUrls` для генерації багатомовних URL-адрес для вашого sitemap.

  </TabItem>
</Tabs>

---

## Висновок

Правильна реалізація i18n у Next.js — це не просто переклад тексту, а забезпечення того, щоб пошукові системи та користувачі точно знали, яку версію вашого контенту показувати.
Налаштування hreflang, sitemap і правил для robots — те, що перетворює переклади на реальну SEO-цінність.

Хоча next-intl і next-i18next дають надійні способи це реалізувати, зазвичай вони вимагають багато ручного налаштування, щоб підтримувати консистентність між локалями.

Саме тут Intlayer дійсно вирізняється:

Воно постачається з вбудованими хелперами, такими як getMultilingualUrls, що робить інтеграцію hreflang, sitemap і robots майже беззусильною.

Метадані зберігаються централізовано замість того, щоб розкидуватися по JSON-файлах або власних утилітах.

Він спроєктований для Next.js з нуля, тож ви витрачаєте менше часу на налагодження конфігурації й більше — на реліз.

Якщо ваша мета — не просто перекладати, а масштабувати багатомовне SEO без зайвих зусиль, Intlayer дає вам найчистіше, найбільш стійке до майбутніх змін налаштування.
