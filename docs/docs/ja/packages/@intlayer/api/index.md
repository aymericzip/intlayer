---
docName: packages__intlayer__api
url: https://intlayer.org/doc/packages/intlayer/api
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/packages/@intlayer/api/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - Intlayer API統合のためのSDK
description: コンテンツ監査、組織、プロジェクト、ユーザー管理のためにIntlayer APIと連携するソフトウェア開発キット（SDK）を提供するNPMパッケージ。
keywords:
  - intlayer
  - API
  - SDK
  - 統合
  - コンテンツ監査
  - 組織
  - プロジェクト
  - JavaScript
---

# @intlayer/api: Intlayer APIと連携するためのNPMパッケージ

**Intlayer** はJavaScript開発者向けに特別に設計されたパッケージ群です。ReactやExpress.jsなどのフレームワークと互換性があります。

**`@intlayer/api`** パッケージは、Intlayer APIと連携するためのSDK（ソフトウェア開発キット）です。コンテンツ宣言の監査、組織、プロジェクト、ユーザーとのやり取りなどの機能を提供します。

## 使用方法

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## インストール

お好みのパッケージマネージャーを使用して必要なパッケージをインストールしてください：

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## ドキュメント履歴

- 5.5.10 - 2025-06-29: 初期履歴
