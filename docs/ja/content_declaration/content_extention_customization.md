# コンテンツ拡張カスタマイズ

## コンテンツファイル拡張子

Intlayerでは、コンテンツ宣言ファイルの拡張子をカスタマイズすることができます。このカスタマイズにより、大規模プロジェクトの管理が柔軟になり、他のモジュールとの競合を避けることができます。

### デフォルトの拡張子

デフォルトでは、Intlayerは以下の拡張子を持つすべてのファイルをコンテンツ宣言として監視します：

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

これらのデフォルトの拡張子は、ほとんどのアプリケーションに適しています。ただし、特定のニーズがある場合は、ビルドプロセスを効率化し、他のコンポーネントとの競合のリスクを減らすためにカスタム拡張子を定義できます。

### コンテンツ拡張子のカスタマイズ

Intlayerがコンテンツ宣言ファイルを識別するために使用するファイル拡張子をカスタマイズするには、Intlayerの設定ファイルでそれらを指定できます。このアプローチは、監視プロセスの範囲を制限することでビルドパフォーマンスを向上させる大規模プロジェクトにとって有益です。

以下は、設定でカスタムコンテンツ拡張子を定義する方法の例です：

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
// カスタム拡張子
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // あなたのカスタム拡張子
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
// カスタム拡張子
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // あなたのカスタム拡張子
  },
};

module.exports = config;
```

この例では、設定が2つのカスタム拡張子：`.my_content.ts`と`.my_content.tsx`を指定しています。Intlayerは、これらの拡張子を持つファイルのみを監視して辞書を構築します。

### カスタム拡張子の利点

- **ビルドパフォーマンス**: 監視ファイルの範囲を減らすことで、大規模プロジェクトでのビルドパフォーマンスを大幅に向上させることができます。
- **競合回避**: カスタム拡張子は、プロジェクト内の他のJavaScriptまたはTypeScriptファイルとの競合を防ぎます。
- **整理**: カスタム拡張子を使用することで、プロジェクトのニーズに応じてコンテンツ宣言ファイルを整理できます。

### カスタム拡張子のガイドライン

コンテンツファイル拡張子をカスタマイズする際は、以下のガイドラインを考慮してください：

- **ユニーク性**: 競合を避けるために、プロジェクト内でユニークな拡張子を選択してください。
- **一貫した命名**: コードの可読性とメンテナンスのために、一貫した命名規則を使用してください。
- **一般的な拡張子の回避**: `.ts`や`.js`のような一般的な拡張子の使用は避け、他のモジュールやライブラリとの競合を防ぎましょう。

## 結論

Intlayerにおけるコンテンツファイル拡張子のカスタマイズは、パフォーマンスを最適化し、大規模アプリケーションでの競合を避けるための貴重な機能です。このドキュメントに示されているガイドラインに従うことで、コンテンツ宣言を効果的に管理し、プロジェクトの他の部分とのスムーズな統合を確保できます。
