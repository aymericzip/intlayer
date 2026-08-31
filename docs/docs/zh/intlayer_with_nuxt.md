---
createdAt: 2025-06-18
updatedAt: 2026-08-30
title: "Nuxt i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Nuxt 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.3.11
    date: 2025-12-07
    changes: "更新 LocaleSwitcher、SEO、元数据"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# 使用 Intlayer 翻译您的 Nuxt 和 Vue 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“@nuxtjs/i18n”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

**完整 Nuxt 覆盖**

<Accordion header="Full Nuxt coverage">

Intlayer 经过优化，可与 Nuxt 完美配合，提供**多语言路由**、**用于区域设置检测的中间件**、**站点地图**以及扩展国际化 (i18n) 所需的所有功能。

</Accordion>

**捆绑尺寸**

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

**可维护性**

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

**人工智能代理**

<Accordion header="AI Agent">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

**自动化**

<Accordion header="自动化">

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

## 在 Nuxt 应用中设置 Intlayer 的分步指南

<Tabs defaultTab="video">
  <Tab label="视频" value="video">

<iframe title="How to translate an Nuxt and Vue app using Intlayer? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

查看 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-nuxt-4-template)。

<Steps>

<Step number={1} title="安装依赖">

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

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 此命令将检测您的环境并安装所需的包。例如：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  核心包，为配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)提供国际化工具。

- **vue-intlayer**
  将 Intlayer 与 Vue 应用集成的包。为 Vue 组件提供 composables。

- **nuxt-intlayer**
  将 Intlayer 与 Nuxt 应用集成的 Nuxt 模块。它提供自动设置、locale 检测中间件、cookie 管理和 URL 重定向。

</Step>

<Step number={2} title="配置您的项目">

创建一个配置文件来配置您的应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他 locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在您的 Nuxt 配置中集成 Intlayer">

将 intlayer 模块添加到您的 Nuxt 配置中：

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 您现有的 Nuxt 配置
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` 模块自动处理 Intlayer 与 Nuxt 的集成。它设置内容声明构建、在开发模式下监视文件、提供 locale 检测中间件，并管理本地化路由。

</Step>

<Step number={4} title="声明您的内容">

创建并管理您的内容声明以存储翻译：

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      zh: "你好，世界",
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      zh: "欢迎 | 我的应用",
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      zh: "发现由 Intlayer 支持的多语言 Nuxt 应用主页。",
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 有关更多详细信息，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={5} title="在您的代码中使用 Intlayer">

使用 `useIntlayer` composable 在整个 Nuxt 应用中访问您的内容字典：

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### 访问 Intlayer 中的内容

Intlayer 提供了多种 API 来访问您的内容：

- **基于组件的语法**（推荐）：
  使用 `<myContent />` 或 `<Component :is="myContent" />` 语法将内容渲染为 Intlayer 节点。这与[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)和[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)无缝集成。

- **基于字符串的语法**：
  使用 `{{ myContent }}` 将内容渲染为纯文本，不支持可视化编辑器。

- **原始 HTML 语法**：
  使用 `<div v-html="myContent" />` 将内容渲染为原始 HTML，不支持可视化编辑器。

- **解构语法**：
  `useIntlayer` 组合函数返回一个包含内容的 Proxy。该 Proxy 可以被解构以访问内容，同时保持响应性。
  - 使用 `const content = useIntlayer("myContent");` 以及 `{{ content.myContent }}` / `<content.myContent />`。
  - 或者使用 `const { myContent } = useIntlayer("myContent");` 以及 `{{ myContent}}` / `<myContent/>` 来解构内容。

</Step>

<Step number={6} title="更改内容语言">

要更改内容的语言，可以使用 `useLocale` 组合函数提供的 `setLocale` 函数。该函数允许您设置应用程序的语言环境并相应地更新内容。

创建一个组件，使用 `NuxtLink` 在语言之间切换。**使用链接而非按钮进行语言切换是 SEO 和页面可发现性的最佳实践**，因为这允许搜索引擎抓取并索引页面的所有本地化版本：

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt 自动导入 useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> 使用带有正确 `href` 属性（通过 `getLocalizedUrl`）的 `NuxtLink` 确保搜索引擎能够发现您页面的所有语言版本。这比仅使用 JavaScript 的语言切换更优，因为搜索引擎爬虫可能无法跟踪后者。

然后，设置您的 `app.vue` 以使用布局：

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>

<Step number={7} title="为您的应用添加本地化路由">

当使用 `nuxt-intlayer` 模块时，Nuxt 会自动处理本地化路由。它会根据您的页面目录结构自动为每种语言创建路由。

示例：

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

要创建本地化页面，只需在 `pages/` 目录中创建您的 Vue 文件。以下是两个示例页面：

**主页 (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**关于页面 (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // 使用 .raw 访问原始字符串
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // 使用 .raw 访问原始字符串
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> 注意：`useHead` 在 Nuxt 中是自动导入的。你可以根据需要使用 `.value`（响应式）或 `.raw`（原始字符串）来访问内容值。

`nuxt-intlayer` 模块将自动：

- 检测用户的首选语言环境
- 通过 URL 处理语言切换
- 设置适当的 `<html lang="">` 属性
- 管理语言环境 Cookie
- 将用户重定向到相应的本地化 URL

</Step>

<Step number={8} title="创建本地化链接组件">

为了确保您的应用程序导航遵循当前的语言环境，您可以创建一个自定义的 `Links` 组件。该组件会自动为内部 URL 添加当前语言前缀，这对于 **SEO 和页面可发现性** 至关重要。

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// 计算最终路径
const finalPath = computed(() => {
  // 1. 检查链接是否为外部链接
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. 如果是外部链接，原样返回（NuxtLink 负责生成 <a> 标签）
  if (isExternal) return props.href;

  // 3. 如果是内部链接，则本地化 URL
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

然后在整个应用中使用此组件：

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">首页</Links>
    <Links href="/about">关于</Links>
  </div>
</template>
```

