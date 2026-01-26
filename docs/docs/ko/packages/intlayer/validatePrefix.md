---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: validatePrefix 함수 문서 | intlayer
description: intlayer 패키지의 validatePrefix 함수 사용법을 확인하세요
keywords:
  - validatePrefix
  - translation
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# validatePrefix 함수 문서

`validatePrefix` 함수는 주어진 접두사가 설정에 따라 유효한 로케일 접두사인지 검사합니다.

## 사용법

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Output: true
```

## 매개변수

| 매개변수 | 타입     | 설명                 |
| -------- | -------- | -------------------- |
| `prefix` | `string` | 검증할 접두사입니다. |

## 반환값

`true`이면 접두사가 유효하고, 그렇지 않으면 `false`입니다.
