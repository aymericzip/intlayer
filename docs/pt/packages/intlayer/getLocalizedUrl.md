# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description:

A função `getLocalizedUrl` gera uma URL localizada prefixando a URL fornecida com o locale especificado. Lida tanto com URLs absolutas quanto relativas, garantindo que o prefixo de locale correto seja aplicado com base na configuração.

---

## Parameters:

- `url: string`

  - **Description**: A string de URL original a ser prefixada com um locale.
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: O locale atual para o qual a URL está sendo localizada.
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: Array opcional de locales suportados. Por padrão, os locales configurados no projeto são fornecidos.
  - **Type**: `Locales[]`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: O locale padrão para a aplicação. Por padrão, o locale padrão configurado no projeto é fornecido.
  - **Type**: `Locales`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: Se deve prefixar a URL para o locale padrão. Por padrão, o valor configurado no projeto é fornecido.
  - **Type**: `boolean`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#middleware)

### Returns:

- **Type**: `string`
- **Description**: A URL localizada para o locale especificado.

---

## Example Usage:

### Relative URLs:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" para o locale Francês
// Output: "/about" para o default (Inglês)
```

### Absolute URLs:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH, // Locale Padrão
  false // Prefixar Locale Padrão
); // Output: "https://example.com/fr/about" para o Francês

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH, // Locale Padrão
  false // Prefixar Locale Padrão
); // Output: "https://example.com/about" para o Inglês

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH, // Locale Padrão
  true // Prefixar Locale Padrão
); // Output: "https://example.com/en/about" para o Inglês
```

### Unsupported Locale:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH // Locale Padrão
); // Output: "/about" (sem prefixo aplicado para locale não suportado)
```

---

## Edge Cases:

- **No Locale Segment:**

  - Se a URL não contiver nenhum segmento de locale, a função prefixa com segurança o locale apropriado.

- **Default Locale:**

  - Quando `prefixDefault` é `false`, a função não prefixa a URL para o locale padrão.

- **Unsupported Locales:**
  - Para locales não listadas em `locales`, a função não aplica nenhum prefixo.

---

## Usage in Applications:

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é crítico para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como `getLocalizedUrl` pode ser usado em uma configuração de aplicação:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// Configuração para locales suportados e locale padrão
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH`, e `SPANISH` como idiomas suportados e utilize `ENGLISH` como o idioma de fallback.

Usando esta configuração, a função `getLocalizedUrl` pode gerar dinamicamente URLs localizadas com base na preferência de idioma do usuário:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

Integrando `getLocalizedUrl`, os desenvolvedores podem manter estruturas de URL consistentes em múltiplas línguas, melhorando tanto a experiência do usuário quanto o SEO.
