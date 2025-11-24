---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Documentação da Função getPrefix | intlayer
description: Veja como usar a função getPrefix para o pacote intlayer
keywords:
  - getPrefix
  - prefixo
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Documentação inicial
---

# Documentação: Função `getPrefix` no `intlayer`

## Descrição

A função `getPrefix` determina o prefixo da URL para um determinado locale com base na configuração do modo de roteamento. Ela compara o locale com o locale padrão e retorna um objeto contendo três formatos diferentes de prefixo para construção flexível de URLs.

**Principais Características:**

- Recebe um locale como primeiro parâmetro (obrigatório)
- Objeto `options` opcional com `defaultLocale` e `mode`
- Retorna um objeto com as propriedades `prefix` e `localePrefix`
- Suporta todos os modos de roteamento: `prefix-no-default`, `prefix-all`, `no-prefix` e `search-params`
- Utilitário leve para determinar quando adicionar prefixos de locale

---

## Assinatura da Função

```typescript
getPrefix(
  locale: Locales,               // Obrigatório
  options?: {                    // Opcional
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // ex: 'fr/' ou ''
  localePrefix?: Locale; // ex: 'fr' ou indefinido
}
```

---

## Parâmetros

- `locale: Locales`
  - **Descrição**: O locale para o qual gerar o prefixo. Se o valor for falsy (undefined, null, string vazia), a função retorna uma string vazia.
  - **Tipo**: `Locales`
  - **Obrigatório**: Sim

- `options?: object`
  - **Descrição**: Objeto de configuração para determinação do prefixo.
  - **Tipo**: `object`
  - **Obrigatório**: Não (Opcional)

  - `options.defaultLocale?: Locales`
    - **Descrição**: O locale padrão para a aplicação. Se não fornecido, usa o locale padrão configurado na configuração do seu projeto.
    - **Tipo**: `Locales`
    - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Descrição**: O modo de roteamento da URL para o tratamento do locale. Se não fornecido, usa o modo configurado na configuração do seu projeto.
    - **Tipo**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Padrão**: [`Configuração do Projeto`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md#middleware)
    - **Modos**:
      - `prefix-no-default`: Retorna strings vazias quando o locale corresponde ao locale padrão
      - `prefix-all`: Retorna prefixo para todos os locales, incluindo o padrão
      - `no-prefix`: Retorna strings vazias (sem prefixo nas URLs)
      - `search-params`: Retorna strings vazias (locale nos parâmetros de consulta)

### Retorna

- **Tipo**: `GetPrefixResult`
- **Descrição**: Um objeto contendo três formatos diferentes de prefixo:
  - `prefix`: O prefixo do caminho com barra no final (ex., `'fr/'`, `''`)
  - `localePrefix`: O identificador do locale sem barras (ex., `'fr'`, `undefined`)

---

## Exemplo de Uso

### Uso Básico

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Verifica o prefixo para o locale inglês
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Retorna: { prefix: 'en/', localePrefix: 'en' }

// Verifica o prefixo para o locale francês
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Retorna: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Retorna: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Retorna: { prefix: '', localePrefix: undefined }
```

### Modos Diferentes de Roteamento

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Sempre retorna prefixo
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Retorna: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Sem prefixo quando o locale coincide com o padrão
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Retorna: { prefix: '', localePrefix: undefined }

// prefix-no-default: Retorna prefixo quando o locale difere do padrão
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Retorna: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Nunca retorna prefixo
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Retorna: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Retorna: { prefix: '', localePrefix: undefined }
```

### Exemplo Prático

```typescript
import { getPrefix, Locales } from "intlayer";

// Construir URLs com o prefixo apropriado para um locale específico
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Usando prefix para construção do caminho
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Resultado: "/fr/about"

// Usando localePrefix para identificação do locale
console.log(`Locale atual: ${localePrefix}`);
// Saída: "Locale atual: fr"
```

---

## Funções Relacionadas

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md): Gera uma URL localizada para um locale específico
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getMultilingualUrls.md): Gera URLs para todos os locales configurados

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // O prefixo do caminho com barra final (ex: 'fr/' ou '')
  localePrefix?: Locale; // O identificador do locale sem barras (ex: 'fr' ou indefinido)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
