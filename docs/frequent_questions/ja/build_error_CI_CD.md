---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CDでのビルドエラー
description: CI/CD環境で発生するビルドエラーの修正方法を学びます。
keywords:
  - ビルド
  - エラー
  - ci
  - cd
  - パイプライン
  - intlayer
  - 辞書
  - next.js
  - プレビルド
  - 自動化
slugs:
  - doc
  - faq
  - build-error-ci-cd
---

# CI/CDでのビルドエラー

Next.jsで以下のようなエラーが発生した場合：

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

いくつかの解決策を紹介します：

## 1. 辞書が不足している

ビルドの段階で辞書がビルドされていることを確認してください。

ローカルではビルドが成功するのに、CI/CDでは失敗することがよくあります。その理由は、ローカル環境では `.intlayer` ディレクトリが存在しますが、CI/CDではビルドから除外されているためです。

これを修正するには、プロジェクトの `package.json` にプリビルドスクリプトを追加してください。

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // ビルドの前に実行されます
    "build": "next build",
  },
}
```

> `withIntlayer` 関数や、フレームワーク用の同等のバンドラープラグインを使用している場合は、プリビルドスクリプトがビルド前に自動的に実行されます。

## 2. ビルド時／実行時の環境変数が不足している

コンテナや自動デプロイプラットフォームでは、`.env` ファイルをビルドから除外することが推奨されます。

```text fileName=".gitignore or .dockerignore"
# 環境変数
.env
**/.env
.env.*
**/.env.*
```

ビルド時に環境変数が利用できない場合、エラーが発生します。

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
});
```

これはおそらく Intlayer に関連する問題ではありません。CI/CD プラットフォーム上のビルド時に環境変数を確認してください。
