---
createdAt: 2026-01-10
updatedAt: 2026-09-06
priority: 8
title: "如何在事后为现有 Next.js 应用程序实现多语言（i18n 指南 2026）"
description: "2026 年现有 Next.js 应用的多语言 (i18n) 改造指南。无需繁琐重构，借助 Intlayer 体验自动内容提取、AI 翻译与高性能路由。"
keywords:
  - Next.js i18n
  - 国际化
  - 翻译现有 Next.js 应用
  - Next.js 16
  - Intlayer
  - 多语言
  - React i18n
  - 编译器
  - AI 翻译
  - SEO
slugs:
  - blog
  - transform-existing-nextjs-app-into-multilingual-app
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 9.4.0
    date: 2026-08-22
    changes: "Update to Next.js >= 9.4.0 architecture"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Initial release"
author: aymericzip
---

# 如何在事后为现有 Next.js 应用程序实现多语言（i18n 指南 2026）

从项目第一天起就为 Next.js 添加国际化 (i18n) 相对轻松。但如果您的单语言 Next.js 应用程序已经上线成熟，事后需要将其改造成多语言应用，该如何处理？

使用传统库（如 `next-intl` 或 `next-i18next`）往往是一场噩梦：

- 在数百个 JSX/TSX 文件中手动搜索硬编码的文本字符串。
- 手动创建嵌套的 JSON 字典并编造任意翻译键名（如 `pages.dashboard.header.title` 等）。
- 用繁琐的 hook（如 `t('...')`）替换原有文字。
- 将整个 `app/` 目录重构为 `app/[locale]/...`，导致现有路由、书签和搜索引擎收录失效。

在 2026 年，您不再需要大动干戈重写代码。借助 **Intlayer**，您可以通过自动化提取、AI 翻译与非侵入式路由，在数分钟内为现有 Next.js 应用无缝接入国际化。

> 需要查看针对 Next.js 16 App Router 的完整详细分步技术指南？请查阅我们的专属文档：[使用 Intlayer 翻译 Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)。

## 目录

<TOC/>

## 改造难题：为什么现有应用实现国际化如此痛苦？

对现有 Next.js 应用程序进行国际化改造时，开发者常面临三大障碍：

1. **侵入性过高**：手动将字符串提取到 JSON 字典几乎需要改动所有组件文件，产生巨大的代码变更与回归风险。
2. **强制路由重构**：传统 i18n 库通常强制将根布局与页面移入动态 `[locale]` 路径（如 `/app/[locale]/page.tsx`）。
3. **翻译繁琐重复**：提取字符串后，维护几十种语言的字典需要反复复制粘贴或购买昂贵的本地化服务。

Intlayer 从架构层面上通过**编译器智能提取**、**声明式字典**与**灵活路由**彻底解决了这些问题。

## 自动化内容提取（告别手动搜寻字符串）

### 选项 A：CLI 提取工具 (`npx intlayer extract`)

直接在您的项目代码中运行 Intlayer 提取命令：

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm dlx intlayer extract
```

```bash packageManager="yarn"
yarn dlx intlayer extract
```

```bash packageManager="bun"
bunx intlayer extract
```

该命令会分析 React 组件，提取可见文本，并在组件同级目录下自动生成声明式内容文件（`.content.ts`），保持代码整洁与类型安全。

### 选项 B：Intlayer 编译器（构建时自动提取）

启用 Intlayer 编译器后，您只需像往常一样在组件中编写默认语言的纯文本。在构建时，编译器会自动提取文本并注入本地化内容：

```tsx fileName="src/app/page.tsx"
// Write normal React code. The compiler extracts the text automatically
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to our platform</h1>
      <p>Start exploring our modern features today.</p>
    </section>
  );
}
```

在底层，Intlayer 会自动构建字典并将组件与本地化内容关联，彻底免去手动重构的繁琐步骤。

在这种情况下，它将生成包含以下内容的 `src/app/page.content.ts` 文件：

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({ en: "Welcome to our platform" }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
    }),
  },
};

export default content;
```

## 借助您喜爱的 LLM 进行 AI 自动化翻译

