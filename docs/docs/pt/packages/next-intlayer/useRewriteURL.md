---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentação do hook useRewriteURL
description: Hook específico para Next.js para gerir reescritas de URL localizadas no Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL Hook

O hook `useRewriteURL` para Next.js é um hook do lado do cliente que gere automaticamente reescritas de URL localizadas. Ele garante que a URL no navegador reflita sempre o caminho localizado "bonito" definido no seu `intlayer.config.ts`, mesmo se o utilizador digitar manualmente um caminho canónico com um prefixo de locale.

Este hook atua silenciosamente usando `window.history.replaceState`, evitando navegações redundantes pelo router do Next.js ou atualizações de página.

## Uso

Basta chamar o hook em um Client Component que faça parte do seu layout.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Corrige automaticamente /fr/privacy-notice para /fr/politique-de-confidentialite na barra de endereços
  useRewriteURL();

  return null;
};
```

## Como funciona

1. **Monitoramento de caminho**: O hook escuta mudanças no `locale` do usuário.
2. **Detecção de rewrite**: Ele verifica o `window.location.pathname` atual em relação às regras de rewrite na sua configuração.
3. **Correção de URL**: Se um alias localizado mais legível for encontrado para o caminho atual, o hook dispara um `window.history.replaceState` para atualizar a barra de endereços mantendo o usuário na mesma página interna.

## Por que usá-lo no Next.js?

Enquanto o `intlayerMiddleware` gere reescritas no lado do servidor e redirecionamentos iniciais, o hook `useRewriteURL` assegura que a URL no navegador se mantenha consistente com a sua estrutura SEO preferida mesmo após transições do lado do cliente.

- **URLs limpas**: Impõe o uso de segmentos localizados como `/fr/essais` em vez de `/fr/tests`.
- **Desempenho**: Atualiza a barra de endereço sem desencadear um ciclo completo do router ou reobter dados.
- **Alinhamento com SEO**: Evita problemas de conteúdo duplicado garantindo que apenas uma versão da URL esteja visível para o utilizador e para os bots dos motores de busca.
