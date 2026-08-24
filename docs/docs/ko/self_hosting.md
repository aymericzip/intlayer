---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Intlayer 자체 호스팅
description: 단일 명령으로 자신만의 인프라에서 완벽한 Intlayer 인스턴스를 실행하세요. Intlayer Cloud 계정이 필요하지 않습니다.
keywords:
  - 자체 호스팅
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - 설치
  - 인프라
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer 자체 호스팅

Intlayer는 Intlayer Cloud 계정 없이도 자체 인프라에서 완전히 실행될 수 있습니다. 단일 명령으로 프로덕션 준비 스택을 부팅합니다:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

설치 프로그램은 `docker-compose.yml` 및 `.env` 파일을 다운로드하고, 필요한 비밀을 자동으로 생성하며, `docker compose up -d` 명령으로 모든 컨테이너를 시작합니다.

## 목차

<TOC/>

---

## 아키텍처

```
                ┌─────────────────────────────┐
 브라우저 ──────▶ │  앱  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  백엔드 (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1-노드 RS)             (S3 API)     (SMTP)        (이미지 내)
                             minio:9001   mailpit:8025
                             (콘솔)       (웹 UI)
```

Chromium (Puppeteer 스크린샷 생성에 사용됨)은 백엔드 이미지 내부에 번들로 제공되므로 별도의 컨테이너가 필요하지 않습니다.

---

## 사전 요구 사항

- **Docker** ≥ 24 및 **Docker Compose** ≥ v2. 둘 중 하나라도 없으면 설치 프로그램이 설치 링크를 출력하고 종료됩니다.
- 호스트에서 포트 `3000`, `3100`, `8025`, `9000`, `9001`이 사용 가능해야 합니다.
- Linux 또는 macOS 호스트 (또는 Windows의 WSL2).

---

## 빠른 시작

게시된 이미지를 pull하고 실행한 후 MongoDB Atlas 자격증명과 보안 키를 제공합니다:

```sh
docker run -d --name intlayer \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  -e DB_ID="<atlas-user>" \
  -e DB_MDP="<atlas-password>" \
  -e DB_CLUSTER="<cluster>.xxxxx.mongodb.net" \
  -e BETTER_AUTH_SECRET="$(openssl rand -hex 32)" \
  -e S3_SECRET_ACCESS_KEY="$(openssl rand -hex 16)" \
  -e RESEND_API_KEY="<your-resend-key>" \
  aymericzip/intlayer-selfhost
```

그 다음 **http://localhost:3000**을 엽니다.

