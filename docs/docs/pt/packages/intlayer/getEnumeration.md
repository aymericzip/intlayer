---
docName: package__intlayer__getEnumeration
url: https://intlayer.org/doc/packages/intlayer/getEnumeration
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getEnumeration.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getEnumeration | intlayer
description: Veja como usar a função getEnumeration para o pacote intlayer
keywords:
  - getEnumeration
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getEnumeration` em `intlayer`

## Descrição

A função `getEnumeration` recupera o conteúdo correspondente a uma quantidade específica com base em condições predefinidas em um objeto de enumeração. As condições são definidas como chaves, e sua prioridade é determinada pela ordem no objeto.

## Parâmetros

- `enumerationContent: QuantityContent<Content>`

  - **Descrição**: Um objeto onde as chaves representam condições (por exemplo, `<=`, `<`, `>=`, `=`) e os valores representam o conteúdo correspondente. A ordem das chaves define a prioridade de correspondência.
  - **Tipo**: `QuantityContent<Content>`
    - `Content` pode ser qualquer tipo.

- `quantity: number`

  - **Descrição**: O valor numérico usado para corresponder às condições em `enumerationContent`.
  - **Tipo**: `number`

## Retorno

- **Tipo**: `Content`
- **Descrição**: O conteúdo correspondente à primeira condição que coincidir em `enumerationContent`. Se nenhuma correspondência for encontrada, o comportamento padrão dependerá da implementação (por exemplo, erro ou conteúdo alternativo).

## Exemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Você tem menos que -2.3",
    "<1": "Você tem menos que um",
    "2": "Você tem dois",
    ">=3": "Você tem três ou mais",
  },
  2
);

console.log(content); // Saída: "Você tem dois"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Você tem menos que um",
    "2": "Você tem dois",
    ">=3": "Você tem três ou mais",
  },
  2
);

console.log(content); // Saída: "Você tem dois"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Você tem menos que um",
    "2": "Você tem dois",
    ">=3": "Você tem três ou mais",
  },
  2
);

console.log(content); // Saída: "Você tem dois"
```

### Prioridade das Condições

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Você tem menos que quatro",
    "2": "Você tem dois",
  },
  2
);

console.log(content); // Saída: "Você tem menos que quatro"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Você tem menos que quatro",
    "2": "Você tem dois",
  },
  2
);

console.log(content); // Saída: "Você tem menos que quatro"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Você tem menos que quatro",
    "2": "Você tem dois",
  },
  2
);

console.log(content); // Saída: "Você tem menos que quatro"
```

## Casos Especiais

- **Nenhuma Condição Correspondente:**

  - Se nenhuma condição corresponder à quantidade fornecida, a função retornará `undefined` ou tratará explicitamente o cenário padrão/fallback.

- **Condições Ambíguas:**

  - Se as condições se sobrepuserem, a primeira condição correspondente (com base na ordem do objeto) terá precedência.

- **Chaves Inválidas:**

  - A função assume que todas as chaves em `enumerationContent` são válidas e podem ser interpretadas como condições. Chaves inválidas ou com formato incorreto podem levar a comportamentos inesperados.

- **Aplicação do TypeScript:**
  - A função garante que o tipo `Content` seja consistente em todas as chaves, permitindo segurança de tipo no conteúdo recuperado.

## Notas

- A utilidade `findMatchingCondition` é usada para determinar a condição apropriada com base na quantidade fornecida.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
