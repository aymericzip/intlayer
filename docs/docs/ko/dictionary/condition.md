---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: 조건 콘텐츠
description: Intlayer에서 조건부 콘텐츠를 사용하여 특정 조건에 따라 동적으로 콘텐츠를 표시하는 방법을 알아보세요. 이 문서를 따라 조건을 효율적으로 구현하세요.
keywords:
  - 조건 콘텐츠
  - 동적 렌더링
  - 문서
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# 조건부 콘텐츠 / Intlayer에서의 조건

## 조건 작동 방식

Intlayer에서 조건부 콘텐츠는 특정 조건(일반적으로 boolean 값)을 해당 콘텐츠에 매핑하는 `cond` 함수를 통해 구현됩니다. 이 접근 방식은 주어진 조건에 따라 동적으로 콘텐츠를 선택할 수 있게 합니다. React Intlayer 또는 Next Intlayer와 통합하면 런타임에 제공된 조건에 따라 적절한 콘텐츠가 자동으로 선택됩니다.

## 조건부 콘텐츠 설정

Intlayer 프로젝트에서 조건부 콘텐츠를 설정하려면 조건 정의를 포함하는 콘텐츠 모듈을 생성하십시오. 아래는 다양한 형식의 예제입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "조건이 참일 때의 콘텐츠",
      false: "조건이 거짓일 때의 콘텐츠",
      fallback: "조건이 실패했을 때의 콘텐츠", // 선택 사항
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "조건이 참일 때의 콘텐츠",
      false: "조건이 거짓일 때의 콘텐츠",
      fallback: "조건이 실패했을 때의 콘텐츠", // 선택 사항
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "조건이 참일 때의 콘텐츠",
      false: "조건이 거짓일 때의 콘텐츠",
      fallback: "조건이 실패했을 때의 콘텐츠", // 선택 사항
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "조건이 참일 때의 콘텐츠",
        "false": "조건이 거짓일 때의 콘텐츠",
        "fallback": "조건이 실패했을 때의 콘텐츠", // 선택 사항
      },
    },
  },
}
```

> fallback이 선언되지 않은 경우, 조건이 유효하지 않을 때 마지막으로 선언된 키가 fallback으로 사용됩니다.

## React Intlayer와 조건부 콘텐츠 사용

React 컴포넌트 내에서 조건부 콘텐츠를 사용하려면 `react-intlayer` 패키지에서 `useIntlayer` 훅을 가져와 사용하십시오. 이 훅은 지정된 키에 대한 콘텐츠를 가져오며, 조건을 전달하여 적절한 출력을 선택할 수 있습니다.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: 조건이 참일 때의 콘텐츠 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 출력: 조건이 거짓일 때의 콘텐츠 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 출력: 조건이 실패했을 때의 콘텐츠 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 출력: 조건이 실패했을 때의 콘텐츠 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: 조건이 참일 때의 콘텐츠 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 출력: 조건이 거짓일 때의 콘텐츠 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 출력: 조건이 실패했을 때의 콘텐츠 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 출력: 조건이 실패했을 때의 콘텐츠 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: 조건이 참일 때의 콘텐츠 */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* 출력: 조건이 거짓일 때의 콘텐츠 */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* 출력: 조건이 실패했을 때의 콘텐츠 */
          myCondition("")
        }
      </p>
      <p>
        {
          /* 출력: 조건이 실패했을 때의 콘텐츠 */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## 추가 리소스

구성 및 사용에 대한 자세한 정보는 다음 리소스를 참조하십시오:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 리소스는 다양한 환경 및 프레임워크에서 Intlayer의 설정 및 사용에 대한 추가 정보를 제공합니다.
