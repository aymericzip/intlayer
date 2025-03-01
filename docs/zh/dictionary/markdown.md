# Markdown / 富文本内容

## Markdown 的工作原理

Intlayer 支持使用 Markdown 语法定义的富文本内容。这是通过 `md` 函数实现的，该函数将 Markdown 字符串转换为可以由 Intlayer 管理的格式。通过使用 Markdown，您可以轻松编写和维护具有丰富格式的内容，例如博客、文章等。

[Intlayer 可视化编辑器](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_visual_editor.md) 和 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_CMS.md) 都支持 Markdown 内容管理。

当与 React 应用程序集成时，您可以使用 Markdown 渲染提供程序（例如 [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)）将 Markdown 内容渲染为 HTML。这使您可以用 Markdown 编写内容，同时确保其在应用程序中正确显示。

## 设置 Markdown 内容

要在 Intlayer 项目中设置 Markdown 内容，请定义一个使用 `md` 函数的内容字典。

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

## 在 React Intlayer 中使用 Markdown

要在 React 应用程序中渲染 Markdown 内容，您可以结合使用 `react-intlayer` 包中的 `useIntlayer` 钩子和 Markdown 渲染提供程序。在此示例中，我们使用 [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) 包将 Markdown 转换为 HTML。

```tsx fileName="App.tsx" codeFormat="typescript"
// 使用 React 和 Intlayer 的示例代码
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
// 使用 React 和 Intlayer 的示例代码
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
// 使用 React 和 Intlayer 的示例代码
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

在此实现中：

- `MarkdownProvider` 包裹应用程序（或其相关部分），并接受一个 `renderMarkdown` 函数。此函数用于使用 `markdown-to-jsx` 包将 Markdown 字符串转换为 JSX。
- `useIntlayer` 钩子用于从键为 `"app"` 的字典中检索 Markdown 内容（`myMarkdownContent`）。
- Markdown 内容直接在组件中渲染，Markdown 渲染由提供程序处理。

## 其他资源

- [Intlayer CLI 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_cli.md)
- [React Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_create_react_app.md)
- [Next Intlayer 文档](https://github.com/aymericzip/intlayer/blob/main/docs/zh/intlayer_with_nextjs_15.md)
- [markdown-to-jsx 在 npm 上的页面](https://www.npmjs.com/package/markdown-to-jsx)

这些资源提供了有关设置和使用 Intlayer 与各种内容类型和框架的更多见解。
