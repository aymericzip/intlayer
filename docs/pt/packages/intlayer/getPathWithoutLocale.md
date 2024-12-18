# Documentação: `getPathWithoutLocale` Funções em `intlayer`

## Descrição:

Remove o segmento de localidade da URL ou caminho dado, se presente. Funciona tanto com URLs absolutas quanto com caminhos relativos.

## Parâmetros:

- `inputUrl: string`

  - **Descrição**: A string da URL completa ou caminho a ser processado.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrição**: Array opcional de locais suportados. Padrão para os locais configurados no projeto.
  - **Tipo**: `Locales[]`

## Retornos:

- **Tipo**: `string`
- **Descrição**: A string da URL ou caminho sem o segmento de localidade.

## Exemplo de Uso:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/pt/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Saída: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/pt/dashboard")); // Saída: "https://example.com/dashboard"
```
