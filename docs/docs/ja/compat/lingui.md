---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Linguiからintlayerへの移行"
description: "compat adapterを使用してLinguiアプリケーションからIntlayerへ移行する方法を学びます。"
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Linguiからの移行 Intlayer

現在、プロジェクトがLinguiのマクロベースのコンパイルに依存している場合、Intlayerへの移行により、強力なマクロワークフローを維持しながら、Intlayerの JSON コンパイル戦略でネイティブにサポートすることができます。

## 実施方法

まず、プロジェクトで Intlayer を初期化します:

```bash
npx intlayer init
```

これにより `intlayer.config.ts` が作成されます。ビルドステップで `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` を保持し、Intlayer compiler の _前に_ 実行されることを確認してください。その後、bundler plugin alias を使用して `@lingui/core` と `@lingui/react` を `@intlayer/lingui` にルーティングします。

## 内部動作

Linguiは、マクロ（`` t`Hello ${name}` ``および`<Trans>`など）を使用しており、これらは`i18n._(id, values)`のようなランタイム呼び出しにコンパイルされます。

内部動作:

- **マクロ:** これらは以前と同じようにコンパイルされ、ソース構文の中断がないことを保証します。
- **ランタイム翻訳:** エイリアス化された`i18n._()`はIntlayerの辞書を使用します。明示的に名付けられたIDとハッシュ化されたIDの両方が、Intlayerの`.po`同期プラグインを使用して完全にマップされ、キーを安全に集約およびプルーニングします。
- **ICU機能:** 複数形化、選択、およびICUバリアントのサポートは、Intlayerの統一されたICUパーサーにより堅牢であり、同じレンダリング出力を保証します。
