---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: 变体
description: 在 Intlayer 内容文件中使用 variant 元数据字段来声明具名或结构化的内容替代项——A/B 测试、季节性横幅、功能开关文案、CMS 记录、用户特定内容——并在运行时无需更改代码即可在它们之间切换。
keywords:
  - 变体
  - A/B 测试
  - 功能开关
  - 动态内容
  - 动态记录
  - CMS
  - Intlayer
  - 国际化
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "变体功能发布"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant` 现在接受字符串或对象 — 以前的 `meta` / 动态记录现在声明为对象变体"
  - version: 9.1.1
    date: 2026-07-31
    changes: "变体仅声明它覆盖的键；未声明的变体将回退到默认条目"
  - version: 9.1.2
    date: 2026-08-04
    changes: "提供者接受环境级 `variant` 属性；选择器接受有序的优先级链"
author: aymericzip
---

# 变体

**变体**是一组共享相同字典 `key`、但各自携带不同 `variant` 值的内容文件。Intlayer 根据传递给 `useIntlayer` 的选择器提供相应的文件。

`variant` 的值可以采用**两种形式**：

- **字符串** — 单个具名替代项（A/B 测试、季节性横幅、功能开关）。
- **对象** — 由一组字段寻址的结构化判别器（CMS 记录、用户特定文案、以不透明 ID 作为键的任何内容）。整个对象即为标识：选择器必须提供一个**相等**的对象才能解析该条目。

> 对象形式取代了以前的 `meta` 字段。凡是以前写 `meta: { id, … }` 的地方，请改写为 `variant: { id, … }`，并用 `{ variant: { id, … } }` 进行选择。

## 具名（字符串）变体

每个文件代表一个具名替代项。省略 `variant`（或将其设置为 `"default"`）会将其标记为回退项。

```ts fileName="hero-banner.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "default",
  content: {
    headline: t({
      en: "Build faster with Intlayer",
      fr: "Développez plus vite avec Intlayer",
    }),
    cta: t({ en: "Get started", fr: "Commencer" }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="hero-banner.black-friday.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: t({
      en: "50 % off — today only",
      fr: "−50 % — aujourd'hui seulement",
    }),
    cta: t({ en: "Shop now", fr: "Acheter maintenant" }),
  },
} satisfies Dictionary;

export default dictionary;
```

### 部分变体

变体**仅声明它覆盖的键**；其余部分从默认条目继承。

```ts fileName="hero-banner.summer.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "hero-banner",
  variant: "summer",
  content: {
    headline: t({
      en: "Build faster all summer",
      fr: "Développez plus vite tout l'été",
    }),
  },
} satisfies Dictionary;

export default dictionary;
```

```tsx
useIntlayer("hero-banner", { variant: "summer" });
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — 继承了 `cta`

useIntlayer("hero-banner", { variant: "never-declared" });
// → 默认条目
```

因此，您只需在文本确实不同的地方添加变体文件。只有在声明了变体但没有默认条目的情况下，键才会解析为 `null`。

### 使用具名变体

#### 默认变体

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → 默认变体

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → 默认变体

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Hero.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { headline, cta } = useIntlayer("hero-banner");
    </script>

    <template>
      <section>
        <h1>{{ headline }}</h1>
        <a>{{ cta }}</a>
      </section>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Hero.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("hero-banner");
    </script>

    <section>
      <h1>{$content.headline}</h1>
      <a>{$content.cta}</a>
    </section>
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → 默认变体

      return (
        <section>
          <h1>{headline}</h1>
          <a>{cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Hero = () => {
      const content = useIntlayer("hero-banner");
      // → 默认变体

      return (
        <section>
          <h1>{content().headline}</h1>
          <a>{content().cta}</a>
        </section>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="hero.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-hero",
      template: `
        <section>
          <h1>{{ content().headline }}</h1>
          <a>{{ content().cta }}</a>
        </section>
      `,
    })
    export class HeroComponent {
      content = useIntlayer("hero-banner");
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="hero.js"
    import { useIntlayer } from "vanilla-intlayer";

    const { headline, cta } = useIntlayer("hero-banner");

    document.body.innerHTML = `
      <section>
        <h1>${headline}</h1>
        <a>${cta}</a>
      </section>
    `;
    ```

  </Tab>
