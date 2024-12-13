# Função de Busca

## Declarações de Função

Intlayer permite que você declare funções de conteúdo em seus módulos de conteúdo, que podem ser síncronas ou assíncronas. Quando a aplicação é construída, o Intlayer executa essas funções para obter o resultado da função. O valor de retorno deve ser um objeto JSON ou um valor simples como uma string ou número.

Aqui está um exemplo de uma função síncrona simples que busca conteúdo:

```typescript
import type { DeclarationContent } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "Este é o conteúdo renderizado por uma função",
  },
} satisfies DeclarationContent;

export default functionContent;
```

Neste exemplo, a chave `text` contém uma função que retorna uma string. Este conteúdo pode ser renderizado em seus componentes React usando os pacotes intérpretes do Intlayer, como `react-intlayer`.

## Busca de Função Assíncrona

Além das funções síncronas, o Intlayer suporta funções assíncronas, permitindo que você busque dados de fontes externas ou simule a recuperação de dados com dados fictícios.

Abaixo está um exemplo de uma função assíncrona que simula uma busca no servidor:

```typescript
import { setTimeout } from "node:timers/promises";
import type { DeclarationContent } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Aguarda 200ms para simular uma busca no servidor
  return await setTimeout(200).then(
    () => "Este é o conteúdo buscado do servidor"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies DeclarationContent;

export default asyncFunctionContent;
```

Neste caso, a função `fakeFetch` imita um atraso para simular o tempo de resposta do servidor. O Intlayer executa a função assíncrona e usa o resultado como o conteúdo para a chave `text`.

## Usando Conteúdo Baseado em Funções em Componentes React

Para usar conteúdo baseado em funções em um componente React, você precisa importar `useIntlayer` de `react-intlayer` e chamá-lo com o ID do conteúdo para recuperar o conteúdo. Aqui está um exemplo:

```javascript
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Saída: Este é o conteúdo renderizado por uma função */}
      <p>{asyncFunctionContent.text}</p>
      {/* Saída: Este é o conteúdo buscado do servidor */}
    </div>
  );
};

export default MyComponent;
```
