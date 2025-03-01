# Markdown / Conteúdo de Texto Rico

## Como o Markdown Funciona

O Intlayer suporta conteúdo de texto rico definido usando a sintaxe Markdown. Isso é alcançado através da função `md`, que converte uma string Markdown em um formato que pode ser gerenciado pelo Intlayer. Usando Markdown, você pode facilmente escrever e manter conteúdo com formatação rica, como blogs, artigos e muito mais.

[O editor visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) e o [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md) ambos suportam o gerenciamento de conteúdo em Markdown.

Quando integrado a uma aplicação React, você pode usar um provedor de renderização Markdown (como [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) para renderizar o conteúdo Markdown em HTML. Isso permite que você escreva conteúdo em Markdown enquanto garante que ele seja exibido corretamente em seu aplicativo.

## Configurando Conteúdo Markdown

Para configurar o conteúdo Markdown em seu projeto Intlayer, defina um dicionário de conteúdo que utilize a função `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Definição do dicionário de conteúdo com Markdown
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Meu título \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

// Definição do dicionário de conteúdo com Markdown
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Meu título \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

// Definição do dicionário de conteúdo com Markdown
/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Meu título \n\nLorem Ipsum"),
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
      "markdown": "## Meu título \n\nLorem Ipsum"
    }
  }
}
```

## Usando Markdown com React Intlayer

Para renderizar o conteúdo Markdown em uma aplicação React, você pode usar o hook `useIntlayer` do pacote `react-intlayer` junto com um provedor de renderização Markdown. Neste exemplo, usamos o pacote [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) para converter o Markdown em HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// Componente para renderizar conteúdo Markdown
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Provedor para renderizar Markdown
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

// Componente para renderizar conteúdo Markdown
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Provedor para renderizar Markdown
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

// Componente para renderizar conteúdo Markdown
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Provedor para renderizar Markdown
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

Nesta implementação:

- O `MarkdownProvider` envolve a aplicação (ou a parte relevante dela) e aceita uma função `renderMarkdown`. Essa função é usada para converter strings Markdown em JSX usando o pacote `markdown-to-jsx`.
- O hook `useIntlayer` é usado para recuperar o conteúdo Markdown (`myMarkdownContent`) do dicionário com a chave `"app"`.
- O conteúdo Markdown é renderizado diretamente no componente, e a renderização do Markdown é gerenciada pelo provedor.

## Recursos Adicionais

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)
- [markdown-to-jsx no npm](https://www.npmjs.com/package/markdown-to-jsx)

Esses recursos fornecem mais informações sobre como configurar e usar o Intlayer com vários tipos de conteúdo e frameworks.
