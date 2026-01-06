---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: CI 명령어
description: CI/CD 파이프라인 및 모노레포에서 자동으로 주입된 자격 증명으로 Intlayer 명령어를 실행하는 방법을 알아보세요.
keywords:
  - CI
  - CI/CD
  - 자동화
  - 모노레포
  - 자격 증명
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: CI 명령어 추가
---

# CI 명령어

```bash
npx intlayer ci <command...>
```

CI 명령어는 자동화 및 CI/CD 파이프라인을 위해 설계되었습니다. `INTLAYER_PROJECT_CREDENTIALS` 환경 변수에서 자격 증명을 자동으로 주입하고 모노레포의 여러 프로젝트에서 Intlayer 명령어를 실행할 수 있습니다.

## 작동 방식

CI 명령어는 두 가지 모드로 작동합니다:

1. **단일 프로젝트 모드**: 현재 작업 디렉토리가 `INTLAYER_PROJECT_CREDENTIALS`의 프로젝트 경로 중 하나와 일치하는 경우, 해당 특정 프로젝트에 대해서만 명령어를 실행합니다.

2. **반복 모드**: 특정 프로젝트 컨텍스트가 감지되지 않으면 모든 구성된 프로젝트를 반복하고 각 프로젝트에 대해 명령어를 실행합니다.

## 환경 변수

명령어는 `INTLAYER_PROJECT_CREDENTIALS` 환경 변수가 설정되어 있어야 합니다. 이 변수는 프로젝트 경로를 자격 증명에 매핑하는 JSON 객체를 포함해야 합니다:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## 패키지 관리자 감지

CI 명령어는 `npm_config_user_agent` 환경 변수를 기반으로 사용 중인 패키지 관리자(npm, yarn, pnpm 또는 bun)를 자동으로 감지하고 Intlayer를 실행하는 데 적절한 명령어를 사용합니다.

## 인수

- **`<command...>`**: 실행할 Intlayer 명령어(예: `fill`, `push`, `build`). 모든 Intlayer 명령어와 해당 인수를 전달할 수 있습니다.

  > 예: `npx intlayer ci fill --verbose`
  >
  > 예: `npx intlayer ci push`
  >
  > 예: `npx intlayer ci build`

## 예제

### 단일 프로젝트 모드에서 명령어 실행

`INTLAYER_PROJECT_CREDENTIALS`의 경로 중 하나와 일치하는 프로젝트 디렉토리에 있는 경우:

```bash
cd packages/app
npx intlayer ci fill
```

이렇게 하면 `packages/app` 프로젝트에 대해 자격 증명이 자동으로 주입되어 `fill` 명령어가 실행됩니다.

### 모든 프로젝트에서 명령어 실행

프로젝트 경로와 일치하지 않는 디렉토리에 있는 경우, 명령어는 모든 구성된 프로젝트를 반복합니다:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

이렇게 하면 `INTLAYER_PROJECT_CREDENTIALS`에 구성된 각 프로젝트에 대해 `push` 명령어가 실행됩니다.

### 추가 플래그 전달

기본 Intlayer 명령어에 모든 플래그를 전달할 수 있습니다:

```bash
npx intlayer ci fill --verbose --mode complete
```

### CI/CD 파이프라인에서 사용

CI/CD 구성(예: GitHub Actions, GitLab CI)에서 `INTLAYER_PROJECT_CREDENTIALS`를 비밀 값으로 설정합니다:

```yaml
# GitHub Actions 예제
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: 사전 채우기
    run: npx intlayer ci fill
```

## 오류 처리

- `INTLAYER_PROJECT_CREDENTIALS`가 설정되지 않은 경우, 명령어는 오류로 종료됩니다.
- `INTLAYER_PROJECT_CREDENTIALS`가 유효한 JSON이 아닌 경우, 명령어는 오류로 종료됩니다.
- 프로젝트 경로가 존재하지 않는 경우, 경고와 함께 건너뜁니다.
- 프로젝트가 실패한 경우, 명령어는 0이 아닌 상태 코드로 종료됩니다.

## 사용 사례

- **모노레포 자동화**: 모노레포의 여러 프로젝트에서 Intlayer 명령어 실행
- **CI/CD 파이프라인**: 지속적 통합 워크플로우에서 사전 관리 자동화
- **일괄 작업**: 여러 Intlayer 프로젝트에 대해 동일한 작업을 한 번에 수행
- **비밀 관리**: 환경 변수를 사용하여 여러 프로젝트의 자격 증명을 안전하게 관리

## 보안 모범 사례

- CI/CD 플랫폼에서 `INTLAYER_PROJECT_CREDENTIALS`를 암호화된 비밀 값으로 저장
- 자격 증명을 버전 관리에 커밋하지 않기
- 다양한 배포 환경에 대해 환경별 자격 증명 사용
- 정기적으로 자격 증명 로테이션
