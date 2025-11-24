---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 翻訳の欠落をテストする
description: 辞書内の翻訳の欠落をテストし特定する方法を学びます。
keywords:
  - テスト
  - 翻訳の欠落
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# 翻訳の欠落をテストする

```bash
npx intlayer content test
```

## エイリアス:

- `npx intlayer test`

このコマンドは、コンテンツ宣言ファイルを解析し、設定されたすべてのロケールで欠落している翻訳を特定します。どの翻訳キーがどのロケールで欠落しているかを示す包括的なレポートを提供し、多言語コンテンツの一貫性を維持するのに役立ちます。

## 出力例:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## 引数:

**設定オプション:**

- **`--env`**: 環境を指定します（例: `development`、`production`）。
- **`--env-file [envFile]`**: 変数を読み込むためのカスタム環境ファイルを指定します。
- **`--base-dir`**: プロジェクトのベースディレクトリを指定します。

  > 例: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: キャッシュを無効にします。

  > 例: `npx intlayer build --no-cache`

**準備オプション:**

- **`--build`**: プッシュ前に辞書をビルドして、コンテンツが最新であることを保証します。true はビルドを強制し、false はビルドをスキップし、undefined はビルドのキャッシュを使用します。

**ログオプション:**

- **`--verbose`**: デバッグのために詳細なログを有効にします。（CLIではデフォルトでtrue）

  > 例: `npx intlayer content test --verbose`

## 例:

```bash
npx intlayer content test --verbose
```

この出力により、すべての設定されたロケールでアプリケーションが正しく動作するために、どの翻訳を完了する必要があるかを迅速に特定できます。
