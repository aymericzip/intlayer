# 마크다운 / 리치 텍스트 콘텐츠

## 마크다운 작동 방식

Intlayer는 마크다운 문법을 사용하여 정의된 리치 텍스트 콘텐츠를 지원합니다. 이는 `md` 함수를 통해 마크다운 문자열을 Intlayer에서 관리할 수 있는 형식으로 변환하여 이루어집니다. 마크다운을 사용하면 블로그, 기사 등 리치 포맷팅이 필요한 콘텐츠를 쉽게 작성하고 유지 관리할 수 있습니다.

[Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)와 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)는 모두 마크다운 콘텐츠 관리를 지원합니다.

React 애플리케이션과 통합할 때, [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)와 같은 마크다운 렌더링 제공자를 사용하여 마크다운 콘텐츠를 HTML로 렌더링할 수 있습니다. 이를 통해 마크다운으로 콘텐츠를 작성하면서 애플리케이션에서 올바르게 표시되도록 할 수 있습니다.

## 마크다운 콘텐츠 설정

Intlayer 프로젝트에서 마크다운 콘텐츠를 설정하려면 `md` 함수를 사용하는 콘텐츠 딕셔너리를 정의하십시오.

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

## React Intlayer와 함께 마크다운 사용

React 애플리케이션에서 마크다운 콘텐츠를 렌더링하려면 `react-intlayer` 패키지의 `useIntlayer` 훅과 마크다운 렌더링 제공자를 활용할 수 있습니다. 이 예제에서는 [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) 패키지를 사용하여 마크다운을 HTML로 변환합니다.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

이 구현에서:

- `MarkdownProvider`는 애플리케이션(또는 관련 부분)을 감싸며 `renderMarkdown` 함수를 허용합니다. 이 함수는 `markdown-to-jsx` 패키지를 사용하여 마크다운 문자열을 JSX로 변환하는 데 사용됩니다.
- `useIntlayer` 훅은 `"app"` 키를 가진 딕셔너리에서 마크다운 콘텐츠(`myMarkdownContent`)를 가져오는 데 사용됩니다.
- 마크다운 콘텐츠는 컴포넌트에서 직접 렌더링되며, 마크다운 렌더링은 제공자가 처리합니다.

## 추가 리소스

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)
- [markdown-to-jsx on npm](https://www.npmjs.com/package/markdown-to-jsx)

이 리소스들은 다양한 콘텐츠 유형 및 프레임워크와 함께 Intlayer를 설정하고 사용하는 방법에 대한 추가적인 통찰을 제공합니다.
