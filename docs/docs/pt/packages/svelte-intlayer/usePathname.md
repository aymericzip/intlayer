---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação da Função usePathname | svelte-intlayer
description: Veja como usar a função usePathname do pacote svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalização
  - Documentação
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Adicionar utilitário usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicializar histórico"
author: aymericzip
---

# Integração com Svelte: Documentação da `usePathname`

A função `usePathname` retorna o pathname atual do navegador com o segmento da locale removido, como um store Svelte `Readable<string>`. É útil para construir navegação com reconhecimento de locale — por exemplo, determinar qual item de navegação está ativo — sem ter que remover o prefixo da locale manualmente.

## Importando `usePathname` no Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Visão Geral

`usePathname` cria um store legível Svelte que lê `window.location.pathname`, remove o prefixo da locale através de `getPathWithoutLocale`, e emite um novo valor sempre que o navegador dispara um evento `popstate` (navegação voltar/avançar). Subscreva com a sintaxe de store `$` em componentes.

## Uso

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Valor de Retorno

| Tipo               | Descrição                                                                  |
| ------------------ | -------------------------------------------------------------------------- |
| `Readable<string>` | Store legível do Svelte contendo o pathname atual sem o prefixo da locale. |

## Comportamento

- **Remoção da locale**: Remove o segmento inicial da locale (ex: `/pt/dashboard` → `/dashboard`).
- **Reativo**: Emite um novo valor a cada evento `popstate` (navegação de voltar/avançar do navegador).
- **Seguro para SSR**: Retorna `""` quando `window` não está disponível.
- **Limpeza**: O listener de `popstate` é removido automaticamente quando o último subscritor se desinscreve.

## Exemplo

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Configurações" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/svelte-intlayer/useLocale.md) — locale atual + seletor de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) — o utilitário subjacente usado por este hook
