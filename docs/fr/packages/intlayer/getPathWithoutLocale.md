# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description

Supprime le segment de locale de l'URL ou du chemin donné s'il est présent. Il fonctionne avec des URLs absolues et des chemins relatifs.

## Parameters

- `inputUrl: string`

  - **Description**: La chaîne URL complète ou le chemin à traiter.
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: Tableau optionnel des locales prises en charge. Par défaut, il utilise les locales configurées dans le projet.
  - **Type**: `Locales[]`

## Returns

- **Type**: `string`
- **Description**: La chaîne URL ou le chemin sans le segment de locale.

## Example Usage

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Sortie: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Sortie: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Sortie: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Sortie: "https://example.com/dashboard"
```
