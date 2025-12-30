---
createdAt: 2025-09-04
updatedAt: 2025-12-30
title: 如何翻译您的React Router v7应用 – i18n指南 2026
description: 学习如何使用 Intlayer 为您的 React Router v7 应用添加国际化（i18n）。按照本综合指南，使您的应用支持多语言和基于区域的路由。
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
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: 添加 init 命令
  - version: 7.5.6
    date: 2025-12-27
    changes: 更新布局和处理404
  - version: 6.1.5
    date: 2025-10-03
    changes: 更新文档
  - version: 5.8.2
    date: 2025-09-04
    changes: 添加 React Router v7 支持
---

# 使用Intlayer翻译您的React Router v7 | 国际化(i18n)

本指南演示了如何在 React Router v7 项目中集成 **Intlayer**，实现无缝国际化，支持基于区域的路由、TypeScript 支持以及现代开发实践。

## Table of Contents

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **确保 TypeScript 支持**，通过自动生成类型，提升自动补全和错误检测能力。
- **享受高级功能**，如动态区域检测和切换。
- **通过 React Router v7 的基于配置的路由系统启用区域感知路由**。

---

## 在 React Router v7 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用您喜欢的包管理器安装必要的包：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

- **intlayer**

  提供国际化工具的核心包，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译以及[命令行工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md)。

- **react-intlayer**
  将 Intlayer 集成到 React 应用中的包。它提供了 React 国际化的上下文提供者和钩子。

- **vite-intlayer**
  包含用于将 Intlayer 集成到 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：项目配置

## 在 React Router v7 应用程序中使用基于文件系统的路由设置 Intlayer 的分步指南

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="How to translate your React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template) on GitHub.

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 默认语言
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 支持的语言列表
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 支持的语言列表
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// 配置对象，定义国际化设置
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 默认语言
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 支持的语言列表
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在您的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中：

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保内容声明文件的构建，并在开发模式下监视这些文件。它在 Vite 应用中定义了 Intlayer 的环境变量。此外，它还提供别名以优化性能。

### 第4步：配置 React Router v7 路由

设置支持多语言的路由配置：

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:lang?", "routes/page.tsx"), // 本地化主页
  route("/:lang?/about", "routes/about/page.tsx"), // 本地化关于页面
] satisfies RouteConfig;
```

### 第5步：创建布局组件

设置根布局和特定语言环境的布局：

#### 根布局

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  data,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

// ... Unchanged App, links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  if (!locale) {
    throw data("Language not supported", { status: 404 });
  }

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

### 第6步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "了解我们",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "首页",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们被包含在 `contentDir` 目录中（默认是 `./app`）。并且文件扩展名需匹配内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第7步：创建支持多语言的组件

创建一个 `LocalizedLink` 组件，用于支持多语言的导航：

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to); // 判断是否为外部链接

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to; // 如果是外部链接，直接返回
    }

    return getLocalizedUrl(to, locale); // 获取本地化的URL
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to; // 如果路径名是外部链接，直接返回
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale), // 本地化路径名
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale(); // 获取当前语言环境

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

如果你想导航到本地化路由，可以使用 `useLocalizedNavigate` 钩子：

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

### 第8步：在你的页面中使用 Intlayer

在您的整个应用程序中访问内容字典：

#### 本地化主页

```tsx fileName="app/routes/page.tsx"
import { getIntlayer, validatePrefix } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { data } from "react-router";

import { LocaleSwitcher } from "~/components/locale-switcher";

import { Navbar } from "~/components/navbar";
import type { Route } from "./+types/page";

export const loader = ({ params }: Route.LoaderArgs) => {
  const { locale } = params;

  const { isValid } = validatePrefix(locale);

  if (!isValid) {
    throw data("Locale not supported", { status: 404 });
  }
};

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page", params.locale);

  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> 想了解更多关于 `useIntlayer` 钩子的内容，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)。

### 第9步：创建语言切换组件

创建一个组件，允许用户切换语言：

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher"); // 使用 useIntlayer 钩子获取本地化标签
  const { pathname } = useLocation(); // 获取当前路径名

  const { availableLocales, locale } = useLocale(); // 获取可用语言和当前语言

  const pathWithoutLocale = getPathWithoutLocale(pathname); // 获取不带语言前缀的路径

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* 语言环境 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 语言在其自身语言环境中的名称 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 语言在当前语言环境中的名称 - 例如当前语言环境为 Locales.SPANISH 时显示 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 语言的英文名称 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> 想了解更多关于 `useLocale` 钩子的内容，请参阅[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

### 第10步：添加HTML属性管理（可选）

创建一个钩子来管理HTML的 lang 和 dir 属性：

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
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

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // 导入该钩子

export default function RootLayout() {
  useI18nHTMLAttributes(); // 调用该钩子

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 第11步：添加中间件（可选）

你也可以使用 `intlayerProxy` 为你的应用添加服务器端路由。该插件会根据 URL 自动检测当前的语言环境，并设置相应的语言环境 cookie。如果未指定语言环境，插件将根据用户浏览器的语言偏好确定最合适的语言环境。如果仍未检测到语言环境，则会重定向到默认语言环境。

> 注意，要在生产环境中使用 `intlayerProxy`，你需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerProxy()],
});
```

---

## 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强大。

确保您的 TypeScript 配置包含自动生成的类型：

```json5 fileName="tsconfig.json"
{
  // ... 您现有的配置
  include: [
    // ... 您现有的包含项
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

---

## Git 配置

建议忽略 Intlayer 生成的文件，这样可以避免将它们提交到您的 Git 仓库。

为此，您可以在 `.gitignore` 文件中添加以下指令：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

## VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入了解

要更进一步，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)来外部化您的内容。

---

## 文档参考

- [Intlayer 文档](https://intlayer.org)
- [React Router v7 文档](https://reactrouter.com/)
- [useIntlayer 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)
- [useLocale 钩子](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)
- [配置](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

本综合指南提供了将 Intlayer 与 React Router v7 集成所需的一切，支持完全国际化的应用程序，具备基于区域设置的路由和 TypeScript 支持。
