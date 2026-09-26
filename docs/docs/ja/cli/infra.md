---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: Intlayer CLI の init infra コマンドを使用して、デスクトップアプリをインストールするか、Docker（オールインワンコンテナまたはDocker Composeスタック）でIntlayer CMSをセルフホストする方法を学びます。
keywords:
  - CLI
  - インフラストラクチャ
  - セルフホスティング
  - デスクトップアプリ
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra コマンドの追加"
author: aymericzip
---

# Intlayer CLI Init Infra コマンド

## 説明

`init infra` コマンドは、マシン上にIntlayerのインフラストラクチャをセットアップします。使用中のプラットフォーム向けのホストされたインストーラー（macOS / Linux では `https://intlayer.org/install.sh`、Windows では `https://intlayer.org/install.ps1`）をダウンロードし、ターミナルにアタッチした状態で実行するため、メニューや進捗表示がそのまま表示されます。

インストーラーはIntlayerの実行方法を尋ねます:

- **デスクトップアプリ**: OSおよびCPUに応じたネイティブダッシュボードをダウンロードして起動またはインストールします。デスクトップ版はIntlayer Cloudバックエンドと通信します。
- **オールインワン Docker**: 1つのボリュームを備えた単一コンテナでダッシュボード + API + MongoDB + Redis + MinIO を実行します。生成されたシークレットを含む `./intlayer.env` を書き出し、`intlayer/cms-all` イメージを取得します。
- **Docker Compose**: スケーラブルなセルフホスティング向けに、サービスごとに1つのコンテナを起動します。`./intlayer/` に `docker-compose.yml` と `.env` を書き出し、イメージを取得します。

ホストされたインストーラーがセットアップフローの唯一の情報源です。CLIは同じ手順を再実装するのではなくそれを実行するため、`npx intlayer init infra` と `curl -fsSL https://intlayer.org/install.sh | sh` はまったく同じ動作をします。

## 使用法

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

同様の手順は、`npx intlayer init --interactive` のチェックリスト内の **インフラストラクチャ (デスクトップアプリ / セルフホスティング)** からも提供されます。

## オプション

- `-m, --mode <mode>` - 省略可能。インストーラーのメニューをスキップして、指定したモードを直接実行します。有効な値: `desktop`、`docker`（オールインワン）、または `compose`。それ以外の値を指定するとエラー終了します。

## 例

### 対話型でモードを選択

```bash
npx intlayer init infra
```

### デスクトップアプリのインストール

```bash
npx intlayer init infra --mode desktop
```

### オールインワンコンテナでセルフホスト

```bash
npx intlayer init infra --mode docker
```

### Docker Composeでセルフホスト

```bash
npx intlayer init infra --mode compose
```

## 出力例

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## インストーラーの設定

インストーラーはいくつかの環境変数を読み取ります。CLIはそれらをそのまま渡します。コマンドを実行する前にシェルで設定してください:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| 変数                      | デフォルト                | 適用対象 | 説明                                                  |
| ------------------------- | ------------------------- | -------- | ----------------------------------------------------- |
| `INTLAYER_MODE`           | _(問い合わせ)_            | すべて   | `desktop`、`docker` または `compose`、`--mode` と同様 |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop  | アプリインストーラーの保存先                          |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker   | 取得するオールインワンイメージ                        |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker   | 環境設定ファイルの書き込み先                          |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker   | コンテナ名                                            |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker   | `/data` にマウントされる名前付きボリューム            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker   | ダッシュボード用ホストポート                          |
| `INTLAYER_API_PORT`       | `3100`                    | docker   | API用ホストポート                                     |
| `INTLAYER_S3_PORT`        | `9000`                    | docker   | MinIO S3 API用ホストポート                            |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker   | MinIO コンソール用ホストポート                        |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose  | `docker-compose.yml` と `.env` の書き込み先           |
| `INTLAYER_SELFHOST_REF`   | `main`                    | 両方     | composeファイルと環境テンプレートを取得するGit ref    |

> ポート変数はマッピングの **ホスト** 側のみを変更します。公開されているイメージには `http://localhost:3000`、`http://localhost:3100`、`http://localhost:9000` が組み込まれているため、独自のイメージをビルドしない限りデフォルトのままにしてください: [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md#limitations) を参照してください。

## 要件

- **デスクトップアプリ** には [Node.js](https://nodejs.org) が必要です: アプリにはダッシュボードのサーバーが組み込まれており、マシンの `node` バイナリで起動します。
- **Docker モード** には [Docker](https://docs.docker.com/get-docker/)（Windows では WSL 2 バックエンドの Docker Desktop）が必要です。Compose モードには `docker compose` プラグインも必要です。

## 注意点

- コマンドの再実行は安全です: 既存の環境ファイルは上書きされないため、アップグレードパスとしても機能します（最新のイメージを取得し、シークレットを維持します）。
- インストーラーは一時ディレクトリにダウンロードされ、実行終了後に結果に関係なく削除されます。
- コマンドの終了コードはインストーラーのものになります。ダウンロード自体が失敗した場合、CLIは同等の `curl … | sh`（または `irm … | iex`）コマンドを出力します。
- Docker モードではログインメールを送信するためのメーラーが依然として必要です。インストーラーの完了後、生成された環境ファイルで Resend または SMTP を設定してください: [グローバルメーラー](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md#global-mailer) を参照してください。

## 関連リンク

- [セルフホスティングガイド](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/self_hosting.md) - 各モードのアーキテクチャ、初回のセットアップ手順、制限事項
- [Intlayer の初期化](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/cli/init.md) - 親となる `init` コマンドと対話型チェックリスト
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md) - インストールしたダッシュボードの機能