> 通过使用带有本地化路径的 `NuxtLink`，您可以确保：
>
> - 搜索引擎能够抓取并索引您页面的所有语言版本
> - 用户可以直接分享本地化的 URL
> - 浏览器历史记录能正确处理带有语言前缀的 URL

</Step>

<Step number={9} title="处理元数据和 SEO">

Nuxt 通过 `useHead` 组合式函数（自动导入）提供了出色的 SEO 功能。您可以使用 Intlayer 处理本地化的元数据，使用 `.raw` 或 `.value` 访问器获取原始字符串值：

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead 在 Nuxt 中自动导入
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // 使用 .raw 获取原始字符串
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // 使用 .raw 获取原始字符串值
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> 或者，你可以使用 `import { getIntlayer } from "intlayer"` 函数来获取内容，且不带 Vue 响应性。

> **访问内容值：**
>
> - 使用 `.raw` 获取原始字符串值（非响应式）
> - 使用 `.value` 获取响应式值
> - 使用 `<content.key />` 组件语法以支持可视化编辑器

创建对应的内容声明：

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "关于我们 - 我的公司",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      en: "了解更多关于我们公司及我们的使命",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      en: "关于我们",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "en": "关于我们 - 我的公司",
        "fr": "关于我们 - 我的公司",
        "es": "关于我们 - 我的公司"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "en": "了解更多关于我们公司及我们的使命",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "关于我们",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

</Step>

<Step number="6b" title="创建带导航的布局" isOptional={true}>

Nuxt 布局允许您为页面定义一个通用结构。创建一个包含语言切换器和导航的默认布局：

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">首页</Links>
    <Links href="/about">关于</Links>
  </div>
