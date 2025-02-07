# Markdown / Conteúdo de Texto Rico

## Como o Markdown Funciona

O Intlayer suporta conteúdo de texto rico definido usando a sintaxe Markdown. Isso é alcançado através da função `md`, que converte uma string Markdown em um formato que pode ser gerenciado pelo Intlayer. Usando o Markdown, você pode escrever e manter facilmente conteúdos com formatação rica, como blogs, artigos e muito mais.

[O Editor Visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) e o [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md) suportam ambos a gestão de conteúdo em Markdown.

Quando integrado com uma aplicação React, você pode usar um provedor de renderização Markdown (como [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) para renderizar o conteúdo Markdown em HTML. Isso permite que você escreva conteúdo em Markdown garantindo que ele seja exibido adequadamente no seu app.

## Configurando Conteúdo Markdown

Para configurar o conteúdo Markdown no seu projeto Intlayer, defina um dicionário de conteúdo que utilize a função `md`.

### Exemplo em TypeScript

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Define um dicionário de conteúdo usando a função `md` para conteúdo em Markdown.
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"), // Exemplo de conteúdo Markdown
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### Exemplo em JavaScript (ESM)

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Define um dicionário de conteúdo usando a função `md` para conteúdo em Markdown.
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"), // Exemplo de conteúdo Markdown
  },
};

export default markdownDictionary;
```

### Exemplo em CommonJS

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Define um dicionário de conteúdo usando a função `md` para conteúdo em Markdown.
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"), // Exemplo de conteúdo Markdown
  },
};

module.exports = markdownDictionary;
```

### Exemplo de JSON

Ao usar JSON, o conteúdo Markdown é definido configurando um `nodeType` (por exemplo, `"markdown"`) e fornecendo a string Markdown. Por exemplo:

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

## Usando Markdown com o React Intlayer

Para renderizar o conteúdo Markdown em uma aplicação React, você pode utilizar o hook `useIntlayer` do pacote `react-intlayer` juntamente com um provedor de renderização Markdown. Neste exemplo, usamos o pacote [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) para converter o Markdown em HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

// Componente que renderiza o conteúdo recuperado do Intlayer
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app"); // Recupera conteúdo Markdown

  return <>{myMarkdownContent}</>; // Renderiza o conteúdo Markdown
};

// Componente aplicativo principal
const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>} // Provedor para renderizar Markdown
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
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

Esses recursos fornecem mais informações sobre como configurar e usar o Intlayer com vários tipos de conteúdos e frameworks.
