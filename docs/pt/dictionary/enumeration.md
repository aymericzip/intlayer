# Enumeração / Pluralização

## Como Funciona a Enumeração

No Intlayer, a enumeração é realizada através da função `enu`, que mapeia chaves específicas para seu conteúdo correspondente. Essas chaves podem representar valores numéricos, intervalos ou identificadores personalizados. Quando usado com React Intlayer ou Next Intlayer, o conteúdo apropriado é automaticamente selecionado com base no locale da aplicação e nas regras definidas.

## Configurando a Enumeração

Para configurar a enumeração no seu projeto Intlayer, você precisa criar um módulo de conteúdo que inclua definições de enumeração. Aqui está um exemplo de uma enumeração simples para o número de carros:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type Dictionary } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
      "fallback": "Valor padrão", // Opcional
    }),
  },
} satisfies Dictionary;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
      "fallback": "Valor padrão", // Opcional
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros",
      "fallback": "Valor padrão", // Opcional
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Menos de menos um carro",
        "-1": "Menos um carro",
        "0": "Nenhum carro",
        "1": "Um carro",
        ">5": "Alguns carros",
        ">19": "Muitos carros",
        "fallback": "Valor padrão" // Opcional
      }
    }
  }
}
```

Neste exemplo, `enu` mapeia várias condições para conteúdos específicos. Quando usado em um componente React, o Intlayer pode escolher automaticamente o conteúdo apropriado com base na variável fornecida.

> A ordem de declaração é importante nas enumerações do Intlayer. A primeira declaração válida é a que será escolhida. Se várias condições se aplicarem, certifique-se de que estão ordenadas corretamente para evitar comportamentos inesperados.

> Se nenhum fallback for declarado, a função retornará `undefined` se nenhuma chave corresponder.

## Usando Enumeração com React Intlayer

Para usar enumeração em um componente React, você pode utilizar o hook `useIntlayer` do pacote `react-intlayer`. Este hook recupera o conteúdo correto com base no ID especificado. Aqui está um exemplo de como usá-lo:

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Saída: Nenhum carro
        }
      </p>
      <p>
        {
          numberOfCar(6) // Saída: Alguns carros
        }
      </p>
      <p>
        {
          numberOfCar(20) // Saída: Muitos carros
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Saída: Valor padrão
        }
      </p>
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Saída: Nenhum carro
        }
      </p>
      <p>
        {
          numberOfCar(6) // Saída: Alguns carros
        }
      </p>
      <p>
        {
          numberOfCar(20) // Saída: Muitos carros
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Saída: Valor padrão
        }
      </p>
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const { numberOfCar } = useIntlayer("car_count");

  return (
    <div>
      <p>
        {
          numberOfCar(0) // Saída: Nenhum carro
        }
      </p>
      <p>
        {
          numberOfCar(6) // Saída: Alguns carros
        }
      </p>
      <p>
        {
          numberOfCar(20) // Saída: Muitos carros
        }
      </p>
      <p>
        {
          numberOfCar(0.01) // Saída: Valor padrão
        }
      </p>
    </div>
  );
};

module.exports = CarComponent;
```

Neste exemplo, o componente ajusta dinamicamente sua saída com base no número de carros. O conteúdo correto é escolhido automaticamente, dependendo do intervalo especificado.

## Recursos Adicionais

Para informações mais detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos fornecem mais informações sobre a configuração e uso do Intlayer em diferentes ambientes e com vários frameworks.
