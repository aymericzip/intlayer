## 마크다운 작동 방식

Intlayer는 마크다운 문법을 사용하여 정의된 리치 텍스트 콘텐츠를 지원합니다. 이는 `md` 함수를 통해 마크다운 문자열을 Intlayer에서 관리할 수 있는 형식으로 변환하여 이루어집니다. 마크다운을 사용하면 블로그, 기사 등과 같은 리치 포맷팅 콘텐츠를 쉽게 작성하고 유지할 수 있습니다.

[Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_visual_editor.md)와 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_CMS.md)는 모두 마크다운 콘텐츠 관리를 지원합니다.

React 애플리케이션과 통합할 때, 마크다운 렌더링 제공자(예: [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx))를 사용하여 마크다운 콘텐츠를 HTML로 렌더링할 수 있습니다. 이를 통해 마크다운으로 콘텐츠를 작성하면서 애플리케이션에서 올바르게 표시되도록 할 수 있습니다.

## 마크다운 콘텐츠 설정

Intlayer 프로젝트에서 마크다운 콘텐츠를 설정하려면 `md` 함수를 사용하는 콘텐츠 사전을 정의하십시오.

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

## 다국어 `.md` 파일 가져오기

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// 이 선언은 TypeScript가 마크다운(.md) 파일을 모듈로 인식하고 가져올 수 있도록 합니다.
// 이를 사용하지 않으면 TypeScript는 마크다운 파일을 가져오려고 할 때 오류를 발생시킵니다.
// TypeScript는 기본적으로 코드가 아닌 파일 가져오기를 지원하지 않습니다.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_ko from "./myMarkdown.ko.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ko: md(markdown_ko),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import markdown_ko from "./myMarkdown.ko.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ko: md(markdown_ko),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");
const markdown_ko = require("./myMarkdown.ko.md");
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      ko: md(markdown_ko),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// 외부 마크다운 파일(.md)을 가져오는 것은 JS 또는 TS 선언 파일을 사용하는 경우에만 가능합니다.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "ko": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "en": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": "# Mon Markdown\n\nC'est un contenu Markdown.",
        },
        "es": {
          "nodeType": "markdown",
          "markdown": "# Mi Markdown\n\nEsto es un contenido Markdown.",
        },
      },
    },
  },
}
```

## React Intlayer와 함께 마크다운 사용

React 애플리케이션에서 마크다운 콘텐츠를 렌더링하려면 `react-intlayer` 패키지의 `useIntlayer` 훅과 마크다운 렌더링 제공자를 활용할 수 있습니다. 이 예제에서는 [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) 패키지를 사용하여 마크다운을 HTML로 변환합니다.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
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
- `useIntlayer` 훅은 `"app"` 키를 가진 사전에서 마크다운 콘텐츠(`myMarkdownContent`)를 가져오는 데 사용됩니다.
- 마크다운 콘텐츠는 컴포넌트에서 직접 렌더링되며, 마크다운 렌더링은 제공자가 처리합니다.

## 추가 리소스

- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_cli.md)
- [React Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)
- [Next Intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)
- [npm의 markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)

이 리소스들은 다양한 콘텐츠 유형 및 프레임워크와 함께 Intlayer를 설정하고 사용하는 방법에 대한 추가적인 통찰력을 제공합니다.
