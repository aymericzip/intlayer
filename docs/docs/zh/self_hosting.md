---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: 自行托管 Intlayer
description: "在您自己的基础设施上运行 Intlayer：作为桌面应用、单个多合一 Docker 容器或可扩展的 Docker Compose 堆栈。无需 Intlayer Cloud 账户。"
keywords:
  - 自行托管
  - Docker
  - Docker Compose
  - 桌面应用
  - Intlayer
  - CMS
  - 安装
  - 基础设施
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# 自行托管 Intlayer

Intlayer 可以完全运行在您自己的基础设施上，无需 Intlayer Cloud 账户。由同一个安装程序（`install.sh`、Windows 上为 `install.ps1` 或 `npx intlayer init infra`）驱动三种设置：

| Setup              | What it is                                                  | Pick it for                    |
| ------------------ | ----------------------------------------------------------- | ------------------------------ |
| **桌面应用**       | 适用于 macOS、Linux 和 Windows 的原生控制面板               | 本地客户端，无需托管任何内容   |
| **多合一 Docker**  | 控制面板、API、MongoDB、Redis 和 MinIO 集成在**单个容器**中 | 试验和小规模单机安装           |
| **Docker Compose** | **每个服务一个容器**，每个数据存储都可替换为托管云服务      | 生产环境、横向扩展、托管数据库 |

## Table of Contents

<TOC/>

## 已发布的镜像和安装包

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

这三个镜像均基于同一个 [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) 构建，并在每次发布时更新。Compose 堆栈还会拉取官方的 `mongo:8`、`redis:8-alpine` 和 `quay.io/minio/minio` 镜像。

## 安装与设置

安装程序会询问您需要的安装模式，检查前提条件（提供安装 Docker 的选项），写入包含已生成密钥的环境变量文件，并拉取所需镜像。它不会自动启动任何容器：Docker 模式首先需要配置邮件服务，因此它最后会输出待执行的启动命令。重新运行它是完全安全的：现有的环境配置文件绝不会被覆盖，这也使其成为便捷的升级路径。

<Tabs group="mode">
<Tab label="桌面应用" value="desktop">

基于 Tauri 构建的原生应用程序形式的 Intlayer 控制面板。它直接连接至 Intlayer Cloud (`https://app.intlayer.org`)，因此无需在本地托管后端服务。当您想要一个本地客户端而非浏览器标签页时，这是理想的选择。

### 安装

