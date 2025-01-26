# 함수 가져오기

Intlayer는 콘텐츠 모듈에서 콘텐츠 함수를 선언할 수 있게 해주며, 이는 동기식 또는 비동기식일 수 있습니다. 애플리케이션이 빌드될 때 Intlayer는 이러한 함수를 실행하여 함수의 결과를 얻습니다. 반환 값은 JSON 객체 또는 문자열 또는 숫자와 같은 간단한 값이어야 합니다.

> 경고: 함수 가져오기는 현재 JSON 콘텐츠 선언 및 원격 콘텐츠 선언 파일에서 사용할 수 없습니다.

## 함수 선언

다음은 간단한 동기 함수로 콘텐츠를 가져오는 예제입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "이것은 함수에 의해 렌더링된 콘텐츠입니다",
  },
} satisfies DeclarationContent;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "이것은 함수에 의해 렌더링된 콘텐츠입니다",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').DeclarationContent} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "이것은 함수에 의해 렌더링된 콘텐츠입니다",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "이것은 함수에 의해 렌더링된 콘텐츠입니다"
  }
}
```

이 예제에서 `text` 키는 문자열을 반환하는 함수를 포함합니다. 이 콘텐츠는 `react-intlayer`와 같은 Intlayer의 인터프리터 패키지를 사용하여 React 컴포넌트에서 렌더링할 수 있습니다.

## 비동기 함수 가져오기

Intlayer는 동기 함수 외에도 비동기 함수를 지원하여 외부 소스에서 데이터를 가져오거나 모의 데이터를 사용하여 데이터 검색을 시뮬레이션할 수 있습니다.

다음은 서버 가져오기를 시뮬레이션하는 비동기 함수의 예입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // 서버에서 가져오는 것을 시뮬레이션하기 위해 200ms 기다리기
  return await setTimeout(200).then(() => "서버에서 가져온 콘텐츠입니다");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // 서버에서 가져오는 것을 시뮬레이션하기 위해 200ms 기다리기
  await setTimeout(200);
  return "서버에서 가져온 콘텐츠입니다";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').DeclarationContent} */
const fakeFetch = async () => {
  // 서버에서 가져오는 것을 시뮬레이션하기 위해 200ms 기다리기
  await setTimeout(200);
  return "서버에서 가져온 콘텐츠입니다";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
JSON 파일에서 콘텐츠를 가져올 수 있는 방법이 없습니다. 대신 .ts 또는 .js 파일을 사용하세요
```

이 경우 `fakeFetch` 함수는 서버 응답 시간을 시뮬레이션하기 위해 지연을 모방합니다. Intlayer는 비동기 함수를 실행하고 결과를 `text` 키의 콘텐츠로 사용합니다.

## React 컴포넌트에서 함수 기반 콘텐츠 사용하기

React 컴포넌트에서 함수 기반 콘텐츠를 사용하려면 `react-intlayer`에서 `useIntlayer`를 가져오고 콘텐츠 ID를 사용하여 호출해야 합니다. 다음은 예제입니다:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 출력: 이것은 함수에 의해 렌더링된 콘텐츠입니다 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 출력: 서버에서 가져온 콘텐츠입니다 */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 출력: 이것은 함수에 의해 렌더링된 콘텐츠입니다 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 출력: 서버에서 가져온 콘텐츠입니다 */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 출력: 이것은 함수에 의해 렌더링된 콘텐츠입니다 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 출력: 서버에서 가져온 콘텐츠입니다 */}
    </div>
  );
};

module.exports = MyComponent;
```
