---
createdAt: 2026-06-11
updatedAt: 2026-06-11
title: ウェブサイトのスキャン
description: Intlayer CLIのscanコマンドを使用して、任意のウェブサイトのページサイズを測定し、i18n/SEOの健全性を監査する方法について学びます。
keywords:
  - スキャン
  - SEO
  - i18n
  - 監査
  - CLI
  - Intlayer
  - ページサイズ
  - バンドル
slugs:
  - doc
  - concept
  - cli
  - scan
history:
  - version: 8.13.0
    date: 2026-06-11
    changes: "scanコマンドの追加"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# ウェブサイトのスキャン

`scan` コマンドは、公開URLを取得し、総ページサイズを測定し、そのページの i18n および SEO の健全性を監査します。HTML属性、カノニカルリンク、hreflangタグ、robots.txt、sitemap.xml、ローカライズされた内部リンク、およびJavaScriptバンドル内のロケールデータ重量をカバーするスコア付きレポート（0〜100）を生成します。

追加の依存関係は必要ありません。[puppeteer](https://pptr.dev/) がインストールされている場合、より正確なバンドル分析のために、遅延ロード（lazy-loaded）されるJavaScriptチャンクを取得できます。インストールされていない場合は、HTML内に宣言されている即時ロードされるスクリプトの検査にフォールバックします。

## 使用方法

```bash packageManager="npm"
npx intlayer scan <url>
```

```bash packageManager="yarn"
yarn intlayer scan <url>
```

```bash packageManager="pnpm"
pnpm intlayer scan <url>
```

```bash packageManager="bun"
bun x intlayer scan <url>
```

### 例

```bash packageManager="npm"
npx intlayer scan https://example.com
```

出力例：

```
🔍 Scanned https://example.com (basic mode)

Score: 90/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: en, fr, es, de, …

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ localized internal links
  ⚠ all internal links localized
  ✓ current locale detected
  ✓ robots.txt present
  ✓ robots.txt keeps locale paths crawlable
  ✓ sitemap.xml present
  ✓ sitemap lists every locale
  ✓ sitemap has alternate links
  ✓ sitemap has x-default

Bundle locale weight:
  Translations shipped: 120.50 KB
  Unused (other locales): 45.20 KB (37%)
```

## オプション

### `<url>`（必須）

スキャンする完全修飾URL（例：`https://example.com`）。

### `--no-deep`

レンダリングに基づく深いスキャンを無効にします。

デフォルトでは、コマンドは [puppeteer](https://pptr.dev/) を使用してヘッドレスブラウザでページをレンダリングし、遅延ロードされるJavaScriptチャンクを取得して、実際の転送サイズを測定しようとします。puppeteerがインストールされていない場合、コマンドは自動的に基本モードにフォールバックします。

puppeteerが利用可能な場合でも、基本モードを強制するには `--no-deep` を渡します。

> 例：`npx intlayer scan https://example.com --no-deep`

### `--json`

フォーマットされたレポートの代わりに、スキャン結果全体をJSONオブジェクトとして出力します。プログラムによる処理やCIパイプラインに便利です。

> 例：`npx intlayer scan https://example.com --json`

### 標準設定オプション

- **`--base-dir`** — `intlayer.config.*` ファイルを配置するベースディレクトリ。
- **`-e, --env`** — 対象の環境（例：`development`, `production`）。
- **`--env-file`** — カスタム `.env` ファイルへのパス。
- **`--no-cache`** — 設定キャッシュを無効にします。
- **`--verbose`** — 詳細ログを有効にします（CLIモードではデフォルト）。
- **`--prefix`** — カスタムログプレフィックス。

## チェック項目

| チェック                  | 説明                                                        | スコアの重み |
| ------------------------- | ----------------------------------------------------------- | ------------ |
| `html lang`               | `<html lang="…">` 属性が存在する                            | 9            |
| `html dir`                | `<html dir="…">` 属性が存在する                             | 3            |
| `canonical`               | `<link rel="canonical">` が存在する                         | 10           |
| `hreflang`                | `<link rel="alternate" hreflang="…">` タグが存在する        | 9            |
| `x-default hreflang`      | `x-default` hreflangの代替が存在する                        | 7            |
| `localized links`         | 少なくとも1つの内部リンクにロケールセグメントが含まれている | 5            |
| `all links localized`     | すべての内部リンクにロケールセグメントが含まれている        | 5            |
| `current locale`          | ページのロケールを検出できる                                | 3            |
| `robots.txt present`      | `/robots.txt` が 200 応答を返す                             | 10           |
| `robots.txt locale paths` | robots.txt でブロックされているロケールパスがない           | 10           |
| `sitemap.xml present`     | `/sitemap.xml` が 200 応答を返す                            | 10           |
| `sitemap locale coverage` | 検出されたすべてのロケールがサイトマップに表示されている    | 10           |
| `sitemap alternates`      | サイトマップに `hreflang` 代替リンクが含まれている          | 5            |
| `sitemap x-default`       | サイトマップに `x-default` hreflangが含まれている           | 5            |
| `unused bundle content`   | JSバンドルに過剰な未使用ロケールデータが含まれていない      | 9            |

最終スコアは、合格したすべてのチェックの加重合計をパーセンテージ（0〜100）で表したものです。

## プログラムによるスキャン機能の使用

`scan` 関数は `@intlayer/cli` からもエクスポートされており、独自のスクリプトから呼び出すことができます：

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

より低レベルのアクセスには、`@intlayer/chokidar/scan` の `scanWebsite` が構造化された `ScanResult` オブジェクトを返します：

```ts
import { scanWebsite } from "@intlayer/chokidar/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
