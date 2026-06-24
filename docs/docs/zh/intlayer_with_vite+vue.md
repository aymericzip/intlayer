---
createdAt: 2025-04-18
updatedAt: 2026-06-23
title: "Vite + Vue i18n - 翻译你的应用的完整指南"
description: "告别 i18next。2026 年构建多语言 (i18n) Vite + Vue 应用的完整指南。使用 AI 代理翻译并优化包体积、SEO 和性能。"
keywords:
  - 国际化
  - 文档
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
applicationShowcase: https://intlayer-vite-vue-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "更新 Solid useIntlayer API 用法以直接访问属性"
  - version: 7.5.9
    date: 2025-12-30
    changes: "添加 init 命令"
  - version: 5.5.10
    date: 2025-06-29
    changes: "初始化历史记录"
author: aymericzip
---

# 使用Intlayer翻译您的Vite and Vue | 国际化(i18n)

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-vite-vue-template)。

## 目录

<TOC/>

## 为什么选择 Inlayer 而不是替代品？

与“vue-i18n”或“i18next”等主要解决方案相比，Intlayer是一个具有集成优化的解决方案，例如：

<AccordionGroup>

<Accordion header="完整的 Vue 覆盖">

Intlayer 经过优化，可与 Vue 完美配合，提供**组件级内容范围**、**反应式翻译**以及​​扩展国际化 (i18n) 所需的所有功能。

</Accordion>

<Accordion header="捆绑尺寸">

不要将大量 JSON 文件加载到页面中，而只需加载必要的内容。 Intlayer 有助于**将捆绑包和页面大小减少多达 50%**。

</Accordion>

<Accordion header="可维护性">

确定应用程序内容的范围**有利于大型应用程序的维护**。您可以复制或删除单个功能文件夹，而无需承担检查整个内容代码库的精神负担。此外，Intlayer 具有**完全类型化 (fully typed)**，以确保您的内容的准确性。

</Accordion>

<Accordion header="人工智能代理">

共置内容**减少大型语言模型 (LLM) 所需的上下文**。 Intlayer 还附带了一套工具，例如用于测试缺失翻译的 **CLI**、**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**、**[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** 和 **[agent技能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**，使 AI 代理的开发者体验 (DX) 更加流畅。

</Accordion>

<Accordion header="自动化">

使用您选择的法学硕士，通过自动化在 CI/CD 管道中进行翻译，而费用由您的 AI 提供商承担。 Intlayer 还提供了一个**编译器**来自动提取内容，以及一个[网络平台](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)来帮助**在后台翻译**。

</Accordion>

<Accordion header="表现">

将大量 JSON 文件连接到组件可能会导致性能和反应性问题。 Intlayer 可在构建时 (build time)优化您的内容加载。

</Accordion>

<Accordion header="无需开发即可扩展">

Intlayer 不仅仅是一个 i18n 解决方案，还提供了一个**自托管的[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)**和一个**[完整的 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** 来帮助您管理多语言内容**实时**，与译员、文案人员和其他团队成员无缝协作。内容可以本地和/或远程存储。

</Accordion>
</AccordionGroup>

---

## 在 Vite 和 Vue 应用中设置 Intlayer 的分步指南

<Tabs defaultTab="video">
  <Tab label="视频" value="video">
  
<iframe title="The best i18n solution for Vite and Vue? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="代码" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vue-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - 如何使用 Intlayer 实现应用国际化"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="演示" value="demo">

<iframe
  src="https://intlayer-vite-vue-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="演示 - intlayer-vite-vue-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-vite-vue-template)。

<Steps>

<Step number={1} title="安装依赖">

使用 npm 安装所需的包：

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> `--interactive` 标志是可选的。如果您是 AI 代理，请使用 `intlayer-cli init`。

> 该命令将检测您的环境并安装所需的软件包。例如：

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  核心包，提供国际化工具，用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)、转译以及[命令行工具](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/index.md)。

- **vue-intlayer**
  将 Intlayer 集成到 Vue 应用中的包，提供 Vue 国际化的上下文提供者和组合式函数。

- **vite-intlayer**
  包含用于将 Intlayer 集成到 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言环境、管理 Cookie 和处理 URL 重定向的中间件。

</Step>

<Step number={2} title="配置您的项目">

创建一个配置文件来配置应用程序的语言：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> 通过此配置文件，您可以设置本地化的 URL、中间件重定向、cookie 名称、内容声明的位置和扩展名，禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)。

