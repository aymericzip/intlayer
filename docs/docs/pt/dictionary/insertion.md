---
docName: dictionary__insertion
url: https://intlayer.org/doc/concept/content/insertion
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/insertion.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Inserção
description: Aprenda a declarar e usar marcadores de inserção no seu conteúdo. Esta documentação o guiará pelos passos para inserir dinamicamente valores em estruturas de conteúdo predefinidas.
keywords:
  - Inserção
  - Conteúdo dinâmico
  - Espaços reservados
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Conteúdo de Inserção / Inserção no Intlayer

## Como Funciona a Inserção

No Intlayer, o conteúdo de inserção é realizado através da função `insertion`, que identifica campos de espaço reservado em uma string (como `{{name}}` ou `{{age}}`) que podem ser substituídos dinamicamente em tempo de execução. Essa abordagem permite criar strings flexíveis, semelhantes a modelos, onde partes específicas do conteúdo são determinadas pelos dados passados a partir de sua aplicação.

Quando integrado com React Intlayer ou Next Intlayer, você pode simplesmente fornecer o objeto de dados contendo os valores para cada espaço reservado, e o Intlayer renderizará automaticamente o conteúdo com os espaços reservados substituídos.

## Configurando Conteúdo de Inserção

Para configurar o conteúdo de inserção no seu projeto Intlayer, crie um módulo de conteúdo que inclua suas definições de inserção. Abaixo estão exemplos em vários formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { insert, type Dictionary } from "intlayer";

const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Olá, meu nome é {{name}} e eu tenho {{age}} anos!"),
  },
} satisfies Dictionary;

export default myInsertionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { insert } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Olá, meu nome é {{name}} e eu tenho {{age}} anos!"),
  },
};

export default myInsertionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { insert } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myInsertionContent = {
  key: "my_key",
  content: {
    myInsertion: insert("Olá, meu nome é {{name}} e eu tenho {{age}} anos!"),
  },
};

module.exports = myInsertionContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myInsertion": {
      "nodeType": "insertion",
      "insertion": "Olá, meu nome é {{name}} e eu tenho {{age}} anos!",
    },
  },
}
```

## Usando Conteúdo de Inserção com React Intlayer

Para utilizar o conteúdo de inserção dentro de um componente React, importe e use o hook `useIntlayer` do pacote `react-intlayer`. Este hook recupera o conteúdo para a chave especificada e permite que você passe um objeto que mapeia cada espaço reservado no seu conteúdo para o valor que você deseja exibir.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const InsertionComponent: FC = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: "Olá, meu nome é John e eu tenho 30 anos!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Você pode reutilizar a mesma inserção com valores diferentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: "Olá, meu nome é John e eu tenho 30 anos!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Você pode reutilizar a mesma inserção com valores diferentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

export default InsertionComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const InsertionComponent = () => {
  const { myInsertion } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: "Olá, meu nome é John e eu tenho 30 anos!" */
          myInsertion({ name: "John", age: "30" })
        }
      </p>
      <p>
        {
          /* Você pode reutilizar a mesma inserção com valores diferentes */
          myInsertion({ name: "Alice", age: "25" })
        }
      </p>
    </div>
  );
};

module.exports = InsertionComponent;
```

## Recursos Adicionais

Para informações mais detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos oferecem mais insights sobre a configuração e o uso do Intlayer em diversos ambientes e frameworks.
