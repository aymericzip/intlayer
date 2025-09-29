---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: Next.js 中的 SEO 和国际化
description: 学习如何使用 next-intl、next-i18next 和 Intlayer 在你的 Next.js 应用中设置多语言 SEO。
keywords:
  - Intlayer
  - SEO
  - 国际化
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

# Next.js 中的 SEO 和国际化：仅仅翻译是不够的

当开发者想到国际化（i18n）时，第一个反应通常是：_翻译内容_。但人们通常忘记了国际化的主要目标是让你的网站对全世界更具可见性。
如果你的多语言 Next.js 应用没有告诉搜索引擎如何抓取和理解你不同语言版本的内容，那么你大部分的努力可能都会被忽视。

在这篇博客中，我们将探讨 **为什么国际化（i18n）是 SEO 的超级力量**，以及如何在 Next.js 中使用 `next-intl`、`next-i18next` 和 `Intlayer` 正确实现它。

---

## 为什么要做 SEO 和国际化

添加语言不仅仅是为了用户体验（UX）。它也是提升 **自然流量可见性** 的强大杠杆。原因如下：

1. **更好的可发现性：** 搜索引擎会索引本地化版本，并针对使用母语搜索的用户进行排名。
2. **避免重复内容：** 适当的规范（canonical）和替代（alternate）标签告诉爬虫每个页面属于哪个语言版本。
3. **更好的用户体验：** 访客能够立即访问到你网站的正确语言版本。
4. **竞争优势：** 很少有网站能很好地实现多语言SEO，这意味着你可以脱颖而出。

---

## Next.js 多语言SEO最佳实践

以下是每个多语言应用都应该实施的检查清单：

- **在 `<head>` 中设置 `hreflang` 元标签**  
  帮助谷歌理解每种语言版本的存在。

- **在 `sitemap.xml` 中列出所有翻译页面**  
  使用 `xhtml` 方案，使爬虫能够轻松找到替代版本。

- **在 `robots.txt` 中排除私有/本地化路由**  
  例如，不允许 `/dashboard`、`/fr/dashboard`、`/es/dashboard` 被索引。

- **使用本地化链接**  
  例如：使用 `<a href="/fr/about">À propos</a>`，而不是链接到默认的 `/about`。

这些都是简单的步骤——但跳过它们可能会让你失去可见性。

---

## 实现示例

开发者经常忘记在不同语言环境中正确引用他们的页面，因此让我们看看使用不同库时这是如何实际操作的。

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  // 如果是默认语言，直接返回路径，否则加上语言前缀
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  // 获取当前语言的翻译内容，命名空间为 "about"
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

// ... 页面代码的其余部分
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

/** 除非是默认语言，否则为路径添加语言前缀 */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** 绝对 URL 辅助函数 */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
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

/** 除非是默认语言，否则为路径添加语言前缀 */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** 绝对 URL 辅助函数 */
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

  // 动态导入正确的 JSON 文件
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
  return <h1>关于</h1>;
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
      lastModified: new Date(), // 最后修改时间
      changeFrequency: "monthly", // 变更频率：每月
      priority: 0.7, // 优先级
      alternates: { languages }, // 语言替代链接
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com"; // 网站根地址

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
   * 生成一个包含每个语言环境所有 URL 的对象。
   *
   * 示例：
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // 返回
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

// ... 页面代码的其余部分
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

// 获取所有多语言版本的 URL
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// 定义 robots 配置
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*", // 适用于所有用户代理
    allow: ["/"], // 允许访问根路径
    disallow: getAllMultilingualUrls(["/dashboard"]), // 禁止访问仪表盘的所有多语言路径
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer 提供了一个 `getMultilingualUrls` 函数，用于为您的站点地图生成多语言 URL。

  </TabItem>
</Tabs>

---

## 结论

在 Next.js 中正确处理国际化（i18n）不仅仅是翻译文本，更是确保搜索引擎和用户能够准确识别并访问您内容的正确版本。
设置 hreflang、站点地图和 robots 规则，才是真正将翻译转化为 SEO 价值的关键。

虽然 next-intl 和 next-i18next 提供了可靠的方式来实现这些功能，但它们通常需要大量手动配置来保持各个语言环境之间的一致性。

这正是 Intlayer 的优势所在：

它内置了像 getMultilingualUrls 这样的辅助工具，使得 hreflang、站点地图和 robots 的集成几乎变得轻而易举。

元数据保持集中管理，而不是分散在 JSON 文件或自定义工具中。

它从底层为 Next.js 设计，因此您可以减少调试配置的时间，更多地专注于发布。

如果您的目标不仅是翻译，而是无障碍地扩展多语言 SEO，Intlayer 为您提供了最简洁、最具未来保障的解决方案。
