---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 삽입
description: 콘텐츠에서 삽입 플레이스홀더를 선언하고 사용하는 방법을 배웁니다. 이 문서는 미리 정의된 콘텐츠 구조 내에 값을 동적으로 삽입하는 단계를 안내합니다.
keywords:
  - 삽입
  - 동적 콘텐츠
  - 플레이스홀더
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - insertion
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 이력 초기화
---

# 삽입 콘텐츠 / Intlayer에서의 삽입

## 삽입 작동 방식

Intlayer에서는 `insertion` 함수를 통해 삽입 콘텐츠를 구현합니다. 이 함수는 문자열 내의 플레이스홀더 필드(예: `{{name}}` 또는 `{{age}}`)를 식별하여 런타임에 동적으로 교체할 수 있게 합니다. 이 방법을 사용하면 애플리케이션에서 전달된 데이터에 따라 콘텐츠의 특정 부분이 결정되는 유연한 템플릿 형태의 문자열을 만들 수 있습니다.

React Intlayer 또는 Next Intlayer와 통합할 경우, 각 플레이스홀더에 대한 값을 포함하는 데이터 객체를 제공하기만 하면 Intlayer가 자동으로 플레이스홀더가 교체된 콘텐츠를 렌더링합니다.

## 삽입 콘텐츠 설정하기

Intlayer 프로젝트에서 삽입 콘텐츠를 설정하려면, 삽입 정의를 포함하는 콘텐츠 모듈을 생성하세요. 아래는 다양한 형식의 예시입니다.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "안녕하세요, 제 이름은 {{name}}이고 저는 {{age}}살입니다!"
    ),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "안녕하세요, 제 이름은 {{name}}이고 저는 {{age}}살입니다!"
    ),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert(
      "안녕하세요, 제 이름은 {{name}}이고 저는 {{age}}살입니다!"
    ),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "안녕하세요, 제 이름은 {{name}}이고 저는 {{age}}살입니다!",
    },
  },
}
```

## React Intlayer에서 삽입 콘텐츠 사용하기

React 컴포넌트 내에서 삽입 콘텐츠를 사용하려면, `react-intlayer` 패키지에서 `useIntlayer` 훅을 가져와 사용하세요. 이 훅은 지정한 키에 대한 콘텐츠를 가져오며, 콘텐츠 내 각 플레이스홀더를 표시할 값에 매핑하는 객체를 전달할 수 있습니다.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: "Hello, my name is John and I am 30 years old!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 다른 값으로 동일한 삽입을 재사용할 수 있습니다 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: "안녕하세요, 제 이름은 John이고 나이는 30살입니다!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 동일한 삽입을 다른 값으로 재사용할 수 있습니다 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* 출력: "안녕하세요, 제 이름은 John이고 나이는 30살입니다!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* 다른 값으로 동일한 삽입문을 재사용할 수 있습니다 */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## 추가 자료

설정 및 사용법에 대한 자세한 정보는 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)

## 추가 자료

구성 및 사용법에 대한 자세한 정보는 다음 자료를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)

이 자료들은 다양한 환경과 프레임워크에서 Intlayer의 설정 및 사용에 대한 추가적인 통찰을 제공합니다.
