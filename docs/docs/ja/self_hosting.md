---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Intlayer のセルフホスティング
description: "独自のインフラストラクチャ上で Intlayer を実行します: デスクトップアプリ、単一のオールインワン Docker コンテナ、またはスケーラブルな Docker Compose スタック。Intlayer Cloud アカウントは不要です。"
keywords:
  - セルフホスティング
  - Docker
  - Docker Compose
  - デスクトップアプリ
  - Intlayer
  - CMS
  - インストール
  - インフラストラクチャ
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer のセルフホスティング

Intlayer は独自のインフラストラクチャ上で実行でき、Intlayer Cloud アカウントは不要です。同じインストーラー（`install.sh`、Windows では `install.ps1`、または `npx intlayer init infra`）でセットアップできる3つの構成が用意されています:

| Setup                     | What it is                                                                    | Pick it for                                    |
| ------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| **デスクトップアプリ**    | macOS、Linux、Windows 向けのネイティブダッシュボード                          | ローカルクライアント、ホスティング不要         |
| **オールインワン Docker** | ダッシュボード、API、MongoDB、Redis、MinIO を**単一コンテナ**に集約           | テストや小規模な単一マシンへの導入             |
| **Docker Compose**        | **サービスごとに1つのコンテナ**、各データストアをマネージドサービスに置換可能 | 本番環境、スケーリング、マネージドデータベース |

## Table of Contents

<TOC/>

## 公開イメージおよびパッケージ

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

3つのイメージはすべて同じ [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) からビルドされ、リリースごとに公開されます。Compose スタックは公式の `mongo:8`、`redis:8-alpine`、`quay.io/minio/minio` イメージも取得します。

## セットアップ

インストーラーは希望するセットアップを尋ね、前提条件を確認し（Dockerのインストールを提案）、生成済みのシークレットを含む環境ファイルを書き出し、イメージを取得します。自動で起動することはありません: Docker モードでは最初にメーラーが必要となるため、最後に実行すべきコマンドを出力して終了します。再実行は安全です: 既存の環境ファイルは上書きされないため、アップグレード時にも利用できます。

<Tabs group="mode">
<Tab label="デスクトップアプリ" value="desktop">

Tauri で構築されたネイティブアプリケーションとしての Intlayer ダッシュボード。Intlayer Cloud (`https://app.intlayer.org`) にログインするため、ホスティングは不要です。ブラウザのタブではなくローカルクライアントを使用したい場合に最適な選択肢です。

### インストール

