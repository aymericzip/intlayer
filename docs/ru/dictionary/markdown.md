# Markdown / Rich Text Content

## Как работает Markdown

Intlayer поддерживает контент с богатым форматированием, определенный с использованием синтаксиса Markdown. Это достигается с помощью функции `md`, которая преобразует строку Markdown в формат, управляемый Intlayer. Используя Markdown, вы можете легко писать и поддерживать контент с богатым форматированием, например, блоги, статьи и многое другое.

[Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md) и [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_CMS.md) поддерживают управление контентом в формате Markdown.

При интеграции с React-приложением вы можете использовать провайдер рендера Markdown (например, [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) для преобразования контента Markdown в HTML. Это позволяет писать контент в формате Markdown, одновременно обеспечивая его корректное отображение в приложении.

## Настройка контента Markdown

Чтобы настроить контент Markdown в вашем проекте Intlayer, определите словарь контента, который использует функцию `md`.

### Пример TypeScript

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

### Пример JavaScript (ESM)

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Создаем словарь контента с помощью функции md
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### Пример CommonJS

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Создаем словарь контента с использованием функции md
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### Пример JSON

При использовании JSON контент Markdown определяется путем установки `nodeType` (например, `"markdown"`) и предоставления строки Markdown. Пример:

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

Чтобы отобразить контент Markdown в React-приложении, вы можете использовать хук `useIntlayer` из пакета `react-intlayer` совместно с провайдером рендера Markdown. В этом примере используется пакет [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) для преобразования Markdown в HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

const AppContent: FC = () => {
  // Получаем контент Markdown из словаря
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      // Преобразование Markdown в JSX с помощью markdown-to-jsx
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
```

В данной реализации:

- Провайдер `MarkdownProvider` оборачивает приложение (или соответствующую его часть) и принимает функцию `renderMarkdown`. Эта функция используется для преобразования строк Markdown в JSX с использованием пакета `markdown-to-jsx`.
- Хук `useIntlayer` используется для получения контента Markdown (`myMarkdownContent`) из словаря с ключом `"app"`.
- Контент Markdown рендерится напрямую в компоненте, а обработка рендера Markdown выполняется провайдером.

## Дополнительные ресурсы

- [Документация Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md)
- [Документация React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md)
- [Документация Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md)
- [markdown-to-jsx на npm](https://www.npmjs.com/package/markdown-to-jsx)

Эти ресурсы предоставляют дополнительную информацию о настройке и использовании Intlayer с различными типами контента и фреймворками.
