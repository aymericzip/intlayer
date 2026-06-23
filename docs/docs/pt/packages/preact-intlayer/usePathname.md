---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação do Hook usePathname | preact-intlayer
description: Veja como usar o hook usePathname do pacote preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalização
  - Documentação
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Adicionar utilitário usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicialização do histórico"
author: aymericzip
---

# Integração Preact: Documentação do Hook `usePathname`

O hook `usePathname` retorna o pathname (caminho) atual do navegador com o segmento da locale removido. Isso é útil para construir uma navegação ciente da locale — por exemplo, determinar qual item de navegação está ativo — sem precisar remover manualmente o prefixo da locale.

## Importando `usePathname` no Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Visão Geral

`usePathname` lê `window.location.pathname`, remove o prefixo da locale por meio da função `getPathWithoutLocale` e re-renderiza o componente sempre que o navegador acionar o evento `popstate` (navegação de voltar/avançar). Ele retorna uma string vazia durante a renderização no lado do servidor (SSR).

## Uso

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

| Tipo     | Descrição                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `string` | O pathname atual sem o prefixo da locale. String vazia durante a renderização no lado do servidor (SSR). |

## Comportamento

- **Remoção da Locale (Locale stripping)**: Remove o segmento inicial correspondente à locale (ex: `/pt/dashboard` → `/dashboard`).
- **Reativo**: Atualiza automaticamente em eventos `popstate` (navegação de voltar / avançar do navegador).
- **Seguro para SSR**: Retorna `""` quando `window` não está disponível.
- **Limpeza (Cleanup)**: O listener do `popstate` é removido automaticamente quando o componente é desmontado.

## Exemplo

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Configurações" },
];

const Sidebar: FunctionComponent = () => {
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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/preact-intlayer/exports.md) — locale atual + seletor de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) — o utilitário principal usado por esse hook
