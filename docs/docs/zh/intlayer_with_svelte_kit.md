---
createdAt: 2025-11-20
updatedAt: 2026-08-30
title: "SvelteKit i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) SvelteKit 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 7.1.10
    date: 2025-11-20
    changes: "初始化历史记录"
author: aymericzip
---

# 使用 Intlayer 翻译您的 SvelteKit 网站 | 国际化 (i18n)

<Tabs defaultTab="code">
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“svelte-i18n”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整的 SvelteKit 覆盖**

<Accordion header="Full SvelteKit coverage">

Intlayer 经过优化，可与 SvelteKit 完美配合，提供**多语言路由**、**SSR 支持**以及扩展国际化 (i18n) 所需的所有功能。

</Accordion>

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

<Accordion header="使用 none-dev 扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 SvelteKit 应用中设置 Intlayer 的分步指南

查看 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-sveltekit-template)。

要开始，创建一个新的 SvelteKit 项目。以下是我们将创建的最终结构：

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

<Steps>

<Step number={1} title="安装依赖项">

使用 npm 安装必要的包：

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

> `--interactive` 标志是可选的。如果你是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测你的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**：核心 i18n 包。
- **svelte-intlayer**：为 Svelte/SvelteKit 提供上下文提供者和 store。
- **vite-intlayer**：Vite 插件，用于将内容声明与构建过程集成。

</Step>

<Step number={2} title="配置你的项目">

在项目根目录创建一个配置文件：

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

</Step>

<Step number={3} title="在 Vite 配置中集成 Intlayer">

更新你的 `vite.config.ts` 以包含 Intlayer 插件。此插件处理你的内容文件的转译。

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 顺序很重要，Intlayer 应放在 SvelteKit 之前
});
```

</Step>

<Step number={4} title="声明你的内容">

在你的 `src` 文件夹的任何地方创建内容声明文件（例如 `src/lib/content` 或在你的组件旁边）。这些文件使用 `t()` 函数为每个语言环境定义应用的可翻译内容。

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      zh: "欢迎使用 SvelteKit",
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

</Step>

<Step number={5} title="在你的组件中使用 Intlayer">

现在你可以在任何 Svelte 组件中使用 `useIntlayer` 函数。它返回一个响应式 store，在语言环境改变时自动更新。该函数将自动遵守当前的语言环境（在 SSR 和客户端导航期间）。

> **注意：** `useIntlayer` 返回一个 Svelte store，因此你需要使用 `$` 前缀来访问其响应式值（例如 `$content.title`）。

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" 对应于第 4 步中定义的 key
  const content = useIntlayer("hero-section");
</script>

<!-- 将内容呈现为简单内容 -->
<h1>{$content.title}</h1>
<!-- 使用编辑器呈现可编辑的内容 -->
<h1>{@const Title = $content.title}<Title /></h1>
<!-- 将内容呈现为字符串 -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="设置路由" isOptional={true}>

以下步骤展示如何在 SvelteKit 中设置基于语言环境的路由。这允许你的 URL 包含语言环境前缀（例如 `/en/about`、`/fr/about`），以获得更好的 SEO 和用户体验。

```bash
.
└─── src
    ├── app.d.ts                  # 定义语言环境类型
    ├── hooks.server.ts           # 管理语言环境路由
    ├── lib
    │   └── getLocale.ts          # 从 header、cookies 检查语言环境
    ├── params
    │   └── locale.ts             # 定义语言环境参数
    └── routes
        ├── [[locale=locale]]     # 用路由组包装以设置语言环境
        │   ├── +layout.svelte    # 路由的本地布局
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # 用于字体和全局样式的根布局
```

</Step>

<Step number={7} title="处理服务器端语言环境检测">

在 SvelteKit 中，服务器需要知道用户的语言环境以在 SSR 期间呈现正确的内容。我们使用 `hooks.server.ts` 从 URL 或 cookies 检测语言环境。

创建或修改 `src/hooks.server.ts`：

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // 检查当前路径是否已以语言环境开头（例如 /fr、/en）
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // 如果 URL 中没有语言环境（例如用户访问 "/"），则重定向他们
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // 临时重定向
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

然后，创建一个 helper 来从请求事件获取用户的语言环境：

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * 从请求事件获取用户的语言环境。
 * 此函数在 `src/hooks.server.ts` 中的 `handle` hook 中使用。
 *
 * 它首先尝试从 Intlayer storage（cookies 或自定义 headers）获取语言环境。
 * 如果找不到语言环境，它会回退到浏览器的 "Accept-Language" 协商。
 *
 * @param event - 来自 SvelteKit 的请求事件
 * @returns 用户的语言环境
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // 尝试从 Intlayer storage（Cookies 或 headers）获取语言环境
  const storedLocale = getLocaleFromStorage({
    // SvelteKit cookies 访问
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit headers 访问
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // 回退到浏览器 "Accept-Language" 协商
  const negotiatorHeaders: Record<string, string> = {};

  // 将 SvelteKit Headers 对象转换为普通的 Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // 从 `Accept-Language` header 检查语言环境
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // 如果未找到匹配项，返回默认语言环境
  return defaultLocale;
};
```

