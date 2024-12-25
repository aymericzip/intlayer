# Enumeração / Pluralização

## Como a Enumeração Funciona

No Intlayer, a enumeração é alcançada através da função `enu`, que mapeia chaves específicas ao seu conteúdo correspondente. Essas chaves podem representar valores numéricos, intervalos ou identificadores personalizados. Quando usada com o React Intlayer ou Next Intlayer, o conteúdo apropriado é selecionado automaticamente com base na localidade da aplicação e nas regras definidas.

## Configurando a Enumeração

Para configurar a enumeração em seu projeto Intlayer, você precisa criar um módulo de conteúdo que inclua definições de enumeração. Aqui está um exemplo de uma enumeração simples para o número de carros:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { enu, type DeclarationContent } from "intlayer";

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
    }),
  },
} satisfies DeclarationContent;

export default carEnumeration;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { enu } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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
    }),
  },
};

export default carEnumeration;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { enu, type DeclarationContent } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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
    }),
  },
};

module.exports = carEnumeration;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "car_count",
  "content": {
    "numberOfCar": {
      "<-1": "Menos de menos um carro",
      "-1": "Menos um carro",
      "0": "Nenhum carro",
      "1": "Um carro",
      ">5": "Alguns carros",
      ">19": "Muitos carros"
    }
  }
}
```

Neste exemplo, `enu` mapeia várias condições para conteúdos específicos. Quando utilizado em um componente React, o Intlayer pode escolher automaticamente o conteúdo apropriado com base na variável dada.

## Usando a Enumeração com React Intlayer

Para usar a enumeração em um componente React, você pode aproveitar o hook `useIntlayer` do pacote `react-intlayer`. Este hook recupera o conteúdo correto com base no ID especificado. Aqui está um exemplo de como usá-lo:

```typescript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const CarComponent: FC = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Saída: Nenhum carro */}
      <p>{content.numberOfCar(6)}</p> {/* Saída: Alguns carros */}
      <p>{content.numberOfCar(20)}</p> {/* Saída: Alguns carros */}
    </div>
  );
};
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Saída: Nenhum carro */}
      <p>{content.numberOfCar(6)}</p> {/* Saída: Alguns carros */}
      <p>{content.numberOfCar(20)}</p> {/* Saída: Alguns carros */}
    </div>
  );
};

export default CarComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const CarComponent = () => {
  const content = useIntlayer("car_count");

  return (
    <div>
      <p>{content.numberOfCar(0)}</p> {/* Saída: Nenhum carro */}
      <p>{content.numberOfCar(6)}</p> {/* Saída: Alguns carros */}
      <p>{content.numberOfCar(20)}</p> {/* Saída: Alguns carros */}
    </div>
  );
};

module.exports = CarComponent;
```

Neste exemplo, o componente ajusta dinamicamente sua saída com base no número de carros. O conteúdo correto é escolhido automaticamente, dependendo da faixa especificada.

## Notas Importantes

- A ordem de declaração é crucial nas enumerações do Intlayer. A primeira declaração válida é a que será utilizada.
- Se várias condições se aplicarem, garanta que estão ordenadas corretamente para evitar comportamentos inesperados.

## Melhores Práticas para Enumeração

Para garantir que suas enumerações funcionem conforme o esperado, siga estas melhores práticas:

- **Nomenclatura Consistente**: Use IDs claros e consistentes para os módulos de enumeração para evitar confusão.
- **Documentação**: Documente suas chaves de enumeração e suas saídas esperadas para garantir a manutenibilidade futura.
- **Tratamento de Erros**: Implemente tratamento de erros para gerenciar casos em que nenhuma enumeração válida é encontrada.
- **Otimizar Desempenho**: Para grandes aplicações, reduza o número de extensões de arquivo monitoradas para melhorar o desempenho.

## Recursos Adicionais

Para mais informações detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Intlayer CLI Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [React Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Next Intlayer Documentation](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos fornecem mais insights sobre a configuração e o uso do Intlayer em diferentes ambientes e com várias estruturas.