</Tabs>

#### 具名变体

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### 带显式语言环境的具名变体

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## 对象（结构化）变体

对象变体通过在 `variant` 字段中声明的任意键值对集合来寻址内容——从而可以建模 CMS 记录、用户特定文案，或键为不透明 ID 的任何内容。**整个对象**即为标识：选择器必须提供一个相等的对象，该条目才会被解析。

```ts fileName="product.abc.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abc", userId: "user_123" },
  content: {
    name: t({ en: "Widget Pro", fr: "Widget Pro" }),
    description: t({ en: "The best widget.", fr: "Le meilleur widget." }),
  },
} satisfies Dictionary;

export default dictionary;
```

```ts fileName="product.abcd.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const dictionary = {
  key: "product",
  variant: { id: "prod_abcd", userId: "user_123" },
  content: {
    name: t({ en: "Widget Lite", fr: "Widget Lite" }),
    description: t({ en: "A lighter option.", fr: "Une option plus légère." }),
  },
} satisfies Dictionary;

export default dictionary;
```

### 使用对象变体

将匹配的对象传递给 `variant`。字典上声明的每个字段都必须提供且相等；否则结果为 `null`。字段顺序无关紧要。

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "next-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    ```vue fileName="Product.vue" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script setup>
    import { useIntlayer } from "vue-intlayer";

    const props = defineProps({
      productId: String,
      userId: String,
    });

    const content = useIntlayer("product", {
      variant: { id: props.productId, userId: props.userId },
    });
    </script>

    <template>
      <p v-if="content">{{ content.description }}</p>
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="Product.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";

    export let productId: string;
    export let userId: string;

    const content = useIntlayer("product", {
      variant: { id: productId, userId },
    });
    </script>

    {#if $content}
      <p>{$content.description}</p>
    {/if}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "preact-intlayer";

    export const Product = ({
      productId,
      userId,
    }: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: productId, userId },
      });

      if (!content) return null;

      return <p>{content.description}</p>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="Product.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "solid-intlayer";

    export const Product = (props: {
      productId: string;
      userId: string;
    }) => {
      const content = useIntlayer("product", {
        variant: { id: props.productId, userId: props.userId },
      });

      return (
        <>
          {content() && <p>{content().description}</p>}
        </>
      );
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="product.component.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { Component, Input, OnInit } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-product",
      template: `
        @if (content()) {
          <p>{{ content().description }}</p>
        }
      `,
    })
    export class ProductComponent implements OnInit {
      @Input() productId!: string;
      @Input() userId!: string;

      content: any;

      ngOnInit() {
        this.content = useIntlayer("product", {
          variant: { id: this.productId, userId: this.userId },
        });
      }
    }
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="product.js"
    import { useIntlayer } from "vanilla-intlayer";

    const content = useIntlayer("product", {
      variant: { id: "prod_abcd", userId: "user_123" },
    });

    if (content) {
      document.body.innerHTML = `<p>${content.description}</p>`;
    }
    ```

  </Tab>
</Tabs>

#### 带显式语言环境

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### 缺少字段 — 无匹配

```ts
// 返回 null：缺少 `userId`，因此对象与声明的变体不匹配
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## 环境变体

有些变体维度在整个会话中都是固定的——租户、学校类型、套餐等级。它们只需解析一次，任何组件都不应手动传递它们。

> 不要为了注入它们而把 `useIntlayer` 包装进你自己的 Hook。构建期优化只会重写从框架包中导入的字面量 `useIntlayer("key")` 调用，因此包装器背后的内容不会被打包。

