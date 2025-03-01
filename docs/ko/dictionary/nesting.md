# 중첩 / 하위 콘텐츠 참조

## 중첩 작동 방식

Intlayer에서 중첩은 `nest` 함수를 통해 이루어지며, 이를 통해 다른 사전의 콘텐츠를 참조하고 재사용할 수 있습니다. 콘텐츠를 중복 작성하는 대신, 기존 콘텐츠 모듈의 키를 통해 해당 콘텐츠를 가리킬 수 있습니다.

## 중첩 설정

Intlayer 프로젝트에서 중첩을 설정하려면 먼저 재사용하려는 기본 콘텐츠를 정의합니다. 그런 다음, 별도의 콘텐츠 모듈에서 `nest` 함수를 사용하여 해당 콘텐츠를 가져옵니다.

### 기본 사전

다음은 다른 사전에 중첩할 기본 사전의 예제입니다:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

export default firstDictionary;
```

```javascript fileName="firstDictionary.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
};

module.exports = firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Nest를 사용한 참조

이제 위의 콘텐츠를 참조하는 `nest` 함수를 사용하는 또 다른 콘텐츠 모듈을 생성합니다. 전체 콘텐츠 또는 특정 중첩 값을 참조할 수 있습니다:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat="typescript"
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // 전체 사전을 참조합니다:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // 특정 중첩 값을 참조합니다:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.mjs" contentDeclarationFormat="esm"
import { nest } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

export default myNestingContent;
```

```javascript fileName="secondDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { nest } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    fullNestedContent: nest("key_of_my_first_dictionary"),
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
};

module.exports = myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

두 번째 매개변수로 해당 콘텐츠 내의 중첩 값에 대한 경로를 지정할 수 있습니다. 경로를 제공하지 않으면 참조된 사전의 전체 콘텐츠가 반환됩니다.

## React Intlayer와 함께 중첩 사용

React 컴포넌트에서 중첩된 콘텐츠를 사용하려면 `react-intlayer` 패키지의 `useIntlayer` 훅을 활용하세요. 이 훅은 지정된 키를 기반으로 올바른 콘텐츠를 가져옵니다. 사용 예제는 다음과 같습니다:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* 출력: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* 출력: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* 출력: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* 출력: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

```javascript fileName="**/*.cjx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const NestComponent = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Full Nested Content: {JSON.stringify(fullNestedContent)}
        {/* 출력: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Partial Nested Value: {partialNestedContent}
        {/* 출력: 0 */}
      </p>
    </div>
  );
};

module.exports = NestComponent;
```

## 추가 자료

구성 및 사용에 대한 자세한 정보는 다음 리소스를 참조하세요:

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)

이 리소스들은 다양한 환경 및 프레임워크에서 Intlayer를 설정하고 사용하는 방법에 대한 추가적인 통찰을 제공합니다.
