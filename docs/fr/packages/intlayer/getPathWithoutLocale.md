# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description:

Supprime le segment de la locale de l'URL ou du chemin donné si présent. Il fonctionne avec des URLs absolues et des chemins relatifs.

## Parameters:

- `inputUrl: string`

  - **Description**: La chaîne URL complète ou le chemin à traiter.
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: Tableau facultatif des locales supportées. Par défaut, il utilise les locales configurées dans le projet.
  - **Type**: `Locales[]`

## Returns:

- **Type**: `string`
- **Description**: La chaîne URL ou le chemin sans le segment de la locale.

## Example Usage:

```typescript
import { getPathWithoutLocale } from "intlayer";

// Échantillon de code
console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```