请改为在提供者上声明一次变体，就像 `locale` 一样：

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "react-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Next.js" value="nextjs">
    <Tabs>
      <Tab label="Intlayer >=9.4" value=">=9.4">

        ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
        import { IntlayerProvider } from "next-intlayer/server";

        export default async function Layout({ children, params }) {
          const { locale } = await params;
          const schoolType = await getSchoolType();

          return (
            <IntlayerProvider locale={locale} variant={schoolType}>
              {children}
            </IntlayerProvider>
          );
        }
        ```

      </Tab>
      <Tab label="Intlayer <9.4" value="<9.4">

    ```tsx fileName="layout.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerServerProvider } from "next-intlayer/server";
    import { IntlayerClientProvider } from "next-intlayer";

    export default async function Layout({ children, params }) {
      const { locale } = await params;
      const schoolType = await getSchoolType();

      return (
        <IntlayerServerProvider locale={locale} variant={schoolType}>
          <IntlayerClientProvider locale={locale} variant={schoolType}>
            {children}
          </IntlayerClientProvider>
        </IntlayerServerProvider>
      );
    }
    ```

      </Tab>
    </Tabs>

  </Tab>
  <Tab label="Vue" value="vue">
    ```ts fileName="main.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { createApp } from "vue";
    import { installIntlayer } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    installIntlayer(app, { locale: "en", variant: schoolType });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    ```svelte fileName="+layout.svelte" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    <script lang="ts">
    import { setupIntlayer } from "svelte-intlayer";

    export let schoolType: string;

    setupIntlayer("en", schoolType);
    </script>

    <slot />
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "preact-intlayer";

    export const App = ({ locale, schoolType }) => (
      <IntlayerProvider locale={locale} variant={schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    ```tsx fileName="App.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { IntlayerProvider } from "solid-intlayer";

    export const App = (props) => (
      <IntlayerProvider locale={props.locale} variant={props.schoolType}>
        <Hero />
      </IntlayerProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    ```typescript fileName="app.config.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { ApplicationConfig } from "@angular/core";
    import { provideIntlayer } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [provideIntlayer("en", true, schoolType)],
    };
    ```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">
    ```javascript fileName="main.js"
    import { installIntlayer } from "vanilla-intlayer";

    installIntlayer({ locale: "en", variant: schoolType });
    ```

  </Tab>
</Tabs>

现在提供者下的每次字典读取都会基于该变体解析，而调用处的选择器始终优先：

```tsx
useIntlayer("hero-banner");
// → 提供者的变体

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" —— 替换提供者的变体，而不是扩展它
```

### 形式

`variant` 属性接受三种形式：

| 形式                                                      | 含义                       |
| --------------------------------------------------------- | -------------------------- |
| `variant="school1"`                                       | 对所有键使用同一个具名变体 |
| `variant={["school1", "default"]}`                        | 有序的优先级链             |
| `variant={{ "hero-banner": "school1", default: "base" }}` | 按字典键分别指定变体       |

#### 优先级链

链会针对每个键所声明的条目从左到右依次尝试，第一个已声明的胜出。若都未声明，则使用隐式的默认条目——与单个值的行为完全一致。

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` 未声明 `school1` 条目，但声明了 `school2` → "school2"
// 两者都未声明的键 → 默认条目
```

因此 `["black_friday", "summer"]` 可读作「若该键有 black friday 则用它，否则用 summer，再否则用默认」。调用处同样接受链：

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> 请注意，这与内容文件中 `variant` **字段**所接受的数组正好相反：在那里，数组为每个元素*声明*一个条目；而在这里，它按优先级顺序*消费*这些条目。

#### 按键映射

分别指定每个字典键。保留的 `default` 条目覆盖所有未列出的键：

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> 在提供者上，普通对象**始终**被解读为按键映射，而绝不会被当作对象变体——两者在结构上完全相同。若要全局指定对象变体，请将其嵌套在某个条目下：`variant={{ default: { id: "prod_abc" } }}`。

由于映射的键会与你声明的字典键进行校验，拼写错误——或直接写成对象变体，例如 `variant={{ id: "prod_abc" }}`——都会导致编译期错误。

## 加载模式

对象变体通常被惰性加载。在字典上设置 `importMode` 以控制此行为：

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

有关 `static`、`dynamic` 和 `fetch` 模式的详细信息，请参阅[包优化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/bundle_optimization.md)。

## 典型用例

- 由实验键驱动的 A/B 文案测试
- 季节性或促销横幅
- 功能开关消息
- 特定语言环境的营销活动
- 在 CMS 中管理的按产品营销文案
- 用户特定或账户特定的内容
- 在运行时以不透明 ID 作为键的任何内容
