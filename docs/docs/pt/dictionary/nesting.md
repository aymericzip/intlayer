---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Aninhamento do dicionário
description: Descubra como usar o aninhamento de conteúdo no Intlayer para reutilizar e estruturar seu conteúdo multilíngue de forma eficiente. Siga esta documentação para implementar o aninhamento sem problemas no seu projeto.
keywords:
  - Nesting
  - Reutilização de conteúdo
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - nesting
---

# Aninhamento / Referência de Subconteúdo

## Como Funciona o Aninhamento

No Intlayer, o aninhamento é realizado através da função `nest`, que permite referenciar e reutilizar conteúdo de outro dicionário. Em vez de duplicar conteúdo, você pode apontar para um módulo de conteúdo existente usando sua chave.

## Configurando o Aninhamento

Para configurar o aninhamento no seu projeto Intlayer, você primeiro define o conteúdo base que deseja reutilizar. Em seguida, em um módulo de conteúdo separado, você usa a função `nest` para importar esse conteúdo.

### Dicionário Base

Abaixo está um exemplo de um dicionário base para ser aninhado em outro dicionário:

```typescript fileName="firstDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary } from "intlayer";

const firstDictionary = {
  key: "key_of_my_first_dictionary",
  content: {
    content: "content",
    subContent: {
      contentNumber: 0,
      contentString: "string",
    },
  },
} satisfies Dictionary;

export default firstDictionary;
```

```json fileName="firstDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_first_dictionary",
  "content": {
    "content": "content",
    "subContent": {
      "contentNumber": 0,
      "contentString": "string"
    }
  }
}
```

### Referenciando com Nest

Agora, crie outro módulo de conteúdo que use a função `nest` para referenciar o conteúdo acima. Você pode referenciar o conteúdo inteiro ou um valor específico aninhado:

```typescript fileName="secondDictionary.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { nest, type Dictionary } from "intlayer";

const myNestingContent = {
  key: "key_of_my_second_dictionary",
  content: {
    // Referencia o dicionário inteiro:
    fullNestedContent: nest("key_of_my_first_dictionary"),
    // Referencia um valor específico aninhado:
    partialNestedContent: nest(
      "key_of_my_first_dictionary",
      "subContent.contentNumber"
    ),
  },
} satisfies Dictionary;

export default myNestingContent;
```

```json fileName="secondDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "key_of_my_second_dictionary",
  "content": {
    "fullNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary"
      }
    },
    "partialNestedContent": {
      "nodeType": "nested",
      "nested": {
        "dictionaryKey": "key_of_my_first_dictionary",
        "path": "subContent.contentNumber"
      }
    }
  }
}
```

Como segundo parâmetro, você pode especificar um caminho para um valor aninhado dentro desse conteúdo. Quando nenhum caminho é fornecido, o conteúdo inteiro do dicionário referenciado é retornado.

## Usando Aninhamento com React Intlayer

Para usar conteúdo aninhado em um componente React, utilize o hook `useIntlayer` do pacote `react-intlayer`. Este hook recupera o conteúdo correto com base na chave especificada. Aqui está um exemplo de como usá-lo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const NestComponent: FC = () => {
  const { fullNestedContent, partialNestedContent } = useIntlayer(
    "key_of_my_second_dictionary"
  );

  return (
    <div>
      <p>
        Conteúdo Aninhado Completo: {JSON.stringify(fullNestedContent)}
        {/* Saída: {"content": "content", "subContent": {"contentNumber": 0, "contentString": "string"}} */}
      </p>
      <p>
        Valor Aninhado Parcial: {partialNestedContent}
        {/* Saída: 0 */}
      </p>
    </div>
  );
};

export default NestComponent;
```

## Recursos Adicionais

Para mais informações detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação do CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos fornecem mais detalhes sobre a configuração e o uso do Intlayer em diferentes ambientes e com vários frameworks.
