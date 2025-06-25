---
docName: package__react-intlayer__useIntlayerAsync
url: /doc/packages/react-intlayer/useIntlayerAsync
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/react-intlayer/useIntlayerAsync.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentação do hook useIntlayerAsync | react-intlayer
description: Veja como usar o hook useIntlayerAsync para o pacote react-intlayer
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

# Integração com React: Documentação do Hook `useIntlayerAsync`

O hook `useIntlayerAsync` estende a funcionalidade do `useIntlayer`, retornando não apenas dicionários pré-renderizados, mas também buscando atualizações de forma assíncrona, tornando-o ideal para aplicações que frequentemente atualizam seu conteúdo localizado após a renderização inicial.

## Visão Geral

- **Carregamento Assíncrono de Dicionários:**  
  Na montagem inicial, o `useIntlayerAsync` primeiro retorna qualquer dicionário de localidade pré-buscado ou empacotado estaticamente (assim como o `useIntlayer` faria) e, em seguida, busca e mescla de forma assíncrona quaisquer novos dicionários remotos disponíveis.
- **Gerenciamento do Estado de Progresso:**  
  O hook também fornece um estado `isLoading`, indicando quando um dicionário remoto está sendo buscado. Isso permite que os desenvolvedores exibam indicadores de carregamento ou estados de esqueleto para uma experiência do usuário mais suave.

## Configuração do Ambiente

O Intlayer fornece um sistema de Gerenciamento de Fonte de Conteúdo (CSM) sem interface gráfica que capacita não desenvolvedores a gerenciar e atualizar o conteúdo da aplicação de forma contínua. Usando o painel intuitivo do Intlayer, sua equipe pode editar texto localizado, imagens e outros recursos sem modificar diretamente o código. Isso simplifica o processo de gerenciamento de conteúdo, promove a colaboração e garante que as atualizações possam ser feitas de forma rápida e fácil.

Para começar com o Intlayer:

1. **Registre-se e obtenha um token de acesso** em [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Adicione credenciais ao seu arquivo de configuração:**  
   No seu projeto React, configure o cliente Intlayer com suas credenciais:

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

3. **Envie um novo dicionário de localidade para o Intlayer:**

   ```bash
   npx intlayer dictionary push -d my-first-dictionary-key
   ```

   Este comando faz o upload dos seus dicionários de conteúdo iniciais, tornando-os disponíveis para busca assíncrona e edição através da plataforma Intlayer.

## Importando `useIntlayerAsync` no React

Nos seus componentes React, importe `useIntlayerAsync`:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## Parâmetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   A chave do dicionário usada para identificar o bloco de conteúdo localizado. Esta chave deve ser definida nos seus arquivos de declaração de conteúdo.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   A localidade específica que você deseja direcionar. Se omitida, o hook usa a localidade do contexto atual do Intlayer.

3. **`isRenderEditor`** (opcional, padrão é `true`):  
   **Tipo**: `boolean`  
   Determina se o conteúdo deve estar pronto para renderização com a sobreposição do editor do Intlayer. Se definido como `false`, os dados do dicionário retornados excluirão recursos específicos do editor.

## Valor de Retorno

O hook retorna um objeto de dicionário contendo conteúdo localizado indexado por `key` e `locale`. Ele também inclui um booleano `isLoading` indicando se um dicionário remoto está sendo buscado no momento.

## Exemplo de Uso em um Componente React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("O conteúdo está carregando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Carregando…</h1>
          <p>Aguarde enquanto o conteúdo é atualizado.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("O conteúdo está carregando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Carregando…</h1>
          <p>Aguarde enquanto o conteúdo é atualizado.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("O conteúdo está carregando...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Carregando…</h1>
          <p>Aguarde enquanto o conteúdo é atualizado.</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**Pontos-Chave:**

- Na renderização inicial, `title` e `description` vêm do dicionário de localidade pré-buscado ou embutido estaticamente.
- Enquanto `isLoading` é `true`, uma solicitação em segundo plano busca um dicionário atualizado.
- Assim que a busca é concluída, `title` e `description` são atualizados com o conteúdo mais recente, e `isLoading` retorna para `false`.

## Tratando Localização de Atributos

Você também pode recuperar valores de atributos localizados para várias propriedades HTML (por exemplo, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Arquivos de Dicionário

Todas as chaves de conteúdo devem ser definidas nos seus arquivos de declaração de conteúdo para segurança de tipo e para evitar erros em tempo de execução. Esses arquivos permitem validação no TypeScript, garantindo que você sempre faça referência a chaves e localidades existentes.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md).

## Mais Informações

- **Editor Visual Intlayer:**  
  Integre com o editor visual do Intlayer para gerenciar e editar conteúdo diretamente da interface. Mais detalhes [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md).

---

**Em resumo**, o `useIntlayerAsync` é um hook poderoso do React projetado para melhorar a experiência do usuário e manter a atualização do conteúdo ao mesclar dicionários pré-renderizados ou pré-buscados com atualizações assíncronas de dicionários. Ao aproveitar `isLoading` e declarações de conteúdo baseadas em TypeScript, você pode integrar perfeitamente conteúdo dinâmico e localizado em suas aplicações React.
