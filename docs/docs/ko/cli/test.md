---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: 누락된 번역 테스트
description: 사전에서 누락된 번역을 테스트하고 식별하는 방법을 알아보세요.
keywords:
  - 테스트
  - 누락된 번역
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# 누락된 번역 테스트

```bash
npx intlayer content test
```

## 별칭:

- `npx intlayer test`

이 명령어는 모든 구성된 로케일에서 누락된 번역을 식별하기 위해 콘텐츠 선언 파일을 분석합니다. 어떤 번역 키가 어떤 로케일에서 누락되었는지에 대한 포괄적인 보고서를 제공하여 다국어 콘텐츠의 일관성을 유지하는 데 도움을 줍니다.

## 예시 출력:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## 인수:

**구성 옵션:**

- **`--env`**: 환경을 지정합니다 (예: `development`, `production`).
- **`--env-file [envFile]`**: 변수 로드를 위한 사용자 지정 환경 파일을 제공합니다.
- **`--base-dir`**: 프로젝트의 기본 디렉터리를 지정합니다.

  > 예시: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: 캐시를 비활성화합니다.

  > 예시: `npx intlayer build --no-cache`

**준비 옵션:**

- **`--build`**: 푸시 전에 사전을 빌드하여 콘텐츠가 최신 상태인지 확인합니다. true는 빌드를 강제하고, false는 빌드를 건너뛰며, undefined는 빌드 캐시를 사용하도록 허용합니다.

**로그 옵션:**

- **`--verbose`**: 디버깅을 위한 상세 로그를 활성화합니다. (CLI에서 기본값은 true)

  > 예시: `npx intlayer content test --verbose`

## 예시:

```bash
npx intlayer content test --verbose
```

출력 결과는 모든 구성된 로케일에서 애플리케이션이 제대로 작동하도록 완료해야 할 번역을 빠르게 식별하는 데 도움이 됩니다.