> 대시보드는 `localhost`에서 제공됩니다. [제한 사항](#limitations)을 참고하세요 — 게시된 이미지에서는 커스텀 도메인이 지원되지 않습니다.

---

## 빠른 시작

설치 프로그램의 기능:

1.  `docker` 및 `docker compose`가 설치되어 있는지 확인합니다.
2.  `docker-compose.yml` 및 `.env.example`을 `./intlayer/` 디렉토리에 다운로드합니다.
3.  `.env` 파일이 없으면 예제 파일을 복사하고 `openssl rand`를 통해 `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`에 대한 임의의 비밀을 생성합니다.
4.  `docker compose pull` + `docker compose up -d`를 실행합니다.
5.  다음 URL을 출력합니다: 대시보드 `:3000`, API `:3100`, 이메일 UI `:8025`, MinIO 콘솔 `:9001`.

스택이 실행되면 **http://localhost:3000**을 열고 첫 번째 계정을 생성하세요.

---

## 서비스

| 서비스      | 이미지                             | 호스트 포트                   | 목적                                            |
| ----------- | ---------------------------------- | ----------------------------- | ----------------------------------------------- |
| **앱**      | `apps/app/Dockerfile`에서 빌드     | `3000`                        | TanStack Start 대시보드 (CMS UI)                |
| **백엔드**  | `apps/backend/Dockerfile`에서 빌드 | `3100`                        | Fastify REST API (`/health` 엔드포인트)         |
| **mongo**   | `mongo:7`                          | 내부                          | 단일 노드 복제본 세트 (`rs0`)                   |
| **redis**   | `redis:7-alpine`                   | 내부                          | 작업 큐 (BullMQ) 및 캐싱 (ioredis)              |
| **minio**   | `minio/minio`                      | `9000` (S3), `9001` (콘솔)    | 아바타 및 스크린샷을 위한 S3 호환 객체 스토리지 |
| **mailpit** | `axllent/mailpit`                  | `1025` (SMTP), `8025` (웹 UI) | 로컬 트랜잭션 이메일 싱크                       |

> MinIO 포트 `9000`은 브라우저에서 접근할 수 있어야 합니다. 업로드된 자산(아바타, 스크린샷)은 `S3_PUBLIC_URL=http://localhost:9000/intlayer`에서 직접 로드되기 때문입니다.

---

## 환경 변수

### 필수

| Variable               | Example                      | Description                                                                                                                                  |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas user                                                                                                                           |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas password                                                                                                                       |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host (used in the `mongodb+srv://` URI)                                                                                |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-byte secret for session signing                                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret for the bundled MinIO                                                                                                                 |
| `RESEND_API_KEY`       | _(your key)_                 | Transactional email via Resend. Required for first-run setup unless you configure a global SMTP mailer (see [Global mailer](#global-mailer)) |

### 필수 (자동 생성 또는 프롬프트)

| 변수                   | 예시                                            | 설명                                   |
| ---------------------- | ----------------------------------------------- | -------------------------------------- |
| `NODE_ENV`             | `production`                                    | 런타임 환경                            |
| `PORT`                 | `3100`                                          | 백엔드 리스닝 포트                     |
| `BACKEND_URL`          | `http://localhost:3100`                         | 백엔드 API의 공개 URL                  |
| `APP_URL`              | `http://localhost:3000`                         | 대시보드의 공개 URL                    |
| `DOMAIN`               | `localhost`                                     | 쿠키 도메인                            |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | 전체 MongoDB 연결 URI                  |
| `REDIS_URL`            | `redis://redis:6379`                            | Redis 연결 URL                         |
| `BETTER_AUTH_SECRET`   | _(생성됨)_                                      | 세션 서명을 위한 32바이트 비밀 키      |
| `MAIL_PROVIDER`        | `smtp`                                          | 메일 전송 방식: `smtp` 또는 `resend`   |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTP 호스트명 (Mailpit 컨테이너 이름)  |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTP 포트                              |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | 발신자 주소                            |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3 호환 엔드포인트                     |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | 브라우저 자산 로딩을 위한 공개 URL     |
| `S3_BUCKET_NAME`       | `intlayer`                                      | 버킷 이름                              |
| `S3_ACCESS_KEY_ID`     | _(생성됨)_                                      | MinIO 접근 키                          |
| `S3_SECRET_ACCESS_KEY` | _(생성됨)_                                      | MinIO 비밀 키                          |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | 빌드 시 대시보드에 내장되는 백엔드 URL |
| `VITE_DOMAIN`          | `localhost`                                     | 빌드 시 대시보드에 내장되는 도메인     |

### 선택 사항 (누락 시 기능이 점진적으로 저하됨)

| 변수                                                     | 기능                                                   |
| -------------------------------------------------------- | ------------------------------------------------------ |
| `OPENAI_API_KEY`                                         | AI 기반 번역 및 콘텐츠 감사                            |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | 결제 및 구독 관리                                      |
| `RESEND_API_KEY`                                         | Resend를 통한 트랜잭션 이메일 (설정 시 Mailpit 재정의) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth 로그인                                    |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth 로그인                                    |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth 로그인                                    |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth 로그인                                 |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuth 로그인                                  |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuth 로그인                                 |

### Global mailer

기본적으로 모든 트랜잭션 이메일은 `RESEND_API_KEY`를 사용하여 Resend를 통해 전송됩니다. Self-hosted 배포는 대신 환경 변수로 구성된 global mailer를 통해 비조직 이메일(예: 비밀번호 재설정 및 magic link)을 포함한 **모든** 이메일을 라우팅할 수 있습니다.

`MAIL_PROVIDER`를 설정하여 활성화합니다. 설정하지 않으면 기본 Resend mailer가 사용됩니다.

| Variable             | Example                        | Description                                                               |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Global transport: `smtp` 또는 `resend`. 기본값을 사용하려면 설정하지 않음 |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header. 단순 주소 또는 `Name <email>` 형식 허용                    |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (`MAIL_PROVIDER=smtp`일 때 필수)                                |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (기본값: `587`)                                                 |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. port `465`에서는 `true`로 설정                              |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (선택사항; unauthenticated relay의 경우 생략)               |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                             |

> Precedence: 조직의 자체 mailer (**Organization** dashboard에서 구성)가 global mailer보다 우선하며, global mailer는 기본 Resend key보다 우선합니다.

---

## Intlayer 프로젝트 연결하기

스택이 실행되면 프로젝트가 `intlayer.org` 대신 자체 호스팅된 백엔드 및 대시보드를 가리키도록 설정하세요.

### 프로젝트 설정

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * 자체 호스팅 CMS 대시보드의 URL.
     * 기본값: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // 예: http://localhost:3000

    /**
     * 자체 호스팅 백엔드 API의 URL.
     * 기본값: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // 예: http://localhost:3100
  },
};

export default config;
```

프로젝트의 `.env` 파일에 환경 변수를 설정하세요:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

`http://localhost:3000/projects`의 자체 호스팅 대시보드 **프로젝트 → 접근 키**에서 접근 자격 증명을 생성하세요.

### `@intlayer/api` SDK

`@intlayer/api` SDK를 프로그래밍 방식으로 사용할 때, `backendURL`을 명시적으로 전달하세요:

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

## 업그레이드

이는 최신 이미지를 가져오고 `docker compose pull && docker compose up -d`를 사용하여 컨테이너를 다시 시작합니다. 기존 볼륨(`mongo-data`, `redis-data`, `minio-data`)은 보존되므로 데이터 손실이 없습니다.

```sh
docker compose pull
docker compose up -d
```

---

## 백업 및 복원

모든 영구 데이터는 세 개의 명명된 Docker 볼륨에 저장됩니다.

### 백업

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

### 복원

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# redis-data 및 minio-data에 대해서도 반복합니다.
```

---

## 제한 사항

- **MongoDB는 외부(Atlas)여야 합니다.** 백엔드는 `mongodb+srv://`로만 연결되며(`DB_ID` / `DB_MDP` / `DB_CLUSTER`로 구성됨), 일반 `mongodb://host:27017` — 컨테이너의 자체 번들 `mongod` 포함 — 은 사용할 수 없습니다. MongoDB Atlas 클러스터를 제공하세요.
- **사용자 정의 도메인 없음.** 모든 브라우저 대면 `VITE_*` URL은 빌드 시 앱에 인라인되며, 게시된 이미지는 `localhost` 값으로 제공됩니다. 대시보드는 `http://localhost:3000`에서 액세스해야 합니다. 공개 도메인에서 제공하려면 대상 URL을 포함하여 이미지를 다시 빌드해야 하며 기본적으로 지원되지 않습니다.
- **이메일에는 작동하는 메일러가 필요합니다.** 초기 실행 설정은 이메일 확인을 강제하므로 `RESEND_API_KEY` 또는 [글로벌 SMTP 메일러](#global-mailer)(`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`)를 구성해야 합니다. 첫 번째 관리자가 로그인한 후 각 조직은 대시보드에서 자신의 SMTP 또는 Resend 메일러를 구성할 수도 있습니다.

---

## 문제 해결

### 첫 시작 시 백엔드 충돌 반복

백엔드가 시작되기 전에 MongoDB와 Redis가 정상 상태여야 합니다. compose 파일은 `condition: service_healthy`와 함께 `depends_on`을 사용합니다. 백엔드 재시작이 반복적으로 발생하면 `mongo` 및 `redis` 헬스체크가 통과하는지 확인하세요:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

로그의 상단 근처에서 `MongoDB connection error`를 찾아보세요.

### 대시보드가 API에 연결할 수 없음

`VITE_BACKEND_URL`이 **브라우저**에서 백엔드에 접근 가능한 URL(Docker 네트워크가 아님)과 일치하는지 확인하세요. 백엔드 포트를 변경했거나 리버스 프록시를 추가했다면, 대시보드 이미지를 다시 빌드해야 합니다:

### MinIO 버킷 누락

`minio-init` 일회성 서비스가 실행되지 않았거나(또는 MinIO가 준비되기 전에 실행된 경우), 수동으로 버킷을 생성하세요:

```sh
docker compose run --rm minio-init
```

---

## 유용한 링크

- [Intlayer CMS 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
- [설정 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
