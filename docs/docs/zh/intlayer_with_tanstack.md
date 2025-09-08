---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: 在 Tanstack Start 中使用 Intlayer 入门
description: 学习如何使用 Intlayer 为您的 Tanstack Start 应用添加国际化 (i18n)。按照本综合指南，使您的应用支持多语言和基于区域设置的路由。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - 区域路由
slugs:
  - doc
  - environment
  - vite-and-react
  - tanstack-start
applicationTemplate: https://github.com/AydinTheFirst/tanstack-start-intlayer
author: AydinTheFirst
---

# 使用 Intlayer 和 Tanstack Start 开始国际化 (i18n)

本指南演示了如何在 Tanstack Start 项目中集成 **Intlayer**，实现无缝国际化，支持基于区域设置的路由、TypeScript 支持以及现代开发实践。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **通过自动生成的类型确保 TypeScript 支持**，提升自动补全和错误检测能力。
- **享受高级功能**，如动态区域设置检测和切换。
- **通过 Tanstack Start 的基于文件的路由系统启用区域设置感知路由**。

---

## 在 Tanstack Start 应用中设置 Intlayer 的分步指南

### 第一步：创建项目

首先，按照 TanStack Start 网站上的[创建新项目](https://tanstack.com/start/latest/docs/framework/react/quick-start)指南创建一个新的 TanStack Start 项目。

### 第二步：安装 Intlayer 包

使用您喜欢的包管理器安装所需的包：

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

  核心包，提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译和[CLI命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)的国际化工具。

- **react-intlayer**

  将 Intlayer 集成到 React 应用中的包。它为 React 国际化提供上下文提供者和钩子。

- **vite-intlayer**

  包含用于将 Intlayer 集成到[Vite 打包器](https://vite.dev/guide/why.html#why-bundle-for-production)的 Vite 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

### 第三步：项目配置

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 默认语言
    locales: [
      Locales.ENGLISH, // 英语
      Locales.FRENCH, // 法语
      Locales.SPANISH, // 西班牙语
      // 您的其他语言
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 默认语言
    locales: [
      Locales.ENGLISH, // 英语
      Locales.FRENCH, // 法语
      Locales.SPANISH, // 西班牙语
      // 你的其他语言
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 你的其他语言
    ],
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第4步：在您的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中：

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

> `intlayerPlugin()` 是用于将 Intlayer 集成到 Vite 的插件。它确保内容声明文件的构建，并在开发模式下监控这些文件。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

### 第五步：创建布局组件

设置你的根布局和特定语言环境的布局：

#### 根布局

```tsx fileName="src/routes/{-$locale}/route.tsx" codeFormat="typescript"
// src/routes/{-$locale}/route.tsx
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 第6步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/contents/page.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "首页",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      description: t({
        en: "这是一个使用 Intlayer 与 TanStack Router 的示例",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "欢迎使用 Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们被包含在 `contentDir` 目录中（默认是 `./app`）。并且文件扩展名需匹配内容声明的文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第7步：创建支持多语言环境的组件和钩子

创建一个用于多语言环境导航的 `LocalizedLink` 组件：

```tsx fileName="src/components/localized-link.tsx" codeFormat="typescript"
// src/components/localized-link.tsx
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

创建一个用于编程式导航的 `useLocalizedNavigate` 钩子：

```tsx fileName="src/hooks/useLocalizedNavigate.tsx" codeFormat="typescript"
// src/hooks/useLocalizedNavigate.tsx
// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from "@tanstack/react-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, "to">;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions["to"] });
  };

  return localizedNavigate;
};
```

### 第8步：在您的页面中使用 Intlayer

在整个应用程序中访问您的内容字典：

#### 根重定向页面

```tsx fileName="src/routes/page.tsx" codeFormat="typescript"
// src/routes/page.tsx
import { useLocale } from "react-intlayer";
import { Navigate } from "react-router";

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
```

#### 本地化首页

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-4 items-center text-center">
        {content.title}
        <LocaleSwitcher />
        <div className="flex gap-4">
          <a href="/">索引</a>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> 想了解更多关于 `useIntlayer` 钩子的内容，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)。

### 第9步：创建语言切换组件

创建一个组件，允许用户切换语言：

```tsx fileName="src/components/locale-switcher.tsx" codeFormat="typescript"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from "intlayer";
import { useIntlayer, useLocale } from "react-intlayer";

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer("locale-switcher");

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {/* 示例：Français（法语） */}
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

> 想了解更多关于 `useLocale` 钩子的内容，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

### 第10步：添加HTML属性管理（可选）

创建一个钩子来管理HTML的lang和dir属性：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale); // 设置HTML的文本方向属性
  }, [locale]);
};
```

然后在你的根组件中使用它：

```tsx fileName="src/routes/{-$locale}/index.tsx" codeFormat="typescript"
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { configuration } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // 导入该hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // 添加此行

  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 第11步：构建并运行您的应用程序

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

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强大。

确保您的 TypeScript 配置包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ... 您现有的 TypeScript 配置
  },
  include: [
    // ... 您现有的包含项
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

### 第 13 步：创建重定向（可选）

```typescript fileName="src/routes/{-$locale}/rotue.tsx" codeFormat="typescript"
function LayoutComponent() {
  useI18nHTMLAttributes();

  const { locale } = Route.useParams();
  const { locale: selectedLocale } = useLocale();
  const { defaultLocale } = configuration.internationalization;
  const { prefixDefault } = configuration.middleware;

  // 如果 prefixDefault 为 true 且 URL 中没有 locale，则重定向到默认语言
  if (selectedLocale === defaultLocale && !locale && prefixDefault) {
    return <Navigate replace to={defaultLocale} />;
  }

  // 如果 URL 中的 locale 与选定的 locale 不匹配，则重定向到选定的 locale
  if (selectedLocale !== defaultLocale && !locale) {
    return <Navigate replace to={selectedLocale} />;
  }

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

## 生产部署

部署您的应用程序时：

1. **构建您的应用程序：**

   ```bash
   npm run build
   ```

2. **构建 Intlayer 词典：**

   ```bash
   npm run intlayer:build
   ```

3. **如果在生产环境中使用中间件，请将 `vite-intlayer` 移动到依赖项：**
   ```bash
   npm install vite-intlayer --save
   ```

您的应用程序现在将支持：

- **URL 结构**：`/en`、`/en/about`、`/tr`、`/tr/about`
- **基于浏览器偏好的自动语言环境检测**
- **基于 Tanstack Start 的语言环境感知路由**
- **带有自动生成类型的 TypeScript 支持**
- **具有正确语言环境处理的服务器端渲染**

## VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入了解

要进一步提升，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

---

## 文档参考

- [Intlayer 文档](https://intlayer.org)
- [Tanstack Start 文档](https://reactrouter.com/)
- [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)
- [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

本综合指南提供了将 Intlayer 与 Tanstack Start 集成所需的一切，支持完全国际化的应用程序，具备区域感知路由和 TypeScript 支持。

## 文档历史

| 版本  | 日期       | 变更内容               |
| ----- | ---------- | ---------------------- |
| 5.8.1 | 2025-09-09 | 为 Tanstack Start 添加 |
