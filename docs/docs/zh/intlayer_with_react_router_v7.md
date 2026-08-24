---
createdAt: 2025-09-04
updatedAt: 2026-06-23
title: "React Router v7 i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) React Router v7 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
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
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 7.5.6
    date: 2025-12-27
    changes: "更新布局和处理404"
  - version: 6.1.5
    date: 2025-10-03
    changes: "更新文档"
  - version: 5.8.2
    date: 2025-09-04
    changes: "添加 React Router v7 支持"
author: aymericzip
---

# 使用Intlayer翻译您的React Router v7 | 国际化(i18n)

本指南演示了如何在 React Router v7 项目中集成 **Intlayer**，实现无缝国际化，支持基于区域的路由、TypeScript 支持以及现代开发实践。

本指南重点关注前端路由。对于 fs-routes 路由，请参考 [Intlayer with React Router v7 File-System Routes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_router_v7_fs_routes.md) 指南。

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与 `react-i18next` 或 `i18next` 等主要解决方案相比，Intlayer 是一个具有集成优化的解决方案，例如：

<AccordionGroup>

与“react-i18next”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 React Router 覆盖**

Intlayer 经过优化，可与 React Router 完美配合，提供**区域设置感知路由**、**用于区域设置检测的中间件**以及扩展国际化 (i18n) 所需的所有功能。

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

**表现**

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

**无需开发即可扩展**

<Accordion header="使用 non-dev 进行扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 React Router v7 应用中设置 Intlayer 的分步指南

<Steps>

<Step number={1} title="安装依赖">

使用您首选的包管理器安装必要的包：

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI agent，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **react-intlayer**
  将 Intlayer 与 React 应用集成的包。它为 React 国际化提供了上下文提供者和钩子。

- **vite-intlayer**
  包括用于将 Intlayer 与 [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production) 集成的 Vite 插件，以及用于检测用户首选区域设置、管理 cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置您的项目">

</Step>

</Steps>

## 在 React Router v7 应用程序中使用基于文件系统的路由设置 Intlayer 的分步指南

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="How to translate an React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-react-router-v7-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template) on GitHub.

创建一个配置文件来配置您的应用程序语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // 默认语言
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // 支持的语言列表
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

<Steps>

<Step number={3} title="在您的 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到您的配置中:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保构建内容声明文件并在开发模式下监控它们。它在 Vite 应用程序中定义 Intlayer 环境变量。此外，它提供别名以优化性能。

</Step>

<Step number={4} title="配置 React Router v7 Routes">

使用本地化感知路由设置您的路由配置：

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:lang?", "routes/page.tsx"), // 本地化主页
  route("/:lang?/about", "routes/about/page.tsx"), // 本地化关于页面
] satisfies RouteConfig;
```

</Step>

<Step number={5} title="创建根布局">

设置您的根布局和特定于语言的布局：

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

</Step>

<Step number={6} title="声明您的内容">

创建并管理您的内容声明以存储翻译：

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      zh: "欢迎来到 React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      zh: "使用 React Router v7 和 Intlayer 轻松构建多语言应用程序。",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      zh: "了解我们",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      zh: "首页",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> 您的内容声明可以在应用程序的任何地方定义，只要它们被包含在 `contentDir` 目录中（默认为 `./app`）。并且匹配内容声明文件扩展名（默认为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详细信息，请参阅[content 声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={7} title="创建本地化感知的组件">

为区域感知导航创建一个 `LocalizedLink` 组件：

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

// 检查是否为外部链接
const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// 将链接本地化
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

// 本地化链接组件
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

如果您想导航到本地化的路由，您可以使用 `useLocalizedNavigate` hook：

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  // 获取导航函数
  const navigate = useNavigate();
  // 获取当前语言环境
  const { locale } = useLocale();

  // 创建本地化导航函数
  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    // 将路径本地化到当前语言
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="在你的页面中使用 Intlayer">

在整个应用程序中访问您的内容字典：

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

> 了解更多关于 `useIntlayer` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)。

> 如果你的应用已经存在，你可以使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md)以及[提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)，在一秒内转换数千个组件。

</Step>

<Step number={9} title="创建语言切换器组件">

创建一个组件以允许用户更改语言：

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

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
              {/* 语言环境代码 - 例如 FR */}
              {localeItem}
            </span>
            <span>
              {/* 用其自身语言环境表示的语言 - 例如 Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* 用当前语言环境表示的语言 - 例如当前语言环境设置为 Locales.SPANISH 时的 Francés */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* 用英文表示的语言 - 例如 French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> 了解更多关于 `useLocale` hook 的信息，请参考[文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)。

</Step>

<Step number={10} title="添加 HTML 属性管理">

创建一个 hook 来管理 HTML lang 和 dir 属性：

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

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // 导入 hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // 调用 hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

</Step>

<Step number={11} title="添加中间件">

你也可以使用 `intlayerProxy` 来为你的应用添加服务器端路由。这个插件将自动根据 URL 检测当前语言环境并设置适当的语言 cookie。如果未指定语言环境，该插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果未检测到语言环境，它将重定向到默认语言环境。

> 注意，要在生产环境中使用 `intlayerProxy`，你需要将 `vite-intlayer` 包从 `devDependencies` 切换到 `dependencies`。

> 自 Intlayer v9 起，`intlayerProxy()` 直接捆绑在 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项（默认为 `true`）默认启用。如下所示单独注册它现在是可选的 — 它保留用于向后兼容性和需要控制插件顺序的设置。设置 `routing.enableProxy: false` 以选择退出。查看 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={12} title="提取组件的内容" isOptional={true}>

如果你有一个现有的代码库，转换数千个文件可能很耗时。

为了简化这个过程，Intlayer 提供了一个[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)来转换你的组件并提取内容。

要进行设置，你可以在 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 其余配置
  compiler: {
    /**
     * 指示编译器是否应该被启用。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示组件在转换后是否应该被保存。
     *
     * - 如果为 `true`，编译器将重新将组件文件写入磁盘。因此转换将是永久的，编译器将跳过下一个过程的转换。这样，编译器可以转换应用，然后可以删除它。
     *
     * - 如果为 `false`，编译器仅在构建输出中注入 `useIntlayer()` 函数调用，并保持基础代码库完整。转换仅在内存中完成。
     */
    saveComponents: false,

    /**
     * 词典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='提取命令'>

运行提取器来转换你的组件并提取内容

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel 编译器'>

> 自 v9 起，`intlayerCompiler` 已包含在 `intlayer` 插件中。因此你不需要手动添加它。

更新你的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // 添加编译器插件
  ],
});
```

```bash packageManager="npm"
npm run build # 或 npm run dev
```

```bash packageManager="pnpm"
pnpm run build # 或 pnpm run dev
```

```bash packageManager="yarn"
yarn build # 或 yarn dev
```

```bash packageManager="bun"
bun run build # 或 bun run dev
```

 </Tab>
</Tabs>

---

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

---

## Documentation References

- [Intlayer Documentation](https://intlayer.org)
- [React Router v7 Documentation](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)

This comprehensive guide provides everything you need to integrate Intlayer with React Router v7 for a fully internationalized application with locale-aware routing and TypeScript support.
