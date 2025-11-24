---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 사전 빌드하기
description: 콘텐츠 선언 파일에서 Intlayer 사전을 빌드하는 방법을 알아보세요.
keywords:
  - 빌드
  - 사전
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# 사전 빌드하기

사전을 빌드하려면 다음 명령어를 실행할 수 있습니다:

```bash
npx intlayer build
```

또는 감시 모드로 실행하려면

```bash
npx intlayer build --watch
```

이 명령어는 기본적으로 `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` 경로에서 선언된 콘텐츠 파일을 찾아 `.intlayer` 디렉토리에 사전을 빌드합니다.

## 별칭:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## 인자:

- **`--base-dir`**: 프로젝트의 기본 디렉토리를 지정합니다. intlayer 설정을 가져오기 위해, 명령어는 기본 디렉토리에서 `intlayer.config.{ts,js,json,cjs,mjs}` 파일을 찾습니다.

  > 예시: `npx intlayer build --base-dir ./src`

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`). intlayer 설정 파일에서 환경 변수를 사용하는 경우에 유용합니다.

  > 예시: `npx intlayer build --env production`

- **`--env-file`**: 변수들을 로드할 사용자 정의 환경 파일을 제공합니다. intlayer 설정 파일에서 환경 변수를 사용하는 경우에 유용합니다.

  > 예시: `npx intlayer build --env-file .env.production.local`

- **`--with`**: 빌드와 병렬로 명령어를 시작합니다.

  > 예시: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: prepare 단계를 건너뜁니다.

  > 예시: `npx intlayer build --skip-prepare`

- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer build --no-cache`
