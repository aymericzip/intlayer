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

Intlayer 可以在您自己的基础设施上运行。无需 Intlayer Cloud 账户。单个一体化 Docker 镜像捆绑了仪表板、API 和它所需的本地数据存储（Redis 和 MinIO），由 [s6-overlay](https://github.com/just-containers/s6-overlay) 监管。

Intlayer 可以完全在您自己的基础设施上运行——无需 Intlayer Cloud 账户。只需一条命令即可启动一个生产就绪的堆栈：

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

安装程序会下载 `docker-compose.yml` 和 `.env` 文件，自动生成所需的密钥，并使用 `docker compose up -d` 启动所有容器。

唯一的外部依赖是 **MongoDB**：后端连接到你提供的 MongoDB **Atlas** 集群。其他一切都在容器内运行。

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

其他所有内容 — Bun、Redis、MinIO、Chromium — 都包含在镜像中。

---

## 快速开始

### 1. 运行安装程序

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

它验证 Docker 是否已安装且正在运行，将 `./intlayer.env` 写入已生成的 `BETTER_AUTH_SECRET` 和 `S3_SECRET_ACCESS_KEY`，并拉取镜像。它不启动容器 — 后端无法在没有数据库凭证的情况下启动。

重新运行安装程序是安全的：现有的 `intlayer.env` 永远不会被覆盖，因此它也可以作为升级路径。

### 2. 填入你的凭证

打开 `intlayer.env` 并完成标记为 `TODO` 的值：

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

该文件还包含了可选功能的注释块 — [SMTP mailer](#global-mailer)、`OPENAI_API_KEY` 和 OAuth 提供商。取消注释你需要的内容。

> 该文件由 `docker run --env-file` 读取，它不会去除引号，并将 `=` 之后的所有内容视为值。写入裸值，并将注释放在单独的行上。

### 3. 启动容器

这是安装程序完成时打印的命令:

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

然后打开 **http://localhost:3000**。首次启动会初始化数据存储，请等待一分钟。

> 仪表板在 `localhost` 上提供。请参阅[限制](#limitations) — 已发布的镜像不支持自定义域名。

### 安装程序设置

安装程序读取几个环境变量。由于它被管道传输到 `sh`，请将它们传递给 shell 而不是 `curl`：

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| 变量                      | 默认值                                        | 描述                    |
| ------------------------- | --------------------------------------------- | ----------------------- |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | 要拉取的镜像            |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | 环境文件的写入位置      |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | 容器名称                |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | 挂载在 `/data` 的命名卷 |
| `INTLAYER_APP_PORT`       | `3000`                                        | 仪表板的主机端口        |
| `INTLAYER_API_PORT`       | `3100`                                        | API 的主机端口          |
| `INTLAYER_S3_PORT`        | `9000`                                        | MinIO S3 API 的主机端口 |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | MinIO 控制台的主机端口  |

> 四个端口变量仅改变 `docker run` 命令中打印的映射的**主机**端，已发布的镜像在构建时将 `http://localhost:3000`、`http://localhost:3100` 和 `http://localhost:9000` 编译到仪表板包中，因此重新映射它们会导致浏览器指向旧端口。除非您正在构建自己的镜像，否则请保持默认值 — 参见[限制](#limitations)。

---

## 快速开始

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

> MinIO 端口 `9000` 必须可从浏览器访问，因为上传的资产（头像、截图）直接从 `S3_PUBLIC_URL=http://localhost:9000/intlayer` 加载。

---

## 环境变量

### 必需

| Variable               | Example                      | Description                                                                                                          |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas 用户                                                                                                   |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas 密码                                                                                                   |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas 集群主机（在 `mongodb+srv://` URI 中使用）                                                             |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 用于会话签名的 32 字节密钥                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | 捆绑 MinIO 的密钥                                                                                                    |
| `RESEND_API_KEY`       | _(your key)_                 | 通过 Resend 发送事务性邮件。除非你配置全局 SMTP 邮件器（见[全局邮件器](#global-mailer)），否则首次运行设置时为必需项 |

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

### 全局邮件服务

默认情况下，所有事务性电子邮件都通过使用 `RESEND_API_KEY` 的 Resend 发送。自托管部署可以改为通过配置了环境变量的全局邮件服务路由**所有**电子邮件 — 包括非组织电子邮件，例如密码重置和魔法链接。

设置 `MAIL_PROVIDER` 以激活它。如果未设置，将使用默认的 Resend 邮件服务。

| 变量                 | 示例                           | 描述                                         |
| -------------------- | ------------------------------ | -------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | 全局传输：`smtp` 或 `resend`。留空使用默认值 |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | 发件人标题。接受裸地址或 `Name <email>` 格式 |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP 主机（当 `MAIL_PROVIDER=smtp` 时必需）  |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP 端口（默认为 `587`）                    |
| `MAIL_SMTP_SECURE`   | `false`                        | 隐式 TLS。对于端口 `465` 设置为 `true`       |
| `MAIL_SMTP_USER`     | _（你的用户名）_               | SMTP 用户名（可选；无身份验证中继可省略）    |
| `MAIL_SMTP_PASSWORD` | _（你的密码）_                 | SMTP 密码                                    |

> 优先级：组织自己的邮件服务（从**组织**仪表板配置）优先于全局邮件服务，全局邮件服务优先于默认的 Resend 密钥。

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

这会拉取最新镜像并使用 `docker compose pull && docker compose up -d` 重启容器。现有卷（`mongo-data`、`redis-data`、`minio-data`）会保留——不会丢失数据。

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

## 限制条件

- **MongoDB 必须是外部的 (Atlas)。** 后端仅通过 `mongodb+srv://` 连接（由 `DB_ID` / `DB_MDP` / `DB_CLUSTER` 构建），因此不能使用普通的 `mongodb://host:27017` — 包括容器自己的捆绑 `mongod`。请提供一个 MongoDB Atlas 集群。
- **不支持自定义域名。** 所有面向浏览器的 `VITE_*` URL 都在构建时内联到应用中，发布的镜像带有 `localhost` 值。必须在 `http://localhost:3000` 上访问仪表板；在公共域上提供服务需要使用目标 URL 重新构建镜像，这在开箱即用时不受支持。
- **Email 需要工作的邮件程序。** 首次运行设置强制执行电子邮件验证，因此必须配置 `RESEND_API_KEY` 或 [全局 SMTP 邮件程序](#global-mailer)（`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`）。第一个管理员登录后，每个组织也可以从仪表板配置自己的 SMTP 或 Resend 邮件程序。

---

## 故障排除

### 后端首次启动时崩溃循环

MongoDB 和 Redis 必须在后端启动前保持健康。compose 文件使用带有 `condition: service_healthy` 的 `depends_on`。如果您看到后端重复重启，请检查 `mongo` 和 `redis` 的健康检查是否通过：

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

在日志的顶部附近查找 `MongoDB connection error`。

### 电子邮件未发送

默认情况下，所有出站电子邮件都会被 Mailpit 捕获。打开 `http://localhost:8025` 查看已发送的消息。要发送真实电子邮件，请在 `.env` 中设置 `MAIL_PROVIDER=resend` 和 `RESEND_API_KEY=<your-key>`，然后重启后端：

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
