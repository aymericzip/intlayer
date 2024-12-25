# Documentação: `getLocalizedUrl` Função em `intlayer`

## Descrição:

A função `getLocalizedUrl` gera uma URL localizada prefixando a URL dada com a localidade especificada. Ela lida com URLs absolutas e relativas, garantindo que o prefixo de localidade correto seja aplicado com base na configuração.

---

## Parâmetros:

- `url: string`

  - **Descrição**: A string da URL original a ser prefixada com uma localidade.
  - **Tipo**: `string`

- `currentLocale: Locales`

  - **Descrição**: A localidade atual para a qual a URL está sendo localizada.
  - **Tipo**: `Locales`

- `locales: Locales[]`

  - **Descrição**: Array opcional de localidades suportadas. Por padrão, as localidades configuradas no projeto são fornecidas.
  - **Tipo**: `Locales[]`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Descrição**: A localidade padrão para a aplicação. Por padrão, a localidade padrão configurada no projeto é fornecida.
  - **Tipo**: `Locales`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Descrição**: Se deve prefixar a URL para a localidade padrão. Por padrão, o valor configurado no projeto é fornecido.
  - **Tipo**: `boolean`
  - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md#middleware)

### Retornos:

- **Tipo**: `string`
- **Descrição**: A URL localizada para a localidade especificada.

---

## Exemplo de Uso:

### URLs Relativas:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Saída: "/fr/about" para a localidade francesa
// Saída: "/about" para a localidade padrão (inglesa)
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

// Saída: "/fr/about" para a localidade francesa
// Saída: "/about" para a localidade padrão (inglesa)
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

// Saída: "/fr/about" para a localidade francesa
// Saída: "/about" para a localidade padrão (inglesa)
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

// Saída: "/fr/about" para a localidade francesa
// Saída: "/about" para a localidade padrão (inglesa)
```

### URLs Absolutas:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Localidade Atual
  [Locales.ENGLISH, Locales.FRENCH], // Localidades Suportadas
  Locales.ENGLISH, // Localidade Padrão
  false // Prefixar Localidade Padrão
); // Saída: "https://example.com/fr/about" para a francesa

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Localidade Atual
  [Locales.ENGLISH, Locales.FRENCH], // Localidades Suportadas
  Locales.ENGLISH, // Localidade Padrão
  false // Prefixar Localidade Padrão
); // Saída: "https://example.com/about" para a inglesa

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Localidade Atual
  [Locales.ENGLISH, Locales.FRENCH], // Localidades Suportadas
  Locales.ENGLISH, // Localidade Padrão
  true // Prefixar Localidade Padrão
); // Saída: "https://example.com/en/about" para a inglesa
```

### Localidade Não Suportada:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Localidade Atual
  [Locales.ENGLISH, Locales.FRENCH], // Localidades Suportadas
  Locales.ENGLISH // Localidade Padrão
); // Saída: "/about" (nenhum prefixo aplicado para localidade não suportada)
```

---

## Casos de Borda:

- **Sem Segmento de Localidade:**

  - Se a URL não contiver nenhum segmento de localidade, a função prefixará com segurança a localidade apropriada.

- **Localidade Padrão:**

  - Quando `prefixDefault` é `false`, a função não prefixa a URL para a localidade padrão.

- **Localidades Não Suportadas:**
  - Para localidades não listadas em `locales`, a função não aplica nenhum prefixo.

---

## Uso em Aplicações:

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é crítico para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como `getLocalizedUrl` pode ser usado na configuração de uma aplicação:

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

Usando essa configuração, a função `getLocalizedUrl` pode gerar URLs localizadas dinamicamente com base na preferência de idioma do usuário:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Saída: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Saída: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Saída: "/about"
```

Ao integrar `getLocalizedUrl`, os desenvolvedores podem manter estruturas de URL consistentes em vários idiomas, melhorando tanto a experiência do usuário quanto o SEO.
