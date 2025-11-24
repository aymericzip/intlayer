---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: ライブ同期コマンド
description: ランタイムでCMSのコンテンツ変更を反映するためのライブ同期の使い方を学びます。
keywords:
  - ライブ同期
  - CMS
  - ランタイム
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
---

# ライブ同期コマンド

ライブ同期を使うと、アプリがランタイムでCMSのコンテンツ変更を反映できます。再ビルドや再デプロイは不要です。有効にすると、更新はライブ同期サーバーにストリーミングされ、アプリケーションが読み込む辞書が更新されます。詳細は[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)を参照してください。

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## 引数:

**設定オプション:**

- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。intlayerの設定を取得するために、コマンドはベースディレクトリ内の `intlayer.config.{ts,js,json,cjs,mjs}` ファイルを探します。

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer dictionary push --env-file .env.production.local`

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。（CLIではデフォルトでtrue）
