---
createdAt: 2025-09-04
updatedAt: 2025-09-04
title: 在 React Router v7 中使用 Intlayer 入门
description: 学习如何使用 Intlayer 为您的 React Router v7 应用添加国际化 (i18n)。按照本综合指南，使您的应用支持多语言和基于区域设置的路由。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - 区域路由
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/AydinTheFirst/react-router-intlayer
author: AydinTheFirst
---

# 使用 Intlayer 和 React Router v7 开始国际化 (i18n)

本指南演示了如何在 React Router v7 项目中集成 **Intlayer**，实现无缝国际化，支持基于区域设置的路由、TypeScript 支持以及现代开发实践。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **通过自动生成的类型确保 TypeScript 支持，提升自动补全和错误检测能力**。
- **享受高级功能**，如动态区域设置检测和切换。
- **通过 React Router v7 的基于配置的路由系统启用区域设置感知路由**。

---

## 在 React Router v7 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用你喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  提供国际化工具的核心包，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译以及[命令行工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

- **react-intlayer**
  将 Intlayer 集成到 React 应用中的包。它提供了用于 React 国际化的上下文提供者和钩子。

- **vite-intlayer**
  包含用于将 Intlayer 集成到[Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production)的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：项目配置

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true, // 始终在 URL 中添加默认语言前缀
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
  middleware: {
    prefixDefault: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// 配置对象，定义国际化相关设置
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 默认语言为英语
    locales: [Locales.ENGLISH, Locales.TURKISH], // 支持的语言列表：英语和土耳其语
  },
  middleware: {
    prefixDefault: true, // 默认语言的 URL 也加前缀
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第3步：配置 React Router v7 路由

设置支持多语言的路由配置：

```typescript fileName="app/routes.ts" codeFormat="typescript"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // 根页面 - 重定向到语言版本
    route("/:lang", "routes/[lang]/page.tsx"), // 本地化首页
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // 本地化关于页面
  ]),
] satisfies RouteConfig;
```

### 第4步：在 Vite 配置中集成 Intlayer

将 intlayer 插件添加到你的配置中：

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayerMiddlewarePlugin, intlayerPlugin } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    intlayerPlugin(),
    intlayerMiddlewarePlugin(),
  ],
});
```

> `intlayerPlugin()` 是用于将 Intlayer 集成到 Vite 中的插件。它确保内容声明文件的构建，并在开发模式下监视这些文件。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

### 第五步：创建布局组件

设置你的根布局和特定语言环境的布局：

#### 根布局

```tsx fileName="app/routes/layout.tsx" codeFormat="typescript"
tsx;
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

export default function RootLayout() {
  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 第6步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="app/routes/[lang]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      tr: "React Router v7 + Intlayer'a Hoş Geldiniz",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      tr: "使用 React Router v7 和 Intlayer 轻松构建多语言应用程序。",
    }),
    aboutLink: t({
      en: "了解我们",
      tr: "关于我们",
    }),
    homeLink: t({
      en: "首页",
      tr: "主页",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们被包含在 `contentDir` 目录中（默认是 `./app`）。并且文件扩展名需匹配内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第7步：创建支持多语言的组件

创建一个 `LocalizedLink` 组件以实现基于语言环境的导航：

```tsx fileName="app/components/localized-link.tsx" codeFormat="typescript"
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import React from "react";
import { Link, useLocation } from "react-router";

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (path: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("mailto:");

  if (typeof to === "string") {
    if (to.startsWith("/") && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === "object") {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith("/") && !isExternal(pathname)) {
      return (
        <Link
          to={{ ...to, pathname: getLocalizedUrl(pathname, locale) }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
```

### 第8步：在您的页面中使用 Intlayer

在您的整个应用程序中访问内容字典：

#### 根重定向页面

```tsx fileName="app/routes/page.tsx" codeFormat="typescript"
// app/routes/page.tsx
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### 本地化主页

```tsx fileName="app/routes/[lang]/page.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <nav style={{ marginTop: "2rem" }}>
        <LocalizedLink
          to="/about"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          {content.aboutLink}
        </LocalizedLink>
      </nav>
    </div>
  );
}
```

> 想了解更多关于 `useIntlayer` 钩子的内容，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)。

### 第9步：创建语言切换组件

创建一个组件，允许用户切换语言：

```tsx fileName="app/components/locale-switcher.tsx" codeFormat="typescript"
import { getLocalizedUrl, getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation, useNavigate } from "react-router";

export default function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = (newLocale: string) => {
    const localizedUrl = getLocalizedUrl(
      location.pathname + location.search,
      newLocale
    );
    setLocale(newLocale);
    navigate(localizedUrl);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <label htmlFor="locale-select">选择语言: </label>
      <select
        id="locale-select"
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        style={{ padding: "0.25rem", marginLeft: "0.5rem" }}
      >
        {availableLocales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale}>
            {getLocaleName(availableLocale)}
          </option>
        ))}
      </select>
    </div>
  );
}
```

> 想了解更多关于 `useLocale` 钩子的内容，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

### 第10步：添加 HTML 属性管理（可选）

创建一个钩子来管理 HTML 的 lang 和 dir 属性：

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// app/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

然后在你的根组件中使用它：

```tsx fileName="app/root.tsx" codeFormat="typescript"
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // 导入钩子

export default function RootLayout() {
  useI18nHTMLAttributes(); // 调用钩子

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 第11步：构建并运行你的应用程序

构建内容字典并运行您的应用程序：

```bash packageManager="npm"
# 构建 Intlayer 字典
npm run intlayer:build

# 启动开发服务器
npm run dev
```

```bash packageManager="pnpm"
# 构建 Intlayer 字典
pnpm intlayer:build

# 启动开发服务器
pnpm dev
```

```bash packageManager="yarn"
# 构建 Intlayer 字典
yarn intlayer:build

# 启动开发服务器
yarn dev
```

### 第12步：配置 TypeScript（可选）

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更健壮。

确保您的 TypeScript 配置包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 您现有的 TypeScript 配置
  },
  include: [
    // ... 你现有的包含项
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到你的 Git 仓库。

为此，你可以在 `.gitignore` 文件中添加以下内容：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

## 生产环境部署

部署你的应用时：

1. **构建你的应用：**

   ```bash
   npm run build
   ```

2. **构建 Intlayer 字典：**

   ```bash
   npm run intlayer:build
   ```

3. **如果在生产环境使用中间件，需将 `vite-intlayer` 移动到依赖中：**
   ```bash
   npm install vite-intlayer --save
   ```

您的应用程序现在将支持：

- **URL 结构**：`/en`，`/en/about`，`/tr`，`/tr/about`
- 基于浏览器偏好的**自动语言环境检测**
- 使用 React Router v7 的**语言环境感知路由**
- 具有自动生成类型的**TypeScript 支持**
- 具有正确语言环境处理的**服务器端渲染**

## VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**
- 缺失翻译的**实时错误检测**
- 翻译内容的**内联预览**
- **快速操作**，轻松创建和更新翻译。

有关如何使用该扩展的更多详细信息，请参阅[Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入了解

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

---

## 文档参考

- [Intlayer 文档](https://intlayer.org)
- [React Router v7 文档](https://reactrouter.com/)
- [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)
- [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

本综合指南提供了将 Intlayer 与 React Router v7 集成所需的一切，支持完全国际化的应用程序，具备基于语言环境的路由和 TypeScript 支持。

## 文档历史

| 版本  | 日期      | 变更内容                  |
| ----- | --------- | ------------------------- |
| 5.8.2 | 2025-09-4 | 新增 React Router v7 支持 |
