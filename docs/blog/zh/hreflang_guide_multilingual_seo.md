---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang，多语言 SEO 指南"
description: "什么是 hreflang，搜索引擎强制执行的规则，为什么 x-default 几乎总是错误的，以及如何在 Next.js 和 TanStack Start 中生成正确的标签。"
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang：多语言 SEO 指南

你翻译了你的应用。你发布了 `/en`、`/fr`、`/es`。但法语用户仍然登录到英文页面。

翻译很容易。困难的一半是告诉搜索引擎这些页面是**同一页面的其他语言版本**，而不是三个相互竞争的文档。这就是 `hreflang` 的作用，也是大多数多语言网站悄悄失去流量的地方。

---

## hreflang 实际上是什么

一个页面上的注释，说：_这个 URL 在那里有等效的版本，适用于那些语言。_

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

它为你争取两样东西：为合适的用户展示正确的版本，以及将你的多语言版本合并到一个集群中，而不是作为重复内容互相蚕食。

需要明确的是它不是什么。它**不是重定向**——它是一个提示，Google 可能会覆盖它。它**不是排名提升**——它改变的是_哪个_版本排名，而不是_是否_排名。而且 Bing 完全忽略它，而是依赖 `content-language` 和地理定位。

---

## 在哪里声明它

三种放置方式，都有效。选择一种并坚持——同一个集群在两个地方声明是集合漂移的原因。

**HTML `<head>`** 是通常的选择。一个需要注意的问题：水合后注入的标签是不可靠的。如果你的框架只在客户端添加它们，爬虫可能永远看不到它们。

**XML sitemap** 在大规模使用中更有优势。十个语言版本跨越 5,000 页面意味着需要向浏览器发送 50,000 个 `<link>` 元素，而这些元素对页面毫无用处；在 sitemap 中它不会占用页面的任何字节。

**HTTP `Link` header** 是唯一适用于 PDF 等非 HTML 文件的选项。

---

## 规则

### 自我引用和互惠性

设置在 `/fr/about` 上必须包含指向 `/fr/about` 的 `hreflang="fr"`。如果 `/about` 指向 `/fr/about`，那么 `/fr/about` 也必须指回去。Google 将单向引用称为"no return tag"并将其丢弃。

实际上这意味着**集群中的每一页都必须发送相同的链接集**。从一个共享的语言列表生成它们不仅仅是一种便利，一旦你拥有超过两个语言版本，这是保持正确性的唯一方式。

### 始终使用绝对 URL

```html
<!-- 被默认忽略 -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- 正确 -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

这个原因值得理解而不仅仅是记忆。`hreflang` 是一个跨文档引用：搜索引擎构建一个由 URL 键值的集群，在集群中的每一页都共享这个集群。相对路径只有相对于它所在的文档才有意义，因此它无法表达这一点。它也无法跨越主机——而替代版本通常会这样做，当一个语言版本存在于 `example.fr` 或 `fr.example.com` 时。在 sitemap 或 HTTP 头中，根本没有可以用来解析的基础文档。

这在代码中有直接的后果。`getLocalizedUrl("/about", "fr")` 返回 `/fr/about` — 相对路径输入，相对路径输出。对于 `hreflang`，你必须向其提供绝对 URL：

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ 被丢弃
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

唯一的例外是一个框架在渲染之前为你解析相对值：Next.js 根据 `metadataBase` 展开相对的 `alternates`。没问题 — 但规则适用于**发出的 HTML**，所以用 `curl` 检查，而不是 DevTools 检查器。

### 语言代码

ISO 639-1 用于语言，ISO 3166-1 Alpha 2 用于可选的地区：`fr`、`fr-CA`、`pt-BR`。

两个陷阱几乎会困住每个人。单独的地区代码是无效的——`hreflang="ca"` 表示加泰罗尼亚语，而不是加拿大；你需要 `en-CA` 或 `fr-CA`。而 `en-UK` 不存在：英国的国家代码是 `GB`，所以是 `en-GB`。

只有在你确实为该地区提供不同内容时才添加地区——不同的价格、不同的法律声明。`fr` 和 `fr-FR` 在相同内容上是冗余的。

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

最容易被遗忘且最容易被误解的一个概念是 `x-default`——少于 30% 的应用正确实现它。

这是用户语言与你的集合中任何内容都不匹配时的回退方案。荷兰语使用者访问仅提供英语、法语和西班牙语的网站时无法匹配任何条目；没有 `x-default`，Google 会为你做出选择。

人们经常误解的是它的含义。`x-default` **不是"英文版本"** 也 **不是"默认 locale"**，尽管它通常指向那里。它的意思是 _这个集合不覆盖的用户的页面_。这就是为什么让它指向语言选择器或地理重定向登陆页面是合理的，通常也更好——而不是指向 `/en`。如果你没有这样的页面，你的主要语言是明智的选择。

两件事需要区分清楚：`x-default` 是该集合中的一个额外条目，而不是自引用条目的替代品，而且像其他每个条目一样，它必须在集群中的每个页面上完全相同地出现。

---

## canonical 陷阱

每个本地化页面必须**是它自己的 canonical**：

```html
<!-- 在 https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

将每个语言版本的 canonical 都指向英文版本反而会这样做：

```html
<!-- 在 https://example.com/fr/about — 会破坏该页面 -->
<link rel="canonical" href="https://example.com/about" />
```

