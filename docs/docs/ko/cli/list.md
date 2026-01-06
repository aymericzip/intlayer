---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: 콘텐츠 선언 파일 목록
description: 프로젝트 내 모든 콘텐츠 선언 파일을 나열하는 방법을 알아보세요.
keywords:
  - 목록
  - 콘텐츠 선언
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: list 명령에 JSON 출력 옵션 추가
---

# 콘텐츠 선언 파일 목록

```bash
npx intlayer content list
```

## 별칭:

- `npx intlayer list`

이 명령어는 프로젝트 내 모든 콘텐츠 선언 파일을 표시하며, 해당 파일들의 딕셔너리 키와 파일 경로를 보여줍니다. 모든 콘텐츠 파일을 한눈에 파악하고 Intlayer가 제대로 인식하는지 확인하는 데 유용합니다.

## 인수:

- **`--json`**: 결과를 포맷된 텍스트 대신 JSON으로 출력합니다. 스크립팅 및 프로그래밍 방식 접근에 유용합니다.

  > 예시: `npx intlayer content list --json`

## 예시:

### 콘텐츠 선언 파일 목록:

```bash
npx intlayer content list
```

### JSON으로 출력:

```bash
npx intlayer content list --json
```

## 예시 출력:

### 포맷된 출력:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

총 콘텐츠 선언 파일 수: 3
```

### JSON 출력:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

이 명령어는 다음을 출력합니다:

- 키와 상대 파일 경로가 포함된 모든 콘텐츠 선언 파일의 형식화된 목록
- 발견된 콘텐츠 선언 파일의 총 개수

이 출력은 모든 콘텐츠 파일이 올바르게 구성되어 Intlayer 시스템에서 인식 가능한지 확인하는 데 도움이 됩니다.
