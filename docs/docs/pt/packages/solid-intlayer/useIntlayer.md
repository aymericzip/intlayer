---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Hook useIntlayer | solid-intlayer
description: Veja como usar o hook useIntlayer do pacote solid-intlayer
keywords:
  - useIntlayer
  - dicionário
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
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Documentação do Hook useIntlayer

O hook `useIntlayer` permite recuperar conteúdo localizado de um dicionário usando a sua chave. No Solid, este hook retorna uma função reativa **accessor** que é atualizada sempre que o locale muda.

## Uso

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Descrição

O hook executa as seguintes tarefas:

1. **Detecção de locale**: Utiliza o locale atual do contexto `IntlayerProvider`.
2. **Injeção de dicionário**: Injeta automaticamente o conteúdo do dicionário correspondente à chave fornecida, usando as declarações otimizadas geradas pelo compilador Intlayer.
3. **Reatividade**: Retorna um accessor do Solid (`Accessor<T>`) que reavalia automaticamente quando o estado global de locale muda.
4. **Processamento de Tradução**: resolve o conteúdo com base na locale detectada, processando quaisquer definições `t()`, `enu()`, etc., encontradas no dicionário.

## Parâmetros

- **key**: A chave única do dicionário (conforme definida nos seus arquivos de declaração de conteúdo).
- **locale** (opcional): Sobrescreve a locale atual.

## Retorna

Uma função accessor (`() => Content`) que retorna o conteúdo localizado.
