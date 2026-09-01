---
createdAt: 2025-09-04
updatedAt: 2026-08-30
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

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

**自动化**

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

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

</Step>
</Steps>
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

</Step>
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

</Step>

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

- 翻译键的**自动补全**。
- 缺失翻译的**实时错误检测**。
- 翻译内容的**内联预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

## 深入了解

要深入了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 将内容外部化。

---

## 文档参考

- [Intlayer 文档](https://intlayer.org)
- [React Router v7 文档](https://reactrouter.com/)
- [useIntlayer Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useIntlayer.md)
- [useLocale Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/packages/react-intlayer/useLocale.md)
- [内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)
- [配置指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)

本综合指南提供了将 Intlayer 与 React Router v7 集成所需的全部内容，帮助您构建具备支持语言环境的路由与 TypeScript 支持的完整国际化应用。

## 常见问题

<FAQ>

<Question title="国际化 React Router v7 应用有哪些不同的解决方案？">

React Router v7 本身不包含消息管理层，因此需要将其与 i18n 库搭配使用：

- **`react-i18next` / `i18next`**：在运行时加载 JSON 命名空间，需要单独编写语言检测器接入路由。
- **`react-intl`** 和 **`Lingui`**：基于提取步骤的 ICU 消息方案。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），在构建时编译，全链路类型安全，提供支持语言环境的路由辅助函数、AI 翻译、可视化编辑器和 CMS。

请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="i18n 会给我的 React Router bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/index.md)。

</Question>

<Question title="我可以从 react-i18next 或 react-intl 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [react-i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_react-i18next_to_intlayer.md) 或 [i18next 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_i18next_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `react-i18next`、`react-intl` 和 `i18next` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码完全无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的组件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。本指南的第 12 步详细介绍了此过程。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可在构建时执行相同操作：它在每次更改时扫描您的 JSX、TSX、Vue 和 Svelte 源代码，生成字典并通过热模块替换 (HMR) 保持同步，因此完全无需手动维护键名。

开启编译器前有两个限制值得了解：它通过静态分析工作，因此仅在运行时存在的字符串（如 API 错误代码或 CMS 字段）无法被捕获；此外它需要区分用户文本和应用程序逻辑（如 `className="active"` 或状态代码），在大型代码库中需要少量注解。而 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 则通过让您参与审查避免了这两个问题。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="如何在路由中添加语言环境段 (locale segment)？">

在您的路由树中声明一个 `:locale` 段，并让 Intlayer 解析它。`validatePrefix` 告诉您该段是否属于已声明的语言环境，从而让未知的前缀返回 404 而不是渲染重复页面，并且 `getLocalizedUrl` 可将任何路径重写为目标语言。如果您使用文件系统路由，请参阅本指南的 [文件系统路由版本](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_with_react_router_v7_fs_routes.md)。

</Question>

<Question title="我必须在 URL 中包含语言环境吗？">

不需要。`routing.mode` 支持 `"prefix-no-default"`（默认）、`"prefix-all"`、`"no-prefix"` 和 `"search-params"`，并且 `routing.domains` 可将语言环境映射到其独立的域名。无论哪种方式，语言环境都会持久化在 Cookie 中。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="它是否适用于带有 SSR 和 loaders 的 React Router 框架模式？">

是的。内容在服务端渲染期间解析，当前活动的语言环境在 loaders 和 actions 中均可用，因此服务端数据可以与页面在同一步骤完成本地化。客户端导航保持语言环境，无需整页刷新。

</Question>

<Question title="如何为 SEO 添加 hreflang 标签？">

使用 `getMultilingualUrls` 构建备用链接映射（包含 `x-default` 项），并在路由的 `meta` 或 `links` 导出中输出。同一个辅助函数也可以用于生成本地化的 `sitemap.xml`。

</Question>

<Question title="如何构建停留在当前页面的语言切换器？">

使用 `useLocale` 获取当前活动和可用的语言环境，并使用 `getLocalizedUrl` 将当前路径转换为目标语言环境。用户会停留在相同的路由上，而不会被送回主页，同时也避免了丢失滚动位置和查询参数。

</Question>

<Question title="如何使用 AI 自动翻译应用？">

运行 `npx intlayer fill`，它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于长文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
