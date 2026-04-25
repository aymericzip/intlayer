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
---

# Documentação: Função `getMultilingualUrls` em `intlayer`

## Descrição

A função `getMultilingualUrls` gera um mapeamento de URLs multilíngues prefixando a URL fornecida com cada localidade suportada. Ela pode lidar tanto com URLs absolutas quanto relativas, aplicando o prefixo de localidade apropriado com base na configuração fornecida ou nos padrões.

---

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

### Retorno

- **Tipo**: `IConfigLocales<string>`
- **Descrição**: Um objeto que mapeia cada localidade para sua URL multilíngue correspondente.

---

## Exemplo de Uso

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
