---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: バリアント
description: コードを変更することなくランタイムに切り替えることができる、名前付きコンテンツ代替案（A/Bテスト、季節限定のバナー、機能フラグ付きのコピー）を宣言するために、Intlayerコンテンツファイルでvariantメタデータフィールドを使用します。
keywords:
  - バリアント
  - A/Bテスト
  - 機能フラグ
  - 動的コンテンツ
  - Intlayer
  - 国際化
slugs:
  - doc
  - concept
  - variants
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "バリアントディクショナリ機能のリリース"
author: aymericzip
---

# バリアント

**バリアント**（Variant）は、同じディクショナリキー（`key`）を共有するものの、それぞれ異なる `variant` 名を持つコンテンツファイルの集合です。Intlayerは、`useIntlayer` に渡されたセレクターに基づいて、適切なファイルを提供します。

## バリアントの宣言

各ファイルは、名前付きの代替案を1つ表します。`variant` フィールドを省略する（または `"default"` に設定する）と、そのファイルがデフォルト（フォールバック）としてマークされます。

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

## バリアントの利用

### デフォルトバリアント

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

### 名前付きバリアント

```tsx
const { headline, cta } = useIntlayer("hero-banner", {
  variant: "black_friday",
});
```

### ロケールを明示した名前付きバリアント

```tsx
const content = useIntlayer("hero-banner", {
  variant: "black_friday",
  locale: "ja",
});
```

## 一般的なユースケース

- 実験キーに基づいた見出しコピーのA/Bテスト
- 季節限定のプロモーションやキャンペーンのバナー
- 機能フラグ（feature flags）によって制御されるメッセージ文言
- 特定の地域に特化したマーケティングキャンペーン
