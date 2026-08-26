---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Intlayerのセルフホスティング
description: 単一のコマンドでIntlayerの完全なインスタンスを独自のインフラストラクチャ上で実行できます。Intlayer Cloudアカウントは不要です。
keywords:
  - セルフホスティング
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - インストール
  - インフラストラクチャ
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayerのセルフホスティング

Intlayerはあなた自身のインフラストラクチャ上で実行できます。Intlayer Cloudアカウントは必要ありません。単一のオールインワンDockerイメージは、ダッシュボード、API、および必要なローカルデータストア（RedisとMinIO）をバンドルし、[s6-overlay](https://github.com/just-containers/s6-overlay)によって監視されています。

Intlayerは、Intlayer Cloudアカウントを必要とせず、独自のインフラストラクチャ上で完全に実行できます。単一のコマンドで、本番環境に対応したスタックを起動します。

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

インストーラーは `docker-compose.yml` と `.env` をダウンロードし、必要なシークレットを自動生成して、すべてのコンテナを `docker compose up -d` で起動します。

唯一の外部依存関係は **MongoDB** です。バックエンドは提供する MongoDB **Atlas** クラスターに接続します。その他すべてはコンテナ内で実行されます。

## 目次

<TOC/>

---

## アーキテクチャ

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1ノードRS)             (S3 API)     (SMTP)        (インイメージ)
                             minio:9001   mailpit:8025
                             (コンソール) (ウェブUI)
```

Chromium (Puppeteerのスクリーンショット生成に使用) はバックエンドイメージ内にバンドルされており、別のコンテナは必要ありません。

---

## 前提条件

- **Docker** ≥ 24 および **Docker Compose** ≥ v2。いずれかが不足している場合、インストーラーはインストールリンクを表示して終了します。
- ホスト上でポート `3000`、`3100`、`8025`、`9000`、`9001` が利用可能であること。
- LinuxまたはmacOSホスト（またはWindows上のWSL2）。

その他すべて — Bun、Redis、MinIO、Chromium — はイメージ内に含まれています。

---

## クイックスタート

### 1. インストーラーを実行する

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Docker がインストールされており実行中であることを確認し、既に生成された `BETTER_AUTH_SECRET` と `S3_SECRET_ACCESS_KEY` を含む `./intlayer.env` を書き込み、イメージをプルします。コンテナを起動しません — バックエンドはデータベース認証情報がないとブートできません。

インストーラーを再実行しても安全です。既存の `intlayer.env` は上書きされないため、アップグレードパスとしても機能します。

### 2. 認証情報を入力する

`intlayer.env` を開き、`TODO` でマークされている値を入力してください：

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

ファイルには、オプション機能のためのコメントアウトされたブロックも含まれています — [SMTP mailer](#global-mailer)、`OPENAI_API_KEY`、および OAuth プロバイダー。必要なものをコメント解除してください。

> ファイルは `docker run --env-file` によって読み込まれ、クォートを削除せず、`=` の後のすべてを値として扱います。クォートなしの値を書き、コメントは独立した行に保つようにしてください。

### 3. コンテナを起動する

インストーラーが完了時に出力するコマンドは次の通りです:

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  ghcr.io/aymericzip/intlayer-selfhost:latest
```

その後、**http://localhost:3000** を開きます。初回起動時はデータストアが初期化されるため、1 分ほど待ってください。

