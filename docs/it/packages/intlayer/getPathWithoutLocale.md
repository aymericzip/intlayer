# Documentazione: `getPathWithoutLocale` Funzioni in `intlayer`

## Descrizione:

Rimuove il segmento della locale dall'URL o dal pathname fornito se presente. Funziona sia con URL assoluti che con pathnames relativi.

## Parametri:

- `inputUrl: string`

  - **Descrizione**: La stringa URL completa o il pathname da elaborare.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrizione**: Array opzionale di locali supportati. Per impostazione predefinita si basa sulle locali configurate nel progetto.
  - **Tipo**: `Locales[]`

## Restituisci:

- **Tipo**: `string`
- **Descrizione**: La stringa URL o il pathname senza il segmento della locale.

## Esempio di utilizzo:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```
