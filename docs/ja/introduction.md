# Intlayer ドキュメント

Intlayer ドキュメントへようこそ。このガイドは、Intlayer の概要、主な機能、およびこれらの文書を効果的に活用して開発体験を向上させる方法を提供します。

## はじめに

### Intlayer とは？

**Intlayer** は、JavaScript 開発者向けに特別に設計された国際化ライブラリです。コード全体でコンテンツの宣言を可能にします。マルチリンガルコンテンツの宣言を構造化された辞書に変換し、コードに簡単に統合できるようにします。TypeScript を使用して、**Intlayer** は開発をより強力で効率的にします。

Intlayer は、コンテンツを簡単に編集および管理するためのオプションのビジュアルエディタも提供します。このエディタは、コードを心配することなくコンテンツを生成するチームや、ビジュアルインターフェースを好む開発者に特に便利です。

## 使用例

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### 主な機能

Intlayer は、現代のウェブ開発のニーズに合わせたさまざまな機能を提供します。以下は、各機能の詳細なドキュメントへのリンク付きの主な機能です。

- **国際化サポート**: 組み込みの国際化サポートでアプリケーションのグローバルリーチを拡大します。
- **ビジュアルエディタ**: Intlayer用に設計されたエディタプラグインで開発ワークフローを改善します。[ビジュアルエディタガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_editor.md)をご覧ください。
- **設定の柔軟性**: [設定ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/configuration.md)で詳述された広範な設定オプションを使用してセットアップをカスタマイズします。
- **高度な CLI ツール**: Intlayer のコマンドラインインターフェースを使用してプロジェクトを効率的に管理します。[CLI ツールドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_cli.md)でその機能を探ります。
- **i18n との互換性**: Intlayer は他の国際化ライブラリとシームレスに動作します。[i18n ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_i18next.md)で詳細をご覧ください。

### 対応プラットフォーム

Intlayer は Next.js および React アプリケーションとシームレスに動作するように設計されています。また、Vite および Create React App もサポートしています。

- **Next.js 統合**: サーバーサイドレンダリングおよび静的サイト生成のために、Intlayer 内で Next.js の力を活用します。詳細は[Next.js 統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_nextjs_15.md)でご覧ください。
- **Vite と React 統合**: サーバーサイドレンダリングおよび静的サイト生成のために、Intlayer 内で Vite を活用します。詳細は [Vite と React 統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_vite+react.md)でご覧ください。
- **Create React App 統合**: サーバーサイドレンダリングおよび静的サイト生成のために、Intlayer 内で Create React App の力を活用します。詳細は [Create React App 統合ガイド](https://github.com/aymericzip/intlayer/blob/main/docs/ja/intlayer_with_create_react_app.md)でご覧ください。

### このドキュメントの使い方

このドキュメントを最大限に活用するために：

1. **関連セクションに移動**: 上記のリンクを使用して、ニーズに応じたセクションに直接移動します。
2. **インタラクティブな例**: 利用可能な場合は、インタラクティブな例を使用して機能がリアルタイムでどのように動作するかを確認します。
3. **フィードバックと貢献**: あなたのフィードバックは貴重です。提案や修正がある場合は、ドキュメントへの貢献を検討してください。
