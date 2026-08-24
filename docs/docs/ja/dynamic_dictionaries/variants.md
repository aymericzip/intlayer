---
createdAt: 2026-06-12
updatedAt: 2026-08-04
title: バリアント
description: Intlayer のコンテンツファイルで variant メタデータフィールドを使用し、名前付きまたは構造化されたコンテンツの代替（A/B テスト、季節バナー、フィーチャーフラグ付きコピー、CMS レコード、ユーザー固有コンテンツ）を宣言し、コード変更なしにランタイムで切り替えます。
keywords:
  - バリアント
  - A/B テスト
  - フィーチャーフラグ
  - 動的コンテンツ
  - 動的レコード
  - CMS
  - Intlayer
  - 国際化
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "バリアント機能のリリース"
  - version: 9.1.0
    date: 2026-06-26
    changes: "`variant`は文字列またはオブジェクトを受け付けるようになりました — 以前の `meta` / 動的レコードはオブジェクトバリアントとして宣言されます"
  - version: 9.1.1
    date: 2026-07-31
    changes: "バリアントは上書きするキーのみを宣言します。宣言されていないバリアントはデフォルトのエントリにフォールバックします"
  - version: 9.1.2
    date: 2026-08-04
    changes: "プロバイダーがアンビエントな `variant` プロパティを受け取り、セレクターが順序付きの優先チェーンを受け取れるようになりました"
author: aymericzip
---

# バリアント

**バリアント**は、同じ辞書 `key` を共有しつつ、それぞれ異なる `variant` 値を持つコンテンツファイルの集合です。Intlayer は `useIntlayer` に渡されたセレクターに基づいて適切なファイルを提供します。

`variant` の値は**2 つの形式**を取れます:

- **文字列** — 単一の名前付き代替（A/B テスト、季節バナー、フィーチャーフラグ）。
- **オブジェクト** — フィールドの集合でアドレス指定される構造化された識別子（CMS レコード、ユーザー固有コピー、不透明な ID をキーとする任意のコンテンツ）。オブジェクト全体が同一性です。エントリを解決するには、セレクターが**等しい**オブジェクトを提供する必要があります。

> オブジェクト形式は旧 `meta` フィールドを置き換えます。以前 `meta: { id, … }` と書いていた箇所はすべて `variant: { id, … }` と書き、`{ variant: { id, … } }` で選択してください。

## 名前付き（文字列）バリアント

各ファイルは 1 つの名前付き代替を表します。`variant` を省略する（または `"default"` に設定する）と、フォールバックとして扱われます。

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

### 部分的なバリアント

バリアントは**上書きするキーのみを宣言します**。残りはデフォルトのエントリから継承されます。

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
// → { headline: "Développez plus vite tout l'été", cta: "Commencer" } — `cta` は継承されます

useIntlayer("hero-banner", { variant: "never-declared" });
// → デフォルトのエントリ
```

したがって、実際にテキストが異なる場所にのみバリアントファイルを追加します。バリアントを宣言しているがデフォルトのエントリがない場合にのみ、キーは `null` に解決されます。

### 名前付きバリアントの利用

#### デフォルトバリアント

<Tabs group="framework">
  <Tab label="React" value="react">
    ```tsx fileName="Hero.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
    import { useIntlayer } from "react-intlayer";

    export const Hero = () => {
      const { headline, cta } = useIntlayer("hero-banner");
      // → デフォルトバリアント

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
      // → デフォルトバリアント

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
      // → デフォルトバリアント

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
      // → デフォルトバリアント

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

#### 名前付きバリアント

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

#### ロケールを明示した名前付きバリアント

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "fr",
});
```

## オブジェクト（構造化）バリアント

オブジェクトバリアントは、`variant` フィールドで宣言された任意のキー・値ペアの集合でコンテンツをアドレス指定します。これにより、CMS レコード、ユーザー固有コピー、または不透明な ID をキーとする任意のコンテンツをモデル化できます。**オブジェクト全体**が同一性です。エントリが解決されるには、セレクターが等しいオブジェクトを提供する必要があります。

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

### オブジェクトバリアントの利用

一致するオブジェクトを `variant` に渡します。辞書で宣言された各フィールドはすべて提供され、等しくなければなりません。そうでない場合、結果は `null` です。フィールドの順序は問いません。

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

#### ロケールを明示する場合

```tsx
const content = useIntlayer("product", {
  variant: { id: "prod_abc", userId: "user_123" },
  locale: "fr",
});
```

#### フィールド欠落 — 一致なし

```ts
// null を返します: `userId` が欠落しているため、オブジェクトは宣言されたバリアントに一致しません
const content = useIntlayer("product", { variant: { id: "prod_abc" } });
```

## アンビエントバリアント

バリアントの次元の中には、テナント、学校種別、プラン階層のように、セッション全体で固定されるものがあります。これらは一度だけ解決されるものであり、各コンポーネントが手で渡すべきものではありません。

> これらを注入するために `useIntlayer` を独自のフックでラップしないでください。ビルド時の最適化は、フレームワークパッケージからインポートされたリテラルな `useIntlayer("key")` の呼び出しだけを書き換えるため、ラッパーの背後にあるものはバンドルされません。

代わりに、`locale` とまったく同じように、プロバイダーで一度だけバリアントを宣言します:

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

これでプロバイダー配下のすべての辞書の読み取りがそのバリアントで解決され、呼び出し側のセレクターが常に優先されます:

```tsx
useIntlayer("hero-banner");
// → プロバイダーのバリアント

