---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - 将现有的 Next.js 应用程序转换为多语言应用程序 (i18n 指南 2026)
description: 了解如何使用 Intlayer 编译器将现有的 Next.js 应用程序转换为多语言。按照文档进行国际化 (i18n) 并使用 AI 进行翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - 编译器
  - AI
slugs:
  - doc
  - 设定
  - nextjs
  - 编译器
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: 初始版本
---

# 如何将现有的 Next.js 应用程序多语言化 (i18n) (i18n 指南 2026)

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="Next.js 的最佳 i18n 解决方案？了解 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 对您的应用程序进行国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

在 GitHub 上查看[应用程序模板](https://github.com/aymericzip/intlayer-next-no-lolale-path-template)。

## 目录

<TOC/>

## 为什么对现有应用程序进行国际化会很困难？

如果您曾经尝试向仅为单语言构建的应用程序中添加多种语言，您就会明白其中的痛苦。这不仅仅是“困难”，而是非常繁琐。您必须检查每个文件，找出每一个文本字符串，并将它们移动到单独的字典文件中。

接下来才是冒险的部分：用代码钩子替换所有文本，同时保证不破坏布局或逻辑。这类工作往往会让新功能的开发停滞数周，感觉像是一场无止境的重构。

## 什么是 Intlayer 编译器？

**Intlayer 编译器**旨在规避这种繁琐的手动工作。您无需手动提取字符串，编译器会为您完成。它会扫描您的代码，找到文本，并使用 AI 在后台生成字典。
然后，在构建步骤期间，它会修改您的源代码以注入必要的 i18n 钩子。基本上，您可以像写单语言应用一样继续编写您的应用，而编译器会自动原生处理多语言转换。

> 编译器文档：[https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)

### 限制

由于编译器在**编译时**执行代码分析和转换（注入钩子和生成字典），因此它可能会**减慢应用程序的构建时间**。

为了限制在活跃开发过程（dev 模式）中的影响，您可以将编译器设置为 [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 模式，或在不需要时将其禁用。

---

## 在 Next.js 应用程序中设置 Intlayer 的分步指南

### 步骤 1：安装依赖项

使用您偏好的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)的国际化工具。

- **next-intlayer**

  将 Intlayer 与 Next.js 集成的包。它为 Next.js 国际化提供上下文提供程序和钩子。此外，它还包括用于将 Intlayer 与 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 集成的 Next.js 插件，以及用于检测用户首选语言环境、管理 cookie 和处理 URL 重定向的中间件。

### 步骤 2：配置您的项目

创建一个配置文件来定义应用程序的语言：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.CHINESE],
    defaultLocale: Locales.CHINESE,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // 可以设置为 'build-only' 来限制开发模式下的影响
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // 无编译前缀，默认为 "comp-"
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "这是一个简单的地图应用程序示例",
  },
};

export default config;
```

> **注意**：请确保您在环境变量中设置了 `OPEN_AI_API_KEY`。

> 通过此配置文件，您可以设置本地化的 URL、代理重定向、cookie 映射、内容声明的位置和扩展名、在控制台中禁用 Intlayer 日志等等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 步骤 3：将 Intlayer 集成到 Next.js 配置中

配置您的 Next.js 设置以使用 Intlayer：

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* 这里可选填写额外的 Next.js 配置 */
};

export default withIntlayer(nextConfig);
```