表示法语页面是不应被索引的重复内容，而 `hreflang` 则表示这是应该提供给法语用户的页面。这些信号相互矛盾，canonical 优先级更高，结果是你的法语页面会被从索引中移除。

**Canonical 在每个语言版本中是自引用的。`hreflang` 描述的是整个集群。**

---

## 选择 URL 结构

`hreflang` 对 URL 进行注释，所以结构应该优先考虑。

| 结构       | 示例              | 权衡                                              |
| ---------- | ----------------- | ------------------------------------------------- |
| **子目录** | `example.com/fr/` | 一个域名，权限共享 — 地理信号较弱                 |
| **子域名** | `fr.example.com`  | 易于添加或删除语言版本 — 可能看起来像一个独立网站 |
| **ccTLDs** | `example.fr`      | 最强的国家信号 — 每个域名建立权限                 |

对大多数项目来说，子目录是正确的默认选择。只有当你真正以独立的国家业务运营时，才应该考虑使用 ccTLDs。

应该避免的一个结构是：基于 `Accept-Language` 或 IP 在**同一 URL** 上提供不同的语言。爬虫会看到一个版本并索引一个版本；其他所有内容都是不可见的。

> Intlayer 通过 `routing.mode` 和 `routing.domains` 支持这三种方式。参见[自定义域名](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/custom_domains.md)和[配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

---

## 实现

手动编写这些标签无法在添加第二种语言时保持一致。应该从你的语言列表中派生它们。

<Steps>

<Step number={1} title="在每个页面上发出集群">

相同的集合到处都有，每个语言环境的规范链接，绝对URL，包括 `x-default`。

<Tabs>

<Tab label="Next.js" value="nextjs">

Metadata API 暴露 `alternates.languages`，而 `getMultilingualUrls` 从你配置的语言环境构建整个记录：

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) 返回:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

完整设置: [Next.js 16 i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)。

</Tab>

<Tab label="TanStack Start" value="tanstack">

路由的 `head` 函数构建链接。`localeMap` 遍历你配置的语言环境，所以向配置中添加一个语言环境会在所有地方同时添加它：

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` 在服务器上运行，因此标签会被插入初始 HTML 中。完整配置：[TanStack Start i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)。

</Tab>

</Tabs>

</Step>

<Step number={2} title="或将其全部移至站点地图">

大规模应用时，将注解完全从页面中移出。`generateSitemap` 根据配置读取 locale 和路由模式，为每个条目生成 `xhtml:link` 备用链接：

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

两个值得了解的选项：

- `xhtmlLinks` (默认值 `true`) — 只有在 locale URL 实际不同时，才会发出交替链接。在 `no-prefix` 模式下，每个 locale 共享一个 URL，因此除非 `routing.domains` 为 locale 分配自己的主机名，否则会被跳过。
- `entryPerLocale`（默认值 `false`）—— 默认情况下，一个 `<url>` 条目包含所有的备用语言版本。两种形式都是有效的，但只有列在 `<loc>` 中的 URL 才会在 Search Console 中被计算为**已提交**；仅作为备用语言的区域设置会保持可发现性但不会被归属到任何 sitemap。启用此选项会为每个本地化 URL 提供其自己的条目，并重复完整的备用语言集。这会按区域设置计数增加条目，因此需要注意 50,000 个 URL / 50 MB 的限制，超过后应分割为 sitemap 索引。

</Step>

<Step number={3} title="验证爬虫接收到的内容">

`hreflang` 会无声地失败，因此应该检查它而不是假设它有效。

读取源代码，而不是检查器 — `curl https://example.com/fr/about | grep hreflang` 显示爬虫获取的内容；DevTools 显示 JavaScript 运行后的 DOM。然后跟随每个备用链接，确认它使用相同的集合指向回来，并且它们都不重定向。Search Console 的国际定位报告捕获整个站点中的其余部分。

对于多语言特定的爬取，[Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) 检查本地化页面中的缺失标签、损坏的备用链接和规范冲突。

</Step>

</Steps>

---

## 检查清单

- [ ] 每个地区都有一个独特的、可爬取的 URL
- [ ] 每个页面自引用，并且每个引用都是相互的
- [ ] 相同的集合在集群中的每个页面上发布
- [ ] 所有 `href` 值在生成的 HTML 中都是绝对路径
- [ ] 代码遵循 ISO 639-1 + ISO 3166-1 Alpha 2 标准（`en-GB`，而非 `en-UK`）
- [ ] `x-default` 存在，并指向未匹配用户应访问的位置
- [ ] 规范标签在每个 locale 中自引用
- [ ] 标签是服务端渲染的，不是 hydration 后注入的
- [ ] 在恰好一个位置声明
- [ ] 没有跨 locale 的重定向

---

## 总结

`hreflang` 简单但容不得半点差错。一个缺失的返回标签、一个相对 URL、一个跨 locale 的规范标签，整个集群就会被丢弃且不会报错。这些问题通常都源于手工编写标签。

从单个 locale 列表派生集合，进行服务器端渲染，保持 canonical 自引用，并给予 `x-default` 应有的重视。做好这一次，正确性就不再是你需要维护的东西。

### 深入了解

- [SEO 和国际化](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/internationalization_and_SEO.md) — 更广泛的多语言 SEO 图景
- [Next.js 中的 SEO 和 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/zh/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)
- [TanStack Start i18n 指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_tanstack.md)
- [每个区域的自定义域名](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/custom_domains.md)
- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
