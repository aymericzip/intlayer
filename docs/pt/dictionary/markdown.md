## Como o Markdown Funciona

O Intlayer suporta conteúdo de texto rico definido usando a sintaxe Markdown. Isso é alcançado através da função `md`, que converte uma string Markdown em um formato que pode ser gerenciado pelo Intlayer. Usando Markdown, você pode facilmente escrever e manter conteúdo com formatação rica, como blogs, artigos e muito mais.

[O editor visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md) e o [CMS do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_CMS.md) ambos suportam o gerenciamento de conteúdo em Markdown.

Quando integrado a uma aplicação React, você pode usar um provedor de renderização Markdown (como [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) para renderizar o conteúdo Markdown em HTML. Isso permite que você escreva conteúdo em Markdown enquanto garante que ele seja exibido corretamente no seu aplicativo.

## Configurando Conteúdo Markdown

Para configurar o conteúdo Markdown no seu projeto Intlayer, defina um dicionário de conteúdo que utilize a função `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

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

## Importar arquivo `.md` multilíngue

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Esta declaração permite que o TypeScript reconheça e importe arquivos Markdown (.md) como módulos.
// Sem isso, o TypeScript lançaria um erro ao tentar importar arquivos Markdown,
// pois ele não suporta nativamente a importação de arquivos não relacionados a código.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_pt from "./myMarkdown.pt.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      pt: md(markdown_pt),
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
import markdown_pt from "./myMarkdown.pt.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      pt: md(markdown_pt),
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
const markdown_pt = require("./myMarkdown.pt.md");
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      pt: md(markdown_pt),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// Importar arquivos Markdown externos (.md) só é possível usando arquivos de declaração JS ou TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "pt": {
          "nodeType": "markdown",
          "markdown": "# Meu Markdown\n\nEste é um conteúdo Markdown.",
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

## Usando Markdown com React Intlayer

Para renderizar o conteúdo Markdown em uma aplicação React, você pode usar o hook `useIntlayer` do pacote `react-intlayer` junto com um provedor de renderização Markdown. Neste exemplo, usamos o pacote [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) para converter o Markdown em HTML.

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

Nesta implementação:

- O `MarkdownProvider` envolve a aplicação (ou a parte relevante dela) e aceita uma função `renderMarkdown`. Esta função é usada para converter strings Markdown em JSX usando o pacote `markdown-to-jsx`.
- O hook `useIntlayer` é usado para recuperar o conteúdo Markdown (`myMarkdownContent`) do dicionário com a chave `"app"`.
- O conteúdo Markdown é renderizado diretamente no componente, e a renderização do Markdown é gerenciada pelo provedor.

## Recursos Adicionais

- [Documentação do CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)
- [markdown-to-jsx no npm](https://www.npmjs.com/package/markdown-to-jsx)

Esses recursos fornecem mais informações sobre como configurar e usar o Intlayer com vários tipos de conteúdo e frameworks.