> `getLocaleFromStorage` 将根据你的配置从 header 或 cookie 检查语言环境。有关更多详情，请参阅[配置](https://intlayer.org/doc/concept/configuration)。

> `localeDetector` 函数将处理 `Accept-Language` header 并返回最佳匹配。

如果语言环境未配置，我们想返回 404 错误。为了简化这一点，我们可以创建一个 `match` 函数来检查语言环境是否有效：

```ts fileName="/src/params/locale.ts"
import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
```

> **注意：** 确保你的 `src/app.d.ts` 包含语言环境定义：
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

对于 `+layout.svelte` 文件，我们可以删除所有内容，只保留与 i18n 无关的静态内容：

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

然后，在 `[[locale=locale]]` 组下创建一个新页面和布局：

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// 使用通用 Load 类型
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// 使用路由中的语言环境初始化 Intlayer
  $effect(() => {
      setupIntlayer(data.locale);
  });
	// 使用布局内容字典
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from "svelte-intlayer";

	// 使用 home 内容字典
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

</Step>

<Step number={8} title="国际化链接" isOptional={true}>

为了 SEO，建议用语言环境前缀你的路由（例如 `/en/about`、`/fr/about`）。此组件自动用当前语言环境前缀任何链接。

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

  let { href = "" } = $props();
  const { locale } = useLocale();

  // 使用当前语言环境前缀 URL 的 Helper
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

如果你使用 SvelteKit 中的 `goto`，你可以使用相同的逻辑与 `getLocalizedUrl` 来导航到本地化的 URL：

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // 根据语言环境导航到 /en/about 或 /fr/about
```

</Step>

<Step number={9} title="语言切换器" isOptional={true}>

为了允许用户切换语言，更新 URL。

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // 将在 store 中设置语言环境并触发 onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

</Step>

<Step number={10} title="添加后端代理" isOptional={true}>

要将后端代理添加到你的 SvelteKit 应用，你可以使用 `vite-intlayer` 插件提供的 `intlayerProxy` 函数。此插件将根据 URL、cookies 和浏览器语言首选项自动检测用户的最佳语言环境。

> 自 Intlayer v9 起，`intlayerProxy()` 直接捆绑到 `intlayer()` 插件中，并通过 `routing.enableProxy` 选项（默认值为 `true`）默认启用。如下所示单独注册现在是可选的 — 为了向后兼容以及需要控制插件顺序的设置而保留。设置 `routing.enableProxy: false` 来选择不使用。查看 [v9 发布说明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/releases/v9.md)。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],
});
```

</Step>

<Step number={11} title="设置 intlayer 编辑器 / CMS" isOptional={true}>

要设置 intlayer 编辑器，你必须遵循 [intlayer 编辑器文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

要设置 intlayer CMS，你必须遵循 [intlayer CMS 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

为了能够可视化 intlayer 编辑器选择器，你必须在你的 intlayer 内容中使用组件语法。

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- 将内容呈现为简单内容 -->
  <h1>{$content.title}</h1>

  <!-- 将内容呈现为组件（编辑器需要） -->
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="提取你的组件内容" isOptional={true}>

如果你有现有的 codebase，转换数千个文件可能很耗时。

为了简化这个过程，Intlayer 提供了一个[编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)来转换你的组件并提取内容。

要设置它，你可以在你的 `intlayer.config.ts` 文件中添加一个 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 你的配置的其余部分
  compiler: {
    /**
     * 指示编译器是否应启用。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示组件在转换后是否应保存。
     *
     * - 如果为 `true`，编译器将在磁盘中重写组件文件。所以转换将是永久的，编译器将跳过下一个过程的转换。这样，编译器可以转换应用，然后可以将其删除。
     *
     * - 如果为 `false`，编译器将仅在构建输出中注入 `useIntlayer()` 函数调用，并保持基础 codebase 完整。转换将仅在内存中进行。
     */
    saveComponents: false,

    /**
     * 字典 key 前缀
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

> 自 v9 起，`intlayerCompiler` 包含在 `intlayer` 插件中。所以你不需要手动添加它。

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

</Steps>

### Git 配置

建议忽略 Intlayer 生成的文件。

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

---

### 深入了解

- **可视化编辑器**：集成[Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)，以便直接从用户界面编辑翻译内容。
- **CMS**：使用[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)实现内容管理的外部化。

## 常见问题

<FAQ>

<Question title="国际化 SvelteKit 应用有哪些不同的解决方案？">

- **`svelte-i18n`** 和 **`typesafe-i18n`**：基于 Store 的消息目录，需要手动组装进 load 函数中。
- **`Paraglide`**：具有强大类型提示的编译型消息方案，但仅专注于消息层。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时进行编译，提供支持语言环境的路由、服务端语言环境检测、AI 翻译、可视化编辑器和 CMS。

在 SvelteKit 上，差异主要体现在服务端能力上：Hooks 中的语言环境检测、本地化链接以及编辑器集成都是库内置自带的，无需每个项目手动搭建组装。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [Svelte i18n 性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/svelte.md)。

</Question>

<Question title="i18n 会给我的 SvelteKit bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/svelte.md)。

</Question>

<Question title="我可以从 svelte-i18n 或 typesafe-i18n 迁移而无需重写组件吗？">

基本可以。请按照 [Svelte I18n 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/svelte-i18n.md) 迁移内容。您也可以逐步迁移：[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将现有的 JSON 目录作为单一真实来源（source of truth），并生成 Intlayer 字典，使两个层在逐个组件迁移时保持同步。

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

<Question title="Intlayer 是否支持 SvelteKit 服务端渲染 (SSR) 和预渲染？">

是的。第 7 步涵盖了在 `hooks.server.ts` 中进行服务端语言环境检测，因此首次 HTML 响应就已经包含正确的语言，这正是搜索引擎与社交爬虫读取的内容。预渲染路由则在构建时直接解析内容。

</Question>

<Question title="如何设置本地化路由和国际化链接？">

第 6 步和第 8 步对此进行了介绍。路由树上的语言环境段加上用于链接的 `getLocalizedUrl` 可保持在活动语言内部导航，`routing.mode` 决定默认语言环境是否需要前缀。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="如何在 Svelte 中构建语言切换器？">

第 9 步展示了该组件。`useLocale` 公开活动语言环境、声明的语言环境以及在 Cookie 中持久化选择的设置函数，而 `getLocalizedUrl` 会重写当前路径，使读者在切换后保留在同一页面。

</Question>

<Question title="如何使用 AI 自动翻译 SvelteKit 应用？">

运行 `npx intlayer fill`，它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译，并且 `--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、用于长文本的 [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（任何人都可以直接在运行中的应用上就地修改文案），或通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
