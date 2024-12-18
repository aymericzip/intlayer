# Documentation: `getEnumerationContent` Function in `intlayer`

## Description:

`getEnumerationContent` 함수는 열거형 객체에서 미리 정의된 조건에 따라 특정 수량에 해당하는 콘텐츠를 검색합니다. 조건은 키로 정의되며, 그 우선순위는 객체 내 순서에 의해 결정됩니다.

## Parameters:

- `enumerationContent: QuantityContent<Content>`

  - **Description**: 키가 조건을 나타내고 (예: `<=`, `<`, `>=`, `=`) 값이 해당 콘텐츠를 나타내는 객체입니다. 키의 순서가 일치 우선순위를 정의합니다.
  - **Type**: `QuantityContent<Content>`
    - `Content`는 어떤 유형이든 될 수 있습니다.

- `quantity: number`

  - **Description**: `enumerationContent`의 조건과 일치시키기 위해 사용되는 숫자 값입니다.
  - **Type**: `number`

## Returns:

- **Type**: `Content`
- **Description**: `enumerationContent`에서 첫 번째로 일치하는 조건에 해당하는 콘텐츠입니다. 일치하는 항목이 없을 경우, 구현에 따라 기본 처리(예: 오류 또는 대체 콘텐츠)로 대체됩니다.

## Example Usage:

### Basic Usage:

```typescript
import { getEnumerationContent } from "@intlayer/config/client";

const content = getEnumerationContent(
  {
    "<=-2.3": "당신은 -2.3보다 적습니다",
    "<1": "당신은 하나보다 작습니다",
    "2": "당신은 두 개를 가지고 있습니다",
    ">=3": "당신은 세 개 이상 가지고 있습니다",
  },
  2
);

console.log(content); // Output: "당신은 두 개를 가지고 있습니다"
```

### Priority of Conditions:

```typescript
const content = getEnumerationContent(
  {
    "<4": "당신은 네 개보다 적습니다",
    "2": "당신은 두 개를 가지고 있습니다",
  },
  2
);

console.log(content); // Output: "당신은 네 개보다 적습니다"
```

## Edge Cases:

- **No Matching Condition:**

  - 제공된 수량과 일치하는 조건이 없으면, 함수는 `undefined`를 반환하거나 기본/대체 시나리오를 명시적으로 처리합니다.

- **Ambiguous Conditions:**

  - 조건이 겹치는 경우, 첫 번째로 일치하는 조건(객체 순서에 따라)이 우선합니다.

- **Invalid Keys:**

  - 함수는 `enumerationContent`의 모든 키가 유효하고 조건으로 해석할 수 있다고 가정합니다. 유효하지 않거나 잘못 형식화된 키는 예기치 않은 동작을 초래할 수 있습니다.

- **TypeScript Enforcement:**
  - 함수는 모든 키에서 `Content` 유형이 일관되도록 하여 검색된 콘텐츠의 유형 안전성을 보장합니다.

## Notes:

- 주어진 수량에 따라 적절한 조건을 결정하기 위해 `findMatchingCondition` 유틸리티가 사용됩니다.
