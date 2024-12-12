# Enumeração / Pluralização

## Como a Enumeração Funciona

No Intlayer, a enumeração é alcançada através da função `enu`, que mapeia chaves específicas para seu conteúdo correspondente. Essas chaves podem representar valores numéricos, intervalos ou identificadores personalizados. Quando usadas com o React Intlayer ou Next Intlayer, o conteúdo apropriado é automaticamente selecionado com base na localidade do aplicativo e nas regras definidas.

## Configurando a Enumeração

Para configurar a enumeração em seu projeto Intlayer, você precisa criar um módulo de conteúdo que inclua definições de enumeração. Aqui está um exemplo de uma enumeração simples para o número de carros:

```typescript
import { enu, type DeclarationContent } from "intlayer";

const carEnumeration = {
  key: "car_count",
  content: {
    numberOfCar: enu({
      "<-1": "Menos que menos um carro",
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

Neste exemplo, `enu` mapeia várias condições para conteúdos específicos. Quando usado em um componente React, o Intlayer pode escolher automaticamente o conteúdo apropriado com base na variável dada.

## Usando Enumeração com React Intlayer

Para usar enumeração em um componente React, você pode aproveitar o hook `useIntlayer` do pacote `react-intlayer`. Este hook recupera o conteúdo correto com base no ID especificado. Aqui está um exemplo de como usá-lo:

```javascript
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

Neste exemplo, o componente ajusta dinamicamente sua saída com base no número de carros. O conteúdo correto é escolhido automaticamente, dependendo do intervalo especificado.

## Notas Importantes

- A ordem de declaração é crucial nas enumerações do Intlayer. A primeira declaração válida é a que será escolhida.
- Se múltiplas condições se aplicarem, certifique-se de que estão ordenadas corretamente para evitar comportamentos inesperados.

## Melhores Práticas para Enumeração

Para garantir que suas enumerações funcionem conforme o esperado, siga estas melhores práticas:

- **Nomenclatura Consistente**: Use IDs claros e consistentes para módulos de enumeração para evitar confusão.
- **Documentação**: Documente suas chaves de enumeração e suas saídas esperadas para garantir a manutenção futura.
- **Tratamento de Erros**: Implemente tratamento de erros para gerenciar casos onde nenhuma enumeração válida é encontrada.
- **Otimizar o Desempenho**: Para aplicativos grandes, reduza o número de extensões de arquivo monitoradas para melhorar o desempenho.

## Recursos Adicionais

Para mais informações detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos fornecem mais informações sobre a configuração e o uso do Intlayer em diferentes ambientes e com várias estruturas.
