---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getMultilingualUrls.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da função getMultilingualUrls | intlayer
description: Veja como usar a função getMultilingualUrls para o pacote intlayer
keywords:
  - getMultilingualUrls
  - tradução
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

# Documentação: Função `getMultilingualUrls` em `intlayer`

## Descrição

A função `getMultilingualUrls` gera um mapeamento de URLs multilíngues prefixando a URL fornecida com cada localidade suportada. Ela pode lidar com URLs absolutas e relativas, aplicando o prefixo de localidade apropriado com base na configuração fornecida ou nos padrões.

---

## Parâmetros

- `url: string`

  - **Descrição**: A URL original a ser prefixada com localidades.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descrição**: Array opcional de localidades suportadas. Padrão para as localidades configuradas no projeto.
  - **Tipo**: `Locales[]`
  - **Padrão**: `localesDefault`

- `defaultLocale: Locales`

  - **Descrição**: A localidade padrão para a aplicação. Padrão para a localidade padrão configurada no projeto.
  - **Tipo**: `Locales`
  - **Padrão**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrição**: Indica se deve prefixar a localidade padrão. Padrão para o valor configurado no projeto.
  - **Tipo**: `boolean`
  - **Padrão**: `prefixDefaultDefault`

### Retornos

- **Tipo**: `IConfigLocales<string>`
- **Descrição**: Um objeto mapeando cada localidade para sua correspondente URL multilíngue.

---

## Exemplo de Uso

### URLs Relativas

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Saída: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Saída: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Saída: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URLs Absolutas

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Saída: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Casos de Borda

- **Sem Segmento de Localidade:**

  - A função remove qualquer segmento de localidade existente na URL antes de gerar os mapeamentos multilíngues.

- **Localidade Padrão:**

  - Quando `prefixDefault` é `false`, a função não prefixa a URL para a localidade padrão.

- **Localidades Não Suportadas:**
  - Apenas as localidades fornecidas no array `locales` são consideradas para gerar as URLs.

---

## Uso em Aplicações

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é fundamental para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como a função `getMultilingualUrls` pode ser usada na configuração de uma aplicação:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Configuração para localidades suportadas e localidade padrão
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

Usando essa configuração, a função `getMultilingualUrls` pode gerar dinamicamente mapeamentos de URLs multilíngues com base nas localidades suportadas pela aplicação:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Saída:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Saída:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Ao integrar `getMultilingualUrls`, os desenvolvedores podem manter estruturas de URLs consistentes em vários idiomas, melhorando tanto a experiência do usuário quanto o SEO.
