---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentação da função getLocalizedPath | intlayer
description: Veja como usar a função getLocalizedPath do pacote intlayer
keywords:
  - getLocalizedPath
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
  - getLocalizedPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: "Implementar reescritas de URL personalizadas"
author: aymericzip
---

# Documentação: Função `getLocalizedPath` em `intlayer`

## Descrição

A função `getLocalizedPath` converte um caminho canônico (caminho interno da aplicação) em seu equivalente localizado com base no locale fornecido e nas regras de reescrita. É particularmente útil para gerar URLs amigáveis para SEO que variam por idioma.

É a contrapartida relativa de [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md) — para uma entrada relativa, ambas retornam o mesmo valor. Ao contrário de `getLocalizedUrl`, nunca retorna uma URL absoluta: a configuração `domains` é ignorada, portanto uma locale servida do seu próprio domínio ainda produz um caminho. Uma entrada absoluta é aceita, mas sua origem é descartada — apenas seu caminho, string de consulta e hash são mantidos.

**Recursos principais:**

- Suporta parâmetros de rota dinâmicos usando a sintaxe `[param]`.
- Resolve caminhos de acordo com regras de reescrita personalizadas definidas na sua configuração.
- Lida automaticamente com fallback para o caminho canônico se nenhuma regra de reescrita for encontrada para o locale especificado.

---

## Assinatura da função

```typescript
getLocalizedPath(
  canonicalPath: string,         // Obrigatório
  locale: Locales,               // Obrigatório
  rewriteRules?: RoutingConfig['rewrite'] // Opcional
): string
```

---

## Parâmetros

### Parâmetros obrigatórios

- `canonicalPath: string`
  - **Descrição**: O caminho interno da aplicação (por exemplo, `/about`, `/product/[id]`).
  - **Tipo**: `string`
  - **Obrigatório**: Sim

### Parâmetros Opcionais

- `locale?: Locales`
  - **Description**: O locale de destino para o qual o caminho deve ser localizado.
  - **Type**: `Locales`
  - **Default**: O locale padrão da configuração do seu projeto.

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descrição**: Um objeto que define regras de reescrita personalizadas. Se não for fornecido, assume por padrão a propriedade `routing.rewrite` da configuração do seu projeto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Padrão**: `configuration.routing.rewrite`

  - `options.locales?: Locales[]` — locales suportados. **Padrão**: `configuration.internationalization.locales`
  - `options.defaultLocale?: Locales` — o locale padrão. **Padrão**: `configuration.internationalization.defaultLocale`
  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'` — como o locale aparece no caminho. **Padrão**: `configuration.routing.mode`
  - `options.rewrite?: RoutingConfig['rewrite']` — regras de reescrita personalizadas. **Padrão**: `configuration.routing.rewrite`

---

## Retorna

- **Tipo**: `string`
- **Descrição**: O caminho localizado para o locale especificado.

O tipo é estreitado a partir das regras de reescrita declaradas na sua configuração, portanto o editor mostra o caminho resolvido em vez de uma simples `string`:

```typescript codeFormat="typescript"
// Configuração: modo 'prefix-no-default', defaultLocale 'en',
//                { '/about': { fr: '/a-propos' }, '/product/[id]': { fr: '/produit/[id]' } }
const about = getLocalizedPath("/about", Locales.FRENCH);
//    ^? '/fr/a-propos'
const product = getLocalizedPath("/product/123", Locales.FRENCH);
//    ^? '/fr/produit/123'
const contact = getLocalizedPath("/contact", Locales.FRENCH);
//    ^? '/fr/contact'  (nenhuma regra de reescrita corresponde, apenas o prefixo é aplicado)
const home = getLocalizedPath("/", Locales.FRENCH);
//    ^? '/fr'
```

O mesmo narrowing flui para [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md), que aplica as regras de rewrite antes de prefixar a locale.

Dois casos permanecem ampliados para `string`, porque não podem ser resolvidos em tempo de compilação:

- um caminho que não é um string literal (por exemplo, um construído a partir de uma variável);
- um caminho correspondido por uma regra usando um parâmetro multi-segmento ou opcional (`[...slug]`, `[[...slug]]`, `:param?`).

---

## Exemplo de Uso

### Uso Básico (Com Configuração)

Se você configurou reescritas personalizadas no seu `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuração: { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about", Locales.FRENCH);
// Saída: "/a-propos"

getLocalizedPath("/about", Locales.ENGLISH);
// Saída: "/about"
```

### Uso com Rotas Dinâmicas

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

// Configuração: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getLocalizedPath("/product/123", Locales.FRENCH);
// Saída: "/produit/123"
```

### Regras de Reescrita Manuais

Você também pode passar regras de reescrita manuais para a função:

```typescript codeFormat="typescript"
import { getLocalizedPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getLocalizedPath("/contact", Locales.FRENCH, manualRules);
// Output: "/contactez-nous"
```

### Omitindo a Locale

Quando nenhuma locale é fornecida, o caminho é localizado para a locale padrão configurada:

```typescript codeFormat="typescript"
import { getLocalizedPath } from "intlayer";

// Configuração: defaultLocale = Locales.ENGLISH, { '/about': { en: '/about', fr: '/a-propos' } }
getLocalizedPath("/about");
// Saída: "/about"
```

---

## Funções Relacionadas

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getCanonicalPath.md): Resolve um caminho localizado de volta para o seu caminho canônico interno.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md): Gera uma URL totalmente localizada (incluindo protocolo, host e prefixo de locale).
