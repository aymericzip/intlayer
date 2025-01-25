# Integração React: Documentação do Hook `useIntlayerAsync`

O hook `useIntlayerAsync` estende a funcionalidade de `useIntlayer` ao não apenas retornar dicionários pré-renderizados, mas também buscar atualizações de forma assíncrona, tornando-o ideal para aplicações que frequentemente atualizam seu conteúdo localizado após a renderização inicial.

## Visão Geral

- **Carregamento Assíncrono de Dicionários:**  
  Na montagem inicial, `useIntlayerAsync` primeiro retorna qualquer dicionário de localidade pré-buscado ou estático (assim como `useIntlayer` faria) e, em seguida, busca e mescla assíncronamente quaisquer dicionários remotos novos disponíveis.
- **Gerenciamento do Estado de Progresso:**  
  O hook também fornece um estado `isLoading`, que indica quando um dicionário remoto está sendo buscado. Isso permite que os desenvolvedores exibam indicadores de carregamento ou estados de esqueleto para uma experiência do usuário mais suave.

## Configuração do Ambiente

Intlayer fornece um sistema de Gerenciamento de Fonte de Conteúdo (CSM) sem cabeça que capacita não desenvolvedores a gerenciar e atualizar o conteúdo do aplicativo sem esforço. Ao usar o painel intuitivo do Intlayer, sua equipe pode editar texto localizado, imagens e outros recursos sem modificar diretamente o código. Isso agiliza o processo de gerenciamento de conteúdo, promove a colaboração e garante que as atualizações possam ser feitas de forma rápida e fácil.

Para começar a usar o Intlayer:

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
   npx intlayer push -d my-first-dictionary-key
   ```

   Este comando faz o upload de seus dicionários de conteúdo iniciais, tornando-os disponíveis para busca assíncrona e edição através da plataforma Intlayer.

## Importando `useIntlayerAsync` no React

Em seus componentes React, importe `useIntlayerAsync`:

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
   A chave do dicionário usada para identificar o bloco de conteúdo localizado. Esta chave deve ser definida em seus arquivos de declaração de conteúdo.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   A localidade específica que você deseja atingir. Se omitido, o hook usa a localidade do contexto atual do Intlayer.

3. **`isRenderEditor`** (opcional, padrão `true`):  
   **Tipo**: `boolean`  
   Determina se o conteúdo deve estar pronto para renderização com a sobreposição do editor Intlayer. Se definido como `false`, os dados do dicionário retornado excluirão recursos específicos do editor.

## Valor de Retorno

O hook retorna um objeto dicionário contendo conteúdo localizado indexado por `key` e `locale`. Também inclui um booleano `isLoading` indicando se um dicionário remoto está sendo buscado atualmente.

## Exemplo de Uso em um Componente React

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("O conteúdo está sendo carregado...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Carregando…</h1>
          <p>Por favor, aguarde enquanto o conteúdo é atualizado.</p>
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
      console.log("O conteúdo está sendo carregado...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Carregando…</h1>
          <p>Por favor, aguarde enquanto o conteúdo é atualizado.</p>
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
      console.log("O conteúdo está sendo carregado...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Carregando…</h1>
          <p>Por favor, aguarde enquanto o conteúdo é atualizado.</p>
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

**Pontos Chave:**

- Na renderização inicial, `title` e `description` vêm do dicionário de localidade pré-buscado ou embutido estaticamente.
- Enquanto `isLoading` é `true`, uma solicitação em segundo plano busca um dicionário atualizado.
- Assim que a busca é concluída, `title` e `description` são atualizados com o conteúdo mais recente, e `isLoading` retorna `false`.

## Tratando Localization de Atributos

Você também pode recuperar valores de atributos localizados para várias propriedades HTML (por exemplo, `alt`, `title`, `aria-label`):

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Arquivos de Declaração de Conteúdo

Todas as chaves de conteúdo devem ser definidas em seus arquivos de declaração de conteúdo para garantir a segurança de tipos e evitar erros em tempo de execução. Esses arquivos permitem a validação do TypeScript, garantindo que você sempre faça referência a chaves e localidades existentes.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

## Mais Informações

- **Editor Visual Intlayer:**  
  Integre-se com o editor visual Intlayer para gerenciar e editar conteúdo diretamente da interface. Mais detalhes [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

---

**Em resumo**, `useIntlayerAsync` é um poderoso hook React projetado para aprimorar a experiência do usuário e manter a frescura do conteúdo ao mesclar dicionários pré-renderizados ou pré-buscados com atualizações de dicionários assíncronas. Ao aproveitar `isLoading` e declarações de conteúdo baseadas em TypeScript, você pode integrar de forma contínua conteúdo localizado e dinâmico em suas aplicações React.
