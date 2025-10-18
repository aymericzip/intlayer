---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getLocalizedUrl | intlayer
description: Veja como usar a função getLocalizedUrl para o pacote intlayer
keywords:
  - getLocalizedUrl
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação: Função `getLocalizedUrl` em `intlayer`

## Descrição

A função `getLocalizedUrl` gera uma URL localizada prefixando a URL fornecida com o locale especificado. Ela lida tanto com URLs absolutas quanto relativas, garantindo que o prefixo de locale correto seja aplicado com base na configuração.

---

## Parâmetros

- `url: string`

  - **Descrição**: A string da URL original a ser prefixada com um locale.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrição**: O locale atual para o qual a URL está sendo localizada.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrição**: Array opcional de locales suportados. Por padrão, os locales configurados no projeto são fornecidos.
  - **Tipo**: `Locales[]`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrição**: O locale padrão para a aplicação. Por padrão, o locale padrão configurado no projeto é fornecido.
  - **Tipo**: `Locales`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrição**: Indica se deve prefixar a URL para o locale padrão. Por padrão, o valor configurado no projeto é fornecido.
  - **Tipo**: `boolean`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

### Retorno

- **Tipo**: `string`
- **Descrição**: A URL localizada para o locale especificado.

---

## Exemplo de Uso

### URLs Relativas

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Saída: "/fr/about" para o locale francês
// Saída: "/about" para o locale padrão (inglês)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Saída: "/fr/about" para o locale francês
// Saída: "/about" para o locale padrão (inglês)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Saída: "/fr/about" para o locale francês
// Saída: "/about" para o locale padrão (inglês)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Saída: "/fr/about" para o locale francês
// Saída: "/about" para o locale padrão (inglês)
```

### URLs Absolutas

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH, // Locale Padrão
  false // Prefixar Locale Padrão
); // Saída: "https://example.com/fr/about" para o francês

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH, // Locale Padrão
  false // Prefixar Locale Padrão
); // Saída: "https://example.com/about" para o inglês

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH, // Locale Padrão
  true // Prefixar Locale Padrão
); // Saída: "https://example.com/en/about" para o inglês
```

### Locale Não Suportado

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Locale Atual
  [Locales.ENGLISH, Locales.FRENCH], // Locales Suportados
  Locales.ENGLISH // Locale Padrão
); // Saída: "/about" (nenhum prefixo aplicado para locale não suportado)
```

---

## Casos Especiais

- **Sem Segmento de Locale:**

  - Se a URL não contiver nenhum segmento de locale, a função adiciona com segurança o locale apropriado como prefixo.

- **Locale Padrão:**

  - Quando `prefixDefault` é `false`, a função não adiciona prefixo à URL para o locale padrão.

- **Locales Não Suportados:**
  - Para locales não listados em `locales`, a função não aplica nenhum prefixo.

---

## Uso em Aplicações

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é fundamental para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como `getLocalizedUrl` pode ser usado na configuração de uma aplicação:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuração para os locales suportados e locale padrão
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH` e `SPANISH` como idiomas suportados e utilize `ENGLISH` como idioma padrão.

Usando essa configuração, a função `getLocalizedUrl` pode gerar URLs localizadas dinamicamente com base na preferência de idioma do usuário:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Saída: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Saída: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Saída: "/about"
```

Ao integrar `getLocalizedUrl`, os desenvolvedores podem manter estruturas de URL consistentes em múltiplos idiomas, melhorando tanto a experiência do usuário quanto o SEO.
