---
docName: dictionary__content_extention_customization
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/dictionary/content_extention_customization.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: コンテンツ拡張子のカスタマイズ
description: コンテンツ宣言ファイルの拡張子をカスタマイズする方法を学びます。このドキュメントに従って、プロジェクトで条件を効率的に実装してください。
keywords:
  - コンテンツ拡張子のカスタマイズ
  - ドキュメント
  - Intlayer
---

# コンテンツ拡張子のカスタマイズ

## コンテンツファイルの拡張子

Intlayerでは、コンテンツ宣言ファイルの拡張子をカスタマイズすることができます。このカスタマイズにより、大規模プロジェクトの管理が柔軟になり、他のモジュールとの競合を回避するのに役立ちます。

### デフォルトの拡張子

デフォルトでは、Intlayerは以下の拡張子を持つすべてのファイルをコンテンツ宣言用として監視します：

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

これらのデフォルト拡張子はほとんどのアプリケーションに適しています。しかし、特定のニーズがある場合は、カスタム拡張子を定義してビルドプロセスを効率化し、他のコンポーネントとの競合リスクを減らすことができます。

### コンテンツ拡張子のカスタマイズ

Intlayerがコンテンツ宣言ファイルを識別するために使用するファイル拡張子をカスタマイズするには、Intlayerの設定ファイルでそれらを指定できます。この方法は、監視プロセスの範囲を制限することでビルドパフォーマンスを向上させる大規模プロジェクトに特に有効です。

以下は、設定ファイルでカスタムコンテンツ拡張子を定義する例です：

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // あなたのカスタム拡張子
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // あなたのカスタム拡張子
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // あなたのカスタム拡張子
  },
};

module.exports = config;
```

この例では、設定ファイルで2つのカスタム拡張子 `.my_content.ts` と `.my_content.tsx` が指定されています。Intlayerはこれらの拡張子を持つファイルのみを監視して辞書を構築します。

### カスタム拡張子の利点

- **ビルドパフォーマンス**: 監視対象のファイル範囲を絞ることで、大規模プロジェクトにおけるビルドパフォーマンスが大幅に向上します。
- **競合回避**: カスタム拡張子は、プロジェクト内の他のJavaScriptやTypeScriptファイルとの競合を防ぐのに役立ちます。
- **整理整頓**: カスタム拡張子を使用することで、プロジェクトのニーズに応じてコンテンツ宣言ファイルを整理することができます。

### カスタム拡張子のガイドライン

コンテンツファイルの拡張子をカスタマイズする際は、以下のガイドラインを守ってください。

- **一意性**: 競合を避けるために、プロジェクト内で一意の拡張子を選択してください。
- **一貫した命名**: コードの可読性と保守性を高めるために、一貫した命名規則を使用してください。
- **一般的な拡張子の回避**: 他のモジュールやライブラリとの競合を防ぐために、`.ts`や`.js`などの一般的な拡張子の使用は避けてください。

## 結論

- **競合回避**: カスタム拡張子は、プロジェクト内の他のJavaScriptやTypeScriptファイルとの競合を防ぐのに役立ちます。
- **整理整頓**: カスタム拡張子を使用することで、プロジェクトのニーズに応じてコンテンツ宣言ファイルを整理できます。

### カスタム拡張子のガイドライン

コンテンツファイルの拡張子をカスタマイズする際は、以下のガイドラインを守ってください：

- **一意性**: プロジェクト内で一意の拡張子を選び、競合を避けること。
- **一貫した命名**: コードの可読性とメンテナンス性を高めるために、一貫した命名規則を使用すること。
- **一般的な拡張子の回避**: `.ts` や `.js` のような一般的な拡張子は、他のモジュールやライブラリとの競合を避けるために使用しないこと。

## 結論

Intlayerでコンテンツファイルの拡張子をカスタマイズすることは、大規模アプリケーションのパフォーマンス最適化や競合回避に役立つ重要な機能です。本ドキュメントで示したガイドラインに従うことで、コンテンツ宣言を効果的に管理し、プロジェクトの他の部分とのスムーズな統合を実現できます。

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 履歴初期化
