# Documentação: Funções `getPathWithoutLocale` em `intlayer`

## Descrição

Remove o segmento de localidade da URL ou caminho fornecido, se presente. Funciona com URLs absolutas e caminhos relativos.

## Parâmetros

- `inputUrl: string`

  - **Descrição**: A string completa da URL ou caminho a ser processada.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrição**: Array opcional de localidades suportadas. Por padrão, utiliza as localidades configuradas no projeto.
  - **Tipo**: `Locales[]`

## Retorno

- **Tipo**: `string`
- **Descrição**: A string da URL ou caminho sem o segmento de localidade.

## Exemplo de Uso

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/pt/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/pt/dashboard")); // Saída: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/pt/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/pt/dashboard")); // Saída: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/pt/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/pt/dashboard")); // Saída: "https://example.com/dashboard"
```