</Step>

<Step number={3} title="在您的 Vite 配置中集成 Intlayer">

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

> `intlayer()` Vite 插件用于将 Intlayer 集成到 Vite 中。它确保构建内容声明文件并在开发模式下监视这些文件。在 Vite 应用中定义了 Intlayer 环境变量。此外，它还提供别名以优化性能。

</Step>

<Step number={4} title="声明您的内容">

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t({
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({ en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
    officialStarter: t({
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      zh: "了解更多关于 Vue 的 IDE 支持，详见 ",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      zh: "Vue 文档扩展指南",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
      zh: "点击 Vite 和 Vue 标志以了解更多信息",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "zh": "计数是 "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "zh": "编辑 <code>components/HelloWorld.vue</code> 并保存以测试热模块替换（HMR）"
      }
    },
        "zh": "编辑 <code>components/HelloWorld.vue</code> 并保存以测试 HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe ",
        "zh": "查看 "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite",
        "zh": "官方 Vue + Vite 启动模板"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el ",
        "zh": "了解更多关于 Vue 的 IDE 支持，详见 "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide",
        "zh": "Vue 文档扩展指南"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información",
        "zh": "点击 Vite 和 Vue 标志了解更多"
      }
    }
  }
}
```

> 您的内容声明可以定义在应用程序中的任何位置，只要它们被包含在 `contentDir` 目录中（默认是 `./src`）。并且文件扩展名需匹配内容声明的文件扩展名（默认是 `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`）。

> 更多详情，请参阅[内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/dictionary/content_file.md)。

</Step>

<Step number={5} title="在代码中使用 Intlayer">

要在整个 Vue 应用中使用 Intlayer 的国际化功能，首先需要在主文件中注册 Intlayer 单例实例。这一步非常关键，因为它为应用中的所有组件提供了国际化上下文，使得翻译内容可以在组件树中的任何位置访问。

```javascript fileName=main.js
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 在顶层注入提供者
app.use(intlayer);

// 挂载应用
app.mount("#app");
```

通过创建主 Vue 组件并使用 `useIntlayer` 组合函数，可以在整个应用中访问内容字典：

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >，<officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### 在 Intlayer 中访问内容

Intlayer 提供了多种 API 来访问您的内容：

- **基于组件的语法**（推荐）：
  使用 `<myContent />` 或 `<Component :is="myContent" />` 语法将内容渲染为 Intlayer 节点。这与[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)和[内容管理系统](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)无缝集成。

- **基于字符串的语法**：
  使用 `{{ myContent }}` 将内容渲染为纯文本，不支持可视化编辑器。

- **原始 HTML 语法**：
  使用 `<div v-html="myContent" />` 来渲染内容为原始 HTML，不支持可视化编辑器。

- **解构语法**：
  `useIntlayer` 组合函数返回一个包含内容的 Proxy。该 Proxy 可以被解构以访问内容，同时保持响应性。
  - 使用 `const content = useIntlayer("myContent");` 并通过 `{{ content.myContent }}` / `<content.myContent />` 访问内容。
  - 或者使用 `const { myContent } = useIntlayer("myContent");` 并通过 `{{ myContent }}` / `<myContent/>` 解构访问内容。

> 如果您的应用程序已经存在，您可以结合使用 [Intlayer 编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) 和 [提取命令](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 在一秒钟内转换成干个组件。

<Steps>

</Step>

<Step number={6} title="更改内容语言">

要更改内容的语言，可以使用 `useLocale` 组合函数提供的 `setLocale` 函数。该函数允许你设置应用的语言环境，并相应地更新内容。

创建一个组件以切换语言：

```vue fileName="src/components/LocaleSwitcher.vue"
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

// 获取语言信息和 setLocale 函数
const { locale, availableLocales, setLocale } = useLocale();

// 使用 ref 跟踪选中的语言
const selectedLocale = ref(locale.value);

// 当选择更改时更新语言
const changeLocale = () => setLocale(selectedLocale.value);

// 保持 selectedLocale 与全局 locale 同步
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

然后，在你的 App.vue 中使用该组件：

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // 创建相关的 intlayer 声明文件
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

</Step>

<Step number={7} title="为您的应用添加本地化路由">

在 Vue 应用中添加本地化路由通常涉及使用带有语言前缀的 Vue Router。这为每种语言创建唯一的路由，有助于 SEO 和 SEO 友好的 URL。

