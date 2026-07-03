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

Intlayerは、Intlayer Cloudアカウントを必要とせず、独自のインフラストラクチャ上で完全に実行できます。単一のコマンドで、本番環境に対応したスタックを起動します。

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

インストーラーは `docker-compose.yml` と `.env` をダウンロードし、必要なシークレットを自動生成して、すべてのコンテナを `docker compose up -d` で起動します。

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

---

## クイックスタート

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

インストーラーの動作:

1.  `docker` と `docker compose` が存在するかどうかを確認します。
2.  `docker-compose.yml` と `.env.example` を `./intlayer/` にダウンロードします。
3.  `.env` が存在しない場合、例をコピーし、`BETTER_AUTH_SECRET`、`S3_ACCESS_KEY_ID`、`S3_SECRET_ACCESS_KEY` 用に `openssl rand` を介してランダムなシークレットを生成します。
4.  `docker compose pull` + `docker compose up -d` を実行します。
5.  URLを表示します: ダッシュボード `:3000`、API `:3100`、メールUI `:8025`、MinIOコンソール `:9001`。

スタックが起動したら、**http://localhost:3000** を開き、最初のIntlayerアカウントを作成してください。

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

内部ポート (mongo, redis) は、デフォルトではホストに公開されません。

> MinIOポート `9000` は、アップロードされたアセット (アバター、スクリーンショット) が `S3_PUBLIC_URL=http://localhost:9000/intlayer` から直接読み込まれるため、ブラウザから到達可能である必要があります。

---

## 環境変数

インストーラーはすぐに使用できる `.env` を生成します。以下の表は、すべての変数について説明しています。

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

既存のデプロイメントでインストーラーを再実行すると、ローリングアップグレードが実行されます。

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

これにより、最新のイメージがプルされ、`docker compose pull && docker compose up -d` でコンテナが再起動されます。既存のボリューム (`mongo-data`、`redis-data`、`minio-data`) は保持され、データ損失はありません。

`./intlayer/` ディレクトリ内で手動でアップグレードするには:

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

## リバースプロキシの使用 (Nginx / Caddy)

本番環境のデプロイでは、appコンテナとbackendコンテナを直接公開するのではなく、リバースプロキシをそれらの前に配置します。

### Nginxの例

```nginx
server {
    listen 80;
    server_name cms.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

公開ドメインに合わせて、以下の `.env` 変数を更新してください。

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> `VITE_*` 変数はビルド時にダッシュボードイメージに組み込まれます。イメージがビルドされた後に変更した場合、`app` イメージをリビルドするか (`docker compose build app`)、ランタイム設定インジェクションを使用する必要があります。

---

## トラブルシューティング

### 最初の起動時にバックエンドがクラッシュループする

バックエンドが起動する前に、MongoDBとRedisが正常である必要があります。composeファイルは `condition: service_healthy` とともに `depends_on` を使用しています。バックエンドの再起動が繰り返される場合は、`mongo` と `redis` のヘルスチェックがパスしているか確認してください。

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### ダッシュボードがAPIに到達できない

`VITE_BACKEND_URL` が、バックエンドが**ブラウザ**から到達可能なURL (Dockerネットワークではなく) と一致していることを確認してください。バックエンドポートを変更したり、リバースプロキシを追加した場合は、ダッシュボードイメージをリビルドしてください。

```sh
docker compose build app
docker compose up -d app
```

### メールが送信されない

デフォルトでは、すべての送信メールはMailpitによって捕捉されます。送信されたメッセージを確認するには、`http://localhost:8025` を開いてください。実際のメールを送信するには、`.env` で `MAIL_PROVIDER=resend` と `RESEND_API_KEY=<your-key>` を設定し、バックエンドを再起動します。

```sh
docker compose restart backend
```

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
