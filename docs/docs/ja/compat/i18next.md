---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "i18nextからIntlayerへの移行"
description: "compat adapterを使用して、Vanilla JS/TSアプリケーションをi18nextからIntlayerに移行する方法を学びます。"
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# i18nextからIntlayerへの移行

詳細なステップバイステップのチュートリアルについては、[i18next Migration Guide](../migration_from_i18next_to_intlayer.md)をご覧ください。

Intlayerは`i18next`のコア実行時特性を完全に複製します。compatパッケージを利用することで、Vanillaアプリケーションまたは内部モジュールは引き続き馴染みのある構文を活用できます。

## やることリスト

まず、プロジェクトで Intlayer を初期化します：

```bash
npx intlayer init
```

Vite を使用している場合、Intlayer プラグインを含めて `@intlayer/i18next` へのインポートをルーティングしてください：

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## 内部動作

`i18nextVitePlugin` は `i18next` インポートを `@intlayer/i18next` にエイリアスし、JSON ファイル含有によるバンドル肥大化を回避します。

内部動作:

- **インスタンス設定:** `createInstance` は名前空間フォールバックを正しく解析・適用し、Intlayer のコンパイルパイプラインを活用して辞書取得を行います。
- **補間:** `{{name}}` 置換と `$t(key)` ネストの再帰的なネイティブサポート。
- **コンテキスト & 複数形:** `key_male` や `key_one`/`key_other` のようなサフィックス形式を識別・解決し、標準 `Intl.PluralRules` に対して評価します。
- **オブジェクト返却:** `returnObjects: true` モードは Intlayer 辞書からツリーを安全に抽出します。
