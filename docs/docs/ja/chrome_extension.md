---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: Chrome拡張機能、i18n & SEOスキャナー
description: Intlayer Chrome拡張機能を使用して、あらゆるWebサイトのi18n設定を検査します。フレームワーク、i18nライブラリ、ロケール、hreflangおよびSEOタグを検出し、完全なi18n SEO監査を実行します。
keywords:
  - Chrome拡張機能
  - i18nスキャナー
  - hreflangチェッカー
  - 多言語SEO
  - Intlayer
  - ローカリゼーション
  - 開発ツール
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "履歴を初期化"
author: aymericzip
---

# Chrome拡張機能: i18n & SEOスキャナー

## 概要

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) は、**Intlayer** の公式Chrome拡張機能です。任意のWebサイトで開くことで、そのサイトが国際化をどのように処理しているかを確認できます。使用されているフレームワークやi18nライブラリ、公開されているロケール、多言語SEOタグが正しく設定されているかどうかを素早く把握できます。

Intlayerを使用しているかどうかにかかわらず、すべてのWebサイトで動作します。

![Intlayer Chrome拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

拡張機能リンク: [https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

## 機能

- **技術検出**: フレームワーク（Next.js、Nuxt、Astro、SvelteKit、Angular、Vue.js、Qwik、React、Gatsby、WordPress）およびi18nライブラリ（Intlayer、i18next、Vue I18n、@nuxtjs/i18n、Angular @angular/localize、next-intl / next-i18next、Weglot、Localize、WPML、Polylang）を特定します。検出ごとに、グローバル変数、cookie、DOMマーカーなど、トリガーとなった証拠が表示されます。
- **ロケール**: `lang` 属性、hreflang、`og:locale` タグ、URLのロケールプレフィックス、ロケールcookieやストレージエントリから検出されたロケールを一覧表示します。
- **SEO i18nタグ**: `html lang`、`html dir`、カノニカルリンク、hreflangタグ、`x-default`、`og:locale`、ローカライズされた内部リンクの比率をチェックします。
- **完全監査**: [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) と同じ監査を実行し、ライブスコアを表示します。

## インストール

Chrome ウェブストアから [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) をインストールし、ツールバーに固定します。

この拡張機能は、ChromeおよびChrome ウェブストアの拡張機能をサポートするすべてのChromiumベースのブラウザ（Edge、Brave、Arc、Opera）で動作します。

## 使い方

### ページを検査する

1. 検査したいWebサイトを開きます。
2. ツールバーの **Intlayer i18n Scanner** アイコンをクリックします。
3. ポップアップに、現在のページの **検出された技術**、**ロケール**、**SEO i18nタグ** セクションが表示されます。

検出はブラウザ内でローカルに実行され、現在のタブでのみ動作します。

### 完全な監査を実行する

![Intlayer Chrome拡張機能 監査スコア](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

**完全監査** セクションまでスクロールし、**完全なi18n監査を実行** をクリックします。各チェックの完了に合わせて結果がリアルタイムで表示され、以下のようにグループ化されます。

- **ページ**: `html lang` および `dir` 属性、現在のロケール、hreflangタグ、`x-default`、カノニカルリンク、ローカライズされた内部リンク、言語セレクター、国旗アイコン、JavaScriptバンドルに含まれる未使用のロケールコンテンツ。
- **Robots.txt**: 存在の有無、およびロケールパスがクロール可能に保たれているかどうか。
- **サイトマップ**: 存在の有無、リストされた各ロケール、代替リンク、`x-default`。
- **ドメイン**: サイト全体で検出されたロケールの総数。

各チェックは合格、警告、または不合格としてマークされ、スコアによってページの総合的なi18n SEO健全性が要約されます。

## プライバシーと権限

この拡張機能は最小限の権限のみを要求します。

- **activeTab** および **scripting**: 検出機能は現在表示しているタブでのみ実行され、ポップアップを開いたときにのみ動作します。
- **back.intlayer.org**: 完全な監査を実行するときにのみ使用されます。現在のページのURLがスキャン対象としてIntlayer APIに送信されます。

閲覧履歴は収集されず、バックグラウンドで何も実行されません。

## よくある質問

<FAQ>

<Question title="WebサイトでIntlayerを使用している必要がありますか？">

いいえ。使用しているフレームワークやi18nライブラリに関係なく、あらゆるWebサイトを検査できます。

</Question>
<Question title="技術が検出されないのはなぜですか？">

検出は、グローバル変数、cookie、メタタグ、DOMマーカーなど、ページがブラウザで公開している情報に依存します。一部の本番ビルドではこれらのマーカーが削除されるため、痕跡を残さずにライブラリが使用されている場合があります。

</Question>
<Question title="監査で見つかった問題を修正するにはどうすればよいですか？">

ほとんどのチェックは、ルーティングまたはメタデータの設定に対応しています。Intlayerを使用すると、hreflang、カノニカル、`x-default`、ローカライズされたリンク、サイトマップ、robots.txtが[設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)から自動生成されます。フレームワークごとの統合ガイド（例: [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nextjs_16.md)、[Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_nuxt.md)、[TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_with_tanstack.md)）を参照してください。

</Question>

</FAQ>

## 関連ツール

- [VS Code拡張機能](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/vs_code_extension.md)
- [MCPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/mcp_server.md)
- [LSPサーバー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/lsp.md)
