---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Next Translateから Intlayerへの移行"
description: "compat adapterを使用して、Next.jsアプリケーションをnext-translateからIntlayerに移行する方法を学びます。"
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Next Translateから Intlayerへの移行

`next-translate` から Intlayer への移行は、既存の構文とタグを保持するほぼドロップイン置換です。

## やること

プロジェクトで Intlayer を初期化します:

```bash
npx intlayer init
```

CLI があなたの設定をスキャフォルドします。その後、`next.config.ts` で Intlayer プラグインを適用でき、ビルド時に `next-translate/useTranslation` を `@intlayer/next-translate` にマッピングするサブパスエイリアスを注入します。

## 内部的な動作

`next-translate` は `useTranslation('ns')`、`t('ns:key.path')`、および `<Trans>` コンポーネントなどのフックを提供します。

内部的には：

- **補間とプルーラル:** `react-i18next` アダプターの動作に密接に依存しています。`{{var}}` プレースホルダーと `key_0`、`key_one`、`key_other` などのサフィックスからマップされたプルーラル化が動的に処理されます。
- **`<Trans>` コンポーネント:** HTML風のタグ解析が、配列ベースの `components` プロップと共に直接サポートされています。
- **Namespaces:** サブパスエイリアシングにより、`useTranslation` が手動修正なしに正しい内部辞書 namespace を参照することを保証します。
