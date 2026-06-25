---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18n-jsからIntlayerへの移行"
description: "compatアダプタを使用してアプリケーションをi18n-jsからIntlayerに移行する方法を学びます。"
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# i18n-js から Intlayer への移行

`i18n-js` ライブラリから Intlayer への移行は、大規模な翻訳設定を Intlayer の構造化されたファイル解決システムにオフロードするために設計された、高度に最適化された移行です。

## やることリスト

リポジトリで次のセットアップコマンドを実行してください：

```bash
npx intlayer init
```

`intlayer.config.ts`を準備したら、バンドラー設定にIntlayerのエイリアスを追加して、`i18n-js`のインポートが互換性パッケージ`@intlayer/i18n-js`を対象とするようにすることができます。

## 内部的な動作

`i18n-js` は `i18n.t('scope.key', {name})` のような式を通じてネームスペースにアクセスし、ロケールフォールバックと特定の複数形マッピングに対応しています。

内部的には：

- **補間:** compat アダプターは `%{name}` マッピングをターゲットとするランタイム辞書値に簡単に解析します。
- **複数形:** `one/other` サブキーを置き換え、Intlayer の強力な基礎となる複数形メカニズム (`Intl.PluralRules`) に対してマップし、手動マッピングを抽象化します。
- **ロケール:** ブートストラップ時にモノリシック言語ペイロードを読み込む代わりに、ネイティブ Intlayer 設定を通じて現在のコンテキスト設定に基づいて辞書が最適に提供されます。