示例：

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

首先，安装 Vue Router：

```bash packageManager="npm"
npm install vue-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add vue-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add vue-router
```

然后，创建一个处理基于语言环境路由的路由配置：

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from "vue-intlayer";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * 声明带有语言环境特定路径和元数据的路由。
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// 创建路由实例
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加导航守卫以处理语言环境
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // 重用路由元信息中定义的语言环境
  client.setLocale(metaLocale);
  next();
});
```

> 名称用于在路由器中识别路由。它应在所有路由中唯一，以避免冲突并确保正确的导航和链接。

然后，在你的 main.js 文件中注册路由器：

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// 将路由器添加到应用中
app.use(router);

// 挂载应用
app.mount("#app");
```

然后更新你的 `App.vue` 文件以渲染 RouterView 组件。该组件将显示当前路由匹配的组件。

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

同时，你也可以使用 `intlayerProxy` 为你的应用添加服务器端路由。该插件会根据 URL 自动检测当前语言环境并设置相应的语言环境 cookie。如果未指定语言环境，插件将根据用户浏览器的语言偏好确定最合适的语言环境。如果仍未检测到语言环境，则会重定向到默认语言环境。

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    vue(),
    intlayer(),
  ],
});
```

</Step>

<Step number={8} title="当语言环境变化时更改 URL">

为了在用户更改语言时自动更新 URL，您可以修改 `LocaleSwitcher` 组件以使用 Vue Router：

```vue fileName="src/components/LocaleSwitcher.vue"
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
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// 获取 Vue Router 实例
const router = useRouter();

// 获取语言信息和设置语言的函数
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // 获取当前路由并创建本地化的 URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // 导航到本地化路由而不重新加载页面
    router.push(localizedPath);
  },
});

// 使用 ref 跟踪选中的语言
const selectedLocale = ref(locale.value);

// 当选择更改时更新语言环境
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// 保持 selectedLocale 与全局语言环境同步
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

提示：为了更好的 SEO 和可访问性，使用如 `<a href="/fr/home" hreflang="fr">` 这样的标签来链接到本地化页面，如步骤10所示。这允许搜索引擎正确发现和索引特定语言的 URL。为了保持 SPA 行为，可以通过 @click.prevent 阻止默认导航，使用 useLocale 更改语言环境，并通过 Vue Router 编程式导航。

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="切换到英语"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>英语</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="切换到西班牙语"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>西班牙语</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

</Step>

<Step number={9} title="切换HTML的语言和方向属性">

当您的应用支持多种语言时，更新`<html>`标签的`lang`和`dir`属性以匹配当前语言环境至关重要。这样做可以确保：

- **无障碍访问**：屏幕阅读器和辅助技术依赖正确的 `lang` 属性来准确发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以正确的顺序呈现（例如，英语为从左到右，阿拉伯语或希伯来语为从右到左），这对于可读性至关重要。
- **搜索引擎优化（SEO）**：搜索引擎使用 `lang` 属性来确定页面的语言，有助于在搜索结果中提供正确的本地化内容。

通过在语言环境变化时动态更新这些属性，您可以确保所有支持语言的用户都获得一致且无障碍的体验。

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 组合函数，根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性。
 *
 * @example
 * // 在你的 App.vue 或全局组件中
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // 每当语言环境变化时更新 HTML 属性
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // 更新语言属性
      document.documentElement.lang = newLocale;

      // 设置文本方向（大多数语言为从左到右，阿拉伯语、希伯来语等为从右到左）
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

在你的 `App.vue` 或全局组件中使用此组合函数：

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// 根据当前语言环境应用 HTML 属性
useI18nHTMLAttributes();
</script>

<template>
  <!-- 你的应用模板 -->
</template>
```

</Step>

<Step number={10} title="创建本地化链接组件">

为了确保您的应用程序导航遵循当前的语言环境，您可以创建一个自定义的 `Link` 组件。该组件会自动在内部 URL 前添加当前语言的前缀。例如，当讲法语的用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about`，而不是 `/about`。

这种行为有几个好处：

- **SEO 和用户体验**：本地化的 URL 有助于搜索引擎正确索引特定语言的页面，并为用户提供其偏好的语言内容。
- **一致性**：通过在整个应用中使用本地化链接，您可以确保导航保持在当前语言环境内，避免意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中简化了 URL 的管理，使您的代码库更易于维护和扩展，随着应用程序的增长。

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// 检查链接是否为外部链接
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// 为内部链接创建本地化的 href
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

