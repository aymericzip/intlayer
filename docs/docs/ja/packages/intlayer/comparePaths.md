---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths 関数のドキュメント | intlayer
description: intlayer パッケージの comparePaths 関数の使い方を学びます
keywords:
  - comparePaths
  - normalizePath
  - アクティブリンク
  - ナビゲーション
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "初期ドキュメント"
author: aymericzip
---

# ドキュメント: `intlayer` の `comparePaths` 関数

## 概要

`comparePaths` 関数は、ロケールセグメント、プロトコル/ホスト、クエリ文字列、ハッシュ、および末尾のスラッシュを無視して、2つの URL またはパス名が等しいかどうかを比較します。これは、ナビゲーションリンクが現在のページを指しているかどうか（例：アクティブリンクをハイライトする）を判定するための推奨される方法であり、独自に（エラーを起こしやすい）正規化ロジックを作成する必要がありません。

内部的には [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md) を再利用してロケールセグメントを削除するため、設定されたルーティングモードとロケールを尊重します。

パッケージはまた、比較に使用されるロケールに依存しない正規化されたパス名を返す基盤ヘルパーである [`normalizePath`](#normalizepath) をエクスポートします。

**主な特徴：**

- ロケールに依存しない比較（`/ja/about` は `/about` と一致します）
- 絶対 URL と相対パスの両方で動作
- クエリ文字列、ハッシュ、および末尾のスラッシュを無視
- 先頭のスラッシュの欠落や空の値を許容（`/` に正規化）
- 軽量 — `getPathWithoutLocale` の上に構築されています

---

## 関数シグネチャ

```typescript
comparePaths(
  pathname: string,  // 必須
  href: string,      // 必須
  locales?: Locales[] // オプション
): boolean

normalizePath(
  inputUrl: string,   // 必須
  locales?: Locales[] // オプション
): string
```

---

## パラメーター

- `pathname: string`
  - **説明**: 比較する最初の URL 文字列またはパス名（通常は現在のパス）。
  - **型**: `string`
  - **必須**: はい

- `href: string`
  - **説明**: 比較する2番目の URL 文字列またはパス名（通常はナビゲーションリンクの `href`）。
  - **型**: `string`
  - **必須**: はい

- `locales: Locales[]`
  - **説明**: サポートされているロケールのオプションの配列。デフォルトではプロジェクトで設定されたロケールになります。
  - **型**: `Locales[]`
  - **必須**: いいえ (オプション)

### 戻り値

- **型**: `boolean`
- **説明**: 両方の入力が同じロケールに依存しないパスに解決される場合は `true`、そうでない場合は `false`。

---

## 使用例

### 基本的な使用法

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### 絶対URLと相対URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### アクティブなナビゲーションリンクのハイライト

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` は `comparePaths` で使用されるロケールに依存しない正規パスを返します。ロケールセグメント、プロトコル/ホスト、クエリ文字列、ハッシュを削除し、先頭のスラッシュを1つだけに保ち、末尾のスラッシュ（ルートを除く）を削除し、空の値に対しては `/` にフォールバックします。

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## 関連関数

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPathWithoutLocale.md): URL やパス名からロケールセグメントを削除します。
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getPrefix.md): 指定したロケールの URL プレフィックスを決定します。
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/intlayer/getLocalizedUrl.md): 特定のロケールのローカライズされた URL を生成します。

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
