---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação do Hook usePathname | solid-intlayer
description: Veja como utilizar o hook usePathname do pacote solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalização
  - Documentação
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Adicionar o utilitário usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Integração com Solid: Documentação do Hook `usePathname`

O hook `usePathname` retorna o pathname do navegador atual com o segmento de locale removido, na forma de um `Accessor<string>` do Solid. É útil para a navegação com reconhecimento de locale — por exemplo, determinar qual item de navegação está ativo — sem a necessidade de remover manualmente o prefixo de locale.

## Importando `usePathname` no Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Visão Geral

O `usePathname` cria um sinal reativo inicializado a partir de `window.location.pathname`, remove o prefixo do locale via `getPathWithoutLocale` e atualiza o sinal sempre que o navegador aciona um evento `popstate` (navegação avançar/voltar). O ouvinte de evento é limpo automaticamente via `onCleanup`.

## Uso

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Valor de Retorno

| Tipo               | Descrição                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor do Solid (getter reativo) que retorna o pathname atual sem o prefixo do locale. |

## Comportamento

- **Remoção de Locale**: Remove o segmento inicial do locale (ex. `/pt/dashboard` → `/dashboard`).
- **Reativo**: Atualiza automaticamente em eventos `popstate` (navegação voltar/avançar no navegador).
- **Seguro em SSR**: Retorna `""` quando o `window` não está disponível.
- **Limpeza**: O ouvinte `popstate` é removido automaticamente por meio do `onCleanup` do Solid.

## Exemplo

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Configurações" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useLocale.md) — locale atual + alternador de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) — utilitário subjacente usado por este hook
