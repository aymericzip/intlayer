# Integração React: Documentação do Hook `useDictionary`

Esta seção fornece orientações detalhadas sobre o uso do hook `useDictionary` em aplicações React, permitindo a manipulação eficiente de conteúdo localizado sem um editor visual.

## Importando `useDictionary` no React

O hook `useDictionary` pode ser integrado em aplicações React importando-o com base no contexto:

- **Componente de Cliente:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // Usado em componentes React do lado do cliente
  ```

- **Componente de Servidor:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // Usado em componentes React do lado do servidor
  ```

## Parâmetros

O hook aceita dois parâmetros:

1. **`dictionary`**: Um objeto de dicionário declarado contendo conteúdo localizado para chaves específicas.
2. **`locale`** (opcional): O local desejado. Por padrão, usa o local do contexto atual se não especificado.

## Declaração de Conteúdo

Todos os objetos de dicionário devem ser declarados em arquivos de conteúdo estruturado para garantir a segurança de tipo e prevenir erros em tempo de execução. Você pode encontrar as instruções de configuração [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md). Aqui está um exemplo de declaração de conteúdo:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
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
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Exemplo de Uso no React

Abaixo está um exemplo de como usar o hook `useDictionary` em um componente React:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Integração no Servidor

Se você estiver usando o hook `useDictionary` fora do `IntlayerProvider`, o local deve ser fornecido explicitamente como um parâmetro ao renderizar o componente:

```tsx
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Observações sobre Atributos

Ao contrário das integrações usando editores visuais, atributos como `buttonTitle.value` não se aplicam aqui. Em vez disso, acesse diretamente as strings localizadas conforme declarado em seu conteúdo.

```tsx
<button title={content.title}>{content.content}</button>
```

## Dicas Adicionais

- **Segurança de Tipo**: Sempre use `DeclarationContent` para definir seus dicionários para garantir a segurança de tipo.
- **Atualizações de Localização**: Ao atualizar o conteúdo, certifique-se de que todos os locais sejam consistentes para evitar traduções faltantes.

Esta documentação foca na integração do hook `useDictionary`, fornecendo uma abordagem simplificada para gerenciar conteúdo localizado sem depender das funcionalidades de editores visuais.
