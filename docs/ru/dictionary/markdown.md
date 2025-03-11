# Markdown / Rich Text Content

## Как работает Markdown

Intlayer поддерживает контент с богатым форматированием, определяемый с использованием синтаксиса Markdown. Это достигается с помощью функции `md`, которая преобразует строку Markdown в формат, который может управляться Intlayer. Используя Markdown, вы можете легко писать и поддерживать контент с богатым форматированием, такой как блоги, статьи и многое другое.

[Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) и [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md) оба поддерживают управление контентом Markdown.

При интеграции с React-приложением вы можете использовать провайдер рендеринга Markdown (например, [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) для преобразования контента Markdown в HTML. Это позволяет писать контент в Markdown, обеспечивая его корректное отображение в вашем приложении.

## Настройка контента Markdown

Чтобы настроить контент Markdown в вашем проекте Intlayer, определите словарь контента, который использует функцию `md`.

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

## Использование Markdown с React Intlayer

Чтобы отобразить контент Markdown в React-приложении, вы можете использовать хук `useIntlayer` из пакета `react-intlayer` вместе с провайдером рендеринга Markdown. В этом примере используется пакет [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) для преобразования Markdown в HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
// Компонент для отображения контента
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
// Компонент для отображения контента
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
// Компонент для отображения контента
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

В этой реализации:

- `MarkdownProvider` оборачивает приложение (или соответствующую его часть) и принимает функцию `renderMarkdown`. Эта функция используется для преобразования строк Markdown в JSX с использованием пакета `markdown-to-jsx`.
- Хук `useIntlayer` используется для получения контента Markdown (`myMarkdownContent`) из словаря с ключом `"app"`.
- Контент Markdown отображается непосредственно в компоненте, а рендеринг Markdown обрабатывается провайдером.

## Дополнительные ресурсы

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)
- [markdown-to-jsx на npm](https://www.npmjs.com/package/markdown-to-jsx)

Эти ресурсы предоставляют дополнительную информацию о настройке и использовании Intlayer с различными типами контента и фреймворками.
