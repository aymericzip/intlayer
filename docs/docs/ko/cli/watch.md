---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# 사전 감시

```bash
npx intlayer watch
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
