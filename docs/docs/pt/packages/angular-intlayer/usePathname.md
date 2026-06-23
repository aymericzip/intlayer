---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação do Hook usePathname | angular-intlayer
description: Veja como usar o hook usePathname no pacote angular-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalização
  - Documentação
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Adicionado utilitário usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicialização do histórico"
author: aymericzip
---

# Integração Angular: Documentação do Hook `usePathname`

O hook `usePathname` retorna o caminho (pathname) atual do navegador com o segmento de localidade removido, na forma de um `Signal<string>` do Angular. Ele é útil para criar navegação sensível à localidade — por exemplo, para determinar qual item de navegação está ativo — sem precisar remover o prefixo da localidade manualmente.

## Importando `usePathname` no Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Visão Geral

O `usePathname` lê o `window.location.pathname`, remove o prefixo de localidade via `getPathWithoutLocale` e atualiza o sinal sempre que o navegador aciona um evento `popstate` (navegação para trás/frente). Ele utiliza o `DestroyRef` do Angular para limpar automaticamente o ouvinte de eventos quando o componente é destruído.

## Uso

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Valor de Retorno

| Tipo             | Descrição                                                               |
| ---------------- | ----------------------------------------------------------------------- |
| `Signal<string>` | Sinal do Angular contendo o pathname atual sem o prefixo da localidade. |

## Comportamento

- **Remoção da localidade**: Remove o segmento inicial de localidade (ex. `/pt/dashboard` → `/dashboard`).
- **Reativo**: Atualiza automaticamente em eventos `popstate` (navegação de voltar/avançar no navegador).
- **Seguro em SSR**: Retorna `""` quando `window` não está disponível.
- **Limpeza**: O ouvinte de `popstate` é removido via `DestroyRef.onDestroy` quando o componente pai é destruído.

## Exemplo

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Configurações" },
  ];

  readonly pathname = usePathname();
}
```

## Relacionados

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/angular-intlayer/exports.md) — localidade atual + alternador de localidade
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) — o utilitário principal usado por este hook
