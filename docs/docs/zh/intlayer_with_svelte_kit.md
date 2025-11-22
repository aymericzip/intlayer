---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: 如何翻译您的 SvelteKit 应用 – 2025 年国际化 (i18n) 指南
description: 了解如何使您的 SvelteKit 网站支持多语言。按照文档使用服务器端渲染 (SSR) 进行国际化 (i18n) 和翻译。
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
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: 初始化历史记录
---

# 使用 Intlayer 翻译您的 SvelteKit 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。它与 **SvelteKit** 的服务器端渲染 (SSR) 功能无缝协作。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **通过自动生成的类型确保 TypeScript 支持**。
- **利用 SvelteKit 的 SSR 实现对搜索引擎友好的国际化**。

---

## 在 SvelteKit 应用中设置 Intlayer 的分步指南

首先，创建一个新的 SvelteKit 项目。以下是我们将要构建的最终结构：

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-sveltekit-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### 第一步：安装依赖

使用 npm 安装必要的包：

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

- **intlayer**：核心的国际化（i18n）包。
- **svelte-intlayer**：为 Svelte/SvelteKit 提供上下文提供者和存储。
- **vite-intlayer**：Vite 插件，用于将内容声明集成到构建流程中。

### 第二步：配置你的项目

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

### 第3步：在你的 Vite 配置中集成 Intlayer

更新你的 `vite.config.ts` 文件以包含 Intlayer 插件。该插件负责内容文件的转译。

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 顺序很重要，Intlayer 应该放在 SvelteKit 之前
});
```

### 第4步：声明您的内容

在您的 `src` 文件夹中的任意位置创建内容声明文件（例如，`src/lib/content` 或与组件放在一起）。这些文件使用 `t()` 函数为每个语言环境定义您的应用程序可翻译的内容。

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### 第5步：在您的组件中使用 Intlayer

现在你可以在任何 Svelte 组件中使用 `useIntlayer` 函数。它返回一个响应式存储，当语言环境变化时会自动更新。该函数会自动遵循当前语言环境（无论是在 SSR 还是客户端导航期间）。

> **注意：** `useIntlayer` 返回一个 Svelte 存储，因此你需要使用 `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: 如何翻译您的 SvelteKit 应用 – 2025 年国际化 (i18n) 指南
> description: 了解如何使您的 SvelteKit 网站支持多语言。按照文档使用服务器端渲染 (SSR) 进行国际化 (i18n) 和翻译。
> keywords:

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
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: 初始化历史记录

---

# 使用 Intlayer 翻译您的 SvelteKit 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用中的多语言支持。它与 **SvelteKit** 的服务器端渲染 (SSR) 功能无缝协作。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **通过自动生成的类型确保 TypeScript 支持**。
- **利用 SvelteKit 的 SSR 实现对搜索引擎友好的国际化**。

---

## 在 SvelteKit 应用中设置 Intlayer 的分步指南

首先，创建一个新的 SvelteKit 项目。以下是我们将要构建的最终结构：

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### 第一步：安装依赖

使用 npm 安装必要的包：

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

- **intlayer**：核心的国际化（i18n）包。
- **svelte-intlayer**：为 Svelte/SvelteKit 提供上下文提供者和存储。
- **vite-intlayer**：Vite 插件，用于将内容声明集成到构建流程中。

### 第二步：配置你的项目

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

### 第3步：在你的 Vite 配置中集成 Intlayer

更新你的 `vite.config.ts` 文件以包含 Intlayer 插件。该插件负责内容文件的转译。

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // 顺序很重要，Intlayer 应该放在 SvelteKit 之前
});
```

### 第4步：声明您的内容

在您的 `src` 文件夹中的任意位置创建内容声明文件（例如，`src/lib/content` 或与组件放在一起）。这些文件使用 `t()` 函数为每个语言环境定义您的应用程序可翻译的内容。

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### 第5步：在您的组件中使用 Intlayer

前缀来访问其响应式值（例如，`$content.title`）。

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" 对应于步骤4中定义的键
  const content = useIntlayer("hero-section");
</script>

<!-- 以简单内容渲染内容 -->
<h1>{$content.title}</h1>
<!-- 使用编辑器渲染可编辑内容 -->
<h1><svelte:component this={$content.title} /></h1>
<!-- 以字符串形式渲染内容 -->
<div aria-label={$content.title.value}></div>
```

### （可选）步骤6：设置路由

以下步骤展示了如何在 SvelteKit 中设置基于语言环境的路由。这允许您的 URL 包含语言环境前缀（例如 `/en/about`，`/fr/about`），以提升 SEO 和用户体验。

