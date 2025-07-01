---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Hook useIntlayerAsync | next-intlayer
description: Veja como usar o hook useIntlayerAsync para o pacote next-intlayer
keywords:
  - useIntlayerAsync
  - dicionário
  - chave
  - Intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayerAsync
---

# Integração com Next.js: Documentação do Hook `useIntlayerAsync`

O hook `useIntlayerAsync` estende a funcionalidade do `useIntlayer` ao não apenas retornar dicionários pré-renderizados, mas também buscar atualizações de forma assíncrona, tornando-o ideal para aplicações que atualizam frequentemente seu conteúdo localizado após a renderização inicial.

## Visão Geral

- **Carregamento Assíncrono de Dicionários:**  
  No lado do cliente, o `useIntlayerAsync` primeiro retorna o dicionário de localidade pré-renderizado (assim como o `useIntlayer`) e depois busca e mescla de forma assíncrona quaisquer dicionários remotos recém-disponíveis.
- **Gerenciamento do Estado de Progresso:**  
  O hook também fornece um estado `isLoading`, indicando quando um dicionário remoto está sendo buscado. Isso permite que os desenvolvedores exibam indicadores de carregamento ou estados de esqueleto para uma experiência de usuário mais suave.

## Configuração do Ambiente

Intlayer fornece um sistema headless de Gerenciamento de Fonte de Conteúdo (CSM) que capacita não desenvolvedores a gerenciar e atualizar o conteúdo da aplicação de forma fluida. Usando o painel intuitivo do Intlayer, sua equipe pode editar textos localizados, imagens e outros recursos sem modificar diretamente o código. Isso simplifica o processo de gerenciamento de conteúdo, promove a colaboração e garante que as atualizações possam ser feitas rápida e facilmente.

Para começar com o Intlayer, você precisará primeiro se registrar e obter um token de acesso no [painel](https://intlayer.org/dashboard). Depois de obter suas credenciais, adicione-as ao seu arquivo de configuração conforme mostrado abaixo:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

export default {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

Após configurar suas credenciais, você pode enviar um novo dicionário de localidade para o Intlayer executando:

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

Este comando faz o upload dos seus dicionários de conteúdo iniciais, tornando-os disponíveis para busca e edição assíncronas através da plataforma Intlayer.

## Importando `useIntlayerAsync` no Next.js

Como `useIntlayerAsync` é destinado para componentes **do lado do cliente**, você irá importá-lo do mesmo ponto de entrada do cliente que `useIntlayer`:

```tsx codeFormat="typescript"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="esm"
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

```javascript codeFormat="commonjs"
"use client";

const { useIntlayerAsync } = require("next-intlayer");
```

Certifique-se de que o arquivo de importação esteja anotado com `"use client"` no topo, caso você esteja usando o Next.js App Router com componentes de servidor e cliente separados.

## Parâmetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   A chave do dicionário usada para identificar o bloco de conteúdo localizado. Esta chave deve ser definida nos seus arquivos de declaração de conteúdo.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   A localidade específica que você deseja direcionar. Se omitida, o hook usa a localidade do contexto do cliente.

3. **`isRenderEditor`** (opcional, padrão `true`):  
   **Tipo**: `boolean`  
   Determina se o conteúdo deve estar pronto para renderização com a sobreposição do editor Intlayer. Se definido como `false`, os dados do dicionário retornados excluirão recursos específicos do editor.

## Valor de Retorno

O hook retorna um objeto dicionário contendo o conteúdo localizado identificado por `key` e `locale`. Ele também inclui um booleano `isLoading` que indica se um dicionário remoto está sendo buscado no momento.

## Exemplo de Uso no Next.js

### Exemplo de Componente do Lado do Cliente

```tsx fileName="src/components/AsyncClientComponentExample.tsx" codeFormat="typescript"
"use client";

import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Conteúdo está carregando...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Conteúdo está carregando...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

```jsx fileName="src/components/AsyncClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useEffect } = require("react");
const { useIntlayerAsync } = require("next-intlayer");

const AsyncClientComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("Conteúdo está carregando...");
    }
  }, [isLoading]);

  return (
    <div>
      <h1>{title.value}</h1>
      <p>{description.value}</p>
    </div>
  );
};
```

**Pontos-chave:**

- Na renderização inicial, `title` e `description` vêm do dicionário de localidade pré-renderizado.

- Enquanto `isLoading` estiver `true`, uma requisição remota é feita em segundo plano para buscar um dicionário atualizado.
- Uma vez que a busca é concluída, `title` e `description` são atualizados com o conteúdo mais recente, e `isLoading` retorna para `false`.

## Tratamento da Localização de Atributos

Assim como com `useIntlayer`, você pode recuperar valores localizados para atributos de várias propriedades HTML (por exemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Arquivos de Dicionário

Todas as chaves de conteúdo devem ser definidas em seus arquivos de declaração de conteúdo para garantir segurança de tipo e evitar erros em tempo de execução. Esses arquivos permitem a validação do TypeScript, assegurando que você sempre referencie chaves e locais existentes.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

## Mais Informações

- **Editor Visual Intlayer:**  
  Integre com o editor visual Intlayer para gerenciar e editar conteúdo diretamente pela interface do usuário. Mais detalhes [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).

---

**Em resumo**, `useIntlayerAsync` é um poderoso hook do lado do cliente projetado para melhorar a experiência do usuário e manter o conteúdo atualizado ao combinar dicionários pré-renderizados com atualizações assíncronas de dicionários. Aproveitando `isLoading` e declarações de conteúdo baseadas em TypeScript, você pode integrar perfeitamente conteúdo dinâmico e localizado em suas aplicações Next.js.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
