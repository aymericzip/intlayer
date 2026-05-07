---
createdAt: 2026-05-07
updatedAt: 2026-05-07
title: Tipo IntlayerNode. O que é?
description: O que é o tipo IntlayerNode? Por que minha string é transformada em um IntlayerNode<string>?
keywords:
  - Introdução
  - Primeiros passos
  - Intlayer
  - Aplicação
  - Pacotes
slugs:
  - frequent-questions
  - intlayer-node
history:
  - version: 8.9.0
    date: 2026-05-07
    changes: "Iniciação do doc"
---

# O que é o tipo IntlayerNode?

O tipo `IntlayerNode<T>` é un tipo especial fornecido pelos pacotes do intlayer, como `next-intlayer`, `react-intlayer`, `vue-intlayer`, `preact-intlayer`, `solid-intlayer`, `angular-intlayer`, `svelte-intlayer`, `lit-intlayer` e `vanilla-intlayer`.

## Exemplo de uso

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Preact",
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Preact"
  }
}
```

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

```tsx fileName="src/App.tsx"
import { useIntlayer } from "react-intlayer";

const AppContent = () => {
  const { title } = useIntlayer("app");

  return title; // retorna o tipo: IntlayerNode<string>
};
```

  </Tab>

// Todo adicionar outros frameworks como abas como em docs/docs/pt/dictionary/markdown.md
</Tabs>

### Por que o Intlayer insere um IntlayerNode?

O Intlayer insere um IntlayerNode para poder renderizar os Seletores do editor visual no contexto do CMS / Editor Visual.

![Demonstração do Editor Visual](https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/visual_editor.gif?raw=true)

Um IntlayerNode é um nó React/Vue/Preact/Solid/Angular/Svelte/Lit/Vanilla enriquecido, mas também permite acessar as propriedades do nó primitivo base.

Por exemplo:

```js
const content = useIntlayer("app");

// Caso de String
content.title; // Retorna IntlayerNode<string>
content.title.value; // Retorna o conteúdo base, aqui uma string

content.title.toString(); // Retorna string
content.title.toLowerCase(); // Retorna string
String(content.title); // Retorna string
content.title.toUpperCase(); // Retorna string em maiúsculas
content.title.replace("a", "b"); // Retorna string modificada
// ...
```

> Acessar as propriedades de um IntlayerNode funcionará, mas quebrará a capacidade de exibir os seletores no Editor Visual.

> O IntlayerNode também pode envolver números ou outros tipos, como `IntlayerNode<number>`
