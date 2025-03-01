# コンテンツ拡張機能のカスタマイズ

## コンテンツファイルの拡張子

Intlayerは、コンテンツ宣言ファイルの拡張子をカスタマイズすることを可能にします。このカスタマイズにより、大規模プロジェクトの管理が柔軟になり、他のモジュールとの競合を回避するのに役立ちます。

### デフォルトの拡張子

デフォルトでは、Intlayerは以下の拡張子を持つすべてのファイルをコンテンツ宣言として監視します:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

これらのデフォルトの拡張子は、ほとんどのアプリケーションに適しています。ただし、特定のニーズがある場合は、カスタム拡張子を定義してビルドプロセスを効率化し、他のコンポーネントとの競合リスクを軽減することができます。

### コンテンツ拡張子のカスタマイズ

Intlayerがコンテンツ宣言ファイルを識別するために使用するファイル拡張子をカスタマイズするには、Intlayerの設定ファイルで指定できます。このアプローチは、監視プロセスの範囲を制限することでビルドパフォーマンスを向上させる大規模プロジェクトに有益です。

以下は、設定でカスタムコンテンツ拡張子を定義する例です:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // カスタム拡張子
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // カスタム拡張子
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // カスタム拡張子
  },
};

module.exports = config;
```

この例では、設定で2つのカスタム拡張子 `.my_content.ts` と `.my_content.tsx` を指定しています。Intlayerはこれらの拡張子を持つファイルのみを監視して辞書を構築します。

### カスタム拡張子の利点

- **ビルドパフォーマンス**: 監視対象ファイルの範囲を減らすことで、大規模プロジェクトでのビルドパフォーマンスが大幅に向上します。
- **競合回避**: カスタム拡張子は、プロジェクト内の他のJavaScriptやTypeScriptファイルとの競合を防ぎます。
- **整理整頓**: カスタム拡張子を使用することで、プロジェクトのニーズに応じてコンテンツ宣言ファイルを整理できます。

### カスタム拡張子のガイドライン

コンテンツファイルの拡張子をカスタマイズする際には、以下のガイドラインを考慮してください:

- **一意性**: プロジェクト内で一意の拡張子を選択して競合を回避してください。
- **一貫した命名**: コードの可読性と保守性を向上させるために、一貫した命名規則を使用してください。
- **一般的な拡張子の回避**: `.ts` や `.js` のような一般的な拡張子の使用は避け、他のモジュールやライブラリとの競合を防ぎます。

## 結論

Intlayerでのコンテンツファイル拡張子のカスタマイズは、大規模アプリケーションでのパフォーマンス最適化や競合回避に役立つ貴重な機能です。このドキュメントで説明したガイドラインに従うことで、コンテンツ宣言を効果的に管理し、プロジェクトの他の部分とのスムーズな統合を確保できます。
