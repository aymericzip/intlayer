# Integração com React: Documentação do Hook `useDictionary`

Esta seção fornece orientações detalhadas sobre o uso do hook `useDictionary` em aplicações React, permitindo o manuseio eficiente de conteúdo localizado sem um editor visual.

## Importando `useDictionary` em React

O hook `useDictionary` pode ser integrado em aplicações React importando-o com base no contexto:

- **Componente do Cliente:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Usado em componentes React do lado do cliente
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Usado em componentes React do lado do cliente
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Usado em componentes React do lado do cliente
  ```

- **Componente do Servidor:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Usado em componentes React do lado do servidor
  ```

## Parâmetros

O hook aceita dois parâmetros:

1. **`dictionary`**: Um objeto de dicionário declarado contendo conteúdo localizado para chaves específicas.
2. **`locale`** (opcional): O local desejado. Padrão para o local do contexto atual, se não especificado.

## Declaração de Conteúdo

Todos os objetos de dicionário devem ser declarados em arquivos de conteúdo estruturado para garantir segurança de tipo e evitar erros em tempo de execução. Você pode encontrar as instruções de configuração [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md). Aqui está um exemplo de declaração de conteúdo:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Exemplo de Uso em Componente React Cliente

Abaixo está um exemplo de como usar o hook `useDictionary` em um componente React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Exemplo de Uso em Componente React Servidor

Se você estiver usando o hook `useDictionary` fora do `IntlayerServerProvider`, o local deve ser explicitamente fornecido como um parâmetro ao renderizar o componente:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## Notas sobre Atributos

Diferente das integrações que usam editores visuais, atributos como `buttonTitle.value` não se aplicam aqui. Em vez disso, acesse diretamente as strings localizadas conforme declarado em seu conteúdo.

```jsx
<button title={content.title}>{content.content}</button>
```

## Dicas Adicionais

- **Segurança de Tipo**: Sempre use `Dictionary` para definir seus dicionários para garantir segurança de tipo.
- **Atualizações de Localização**: Ao atualizar conteúdo, garanta que todos os locais sejam consistentes para evitar traduções faltantes.

Esta documentação foca na integração do hook `useDictionary`, proporcionando uma abordagem simplificada para gerenciar conteúdo localizado sem depender das funcionalidades dos editores visuais.
