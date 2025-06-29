---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getEnumeration 함수 문서 | intlayer
description: intlayer 패키지의 getEnumeration 함수 사용 방법을 확인하세요
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
---

# 문서: `getEnumeration` 함수 in `intlayer`

## 설명

`getEnumeration` 함수는 열거 객체에서 사전 정의된 조건에 따라 특정 수량에 해당하는 콘텐츠를 검색합니다. 조건은 키로 정의되며, 객체 내 순서에 따라 우선순위가 결정됩니다.

## 매개변수

- `enumerationContent: QuantityContent<Content>`

  - **설명**: 키가 조건(예: `<=`, `<`, `>=`, `=`)을 나타내고 값이 해당 콘텐츠를 나타내는 객체입니다. 키의 순서는 매칭 우선순위를 정의합니다.
  - **유형**: `QuantityContent<Content>`
    - `Content`는 모든 유형이 가능합니다.

- `quantity: number`

  - **설명**: `enumerationContent`의 조건과 매칭하기 위해 사용되는 숫자 값입니다.
  - **유형**: `number`

## 반환값

- **유형**: `Content`
- **설명**: `enumerationContent`에서 첫 번째로 매칭되는 조건에 해당하는 콘텐츠입니다. 매칭이 없을 경우, 구현에 따라 기본 처리(예: 오류 또는 대체 콘텐츠)가 이루어집니다.

## 사용 예시

### 기본 사용법

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "You have less than -2.3", // -2.3보다 작거나 같은 경우
    "<1": "You have less than one", // 1보다 작은 경우
    "2": "You have two", // 2인 경우
    ">=3": "You have three or more", // 3 이상인 경우
  },
  2
);

console.log(content); // 출력: "You have two"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "You have less than one", // 1보다 작은 경우
    "2": "You have two", // 2인 경우
    ">=3": "You have three or more", // 3 이상인 경우
  },
  2
);

console.log(content); // 출력: "You have two"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "You have less than one", // 1보다 작은 경우
    "2": "You have two", // 2인 경우
    ">=3": "You have three or more", // 3 이상인 경우
  },
  2
);

console.log(content); // 출력: "You have two"
```

### 조건의 우선순위

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four", // 4보다 작은 경우
    "2": "You have two", // 2인 경우
  },
  2
);

console.log(content); // 출력: "You have less than four"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "You have less than four", // 4보다 작은 경우
    "2": "You have two", // 2인 경우
  },
  2
);

console.log(content); // 출력: "You have less than four"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "You have less than four", // 4보다 작은 경우
    "2": "You have two", // 2인 경우
  },
  2
);

console.log(content); // 출력: "You have less than four"
```

## 경계 사례

- **매칭 조건 없음:**

  - 제공된 수량과 매칭되는 조건이 없을 경우, 함수는 `undefined`를 반환하거나 명시적으로 기본/대체 시나리오를 처리합니다.

- **모호한 조건:**

  - 조건이 겹치는 경우, 객체 순서에 따라 첫 번째 매칭 조건이 우선합니다.

- **잘못된 키:**

  - 함수는 `enumerationContent`의 모든 키가 유효하고 조건으로 구문 분석 가능하다고 가정합니다. 잘못되거나 형식이 올바르지 않은 키는 예기치 않은 동작을 초래할 수 있습니다.

- **TypeScript 강제:**
  - 함수는 모든 키에서 `Content` 유형이 일관되도록 보장하여 검색된 콘텐츠의 타입 안전성을 제공합니다.

## 참고

- `findMatchingCondition` 유틸리티는 주어진 수량에 따라 적절한 조건을 결정하는 데 사용됩니다.
