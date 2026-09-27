---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: bunを使用するとモジュールが見つからないエラーが発生する
description: "Bun で Intlayer を使うときの「Cannot find package」エラーを修正。Bun の require() のスコープが原因で、解決する設定を紹介します。"
keywords:
  - bun
  - モジュールが見つからない
  - intlayer
  - 設定
  - パッケージマネージャー
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# bunを使用するとモジュールが見つからないエラーが発生する

## 問題の説明

bunを使用していると、以下のようなエラーが発生することがあります：

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## 原因

Intlayerは内部で`require`を使用しています。しかしbunは`require`関数のスコープを`@intlayer/config`パッケージのみに限定して解決し、プロジェクト全体を対象にしません。

## 解決策

### 設定で`require`関数を提供する

```ts
const config: IntlayerConfig = {
  build: {
    require, // require関数を提供
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // require関数を提供
});

export default configuration;
```