```bash
.
└─── src
    ├── app.d.ts                  # 定义语言环境类型
    ├── hooks.server.ts           # 管理语言环境路由
    ├── lib
    │   └── getLocale.ts          # 从请求头、cookies 检查语言环境
    ├── params
    │   └── locale.ts             # 定义语言环境参数
    └── routes
        ├── [[locale=locale]]     # 使用路由组包裹以设置语言环境
        │   ├── +layout.svelte    # 路由的本地布局
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # 字体和全局样式的根布局
```

### 第7步：处理服务器端的语言环境检测（Hooks）

在 SvelteKit 中，服务器需要知道用户的语言环境，以便在 SSR 期间渲染正确的内容。我们使用 `hooks.server.ts` 从 URL 或 cookie 中检测语言环境。

创建或修改 `src/hooks.server.ts`：

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // 检查当前路径是否已以某个语言环境开头（例如 /fr, /en）
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // 如果 URL 中没有语言环境（例如用户访问 "/"），则重定向
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

然后，创建一个辅助函数从请求事件中获取用户的语言环境：

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * 从请求事件中获取用户的语言环境。
 * 此函数用于 `src/hooks.server.ts` 中的 `handle` 钩子。
 *
 * 它首先尝试从 Intlayer 存储（cookies 或自定义头）中获取语言环境。
 * 如果未找到语言环境，则回退到浏览器的 "Accept-Language" 协商。
 *
 * @param event - 来自 SvelteKit 的请求事件
 * @returns 用户的语言环境
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // 尝试从 Intlayer 存储（Cookies 或头）中获取语言环境
  const storedLocale = getLocaleFromStorage({
    // SvelteKit cookies 访问
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // SvelteKit headers 访问
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // 回退到浏览器的 "Accept-Language" 协商
  const negotiatorHeaders: Record<string, string> = {};

  // 将 SvelteKit Headers 对象转换为普通的 Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // 从 `Accept-Language` 头检查语言环境
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // 如果没有匹配，返回默认语言环境
  return defaultLocale;
};
```

> `getLocaleFromStorage` 将根据您的配置从请求头或 cookie 中检查语言环境。更多详情请参见 [Configuration](https://intlayer.org/doc/configuration)。

> `localeDetector` 函数会处理 `Accept-Language` 请求头并返回最佳匹配的语言环境。

如果未配置语言环境，我们希望返回 404 错误。为简化操作，我们可以创建一个 `match` 函数来检查语言环境是否有效：

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **注意：** 请确保您的 `src/app.d.ts` 中包含语言环境的定义：
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

对于 `+layout.svelte` 文件，我们可以删除所有内容，只保留与国际化无关的静态内容：

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

然后，在 `[[locale=locale]]` 组下创建一个新的页面和布局：

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// 使用通用的 Load 类型
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// 使用路由中的 locale 初始化 Intlayer
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
	import { useIntlayer } from 'svelte-intlayer';

	// 使用主页内容字典
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

### （可选）步骤 8：国际化链接

为了SEO，建议在路由前加上语言前缀（例如 `/en/about`，`/fr/about`）。该组件会自动为任何链接添加当前语言的前缀。

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // 辅助函数：为URL添加当前语言前缀
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

如果你使用 SvelteKit 的 `goto`，可以用相同的逻辑结合 `getLocalizedUrl` 来跳转到本地化的URL：

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // 根据语言环境导航到 /en/about 或 /fr/about
```

### （可选）步骤 9：语言切换器

为了允许用户切换语言，更新 URL。

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
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
          setLocale(localeEl); // 将在存储中设置语言环境并触发 onLocaleChange
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

### （可选）步骤 10：添加后端代理

要为您的 SvelteKit 应用添加后端代理，可以使用 `vite-intlayer` 插件提供的 `intlayerProxy` 函数。该插件将根据 URL、Cookie 和浏览器语言偏好自动检测用户的最佳语言环境。

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### （可选）步骤 11：设置 intlayer 编辑器 / CMS

要设置 intlayer 编辑器，您必须遵循 [intlayer 编辑器文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)。

要设置 intlayer CMS，您必须遵循 [intlayer CMS 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)。

要能够可视化 intlayer 编辑器选择器，您必须在 intlayer 内容中使用组件语法。

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- 以简单内容方式渲染内容 -->
  <h1>{$content.title}</h1>

  <!-- 以组件方式渲染内容（编辑器所需） -->
  <svelte:component this={$content.component} />
</div>
```

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
