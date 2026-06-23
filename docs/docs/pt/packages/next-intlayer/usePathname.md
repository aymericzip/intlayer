---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação do Hook usePathname | next-intlayer
description: Saiba como usar o hook usePathname para o pacote next-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Utilitário usePathname adicionado"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicialização do histórico"
author: aymericzip
---

# Integração Next.js: Documentação do Hook `usePathname`

O hook `usePathname` retorna o pathname atual do Next.js sem o segmento da localidade. Isso é útil para construir uma navegação ciente da localidade — por exemplo, determinar qual item de navegação está ativo — sem ter que remover manualmente o prefixo da localidade.

## Importando `usePathname` no Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Visão Geral

O `usePathname` envolve o `usePathname()` embutido do Next.js de `next/navigation`, anexa quaisquer parâmetros de busca (search params) e remove o prefixo da localidade através do `getPathWithoutLocale`. Ele aciona uma re-renderização em cada navegação do lado do cliente. O hook está disponível apenas em Client Components (requer `"use client"`).

## Uso

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Valor de Retorno

| Tipo     | Descrição                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------ |
| `string` | O caminho atual sem o prefixo da localidade e sem os parâmetros de consulta relacionados à localidade. |

## Comportamento

- **Remoção da localidade**: Remove o segmento líder da localidade (ex: `/pt/dashboard` → `/dashboard`).
- **Remoção de parâmetros de busca**: Também remove um parâmetro de consulta `?locale=...` quando o modo de roteamento baseado em parâmetros de pesquisa é utilizado.
- **Reativo**: Atualiza automaticamente a cada navegação do lado do cliente via Next.js App Router.
- **Seguro para SSR**: Retorna o caminho do lado do servidor durante a primeira renderização e, em seguida, sincroniza os parâmetros de busca no cliente.

## Comparação com `useLocale`

O `useLocale` do `next-intlayer` já expõe `pathWithoutLocale` como parte de seu valor de retorno. Use `usePathname` quando você só precisa do caminho e não da funcionalidade de alternar o idioma.

```tsx codeFormat={["typescript", "esm"]}
// Quando você precisa tanto do estado da localidade quanto do caminho:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Quando você só precisa do caminho:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Exemplo

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Painel" },
  { href: "/settings", label: "Configurações" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## Relacionados

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useLocale.md) — localidade atual + alternador de localidade (também expõe `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) — o utilitário subjacente usado por este hook
