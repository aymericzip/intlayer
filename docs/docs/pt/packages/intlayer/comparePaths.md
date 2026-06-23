---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação da função comparePaths | intlayer
description: Veja como usar a função comparePaths para o pacote intlayer
keywords:
  - comparePaths
  - normalizePath
  - link ativo
  - navegação
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Documentação inicial"
author: aymericzip
---

# Documentação: Função `comparePaths` em `intlayer`

## Descrição

A função `comparePaths` compara duas URLs ou caminhos para verificar sua igualdade, ignorando o segmento de locale, o protocolo/host, a query string, o hash e as barras finais (trailing slashes). É a maneira recomendada de determinar se um link de navegação aponta para a página atual — por exemplo, para destacar o link ativo — sem ter que criar sua própria lógica de normalização (sujeita a erros).

Internamente, ela reutiliza [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) para remover o segmento de locale, de modo que respeita o modo de roteamento e os locales configurados.

O pacote também exporta o utilitário subjacente [`normalizePath`](#normalizepath), que retorna o caminho canônico e independente de locale usado para a comparação.

**Principais Características:**

- Comparação independente de locale (`/pt/about` corresponde a `/about`)
- Funciona com URLs absolutas e caminhos relativos
- Ignora query string, hash e barras finais
- Tolera a ausência de barras iniciais e valores vazios (normalizado para `/`)
- Leve — construído sobre `getPathWithoutLocale`

---

## Assinatura da Função

```typescript
comparePaths(
  pathname: string,  // Obrigatório
  href: string,      // Obrigatório
  locales?: Locales[] // Opcional
): boolean

normalizePath(
  inputUrl: string,   // Obrigatório
  locales?: Locales[] // Opcional
): string
```

---

## Parâmetros

- `pathname: string`
  - **Descrição**: A primeira string de URL ou caminho a ser comparada (geralmente o caminho atual).
  - **Tipo**: `string`
  - **Obrigatório**: Sim

- `href: string`
  - **Descrição**: A segunda string de URL ou caminho a ser comparada (geralmente o `href` de um link de navegação).
  - **Tipo**: `string`
  - **Obrigatório**: Sim

- `locales: Locales[]`
  - **Descrição**: Array opcional de locales suportados. Por padrão, os locales configurados no projeto.
  - **Tipo**: `Locales[]`
  - **Obrigatório**: Não (Opcional)

### Retorno

- **Tipo**: `boolean`
- **Descrição**: `true` quando ambas as entradas resolvem para o mesmo caminho independente de locale, caso contrário `false`.

---

## Exemplo de Uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### URLs absolutas e relativas

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Destacando o link de navegação ativo

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` retorna o caminho canônico e independente de locale usado por `comparePaths`. Ele remove o segmento de locale, o protocolo/host, a query string e o hash, garante uma única barra inicial, remove qualquer barra final (exceto para a raiz) e usa `/` como fallback para valores vazios.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Funções Relacionadas

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md): Remove o segmento de locale de uma URL ou caminho.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPrefix.md): Determina o prefixo da URL para um dado locale.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md): Gera uma URL localizada para um locale específico.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