インストーラーはお使いの OS と CPU に適したパッケージをダウンロードし、開く（macOS）、インストールする（Linux では `dpkg` / `rpm`）、またはセットアップウィザードを起動します（Windows）。[リリースページ](https://github.com/aymericzip/intlayer/releases/latest) から手動でダウンロードすることもできます。

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### 要件

- **Node.js**: アプリにはダッシュボードのサーバーが組み込まれており、マシンの `node` バイナリで起動します。アプリが起動しない場合は [nodejs.org](https://nodejs.org) からインストールしてください。

> 公開されているデスクトップビルドは Intlayer Cloud バックエンドと通信します。セルフホストされたバックエンドに向けるには、API に合わせた `VITE_BACKEND_URL` でアプリをリビルドする必要があります。[制限事項](#limitations) を参照してください。

</Tab>
<Tab label="オールインワン Docker" value="docker">

すべてが単一の `intlayer/cms-all` コンテナ内で実行され、[s6-overlay](https://github.com/just-containers/s6-overlay) によって監視され、すべてのデータストアが1つのボリュームに永続化されます。

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| サービス    | ホストポート                     | 用途                                                           |
| ----------- | -------------------------------- | -------------------------------------------------------------- |
| **app**     | `3000`                           | ダッシュボード（CMS UI）                                       |
| **backend** | `3100`                           | REST API（`/health` エンドポイント）                           |
| **mongo**   | 内部                             | MongoDB 8、シングルノードレプリカセット `rs0`                  |
| **redis**   | 内部                             | ジョブキュー（BullMQ）およびキャッシング                       |
| **minio**   | `9000` (S3), `9001` (コンソール) | アバターやスクリーンショット用の S3 互換オブジェクトストレージ |

起動順序は s6 の依存関係（`mongod` → replica-set 初期化、`minio` → バケット作成、その後 `backend`、最後に `app`）によって管理され、終了時にサービスが再起動するため、初回起動時も自動的に復旧します。

### 前提条件

- **Docker** ≥ 24: インストーラーがインストールを提案します（Linux では [get.docker.com](https://get.docker.com)、macOS では Homebrew 経由）。Windows では、まず [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)（WSL 2 バックエンド）をインストールしてください。
- ホスト上でポート `3000`、`3100`、`9000`、`9001` が空いていること。MinIO `9000` は、ブラウザが `S3_PUBLIC_URL` から直接アセットを読み込むため、ブラウザから到達可能である必要があります。
- メーラー: [Resend](https://resend.com) API キーまたは SMTP リレー。

### 1. インストール

`BETTER_AUTH_SECRET` および `S3_SECRET_ACCESS_KEY` が生成された `./intlayer.env` を書き込み、`intlayer/cms-all:latest` を取得します。

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI がインストーラーを実行し、他のタブに示されている `docker run …` コマンドを出力します。メーラーを設定したらターミナルに貼り付けて実行してください。

</Tab>
</Tabs>

### 2. メーラーの設定

`intlayer.env` を開き、Resend **または** SMTP を設定します（詳細は [グローバルメーラー](#global-mailer) を参照）:

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. 起動

インストーラーが出力する起動コマンドです:

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI がインストーラーを実行し、他のタブに示されている `docker run …` コマンドを出力します。メーラーを設定したらターミナルに貼り付けて実行してください。

</Tab>
</Tabs>

**http://localhost:3000** を開き、[初回セットアップ](#first-run-setup) に従います。初回の起動ではレプリカセットとバケットが初期化されるため、少しお待ちください。

### バックアップとアップグレード

すべての状態は `intlayer-data` ボリューム（`/data/mongo`、`/data/redis`、`/data/minio`）内に保持されます。

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

アップグレードするには、インストーラーを再実行し（最新イメージを取得し、`intlayer.env` を維持します）、`docker rm -f intlayer` を実行してから起動コマンドを再実行します。バンドルされたものではなくマネージド MongoDB を使用するには、`intlayer.env` に `MONGODB_URI` を設定します。

</Tab>
<Tab label="Docker Compose" value="compose">

プライベートな Compose ネットワーク上のサービスごとに1つのコンテナを用意します。ダッシュボードと API は公開されている `intlayer/cms-frontend` および `intlayer/cms-backend` イメージを使用し、データストアは公式の `mongo`、`redis`、`minio` イメージを使用します。

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| サービス     | イメージ                | 役割                                                                       |
| ------------ | ----------------------- | -------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | `:3000` 上のダッシュボード。バックエンドが健全になるのを待機               |
| `backend`    | `intlayer/cms-backend`  | `:3100` 上の Chromium 付き API。Mongo、Redis、MinIO バケットを待機         |
| `mongo`      | `mongo:8`               | 自身のヘルスチェックによって初期化されるシングルノードレプリカセット `rs0` |
| `redis`      | `redis:8-alpine`        | キューおよびキャッシング、追記専用（append-only）永続化                    |
| `minio`      | `quay.io/minio/minio`   | `:9000` の S3 ストレージ、`:9001` のコンソール                             |
| `minio-init` | `quay.io/minio/mc`      | ワンショット: バケットとその匿名ダウンロードポリシーを作成                 |

データは `intlayer_mongo-data`、`intlayer_redis-data`、`intlayer_minio-data` の各ボリュームに保存されます。サービスの接続設定（`MONGODB_URI`、`REDIS_URL`、`S3_ENDPOINT`、サーバーサイドレンダリング用の内部バックエンド URL）は compose ファイルに固定されており、シークレットとオプションの統合のみを保持する `.env` よりも優先されます。

### 前提条件

- **Docker** ≥ 24（Compose プラグイン付き）: インストーラーが Linux および macOS 上でインストールを提案します。Windows では、まず [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)（WSL 2 バックエンド）をインストールしてください。
- ホスト上でポート `3000`、`3100`、`9000`、`9001` が空いていること。
- メーラー: [Resend](https://resend.com) API キーまたは SMTP リレー。

### 1. インストール

`docker-compose.yml` と生成されたシークレットを含む `.env` を `./intlayer/` に書き出し、イメージを取得します。

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. メーラーの設定

オールインワン構成と同様に、`intlayer/.env` に Resend **または** SMTP を記入します（[グローバルメーラー](#global-mailer) を参照）。

### 3. 起動

```sh
cd intlayer && docker compose up -d
```

**http://localhost:3000** を開き、[初回セットアップ](#first-run-setup) に従います。

### マネージドデータストア

compose ファイルから置き換えるサービス（および `backend` の `depends_on` エントリ）を削除し、対応する変数を上書きします:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` は、任意の S3 互換プロバイダーに対してそのまま機能します。

### スケーリング

`app` と `backend` はステートレスです。ロードバランサーの背後では、固定のホストポートマッピングを削除し、プロキシがサービス名でルーティングするようにすれば、`docker compose up -d --scale backend=3` が機能します。バックグラウンドジョブは Redis (BullMQ) 経由で調整されるため、複数のバックエンドレプリカがキューを安全に共有します。

### ソースからのビルド

リポジトリのクローンから、オーバーライド設定により2つの Intlayer サービスを `image:` から `build:` に切り替えます:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

カスタムドメイン用のイメージを作成する場合もこの方法を使用します: `VITE_*` の値をビルド引数として渡します（[制限事項](#limitations) を参照）。

### バックアップとアップグレード

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### インストーラーの設定

`--mode`（または `INTLAYER_MODE`）を指定しない場合、インストーラーはメニューを表示します: `desktop`、`docker`（オールインワン）、または `compose`。また、いくつかの環境変数も読み取ります。シェルへのパイプライン処理を行うため、`curl` ではなくシェルに変数を渡してください:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> ポート変数はマッピングの **ホスト** 側のみを変更します。公開されているイメージには `http://localhost:3000`、`http://localhost:3100`、`http://localhost:9000` がダッシュボードバンドルにコンパイルされているため、独自のイメージをビルドしない限りデフォルトを維持してください。[制限事項](#limitations) を参照してください。

## 初回セットアップ

新規インスタンス（空のデータベース）でダッシュボードを開くと、自動的に **`/init`** ページにリダイレクトされます:

1. 最初のアカウントを作成します。ユーザーコレクションが空のため、このアカウントは自動的に **スーパー管理者** に昇格します。
2. Resend または SMTP リレー経由で確認メールが送信されます。メール確認は **必須** です。そのため、起動前にメーラーを設定する必要があります。
3. メール内のリンクをクリックし、サインインします。

管理者が存在する場合、`/init` は通常のサインインページにリダイレクトされます。

## 環境変数

両方の Docker モードは、[`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template) から生成された同じファイル（コンテナ用は `intlayer.env`、Compose 用は `.env`）を読み取ります。

### 必須項目

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### デプロイによって固定

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

Compose の `app` サービスは追加で `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100` を受け取ります: ブラウザは `localhost:3100` で API にアクセスしますが、サーバーサイドレンダリングは Compose ネットワーク内で実行されるため、サービス名を使用する必要があります。

### オプション（設定しない場合でも機能は正常にフォールバックします）

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### グローバルメーラー

パスワードのリセットやマジックリンクなど、組織外のメールを含むすべてのトランザクションメールは、次の2つのグローバルトランスポートのいずれかを経由します:

- **Resend**: `RESEND_API_KEY` を使用。
- **SMTP**: `MAIL_SMTP_*` 変数を使用。`MAIL_SMTP_HOST` が設定されると直ちに SMTP が使用され、`RESEND_API_KEY` は無視されます。

`MAIL_PROVIDER` は、両方が構成されている場合に一方のトランスポートを強制するためにのみ必要です（たとえば、SMTP ホストが存在する場合に Resend を維持するために `MAIL_PROVIDER=resend`）。

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> 優先順位: 組織独自のメーラー（**組織** ダッシュボードから構成）はグローバルメーラーよりも優先され、グローバルメーラーはデフォルトの Resend キーよりも優先されます。

## Intlayer プロジェクトの接続

スタックが実行されたら、`intlayer.org` ではなく、セルフホストされたバックエンドとダッシュボードを指すようにプロジェクトを設定します。

### プロジェクト設定

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

セルフホストダッシュボードの **Projects → Access keys** (`http://localhost:3000/projects`) でアクセス資格情報を作成します。

### `@intlayer/api` SDK

プログラムで `@intlayer/api` SDK を使用する場合、`backendURL` を明示的に渡します:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

## 制限事項

- **カスタムドメインおよびポート再マッピングの未対応。** ブラウザ向けのすべての `VITE_*` URL はビルド時にダッシュボードに組み込まれ、公開イメージ（およびデスクトップアプリ）には `localhost` / Intlayer Cloud の値が設定されています。ダッシュボードは `http://localhost:3000`、API は `:3100`、MinIO は `:9000` でアクセスする必要があります。公開ドメインでホストする場合、またはデスクトップアプリをセルフホストバックエンドに向ける場合は、ターゲット URL を組み込んだ状態でのリビルド（`docker/selfhost/Dockerfile` または `docker-compose.build.yml` 上で `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` を指定）が必要であり、初期状態ではサポートされていません。
- **メール送信には機能するメーラーが必要です。** 初回セットアップではメール確認が必須となるため、`RESEND_API_KEY` または [SMTP リレー](#global-mailer) (`MAIL_SMTP_*`) のいずれかを構成する必要があります。最初の管理者がサインインした後、各組織はダッシュボードから独自の SMTP または Resend メーラーを構成することもできます。
- **デスクトップアプリは組み込みサーバーを起動するためにマシン上に Node.js を必要とします。**

## 便利なリンク

- [Intlayer CMS ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [デスクトップアプリのリリース](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)、GHCR ミラー: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile、`docker-compose.yml`、`.env.template`
