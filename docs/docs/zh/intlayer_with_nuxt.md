---
createdAt: 2025-06-18
updatedAt: 2025-12-07
title: 如何翻译您的 Nuxt 和 Vue 应用 – 2025 年 i18n 指南
description: 了解如何使您的 Nuxt 和 Vue 网站支持多语言。按照文档进行国际化（i18n）和翻译。
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
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 7.3.11
    date: 2025-12-07
    changes: 更新 LocaleSwitcher、SEO、元数据
  - version: 5.5.10
    date: 2025-06-29
    changes: 初始化历史记录
---

# 使用 Intlayer 翻译您的 Nuxt 和 Vue 网站 | 国际化 (i18n)

## 目录

<TOC/>

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化（i18n）库，旨在简化现代 Web 应用中的多语言支持。

使用 Intlayer，您可以：

- **通过组件级声明式字典轻松管理翻译**。
- **动态本地化元数据、路由和内容**。
- **确保 TypeScript 支持**，通过自动生成类型，提升自动补全和错误检测能力。
- **享受高级功能**，如动态语言环境检测和切换。

---

## 在 Nuxt 应用中设置 Intlayer 的分步指南

<Tab defaultTab="video">
  <TabItem label="视频" value="video">
  
<iframe title="如何使用 Intlayer 翻译你的 Nuxt 和 Vue 应用？探索 Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="代码" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nuxt-4-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

### 第一步：安装依赖

查看 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-nuxt-4-template)。

使用 npm 安装必要的包：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
bunx intlayer init
```

- **intlayer**

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译以及[CLI命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **vue-intlayer**
  将 Intlayer 集成到 Vue 应用中的包。它提供了 Vue 组件的组合式函数。

- **nuxt-intlayer**
  集成 Intlayer 与 Nuxt 应用的 Nuxt 模块。它提供自动设置、用于语言环境检测的中间件、Cookie 管理和 URL 重定向。

### 第2步：配置您的项目

创建一个配置文件来配置您应用的语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言环境
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 你的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 你的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在您的 Nuxt 配置中集成 Intlayer

将 intlayer 模块添加到您的 Nuxt 配置中：

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 您现有的 Nuxt 配置
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` 模块会自动处理 Intlayer 与 Nuxt 的集成。它设置内容声明的构建，监控开发模式下的文件，提供用于语言环境检测的中间件，并管理本地化路由。

### 第4步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们包含在 `contentDir` 目录中（默认是 `./src`），并且匹配内容声明文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

### 第5步：在代码中使用 Intlayer

在整个 Nuxt 应用中使用 `useIntlayer` 组合式函数访问您的内容字典：

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String, // 消息属性
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld"); // 使用名为 "helloworld" 的内容字典
const countRef = ref(0); // 计数引用
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
    >，<nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>。
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

### （可选）步骤6：更改内容语言

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

### （可选）步骤 6b：创建带导航的布局

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

### （可选）步骤 7：为您的应用添加本地化路由

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

### （可选）步骤 8：创建本地化链接组件

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

### （可选）步骤 9：处理元数据和 SEO

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

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="pages/about-page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      en: "关于我们 - 我的公司",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      zh: "关于我们",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
};

export default aboutPageContent;
```

```javascript fileName="pages/about-page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      zh: "关于我们 - 我的公司",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "关于我们 - 我的公司",
    }),
    metaDescription: t({
      en: "了解更多关于我们的公司和我们的使命",
      fr: "了解更多关于我们的公司和我们的使命",
      es: "了解更多关于我们的公司和我们的使命",
    }),
    title: t({
      en: "关于我们",
      fr: "关于我们",
      es: "关于我们",
    }),
  },
};

module.exports = aboutPageContent;
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