> ダッシュボードは `localhost` で提供されます。[制限事項](#limitations)を参照してください。公開されているイメージではカスタムドメインはサポートされていません。

### インストーラー設定

インストーラーは環境変数をいくつか読み込みます。`sh` にパイプされるため、`curl` ではなくシェルに環境変数を渡してください:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| 変数                      | デフォルト                                    | 説明                                       |
| ------------------------- | --------------------------------------------- | ------------------------------------------ |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | プルするイメージ                           |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | env ファイルの書き込み先                   |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | コンテナー名                               |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | `/data` にマウントされた名前付きボリューム |
| `INTLAYER_APP_PORT`       | `3000`                                        | ダッシュボードのホストポート               |
| `INTLAYER_API_PORT`       | `3100`                                        | API のホストポート                         |
| `INTLAYER_S3_PORT`        | `9000`                                        | MinIO S3 API のホストポート                |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | MinIO コンソールのホストポート             |

> 4 つのポート変数は、`docker run` コマンドで出力されるマッピングの**ホスト**側のみを変更します。公開されたイメージには、`http://localhost:3000`、`http://localhost:3100`、`http://localhost:9000` がビルド時にダッシュボード bundle にコンパイルされているため、これらをリマップするとブラウザーが古いポートを指し続けます。独自のイメージをビルドしていない限り、デフォルトを保持してください — [制限事項](#limitations)を参照してください。

---

## 初回セットアップ

新規インスタンス（空のデータベース）でダッシュボードを開くと、**`/init`** ページにリダイレクトされます：

1. 最初のアカウントを作成します。ユーザーコレクションが空のため、このアカウントは自動的に **super admin** に昇格されます。
2. 検証メールが送信されます（Resend経由）。メール検証は **必須** です — これが `RESEND_API_KEY` を開始前に設定する必要がある理由です。
3. メール内のリンクをクリックしてサインインします。

管理者が存在すると、`/init` は標準的なサインインページにリダイレクトされます。

---

## サービス

| サービス    | イメージ                             | ホストポート                     | 目的                                                         |
| ----------- | ------------------------------------ | -------------------------------- | ------------------------------------------------------------ |
| **app**     | `apps/app/Dockerfile` からビルド     | `3000`                           | TanStack Start ダッシュボード (CMS UI)                       |
| **backend** | `apps/backend/Dockerfile` からビルド | `3100`                           | Fastify REST API (`/health` エンドポイント)                  |
| **mongo**   | `mongo:7`                            | 内部                             | シングルノードレプリカセット (`rs0`)                         |
| **redis**   | `redis:7-alpine`                     | 内部                             | ジョブキュー (BullMQ) とキャッシュ (ioredis)                 |
| **minio**   | `minio/minio`                        | `9000` (S3), `9001` (コンソール) | アバターとスクリーンショット用のS3互換オブジェクトストレージ |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP), `8025` (ウェブUI) | ローカルトランザクションメールシンク                         |

> MinIOポート `9000` は、アップロードされたアセット (アバター、スクリーンショット) が `S3_PUBLIC_URL=http://localhost:9000/intlayer` から直接読み込まれるため、ブラウザから到達可能である必要があります。

---

## 環境変数

### 必須

| Variable               | Example                      | Description                                                                                                                                          |
| ---------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas ユーザー                                                                                                                               |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas パスワード                                                                                                                             |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas クラスターホスト (`mongodb+srv://` URI で使用)                                                                                         |
| `BETTER_AUTH_SECRET`   | _(generated)_                | セッション署名用の 32 バイトシークレット                                                                                                             |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | バンドルされた MinIO のシークレット                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_                 | Resend 経由のトランザクショナルメール。グローバル SMTP メーラーを設定しない限り、初回セットアップで必須 ([グローバルメーラー](#global-mailer)を参照) |

### 必須 (自動生成またはプロンプトによる入力)

| 変数                   | 例                                              | 説明                                                  |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | ランタイム環境                                        |
| `PORT`                 | `3100`                                          | バックエンドのリスニングポート                        |
| `BACKEND_URL`          | `http://localhost:3100`                         | バックエンドAPIの公開URL                              |
| `APP_URL`              | `http://localhost:3000`                         | ダッシュボードの公開URL                               |
| `DOMAIN`               | `localhost`                                     | クッキードメイン                                      |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | MongoDBの完全な接続URI                                |
| `REDIS_URL`            | `redis://redis:6379`                            | Redisの接続URL                                        |
| `BETTER_AUTH_SECRET`   | _(生成済み)_                                    | セッション署名用の32バイトのシークレット              |
| `MAIL_PROVIDER`        | `smtp`                                          | メールトランスポート: `smtp` または `resend`          |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTPホスト名 (Mailpitコンテナ名)                      |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTPポート                                            |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | 送信元アドレス                                        |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3互換エンドポイント                                  |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | ブラウザによるアセット読み込み用の公開URL             |
| `S3_BUCKET_NAME`       | `intlayer`                                      | バケット名                                            |
| `S3_ACCESS_KEY_ID`     | _(生成済み)_                                    | MinIOアクセスキー                                     |
| `S3_SECRET_ACCESS_KEY` | _(生成済み)_                                    | MinIOシークレットキー                                 |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | ビルド時にダッシュボードに組み込まれるバックエンドURL |
| `VITE_DOMAIN`          | `localhost`                                     | ビルド時にダッシュボードに組み込まれるドメイン        |

### オプション (存在しない場合でも機能は正常に劣化します)

| 変数                                                     | 機能                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | AIアシストによる翻訳とコンテンツ監査                                       |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | 請求とサブスクリプション管理                                               |
| `RESEND_API_KEY`                                         | Resendを介したトランザクションメール (設定されている場合、Mailpitを上書き) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuthログイン                                                       |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuthログイン                                                       |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuthログイン                                                       |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuthログイン                                                    |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuthログイン                                                     |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuthログイン                                                    |

### グローバルメーラー

デフォルトでは、すべてのトランザクションメールは `RESEND_API_KEY` を使用して Resend 経由で送信されます。セルフホストされたデプロイメントでは、パスワードリセットやマジックリンクなどの非組織メールを含む**すべての**メールを、環境変数で設定されたグローバルメーラー経由でルーティングできます。

`MAIL_PROVIDER` を設定して有効にしてください。設定されていない場合は、デフォルトの Resend メーラーが使用されます。

| Variable             | Example                        | Description                                                                                            |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `MAIL_PROVIDER`      | `smtp`                         | グローバルトランスポート: `smtp` または `resend`。デフォルトを使用する場合は未設定のままにしてください |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | 送信者ヘッダー。ベアアドレスまたは `Name <email>` 形式を受け入れます                                   |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP ホスト (`MAIL_PROVIDER=smtp` の場合は必須)                                                        |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP ポート (デフォルトは `587`)                                                                       |
| `MAIL_SMTP_SECURE`   | `false`                        | 暗黙的な TLS。ポート `465` の場合は `true` に設定してください                                          |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP ユーザー名 (オプション; 認証されていないリレーの場合は省略可)                                     |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP パスワード                                                                                        |

> 優先順位: 組織独自のメーラー (**Organization** ダッシュボードから設定) が優先され、次にグローバルメーラーが優先され、最後にデフォルトの Resend キーが優先されます。

---

## Intlayerプロジェクトの接続

スタックが稼働したら、`intlayer.org` の代わりに自己ホスト型のバックエンドとダッシュボードを指すようにプロジェクトを設定します。

### プロジェクト設定

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 自己ホスト型CMSダッシュボードのURL。
     * デフォルト: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // 例: http://localhost:3000

    /**
     * 自己ホスト型バックエンドAPIのURL。
     * デフォルト: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // 例: http://localhost:3100
  },
};

export default config;
```

プロジェクトの `.env` で環境変数を設定します。

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

自己ホスト型ダッシュボードの **Projects → Access keys** (`http://localhost:3000/projects`) でアクセス認証情報を作成します。

### `@intlayer/api` SDK

`@intlayer/api` SDKをプログラムで利用する場合は、`backendURL` を明示的に渡します。

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

---

## アップグレード

これにより、最新のイメージがプルされ、`docker compose pull && docker compose up -d` でコンテナが再起動されます。既存のボリューム (`mongo-data`、`redis-data`、`minio-data`) は保持され、データ損失はありません。

```sh
docker compose pull
docker compose up -d
```

---

## バックアップと復元

すべての永続データは、3つの名前付きDockerボリュームに保存されます。

### バックアップ

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### 復元

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# redis-data と minio-data についても同様に繰り返します
```

---

## 制限事項

- **MongoDB は外部 (Atlas) である必要があります。** バックエンドは `mongodb+srv://` 経由でのみ接続します (`DB_ID` / `DB_MDP` / `DB_CLUSTER` から構築)。したがって、プレーンな `mongodb://host:27017` — コンテナにバンドルされた `mongod` を含む — は使用できません。MongoDB Atlas クラスタを提供してください。
- **カスタムドメインはサポートされていません。** すべてのブラウザ向け `VITE_*` URL はビルド時にアプリにインラインされ、公開されたイメージには `localhost` の値が付属します。ダッシュボードには `http://localhost:3000` でアクセスする必要があります。パブリックドメインでサービスするには、イメージをターゲット URL を焼き込んで再構築する必要があり、そのままではサポートされていません。
- **メールは機能するメーラーが必要です。** 初回実行セットアップではメール検証が強制されるため、`RESEND_API_KEY` または [グローバル SMTP メーラー](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) を設定する必要があります。最初の管理者がサインインした後、各組織はダッシュボードから独自の SMTP または Resend メーラーを設定することもできます。

---

## トラブルシューティング

### 最初の起動時にバックエンドがクラッシュループする

バックエンドが起動する前に、MongoDBとRedisが正常である必要があります。composeファイルは `condition: service_healthy` とともに `depends_on` を使用しています。バックエンドの再起動が繰り返される場合は、`mongo` と `redis` のヘルスチェックがパスしているか確認してください。

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

ログの上部付近で `MongoDB connection error` を探してください。

### メールが送信されない

デフォルトでは、すべての送信メールはMailpitによって捕捉されます。送信されたメッセージを確認するには、`http://localhost:8025` を開いてください。実際のメールを送信するには、`.env` で `MAIL_PROVIDER=resend` と `RESEND_API_KEY=<your-key>` を設定し、バックエンドを再起動します。

### MinIOバケットが見つからない

`minio-init` ワンショットサービスが実行されなかった場合 (またはMinIOが準備できる前に実行された場合) は、手動でバケットを作成してください。

```sh
docker compose run --rm minio-init
```

---

## 役立つリンク

- [Intlayer CMS ドキュメント](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md)
- [設定リファレンス](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
