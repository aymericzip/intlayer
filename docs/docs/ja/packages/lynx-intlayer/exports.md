---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: lynx-intlayer パッケージのドキュメント
description: Intlayer を Lynx で利用するためのサポート。ロケールサポート用のポリフィルを提供します。
keywords:
  - lynx-intlayer
  - lynx
  - 国際化
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: すべてのエクスポートのドキュメントを統一
---

# lynx-intlayer パッケージ

`lynx-intlayer` パッケージは Intlayer を Lynx アプリケーションに統合するために必要なツールを提供します。

## インストール

```bash
npm install lynx-intlayer
```

## エクスポート

### ポリフィル

インポート:

```tsx
import "lynx-intlayer";
```

| 関数 | 説明 |
| 関数 | 説明 |
| ------------------ | ----------------------------------------------------------------------- |
| `intlayerPolyfill` | Lynx が Intlayer をサポートするために必要な polyfills を適用する関数。 |

### Rsbuild プラグイン

この `lynx-intlayer` パッケージは、Intlayer を Lynx のビルドプロセスに統合するための Rsbuild プラグインを提供します。

Import:

```tsx
import "lynx-intlayer";
```

| 関数                 | 説明                                                     |
| -------------------- | -------------------------------------------------------- |
| `pluginIntlayerLynx` | Intlayer を Lynx のビルドに統合する Rsbuild プラグイン。 |
