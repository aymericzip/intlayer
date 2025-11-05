---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: CI/CD에서 빌드 오류
description: CI/CD 환경에서 발생하는 빌드 오류를 해결하는 방법을 알아보세요.
keywords:
  - 빌드
  - 오류
  - ci
  - cd
  - 파이프라인
  - intlayer
  - 사전
  - next.js
  - 사전빌드
  - 자동화
slugs:
  - frequent-questions
  - build-error-ci-cd
---

# CI/CD에서 빌드 오류

Next.js에서 다음과 같은 오류가 발생한다면:

```text
Error: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error
```

몇 가지 해결책은 다음과 같습니다:

## 1. 사전 누락

빌드 단계에서 사전이 빌드되었는지 확인하세요.

로컬에서는 빌드가 잘 되지만 CI/CD에서는 작동하지 않는 경우가 자주 있습니다. 그 이유는 로컬에서는 `.intlayer` 디렉토리가 존재하지만, CI/CD에서는 빌드에서 제외되기 때문입니다.

프로젝트의 `package.json`에 사전 빌드(prebuild) 스크립트를 추가하여 이를 해결할 수 있습니다.

```json5 fileName=package.json
{
  // ...
  "scripts": {
    "prebuild": "npx intlayer dictionaries build", // 빌드 전에 실행됩니다
    "build": "next build",
  },
}
```

> `withIntlayer` 함수나 프레임워크에 맞는 번들러 플러그인을 사용하는 경우, 사전 빌드 스크립트가 빌드 전에 자동으로 실행됩니다.

## 2. 빌드/실행 시 환경 변수 누락

컨테이너나 자동 배포 플랫폼에서는 `.env` 파일을 빌드에서 제외하는 것이 권장됩니다.

```text fileName=".gitignore or .dockerignore"
# 환경 변수
.env
**/.env
.env.*
**/.env.*
```

빌드 시 환경 변수가 사용 불가능하면 오류가 발생합니다.

```ts
import { Metadata } from "next";

export const generateMetadata = async ({ params }): Promise<Metadata> => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL), // 환경 변수에서 URL을 가져옵니다
});
```

이는 아마도 Intlayer와 관련이 없을 것입니다. 따라서 CI/CD 플랫폼에서 빌드 시 환경 변수를 확인하세요.
