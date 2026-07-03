---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: 自托管 Intlayer
description: 通过一条命令在您自己的基础设施上运行完整的 Intlayer 实例。无需 Intlayer Cloud 账户。
keywords:
  - 自托管
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - 安装
  - 基础设施
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# 自托管 Intlayer

Intlayer 可以完全在您自己的基础设施上运行——无需 Intlayer Cloud 账户。只需一条命令即可启动一个生产就绪的堆栈：

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

安装程序会下载 `docker-compose.yml` 和 `.env` 文件，自动生成所需的密钥，并使用 `docker compose up -d` 启动所有容器。

## 目录

<TOC/>

---

## 架构

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
     (1-node RS)             (S3 API)     (SMTP)        (in-image)
                             minio:9001   mailpit:8025
                             (console)    (web UI)
```

Chromium（用于 Puppeteer 屏幕截图生成）捆绑在后端镜像中——无需单独的容器。

---

## 先决条件

- **Docker** ≥ 24 和 **Docker Compose** ≥ v2。如果其中任何一个缺失，安装程序将打印安装链接并退出。
- 主机上端口 `3000`、`3100`、`8025`、`9000` 和 `9001` 可用。
- Linux 或 macOS 主机（或 Windows 上的 WSL2）。

---

## 快速开始

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

安装程序执行以下操作：

1. 检查 `docker` 和 `docker compose` 是否存在。
2. 将 `docker-compose.yml` 和 `.env.example` 下载到 `./intlayer/` 目录中。
3. 如果不存在 `.env` 文件，则复制示例文件并使用 `openssl rand` 为 `BETTER_AUTH_SECRET`、`S3_ACCESS_KEY_ID` 和 `S3_SECRET_ACCESS_KEY` 生成随机密钥。
4. 运行 `docker compose pull` + `docker compose up -d`。
5. 打印 URL：仪表盘 `:3000`、API `:3100`、电子邮件 UI `:8025`、MinIO 控制台 `:9001`。

堆栈启动后，打开 **http://localhost:3000** 并创建您的第一个账户。

---

## 服务

| 服务        | 镜像                              | 主机端口                       | 用途                               |
| ----------- | --------------------------------- | ------------------------------ | ---------------------------------- |
| **app**     | 从 `apps/app/Dockerfile` 构建     | `3000`                         | TanStack Start 仪表盘 (CMS UI)     |
| **backend** | 从 `apps/backend/Dockerfile` 构建 | `3100`                         | Fastify REST API (`/health` 端点)  |
| **mongo**   | `mongo:7`                         | 内部                           | 单节点副本集 (`rs0`)               |
| **redis**   | `redis:7-alpine`                  | 内部                           | 任务队列 (BullMQ) 和缓存 (ioredis) |
| **minio**   | `minio/minio`                     | `9000` (S3), `9001` (控制台)   | 用于头像和截图的 S3 兼容对象存储   |
| **mailpit** | `axllent/mailpit`                 | `1025` (SMTP), `8025` (Web UI) | 本地事务性电子邮件接收器           |

默认情况下，内部端口（mongo、redis）不会暴露给主机。

> MinIO 端口 `9000` 必须可从浏览器访问，因为上传的资产（头像、截图）直接从 `S3_PUBLIC_URL=http://localhost:9000/intlayer` 加载。

---

## 环境变量

安装程序会生成一个即用型 `.env` 文件。下表描述了每个变量。

### 必需（自动生成或提示）

| 变量                   | 示例                                            | 描述                             |
| ---------------------- | ----------------------------------------------- | -------------------------------- |
| `NODE_ENV`             | `production`                                    | 运行时环境                       |
| `PORT`                 | `3100`                                          | 后端监听端口                     |
| `BACKEND_URL`          | `http://localhost:3100`                         | 后端 API 的公共 URL              |
| `APP_URL`              | `http://localhost:3000`                         | 仪表盘的公共 URL                 |
| `DOMAIN`               | `localhost`                                     | Cookie 域                        |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | 完整的 MongoDB 连接 URI          |
| `REDIS_URL`            | `redis://redis:6379`                            | Redis 连接 URL                   |
| `BETTER_AUTH_SECRET`   | _(已生成)_                                      | 用于会话签名的 32 字节密钥       |
| `MAIL_PROVIDER`        | `smtp`                                          | 邮件传输方式：`smtp` 或 `resend` |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTP 主机名 (Mailpit 容器名称)   |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTP 端口                        |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | 发件人地址                       |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3 兼容端点                      |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | 用于浏览器资产加载的公共 URL     |
| `S3_BUCKET_NAME`       | `intlayer`                                      | 存储桶名称                       |
| `S3_ACCESS_KEY_ID`     | _(已生成)_                                      | MinIO 访问密钥                   |
| `S3_SECRET_ACCESS_KEY` | _(已生成)_                                      | MinIO 秘密密钥                   |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | 构建时嵌入到仪表盘中的后端 URL   |
| `VITE_DOMAIN`          | `localhost`                                     | 构建时嵌入到仪表盘中的域         |

