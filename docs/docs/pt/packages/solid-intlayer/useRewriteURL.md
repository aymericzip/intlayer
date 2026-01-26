---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentação do Hook useRewriteURL
description: Hook específico para Solid para gerenciar reescritas de URL localizadas no Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

O hook `useRewriteURL` para SolidJS foi concebido para gerir reescritas de URL localizadas no lado do cliente. Ele corrige automaticamente a URL do navegador para a sua versão localizada "bonita" com base no locale atual e na configuração em `intlayer.config.ts`.

Ao usar `window.history.replaceState`, evita navegações redundantes do Solid Router.

## Uso

Chame o hook dentro de um componente que faça parte da sua aplicação.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Corrige automaticamente /fr/tests para /fr/essais na barra de endereços se existir uma regra de reescrita
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Como funciona

1. **Detecção**: O hook utiliza `createEffect` para monitorar alterações em `locale()` reativo.
2. **Correspondência**: Ele identifica se o `window.location.pathname` atual corresponde a uma rota canónica que tem um alias localizado mais agradável para o idioma atual.
3. **Correção de URL**: Se for encontrado um alias mais agradável, o hook chama `window.history.replaceState` para atualizar a barra de endereços sem afetar o estado de navegação interno ou causar re-renderizações de componentes.

## Por que usá-lo?

- **URLs autoritativas**: Impõe uma única URL para cada versão localizada do seu conteúdo, o que é crucial para SEO.
- **Conveniência para desenvolvedores**: Permite manter suas definições de rotas internas canônicas enquanto expõe ao mundo externo caminhos localizados e amigáveis ao utilizador.
- **Consistência**: Corrige URLs quando os utilizadores digitam manualmente um caminho que não segue as suas regras de localização preferidas.

---
