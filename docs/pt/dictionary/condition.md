# Conteúdo Condicional / Condição no Intlayer

## Como a Condição Funciona

No Intlayer, o conteúdo condicional é alcançado através da função `cond`, que mapeia condições específicas (tipicamente valores booleanos) para o conteúdo correspondente. Essa abordagem permite selecionar dinamicamente o conteúdo com base em uma condição fornecida. Quando integrado com React Intlayer ou Next Intlayer, o conteúdo apropriado é automaticamente escolhido de acordo com a condição fornecida em tempo de execução.

## Configurando Conteúdo Condicional

Para configurar conteúdo condicional no seu projeto Intlayer, crie um módulo de conteúdo que inclua suas definições condicionais. Abaixo estão exemplos em vários formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "meu conteúdo quando é verdadeiro",
      false: "meu conteúdo quando é falso",
      fallback: "meu conteúdo quando a condição falha", // Opcional
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "meu conteúdo quando é verdadeiro",
      false: "meu conteúdo quando é falso",
      fallback: "meu conteúdo quando a condição falha", // Opcional
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "meu conteúdo quando é verdadeiro",
      false: "meu conteúdo quando é falso",
      fallback: "meu conteúdo quando a condição falha", // Opcional
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "meu conteúdo quando é verdadeiro",
        "false": "meu conteúdo quando é falso",
        "fallback": "meu conteúdo quando a condição falha", // Opcional
      },
    },
  },
}
```

> Se nenhum fallback for declarado, a última chave declarada será tomada como fallback se a condição não for validada.

## Usando Conteúdo Condicional com React Intlayer

Para utilizar conteúdo condicional dentro de um componente React, importe e use o hook `useIntlayer` do pacote `react-intlayer`. Este hook busca o conteúdo para a chave especificada e permite que você passe uma condição para selecionar a saída apropriada.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: meu conteúdo quando é verdadeiro */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando é falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando a condição falha */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando a condição falha */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: meu conteúdo quando é verdadeiro */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando é falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando a condição falha */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando a condição falha */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: meu conteúdo quando é verdadeiro */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando é falso */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando a condição falha */
          myCondition("")
        }
      </p>
      <p>
        {
          /* Saída: meu conteúdo quando a condição falha */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## Recursos Adicionais

Para informações mais detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos oferecem mais insights sobre a configuração e uso do Intlayer em diversos ambientes e frameworks.
