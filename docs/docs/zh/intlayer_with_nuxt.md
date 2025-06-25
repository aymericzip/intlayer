---
docName: intlayer_with_nuxt
url: https://intlayer.org/doc/environment/nuxt-and-vue
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nuxt.md
createdAt: 2025-06-18
updatedAt: 2025-06-18
title: 翻译你的Nuxt和Vue网站 (i18n)
description: 了解如何使您使用 Nuxt 和 Vue 构建的网站实现多语言支持。请参阅文档以进行国际化（i18n）和翻译。
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
---

# 开始使用 Intlayer 和 Nuxt 进行国际化 (i18n)

请参阅 GitHub 上的 [应用模板](https://github.com/aymericzip/intlayer-nuxt-template)。

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，通过组件级别的声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动补全和错误检测能力。
- **享受高级功能**，如动态语言检测和切换。

---

## 在 Nuxt 应用中设置 Intlayer 的分步指南

### 第一步：安装依赖

使用 npm 安装必要的包：

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

- **intlayer**

  提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_cli.md) 的核心包。

- **vue-intlayer**
  将 Intlayer 集成到 Vue 应用中的包。它为 Vue 组件提供可组合的功能。

- **nuxt-intlayer**
  将 Intlayer 集成到 Nuxt 应用中的模块。它提供自动设置、用于语言检测的中间件、Cookie 管理和 URL 重定向。

### 第二步：配置您的项目

创建一个配置文件来配置您的应用语言：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
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
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
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
      // 您的其他语言
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["."],
  },
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅 [配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

### 第三步：在 Nuxt 配置中集成 Intlayer

将 intlayer 模块添加到您的 Nuxt 配置中：

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... 您现有的 Nuxt 配置
  modules: ["nuxt-intlayer"],
});
```

> `nuxt-intlayer` 模块自动处理 Intlayer 与 Nuxt 的集成。它设置内容声明构建，监控开发模式下的文件，提供用于语言检测的中间件，并管理本地化路由。

### 第四步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="components/helloWorld.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      zh: "编辑 <code>components/HelloWorld.vue</code> 并保存以测试 HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      zh: "查看 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      zh: "Nuxt Intlayer 文档",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      zh: "在此了解更多关于 Nuxt 的信息 ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      zh: "Nuxt 文档",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      zh: "点击 Nuxt 标志以了解更多信息",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      zh: "编辑 <code>components/HelloWorld.vue</code> 并保存以测试 HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      zh: "查看 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      zh: "Nuxt Intlayer 文档",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      zh: "在此了解更多关于 Nuxt 的信息 ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      zh: "Nuxt 文档",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      zh: "点击 Nuxt 标志以了解更多信息",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

```javascript fileName="components/helloWorld.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      zh: "计数是 ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      zh: "编辑 <code>components/HelloWorld.vue</code> 并保存以测试 HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      zh: "查看 ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    nuxtIntlayer: t({
      zh: "Nuxt Intlayer 文档",
      en: "Nuxt Intlayer documentation",
      fr: "Documentation de Nuxt Intlayer",
      es: "Documentación de Nuxt Intlayer",
    }),
    learnMore: t({
      zh: "在此了解更多关于 Nuxt 的信息 ",
      en: "Learn more about Nuxt in the ",
      fr: "En savoir plus sur Nuxt dans la ",
      es: "Aprenda más sobre Nuxt en la ",
    }),
    nuxtDocs: t({
      zh: "Nuxt 文档",
      en: "Nuxt Documentation",
      fr: "Documentation Nuxt",
      es: "Documentación de Nuxt",
    }),
    readTheDocs: t({
      zh: "点击 Nuxt 标志以了解更多信息",
      en: "Click on the Nuxt logo to learn more",
      fr: "Cliquez sur le logo Nuxt pour en savoir plus",
      es: "Haga clic en el logotipo de Nuxt para obtener más información",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="components/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "zh": "计数是 ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "zh": "编辑 <code>components/HelloWorld.vue</code> 并保存以测试 HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "zh": "查看 ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "nuxtIntlayer": {
      "nodeType": "translation",
      "translation": {
        "zh": "Nuxt Intlayer 文档",
        "en": "Nuxt Intlayer documentation",
        "fr": "Documentation de Nuxt Intlayer",
        "es": "Documentación de Nuxt Intlayer"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "zh": "在以下位置了解更多关于 Nuxt 的信息 ",
        "en": "Learn more about Nuxt in the ",
        "fr": "En savoir plus sur Nuxt dans la ",
        "es": "Aprenda más sobre Nuxt en la "
      }
    },
    "nuxtDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "Nuxt 文档",
        "en": "Nuxt Documentation",
        "fr": "Documentation Nuxt",
        "es": "Documentación de Nuxt"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "点击 Nuxt 标志以了解更多信息",
        "en": "Click on the Nuxt logo to learn more",
        "fr": "Cliquez sur le logo Nuxt pour en savoir plus",
        "es": "Haga clic en el logotipo de Nuxt para obtener más información"
      }
    }
  }
}
```

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。

> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/get_started.md)。

### 第五步：在代码中使用 Intlayer

通过 `useIntlayer` 可组合函数，在整个 Nuxt 应用程序中访问您的内容字典：

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

#### 在 Intlayer 中访问内容

Intlayer 提供两种 API 来访问您的内容：

- **基于组件的语法**（推荐）：
  使用 `<myContent />` 语法将内容呈现为 Intlayer 节点。这与 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 和 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 无缝集成。

- **基于字符串的语法**：
  使用 `{{ myContent }}` 将内容呈现为纯文本，无任何交互性。

### （可选）第六步：更改内容的语言

要更改内容的语言，您可以使用 `useLocale` 可组合函数提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

创建一个组件以在语言之间切换：

```vue fileName="components/LocaleSwitcher.vue"
<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// 获取语言环境信息和 setLocale 函数
const { locale, availableLocales, setLocale } = useLocale();

