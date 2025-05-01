# 开始使用 Intlayer 和 Vite 和 Vue 进行国际化 (i18n)

> 此软件包正在开发中。有关更多信息，请参阅[问题](https://github.com/aymericzip/intlayer/issues/113)。通过点赞问题来表达您对 Vue 的 Intlayer 的兴趣。

<!-- 请参阅 GitHub 上的[应用模板](https://github.com/aymericzip/intlayer-vue-template)。 -->

## 什么是 Intlayer？

**Intlayer** 是一个创新的开源国际化 (i18n) 库，旨在简化现代 Web 应用程序中的多语言支持。

使用 Intlayer，您可以：

- **轻松管理翻译**，使用组件级别的声明式字典。
- **动态本地化元数据**、路由和内容。
- **确保 TypeScript 支持**，通过自动生成类型，提高自动补全和错误检测。
- **受益于高级功能**，如动态语言检测和切换。

---

## 在 Vite 和 Vue 应用程序中设置 Intlayer 的分步指南

### 第 1 步：安装依赖项

使用 npm 安装必要的软件包：

```bash packageManager="npm"
npm install intlayer vue-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer vite-intlayer
```

- **intlayer**

  提供用于配置管理、翻译、[内容声明](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)、转译和 [CLI 命令](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md) 的核心包。

- **vue-intlayer**
  将 Intlayer 集成到 Vue 应用程序中的包。它为 Vue 国际化提供上下文提供者和组合式 API。

- **vite-intlayer**
  包括将 Intlayer 集成到 [Vite 打包工具](https://vite.dev/guide/why.html#why-bundle-for-production) 的 Vite 插件，以及用于检测用户首选语言、管理 Cookie 和处理 URL 重定向的中间件。

### 第 2 步：配置您的项目

创建一个配置文件来配置您的应用程序的语言：

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
};

module.exports = config;
```

> 通过此配置文件，您可以设置本地化 URL、中间件重定向、Cookie 名称、内容声明的位置和扩展名、禁用控制台中的 Intlayer 日志等。有关可用参数的完整列表，请参阅[配置文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/configuration.md)。

### 第 3 步：在您的 Vite 配置中集成 Intlayer

将 intlayer 插件添加到您的配置中。

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin()],
});
```

> `intlayerPlugin()` Vite 插件用于将 Intlayer 与 Vite 集成。它确保在开发模式下构建内容声明文件并监视它们。它在 Vite 应用程序中定义了 Intlayer 环境变量。此外，它提供了优化性能的别名。

### 第 4 步：声明您的内容

创建并管理您的内容声明以存储翻译：

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat="typescript"
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
    officialStarter: t({
      zh: "，官方 Vue + Vite 启动器",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      zh: "了解更多关于 Vue 的 IDE 支持的信息，参见 ",
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
      zh: "点击 Vite 和 Vue 的标志以了解更多信息",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```javascript fileName="src/helloWorld.content.mjs" contentDeclarationFormat="esm"
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
    officialStarter: t({
      zh: "官方 Vue + Vite 启动器",
      en: "the official Vue + Vite starter",
      fr: "le starter officiel Vue + Vite",
      es: "el starter oficial Vue + Vite",
    }),
    learnMore: t({
      zh: "了解更多关于 Vue 的 IDE 支持的信息，参见 ",
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
      zh: "点击 Vite 和 Vue 的标志以了解更多信息",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
};

export default helloWorldContent;
```

---

const { t } = require("intlayer");

/\*_ @type {import('intlayer').Dictionary} _/
const appContent = {
key: "helloworld",
content: {
count: t({ zh: "计数是 ", en: "count is ", fr: "le compte est ", es: "el recuento es " }),
edit: t({
zh: "编辑 <code>components/HelloWorld.vue</code> 并保存以测试 HMR",
en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
}),
checkOut: t({ zh: "查看 ", en: "Check out ", fr: "Vérifiez ", es: "Compruebe " }),
officialStarter: t({
zh: "官方 Vue + Vite 启动器",
en: "the official Vue + Vite starter",
fr: "le starter officiel Vue + Vite",
es: "el starter oficial Vue + Vite",
}),
learnMore: t({
zh: "在以下内容中了解更多关于 Vue 的 IDE 支持",
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
zh: "点击 Vite 和 Vue 的标志以了解更多信息",
en: "Click on the Vite and Vue logos to learn more",
fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
}),
},
};

module.exports = appContent;

````

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
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
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "zh": "官方 Vue + Vite 启动器",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "zh": "在以下内容中了解更多关于 Vue 的 IDE 支持",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "Vue 文档扩展指南",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "zh": "点击 Vite 和 Vue 的标志以了解更多信息",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
````

> 您的内容声明可以在应用程序中的任何位置定义，只要它们包含在 `contentDir` 目录中（默认情况下为 `./src`）。并匹配内容声明文件扩展名（默认情况下为 `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`）。
> 有关更多详细信息，请参阅 [内容声明文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/dictionary/get_started.md)。

### 第五步：在您的代码中使用 Intlayer

要在整个 Vue 应用程序中使用 Intlayer 的国际化功能，首先需要在主文件中注册 Intlayer 单例实例。这一步骤至关重要，因为它为应用程序中的所有组件提供了国际化上下文，使翻译可以在组件树的任何地方访问。

```javascript fileName=main.js
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// 在顶层注入提供者
installIntlayer(app);

// 挂载应用程序
app.mount("#app");
```

通过创建主 Vue 组件并使用 `useIntlayer` 可组合函数，在整个应用程序中访问您的内容字典：

```vue fileName="src/HelloWord.vue"
<script setup>
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const content = useIntlayer("helloworld");
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>
```

> 如果您想在属性中使用内容，例如 `alt`、`title`、`href`、`aria-label` 等，您必须使用 `.value` 调用函数的值，例如：
>
> ```html
> <img src="./logo.svg" :alt="content.image.value" />
> ```

### （可选）第六步：更改内容的语言

要更改内容的语言，可以使用 `useLocale` 可组合函数提供的 `setLocale` 函数。此函数允许您设置应用程序的语言环境并相应地更新内容。

创建一个组件以在语言之间切换：

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

<script setup>
import { ref, watch } from "vue";
import { getLocaleName } from "intlayer";
import { useLocale } from "vue-intlayer";

// 获取语言环境信息和 setLocale 函数
const { locale, availableLocales, setLocale } = useLocale();

// 使用 ref 跟踪所选语言环境
const selectedLocale = ref(locale.value);

// 当选择更改时更新语言环境
const changeLocale = () => setLocale(selectedLocale.value);

// 保持 selectedLocale 与全局语言环境同步
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
```

然后，在您的 App.vue 中使用此组件：

```vue fileName="src/App.vue"
<script setup>
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

### （可选）第七步：为您的应用程序添加本地化路由

在 Vue 应用程序中添加本地化路由通常涉及使用带有语言环境前缀的 Vue Router。这为每种语言创建了唯一的路由，这对 SEO 和 SEO 友好的 URL 非常有用。

示例：

```plaintext
- https://example.com/about

- https://example.com/zh/about
- https://example.com/fr/about
```

首先，安装 Vue Router：

```bash packageManager="npm"
npm install intlayer vue-router
```

```bash packageManager="pnpm"
pnpm add intlayer vue-router
```

```bash packageManager="yarn"
yarn add intlayer vue-router
```

然后，创建一个处理基于语言环境路由的路由配置：

```js fileName="src/router/index.ts"
import {
  configuration,
  getPathWithoutLocale,
  localeFlatMap,
  type Locales,
} from 'intlayer';
import { createIntlayerClient } from 'vue-intlayer';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

// 获取国际化配置
const { internationalization, middleware } = configuration;
const { defaultLocale } = internationalization;

/**
 * 声明具有语言环境特定路径和元数据的路由。
 */
const routes = localeFlatMap((localizedData) => [
  {
    path: `${localizedData.urlPrefix}/`,
    name: `Root-${localizedData.locale}`,
    component: RootView,
    meta: {
      locale: localizedData.locale,
    },
  },
  {
    path: `${localizedData.urlPrefix}/home`,
    name: `Home-${localizedData.locale}`,
    component: HomeView,
    meta: {
      locale: localizedData.locale,
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

  const metaLocale = to.meta.locale as Locales | undefined;

  if (metaLocale) {
    // 重用路由元数据中定义的语言环境
    client.setLocale(metaLocale);
    next();
  } else {
    // 回退：元数据中没有语言环境，可能是未匹配的路由
    // 可选：处理 404 或重定向到默认语言环境
    client.setLocale(defaultLocale);

    if (middleware.prefixDefault) {
      next(`/${defaultLocale}${getPathWithoutLocale(to.path)}`);
    } else {
      next(getPathWithoutLocale(to.path));
    }
  }
});
```

> 名称用于标识路由器中的路由。它应该在所有路由中唯一，以避免冲突并确保正确的导航和链接。

然后，在您的 main.js 文件中注册路由器：

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// 将路由器添加到应用程序
app.use(router);

// 挂载应用程序
app.mount("#app");
```

然后更新您的 `App.vue` 文件以渲染 RouterView 组件。此组件将显示当前路由的匹配组件。

```vue fileName="src/App.vue"
<script setup>
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

同时，您还可以使用 `intLayerMiddlewarePlugin` 为您的应用程序添加服务器端路由。此插件将根据 URL 自动检测当前语言环境并设置适当的语言环境 Cookie。如果未指定语言环境，插件将根据用户的浏览器语言偏好确定最合适的语言环境。如果未检测到语言环境，它将重定向到默认语言环境。

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### （可选）步骤 8：当语言环境更改时更改 URL

要在用户更改语言时自动更新 URL，您可以修改 `LocaleSwitcher` 组件以使用 Vue Router：

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

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// 获取 Vue Router
const router = useRouter();

// 获取语言环境信息和 setLocale 函数
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // 获取当前路由并创建本地化 URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // 导航到本地化路由而不重新加载页面
    router.push(localizedPath);
  },
});

// 使用 ref 跟踪选定的语言环境
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

提示：为了更好的 SEO 和可访问性，使用 `<a href="/fr/home" hreflang="fr">` 等标签链接到本地化页面，如步骤 10 所示。这允许搜索引擎正确发现和索引特定语言的 URL。为了保留 SPA 行为，您可以使用 @click.prevent 阻止默认导航，使用 useLocale 更改语言环境，并使用 Vue Router 以编程方式导航。

```html
<ol class="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
  <li>
    <a
      hreflang="x-default"
      aria-label="切换到英语"
      target="_self"
      aria-current="page"
      href="/zh/doc/get-started"
    >
      <div>
        <div><span dir="ltr" lang="en">English</span><span>English</span></div>
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
        <span dir="ltr" lang="es">Español</span><span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

### （可选）步骤 9：切换 HTML 的语言和方向属性

当您的应用程序支持多种语言时，动态更新 `<html>` 标签的 `lang` 和 `dir` 属性以匹配当前语言环境非常重要。这样做可以确保：

- **可访问性**：屏幕阅读器和辅助技术依赖正确的 `lang` 属性来准确地发音和解释内容。
- **文本渲染**：`dir`（方向）属性确保文本以正确的顺序呈现（例如，英语为从左到右，阿拉伯语或希伯来语为从右到左），这对于可读性至关重要。
- **SEO**：搜索引擎使用 `lang` 属性来确定页面的语言，有助于在搜索结果中提供正确的本地化内容。

通过在语言环境更改时动态更新这些属性，您可以为所有支持的语言用户提供一致且可访问的体验。

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * 可组合函数，用于根据当前语言环境更新 HTML <html> 元素的 `lang` 和 `dir` 属性
 *
 * @example
 * // 在您的 App.vue 或全局组件中
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export function useI18nHTMLAttributes() {
  const { locale } = useLocale();

  // 每当语言环境更改时更新 HTML 属性
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // 更新语言属性
      document.documentElement.lang = newLocale;

      // 设置文本方向（大多数语言为 ltr，阿拉伯语、希伯来语等为 rtl）
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
}
```

在您的 `App.vue` 或全局组件中使用此可组合函数：

```vue fileName="src/App.vue"
<script setup>
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// 根据当前语言环境应用 HTML 属性
useI18nHTMLAttributes();
</script>

<template>
  <!-- 您的应用模板 -->
</template>
```

### （可选）步骤 10：创建一个本地化链接组件

为了确保您的应用程序导航符合当前语言环境，您可以创建一个自定义的 `Link` 组件。此组件会自动为内部 URL 添加当前语言的前缀。例如，当法语用户点击“关于”页面的链接时，他们会被重定向到 `/fr/about` 而不是 `/about`。

此行为的好处包括：

- **SEO 和用户体验**：本地化 URL 帮助搜索引擎正确索引特定语言的页面，并为用户提供其首选语言的内容。
- **一致性**：通过在整个应用程序中使用本地化链接，您可以确保导航保持在当前语言环境内，防止意外的语言切换。
- **可维护性**：将本地化逻辑集中在单个组件中简化了 URL 的管理，使您的代码库更易于维护和扩展。

```vue fileName="src/components/Link.vue"
<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot></slot>
  </a>
</template>

<script setup>
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

// 为内部链接创建本地化 href
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>
```

对于 Vue Router，创建一个特定于路由器的版本：

```vue fileName="src/components/RouterLink.vue"
<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot></slot>
  </router-link>
</template>

<script setup>
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
    <!-- Vue Router -->
    <RouterLink to="/">根目录</RouterLink>
    <RouterLink to="/home">主页</RouterLink>
    <!-- 其他 -->
    <Link href="/">根目录</Link>
    <Link href="/home">主页</Link>
  </div>
</template>

<script setup>
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>
```

### 配置 TypeScript

Intlayer 使用模块增强来利用 TypeScript 的优势，使您的代码库更强健。

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

```plaintext
# 忽略由 Intlayer 生成的文件
.intlayer
```

### VS Code 扩展

为了提升您使用 Intlayer 的开发体验，您可以安装官方的 **Intlayer VS Code 扩展**。

[从 VS Code Marketplace 安装](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

此扩展提供：

- **翻译键的自动补全**。
- **实时错误检测**，用于缺失的翻译。
- **翻译内容的内联预览**。
- **快速操作**，轻松创建和更新翻译。

有关如何使用此扩展的更多详细信息，请参阅 [Intlayer VS Code 扩展文档](https://intlayer.org/doc/vs-code-extension)。

---

### 更进一步

## 要进一步了解，您可以实现 [可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 或使用 [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 外部化您的内容。
