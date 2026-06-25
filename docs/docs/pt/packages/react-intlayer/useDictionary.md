---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Hook useDictionary - Documentação React Intlayer
description: Guia completo para usar o hook useDictionary em aplicações React com Intlayer para manipulação eficiente de conteúdo localizado sem editor visual.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localização
  - i18n
  - dicionário
  - tradução
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Integração React: Documentação do Hook `useDictionary`

Esta seção fornece orientações detalhadas sobre o uso do hook `useDictionary` em aplicações React, permitindo a manipulação eficiente de conteúdo localizado sem um editor visual.

## Exemplo de Uso no React

Abaixo está um exemplo de como usar o hook `useDictionary` em um componente React:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Dicas Adicionais

- **Segurança de Tipo**: Sempre use `Dictionary` para definir seus dicionários para garantir segurança de tipo.
- **Atualizações de Localização**: Ao atualizar o conteúdo, certifique-se de que todos os locais estejam consistentes para evitar traduções faltantes.

Esta documentação foca na integração do hook `useDictionary`, fornecendo uma abordagem simplificada para gerenciar conteúdo localizado sem depender das funcionalidades do editor visual.
