# Intlayer Documentation

Intlayerドキュメントへようこそ。このガイドは、Intlayerの概要、主な機能、およびこれらの文書を効果的に活用して開発体験を向上させる方法を提供します。

## Introduction

### What is Intlayer?

**Intlayer**は、JavaScript開発者のために特別に設計された国際化ライブラリです。コード内のどこにでもコンテンツを宣言することを可能にします。マルチリンガルコンテンツの宣言を構造化された辞書に変換し、コードに簡単に組み込めるようにします。TypeScriptを使用することで、**Intlayer**は開発をより強化し、効率化します。

Intlayerは、コンテンツを簡単に編集および管理できるオプションのビジュアルエディタも提供します。このエディタは、コンテンツ管理のためのビジュアルインターフェースを好む開発者や、コードを気にせずにコンテンツを生成するチームに特に便利です。

## Example of usage

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Main Features

Intlayerは、現代のウェブ開発のニーズに応えるために特化したさまざまな機能を提供します。以下は、各機能の詳細なドキュメントへのリンクとともに、主な機能です。

- **Internationalization Support**: 国際化をサポートするビルトイン機能でアプリケーションのグローバルなリーチを向上させます。
- **Visual Editor**: Intlayer向けのエディタプラグインで開発ワークフローを改善します。[Visual Editor Guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)をご覧ください。
- **Configuration Flexibility**: [Configuration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)に詳細に記載された広範な設定オプションでセットアップをカスタマイズします。
- **Advanced CLI Tools**: Intlayerのコマンドラインインターフェースを使用してプロジェクトを効率的に管理します。[CLI Tools Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)で機能を探ってください。
- **Compatibility with i18n**: Intlayerは他の国際化ライブラリとシームレスに動作します。[i18n Guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_i18next.md)で詳細をご覧ください。

### Platforms Supported

Intlayerは、Next.jsおよびReactアプリケーションとシームレスに動作するように設計されています。また、ViteおよびCreate React Appもサポートしています。

- **Next.js Integration**: サーバーサイドレンダリングおよび静的サイト生成のために、Intlayer内でNext.jsのパワーを利用します。詳細は、[Next.js Integration Guide](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)をご覧ください。
- **Vite and React Integration**: サーバーサイドレンダリングおよび静的サイト生成のために、Intlayer内でViteを活用します
