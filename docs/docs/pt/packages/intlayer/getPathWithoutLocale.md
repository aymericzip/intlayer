---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getPathWithoutLocale | intlayer
description: Veja como usar a função getPathWithoutLocale do pacote intlayer
keywords:
  - getPathWithoutLocale
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getPathWithoutLocale` em `intlayer`

## Descrição

Remove o segmento de localidade (locale) da URL ou pathname fornecido, se presente. Funciona tanto com URLs absolutas quanto com pathnames relativos.

## Parâmetros

- `inputUrl: string`

  - **Descrição**: A string completa da URL ou pathname a ser processada.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrição**: Array opcional de locais suportados. Por padrão, utiliza os locais configurados no projeto.
  - **Tipo**: `Locales[]`

## Retorno

- **Tipo**: `string`
- **Descrição**: A string da URL ou pathname sem o segmento de localidade (locale).

## Exemplo de Uso

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Saída: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Saída: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Saída: "https://example.com/dashboard"
```

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
