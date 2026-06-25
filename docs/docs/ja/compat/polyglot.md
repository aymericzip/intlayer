---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Polyglot.jsからIntlayerへの移行"
description: "compat adapterを使用してPolyglot.jsからIntlayerに移行する方法を学びます。"
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Polyglot.js から Intlayer への移行

Airbnb の Polyglot.js を使用している場合、compat layer を使用すると Intlayer への移行は非常に簡単です。

## 実施内容

プロジェクトで初期化コマンドを実行するだけです:

```bash
npx intlayer init
```

これにより `intlayer.config.ts` が生成されます。その後、bundler プラグインエイリアスを使用して、Polyglot のインポートを `@intlayer/polyglot` に透過的にリダイレクトできます。

## 内部的な動作

Polyglot.js の構文は通常、`polyglot.t('key', {name})` と `%{name}` インターポレーション、および `"singular |||| plural"` で区切られた `smart_count` 複数形に依存します。

内部的には:

- **インターポレーション:** 互換性レイヤーはネイティブに `%{var}` プレースホルダーを処理します。
- **複数形:** 文字列は `||||` で分割され、アクティブなロケールに従って native `Intl.PluralRules` に対して評価され、ロケールごとに Polyglot 独自のバケット順序をミラーリングします。
- **辞書:** `new Polyglot()` に巨大な JSON 設定を提供する必要がなくなります。Intlayer は辞書を動的に処理し、自動的にプルーニングします。
