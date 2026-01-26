---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: getCanonicalPath 関数ドキュメント | intlayer
description: intlayer パッケージの getCanonicalPath 関数の使い方
keywords:
  - getCanonicalPath
  - 翻訳
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: カスタムURLリライトを実装
---

# ドキュメント: `intlayer` の `getCanonicalPath` 関数

## 説明

The `getCanonicalPath` 関数は、ローカライズされた URL パス（例：`/a-propos`）を内部の正規アプリケーションパス（例：`/about`）に解決します。これは、URL の言語に関係なくルーターが正しい内部ルートにマッチさせるために不可欠です。

**主な機能:**

- `[param]` 構文を使用した動的ルートパラメータをサポートします。
- 設定で定義されたカスタムリライトルールに対してローカライズされたパスを照合します。
- 一致するリライトルールが見つからない場合、元のパスを返します。

---

## 関数シグネチャ

```typescript
getCanonicalPath(
  localizedPath: string,         // 必須
  locale: Locales,               // 必須
  rewriteRules?: RoutingConfig['rewrite'] // 任意
): string
```

---

## パラメータ

### 必須パラメータ

- `localizedPath: string`
  - **説明**: ブラウザに表示されるローカライズされたパス（例: `/a-propos`）。
  - **型**: `string`
  - **必須**: はい

- `locale: Locales`
  - **説明**: 解決対象のパスに使用されるロケール。
  - **型**: `Locales`
  - **必須**: はい

### オプションのパラメーター

- `rewriteRules?: RoutingConfig['rewrite']`
  - **説明**: カスタムのリライトルールを定義するオブジェクト。指定しない場合、プロジェクトの設定にある `routing.rewrite` プロパティがデフォルトとして使用されます。
  - **型**: `RoutingConfig['rewrite']`
  - **デフォルト**: `configuration.routing.rewrite`

---

## 戻り値

- **型**: `string`
- **説明**: 内部の正規パス。

---

## 使用例

### 基本的な使用例（設定あり）

もし `intlayer.config.ts` にカスタムリライトを設定している場合:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// 設定: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// 出力: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// 出力: "/about"
```

### 動的ルートでの使用

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// 設定: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// 出力: "/product/123"
```

### 手動のリライトルール

関数に手動のリライトルールを渡すこともできます:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// 出力: "/contact"
```

---

## 関連関数

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedPath.md): canonical path をローカライズされた等価パスに解決します。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md): プロトコル、ホスト、ロケールプレフィックスを含む完全にローカライズされたURLを生成します。
