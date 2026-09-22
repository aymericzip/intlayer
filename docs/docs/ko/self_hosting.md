---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Intlayer 셀프 호스팅
description: "자체 인프라에서 Intlayer를 실행하세요: 데스크톱 앱, 단일 올인원 Docker 컨테이너 또는 확장 가능한 Docker Compose 스택. Intlayer Cloud 계정이 필요하지 않습니다."
keywords:
  - 셀프 호스팅
  - Docker
  - Docker Compose
  - 데스크톱 앱
  - Intlayer
  - CMS
  - 설치
  - 인프라
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer 셀프 호스팅

Intlayer는 자체 인프라에서 실행할 수 있으며, Intlayer Cloud 계정이 필요하지 않습니다. 동일한 설치 프로그램(`install.sh`, Windows의 경우 `install.ps1` 또는 `npx intlayer init infra`)으로 설정할 수 있는 세 가지 구성이 제공됩니다:

| Setup              | What it is                                                                 | Pick it for                           |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------------- |
| **데스크톱 앱**    | macOS, Linux 및 Windows용 네이티브 대시보드                                | 로컬 클라이언트, 호스팅할 필요 없음   |
| **올인원 Docker**  | 대시보드, API, MongoDB, Redis, MinIO가 **단일 컨테이너**에 포함됨          | 테스트 및 소규모 단일 머신 설치       |
| **Docker Compose** | **서비스당 하나의 컨테이너**, 각 데이터 저장소를 관리형 서비스로 대체 가능 | 프로덕션, 확장성, 관리형 데이터베이스 |

## Table of Contents

<TOC/>

## 게시된 이미지 및 패키지

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

세 가지 이미지는 모두 동일한 [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost)에서 빌드되며 매 릴리스마다 게시됩니다. Compose 스택은 공식 `mongo:8`, `redis:8-alpine`, `quay.io/minio/minio` 이미지도 가져옵니다.

## 설정

설치 프로그램은 원하는 설정을 묻고 사전 요구 사항을 확인한 후(Docker 설치 제안), 이미 생성된 시크릿과 함께 환경 파일을 작성하고 이미지를 가져옵니다. 자체적으로 아무것도 시작하지 않습니다: Docker 모드는 먼저 메일러가 필요하므로 실행할 명령어를 출력하고 종료됩니다. 재실행해도 안전합니다: 기존 환경 파일은 절대 덮어쓰지 않으므로 업그레이드 경로로도 사용됩니다.

<Tabs group="mode">
<Tab label="데스크톱 앱" value="desktop">

Tauri로 구축된 네이티브 애플리케이션 형태의 Intlayer 대시보드입니다. Intlayer Cloud(`https://app.intlayer.org`)에 로그인하므로 호스팅할 필요가 없습니다. 브라우저 탭 대신 로컬 클라이언트를 원할 때 최적의 선택입니다.

### 설치

