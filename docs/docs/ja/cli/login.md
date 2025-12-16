---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - ログイン
description: Intlayer CLI の login コマンドを使用して Intlayer CMS に認証し、アクセス認証情報を取得する方法を学びます。
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Intlayer CLI ログインコマンド

---

## 説明

Intlayer CLI の `login` コマンドは Intlayer CMS に対して認証を行うためのコマンドです。このコマンドは既定のブラウザを自動的に開き、認証プロセスを完了して Intlayer サービスを利用するために必要な認証情報（Client ID と Client Secret）を受け取ります。

## 使用方法

```bash
npx intlayer login [options]
```

または

```bash
intlayer login [options]
```

## オプション

### `--cms-url <url>`

認証のために接続する Intlayer CMS の URL を指定します。

- **型**: `string`
- **既定値**: `intlayer.config.*` に設定された値、または `https://intlayer.org`
- **例**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### 設定オプション

一般的な設定オプションも使用できます:

- `--env-file <path>`: 環境ファイルへのパス
- `-e, --env <env>`: 実行環境
- `--base-dir <dir>`: プロジェクトのベースディレクトリ
- `--verbose`: 詳細出力を有効にする（デフォルト: true）
- `--prefix <prefix>`: ログのプレフィックス

## 動作の仕組み

1. **ローカルサーバーの起動**: このコマンドは CMS から認証情報を受け取るためにランダムなポートでローカル HTTP サーバーを起動します
2. **ブラウザの起動**: コマンドは既定のブラウザで CMS のログイン URL を自動的に開きます
3. **認証**: ブラウザで Intlayer アカウントを使用して認証を完了します
4. **認証情報の受信**: ローカルサーバーが CMS から Client ID と Client Secret を受け取ります
5. **手順**: コマンドはプロジェクトで認証情報を設定するための手順を表示します

## 出力

ログインに成功すると、コマンドは次の内容を表示します:

1. **受信した認証情報**（Client ID と Client Secret）
2. **`.env` ファイル用の手順**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Intlayer 設定ファイル用の手順**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## 手動設定

ブラウザが自動で開かない場合、ターミナルに表示されている URL を手動で開いてください。

## 例

### カスタム CMS URL を使用してログイン

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### 特定の環境ファイルを指定してログイン

```bash
npx intlayer login --env-file .env.production
```

### 冗長モードでログイン

```bash
npx intlayer login --verbose
```

## トラブルシューティング

### ブラウザが開かない

ブラウザが自動で開かない場合、ターミナルに表示されている URL をコピーしてブラウザで手動で開いてください。

### 接続の問題

接続の問題が発生した場合、次を確認してください：

1. CMS の URL が正しいこと
2. インターネット接続が正常に動作していること
3. 接続をブロックするファイアウォールがないこと
4. インターネット接続が正常に機能していることを確認する
5. ファイアウォールが接続をブロックしていないこと

### 認証情報が受け取れない場合

認証情報が受け取れない場合:

1. ブラウザで認証プロセスを完了したことを確認する
2. ローカルポートがブロックされていないことを確認する
3. コマンドを再実行してみる

## 次の手順

ログイン完了後:

1. 認証情報を `.env` ファイルに追加する
2. 認証情報を使って `intlayer.config.*` ファイルを設定する
3. 辞書を管理するためにCLIコマンドを使用する:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/push.md) - 辞書をCMSにプッシュする
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/pull.md) - 辞書をCMSからプルする
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/fill.md) - 不足している翻訳を埋める

## 関連項目

- [CLI ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/index.md)
- [Intlayer 設定](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
