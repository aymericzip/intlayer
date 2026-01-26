---
createdAt: 2024-08-13
updatedAt: 2026-01-26
title: カスタムURLリライト
description: Intlayerでロケール固有のパスを定義するためのカスタムURLリライトの設定と使用方法を学びます。
keywords:
  - カスタムURLリライト
  - ルーティング
  - 国際化
  - i18n
slugs:
  - doc
  - concept
  - custom_url_rewrites
history:
  - version: 8.0.0
    date: 2026-01-25
    changes: フレームワーク固有のフォーマッターと useRewriteURL フックの使用を伴う集中型URLリライトを実装しました。
---

# カスタムURLリライトの実装

IntlayerはカスタムURLリライトをサポートしており、標準の`/locale/path`構造とは異なるロケール固有のパスを定義できます。これにより、内部のアプリケーションロジックを正規のまま維持しつつ、英語では`/about`、フランス語では`/a-propos`のようなURLを実現できます。

## 設定

カスタムリライトは、フレームワーク固有のフォーマッターを使用して `intlayer.config.ts` ファイルの `routing` セクションで設定します。これらのフォーマッターは、お使いのルーターに適した正しい構文を提供します。

<Tabs group='routers'>
  <Tab label="Next.js" value="nextjs">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nextjsRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // その他の設定...
      routing: {
        mode: "prefix-no-default",
        rewrite: nextjsRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="React Router" value="reactrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { reactRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 省略
      routing: {
        mode: "prefix-all",
        rewrite: reactRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="TanStack ルーター" value="tanstackrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { tanstackRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 省略
      routing: {
        mode: "prefix-all",
        rewrite: tanstackRouterRewrite({
          "/$locale/about": {
            fr: "/$locale/a-propos",
            es: "/$locale/acerca-de",
          },
          "/$locale/products/$id": {
            fr: "/$locale/produits/$id",
            es: "/$locale/productos/$id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Vue ルーター" value="vuerouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { vueRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: vueRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="SvelteKit" value="sveltekit">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { svelteKitRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 省略
      routing: {
        mode: "prefix-all",
        rewrite: svelteKitRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Solid Router" value="solidrouter">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { solidRouterRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // 省略
      routing: {
        mode: "prefix-all",
        rewrite: solidRouterRewrite({
          "/:locale/about": {
            fr: "/:locale/a-propos",
            es: "/:locale/acerca-de",
          },
          "/:locale/products/:id": {
            fr: "/:locale/produits/:id",
            es: "/:locale/productos/:id",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
  <Tab label="Nuxt" value="nuxt">

    ```typescript fileName="intlayer.config.ts"
    import { Locales, type IntlayerConfig } from "intlayer";
    import { nuxtRewrite } from "intlayer/routing";

    const config: IntlayerConfig = {
      // ...
      routing: {
        mode: "prefix-all",
        rewrite: nuxtRewrite({
          "/[locale]/about": {
            fr: "/[locale]/a-propos",
            es: "/[locale]/acerca-de",
          },
          "/[locale]/products/[id]": {
            fr: "/[locale]/produits/[id]",
            es: "/[locale]/productos/[id]",
          },
        }),
      },
    };

    export default config;
    ```

  </Tab>
</Tabs>

### 利用可能なフォーマッタ

Intlayer は主要なフレームワーク向けのフォーマッタを提供します:

- `nextjsRewrite`: Next.js App Router 用。`[slug]`、`[...slug]` (1+)、および `[[...slug]]` (0+) をサポートします。
- `svelteKitRewrite`: SvelteKit 用。`[slug]`、`[...path]` (0+)、および `[[optional]]` (0-1) をサポートします。
- `reactRouterRewrite`: React Router 用。`:slug` と `*` (0+) をサポートします。
- `vueRouterRewrite`: Vue Router 4 用。`:slug`、`:slug?` (0-1)、`:slug*` (0+)、および `:slug+` (1+) をサポートします。
- `solidRouterRewrite`: Solid Router 用。`:slug` と `*slug` (0+) をサポートします。
- `tanstackRouterRewrite`: TanStack Router 向け。`$slug` と `*` (0+) をサポートします。
- `nuxtRewrite`: Nuxt 3 向け。`[slug]` と `[...slug]` (0+) をサポートします。
- `viteRewrite`: 任意の Vite ベースプロジェクト向けの汎用フォーマッタ。Vite プロキシ用の構文を正規化します。

### 高度なパターン

Intlayer はこれらのパターンを内部で統一された構文に正規化し、高度なパスのマッチングと生成を可能にします:

- **オプションセグメント**: `[[optional]]`（SvelteKit）や `:slug?`（Vue/React）に対応しています。
- **キャッチオール（0個以上）**: `[[...slug]]`（Next.js）、`[...path]`（SvelteKit/Nuxt）、または `*`（React/TanStack）は複数のセグメントにマッチできます。
- **必須キャッチオール（1個以上）**: `[...slug]`（Next.js）や `:slug+`（Vue）は少なくとも1つのセグメントが存在することを保証します。

## クライアント側のURL修正: `useRewriteURL`

ブラウザのアドレスバーが常に「見た目の良い」ローカライズされたURLを反映するように、Intlayer は `useRewriteURL` フックを提供します。このフックは、ユーザーが正規のパスに到達したときに `window.history.replaceState` を使って URL をサイレントに更新します。

### フレームワークでの使用法

<Tabs group='framework'>
  <Tab label="Next.js" value="nextjs">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "next-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // /fr/about を /fr/a-propos に自動的に修正します
      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="React Router" value="reactrouter">
  
    ```tsx
    'use client';

    import { useRewriteURL } from "react-intlayer";

    const MyLayout = ({ children }) => {
      useRewriteURL(); // /fr/about を /fr/a-propos に自動的に修正します

      return <>{children}</>;
    };
    ```

  </Tab>

  <Tab label="Vue" value="vue">
  
    ```vue
    <script setup>
    import { useRewriteURL } from "vue-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
  <Tab label="Solid" value="solid">
  
    ```tsx
    import { useRewriteURL } from "solid-intlayer";

    const Layout = (props) => {
      useRewriteURL();
      return <>{props.children}</>;
    };
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
  
    ```svelte
    <script>
    import { useRewriteURL } from "svelte-intlayer";

    useRewriteURL();
    </script>

    ```

  </Tab>
</Tabs>

## ルーター統合とプロキシ

Intlayer のサーバーサイドプロキシ（Vite と Next.js）は、SEO の一貫性を確保するためにカスタムリライトを自動的に処理します。

1. **内部リライト**: ユーザーが `/fr/a-propos` にアクセスした場合、プロキシは内部的にそれを `/fr/about` にマッピングして、フレームワークが正しいルートに一致するようにします。
2. **正規化リダイレクト**: ユーザーが手動で `/fr/about` と入力した場合、プロキシは `/fr/a-propos` へ 301/302 リダイレクトを発行し、検索エンジンがページの単一のバージョンのみをインデックスするようにします。

### Next.js 統合

Next.js との統合は `intlayerProxy` ミドルウェアで完全に処理されます。

```typescript fileName="middleware.ts"
import { intlayerProxy } from "next-intlayer/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return intlayerProxy(request);
}
```

### Vite 統合

SolidJS、Vue、Svelte 向けに、開発中のリライトは `intlayerProxy` Vite プラグインが管理します。

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

## 主要機能

### 1. マルチコンテキスト・リライト

各フォーマッタは、異なる利用先向けの特殊化されたルールを含む `RewriteObject` を生成します:

- `url`: クライアント側の URL 生成に最適化（ロケールセグメントを取り除く）。
- `nextjs`: Next.js のミドルウェア向けに `[locale]` を保持。
- `vite`: Vite プロキシ向けに `:locale` を保持。

### 2. 自動パターン正規化

Intlayer は内部ですべてのパターン構文（例: `[param]` を `:param` に変換するなど）を正規化し、ソースフレームワークに関係なくマッチングが一貫するようにします。

### 3. SEO の正規 URL

正規パスから見やすいエイリアスへのリダイレクトを強制することで、Intlayer は重複コンテンツの問題を防ぎ、サイトの発見性を向上させます。

## コアユーティリティ

- `getLocalizedUrl(url, locale)`: リライトルールを尊重してローカライズされた URL を生成します。
- `getCanonicalPath(path, locale)`: ローカライズされた URL を内部の正規パスに解決します。
- `getRewritePath(pathname, locale)`: パス名がより見やすいローカライズ済みエイリアスに修正される必要があるかどうかを検出します。
