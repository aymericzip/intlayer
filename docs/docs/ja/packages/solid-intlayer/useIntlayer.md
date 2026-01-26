---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useIntlayer フック ドキュメント | solid-intlayer
description: solid-intlayer パッケージの useIntlayer フックの使用方法
keywords:
  - useIntlayer
  - 辞書
  - Intlayer
  - intlayer
  - 国際化
  - ドキュメント
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統一
---

# useIntlayer フックのドキュメント

`useIntlayer` フックは、キーを使って辞書からローカライズされたコンテンツを取得することを可能にします。Solidでは、このフックはロケールが変更されると自動的に更新されるリアクティブなアクセス関数（Accessor）を返します。

## 使用例

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## 説明

このフックは次の処理を行います:

1. **ロケール検出**: `IntlayerProvider` コンテキストから現在のロケールを使用します。
2. **辞書の注入**: Intlayer コンパイラによって生成された最適化済みの宣言を使用して、与えられたキーに対応する辞書の内容を自動的に注入します。
3. **リアクティビティ**: グローバルなロケール状態が変更されると自動的に再評価される Solid のアクセサ（`Accessor<T>`）を返します。
4. **翻訳処理**: 検出されたロケールに基づいてコンテンツを解決し、辞書内で見つかった `t()`、`enu()` 等の定義を処理します。

## パラメータ

- **key**: 辞書の一意のキー（content declaration files で定義されているもの）。
- **locale**（省略可）: 現在のロケールをオーバーライドします。

## 戻り値

ローカライズされたコンテンツを返すアクセサ関数（`() => Content`）。
