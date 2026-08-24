---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getLocalizedPath 関数のドキュメント | intlayer
description: intlayer パッケージで getLocalizedPath 関数を使用する方法
keywords:
  - getLocalizedPath
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "カスタムURLリライトを実装"
author: aymericzip
---

# ドキュメント: `intlayer` の `getLocalizedPath` 関数

## 説明

`getLocalizedPath` 関数は、canonical path（内部アプリケーションパス）を提供された locale とリライトルールに基づいてローカライズされたパスに解決します。言語ごとに異なる SEO に適した URL を生成する際に特に有用です。

[`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md)の相対的なカウンターパートです — 相対入力の場合、両者は同じ値を返します。`getLocalizedUrl`とは異なり、絶対URLを返すことはありません：`domains`設定は無視されるため、独自のドメインから提供されるロケールでもパスが生成されます。絶対入力は受け入れられますが、そのオリジンは削除され、パス、クエリ文字列、ハッシュのみが保持されます。

**主な機能:**

- `[param]` 構文を使用した動的ルートパラメータをサポートします。
- プロジェクトの設定で定義したカスタムリライトルールに従ってパスを解決します。
- 指定したロケールに対するリライトルールが見つからない場合、自動的に canonical path にフォールバックします。

---

## 関数シグネチャ

```typescript
getLocalizedPath(
  canonicalPath: string,         // 必須
  locale: Locales,               // 必須
  rewriteRules?: RoutingConfig['rewrite'] // オプション
): string
```

---

## パラメータ

### 必須パラメータ

- `canonicalPath: string`
  - **説明**: アプリケーション内部のパス（例: `/about`, `/product/[id]`）。
  - **型**: `string`
  - **必須**: はい

### 任意パラメータ

- `rewriteRules?: RoutingConfig['rewrite']`
  - **説明**: カスタムのリライトルールを定義するオブジェクト。指定しない場合、プロジェクトの設定の `routing.rewrite` プロパティがデフォルトとして使用されます。
  - **型**: `RoutingConfig['rewrite']`
  - **デフォルト**: `configuration.routing.rewrite`

- `options?: object`
  - **説明**: ルーティングのオーバーライド。すべてのエントリはプロジェクトの設定にデフォルト設定されます。
  - **型**: `object`

  - `options.locales?: Locales[]` — サポートされているロケール。**デフォルト**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — デフォルトロケール。**デフォルト**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — パス内でロケールがどのように表示されるか。**デフォルト**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — カスタム rewrite ルール。**デフォルト**: `configuration.routing.rewrite`

---

## 戻り値

- **型**: `string`
- **説明**: 指定したロケール向けのローカライズされたパス。

型は設定で宣言された書き直しルールから絞り込まれるため、エディタはベアな `string` ではなく、解決されたパスを表示します:

```typescript codeFormat="typescript"
// 設定: モード 'prefix-no-default', defaultLocale 'en',
//      { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (書き換えルールに一致しません。プレフィックスのみが適用されます)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

同じ絞り込みが [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md) に流れ込み、ロケールをプレフィックスする前に書き換えルールを適用します。

2つのケースは `string` に拡大されたままです。これらはコンパイル時に解決できないためです：

- 文字列リテラルではないパス（例：変数から構築されたパス）;
- マルチセグメントまたはオプショナルパラメータを使用するルールにマッチするパス（`[...slug]`、`[[...slug]]`、`:param?`）。

---

## 使用例

### 基本的な使用例（設定あり）

intlayer.config.ts にカスタムのリライトを設定している場合:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// 設定: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// 出力: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// 出力: "/about"
```

### 動的ルートでの使用

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// 設定: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// 出力: "/produit/123"
```

### 手動リライトルール

手動のリライトルールを関数に渡すこともできます:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

### ロケールの省略

ロケールが指定されていない場合、パスは設定されたデフォルトロケール用にローカライズされます：

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuration: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Output: "/about"
```

---

## 関連関数

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getCanonicalPath.md): ローカライズされたパスを内部の正規（canonical）パスに解決します。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md): プロトコル、ホスト、ロケールプレフィックスを含む完全にローカライズされたURLを生成します。
