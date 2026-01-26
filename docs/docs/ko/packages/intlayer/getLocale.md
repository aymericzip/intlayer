---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: getLocale 함수 문서 | intlayer
description: intlayer 패키지에서 getLocale 함수를 사용하는 방법을 확인하세요
keywords:
  - getLocale
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: 문서 초기화
---

# getLocale 함수 문서

`getLocale` 함수는 URL 또는 경로와 같은 주어진 문자열에서 로케일을 감지할 수 있게 해줍니다.

## 사용법

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// 출력: 'fr'
```

## 매개변수

| 매개변수 | 타입     | 설명                                    |
| -------- | -------- | --------------------------------------- |
| `path`   | `string` | 로케일을 추출할 경로 또는 문자열입니다. |

## 반환값

감지된 로케일 또는 로케일이 감지되지 않을 경우 기본 로케일을 반환합니다.