// 使用 ref 跟踪选定的语言环境
const selectedLocale = ref(locale.value);

// 当选择更改时更新语言环境
const changeLocale = () => setLocale(selectedLocale.value);

// 将 selectedLocale 与全局语言环境保持同步
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
</template>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}

select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
```

然后，在您的页面或布局中使用此组件：

```vue fileName="app.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";

const content = useIntlayer("app"); // 创建相关的 intlayer 声明文件
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
```

### （可选）第七步：为您的应用程序添加本地化路由

使用 `nuxt-intlayer` 模块时，Nuxt 会自动处理本地化路由。这会根据您的页面目录结构为每种语言自动创建路由。

示例：

```plaintext
pages/
├── index.vue          → /, /zh, /fr, /es
├── about.vue          → /about, /zh/about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /zh/contact, /fr/contact, /es/contact
```

要创建本地化页面，只需在 `pages/` 目录中创建您的 Vue 文件：

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about");
</script>

<template>
  <div>
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
  </div>
</template>
```

`nuxt-intlayer` 模块将自动：

- 检测用户的首选语言环境
- 通过 URL 处理语言环境切换
- 设置适当的 `<html lang="">` 属性
- 管理语言环境 Cookie
- 将用户重定向到适当的本地化 URL

### （可选）第八步：创建本地化链接组件

为了确保您的应用程序导航符合当前语言环境，您可以创建一个自定义 `LocalizedLink` 组件。此组件会自动为内部 URL 添加当前语言的前缀。

```vue fileName="components/LocalizedLink.vue"
<template>
  <NuxtLink :to="localizedHref" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// 检查链接是否为外部链接
const isExternalLink = computed(() => /^https?:\/\//.test(props.to || ""));

// 为内部链接创建本地化 href
const localizedHref = computed(() =>
  isExternalLink.value ? props.to : getLocalizedUrl(props.to, locale.value)
);
</script>
```

然后在整个应用程序中使用此组件：

```vue fileName="pages/index.vue"
<template>
  <div>
    <LocalizedLink to="/about">
      {{ content.aboutLink }}
    </LocalizedLink>

    <LocalizedLink to="/zh/contact">
      {{ content.contactLink }}
    </LocalizedLink>
  </div>
</template>

<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import LocalizedLink from "~/components/LocalizedLink.vue";

const content = useIntlayer("home");
</script>
```

### （可选）步骤 9：处理元数据和 SEO

Nuxt 提供了出色的 SEO 功能。您可以使用 Intlayer 来处理本地化的元数据：

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useSeoMeta } from "nuxt/app";
import { getIntlayer } from "intlayer";
import { useLocale } from "vue-intlayer";

const { locale } = useLocale();
const content = getIntlayer("about-meta", locale.value);

useSeoMeta({
  title: content.title,
  description: content.description,
});
</script>

<template>
  <div>
    <h1>{{ content.pageTitle }}</h1>
    <p>{{ content.pageContent }}</p>
  </div>
</template>
```

创建相应的内容声明：

```typescript fileName="pages/about-meta.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { useSeoMeta } from "nuxt/app";

const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
} satisfies Dictionary<Parameters<typeof useSeoMeta>[0]>;

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

export default aboutMetaContent;
```

```typescript fileName="pages/about-meta.content.js" contentDeclarationFormat="cjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const aboutMetaContent = {
  key: "about-meta",
  content: {
    title: t({
      zh: "关于我们 - 我的公司",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    description: t({
      zh: "了解更多关于我们公司和我们的使命",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
  },
};

module.exports = aboutMetaContent;
```

```json fileName="pages/about-meta.content.json" contentDeclarationFormat="json"
{
  "key": "about-meta",
  "content": {
    "title": {
      "nodeType": "translation",
      "translations": {
        "zh": "关于我们 - 我的公司",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "description": {
      "nodeType": "translation",
      "translations": {
        "zh": "了解更多关于我们公司和我们的使命",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    }
  }
}
```

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强大。

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

确保您的 TypeScript 配置包含自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 您现有的 TypeScript 配置
  "include": [
    // ... 您现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略由 Intlayer 生成的文件。这可以避免将它们提交到您的 Git 仓库中。

为此，您可以将以下指令添加到 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了改善您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **翻译键的自动补全**。
- **实时错误检测**，用于缺失的翻译。
- **翻译内容的内联预览**。
- **快速操作**，轻松创建和更新翻译。

有关如何使用扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 更进一步

## 要更进一步，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) 外部化您的内容。
