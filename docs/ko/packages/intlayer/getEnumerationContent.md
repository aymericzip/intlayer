# Documentation: `getEnumeration` Function in `intlayer`

## 설명:

`getEnumeration` 함수는 열거 객체의 미리 정의된 조건에 따라 특정 수량에 해당하는 콘텐츠를 검색합니다. 조건은 키로 정의되며, 그 우선 순위는 객체 내에서의 순서에 의해 결정됩니다.

## 매개변수:

- `enumerationContent: QuantityContent<Content>`

  - **설명**: 키가 조건을 나타내는 객체(예: `<=`, `<`, `>=`, `=`)와 값이 해당 콘텐츠를 나타냅니다. 키의 순서가 일치 우선 순위를 정의합니다.
  - **유형**: `QuantityContent<Content>`
    - `Content`는 모든 유형일 수 있습니다.

- `quantity: number`

  - **설명**: `enumerationContent`의 조건에 대해 일치시키기 위해 사용되는 숫자 값입니다.
  - **유형**: `number`

## 반환값:

- **유형**: `Content`
- **설명**: `enumerationContent`에서 첫 번째로 일치하는 조건에 해당하는 콘텐츠입니다. 일치하는 항목이 없으면 구현에 따라 기본 처리(예: 오류 또는 백업 콘텐츠)가 수행됩니다.

## 예제 사용법:

### 기본 사용법:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "당신은 -2.3보다 적습니다.",
    "<1": "당신은 하나보다 적습니다.",
    "2": "당신은 두 개를 가지고 있습니다.",
    ">=3": "당신은 세 개 이상을 가지고 있습니다.",
  },
  2
);

console.log(content); // 출력: "당신은 두 개를 가지고 있습니다."
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "당신은 하나보다 적습니다.",
    "2": "당신은 두 개를 가지고 있습니다.",
    ">=3": "당신은 세 개 이상을 가지고 있습니다.",
  },
  2
);

console.log(content); // 출력: "당신은 두 개를 가지고 있습니다."
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "당신은 하나보다 적습니다.",
    "2": "당신은 두 개를 가지고 있습니다.",
    ">=3": "당신은 세 개 이상을 가지고 있습니다.",
  },
  2
);

console.log(content); // 출력: "당신은 두 개를 가지고 있습니다."
```

### 조건의 우선 순위:

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "당신은 네 개보다 적습니다.",
    "2": "당신은 두 개를 가지고 있습니다.",
  },
  2
);

console.log(content); // 출력: "당신은 네 개보다 적습니다."
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "당신은 네 개보다 적습니다.",
    "2": "당신은 두 개를 가지고 있습니다.",
  },
  2
);

console.log(content); // 출력: "당신은 네 개보다 적습니다."
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "당신은 네 개보다 적습니다.",
    "2": "당신은 두 개를 가지고 있습니다.",
  },
  2
);

console.log(content); // 출력: "당신은 네 개보다 적습니다."
```

## 엣지 케이스:

- **일치하는 조건이 없음:**

  - 제공된 수량과 일치하는 조건이 없으면, 함수는 `undefined`를 반환하거나 기본/백업 시나리오를 명시적으로 처리합니다.

- **모호한 조건들:**

  - 조건이 겹치는 경우, 첫 번째 일치하는 조건(객체 순서 기준)이 우선합니다.

- **유효하지 않은 키:**

  - 함수는 `enumerationContent`의 모든 키가 유효하고 조건으로 구문 분석 가능하다고 가정합니다. 유효하지 않거나 잘못 형식화된 키는 예기치 않은 동작을 초래할 수 있습니다.

- **TypeScript 강제성:**
  - 함수는 `Content` 유형이 모든 키에서 일관되도록 보장하여 검색된 콘텐츠에서 유형 안전성을 제공합니다.

## 주의 사항:

- `findMatchingCondition` 유틸리티는 주어진 수량을 기반으로 적절한 조건을 결정하는 데 사용됩니다.
