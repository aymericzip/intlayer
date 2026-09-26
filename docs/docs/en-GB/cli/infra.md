---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: Learn how to use the Intlayer CLI init infra command to install the desktop app or self-host the Intlayer CMS with Docker (all-in-one container or Docker Compose stack).
keywords:
  - CLI
  - Infrastructure
  - Self-hosting
  - Desktop app
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
    changes: "Add init infra command"
author: aymericzip
---

# Intlayer CLI Init Infra Command

## Description

The `init infra` command sets up the Intlayer infrastructure on your machine. It downloads the hosted installer for your platform (`https://intlayer.org/install.sh` on macOS / Linux, `https://intlayer.org/install.ps1` on Windows) and runs it with your terminal attached, so the installer's own menu and progress output reach you unchanged.

The installer asks how you want to run Intlayer:

- **Desktop app**: downloads the native dashboard for your OS and CPU and opens or installs it. The desktop build talks to the Intlayer Cloud backend.
- **All-in-one Docker**: dashboard + API + MongoDB + Redis + MinIO in a single container backed by one volume. Writes `./intlayer.env` with the secrets generated and pulls the `intlayer/cms-all` image.
- **Docker Compose**: one container per service, for scalable self-hosting. Writes `docker-compose.yml` and `.env` into `./intlayer/` and pulls the images.

The hosted installer is the single source of truth for the setup flow: the CLI runs it rather than re-implementing the same steps, so `npx intlayer init infra` and `curl -fsSL https://intlayer.org/install.sh | sh` do exactly the same thing.

## Usage

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

The same step is offered from the checklist of `npx intlayer init --interactive`, under **Infrastructure (desktop app / self-hosting)**.

## Options

- `-m, --mode <mode>` - Optional. Skip the installer's menu and run one mode directly. Accepted values: `desktop`, `docker` (all-in-one) or `compose`. Any other value exits with an error listing the accepted modes.

## Examples

### Pick the mode interactively

```bash
npx intlayer init infra
```

### Install the desktop app

```bash
npx intlayer init infra --mode desktop
```

### Self-host with the all-in-one container

```bash
npx intlayer init infra --mode docker
```

### Self-host with Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Example output

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

## Installer settings

The installer reads a few environment variables, which the CLI passes through untouched. Set them in your shell before running the command:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
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

> The port variables only change the **host** side of the mapping. The published images have `http://localhost:3000`, `http://localhost:3100` and `http://localhost:9000` compiled into the dashboard bundle, so keep the defaults unless you build your own images: see the [self-hosting guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md#limitations).

## Requirements

- **Desktop app** needs [Node.js](https://nodejs.org): the app embeds the dashboard's server and starts it with the machine's own `node` binary.
- **Docker modes** need [Docker](https://docs.docker.com/get-docker/) (Docker Desktop with the WSL 2 backend on Windows). The Compose mode also needs the `docker compose` plugin.

## Notes

- Re-running the command is safe: an existing environment file is never overwritten, so it doubles as the upgrade path (the installer pulls the latest images and keeps your secrets).
- The installer is downloaded to a temporary directory and deleted once it exits, whatever the outcome.
- The command's exit code is the installer's. If the download itself fails, the CLI prints the equivalent `curl … | sh` (or `irm … | iex`) command so you can run the installer directly.
- The Docker modes still need a mailer to send sign-in emails. After the installer finishes, configure Resend or SMTP in the generated environment file: see [Global mailer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md#global-mailer).

## Related

- [Self-hosting guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md) - Architecture, first-run steps and limitations of each mode
- [Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/init.md) - The parent `init` command and its interactive checklist
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md) - What the dashboard you just installed does
