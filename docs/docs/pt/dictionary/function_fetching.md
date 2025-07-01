---
docName: dictionary__function_fetching
url: https://intlayer.org/doc/concept/content/function-fetching
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Busca por Função
description: Descubra como declarar e usar busca por função em seu site multilíngue. Siga os passos nesta documentação online para configurar seu projeto em poucos minutos.
keywords:
  - Busca por Função
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Busca por Função

Intlayer permite que você declare funções de conteúdo em seus módulos de conteúdo, que podem ser síncronas ou assíncronas. Quando a aplicação é construída, o Intlayer executa essas funções para obter o resultado da função. O valor retornado deve ser um objeto JSON ou um valor simples como uma string ou número.

> Aviso: a busca por função atualmente não está disponível em declarações de conteúdo JSON e em arquivos de declarações de conteúdo remotas.

## Declarações de Função

Aqui está um exemplo de uma função síncrona simples buscando conteúdo:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import type { Dictionary } from "intlayer";

const functionContent = {
  key: "function_content",
  content: {
    text: () => "This is the content rendered by a function",
  },
} satisfies Dictionary;

export default functionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Este é o conteúdo renderizado por uma função",
  },
};

export default functionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
/** @type {import('intlayer').Dictionary} */
const functionContent = {
  key: "function_content",
  content: {
    text: () => "Este é o conteúdo renderizado por uma função",
  },
};

module.exports = functionContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "function_content",
  "content": {
    "text": "Este é o conteúdo renderizado por uma função"
  }
}
```

Neste exemplo, a chave `text` contém uma função que retorna uma string. Este conteúdo pode ser renderizado em seus componentes React usando os pacotes interpretadores do Intlayer, como o `react-intlayer`.

## Busca de Função Assíncrona

Além das funções síncronas, o Intlayer suporta funções assíncronas, permitindo que você busque dados de fontes externas ou simule a recuperação de dados com dados fictícios.

Abaixo está um exemplo de uma função assíncrona que simula uma busca em um servidor:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { setTimeout } from "node:timers/promises";
import type { Dictionary } from "intlayer";

const fakeFetch = async (): Promise<string> => {
  // Aguarde 200ms para simular uma busca no servidor
  return await setTimeout(200).then(
    () => "Este é o conteúdo buscado do servidor"
  );
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
} satisfies Dictionary;

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { setTimeout } from "node:timers/promises";

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Aguarde 200ms para simular uma busca no servidor
  await setTimeout(200);
  return "Este é o conteúdo buscado do servidor";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

export default asyncFunctionContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { setTimeout } = require("node:timers/promises");

/** @type {import('intlayer').Dictionary} */
const fakeFetch = async () => {
  // Aguarde 200ms para simular uma busca no servidor
  await setTimeout(200);
  return "Este é o conteúdo buscado do servidor";
};

const asyncFunctionContent = {
  key: "async_function",
  content: { text: fakeFetch },
};

module.exports = asyncFunctionContent;
```

```plaintext fileName="**/*.content.json" contentDeclarationFormat="json"
Não é possível buscar conteúdo de um arquivo JSON, use um arquivo .ts ou .js em vez disso
```

Neste caso, a função `fakeFetch` simula um atraso para imitar o tempo de resposta do servidor. O Intlayer executa a função assíncrona e usa o resultado como o conteúdo para a chave `text`.

## Usando Conteúdo Baseado em Função em Componentes React

Para usar conteúdo baseado em função em um componente React, você precisa importar `useIntlayer` de `react-intlayer` e chamá-lo com o ID do conteúdo para recuperar o conteúdo. Aqui está um exemplo:

```typescript fileName="**/*.jsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Saída: Este é o conteúdo renderizado por uma função */}
      <p>{asyncFunctionContent.text}</p>
      {/* Saída: Este é o conteúdo obtido do servidor */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Saída: Este é o conteúdo renderizado por uma função */}
      <p>{asyncFunctionContent.text}</p>
      {/* Saída: Este é o conteúdo obtido do servidor */}
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const functionContent = useIntlayer("function_content");
  const asyncFunctionContent = useIntlayer("async_function_content");

  return (
    <div>
      <p>{functionContent.text}</p>
      {/* Saída: Este é o conteúdo renderizado por uma função */}
      <p>{asyncFunctionContent.text}</p>
      {/* Saída: Este é o conteúdo obtido do servidor */}
    </div>
  );
};

module.exports = MyComponent;
```

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