用于 Vue Router，创建一个路由专用版本：

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// 为 router-link 创建本地化的 to 属性
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // 如果 'to' 是一个对象，则本地化 path 属性
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>
```

在您的应用程序中使用这些组件：

```vue fileName="src/App.vue"
<template>
  <div>
    <!-- Vue 路由 -->
    <RouterLink to="/">根目录</RouterLink>
    <RouterLink to="/home">首页</RouterLink>
    <!-- 其他 -->
    <Link href="/">根目录</Link>
    <Link href="/home">首页</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

</Step>

<Step number={11} title="提取组件内容" isOptional={true}>

如果您有现有的代码库，转换数千个文件可能会非常耗时。

为了简化此过程，Intlayer 提出了 [编译器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/compiler.md) / [提取器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/extract.md) 来转换您的组件并提取内容。

要进行设置，您可以在 `intlayer.config.ts` 文件中添加 `compiler` 部分：

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 您的其他配置
  compiler: {
    /**
     * 指示是否应启用编译器。
     */
    enabled: true,

    /**
     * 定义输出文件路径
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * 指示在转换后是否应保存组件。这样，编译器只需运行一次即可转换应用程序，然后即可将其删除。
     */
    saveComponents: false,

    /**
     * 字典键前缀
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='提取命令'>

运行提取器以转换组件并提取内容

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

更新您的 `vite.config.ts` 以包含 `intlayerCompiler` 插件：

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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### （可选）站点地图与 robots.txt（构建时生成）

Intlayer 提供 `generateSitemap` 与 `getMultilingualUrls`，可将面向爬虫的多语言 `sitemap.xml` 和 `robots.txt` 格式化并自动写入 `public/`。实践中在 Vite **之前**运行小型 Node 脚本（例如 npm 的 `predev` / `prebuild`）即可在构建或开发时生成这些文件。

#### 站点地图

Intlayer 的站点地图生成会尊重你的语言配置，并包含爬虫所需的元数据。

> 生成的站点地图支持 `xhtml:link`（hreflang）。与只列出扁平 URL 不同，Intlayer 会在各语言版本之间建立双向关联（例如 `/about`、`/fr/about` 或 `/about?lang=fr`，取决于路由模式）。

#### Robots.txt

使用 `getMultilingualUrls`，使 `Disallow` 覆盖敏感路径的每一种本地化写法。

#### 1. 在项目根目录添加 `generate-seo.mjs`

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, { siteUrl: SITE_URL });
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

需已安装 `intlayer` 以便脚本导入。生产环境请设置环境变量 `SITE_URL`（例如在 CI 中）。

> 建议在 Node 中使用 `generate-seo.mjs`（ESM）。若使用 `generate-seo.js`，请在 `package.json` 中设置 `"type": "module"` 或以其他方式启用 ESM。

#### 2. 在运行 Vite 之前执行脚本

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

若使用 pnpm 或 yarn，请相应调整命令；也可在 CI 或其他步骤中调用该脚本。

### 配置 TypeScript

Intlayer 使用模块扩展 (module augmentation) 来利用 TypeScript 的优势，并使你的 codebase 更强大。

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

确保你的 TypeScript 配置包含了自动生成的类型。

```json5 fileName="tsconfig.json"
{
  // ... 你现有的 TypeScript 配置
  "include": [
    // ... 你现有的 TypeScript 配置
    ".intlayer/**/*.ts", // 包含自动生成的类型
  ],
}
```

### Git 配置

建议忽略由 Intlayer 生成的文件。这可以让你避免将它们提交到你的 Git 仓库。

为此，你可以将以下指令添加到你的 `.gitignore` 文件中：

```plaintext fileName=".gitignore"
# 忽略由 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升使用 Intlayer 的开发体验，你可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code 市场安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

该扩展提供：

- 翻译键的**自动补全**。
- 针对缺失翻译的**实时错误检测**。
- 已翻译内容的**行内预览**。
- 轻松创建和更新翻译的**快速操作**。

有关如何使用该扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/zh/doc/vs-code-extension)。

---

### 深入了解

要进一步使用，您可以实现[可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_visual_editor.md)或使用[内容管理系统（CMS）](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)将内容外部化。
