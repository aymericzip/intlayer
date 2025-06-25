---
docName: package__next-intlayer__useIntlayerAsync
url: /doc/packages/next-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação do hook useIntlayerAsync | next-intlayer
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
---

# Integração com Next.js: Documentação do Hook `useIntlayerAsync`

O hook `useIntlayerAsync` estende a funcionalidade do `useIntlayer` ao não apenas retornar dicionários pré-renderizados, mas também buscar atualizações de forma assíncrona, tornando-o ideal para aplicativos que frequentemente atualizam seu conteúdo localizado após a renderização inicial.

## Visão Geral

- **Carregamento Assíncrono de Dicionários:**  
  No lado do cliente, o `useIntlayerAsync` primeiro retorna o dicionário de localidade pré-renderizado (assim como o `useIntlayer`) e, em seguida, busca e mescla de forma assíncrona quaisquer novos dicionários remotos disponíveis.
- **Gerenciamento de Estado de Progresso:**  
  O hook também fornece um estado `isLoading`, indicando quando um dicionário remoto está sendo buscado. Isso permite que os desenvolvedores exibam indicadores de carregamento ou estados esqueleto para uma experiência de usuário mais fluida.

## Configuração do Ambiente

O Intlayer fornece um sistema de Gerenciamento de Fonte de Conteúdo (CSM) sem interface gráfica que capacita não-desenvolvedores a gerenciar e atualizar o conteúdo do aplicativo de forma contínua. Usando o painel intuitivo do Intlayer, sua equipe pode editar textos localizados, imagens e outros recursos sem modificar diretamente o código. Isso simplifica o processo de gerenciamento de conteúdo, promove a colaboração e garante que as atualizações possam ser feitas de forma rápida e fácil.

Para começar a usar o Intlayer, você precisará se registrar e obter um token de acesso em [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Depois de obter suas credenciais, adicione-as ao seu arquivo de configuração conforme mostrado abaixo:

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

Como o `useIntlayerAsync` é destinado a componentes do **lado do cliente**, você o importará do mesmo ponto de entrada do cliente que o `useIntlayer`:

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

Certifique-se de que o arquivo de importação esteja anotado com `"use client"` no topo, caso você esteja usando o App Router do Next.js com componentes de servidor e cliente separados.

## Parâmetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   A chave do dicionário usada para identificar o bloco de conteúdo localizado. Esta chave deve ser definida nos seus arquivos de declaração de conteúdo.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   A localidade específica que você deseja direcionar. Se omitido, o hook usa a localidade do contexto do cliente.

3. **`isRenderEditor`** (opcional, padrão é `true`):  
   **Tipo**: `boolean`  
   Determina se o conteúdo deve estar pronto para renderização com a sobreposição do editor do Intlayer. Se definido como `false`, os dados do dicionário retornados excluirão recursos específicos do editor.

## Valor Retornado

O hook retorna um objeto de dicionário contendo conteúdo localizado indexado por `key` e `locale`. Ele também inclui um booleano `isLoading` indicando se um dicionário remoto está sendo buscado no momento.

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
      console.log("O conteúdo está carregando...");
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
      console.log("O conteúdo está carregando...");
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
      console.log("O conteúdo está carregando...");
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

**Pontos-Chave:**

- Na renderização inicial, `title` e `description` vêm do dicionário de localidade pré-renderizado.
- Enquanto `isLoading` é `true`, uma solicitação remota é feita em segundo plano para buscar um dicionário atualizado.
- Após a conclusão da busca, `title` e `description` são atualizados com o conteúdo mais recente, e `isLoading` retorna para `false`.

## Tratamento de Localização de Atributos

Assim como no `useIntlayer`, você pode recuperar valores de atributos localizados para várias propriedades HTML (por exemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Arquivos de Dicionário

Todas as chaves de conteúdo devem ser definidas em seus arquivos de declaração de conteúdo para segurança de tipo e para evitar erros em tempo de execução. Esses arquivos permitem validação no TypeScript, garantindo que você sempre faça referência a chaves e localidades existentes.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

## Mais Informações

- **Editor Visual do Intlayer:**  
  Integre com o editor visual do Intlayer para gerenciar e editar conteúdo diretamente da interface do usuário. Mais detalhes [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md).

---

**Em resumo**, o `useIntlayerAsync` é um poderoso hook do lado do cliente projetado para melhorar a experiência do usuário e manter a atualização do conteúdo ao combinar dicionários pré-renderizados com atualizações assíncronas de dicionários. Ao aproveitar o `isLoading` e as declarações de conteúdo baseadas em TypeScript, você pode integrar perfeitamente conteúdo dinâmico e localizado em seus aplicativos Next.js.
