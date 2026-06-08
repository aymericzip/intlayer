---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentação do Composable useRewriteURL
description: Composable específico para Vue para gerir reescritas de URLs localizadas no Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

O composable `useRewriteURL` para Vue 3 foi concebido para tratar reescritas de URLs localizadas no lado do cliente. Corrige automaticamente a URL do navegador para a sua versão localizada "mais bonita" com base na locale atual do utilizador e na configuração em `intlayer.config.ts`.

Funciona usando `window.history.replaceState`, o que evita desencadear navegações indesejadas do Vue Router.

## Uso

Chame o composable dentro da sua função `setup()` ou em `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Corrige automaticamente /fr/tests para /fr/essais na barra de endereços se existir uma regra de reescrita
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Como funciona

1. **Monitoramento reativo**: O composable configura um `watch` sobre o `locale` do utilizador.
2. **Correspondência de reescrita**: Sempre que o `locale` muda (ou ao montar), verifica se o `window.location.pathname` atual corresponde a uma rota canónica que tem um alias localizado mais legível.
3. **Correção da URL**: Se for encontrado um alias mais legível, o composable chama `window.history.replaceState` para atualizar a barra de endereços sem recarregar a página nem perder o estado do router.

## Por que usá-lo?

- **SEO Optimization**: Garante que os motores de busca indexem a versão localizada autorizada das suas URLs.
- **Melhoria de UX**: Corrige URLs inseridas manualmente para refletir a sua nomenclatura preferida (por exemplo, `/fr/a-propos` em vez de `/fr/about`).
- **Baixa sobrecarga**: Atualiza a URL silenciosamente sem reativar os ciclos de vida dos componentes ou os navigation guards.

---