提取完内容后，无需人工逐句翻译。Intlayer 内置 AI 翻译命令行，支持使用您自己的 OpenAI、Anthropic、DeepSeek 或 Mistral API 密钥：

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm dlx intlayer fill
```

```bash packageManager="yarn"
yarn dlx intlayer fill
```

```bash packageManager="bun"
bunx intlayer fill
```

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    provider: "openai",
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    applicationContext: "面向团队协作与生产力的 SaaS 控制台",
  },
};

export default config;
```

运行 `npx intlayer fill` 后，会自动为您配置的所有语言在 `.content.ts` 声明文件中填充翻译：

```typescript fileName="src/app/page.content.ts"
import { Dictionary } from "intlayer";

const content = {
  key: "home-page",
  content: {
    welcomeToOurPlatform: t({
      en: "Welcome to our platform",
      fr: "Bienvenue sur notre plateforme",
      es: "Bienvenido a nuestra plataforma",
      zh: "欢迎来到我们的平台",
    }),
    startExploringOurModernFeaturesToday: t({
      en: "Start exploring our modern features today.",
      fr: "Découvrez nos fonctionnalités modernes dès aujourd'hui.",
      es: "Comience a explorar nuestras funciones modernas hoy.",
      zh: "立即开始体验我们的现代化功能。",
    }),
  },
};

export default content;
```

由于 Intlayer 向 LLM 提供了高层级的 `applicationContext`，因此生成的翻译能够比传统自动化工具更好地保留技术细节、品牌语调和语法语境。

在部署到生产环境之前，验证是否存在遗漏的文本：

```bash
npx intlayer test
```

## 添加多语言路由且不破坏现有 URL

Intlayer 提供多种路由开箱即用策略：

- **查询参数 / Cookie 模式 (`search-params`)**：保持原有的 `/app/page.tsx` 结构，无需迁移到 `[locale]` 目录。
- **前缀模式 (`prefix` / `prefix-all-locales`)**：当您准备好采用对 SEO 友好的路径路由（如 `/zh/dashboard`）时，Intlayer 通过代理轻松支持。

在数秒内完成 Next.js 集成配置：

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* Your existing Next.js config */};

export default withIntlayer(nextConfig);
```

使用 `IntlayerProvider` 包裹您的根布局：

```tsx fileName="src/app/layout.tsx"
import type { ReactNode } from "react";
import { IntlayerProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { getHTMLTextDir } from "intlayer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
}
```

## 多语言 SEO

自动生成多语言元数据和 `hreflang` 标签，提升全球搜索可见度：

```tsx fileName="src/app/page.tsx"
import type { Metadata } from "next";
import { getLocale } from "next-intlayer/server";
import { getIntlayer } from "intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const content = getIntlayer("home-page-metadata", locale);

  return {
    title: content.title,
    description: content.description,
  };
};
```

## 深入探索：准备好分步实践了吗？

本指南为您提供了在 2026 年快速改造现有 Next.js 应用的高级概览。若需查阅中间件配置、静态生成 (`generateStaticParams`) 及服务器组件的完整分步指南，请访问：

👉 **[使用 Intlayer 翻译 Next.js 16 完整指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_nextjs_16.md)**

## 常见问题解答 (FAQ)

<FAQ>

<Question title="我是否可以在不将文件移动到 app/[locale] 的情况下实现多语言？">

可以。Intlayer 支持 `routing.mode: "search-params"` 以及基于 Cookie / Header 的语言检测，完整保留现有目录与 URL。

</Question>
<Question title="我必须手动替换代码中的所有硬编码字符串吗？">

不需要。使用 `npx intlayer extract` 或 Intlayer 编译器即可自动提取和声明内容。

</Question>
<Question title="相比 next-intl，Intlayer 是如何减少打包体积的？">

Intlayer 采用按组件声明与构建时宏优化，客户端只下载当前页面组件所需的内容片段。

</Question>
<Question title="可以使用 AI 自动将现有组件翻译为多种语言吗？">

可以。运行 `npx intlayer fill` 即可自动连接 AI 服务生成上下文相关的缺失翻译。

</Question>
</FAQ>
