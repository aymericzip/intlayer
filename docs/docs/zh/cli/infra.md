---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: 了解如何使用 Intlayer CLI init infra 命令安装桌面应用程序，或使用 Docker（多合一容器或 Docker Compose 堆栈）自行托管 Intlayer CMS。
keywords:
  - CLI
  - 基础设施
  - 自行托管
  - 桌面应用
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
    changes: "添加 init infra 命令"
author: aymericzip
---

# Intlayer CLI Init Infra 命令

## 描述

`init infra` 命令用于在您的机器上设置 Intlayer 基础设施。它会下载适用于您平台的托管安装程序（macOS / Linux 上为 `https://intlayer.org/install.sh`，Windows 上为 `https://intlayer.org/install.ps1`），并在终端中运行，以便完整显示安装程序自身的菜单和进度输出。

安装程序会询问您希望如何运行 Intlayer：

- **桌面应用**：下载适用于您的操作系统和 CPU 的原生控制面板并打开或安装。桌面版本连接至 Intlayer Cloud 后端。
- **多合一 Docker**：在由单个卷支持的单个容器中运行控制面板 + API + MongoDB + Redis + MinIO。写入包含生成密钥的 `./intlayer.env` 并拉取 `intlayer/cms-all` 镜像。
- **Docker Compose**：每个服务一个容器，用于可扩展的自行托管。将 `docker-compose.yml` 和 `.env` 写入 `./intlayer/` 并拉取镜像。

托管安装程序是安装流程的唯一真实来源：CLI 运行它而不是重新实现相同步骤，因此 `npx intlayer init infra` 与 `curl -fsSL https://intlayer.org/install.sh | sh` 执行完全相同的操作。

## 用法

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

`npx intlayer init --interactive` 的检查列表中也提供了相同的步骤，位于 **基础设施 (桌面应用 / 自行托管)** 下。

## 选项

- `-m, --mode <mode>` - 可选。跳过安装程序菜单并直接运行特定模式。接受的值：`desktop`、`docker`（多合一）或 `compose`。任何其他值都会退出并显示错误列出接受的模式。

## 示例

### 以交互方式选择模式

```bash
npx intlayer init infra
```

### 安装桌面应用

```bash
npx intlayer init infra --mode desktop
```

### 使用多合一容器自行托管

```bash
npx intlayer init infra --mode docker
```

### 使用 Docker Compose 自行托管

```bash
npx intlayer init infra --mode compose
```

## 示例输出

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

## 安装程序设置

安装程序会读取一些环境变量，CLI 会原样传递这些变量。在运行命令前请在 shell 中进行设置：

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| 变量                      | 默认值                    | 适用于  | 描述                                               |
| ------------------------- | ------------------------- | ------- | -------------------------------------------------- |
| `INTLAYER_MODE`           | _(询问)_                  | 全部    | `desktop`、`docker` 或 `compose`，与 `--mode` 相同 |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop | 应用安装程序保存位置                               |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker  | 要拉取的多合一镜像                                 |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker  | 环境文件写入位置                                   |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker  | 容器名称                                           |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker  | 挂载在 `/data` 的具名卷                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker  | 控制面板主机端口                                   |
| `INTLAYER_API_PORT`       | `3100`                    | docker  | API 主机端口                                       |
| `INTLAYER_S3_PORT`        | `9000`                    | docker  | MinIO S3 API 主机端口                              |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker  | MinIO 控制台主机端口                               |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose | 写入 `docker-compose.yml` 和 `.env` 的位置         |
| `INTLAYER_SELFHOST_REF`   | `main`                    | 两者    | 获取 compose 文件和 env 模板的 Git ref             |

> 端口变量仅更改映射的 **主机** 端。已发布的镜像在控制面板包中预编译了 `http://localhost:3000`、`http://localhost:3100` 和 `http://localhost:9000`，因此除非您构建自己的镜像，否则请保留默认值：请参阅[自行托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md#limitations)。

## 环境要求

- **桌面应用** 需要 [Node.js](https://nodejs.org)：该应用内嵌了控制面板服务器，并使用机器自身的 `node` 二进制文件启动。
- **Docker 模式** 需要 [Docker](https://docs.docker.com/get-docker/)（Windows 上需要带有 WSL 2 后端的 Docker Desktop）。Compose 模式还需要 `docker compose` 插件。

## 注意事项

- 重新运行该命令是安全的：现有的环境文件绝不会被覆盖，因此它也作为升级路径（安装程序会拉取最新镜像并保留您的密钥）。
- 安装程序会被下载到临时目录中，无论结果如何，退出时都会被删除。
- 该命令的退出代码即为安装程序的退出代码。如果下载本身失败，CLI 将打印等效的 `curl … | sh`（或 `irm … | iex`）命令，以便您可以直接运行安装程序。
- Docker 模式仍需要邮件发送服务来发送登录邮件。安装程序完成后，请在生成的环境文件中配置 Resend 或 SMTP：请参阅[全局邮件程序](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md#global-mailer)。

## 相关内容

- [自行托管指南](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/self_hosting.md) - 各模式的架构、首次运行步骤和限制
- [初始化 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/cli/init.md) - 父级 `init` 命令及其交互式检查清单
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/intlayer_CMS.md) - 您刚安装的控制面板的功能
