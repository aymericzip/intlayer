---
docName: intlayer_with_i18next
url: https://intlayer.org/blog/intlayer-with-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/intlayer_with_i18next.md
createdAt: 2024-12-24
updatedAt: 2025-06-29
title: IntlayerとI18next
description: 最適な国際化のためにIntlayerをi18nextと統合します。両フレームワークを比較し、それらを一緒に設定する方法を学びます。
keywords:
  - Intlayer
  - i18next
  - 国際化
  - i18n
  - ローカライゼーション
  - 翻訳
  - React
  - Next.js
  - JavaScript
  - TypeScript
---

# Internationalization with Intlayer and i18next

i18nextは、JavaScriptアプリケーション向けに設計されたオープンソースの国際化（i18n）フレームワークです。これは、ソフトウェアプロジェクトにおける翻訳、ローカライズ、および言語切り替えの管理に広く使用されています。ただし、スケーラビリティや開発を複雑にするいくつかの制限があります。

Intlayerは、これらの制限に対処する別の国際化フレームワークであり、コンテンツの宣言と管理により柔軟なアプローチを提供します。i18nextとIntlayerの間のいくつかの主要な違いと、両方を最適な国際化のために設定する方法について探ってみましょう。

## Intlayer vs. i18next: 主な違い

### 1. コンテンツの宣言

i18nextでは、翻訳辞書は特定のフォルダーに宣言する必要があり、アプリケーションのスケーラビリティを複雑にする可能性があります。対照的に、Intlayerではコンテンツをコンポーネントと同じディレクトリ内で宣言できます。これにはいくつかの利点があります：

- **コンテンツ編集の簡素化**: ユーザーは編集する正しい辞書を探す必要がなく、エラーの可能性が減ります。
- **自動適応**: コンポーネントの位置が変更されたり削除されたりした場合、Intlayerは自動的に検出して適応します。

### 2. 設定の複雑さ

i18nextの設定は複雑で、特にサーバーサイドコンポーネントとの統合やNext.jsのようなフレームワークのミドルウェアの設定時に複雑です。Intlayerはこのプロセスを簡素化し、より簡単な設定を提供します。

### 3. 翻訳辞書の一貫性

異なる言語間で翻訳辞書の一貫性を確保することは、i18nextでは困難です。この不一致により、適切に処理されない場合にはアプリケーションがクラッシュする可能性があります。Intlayerは、翻訳されたコンテンツに制約を課すことでこれに対応し、翻訳が漏れず、翻訳コンテンツが正確であることを保証します。

### 4. TypeScriptとの統合

IntlayerはTypeScriptとの統合が良好で、コード内のコンテンツの自動提案を可能にし、開発効率を向上させます。

### 5. アプリケーション間でのコンテンツの共有

Intlayerは、複数のアプリケーションおよび共有ライブラリ間でのコンテンツ宣言ファイルの共有を容易にします。この機能により、より大規模なコードベース全体で一貫した翻訳を維持することが容易になります。

## Intlayerでi18next辞書を生成する方法

### i18next辞書をエクスポートするためのIntlayerの設定

> 重要な注意事項

> i18next辞書のエクスポートは現在ベータ版であり、他のフレームワークとの1:1の互換性を保証しません。問題を最小限に抑えるために、Intlayerに基づいた設定を維持することをお勧めします。

i18next辞書をエクスポートするには、Intlayerを適切に設定する必要があります。以下に、Intlayerを設定してIntlayerとi18next辞書の両方をエクスポートする方法の例を示します。

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // IntlayerがIntlayerとi18nextの辞書の両方をエクスポートすることを示します
    dictionaryOutput: ["intlayer", "i18next"],
    // プロジェクトルートからi18n辞書がエクスポートされるディレクトリまでの相対パス
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // IntlayerがIntlayerとi18nextの辞書の両方をエクスポートすることを示します
    dictionaryOutput: ["intlayer", "i18next"],
    // プロジェクトルートからi18n辞書がエクスポートされるディレクトリまでの相対パス
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // IntlayerがIntlayerとi18nextの辞書の両方をエクスポートすることを示します
    dictionaryOutput: ["intlayer", "i18next"],
    // プロジェクトルートからi18n辞書がエクスポートされるディレクトリまでの相対パス
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

module.exports = config;
```

設定に'i18next'を含めることで、IntlayerはIntlayer辞書に加えて専用のi18next辞書を生成します。設定から'intlayer'を削除すると、React-IntlayerやNext-Intlayerとの互換性に問題が生じる場合があります。

### i18next設定に辞書をインポートする

生成された辞書をi18nextの設定にインポートするには、'i18next-resources-to-backend'を使用できます。以下は、i18next辞書をインポートする方法の例です。

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // あなたのi18next設定
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // あなたのi18next設定
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // あなたのi18next設定
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```
