---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 함수 패칭
description: 다국어 웹사이트에서 함수 패칭을 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 몇 분 만에 프로젝트를 설정할 수 있습니다.
keywords:
  - 함수 패칭
  - 국제화
  - 문서
  - Intlayer
  - Next.js
  - 자바스크립트
  - 리액트
slugs:
  - doc
  - concept
  - content
  - function-fetching
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# 함수 패칭

Intlayer는 콘텐츠 모듈에서 동기 또는 비동기 함수 콘텐츠를 선언할 수 있도록 지원합니다. 애플리케이션이 빌드될 때 Intlayer는 이러한 함수들을 실행하여 함수의 결과를 얻습니다. 반환 값은 JSON 객체이거나 문자열 또는 숫자와 같은 단순 값이어야 합니다.

> 경고: 함수 패칭은 현재 JSON 콘텐츠 선언 및 원격 콘텐츠 선언 파일에서는 사용할 수 없습니다.

## 함수 선언

다음은 간단한 동기 함수 콘텐츠 패칭 예제입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "함수에 의해 렌더링된 콘텐츠입니다",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "함수에 의해 렌더링된 콘텐츠입니다",
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

## 비동기 함수 호출

동기 함수 외에도, Intlayer는 비동기 함수를 지원하여 외부 소스에서 데이터를 가져오거나 모의 데이터를 사용하여 데이터 검색을 시뮬레이션할 수 있습니다.

아래는 서버에서 데이터를 가져오는 것을 시뮬레이션하는 비동기 함수의 예입니다:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // 서버에서 가져오는 것을 시뮬레이션하기 위해 200ms 대기
  return await setTimeout(200).then(() => "서버에서 가져온 콘텐츠입니다");
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // 서버에서 가져오는 것을 시뮬레이션하기 위해 200ms 대기
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

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // 서버에서 가져오는 것을 시뮬레이션하기 위해 200ms 대기
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
JSON 파일에서 콘텐츠를 가져올 수 없습니다. 대신 .ts 또는 .js 파일을 사용하세요.
```

이 경우, `fakeFetch` 함수는 서버 응답 시간을 시뮬레이션하기 위해 지연을 모방합니다. Intlayer는 비동기 함수를 실행하고 그 결과를 `text` 키의 콘텐츠로 사용합니다.

## React 컴포넌트에서 함수 기반 콘텐츠 사용하기

React 컴포넌트에서 함수 기반 콘텐츠를 사용하려면, `react-intlayer`에서 `useIntlayer`를 가져와서 콘텐츠 ID로 호출하여 콘텐츠를 가져와야 합니다. 다음은 예시입니다:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* 출력: 함수에 의해 렌더링된 콘텐츠입니다 */}
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
      {/* 출력: 함수에 의해 렌더링된 콘텐츠입니다 */}
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
      {/* 출력: 함수에 의해 렌더링된 콘텐츠입니다 */}
      <p>{asyncFunctionContent.text}</p>
      {/* 출력: 서버에서 가져온 콘텐츠입니다 */}
    </div>
  );
};

module.exports = MyComponent;
```
