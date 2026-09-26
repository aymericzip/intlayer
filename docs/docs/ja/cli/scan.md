---
createdAt: 2026-06-11
updatedAt: 2026-09-26
priority: 5
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
  - version: 9.5.11
    date: 2026-09-26
    changes: "ルーティング戦略およびi18nスタック（ライブラリ、TMS）の検出。hreflangの相互参照、og:localeおよび言語スイッチャーのチェックを追加。robots.txtのサイトマップ、サイトマップインデックスおよびgzip圧縮サイトマップの追跡に対応"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`--ci` フラグを追加"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scanコマンドの追加"
author: aymericzip
---

# ウェブサイトのスキャン

`scan` コマンドは、公開URLを取得し、総ページサイズを測定し、そのページの i18n および SEO の健全性を監査します。HTML属性、カノニカルリンク、hreflangタグおよびその相互リンク、robots.txt、サイトマップ、ローカライズされた内部リンク、およびJavaScriptバンドル内のロケールデータ重量をカバーするスコア付きレポート（0〜100）を生成します。

また、サイトがURL内でロケールをどのようにエンコードしているか（ルーティング戦略）、および使用しているフレームワーク、i18nライブラリ、翻訳管理システム（TMS）、翻訳プロキシを報告します。これらと同じチェックが [オンライン i18n SEO スキャナー](https://intlayer.org/i18n-seo-scanner) や Intlayer Chrome 拡張機能でも動作しています。

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
🔍 Scanned https://example.com/fr (basic mode)

Score: 91/100
Page size: 10.60 MB (HTML 42.31 KB)
Locales: fr, en, es, de
Routing: locale prefix except for the default locale (every hreflang alternate but "en" starts with a locale segment, default locale: en)

Stack:
  Framework Next.js 15.1.0 (window.next.version)
  i18n library next-intl (JavaScript bundle contains "X-NEXT-INTL-LOCALE")
  TMS Crowdin (loads https://distributions.crowdin.net/…)

Checks:
  ✓ html lang attribute
  ✓ html dir attribute
  ✓ locale signals consistent (lang, URL, hreflang)
  ⚠ og:locale meta tag
      Missing <meta property="og:locale">: social previews default to en_US
  ✓ canonical link
  ✓ hreflang tags
  ✓ x-default hreflang
  ✓ hreflang alternates link back
  ✓ unused bundle locale content
  ✓ localized internal links
  ⚠ all internal links keep the locale
      2 internal links leave the "fr" locale (0 to another locale, 2 without locale)
        <a href="/pricing">Tarifs</a>
  ✓ crawlable language switcher
  ✓ robots.txt present
  ✓ robots.txt keeps localized URLs crawlable
  ✓ sitemap present
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
- **`--ci`** — モノレポ内のすべての Intlayer プロジェクトでコマンドを実行します（プロジェクトディレクトリ内から実行した場合はそのプロジェクトのみ）。プロジェクトごとの資格情報は、プロジェクトパスを `{ "clientId", "clientSecret" }` に対応付ける JSON オブジェクト `INTLAYER_PROJECT_CREDENTIALS` から挿入できます。
- **`--verbose`** — 詳細ログを有効にします（CLIモードではデフォルト）。
- **`--prefix`** — カスタムログプレフィックス。

## ルーティング戦略

ページのhreflang代替タグで共有されるロケールパターンから、サイトがどのようにロケールをルーティングしているかが判明します。代替タグがない場合は、スキャン対象のURLのみが使用されます（信頼度：低）。

| 戦略                | 例                                          |
| ------------------- | ------------------------------------------- |
| `prefix-all`        | `/en/about`, `/fr/about`                    |
| `prefix-no-default` | `/about`（デフォルトロケール）, `/fr/about` |
| `search-params`     | `/about?lang=fr`                            |
| `subdomain`         | `fr.example.com`                            |
| `domain`            | `example.fr`, `example.de`                  |
| `no-prefix`         | すべてのロケールで同一URL（Cookie）         |

リンク、カノニカル、robots.txt、サイトマップの各チェックは、この戦略を通して各URLを判定します。たとえば、プレフィックスなしのリンクは `prefix-no-default` サイトのデフォルトロケールでは正しく、`?lang=` のないリンクは `search-params` サイトではロケールから離脱したと判定されます。

## 検出されたスタック

HTML、読み込まれたリソース、JavaScriptバンドルから、フレームワーク、i18nライブラリ（Intlayer, i18next, react-i18next, next-i18next, next-intl, use-intl, react-intl, vue-i18n, @nuxtjs/i18n, Lingui, svelte-i18n, Paraglide, ngx-translate, Transloco, Polylang, WPML…）、翻訳管理システム（Crowdin, Phrase, Lokalise, locize, Transifex, Tolgee, Localazy, SimpleLocalize, Localizely, Smartling, Intlayer CMS）、および翻訳プロキシ（Weglot, Localize, GTranslate…）が特定されます。詳細モードでは、windowグローバル変数やCookieも読み取ります。

## チェック項目

| チェック                        | 説明                                                                                                   | スコアの重み |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------ |
| `html lang`                     | `<html lang>` が存在し、有効なBCP 47タグである                                                         | 9            |
| `html dir`                      | 右から左へ記述する言語に対して `dir="rtl"` が設定されている（デフォルトは `ltr`）                      | 3            |
| `locale signals consistent`     | `<html lang>`、URLのロケール、および自己参照hreflangエントリが一致している                             | 5            |
| `og:locale`                     | `og:locale` が設定されており、`<html lang>` と一致している                                             | 3            |
| `canonical`                     | カノニカルリンクが存在し、別のロケールバージョンを指していない                                         | 10           |
| `hreflang`                      | 有効なコード、絶対URL、重複なし、自己参照を含むhreflangタグが存在する                                  | 9            |
| `x-default hreflang`            | `x-default` hreflangの代替が存在する                                                                   | 7            |
| `hreflang alternates link back` | 代替ページが200で応答し、リダイレクトされず、元のページへリンクを返し、言語を宣言している              | 8            |
| `localized links`               | 内部リンクがページのロケールを指している                                                               | 8            |
| `all links keep the locale`     | 内部リンクでロケールが切り替わったり失われたりしていない                                               | 6            |
| `language switcher`             | クロール可能な `<a href>` による他言語バージョンへのリンクが存在する                                   | 6            |
| `robots.txt present`            | `/robots.txt` が 200 応答を返す                                                                        | 10           |
| `robots.txt localized URLs`     | サイトおよびそのローカライズされたURLがGooglebotに対してブロックされていない                           | 8            |
| `sitemap present`               | サイトマップが見つかる（robots.txtの `Sitemap:` ディレクティブ、`/sitemap.xml`、`/sitemap_index.xml`） | 10           |
| `sitemap locale coverage`       | すべてのロケールがリストされ、代替リンクを持つエントリが自身もリストしている                           | 9            |
| `sitemap alternates`            | サイトマップに `hreflang` 代替リンクが含まれている                                                     | 8            |
| `sitemap x-default`             | サイトマップに `x-default` hreflangが含まれている                                                      | 7            |
| `unused bundle content`         | メインJSバンドルに他のロケールの翻訳が余計に含まれていない                                             | 8            |

警告の場合は重みの半分が得られます。最終スコアは、実行されたチェックの加重合計をパーセンテージ（0〜100）で表したものです。失敗したチェックは最初に見つかった問題を表示します。詳細については `--json` を使用してください。

## プログラムによるスキャン機能の使用

`scan` 関数は `@intlayer/cli` からもエクスポートされており、独自のスクリプトから呼び出すことができます：

```ts
import { scan } from "@intlayer/cli";

await scan("https://example.com", {
  deep: false,
  json: false,
});
```

より低レベルのアクセスには、`@intlayer/engine/scan` の `scanWebsite` が構造化された `ScanResult` オブジェクトを返します：

```ts
import { scanWebsite } from "@intlayer/engine/scan";

const result = await scanWebsite("https://example.com", { deep: false });
console.log(result.score, result.totalPageSize, result.events);
```