useIntlayer("hero-banner", { variant: "summer" });
// → "summer" — プロバイダーのバリアントを置き換えます（拡張はしません）
```

### 形式

`variant` プロパティは 3 つの形式を受け取ります:

| 形式                                                      | 意味                                          |
| --------------------------------------------------------- | --------------------------------------------- |
| `variant="school1"`                                       | すべてのキーに対する 1 つの名前付きバリアント |
| `variant={["school1", "default"]}`                        | 順序付きの優先チェーン                        |
| `variant={{ "hero-banner": "school1", default: "base" }}` | 辞書キーごとに 1 つのバリアント               |

#### 優先チェーン

チェーンは各キーが宣言しているエントリーに対して左から右へ順に試され、最初に宣言されているものが採用されます。どれも宣言されていない場合は、単一の値のときとまったく同じく、暗黙のデフォルトエントリーが使われます。

```tsx
<IntlayerProvider variant={["school1", "school2"]} />
// `hero-banner` は `school1` エントリーを宣言していないが `school2` を宣言している → "school2"
// どちらも宣言していないキー → デフォルトエントリー
```

したがって `["black_friday", "summer"]` は「このキーに black friday があればそれ、なければ summer、それもなければデフォルト」と読めます。チェーンは呼び出し側でも使えます:

```tsx
useIntlayer("hero-banner", { variant: ["black_friday", "summer"] });
```

> これはコンテンツファイルの `variant` **フィールド**が受け取る配列とちょうど逆であることに注意してください。あちらでは配列が要素ごとに 1 つのエントリーを*宣言*しますが、こちらでは優先順位に従ってそれらを*消費*します。

#### キーごとのマップ

辞書キーごとに個別に指定します。予約された `default` エントリーが、記載されていないすべてのキーをカバーします:

```tsx
<IntlayerProvider
  variant={{
    "hero-banner": "school1",
    product: ["school1", "default"],
    default: "base",
  }}
/>
```

> プロバイダーでは、プレーンなオブジェクトは**常に**キーごとのマップとして読み取られ、オブジェクトバリアントとしては解釈されません（両者は構造的に同一のためです）。オブジェクトバリアントをグローバルに指定するには、エントリーの下にネストしてください: `variant={{ default: { id: "prod_abc" } }}`。

マップのキーは宣言済みの辞書キーと照合されるため、タイプミス（あるいは `variant={{ id: "prod_abc" }}` のようにオブジェクトバリアントを直接書いた場合）はコンパイルエラーになります。

## 読み込みモード

オブジェクトバリアントはしばしば遅延読み込みされます。これを制御するには辞書に `importMode` を設定します:

```ts contentDeclarationFormat={["typescript", "esm", "commonjs"]}
const dictionary = {
  key: "product",
  importMode: "fetch", // or "dynamic"
  variant: { id: "prod_abc", userId: "user_123" },
  content: { … },
} satisfies Dictionary;

export default dictionary;
```

`static`、`dynamic`、`fetch` モードの詳細については[バンドル最適化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/bundle_optimization.md)を参照してください。

## 典型的なユースケース

- 実験キーで駆動される A/B コピーテスト
- 季節またはプロモーションのバナー
- フィーチャーフラグ付きメッセージ
- ロケール固有のマーケティングキャンペーン
- CMS で管理される製品ごとのマーケティングコピー
- ユーザー固有またはアカウント固有のコンテンツ
- 実行時に不透明な ID をキーとする任意のコンテンツ