> Next.js 插件 `withIntlayer()` 用于将 Intlayer 与 Next.js 集成。它确保字典文件的构建，并在开发模式下监视它们。它在 [Webpack](https://webpack.js.org/) 或 [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) 环境中定义 Intlayer 环境变量。此外，它还提供别名以优化性能，并保留与服务器组件的兼容性。

### 配置 Babel

Intlayer 编译器需要 Babel 来提取和优化您的内容。更新您的 `babel.config.js`（或 `babel.config.json`）以包含 Intlayer 插件：

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### 步骤 4：页面中的语言环境检测

清空 `RootLayout` 的内容，并将其替换为以下示例：

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### 步骤 5：声明您的内容（自动）

启用编译器后，您**不再需要**手动声明内容字典（例如 `.content.ts` 文件）。

相反，您只需在代码中以硬编码字符串的形式写入您的内容。Intlayer 会扫描源代码，使用配置的 AI 提供商生成翻译，并在构建编译期间自动将这些字符串替换为本地化内容。这一切都是完全自动化的。

只需在组件中使用默认语言环境的硬编码字符串，让 Intlayer 编译器处理剩下的工作。

`page.tsx` 可能看起来像这样：

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>开始编辑吧！</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      zh: {
        getStartedByEditingThis: "开始编辑吧！",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** 用于在客户端向子组件提供语言环境。
- 而 **`IntlayerServerProvider`** 用于在服务器端向子组件提供语言环境。

### (可选) 第 7 步：填写缺失的翻译

Intlayer 提供了一个 CLI 工具来帮助您填写缺失的翻译。您可以使用 `intlayer` 命令来测试并从您的代码中填写缺失的翻译。

```bash
npx intlayer test         # 测试是否有缺失的翻译
```

```bash
npx intlayer fill         # 填写缺失的翻译
```

> 有关更多详细信息，请参阅 [CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/ci.md)

### (可选) 步骤 8：本地化路由代理中间件

如果您希望自动将用户重定向到其偏好的语言环境，请建立代理解析中间件：

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` 用于检测用户的首选语言环境，并根据 [配置文件设置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md) 将其重定向到适当的 URL。此外，它还支持将用户的首选语言环境保存在 cookie 中。

### (可选) 第 9 步：更改内容语言环境

在 Next.js 中更改内容语言环境的最推荐方法是使用 `Link` 组件将用户重定向到包含相应语言环境的路由。这将利用 Next.js 的预取功能，并避免页面强制刷新。

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* 语言环境 - 例如：ZH */}
              {localeItem}
            </span>
            <span>
              {/* 语言环境自身的名称 - 例如：中文 */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 当前语言环境下的名称 - 例如：Francés（当当前语言环境为 Locales.SPANISH 时） */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 英语下的名称 - 例如：Chinese */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> 另一种方法是使用 `useLocale` 钩子提供的 `setLocale` 函数。该函数不支持页面预取。有关更多详细信息，请查看 [`useLocale` 钩子文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/next-intlayer/useLocale.md)。

### (可选) 第 10 步：优化包体积

使用 `next-intlayer` 时，字典默认会包含在每个页面的包中。为了优化包体积，Intlayer 提供了一个可选的 SWC 插件，它利用宏智能地优化 `useIntlayer` 调用。这确保了字典仅包含在实际使用它们的页面的包中。

要启用此优化，请安装 `@intlayer/swc` 包。安装后，`next-intlayer` 会自动检测并使用该插件：

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> 注意：此优化仅适用于 Next.js 13 及以上版本。

> 注意：由于 Next.js SWC 插件仍处于试验阶段，该包默认未安装。未来可能会有所改变。

> 注意：如果您设置了 `importMode: 'dynamic'` 或 `importMode: 'fetch'`（在字典配置中），它将依赖于 Suspense，因此您需要将 `useIntlayer` 调用包裹在 `Suspense` 边界内。这意味着您无法直接在页面/布局组件的顶层使用 `useIntlayer`。

### TypeScript 配置

Intlayer 使用模块扩展 (module augmentation) 来利用 TypeScript 的优势并使您的代码库更加健壮。

![自动补全](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![翻译错误](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您的现有 TypeScript 配置
  "include": [
    // ... 您的现有 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 存储库中。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升使用 Intlayer 的开发体验，您可以安装**官方 Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作 (Quick actions)**。

阅读 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension) 以了解更多关于扩展使用的详细说明。

### 进一步深入

您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 来实现内容的外部管理。
