---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: 사전 감시
description: 콘텐츠 선언 파일의 변경 사항을 감시하고 자동으로 사전을 빌드하는 방법을 알아보세요.
keywords:
  - 감시
  - 사전
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# 사전 감시

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

이 명령어는 콘텐츠 선언 파일의 변경 사항을 감시하고 `.intlayer` 디렉토리에 사전을 빌드합니다.
이 명령어는 `npx intlayer build --watch --skip-prepare`와 동일합니다.

## 별칭:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## 인수:

- **`--with`**: 감시와 병렬로 명령어를 시작합니다.

> 예시: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: 모노레포의 모든 Intlayer 프로젝트에서 명령어를 실행합니다(프로젝트 디렉터리 안에서 실행하면 해당 프로젝트만). 프로젝트별 자격 증명은 프로젝트 경로를 `{ "clientId", "clientSecret" }`에 매핑하는 JSON 객체인 `INTLAYER_PROJECT_CREDENTIALS`를 통해 주입할 수 있습니다.

> 예시: `npx intlayer watch --ci`