설치 프로그램은 사용 중인 OS 및 CPU에 맞는 패키지를 다운로드한 후 열거나(macOS), 설치하거나(Linux의 경우 `dpkg` / `rpm`), 설정 마법사를 시작합니다(Windows). [릴리스 페이지](https://github.com/aymericzip/intlayer/releases/latest)에서 수동으로 다운로드할 수도 있습니다.

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

### 요구 사항

- **Node.js**: 앱은 대시보드 서버를 내장하고 있으며 머신의 `node` 바이너리로 시작합니다. 앱이 시작되지 않으면 [nodejs.org](https://nodejs.org)에서 설치하세요.

> 게시된 데스크톱 빌드는 Intlayer Cloud 백엔드와 통신합니다. 자체 호스팅 백엔드로 지정하려면 API를 가리키는 `VITE_BACKEND_URL`로 앱을 다시 빌드해야 합니다. [제한 사항](#limitations)을 참조하세요.

</Tab>
<Tab label="올인원 Docker" value="docker">

모든 것이 [s6-overlay](https://github.com/just-containers/s6-overlay)에 의해 감독되는 단일 `intlayer/cms-all` 컨테이너 내부에서 실행되며, 모든 데이터 저장소는 단일 볼륨에 유지됩니다.

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

| 서비스      | 호스트 포트                | 용도                                       |
| ----------- | -------------------------- | ------------------------------------------ |
| **app**     | `3000`                     | 대시보드 (CMS UI)                          |
| **backend** | `3100`                     | REST API (`/health` 엔드포인트)            |
| **mongo**   | 내부                       | MongoDB 8, 단일 노드 복제본 세트 `rs0`     |
| **redis**   | 내부                       | 작업 큐 (BullMQ) 및 캐싱                   |
| **minio**   | `9000` (S3), `9001` (콘솔) | 아바타 및 스크린샷용 S3 호환 객체 스토리지 |

부팅 순서는 s6 종속성(`mongod` → replica-set 초기화, `minio` → 버킷 생성, 그다음 `backend`, 그다음 `app`)에 의해 제어되며, 서비스 종료 시 자동으로 재시작하므로 첫 번째 부팅이 스스로 복구됩니다.

### 사전 요구 사항

- **Docker** ≥ 24: 설치 프로그램에서 설치를 제안합니다(Linux는 [get.docker.com](https://get.docker.com), macOS는 Homebrew). Windows에서는 먼저 [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)(WSL 2 백엔드)을 설치하세요.
- 호스트에서 `3000`, `3100`, `9000`, `9001` 포트 사용 가능. MinIO `9000`은 브라우저가 `S3_PUBLIC_URL`에서 에셋을 직접 로드하므로 브라우저에서 연결 가능해야 합니다.
- 메일러: [Resend](https://resend.com) API 키 또는 SMTP 릴레이.

### 1. 설치

`BETTER_AUTH_SECRET` 및 `S3_SECRET_ACCESS_KEY`가 생성된 `./intlayer.env`를 작성하고 `intlayer/cms-all:latest`를 가져옵니다.

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

CLI가 설치 프로그램을 실행하고 다른 탭에 표시된 `docker run …` 명령을 출력합니다. 메일러가 구성되면 터미널에 복사하여 실행하세요.

</Tab>
</Tabs>

### 2. 메일러 구성

`intlayer.env`를 열고 Resend **또는** SMTP를 구성합니다(자세한 내용은 [글로벌 메일러](#global-mailer) 참조):

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

### 3. 시작

설치 프로그램이 출력하는 명령어입니다:

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

CLI가 설치 프로그램을 실행하고 다른 탭에 표시된 `docker run …` 명령을 출력합니다. 메일러가 구성되면 터미널에 복사하여 실행하세요.

</Tab>
</Tabs>

**http://localhost:3000**을 열고 [초기 설정](#first-run-setup)을 따릅니다. 첫 번째 부팅 시 복제본 세트와 버킷이 초기화되므로 1분 정도 기다려 주세요.

### 백업 및 업그레이드

모든 상태는 `intlayer-data` 볼륨(`/data/mongo`, `/data/redis`, `/data/minio`)에 저장됩니다.

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

업그레이드하려면 설치 프로그램을 다시 실행하고(최신 이미지를 가져오고 `intlayer.env`를 유지함) `docker rm -f intlayer`를 실행한 후 시작 명령을 다시 실행하세요. 번들된 항목 대신 관리형 MongoDB를 사용하려면 `intlayer.env`에 `MONGODB_URI`를 설정하세요.

</Tab>
<Tab label="Docker Compose" value="compose">

비공개 Compose 네트워크에서 서비스당 하나의 컨테이너를 실행합니다. 대시보드와 API는 게시된 `intlayer/cms-frontend` 및 `intlayer/cms-backend` 이미지를 사용하고, 데이터 저장소는 공식 `mongo`, `redis`, `minio` 이미지를 사용합니다.

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

| 서비스       | 이미지                  | 역할                                                           |
| ------------ | ----------------------- | -------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | `:3000`의 대시보드. 백엔드가 정상 상태가 될 때까지 대기        |
| `backend`    | `intlayer/cms-backend`  | Chromium이 포함된 `:3100`의 API. Mongo, Redis, MinIO 버킷 대기 |
| `mongo`      | `mongo:8`               | 자체 헬스체크로 시작되는 단일 노드 복제본 세트 `rs0`           |
| `redis`      | `redis:8-alpine`        | 큐 및 캐싱, 추가 전용(append-only) 지속성                      |
| `minio`      | `quay.io/minio/minio`   | `:9000`의 S3 스토리지, `:9001`의 콘솔                          |
| `minio-init` | `quay.io/minio/mc`      | 단발성 실행: 버킷 및 익명 다운로드 정책 생성                   |

데이터는 `intlayer_mongo-data`, `intlayer_redis-data`, `intlayer_minio-data` 볼륨에 유지됩니다. 서비스 연결(`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, 서버 측 렌더링에 사용되는 내부 백엔드 URL)은 compose 파일에 고정되어 있으며 비밀 및 선택적 통합만 포함하는 `.env`보다 우선합니다.

### 사전 요구 사항

- **Docker** ≥ 24(Compose 플러그인 포함): 설치 프로그램에서 Linux 및 macOS 설치를 제안합니다. Windows에서는 먼저 [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/)(WSL 2 백엔드)을 설치하세요.
- 호스트에서 `3000`, `3100`, `9000`, `9001` 포트 사용 가능.
- 메일러: [Resend](https://resend.com) API 키 또는 SMTP 릴레이.

### 1. 설치

`docker-compose.yml` 및 생성된 비밀이 포함된 `.env`를 `./intlayer/`에 작성하고 이미지를 가져옵니다.

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

### 2. 메일러 구성

올인원 설정과 마찬가지로 `intlayer/.env`에 Resend **또는** SMTP를 채웁니다([글로벌 메일러](#global-mailer) 참조).

### 3. 시작

```sh
cd intlayer && docker compose up -d
```

**http://localhost:3000**을 열고 [초기 설정](#first-run-setup)을 따릅니다.

### 관리형 데이터 저장소

교체하려는 서비스를 compose 파일(및 `backend`의 `depends_on` 항목)에서 삭제한 다음 일치하는 변수를 재정의합니다:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME`은 모든 S3 호환 공급자에 대해 동일한 의미를 유지합니다.

### 확장성

`app`과 `backend`는 무상태(stateless)입니다. 로드 밸런서 뒤에서 고정 호스트 포트 매핑을 제거하고 프록시가 이름으로 서비스를 처리하도록 하면 `docker compose up -d --scale backend=3`이 작동합니다. 백그라운드 작업은 Redis (BullMQ)를 통해 조정되므로 여러 백엔드 복제본이 큐를 안전하게 공유합니다.

### 소스에서 빌드

저장소 클론에서 재정의 설정을 통해 두 Intlayer 서비스를 `image:`에서 `build:`로 전환합니다:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

사용자 지정 도메인용 이미지를 생성하는 방법도 이와 같습니다: `VITE_*` 값을 빌드 인수로 전달합니다([제한 사항](#limitations) 참조).

### 백업 및 업그레이드

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

### 설치 프로그램 설정

`--mode`(또는 `INTLAYER_MODE`)가 없으면 설치 프로그램에 메뉴가 표시됩니다: `desktop`, `docker`(올인원) 또는 `compose`. 또한 몇 가지 환경 변수를 읽습니다. 셸로 파이프되므로 `curl`이 아닌 셸에 전달하세요:

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

> 포트 변수는 매핑의 **호스트** 측만 변경합니다. 게시된 이미지에는 `http://localhost:3000`, `http://localhost:3100`, `http://localhost:9000`이 대시보드 번들에 컴파일되어 있으므로 자체 이미지를 빌드하지 않는 한 기본값을 유지하세요. [제한 사항](#limitations)을 참조하세요.

## 초기 설정

새 인스턴스(빈 데이터베이스)에서 대시보드를 열면 **`/init`** 페이지로 리디렉션됩니다:

1. 첫 번째 계정을 만듭니다. 사용자 컬렉션이 비어 있으므로 이 계정은 자동으로 **최고 관리자(super admin)** 로 승격됩니다.
2. Resend 또는 SMTP 릴레이를 통해 인증 이메일이 전송됩니다. 이메일 인증은 **필수**이므로 시작하기 전에 메일러를 구성해야 합니다.
3. 이메일의 링크를 클릭한 다음 로그인합니다.

관리자가 존재하면 `/init`은 표준 로그인 페이지로 리디렉션됩니다.

## 환경 변수

두 Docker 모드 모두 [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template)에서 생성된 동일한 파일(컨테이너의 경우 `intlayer.env`, Compose의 경우 `.env`)을 읽습니다.

### 필수 항목

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### 배포에 의해 고정됨

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

Compose `app` 서비스는 추가로 `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`을 받습니다: 브라우저는 `localhost:3100`에서 API에 연결하지만 서버 측 렌더링은 Compose 네트워크 내부에서 실행되므로 서비스 이름을 사용해야 합니다.

### 선택 항목 (누락 시 기능이 점진적으로 저하됨)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### 글로벌 메일러

비조직 이메일(비밀번호 재설정 및 매직 링크)을 포함한 모든 트랜잭션 이메일은 두 가지 글로벌 전송 방식 중 하나를 거칩니다:

- **Resend**: `RESEND_API_KEY` 사용.
- **SMTP**: `MAIL_SMTP_*` 변수 사용. `MAIL_SMTP_HOST`가 설정되면 즉시 SMTP가 사용되며 `RESEND_API_KEY`는 무시됩니다.

`MAIL_PROVIDER`는 둘 다 구성된 경우 하나의 전송 방식을 강제하는 데만 필요합니다(예: SMTP 호스트가 있는 상태에서 Resend를 유지하기 위해 `MAIL_PROVIDER=resend`).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> 우선순위: 조직 자체 메일러(**조직** 대시보드에서 구성)가 글로벌 메일러보다 우선하며, 글로벌 메일러는 기본 Resend 키보다 우선합니다.

## Intlayer 프로젝트 연결

스택이 실행되면 `intlayer.org` 대신 자체 호스팅된 백엔드 및 대시보드를 가리키도록 프로젝트를 설정합니다.

### 프로젝트 구성

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

`http://localhost:3000/projects`의 자체 호스팅 대시보드에서 **Projects → Access keys** 아래에 액세스 자격 증명을 만듭니다.

### `@intlayer/api` SDK

프로그래밍 방식으로 `@intlayer/api` SDK를 사용할 때 `backendURL`을 명시적으로 전달합니다:

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

## 제한 사항

- **사용자 지정 도메인 및 포트 재매핑 미지원.** 브라우저용 모든 `VITE_*` URL은 빌드 시 대시보드에 번들링되며 게시된 이미지(및 데스크톱 앱)는 `localhost` / Intlayer Cloud 값과 함께 제공됩니다. 대시보드는 `http://localhost:3000`, API는 `:3100`, MinIO는 `:9000`에서 액세스해야 합니다. 공개 도메인에서 제공하거나 데스크톱 앱을 자체 호스팅 백엔드로 지정하려면 대상 URL이 포함된 상태로 다시 빌드해야 하며(`docker/selfhost/Dockerfile` 또는 `docker-compose.build.yml`에서 `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…`), 기본적으로 지원되지 않습니다.
- **이메일 전송을 위해 작동하는 메일러가 필요합니다.** 초기 설정에서는 이메일 인증이 강제되므로 `RESEND_API_KEY` 또는 [SMTP 릴레이](#global-mailer)(`MAIL_SMTP_*`)를 구성해야 합니다. 첫 번째 관리자가 로그인한 후 각 조직은 대시보드에서 자체 SMTP 또는 Resend 메일러를 구성할 수도 있습니다.
- **데스크톱 앱은 임베디드 서버를 시작하기 위해 머신에 Node.js가 필요합니다.**

## 유용한 링크

- [Intlayer CMS 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
- [구성 레퍼런스](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [데스크톱 앱 릴리스](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), GHCR 미러: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` 및 `.env.template`
