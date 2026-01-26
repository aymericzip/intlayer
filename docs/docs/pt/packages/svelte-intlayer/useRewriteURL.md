---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentação do Hook useRewriteURL
description: Hook específico para Svelte para gerenciar reescritas de URLs localizadas no Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

O hook `useRewriteURL` para Svelte foi projetado para gerenciar reescritas de URLs localizadas no lado do cliente. Ele corrige automaticamente a URL do navegador para sua versão localizada "prettier" baseada na localidade atual e na configuração em `intlayer.config.ts`.

Ele atualiza a URL silenciosamente usando `window.history.replaceState`, evitando navegações completas do SvelteKit.

## Uso

Chame o hook dentro de um componente Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // Corrige automaticamente /fr/tests para /fr/essais na barra de endereços se existir uma regra de rewrite
  useRewriteURL();
</script>

<slot />
```

## Como funciona

1. **Reactive Updates**: O hook subscreve-se à store `locale` do Intlayer.
2. **Detection**: Sempre que a locale muda (ou na montagem), calcula se o `window.location.pathname` atual tem um alias localizado mais "bonito" definido nas suas regras de rewrite.
3. **URL Correction**: Se for encontrado um caminho mais "bonito", o hook chama `window.history.replaceState` para atualizar a barra de endereço sem recarregar a página nem disparar a lógica de navegação do SvelteKit.

## Por que usar?

- **Melhores práticas de SEO**: Garante que os motores de busca indexem apenas a versão "bonita" e localizada das suas URLs.
- **UX melhorada**: Corrige URLs inseridas manualmente para refletirem a sua estrutura de nomenclatura preferida.
- **Atualizações silenciosas**: Modifica a barra de endereços sem afetar a árvore de componentes ou o histórico de navegação.
