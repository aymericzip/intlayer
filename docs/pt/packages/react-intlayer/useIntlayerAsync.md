# Integração React: Documentação do Hook `useIntlayerAsync`

O hook `useIntlayerAsync` estende a funcionalidade do `useIntlayer` não apenas retornando dicionários pré-renderizados, mas também buscando atualizações de forma assíncrona, tornando-o ideal para aplicações que frequentemente atualizam seu conteúdo localizado após a renderização inicial.

## Visão Geral

- **Carregamento Assíncrono de Dicionários:**  
  Na montagem inicial, `useIntlayerAsync` primeiro retorna qualquer dicionário de localidade pré-carregado ou agrupado estaticamente (assim como `useIntlayer` faria) e então busca e mescla assíncronamente quaisquer novos dicionários remotos disponíveis.
- **Gerenciamento de Estado de Progresso:**  
  O hook também fornece um estado `isLoading`, indicando quando um dicionário remoto está sendo buscado. Isso permite que os desenvolvedores exibam indicadores de carregamento ou estados de esqueleto para uma experiência do usuário mais suave.

## Configuração do Ambiente

Intlayer fornece um sistema de Gestão de Conteúdo Sem Cabeça (CSM) que capacita não desenvolvedores a gerenciar e atualizar o conteúdo da aplicação de maneira fluida. Ao usar o painel intuitivo do Intlayer, sua equipe pode editar texto localizado, imagens e outros recursos sem modificar diretamente o código. Isso simplifica o processo de gerenciamento de conteúdo, promove a colaboração e garante que as atualizações possam ser feitas de forma rápida e fácil.

Para começar com o Intlayer:

1. **Registre-se e obtenha um token de acesso** em [https://intlayer.org/dashboard](https://intlayer.org/dashboard).
2. **Adicione credenciais ao seu arquivo de configuração:**  
   No seu projeto React, configure o cliente Intlayer com suas credenciais:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Envie um novo dicionário de localidade para o Intlayer:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   Este comando faz o upload dos seus dicionários de conteúdo iniciais, tornando-os disponíveis para busca e edição assíncronas através da plataforma Intlayer.

## Importando `useIntlayerAsync` no React

Em seus componentes React, importe `useIntlayerAsync`:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## Parâmetros

1. **`key`**:  
   **Tipo**: `DictionaryKeys`  
   A chave do dicionário usada para identificar o bloco de conteúdo localizado. Esta chave deve ser definida em seus arquivos de declaração de conteúdo.

2. **`locale`** (opcional):  
   **Tipo**: `Locales`  
   A localidade específica que você deseja direcionar. Se omitido, o hook usa a localidade do contexto atual do Intlayer.

3. **`isRenderEditor`** (opcional, padrão `true`):  
   **Tipo**: `boolean`  
   Determina se o conteúdo deve estar pronto para renderização com a sobreposição do editor do Intlayer. Se definido como `false`, os dados do dicionário retornado excluirão características específicas do editor.

## Valor de Retorno

O hook retorna um objeto dicionário contendo conteúdo localizado indexado por `key` e `locale`. Também inclui um booleano `isLoading` indicando se um dicionário remoto está sendo buscado no momento.

## Exemplo de Uso em um Componente React

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
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

- Na renderização inicial, `title` e `description` vêm do dicionário de localidade pré-carregado ou embutido estaticamente.
- Enquanto `isLoading` é `true`, uma solicitação em segundo plano busca um dicionário atualizado.
- Assim que a busca é concluída, `title` e `description` são atualizados com o conteúdo mais recente, e `isLoading` retorna a `false`.

## Manipulando Localização de Atributos

Você também pode recuperar valores de atributo localizados para várias propriedades HTML (por exemplo, `alt`, `title`, `aria-label`):

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Arquivos de Declaração de Conteúdo

Todas as chaves de conteúdo devem ser definidas em seus arquivos de declaração de conteúdo para segurança de tipos e para evitar erros em tempo de execução. Esses arquivos habilitam a validação do TypeScript, garantindo que você sempre faça referência a chaves e localidades existentes.

Instruções para configurar arquivos de declaração de conteúdo estão disponíveis [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/content_declaration/get_started.md).

## Mais Informações

- **Editor Visual do Intlayer:**  
  Integre-se ao editor visual do Intlayer para gerenciar e editar conteúdo diretamente da interface do usuário. Mais detalhes [aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

---

**Em resumo**, `useIntlayerAsync` é um poderoso hook React projetado para melhorar a experiência do usuário e manter a frescura do conteúdo ao mesclar dicionários pré-renderizados ou pré-carregados com atualizações assíncronas de dicionários. Ao aproveitar `isLoading` e declarações de conteúdo baseadas em TypeScript, você pode integrar de forma fluida, conteúdo localizado dinâmico em suas aplicações React.
