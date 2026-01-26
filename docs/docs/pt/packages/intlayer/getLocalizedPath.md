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
    changes: Implementar reescritas de URL personalizadas
---

# Documentação: Função `getLocalizedPath` em `intlayer`

## Descrição

A função `getLocalizedPath` converte um caminho canônico (caminho interno da aplicação) em seu equivalente localizado com base no locale fornecido e nas regras de reescrita. É particularmente útil para gerar URLs amigáveis para SEO que variam por idioma.

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

- `locale: Locales`
  - **Descrição**: O locale alvo para o qual o caminho deve ser localizado.
  - **Tipo**: `Locales`
  - **Obrigatório**: Sim

### Parâmetros Opcionais

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descrição**: Um objeto que define regras de reescrita personalizadas. Se não for fornecido, assume por padrão a propriedade `routing.rewrite` da configuração do seu projeto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Padrão**: `configuration.routing.rewrite`

---

## Retorna

- **Tipo**: `string`
- **Descrição**: O caminho localizado para o locale especificado.

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

---

## Funções Relacionadas

- [`getCanonicalPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getCanonicalPath.md): Resolve um caminho localizado de volta para o seu caminho canônico interno.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md): Gera uma URL totalmente localizada (incluindo protocolo, host e prefixo de locale).
