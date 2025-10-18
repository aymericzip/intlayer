---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration 함수 문서 | intlayer
description: intlayer 패키지의 getEnumeration 함수 사용법을 확인하세요
keywords:
  - getEnumeration
  - 번역
  - Intlayer
  - intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# 문서: `intlayer`의 `getEnumeration` 함수

## 설명

`getEnumeration` 함수는 열거형 객체에 미리 정의된 조건에 따라 특정 수량에 해당하는 콘텐츠를 가져옵니다. 조건은 키로 정의되며, 우선순위는 객체 내 키의 순서에 의해 결정됩니다.

## 매개변수

- `enumerationContent: QuantityContent<Content>`

  - **설명**: 키가 조건(예: `<=`, `<`, `>=`, `=`)을 나타내고 값이 해당 콘텐츠를 나타내는 객체입니다. 키의 순서가 매칭 우선순위를 정의합니다.
  - **타입**: `QuantityContent<Content>`
    - `Content`는 임의의 타입일 수 있습니다.

- `quantity: number`

  - **설명**: `enumerationContent`의 조건과 매칭하기 위해 사용되는 숫자 값입니다.
  - **타입**: `number`

## 반환값

- **타입**: `Content`
- **설명**: `enumerationContent`에서 첫 번째로 매칭되는 조건에 해당하는 콘텐츠입니다. 매칭되는 조건이 없으면 구현에 따라 기본 처리됩니다(예: 오류 또는 대체 콘텐츠).

## 사용 예시

### 기본 사용법

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "-2.3보다 작습니다",
    "<1": "1보다 작습니다",
    "2": "2입니다",
    ">=3": "3 이상입니다",
  },
  2
);

console.log(content); // 출력: "2입니다"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "1보다 작습니다",
    "2": "2입니다",
    ">=3": "3 이상입니다",
  },
  2
);

console.log(content); // 출력: "2입니다"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "1보다 작습니다",
    "2": "2입니다",
    ">=3": "3 이상입니다",
  },
  2
);

console.log(content); // 출력: "2입니다"
```

### 조건의 우선순위

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "4보다 작습니다",
    "2": "2입니다",
  },
  2
);

console.log(content); // 출력: "4보다 작습니다"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "4보다 작습니다",
    "2": "2입니다",
  },
  2
);

console.log(content); // 출력: "4보다 작습니다"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "4보다 작습니다",
    "2": "2입니다",
  },
  2
);

console.log(content); // 출력: "4보다 작습니다"
```

## 예외 상황

- **일치하는 조건 없음:**

  - 제공된 수량과 일치하는 조건이 없으면, 함수는 `undefined`를 반환하거나 기본/대체 시나리오를 명시적으로 처리합니다.

- **모호한 조건:**

  - 조건이 겹치는 경우, 첫 번째 일치하는 조건(객체 순서 기준)이 우선합니다.

- **잘못된 키:**

  - 함수는 `enumerationContent`의 모든 키가 유효하며 조건으로 파싱 가능하다고 가정합니다. 잘못되었거나 형식이 올바르지 않은 키는 예상치 못한 동작을 초래할 수 있습니다.

- **TypeScript 적용:**
  - 함수는 모든 키에 대해 `Content` 타입이 일관되도록 보장하여, 검색된 콘텐츠의 타입 안전성을 제공합니다.

## 참고 사항

- `findMatchingCondition` 유틸리티는 주어진 수량에 따라 적절한 조건을 결정하는 데 사용됩니다.