### 可选（缺少时功能会优雅降级）

| 变量                                                     | 功能                                                   |
| -------------------------------------------------------- | ------------------------------------------------------ |
| `OPENAI_API_KEY`                                         | AI 辅助翻译和内容审计                                  |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | 账单和订阅管理                                         |
| `RESEND_API_KEY`                                         | 通过 Resend 发送事务性电子邮件（设置后会覆盖 Mailpit） |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth 登录                                      |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth 登录                                      |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth 登录                                      |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth 登录                                   |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuth 登录                                    |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuth 登录                                   |

---

## 连接您的 Intlayer 项目

堆栈运行后，将您的项目指向自托管的后端和仪表盘，而不是 `intlayer.org`。

### 项目配置

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 自托管 CMS 仪表盘的 URL。
     * 默认值: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * 自托管后端 API 的 URL。
     * 默认值: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

在您项目的 `.env` 中设置环境变量：

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

在您的自托管仪表盘中，通过 `http://localhost:3000/projects` 下的 **项目 → 访问密钥** 创建访问凭据。

### `@intlayer/api` SDK

以编程方式使用 `@intlayer/api` SDK 时，明确传递 `backendURL`：

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

## 升级

在现有部署上重新运行安装程序会执行滚动升级：

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

这会拉取最新镜像并使用 `docker compose pull && docker compose up -d` 重启容器。现有卷（`mongo-data`、`redis-data`、`minio-data`）会保留——不会丢失数据。

要在 `./intlayer/` 目录中手动升级：

```sh
docker compose pull
docker compose up -d
```

---

## 备份与恢复

所有持久化数据都存储在三个命名 Docker 卷中。

### 备份

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

### 恢复

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# 对 redis-data 和 minio-data 重复此操作
```

---

## 使用反向代理 (Nginx / Caddy)

对于生产部署，请在应用和后端容器前放置一个反向代理，而不是直接暴露它们。

### Nginx 示例

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

更新以下 `.env` 变量以匹配您的公共域名：

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> `VITE_*` 变量在构建时被嵌入到仪表盘镜像中。如果在镜像构建后更改它们，您需要重建 `app` 镜像 (`docker compose build app`) 或使用运行时配置注入。

---

## 故障排除

### 后端首次启动时崩溃循环

MongoDB 和 Redis 必须在后端启动前保持健康。compose 文件使用带有 `condition: service_healthy` 的 `depends_on`。如果您看到后端重复重启，请检查 `mongo` 和 `redis` 的健康检查是否通过：

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### 仪表盘无法连接到 API

验证 `VITE_BACKEND_URL` 是否与后端可以从**浏览器**（而非 Docker 网络）访问的 URL 匹配。如果您更改了后端端口或添加了反向代理，请重建仪表盘镜像：

```sh
docker compose build app
docker compose up -d app
```

### 电子邮件未发送

默认情况下，所有出站电子邮件都会被 Mailpit 捕获。打开 `http://localhost:8025` 查看已发送的消息。要发送真实电子邮件，请在 `.env` 中设置 `MAIL_PROVIDER=resend` 和 `RESEND_API_KEY=<your-key>`，然后重启后端：

```sh
docker compose restart backend
```

### MinIO 存储桶缺失

如果 `minio-init` 一次性服务未运行（或在 MinIO 准备好之前运行），请手动创建存储桶：

```sh
docker compose run --rm minio-init
```

---

## 有用链接

- [Intlayer CMS 文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- [配置参考](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
