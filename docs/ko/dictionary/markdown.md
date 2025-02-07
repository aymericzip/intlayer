# Markdown / 리치 텍스트 콘텐츠

## 마크다운 작동 원리

Intlayer는 마크다운 구문을 사용하여 정의된 리치 텍스트 콘텐츠를 지원합니다. 이는 마크다운 문자열을 Intlayer에서 관리할 수 있는 형식으로 변환하는 `md` 함수의 도움으로 이루어집니다. 마크다운을 사용하면 블로그, 기사 등 리치 포맷팅이 필요한 콘텐츠를 쉽게 작성하고 유지관리할 수 있습니다.

[인틀레이어 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)와 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md) 모두 마크다운 콘텐츠 관리를 지원합니다.

React 애플리케이션과 통합할 때, 마크다운 콘텐츠를 HTML로 렌더링하기 위해 [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)와 같은 마크다운 렌더링 제공자를 사용할 수 있습니다. 이를 통해 마크다운으로 콘텐츠를 작성하면서 애플리케이션에서 적절히 표시되도록 할 수 있습니다.

## 마크다운 콘텐츠 설정

Intlayer 프로젝트에서 마크다운 콘텐츠를 설정하려면 `md` 함수를 활용하는 콘텐츠 사전을 정의하세요.

### TypeScript 예시

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### JavaScript (ESM) 예시

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### CommonJS 예시

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### JSON 예시

JSON을 사용하는 경우, `nodeType`(예: `"markdown"`)을 설정하고 마크다운 문자열을 제공하여 마크다운 콘텐츠를 정의합니다. 예를 들어:

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## My title \n\nLorem Ipsum"
    }
  }
}
```

## React Intlayer와 마크다운 사용

React 애플리케이션에서 마크다운 콘텐츠를 렌더링하려면 `react-intlayer` 패키지의 `useIntlayer` 훅과 마크다운 렌더링 제공자를 활용할 수 있습니다. 이 예제에서는 마크다운을 HTML로 변환하기 위해 [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) 패키지를 사용합니다.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
```

이 구현에서:

- `MarkdownProvider`는 애플리케이션(또는 관련 부분)을 래핑하고 `renderMarkdown` 함수를 수락합니다. 이 함수는 `markdown-to-jsx` 패키지를 사용하여 마크다운 문자열을 JSX로 변환하는 데 사용됩니다.
- `useIntlayer` 훅은 사전에서 키 `"app"`으로 마크다운 콘텐츠(`myMarkdownContent`)를 검색하는 데 사용됩니다.
- 마크다운 콘텐츠는 구성 요소 내에서 직접 렌더링되며, 마크다운 렌더링은 제공자가 처리합니다.

## 추가 자료

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

이 자료들은 다양한 콘텐츠 유형 및 프레임워크와 함께 Intlayer를 설정하고 사용하는 방법에 대해 더 깊은 통찰력을 제공합니다.
