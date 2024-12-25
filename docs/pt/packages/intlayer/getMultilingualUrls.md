# Documentação: `getMultilingualUrls` Função em `intlayer`

## Descrição:

A função `getMultilingualUrls` gera um mapeamento de URLs multilíngues prefixando a URL dada com cada locale suportado. Ela pode lidar com URLs absolutas e relativas, aplicando o prefixo apropriado de locale com base na configuração fornecida ou padrões.

---

## Parâmetros:

- `url: string`

  - **Descrição**: A string da URL original a ser prefixada com locales.
  - **Tipo**: `string`

- `locales: Locales[]`

  - **Descrição**: Array opcional de locales suportados. Por padrão, utiliza os locales configurados no projeto.
  - **Tipo**: `Locales[]`
  - **Padrão**: `localesDefault`

- `defaultLocale: Locales`

  - **Descrição**: O locale padrão para a aplicação. Por padrão, utiliza o locale padrão configurado no projeto.
  - **Tipo**: `Locales`
  - **Padrão**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrição**: Se deve prefixar o locale padrão. Por padrão, utiliza o valor configurado no projeto.
  - **Tipo**: `boolean`
  - **Padrão**: `prefixDefaultDefault`

### Retorna:

- **Tipo**: `IConfigLocales<string>`
- **Descrição**: Um objeto mapeando cada locale para sua respectiva URL multilíngue.

---

## Exemplo de Uso:

### URLs Relativas:

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

### URLs Absolutas:

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

## Casos Limite:

- **Sem Segmento de Locale:**

  - A função remove qualquer segmento de locale existente da URL antes de gerar os mapeamentos multilíngues.

- **Locale Padrão:**

  - Quando `prefixDefault` é `false`, a função não prefixa a URL para o locale padrão.

- **Locales Não Suportadas:**
  - Somente os locales fornecidos no array `locales` são considerados para gerar as URLs.

---

## Uso em Aplicações:

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é crítico para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como `getMultilingualUrls` pode ser usado em uma configuração de aplicação:

```tsx codeFormat="typescript"
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

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH` e `SPANISH` como idiomas suportados e utilize `ENGLISH` como idioma de fallback.

Usando esta configuração, a função `getMultilingualUrls` pode gerar dinamicamente mapeamentos de URLs multilíngues com base nos locales suportados da aplicação:

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

Ao integrar `getMultilingualUrls`, os desenvolvedores podem manter estruturas de URL consistentes em vários idiomas, melhorando tanto a experiência do usuário quanto o SEO.
