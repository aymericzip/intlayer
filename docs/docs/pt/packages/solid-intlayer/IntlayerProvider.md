---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Componente IntlayerProvider | solid-intlayer
description: Veja como usar o componente IntlayerProvider do pacote solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exports
---

# Documentação do Componente IntlayerProvider

O `IntlayerProvider` é o componente raiz que fornece o contexto de internacionalização à sua aplicação Solid. Ele gerencia o estado do locale atual e garante que todos os componentes filhos possam acessar as traduções.

## Uso

```tsx
tsx;
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Descrição

O `IntlayerProvider` desempenha as seguintes funções:

1. **Gerenciamento de Estado**: Inicializa e armazena o locale atual, usando signals para reatividade.
2. **Resolução de Locale**: Determina o locale inicial com base em cookies, preferências do navegador ou na configuração padrão.
3. **Injeção de Contexto**: Torna o locale e a função `setLocale` disponíveis para qualquer componente via hooks como `useIntlayer` ou `useLocale`.
4. **Persistência**: Sincroniza automaticamente alterações de locale com cookies ou local storage para manter a preferência do usuário entre sessões.

## Propriedades

- **locale** (opcional): Define manualmente o locale atual.
- **defaultLocale** (opcional): Substitui a locale padrão da configuração.
- **setLocale** (opcional): Fornece uma função personalizada para definir a locale.
- **disableEditor** (opcional): Desativa a integração com o editor visual.
- **isCookieEnabled** (opcional): Ativa ou desativa a persistência por cookies.
