---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Intlayer CLI init infra 명령어를 사용하여 데스크톱 앱을 설치하거나 Docker(올인원 컨테이너 또는 Docker Compose 스택)로 Intlayer CMS를 셀프 호스팅하는 방법을 알아봅니다.
keywords:
  - CLI
  - 인프라
  - 셀프 호스팅
  - 데스크톱 앱
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
    changes: "init infra 명령어 추가"
author: aymericzip
---

# Intlayer CLI Init Infra 명령어

## 설명

`init infra` 명령어는 로컬 머신에 Intlayer 인프라를 설정합니다. 사용 중인 플랫폼용 호스팅 설치 프로그램(macOS / Linux는 `https://intlayer.org/install.sh`, Windows는 `https://intlayer.org/install.ps1`)을 다운로드하고 터미널에 연결하여 실행하므로 설치 프로그램 메뉴와 진행 상황이 그대로 표시됩니다.

설치 프로그램은 Intlayer 실행 방법을 선택하도록 안내합니다:

- **데스크톱 앱**: 운영체제 및 CPU에 맞는 네이티브 대시보드를 다운로드하여 열거나 설치합니다. 데스크톱 빌드는 Intlayer Cloud 백엔드와 통신합니다.
- **올인원 Docker**: 단일 볼륨 기반의 단일 컨테이너에서 대시보드 + API + MongoDB + Redis + MinIO를 실행합니다. 시크릿이 생성된 `./intlayer.env`를 작성하고 `intlayer/cms-all` 이미지를 가져옵니다.
- **Docker Compose**: 확장 가능한 셀프 호스팅을 위한 서비스당 하나의 컨테이너 구성입니다. `./intlayer/`에 `docker-compose.yml` 및 `.env`를 작성하고 이미지를 가져옵니다.

호스팅된 설치 프로그램이 설정 흐름의 유일한 정보원입니다. CLI는 동일한 단계를 다시 구현하지 않고 설치 프로그램을 실행하므로 `npx intlayer init infra`와 `curl -fsSL https://intlayer.org/install.sh | sh`는 완전히 동일하게 작동합니다.

## 사용법

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

`npx intlayer init --interactive` 체크리스트의 **인프라 (데스크톱 앱 / 셀프 호스팅)** 항목에서도 동일한 단계가 제공됩니다.

## 옵션

- `-m, --mode <mode>` - 선택 사항. 설치 프로그램 메뉴를 건너뛰고 특정 모드를 직접 실행합니다. 허용되는 값: `desktop`, `docker`(올인원) 또는 `compose`. 다른 값을 입력하면 지원되는 모드 목록과 함께 오류가 발생합니다.

## 예시

### 대화형으로 모드 선택

```bash
npx intlayer init infra
```

### 데스크톱 앱 설치

```bash
npx intlayer init infra --mode desktop
```

### 올인원 컨테이너로 셀프 호스팅

```bash
npx intlayer init infra --mode docker
```

### Docker Compose로 셀프 호스팅

```bash
npx intlayer init infra --mode compose
```

## 출력 예시

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

## 설치 프로그램 설정

설치 프로그램은 몇 가지 환경 변수를 읽으며, CLI는 이를 그대로 전달합니다. 명령을 실행하기 전에 셸에서 설정하세요:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| 변수                      | 기본값                    | 적용 대상 | 설명                                                |
| ------------------------- | ------------------------- | --------- | --------------------------------------------------- |
| `INTLAYER_MODE`           | _(질문됨)_                | 모두      | `desktop`, `docker` 또는 `compose`, `--mode`와 동일 |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop   | 앱 설치 프로그램이 저장되는 위치                    |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker    | 가져올 올인원 이미지                                |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker    | 환경 설정 파일을 작성할 위치                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker    | 컨테이너 이름                                       |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker    | `/data`에 마운트된 네임드 볼륨                      |
| `INTLAYER_APP_PORT`       | `3000`                    | docker    | 대시보드 호스트 포트                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker    | API 호스트 포트                                     |
| `INTLAYER_S3_PORT`        | `9000`                    | docker    | MinIO S3 API 호스트 포트                            |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker    | MinIO 콘솔 호스트 포트                              |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose   | `docker-compose.yml` 및 `.env`가 작성되는 위치      |
| `INTLAYER_SELFHOST_REF`   | `main`                    | 둘 다     | compose 파일 및 env 템플릿을 가져오는 Git ref       |

> 포트 변수는 매핑의 **호스트** 측만 변경합니다. 게시된 이미지에는 `http://localhost:3000`, `http://localhost:3100`, `http://localhost:9000`이 대시보드 번들에 컴파일되어 있으므로 자체 이미지를 빌드하지 않는 한 기본값을 유지하세요: [셀프 호스팅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md#limitations)를 참조하세요.

## 요구 사항

- **데스크톱 앱**은 [Node.js](https://nodejs.org)가 필요합니다: 앱은 대시보드 서버를 내장하고 있으며 머신의 `node` 바이너리로 시작합니다.
- **Docker 모드**는 [Docker](https://docs.docker.com/get-docker/)가 필요합니다(Windows에서는 WSL 2 백엔드의 Docker Desktop). Compose 모드에는 `docker compose` 플러그인도 필요합니다.

## 참고 사항

- 명령을 다시 실행해도 안전합니다: 기존 환경 파일은 절대 덮어쓰지 않으므로 업그레이드 경로로도 사용됩니다(최신 이미지를 가져오고 시크릿을 유지함).
- 설치 프로그램은 임시 디렉터리에 다운로드되며 결과에 관계없이 종료 시 삭제됩니다.
- 명령어의 종료 코드는 설치 프로그램의 종료 코드입니다. 다운로드 자체가 실패하면 CLI에서 직접 설치 프로그램을 실행할 수 있도록 해당하는 `curl … | sh`(또는 `irm … | iex`) 명령을 출력합니다.
- Docker 모드에서는 로그인 이메일을 전송하기 위해 메일러가 필요합니다. 설치 프로그램이 완료된 후 생성된 환경 파일에서 Resend 또는 SMTP를 구성하세요: [글로벌 메일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md#global-mailer)를 참조하세요.

## 관련 문서

- [셀프 호스팅 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/self_hosting.md) - 각 모드의 아키텍처, 초기 실행 단계 및 제한 사항
- [Intlayer 초기화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/init.md) - 상위 `init` 명령어 및 대화형 체크리스트
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md) - 방금 설치한 대시보드의 기능
