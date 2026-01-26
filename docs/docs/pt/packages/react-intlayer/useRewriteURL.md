---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Hook useRewriteURL
description: Hook específico para React para gerir reescritas de URL localizadas no Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

O hook `useRewriteURL` foi concebido para gerir reescritas de URL localizadas no lado do cliente. Detecta automaticamente se a URL atual deve ser corrigida para uma versão localizada mais legível com base na locale do utilizador e nas regras de reescrita definidas em `intlayer.config.ts`.

Ao contrário da navegação padrão, este hook usa `window.history.replaceState` para atualizar a URL na barra de endereços sem disparar um recarregamento completo da página nem um ciclo de navegação do router.

## Utilização

Basta chamar o hook em um componente do lado do cliente.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // Corrige automaticamente /fr/tests para /fr/essais na barra de endereços se existir uma regra de reescrita
  useRewriteURL();

  return <div>My Component</div>;
};
```

## Como funciona

1. **Detecção**: O hook monitora o atual `window.location.pathname` e o `locale` do utilizador.
2. **Correspondência**: Utiliza o motor interno do Intlayer para verificar se o pathname atual corresponde a uma rota canónica que tem um alias localizado mais apresentável para o `locale` atual.
3. **Correção de URL**: Se for encontrado um alias melhor (e for diferente do caminho atual), o hook chama `window.history.replaceState` para atualizar a URL do navegador mantendo o mesmo conteúdo canónico e estado.

## Por que usar?

- **SEO**: Garante que os utilizadores aterrem sempre na única URL amigável e canónica para um dado idioma.
- **Consistência**: Evita inconsistências onde um utilizador possa digitar manualmente um caminho canónico (como `/fr/privacy-notice`) em vez da versão localizada (`/fr/politique-de-confidentialite`).
- **Performance**: Atualiza a barra de endereços sem provocar efeitos colaterais indesejados no router ou re-montagens de componentes.
