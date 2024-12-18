# Next.js Integração: Documentação do Hook `useIntlayerAsync`

O hook `useIntlayerAsync` estende a funcionalidade do `useIntlayer` não apenas retornando dicionários pré-renderizados, mas também buscando atualizações de forma assíncrona, tornando-o ideal para aplicações que frequentemente atualizam seu conteúdo localizado após a renderização inicial.

## Visão Geral

- **Carregamento Assíncrono de Dicionários:**  
  No lado do cliente, `useIntlayerAsync` primeiro retorna o dicionário de localidade pré-renderizado (assim como `useIntlayer`) e então busca e mescla assíncronamente quaisquer dicionários remotos novos disponíveis.
- **Gerenciamento de Estado de Progresso:**  
  O hook também fornece um estado `isLoading`, indicando quando um dicionário remoto está sendo buscado. Isso permite que os desenvolvedores exibam indicadores de carregamento ou estados esqueleto para uma experiência de usuário mais suave.

## Configuração do Ambiente

Intlayer fornece um sistema de Gerenciamento de Fonte de Conteúdo (CSM) sem cabeçalho que capacita não-developers a gerenciar e atualizar o conteúdo da aplicação de forma contínua. Usando o painel intuitivo da Intlayer, sua equipe pode editar texto localizado, imagens e outros recursos sem modificar diretamente o código. Isso simplifica o processo de gerenciamento de conteúdo, promove a colaboração e garante que as atualizações possam ser feitas de forma rápida e fácil.

Para começar com a Intlayer, você primeiro precisará se registrar e obter um token de acesso em [https://intlayer.org/dashboard](https://intlayer.org/dashboard). Depois de obter suas credenciais, adicione-as ao seu arquivo de configuração conforme mostrado abaixo:

```typescript
import { type IntlayerConfig } from 'intlayer';

export default {
  ...
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
} satisfies IntlayerConfig;
```

Após configurar suas credenciais, você pode enviar um novo dicionário de localidade para a Intlayer executando:

```bash
npm intlayer push -d my-first-dictionary-key
```

Este comando faz o upload dos seus dicionários de conteúdo iniciais, tornando-os disponíveis para busca e edição assíncronas através da plataforma Intlayer.

## Importando `useIntlayerAsync` no Next.js

Uma vez que `useIntlayerAsync` é destinado a componentes **do lado do cliente**, você o importará do mesmo ponto de entrada do cliente que `useIntlayer`:

```tsx
"use client";

import { useIntlayerAsync } from "next-intlayer";
```

Certifique-se de que o arquivo de importação esteja anotado com `"use client"` no topo, se você estiver usando o Next.js App Router com componentes de servidor e cliente separados.

## Parâmetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   A chave do dicionário usada para identificar o bloco de conteúdo localizado. Esta chave deve ser definida em seus arquivos de declaração de conteúdo.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   A localidade específica que você deseja direcionar. Se omitida, o hook usa a localidade do contexto do cliente.

3. **`isRenderEditor`** (opcional, padrão para `true`):  
   **Tipo**: `boolean`  
   Determina se o conteúdo deve estar pronto para renderização com a sobreposição do editor Intlayer. Se definido como `false`, os dados do dicionário retornados excluirão recursos específicos do editor.

## Valor de Retorno

O hook retorna um objeto de dicionário contendo conteúdo localizado indexado por `key` e `locale`. Também inclui um booleano `isLoading` indicando se um dicionário distante está sendo buscado atualmente.

## Exemplo de Uso no Next.js

### Exemplo de Componente do Lado do Cliente

```tsx
"use client";

import { useEffect } from "react";
import { useIntlayerAsync } from "next-intlayer";

export const AsyncClientComponentExample = () => {
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
- Enquanto `isLoading` estiver `true`, uma requisição remota é feita em segundo plano para buscar um dicionário atualizado.
- Assim que a busca é concluída, `title` e `description` são atualizados com o conteúdo mais recente, e `isLoading` retorna a `false`.

## Tratamento de Localização de Atributos

Assim como com `useIntlayer`, você pode recuperar valores de atributos localizados para várias propriedades HTML (por exemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Arquivos de Declaração de Conteúdo

Todas as chaves de conteúdo devem ser definidas em seus arquivos de declaração de conteúdo para segurança de tipo e para evitar erros em tempo de execução. Esses arquivos permitem a validação do TypeScript, garantindo que você sempre referencie chaves e localidades existentes.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

## Mais Informações

- **Editor Visual Intlayer:**  
  Integre-se ao editor visual da Intlayer para gerenciar e editar conteúdo diretamente da interface do usuário. Mais detalhes [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

---

**Em resumo**, o `useIntlayerAsync` é um hook poderoso do lado do cliente projetado para melhorar a experiência do usuário e manter a frescura do conteúdo, unindo dicionários pré-renderizados com atualizações assíncronas de dicionário. Ao alavancar `isLoading` e declarações de conteúdo baseadas em TypeScript, você pode integrar de forma contínua conteúdo localizado dinâmico em suas aplicações Next.js.
