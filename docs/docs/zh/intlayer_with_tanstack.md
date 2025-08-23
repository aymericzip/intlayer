---
createdAt: 2025-08-11
updatedAt: 2025-08-11
title: 在 TanStack Start (React) 中使用 Intlayer 入门
description: 使用 Intlayer 为您的 TanStack Start 应用添加国际化--组件级字典、本地化 URL 以及 SEO 友好的元数据。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# 使用 Intlayer 和 TanStack Start (React) 开始国际化 (i18n)

## 什么是 Intlayer？

**Intlayer** 是一个针对 React 应用的开源国际化工具包。它为您提供：

- **组件本地字典**，具备 TypeScript 类型安全。
- **动态元数据和路由**（支持 SEO）。
- **运行时语言切换**（以及用于检测/持久化语言的辅助工具）。
- **Vite 插件**，用于构建时转换和开发体验优化。

本指南展示如何将 Intlayer 集成到一个 **TanStack Start** 项目中（该项目底层使用 Vite 和 TanStack Router 进行路由和 SSR）。

---

## 第一步：安装依赖

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**：核心库（配置、字典、CLI/转换）。
- **react-intlayer**：`<IntlayerProvider>` 组件及 React 钩子。
- **vite-intlayer**：Vite 插件，附带可选中间件用于语言检测/重定向（支持开发环境和 SSR/预览；生产 SSR 时需移至 `dependencies`）。

---

## 第 2 步：配置 Intlayer

在项目根目录创建 `intlayer.config.ts`：

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 支持的语言列表
    defaultLocale: Locales.ENGLISH, // 默认语言
  },
  // 你也可以调整：contentDir、contentFileExtensions、中间件选项等。
};

export default config;
```

如果你更喜欢 `cjs`/`mjs`，CommonJS/ESM 版本与原文档相同。

> 完整配置参考：请参阅 Intlayer 的配置文档。

---

## 第 3 步：添加 Vite 插件（及可选中间件）

**TanStack Start 使用 Vite**，因此将 Intlayer 的插件添加到你的 `vite.config.ts`：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayerPlugin(),
    // 可选但推荐用于语言环境检测、Cookies 和重定向：
    intLayerMiddlewarePlugin(),
  ],
});
```

> 如果你部署 SSR，请将 `vite-intlayer` 移动到 `dependencies`，以便中间件在生产环境中运行。

---

## 第 4 步：声明你的内容

将你的字典放置在 `./src` 下的任意位置（默认 `contentDir`）。示例：

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({ en: "Vite logo", fr: "Logo Vite", es: "Logo Vite" }),
    reactLogo: t({ en: "React logo", fr: "Logo React", es: "Logo React" }),
    title: t({
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t<ReactNode>({
      en: (
        <>
          编辑 <code>src/routes/index.tsx</code> 并保存以测试 HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "点击标志以了解更多",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS 变体与您的原始文档中相同。

> TSX 内容？如果您的设置需要，别忘了 `import React from "react"`。

---

## 第5步：用 Intlayer 包裹 TanStack Start

使用 TanStack Start，您的**根路由**是设置提供者的正确位置。

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // 在顶层使用字典的示例：
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

然后在页面中使用你的内容：

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> 字符串属性（`alt`，`title`，`aria-label` 等）需要 `.value`：
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## （可选）步骤 6：语言切换（客户端）

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## （可选）步骤7：本地化路由（SEO友好URL）

在 TanStack Start 中，你有**两种不错的模式**。请选择其一。

创建一个动态段文件夹 `src/routes/$locale/`，这样你的 URL 就是 `/:locale/...`。在 `$locale` 布局中，验证 `params.locale`，设置 `<IntlayerProvider locale=...>`，并渲染一个 `<Outlet />`。这种方法很直接，但你需要将其余路由挂载在 `$locale` 下面，如果你**不想**让默认语言带前缀，则还需要额外的无前缀路由树。

---

## （可选）步骤 8：切换语言时更新 URL

使用模式 A（basepath），切换语言意味着**导航到不同的 basepath**：

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // 保留历史记录
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## （可选）步骤 9：`<html lang>` 和 `dir`（TanStack Start Document）

TanStack Start 提供了一个可自定义的 **Document**（根 HTML 外壳）。设置 `lang` 和 `dir` 以提升无障碍访问和 SEO：

```tsx fileName="src/routes/__root.tsx" {4,15}
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { IntlayerProvider } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

function Document({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      {/* 如果您在服务器端计算 locale，请将其传递给 Document；否则客户端将在水合后进行修正 */}
      <Document locale={document?.documentElement?.lang || "en"}>
        <Outlet />
      </Document>
    </IntlayerProvider>
  ),
});
```

对于客户端修正，您也可以保留您的小钩子：

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## （可选）步骤10：本地化链接组件

TanStack Router 提供了一个 `<Link/>`，但如果你需要一个自动为内部 URL 添加前缀的普通 `<a>` 标签：

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> 如果您使用模式 A（basepath），TanStack 的 `<Link to="/about" />` 已经通过 `basepath` 解析为 `/fr/about`，因此自定义链接是可选的。

---

## TypeScript

包含 Intlayer 生成的类型：

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

忽略 Intlayer 生成的构建产物：

```gitignore
.intlayer
```

---

## VS Code 扩展

- **Intlayer VS Code 扩展** → 自动补全、错误提示、内联预览、快速操作。
  市场链接：`intlayer.intlayer-vs-code-extension`

---

## 深入了解

- 可视化编辑器
- CMS 模式
- 边缘/适配器上的语言环境检测

---

## 文档历史

| 版本  | 日期       | 变更内容                       |
| ----- | ---------- | ------------------------------ |
| 1.0.0 | 2025-08-11 | 添加了 TanStack Start 适配支持 |
