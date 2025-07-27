---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Conteúdo Baseado em Gênero
description: Aprenda como usar conteúdo baseado em gênero no Intlayer para exibir conteúdo dinamicamente com base no gênero. Siga esta documentação para implementar conteúdo específico por gênero de forma eficiente em seu projeto.
keywords:
  - Conteúdo Baseado em Gênero
  - Renderização Dinâmica
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - gender
---

# Conteúdo Baseado em Gênero / Gênero no Intlayer

## Como o Gênero Funciona

No Intlayer, o conteúdo baseado em gênero é realizado por meio da função `gender`, que mapeia valores específicos de gênero ('male', 'female') para seus conteúdos correspondentes. Essa abordagem permite selecionar dinamicamente o conteúdo com base em um gênero fornecido. Quando integrado com React Intlayer ou Next Intlayer, o conteúdo apropriado é automaticamente escolhido de acordo com o gênero fornecido em tempo de execução.

## Configurando Conteúdo Baseado em Gênero

Para configurar conteúdo baseado em gênero em seu projeto Intlayer, crie um módulo de conteúdo que inclua suas definições específicas por gênero. Abaixo estão exemplos em vários formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { gender, type Dictionary } from "intlayer";

const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "meu conteúdo para usuários do sexo masculino",
      female: "meu conteúdo para usuários do sexo feminino",
      fallback: "meu conteúdo quando o gênero não é especificado", // Opcional
    }),
  },
} satisfies Dictionary;

export default myGenderContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { gender } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "meu conteúdo para usuários do sexo masculino",
      female: "meu conteúdo para usuários do sexo feminino",
      fallback: "meu conteúdo quando o gênero não é especificado", // Opcional
    }),
  },
};

export default myGenderContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { gender } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myGenderContent = {
  key: "my_key",
  content: {
    myGender: gender({
      male: "meu conteúdo para usuários do sexo masculino",
      female: "meu conteúdo para usuários do sexo feminino",
      fallback: "meu conteúdo quando o gênero não é especificado", // Opcional
    }),
  },
};

module.exports = myGenderContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myGender": {
      "nodeType": "gender",
      "gender": {
        "male": "meu conteúdo para usuários do sexo masculino",
        "female": "meu conteúdo para usuários do sexo feminino",
        "fallback": "meu conteúdo quando o gênero não é especificado", // Opcional
      },
    },
  },
}
```

> Se nenhum fallback for declarado, a última chave declarada será usada como fallback caso o gênero não seja especificado ou não corresponda a nenhum gênero definido.

## Usando Conteúdo Baseado em Gênero com React Intlayer

Para utilizar conteúdo baseado em gênero dentro de um componente React, importe e use o hook `useIntlayer` do pacote `react-intlayer`. Esse hook busca o conteúdo para a chave especificada e permite que você passe um gênero para selecionar a saída apropriada.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const GenderComponent: FC = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: meu conteúdo para usuários do sexo masculino */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuárias */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuários */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuárias */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando o gênero não é especificado */
          myGender("")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando o gênero não é especificado */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: meu conteúdo para usuários */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuárias */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuários */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuárias */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando o gênero não é especificado */
          myGender("")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando o gênero não é especificado */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

export default GenderComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const GenderComponent = () => {
  const { myGender } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: meu conteúdo para usuários */
          myGender("male")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuárias */
          myGender("female")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuários */
          myGender("m")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo para usuárias */
          myGender("f")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando o gênero não é especificado */
          myGender("")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando o gênero não é especificado */
          myGender(undefined)
        }
      </p>
    </div>
  );
};

module.exports = GenderComponent;
```

## Recursos Adicionais

Para informações mais detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)

Estes recursos oferecem mais informações sobre a configuração e o uso do Intlayer em vários ambientes e frameworks.

## Histórico do Documento

| Versão | Data       | Alterações                               |
| ------ | ---------- | ---------------------------------------- |
| 5.7.2  | 2025-07-27 | Introdução de conteúdo baseado em gênero |
