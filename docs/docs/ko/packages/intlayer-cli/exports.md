---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer-cli 패키지 문서
description: Intlayer용 CLI 도구로, 딕셔너리 빌드 및 감사 명령을 제공합니다.
keywords:
  - cli
  - tools
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer-cli
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 모든 exports에 대한 문서 통합
---

# intlayer-cli 패키지

`intlayer-cli` 패키지는 Intlayer 딕셔너리 및 구성을 관리하기 위한 일련의 명령을 제공합니다.

## 설치

```bash
npm install intlayer-cli
```

## 내보내기

### CLI 명령 (함수)

이 패키지는 CLI 명령을 구동하는 함수를 내보내며, 이를 통해 프로그래밍 방식으로 Intlayer 작업을 트리거할 수 있습니다.

가져오기:

```tsx
import "intlayer-cli";
```

| 함수           | 설명                                                |
| -------------- | --------------------------------------------------- |
| `build`        | Intlayer 사전을 빌드합니다.                         |
| `audit`        | 사전에서 누락된 번역을 검사합니다.                  |
| `liveSync`     | 사전을 실시간으로 동기화합니다.                     |
| `pull`         | 원격 소스에서 사전을 가져옵니다.                    |
| `push`         | 사전을 원격 소스로 푸시합니다.                      |
| `test`         | 사전에 대한 테스트를 실행합니다.                    |
| `transform`    | 사전을 포맷 간에 변환합니다.                        |
| `fill`         | AI를 사용하여 누락된 번역을 채워 사전을 완성합니다. |
| `reviewDoc`    | 국제화 문서를 검토합니다.                           |
| `translateDoc` | AI를 사용하여 문서를 번역합니다.                    |