安装程序会自动下载适用于您的操作系统和 CPU 的安装包，然后打开它（macOS）、进行安装（Linux 上的 `dpkg` / `rpm`）或启动安装向导（Windows）。您也可以从[发布页面](https://github.com/aymericzip/intlayer/releases/latest)手动下载。

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

### 环境要求

- **Node.js**：该应用内置了控制面板的前端服务器，并使用系统本地的 `node` 二进制文件启动它。如果应用无法启动，请从 [nodejs.org](https://nodejs.org) 安装。

> 官方发布的桌面版默认连接 Intlayer Cloud 后端。若要将其指向自行托管的后端，需要使用配置为您自身 API 地址的 `VITE_BACKEND_URL` 重新编译该应用，详情请参阅[限制条件](#limitations)。

</Tab>
<Tab label="多合一 Docker" value="docker">

所有组件都运行在单个 `intlayer/cms-all` 容器中，由 [s6-overlay](https://github.com/just-containers/s6-overlay) 统一监控管理，所有数据持久化保存在同一个 Docker 卷中。

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

| 服务        | 主机端口                     | 用途                               |
| ----------- | ---------------------------- | ---------------------------------- |
| **app**     | `3000`                       | 控制面板（CMS 界面）               |
| **backend** | `3100`                       | REST API（`/health` 健康检查接口） |
| **mongo**   | 仅内部访问                   | MongoDB 8 单节点副本集 `rs0`       |
| **redis**   | 仅内部访问                   | 任务队列（BullMQ）与缓存           |
| **minio**   | `9000` (S3), `9001` (控制台) | 兼容 S3 的对象存储，用于头像和截图 |

启动顺序由 s6 依赖项严格保证（`mongod` → 副本集初始化，`minio` → 存储桶创建，然后是 `backend`，最后是 `app`），且长期运行的服务在退出时会自动重启，因此初次启动时能够自动恢复。

### 前提条件

- **Docker** ≥ 24：安装程序可自动协助安装（在 Linux 上通过 [get.docker.com](https://get.docker.com)，在 macOS 上通过 Homebrew）。在 Windows 上，请先安装 [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)（启用 WSL 2 后端）。
- 主机上的 `3000`、`3100`、`9000` 和 `9001` 端口处于可用未占用状态。MinIO 的 `9000` 端口必须对浏览器开放，因为上传的静态资源将直接从 `S3_PUBLIC_URL` 加载。
- 邮件发送服务：[Resend](https://resend.com) API 密钥或 SMTP 中继服务。

### 1. 执行安装

在当前目录写入包含自动生成的 `BETTER_AUTH_SECRET` 和 `S3_SECRET_ACCESS_KEY` 的 `./intlayer.env`，并拉取 `intlayer/cms-all:latest` 镜像。

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

CLI 会调用安装程序并打印其他标签页中所示的 `docker run …` 命令。配置好邮件发送服务后，将其粘贴到终端中运行即可。

</Tab>
</Tabs>

### 2. 配置邮件服务

打开 `intlayer.env` 并配置 Resend **或** SMTP（详情参见[全局邮件服务](#global-mailer)）：

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

### 3. 启动容器

这是安装程序输出的启动命令：

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

CLI 会调用安装程序并打印其他标签页中所示的 `docker run …` 命令。配置好邮件发送服务后，将其粘贴到终端中运行即可。

</Tab>
</Tabs>

打开 **http://localhost:3000** 并按照[首次运行设置](#first-run-setup)进行操作。初次启动需要初始化数据库副本集和存储桶，请稍候约一分钟。

### 备份与升级

所有持久化数据均保存在 `intlayer-data` 数据卷中（`/data/mongo`、`/data/redis`、`/data/minio`）。

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

如需升级，只需重新运行安装程序（它会拉取最新镜像并保留原有的 `intlayer.env`），然后执行 `docker rm -f intlayer` 并再次运行启动命令。若要使用外部托管的 MongoDB 而非内置数据库，请在 `intlayer.env` 中设置 `MONGODB_URI`。

</Tab>
<Tab label="Docker Compose" value="compose">

在独立的 Compose 私有网络中每个服务运行一个容器。控制面板和 API 分别使用公开发布的 `intlayer/cms-frontend` 和 `intlayer/cms-backend` 镜像；数据存储采用官方的 `mongo`、`redis` 和 `minio` 镜像。

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

| 服务         | 镜像                    | 职责                                                                       |
| ------------ | ----------------------- | -------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | 运行在 `:3000` 的控制面板；等待后端健康检查就绪                            |
| `backend`    | `intlayer/cms-backend`  | 包含 Chromium 运行在 `:3100` 的 API；等待 Mongo、Redis 和 MinIO 存储桶就绪 |
| `mongo`      | `mongo:8`               | 单节点副本集 `rs0`，通过自身的健康检查脚本自动初始化                       |
| `redis`      | `redis:8-alpine`        | 队列与缓存，采用 append-only 持久化策略                                    |
| `minio`      | `quay.io/minio/minio`   | 运行在 `:9000` 的 S3 存储与运行在 `:9001` 的控制台                         |
| `minio-init` | `quay.io/minio/mc`      | 单次运行任务：自动创建存储桶并配置匿名只读下载策略                         |

数据持久保存在 `intlayer_mongo-data`、`intlayer_redis-data` 和 `intlayer_minio-data` 卷中。服务之间的连接设置（`MONGODB_URI`、`REDIS_URL`、`S3_ENDPOINT` 以及服务端渲染所用的内部后端 URL）已在 compose 文件中固定，其优先级高于 `.env` 文件（`.env` 仅用于传递敏感密钥和可选集成配置）。

### 前提条件

- **Docker** ≥ 24 并安装 Compose 插件：在 Linux 和 macOS 上安装程序可协助自动安装。在 Windows 上，请先安装 [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)（WSL 2 后端）。
- 主机上的 `3000`、`3100`、`9000` 和 `9001` 端口可用。
- 邮件发送服务：[Resend](https://resend.com) API 密钥或 SMTP 中继服务。

### 1. 执行安装

在 `./intlayer/` 目录中写入 `docker-compose.yml` 和包含自动生成密钥的 `.env`，并拉取所需的镜像。

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

### 2. 配置邮件服务

在 `intlayer/.env` 中填入 Resend **或** SMTP 配置，配置方式与多合一容器完全相同（参见[全局邮件服务](#global-mailer)）。

### 3. 启动堆栈

```sh
cd intlayer && docker compose up -d
```

打开 **http://localhost:3000** 并按照[首次运行设置](#first-run-setup)进行操作。

### 使用外部托管数据库

从 compose 文件中删除要替换的服务（以及 `backend` 中对它的 `depends_on` 依赖项），然后覆盖对应的环境变量：

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` 适用于任何兼容 S3 协议的对象存储服务商。

### 集群横向扩展

`app` 和 `backend` 服务均为无状态设计（stateless）。在负载均衡器后，移除固定的主机端口映射，并配置反向代理直接按容器服务名称访问后，执行 `docker compose up -d --scale backend=3` 即可实现横向扩展。后台异步任务通过 Redis (BullMQ) 协调，多个后端副本可以安全地共享同一个任务队列。

### 从源码编译构建

在代码仓库的根目录下，可以使用 override 文件将两个 Intlayer 服务的镜像拉取模式 `image:` 切换为源码构建 `build:`：

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

为自定义域名生成专属镜像也是通过这种方式完成的：将 `VITE_*` 配置作为构建参数传入（参见[限制条件](#limitations)）。

### 备份与升级

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

### 安装程序高级选项

如果不带 `--mode`（或 `INTLAYER_MODE`）运行，安装程序会弹出交互菜单：`desktop`、`docker`（多合一）或 `compose`。它还支持读取一系列环境变量。由于安装脚本是通过管道输入给 shell 执行的，请在 shell 运行命令前设置这些变量，而不是传给 `curl`：

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

> 端口变量仅影响宿主机 **host** 端的端口映射。由于官方发布的镜像已将 `http://localhost:3000`、`http://localhost:3100` 和 `http://localhost:9000` 预编译到了前端静态代码中，因此除非您自行重新构建镜像，否则请保持这些默认端口不变，详情请参阅[限制条件](#limitations)。

## 首次运行设置

在一个全新的实例中（数据库尚为空），首次在浏览器中打开控制面板会自动重定向至 **`/init`** 初始化页面：

1. 注册首个管理员账户。由于用户数据集合为空，系统会自动将该账户提升为**超级管理员（super admin）**。
2. 系统会通过 Resend 或配置的 SMTP 中继向您的邮箱发送验证邮件。邮箱验证是**强制要求**的，这也是为什么在启动容器之前必须配置好邮件服务。
3. 点击邮件中的验证链接，然后登录系统。

一旦超级管理员创建完成，再次访问 `/init` 将自动重定向至标准登录页面。

## 环境变量参考

两种 Docker 模式均读取相同的环境变量配置文件（容器模式为 `intlayer.env`，Compose 模式为 `.env`），该文件模板派生自 [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template)。

### 必填变量

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### 部署环境固定变量

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

在 Compose 模式下，`app` 服务还会额外注入 `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`：浏览器在宿主机上通过 `localhost:3100` 访问 API，但前端的服务端渲染（SSR）在容器内网运行，必须通过服务名通信。

### 可选变量（未配置时相关功能优雅降级）

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### 全局邮件服务

所有事务性邮件，包括非组织级别的系统邮件（如重置密码、免密登录链接等），均通过以下两种全局传输方式之一发送：

- **Resend**：使用 `RESEND_API_KEY`。
- **SMTP**：使用 `MAIL_SMTP_*` 变量。一旦检测到设置了 `MAIL_SMTP_HOST`，系统将优先启用 SMTP 并忽略 `RESEND_API_KEY`。

`MAIL_PROVIDER` 仅在两者皆已配置时用于强制指定发送通道（例如在配置了 SMTP 的情况下设置 `MAIL_PROVIDER=resend` 强制保留 Resend）。

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> 优先级规则：组织在后台控制面板中独立配置的邮件服务（**组织**设置页面）拥有最高优先级，其次是此处配置的全局邮件服务，最后是默认的 Resend 密钥。

## 连接您的 Intlayer 项目

当服务堆栈成功运行后，配置您的前端项目指向自建的后端 API 和控制面板，而非官方的 `intlayer.org` 云端服务。

### 项目配置文件

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

登录您的自建控制面板，在 **Projects → Access keys** 页面（`http://localhost:3000/projects`）创建项目的客户端凭证。

### `@intlayer/api` SDK

在代码中通过 SDK 调用 `@intlayer/api` 时，请显式传入自建后端的 `backendURL`：

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

## 限制条件

- **不支持自定义域名与端口重映射。** 所有面向浏览器的 `VITE_*` 接口地址均在镜像构建阶段静态固化到了前端代码中，且官方镜像（及桌面应用）默认硬编码了 `localhost` / Intlayer Cloud 地址。控制面板必须通过 `http://localhost:3000` 访问，API 为 `:3100`，MinIO 为 `:9000`。若需部署在公网自定义域名下，或将桌面应用连接至自建后端，必须在构建时通过构建参数（在 `docker/selfhost/Dockerfile` 或 `docker-compose.build.yml` 中传入 `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…`）重新编译镜像，目前暂不支持开箱即用的动态配置。
- **必须配置可用的邮件发送服务。** 系统的首次初始化要求必须通过邮件链接完成身份验证，因此在启动前必须配置好 `RESEND_API_KEY` 或 [SMTP 中继](#global-mailer)（`MAIL_SMTP_*`）。在首个超级管理员成功登录后，各个子组织可以在控制面板中单独配置属于自己的 SMTP 或 Resend 凭证。
- **桌面版应用需要在宿主机上安装 Node.js** 运行时以启动其内嵌的本地前端服务。

## 相关参考链接

- [Intlayer CMS 官方文档](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md)
- [项目配置参考指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [桌面客户端最新发布版本](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub 镜像：[`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)，[`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend)，[`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)；GHCR 镜像源：`ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost)：Dockerfile、`docker-compose.yml` 及 `.env.template` 配置文件模板
