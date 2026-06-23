---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentação da função usePathname | vue-intlayer
description: Aprenda a usar a função usePathname do pacote vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacionalização
  - Documentação
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Integração Vue: Documentação de `usePathname`

A função `usePathname` retorna o pathname atual do navegador com o segmento da locale removido, na forma de uma `ComputedRef<string>` do Vue. Isto é útil para construir uma navegação sensível à locale — por exemplo, determinar que item de navegação está ativo — sem ter de remover o prefixo de locale manualmente.

## Importar `usePathname` no Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Visão Geral

`usePathname` cria uma referência computada (computed ref) do Vue que lê `window.location.pathname`, remove o prefixo da locale usando `getPathWithoutLocale` e atualiza o seu valor sempre que o navegador aciona um evento `popstate` (navegação para trás/para a frente). O valor pode ser utilizado diretamente nos seus templates Vue ou em funções de setup.

## Uso

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Valor Retornado

| Tipo                  | Descrição                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Referência computada do Vue contendo o pathname atual do navegador sem o prefixo da locale. |

## Comportamento

- **Remoção de Locale**: Remove o segmento inicial da locale (ex. `/pt/dashboard` → `/dashboard`).
- **Reativo**: Atualiza o valor a cada evento `popstate` (navegação retroceder / avançar do navegador).
- **Seguro em SSR**: Retorna `""` quando `window` não está disponível.
- **Limpeza (Cleanup)**: O event listener de `popstate` é adicionado globalmente ao inicializar e normalmente não necessita de limpeza manual por componente, devido à forma como o Vue gere o ciclo de vida.

## Exemplo

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Painel Principal" },
  { href: "/settings", label: "Definições" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Relacionado

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vue-intlayer/useLocale.md) — locale atual + alternador de locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) — utilitário subjacente usado por este hook
