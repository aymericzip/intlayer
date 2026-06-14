---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: 동적 사전
description: 유연하고 런타임 구동 방식의 i18n 콘텐츠를 구축하기 위한 Intlayer의 세 가지 동적 사전 기능 — 컬렉션, 변형, 동적 레코드 — 개요.
keywords:
  - 동적 사전
  - 컬렉션
  - 변형
  - 동적 레코드
  - Intlayer
  - 국제화
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "동적 사전 기능 출시"
author: aymericzip
---

# 동적 사전

Intlayer는 키당 하나의 정적 사전을 정의하는 것을 넘어선 콘텐츠를 표현하기 위한 세 가지 메커니즘을 지원합니다. 각각은 콘텐츠 파일 내의 **최상위 메타데이터 필드**를 통해 선언되며, 래퍼 함수는 필요하지 않습니다.

| 기능                                                                                                                 | 메타데이터 필드   | `useIntlayer`에서의 선택기 |
| -------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------- |
| [컬렉션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/collections.md)          | `item: N`         | `{ item: N }`              |
| [변형](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md)               | `variant: "name"` | `{ variant: "name" }`      |
| [동적 레코드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`                |

세 메커니즘 모두 로케일 인수와 결합하며, `importMode`를 통한 선택적 / 지연 로딩을 지원합니다.

## 언제 무엇을 사용해야 하는가

- **컬렉션** — 별도의 파일로 관리되는 정렬된 항목 목록(FAQ 항목, 블로그 게시물, 상품 등).
- **변형** — A/B 테스트, 시즌별 배너 또는 기능 플래그(feature flags)를 위한 이름이 지정된 대체 콘텐츠.
- **동적 레코드** — 불투명한 ID를 사용하여 런타임에 검색되는 콘텐츠(CMS 레코드, 사용자별 텍스트 등).

## 선택기 우선순위 해결

하나의 사전에 여러 선택기가 있는 경우 해결 순서는 다음과 같습니다:

```
variant → meta → item
```
