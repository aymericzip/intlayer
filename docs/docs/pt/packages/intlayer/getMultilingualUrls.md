---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação da Função getMultilingualUrls | intlayer
description: Veja como usar a função getMultilingualUrls para o pacote intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Documentação: Função `getMultilingualUrls` em `intlayer`

## Descrição

A função `getMultilingualUrls` gera um mapeamento de URLs multilíngues prefixando a URL fornecida com cada localidade suportada. Ela pode lidar tanto com URLs absolutas quanto relativas, aplicando o prefixo de localidade apropriado com base na configuração fornecida ou nos padrões.

---

## Assinatura da Função

```typescript
getMultilingualUrls(
  url: string,                   // Obrigatório
  options?: {                    // Opcional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): StrictModeLocaleMap<string>
```

---

## Parâmetros

## Parâmetros

- `url: string`
  - **Descrição**: A string da URL original a ser prefixada com as localidades.
  - **Tipo**: `string`

- `locales: Locales[]`
  - **Descrição**: Array opcional de localidades suportadas. O padrão são as localidades configuradas no projeto.
  - **Tipo**: `Locales[]`
  - **Padrão**: `localesDefault`

- `defaultLocale: Locales`
  - **Descrição**: A localidade padrão para a aplicação. O padrão é a localidade padrão configurada no projeto.
  - **Tipo**: `Locales`
  - **Padrão**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Descrição**: Se deve prefixar a localidade padrão. O padrão é o valor configurado no projeto.
  - **Tipo**: `boolean`
  - **Padrão**: `prefixDefaultDefault`

### Parâmetros Opcionais

- `options?: object`
  - **Description**: Objeto de configuração para comportamento de localização de URL.
  - **Type**: `object`
  - **Required**: Não (Opcional)

  - `options.locales?: Locales[]`
    - **Description**: Array de locales suportados. Se não fornecido, usa os locales configurados da configuração do seu projeto.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: O locale padrão para a aplicação. Se não fornecido, usa o locale padrão configurado da configuração do seu projeto.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: O modo de roteamento de URL para manipulação de locale. Se não fornecido, usa o modo configurado da configuração do seu projeto.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Sem prefixo para o locale padrão, prefixo para todos os outros
      - `prefix-all`: Prefixo para todos os locales incluindo o padrão
      - `no-prefix`: Sem prefixo de locale na URL
      - `search-params`: Usar parâmetros de query para locale (ex: `?locale=fr`)

### Retorno

- **Tipo**: `IConfigLocales<string>`
- **Descrição**: Um objeto que mapeia cada localidade para sua URL multilíngue correspondente.

---

## Exemplo de Uso

### Uso Básico (Usa Configuração do Projeto)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Usa a configuração do seu projeto para locales, defaultLocale e mode
getMultilingualUrls("/dashboard");
// Output (assumindo que a configuração do projeto tem en, fr com mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URLs Relativas

```typescript codeFormat={["typescript", "esm", "commonjs"]}
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

### Diferentes Modos de Roteamento

```typescript
// prefix-no-default: Sem prefixo para locale padrão
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Prefixo para todas as locales
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Output: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Sem prefixo de locale nas URLs
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Output: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale como parâmetro de query
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Output: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Casos Especiais

- **Sem Segmento de Localidade:**
  - A função remove qualquer segmento de localidade existente da URL antes de gerar os mapeamentos multilíngues.

- **Localidade Padrão:**
  - Quando `prefixDefault` é `false`, a função não adiciona prefixo na URL para a localidade padrão.

- **Localidades Não Suportadas:**
  - Apenas as localidades fornecidas no array `locales` são consideradas para gerar as URLs.

---

## Uso em Aplicações

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é fundamental para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como `getMultilingualUrls` pode ser usado na configuração de uma aplicação:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH` e `SPANISH` como idiomas suportados e utilize `ENGLISH` como idioma padrão.

Usando esta configuração, a função `getMultilingualUrls` pode gerar dinamicamente mapeamentos de URLs multilíngues com base nos idiomas suportados pela aplicação:

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

Ao integrar `getMultilingualUrls`, os desenvolvedores podem manter estruturas de URL consistentes em múltiplos idiomas, melhorando tanto a experiência do usuário quanto o SEO.
