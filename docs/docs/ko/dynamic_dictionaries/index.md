---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: 동적 사전
description: Intlayer의 동적 사전 기능(컬렉션 및 변형) 개요 — 유연하고 런타임 기반의 i18n 콘텐츠를 구축하기 위한 것입니다.
keywords:
  - 동적 사전
  - 컬렉션
  - 변형
  - Intlayer
  - 국제화
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "동적 사전 기능 출시"
  - version: 9.1.0
    date: 2026-06-26
    changes: "동적 레코드를 변형으로 통합 — 이제 `variant`는 문자열 또는 객체를 허용합니다"
author: aymericzip
---

# 동적 사전

Intlayer는 키당 단일 정적 사전을 넘어서는 콘텐츠를 표현하기 위한 두 가지 메커니즘을 지원합니다. 각각은 콘텐츠 파일의 **최상위 메타데이터 필드**를 통해 선언되며, 래퍼 함수가 필요하지 않습니다.

| 기능                                                                                                        | 메타데이터 필드                           | `useIntlayer`의 셀렉터                            |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| [컬렉션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/collections.md) | `item: N`                                 | `{ item: N }`                                     |
| [변형](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dynamic_dictionaries/variants.md)      | `variant: "name"` _또는_ `variant: { … }` | `{ variant: "name" }` _또는_ `{ variant: { … } }` |

둘 다 locale 인수와 결합되며 `importMode`를 통한 선택적 / 지연 로딩을 지원합니다.

## 무엇을 언제 사용할지

- **컬렉션** — 별도의 파일에서 관리되는 정렬된 항목 목록(FAQ 항목, 블로그 게시물, 제품).
- **변형** — 이름이 지정되었거나 구조화된 콘텐츠 대안:
  - A/B 테스트, 시즌 배너 또는 기능 플래그를 위한 **문자열** 변형;
  - CMS 레코드, 사용자별 콘텐츠, 또는 필드 집합으로 주소가 지정되는 모든 콘텐츠를 위한 **객체** 변형(이전의 "동적 레코드").

> 이전 버전은 레코드 키 기반 콘텐츠를 위해 별도의 `meta` 필드를 제공했습니다. 이는 `variant`로 통합되었습니다. `meta`를 사용하는 대신 `variant`에 **객체**를 전달하세요.

## 셀렉터 모호성 해소

키는 두 차원을 동시에 선언할 수 있습니다(예: 각 항목에 변형이 있는 컬렉션). 이는 다음 순서로 해결됩니다:

```
variant → item
```

따라서 variant × item 키에서 `{ variant: "promo" }`는 모든 promo 항목을 배열로 반환하고, `{ item: 2 }`를 추가하면 단일 항목으로 좁혀집니다.
