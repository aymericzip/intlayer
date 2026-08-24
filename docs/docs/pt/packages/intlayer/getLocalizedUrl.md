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
    changes: "Histórico inicial"
author: aymericzip
---

# Documentação: Função `getLocalizedUrl` em `intlayer`

## Descrição

A função `getLocalizedUrl` gera uma URL localizada ao prefixar a URL fornecida com a localidade especificada. Ela lida com URLs absolutas e relativas, garantindo que o prefixo de localidade correto seja aplicado com base na configuração.

**Características principais:**

- Apenas 2 parâmetros são obrigatórios: `url` e `currentLocale`
- Objeto `options` opcional com `locales`, `defaultLocale` e `mode`
- Usa a configuração de internacionalização do seu projeto como padrões
- Pode ser usado com parâmetros mínimos para casos simples ou totalmente customizado para cenários complexos
- Suporta múltiplos modos de roteamento: `prefix-no-default`, `prefix-all`, `no-prefix` e `search-params`

---

## Assinatura da Função

```typescript
getLocalizedUrl(
  url: string,                   // Obrigatório
  currentLocale: Locales,        // Obrigatório
  options?: {                    // Opcional
    locales?: Locales[];
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): string
```

---

## Parâmetros

### Parâmetros Obrigatórios

- `url: string`
  - **Description**: A string de URL original a ser prefixada com um locale.
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: O locale atual para o qual a URL está sendo localizada.
  - **Type**: `Locales`
  - **Required**: Yes

### Parâmetros Opcionais

- `options?: object`
  - **Description**: Objeto de configuração para o comportamento de localização de URL.
  - **Type**: `object`
  - **Required**: Não (Opcional)

  - `options.locales?: Locales[]`
    - **Description**: Array de locales suportados. Se não fornecido, usa os locales configurados na configuração do seu projeto.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: O locale padrão para a aplicação. Se não fornecido, usa o locale padrão configurado na configuração do seu projeto.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: O modo de roteamento de URL para o tratamento de locale. Se não fornecido, usa o modo configurado na configuração do seu projeto.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Sem prefixo para o locale padrão, prefixo para todos os outros
      - `prefix-all`: Prefixo para todos os locales, incluindo o padrão
      - `no-prefix`: Sem prefixo de locale na URL
      - `search-params`: Usa parâmetros de query para locale (ex: `?locale=fr`)

### Retorno

- **Tipo**: `string`
- **Descrição**: A URL localizada para o locale especificado.

---

## Exemplo de Uso

### Uso Básico (Apenas Parâmetros Obrigatórios)

Quando você configurou seu projeto com definições de internacionalização, você pode usar a função com apenas os parâmetros obrigatórios:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// Usa a configuração do seu projeto para locales, defaultLocale e mode
getLocalizedUrl("/about", Locales.FRENCH);
// Saída: "/fr/about" (assumindo que francês é suportado e mode é 'prefix-no-default')

getLocalizedUrl("/about", Locales.ENGLISH);
// Saída: "/about" ou "/en/about" (dependendo da sua configuração de mode)
```

### Uso Avançado (Com Parâmetros Opcionais)

Você pode sobrescrever a configuração padrão fornecendo o parâmetro opcional `options`:

### URLs Relativas

```typescript codeFormat={["typescript", "esm"]}
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

### Sobrescrita Parcial de Configuração

Você também pode fornecer apenas alguns dos parâmetros opcionais. A função usará a configuração do seu projeto para qualquer parâmetro que você não especificar:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Apenas sobrescreva as locales, use a config do projeto para defaultLocale e mode
getLocalizedUrl("/about", Locales.SPANISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
});

// Apenas sobrescreva mode, use a config do projeto para locales e defaultLocale
getLocalizedUrl("/about", Locales.ENGLISH, {
  mode: "prefix-all", // Força prefixo para todas as locales incluindo padrão
});

// Sobrescreva múltiplas opções
getLocalizedUrl("/about", Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "search-params", // Use parâmetros de query: /about?locale=fr
});
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

- **Modos de Roteamento:**
  - `'prefix-no-default'`: Local padrão sem prefixo, outros com prefixo (ex: `/about`, `/fr/about`)
  - `'prefix-all'`: Todos os locais com prefixos (ex: `/en/about`, `/fr/about`)
  - `'no-prefix'`: Sem prefixos de locale nas URLs (locale tratado em outro lugar)
  - `'search-params'`: Locale especificado via parâmetro de query (ex: `/about?locale=fr`)

---

## Uso em Aplicações

Em uma aplicação multilíngue, configurar as definições de internacionalização com `locales` e `defaultLocale` é fundamental para garantir que o idioma correto seja exibido. Abaixo está um exemplo de como `getLocalizedUrl` pode ser usado na configuração de uma aplicação:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

A configuração acima garante que a aplicação reconheça `ENGLISH`, `FRENCH` e `SPANISH` como idiomas suportados e utilize `ENGLISH` como idioma padrão.

Usando essa configuração, a função `getLocalizedUrl` pode gerar URLs localizadas dinamicamente com base na preferência de idioma do usuário:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Saída: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Saída: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Saída: "/about"
```

Ao integrar `getLocalizedUrl`, os desenvolvedores podem manter estruturas de URL consistentes em múltiplos idiomas, melhorando tanto a experiência do usuário quanto o SEO.