</template>
```

`Links` 组件（如下所示）确保内部导航链接会自动本地化。

</Step>

</Steps>

### Git 配置

建议忽略 Intlayer 生成的文件。这样可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到您的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的 **自动补全**。
- 缺失翻译的 **实时错误检测**。
- 翻译内容的 **内联预览**。
- 轻松创建和更新翻译的 **快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 更进一步

要进一步提升，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。

## 常见问题

<FAQ>

<Question title="国际化 Nuxt 应用有哪些不同的解决方案？">

两个切合实际的选择：

- **`@nuxtjs/i18n`**：成熟的官方模块，基于 `vue-i18n` 构建，按页面加载语言文件，配置项庞大。但 `vue-i18n` 无法实现消息的命名空间隔离，导致每个页面都会打包所有其他页面的消息，随着页面增多，bundle 体积不断膨胀。
- **`Intlayer`**：最先进的解决方案。内容可以在代码库中的任何位置声明（[靠近每个组件或集中管理](https://intlayer.org/zh/blog/per-component-vs-centralized-i18n)），并在构建时进行编译，全链路类型安全，提供支持语言环境的路由、AI 翻译、可视化编辑器和 CMS。

核心区别在于内容的存放位置。`@nuxtjs/i18n` 将内容集中在 `locales/*.json` 文件中，而 Intlayer 将内容与渲染它的组件放置在同一目录下，因此页面仅输出其实际使用的条目，且功能模块目录可以整体移动或删除。请参阅 [为什么选择 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/interest_of_intlayer.md) 和 [Vue i18n 性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/vue.md)。

</Question>

<Question title="i18n 会给我的 Nuxt bundle 体积增加多少？">

远少于基于命名空间的方案，因为页面永远不会下载它不渲染的语言目录。服务端渲染的标记在服务端直接解析内容，构建时编译器将 `useIntlayer` 调用替换为组件使用的确切字典条目，因此未使用的键和未使用的语言都会被自动丢弃，并且 [动态字典](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dynamic_dictionaries/index.md) 会按语言环境拆分剩余内容。与常规替代方案相比，Intlayer 可将 bundle 和页面体积减少高达 50%。请参阅 [Bundle 体积优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md) 和 [性能基准](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/benchmark/vue.md)。

</Question>

<Question title="我可以从 @nuxtjs/i18n 或 vue-i18n 迁移而无需重写组件吗？">

可以，有两条迁移路径。您可以使用 [@nuxtjs/i18n 迁移指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/migration_from_nuxtjs_i18n_to_intlayer.md) 逐步迁移内容。或者，您可以完全保留当前的 API：[兼容性适配器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compat/index.md) 公开与 `vue-i18n` 完全相同的 API，但底层由 Intlayer 字典驱动，因此只需更改导入语句，组件代码完全无需修改。

</Question>

<Question title="我可以保留现有的 JSON 翻译文件吗？">

可以。[JSON 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-json.md) 将您的 `/messages/{locale}/{namespace}.json` 文件作为单一真实来源（source of truth），并双向生成 Intlayer 字典。[PO 同步插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/plugins/sync-po.md) 对 gettext 目录执行相同的操作，而 [按语言环境组织的文件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/per_locale_file.md) 允许您按语言拆分内容，而不是将所有语言打包到一个文件中。

</Question>

<Question title="我必须逐个键迁移我的内容吗？">

不需要。运行 `npx intlayer extract`，Intlayer 会读取您的源码文件，提取面向用户的字符串，并在每个组件旁边生成 `.content` 文件，这样您只需审查 diff，而无需手动逐一复制字符串到语言目录中。请参阅 [extract 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md)。

如需全自动流程，[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 可以在构建时对 JSX、TSX、Vue 和 Svelte 源码执行相同操作，在每次更改时自动生成字典，完全无需手动维护键名。它通过静态分析工作，因此仅在运行时存在的字符串无法被捕获，并且需要少量注解以区分用户文本和应用程序逻辑。

</Question>

<Question title="有哪些可用的编辑器和 AI 代理工具？">

共有 5 个工具，均为可选：

- **[VS Code 扩展](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/vs_code_extension.md)**：从 `useIntlayer` 键跳转到声明它的内容文件，从组件中提取内容，并从命令面板或专属的 Intlayer 选项卡运行 build、fill、test、push 和 pull。
- **[LSP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/lsp.md)**：在任何支持 LSP 的编辑器中提供相同的感知能力，支持跳转到定义、查找所有引用、悬停预览翻译值、键和字段的自动补全，以及在键未声明时发出警告。它还可以解析 `i18next`、`react-i18next`、`next-intl` 和 `use-intl` 调用，助力平滑迁移。
- **[MCP 服务器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/mcp_server.md)**：向 Cursor、VS Code、Claude Desktop、Claude Code 和 ChatGPT 公开 Intlayer 文档与 CLI，使 AI 助手能够基于最新文档进行准确回答，并能自行运行 `intlayer fill` 等命令。
- **[Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/agent_skills.md)**：针对特定领域的技能（如 `intlayer-config`、`intlayer-cli` 和 `intlayer-content`，以及每个框架对应的专属技能），教导 AI 代理您的路由配置和内容节点类型。
- **[ESLint 插件](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/eslint.md)**：`no-raw-text` 规则标记硬编码字符串，并提供针对静态字典键和未使用内容的额外规则。

</Question>

<Question title="Intlayer 是否支持 Nuxt 服务端渲染 (SSR) 和静态生成？">

是的。内容在 SSR 和 `nuxt generate` 过程中直接解析，因此预渲染的页面包含完整的已翻译标记，而无需在客户端二次获取目录。`nuxt-intlayer` 模块会自动为您配置 Provider 和语言环境检测。

</Question>

<Question title="我必须在 URL 中包含语言环境吗？">

不需要。`routing.mode` 支持 `"prefix-no-default"`（默认，例如 `/about` 与 `/fr/about`）、`"prefix-all"`、`"no-prefix"` 和 `"search-params"`，而 `routing.domains` 可将每个语言环境映射到独立域名。请参阅 [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Question>

<Question title="如何在 Nuxt 中处理 SEO 元数据和 hreflang 标签？">

本指南的第 9 步对此进行了介绍。本地化的 `useHead` 元数据直接来自您的字典，而 `getMultilingualUrls` 会为每个声明的语言环境构建 `hreflang` 备用链接（包括 `x-default`），同时为本地化站点地图提供数据。

</Question>

<Question title="如何构建保留当前页面的语言切换器？">

使用 `useLocale` 获取活动和可用的语言环境，配合第 8 步中的本地化链接组件保持语言状态导航。`getLocalizedUrl` 会将当前路径重写为目标语言环境，使切换语言时读者保留在相同路由上。

</Question>

<Question title="如何使用 AI 自动翻译 Nuxt 应用？">

运行 `npx intlayer fill`。它会使用您选择的 LLM、您自己的提供商和 API 密钥填充缺失的翻译，并且 `--git-diff` 参数可将处理范围限制在当前分支修改的内容。请参阅 [fill 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/fill.md) 和 [CI/CD 集成](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/CI_CD.md)。

</Question>

<Question title="Intlayer 是否支持 Vue 模板中的复数、性别和富文本？">

支持：包括 [复数形式](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/plurial.md)、[基于性别的内容](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/gender.md)、条件渲染、插值用的 [插入内容 (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/insertion.md)、[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/markdown.md)，以及用于数字、日期和货币的 [格式化工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/formatters.md)。

</Question>

<Question title="翻译人员如何无需接触代码即可编辑内容？">

可以通过自托管的 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)（任何人都可以直接在运行中的应用上就地修改文案），或通过 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 进行无需重新部署的内容外部化更新。

</Question>

<Question title="Intlayer 是免费且开源的吗？">

是的，基于 Apache 2.0 许可证开源，包含商业用途。托管版 CMS 是可选的付费服务，同时完全支持 [自托管](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md)。

</Question>

</FAQ>
