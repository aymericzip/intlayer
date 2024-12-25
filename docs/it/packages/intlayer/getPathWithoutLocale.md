# Documentazione: `getPathWithoutLocale` Funzioni in `intlayer`

## Descrizione:

Rimuove il segmento locale dall'URL o dal percorso fornito se presente. Funziona sia con URL assoluti che con percorsi relativi.

## Parametri:

- `inputUrl: string`

  - **Descrizione**: La stringa dell'URL completo o del percorso da elaborare.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrizione**: Array opzionale di locali supportati. Predefinito ai locali configurati nel progetto.
  - **Tipo**: `Locales[]`

## Restituisce:

- **Tipo**: `string`
- **Descrizione**: La stringa dell'URL o del percorso senza il segmento locale.

## Esempio di utilizzo:

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```
