---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "next-intl から Intlayer への移行"
description: "compat アダプタを使用して、Next.js アプリケーションを next-intl から Intlayer に移行する方法を学びます。"
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# next-intl から Intlayer への移行

完全で詳細なステップバイステップチュートリアルについては、[next-intl 移行ガイド](../migration_from_next-intl_to_intlayer.md)を参照してください。

`next-intl` から Intlayer への移行により、アプリケーションのルーティングとシンタックスを完全に変更せずに維持できます。

## やること

リポジトリで次のコマンドを実行します:

```bash
npx intlayer init
```

これにより `intlayer.config.ts` が作成されます。`next.config.ts` で、プラグインラッパーを使用して `next-intl` のエイリアスを `@intlayer/next-intl` にシームレスに注入します。

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## 内部的な動作

bundlerラッパーは翻訳を置き換えますが、**`next-intl/navigation`の機能は損なわれません**（例：`Link`、`redirect`、`usePathname`）。

内部的には：

- **ICU runtime:** 複数形（`=0`、`one`、`other`）、select/selectordinal、`#`引数、フォーマット済み引数（`{ts, date, long}`）は、共有の`resolveMessage(..., 'icu')`リゾルバーを使用して正しく実行されます。
- **`useTranslations()` & `getTranslations()`:** ベアスコープの呼び出しは、最初のキーセグメントを正しい辞書識別子として抽出します。ネストされた名前空間は、辞書パスとプレフィックスに適切に分割されます。
- **Rich formatting:** `t.rich()`と`t.markup()`の両方が完全にネイティブに実装され、HTML風のノードをレンダリングされたReactチャンクに変換します。
- **`useFormatter`:** `relativeTime`、`list`、`dateTimeRange`、および設定からの名前付きフォーマットが、コアのネイティブな`Intl`フォーマッターにブリッジされます。
