---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação da função getLocalizedUrl | intlayer
description: Veja como usar a função getLocalizedUrl para o pacote intlayer
keywords:
  - getLocalizedUrl
  - tradução
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getLocalizedUrl` em `intlayer`

## Descrição

A função `getLocalizedUrl` gera uma URL localizada prefixando a URL fornecida com o idioma especificado. Ela lida com URLs absolutas e relativas, garantindo que o prefixo de idioma correto seja aplicado com base na configuração.

---

## Parâmetros

- `url: string`

  - **Descrição**: A string da URL original a ser prefixada com um idioma.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrição**: O idioma atual para o qual a URL está sendo localizada.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrição**: Array opcional de idiomas suportados. Por padrão, os idiomas configurados no projeto são fornecidos.
  - **Tipo**: `Locales[]`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrição**: O idioma padrão para a aplicação. Por padrão, o idioma padrão configurado no projeto é fornecido.
  - **Tipo**: `Locales`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrição**: Indica se a URL deve ser prefixada para o idioma padrão. Por padrão, o valor configurado no projeto é fornecido.
  - **Tipo**: `boolean`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

### Retorno

- **Tipo**: `string`
- **Descrição**: A URL localizada para o idioma especificado.

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

// Saída: "/fr/about" para o idioma francês
// Saída: "/about" para o idioma padrão (inglês)
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

// Saída: "/fr/about" para o idioma francês
// Saída: "/about" para o idioma padrão (inglês)
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

// Saída: "/fr/about" para o idioma francês
// Saída: "/about" para o idioma padrão (inglês)
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

// Saída: "/fr/about" para o idioma francês
// Saída: "/about" para o idioma padrão (inglês)
```

### URLs Absolutas

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Idioma Atual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Suportados
  Locales.ENGLISH, // Idioma Padrão
  false // Prefixar Idioma Padrão
); // Saída: "https://example.com/fr/about" para o idioma francês

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Idioma Atual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Suportados
  Locales.ENGLISH, // Idioma Padrão
  false // Prefixar Idioma Padrão
); // Saída: "https://example.com/about" para o idioma inglês

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Idioma Atual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Suportados
  Locales.ENGLISH, // Idioma Padrão
  true // Prefixar Idioma Padrão
); // Saída: "https://example.com/en/about" para o idioma inglês
```

### Idioma Não Suportado

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Idioma Atual
  [Locales.ENGLISH, Locales.FRENCH], // Idiomas Suportados
  Locales.ENGLISH // Idioma Padrão
); // Saída: "/about" (nenhum prefixo aplicado para idioma não suportado)
```

---

## Casos Especiais

- **Sem Segmento de Idioma:**

  - Se a URL não contiver nenhum segmento de idioma, a função adiciona com segurança o idioma apropriado.

- **Idioma Padrão:**

  - Quando `prefixDefault` é `false`, a função não adiciona prefixo à URL para o idioma padrão.

- **Idiomas Não Suportados:**
  - Para idiomas não listados em `locales`, a função não aplica nenhum prefixo.

---

## Uso em Aplicações

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é essencial para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como a função `getLocalizedUrl` pode ser usada na configuração de uma aplicação:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuração para idiomas suportados e idioma padrão
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

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH` e `SPANISH` como idiomas suportados e use `ENGLISH` como idioma de fallback.

Usando essa configuração, a função `getLocalizedUrl` pode gerar dinamicamente URLs localizadas com base na preferência de idioma do usuário:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Saída: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Saída: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Saída: "/about"
```

Ao integrar `getLocalizedUrl`, os desenvolvedores podem manter estruturas de URL consistentes em vários idiomas, melhorando tanto a experiência do usuário quanto o SEO.
