---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli 패키지 문서
description: Intlayer용 CLI 도구로, 사전 빌드 및 감사 명령을 제공합니다.
keywords:
  - intlayer-cli
  - cli
  - 도구
  - 국제화
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 통합 문서화
---

# intlayer-cli 패키지

`intlayer-cli` 패키지는 Intlayer 사전 및 구성을 관리하기 위한 일련의 명령을 제공합니다.

## 설치

```bash
npm install intlayer-cli
```

## 내보내기

### CLI 명령 (함수)

이 패키지는 CLI 명령을 구동하는 함수들을 내보냅니다.

| 함수       | 설명                                   |
| ---------- | -------------------------------------- |
| `build`    | Intlayer 사전들을 빌드합니다.          |
| `audit`    | 사전에서 누락된 번역을 검사합니다.     |
| `liveSync` | 사전을 실시간으로 동기화합니다.        |
| `pull`     | 원격 소스에서 사전을 가져옵니다.       |
| `push`     | 원격 소스로 사전을 푸시합니다.         |
| `test`     | 사전에 대한 테스트를 실행합니다.       |
| `extract`  | 사전을 서로 다른 포맷 간에 변환합니다. |
