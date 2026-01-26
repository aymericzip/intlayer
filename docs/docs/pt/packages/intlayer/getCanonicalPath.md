---
createdAt: 2026-01-22
updatedAt: 2026-01-22
title: Documentação da função getCanonicalPath | intlayer
description: Veja como usar a função getCanonicalPath do pacote intlayer
keywords:
  - getCanonicalPath
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
  - getCanonicalPath
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: Implementar reescritas de URL personalizadas
---

# Documentação da função `getCanonicalPath` em `intlayer`

## Descrição

A função `getCanonicalPath` resolve um caminho de URL localizado (por exemplo, `/a-propos`) de volta para o seu caminho canônico interno da aplicação (por exemplo, `/about`). Isto é essencial para que os routers correspondam à rota interna correta independentemente do idioma da URL.

**Principais funcionalidades:**

- Suporta parâmetros de rota dinâmicos usando a sintaxe `[param]`.
- Compara caminhos localizados com regras de reescrita personalizadas definidas na sua configuração.
- Retorna o caminho original caso nenhuma regra de reescrita correspondente seja encontrada.

---

## Assinatura da Função

```typescript
getCanonicalPath(
  localizedPath: string,         // Obrigatório
  locale: Locales,               // Obrigatório
  rewriteRules?: RoutingConfig['rewrite'] // Opcional
): string
```

---

## Parâmetros

### Parâmetros obrigatórios

- `localizedPath: string`
  - **Descrição**: O caminho localizado conforme visto no navegador (por exemplo, `/a-propos`).
  - **Tipo**: `string`
  - **Obrigatório**: Sim

- `locale: Locales`
  - **Descrição**: A locale usada para o caminho que está sendo resolvido.
  - **Tipo**: `Locales`
  - **Obrigatório**: Sim

### Parâmetros Opcionais

- `rewriteRules?: RoutingConfig['rewrite']`
  - **Descrição**: Um objeto que define regras de reescrita personalizadas. Se não fornecido, ele usa por padrão a propriedade `routing.rewrite` da configuração do seu projeto.
  - **Tipo**: `RoutingConfig['rewrite']`
  - **Padrão**: `configuration.routing.rewrite`

---

## Retorno

- **Tipo**: `string`
- **Descrição**: O caminho canônico interno.

---

## Exemplo de Uso

### Uso Básico (Com Configuração)

Se você configurou reescritas personalizadas no seu `intlayer.config.ts`:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuração: { '/about': { en: '/about', fr: '/a-propos' } }
getCanonicalPath("/a-propos", Locales.FRENCH);
// Saída: "/about"

getCanonicalPath("/about", Locales.ENGLISH);
// Saída: "/about"
```

### Uso com Rotas Dinâmicas

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

// Configuração: { '/product/[id]': { en: '/product/[id]', fr: '/produit/[id]' } }
getCanonicalPath("/produit/123", Locales.FRENCH);
// Saída: "/product/123"
```

### Regras manuais de reescrita

Você também pode passar regras manuais de reescrita para a função:

```typescript codeFormat="typescript"
import { getCanonicalPath, Locales } from "intlayer";

const manualRules = {
  "/contact": {
    en: "/contact-us",
    fr: "/contactez-nous",
  },
};

getCanonicalPath("/contactez-nous", Locales.FRENCH, manualRules);
// Output: "/contact"
```

---

## Funções relacionadas

- [`getLocalizedPath`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedPath.md): Resolve um caminho canônico para o seu equivalente localizado.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md): Gera uma URL totalmente localizada (incluindo protocolo, host e prefixo de locale).
